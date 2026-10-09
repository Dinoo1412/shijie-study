const {LESSONS,PROJECTS}=require('../curriculum.js');
const {algorithmDefaults,validateAlgorithms}=require('../algorithm-state.js');
const {backendDefaults,validateBackend}=require('../backend-state.js');
const defaultState=()=>({version:1,settings:{},lessons:{},projects:{},logs:[],lastLesson:1,timer:null,algorithms:algorithmDefaults(),backend:backendDefaults()});
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
module.exports={validateBackup};
