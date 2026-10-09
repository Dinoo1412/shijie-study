'use strict';
const GUEST_KEY = 'shijie-study-v1';
let cloudUser = null, cloudVersion = 0, cloudReady = false, cloudDirty = false, cloudConflict = false, cloudBusy = false, cloudMessage = '正在连接账号…', cloudTimer;
let guestRecords = null;
const accountMetaKey = () => KEY + ':sync';
const hasRecords = data => data && (Object.keys(data.lessons).length || Object.keys(data.projects).length || data.logs.length || data.settings.name !== '学习者' || Object.keys(data.algorithms?.records || {}).length || data.algorithms?.cppChecks?.length || Object.keys(data.backend?.records || {}).length);

function accountStatus(message) {
  cloudMessage = message;
  const status = $('#account-status'); if (status) status.textContent = message;
  if (cloudUser) $('#save-state').textContent = '● ' + message;
}
function cloudMeta() {
  try { localStorage.setItem(accountMetaKey(), JSON.stringify({version: cloudVersion, dirty: cloudDirty})); }
  catch { accountStatus('浏览器缓存失败，请导出备份'); }
}
async function cloudApi(path, options = {}) {
  const response = await fetch('/api/' + path, {...options, credentials: 'same-origin', headers: {'Content-Type': 'application/json', ...options.headers}, signal: AbortSignal.timeout(15000)});
  const data = await response.json();
  if (!response.ok) { const error = new Error(data.error || '请求失败'); error.status = response.status; throw error; }
  return data;
}
function cloudSchedule() {
  if (!cloudUser || !cloudReady) return;
  cloudDirty = true; cloudMeta(); accountStatus('待同步');
  clearTimeout(cloudTimer); cloudTimer = setTimeout(cloudPush, 800);
}
async function cloudPush() {
  clearTimeout(cloudTimer);
  if (!cloudUser || !cloudReady || cloudBusy || cloudConflict || !cloudDirty) return false;
  cloudBusy = true; accountStatus('正在同步…');
  const snapshot = JSON.stringify(state), owner = cloudUser.id;
  try {
    const result = await cloudApi('progress', {method: 'PUT', body: JSON.stringify({userId: owner, version: cloudVersion, data: JSON.parse(snapshot)})});
    if (cloudUser?.id !== owner) return false;
    cloudVersion = result.version; cloudDirty = JSON.stringify(state) !== snapshot; cloudMeta();
    accountStatus(cloudDirty ? '待同步' : '已同步到云端'); return !cloudDirty;
  } catch (error) {
    if (error.status === 409) { cloudConflict = true; accountStatus('发现其他设备更新，请到设置处理'); if (location.hash === '#settings') render(); }
    else accountStatus(error.status === 401 ? '登录已过期，本机修改已保留，请重新登录' : '同步失败，本机修改已保留，将自动重试');
    return false;
  } finally { cloudBusy = false; if (cloudDirty && !cloudConflict) cloudTimer = setTimeout(cloudPush, 10000); }
}
function applyCloud(data) {
  const timer = state.timer;
  state = data ? validateBackup(data) : defaultState(); state.timer = timer;
  selectedLesson = state.lastLesson;
  // Write cache without scheduling an upload of a remote read.
  try { localStorage.setItem(KEY, JSON.stringify(state)); storageLoadError = false; storageOK = true; } catch { storageOK = false; }
  syncTimer(); render();
}
async function cloudPull() {
  if (!cloudUser || !cloudReady || cloudBusy || cloudDirty || noteTimeout || document.activeElement?.matches('input,textarea,select')) return;
  cloudBusy = true;
  try {
    const result = await cloudApi('progress?account=' + encodeURIComponent(cloudUser.id));
    if (result.version !== cloudVersion) { cloudVersion = result.version; applyCloud(result.data); cloudMeta(); }
    accountStatus('已同步到云端');
  } catch (e) { accountStatus(e.status === 401 ? '登录已过期，请重新登录' : '暂时无法连接云端'); }
  finally { cloudBusy = false; }
}
function accountPanel() {
  if (!cloudReady) return '<section class="panel account-panel"><h2>账号与云同步</h2><p id="account-status" role="status">' + escapeHTML(cloudMessage) + '</p><button class="button" id="account-retry">重新连接</button></section>';
  if (!cloudUser) return '<section class="panel account-panel"><h2>让学习记录跟随你</h2><p class="muted small">通过 GitHub 登录，在不同浏览器和设备使用同一份进度、笔记和设置。登录只读取你的 GitHub 身份，不申请仓库权限。未登录时使用浏览器记录。</p><p id="account-status" role="status">' + escapeHTML(cloudMessage) + '</p><a class="button primary" id="github-login" href="/api/auth/github">使用 GitHub 登录 ↗</a></section>';
  return `<section class="panel account-panel"><div class="section-head"><h2>${escapeHTML(cloudUser.name)} 的学习账号</h2><button class="button compact" id="account-logout">退出登录</button></div><p id="account-status" role="status">${escapeHTML(cloudMessage)}</p><p class="muted small">修改自动上传，其他设备约 15 秒获取更新。请确认显示“已同步到云端”后再切换设备。专注计时仅在启动它的浏览器运行。</p><p class="muted small">切换账号会先保存当前记录、退出拾阶，再前往 GitHub 选择账号。每个账号的学习记录独立；取消登录后回到访客模式。</p><div class="button-row"><button class="button" id="account-sync">立即同步</button><button class="button" id="account-switch">切换账号</button></div>${cloudConflict ? '<div class="callout"><strong>两台设备都修改了记录</strong><p>不会自动覆盖。先导出本机备份，再选择要继续使用的记录。</p><div class="button-row"><button class="button" id="account-use-cloud">使用最新云端记录</button><button class="button" id="account-use-local">用本机记录替换云端</button></div></div>' : ''}${hasRecords(guestRecords) ? '<div class="callout"><strong>发现这个浏览器的旧学习记录</strong><p>旧记录仍保留在访客空间。迁移会用旧记录替换当前账号记录，请先备份。</p><div class="button-row"><button class="button" id="account-export-guest">备份旧记录</button><button class="button" id="account-migrate">迁移旧记录到此账号</button></div></div>' : ''}</section>`;
}
async function accountEndSession(switchAccount=false) {
  flushNote();
  if (cloudConflict || cloudBusy) {toast('请先完成同步并处理冲突后再切换或退出。');return false;}
  if (cloudDirty && !await cloudPush()) {toast('还有未同步记录，请先完成同步或导出备份。');return false;}
  cloudBusy=true;
  try {
    await cloudApi('logout', {method:'POST',body:'{}'});
    clearTimeout(cloudTimer);cloudUser=null;KEY=GUEST_KEY;cloudDirty=false;cloudConflict=false;storageLoadError=false;
    state=guestRecords||defaultState();selectedLesson=state.lastLesson;render();syncTimer();accountStatus('已退出，当前使用访客记录');
    if(switchAccount)location.href='/api/auth/github?switch=1';
    return true;
  } catch {toast('退出失败，请重试。');return false;}
  finally {cloudBusy=false;}
}
function bindAccount() {
  $('#account-retry')?.addEventListener('click', accountInit);
  $('#github-login')?.addEventListener('click', flushNote);
  $('#account-sync')?.addEventListener('click', async () => {flushNote(); if (cloudDirty) await cloudPush(); else await cloudPull();});
  $('#account-export-guest')?.addEventListener('click', () => download('拾阶旧浏览器记录.json', JSON.stringify(guestRecords, null, 2), 'application/json'));
  $('#account-migrate')?.addEventListener('click', async () => {
    if (cloudBusy || cloudConflict) return toast('请先完成同步并处理冲突。');
    if (!confirm('将用旧浏览器记录替换此账号的云端记录。请先导出当前账号备份，确认继续？')) return;
    state = validateBackup(guestRecords); selectedLesson = state.lastLesson; save(); syncTimer(); render(); await cloudPush();
  });
  $('#account-use-cloud')?.addEventListener('click', async () => {
    if (!confirm('使用云端记录会替换本机修改。请先导出本机备份，确认继续？')) return;
    try { const result = await cloudApi('progress?account=' + encodeURIComponent(cloudUser.id)); cloudVersion = result.version; cloudDirty = false; cloudConflict = false; applyCloud(result.data); cloudMeta(); accountStatus('已同步到云端'); } catch { toast('连接失败，本机记录保持不变。'); }
  });
  $('#account-use-local')?.addEventListener('click', async () => {
    if (!confirm('确认用本机记录替换最新云端记录？其他设备的更新可能被覆盖，请先备份。')) return;
    try { const result = await cloudApi('progress?account=' + encodeURIComponent(cloudUser.id)); cloudVersion = result.version; cloudConflict = false; cloudDirty = true; cloudMeta(); await cloudPush(); render(); } catch { toast('连接失败，本机记录保持不变。'); }
  });
  $('#account-logout')?.addEventListener('click',()=>accountEndSession());
  $('#account-switch')?.addEventListener('click',()=>accountEndSession(true));
}
async function accountInit() {
  if (cloudUser) return;
  cloudReady = false; $('#main').inert = true; $('#focus-open').disabled = true;
  try {
    const {user} = await cloudApi('me');
    guestRecords = storageLoadError ? null : validateBackup(state);
    if (!user) { cloudReady = true; accountStatus('未登录，记录保存在此浏览器'); render(); return; }
    const result = await cloudApi('progress?account=' + encodeURIComponent(user.id));
    cloudUser = user; KEY = GUEST_KEY + ':' + user.id;
    let cached = null, meta = null;
    try { cached = JSON.parse(localStorage.getItem(KEY) || 'null'); meta = JSON.parse(localStorage.getItem(accountMetaKey()) || 'null'); } catch { accountStatus('账号缓存无法读取，请使用云端记录'); }
    cloudVersion = result.version; cloudReady = true; cloudDirty = Boolean(cached && meta?.dirty);
    if (cloudDirty) {
      state = validateBackup(cached); cloudVersion = Number.isSafeInteger(meta.version) ? meta.version : 0;
      cloudConflict = cloudVersion !== result.version; selectedLesson = state.lastLesson; syncTimer(); render();
      accountStatus(cloudConflict ? '本机有未同步修改，请处理冲突' : '正在恢复本机未同步修改'); if (!cloudConflict) await cloudPush();
    } else { state = defaultState(); if(cached) {try {state.timer=validateBackup(cached).timer;}catch {}} applyCloud(result.data); accountStatus(result.data ? '已同步到云端' : '账号已连接，可以开始学习或迁移旧记录'); }
    cloudMeta();
  } catch { cloudUser = null; KEY = GUEST_KEY; if(guestRecords)state=guestRecords; cloudReady = true; accountStatus('账号连接失败，当前保留访客模式，请刷新重试'); render(); }
  finally {
    $('#main').inert = false; $('#focus-open').disabled = false;
    const error = new URL(location.href).searchParams.get('auth_error');
    if (error) { toast(error === 'not_configured' ? 'GitHub 登录尚未配置，请联系网站管理员。' : 'GitHub 登录未完成，请重试。'); history.replaceState(null, '', location.pathname + location.hash); }
  }
}
setInterval(() => { if (document.visibilityState === 'visible') { if (cloudDirty) cloudPush(); else cloudPull(); } }, 15000);
document.addEventListener('visibilitychange', () => {if (document.visibilityState === 'visible') {if (cloudDirty) cloudPush(); else cloudPull();}});
window.addEventListener('storage', event => {
  if (cloudUser && (event.key === KEY || event.key === accountMetaKey())) {cloudConflict = true; accountStatus('同一浏览器的其他标签页有更新，请关闭重复页面并刷新');}
});
accountInit();
