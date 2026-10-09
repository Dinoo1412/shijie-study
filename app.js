'use strict';
let KEY='shijie-study-v1';
const $=selector=>document.querySelector(selector);
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const localDay=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const defaultState=()=>({version:1,settings:{name:'学习者',startDate:localDay(),hours:2,days:6},lessons:{},projects:{},logs:[],lastLesson:1,timer:null,algorithms:algorithmDefaults(),backend:backendDefaults()});
let state=defaultState(),storageOK=true,storageLoadError=false;
try{const saved=localStorage.getItem(KEY);if(saved)state=validateBackup(JSON.parse(saved));}catch(error){storageOK=false;storageLoadError=true;}
let selectedLesson=state.lastLesson,lessonStage='all',lessonWeek='all',lessonStatus='all',lessonSearch='',noteSearch='',resourceSearch='';
let timerInterval,toastTimeout,noteTimeout;
const pageNames={dashboard:'学习总览',ai:'AI Agent 工作台','cpp-backend':'C++ 后端',roadmap:'AI 成长路线',lessons:'AI 每日课程',projects:'AI 实战项目',algorithms:'算法练习',notes:'AI 课程笔记',resources:'AI 资料书架',settings:'账号、设置与备份'};
function validateBackup(data){
  if(!data||data.version!==1||!data.settings||!data.lessons||!data.projects||!Array.isArray(data.logs))throw Error('不是有效的拾阶备份文件');
  const s=data.settings;
  const validDate=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
  if(typeof s.name!=='string'||s.name.length>50||!validDate(s.startDate)||![1,2,3].includes(s.hours)||!Number.isInteger(s.days)||s.days<1||s.days>7)throw Error('学习设置格式不正确');
  const clean=defaultState();clean.settings={name:s.name,startDate:s.startDate,hours:s.hours,days:s.days};
  for(const [key,entry]of Object.entries(data.lessons)){
    const lesson=LESSONS.find(l=>l.id===Number(key));if(!lesson||!entry||typeof entry.note!=='string'||entry.note.length>100000||!Array.isArray(entry.checks)||entry.checks.some(i=>!Number.isInteger(i)||i<0||i>=lesson.checks.length)||typeof entry.done!=='boolean')throw Error('课程记录格式不正确');
    if(entry.completedAt&&!validDate(entry.completedAt))throw Error('完成日期格式不正确');
    if(entry.done&&(new Set(entry.checks).size!==lesson.checks.length||!entry.completedAt))throw Error('已完成课程必须包含全部验收项和完成日期');
    clean.lessons[lesson.id]={note:entry.note,checks:[...new Set(entry.checks)],done:entry.done,completedAt:entry.completedAt||null};
  }
  for(const [key,checks]of Object.entries(data.projects)){
    const project=PROJECTS.find(p=>p.id===Number(key));if(!project||!Array.isArray(checks)||checks.some(i=>!Number.isInteger(i)||i<0||i>=project.checks.length))throw Error('项目记录格式不正确');
    clean.projects[project.id]=[...new Set(checks)];
  }
  clean.logs=data.logs.map(log=>{
    if(!log||!validDate(log.date)||!Number.isFinite(log.minutes)||log.minutes<=0||log.minutes>1440||!Number.isInteger(log.lesson)||log.lesson<1||log.lesson>364)throw Error('学习时间记录格式不正确');
    return {date:log.date,minutes:log.minutes,lesson:log.lesson};
  });
  clean.lastLesson=Number.isInteger(data.lastLesson)&&data.lastLesson>=1&&data.lastLesson<=364?data.lastLesson:1;
  if(data.timer&&Number.isFinite(data.timer.started)&&data.timer.started>0&&data.timer.started<=Date.now()+60000&&[15,25,45].includes(data.timer.duration)&&Number.isInteger(data.timer.lesson)&&data.timer.lesson>=1&&data.timer.lesson<=364)clean.timer={started:data.timer.started,duration:data.timer.duration,lesson:data.timer.lesson};
  clean.algorithms=validateAlgorithms(data.algorithms);
  clean.backend=validateBackend(data.backend);
  return clean;
}
function save(){
  if(storageLoadError){$('#save-state').textContent='● 原记录读取失败，请先到设置恢复';return false;}
  try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;$('#save-state').textContent='● 已在本机保存';if(typeof cloudSchedule==='function')cloudSchedule();return true;}
  catch(e){storageOK=false;$('#save-state').textContent='● 保存失败，请导出备份';toast('浏览器保存失败，请到设置导出备份。');return false;}
}
function record(id){return state.lessons[id]||{done:false,checks:[],note:'',completedAt:null};}
function mutableRecord(id){if(!state.lessons[id])state.lessons[id]=record(id);return state.lessons[id];}
const isDone=id=>record(id).done;
const doneCount=items=>items.filter(l=>isDone(l.id)).length;
const totalMinutes=()=>state.logs.reduce((sum,l)=>sum+l.minutes,0);
const minutesOn=date=>state.logs.filter(l=>l.date===date).reduce((sum,l)=>sum+l.minutes,0);
const firstPending=()=>LESSONS.find(l=>!isDone(l.id))||LESSONS[LESSONS.length-1];
const stageLessons=id=>LESSONS.filter(l=>l.stage===id);
function dateShift(date,days){const d=new Date(date+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10);}
function activityDays(){return new Set([...state.logs.map(l=>l.date),...Object.values(state.lessons).filter(l=>l.done&&l.completedAt).map(l=>l.completedAt)]);}
function streak(){const days=activityDays();let day=localDay(),count=0;if(!days.has(day))day=dateShift(day,-1);while(days.has(day)){count++;day=dateShift(day,-1);}return count;}
function toast(message){clearTimeout(toastTimeout);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimeout=setTimeout(()=>$('#toast').classList.remove('visible'),3000);}
function progress(done,total){return `<div class="progress"><span style="width:${Math.round(done/total*100)}%"></span></div>`;}
function heading(eyebrow,title,description,action=''){return `<div class="page-heading"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></div>${action}</div>`;}
function linkResource(id){const r=RESOURCES.find(r=>r.id===id);return r?`<a class="resource-link" href="${r.url}" target="_blank" rel="noopener noreferrer">${escapeHTML(r.name)} ↗</a>`:'';}
function goLesson(id){selectedLesson=id;state.lastLesson=id;save();if(location.hash==='#lessons')render();else location.hash='lessons';}
function flushNote(){if(noteTimeout){clearTimeout(noteTimeout);noteTimeout=null;save();}}
function render(){
  flushNote();const route=location.hash.slice(1).split('?')[0];const page=Object.hasOwn(pageNames,route)?route:'dashboard';
  const inAI=['ai','roadmap','lessons','projects','notes','resources'].includes(page);
  $('#page-label').textContent=(inAI&&page!=='ai'?'AI Agent / '+pageNames[page].replace(/^AI /,''):pageNames[page]);
  document.querySelectorAll('[data-nav]').forEach(a=>{const current=a.dataset.nav===page;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.querySelectorAll('[data-section]').forEach(section=>section.classList.toggle('section-current',section.dataset.section===(inAI?'ai':page==='cpp-backend'?'cpp':page==='algorithms'?'algorithms':'')));
  if(page==='algorithms'&&typeof algorithmTab!=='undefined'){const tab=new URLSearchParams(location.hash.split('?')[1]||'').get('tab');if(['collections','train','language','method'].includes(tab))algorithmTab=tab;}
  $('#focus-open').hidden=['algorithms','cpp-backend','dashboard'].includes(page);
  $('#main').innerHTML=({dashboard:()=>typeof learningPortal==='function'?learningPortal():'正在加载学习总览…',ai:dashboard,'cpp-backend':()=>typeof backendPage==='function'?backendPage():'正在加载后端课程…',roadmap:roadmap,lessons:lessons,projects:projects,algorithms:()=>typeof algorithms==='function'?algorithms():'正在加载算法专题…',notes:notes,resources:resources,settings:settings}[page])();
  bindPage(page);
}
function dashboard(){
  const next=firstPending(),week=WEEKS[next.week-1],completed=doneCount(LESSONS),todayMinutes=minutesOn(localDay());
  const phase=STAGES[next.stage-1],phaseItems=stageLessons(phase.id);
  const weekly=LESSONS.filter(l=>l.week===next.week);
  const days=Array.from({length:7},(_,i)=>dateShift(localDay(),i-6));const max=Math.max(60,...days.map(minutesOn));
  const hourParts=state.settings.hours===1?[15,35,10]:state.settings.hours===2?[30,70,20]:[40,110,30];
  return heading('SMALL STEPS, REAL PROGRESS',`${escapeHTML(state.settings.name)}，今天也向前一步。`,'从理解一个概念，到写出一段代码。让每一天的学习都有落点。',`<a class="button" href="#roadmap">查看完整路线 ↗</a>`)+
  `${!storageOK?'<div class="callout" style="margin-bottom:20px">浏览器记录暂时无法读取或保存。请到学习设置检查并导出备份。</div>':''}
  <section class="hero"><div><span class="eyebrow">${phase.months} / WEEK ${String(next.week).padStart(2,'0')}</span><h2>${escapeHTML(week.title)}，从这里开始。</h2><p>下一课 · Day ${String(next.id).padStart(2,'0')} ${escapeHTML(next.title)}<br>${escapeHTML(week.deliverable)}。循序渐进，把基础变成自己的能力。</p><button class="button" data-lesson="${next.id}">${completed===364?'回顾最后一课':'继续学习'} <span>→</span></button></div><div class="hero-art" aria-hidden="true"><span>↗</span><i class="step"></i><i class="step"></i><i class="step"></i><i class="step"></i></div></section>
  <div class="stats"><div class="stat"><span class="label">完成课程</span><span class="value">${completed}<small>/ 364</small></span><span class="small">每一课都留下验收证据</span></div><div class="stat"><span class="label">累计投入</span><span class="value">${(totalMinutes()/60).toFixed(1)}<small>小时</small></span><span class="small">今天 ${todayMinutes.toFixed(0)} 分钟</span></div><div class="stat"><span class="label">连续学习</span><span class="value">${streak()}<small>天</small></span><span class="small">按完成课程或学习记录计算</span></div><div class="stat"><span class="label">当前阶段进度</span><span class="value">${Math.round(doneCount(phaseItems)/phaseItems.length*100)}<small>%</small></span><span class="small">${phase.months} · 共 ${phaseItems.length} 课</span></div></div>
  <div class="grid-main"><div><section class="panel"><div class="section-head"><h2>这周，学一点也做一点</h2><span class="tag">${doneCount(weekly)} / 7 已完成</span></div>${weekly.map(l=>`<div class="task-row ${isDone(l.id)?'done':''} ${l.id===next.id?'current':''}"><div class="task-dot">${isDone(l.id)?'✓':String((l.id-1)%7+1).padStart(2,'0')}</div><div class="task-name"><strong>${escapeHTML(l.title)}</strong><small>Day ${l.id} · ${l.detailed?'讲解 / 示例 / 练习':'实操任务 / 资料 / 验收'}</small></div><button class="button compact" data-lesson="${l.id}">${isDone(l.id)?'复习':'学习 →'}</button></div>`).join('')}</section><div class="callout"><strong>先会解释，再独立实现。</strong><p>今天的验收问题：${escapeHTML(next.question)}<br>完成后在笔记里写下你自己的答案。</p></div></div>
  <div><section class="panel"><div class="section-head"><h2>最近七天</h2><span class="tiny">MINUTES</span></div><span class="muted small">每一段专注，都看得见。</span><div class="week-chart">${days.map(date=>`<div class="bar-col ${date===localDay()?'today':''}"><small>${minutesOn(date)?minutesOn(date).toFixed(0)+'m':''}</small><div class="bar-track"><div class="bar" style="height:${Math.max(3,minutesOn(date)/max*86)}px"></div></div>${date.slice(5).replace('-','/')}</div>`).join('')}</div><a class="pill-link" href="#settings">查看计划与记录设置 →</a></section>
  <section class="panel"><span class="eyebrow">YOUR DAILY RHYTHM</span><h3>给 ${state.settings.hours} 小时一个清晰的安排</h3><div class="mini-timeline">${['理解新知识','动手写代码','复盘与笔记'].map((label,i)=>`<div><span>${hourParts[i]} min</span><i><b style="width:${hourParts[i]/(state.settings.hours*60)*100}%"></b></i><small>${label}</small></div>`).join('')}</div><p class="muted small">建议每周学 ${state.settings.days} 天。休息和补课也属于计划的一部分。</p></section>
  <section class="panel"><div class="section-head"><h3>阶段里程碑</h3><span class="tag orange">${phase.months}</span></div><p class="muted small">${phase.gate}</p>${progress(doneCount(phaseItems),phaseItems.length)}<a class="pill-link" href="#projects">看看未来的作品 →</a></section></div></div>`;
}
function roadmap(){return heading('THE PATH AHEAD','从第一行代码，到一个完整系统。','面向零基础学习者，按 52 周组织。进度以掌握程度为准，可自由延长。')+STAGES.map(s=>{
  const items=stageLessons(s.id),done=doneCount(items);
  return `<article class="road-card"><div class="road-number">${String(s.id).padStart(2,'0')}</div><div><span class="eyebrow">${s.months} · WEEK ${s.range[0]}—${s.range[1]}</span><h3>${s.title}</h3><p>${s.desc}</p>${s.tags.map(t=>`<span class="tag">${t}</span>`).join('')}<details class="small" style="margin-top:14px"><summary>阶段验收标准</summary><p>${s.gate}</p></details></div><div class="road-right"><div class="muted">${done} / ${items.length} 课</div>${progress(done,items.length)}<button class="button compact" data-stage="${s.id}">进入这一阶段 →</button></div></article>`;
}).join('')+`<div class="callout"><strong>学习周期会随投入时间变化。</strong><p>这是一条从零基础出发的实践路线，不是入职保证。第一月提供完整入门课，后续按周提供实操指引。推荐把源码和每周复盘保存在 exercises 中。</p></div>`;}
function filteredLessons(){return LESSONS.filter(l=>(lessonStage==='all'||l.stage===Number(lessonStage))&&(lessonWeek==='all'||l.week===Number(lessonWeek))&&(lessonStatus==='all'||(lessonStatus==='done'?isDone(l.id):!isDone(l.id)))&&(`${l.title} ${l.exercise} ${l.id} ${WEEKS[l.week-1].title}`.toLowerCase().includes(lessonSearch.toLowerCase())));}
function lessons(){
  const list=filteredLessons();if(list.length&&!list.some(l=>l.id===selectedLesson))selectedLesson=list[0].id;
  const lesson=LESSONS[selectedLesson-1],r=record(lesson.id);
  return heading('LEARN / BUILD / REFLECT','今天，认真学好这一课。','第一月循序讲解；后续用实践任务与资料把知识变成独立作品。')+
  `<div class="filters"><input type="search" id="lesson-search" value="${escapeHTML(lessonSearch)}" placeholder="搜索课程、知识点或 Day 编号" aria-label="搜索课程"><select id="stage-filter" aria-label="筛选阶段"><option value="all">所有阶段</option>${STAGES.map(s=>`<option value="${s.id}" ${lessonStage===String(s.id)?'selected':''}>${s.months} · ${s.tags[0]}</option>`).join('')}</select><select id="week-filter" aria-label="筛选周"><option value="all">所有周</option>${WEEKS.filter(w=>lessonStage==='all'||w.stage===Number(lessonStage)).map(w=>`<option value="${w.id}" ${lessonWeek===String(w.id)?'selected':''}>第 ${w.id} 周 · ${escapeHTML(w.title)}</option>`).join('')}</select><select id="status-filter" aria-label="完成状态"><option value="all">全部状态</option><option value="pending" ${lessonStatus==='pending'?'selected':''}>未完成</option><option value="done" ${lessonStatus==='done'?'selected':''}>已完成</option></select></div>
  ${list.length?`<div class="lesson-layout"><aside class="lesson-list" aria-label="课程列表">${list.map(l=>`<button class="lesson-item ${l.id===selectedLesson?'active':''}" data-lesson="${l.id}" ${l.id===selectedLesson?'aria-current="true"':''}><span>DAY ${String(l.id).padStart(2,'0')} · 第 ${l.week} 周 ${isDone(l.id)?'✓':''}</span><strong>${escapeHTML(l.title)}</strong></button>`).join('')}</aside><article class="panel lesson-detail"><div class="lesson-title"><div><span class="eyebrow">DAY ${lesson.id} / WEEK ${lesson.week}</span><h2>${escapeHTML(lesson.title)}</h2></div><span class="tag">${lesson.detailed?'入门详解':'实践指引'}</span></div><div class="callout"><strong>这周的目标</strong><p>${escapeHTML(WEEKS[lesson.week-1].deliverable)}</p></div>
  <section class="lesson-section"><h3>01 / 理解这个概念</h3><p>${escapeHTML(lesson.explanation)}</p>${lesson.id===1?'<ol><li>下载练习文件，在保存文件的文件夹中打开终端，运行 python --version。已有 Python 3 时可继续。</li><li>若尚未安装，从下方官方入口安装 Python，并在安装时选择加入 PATH。</li><li>用编辑器打开下载的 day01.py，阅读其中的示例。</li><li>运行 python day01.py；程序会等待你输入姓名。</li><li>修改程序、保存，再次运行，观察输出变化。</li></ol>':''}${lesson.example?`<div class="code-box"><button class="copy" id="copy-code">复制</button><pre><code>${escapeHTML(lesson.example)}</code></pre></div>`:''}</section>
  <section class="lesson-section"><h3>02 / 把它写出来</h3><p>${escapeHTML(lesson.exercise)}</p><p style="margin-top:10px">练习位置：<code>exercises/week${String(lesson.week).padStart(2,'0')}/${lesson.id<=28?'day'+String((lesson.id-1)%7+1).padStart(2,'0')+'.py':'README.md'}</code></p><div class="button-row"><a class="button" href="exercises/week${String(lesson.week).padStart(2,'0')}/${lesson.id<=28?'day'+String((lesson.id-1)%7+1).padStart(2,'0')+'.py':'README.md'}" download>下载本课练习 ↓</a><a class="button" href="exercises/week${String(lesson.week).padStart(2,'0')}/README.md" target="_blank" rel="noopener">查看本周任务 ↗</a></div><details><summary>卡住时，先看提示</summary><p>${escapeHTML(lesson.hint)}</p></details></section>
  <section class="lesson-section"><h3>03 / 验收你的成果</h3>${lesson.checks.map((check,i)=>`<label class="check-row"><input type="checkbox" data-check="${i}" ${r.checks.includes(i)?'checked':''}><span>${escapeHTML(check)}</span></label>`).join('')}<button class="button ${r.done?'':'primary'}" id="complete-lesson" ${!r.done&&r.checks.length!==lesson.checks.length?'disabled':''}>${r.done?'✓ 已完成 · 撤销完成':'标记本课完成'}</button><p class="note-help">先勾选全部验收项，再标记完成。课程完成与学习时长分别记录。</p></section>
  <section class="lesson-section"><h3>04 / 用自己的话说一遍</h3><p>${escapeHTML(lesson.question)}</p><details><summary>查看参考思路</summary><p>${escapeHTML(lesson.answer)}</p></details></section>
  <section class="lesson-section"><h3>学习资料</h3>${linkResource(lesson.resource)}${lesson.id===1?linkResource('vscode'):''}</section>
  <section class="note-editor"><div class="split"><h3>我的学习笔记</h3><span class="muted small" id="note-status">${r.note?'已保存':'自动保存'}</span></div><textarea id="lesson-note" maxlength="100000" aria-label="本课学习笔记" placeholder="用自己的话解释知识点…&#10;今天的代码 / 测试结果…&#10;遇到的错误与解决过程…&#10;还不确定的问题…">${escapeHTML(r.note)}</textarea><div class="study-log"><label for="manual-minutes" class="small">记录学习</label><input type="number" id="manual-minutes" min="1" max="720" value="30" aria-label="学习分钟数"><span class="small muted">分钟</span><button class="button compact" id="log-minutes">记入今天</button><span class="small muted">本课累计 ${state.logs.filter(log=>log.lesson===lesson.id).reduce((s,l)=>s+l.minutes,0).toFixed(0)} 分钟</span></div></section>
  <div class="split" style="margin-top:30px"><button class="button compact" data-lesson="${Math.max(1,lesson.id-1)}" ${lesson.id===1?'disabled':''}>← 上一课</button><button class="button compact" data-lesson="${Math.min(364,lesson.id+1)}" ${lesson.id===364?'disabled':''}>下一课 →</button></div></article></div>`:'<div class="panel empty">没有符合条件的课程。试试其他关键词或筛选条件。</div>'}`;
}
function projects(){return heading('BUILD SOMETHING THAT WORKS','把所学，变成四个真实作品。','这里记录作品验收进度。先打牢基础，再分阶段开发，每一项都用实际运行结果证明。')+`<div class="project-grid">${PROJECTS.map(p=>{
  const checks=state.projects[p.id]||[];return `<article class="panel project-card"><div class="project-num">PROJECT 0${p.id} / ${p.weeks}</div><h2>${p.title}</h2><p>${p.desc}</p><div class="project-stack">${p.stack}</div>${p.checks.map((text,i)=>`<label class="check-row"><input type="checkbox" data-project="${p.id}" data-project-check="${i}" ${checks.includes(i)?'checked':''}><span>${text}</span></label>`).join('')}${progress(checks.length,p.checks.length)}<div class="split"><span class="muted small">${checks.length} / ${p.checks.length} 已验收</span><button class="button compact" data-stage="${p.stage}">学习相关课程 →</button></div></article>`;
}).join('')}</div><div class="callout"><strong>项目目录已为你预留。</strong><p>在 projects 中保存自己的代码。每个项目都有需求与验收说明；这些是等待你实践的作品，不是预先完成的业务系统。</p></div>`;}
function notes(){const entries=LESSONS.filter(l=>record(l.id).note.trim()&&`${l.title} ${record(l.id).note}`.toLowerCase().includes(noteSearch.toLowerCase()));return heading('THINK IN YOUR OWN WORDS','把理解，留下来。','笔记来自每一课的自动保存内容。记录问题、实验与复盘，让下一次学习有迹可循。',`<button class="button" id="export-notes">导出笔记 Markdown ↓</button>`)+`<div class="filters"><input type="search" id="note-search" aria-label="搜索笔记" placeholder="搜索笔记内容或课程名称" value="${escapeHTML(noteSearch)}"></div><div class="notebook">${entries.length?entries.map(l=>`<article class="panel note-card"><div class="section-head"><span class="eyebrow">DAY ${l.id} / ${escapeHTML(WEEKS[l.week-1].title)}</span><button class="button compact" data-lesson="${l.id}">继续编辑 ↗</button></div><h3>${escapeHTML(l.title)}</h3><p>${escapeHTML(record(l.id).note)}</p></article>`).join(''):'<div class="panel empty">'+(noteSearch?'没有找到相关笔记。':'还没有笔记。从每日课程中写下你的第一个理解，内容会出现在这里。')+'</div>'}</div>`;}
function resources(){const list=RESOURCES.filter(r=>`${r.name} ${r.category} ${r.desc}`.toLowerCase().includes(resourceSearch.toLowerCase()));return heading('A SMALL, USEFUL LIBRARY','需要的时候，找到可靠的资料。','以官方文档为主，按当前阶段查阅。资料需要联网，课程和记录可以离线使用。')+`<div class="filters"><input type="search" id="resource-search" value="${escapeHTML(resourceSearch)}" aria-label="搜索学习资料" placeholder="搜索 Python、后端、RAG、Agent…"></div><div class="shelf">${list.length?list.map(r=>`<article class="panel resource-card"><span class="tag">${r.category}</span><h3>${r.name}</h3><p>${r.desc}</p><a href="${r.url}" target="_blank" rel="noopener noreferrer">打开官方资料 ↗</a></article>`).join(''):'<div class="empty">没有找到相关资料。</div>'}</div>`;}
function settings(){
  const s=state.settings,days=Array.from({length:182},(_,i)=>dateShift(localDay(),i-181)),endDate=dateShift(s.startDate,Math.ceil(364/s.days)*7-1);
  return heading('MAKE IT YOUR OWN','按自己的节奏，稳稳向前。','登录后进度跟随账号；未登录时保存在当前浏览器。')+(typeof accountPanel==='function'?accountPanel():'')+`<div class="settings-grid"><section class="panel"><h2>我的学习计划</h2><form id="settings-form"><label class="field">怎么称呼你<input id="setting-name" maxlength="50" value="${escapeHTML(s.name)}" required></label><label class="field">计划开始日期<input type="date" id="setting-start" value="${s.startDate}" required></label><label class="field">每天的投入<select id="setting-hours">${[1,2,3].map(h=>`<option value="${h}" ${s.hours===h?'selected':''}>${h} 小时</option>`).join('')}</select></label><label class="field">每周学习天数<select id="setting-days">${[1,2,3,4,5,6,7].map(d=>`<option value="${d}" ${s.days===d?'selected':''}>${d} 天</option>`).join('')}</select><small>每个学习日安排一课。原路线为全周学习；加入休息日后完成日期会顺延。</small></label><div class="callout" style="margin:20px 0">当前计划每周 ${s.hours*s.days} 小时，完成 364 课约需 ${Math.ceil(364/s.days)} 周。<p>按计划约在 ${endDate} 完成，仅供排期参考。遇到困难时可放慢速度。</p></div><button class="button primary" type="submit">保存学习计划</button></form></section>
  <div><section class="panel"><h2>备份，让努力留下来</h2><p class="muted small" style="margin:12px 0 20px">完整备份包含 AI 课程、C++ 后端验收与笔记、算法题目与复盘、时间记录和学习设置。导入会先验证，再由你确认替换。</p><div class="button-row"><button class="button primary" id="export-backup">导出完整备份 ↓</button><button class="button" id="import-backup">导入备份 ↑</button></div><input hidden type="file" id="import-file" accept=".json,application/json"><p id="import-result" class="small" style="margin-top:15px" role="status"></p>${storageLoadError?'<p class="small" style="margin-top:12px">原记录未能读取，为避免覆盖已暂停自动保存。可导入有效备份，或先导出原始记录后重新初始化。</p><div class="button-row" style="margin-top:12px"><button class="button" id="export-raw">导出原始记录</button><button class="button" id="recover-storage">重新初始化保存</button></div>':''}<p class="note-help">备份只下载到本机。请定期保存到自己的备份位置。</p></section>
  <section class="panel"><div class="section-head"><h3>过去半年的足迹</h3><span class="muted small">${activityDays().size} 个学习日</span></div><div class="habit-grid">${days.map(date=>{const minutes=minutesOn(date),active=activityDays().has(date);return `<div class="habit-cell ${minutes>=120?'level3':minutes>=30?'level2':active?'level1':''}" title="${date} · ${minutes.toFixed(0)} 分钟${active?' · 有学习活动':''}" role="img" aria-label="${date}，${minutes.toFixed(0)} 分钟"></div>`;}).join('')}</div><p class="muted small">完成课程或记录学习时间都会留下足迹。时间统计使用北京时间。</p></section><section class="panel"><h3>使用说明</h3><p class="muted small" style="margin-top:10px">打开网站即可学习。GitHub 登录后自动同步；未登录或离线修改保存在浏览器中，请定期备份。Python 练习需在电脑终端运行；页面不会执行任意 Python 代码。</p></section></div></div>`;
}
function keepInputSearch(selector,setter){$(selector)?.addEventListener('input',e=>{const value=e.target.value,position=e.target.selectionStart;setter(value);render();const input=$(selector);input.focus();if(position!==null)input.setSelectionRange(position,position);});}
function bindPage(page){
  if(typeof bindAccount==='function')bindAccount();
  if(page==='algorithms'&&typeof bindAlgorithms==='function')bindAlgorithms();
  if(page==='cpp-backend'&&typeof bindBackend==='function')bindBackend();
  document.querySelectorAll('[data-lesson]').forEach(b=>b.addEventListener('click',()=>{if(page==='lessons'&&!filteredLessons().some(l=>l.id===Number(b.dataset.lesson))){lessonStage='all';lessonWeek='all';lessonStatus='all';lessonSearch='';}goLesson(Number(b.dataset.lesson));}));
  document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>{lessonStage=b.dataset.stage;lessonWeek='all';lessonStatus='all';lessonSearch='';goLesson(stageLessons(Number(lessonStage)).find(l=>!isDone(l.id))?.id||stageLessons(Number(lessonStage))[0].id);}));
  if(page==='lessons'){
    keepInputSearch('#lesson-search',v=>lessonSearch=v);
    $('#stage-filter').addEventListener('change',e=>{lessonStage=e.target.value;lessonWeek='all';render();});
    $('#week-filter').addEventListener('change',e=>{lessonWeek=e.target.value;render();});
    $('#status-filter').addEventListener('change',e=>{lessonStatus=e.target.value;render();});
    document.querySelectorAll('[data-check]').forEach(input=>input.addEventListener('change',()=>{const r=mutableRecord(selectedLesson),i=Number(input.dataset.check);r.checks=input.checked?[...new Set([...r.checks,i])]:r.checks.filter(n=>n!==i);if(!input.checked){r.done=false;r.completedAt=null;}save();const button=$('#complete-lesson');button.disabled=!r.done&&r.checks.length!==LESSONS[selectedLesson-1].checks.length;button.textContent=r.done?'✓ 已完成 · 撤销完成':'标记本课完成';button.classList.toggle('primary',!r.done);}));
    $('#complete-lesson')?.addEventListener('click',()=>{const r=mutableRecord(selectedLesson);r.done=!r.done;r.completedAt=r.done?localDay():null;save();toast(r.done?'这一课完成了，继续稳稳向前。':'已撤销本课完成状态。');render();});
    $('#lesson-note')?.addEventListener('input',e=>{mutableRecord(selectedLesson).note=e.target.value;$('#note-status').textContent='保存中…';clearTimeout(noteTimeout);noteTimeout=setTimeout(()=>{noteTimeout=null;const ok=save();if($('#note-status'))$('#note-status').textContent=ok?'已保存':'未保存 · 请导出备份';},400);});
    $('#copy-code')?.addEventListener('click',()=>copyText(LESSONS[selectedLesson-1].example));
    $('#log-minutes')?.addEventListener('click',()=>{const minutes=Number($('#manual-minutes').value);if(!Number.isInteger(minutes)||minutes<1||minutes>720){toast('请输入 1–720 之间的整数分钟数。');return;}addLog(minutes,selectedLesson);render();});
  }
  if(page==='projects')document.querySelectorAll('[data-project]').forEach(input=>input.addEventListener('change',()=>{const id=input.dataset.project,i=Number(input.dataset.projectCheck),checks=state.projects[id]||[];state.projects[id]=input.checked?[...new Set([...checks,i])]:checks.filter(n=>n!==i);save();render();}));
  if(page==='notes'){keepInputSearch('#note-search',v=>noteSearch=v);$('#export-notes').addEventListener('click',()=>{const text='# 拾阶学习笔记\n\n'+LESSONS.filter(l=>record(l.id).note.trim()).map(l=>`## Day ${l.id} · ${l.title}\n\n${record(l.id).note}\n`).join('\n');download('拾阶学习笔记-'+localDay()+'.md',text,'text/markdown');});}
  if(page==='resources')keepInputSearch('#resource-search',v=>resourceSearch=v);
  if(page==='settings'){
    $('#settings-form').addEventListener('submit',e=>{e.preventDefault();state.settings={name:$('#setting-name').value.trim()||'学习者',startDate:$('#setting-start').value,hours:Number($('#setting-hours').value),days:Number($('#setting-days').value)};save();render();toast('学习计划已更新。');});
    $('#export-backup').addEventListener('click',exportBackup);
    $('#import-backup').addEventListener('click',()=>$('#import-file').click());$('#import-file').addEventListener('change',importBackup);
    $('#export-raw')?.addEventListener('click',()=>{try{download('拾阶原始记录-'+localDay()+'.txt',localStorage.getItem(KEY)||'无原始记录','text/plain');}catch(e){toast('当前浏览器禁止读取原始记录。');}});
    $('#recover-storage')?.addEventListener('click',()=>{if(confirm('请先导出原始记录。重新初始化会覆盖当前浏览器中无法读取的原记录。确认继续？')){storageLoadError=false;save();render();}});
  }
}
function download(name,content,type){flushNote();const blob=new Blob([content],{type:type+';charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
function exportBackup(){flushNote();download('拾阶完整备份-'+localDay()+'.json',JSON.stringify(state,null,2),'application/json');toast('备份已导出，包含进度、笔记和学习记录。');}
async function importBackup(event){
  const file=event.target.files[0];if(!file)return;
  try{if(file.size>10*1024*1024)throw Error('备份不能超过 10 MB');const imported=validateBackup(JSON.parse(await file.text()));
    if(!confirm(`备份中有 ${Object.values(imported.lessons).filter(l=>l.done).length} 课完成、${Object.values(imported.lessons).filter(l=>l.note).length} 篇课程笔记、${Object.keys(imported.algorithms.records).length} 条刷题记录。导入会替换当前全部记录（包括算法专题），建议先导出当前备份。确认导入？`))return;
    // 先把有效数据持久化成功，再替换内存，避免失败时丢失当前记录。
    const serialized=JSON.stringify(imported);localStorage.setItem(KEY,serialized);clearTimeout(noteTimeout);noteTimeout=null;state=imported;selectedLesson=state.lastLesson;storageOK=true;storageLoadError=false;syncTimer();save();render();toast('备份已恢复。');
  }catch(error){$('#import-result').textContent='导入失败：'+error.message;}finally{if($('#import-file'))$('#import-file').value='';}
}
async function copyText(text){try{await navigator.clipboard.writeText(text);toast('代码已复制。');}catch(error){const textarea=document.createElement('textarea');textarea.value=text;textarea.style.position='fixed';textarea.style.left='-9999px';document.body.append(textarea);textarea.select();const ok=document.execCommand('copy');textarea.remove();toast(ok?'代码已复制。':'复制不可用，请直接选择示例文字。');}}
function addLog(minutes,lesson,date=localDay()){state.logs.push({date,minutes,lesson});save();toast(`已记录 ${minutes} 分钟学习。`);}
function updateTimer(){
  const t=state.timer;if(!t){$('#timer-display').textContent=$('#focus-duration').value+':00';return;}
  const elapsed=Math.max(0,Math.floor((Date.now()-t.started)/1000)),remaining=t.duration*60-elapsed;
  if(remaining<=0){finishTimer(true);return;}
  $('#timer-display').textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');
}
function syncTimer(){clearInterval(timerInterval);const running=!!state.timer;$('#timer-start').disabled=running;$('#focus-duration').disabled=running;$('#timer-stop').disabled=!running;if(running){$('#focus-duration').value=String(state.timer.duration);$('#focus-task').textContent='Day '+state.timer.lesson+' · '+LESSONS[state.timer.lesson-1].title;timerInterval=setInterval(updateTimer,1000);}updateTimer();}
function finishTimer(complete=false){
  const timer=state.timer;if(!timer)return;clearInterval(timerInterval);const minutes=complete?timer.duration:Math.floor(Math.min(timer.duration*60000,Math.max(0,Date.now()-timer.started))/60000);
  state.timer=null;
  if(minutes>0){const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(timer.started));state.logs.push({date,minutes,lesson:timer.lesson});save();toast(`已记录 ${minutes} 分钟${complete?'，休息一下吧。':'。'}`);}else{save();toast('不足一分钟，本次未计入学习时间。');}
  syncTimer();render();
}
$('#today-date').textContent=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',month:'long',day:'numeric',weekday:'long'}).format(new Date());
$('#focus-open').addEventListener('click',()=>{if(!state.timer){const lesson=location.hash==='#lessons'?LESSONS[selectedLesson-1]:firstPending();$('#focus-task').textContent='Day '+lesson.id+' · '+lesson.title;}syncTimer();$('#focus-dialog').showModal();});
$('#focus-close').addEventListener('click',()=>$('#focus-dialog').close());
$('#focus-duration').addEventListener('change',updateTimer);
$('#timer-start').addEventListener('click',()=>{const lesson=location.hash==='#lessons'?selectedLesson:firstPending().id;state.timer={started:Date.now(),duration:Number($('#focus-duration').value),lesson};save();syncTimer();});
$('#timer-stop').addEventListener('click',()=>finishTimer(false));
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);});
window.addEventListener('beforeunload',flushNote);
window.addEventListener('storage',event=>{if(event.key===KEY)toast('另一页面修改了记录。请关闭重复页面，再刷新当前页面。');});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')updateTimer();else flushNote();});
render();syncTimer();if(storageLoadError)$('#save-state').textContent='● 记录读取失败，请到设置恢复';
