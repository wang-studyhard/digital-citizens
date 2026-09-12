# 数字江河 V3｜施工状态

更新时间：2026-09-12

本表对照《数字江河 V3｜整体重绘与可视化增强正式施工方案》。当前工作停在本地 `v3-freeze-candidate` 分支，不推送、不部署；用户提供的原始蓝图文件保留在工作区，不纳入本轮代码入口。

## V3 验收状态

| 项目 | 状态 | 证据 |
|---|---|---|
| Scene 0–7 独立叙事 | 已完成 | `src/components/scenes/Scene0Hero.tsx` 至 `Scene7Conclusion.tsx`，入口由 `src/App.tsx` 串联。 |
| 研究台账视觉 | 已完成 | `src/styles/globals.css` 使用纸张底、深色夜场、田野绿和锈红；无旧版深色编辑拼贴入口。 |
| 证据主轴 | 已完成 | 48 条指标集中于 `src/data/evidence.ts`；图表视图与交互步骤集中于 `src/data/derived.ts`。 |
| 77 社区主交互 | 已完成 | Scene 3 仅保留一个 77 节点场；按功能、区位、规模、增长和总量切换，桌面表格/移动端列表均可读。 |
| 案例与政策 | 已完成 | Scene 4 使用 3 张已登记真实图片；Scene 5 将 `measure`、`reported`、`target` 分列，不把目标写成结果。 |
| 键盘、移动与动效边界 | 已完成候选 | 原生 `dialog`、按钮、表格 fallback、图片错误兜底、`prefers-reduced-motion` 与 Framer Motion 减弱动效已接入。 |
| 旧视觉清理 | 已完成 | 旧 sections/effects/charts/hooks/shared 入口已从源码删除，未重新接回主线。 |

## 内容边界

- NCC 827 回收、798 有效、282 数字游民样本、516 探索者样本、8 名结构化访谈对象只描述社区渠道样本，不外推全国。
- 77 家是研究纳入样本；“约”只用于派生展示，原始证据 ID 和口径仍可从图表/抽屉回看。
- 安吉青年数字使用 `youth-rural-employment` scope，不写成数字游民人数。
- 丽水报道数字保持 `reported`；黄山 2027 数字保持 `target`；两者不合并成成效证明。
- 不生成或伪造新闻摄影、人物肖像、AI 地图、AI 图表和政策截图。

## 已执行验证

最近一次 `npm run verify` 于 2026-09-12 通过：

```text
content check passed: 48 evidence metrics
eslint passed
TypeScript + Vite build passed
performance budget passed: 6 build assets checked
```

构建产物位于 `dist/`，其内容随本地构建更新；尚未进行线上回读、Lighthouse 或真实设备测试。浏览器 QA 已覆盖 390、430、768、1024、1440、1920 视口的横向溢出检查，并检查了导航目录、证据抽屉、77 节点交互、黄山步骤和真实图片自然尺寸。

## 收口待办

- 在最终人工审阅前，继续保留 `reported` / `target` / `pending` 状态，不把候选版称为正式冻结。
- 若进入发布流程，再单独完成部署授权、产物回读和线上内容/控制台复核。
- 工作区中旧蓝图、压力测试和历史说明文件仍保留；它们是待人工确认的清理候选，不在本轮删除。
