# 数字江河 V3｜当前项目审计

审计日期：2026-09-12
审计范围：当前工作区源码、数据、来源台账、媒体清单、构建脚本与项目说明
审计依据：`digital-river-v3-codex-plan.md`
本阶段状态：Phase 0 完成；未修改 UI、数据、来源和图片资产。

## 1. 审计方法与基线

已检查：

- `src/App.tsx`、`src/components/`、`src/data/`、`src/styles/globals.css`
- `public/media/manifest.json`、`public/media/`、`public/geojson/`、`public/icons.svg`
- `CLAUDE.md`、`DESIGN.md`、`PRODUCT.md`
- `docs/plan-status.md`、`docs/content-audit.md`、`docs/source-registry.md`
- `package.json`、`index.html`、`vite.config.ts`
- `scripts/validate-content.ts`、`scripts/check-performance.mjs`

只读验证结果：

- `npm run content:check`：通过，48 条 evidence metrics
- `npm run lint`：通过
- 三张 manifest 图片均存在于本地 `public/media/editorial/`
- 当前源码没有发现远程新闻图片、AI 图片或图片 URL；但字体仍通过 Google Fonts 远程加载
- 本次未重新执行会写入 `dist/` 的构建，也未重新做浏览器、Lighthouse 或真实设备测试

工作区状态：当前已有用户文件和两个未跟踪的规范文件；本审计新增的 `CURRENT_AUDIT.md` 不覆盖既有文件。

## 2. 当前技术结构

| 项目 | 当前状态 |
|---|---|
| 入口 | `src/App.tsx` 串联 Scene 0—7，外层有 `NavBar`、`Footer`、`EvidenceDrawer` |
| 框架 | React 19 + TypeScript + Vite |
| 样式 | Tailwind CSS v4 入口导入，但主视觉为 `src/styles/globals.css` 手写 CSS |
| 交互 | 原生 `dialog`、按钮状态、滚动进度、平滑滚动、Framer Motion 节点重排 |
| 数据 | `src/data/evidence.ts` 为主线指标唯一入口；`derived.ts` 保存派生视图、步骤和表格 |
| 来源 | `src/data/references.ts` 16 条来源；`DataSource` 与 `EvidenceDrawer` 提供回看路径 |
| 图片 | `ImageCard` 有尺寸、alt、caption、credit、错误占位与 synthetic 标记 |
| 验证 | 内容门禁、ESLint、TypeScript/Vite 构建和性能预算脚本已存在 |

依赖中当前实际被主线源码使用的主要包是 React、React DOM、Framer Motion 和 Tailwind CSS。`@iconify/react`、`@visx/*`、ECharts、GSAP、`react-intersection-observer` 在当前入口未被使用；后续不应为了视觉重构重新接回旧图表或旧动效。

## 3. Scene 0—7 现状

| Scene | 当前内容与证据 | 当前视觉/交互 | 相对 V3 规范的审计判断 |
|---|---|---|---|
| 00 | 标题、核心问题、827 → 798 → 282 样本链、516 分支、8 名访谈对象及全国外推边界 | 左文右台账，无真实图片；底部有开始阅读入口 | 研究边界清楚；但首屏仍是“标题 + 资料卡”的固定 Hero 结构，尚未形成真实现场材料展开 |
| 01 | NCC 样本台账；出生年代、学历、性别；n=282 的约数派生；282 点阵切面 | 三个横向比例条 + 静态表格；点阵切换 3 个切面 | 数据边界完整；三个相似 `VizFigure` 并排，仍有重复容器感；尚未形成 798 个样本逐步聚合的独立数据新闻记忆点 |
| 02 | 工作地点、交付、地方接触、劳动保障的编辑关系；明确非统计图 | 深色场景、三列判断、SVG 关系图 | 叙事判断克制；关系图没有伪造数据，但需要在重构中确认其是否保留及如何承担 Scene 02 的问题 |
| 03 | 77 家研究纳入社区；按区位、功能、规模等聚合维度重排 | 深色面板、77 个节点、分段按钮；Framer Motion 360ms layout 动画；桌面表格/移动条目 | 当前最接近“数据图 + 交互”；已有 reduced-motion；仍需补充明确动画目的、触发、fallback 文档，并降低大面板容器感 |
| 04 | 安吉青年入乡案例；黟县工业遗址、58 个房间、约 500 名旅居者及活动/项目联系 | 3 张本地新华社照片；安吉行动链；黟县 5 步按钮切换 | 真实图片、caption、credit、来源均具备；是当前最符合“现场纸”的章节；按钮式步骤尚不是完整 sticky story |
| 05 | 丽水、大黄山政策证据；明确拆分措施、已报道、目标与不能推出 | 深色政策台账；表格 fallback；文字状态 + 色线 | 证据状态分离清楚；需继续保持 `reported`/`target`，不要把报道或目标升级为结果 |
| 06 | 能确认 / 证据还不能回答；入住 ≠ 留下、到访 ≠ 就业、项目 ≠ 长期结果 | 两栏判断块 | 收束有效；但视觉上仍是两块并列内容容器，可在后续改成 KNOWN / UNKNOWN / NOT YET PROVEN 的档案收束 |
| 07 | 关系是否留下来的结论与继续观察的问题 | 大字结论 + 来源按钮 | 结论清楚、无多余动效；还没有“所有材料重新形成调查桌”的最终记忆点 |

