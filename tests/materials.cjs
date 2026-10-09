const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const all={...require('../curriculum.js'),...require('../algorithm-data.js'),...require('../algorithm-state.js'),...require('../backend-data.js'),...require('../backend-state.js'),...require('../material-data.js')};
assert.equal(all.LEARNING_MATERIALS.length,68);
assert.equal(all.LEARNING_MATERIALS.filter(m=>m.kind==='cpp').length,55);
assert.equal(new Set(all.LEARNING_MATERIALS.map(m=>m.id)).size,68);
for(const m of all.LEARNING_MATERIALS){assert(fs.existsSync(path.join(__dirname,'..',m.url)));assert(!/C:\\Users\\|chatgpt\.com\/(share|s)\//i.test(fs.readFileSync(path.join(__dirname,'..',m.url),'utf8')));assert(/^(01 学习资料|02 C\+\+ 练习)\//.test(m.obsidianFile));assert(!m.obsidianFile.includes('..'));}
assert(fs.existsSync(path.join(__dirname,'../resources/learning/shijie-obsidian-starter.zip')));
const nodes=new Map(),handlers=new Map(),store=new Map(),sent=[];
const button={addEventListener(type,fn){handlers.set(type,fn);}};
const context=vm.createContext({...all,Date,Intl,URL,URLSearchParams,location:{hash:'#cpp-notes',href:'https://study.test/#cpp-notes'},navigator:{clipboard:{async writeText(text){sent.push(text);}}},document:{querySelector(s){if(!nodes.has(s))nodes.set(s,{value:s==='#obsidian-vault'?'拾阶笔记库':'',textContent:'',classList:{add(){},remove(){}},addEventListener(){}});return nodes.get(s);},querySelectorAll(s){return s==='[data-obsidian-send]'?[button]:[];}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){}});
vm.runInContext(fs.readFileSync('app.js','utf8').split("\n$('#today-date')")[0],context);
vm.runInContext('render=()=>{};toast=()=>{};',context);
vm.runInContext(fs.readFileSync('algorithms.js','utf8'),context);
vm.runInContext(fs.readFileSync('platform.js','utf8'),context);
vm.runInContext(fs.readFileSync('materials.js','utf8'),context);
vm.runInContext("state.lessons[1]={note:'AI 独立笔记',checks:[],done:false};state.backend.records[32]={note:'C++ 实践记录',checks:[0]};bindMaterials();",context);
assert(vm.runInContext("learningMarkdown('all')",context).includes('AI 独立笔记'));
assert(!vm.runInContext("learningMarkdown('cpp')",context).includes('AI 独立笔记'));
(async()=>{await handlers.get('click')();assert(sent[0].includes('C++ 实践记录'));assert(!sent[0].includes('AI 独立笔记'));const uri=new URL(context.location.href);assert.equal(uri.protocol,'obsidian:');assert.equal(uri.searchParams.get('vault'),'拾阶笔记库');assert.equal(uri.searchParams.get('clipboard'),'true');assert(!uri.searchParams.has('content'));assert(uri.searchParams.get('file').startsWith('04 学习记录/'));console.log('通过：68 份资料、55 份源码、隐私路径清理、笔记库对应关系、分路线导出、Obsidian 剪贴板传递。');})().catch(e=>{console.error(e);process.exitCode=1;});
