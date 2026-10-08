const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
fs.mkdirSync(out, {recursive:true});
const allow = ['index.html','styles.css','app.js','curriculum.js','exercises','projects'];
for (const item of allow) fs.cpSync(path.join(root,item),path.join(out,item),{recursive:true,filter:p=>!p.includes('__pycache__')&&!p.endsWith('.pyc')});
fs.writeFileSync(path.join(out,'.nojekyll'),'');
for(const item of ['index.html','app.js','curriculum.js']) {
 const text=fs.readFileSync(path.join(out,item),'utf8');
 if(/chatgpt\.com\/(share|s)\/|分享聊天|用户分享|C:\\Users\\/i.test(text)) throw Error('Public content contains private source information');
}
console.log('Public website prepared in dist/');
