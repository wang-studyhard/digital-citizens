import { EvidenceValue } from '@/components/shared/EvidenceValue'

const POLICY_STEPS = [
  { city: '丽水', state: 'measure', title: '政策', text: '从“八条”到“十条”，公开报道提到住宿、创业空间、金融支持与运营激励等工具。', metricId: null },
  { city: '丽水', state: 'reported', title: '社区网络', text: '2025 年公开报道提到 4 个常态化社区与 6 个旅居型驿站；2026 年报道提到社区继续铺开。', metricId: 'lishui-communities-2026' },
  { city: '丽水', state: 'reported', title: '共创提案', text: '52赫兹社区试运营不足一年，公开报道记录了 41 个提案，其中 12 个已经落地。', metricId: 'lishui-proposals-2026' },
  { city: '大黄山', state: 'target', title: '项目目标', text: '行动方案提出 2027 年基地、团队与人次目标；它们是目标，不是已实现结果。', metricId: 'huangshan-target-bases-2027' },
  { city: '丽水', state: 'reported', title: '已落地项目', text: '“提案”与“落地”是不同状态；这里保留公开报道中的 12 个，不把它写成长期就业或稳定增收。', metricId: 'lishui-landed-projects-2026' },
]

const STATE_LABEL = { measure: '措施', target: '目标', reported: '已报道' }

export function PolicyTimeline() {
  return (
    <figure className="policy-timeline" aria-labelledby="policy-timeline-title">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="data-label text-duck-300">scene 5 · policy timeline</p><h3 id="policy-timeline-title" className="mt-2 font-serif text-3xl text-charcoal md:text-4xl">地方怎样“接住”这些流动？</h3></div><span className="status-chip status-chip--target">三种状态，分开读</span></div>
      <div className="policy-track" role="list">
        {POLICY_STEPS.map((step, index) => <article key={`${step.city}-${step.title}`} className={`policy-step policy-step--${step.state}`} role="listitem"><div className="policy-step__top"><span className="font-mono text-xs text-duck-300">0{index + 1}</span><span className={`status-chip status-chip--${step.state}`}>{STATE_LABEL[step.state as keyof typeof STATE_LABEL]}</span></div><p className="mt-5 text-xs text-mist">{step.city}</p><h4 className="mt-1 font-serif text-2xl text-charcoal">{step.title}</h4><p className="mt-3 text-sm leading-7 text-slate">{step.text}</p>{step.metricId && <p className="mt-4 font-mono text-sm text-duck-200"><EvidenceValue metricId={step.metricId} display={step.metricId === 'lishui-proposals-2026' ? '41 个提案' : step.metricId === 'lishui-landed-projects-2026' ? '12 个落地' : step.metricId === 'lishui-communities-2026' ? '5 个社区' : '约 8 个基地'} /></p>}</article>)}
      </div>
      <figcaption className="mt-7 border-t border-duck-200/10 pt-4 text-xs leading-6 text-mist">政策、社区、共创机制、项目与结果不是同一种证据。时间线把它们排在一起，是为了看见承接关系，不是给地方政策打分。</figcaption>
    </figure>
  )
}
