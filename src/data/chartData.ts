import { evidenceById } from './evidence.ts'

export type ChartDatum = {
  id: string
  label: string
  value: number
  unit: string
  derived?: boolean
}

function numberMetric(id: string) {
  const metric = evidenceById[id]
  if (!metric || typeof metric.value !== 'number') {
    throw new Error(`Chart data requires numeric evidence: ${id}`)
  }
  return metric.value
}

function datum(id: string, label: string, derived = false): ChartDatum {
  const metric = evidenceById[id]
  return {
    id,
    label,
    value: numberMetric(id),
    unit: metric.unit ?? '',
    derived,
  }
}

export const sampleFlowData = {
  received: datum('ncc-response-total', '回收问卷'),
  valid: datum('ncc-valid-total', '有效问卷'),
  excluded: {
    id: 'ncc-excluded-responses',
    label: '清洗后未保留',
    value: numberMetric('ncc-response-total') - numberMetric('ncc-valid-total'),
    unit: '份问卷',
    derived: true,
  },
  branches: [
    datum('ncc-digital-nomad-sample', '数字游民样本'),
    datum('ncc-explorer-sample', '数字游民探索者'),
  ],
  interviews: datum('ncc-structured-interviews', '结构化访谈对象'),
} as const

export const infrastructureChartData = {
  users: datum('internet-users-2025', '中国网民规模'),
  penetration: datum('internet-penetration-2025', '全国互联网普及率'),
  ruralPenetration: datum('rural-internet-penetration-2025', '农村地区互联网普及率'),
  village5g: datum('villages-5g-coverage-2026', '行政村通5G比例'),
} as const

export const ageChartData = [
  datum('ncc-age-70s', '70后'),
  datum('ncc-age-80s', '80后'),
  datum('ncc-age-90s', '90后'),
  datum('ncc-age-00s', '00后'),
] as const

export const educationChartData = [
  datum('ncc-education-bachelor', '本科'),
  datum('ncc-education-master', '硕士'),
  datum('ncc-education-doctor', '博士'),
  datum('ncc-education-junior', '大专及以下'),
] as const

export const genderChartData = [
  datum('ncc-gender-male', '男性'),
  datum('ncc-gender-female', '女性'),
  datum('ncc-gender-nonbinary', '非二元'),
] as const

export const communityChartData = {
  total: [datum('community-total-2025', '研究纳入')],
  growth: [
    datum('community-new-2025', '2025年新增'),
    {
      id: 'community-before-2025',
      label: '此前纳入',
      value: numberMetric('community-total-2025') - numberMetric('community-new-2025'),
      unit: '家社区',
      derived: true,
    },
  ],
  location: [
    datum('community-rural', '乡村'),
    datum('community-peri-urban', '城乡结合部'),
    datum('community-urban', '城市'),
  ],
  function: [
    datum('community-scenic', '景区文旅型'),
    datum('community-ecological', '自然生态型'),
    datum('community-urban-hub', '城市枢纽型'),
    datum('community-industry', '产业主题型'),
  ],
  scale: [
    datum('community-small', '中小型'),
    datum('community-large', '大型'),
  ],
} as const

export const stayScaleData = {
  anji: datum('anji-dna-average-stay-2022', '安吉DNA平均停留'),
  yixianMinimum: datum('huangshan-min-stay', '黟县最短入住'),
  yixianMaximum: datum('huangshan-max-stay', '黟县最长通常建议'),
} as const

export const yixianActionData = [
  datum('huangshan-stays-2025-followup', '入住当地民宿'),
  datum('huangshan-events-2025-followup', '自主举办特色活动'),
  datum('huangshan-local-design-2025-followup', '参与本地项目设计'),
  datum('huangshan-tasks-2025-followup', '完成“揭榜挂帅”任务'),
] as const

export const lishuiCoCreationData = {
  proposals: datum('lishui-proposals-2026', '共创项目提案'),
  landed: datum('lishui-landed-projects-2026', '已落地项目'),
  communities: datum('lishui-communities-2026', '常态化社区'),
} as const

export const dahuangshanTargets = [
  {
    year: 2027,
    metrics: [
      datum('huangshan-target-bases-2027', '大型基地'),
      datum('huangshan-target-teams-2027', '累计集聚团队'),
      datum('huangshan-target-visits-2027', '累计吸引人次'),
    ],
  },
  {
    year: 2030,
    metrics: [
      datum('huangshan-target-bases-2030', '大型基地'),
      datum('huangshan-target-teams-2030', '累计集聚团队'),
      datum('huangshan-target-visits-2030', '累计吸引人次'),
    ],
  },
] as const
