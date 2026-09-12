# 数字江河 V2.1｜蓝图对照状态

更新时间：2026-09-12

本表只对照 `数字江河_H5_V2.1_Freeze_Codex正式施工蓝图.md`。比赛 Gate 0 按用户要求暂停，不作为本轮推进目标。

## Phase Gates

| Gate | 状态 | 证据与剩余项 |
|---|---|---|
| Gate 0｜比赛资格 | 暂停 | 赛道、资格、指导教师、设计报告与参赛版隐私扫描不推进。 |
| Gate 1｜Evidence Freeze | 部分完成 | `docs/source-registry.md`、`docs/content-audit.md`、`src/data/evidence.ts`、`src/data/references.ts` 已建立；37 条主线证据无 `pending`。NCC 方法与样本数字已在公开转录页定位，但原始报告图仍未归档。 |
| Gate 2｜Content Freeze | 已完成候选 | 静态文本、静态 SVG/CSS 图形和证据边界可以独立读完主线；旧版未核数字已退出。 |
| Gate 3｜Visual Freeze | 部分完成 | V2.1 叠层纸片视觉已实现并通过反模式检测；三张 Image 2.5 style test 仍需外部人工生成、筛选和 manifest，Codex 不执行生成。 |
| Gate 4｜Interaction | 已完成候选 | 77 morph、黄山步骤、安吉 network、policy timeline、finale 已接入。 |
| Gate 5｜Red Team QA | 部分完成 | 桌面浏览器交互、证据抽屉、控制台、减弱动效规则与静态故障兜底已检查；390/430/768/1024/1440/1920 全视口、触摸、慢 4G 和 Lighthouse 尚未在可用浏览器环境中完成。 |

## P0 / P1 / P2

### P0

- 数据主轴、范围、来源、案例和 Evidence Registry：已完成候选。
- Hero、Scene 1–7、77 morph、安吉、黄山、政策、张力、Finale、方法抽屉：已完成候选。
- desktop、mobile CSS、keyboard、reduced motion、lint/build/content check：已完成候选；实机视口与 Lighthouse 仍待环境支持。
- Hero/安吉/黄山素材：当前使用 CSS/SVG 编辑图形；正式外部图片素材和必要纹理尚未接入。

### P1

- NCC 282 dot morph：已完成，合并进 77 节点结构交互。
- 安吉复杂 network：已完成。
- 省级地图、丽水遂昌小案例、独立 policy matrix、额外章节插画：未推进，当前时间线和案例网络承担主线职责。

### P2

大理完整章节、全国社区逐点数据库、国际比较、Sankey、更多地方追踪和数据更新后台均按蓝图保留在比赛后范围内。

## 本轮新增证据推进

- 安吉 2026 青年入乡、青创项目、乡村工位：已接入 `youth-rural-employment` scope。
- 丽水 2026 社区、共创提案、落地项目：已接入 `reported` 状态。
- 黄山政府后续入住、活动、项目、任务和消费口径：已接入 `reported` 状态；消费数字只复述政府口径，不推导因果贡献。
- 上述材料均保留来源 URL、日期和段落定位；网页抓取不稳定时不伪造附件页码，取得原始附件后再升级状态。

## 工程验证

```text
npm run verify
  content check passed: 37 evidence metrics
  eslint passed
  TypeScript + Vite build passed
  performance budget passed: 3 build assets checked
```

当前状态：`freeze-candidate`，不是 `FROZEN`。下一步非比赛工作优先级是：补齐 NCC 原始报告归档与可复核图表定位；取得外部人工筛选素材后完成 manifest；在具备视口控制的浏览器环境中完成 Gate 5 与 Lighthouse。未部署、未推送 main。
