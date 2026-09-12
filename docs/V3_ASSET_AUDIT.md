# 数字江河 V3｜Asset Audit

日期：2026-09-12
范围：`public/`、`src` 图片引用、字体入口和媒体清单

## 已存在并被主线使用

| Asset | 文件 | 场景 | 状态 | 备注 |
|---|---|---|---|---|
| 安吉共享办公区 | `public/media/editorial/xinhua-anji-shared-office.jpg` | 04 | approved / local | 1023×768；新华社；caption、credit、sourceUrl、rights 齐全 |
| 黟县分享活动 | `public/media/editorial/xinhua-yixian-heidou-community.jpg` | 04 | approved / local | 1024×672；新华社；caption、credit、sourceUrl、rights 齐全 |
| 黟县社区交流 | `public/media/editorial/xinhua-yixian-heidou-discussion.jpg` | 04 | approved / local | 990×660；新华社；caption、credit、sourceUrl、rights 齐全 |
| Favicon | `public/favicon.svg` | 全局 | local | 保留 |

三张现场图片均通过 `ImageCard` 渲染，具有 intrinsic dimensions、自然比例、alt、失败占位和版权说明。当前没有发现失效图片引用或远程新闻图片引用。

## 存在但当前未进入主线

| Asset | 状态 | 处理 |
|---|---|---|
| `public/geojson/china.json` | legacy / inactive | 不删除；无逐社区证据前不接回地图 |
| `public/icons.svg` | legacy / inactive | 不删除；当前主线无 icon 依赖 |
| 根目录 `screenshot-*.png` | history / reference | 不作为生产素材，不删除 |
| 根目录历史说明与压力测试文件 | history / reference | 不删除，避免丢失用户工作痕迹 |

## 资产契约缺口

- 规范目标目录 `public/assets/photos/`、`illustrations/`、`charts/`、`textures/`、`icons/`、`sources/` 当前不存在；目前实际使用 `public/media/editorial/`。
- 规范提出的 `asset-manifest.ts` 当前由 `public/media/manifest.json` 部分承担；暂不重复建立第二个事实源，迁移前先确认字段和调用方。
- 字体已本地化为 Fontsource 的变量 WOFF2 包：`@fontsource-variable/noto-sans-sc@5.3.0`、`@fontsource-variable/noto-serif-sc@5.3.0`、`@fontsource-variable/jetbrains-mono@5.3.0`，均按 OFL-1.1 使用；入口在 `src/main.tsx`，CSS 通过 `@font-face` 的 `unicode-range` 按需匹配字符子集，满足 `font-display: swap`。
- 没有可用于首屏的独立 Level A 现场图；若首屏使用现有图片局部，必须继续保留 caption、credit、date 和 source，不能裁成无地点的装饰背景。

## 资产红线

- 不生成或伪造新闻摄影、人物肖像、地图、图表、政策截图或采访。
- 编辑插画如未来加入，必须标注 Level C / illustration，不得混入事实图片。
- 不因为重构目录而删除旧媒体、截图、GeoJSON 或用户残留文件。
