import { DataSource } from './DataSource'

type ChartSourceLineProps = {
  sourceRefs: readonly number[]
  population: string
  scope: string
  period: string
  cutoff: string
  locator?: string
}

export function ChartSourceLine({ sourceRefs, population, scope, period, cutoff }: ChartSourceLineProps) {
  return (
    <div className="chart-source-line">
      {population && <p><span>统计对象</span>{population}</p>}
      {scope && <p><span>范围</span>{scope}</p>}
      {period && <p><span>时间</span>{period}</p>}
      {cutoff && <p><span>截止</span>{cutoff}</p>}
      <p className="chart-source-line__refs">
        <span>来源</span>
        {sourceRefs.map((refNumber) => <DataSource key={refNumber} refNumber={refNumber} />)}
      </p>
    </div>
  )
}
