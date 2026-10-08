// Generate learning folders once; existing exercises are never overwritten.
const fs = require('node:fs');
const path = require('node:path');
const {WEEKS,LESSONS,PROJECTS} = require('../curriculum.js');
const root = path.resolve(__dirname,'..');
function put(relative,text){const file=path.join(root,relative);fs.mkdirSync(path.dirname(file),{recursive:true});if(!fs.existsSync(file))fs.writeFileSync(file,text,'utf8');}
for(const week of WEEKS){
  const folder=`exercises/week${String(week.id).padStart(2,'0')}`;
  const lessons=LESSONS.filter(l=>l.week===week.id);
  put(`${folder}/README.md`,`# 第 ${week.id} 周 · ${week.title}\n\n目标：${week.deliverable}\n\n`+lessons.map(l=>`## Day ${l.id} · ${l.title}\n\n${l.exercise}\n\n${l.checks.map(c=>'- [ ] '+c).join('\n')}\n\n`).join('')+'## 本周复盘\n\n- 学到了什么：\n- 代码运行与实际测试结果：\n- 错误与解决过程：\n- 仍未掌握：\n- 下周要做的修正：\n');
  if(week.id<=4)for(const lesson of lessons){
    const text=lesson.example.startsWith('# 在终端')||lesson.id===27?'# 终端操作说明请查看课程页，本文件用于记录你的实验。\n':lesson.example;
    put(`${folder}/day${String((lesson.id-1)%7+1).padStart(2,'0')}.py`,`# Day ${lesson.id} · ${lesson.title}\n# ${lesson.exercise}\n# 先运行示例，再独立完成任务。\n\n${text}\n\n# TODO: 在这里完成自己的练习，记录测试输入和实际结果。\n`);
  }
}
for(const project of PROJECTS)put(`projects/0${project.id}-${['task-manager','ai-chat','rag-knowledge','agent-office'][project.id-1]}/README.md`,`# ${project.title}\n\n${project.weeks}\n\n${project.desc}\n\n技术栈：${project.stack}\n\n## 验收要求\n\n${project.checks.map(c=>'- [ ] '+c).join('\n')}\n\n## 开发与交付\n\n1. 先明确数据模型与接口。\n2. 实现最小可运行版本。\n3. 用实际测试覆盖正常、边界和失败路径。\n4. 记录部署步骤、已知限制与故障恢复方法。\n5. 用自己的语言讲清设计选择和指标。\n\n此目录为学习项目预留，业务代码需要在对应阶段逐步完成。\n`);
console.log(`已准备 ${WEEKS.length} 个周目录、28 个练习起始文件和 ${PROJECTS.length} 个阶段项目目录。`);