## 4. 数据与证据资产

### 已进入主线的可见数据

- NCC 社区渠道样本：827 份回收、798 份有效、282 名数字游民样本、516 名探索者、8 名结构化访谈对象。
- NCC 282 样本内部画像：出生年代、学历、性别；按 n=282 折算的数量都以“约”表达。
- 社区研究：77 家截至 2025-12-31 的中国内地正常运营社区；52 / 13 / 12 的区位结构；四类功能比例；68 / 9 的规模结构。
- 安吉案例：37,000 平方米空间资源、约 1,200 名常态化办公青年；scope 为 `youth-rural-employment`，不能写成数字游民规模。
- 黟县案例：58 个房间、约 500 名旅居者；属于具体社区报道，不代表长期居住或全市规模。
- 政策与报道：大黄山 2027 目标、丽水 2025/2026 报道进展、安吉 2026 青年入乡报道、黟县政府公开进展。

主线共登记 48 条 `EvidenceMetric`。每条指标包含 population、geography、scope、period、cutoff、sourceId、claimType、status 和全国外推开关。内容门禁当前通过。

### 已明确退出或不进入生产入口的内容

旧职业分布、17.05%、50 小时/周、收入热力图、挑战趋势、旧生活成本、海外比较、省级伪地图、全国逐社区点位、大理完整章节、Sankey 和后台更新均被当前项目规则挡在主线之外。类型定义和历史文件中仍能看到部分旧接口，这是残留资产，不应在重构时误接回入口。

## 5. 来源资产

当前来源台账为 16 条：

- `verified`：11 条
- `reported`：4 条
- `pending`：1 条（编号 13，仅保留旧版编号，不进入主线事实）

来源类型覆盖 NCC 调查阅读器、新华社/新华网、中国青年报转载、《人民论坛》研究、地方政府行动方案、浙江在线、人民网浙江频道及黄山市政府公开信息。`EvidenceDrawer` 可显示定位、状态和说明；主线数字通过 `DataSource` 回到来源编号。

需要保留的语义边界：社区渠道样本不是全国人口；77 家不是全国普查；安吉青年入乡数字不是数字游民人数；大黄山 2027 数字是政策目标；地方公开报道不是独立效果评估。

## 6. 图片与媒体资产

### 已核验本地图片

| 资产 | 角色 | 状态 |
|---|---|---|
| `xinhua-anji-shared-office.jpg` | 安吉共享办公区现场 | 本地存在，approved，非 synthetic |
| `xinhua-yixian-heidou-community.jpg` | 黟县分享活动现场 | 本地存在，approved，非 synthetic |
| `xinhua-yixian-heidou-discussion.jpg` | 黟县社区交流现场 | 本地存在，approved，非 synthetic |

三张图片均登记了 intrinsicWidth、intrinsicHeight、alt、caption、photographer、sourceUrl、rights 和 licenseNote；页面调用 `ImageCard` 时也传入尺寸、caption、credit 和失败占位。

### 缺口与风险

- 规范要求的 `public/assets/photos/`、`illustrations/`、`charts/`、`textures/`、`icons/`、`sources/` 与当前目录结构不一致；当前媒体实际位于 `public/media/editorial/`。
- 当前没有发现失效的本地图片引用，也没有发现生产入口使用远程图片。
- `public/geojson/china.json` 和 `public/icons.svg` 仍在工作区，但当前主线没有使用；后续仅在证据和功能重新确认后处理，不删除。
- 当前 `manifest.json` 已具备大部分资产字段，但不是规范提出的 `asset-manifest.ts` 结构；这是后续资产系统的迁移候选，不是本阶段问题。
- 图片版权说明依赖用户授权项目集成，不能在页面中简化成公共领域或无版权素材。

## 7. 图表系统

当前主线图表/信息图共有：

- Scene 01：3 个百分比堆叠条、3 个静态证据表、1 个 282 点阵切面。
- Scene 02：1 个 SVG 编辑关系图，明确标注非统计图、非因果强度。
- Scene 03：1 个 77 节点聚合/重排图、1 个静态证据表、Framer Motion 布局切换。
- Scene 05：1 个政策台账预览、1 个静态证据表。

