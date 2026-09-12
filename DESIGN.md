# 数字江河设计系统

<!-- impeccable:design-schema 1 -->

## Design intent

数字江河是一篇编辑拼贴式数据新闻 H5。它把“工作地点开始移动”转译为路线、坐标、纸片、乡村空间、工作物件和社区节点；视觉应该让证据先被看见，再让关系与问题留下来。

## Visual language

- 工作台：深墨绿背景承载导航、路线和关系网络，保持克制、安静、可长时间阅读。
- 纸片：暖米色、蓝绿、砖红和灰绿作为章节中的信息承载层；纸片可以有轻微错位和旋转，但不模拟真实纸张纹理。
- 节点：圆点和线只表达数量、位置或关系，不作为装饰性粒子云。
- 图像策略：当前版本使用 CSS/SVG 构造的编辑图形；没有人工筛选并附 manifest 的新闻摄影时，不添加伪造照片。

## Tokens

### Color

- `--ink` (`#17292b`)：主工作台、深色正文背景。
- `--ink-deep` (`#0e1d1f`)：页脚和最深层次。
- `--paper` (`#d7e2dd`)：浅色纸面与正文背景。
- `--paper-warm` (`#d9c4a4`)：重点、测量线、暖色纸片。
- `--teal` (`#a8c5c3`)：路线、节点、辅助信息。
- `--red` (`#c99682`)：案例转折和关系节点。
- `--green` (`#b5c5b0`)：社区、已发生或已报告的状态。
- `--muted` (`#7f9a9b`)：次要说明，只用于非核心信息。

浅色场景正文使用 `#17292b` 与 `#385456`；深色场景正文使用 `#d7e2dd` 与 `#9bb0b2`。正文和关键交互必须达到 WCAG AA 对比度，不用颜色作为唯一含义编码。

### Typography

- 展示标题：`var(--font-serif)`，实际字体栈为宋体/思源宋体类衬线字体；用于章节标题、案例名称和叙事句。
- 正文与控件：`var(--font-sans)`，实际字体栈为系统无衬线中文字体；保持信息 feed 的自然节奏。
- 数据与坐标：`var(--font-mono)`，实际字体栈为 JetBrains Mono / Cascadia Mono；用于数字、来源编号、坐标和状态。
- 标题使用紧凑字距，正文保持可读行高；不使用渐变文字，不用超窄字号承载核心说明。

### Shape and spacing

- 普通卡片和纸片默认直角；只有状态标签、圆形节点和明确的圆形关系元素使用圆角。
- 状态标签使用胶囊形，节点使用 `50%` 圆形，浮层和面板不做大圆角产品卡片化。
- 间距以 `0.25rem` 为基础，常用节奏为 `0.5rem / 0.75rem / 1rem / 1.25rem / 1.5rem / 2rem / 3rem / 4rem`。
- 阴影只用低透明度、带模糊的层次提示；禁止硬黑色偏移阴影。

## Component contracts

- `site-nav`：固定导航，桌面展示章节入口，窄屏折叠为菜单；隐藏时必须仍可通过滚动和键盘阅读。
- `button-ghost` / `morph-control`：透明底、细描边、至少 44px 触控高度；当前状态使用 `aria-pressed` 和文字，不依靠颜色单独表达。
- `evidence-trigger` / `evidence-dialog`：在页面右下角提供证据入口；原生 `dialog` 支持关闭、键盘焦点和来源回链。
- `paper-note` / `paper-frame`：分别承载浅色证据便签和深色数据面板；层次来自底色与留白，不来自厚边框。
- `community-node`：数量的可视化点阵；必须有静态数字与图例，动效不能成为唯一信息来源。
- `policy-step`：政策时间线中的单步；必须显示 `measure`、`target` 或 `reported` 状态，禁止把目标写成结果。

## Motion

- 主要动效是 77 个社区节点在模式切换时的布局过渡，持续约 `0.42s`，服务于“同一批节点换一种分组方式”的理解。
- 次要动效是导航显隐、英雄路线的轻微指针视差和状态面板切换；不自动播放承载结论的动画。
- `prefers-reduced-motion: reduce` 时关闭路线过渡、节点过渡与导航过渡；静态文本、数字、图例和按钮必须完整保留。

## Content and evidence

- 页面主线数字只能来自 `src/data/evidence.ts`，通过 `EvidenceValue` 回链到 `src/data/references.ts`。
- NCC 数字只表示社区渠道样本；77 家只表示研究纳入的社区样本；安吉青年数据使用 `youth-rural-employment` 范围；政策 target 不得写作结果。
- 不使用全国人口普查式措辞，不用未经核实的 2026 数字，不把媒体案例扩写成因果证明。

## Do / Don't

### Do

- 让一个具体地点、一组可回链数字和一个未解决问题共同组成一个屏幕。
- 保持章节标题、数据标签、来源编号和案例动作的层级稳定。
- 在移动端优先保证正文、按钮、证据入口和图例的可读性。

### Don't

- 不恢复水下潜水员、漂浮关键词、像素角色、热力图式噪音或模板化报告收尾。
- 不添加没有来源定位、范围和截止日期的数字。
- 不用全屏渐变、厚重圆角卡片、硬阴影或自动轮播抢占证据阅读。

## Canonical examples

- 首页：`src/components/sections/Hero.tsx`
- 证据样本：`src/components/sections/Chapter1Portrait.tsx`
- 重点交互：`src/components/sections/Community77Morph.tsx`
- 案例网络：`src/components/sections/AnjiNetwork.tsx`
- 证据浮层：`src/components/shared/EvidenceDrawer.tsx`
