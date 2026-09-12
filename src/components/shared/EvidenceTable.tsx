import type { ReactNode } from 'react'

export type EvidenceColumn = {
  key: string
  label: string
}

export type EvidenceRow = {
  id: string
  cells: Record<string, ReactNode>
}

type EvidenceTableProps = {
  caption: string
  columns: EvidenceColumn[]
  rows: EvidenceRow[]
  className?: string
}

export function EvidenceTable({ caption, columns, rows, className = '' }: EvidenceTableProps) {
  return (
    <div className={`evidence-table ${className}`}>
      <div className="evidence-table__desktop">
        <table>
          <caption>{caption}</caption>
          <thead>
            <tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => <td key={column.key}>{row.cells[column.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="evidence-table__mobile" aria-label={caption}>
        {rows.map((row) => (
          <article key={row.id}>
            {columns.map((column) => (
              <div key={column.key}>
                <span>{column.label}</span>
                <strong>{row.cells[column.key]}</strong>
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  )
}
