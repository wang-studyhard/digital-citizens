// 第四章数据：政策与地方实践。目标、措施和报道结果分开存放。
import type { PolicyCard } from '@/types'

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
