import { useState } from 'react'
import { motion } from 'framer-motion'
import { ParentSize } from '@visx/responsive'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { ChartCard } from '@/components/shared/ChartCard'
import { DataSource } from '@/components/shared/DataSource'
import { ChinaMapScatter } from '@/components/charts/ChinaMapScatter'
import { DonutChart } from '@/components/charts/DonutChart'
import { DataTable } from '@/components/shared/DataTable'
import { FadeInView } from '@/components/shared/FadeInView'
import { HorizontalGallery } from '@/components/effects/HorizontalGallery'
import { communityComparison } from '@/data/tables'
import { hotspots, communityHubs, livingPreferences, stayDuration, relocationFrequency } from '@/data/geography'

// ---------- 水平堆积条形图（纯 CSS + Framer Motion，不依赖 visx BarStack）----------
function HorizontalStackedBars({
  data,
  colors,
}: {
  data: { label: string; segments: { key: string; value: number }[] }[]
  colors: Record<string, string>
}) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  return (
    <div className="space-y-5 mt-3">
      {data.map((row, rowIdx) => {
        const total = row.segments.reduce((s, seg) => s + seg.value, 0)
        return (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: rowIdx * 0.12, duration: 0.5 }}
            onMouseEnter={() => setHoveredBar(rowIdx)}
            onMouseLeave={() => setHoveredBar(null)}
            className="relative"
          >
            {/* 行标签 */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-charcoal font-sans">
                {row.label}
              </span>
              <span className="text-xs text-mist font-mono">
                {hoveredBar === rowIdx ? '' : 'hover 查看分段'}
              </span>
            </div>

            {/* 堆积条 */}
            <div className="relative h-9 w-full rounded-md overflow-hidden bg-duck-950/60 flex">
              {row.segments.map((seg, segIdx) => {
                const pct = (seg.value / total) * 100
                const isHovered = hoveredBar === rowIdx
                return (
                  <motion.div
                    key={seg.key}
                    className="h-full flex items-center justify-center text-xs font-medium text-white/90 font-sans cursor-default relative"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: colors[seg.key],
                      // 相邻段之间的细微分隔
                      marginLeft: segIdx > 0 ? 2 : 0,
                    }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + rowIdx * 0.12 + segIdx * 0.08,
                      duration: 0.7,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    title={`${seg.key}: ${seg.value}%`}
                  >
                    {isHovered && pct >= 12 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="whitespace-nowrap"
                      >
                        {seg.key} {seg.value}%
                      </motion.span>
                    )}
                    {isHovered && pct < 12 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 bg-charcoal text-cream text-[10px] rounded-md px-2 py-1 shadow-lg whitespace-nowrap z-10 font-sans"
                      >
                        {seg.key} {seg.value}%
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-charcoal" />
                      </motion.span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )
      })}

      {/* 图例 */}
      <div className="flex flex-wrap gap-5 pt-2 justify-center">
        {Object.entries(colors).map(([key, color]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-slate font-sans">{key}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Chapter3Migration() {
  return (
    <section id="chapter3" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第三章"
          title="洄游与栖居"
          subtitle="从大理到安吉，从黄山到泉州——中国数字游民正在绘制一幅全新的
          城乡流动地图。他们不是旅游，而是在不同城市之间周期性迁徙与定居。"
        />

        <QuoteBlock
          text="2025年数字游民最热门目的地：丽江、大理、西双版纳、海南……这不是度假清单，而是一群人的年度迁徙路线。"
          size="large"
        />

        {/* ============================================================
            区块 A — 数字游民热点分布地图
            minHeight: 120vh — 地图获得充足展示时间（~80vh 独享 +
            ~40vh 与画廊交叉淡入淡出）。
            画廊 start: 'top 40%' — 画廊从视口 40% 处开始 pin，
            地图下半部分仍可见时画廊自然入场，形成流畅叠化过渡。
        ============================================================ */}
        <div
          className="mt-12 flex items-center"
          style={{ minHeight: '120vh', paddingTop: '2vh', paddingBottom: '4vh' }}
        >
          <FadeInView variant="fadeUp" threshold={0} delay={0.05}>
            <div className="bg-duck-900/50 rounded-card shadow-card p-5 md:p-6 border border-duck-200/8 w-full max-w-6xl mx-auto">
              <h3 className="text-base md:text-lg font-medium text-charcoal mb-4 font-serif">
                数字游民热点分布
              </h3>
              <ParentSize>
                {({ width }) => (
                  <ChinaMapScatter
                    hotspots={hotspots}
                    width={width}
                    height={Math.max(380, width * 0.6)}
                  />
                )}
              </ParentSize>
              <p className="text-sm text-slate mt-2 text-center">
                13个热点城市 · 覆盖10个省份 · 从苍山洱海到热带海岛 · 中国数字游民地理版图
              </p>
              <div className="mt-3 text-right">
                <span className="text-xs text-mist">
                  数据来源
                  <DataSource refNumber={1} />
                </span>
              </div>
            </div>
          </FadeInView>
        </div>

        {/* 五大标志性社区据点 — 横向画廊滚动 (GSAP ScrollTrigger) */}
        <HorizontalGallery hubs={communityHubs} />

        {/* 过渡分隔 — 画廊 → 对比表 */}
        <div className="relative h-6 mt-8" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 max-w-xs h-px bg-gradient-to-r from-transparent via-duck-300/15 to-transparent" />
        </div>

        {/* 社区据点对比表 */}
        <FadeInView variant="fadeUp" threshold={0.05}>
          <h3 className="text-xl font-serif text-charcoal text-center mb-1">
            五大社区据点对比
          </h3>
          <p className="text-center text-slate text-sm mb-4">
            横向对比关键指标 · 一览社区生态全景
          </p>
        </FadeInView>
        <DataTable
          columns={communityComparison.columns}
          rows={communityComparison.rows}
          sourceRef={1}
          rowDelay={0.08}
        />

        {/* 居住偏好 + 停留时长 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* 左: 居住方式偏好 — 水平堆积条形图 */}
          <ChartCard title="居住偏好 · 游牧 vs 定居" sourceRef={1}>
            <HorizontalStackedBars
              data={livingPreferences.map((d) => ({
                label: d.category,
                segments: d.arrangements.map((a) => ({
                  key: a.label,
                  value: a.percentage,
                })),
              }))}
              colors={{
                '完全定居': '#5c7a73',
                '半定居': '#8aa7a0',
                '游牧': '#b9c8be',
              }}
            />
            <p className="text-xs text-mist mt-5 text-center leading-relaxed">
              数字游民群体中 <strong className="text-duck-400">68%</strong> 保持高度流动，
              而半游民中近半数选择半定居模式——拥有基地城市、周期性外出。
              非游民远程工作者则呈现相反的定居倾向。
            </p>
          </ChartCard>

          {/* 右: 停留时长 + 换城频率 */}
          <div className="space-y-8">
            {/* 停留时长偏好 — 环形图 */}
            <ChartCard title="单次停留时长偏好" sourceRef={1}>
              <ParentSize>
                {({ width }) => (
                  <DonutChart
                    data={stayDuration.map((d) => ({
                      label: d.label,
                      value: d.percentage,
                    }))}
                    width={width}
                    height={240}
                    colors={['#5c7a73', '#7fa998', '#b9c8be', '#d9c9a5']}
                    thickness={38}
                    centerLabel="占比 38%"
                    centerValue="1–3 个月"
                  />
                )}
              </ParentSize>
              <div className="mt-3 space-y-1.5">
                {stayDuration.map((d) => (
                  <div key={d.label} className="flex items-center justify-between text-xs text-slate font-sans">
                    <span>{d.label}</span>
                    <span className="text-charcoal font-medium">{d.percentage}%</span>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* 换城频率 */}
            <ChartCard title="换城频率" sourceRef={1}>
              <div className="space-y-4 mt-4">
                {relocationFrequency.map((item, i) => (
                  <FadeInView key={item.label} variant="fadeLeft" delay={i * 0.1}>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate w-28 text-right font-sans shrink-0">
                        {item.label}
                      </span>
                      <div className="flex-1 h-7 bg-duck-100/40 rounded-full overflow-hidden">
                        <FadeInView variant="fadeIn" delay={0.3 + i * 0.1}>
                          <div
                            className="h-full rounded-full bg-duck-400 flex items-center justify-end pr-3"
                            style={{ width: `${item.percentage}%` }}
                          >
                            <span className="text-xs text-white font-mono font-medium">
                              {item.percentage}%
                            </span>
                          </div>
                        </FadeInView>
                      </div>
                    </div>
                  </FadeInView>
                ))}
              </div>
              <p className="text-sm text-slate mt-4 text-center">
                超过半数换城频率不确定——这种不确定性本身就是数字游民生活方式的核心特征
              </p>
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  )
}
