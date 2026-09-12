# 数字江河 V2.1｜蓝图对照状态

更新时间：2026-09-12

本表只对照 `数字江河_H5_V2.1_Freeze_Codex正式施工蓝图.md`。比赛 Gate 0 按用户要求暂停，不作为本轮推进目标。

## Phase Gates

| Gate | 状态 | 证据与剩余项 |
|---|---|---|
| Gate 0｜比赛资格 | 暂停 | 赛道、资格、指导教师、设计报告与参赛版隐私扫描不推进。 |
| Gate 1｜Evidence Freeze | 部分完成 | `docs/source-registry.md`、`docs/content-audit.md`、`src/data/evidence.ts`、`src/data/references.ts` 已建立；37 条主线证据无 `pending`。NCC 方法与样本数字定位到公开预览 p.04；用户完成可见登录后，第9页（页脚08）和第11页（页脚10）的画像字段已核验并用于 282 点阵重绘，报告整页未归档。 |
| Gate 2｜Content Freeze | 已完成候选 | 静态文本、静态 SVG/CSS 图形和证据边界可以独立读完主线；旧版未核数字已退出。 |
| Gate 3｜Visual Freeze | 部分完成 | V2.1 叠层纸片视觉已实现并通过反模式检测；安吉、黟县官方报道图片已下载、接入并登记到 `public/media/manifest.json`。三张 Image 2.5 style test 仍需外部人工生成、筛选和 manifest，Codex 不执行生成。 |
| Gate 4｜Interaction | 已完成候选 | 77 morph、黄山步骤、安吉 network、policy timeline、finale 已接入。 |
| Gate 5｜Red Team QA | 部分完成 | 桌面浏览器交互、证据抽屉、控制台、减弱动效规则与静态故障兜底已检查；390/430/768/1024/1440/1920 全视口、触摸、慢 4G 和 Lighthouse 尚未在可用浏览器环境中完成。 |

## P0 / P1 / P2

### P0

- 数据主轴、范围、来源、案例和 Evidence Registry：已完成候选。
- Hero、Scene 1–7、77 morph、安吉、黄山、政策、张力、Finale、方法抽屉：已完成候选。
- desktop、mobile CSS、keyboard、reduced motion、lint/build/content check：已完成候选；实机视口与 Lighthouse 仍待环境支持。
- Hero：继续使用 CSS/SVG 编辑图形；安吉与黄山素材已接入 3 张新华社官方报道图片，来源、图注、摄影署名和用户授权状态见 `public/media/manifest.json`。必要纹理与 Image 2.5 style test 仍待外部人工筛选。

### P1

- NCC 282 dot morph：已完成，已依据登录后原始阅读器第9/11页重绘年龄、学历、性别切面；与 77 节点结构交互分开，均保留各自统计口径。
- 安吉复杂 network：已完成。
- 独立 policy matrix：已接入 Scene 5，并通过内容校验、构建、性能检查与线上回读；省级地图、丽水遂昌小案例、额外章节插画仍未推进，当前时间线和案例网络承担主线职责。

### P2

大理完整章节、全国社区逐点数据库、国际比较、Sankey、更多地方追踪和数据更新后台均按蓝图保留在比赛后范围内。

## 本轮新增证据推进

- 安吉 2026 青年入乡、青创项目、乡村工位：已接入 `youth-rural-employment` scope。
- 丽水 2026 社区、共创提案、落地项目：已接入 `reported` 状态。
- 黄山政府后续入住、活动、项目、任务和消费口径：已接入 `reported` 状态；消费数字只复述政府口径，不推导因果贡献。
- 上述材料均保留来源 URL、日期和段落定位；NCC 额外保留原始阅读器第9页（页脚08）和第11页（页脚10）定位，报告整页不归档，项目只重绘已核验字段。官方网站图片的本地文件与授权边界已登记到 `public/media/manifest.json`。

## 工程验证

```text
npm run verify
  content check passed: 37 evidence metrics
  eslint passed
  TypeScript + Vite build passed
  performance budget passed: 3 build assets checked
```

## 发布状态

- GitHub `main` 已包含应用实现提交 `30ffcfe`、证据状态矩阵提交 `fff5683` 与 Node 24 workflow 更新提交 `d31b2f5`、`e08e86c`；GitHub Pages 公开开发版部署成功。
- Actions run #18 已成功完成；线上页面已检查标题、主线场景、证据状态矩阵、来源锚点与控制台日志。
- 线上地址：<https://wang-studyhard.github.io/digital-citizens/>。
- 本次发布是公开开发版，不代表比赛资格确认；Gate 0 仍按用户要求暂停。
- Pages workflow 已升级至 Node 24 action 版本；run #18 无 Annotations 警告。

当前状态：`freeze-candidate`，不是 `FROZEN`。下一步非比赛工作优先级是：保留 Image 2.5 外部人工筛选流程；在具备视口控制的浏览器环境中完成 Gate 5 与 Lighthouse。比赛资格 Gate 0 仍按用户要求暂停。
