import type { ReactNode } from 'react'
import { ChartSourceLine } from './ChartSourceLine'

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
  sourcePosition?: 'before' | 'after'
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
  sourcePosition = 'before',
}: ChartFrameProps) {
  const sourceLine = <ChartSourceLine sourceRefs={sourceRefs} population={population} scope={scope} period={period} cutoff={cutoff} locator={locator} />

  return (
    <figure id={id} className={`chart-frame ${className}`} aria-labelledby={`${id}-title`}>
      <header className="chart-frame__header">
        <h3 id={`${id}-title`}>{title}</h3>
        {unit && <p>{unit}</p>}
      </header>
      {sourcePosition === 'before' && sourceLine}
      <div className="chart-frame__plot">{children}</div>
      {sourcePosition === 'after' && sourceLine}
      {table && <details className="chart-frame__table">
        <summary>查看完整数据表</summary>
        {table}
      </details>}
      {note && <figcaption>{note}</figcaption>}
    </figure>
  )
}
