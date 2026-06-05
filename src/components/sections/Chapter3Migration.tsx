import { ParentSize } from '@visx/responsive'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { ChartCard } from '@/components/shared/ChartCard'
import { ChinaMapScatter } from '@/components/charts/ChinaMapScatter'
import { StackedBarChart } from '@/components/charts/StackedBarChart'
import { ImageCard } from '@/components/shared/ImageCard'
import { DataTable } from '@/components/shared/DataTable'
import { FadeInView } from '@/components/shared/FadeInView'
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
              10个省份涌现数字游民社区 · 从一线城市卫星城到偏远古镇 · 地理套利绘就新版图
            </p>
          </ChartCard>
        </div>

        {/* 社区据点卡片 — 交错入场 */}
        <FadeInView variant="fadeUp" className="mt-16">
          <h3 className="text-2xl font-serif text-charcoal text-center mb-2">
            五大标志性社区据点
          </h3>
          <p className="text-center text-slate mb-8 text-sm">
            从废弃厂房到云端办公室——中国数字游民社区的空间革命
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityHubs.map((hub, i) => (
            <FadeInView key={hub.shortName} variant="fadeUp" delay={i * 0.12} threshold={0.05}>
              <ImageCard
                alt={hub.name}
                title={`${hub.shortName} · ${hub.location}`}
                description={hub.description.slice(0, 120) + '...'}
                userProvided={hub.userProvided}
                aspectRatio="4/3"
              />
            </FadeInView>
          ))}
        </div>

        {/* 社区据点对比表 */}
        <h3 className="text-xl font-serif text-charcoal text-center mt-14 mb-2">
          五大社区据点对比
        </h3>
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
                  segmentKeys={['定居', '半定居', '游牧']}
                  colors={['#A8C5C3', '#B5C5B0', '#C4A882']}
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
