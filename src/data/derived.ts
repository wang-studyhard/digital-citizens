import { evidenceById } from '@/data/evidence'

export type MetricView = {
  metricId: string
  label: string
  color?: 'blue' | 'green' | 'red' | 'sand'
  derived?: boolean
}

export type LedgerItem = {
  label: string
  metricId?: string
  text: string
  derived?: boolean
}

export const metricNumber = (metricId: string) => {
  const value = evidenceById[metricId]?.value
  return typeof value === 'number' ? value : 0
}

export const approxCount = (metricId: string, denominator: number) =>
  Math.round((metricNumber(metricId) / 100) * denominator)

export const sampleLedger: LedgerItem[] = [
  { label: '回收问卷', metricId: 'ncc-response-total', text: '进入清洗前的社区渠道问卷。' },
  { label: '有效问卷', metricId: 'ncc-valid-total', text: '完成清洗后保留的有效问卷。' },
  { label: '数字游民样本', metricId: 'ncc-digital-nomad-sample', text: '本篇画像的统计对象，只属于 NCC 社区渠道样本。' },
  { label: '探索者', metricId: 'ncc-explorer-sample', text: '有效问卷中的另一分支，不并入 282。' },
  { label: '结构化访谈', metricId: 'ncc-structured-interviews', text: '用于补充经验和关系的定性材料。' },
]

export const nccProfileViews = {
  age: [
    { label: '70后', metricId: 'ncc-age-70s', color: 'sand' as const },
    { label: '80后', metricId: 'ncc-age-80s', color: 'blue' as const },
    { label: '90后', metricId: 'ncc-age-90s', color: 'green' as const },
    { label: '00后', metricId: 'ncc-age-00s', color: 'red' as const },
  ],
  education: [
    { label: '本科', metricId: 'ncc-education-bachelor', color: 'blue' as const },
    { label: '硕士', metricId: 'ncc-education-master', color: 'green' as const },
    { label: '博士', metricId: 'ncc-education-doctor', color: 'sand' as const },
    { label: '大专及以下', metricId: 'ncc-education-junior', color: 'red' as const },
  ],
  gender: [
    { label: '男性', metricId: 'ncc-gender-male', color: 'blue' as const },
    { label: '女性', metricId: 'ncc-gender-female', color: 'green' as const },
    { label: '非二元', metricId: 'ncc-gender-nonbinary', color: 'sand' as const },
  ],
}

export const nccProfileModes = [
  {
    id: 'sample',
    label: '样本',
    description: '282 个点代表 NCC 社区渠道中的数字游民样本，不代表中国数字游民人口。',
    groups: [{ label: '数字游民样本', metricId: 'ncc-digital-nomad-sample', color: 'red' as const }],
  },
  { id: 'age', label: '年龄', description: '按报告正文中的出生年代比例重排；这是样本内部结构，不是全国年龄分布。', groups: nccProfileViews.age },
  { id: 'education', label: '学历', description: '原报告学历图中的四个类别合计为 282 人；近似人数由百分比按 n=282 折算。', groups: nccProfileViews.education },
  { id: 'gender', label: '性别', description: '原报告性别图中的三个类别合计为 282 人；近似人数由百分比按 n=282 折算。', groups: nccProfileViews.gender },
] as const

export const communityViews = [
  {
    id: 'total',
    label: '总量',
    description: '研究在筛选范围内纳入 77 家正常运营社区。每个点只代表一家社区。',
    groups: [{ label: '研究纳入', metricId: 'community-total-2025', color: 'blue' as const }],
  },
  {
    id: 'growth',
    label: '新增年份',
    description: '同一批社区按纳入年份重排：2025 年新增 33 家，其余为此前纳入的 44 家。',
    groups: [
      { label: '2025 新增', metricId: 'community-new-2025', color: 'sand' as const },
      { label: '此前纳入', metricId: 'community-total-2025', color: 'blue' as const, derived: true, derivedMetricId: 'community-new-2025' },
    ],
  },
  {
    id: 'location',
    label: '城乡区位',
    description: '同一批社区按研究中的乡村、城乡结合部和城市分类重排。',
    groups: [
      { label: '乡村', metricId: 'community-rural', color: 'green' as const },
      { label: '城乡结合部', metricId: 'community-peri-urban', color: 'sand' as const },
      { label: '城市', metricId: 'community-urban', color: 'red' as const },
    ],
  },
  {
    id: 'type',
    label: '功能类型',
    description: '原始材料提供比例；下方近似数量按 n=77 四舍五入，只表达聚合结构。',
    groups: [
      { label: '景区文旅型', metricId: 'community-scenic', color: 'red' as const },
      { label: '自然生态型', metricId: 'community-ecological', color: 'green' as const },
      { label: '城市枢纽型', metricId: 'community-urban-hub', color: 'blue' as const },
      { label: '产业主题型', metricId: 'community-industry', color: 'sand' as const },
    ],
  },
  {
    id: 'scale',
    label: '规模',
    description: '研究纳入的社区中，68 家为中小型，9 家为大型。',
    groups: [
      { label: '中小型', metricId: 'community-small', color: 'blue' as const },
      { label: '大型', metricId: 'community-large', color: 'red' as const },
    ],
  },
] as const

