# 数字江河 V4｜动效系统

状态：实现规范  
目标：动效解释变化、维持空间连续性、帮助读者知道“现在在看什么”；不把滚动变成表演。

## 1. 总体判断

全篇只设置两个 sticky 场景：

1. 收入 × 数字游民经历（仅当完整矩阵通过证据门槛）；
2. 黟县案例：空间 → 人 → 活动 → 地方任务 → 后续报道。

如果收入矩阵仍为 `PENDING`，第一处 sticky 取消，不用别的数据硬补。样本链、77 节点和政策时间线均为正常文档流。两处上限比“2–3 个”更适合当前内容长度、移动端和无障碍成本。

## 2. 四类动效

| 类别 | 用途 | 触发 | 建议参数 | 禁止 |
|---|---|---|---|---|
| A Entrance | 标题、照片、现场材料第一次进入 | 一次性进入视口 | 180–420ms；位移 8–20px；`power2.out` / ease-out | 每段重复 fade-up、50px 以上漂移 |
| B Data Reveal | 让读者看到数据形成顺序 | 图第一次进入或章节 step 激活 | bar 420–650ms；map point 220ms stagger；Sankey 600–900ms | 弹簧过冲、循环、数字老虎机 |
| C Data Transition | 同一批对象切换维度 | 明确按钮 / step | 77 nodes 360ms layout；ECharts update 400–600ms | 用 transition 掩盖不同 population |
| D Scrollytelling | 将复杂关系拆成少数步骤 | 桌面 ScrollTrigger | scrub 0.4–0.8；step snap 不强制；pin 仅内容区 | 滚动劫持、假横滚、全页 pin |

## 3. 工具责任

### GSAP + ScrollTrigger

只负责滚动触发、pin、scrub、step 生命周期和必要的时间线编排。React 中使用 `@gsap/react` 的 `useGSAP`、局部 `ref` scope 与自动 cleanup；当前依赖尚无 `@gsap/react`，实施时单独加入并记录 bundle 影响。

每个场景使用 `gsap.matchMedia()`：桌面启用 pin，移动端和 reduced-motion 走普通文档流。图片与字体完成后统一 `ScrollTrigger.refresh()`；不得在 render 中创建 trigger。

### Framer Motion

只负责 React 状态驱动的布局连续性：77 节点重排、少量 presence / layout。保留 `useReducedMotion()`；不负责全页滚动编排。

### ECharts

负责统计图自身的 initial / update transition、tooltip 和 map。图表状态由外部 step 或控件传入，不自行监听全局滚动。

### CSS

负责 hover、focus、短 opacity / transform reveal、进度线等低成本反馈。不要给所有元素默认 transition；只声明实际变化的属性。

## 4. 两个 sticky 场景

### S1 收入 × 经历（证据通过后）

桌面布局：左侧 42% 文本 steps，右侧 58% 固定 heatmap；pin 只包裹右侧视觉容器，不 pin 其自身嵌套动画元素。

步骤：

1. 展示完整 5×5，说明行是数字游民经历、列是收入区间；
2. 高亮“半年内”，阅读入门阶段结构；
3. 高亮“2–3年”；
4. 高亮“5年以上”，比较但不作因果；
5. 显示来源与限制，解除 pin。

移动端：取消 pin / scrub。每个关键行紧跟一张简化 stacked bar 或静态表段。页面顺序与读屏顺序一致。

Reduced motion：一次显示完整矩阵，steps 点击或滚动只改变描边 / 文本，不插值颜色和位置。

### S2 黟县案例

桌面布局：一张真实新华社照片固定在视觉列；文字步骤逐项改变 caption、局部标注和旁侧数字。可以在两张已登记图片间做一次 240ms crossfade，但不制造伪镜头运动。

步骤：工业遗址 → 58 个房间 → 约 500 名旅居者 → 活动与地方任务 → 后续公开数据 → 证据边界。

移动端：照片与步骤交替排布；不 sticky。图片保持自然比例，caption 与 credit 紧随其后。

Reduced motion：所有步骤按普通长文连续出现；两张照片同时保留，不 crossfade。

## 5. 首屏与普通章节

- 首屏允许一次 700–1000ms 的“材料展开”：路线细线绘入、标题和真实 / 明示插画材料分层出现。
- 不自动播放无限水波、粒子河流或背景视频。
- 章节标题只做短 entrance，不每段都动。
- 样本 Sankey 只播放一次；回滚不重播。
- 地图点按叙事顺序依次出现，间隔 80–120ms。
- 政策时间线只强调当前阅读项，不让整条线持续追随鼠标。

## 6. 性能规约

- 只优先动画 `transform` 和 `opacity`。
- 不动画 `width`、`height`、`top`、`left`、`box-shadow`、大面积 filter。
- 只有正在动画且确有收益的元素短暂使用 `will-change`，结束后移除。
- 77 节点只做 transform layout，不逐点挂载 IntersectionObserver。
- ScrollTrigger 数量按场景集中管理，不按段落散落。
- 可视化更新合并到单次 state change；避免 React render 与 GSAP 同时写相同属性。
- 图片在布局计算前保留 aspect-ratio，防止加载后触发位置跳变。

## 7. Reduced motion 合同

在 `prefers-reduced-motion: reduce` 下：

- 所有内容仍按相同 DOM 顺序出现；
- 禁用 pin、scrub、路径绘制、视差、散射和大位移；
- 图表直接显示最终状态；
- 数据切换可使用 0–120ms opacity，或完全无动画；
- 77 节点可直接换位，选中标签和数值立即更新；
- 不隐藏任何为了动画而延迟出现的文本；
- 进度信息由标题、步骤编号和 aria current 提供，而不是位置变化。

不要用全局 `* { transition-duration: .01ms }` 作为唯一方案；每个系统都有显式 fallback。

## 8. 可访问性与输入

- 动效不自动抢焦点；键盘激活与点击得到相同行为。
- sticky steps 使用普通标题和段落，不把语义藏在 canvas。
- 动画产生的视觉变化若改变数据含义，控件应更新 `aria-pressed` / `aria-selected`；不频繁 live announce 滚动过程。
- tooltip 不是唯一信息通道，必须可由键盘触发且 Esc 关闭。
- 不使用闪烁、快速缩放和高频抖动。

## 9. 代码形态

建议新增：

```text
src/motion/useStoryScene.ts
src/motion/useReducedMotionMode.ts
src/motion/timings.ts
src/components/story/StickyNarrative.tsx
```

`useStoryScene` 只管理场景生命周期；具体 step 内容和数据留在 story / chart 组件。所有时间值来自 `timings.ts`，不在各组件散落“魔法数字”。

## 10. 验收

- 普通模式与 reduced mode 录屏各一次；两者结论和内容一致。
- 从顶部快速滚到底、反向滚动、窗口 resize 后无卡死、重叠和错误 pin。
- 375 / 390 / 430 / 768 无页面级横向滚动。
- Chrome Performance 中无持续 layout thrashing；滚动主线程长任务不由逐点动画造成。
- 卸载 / 热更新后不存在重复 ScrollTrigger。
- 所有动效都能回答“它帮助理解了什么”；答不出的删除。
