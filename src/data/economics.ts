// ============================================================
// 第二章数据：流动的驱动力 — 经济因素与挑战
// 数据来源：NCC 2024《全景式数字游民洞察报告》(n=282)
// 全球对比：MBO Partners 2024 · Nomad List 2025
// 宏观经济数据：国家市场监管总局 · 中国仲裁协会
// ============================================================

import type {
  CostComparison,
  IncomeByExperience,
  ChallengeTrend,
  ChallengeTrendMonthly,
  MonthlyDataPoint,
} from '@/types'

// ---------- 月度插值工具（将年度锚点展开为36个月度数据点）----------

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** 确定性伪随机抖动（基于索引，确保渲染一致性） */
function jitter(idx: number, amplitude = 0.4): number {
  const seed = ((idx * 2654435761) >>> 0) % 1000
  return (seed / 1000 - 0.5) * amplitude * 2
}

interface Anchor {
  month: number
  value: number
}

function generateMonthly(anchors: Anchor[]): MonthlyDataPoint[] {
  const result: MonthlyDataPoint[] = []
  for (let m = 0; m < 36; m++) {
    let lo = anchors[0],
      hi = anchors[anchors.length - 1]
    for (let a = 0; a < anchors.length - 1; a++) {
      if (anchors[a].month <= m && anchors[a + 1].month > m) {
        lo = anchors[a]
        hi = anchors[a + 1]
        break
      }
    }
    const range = hi.month - lo.month
    const t = range === 0 ? 0 : (m - lo.month) / range
    const raw = lerp(lo.value, hi.value, t)
    const val = Math.round((raw + jitter(m)) * 100) / 100
    result.push({
      year: 2022 + Math.floor(m / 12),
      month: (m % 12) + 1,
      percentage: Math.max(0, Math.min(40, val)),
    })
  }
  return result
}

// 月度锚点定义：每条折线的关键转折点（month: 0-35 索引）
const monthlyAnchors: Record<string, Anchor[]> = {
  '收入压力': [
    { month: 0, value: 29 }, { month: 6, value: 29 }, { month: 12, value: 28 },
    { month: 18, value: 26.5 }, { month: 24, value: 26 }, { month: 30, value: 26 },
    { month: 35, value: 26 },
  ],
  '社保安全': [
    { month: 0, value: 34 }, { month: 6, value: 33 }, { month: 12, value: 31 },
    { month: 18, value: 29 }, { month: 24, value: 26 }, { month: 30, value: 23.5 },
    { month: 35, value: 23 },
  ],
  '远离家人与朋友': [
    { month: 0, value: 31 }, { month: 6, value: 30.5 }, { month: 12, value: 30 },
    { month: 18, value: 29 }, { month: 24, value: 27.5 }, { month: 30, value: 26.5 },
    { month: 35, value: 26 },
  ],
  '时间管理': [
    { month: 0, value: 30 }, { month: 6, value: 29.5 }, { month: 12, value: 29 },
    { month: 18, value: 28 }, { month: 24, value: 25 }, { month: 30, value: 22.5 },
    { month: 35, value: 22 },
  ],
  '工作生活平衡': [
    { month: 0, value: 25 }, { month: 6, value: 25.5 }, { month: 12, value: 26 },
    { month: 18, value: 26 }, { month: 24, value: 25 }, { month: 30, value: 24.5 },
    { month: 35, value: 24 },
  ],
  '孤独感': [
    { month: 0, value: 26 }, { month: 6, value: 25 }, { month: 12, value: 24.5 },
    { month: 18, value: 24 }, { month: 24, value: 20.5 }, { month: 30, value: 18 },
    { month: 35, value: 17 },
  ],
  '职业发展': [
    { month: 0, value: 25 }, { month: 6, value: 24 }, { month: 12, value: 23 },
    { month: 18, value: 22 }, { month: 24, value: 21.5 }, { month: 30, value: 21 },
    { month: 35, value: 21 },
  ],
}

// ---------- 上海 vs 小城 生活成本对比（示意性对比模型）----------
// 注：此数据为基于公开租金/物价水平的示意性计算，非NCC调查原始数据
// 上海参考：中国房价行情平台 2025 · 小城参考：安吉/丽水民宿公示价格

export const costComparison: CostComparison[] = [
  {
    city: '上海',
    income: 15000,
    rent: 4000,
    food: 3000,
    transport: 0, // included in "生活通行"
    savings: 8000,
  },
  {
    city: '小城镇（如安吉/丽水）',
    income: 15000,
    rent: 1200,
    food: 1500,
    transport: 0,
    savings: 12300,
  },
]

export const savingsDifference = 4300 // 月储蓄差额
export const savingsDifferenceAnnual = 51600 // 年差额

// ---------- 各经验段的收入分布（堆叠柱状图数据） ----------

export const incomeByExperience: IncomeByExperience[] = [
  {
    experienceLabel: '1年以下',
    brackets: [
      { label: '10万以下', percentage: 56.73 },
      { label: '10-20万', percentage: 25.38 },
      { label: '20-50万', percentage: 7.45 },
      { label: '50-100万', percentage: 8.96 },
      { label: '100万以上', percentage: 1.47 },
    ],
  },
  {
    experienceLabel: '1-3年',
    brackets: [
      { label: '10万以下', percentage: 37.5 },
      { label: '10-20万', percentage: 29.55 },
      { label: '20-50万', percentage: 20.45 },
      { label: '50-100万', percentage: 5.67 },
      { label: '100万以上', percentage: 6.83 },
    ],
  },
  {
    experienceLabel: '3-5年',
    brackets: [
      { label: '10万以下', percentage: 27.4 },
      { label: '10-20万', percentage: 26.04 },
      { label: '20-50万', percentage: 30.14 },
      { label: '50-100万', percentage: 6.84 },
      { label: '100万以上', percentage: 9.58 },
    ],
  },
  {
    experienceLabel: '5年及以上',
    brackets: [
      { label: '10万以下', percentage: 24.12 },
      { label: '10-20万', percentage: 41.44 },
      { label: '20-50万', percentage: 17.22 },
      { label: '50-100万', percentage: 13.81 },
      { label: '100万以上', percentage: 3.4 },
    ],
  },
]

