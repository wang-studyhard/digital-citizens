# 数字江河 V4｜素材审计与计划

状态：历史 V4 规划。2026-09-26 当前10章的素材位置、图注目的、无素材版式与赛事待核事项以 `V6_2_BATCH5_ASSET_HANDOFF.md` 为准；以下旧场景与生成占位方案不用于当前主线。  
原则：真实现场优先；解释图形可以设计；生成素材必须显式标注，永不冒充新闻照片。

## 1. 状态

| 状态 | 含义 |
|---|---|
| HAVE | 本仓库已有、来源和用途明确 |
| FIND | 需从官方 / 报道原页取得并登记 |
| DESIGN | 用 SVG / CSS / HTML 设计，不声称为现场证据 |
| GENERATE | 可用生成式工具制作的编辑插画；必须披露 |
| REJECT | 不应获取或不应使用 |

## 2. 当前素材审计

| ID | 状态 | 文件 / 来源 | 用途 | 问题与动作 |
|---|---|---|---|---|
| A01 安吉共享办公 | HAVE | `public/media/editorial/xinhua-anji-shared-office.jpg`；新华社 2023-06-02 | 安吉现场 | 路径以 `/media/...` 开头，Pages 子路径失效；改为 base-aware |
| A02 黟县社区分享 | HAVE | `xinhua-yixian-heidou-community.jpg`；新华社 2024-09-14 | 黟县 sticky 主图 | 保留自然比例、caption、摄影署名 |
| A03 黟县围坐交流 | HAVE | `xinhua-yixian-heidou-discussion.jpg`；同上 | 黟县步骤补图 | 与 A02 不重复占同一视觉层 |
| A04 中国边界 | HAVE | `public/geojson/china.json` | 四案例定位 | 只作案例底图，不画 77 点或热度 |
| A05 图标 sprite | HAVE | `public/icons.svg` | 少量界面图标 | 盘点实际引用；不把图标变成装饰墙 |
| A06 字体 | HAVE | 阿里巴巴普惠体、Noto Serif SC、JetBrains Mono | 正文 / display / data | 检查加载体积、字重与 `font-display`；不新增第四字体 |
| A07 证据记录 | HAVE | `public/media/manifest.json` | 来源治理 | 路径修复；保留 rights、credit、alt、dimensions |

当前三张照片均登记为 `user-authorized-project-integration`，并明确新华社版权与署名；它们不是开放许可素材，不能从项目授权推导出通用再发布权。

## 3. V4 素材需求

| 场景 | 优先级 | 状态 | 所需内容 | 来源策略 | 无素材 fallback |
|---|---:|---|---|---|---|
| Prologue 移动工作桌 | P1 | DESIGN，必要时 GENERATE | 电脑、票据、路线、地图碎片、共享空间的编辑组合 | 优先使用抽象 SVG / CSS 与已登记照片局部；生成时不得出现可误认为真实人物的摄影 | 纯版式 + 路线 SVG + 样本数字 |
| 安吉现场补充 | P1 | FIND | 外观 / 共享办公 / 与地方合作的真实图 | 新华社、中国青年报、安吉政府原页；确认署名和项目使用授权后入库 | 现有 A01 + 文字时间线 |
| 黟县遗址外观 | P1 | FIND | 工业遗址改造后的外部或全景 | 新华社原报道 / 黄山市政府；不可从搜索结果直接保存 | A02/A03 + 语义图 |
| 丽水政策与社区 | P2 | FIND | 官方发布现场、社区空间或政策文件封面 | 丽水政府、人民网 / 浙江日报原页 | 政策时间线，无照片 |
| 大黄山政策 | P2 | HAVE / DESIGN | 官方文件标题、日期、目标 | 官方行动方案 HTML，不截图长文；设计档案条目 | 纯文本 ledger |
| 四案例地图 | P1 | DESIGN | 中国简图、四地点位、标注 | 本地 GeoJSON + 登记坐标 | 地点列表 |
| 关系路径图 | P1 | DESIGN | 旅居→参与→任务→合作→待观察 | SVG / HTML，由来源节点组成 | 有序列表 |
| 章节间路线纹理 | P3 | DESIGN | 低对比河流 / 网络路线 | SVG path，不用噪声贴图 | 留白和细线 |

