import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { DataSource } from '@/components/shared/DataSource'
import { FigureNotes } from '@/components/shared/FigureNotes'
import { infrastructureChartData } from '@/data/chartData'
import { ChapterIntro } from './ChapterIntro'
import { ChapterPlaces, CommunityLocations } from './ChapterPlaces'

const populationShares = [
  { ...infrastructureChartData.penetration, population: '全国人口' },
  { ...infrastructureChartData.ruralPenetration, population: '农村地区人口' },
] as const

function PersonGlyph({ kind, fill, index }: { kind: 'national' | 'rural'; fill: number; index: number }) {
  const clipId = `people-${kind}-${index}`
  const figure = kind === 'national'
    ? <><circle cx="12" cy="5" r="3.2" /><path d="M8 10h8c2 0 3 1.5 3 3.5V21h-3v9h-3V20h-2v10H8v-9H5v-7.5C5 11.5 6 10 8 10Z" /></>
    : <><circle cx="12" cy="5" r="3.2" /><path d="M8.5 10h7c1.6 0 2.6 1 3.4 2.5L22 19l-2.6 1.2-2.5-4.5-.9 5.3h-1.8v9h-3v-9H9.8v9h-3v-9H5l1-5.3-2.4 4.5L1 19l3.1-6.5C5 11 6.2 10 8.5 10Z" /></>
  return <svg className={`people-strip__icon people-strip__icon--${kind}`} viewBox="0 0 24 32" aria-hidden="true" focusable="false">
    <defs><clipPath id={clipId}><rect x="0" y="0" width={24 * fill} height="32" /></clipPath></defs>
    <g className="people-strip__track">{figure}</g>
    <g className="people-strip__filled" clipPath={`url(#${clipId})`}>{figure}</g>
  </svg>
}

export function ChapterInfrastructure() {
  return (
    <section id="scene1" className="scene scene--paper" aria-labelledby="scene1-title">
      <div className="scene-shell">
        <ChapterIntro id="scene1" number="01" title="网络与社区" intro="远程协作能够发生在哪里，首先取决于一张不断向外延伸的网络。" />
        <h3 className="chapter-passage-title">网络抵达更多地方</h3>

        <div className="network-overview">
          <div className="network-overview__copy">
            <p>截至2025年末，中国网民规模达到 <strong><EvidenceValue metricId={infrastructureChartData.users.id} showSource={false} /></strong>。<DataSource refNumber={18} /></p>
            <p>农村地区互联网普及率仍低于全国水平。网络扩大了远程协作的可能，也留下了接入差异。</p>
          </div>

          <figure id="internet-reach-chart" className="network-figure" aria-labelledby="internet-reach-chart-title">
            <div className="network-figure__heading"><h3 id="internet-reach-chart-title">互联网普及率</h3><FigureNotes population="全国人口与农村地区人口" scope="农村属于全国的一部分" period="2025年末" cutoff="" sourceRefs={[18]} /></div>
            <div className="people-comparison">
              {populationShares.map((share) => <div className="network-dotplot__row" key={share.id}>
                <div className="network-dotplot__label"><span>{share.population}</span><strong><EvidenceValue metricId={share.id} showSource={false} /></strong></div>
                <div className="people-strip" aria-hidden="true">{Array.from({ length: 20 }, (_, index) => <PersonGlyph key={index} kind={share.id === infrastructureChartData.penetration.id ? 'national' : 'rural'} fill={Math.max(0, Math.min(1, share.value / 5 - index))} index={index} />)}</div>
              </div>)}
              <p className="people-comparison__key">每个人形代表5个百分点；不足一格按比例填色。精确值见数字。</p>
            </div>
            <div className="network-village">
              <div className="network-village__heading"><h4>另一种口径：行政村通5G</h4><FigureNotes population="行政村" scope="全国" period="2026年一季度" cutoff="" sourceRefs={[19]} note={<>实色至已知下限；虚线段为比例可能继续延伸的区间。通5G的行政村比例不等于居民上网比例；“至少95%”为下限，无法据此确定未覆盖的精确比例。</>} /></div>
              <div className="village-coverage" aria-hidden="true">
                <svg className="village-coverage__symbol" viewBox="0 0 80 80" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M40 36v31m-9 0h18M32 60l8-24 8 24M29 29a16 16 0 0 1 22 0M22 21a26 26 0 0 1 36 0M14 13a38 38 0 0 1 52 0" />
                  <path d="m4 54 12-9 12 9v18H4V54Zm7 18V61h9v11m33-18 12-9 12 9v18H53V54Zm7 18V61h9v11" />
                </svg>
                <div className="village-coverage__measure">
                  <div className="village-coverage__track"><span style={{ width: `${infrastructureChartData.village5g.value}%` }} /><i style={{ left: `${infrastructureChartData.village5g.value}%` }} /></div>
                  <div className="village-coverage__ticks"><span>0%</span><span>100%</span></div>
                </div>
              </div>
              <p><strong><EvidenceValue metricId={infrastructureChartData.village5g.id} display={`至少${infrastructureChartData.village5g.value}%`} showSource={false} /></strong> 的行政村已通5G</p>
            </div>
          </figure>
        </div>

        <p className="network-transition"><span>这些数字没有回答中国究竟有多少数字游民，却说明更多地方具备了网络协作的条件。</span><span>空间如何承接流动？一项社区研究提供了观察窗口。</span></p>

        <CommunityLocations />
        <ChapterPlaces />
      </div>
    </section>
  )
}
