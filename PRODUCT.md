# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

主要读者根据施工蓝图推断为数据新闻比赛评委与普通公众，待用户复核。评委需要快速理解问题意识、证据边界与作品创新；公众需要在不依赖动画的情况下读懂故事、案例和限制。

## Product Purpose

“数字江河”是一篇以数据、地点和真实案例推进的交互式数据新闻作品，观察当工作地点开始移动后，年轻人与乡村、地方政策和地方关系发生了什么。成功标准是：读者能记住一条可信的数据主轴、两个具体的人文案例，以及“留下来”不等于一次入住的判断。

## Positioning

作品不把中国数字游民写成一个有全国人口普查的单一群体，而是把有限样本、社区研究、媒体报道与政策文本放在同一条可追溯叙事中，明确区分样本、报道、目标与结果。

## Operating Context

单页滚动 H5，主要在桌面浏览器和移动端阅读，也可能被评委以键盘、触摸、减弱动效和慢速网络访问。作品需要与设计报告、作品说明、数据来源与方法文档一起交付；当前阶段不自动推送 main 或部署正式站点。

## Capabilities and Constraints

- React + TypeScript + Vite + Tailwind 为既有工程基础。
- P0 交付包含 Scene 0–7、Evidence Registry、来源/方法抽屉、移动端、键盘、减弱动效与内容校验。
- 主线数字必须来自 `src/data/evidence.ts`，所有可视化必须能回到 source → claim → data → transformation → viz。
- NCC 只描述社区渠道样本；77 家只描述研究纳入的社区样本；安吉青年数据使用 `youth-rural-employment` scope；政策 target 不得写成 result。
- 重型交互最多 2–3 个；Image 2.5 素材不由 Codex 生成，只集成人工筛选并有 manifest 的素材。
- 页面标题不超过 20 个中文字，页面和作品名称不得出现学校名称或显著个人信息。

## Brand Commitments

- 作品名称：数字江河。
- 叙事语气：真诚、具体、克制，优先回答谁在什么地方、什么时候做了什么、产生了什么结果、还有什么没有解决。
- 蓝图固定的编辑拼贴、路线、坐标、乡村空间、工作物件和社区节点作为视觉语义；退役水下潜水员、漂浮关键词和报告式结尾。

## Evidence on Hand

- 施工蓝图：`数字江河_H5_V2.1_Freeze_Codex正式施工蓝图.md`。
- 公开来源与定位：`docs/source-registry.md`、`src/data/references.ts`。
- 结构化证据：`src/data/evidence.ts`。
- 地图 GeoJSON：`public/geojson/china.json`，只用于可验证省级或案例定位。
- 当前没有由人工筛选并附 manifest 的正式图片素材；不得伪造新闻摄影。

## Product Principles

1. 先证据，再表达。
2. 先说明边界，再展示数字。
3. 案例必须回到具体地点、行动与关系。
4. 动画可以引导阅读，但不能承担信息本身。
5. 只替换旧内容，不无限追加范围。

## Accessibility & Inclusion

所有主线信息在静态 HTML 文本中可读；重型交互提供按钮或键盘路径；颜色不是唯一编码；图片失败、JavaScript 失败和 `prefers-reduced-motion` 时仍保留完整叙事与数据边界；触控目标至少 44×44px。
