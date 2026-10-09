const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const curriculum=require('../curriculum.js');
Object.assign(curriculum,require('../algorithm-state.js'),require('../backend-state.js'));
const app=fs.readFileSync('app.js','utf8').split("\n$('#today-date')")[0];
const account=fs.readFileSync('account.js','utf8').replace(/accountInit\(\);\s*$/,'');
const guest={version:1,settings:{name:'访客',startDate:'2026-10-09',hours:2,days:6},lessons:{1:{done:true,checks:[0,1,2],note:'旧笔记',completedAt:'2026-10-09'}},projects:{},logs:[],lastLesson:1,timer:null};
function runtime(responses,cache={}) {
 const store=new Map(Object.entries({'shijie-study-v1':JSON.stringify(guest),...cache})),nodes=new Map(),calls=[];
 const context=vm.createContext({...curriculum,Date,Intl,AbortSignal,URL,encodeURIComponent,history:{replaceState(){}},location:{href:'https://study.test/#settings',hash:'#settings',pathname:'/'},window:{addEventListener(){}},document:{visibilityState:'visible',activeElement:null,addEventListener(){},querySelector(s){if(!nodes.has(s))nodes.set(s,{textContent:'',classList:{add(){},remove(){},toggle(){}},addEventListener(){},value:'25'});return nodes.get(s);}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},fetch:async(url,options)=>{calls.push({url,options});const next=responses.shift();if(next instanceof Error)throw next;if(!next)throw Error('Unexpected fetch');return {ok:(next.status||200)<400,status:next.status||200,json:async()=>next.data};}});
 vm.runInContext(app,context);vm.runInContext('render=()=>{};syncTimer=()=>{};toast=()=>{};',context);vm.runInContext(account,context);return {context,store,calls};
}
(async()=>{
 const user={id:'github:1',name:'用户'};
 const r=runtime([{data:{user}},{data:{version:0,data:null}}]);
 await vm.runInContext('accountInit()',r.context);
 assert.equal(vm.runInContext('Object.keys(state.lessons).length',r.context),0);
 assert.equal(vm.runInContext('guestRecords.lessons[1].note',r.context),'旧笔记');
 assert.equal(r.store.get('shijie-study-v1'),JSON.stringify(guest));
 const offline=runtime([{data:{user}},{data:{version:2,data:guest}},new Error('offline'),{data:{version:3}}]);
 await vm.runInContext('accountInit()',offline.context);
 vm.runInContext("state.lessons[1].note='新笔记';save();",offline.context);
 await vm.runInContext('cloudPush()',offline.context);
 assert.equal(vm.runInContext('cloudDirty',offline.context),true);
 await vm.runInContext('cloudPush()',offline.context);
 assert.equal(vm.runInContext('cloudDirty',offline.context),false);
 assert.equal(vm.runInContext('cloudVersion',offline.context),3);
 const payload=JSON.parse(offline.calls.at(-1).options.body);assert.equal(payload.userId,user.id);assert.equal(payload.version,2);
 const conflict=runtime([{data:{user}},{data:{version:5,data:guest}}],{'shijie-study-v1:github:1':JSON.stringify({...guest,settings:{...guest.settings,name:'待上传'}}),'shijie-study-v1:github:1:sync':JSON.stringify({version:4,dirty:true})});
 await vm.runInContext('accountInit()',conflict.context);
 assert.equal(vm.runInContext('cloudConflict',conflict.context),true);
 assert.equal(vm.runInContext('state.settings.name',conflict.context),'待上传');
 assert.equal(conflict.calls.length,2);
 console.log('通过：账号独立缓存、旧记录不自动覆盖、断网修改保留与重试、恢复待上传冲突、写入携带账号身份。');
})().catch(e=>{console.error(e);process.exitCode=1;});
