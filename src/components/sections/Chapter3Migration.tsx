import { ParentSize } from '@visx/responsive'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { ChartCard } from '@/components/shared/ChartCard'
import { ChinaMapScatter } from '@/components/charts/ChinaMapScatter'
import { StackedBarChart } from '@/components/charts/StackedBarChart'
import { DataTable } from '@/components/shared/DataTable'
import { FadeInView } from '@/components/shared/FadeInView'
import { HorizontalGallery } from '@/components/effects/HorizontalGallery'
import { communityComparison } from '@/data/tables'
import { hotspots, communityHubs, livingPreferences, relocationFrequency } from '@/data/geography'

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

        {/* 中国地图 */}
        <div className="mt-16">
          <ChartCard title="数字游民热点分布" sourceRef={1} fullWidth>
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
          </ChartCard>
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

        {/* 居住偏好 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          <ChartCard title="居住偏好 · 游牧 vs 定居" sourceRef={1}>
            <ParentSize>
              {({ width }) => (
                <StackedBarChart
                  data={livingPreferences.map((d) => ({
                    label: d.category,
                    segments: d.arrangements.map((a) => ({
                      key: a.label,
                      value: a.percentage,
                    })),
                  }))}
                  width={width}
                  height={280}
                  segmentKeys={['完全定居', '半定居', '游牧']}
                  colors={['#5c7a73', '#8aa7a0', '#b9c8be']}
                />
              )}
            </ParentSize>
          </ChartCard>

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
    </section>
  )
}
