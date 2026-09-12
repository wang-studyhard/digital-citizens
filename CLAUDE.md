# 数字江河 H5

## 定位

本项目是“数字江河”数据新闻 H5：用有限样本、社区研究、公开报道和政策文本，观察工作地点移动后的人与地方关系。当前主线是 V2.1 freeze-candidate，不是比赛参赛版。

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
- Framer Motion：节点布局、轻量交互和页面反馈
- GSAP、Visx、ECharts：保留为工程工具；未进入当前入口的旧图表不得重新接回主线
- CSS/SVG：编辑拼贴、路线、点阵、案例网络和关系图形

## 现役目录

```text
src/App.tsx                         页面入口与 Scene 0–7
src/components/sections/            Hero、章节、案例和结尾
src/components/shared/              证据抽屉、证据值、章节标题
src/data/evidence.ts                主线数字唯一入口
src/data/references.ts              来源与定位
docs/source-registry.md             来源台账
docs/content-audit.md               内容边界与审计
docs/plan-status.md                 蓝图 Gate/P0/P1/P2 状态
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

- GitHub Pages 由 `.github/workflows/deploy.yml` 从 `main` 自动构建部署。
- 推送前必须运行 `npm run verify`；当前部署是公开开发版，不代表比赛资格已确认。
- 不把原始蓝图文件纳入提交，不删除用户残留文件，不自动清理工作区。
- 详细完成度和待补项以 `docs/plan-status.md` 为准；无法核实的来源保持 `reported` 或 `pending`。