现有 `VizFigure` 已统一 title、unit、population、scope、period、cutoff、sourceRefs、locator、scopeNote 和表格 fallback。缺少的是每张图在代码/文档层明确记录 `QUESTION / DATA / RELATIONSHIP / CHART TYPE / TAKEAWAY / ANNOTATION / SOURCE / MOBILE VERSION`，以及更明显的 direct labels 与 takeaway。

当前未使用 D3、Visx 或 ECharts；旧依赖不代表当前存在对应图表。

## 8. 动效系统

- 主线运行时动画只有 Scene 03 的 Framer Motion `layout` 节点重排，时长 0.36s、easeOut。
- CSS 另有导航/开始阅读链接的 0.2s 颜色过渡、平滑滚动和顶部阅读进度条缩放。
- `@media (prefers-reduced-motion: reduce)` 已将滚动、transition 和 animation 降级；Scene 03 使用 `useReducedMotion()` 关闭 layout 动画。
- 未发现 GSAP、ScrollTrigger、Lenis、Three.js、Lottie、ReactBits 或 Scroll Hijacking 运行时。

当前缺少每个动画的 `PURPOSE / TRIGGER / DURATION / REDUCED-MOTION FALLBACK` 记录。后续只保留能改善理解的 2—3 个核心 scrollytelling 记忆点，不以补充动效数量为目标。

## 9. 字体、颜色与容器现状

### 字体

当前通过 `src/main.tsx` 引入 Fontsource 的本地变量 WOFF2：Noto Sans SC、Noto Serif SC、JetBrains Mono；CSS 分别映射为 `--sans`、`--serif`、`--mono`。字体包按 `unicode-range` 拆分字符子集并使用 `font-display: swap`，不再依赖 Google Fonts 远程样式表。字体数量仍控制在正文、标题、等宽三类。

### 颜色

当前 token 是冷灰纸 `#f3f4f1`、纸面层级 `#e7ebea / #dce4e5`、深墨蓝 `#172a3a`、雾蓝、田野绿 `#667d58`、朱砂 `#b84f3e`、夜场 `#213746`。整体方向符合“昼光资料室”，但与新规范建议的 `#F2EFE6 / #20262B / #263B4B / #87A3B5 / #667C61 / #C94E3D` 存在细微差异，需要在 Design Constitution 中先冻结，而不是在组件中零散改色。

### 容器与形状

当前没有渐变、玻璃拟态、全局阴影或大面积圆角卡片；普通信息块主要是直角、细边框和色块。仍存在：

- `VizFigure`、`hero-record`、`profile-dots`、`community-panel` 等重复信息容器
- 分段控制使用胶囊按钮
- 圆形节点、圆形标记和少量状态胶囊

这不是违规本身，但新规范要求进一步降低“每区一个容器”的产品界面感，并明确正文纸、数据纸、现场纸、档案纸的材料身份。

## 10. 响应式与可访问性

- 当前断点主要为 `1050px` 和 `720px`，body 最小宽度 320px。
- 桌面使用双栏/三栏，720px 以下大部分内容改单列；表格在桌面局部横向滚动，移动端切换为纵向条目。
- 现有项目文档声称覆盖 390、430、768、1024、1440、1920px；本次审计没有重新打开浏览器复测，因此视为既有记录，不视为本轮实测结果。
- 已有 `alt`、图表 `role=img` 和 `aria-label`、原生按钮、`dialog`、`focus-visible`、Escape 关闭及 reduced-motion 逻辑。
- 需要后续人工复核：来源抽屉焦点回收、移动目录焦点、动态点阵的屏幕阅读器叙事、表格/图形的 source marker 位置，以及 375px 断点。

## 11. Phase 0 结论

当前项目已经具备可复用的证据台账、来源抽屉、真实图片、静态表格 fallback、移动端基础和内容门禁；无需重做数据事实层。

真正需要按 V3 规范重构的重点是：

1. 先冻结一套更明确的 Grid、Typography、Paper identity、Chart grammar 和 Motion grammar。
2. 把现有 Scene 0—7 从“统一 SceneShell + 重复信息块”改成节奏不同、但仍共享底层网格的编辑叙事。
3. 补全 Scene Matrix、Content Audit、Asset Audit，以及图表和动效的可核验字段。
4. 优先解决远程字体、资产目录契约、首屏现场材料和 2—3 个真正有解释作用的 scrollytelling 记忆点。
5. 保持当前证据边界和已通过的内容门禁；不恢复旧版统计、不补造新闻摄影、不把报道或目标改写成结果。

下一阶段应先写入 `docs/V3_DESIGN_CONSTITUTION.md`、`docs/V3_SCENE_MATRIX.md` 和资产/内容审计，再进入 UI 改造。
