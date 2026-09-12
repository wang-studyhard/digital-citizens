// 第二章数据：只保留明确标注为示意模型的生活成本比较。
import type { CostComparison } from '@/types'

export const costComparison: CostComparison[] = [
  {
    city: '上海（示意）',
    income: 15000,
    rent: 4000,
    food: 3000,
    transport: 0,
    savings: 8000,
  },
  {
    city: '县域小城（示意）',
    income: 15000,
    rent: 1200,
    food: 1500,
    transport: 0,
    savings: 12300,
  },
]

export const savingsDifference = costComparison[1].savings - costComparison[0].savings
export const savingsDifferenceAnnual = savingsDifference * 12
