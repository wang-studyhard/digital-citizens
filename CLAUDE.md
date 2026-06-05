# 中国数字游民研究报告 · 数据可视化叙事网页

## 启动
```bash
npm run dev      # Vite 开发服务器 (默认端口 5174)
npm run build    # 生产构建
```

## 技术栈
- **框架**: React 18 + TypeScript + Vite
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion (主要) · GSAP + ScrollTrigger (水平卷轴)
- **图表**: visx (@visx/responsive, @visx/geo, @visx/shape)
- **字体**: Noto Serif SC · Noto Sans SC · Inter · JetBrains Mono (Google Fonts)

## 项目结构
```
src/
├── App.tsx                    # 根组件 — 所有 section 按序排列
├── main.tsx                   # React 入口
├── styles/globals.css         # 色彩系统、动画关键帧、全局工具类
├── components/
│   ├── layout/                # NavBar, ScrollProgress, BackToTop, Footer
│   ├── sections/              # Hero, HorizontalScroll, Preamble, Chapter1-5
│   ├── charts/                # visx 图表 (Bar, Donut, Map, Heatmap, Stacked, Line)
│   ├── effects/               # 特效组件 (PixelDave, ProfileReveal, ScrollRevealGroup, CoordinatedReveal)
│   └── shared/                # 共享组件 (ChartCard, DataTable, QuoteBlock, ChapterHeader, FadeInView…)
├── hooks/                     # useDepthFade, useScrollCollapse, useCountUp, useScrollProgress
├── data/                      # 所有数据 (demographics, economics, geography, policy, tables, references)
└── types/                     # TypeScript 类型定义
```

## 色彩系统 (莫兰迪鸭蛋青 · 暗色模式)
- `duck-950` (#1a2d2e) — 全局背景
- `duck-300/400` (#a8c5c3 / #87b0ae) — 主色调 · 图表配色
- `#b9c8be` — 标题文字 / 鸭蛋青发光色
- `charcoal` (#d4dfe2) — 正文标题
- `slate` (#9bb0b2) — 正文段落
- `warm-400~600` (#c4a882~#a37d58) — 暖色强调

## 页面结构 (滚动顺序)
1. **Hero** — 水下湖景 + 像素潜水员 + 聚光灯入场 + "数字江河"大字报
2. **HorizontalScroll** — GSAP 水平文字卷轴 ("数字江河之下…")
3. **Preamble** — 暗色序言 + 4个 BigNumbers
4. **Chapter 1** (他们是谁) — 画像揭示 + 2组 ScrollRevealGroup 图表
5. **Chapter 2** (为何出发) — 成本对比 + 收入图表 + 热力图 + 挑战趋势
6. **Chapter 3** (洄游与栖居) — 中国地图 + 社区卡片 + 居住偏好
7. **Chapter 4** (政策春风) — 政策卡片 + BigNumbers + 参与形式
8. **Chapter 5** (未来的工作) — 00后意愿 + 结构性转变 + 结语 + 参考文献
9. **Footer** + **CollapseOverlay** (左侧章节标签) + **BackToTop**

## 关键状态
- **GSAP 动画已禁用**: ScrollRevealGroup 和 CoordinatedReveal 目前是纯展示组件。之前 `gsap.quickTo()` 导致 React 渲染崩溃（白屏）。如需恢复动画，请使用更稳健的 GSAP API（如 `gsap.to` 配合 `useLayoutEffect` + 手动 rAF）。
- **HorizontalScroll 正常运作**: 使用 `ScrollTrigger.create()` + `gsap.set()`，未使用 `quickTo`。
- **聚光灯入口**: Hero 标题在 z-50（高于 z-40 遮罩），初始孔洞 ≥4vmax，防止首次加载全黑。

## 已知问题
- JS bundle 较大 (~660KB) — 考虑代码分割
- 移动端适配待优化
- 部分图表使用 picsum.photos 占位图
