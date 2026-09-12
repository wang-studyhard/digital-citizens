import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { evidenceMetrics } from '../src/data/evidence.ts'
import { references } from '../src/data/references.ts'

const root = resolve(import.meta.dirname, '..')
const errors: string[] = []
const referenceById = new Map(references.map((reference) => [reference.id, reference]))

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(path)
    return entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') ? [path] : []
  })
}

for (const metric of evidenceMetrics) {
  const source = referenceById.get(metric.sourceId)
  if (!source) errors.push(`${metric.id}: missing source ${metric.sourceId}`)
  if (!metric.locator.trim() || /待补|待核/.test(metric.locator)) errors.push(`${metric.id}: missing locator`)
  if (!metric.population.trim()) errors.push(`${metric.id}: missing population`)
  if (!metric.scope.trim()) errors.push(`${metric.id}: missing scope`)
  if (!metric.cutoff?.trim() || /待补|待核/.test(metric.cutoff)) errors.push(`${metric.id}: missing cutoff`)
  if (metric.canUseAsPrimary && metric.status === 'pending') {
    errors.push(`${metric.id}: primary claim uses pending source/status`)
  }
  if (metric.claimType === 'survey-statistic' && metric.canGeneralizeNationally) {
    errors.push(`${metric.id}: survey statistic cannot generalize nationally`)
  }
  if (metric.id.startsWith('anji-') && metric.population.includes('青年') && metric.scope !== 'youth-rural-employment') {
    errors.push(`${metric.id}: youth-rural data has incorrect scope`)
  }
  if (metric.claimType === 'policy-target' && metric.status !== 'target') {
    errors.push(`${metric.id}: policy target rendered as achieved result`)
  }
  if (metric.sourceId === 3 && metric.canGeneralizeNationally) {
    errors.push(`${metric.id}: community research rendered as official census`)
  }
  if (source?.status === 'pending' && metric.canUseAsPrimary) {
    errors.push(`${metric.id}: primary claim uses a pending reference`)
  }
}

const forbiddenProductionTokens = [
  'CostComparisonDiagram',
  'incomeHeatmap',
  'challengeTable',
  'policyMatrix',
  'careerDistribution',
  'digitalNomadNewcomerPercent',
  'weeklyWorkHours',
]
const productionFiles = [resolve(root, 'src/App.tsx'), ...collectSourceFiles(resolve(root, 'src/components'))]
for (const token of forbiddenProductionTokens) {
  const hasToken = productionFiles.some((file) => readFileSync(file, 'utf8').includes(token))
  if (hasToken) errors.push(`forbidden production token: ${token}`)
}

if (errors.length > 0) {
  console.error(`content check failed (${errors.length})`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`content check passed: ${evidenceMetrics.length} evidence metrics`)
}
