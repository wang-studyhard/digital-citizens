import type { ReactNode } from 'react'
import { DataSource } from './DataSource'

type VizFigureProps = {
  id: string
  title: string
  unit: string
  population: string
  scope: string
  period: string
  cutoff: string
  sourceRefs: number[]
  locator: string
  scopeNote: string
  children: ReactNode
  table?: ReactNode
  className?: string
}

export function VizFigure({
  id,
  title,
  unit,
  population,
  scope,
  period,
  cutoff,
  sourceRefs,
  locator,
  scopeNote,
  children,
  table,
  className = '',
}: VizFigureProps) {
  return (
    <figure id={id} className={`viz-figure ${className}`} aria-labelledby={`${id}-title`}>
      <header className="viz-figure__header">
        <div>
          <h3 id={`${id}-title`}>{title}</h3>
          <p className="viz-figure__unit">单位：{unit}</p>
        </div>
        <div className="viz-figure__sources" aria-label="来源编号">
          {sourceRefs.map((refNumber) => <DataSource key={refNumber} refNumber={refNumber} />)}
        </div>
      </header>
      <dl className="viz-figure__meta">
        <div><dt>统计对象</dt><dd>{population}</dd></div>
        <div><dt>范围 scope</dt><dd>{scope}</dd></div>
        <div><dt>时间 period</dt><dd>{period}</dd></div>
        <div><dt>截止 cutoff</dt><dd>{cutoff}</dd></div>
      </dl>
      <div className="viz-figure__body">{children}</div>
      {table}
      <figcaption>
        <span>{scopeNote}</span>
        <span>来源定位：{locator}</span>
      </figcaption>
    </figure>
  )
}