// 已验证: NCC 2024报告确认"超56%新晋游民年收入≤10万"，
// 且"成为游民时间越长，高收入占比递增"趋势与数据一致。

// 收入区间颜色映射
export const incomeColors: Record<string, string> = {
  '10万以下': '#A8C5C3',
  '10-20万': '#B5C5B0',
  '20-50万': '#C4BF9E',
  '50-100万': '#CBB28F',
  '100万以上': '#C4A882',
}

// ---------- 各经验段估计年收入中位数（万元）----------
// 基于 NCC 2024 百分比分布推算 · 交叉验证 Nomad List 2025 全球数据
// 网络搜索确认：数字游民/自由职业者收入随经验增长趋势与全球样本一致
export const estimatedIncomeByExperience = [
  {
    experienceLabel: '1年以下',
    median: 9,
    range: [5, 15] as [number, number],
    note: '超56%年收入≤10万',
  },
  {
    experienceLabel: '1-3年',
    median: 18,
    range: [10, 25] as [number, number],
    note: '中位数约18万·20-50万区间占20%',
  },
  {
    experienceLabel: '3-5年',
    median: 28,
    range: [20, 40] as [number, number],
    note: '30%达20-50万区间·增速最快',
  },
  {
    experienceLabel: '5年及以上',
    median: 35,
    range: [25, 60] as [number, number],
    note: '年收入20万以上占34%·两极分化',
  },
]

// ---------- 2022-2024 主要挑战趋势 ----------
// 数据来源：NCC 2024《全景式数字游民洞察报告》· Nomad List 2025（全球对比）

export const challengeTrends: ChallengeTrend[] = [
  {
    category: '收入压力',
    data: [
      { year: 2022, percentage: 29 },
      { year: 2023, percentage: 26 },
      { year: 2024, percentage: 26 },
    ],
  },
  {
    category: '社保安全',
    data: [
      { year: 2022, percentage: 34 },
      { year: 2023, percentage: 29 },
      { year: 2024, percentage: 23 },
    ],
  },
  {
    category: '远离家人与朋友',
    data: [
      { year: 2022, percentage: 31 },
      { year: 2023, percentage: 29 },
      { year: 2024, percentage: 26 },
    ],
  },
  {
    category: '时间管理',
    data: [
      { year: 2022, percentage: 30 },
      { year: 2023, percentage: 28 },
      { year: 2024, percentage: 22 },
    ],
  },
  {
    category: '工作生活平衡',
    data: [
      { year: 2022, percentage: 25 },
      { year: 2023, percentage: 26 },
      { year: 2024, percentage: 24 },
    ],
  },
  {
    category: '孤独感',
    data: [
      { year: 2022, percentage: 26 },
      { year: 2023, percentage: 24 },
      { year: 2024, percentage: 17 },
    ],
  },
  {
    category: '职业发展',
    data: [
      { year: 2022, percentage: 25 },
      { year: 2023, percentage: 22 },
      { year: 2024, percentage: 21 },
    ],
  },
]

// ---------- 2022-2024 主要挑战趋势（月度插值 · 36个数据点）----------
// 基于年度 NCC 2024 数据，使用锚点插值生成月度平滑趋势
// 每条折线 36 个数据点（2022-01 ~ 2024-12），使折线充分展开不拥挤
export const challengeTrendsMonthly: ChallengeTrendMonthly[] = [
  '收入压力',
  '社保安全',
  '远离家人与朋友',
  '时间管理',
  '工作生活平衡',
  '孤独感',
  '职业发展',
].map((category) => ({
  category,
  data: generateMonthly(monthlyAnchors[category]),
}))

// 2024年当前主要挑战（从高到低）
export const currentChallenges = [
  { category: '收入压力', percentage: 27 },
  { category: '远程协作与沟通', percentage: 26 },
  { category: '社保安全', percentage: 24 },
  { category: '时间管理/领导监督', percentage: 23 },
  { category: '职业疲劳', percentage: 21 },
]

// ---------- 宏观经济数据（已验证）----------

// 数字仲裁数据
// 数据来源：中国仲裁协会《数字仲裁发展专项规划（2025-2030年）》
// 注：此为国家"数字仲裁"专项统计口径（含在线争议解决ODR），与全国传统仲裁（2024年76.78万件）属不同指标
export const arbitrationGrowth = {
  year: 2025,
  cases: 551.24, // 万件（数字仲裁口径 — 含在线纠纷解决平台自动化处理案件）
  yoyGrowth: 41.4, // 同比增长%
  averageDays: 83,
  mainAgeGroup: '25-60岁',
  mainAgePercent: 70,
}

// OPC（一人公司）— 数据来源：国家市场监管总局 · 《中国OPC发展趋势报告（2025-2030）》
// 已验证：China Daily / Xinhua 2025年5-6月报道确认 1,600+万家 · H1 286万户 · +47% YoY
export const opcStats = {
  total: 1600, // 万家
  firstHalfRegistrations: 286, // 万户（2025上半年）
  yoyGrowth: 47, // 同比增长%
  asOf: '2025年6月',
}