export const workColumns = [
  {
    title: '发生变化',
    tone: 'field' as const,
    items: ['工作地点', '日常时间安排', '与地方接触的方式'],
  },
  {
    title: '没有自动改变',
    tone: 'ink' as const,
    items: ['客户和项目截止时间', '收入压力', '劳动保障需求', '协作要求'],
  },
  {
    title: '当前证据不能判断',
    tone: 'accent' as const,
    items: ['工作更自由', '收入更高', '生活更稳定', '人会更幸福'],
  },
] as const

export const anjiSteps = [
  '闲置空间被重新打开',
  '社区进入青年入乡网络',
  '青年开始常态化办公 / 参与项目',
  '村集体与本地商户提出具体需求',
  '设计、内容与协作成为可见行动',
] as const

export const huangshanSteps = [
  { label: '工业遗址', text: '旧酿酒工业遗址先被改造成可以居住、工作和相遇的社区空间。' },
  { label: '58 个房间', text: '空间有了可被使用的尺度；它仍然是一个具体社区，不是全市总量。', metricId: 'huangshan-rooms' },
  { label: '旅居者进入', text: '公开报道记录，社区成立不到一年已有旅居者进入，通常是数周到数月。', metricId: 'huangshan-stays' },
  { label: '社区活动', text: '分享、户外工作与乡村电影活动，让旅居者与地方文化发生接触。' },
  { label: '地方任务 / 项目', text: '当社区开始承接地方任务，问题就从“谁来住”转向“共同做什么”。' },
] as const

export const policyLedger = [
  {
    place: '丽水',
    date: '2024—2025',
    measure: '公开材料显示，支持数字游民与旅居共创的措施持续更新。',
    reported: '材料提到住宿、创业空间、金融支持与运营激励等工具。',
    target: '',
    limitation: '政策工具不等于实际使用效果。',
    sourceRefs: [7],
  },
  {
    place: '丽水 / 52 赫兹社区',
    date: '2025—2026',
    measure: '',
    reported: '公开报道提到常态化社区与共创项目进展。',
    reportedMetricIds: ['lishui-communities-2026', 'lishui-proposals-2026', 'lishui-landed-projects-2026'],
    target: '',
    limitation: '公开报道的进展不等于全市普查，也不等于长期就业。',
    sourceRefs: [14],
  },
  {
    place: '大黄山区域',
    date: '目标至 2027',
    measure: '行动方案提出建设数字游民集聚创业地。',
    reported: '',
    target: '行动方案列出基地、团队与累计吸引人次等目标。',
    targetMetricIds: ['huangshan-target-bases-2027', 'huangshan-target-teams-2027', 'huangshan-target-visits-2027'],
    limitation: '这是政策目标，不等于已经完成的结果。',
    sourceRefs: [6],
  },
] as const

export const limits = {
  canSay: [
    '社区正在一些地方出现，并形成可被研究的聚合结构。',
    '地方开始形成承接机制，把空间、活动与项目连接起来。',
    '部分社区成员参与了具体的地方项目或文化活动。',
    '部分地方已经出台相关措施，或公开提出发展目标。',
  ],
  cannotSay: [
    '全国数字游民的规模或人口画像。',
    '长期就业、稳定增收或长期定居率。',
    '一次入住、一次到访或一项消费带来的因果经济贡献。',
    '这些做法可以直接复制到所有地方。',
  ],
} as const
