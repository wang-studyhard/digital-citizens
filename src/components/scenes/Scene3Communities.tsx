import { useReducedMotion, motion } from 'framer-motion'
import { useState } from 'react'
import { EvidenceTable, type EvidenceRow } from '@/components/shared/EvidenceTable'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { SceneShell } from '@/components/shared/SceneShell'
import { VizFigure } from '@/components/shared/VizFigure'
import { communityViews, metricNumber, approxCount } from '@/data/derived'
import { evidenceById } from '@/data/evidence'

type CommunityGroup = (typeof communityViews)[number]['groups'][number]

function groupCount(group: CommunityGroup) {
  if ('derivedMetricId' in group && group.derivedMetricId) return metricNumber(group.metricId) - metricNumber(group.derivedMetricId)
  return evidenceById[group.metricId]?.unit === '%' ? approxCount(group.metricId, 77) : metricNumber(group.metricId)
}

function groupLabel(group: CommunityGroup) {
  const raw = evidenceById[group.metricId]
  return raw?.unit === '%' ? `${raw.value}% · 约 ${groupCount(group)} 家` : `${groupCount(group)} 家`
}

export function Scene3Communities() {
  const [mode, setMode] = useState<(typeof communityViews)[number]['id']>('total')
  const reducedMotion = useReducedMotion()
  const current = communityViews.find((view) => view.id === mode) ?? communityViews[0]
  const nodes = current.groups.flatMap((group) => Array.from({ length: groupCount(group) }, (_, index) => ({ ...group, key: `${group.label}-${index}` })))
  const rows: EvidenceRow[] = current.groups.map((group) => ({ id: group.label, cells: { category: group.label, original: <EvidenceValue metricId={group.metricId} />, approximate: evidenceById[group.metricId]?.unit === '%' ? `约 ${groupCount(group)} 家` : '—', population: '研究纳入的 77 家社区' } }))

  return (
    <SceneShell id="scene3" number="03" title="77 家社区，流动落在哪里？" intro="同一批研究纳入社区，只按已核验的聚合维度重新排列。没有逐社区原始记录，因此不制作 77 行明细表。">
      <VizFigure id="community-morph" title="同一批社区的五种排列" unit="家社区；功能类型的近似数量按 n=77 估算" population="研究纳入的中国内地正常运营数字游民社区" scope="community-research-sample" period="截至 2025-12-31" cutoff="2025-12-31" sourceRefs={[3]} locator="正文第51、57、61、66段及图3说明" scopeNote="点永远代表社区，不代表人数。功能类型只展示原始比例与估算数量，不能回推出逐家名单。" table={<EvidenceTable caption="社区聚合结构静态数据表" columns={[{ key: 'category', label: '维度分类' }, { key: 'original', label: '原始比例 / 数量' }, { key: 'approximate', label: '近似数量' }, { key: 'population', label: '统计对象' }]} rows={rows} />}>
        <div className="community-panel">
          <div className="community-panel__top"><div><p className="panel-note">77 个点 = 77 家研究样本社区</p><p className="community-panel__description" aria-live="polite">{current.description}</p></div><span className="community-panel__count">{current.groups.reduce((sum, group) => sum + groupCount(group), 0)} 家</span></div>
          <div className="segmented-control" role="group" aria-label="切换 77 家社区聚合维度">
            {communityViews.map((view) => <button key={view.id} type="button" onClick={() => setMode(view.id)} aria-pressed={mode === view.id}>{view.label}</button>)}
          </div>
          <div className="community-field" data-mode={mode} role="img" aria-label={`${current.label}视图：${current.groups.map((group) => `${group.label}${groupCount(group)}家`).join('，')}`}>
            {/* PURPOSE: 让同一批 77 家社区的分类关系可见； TRIGGER: 切换聚合维度； DURATION: 360ms； REDUCED-MOTION FALLBACK: 直接切换节点位置。 */}
            {nodes.map((node) => <motion.span layout={reducedMotion ? false : true} transition={{ duration: 0.36, ease: 'easeOut' }} key={node.key} className={`community-node community-node--${node.color}`} aria-hidden="true" />)}
          </div>
          <div className="community-legend">{current.groups.map((group) => <span key={group.label}><i className={`legend-dot legend-dot--${group.color}`} aria-hidden="true" /><strong>{group.label}</strong> {groupLabel(group)}</span>)}</div>
        </div>
      </VizFigure>
    </SceneShell>
  )
}
