# 数字江河 H5

## 定位

本项目是“数字江河”数据新闻 H5：用有限样本、社区研究、公开报道和政策文本，观察工作地点移动后的人与地方关系。当前V6.2为首屏加5个编号章节，已于2026-09-26经用户授权发布到GitHub Pages并完成公开页回读。下一步为Batch 5素材审核与接入，尚未确认比赛参赛版。发布证据见`docs/V6_2_RELEASE_20260926.md`。

## 启动与验证

```bash
npm run dev
npm run verify
npm run build
npm run preview
```

`npm run verify` 依次执行内容校验、ESLint、TypeScript/Vite 构建和构建资产性能预算。

## 技术栈

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion：已安装；当前故事入口尚未实现 Batch 6 叙事动效
- GSAP、Visx、ECharts：保留为工程工具；未进入当前入口的旧图表不得重新接回主线
- CSS/SVG：当前双点图、分支流程、构成图、饼图、社区图标与提案单位图、日历、横条和时间线

## 现役目录

```text
src/App.tsx                         页面入口：首屏与5章；主章锚点scene1/4/7/10/12
src/components/story/               现役叙事区块；当前文稿以源码为准
src/components/scenes/              V3 旧叙事区块；未完成零引用审计前保留
src/components/shared/              Scene 外壳、图表、证据表、证据抽屉和值
src/components/layout/              固定目录导航与页尾
src/data/evidence.ts                主线数字唯一入口
src/data/chartData.ts               当前生产图表的数据视图
src/data/derived.ts                 历史派生数据；不可据此恢复旧图表
src/data/references.ts              来源与定位
src/data/chartSpecs.ts              Batch 1 历史候选规格；不驱动当前生产图表
src/data/legacyCandidates.ts        旧数据候选隔离层，不得被生产组件引用
public/media/manifest.json          图片尺寸、角色、授权与审核状态
docs/source-registry.md             来源台账
docs/content-audit.md               内容边界与审计
docs/V6_2_STORY_ARCHITECTURE.md     当前5章故事结构与旧锚点映射
docs/V4_CURRENT_WEB_COPY.md         2026-09-22 历史文稿快照
docs/V6_2_WEB_COPY_20260926.md       本轮本地网页文稿快照
docs/V6_2_BATCH4_ACCEPTANCE_20260926.md 本轮验收与证据
docs/V6_2_BATCH5_ASSET_HANDOFF.md    当前素材位置与赛事待核事项
docs/V6_2_BATCH4_PRESERVATION_RULES.md 当前修正清单与续改规则
docs/V4_CODEX_EXECUTION_PLAN.md     当前 Batch 状态与下一步
scripts/validate-content.ts         内容范围门禁
scripts/check-performance.mjs       构建资产预算
```

## 不可违反的内容边界

- NCC 仅为社区渠道样本，不能外推全国人口；77 家仅为研究纳入样本。
- 安吉青年数据使用 `youth-rural-employment` scope，不得写成数字游民人数。
- 政策目标必须标记为 `target`，不能写成已经发生的结果。
- 旧版职业分布、17.05%、50 小时、收入热力图、挑战趋势、旧政策矩阵不得进入生产入口。
- 不生成或伪造新闻摄影、人物肖像、AI 地图、AI 图表和政策截图。

## 当前发布边界

- 公开GitHub Pages已更新为V6.2五章版本，源码提交`55b3257`；2026-09-26公开页与Actions发布产物核对通过，见`docs/V6_2_RELEASE_20260926.md`。旧验收文档“未部署”仅记录历史阶段。
- 后续每次发布前必须运行 `npm run verify`；只有用户明确批准后才可部署，部署后还要单独完成公开页回读。
- 不把原始蓝图文件纳入提交，不删除用户残留文件，不自动清理工作区。
- 当前完成度和待补项以 `docs/V4_CODEX_EXECUTION_PLAN.md` 为准；无法核实的来源保持 `reported` 或 `pending`。
- 继续修改页面前先核对 `docs/V6_2_BATCH4_PRESERVATION_RULES.md` 与相关源码；保留用户改过的章节结构、图表与已删除冗余。旧文稿、旧图表规格和历史截图不覆盖当前源码；修改中发现文件已变化则重新读取。
