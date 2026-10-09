const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'resources','learning'),vault=path.join(root,'拾阶笔记库');
const notes='D:/Dino/my-blog/public/demo-materials/collections/leetcode/notes',cpp='D:/VScode_pm/C++_pm/C_lean/lean_c++';
const names={'database-design':['数据库设计案例','后端与数据库'],'git-commit-convention':['Git 提交规范','工程工具'],'git-guide':['Git 使用指南','工程工具'],'hash-table':['哈希表','算法与数据结构'],'learning-links':['学习链接','学习导航'],'loops':['循环与遍历','语言基础'],'modern-cpp':['现代 C++ 语法笔记','语言基础'],'prefix-sum':['前缀和','算法与数据结构'],'typora-guide':['Typora 使用指南','笔记工具']};
function write(file,text){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,text);}
function seed(file,text){write(path.join(root,'.wrangler','obsidian-seed','拾阶笔记库',path.relative(vault,file)),text);if(!fs.existsSync(file))write(file,text);}
function read(file){const bytes=fs.readFileSync(file);try{return new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{return new TextDecoder('gb18030',{fatal:true}).decode(bytes);}}
function clean(text){
 text=text.replace(/## 17\.2 适用场景[\s\S]*?(?=## 17\.3)/,'## 17.2 适用场景\n\n修正尚未被他人使用的远程提交时，可以在确认远程状态后使用 `--force-with-lease`。它仍会改写历史，团队共享分支应先协调。\n\n---\n\n');
 return text.replace(/!\[([^\]]*)\]\((C:\\Users\\[^)]+)\)/g,(_,alt,file)=>{if(!fs.existsSync(file))return `> 原笔记中的图片暂缺：${alt}`;const name=path.basename(file.replaceAll('\\','/'));fs.mkdirSync(path.join(out,'assets'),{recursive:true});fs.copyFileSync(file,path.join(out,'assets',name));seed(path.join(vault,'附件',name),fs.readFileSync(file));return `![${alt}](../assets/${name})`;});
}
const items=[];
for(const [id,[title,category]]of Object.entries(names)){
 const text=clean(read(path.join(notes,id+'.md'))),file='notes/'+id+'.md';write(path.join(out,file),text);
 const obsidianFile='01 学习资料/'+title+'.md';seed(path.join(vault,obsidianFile),`# ${title}\n\n> 分类：${category} · 原有学习资料整理，示例需结合自己的环境验证。\n\n`+text.replaceAll('../assets/','../附件/'));
 items.push({id,title,category,kind:'note',url:'resources/learning/'+file,obsidianFile});
}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const file of walk(cpp).filter(p=>/\.(cpp|c|h|hpp|md)$/.test(p)).sort()){
 const relative=path.relative(cpp,file).replaceAll('\\','/'),title=path.basename(file,path.extname(file)),category=relative.split('/')[0],text=clean(read(file)),id='cpp-'+items.length;
 write(path.join(out,'cpp',relative),text);
 const isNote=file.endsWith('.md'),obsidianFile='02 C++ 练习/'+relative.replace(/\.[^.]+$/,'.md');
 seed(path.join(vault,obsidianFile),isNote?text:`# ${title}\n\n> ${category} · 历史练习源码。部分程序用于演示错误或未定义行为，不代表生产实现。每个含 main 的文件应单独编译，不运行旧的 exe。\n\n## 源码\n\n\`\`\`cpp\n${text}\n\`\`\`\n\n## 我的复盘\n\n- 这个例子解释什么？\n- 输入边界与资源生命周期是什么？\n- 我能怎样改进和验证？\n`);
 items.push({id,title,category,kind:isNote?'note':'cpp',url:'resources/learning/cpp/'+relative,obsidianFile});
}
for(const u of require('../backend-data.js').BACKEND_UNITS)seed(path.join(vault,'03 C++ 课程',String(u.id).padStart(2,'0')+' '+u.title.replace(/[\\/:*?"<>|]/g,'')+'.md'),`# ${u.title}\n\n## 理解\n\n${u.concept}\n\n## 动手实践\n\n${u.practice}\n\n## 交付成果\n\n${u.deliverable}\n\n## 验收\n\n${u.checks.map(s=>'- [ ] '+s).join('\n')}\n\n[参考文档](${u.url})\n\n[网站课程](https://shijie-study.jean1412.workers.dev/#cpp-lessons?unit=${u.id})\n\n## 我的复盘\n`);
seed(path.join(vault,'00 开始这里.md'),'# 拾阶笔记库\n\n欢迎！Obsidian 把普通 Markdown 文件组织成笔记库，你的笔记就是这些文件。\n\n## 从这里开始\n\n1. 打开左边的文件目录，进入「01 学习资料」或「02 C++ 练习」。\n2. 进入「03 C++ 课程」，选择当前学习单元。\n3. 在「04 学习记录」写自己的复盘，资料内容可以继续修改。\n4. 网站的账号与备份页可将个人学习笔记送入此库。\n\n## 文件夹\n\n- 01 学习资料：Git、现代 C++、算法和数据库笔记。\n- 02 C++ 练习：历史源码的 Markdown 阅读页。\n- 03 C++ 课程：32 个实践单元与验收清单。\n- 04 学习记录：你的个人复盘。\n- 05 模板：复盘模板。\n- 附件：笔记图片。\n\n## 保存与同步\n\n文件编辑后会自动保存到电脑。Obsidian 本地笔记不会自动回传拾阶，拾阶的云进度仍由 GitHub 账号保存。跨设备使用此笔记库需另外配置文件同步或 Obsidian Sync；当前没有购买任何服务。请定期备份整个笔记库文件夹。\n\n[进入拾阶](https://shijie-study.jean1412.workers.dev/)\n');
fs.mkdirSync(path.join(vault,'04 学习记录'),{recursive:true});seed(path.join(vault,'05 模板','学习复盘.md'),'# 学习复盘\n\n日期：\n主题：\n\n## 我的理解\n\n## 代码或实验\n\n## 测试与边界\n\n## 遇到的问题\n\n## 下一步\n');
seed(path.join(vault,'.obsidian','app.json'),JSON.stringify({alwaysUpdateLinks:true,newFileLocation:'folder',newFileFolderPath:'04 学习记录',attachmentFolderPath:'附件'},null,2));
seed(path.join(vault,'.obsidian','core-plugins.json'),JSON.stringify(['file-explorer','search','quick-switcher','backlink','outgoing-link','tag-pane','page-preview','templates','command-palette','outline','word-count','bookmarks']));
write(path.join(root,'material-data.js'),"'use strict';\nconst LEARNING_MATERIALS="+JSON.stringify(items,null,2)+";\nif(typeof module!=='undefined')module.exports={LEARNING_MATERIALS};\n");
console.log(`整理完成：${items.length} 份资料；本地笔记库已准备。`);
