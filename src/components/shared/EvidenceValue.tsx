import { evidenceById } from '@/data/evidence'
import { DataSource } from './DataSource'

type EvidenceValueProps = {
  metricId: string
  display?: string
  className?: string
}

export function EvidenceValue({ metricId, display, className = '' }: EvidenceValueProps) {
  const metric = evidenceById[metricId]
  if (!metric) return null
  const value = display ?? `${metric.value}${metric.unit ? ` ${metric.unit}` : ''}`
  return <span className={`evidence-value ${className}`} data-evidence-id={metric.id}>{value}<DataSource refNumber={metric.sourceId} /></span>
}
