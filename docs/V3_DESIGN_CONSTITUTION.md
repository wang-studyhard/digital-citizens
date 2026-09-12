# 数字江河 V3｜Design Constitution

状态：Phase 1 基线，供实现与验收使用
日期：2026-09-12
定位：数据剪报 × 流动田野 × 交互档案

## 1. 设计判断

这不是 SaaS Landing Page、Dashboard、组件库示例或“手账风”拼贴。页面应像一份被打开的调查档案：正文负责阅读，数据负责核对，现场材料负责把关系放回地点，档案负责说明证据从哪里来。

最高优先级：

```text
CONTENT > VISUAL
EVIDENCE > DECORATION
HIERARCHY > EFFECT
EDITORIAL JUDGMENT > COMPONENT
MOTION WITH PURPOSE > MOTION FOR DELIGHT
REAL MATERIAL > GENERATED MATERIAL
MOBILE RECOMPOSITION > DESKTOP SHRINKING
```

## 2. Grid 与宽度

- 桌面使用 12-column editorial grid，容器最大宽度 1440—1600px。
- 实现至少保留四种语义宽度：`reading-width`、`analysis-width`、`visual-width`、`full-bleed`。
- 正文控制在约 620—760px；数据叙事控制在约 900—1200px；现场照片允许压出正文栏；全幅场景只用于明确的材料转换。
- 所有错位、溢出和重叠都必须能回到底层 grid；禁止随机旋转和随机排列。
- 手机不沿用桌面列数：默认单列，必要时才使用局部横向滚动。

## 3. 材料身份

| 身份 | 用途 | 视觉规则 |
|---|---|---|
| 正文纸 | 叙事、解释、长文 | 干净，无默认卡片，无厚重阴影 |
| 数据纸 | 图表、数字、表格 | 精细刻度、Mono 编号、direct labels、annotation、source |
| 现场纸 | 新闻图片、地点、人物 | 自然比例、caption、credit、date、source |
| 档案纸 | 报道、政策、论文、引文 | 明确证据类型、状态和定位 |

剪贴报只保留材料关系，不使用图片倾斜、胶带、撕纸、咖啡污渍、图钉、曲别针、手写箭头或满屏噪点作为默认装饰。

## 4. Tokens

实现阶段以本表为目标值，禁止在组件中再散落一套颜色：

```css
--paper: #F2EFE6;
--ink: #20262B;
--navy: #263B4B;
--mist: #87A3B5;
--field: #667C61;
--vermillion: #C94E3D;
```

允许为对比度和状态提供少量派生色，但必须在全局 token 中命名。朱砂色只用于数据重点、编辑批注、source mark 和极少量章节符号。

## 5. Typography

- 最多三类：1 个中文正文、1 个 Display、1 个 Mono。
- 目标是 WOFF2、`font-display: swap`、只加载实际字重、尽可能 subset。
- 正文使用本地阿里巴巴普惠体 3.0 WOFF2（400/500/600/700），由 `public/fonts.css` 统一加载；Display 使用本地 Fontsource Noto Serif SC，Mono 使用本地 Fontsource JetBrains Mono，由 `src/main.tsx` 加载。三类字体均使用 `font-display: swap`；阿里巴巴普惠体以官方 Alibaba Fonts 页面所述免费商用范围使用，Noto Serif SC 与 JetBrains Mono 按包内 OFL-1.1 说明使用。
- 正文保持可持续阅读的行高；标题不以超大字号替代层级设计。
- Mono 仅用于 `N = 798`、`SOURCE 014`、`FIELD NOTE`、日期、状态和指标编号，不用于长段落。

## 6. 容器、边界与组件

默认不使用全局：

```text
rounded-xl / rounded-2xl
shadow-lg
bg-white/80
backdrop-blur
border everywhere
hover:-translate-y
```

允许明显容器的语义只有资料档案、来源记录、数据表格、引文和明确的语义分组。普通正文、图片和图表优先用边界线、留白、编号和纸面转换来分组。

可保留的共享组件：`SceneShell`、`VizFigure`、`EvidenceTable`、`ImageCard`、`DataSource`、`EvidenceDrawer`。组件必须服务于材料身份，不能把每个章节强制成同一个 Card 模板。

## 7. Chart grammar

每张数据图在实现前必须有以下记录：

```text
QUESTION
DATA
RELATIONSHIP
CHART TYPE
TAKEAWAY
ANNOTATION
SOURCE
MOBILE VERSION
```

关系与优先图形：

| 关系 | 优先图形 |
|---|---|
| 排名 | Dot / Lollipop |
| 时间变化 | Line |
| 构成 | Stacked Bar |
| 个体分布 | Beeswarm / Strip |
| 样本数量 | Unit Chart |
| 两组比较 | Dumbbell |
| 前后变化 | Slopegraph |
| 多群体趋势 | Small Multiples |
| 时间事件 | Timeline |
| 流动关系 | 只有确实存在流关系时才使用 Sankey |

当前数据不支持的职业分布、收入热力图、挑战趋势、生活成本、未经核验政策数字和伪地图不得恢复。图表必须在不 hover 时也能理解，且提供静态表格或文本 fallback。

## 8. Image grammar

- Level A 事实图片必须来自登记的真实报道/机构/官方材料。
- Level B 解释图像使用 SVG、diagram 或 icon，不伪装为新闻摄影。
- Level C 编辑插画若未来使用，必须标注为插画，不得伪装成真实现场。
- 所有图片都要有 `id`、`file`、`alt`、`caption`、`credit`、`source`、`sourceUrl`、`date`、`scene`、`type`。
- 图片默认自然比例；不得用 AI 图片、无来源地图、假人物或假采访填补证据缺口。

## 9. Motion grammar

全站只保留约 5 个记忆点，候选为：首屏材料展开、798 样本聚合、一个核心数据图 scroll story、地方案例形成 archive stack、结尾材料回到调查桌。

每个实际动画都要在代码附近或文档中写明：

```text
PURPOSE:
TRIGGER:
DURATION:
REDUCED-MOTION FALLBACK:
```

优先 `transform` 与 `opacity`，不做 Scroll Hijacking；移动端使用 tap、simple reveal 或静态状态，不依赖 hover 才能理解。沿用现有 Framer Motion 即可，不同时引入多个动效引擎。

## 10. Mobile 与可访问性

目标视口：375、390、430、768。桌面 sticky、双栏、hover、宽图表在移动端分别重组成单列、tap、静态解释和必要时局部横滑。

必须持续满足：键盘可达、focus-visible、对比度 AA、明确 alt、语义标题、source drawer focus trap、Escape 关闭、`aria` 状态和 `prefers-reduced-motion`。重要信息不能只依赖颜色、动画或 hover。

## 11. 红蓝对抗门槛

红队发现四项以上“大居中 Hero、渐变、三卡、Bento、大圆角、淡阴影、Glassmorphism、Lucide everywhere、Inter everywhere、generic CTA、重复 fade-up、每区相同结构”时，返工结构而不是补装饰。

蓝队同时检查：可读性、信息层级、对比度、正文宽度、滚动控制和移动端体验。反 AI 不是牺牲阅读质量的理由。
