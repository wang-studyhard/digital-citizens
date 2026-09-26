# 数字江河 V4｜Design Constitution

状态：V4 实现约束  
体验目标：数据新闻 × 田野记录 × 流动地图  
模式：以 Read 为主，两个 Experience Moment 嵌入长文，而不是整站沉浸式表演。

## 1. 设计判断

页面像一篇经过编辑的长篇报道：正文推进问题，数据给出证据，照片把关系放回现场，来源层允许复核。它不是 SaaS、运营 Dashboard、组件展厅、旅游宣传页或仿纸质手账。

```text
STORY > SECTION TEMPLATE
EVIDENCE > EFFECT
REAL PLACE > GENERIC LIFESTYLE
DIRECT LABEL > TOOLTIP DEPENDENCE
READING FLOW > CARD GRID
MOBILE RECOMPOSITION > DESKTOP SHRINKING
```

## 2. 三层 token

组件不写 raw hex。颜色从 primitive → semantic → component 三层引用。

### 2.1 Primitive

```css
:root {
  --p-paper-50: #fbfaf5;
  --p-paper-100: #f4f1e8;
  --p-paper-200: #e7e0d1;
  --p-ink-900: #172225;
  --p-ink-700: #344247;
  --p-ink-500: #667276;
  --p-teal-600: #2e6e73;
  --p-teal-300: #8ab4b4;
  --p-blue-600: #4f7fa8;
  --p-green-600: #71845c;
  --p-orange-600: #d26f4b;
  --p-sand-500: #c8bda6;
  --p-night-900: #14282e;
  --p-white: #ffffff;
}
```

这些值是规划目标，实施时必须做 WCAG 对比测试；若调整，只在 primitive 层改，并记录原因。

### 2.2 Semantic

```css
--surface-story: var(--p-paper-100);
--surface-data: var(--p-paper-50);
--surface-field: var(--p-paper-200);
--surface-night: var(--p-night-900);
--text-primary: var(--p-ink-900);
--text-secondary: var(--p-ink-700);
--text-muted: var(--p-ink-500);
--text-on-night: var(--p-paper-50);
--signal-digital: var(--p-teal-600);
--signal-route: var(--p-blue-600);
--signal-land: var(--p-green-600);
--signal-human: var(--p-orange-600);
--signal-context: var(--p-sand-500);
--border-subtle: color-mix(in srgb, var(--p-ink-900) 18%, transparent);
--focus-ring: var(--p-blue-600);
```

### 2.3 Component

```css
--chart-primary: var(--signal-digital);
--chart-secondary: var(--signal-route);
--chart-tertiary: var(--signal-land);
--chart-highlight: var(--signal-human);
--chart-neutral: var(--signal-context);
--source-mark: var(--signal-human);
--timeline-action: var(--signal-digital);
--timeline-reported: var(--signal-route);
--timeline-target: var(--signal-human);
```

颜色角色固定。橙色只用于人物 / 关键观察 / source mark；蓝色表示路线和地理；绿色表示地方与社区；青色表示数字工作与主要数据。状态还必须有文字和形状。

## 3. 材料系统

| 材料 | 内容 | 视觉行为 |
|---|---|---|
| STORY PAPER | 正文、标题、过渡 | 宽松留白，无默认卡片；阅读宽 640–720px |
| DATA CANVAS | 完整图、annotation、legend | 可放宽到 960–1180px；细基线、直接标签、来源尾注 |
| FIELD NOTE | 真实照片、地点、动作、引文 | 图片自然比例；caption / date / credit 连在素材上 |
| EVIDENCE LEDGER | 方法、来源、表格、状态 | 清晰边界和 mono 编号；默认不打断正文 |

同一段内容只能有一个主要材料身份。不要在每个区域同时叠加纸张背景、边框、阴影和圆角。

## 4. 网格与空间

- 桌面：12 列，最大容器 1440px；边距 32–64px。
- 正文：约 42–54 字 / 行，最大 720px。
- 分析：900–1180px；照片可向外溢出一列，但必须对齐底层 grid。
- 超宽场景只给首屏、map 和 sticky visual；普通段落不用 `100vw`。
- 移动端：单列，左右 20px（375）或 24px（430）；最小触控目标 44px。
- 间距采用 4/8 基准：4、8、12、16、24、32、48、64、96、144。章节间距不靠空白制造“PPT 换页”，而由内容转换决定。

## 5. 字体

| 角色 | 字体 | 用途 |
|---|---|---|
| Body | Alibaba PuHuiTi 3.0 | 正文、导航、图注、控件 |
| Display | Noto Serif SC | 主标题、章节标题、少量 pull quote |
| Data | JetBrains Mono | 数值、日期、source id、状态、刻度 |

