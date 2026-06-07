// ============================================================
// 全球数字游民对比数据 — 补充第一章本土调查的国际化视角
// 数据来源: MBO Partners 2024 · Nomad List 2025 · Statista
// ============================================================

/** MBO Partners 2024 美国数字游民报告 (n=6,526, 含1,055位数字游民) */
export const mbo2024 = {
  totalUS: 18_100_000,        // 1,810万
  workforcePercent: 11,       // 占劳动力 11%
  yoyGrowth: 4.7,             // 年增长
  growthSince2019: 147,       // 自2019年增长

  age: {
    genZ: 26,                 // Gen Z (1997-2012)
    millennials: 38,          // 千禧一代
    genX: 25,                 // Gen X
    boomers: 11,              // 55+
    median: 37,               // 中位年龄
  },

  gender: {
    male: 57,                 // 55-59%
    female: 42,               // 40-43%
    nonbinary: 1,
  },

  education: {
    collegeDegree: 52,        // 大学学位+
  },

  career: {
    it: 19,
    creative: 14,
    education: 9,
    salesMarketing: 9,
    finance: 8,
    consulting: 7,
  },

  income: {
    under25k: 17,
    over75k: 46,
    satisfied: 79,
  },

  topChallenges: [
    { category: '财务压力', percent: 27 },
    { category: '亲友分离', percent: 26 },
    { category: '人身安全', percent: 24 },
    { category: '时区差异', percent: 23 },
    { category: '旅行倦怠', percent: 21 },
  ],
}

/** Nomad List / Nomads.com 2025 全球数据 (37,000+ 付费会员) */
export const nomadList2025 = {
  estimatedGlobal: 100_000_000,   // 1-2亿
  medianAge: 36,
  medianIncome: 85_000,           // USD
  avgIncome: 125_000,
  avgStayPerLocation: 64,         // 天

  education: {
    degree: 90,
    masters: 34,
  },

  topCareersMale: [
    { field: '软件开发', percent: 34 },
  ],
  topCareersFemale: [
    { field: '市场营销', percent: 16 },
  ],

  ethnicity: {
    white: 60,
    asian: 14,
    latino: 12,
    black: 7,
    southAsian: 5,
    middleEastern: 3,
  },

  nationality: [
    { country: '美国', percent: 44 },
    { country: '英国', percent: 7 },
    { country: '加拿大', percent: 5 },
    { country: '俄罗斯', percent: 5 },
    { country: '德国', percent: 4 },
  ],

  marital: {
    single: 66,
  },
}

/** NCC 2024 全景式数字游民洞察报告 (n=798, 含282位数字游民 + 516位探索者) */
export const ncc2024 = {
  title: '全景式数字游民洞察报告',
  publisher: 'NCC共居共创社区',
  publishDate: '2024年11月',
  event: '第二届数字游民大会',
  methodology: '17人团队 · 4个月 · 问卷+访谈 · 1,000+受访者',
  sampleSize: 798,
  nomadSampleSize: 282,
  explorerSampleSize: 516,

  keyInsights: [
    '平均约31岁，比全球平均35-37岁更年轻',
    '性别比例较全球更均衡',
    '25.17%拥有硕士及以上学历',
    '19.5%有海外留学经历',
    'INFP人格类型最多',
    '47.31%喜欢下厨做饭',
    '七成"老游民"拒绝重回传统坐班',
  ],
}
