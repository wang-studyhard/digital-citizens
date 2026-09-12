import * as React from 'react'
import { EvidenceTable, type EvidenceRow } from '@/components/shared/EvidenceTable'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { SceneShell } from '@/components/shared/SceneShell'
import { VizFigure } from '@/components/shared/VizFigure'
import { approxCount, metricNumber, nccProfileModes, nccProfileViews, sampleLedger } from '@/data/derived'

const BAR_COLORS = { blue: 'bar--blue', green: 'bar--green', red: 'bar--red', sand: 'bar--sand' } as const

function groupCount(metricId: string) {
  const metric = metricNumber(metricId)
  return metric <= 100 ? approxCount(metricId, 282) : metric
}

function DotField({ mode }: { mode: typeof nccProfileModes[number]['id'] }) {
  const current = nccProfileModes.find((item) => item.id === mode) ?? nccProfileModes[0]
  const dots = current.groups.flatMap((group) => Array.from({ length: groupCount(group.metricId) }, (_, index) => ({ ...group, key: `${group.label}-${index}` })))
  return <div className="dot-field" role="img" aria-label={`${current.label}视图：${current.groups.map((group) => `${group.label}${groupCount(group.metricId)}个`).join('，')}`}>{dots.map((dot) => <span key={dot.key} className={`dot dot--${dot.color}`} aria-hidden="true" />)}</div>
}

function ProfileBar({ groups }: { groups: readonly { label: string; metricId: string; color: keyof typeof BAR_COLORS }[] }) {
  return (
    <div className="profile-chart">
      <div className="stacked-bar" aria-hidden="true">
        {groups.map((group) => <span key={group.metricId} className={BAR_COLORS[group.color]} style={{ width: `${metricNumber(group.metricId)}%` }} />)}
      </div>
      <div className="bar-legend">
        {groups.map((group) => (
          <div className="bar-legend__item" key={group.metricId}>
            <span className={`bar-key ${BAR_COLORS[group.color]}`} aria-hidden="true" />
            <span><strong>{group.label}</strong><EvidenceValue metricId={group.metricId} /><small>约 {groupCount(group.metricId)} 人</small></span>
          </div>
        ))}
      </div>
    </div>
  )
}

function profileTable(groups: readonly { label: string; metricId: string }[]): EvidenceRow[] {
  return groups.map((group) => ({
    id: group.metricId,
    cells: {
      category: group.label,
      percentage: <EvidenceValue metricId={group.metricId} />,
      count: `约 ${groupCount(group.metricId)} 人`,
      note: '按 n=282 折算的派生值',
    },
  }))
}

const unitRows: EvidenceRow[] = [
  { id: 'digital-nomads', cells: { category: '数字游民样本', count: <EvidenceValue metricId="ncc-digital-nomad-sample" />, note: '社区渠道样本内的一个分支' } },
  { id: 'explorers', cells: { category: '数字游民探索者样本', count: <EvidenceValue metricId="ncc-explorer-sample" />, note: '有效问卷中的另一分支' } },
]

function UnitSampleChart() {
  const fieldRef = React.useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = React.useState(false)
  React.useEffect(() => {
    const field = fieldRef.current
    if (!field || typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true)
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(field)
    return () => observer.disconnect()
  }, [])
  const units = Array.from({ length: 798 }, (_, index) => index < 282 ? 'nomad' : 'explorer')
  return (
    <div className="unit-chart">
      <div className="unit-chart__topline"><span>N = 798</span><strong>有效问卷全部进入视野</strong></div>
      <div ref={fieldRef} className={`unit-field${revealed ? ' is-revealed' : ''}`} role="img" aria-label="798 个有效问卷单位，其中 282 个数字游民样本，516 个数字游民探索者样本">
        {/* PURPOSE: 让 798 个样本从散点收拢成可读分组； TRIGGER: 图表进入视口； DURATION: 900ms； REDUCED-MOTION FALLBACK: 直接显示静态网格。 */}
        {units.map((type, index) => <i key={index} className={`unit-dot unit-dot--${type}`} style={{ '--scatter-x': `${((index * 37) % 161) - 80}px`, '--scatter-y': `${((index * 61) % 91) - 45}px` } as React.CSSProperties} aria-hidden="true" />)}
      </div>
      <div className="unit-chart__legend" aria-label="798 个有效问卷的分支说明">
        <span><i className="unit-key unit-key--nomad" aria-hidden="true" />282 数字游民样本</span>
        <span><i className="unit-key unit-key--explorer" aria-hidden="true" />516 数字游民探索者样本</span>
      </div>
      <p className="chart-annotation">先看见全部 798 份有效问卷，再拆分 282 / 516；这个切面仍然属于 NCC 社区渠道样本。</p>
    </div>
  )
}

