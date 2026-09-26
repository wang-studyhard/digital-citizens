# 数字江河 V4｜代码架构

状态：实施蓝图；第一轮不删除旧模块  
目标：证据、图表转换、图表规格、叙事、动效和素材各自有唯一责任。

## 1. 目标目录

```text
src/
  components/
    layout/
      SiteHeader.tsx
      ReadingProgress.tsx
      Footer.tsx
    story/
      Prologue.tsx
      ChapterPeople.tsx
      ChapterMovement.tsx
      ChapterPlaces.tsx
      ChapterCases.tsx
      ChapterRelations.tsx
      ChapterPolicy.tsx
      Epilogue.tsx
      ChapterIntro.tsx
      StorySection.tsx
      StickyNarrative.tsx
    charts/
      ChartFrame.tsx
      SampleFlowChart.tsx
      AgeCompositionChart.tsx
      EducationBarChart.tsx
      GenderCompositionChart.tsx
      ExperienceComparisonChart.tsx
      MigrationFrequencyChart.tsx
      IncomeTenureHeatmap.tsx
      SettlementOfficeMatrix.tsx
      CommunityMorph.tsx
      CaseMap.tsx
      RelationshipPath.tsx
      PolicyTimeline.tsx
      PolicyMatrix.tsx
    cases/
      AnjiCase.tsx
      YixianCase.tsx
      FieldImage.tsx
    evidence/
      EvidenceValue.tsx
      EvidenceTable.tsx
      EvidenceDrawer.tsx
      SourceLine.tsx
      StatusMark.tsx
    shared/
      SegmentedControl.tsx
      FigureCaption.tsx
  data/
    evidence.ts
    references.ts
    legacyCandidates.ts
    chartData.ts
    chartSpecs.ts
    geography.ts
    policy.ts
    assets.ts
  lib/
    evidence.ts
    charts.ts
    assets.ts
  motion/
    useStoryScene.ts
    useReducedMotionMode.ts
    timings.ts
  styles/
    tokens.css
    base.css
    layout.css
    story.css
    charts.css
    motion.css
    print.css
  types/
    evidence.ts
    charts.ts
    assets.ts
    index.ts
```

目录表达责任，不要求一次性生成全部文件。没有数据门槛通过的图表文件不要创建空壳。

## 2. 数据单向流

```text
references.ts ─┐
               ├─ evidence.ts ── chartData.ts ── chart components
source files ──┘                       │                 │
legacyCandidates.ts (隔离)            └─ chartSpecs.ts ─┘

assets manifest ── assets.ts ── FieldImage
policy/reports ── policy.ts ── PolicyTimeline / PolicyMatrix
```

### `references.ts`

只保存来源身份、URL、类型、状态、定位和使用范围。不得存图表转换数据。

### `evidence.ts`

唯一生产事实登记。每项至少有 value、unit、population、geography、period、cutoff、sourceId、locator、claimType、status、canGeneralizeNationally。生产图不得直接读取旧稿常量。

### `legacyCandidates.ts`

只保存 `PENDING` 候选、旧值、发现位置、冲突、所需证据。此文件不能被 `App`、story 或 chart import；lint / content check 应阻止生产引用。

### `chartData.ts`

只做纯函数转换：排序、分组、百分比到近似人数、矩阵 reshape。不得添加事实、改写状态、选择图形或写叙事结论。

### `chartSpecs.ts`

保存已经编辑决定的 question、relationship、chart type、takeaway、annotation、source refs、mobile、reduced-motion 和 fallback。它引用 evidence id，不复制值。

### `policy.ts`

改为事件数组：place、date、kind (`action|reported|target`)、claim、evidenceIds、sourceRefs、limitation。timeline 与 matrix 从同一份事件派生。

### `assets.ts`

从 manifest 生成 / 校验 asset registry，提供 base-aware URL。组件只接收 `assetId`，不手写 `/media/...`。

## 3. 组件边界

### Story

决定叙事顺序、段落和组件组合；不做数据计算，不包含 ECharts option 细节，不直接操作 GSAP。

### Charts

接收已经转换的数据和 spec；负责渲染、resize、keyboard / tooltip、fallback 关联。每个图表只有一种主要关系，不提供“万能 chart type” prop。

### Evidence

负责状态、来源和方法的统一呈现。`ChartFrame` 只放短 takeaway / source；完整 population、locator 和表格进入可访问的 evidence layer。

### Motion

管理生命周期和时间 token，不拥有文案或数据。GSAP 与 Framer 不同时写同一元素属性。

### Cases

把真实照片、地点、动作和证据节点组织为报道场景；不把媒体 manifest 字段复制到 JSX。

## 4. 当前文件迁移

