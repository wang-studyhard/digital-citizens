import { motion } from 'framer-motion'
import * as React from 'react'

type MorphMode = 'sample' | 'age' | 'education' | 'gender'

type DotGroup = {
  label: string
  count: number
  color: string
  percentage?: string
}

type MorphView = {
  id: MorphMode
  label: string
  description: string
  groups: DotGroup[]
  locator: string
}

const MORPH_VIEWS: MorphView[] = [
  {
    id: 'sample',
    label: '样本',
    description: '282 个点代表 NCC 社区渠道中的数字游民样本，不代表中国数字游民人口。',
    groups: [{ label: '数字游民样本', count: 282, color: 'node-red' }],
    locator: '研究说明：原始阅读器第4页（页脚03）',
  },
  {
    id: 'age',
    label: '年龄（正文）',
    description: '报告第9页正文与图旁年龄标签存在内部不一致；当前按正文值重排，年龄切面暂不视为最终冻结结论。',
    groups: [
      { label: '70后', count: 6, color: 'node-yellow', percentage: '2.13%' },
      { label: '80后', count: 48, color: 'node-blue', percentage: '17.02%' },
      { label: '90后', count: 201, color: 'node-green', percentage: '71.28%' },
      { label: '00后', count: 27, color: 'node-red', percentage: '9.57%' },
    ],
    locator: '原始阅读器第9页（页脚08），正文出生年代段；图旁标签待确认',
  },
  {
    id: 'education',
    label: '学历',
    description: '原报告第11页显示，本科、硕士、博士和大专及以下合计为 282 人。',
    groups: [
      { label: '本科', count: 173, color: 'node-blue', percentage: '61.34%' },
      { label: '硕士', count: 67, color: 'node-green', percentage: '23.76%' },
      { label: '博士', count: 4, color: 'node-yellow', percentage: '1.42%' },
      { label: '大专及以下', count: 38, color: 'node-red', percentage: '13.48%' },
    ],
    locator: '原始阅读器第11页（页脚10），学历分布图',
  },
  {
    id: 'gender',
    label: '性别',
    description: '原报告第11页显示，男性、女性和非二元性别认同者合计为 282 人。',
    groups: [
      { label: '男性', count: 146, color: 'node-blue', percentage: '51.77%' },
      { label: '女性', count: 130, color: 'node-green', percentage: '46.10%' },
      { label: '非二元', count: 6, color: 'node-yellow', percentage: '2.13%' },
    ],
    locator: '原始阅读器第11页（页脚10），性别分布图',
  },
]

function makeNodes(groups: DotGroup[]) {
  return groups.flatMap((group) =>
    Array.from({ length: group.count }, (_, index) => ({
      ...group,
      key: `${group.label}-${index}`,
    })),
  )
}

export function Ncc282Morph() {
  const [mode, setMode] = React.useState<MorphMode>('sample')
  const current = MORPH_VIEWS.find((view) => view.id === mode) ?? MORPH_VIEWS[0]
  const nodes = makeNodes(current.groups)

  return (
    <figure className="paper-frame community-morph mt-10" aria-labelledby="ncc-282-morph-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="data-label text-duck-300">NCC original reader · n=282</p>
          <h3 id="ncc-282-morph-title" className="mt-2 font-serif text-3xl text-charcoal md:text-4xl">同一扇窗口，换几个切面</h3>
        </div>
        <div className="community-total"><strong>282</strong><span>人 · 社区渠道样本</span></div>
      </div>
      <div className="morph-controls" role="group" aria-label="重新排列 NCC 282 人样本节点">
        {MORPH_VIEWS.map((view) => (
          <button key={view.id} type="button" onClick={() => setMode(view.id)} aria-pressed={mode === view.id} className="morph-control">{view.label}</button>
        ))}
      </div>
      <p className="mt-4 min-h-12 text-sm leading-7 text-slate" aria-live="polite">{current.description}</p>
      <div className="node-field" data-mode={mode} role="img" aria-label={`${current.label}视图：${current.groups.map((group) => `${group.label}${group.count}人`).join('，')}`}>
        {nodes.map((node) => <motion.span layout key={node.key} className={`community-node ${node.color}`} aria-hidden="true" />)}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="节点图例">
        {current.groups.map((group) => <span key={group.label} className="legend-item"><i className={`community-node ${group.color}`} aria-hidden="true" />{group.label} {group.percentage ? `${group.percentage} · ` : ''}{group.count}</span>)}
      </div>
      <figcaption className="mt-6 border-t border-duck-200/10 pt-4 text-xs leading-6 text-mist">来源定位：{current.locator}。这里重绘已登录核验的原始图表数据，不复制报告整页；282 只描述社区渠道样本，不能外推全国人口。</figcaption>
    </figure>
  )
}
