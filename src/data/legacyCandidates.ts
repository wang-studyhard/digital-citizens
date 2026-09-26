/**
 * V4 legacy candidate quarantine.
 *
 * Values here were found in the old draft or historical source files. They are
 * not production evidence and must not be imported by UI or chart code.
 */
export type LegacyCandidateStatus = 'pending' | 'rejected'

export type LegacyCandidate = {
  id: string
  label: string
  status: LegacyCandidateStatus
  population: string
  period: string
  foundIn: readonly string[]
  values: unknown
  conflict: string
  requiredEvidence: string
  rejectionReason?: string
}

export const legacyCandidates = [
  {
    id: 'ncc-work-experience',
    label: '工作年限分布',
    status: 'pending',
    population: '待核：NCC 282 名数字游民或报告相关样本',
    period: '2024',
    foundIn: ['content.txt', '26114e0^:src/data/demographics.ts'],
    values: [
      { label: '1年以下', percentage: 7.45 },
      { label: '1—3年', percentage: 17.38 },
      { label: '3—5年', percentage: 19.86 },
      { label: '5年以上', percentage: 55.31 },
    ],
    conflict: '公开摘要只明确支持“55.31% 有 5 年以上工作经验”，完整分布与分母尚未逐项核对。',
    requiredEvidence: '取得原报告对应图表，确认题目、分母和四个类别。',
  },
  {
    id: 'ncc-nomad-tenure',
    label: '成为数字游民的经历时长',
    status: 'pending',
    population: 'NCC 282 名数字游民（旧稿口径）',
    period: '2024',
    foundIn: ['content.txt', '26114e0^:src/data/demographics.ts'],
    values: [
      { label: '半年内', percentage: 22.4 },
      { label: '约1年', percentage: 32 },
      { label: '2—3年', percentage: 25.6 },
      { label: '3年以上', percentage: 10.4 },
      { label: '5年以上', percentage: 9.6 },
    ],
    conflict: '历史 TypeScript 文件把旧稿中的原始类别改写为 1—2 年、3—5 年，不能据此恢复。',
    requiredEvidence: '取得原报告图表，按原题原类别逐项核对。',
  },
  {
    id: 'ncc-position-explorer',
    label: '职位层级',
    status: 'pending',
    population: 'NCC 516 名数字游民探索者',
    period: '2024',
    foundIn: ['content.txt', '26114e0^:src/data/demographics.ts'],
    values: [
      { label: '执行人员', percentage: 60.58 },
      { label: '中层管理', percentage: 15.34 },
      { label: '高层／创始人', percentage: 4.47 },
      { label: '其他', percentage: 19.61 },
    ],
    conflict: '旧代码把该组值放在人群画像中，但旧稿语境指向 516 名探索者，不属于 282 名数字游民。',
    requiredEvidence: '取得原题与图表，确认分母确为 516；如恢复，只能进入探索者侧栏。',
  },
  {
    id: 'ncc-migration-frequency',
    label: '更换游牧地点频率',
    status: 'pending',
    population: 'NCC 282 名数字游民（旧稿口径）',
    period: '2024',
    foundIn: ['content.txt'],
    values: [
      { label: '几周内', percentage: 11.7 },
      { label: '6个月内', percentage: 23.05 },
      { label: '半年至一年', percentage: 13.83 },
      { label: '不确定', percentage: 51.42 },
    ],
    conflict: '公开摘要只支持 51.42% 与 23.05% 两项，不能反证另外两项。',
    requiredEvidence: '取得原报告完整图表，确认四个类别、题目和分母。',
  },
  {
    id: 'ncc-income-tenure',
    label: '收入 × 数字游民经历',
    status: 'pending',
    population: 'NCC 282 名数字游民（旧稿口径）',
    period: '2024',
    foundIn: ['content.txt', '26114e0^:src/data/tables.ts'],
    values: {
      rows: ['半年内', '约1年', '2—3年', '3年以上', '5年以上'],
      columns: ['10万及以下', '10—20万', '20—50万', '50—100万', '100万及以上'],
      matrix: [
        [56.73, 25.38, 7.45, 8.96, 1.47],
        [37.5, 29.55, 20.45, 5.67, 6.83],
        [27.4, 26.04, 30.14, 6.84, 9.58],
        [24.12, 41.44, 17.22, 13.81, 3.4],
        [19.98, 27.99, 44.02, 0, 8.01],
      ],
    },
    conflict: '历史 tables.ts 少一行且把行维度错写成工作经验；公开摘要只能支持部分首尾结论。',
    requiredEvidence: '取得原报告 5×5 原表，确认行列定义、分母和收入周期。',
  },
  {
    id: 'ncc-settlement-office',
    label: '定居意愿 × 重新固定办公意愿',
    status: 'pending',
    population: 'NCC 282 名数字游民（旧稿口径）',
    period: '2024',
    foundIn: ['content.txt'],
    values: {
      rows: ['考虑定居', '未决定', '不考虑'],
      columns: ['愿意固定办公', '未决定', '不愿意固定办公'],
      matrix: [
        [19.86, 13.12, 15.6],
        [12.06, 19.15, 3.55],
        [14.18, 1.06, 1.42],
      ],
    },
    conflict: '公开摘要支持 48.58% 与 46.10% 两个边际值，但不能证明九个联合占比单元格。',
    requiredEvidence: '取得原报告 3×3 原表，并确认九格为全样本联合占比。',
  },
  {
    id: 'china-nomad-population',
    label: '中国数字游民 7000 万—1 亿',
    status: 'rejected',
    population: '中国数字游民人口（定义不明）',
    period: '不明',
    foundIn: ['历史稿件'],
    values: { lower: 70_000_000, upper: 100_000_000 },
    conflict: '缺少一致定义、调查年份、抽样方法与可追溯人口来源。',
    requiredEvidence: '需要新的权威统计定义与原始调查；不能通过旧稿补证。',
    rejectionReason: '不可作为全国人口规模。',
  },
  {
    id: 'china-opc-population',
    label: '全国 OPC 1600 万',
    status: 'rejected',
    population: '一人公司／个体经营相关口径',
    period: '不明',
    foundIn: ['历史稿件'],
    values: 16_000_000,
    conflict: 'OPC 与数字游民不是同一统计对象。',
    requiredEvidence: '即使来源可核，也只能用于另一个问题，不能替代数字游民人口。',
    rejectionReason: '概念错配。',
  },
  {
    id: 'gen-z-willingness',
    label: '76.4% 的 00 后愿意成为数字游民',
    status: 'rejected',
    population: '不明',
    period: '不明',
    foundIn: ['历史稿件'],
    values: 76.4,
    conflict: '没有原始题目、样本、地区和调查时间。',
    requiredEvidence: '需要可复核的原始调查；届时应作为新证据重新评估。',
    rejectionReason: '来源与口径缺失。',
  },
  {
    id: 'mbo-us-careers',
    label: 'MBO Partners 美国职业分布',
    status: 'rejected',
    population: '美国数字游民样本',
    period: '2024',
    foundIn: ['26114e0^:src/data/globalComparisons.ts', '26114e0^:src/data/demographics.ts'],
    values: [19, 14, 9, 9, 8, 7],
    conflict: '旧代码把美国样本职业结构放进中国人群画像。',
    requiredEvidence: '如未来增加海外比较，需重新核验 MBO 原报告并单独成章。',
    rejectionReason: '不可混入中国样本图表。',
  },
  {
    id: 'illustrative-cost-comparison',
    label: '上海与县域小城生活成本',
    status: 'rejected',
    population: '示意预算',
    period: '无',
    foundIn: ['26114e0^:src/data/economics.ts'],
    values: { shanghai: 15000, county: 15000 },
    conflict: '历史代码明确标注为示意模型，不是调查数据。',
    requiredEvidence: '如需成本报道，应另建真实样本和方法，不复用本值。',
    rejectionReason: '示意值不能作为新闻事实。',
  },
  {
    id: 'challenge-trend-2022-2024',
    label: '2022—2024 挑战趋势',
    status: 'rejected',
    population: '疑似海外样本／不明',
    period: '2022—2024',
    foundIn: ['26114e0^:src/data/tables.ts'],
    values: '历史近似年度表',
    conflict: '缺少 NCC 原表，数值近似且来源疑似海外。',
    requiredEvidence: '新的原始年度数据应作为全新候选，不复活旧表。',
    rejectionReason: '不能形成 NCC 时间趋势。',
  },
  {
    id: 'community-77-row-level-map',
    label: '77 家社区逐点地图',
    status: 'rejected',
    population: '研究纳入的 77 家社区',
    period: '截至 2025-12-31',
    foundIn: ['历史地图设想'],
    values: '无逐社区记录',
    conflict: '当前研究材料只提供聚合结构，没有 77 行地点和坐标。',
    requiredEvidence: '需要公开、可核验的逐社区记录。',
    rejectionReason: '不得伪造逐点位置。',
  },
  {
    id: 'synthetic-documentary-photo',
    label: 'AI 生成现场照片',
    status: 'rejected',
    population: '不适用',
    period: '不适用',
    foundIn: ['素材替代设想'],
    values: '不适用',
    conflict: '生成画面不能证明某地真实发生的事件。',
    requiredEvidence: '事实场景必须使用已登记的真实报道素材。',
    rejectionReason: '不得冒充新闻摄影。',
  },
] as const satisfies readonly LegacyCandidate[]

export const legacyCandidateById = Object.fromEntries(
  legacyCandidates.map((candidate) => [candidate.id, candidate]),
) as Record<string, LegacyCandidate>
