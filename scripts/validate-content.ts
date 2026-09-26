import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { communityChartData, dahuangshanTargets, sampleFlowData } from '../src/data/chartData.ts'
import { chartSpecs } from '../src/data/chartSpecs.ts'
import { evidenceMetrics } from '../src/data/evidence.ts'
import { legacyCandidates } from '../src/data/legacyCandidates.ts'
import { policyEvents } from '../src/data/policy.ts'
import { references } from '../src/data/references.ts'

const root = resolve(import.meta.dirname, '..')
const errors: string[] = []
const referenceById = new Map(references.map((reference) => [reference.id, reference]))
const evidenceById = new Map(evidenceMetrics.map((metric) => [metric.id, metric]))
const legacyCandidateById = new Map(legacyCandidates.map((candidate) => [candidate.id, candidate]))
const validSourceTiers = new Set([
  'official',
  'authoritative-media',
  'research',
  'project-survey',
  'institutional-notice',
  'pending',
])

function findDuplicates(values: readonly (string | number)[]) {
  return values.filter((value, index) => values.indexOf(value) !== index)
}

function sumMetrics(ids: readonly string[]) {
  return ids.reduce((sum, id) => {
    const value = evidenceById.get(id)?.value
    return sum + (typeof value === 'number' ? value : Number.NaN)
  }, 0)
}

function expectSum(label: string, ids: readonly string[], expected: number, tolerance = 0.01) {
  const total = sumMetrics(ids)
  if (!Number.isFinite(total) || Math.abs(total - expected) > tolerance) {
    errors.push(`${label}: expected ${expected}, received ${total}`)
  }
}

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

for (const id of findDuplicates(evidenceMetrics.map((metric) => metric.id))) {
  errors.push(`duplicate evidence id: ${id}`)
}
for (const id of findDuplicates(references.map((reference) => reference.id))) {
  errors.push(`duplicate reference id: ${id}`)
}
for (const reference of references) {
  if (!validSourceTiers.has(reference.sourceTier)) errors.push(`reference ${reference.id}: invalid source tier`)
  if (reference.status === 'pending' && reference.sourceTier !== 'pending') {
    errors.push(`reference ${reference.id}: pending reference must use pending source tier`)
  }
  if (reference.sourceTier === 'pending' && reference.status !== 'pending') {
    errors.push(`reference ${reference.id}: pending source tier must use pending status`)
  }
}

const expectedCoreValues: Record<string, number> = {
  'internet-users-2025': 11.25,
  'internet-penetration-2025': 80.1,
  'rural-internet-penetration-2025': 69.5,
  'villages-5g-coverage-2026': 95,
  'community-total-2025': 77,
  'community-new-2025': 33,
  'community-rural': 52,
  'community-peri-urban': 13,
  'community-urban': 12,
  'anji-dna-stays-2022': 473,
  'anji-dna-average-age-2022': 31,
  'anji-dna-average-stay-2022': 47,
  'anji-dna-postgraduate-2022': 37,
  'anji-dna-work-hours-2022': 6.8,
  'huangshan-rooms': 58,
  'huangshan-stays': 500,
  'huangshan-min-stay': 2,
  'huangshan-max-stay': 3,
  'lishui-communities-2026': 5,
  'lishui-proposals-2026': 41,
  'lishui-landed-projects-2026': 12,
  'huangshan-stays-2025-followup': 5000,
  'huangshan-events-2025-followup': 47,
  'huangshan-local-design-2025-followup': 18,
  'huangshan-tasks-2025-followup': 22,
  'huangshan-consumption-2025-followup': 2200,
  'digital-economy-core-value-added-2024': 14.0891,
  'digital-economy-core-gdp-share-2024': 10.5,
}
for (const [id, expected] of Object.entries(expectedCoreValues)) {
  const actual = evidenceById.get(id)?.value
  if (actual !== expected) errors.push(`${id}: expected frozen core value ${expected}, received ${actual}`)
}

expectSum('NCC sample branches', ['ncc-digital-nomad-sample', 'ncc-explorer-sample'], 798)
expectSum('NCC age percentages', ['ncc-age-70s', 'ncc-age-80s', 'ncc-age-90s', 'ncc-age-00s'], 100)
expectSum('NCC education percentages', ['ncc-education-bachelor', 'ncc-education-master', 'ncc-education-doctor', 'ncc-education-junior'], 100)
expectSum('NCC gender percentages', ['ncc-gender-male', 'ncc-gender-female', 'ncc-gender-nonbinary'], 100)
expectSum('community location counts', ['community-rural', 'community-peri-urban', 'community-urban'], 77)
expectSum('community function percentages', ['community-scenic', 'community-ecological', 'community-urban-hub', 'community-industry'], 100)
expectSum('community scale counts', ['community-small', 'community-large'], 77)

