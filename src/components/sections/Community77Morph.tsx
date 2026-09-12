import { motion } from 'framer-motion'
import * as React from 'react'
import { EvidenceValue } from '@/components/shared/EvidenceValue'

type MorphMode = 'total' | 'growth' | 'location' | 'type' | 'scale'

const MODES: { id: MorphMode; label: string; description: string; groups: { label: string; count: number; color: string }[] }[] = [
  { id: 'total', label: '总量', description: '研究在筛选范围内纳入 77 家正常运营社区。', groups: [{ label: '研究样本', count: 77, color: 'node-blue' }] },
  { id: 'growth', label: '年份增长', description: '2025 年新增 33 家；剩余节点表示此前已纳入的 44 家。', groups: [{ label: '2025 新增', count: 33, color: 'node-yellow' }, { label: '此前纳入', count: 44, color: 'node-blue' }] },
  { id: 'location', label: '城乡区位', description: '同一批社区按研究中的乡村、城乡结合部和城市重排。', groups: [{ label: '乡村', count: 52, color: 'node-green' }, { label: '城乡结合部', count: 13, color: 'node-yellow' }, { label: '城市', count: 12, color: 'node-red' }] },
  { id: 'type', label: '功能类型', description: '按研究公布的占比换算为 77 个节点的近似分组，仅表达结构。', groups: [{ label: '景区文旅型', count: 35, color: 'node-red' }, { label: '自然生态型', count: 22, color: 'node-green' }, { label: '城市枢纽型', count: 11, color: 'node-blue' }, { label: '产业主题型', count: 9, color: 'node-yellow' }] },
  { id: 'scale', label: '规模', description: '研究纳入的 68 家中小型社区与 9 家大型社区。', groups: [{ label: '中小型', count: 68, color: 'node-blue' }, { label: '大型', count: 9, color: 'node-red' }] },
]

function makeNodes(groups: typeof MODES[number]['groups']) {
  return groups.flatMap((group) => Array.from({ length: group.count }, (_, index) => ({ ...group, key: `${group.label}-${index}` })))
}

export function Community77Morph() {
  const [mode, setMode] = React.useState<MorphMode>('total')
  const current = MODES.find((item) => item.id === mode) ?? MODES[0]
  const nodes = makeNodes(current.groups)

  return (
    <figure className="paper-frame community-morph" aria-labelledby="community-morph-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="data-label text-duck-300">one research sample · 77 nodes</p><h3 id="community-morph-title" className="mt-2 font-serif text-3xl text-charcoal md:text-4xl">77 个社区出现了</h3></div>
        <div className="community-total"><strong><EvidenceValue metricId="community-total-2025" display="77" /></strong><span>家 · 研究样本</span></div>
      </div>
      <div className="morph-controls" role="group" aria-label="重新排列 77 个社区节点">
        {MODES.map((item) => <button key={item.id} type="button" onClick={() => setMode(item.id)} aria-pressed={mode === item.id} className="morph-control">{item.label}</button>)}
      </div>
      <p className="mt-4 min-h-12 text-sm leading-7 text-slate" aria-live="polite">{current.description}</p>
      <div className="node-field" data-mode={mode} role="img" aria-label={`${current.label}视图：${current.groups.map((group) => `${group.label}${group.count}个`).join('，')}`}>
        {nodes.map((node) => <motion.span layout key={node.key} className={`community-node ${node.color}`} aria-hidden="true" />)}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="节点图例">
        {current.groups.map((group) => <span key={group.label} className="legend-item"><i className={`community-node ${group.color}`} aria-hidden="true" />{group.label} {group.count}</span>)}
      </div>
      <figcaption className="mt-6 border-t border-duck-200/10 pt-4 text-xs leading-6 text-mist">点永远代表“社区”，不代表人数。总量、年份、区位、类型和规模是同一批节点的不同排列；功能类型由公开占比乘以 77 后四舍五入，仅用于阅读结构，不能回推出逐家名单。</figcaption>
    </figure>
  )
}
