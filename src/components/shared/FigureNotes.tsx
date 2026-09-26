import type { ReactNode } from 'react'
import { ChartSourceLine } from './ChartSourceLine'

type FigureNotesProps = {
  sourceRefs: readonly number[]
  population: string
  scope: string
  period: string
  cutoff: string
  locator?: string
  note?: ReactNode
}

export function FigureNotes({ sourceRefs, population, scope, period, cutoff, locator, note }: FigureNotesProps) {
  return <details className="figure-notes">
    <summary aria-label={`查看注释与来源 ${sourceRefs.join('、')}`}>
      {sourceRefs.map((number) => `[${number}]`).join(' ')}
    </summary>
    <div className="figure-notes__content">
      <ChartSourceLine sourceRefs={sourceRefs} population={population} scope={scope} period={period} cutoff={cutoff} locator={locator} />
      {note && <p className="figure-notes__note">{note}</p>}
    </div>
  </details>
}
