const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {STAGES,WEEKS,LESSONS,RESOURCES,PROJECTS}=require('../curriculum.js');
const algorithmState={...require('../algorithm-state.js'),...require('../backend-state.js')};
assert.equal(WEEKS.length,52);assert.equal(LESSONS.length,364);assert.equal(PROJECTS.length,4);
assert.equal(LESSONS.filter(l=>l.detailed).length,28);
for(let i=0;i<364;i++){
  const lesson=LESSONS[i];assert.equal(lesson.id,i+1);assert.equal(lesson.week,Math.floor(i/7)+1);
  assert(STAGES.some(s=>s.id===lesson.stage&&lesson.week>=s.range[0]&&lesson.week<=s.range[1]));
  assert(lesson.title&&lesson.exercise&&lesson.explanation);assert.equal(lesson.checks.length,3);
  assert(RESOURCES.some(r=>r.id===lesson.resource));
}
const app=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
// Exercise the real backup validator without a browser; all invalid inputs must reject.
const validator=app.slice(app.indexOf('function validateBackup'),app.indexOf('\nfunction save'));
const context=vm.createContext({...algorithmState,LESSONS,PROJECTS,Date,defaultState:()=>({version:1,settings:{},lessons:{},projects:{},logs:[],lastLesson:1,timer:null})});
vm.runInContext(validator,context);
const valid={version:1,settings:{name:'测试',startDate:'2026-10-08',hours:2,days:6},lessons:{1:{done:true,checks:[0,1,2],note:'<script>不会执行</script>',completedAt:'2026-10-08'}},projects:{1:[0,1]},logs:[{date:'2026-10-08',minutes:25,lesson:1}],lastLesson:1,timer:null};
assert.equal(context.validateBackup(valid).lessons[1].note,valid.lessons[1].note);
assert.equal(context.validateBackup(valid).logs[0].minutes,25);
for(const mutate of [x=>x.version=2,x=>x.lessons[1].checks=[10],x=>x.lessons[999]={done:true,checks:[],note:''},x=>x.logs[0].minutes=-1,x=>x.logs[0].lesson=999,x=>x.projects[1]=[999],x=>x.settings.days=0,x=>x.settings.startDate='bad',x=>x.lessons[1].note={},x=>x.logs[0].date='bad',x=>x.settings.startDate='2026-02-30',x=>x.lessons[1].checks=[0],x=>x.lessons[1].completedAt=null]){const copy=structuredClone(valid);mutate(copy);assert.throws(()=>context.validateBackup(copy));}
new vm.Script(app);new vm.Script(fs.readFileSync(path.join(__dirname,'../curriculum.js'),'utf8'));
// Verify timer bookkeeping with a controllable clock, without waiting or changing user records.
let clock=Date.parse('2026-10-08T02:00:00Z');
class TestDate extends Date{constructor(...args){super(...(args.length?args:[clock]));}static now(){return clock;}}
const nodes=new Map();const store=new Map();
const runtime=vm.createContext({...algorithmState,LESSONS,PROJECTS,STAGES,WEEKS,RESOURCES,Date:TestDate,Intl,Number,JSON,Set,Map,document:{querySelector(selector){if(!nodes.has(selector))nodes.set(selector,{textContent:'',value:'25',disabled:false,classList:{add(){},remove(){}}});return nodes.get(selector);}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){}});
vm.runInContext(app.slice(0,app.indexOf("\n$('#today-date')")),runtime);
vm.runInContext('render = () => {}; state.timer={started:Date.now()-90000,duration:25,lesson:1}; finishTimer(false);',runtime);
assert.equal(vm.runInContext('state.logs[0].minutes',runtime),1);
vm.runInContext('state.timer={started:Date.now()-3600000,duration:25,lesson:2}; updateTimer(); updateTimer();',runtime);
assert.equal(vm.runInContext('state.logs.length',runtime),2);
assert.equal(vm.runInContext('state.logs[1].minutes',runtime),25);
assert.equal(vm.runInContext('state.timer',runtime),null);
vm.runInContext('state.timer={started:Date.now()-5000,duration:15,lesson:3}; finishTimer(false);',runtime);
assert.equal(vm.runInContext('state.logs.length',runtime),2);
console.log('通过：52 周 / 364 课、28 天详解、资料引用、备份往返、13 类非法记录拒绝、计时器提前结束 / 超时封顶 / 防重复记录、脚本语法。');