export function Scene1Sample() {
  const [age, education, gender] = [nccProfileViews.age, nccProfileViews.education, nccProfileViews.gender]
  return (
    <SceneShell id="scene1" number="01" title="这 798 份有效问卷，能告诉我们什么？" intro="先看见全部有效问卷，再拆出样本分支。282 是 NCC 社区渠道里的数字游民样本，不是全国人口。">
      <VizFigure id="ncc-valid-unit-chart" title="先看见全部有效问卷" unit="每个点代表 1 份有效问卷" population="NCC 社区渠道有效问卷" scope="community-channel-sample" period="2024-04—2024-05" cutoff="调查结束：2024-05" sourceRefs={[1]} locator="公开预览 p.04“研究说明”：清洗后有效问卷段" scopeNote="798 个点是有效问卷的样本单位；282 / 516 是样本链内部的两个分支，不是全国人口拆分。" table={<EvidenceTable caption="798 份有效问卷的分支静态表" columns={[{ key: 'category', label: '分支' }, { key: 'count', label: '数量' }, { key: 'note', label: '说明' }]} rows={unitRows} />}>
        <UnitSampleChart />
      </VizFigure>

      <div className="sample-ledger" aria-label="NCC 样本台账">
        {sampleLedger.map((item, index) => (
          <article key={item.label} className="ledger-row">
            <span className="ledger-row__index">0{index + 1}</span>
            <div><h3>{item.label}</h3><p>{item.text}</p></div>
            <strong><EvidenceValue metricId={item.metricId!} /></strong>
          </article>
        ))}
      </div>

      <div className="sample-boundary"><span>人口范围</span><p>NCC 社区渠道样本 · 调查期 2024.04—05 · n=282 的百分比是样本内结构，不能外推全国。</p><span>方法定位：公开预览 p.04；原始阅读器 p.09 / p.11</span></div>

      <div className="profile-grid">
        <VizFigure id="ncc-age" title="出生年代" unit="样本百分比；近似人数为派生值" population="NCC 282 名数字游民样本" scope="community-channel-sample" period="2024-04—2024-05" cutoff="调查结束：2024-05" sourceRefs={[1]} locator="原始阅读器第9页（页脚08）：出生年代正文" scopeNote="百分比为原始事实；“约 X 人”按 n=282 四舍五入，仅帮助阅读，不是报告直接给出的精确人数。" table={<EvidenceTable caption="出生年代静态数据表" columns={[{ key: 'category', label: '类别' }, { key: 'percentage', label: '原始比例' }, { key: 'count', label: '近似人数' }, { key: 'note', label: '说明' }]} rows={profileTable(age)} />}>
          <ProfileBar groups={age} />
        </VizFigure>
        <VizFigure id="ncc-education" title="学历" unit="样本百分比；近似人数为派生值" population="NCC 282 名数字游民样本" scope="community-channel-sample" period="2024-04—2024-05" cutoff="调查结束：2024-05" sourceRefs={[1]} locator="原始阅读器第11页（页脚10）：学历分布图" scopeNote="这里展示的是样本内部结构，不是全国学历分布。" table={<EvidenceTable caption="学历静态数据表" columns={[{ key: 'category', label: '类别' }, { key: 'percentage', label: '原始比例' }, { key: 'count', label: '近似人数' }, { key: 'note', label: '说明' }]} rows={profileTable(education)} />}>
          <ProfileBar groups={education} />
        </VizFigure>
        <VizFigure id="ncc-gender" title="性别认同" unit="样本百分比；近似人数为派生值" population="NCC 282 名数字游民样本" scope="community-channel-sample" period="2024-04—2024-05" cutoff="调查结束：2024-05" sourceRefs={[1]} locator="原始阅读器第11页（页脚10）：性别分布图" scopeNote="不以颜色制造二元性别暗示；每一类均保留文字标签。" table={<EvidenceTable caption="性别静态数据表" columns={[{ key: 'category', label: '类别' }, { key: 'percentage', label: '原始比例' }, { key: 'count', label: '近似人数' }, { key: 'note', label: '说明' }]} rows={profileTable(gender)} />}>
          <ProfileBar groups={gender} />
        </VizFigure>
      </div>

      <ProfileDots />
    </SceneShell>
  )
}

function ProfileDots() {
  const [mode, setMode] = React.useState<typeof nccProfileModes[number]['id']>('sample')
  const current = nccProfileModes.find((item) => item.id === mode) ?? nccProfileModes[0]
  return (
    <section className="profile-dots" aria-labelledby="profile-dots-title">
      <div className="profile-dots__heading"><div><h3 id="profile-dots-title">同一扇窗口，换几个切面</h3><p>{current.description}</p></div><span>辅助表达 / 282 点</span></div>
      <div className="segmented-control" role="group" aria-label="切换 NCC 样本切面">
        {nccProfileModes.map((item) => <button key={item.id} type="button" onClick={() => setMode(item.id)} aria-pressed={mode === item.id}>{item.label}</button>)}
      </div>
      <DotField mode={mode} />
      <div className="profile-dots__note">点阵只用于辅助理解，静态比例条和表格才是主要证据表达。切换时不隐藏任何数字。</div>
    </section>
  )
}
