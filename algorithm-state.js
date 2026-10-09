'use strict';
const algorithmCatalog=typeof module!=='undefined'?require('./algorithm-data.js'):{ALGORITHM_PROBLEMS,CPP_MODULES,ALGORITHM_COLLECTIONS};
const algorithmDefaults=()=>({schema:2,records:{},customProblems:[],cppChecks:[]});
function validateAlgorithms(data){
  const clean=algorithmDefaults();if(data===undefined)return clean;
  if(!data||!data.records||typeof data.records!=='object'||Array.isArray(data.records)||!Array.isArray(data.cppChecks))throw Error('算法专题记录格式不正确');
  const legacy=data.schema===undefined;
  if(legacy&&!['python','cpp'].includes(data.language)||!legacy&&data.schema!==2)throw Error('算法专题版本不正确');
  if(data.cppChecks.some(i=>!Number.isInteger(i)||i<0||i>=algorithmCatalog.CPP_MODULES.length))throw Error('C++ 学习记录格式不正确');
  clean.cppChecks=[...new Set(data.cppChecks)];
  if(!legacy){
    if(!Array.isArray(data.customProblems)||data.customProblems.length>10000)throw Error('个人题目格式不正确');
    const ids=new Set();
    for(const p of data.customProblems){
      if(!p||!Number.isInteger(p.id)||p.id<1||p.id>999999||ids.has(p.id)||algorithmCatalog.ALGORITHM_PROBLEMS.some(x=>x.id===p.id)||typeof p.title!=='string'||!p.title.trim()||p.title.length>120||typeof p.url!=='string'||!/^https:\/\/leetcode\.cn\/problems\/[a-z0-9-]+\/$/.test(p.url)||!algorithmCatalog.ALGORITHM_COLLECTIONS.some(c=>c.id===p.collection))throw Error('个人题目格式不正确');
      ids.add(p.id);clean.customProblems.push({id:p.id,title:p.title.trim(),url:p.url,collection:p.collection});
    }
  }
  const validDate=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(Date.parse(d))&&new Date(d+'T00:00:00Z').toISOString().slice(0,10)===d;
  for(const [key,r]of Object.entries(data.records)){
    const match=(legacy?/^(python|cpp):([1-9]\d*)$/:/^([1-9]\d*)$/).exec(key),id=match?Number(match[legacy?2:1]):0;
    if(!id||!algorithmCatalog.ALGORITHM_PROBLEMS.some(p=>p.id===id)&&!clean.customProblems.some(p=>p.id===id)||!r||!['todo','attempted','ac','mastered'].includes(r.status)||typeof r.note!=='string'||r.note.length>(legacy?20000:50000)||!Number.isInteger(r.reviews)||r.reviews<0||r.reviews>10000||r.lastPracticed!==null&&!validDate(r.lastPracticed)||r.nextReview!==null&&!validDate(r.nextReview))throw Error('刷题记录格式不正确');
    if(['ac','mastered'].includes(r.status)&&!r.lastPracticed)throw Error('已通过题目需要练习日期');
    const item={status:r.status,note:r.note,reviews:r.reviews,lastPracticed:r.lastPracticed,nextReview:r.nextReview},previous=clean.records[id];
    if(!previous)clean.records[id]=item;
    else{
      const rank={todo:0,attempted:1,ac:2,mastered:3};
      previous.status=rank[item.status]>rank[previous.status]?item.status:previous.status;
      if(item.note&&item.note!==previous.note)previous.note=[previous.note,item.note].filter(Boolean).join('\n\n—— 合并前的另一份语言笔记 ——\n\n');
      previous.reviews=Math.max(previous.reviews,item.reviews);
      previous.lastPracticed=[previous.lastPracticed,item.lastPracticed].filter(Boolean).sort().pop()||null;
      previous.nextReview=[previous.nextReview,item.nextReview].filter(Boolean).sort()[0]||null;
    }
  }
  return clean;
}
if(typeof module!=='undefined')module.exports={algorithmDefaults,validateAlgorithms};
