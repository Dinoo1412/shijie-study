'use strict';
const backendCatalog=typeof module!=='undefined'?require('./backend-data.js'):{BACKEND_UNITS};
const backendDefaults=()=>({records:{},lastUnit:1});
function validateBackend(data){
 const clean=backendDefaults();if(data===undefined)return clean;
 if(!data||!data.records||typeof data.records!=='object'||Array.isArray(data.records)||!Number.isInteger(data.lastUnit)||!backendCatalog.BACKEND_UNITS.some(u=>u.id===data.lastUnit))throw Error('C++ 后端学习记录格式不正确');
 clean.lastUnit=data.lastUnit;
 for(const [key,r]of Object.entries(data.records)){
  const unit=backendCatalog.BACKEND_UNITS.find(u=>String(u.id)===key);
  if(!unit||!r||typeof r.note!=='string'||r.note.length>50000||!Array.isArray(r.checks)||r.checks.some(i=>!Number.isInteger(i)||i<0||i>=unit.checks.length))throw Error('C++ 后端验收记录格式不正确');
  clean.records[key]={note:r.note,checks:[...new Set(r.checks)]};
 }
 return clean;
}
if(typeof module!=='undefined')module.exports={backendDefaults,validateBackend};
