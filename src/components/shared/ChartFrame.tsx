import type { ReactNode } from 'react'
import { FigureNotes } from './FigureNotes'

type ChartFrameProps = {
  id: string
  title: ReactNode
  unit: string
  population: string
  scope: string
  period: string
  cutoff: string
  locator?: string
  sourceRefs: readonly number[]
  note?: ReactNode
  children: ReactNode
  table?: ReactNode
  className?: string
}

export function ChartFrame({
  id,
  title,
  unit,
  population,
  scope,
  period,
  cutoff,
  locator,
  sourceRefs,
  note,
  children,
  table,
  className = '',
}: ChartFrameProps) {
  return (
    <figure id={id} className={`chart-frame ${className}`} aria-labelledby={`${id}-title`}>
      <header className="chart-frame__header">
        <div className="chart-frame__heading-line">
          <h3 id={`${id}-title`}>{title}</h3>
          <FigureNotes sourceRefs={sourceRefs} population={population} scope={scope} period={period} cutoff={cutoff} locator={locator} note={note} />
        </div>
        {unit && <p>{unit}</p>}
      </header>
      <div className="chart-frame__plot">{children}</div>
      {table && <details className="chart-frame__table">
        <summary>查看完整数据表</summary>
        {table}
      </details>}
    </figure>
  )
}
