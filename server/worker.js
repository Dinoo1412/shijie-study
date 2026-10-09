import stateTools from './state.cjs';

const COOKIE = '__Host-shijie-session';
const OAUTH = '__Host-shijie-oauth';
const MAX_BYTES = 2 * 1024 * 1024;
const encoder = new TextEncoder();
const random = () => [...crypto.getRandomValues(new Uint8Array(32))].map(x => x.toString(16).padStart(2, '0')).join('');
const hash = async value => [...new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)))].map(x => x.toString(16).padStart(2, '0')).join('');
const cookie = (request, name) => (request.headers.get('Cookie') || '').split(';').map(x => x.trim()).find(x => x.startsWith(name + '='))?.slice(name.length + 1);
const setCookie = (name, value, age) => `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
const json = (data, status = 200) => new Response(JSON.stringify(data), {status, headers: {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'}});
const redirect = (url, cookies = []) => { const headers = new Headers({Location: url, 'Cache-Control': 'no-store'}); cookies.forEach(c => headers.append('Set-Cookie', c)); return new Response(null, {status: 302, headers}); };
const fail = (message, status) => { const e = new Error(message); e.status = status; throw e; };

async function getUser(request, env) {
  const token = cookie(request, COOKIE);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  return env.DB.prepare('SELECT users.id, users.name FROM sessions JOIN users ON users.id = sessions.user_id WHERE token_hash = ? AND expires_at > ?').bind(await hash(token), Date.now()).first();
}

async function body(request) {
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) fail('请使用 JSON 格式', 415);
  if (Number(request.headers.get('Content-Length')) > MAX_BYTES) fail('记录超过 2 MB，请先导出备份并减少笔记内容', 413);
  const reader = request.body?.getReader();
  if (!reader) fail('请求内容为空', 400);
  const chunks = []; let size = 0;
  while (true) { const {done, value} = await reader.read(); if (done) break; size += value.byteLength; if (size > MAX_BYTES) { await reader.cancel(); fail('记录超过 2 MB', 413); } chunks.push(value); }
  const bytes = new Uint8Array(size); let offset = 0; chunks.forEach(c => {bytes.set(c, offset); offset += c.length;});
  try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { fail('JSON 格式无效', 400); }
}

async function api(request, env) {
  const url = new URL(request.url), path = url.pathname;
  if (!env.DB) return json({error: '云端存储尚未配置'}, 503);
  if (!['GET', 'HEAD'].includes(request.method) && request.headers.get('Origin') !== url.origin) return json({error: '请求来源无效'}, 403);
  if (path === '/api/health') { await env.DB.prepare('SELECT 1').first(); return json({ok: true, authConfigured: Boolean(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET)}); }
  if (path === '/api/auth/github' && request.method === 'GET') {
    if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return redirect('/?auth_error=not_configured#settings');
    const now = Date.now(), ip = await hash(request.headers.get('CF-Connecting-IP') || 'local');
    const attempts = await env.DB.prepare('SELECT COUNT(*) AS count FROM oauth_attempts WHERE ip_hash = ? AND created_at > ?').bind(ip, now - 600000).first();
    if (attempts.count >= 20) return json({error: '登录尝试过于频繁，请稍后重试'}, 429);
    const state = random(), verifier = random();
    await env.DB.batch([
      env.DB.prepare('DELETE FROM oauth_attempts WHERE expires_at < ?').bind(now),
      env.DB.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(now),
      env.DB.prepare('INSERT INTO oauth_attempts (state_hash, verifier, ip_hash, created_at, expires_at) VALUES (?, ?, ?, ?, ?)').bind(await hash(state), verifier, ip, now, now + 600000)
    ]);
    const challenge = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(verifier))))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const target = new URL('https://github.com/login/oauth/authorize');
    for (const [k, v] of Object.entries({client_id: env.GITHUB_CLIENT_ID, redirect_uri: url.origin + '/api/auth/callback', state, code_challenge: challenge, code_challenge_method: 'S256'})) target.searchParams.set(k, v);
    // No repository or email scopes: only GitHub's public identity is required.
    return redirect(target.href, [setCookie(OAUTH, state, 600)]);
  }
  if (path === '/api/auth/callback' && request.method === 'GET') {
    const state = url.searchParams.get('state'), code = url.searchParams.get('code');
    if (!state || !/^[a-f0-9]{64}$/.test(state) || cookie(request, OAUTH) !== state || !code) return redirect('/?auth_error=invalid_callback#settings', [setCookie(OAUTH, '', 0)]);
    const attempt = await env.DB.prepare('DELETE FROM oauth_attempts WHERE state_hash = ? AND expires_at > ? RETURNING verifier').bind(await hash(state), Date.now()).first();
    if (!attempt) return redirect('/?auth_error=expired#settings', [setCookie(OAUTH, '', 0)]);
    try {
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {method: 'POST', headers: {Accept: 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify({client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, code_verifier: attempt.verifier, redirect_uri: url.origin + '/api/auth/callback'}), signal: AbortSignal.timeout(15000)});
      const token = await tokenResponse.json();
      if (!tokenResponse.ok || !token.access_token) throw Error('OAuth exchange failed');
      const profileResponse = await fetch('https://api.github.com/user', {headers: {Authorization: `Bearer ${token.access_token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'shijie-study'}, signal: AbortSignal.timeout(15000)});
      const profile = await profileResponse.json();
      if (!profileResponse.ok || !Number.isSafeInteger(profile.id) || typeof profile.login !== 'string') throw Error('Invalid identity');
      const id = 'github:' + profile.id, name = (profile.name || profile.login).slice(0, 50), session = random();
      await env.DB.batch([
        env.DB.prepare('INSERT INTO users (id, provider_id, name, created_at) VALUES (?, ?, ?, ?) ON CONFLICT(provider_id) DO UPDATE SET name = excluded.name').bind(id, String(profile.id), name, Date.now()),
        env.DB.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').bind(await hash(session), id, Date.now() + 30 * 86400000)
      ]);
      return redirect('/#settings', [setCookie(OAUTH, '', 0), setCookie(COOKIE, session, 30 * 86400)]);
    } catch { return redirect('/?auth_error=github_unavailable#settings', [setCookie(OAUTH, '', 0)]); }
  }
  const user = await getUser(request, env);
  if (path === '/api/me' && request.method === 'GET') return json({user});
  if (!user) return json({error: '请先登录'}, 401);
  if (path === '/api/logout' && request.method === 'POST') {
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await hash(cookie(request, COOKIE))).run();
    const response = json({ok: true}); response.headers.set('Set-Cookie', setCookie(COOKIE, '', 0)); return response;
  }
  if (path === '/api/progress' && request.method === 'GET') {
    if (url.searchParams.has('account') && url.searchParams.get('account') !== user.id) return json({error: '账号已切换，请刷新页面'}, 401);
    const row = await env.DB.prepare('SELECT version, data, updated_at FROM progress WHERE user_id = ?').bind(user.id).first();
    return json(row ? {version: row.version, data: JSON.parse(row.data), updatedAt: row.updated_at} : {version: 0, data: null});
  }
  if (path === '/api/progress' && request.method === 'PUT') {
    const input = await body(request);
    if (input.userId !== user.id) return json({error: '账号已切换，请刷新页面'}, 401);
    if (!Number.isSafeInteger(input.version) || input.version < 0) return json({error: '记录版本无效'}, 400);
    let data; try { data = stateTools.validateBackup(input.data); } catch (e) { return json({error: e.message}, 400); }
    // Older open tabs do not know this field. Preserve its existing records while
    // still using the version check below to prevent concurrent overwrites.
    if ((!Object.hasOwn(input.data, 'algorithms') || !Object.hasOwn(input.data, 'backend') || input.data.algorithms?.schema !== 2) && input.version > 0) {
      const previous = await env.DB.prepare('SELECT data FROM progress WHERE user_id = ? AND version = ?').bind(user.id, input.version).first();
      if (!previous) return json({error: '另一台设备更新了记录，请先处理同步冲突'}, 409);
      const stored = JSON.parse(previous.data), normalized = stateTools.validateBackup(stored);
      if (Object.hasOwn(input.data, 'algorithms') && input.data.algorithms.schema !== 2 && stored.algorithms?.schema === 2) return json({error: '算法记录格式已更新，请刷新页面后继续'}, 409);
      if (!Object.hasOwn(input.data, 'algorithms')) data.algorithms = normalized.algorithms;
      if (!Object.hasOwn(input.data, 'backend')) data.backend = normalized.backend;
    }
    // A running timer belongs to its browser, so two devices cannot record it twice.
    data.timer = null;
    const now = Date.now(), serialized = JSON.stringify(data);
    const result = input.version === 0
      ? await env.DB.prepare('INSERT INTO progress (user_id, version, data, updated_at) VALUES (?, 1, ?, ?) ON CONFLICT(user_id) DO NOTHING').bind(user.id, serialized, now).run()
      : await env.DB.prepare('UPDATE progress SET version = version + 1, data = ?, updated_at = ? WHERE user_id = ? AND version = ?').bind(serialized, now, user.id, input.version).run();
    if (!result.meta.changes) return json({error: '另一台设备更新了记录，请先处理同步冲突'}, 409);
    return json({version: input.version + 1, updatedAt: now});
  }
  return json({error: '接口不存在'}, 404);
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (!path.startsWith('/api/')) return env.ASSETS.fetch(request);
    try { return await api(request, env); }
    catch (e) { const status = e.status || 500; if (status === 500) console.error(JSON.stringify({event: 'api_error', path, requestId: request.headers.get('CF-Ray') || crypto.randomUUID()})); return json({error: status === 500 ? '服务暂时不可用，请稍后重试' : e.message}, status); }
  }
};
