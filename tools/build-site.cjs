const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
fs.mkdirSync(out, {recursive:true});
const allow = ['index.html','styles.css','app.js','account.js','curriculum.js','algorithm-data.js','algorithm-state.js','algorithms.js','backend-data.js','backend-state.js','platform.js','material-data.js','materials.js','resources','exercises','projects'];
function copyPublic(source,target){if(source.includes('__pycache__')||source.endsWith('.pyc'))return;if(fs.statSync(source).isDirectory()){fs.mkdirSync(target,{recursive:true});for(const name of fs.readdirSync(source))copyPublic(path.join(source,name),path.join(target,name));}else fs.copyFileSync(source,target);}
for (const item of allow) copyPublic(path.join(root,item),path.join(out,item));
fs.writeFileSync(path.join(out,'.nojekyll'),'');
fs.mkdirSync(path.join(out,'vendor'),{recursive:true});
for(const [source,target] of [['node_modules/marked/lib/marked.umd.js','marked.umd.js'],['node_modules/dompurify/dist/purify.min.js','purify.min.js']])fs.copyFileSync(path.join(root,source),path.join(out,'vendor',target));
function publicFiles(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?publicFiles(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const file of publicFiles(path.join(out,'resources')).filter(f=>/\.(md|cpp|c|h|hpp)$/.test(f)))if(/chatgpt\.com\/(share|s)\/|C:\\Users\\/i.test(fs.readFileSync(file,'utf8')))throw Error('Learning material contains private source paths: '+path.basename(file));
for(const item of ['index.html','app.js','account.js','curriculum.js','algorithm-data.js','algorithm-state.js','algorithms.js','backend-data.js','backend-state.js','platform.js','materials.js','material-data.js']) {
 const text=fs.readFileSync(path.join(out,item),'utf8');
 if(/chatgpt\.com\/(share|s)\/|分享聊天|用户分享|C:\\Users\\/i.test(text)) throw Error('Public content contains private source information');
}
console.log('Public website prepared in dist/');
