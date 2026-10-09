'use strict';
const algorithmCatalog=typeof module!=='undefined'?require('./algorithm-data.js'):{ALGORITHM_PROBLEMS,CPP_MODULES};
const algorithmDefaults=()=>({language:'python',records:{},cppChecks:[]});
function validateAlgorithms(data){
  const clean=algorithmDefaults();
  if(data===undefined)return clean; // Existing version-1 backups remain valid.
  if(!data||!['python','cpp'].includes(data.language)||!data.records||typeof data.records!=='object'||Array.isArray(data.records)||!Array.isArray(data.cppChecks))throw Error('算法专题记录格式不正确');
  clean.language=data.language;
  if(data.cppChecks.some(i=>!Number.isInteger(i)||i<0||i>=algorithmCatalog.CPP_MODULES.length))throw Error('C++ 学习记录格式不正确');
  clean.cppChecks=[...new Set(data.cppChecks)];
  const validDate=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(Date.parse(d))&&new Date(d+'T00:00:00Z').toISOString().slice(0,10)===d;
  for(const [key,r]of Object.entries(data.records)){
    const match=/^(python|cpp):([1-9]\d*)$/.exec(key);
    if(!match||!algorithmCatalog.ALGORITHM_PROBLEMS.some(p=>p.id===Number(match[2]))||!r||!['todo','attempted','ac','mastered'].includes(r.status)||typeof r.note!=='string'||r.note.length>20000||!Number.isInteger(r.reviews)||r.reviews<0||r.reviews>10000||r.lastPracticed!==null&&!validDate(r.lastPracticed)||r.nextReview!==null&&!validDate(r.nextReview))throw Error('刷题记录格式不正确');
    if(['ac','mastered'].includes(r.status)&&!r.lastPracticed)throw Error('已通过题目需要练习日期');
    clean.records[key]={status:r.status,note:r.note,reviews:r.reviews,lastPracticed:r.lastPracticed,nextReview:r.nextReview};
  }
  return clean;
}
if(typeof module!=='undefined'){
  module.exports={algorithmDefaults,validateAlgorithms};
}
