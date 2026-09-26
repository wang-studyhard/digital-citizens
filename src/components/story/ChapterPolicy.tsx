import type { ReactNode } from 'react'
import { DataSource } from '@/components/shared/DataSource'
import { ChartFrame } from '@/components/shared/ChartFrame'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { policyEvents, type PolicyEvent } from '@/data/policy'
import { ChapterIntro } from './ChapterIntro'
import { ChapterMovement } from './ChapterMovement'

const kindLabel: Record<PolicyEvent['kind'], string> = {
  action: '已发布',
  reported: '已报道',
  target: '区域目标',
}

const selectedEventIds = new Set([
  'dahuangshan-plan-2024',
  'lishui-progress-2026',
  'dahuangshan-target-2027',
  'dahuangshan-target-2030',
])

const contextEvents = [
  { id: 'anji-start-2021', date: '2021', place: '安吉', status: '已发生', claim: '安吉DNA数字游民公社开始运营。', sourceRef: 20 },
  { id: 'community-research-2025', date: '2025', place: '研究样本', status: '已核验', claim: <>研究纳入 <EvidenceValue metricId="community-total-2025" />仍在正常运营的社区。</>, sourceRef: 3 },
] as const

type TimelineEntry = {
  id: string
  date: string
  place: string
  status: string
  kind: PolicyEvent['kind'] | 'context'
  claim: ReactNode
  sourceRefs: readonly number[]
  limitation?: string
}

function TimelineRecord({ event }: { event: TimelineEntry }) {
  return (
    <article className={`policy-timeline__event policy-timeline__event--${event.kind}`}>
      <div className="policy-timeline__axis"><svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">{event.kind === 'target' ? <path d="M14 2 26 14 14 26 2 14Z" /> : <circle cx="14" cy="14" r="11" />}</svg><span>{event.date}</span></div>
      <div className="policy-timeline__content">
        <div className="policy-timeline__heading"><strong>{event.place}</strong><span>{event.status}</span></div>
        <p>{event.claim}</p>
        {event.limitation && <small>{event.limitation}</small>}
        <div className="policy-timeline__sources">{event.sourceRefs.map((ref) => <DataSource key={ref} refNumber={ref} />)}</div>
      </div>
    </article>
  )
}

export function ChapterPolicy() {
  const selectedEvents = policyEvents.filter((event) => selectedEventIds.has(event.id))
  const timelineEntries: TimelineEntry[] = [
    { ...contextEvents[0], kind: 'context', sourceRefs: [contextEvents[0].sourceRef] },
    { ...selectedEvents[0], status: kindLabel[selectedEvents[0].kind] },
    { ...contextEvents[1], kind: 'context', sourceRefs: [contextEvents[1].sourceRef] },
    ...selectedEvents.slice(1).map((event) => ({ ...event, status: kindLabel[event.kind] })),
  ]

  return (
    <section id="scene10" className="scene scene--paper" aria-labelledby="scene10-title">
      <div className="scene-shell">
        <ChapterIntro id="scene10" number="04" title="地方回应与公共议题" intro="空间运营、共创进展与政策目标，在不同时间留下不同记录。" />
        <h3 className="chapter-passage-title">地方开始回应</h3>

        <div className="policy-status-legend" aria-label="时间线状态">
          <span><i className="status-line status-line--measure" />已发生：运营、研究或方案发布</span>
          <span><i className="status-line status-line--reported" />已报道：公开材料记录的进展</span>
          <span><i className="status-line status-line--target" />区域目标：面向未来的计划</span>
        </div>

        <ChartFrame id="policy-timeline-chart" title="地方回应的时间线" unit="已发生的记录与面向未来的目标分列" population="安吉、研究样本、丽水与大黄山" scope="公开事件与区域目标" period="2021—2030" cutoff="" sourceRefs={[3, 6, 14, 20]} sourcePosition="after" note="方案发布、报道进展与未来目标属于不同证据状态；大黄山覆盖黄山、池州、安庆、宣城四市。">
          <section className="policy-period" aria-labelledby="policy-records-title"><h4 id="policy-records-title">已发生与已报道的记录</h4><div className="policy-timeline">{timelineEntries.filter((event) => event.kind !== 'target').map((event) => <TimelineRecord key={event.id} event={event} />)}</div></section>
          <section className="policy-period" aria-labelledby="policy-targets-title"><h4 id="policy-targets-title">面向未来的区域目标</h4><div className="policy-timeline">{timelineEntries.filter((event) => event.kind === 'target').map((event) => <TimelineRecord key={event.id} event={event} />)}</div></section>
        </ChartFrame>

        <p className="policy-boundary">2027和2030两组数字是大黄山区域目标，不是黄山市单独完成量。</p>
        <p className="limits-rule limits-rule--chapter limits-rule--center"><span>政策可以搭桥。一段关系是否持续，仍需回到<strong>人和地方共同经历的时间</strong>。</span></p>
        <ChapterMovement />
      </div>
    </section>
  )
}