## 4. 获取与入库流程

1. 只从新闻机构原页、政府站、研究发布页或明确授权的资产库寻找。
2. 先记录页面 URL、标题、发布日期、摄影者 / 制作者、caption、权利说明，再下载。
3. 不从搜索引擎缩略图、二次转载拼图、社交平台搬运图直接入库。
4. 文件名使用 `publisher-place-subject-date.ext`；保留原比例和尽可能接近原始的尺寸。
5. 添加到 `public/media/manifest.json` 后，运行 manifest 校验；组件只通过 asset id 读取。
6. 若权利不明，状态保持 `FIND`，设计 fallback 继续施工，不用“临时图”混入生产。
7. 部署后从 `/digital-citizens/` 真实子路径逐张检查 200、尺寸、alt、caption 和 credit。

## 5. 生成素材占位协议

缺少首屏氛围素材不应阻塞版式，但占位必须让后续代理和编辑都知道它不是事实照片：

```text
[ASSET_PLACEHOLDER]
id: prologue-mobile-work-map
status: GENERATE
type: editorial-illustration
scene: prologue
purpose: 把电脑、车票与地理路线组织成非写实开场
content: 俯视桌面，纸张与细路线连接到三个抽象地点；无可识别人物、无品牌 logo、无伪造新闻现场
palette: paper / ink / digital-water / route / land / human-accent
aspect: desktop 16:9; mobile 4:5 safe crop
disclosure: 编辑插画 / AI-assisted illustration
replaceWith: 经编辑确认的原创插画或真实授权素材
[/ASSET_PLACEHOLDER]
```

生成素材规则：

- 只用于氛围与概念，不承载“某地真实发生”的证据；
- 图注写“编辑插画”，manifest 中 `synthetic: true`、`factualRole: illustration`；
- 不生成貌似采访对象、政策文件、地图数据点或新闻摄影；
- 不模仿在世摄影师 / 插画师的独特风格；
- 原始 prompt、模型、生成日期和人工修改写入 manifest note。

## 6. 图片组件要求

- 使用 `assetId` 解析 base-aware URL，不让 story 组件手写路径。
- `width` / `height` 或 `aspect-ratio` 固定布局，避免 CLS。
- alt 描述视觉信息；caption 说明发生什么；credit / source 独立可见。
- 装饰图 `alt=""`；证据照片不能空 alt。
- 加载失败时保留 caption、credit 和来源链接，fallback 不替换成无来源图库图。
- 首屏最大图按断点提供合适尺寸 / 格式；不为了“现代感”给照片套统一渐变蒙版。

## 7. 明确拒绝

- AI 生成的“安吉青年”“黟县社区活动”等伪现场照片；
- 无版权信息的网图、搜索缩略图、社交平台搬运图；
- 只为填满屏幕而加入的 Lottie、Unicorn Studio 背景或循环粒子；
- 把旧报告截图直接当图表；应录入数据后重绘，并保留来源；
- 把中国地图做成社区热度或迁徙流向图；当前无此数据；
- 胶带、撕纸、咖啡渍、随机旋转等“档案风”装饰套件。

## 8. 验收

- manifest 每个生产素材都有 id、path、kind、sourceUrl、publisher、date、credit、caption、alt、rights、dimensions、synthetic、factualRole、scene、reviewStatus。
- 所有 `HAVE` 图片在本地和 GitHub Pages 子路径均加载成功。
- 页面关图后仍能理解事实；图片不是唯一信息载体。
- 生成素材在页面和 manifest 都有披露，且不承担证据角色。
- Lighthouse / 浏览器检查无明显 CLS；移动端裁切不遮挡主体或文字。
