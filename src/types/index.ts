// ============================================================
// 全局类型定义 — 中国数字游民研究报告
// ============================================================

/** 年龄段分布 */
export interface AgeGroup {
  label: string // e.g. "70后", "80后", "90后", "00后"
  percentage: number
  description?: string
}

/** 学历分布 */
export interface EducationLevel {
  label: string // e.g. "本科", "硕士", "博士", "大专及以下"
  percentage: number
}

/** 性别分布 */
export interface GenderDistribution {
  label: string
  percentage: number
}

/** 职业背景分布 */
export interface CareerField {
  field: string // e.g. "信息技术", "创意服务"
  percentage: number
  icon?: string // Iconify icon name
}

/** 职位层级 */
export interface PositionLevel {
  level: string // e.g. "执行人员", "中层", "高层/创始人", "其他"
  percentage: number
}

/** 从业经验 */
export interface ExperienceLevel {
  range: string // e.g. "1年以下", "1-3年", "3-5年", "5年及以上"
  percentage: number
}

/** 收入区间 */
export interface IncomeBracket {
  label: string // e.g. "10万以下", "10-20万", "20-50万", "50-100万", "100万以上"
  key: string
  color: string // tailwind color class or hex
}

/** 各经验段的收入分布 */
export interface IncomeByExperience {
  experienceLabel: string
  brackets: {
    label: string
    percentage: number
  }[]
}

/** 生活成本对比 */
export interface CostComparison {
  city: string
  income: number
  rent: number
  food: number
  transport: number
  savings: number
}

/** 年度挑战趋势 */
export interface ChallengeTrend {
  category: string // e.g. "收入压力", "社保安全", "孤独感"
  data: {
    year: number
    percentage: number
  }[]
}

/** 月度数据点（用于趋势折线图横坐标扩展） */
export interface MonthlyDataPoint {
  year: number
  month: number // 1-12
  percentage: number
}

/** 月度挑战趋势（36个数据点，2022-01 ~ 2024-12） */
export interface ChallengeTrendMonthly {
  category: string
  data: MonthlyDataPoint[]
}

/** 地理热点城市 */
export interface GeoHotspot {
  city: string
  province: string
  coordinates: [number, number] // [longitude, latitude]
  /** 热度指数 1-10，映射到散点大小与光晕强度 */
  heatIndex: number
  community?: string // 代表性社区
  description?: string
}

/** 数字游民社区据点 */
export interface CommunityHub {
  name: string
  shortName: string // e.g. "NCC", "DNA", "Q Space"
  location: string // e.g. "安徽黄山"
  coordinates: [number, number]
  founded: number // 创立年份
  description: string
  stats: {
    label: string
    value: string
  }[]
  photoUrl?: string
  userProvided?: boolean
}

/** 政策卡片 */
export interface PolicyCard {
  city: string
  province: string
  title: string
  highlights: string[]
  keyNumbers: {
    label: string
    value: string
  }[]
  source: string
}

/** 居住偏好 */
export interface LivingPreference {
  category: string // e.g. "数字游民", "半游民", "非游民"
  arrangements: {
    label: string // e.g. "定居", "半定居", "游牧"
    percentage: number
  }[]
}

/** 调查问题通用结构 */
export interface SurveyResult {
  question: string
  sampleSize: number
  data: {
    label: string
    percentage: number
  }[]
}

/** 参考文献 */
export interface Reference {
  id: number
  title: string
  source: string
  url?: string
}