- 只加载实际字重；WOFF2；`font-display: swap`。
- 正文 17–19px / 1.75–1.85；图注 13–14px / 1.6；数据标签至少 12px。
- 主标题使用 `clamp()`，但桌面不超过约 104px；不靠超大字号替代场景。
- 中文标题不做宽字距；英文状态可轻微 tracking。
- 计划中单独检查 Noto Serif SC 包体，必要时改用实际字符 subset，但不换成第四套字体。

## 6. 组件形态

- 正文、图表和照片默认不放进大圆角卡片。
- 边界优先使用留白、细线、编号、对齐和背景材料转换。
- 圆角仅用于可交互控件和小型状态标，建议 4–8px；不使用 `rounded-2xl` 语言。
- 阴影只用于 evidence drawer 等确实浮于页面之上的层；普通内容不加卡片阴影。
- 按钮文案是动作：“查看数据与来源”“切换到城乡区位”，不写 generic “了解更多”。
- 图标辅助文字，不替代关键标签；全篇不使用一套图标装饰所有标题。

## 7. 图片与图表

- 真实照片不统一套色，不用渐变遮罩掩盖文字；文字与照片分栏或独立 caption。
- 图表背景保持平整，不做玻璃拟态。
- 轴、网格线和刻度使用低对比但可见的 ink 派生色；重点不超过一个强调色。
- tooltip 是补充层；关键数值直接标注。
- 每图紧邻一句 takeaway 与一条 source line；完整方法进 drawer。
- 图表选择完全服从 `V4_CHART_MATRIX.md`，组件不能临场改型。

## 8. 章节视觉节奏

- Prologue：视觉密度高但文字短，形成唯一首屏记忆点。
- Chapter 01：白底 / story paper，图表错落进入，避免卡片网格。
- Chapter 02：进入 data canvas，若证据允许出现第一处 sticky。
- Chapter 03：版面打开，77 节点后接地图，完成尺度转换。
- Chapter 04：field note 占主导，真实照片成为第二处 sticky。
- Chapter 05：回到阅读宽度，用一张简洁路径图收束案例。
- Chapter 06：night 可作为唯一深色章节，突出政策档案，但正文仍保证 AA。
- Epilogue：减少容器与数字，回到 story paper 和路线余韵。

## 9. 动效

以 `V4_MOTION_SYSTEM.md` 为唯一实现规范。设计验收只接受能解释数据关系或维持场景连续性的动画。首屏、收入矩阵（若通过）、77 节点和黟县现场是最多四个记忆点；其他动效退为反馈。

## 10. 移动端

- 桌面双栏改为内容顺序重排，不是比例缩小。
- sticky 场景改为图片 / 图表与文本交替的普通流。
- 宽矩阵允许组件内部横向滚动，但页面本身绝不横滚；同时提供语义表格。
- 控件不用 hover 才能理解；tooltip 支持 tap / focus。
- 77 节点数量可全部保留，但根据容器宽度重算布局，不允许散射到容器外。
- 图片裁切如损失事实信息，改为自然比例，不强求统一高度。

## 11. Accessibility

- 正确的 `h1`–`h3` 顺序和 landmarks；sticky 不改变 DOM 阅读顺序。
- focus-visible 清楚且不被遮挡；drawer 有 focus trap、Esc 关闭、关闭后返回触发点。
- 文字与背景至少 WCAG AA；小图表文本尽量达到 4.5:1。
- 状态不只用色；图形配直接标签、图案、位置或线型。
- canvas / SVG 图具有 `aria-labelledby`，并关联同数据的表格或摘要。
- reduced motion 合同见动效文档；不以隐藏内容实现减弱动画。

## 12. 反 AI 与奥卡姆门槛

以下组合出现四项即退回结构重审：巨大居中 Hero、无理由渐变、三卡模板、Bento、普遍大圆角、淡阴影、玻璃拟态、每章相同结构、generic CTA、重复 fade-up、装饰性 Lucide、假手账素材。

每加入一个库、组件、动效或素材，必须回答：它是否让数据更容易理解、让故事更容易读完，或让读者更容易记住？如果都不是，不加入。

## 13. 设计验收

- 截图比较 375 / 390 / 430 / 768 / 1280 / 1440 六个宽度。
- 关闭动画、图片、JavaScript 分别检查文章是否仍可读。
- 连续截取整页，确认不是 8 张同构 PPT。
- 统计可见大容器数量、圆角与阴影；材料身份而非卡片决定分组。
- 核对所有 raw color、font-size、duration 是否来自 tokens。
- 抽查 5 个章节转场，正文必须把上一问题递给下一问题。