| 当前 | 目标 | 迁移策略 |
|---|---|---|
| `src/App.tsx` | 长文 story composition | 最后切换入口；先并行建立新章节 |
| `components/scenes/Scene0…7` | `components/story/*` | 按章节逐个替换，不原地堆更多逻辑 |
| `shared/SceneShell.tsx` | `ChapterIntro` + `StorySection` | 不再强迫每章同型；迁移完成后删除 |
| `shared/VizFigure.tsx` | `charts/ChartFrame.tsx` | 短图注前台，完整证据下沉 |
| `shared/Evidence*` | `components/evidence/*` | 保留能力，调整命名和层级 |
| `shared/ImageCard.tsx` | `cases/FieldImage.tsx` | 用 asset id；修复 base path |
| `data/derived.ts` | `data/chartData.ts` + `lib/evidence.ts` | 拆纯转换和读取帮助函数 |
| `data/geography.ts` | 保留地点资料；图数据在 chartData | 删除空兼容数组前先查零引用 |
| `data/policy.ts` | 事件模型 | 同一数据支持 timeline + matrix |
| `styles/globals.css` | 6–7 个职责文件 | 批次迁移，每批保持视觉可用；最后删除 globals |
| `types/index.ts` | 分领域类型 + re-export | 只迁移实际使用类型；最后清理旧定义 |

## 5. 图表技术

- ECharts：Sankey、bar、pie、heatmap、map；按图动态 import 或单独注册所需模块，避免全量包。
- React + Framer：77 节点 morph；这不是 ECharts 数据系列。
- HTML / SVG：关系路径、政策 timeline / matrix；不为简单排版引入图表库。
- GSAP：只用于两个 sticky 场景；通过 `@gsap/react` lifecycle。
- Visx：V4 不与 ECharts 重复同类图。若所有现有 import 清零并通过 bundle 对比，再移除 `@visx/*`；不是 Batch 1 动作。

## 6. 基础设施与路由

- 保持单页 Vite 应用，不引入 router、状态管理或 CMS。
- 保持 GitHub Pages `base`；所有 public asset 通过统一 resolver。
- 数据仍随构建发布，不增加运行期 API。
- Evidence drawer URL / hash 如需可分享，只实现最小 hash 状态，不引入路由库。
- 不使用服务端渲染、canvas 全页、WebGL 或 Unicorn Studio。

## 7. 验证守卫

扩展 `scripts/validate-content.ts`：

- evidence id 唯一，sourceId 存在；
- `verified/reported/target/derived` 与 claimType 组合合法；
- 百分比组在允许误差内；
- chartSpecs 的 evidence ids 全部存在且非 pending / rejected；
- 生产目录不能 import `legacyCandidates`；
- policy target 在前台 spec 中有目标年份；
- asset id 存在且 production asset 为 approved；
- manifest path 能通过 base resolver；
- 关键图表具备 fallback id。

新增少量测试优先覆盖纯函数和守卫，不为了测试框架而新建复杂基础设施；可继续使用现有 Node content check。

## 8. 样式架构

- `tokens.css`：primitive / semantic / component tokens、type / spacing / motion。
- `base.css`：reset、字体、正文元素、focus、selection。
- `layout.css`：grid、reading / analysis / visual width、responsive。
- `story.css`：章节、field note、policy ledger、epilogue。
- `charts.css`：frame、legend、fallback、ECharts host。
- `motion.css`：CSS feedback 与 reduced mode。
- `print.css`：打印时展开来源和静态表，取消 sticky / 深色背景。

组件样式仍可用语义 class；不引入 Tailwind 重写现有站点。

## 9. 删除门槛

删除只发生在功能迁移后：

1. `rg` 证明无 import；
2. 新旧截图与内容清单已核对；
3. `npm run verify` 通过；
4. 生产包不再包含旧模块；
5. Git diff 只删除已被 V4 等价替代的代码。

候选删除：8 个旧 Scene、`SceneShell`、`VizFigure`、旧 `globals.css`、空兼容数据、孤立历史类型、未用 Visx / icon 依赖。每类单独提交 / 任务，不混进数据恢复。

## 10. 非目标

- 不搭建通用设计系统包；
- 不抽象一套可配置 CMS schema；
- 不做任意图表 builder；
- 不增加后台、登录、实时数据、国际化或主题切换；
- 不为“一次可能复用”创建工厂、插件或 adapter 层。

## 11. 完成定义

- 所有生产事实从 evidence registry 可追到 source 与 locator；
- story 组件没有数据计算，chart 组件没有自行写结论；
- `legacyCandidates` 与生产 bundle 隔离；
- 媒体路径在 GitHub Pages 子路径正确；
- ECharts / Framer / GSAP 责任不重叠；
- 删除项有零引用证明；
- 六个断点、reduced motion、键盘、无 JS / 打印 fallback 均验收。
