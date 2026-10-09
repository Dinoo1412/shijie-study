const assert=require('node:assert/strict');
const base='http://127.0.0.1:8787';
const valid={version:1,settings:{name:'测试',startDate:'2026-10-09',hours:2,days:6},lessons:{1:{done:true,checks:[0,1,2],note:'私有笔记',completedAt:'2026-10-09'}},projects:{},logs:[],lastLesson:1,timer:{started:Date.now(),duration:25,lesson:1}};
async function call(path,who,method='GET',data,origin=base){const response=await fetch(base+path,{method,headers:{...(who?{Cookie:'__Host-shijie-session='+who.repeat(64)}:{}),...(method!=='GET'?{'Content-Type':'application/json',Origin:origin}:{})},body:data?JSON.stringify(data):undefined});return {status:response.status,data:await response.json()};}
(async()=>{
 assert.equal((await call('/api/health')).status,200);
 assert.equal((await call('/api/progress')).status,401);
 assert.equal((await call('/api/me','a')).data.user.id,'github:test-a');
 assert.equal((await call('/api/progress','a')).data.version,0);
 const write={userId:'github:test-a',version:0,data:valid};
 assert.equal((await call('/api/progress','a','PUT',write,'https://evil.example')).status,403);
 assert.equal((await call('/api/progress','b','PUT',write)).status,401);
 assert.equal((await call('/api/progress','a','PUT',{...write,data:{...valid,version:99}})).status,400);
 assert.equal((await call('/api/progress','a','PUT',write)).data.version,1);
 const remote=await call('/api/progress','a');
 assert.equal(remote.data.data.lessons[1].note,'私有笔记');assert.equal(remote.data.data.timer,null);
 assert.equal((await call('/api/progress','b')).data.data,null);
 assert.equal((await call('/api/progress?account=github:test-b','a')).status,401);
 const race=await Promise.all([call('/api/progress','a','PUT',{...write,version:1}),call('/api/progress','a','PUT',{...write,version:1})]);
 assert.deepEqual(race.map(x=>x.status).sort(),[200,409]);
 assert.equal((await call('/api/progress','a')).data.version,2);
 assert.equal((await call('/api/logout','a','POST',{})).status,200);
 assert.equal((await call('/api/progress','a')).status,401);
 assert.equal((await call('/api/me','b')).data.user.id,'github:test-b');
 console.log('通过：会话认证、跨账号隔离、来源校验、非法数据拒绝、跨会话读取、原子版本冲突、计时器隔离、退出失效。');
})().catch(e=>{console.error(e);process.exitCode=1;});
