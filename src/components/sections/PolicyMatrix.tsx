import type { ReactNode } from 'react'
import { DataSource } from '@/components/shared/DataSource'
import { EvidenceValue } from '@/components/shared/EvidenceValue'

type PolicyState = 'measure' | 'reported' | 'target'

const STATE_LABEL: Record<PolicyState, string> = {
  measure: '措施',
  reported: '已报道',
  target: '目标',
}

const ROWS: {
  place: string
  period: string
  state: PolicyState
  evidence: ReactNode
  limit: string
}[] = [
  {
    place: '丽水',
    period: '2024—2025',
    state: 'measure',
    evidence: <>“八条”升级为“十条”，公开材料提到住宿、创业空间、金融支持与运营激励。<DataSource refNumber={7} /></>,
    limit: '政策工具不等于实际使用效果。',
  },
  {
    place: '丽水',
    period: '2025—2026',
    state: 'reported',
    evidence: <><EvidenceValue metricId="lishui-communities-2025" display="4 个社区" />、<EvidenceValue metricId="lishui-stations-2025" display="6 个驿站" />；2026 年公开报道为 <EvidenceValue metricId="lishui-communities-2026" display="5 个社区" />。</>,
    limit: '公开报道的进展不等于全市普查。',
  },
  {
    place: '52 赫兹社区',
    period: '2026',
    state: 'reported',
    evidence: <><EvidenceValue metricId="lishui-proposals-2026" display="41 个提案" />，其中 <EvidenceValue metricId="lishui-landed-projects-2026" display="12 个已落地项目" />。</>,
    limit: '已落地项目不等于长期就业或稳定增收。',
  },
  {
    place: '大黄山',
    period: '至 2027',
    state: 'target',
    evidence: <><EvidenceValue metricId="huangshan-target-bases-2027" display="约 8 个基地" />、<EvidenceValue metricId="huangshan-target-teams-2027" display="500 个团队" />、<EvidenceValue metricId="huangshan-target-visits-2027" display="20 万人次" />。</>,
    limit: '政策目标不等于已经完成的结果。',
  },
]

export function PolicyMatrix() {
  return (
    <section className="mt-12 border-t border-duck-200/15 pt-8" aria-labelledby="policy-matrix-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 id="policy-matrix-title" className="font-serif text-3xl text-charcoal md:text-4xl">把政策、报道和目标分开看</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-mist">同一条地方叙事里，措施是怎么做的，报道说发生了什么，目标想走到哪里，不应被压成一个“成效”数字。</p>
        </div>
        <span className="status-chip status-chip--reported">policy matrix</span>
      </div>

      <div className="mt-7 overflow-x-auto border border-duck-200/15 bg-duck-50/35">
        <table className="min-w-[50rem] w-full border-collapse text-left text-sm">
          <caption className="sr-only">丽水与大黄山政策、公开报道和目标的证据状态矩阵</caption>
          <thead className="border-b border-duck-200/20 text-xs text-mist">
            <tr>
              <th scope="col" className="px-4 py-3 font-normal">地点</th>
              <th scope="col" className="px-4 py-3 font-normal">时间</th>
              <th scope="col" className="px-4 py-3 font-normal">状态</th>
              <th scope="col" className="min-w-[24rem] px-4 py-3 font-normal">公开材料</th>
              <th scope="col" className="min-w-[16rem] px-4 py-3 font-normal">不能直接推出</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={`${row.place}-${row.period}`} className="border-b border-duck-200/10 align-top last:border-b-0">
                <th scope="row" className="whitespace-nowrap px-4 py-4 font-serif font-normal text-charcoal">{row.place}</th>
                <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-duck-300">{row.period}</td>
                <td className="px-4 py-4"><span className={`status-chip status-chip--${row.state}`}>{STATE_LABEL[row.state]}</span></td>
                <td className="px-4 py-4 leading-7 text-charcoal/85">{row.evidence}</td>
                <td className="px-4 py-4 leading-7 text-mist">{row.limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-6 text-mist">矩阵只整理当前主线已有来源，不新增地方政策评价，也不把“已报道”改写成因果结果。</p>
    </section>
  )
}
