// ============================================================
// 第二章数据：流动的驱动力 — 经济因素与挑战
// ============================================================

import type { CostComparison, IncomeByExperience, ChallengeTrend } from '@/types'

// ---------- 上海 vs 小城 生活成本对比 ----------

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
  {
    experienceLabel: '5年以上',
    brackets: [
      { label: '10万以下', percentage: 19.98 },
      { label: '10-20万', percentage: 27.99 },
      { label: '20-50万', percentage: 44.02 },
      { label: '50-100万', percentage: 0 },
      { label: '100万以上', percentage: 8.01 },
    ],
  },
]

// 收入区间颜色映射
export const incomeColors: Record<string, string> = {
  '10万以下': '#A8C5C3',
  '10-20万': '#B5C5B0',
  '20-50万': '#C4BF9E',
  '50-100万': '#CBB28F',
  '100万以上': '#C4A882',
}

// ---------- 2022-2024 主要挑战趋势 ----------

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

// 2024年当前主要挑战（从高到低）
export const currentChallenges = [
  { category: '收入压力', percentage: 27 },
  { category: '远程协作与沟通', percentage: 26 },
  { category: '社保安全', percentage: 24 },
  { category: '时间管理/领导监督', percentage: 23 },
  { category: '职业疲劳', percentage: 21 },
]

// ---------- 经济增长数据 ----------

export const arbitrationGrowth = {
  year: 2025,
  cases: 551.24, // 万件
  yoyGrowth: 41.4, // 同比增长%
  averageDays: 83,
  mainAgeGroup: '25-60岁',
  mainAgePercent: 70,
}

// OPC（一人公司）
export const opcStats = {
  total: 1600, // 万家
  firstHalfRegistrations: 286, // 万户
  yoyGrowth: 47, // 同比增长%
  asOf: '2025年6月',
}
