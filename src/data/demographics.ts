// ============================================================
// 第一章数据：中国数字游民画像 — 人口统计学特征
// 数据来源：NCC 2024《全景式数字游民洞察报告》(n=282 数字游民 + 516 探索者)
// 发布：2024年11月 · 第二届数字游民大会
// 全球对比：MBO Partners 2024 (美国) · Nomad List 2025 (全球)
// ============================================================

import type {
  AgeGroup,
  EducationLevel,
  GenderDistribution,
  CareerField,
  PositionLevel,
  ExperienceLevel,
  SurveyResult,
} from '@/types'

// ---------- 年龄分布 ----------

export const ageDistribution: AgeGroup[] = [
  { label: '70后（1981前）', percentage: 2.13, description: '不惑之年的先行者' },
  { label: '80后（1981-1990）', percentage: 17.02, description: '千禧一代的中坚' },
  { label: '90后（1991-2000）', percentage: 71.28, description: '绝对主力军' },
  { label: '00后（2001后）', percentage: 9.57, description: 'Z世代的边缘实验' },
]

export const averageAge = 31
export const mainGroup = '90后占71.28%'
export const genZPercent = 21 // Z世代（1995-2009）

// ---------- 学历分布 ----------

export const educationDistribution: EducationLevel[] = [
  { label: '本科', percentage: 61.34 },
  { label: '硕士', percentage: 23.76 },
  { label: '博士', percentage: 1.42 },
  { label: '大专及以下', percentage: 13.48 },
]

export const higherEducationPercent = 86.52 // 本科及以上
export const mastersPercent = 25.17 // 含硕士及以上
export const studyAbroadPercent = 19.50 // 海外留学比例
export const topStudyDestinations = ['英国', '澳大利亚', '新加坡']
export const ukPercent = 36.36 // 英国留学占比

// ---------- 性别分布 ----------

export const genderDistribution: GenderDistribution[] = [
  { label: '男性', percentage: 51.77 },
  { label: '女性', percentage: 46.10 },
  { label: '多元性别认同', percentage: 2.13 },
]

// 全球对比数据
export const globalMalePercent = { source: 'Pumble 2024', value: 62 }
export const globalMalePercentNomadList = { source: 'Nomad List', value: 82 }

// ---------- 职业背景 ----------

export const careerDistribution: CareerField[] = [
  { field: '信息技术', percentage: 19, icon: 'ph:code' },
  { field: '创意服务', percentage: 14, icon: 'ph:paint-brush' },
  { field: '教育培训', percentage: 9, icon: 'ph:graduation-cap' },
  { field: '销售、营销和公关', percentage: 9, icon: 'ph:megaphone' },
  { field: '金融和会计', percentage: 8, icon: 'ph:chart-line' },
  { field: '咨询、管理和研究', percentage: 7, icon: 'ph:lightbulb' },
]

// ---------- 职位层级 ----------

export const positionDistribution: PositionLevel[] = [
  { level: '执行人员', percentage: 60.58 },
  { level: '中层管理', percentage: 15.34 },
  { level: '高层/创始人', percentage: 4.47 },
  { level: '其他', percentage: 19.61 },
]

// ---------- 从业经验 ----------

export const experienceDistribution: ExperienceLevel[] = [
  { range: '1年以下', percentage: 7.45 },
  { range: '1-3年', percentage: 17.38 },
  { range: '3-5年', percentage: 19.86 },
  { range: '5年及以上', percentage: 55.31 },
]

// 对比：职场新人（1年以下）vs 数字游民新人
export const careerNewcomerPercent = 7.45
export const digitalNomadNewcomerPercent = 17.05 // 1年内刚开始数字游民

// ---------- 成为数字游民的时长 ----------

export const nomadDuration: SurveyResult = {
  question: '您成为数字游民多长时间了？',
  sampleSize: 282,
  data: [
    { label: '1年以下', percentage: 22.4 },
    { label: '1-2年', percentage: 32 },
    { label: '2-3年', percentage: 25.6 },
    { label: '3-5年', percentage: 10.4 },
    { label: '5年及以上', percentage: 9.6 },
  ],
}

// 1年内才开始的占比（增长趋势）
export const recentNomadPercent = 54.40

// ---------- 每周工作时长 ----------

export const weeklyWorkHours = {
  average: 50,
  description: '50小时/周，超过传统办公的40小时',
}
