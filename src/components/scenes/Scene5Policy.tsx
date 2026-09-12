import { EvidenceTable, type EvidenceRow } from '@/components/shared/EvidenceTable'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { SceneShell } from '@/components/shared/SceneShell'
import { VizFigure } from '@/components/shared/VizFigure'
import { policyLedger } from '@/data/derived'

const statusLabel = { measure: '措施', reported: '已报道', target: '目标' } as const

function MetricList({ metricIds }: { metricIds?: readonly string[] }) {
  if (!metricIds?.length) return null
  return <div className="policy-metrics">{metricIds.map((metricId) => <EvidenceValue key={metricId} metricId={metricId} />)}</div>
}

function policyRows(): EvidenceRow[] {
  return policyLedger.map((entry, index) => ({
    id: `${entry.place}-${index}`,
    cells: {
      place: entry.place,
      date: entry.date,
      measure: entry.measure || '—',
      reported: <>{entry.reported || '—'}{'reportedMetricIds' in entry && <MetricList metricIds={entry.reportedMetricIds} />}</>,
      target: <>{entry.target || '—'}{'targetMetricIds' in entry && <MetricList metricIds={entry.targetMetricIds} />}</>,
      limitation: entry.limitation,
    },
  }))
}

export function Scene5Policy() {
  return (
    <SceneShell id="scene5" number="05" title="地方政策：措施、报道、目标分开读" intro="同一条地方叙事里，措施怎么做、报道说发生了什么、目标想走到哪里，不应被压成一个“成效”数字。" tone="night">
      <div className="policy-status-legend" aria-label="政策证据状态"><span><i className="status-line status-line--measure" />措施：做了什么</span><span><i className="status-line status-line--reported" />已报道：公开材料记录了什么</span><span><i className="status-line status-line--target" />目标：政策希望走到哪里</span></div>
      <VizFigure id="policy-ledger" title="政策证据台账" unit="每行一条地方证据记录" population="丽水与大黄山公开政策 / 报道材料" scope="policy-ledger" period="2024—2026；目标至 2027" cutoff="按各来源发布时间与目标时点" sourceRefs={[6, 7, 14]} locator="各条记录的来源编号、正文定位与状态见数据、来源与方法" scopeNote="空白字段表示当前来源没有提供该类信息。状态标签始终带文字，不靠颜色单独编码。" table={<EvidenceTable caption="政策证据台账静态表" columns={[{ key: 'place', label: '地点' }, { key: 'date', label: '时间' }, { key: 'measure', label: '措施' }, { key: 'reported', label: '已报道' }, { key: 'target', label: '目标' }, { key: 'limitation', label: '不能推出' }]} rows={policyRows()} />}>
        <div className="policy-ledger-preview">
          {policyLedger.map((entry, index) => (
            <article key={`${entry.place}-${index}`} className={`policy-record policy-record--${entry.reported ? 'reported' : 'target'}`}>
              <div className="policy-record__top"><span>{entry.date}</span><strong>{entry.place}</strong></div>
              <div className="policy-record__grid">
                <div><span className="policy-label">{statusLabel.measure}</span><p>{entry.measure || '本条没有单独列出措施。'}</p></div>
                <div><span className="policy-label policy-label--reported">{statusLabel.reported}</span><p>{entry.reported || '本条没有已报道结果。'}</p>{'reportedMetricIds' in entry && <MetricList metricIds={entry.reportedMetricIds} />}</div>
                <div><span className="policy-label policy-label--target">{statusLabel.target}</span><p>{entry.target || '本条没有目标字段。'}</p>{'targetMetricIds' in entry && <MetricList metricIds={entry.targetMetricIds} />}</div>
                <div className="policy-record__limit"><span>不能推出</span><p>{entry.limitation}</p></div>
              </div>
            </article>
          ))}
        </div>
      </VizFigure>
    </SceneShell>
  )
}