const responseTotal = evidenceById.get('ncc-response-total')?.value
const validTotal = evidenceById.get('ncc-valid-total')?.value
if (typeof responseTotal !== 'number' || typeof validTotal !== 'number' || validTotal > responseTotal) {
  errors.push('NCC response chain: valid responses exceed or lack response total')
}
if (sampleFlowData.excluded.value !== 29) errors.push('sample flow: expected 29 excluded responses')
if (sampleFlowData.branches.reduce((sum, branch) => sum + branch.value, 0) !== sampleFlowData.valid.value) {
  errors.push('sample flow: branch total does not equal valid responses')
}
if (communityChartData.growth.reduce((sum, group) => sum + group.value, 0) !== 77) {
  errors.push('community growth chart: groups do not total 77')
}
if (dahuangshanTargets[1]?.metrics.map((metric) => metric.value).join(',') !== '15,1000,1000000') {
  errors.push('Dahuangshan 2030 targets: transformed values do not match the official target set')
}

for (const id of findDuplicates(legacyCandidates.map((candidate) => candidate.id))) {
  errors.push(`duplicate legacy candidate id: ${id}`)
}
for (const candidate of legacyCandidates) {
  if (!candidate.requiredEvidence.trim()) errors.push(`${candidate.id}: missing required evidence rule`)
  if (candidate.status === 'rejected' && !candidate.rejectionReason?.trim()) {
    errors.push(`${candidate.id}: rejected candidate missing rejection reason`)
  }
}

for (const id of findDuplicates(chartSpecs.map((spec) => spec.id))) {
  errors.push(`duplicate chart spec id: ${id}`)
}
for (const spec of chartSpecs) {
  if (!spec.question.trim() || !spec.takeaway.trim() || !spec.fallback.trim()) {
    errors.push(`${spec.id}: incomplete chart spec`)
  }
  for (const sourceId of spec.sourceRefs) {
    if (!referenceById.has(sourceId)) errors.push(`${spec.id}: missing chart source ${sourceId}`)
  }
  for (const evidenceId of spec.evidenceIds) {
    const metric = evidenceById.get(evidenceId)
    if (!metric) errors.push(`${spec.id}: missing chart evidence ${evidenceId}`)
    if (spec.evidenceGate === 'ready' && metric?.status === 'pending') {
      errors.push(`${spec.id}: ready chart uses pending evidence ${evidenceId}`)
    }
  }
  if (spec.evidenceGate === 'ready' && spec.evidenceIds.length === 0) {
    errors.push(`${spec.id}: ready chart has no evidence ids`)
  }
  if (spec.evidenceGate === 'pending') {
    if (!spec.candidateIds?.length) errors.push(`${spec.id}: pending chart has no candidate ids`)
    for (const candidateId of spec.candidateIds ?? []) {
      const candidate = legacyCandidateById.get(candidateId)
      if (!candidate) errors.push(`${spec.id}: missing legacy candidate ${candidateId}`)
      if (candidate?.status !== 'pending') errors.push(`${spec.id}: pending chart uses non-pending candidate ${candidateId}`)
    }
  }
}

for (const id of findDuplicates(policyEvents.map((event) => event.id))) {
  errors.push(`duplicate policy event id: ${id}`)
}
for (const event of policyEvents) {
  for (const sourceId of event.sourceRefs) {
    if (!referenceById.has(sourceId)) errors.push(`${event.id}: missing policy source ${sourceId}`)
  }
  for (const evidenceId of event.evidenceIds) {
    const metric = evidenceById.get(evidenceId)
    if (!metric) errors.push(`${event.id}: missing policy evidence ${evidenceId}`)
    if (event.kind === 'target' && metric && (metric.claimType !== 'policy-target' || metric.status !== 'target')) {
      errors.push(`${event.id}: target event uses achieved/non-target evidence ${evidenceId}`)
    }
  }
  if (event.kind === 'target' && !/20\d{2}/.test(event.date)) {
    errors.push(`${event.id}: target event missing target year`)
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

const legacyImportPattern = /(?:from\s+|import\s*\()['"][^'"]*legacyCandidates(?:\.ts)?['"]/
const sourceFiles = collectSourceFiles(resolve(root, 'src')).filter(
  (file) => file !== resolve(root, 'src/data/legacyCandidates.ts'),
)
for (const file of sourceFiles) {
  if (legacyImportPattern.test(readFileSync(file, 'utf8'))) {
    errors.push(`production source imports legacy candidates: ${file.replace(`${root}\\`, '')}`)
  }
}

if (errors.length > 0) {
  console.error(`content check failed (${errors.length})`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(
    `content check passed: ${evidenceMetrics.length} evidence metrics, ${chartSpecs.length} chart specs, ${legacyCandidates.length} legacy candidates`,
  )
}
