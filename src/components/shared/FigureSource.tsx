import type { ReactNode } from 'react'

export type FigureEvidence = {
  title: string
  population: string
  scope: string
  period: string
  cutoff: string
  locator: string
  note: ReactNode
  table: ReactNode
}

export function FigureSource({ figure, reference = 1 }: { figure: FigureEvidence; reference?: number }) {
  return <button type="button" className="figure-source" aria-haspopup="dialog" aria-label={`查看${figure.title}的方法与数据 [${reference}]`} onClick={(event) => {
    window.dispatchEvent(new CustomEvent('open-evidence', { detail: { trigger: event.currentTarget, reference, figure } }))
  }}>方法与数据 [{reference}]</button>
}
