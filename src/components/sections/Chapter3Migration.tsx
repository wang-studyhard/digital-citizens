import { useMemo, useState } from 'react'
import { ParentSize } from '@visx/responsive'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { DataSource } from '@/components/shared/DataSource'
import { ChinaMapScatter } from '@/components/charts/ChinaMapScatter'
import { HorizontalGallery } from '@/components/effects/HorizontalGallery'
import { hotspots, communityHubs } from '@/data/geography'

const locationBreakdown = [
  { label: '乡村', count: 52, percent: 67.5 },
  { label: '城乡结合部', count: 13, percent: 16.9 },
  { label: '城市', count: 12, percent: 15.6 },
]

export function Chapter3Migration() {
  const [selectedCity, setSelectedCity] = useState('安吉')
  const selected = useMemo(
    () => hotspots.find((hotspot) => hotspot.city === selectedCity) ?? hotspots[0],
    [selectedCity],
  )

  return (
    <section id="chapter3" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第三章"
          title="相遇的地方"
          subtitle="地图只标出公开材料中可以定位的案例。点位表示“这里有相关实践”，不表示热度、规模或优先级。"
        />

        <QuoteBlock
          text="青年为什么来到这里？更重要的是，他们有没有和当地的人、产业与日常生活发生联系？"
          size="large"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <div className="rounded-2xl border border-duck-200/15 bg-duck-900/50 p-4 md:p-6">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="text-xl font-serif text-charcoal">案例地点</h3>
              <span className="text-xs text-mist">点击地图点位或右侧列表</span>
            </div>
            <ParentSize>
              {({ width }) => (
                <ChinaMapScatter
                  hotspots={hotspots}
                  width={width}
                  height={Math.max(360, Math.min(520, width * 0.58))}
                  onSelect={setSelectedCity}
                />
              )}
            </ParentSize>
            <p className="mt-3 text-xs leading-relaxed text-mist">
              这是案例地图，不是全国分布图；公开资料不足的地点不做空白推断。
              <DataSource refNumber={3} />
            </p>
          </div>

          <div className="space-y-3" aria-label="案例地点列表">
            {hotspots.map((hotspot) => (
              <button
                key={hotspot.city}
                type="button"
                onClick={() => setSelectedCity(hotspot.city)}
                className={`w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-duck-300 ${
                  selectedCity === hotspot.city
                    ? 'border-duck-200/45 bg-duck-200/10'
                    : 'border-duck-200/12 bg-duck-900/30 hover:bg-duck-900/70'
                }`}
                aria-pressed={selectedCity === hotspot.city}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-serif text-lg text-charcoal">{hotspot.city}</span>
                  <span className="text-xs text-duck-300/75">{hotspot.province}</span>
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-slate">{hotspot.description}</span>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div className="mt-6 border-l-2 border-duck-300/45 bg-duck-900/35 px-5 py-4">
            <p className="text-xs font-mono tracking-wider text-duck-300/75">当前案例 · {selected.province}</p>
            <p className="mt-1 text-base leading-relaxed text-charcoal">
              {selected.community ? `${selected.city} · ${selected.community}` : selected.city}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate">{selected.description}</p>
            {selected.sourceId && <DataSource refNumber={selected.sourceId} />}
          </div>
        )}

        <div className="mt-16 border-t border-duck-200/15 pt-8">
          <h3 className="text-2xl font-serif text-charcoal text-center">乡村是重要落点，但样本有边界</h3>
          <p className="mt-2 text-center text-sm text-slate">
            一项研究按公开可识别、截至2025年末正常运营等条件纳入77家内地社区。
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {locationBreakdown.map((item) => (
              <div key={item.label} className="border-l border-duck-300/35 pl-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-base text-charcoal">{item.label}</span>
                  <span className="font-mono text-xl text-duck-200">{item.count}<small className="ml-1 text-xs text-slate">家</small></span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-duck-100/60">
                  <div className="h-full rounded-full bg-duck-300" style={{ width: `${item.percent}%` }} />
                </div>
                <p className="mt-2 text-xs text-mist">{item.percent}% · 研究样本占比</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs leading-relaxed text-mist">
            统计单位是社区，不是人数；筹建中和已关闭社区未纳入，不能据此计算行业存活率。
            <DataSource refNumber={3} />
          </p>
        </div>

        <HorizontalGallery hubs={communityHubs} />
      </div>
    </section>
  )
}
