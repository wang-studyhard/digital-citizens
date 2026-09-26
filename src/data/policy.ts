// 第四章数据：政策与地方实践。目标、措施和报道结果分开存放。
import type { PolicyCard } from '@/types'

export type PolicyEvent = {
  id: string
  place: '丽水' | '安吉' | '大黄山' | '黟县'
  date: string
  kind: 'action' | 'reported' | 'target'
  claim: string
  evidenceIds: readonly string[]
  sourceRefs: readonly number[]
  limitation: string
}

export const policyEvents = [
  {
    id: 'dahuangshan-plan-2024',
    place: '大黄山',
    date: '2024-08-14',
    kind: 'action',
    claim: '安徽省大黄山办印发全球数字游民集聚创业地建设行动方案。',
    evidenceIds: [],
    sourceRefs: [6],
    limitation: '方案发布不等于目标已经完成。',
  },
  {
    id: 'lishui-progress-2025',
    place: '丽水',
    date: '2025-12-04',
    kind: 'reported',
    claim: '公开报道记录 4 个常态化社区、6 个旅居型驿站与 3000 余名入驻者。',
    evidenceIds: ['lishui-communities-2025', 'lishui-stations-2025', 'lishui-participants-2025'],
    sourceRefs: [7],
    limitation: '入驻人数不等于长期居住或项目效果。',
  },
  {
    id: 'yixian-progress-2025',
    place: '黟县',
    date: '2025',
    kind: 'reported',
    claim: '政府公开页面记录入住、活动、项目设计、任务与消费等后续进展。',
    evidenceIds: ['huangshan-stays-2025-followup', 'huangshan-events-2025-followup', 'huangshan-local-design-2025-followup', 'huangshan-tasks-2025-followup', 'huangshan-consumption-2025-followup'],
    sourceRefs: [16],
    limitation: '公开进展不是独立效果评估，消费数字不能作单一因果归因。',
  },
  {
    id: 'anji-workstations-2026',
    place: '安吉',
    date: '2026-04-30',
    kind: 'target',
    claim: '安吉数字游民共创计划发布 100 个乡村工位。',
    evidenceIds: ['anji-rural-workstations-2026'],
    sourceRefs: [15],
    limitation: '计划发布不等于工位已被使用；青年入乡数据也不等于数字游民人数。',
  },
  {
    id: 'lishui-progress-2026',
    place: '丽水',
    date: '2026-06-18',
    kind: 'reported',
    claim: '公开报道记录 5 个常态化社区，以及 41 个提案和 12 个落地项目。',
    evidenceIds: ['lishui-communities-2026', 'lishui-proposals-2026', 'lishui-landed-projects-2026'],
    sourceRefs: [14],
    limitation: '公开报道的进展不等于全市普查或长期就业。',
  },
  {
    id: 'dahuangshan-target-2027',
    place: '大黄山',
    date: '2027',
    kind: 'target',
    claim: '行动方案提出到 2027 年建设约 8 个大型基地、累计集聚 500 家团队、吸引 20 万以上人次。',
    evidenceIds: ['huangshan-target-bases-2027', 'huangshan-target-teams-2027', 'huangshan-target-visits-2027'],
    sourceRefs: [6],
    limitation: '这是政策目标，不是已完成结果。',
  },
  {
    id: 'dahuangshan-target-2030',
    place: '大黄山',
    date: '2030',
    kind: 'target',
    claim: '行动方案提出到 2030 年建设约 15 个大型基地、累计集聚 1000 家团队、吸引 100 万人次。',
    evidenceIds: ['huangshan-target-bases-2030', 'huangshan-target-teams-2030', 'huangshan-target-visits-2030'],
    sourceRefs: [6],
    limitation: '这是政策目标，不是已完成结果。',
  },
] as const satisfies readonly PolicyEvent[]

export const policyCards: PolicyCard[] = [
  {
    city: '丽水',
    province: '浙江',
    title: '旅居共创政策持续更新',
    highlights: [
      '2024年发布支持数字游民发展的八条措施，2025年更新为旅居共创十条措施',
      '公开报道提到住宿、创业空间、金融支持和运营激励等政策工具',
      '具体资格、金额与适用对象以正式政策文本及执行细则为准',
    ],
    keyNumbers: [
      { label: '政策版本', value: '八条→十条' },
      { label: '最新公开时间', value: '2025年12月' },
    ],
    source: '浙江日报；商务部服务贸易指南转载（2025-12-12）',
    sourceId: 7,
    status: 'reported',
  },
  {
    city: '黄山',
    province: '安徽',
    title: '“大黄山”全球数字游民集聚创业地建设行动',
    highlights: [
      '行动方案提出到2027年建设约8个大型基地、吸引500个团队、累计吸引20万人次',
      '到2030年提出约15个大型基地、1000个团队、累计100万人次等目标',
      '方案覆盖黄山、池州、宣城、安庆四市组成的大黄山区域',
      '这些是政策目标，不等于已经完成的成果',
    ],
    keyNumbers: [
      { label: '2027基地数', value: '约8个' },
      { label: '2027团队', value: '500个' },
      { label: '2030基地数', value: '约15个' },
      { label: '2030团队', value: '1000个' },
    ],
    source: '安徽省大黄山办《建设行动方案》（2024-08-14）',
    sourceId: 6,
    status: 'target',
  },
  {
    city: '山东',
    province: '山东',
    title: '地方试点仍在推进',
    highlights: [
      '2025年以来，山东公开报道出现数字游民创业集聚地试点信息',
      '目前可核对材料主要是调研与试点动态，不能替代正式专项政策全文',
      '本作品不将山东列为已形成成熟模式的案例',
    ],
    keyNumbers: [
      { label: '材料状态', value: '持续核验' },
      { label: '主线使用', value: '不作结论' },
    ],
    source: '山东省大数据局公开试点动态（待正式文件）',
    status: 'pending',
  },
]

// 保留旧组件接口，但不在新版主线展示无来源宏观数字。
export const ruralStats = {
  totalEntrepreneurs: 0,
  mainGroup: '公开材料未形成可比口径',
  mainGroupPercent: 0,
  villageIncomeIncrease: 0,
}

export const anjiImpact = {
  jobsCreated: 0,
  villageIncomeIncrease: 0,
  description:
    '公开报道记录了社区成员为当地餐厅设计海报、门头和菜单，并制作《白茶原小报》；报道未提供可用于推算总体就业或增收效果的调查。',
}

export const genZWillingness = {
  percentage: 0,
  description: '原有“00后愿意成为数字游民”数字暂不进入主线',
  source: '待取得原始调查',
}

export const localEngagement = [
  {
    title: '从需求开始',
    description: '先由村庄、商户或社区提出具体需求，再判断青年技能能否参与。',
  },
  {
    title: '把行动说清',
    description: '记录谁参与、做了什么、产生了哪些被报道的结果，避免把愿景写成成效。',
  },
  {
    title: '留下合作',
    description: '关注项目、技能和关系是否能够留下，而不是只统计一次到访或短期热度。',
  },
]
