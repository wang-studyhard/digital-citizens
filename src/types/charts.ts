export type ChartRelationship =
  | 'flow'
  | 'composition'
  | 'ranking'
  | 'comparison'
  | 'matrix'
  | 'geography'
  | 'timeline'
  | 'editorial-path'

export type ChartEvidenceGate = 'ready' | 'pending' | 'rejected'

export type ChartSpec = {
  id: string
  question: string
  evidenceIds: readonly string[]
  candidateIds?: readonly string[]
  relationship: ChartRelationship
  chartType: string
  takeaway: string
  annotation: readonly string[]
  sourceRefs: readonly number[]
  evidenceGate: ChartEvidenceGate
  desktop: string
  mobile: string
  reducedMotion: string
  fallback: string
}
