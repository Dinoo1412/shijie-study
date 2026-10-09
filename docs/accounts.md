# GitHub 登录与云同步

网站： https://shijie-study.jean1412.workers.dev

## 首次配置

1. 在 GitHub Settings → Developer settings → OAuth Apps 创建应用。
2. Homepage URL：`https://shijie-study.jean1412.workers.dev`
3. Authorization callback URL：`https://shijie-study.jean1412.workers.dev/api/auth/callback`
4. 将 Client ID 配置为 Worker 的 `GITHUB_CLIENT_ID`，Client Secret 配置为 `GITHUB_CLIENT_SECRET`。可使用 `npx wrangler secret put GITHUB_CLIENT_ID` 与 `npx wrangler secret put GITHUB_CLIENT_SECRET`，在隐藏输入提示中粘贴。不要将密钥写入 Git、前端文件或聊天。
5. 数据库绑定为 DB，执行 `npx wrangler d1 migrations apply shijie-study-users --remote`，然后 `npm run deploy`。

本地开发复制 `.dev.vars.example` 为 `.dev.vars`，填写本地测试 OAuth 应用凭据，回调地址使用本地服务地址。生产凭据与本地凭据应分开。

## 同步行为

- GitHub 用户 ID 是账号标识；不申请仓库或邮箱权限。
- 服务端会话使用 HttpOnly、Secure、SameSite Cookie，有效期 30 天；数据库仅保存会话 token 的哈希。
- GitHub access token 只用于当次身份查询，不存入数据库或浏览器。
- 账号数据按用户独立存储；前端缓存也按账号分开。
- 第一登录不会将访客旧记录自动覆盖到云端；在设置中先备份，再确认迁移。
- 修改后自动上传，活跃页面每 15 秒检查更新；切换设备前等待“已同步到云端”。断网修改保留在本机账号缓存，恢复网络后重试。
- 两台设备同时修改会返回版本冲突，保留本机修改，由用户选择云端记录或明确替换云端。
- 专注计时仅在启动的浏览器运行，不跨设备恢复，避免重复记录分钟数。
- 记录最大 2 MB；课程笔记、项目进度、学习设置、时间日志和算法专题记录均参与同步。算法记录包含 Python / C++ 各自的题目状态、复盘、复习日期，以及 C++ 准备模块。备份仍应定期导出。
- 旧备份缺少算法字段时可正常导入；旧版已打开页面更新主线记录时，服务端保留云端已有算法记录，仍按版本号检查冲突。
- 退出会话不会删除账号数据；不要在公共电脑上留下个人备份和浏览器账号缓存。

## 验证

`npm test` 与 `node tests/account-client.cjs` 检查课程和同步状态。

接口集成验证：先执行本地 migrations，运行 `node tests/seed-accounts.cjs`，然后仅对本地数据库执行 `.wrangler/account-test-seed.sql`。启动 `npx wrangler dev --local --port 8787` 后运行 `node tests/accounts.cjs`。测试种子会清空本地测试账号，绝不能对远程数据库执行。
