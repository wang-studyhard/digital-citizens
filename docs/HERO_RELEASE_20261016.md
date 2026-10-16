# 数字江河首屏滚动媒体发布记录

日期：2026-10-16（北京时间）。用户在本地实现、自检及独立结果审查通过后，明确要求“部署到线上”，授权发布当前预览候选及必要提交、推送。不据此虚构逐项视觉或真机验收反馈。

站点：https://wang-studyhard.github.io/digital-citizens/

## 发布范围

发布当前已预览的页面：保留独立序章、当前已接入素材、五个编号章节与全部原文、数据和来源，在此基础上加入 Prologue 滚动视频和 SVG 路线。移动端及减弱动效使用静态封面。新视频为用户提供的概念视觉装饰，不当作真实人物、地点、案例或效果证据。

仅提交生成当前页面需要的现役源码、媒体、素材登记、必要预算脚本及本发布记录。原始 MOV、参考 PNG、work、草稿、无关治理文档和停用组件修改不纳入。现有 dist 由 Actions 重新构建，发布基准以 Actions 产物为准。

当前工作区有大量先前修改；采用独立临时索引和发布分支，以远端 main 为父提交，不切换当前工作区、不改用户索引、不覆盖既有文件、不 force push。

## 发布前检查

- `npm run verify` 已重新通过：内容守卫、lint、TypeScript、Vite 构建与现有资产预算均通过。MP4 不在现有预算范围内，单列大小 5,800,461 bytes；封面 85,886 bytes。
- 本轮本地五种尺寸、正反向滚动、静态回退、媒体失败、动态切换、卸载清理、构建子路径检查通过；主助手实施及独立子代理 `hero_review` 方案、结果审查通过。
- 本地检查不等于真机、目标网络或线上验收；发布后独立检查公开页面与资源。

## 执行与线上检查

- 发布提交：`f264c4019ffa9fbbde2918499dc05c5a19b8f6f7`，父提交 `70b987bacfb3f94f8a95ff120f3acfb79271a212`；已正常推送 main。当前本地工作区分支和原索引保持不变；本地发布分支为 `codex/hero-scroll-release-20261016`。
- 最终候选从提交树独立导出，完整 `npm run verify` 通过；候选的桌面滚动、390px 静态封面、桌面 reduced-motion、五章与照片加载预览通过后推送。
- [Deploy to GitHub Pages #38875054792](https://github.com/wang-studyhard/digital-citizens/actions/runs/38875054792)：依赖安装、verify、产物上传及部署均成功；部署步骤于 2026-10-16 16:39:11（北京时间）完成。
- 线上回读：2026-10-16 16:39—16:40（北京时间），公开页 HTTP 200；1440×900 普通模式、390×844 普通模式、1440×900 减弱动效模式均通过，无页面运行错误、控制台错误、HTTP 错误或失败请求。
- 桌面视频时间映射、路线进度、节点顺序和首屏结束后的原内容保留通过；手机与减弱动效无 MP4 请求。手机六项目录及章节跳转正常，全部 main 图片解码成功，五章、旧 scene0—scene12 锚点、三个地点入口保留，无横向溢出。
- 公开 HTML 及 13 项资源 SHA-256 与本次 Actions 下载产物逐项一致：主 JS、主 CSS、fonts.css、manifest、视频、poster、五张新闻 WebP、两张概念 WebP。线上主文件为 `assets/index-BXr2d83t.js`、`assets/index-CkZiyUkO.css`，不以本地 Windows 文件名替代 Actions 证据。

本地候选、Actions 记录和产物、公开回读结果及截图保存在忽略目录 `work/hero-release-20261016/`：`candidate.json`、`candidate-verify.log`、`candidate-qa.json`、`workflow.json`、`deployed/`、`live-qa.cjs`、`live-results.json`、`live-*.png`。

本次检查使用 Playwright Chromium 桌面及尺寸模拟；真机、目标网络、跨设备连续阅读与赛事资格未验证。公开发布不改变这些证据边界，也不授权扩展其他章节动效。
