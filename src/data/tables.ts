// ============================================================
// 表格专用数据 — 汇总表 / 对比表 / 矩阵表
// 数据来源：content.txt，n=282
// ============================================================

// ---------- 表1: Q调查核心指标汇总（第一章） ----------

export const surveySummary = {
  sampleSize: 282,
  rows: [
    { metric: '平均年龄', value: '31岁', highlight: '样本中的平均值' },
    { metric: '本科及以上学历', value: '86.52%', highlight: '本科61.34%，硕士23.76%，博士1.42%' },
    { metric: '性别比 (男:女)', value: '51.8 : 46.1', highlight: '多元性别认同2.13%' },
    { metric: '信息技术+创意服务', value: '33%', highlight: '样本中两个职业类别合计' },
    { metric: '5年及以上从业经验', value: '55.31%', highlight: '职业经历，不等于游民经历' },
  ],
}

// ---------- 表2: 收入×经验热力图（第二章） ----------

export const incomeHeatmap = {
  experienceLabels: ['1年以下', '1-3年', '3-5年', '5年及以上'],
  incomeBrackets: ['10万以下', '10-20万', '20-50万', '50-100万', '100万以上'],
  // [经验段][收入区间] → 百分比
  data: [
    [56.73, 25.38, 7.45, 8.96, 1.47],
    [37.5, 29.55, 20.45, 5.67, 6.83],
    [27.4, 26.04, 30.14, 6.84, 9.58],
    [24.12, 41.44, 17.22, 13.81, 3.4],
  ],
  note: '数据来源：NCC 2024报告公开预览，n=282；完整原文取得前仅作样本观察，不作全国推断。',
}

// ---------- 表3: 2022-2024 挑战趋势（第二章） ----------

// 数据来源：NCC 2024报告公开预览，n=282；年度数值的完整原始表待复核
export const challengeTable = {
  columns: [
    { key: 'category', header: '挑战类别', align: 'left' as const },
    { key: 'y2022', header: '2022', align: 'center' as const },
    { key: 'y2023', header: '2023', align: 'center' as const },
    { key: 'y2024', header: '2024', align: 'center' as const },
    { key: 'trend', header: '趋势', align: 'center' as const },
  ],
  rows: [
    { category: '收入压力', y2022: '29%', y2023: '26%', y2024: '26%', trend: '→ 趋稳', trendDir: 'stable' },
    { category: '社保安全', y2022: '34%', y2023: '29%', y2024: '23%', trend: '↓ 改善', trendDir: 'down' },
    { category: '远离家人与朋友', y2022: '31%', y2023: '29%', y2024: '26%', trend: '↓ 改善', trendDir: 'down' },
    { category: '时间管理', y2022: '30%', y2023: '28%', y2024: '22%', trend: '↓ 改善', trendDir: 'down' },
    { category: '工作生活平衡', y2022: '25%', y2023: '26%', y2024: '24%', trend: '→ 波动', trendDir: 'stable' },
    { category: '孤独感', y2022: '26%', y2023: '24%', y2024: '17%', trend: '↓ 显著改善', trendDir: 'down' },
    { category: '职业发展', y2022: '25%', y2023: '22%', y2024: '21%', trend: '↓ 改善', trendDir: 'down' },
  ],
}

// ---------- 表5: 地方政策对比矩阵（第四章） ----------

export const policyMatrix = {
  columns: [
    { key: 'dimension', header: '政策维度', align: 'left' as const },
    { key: 'lishui', header: '丽水（浙江）', align: 'center' as const },
    { key: 'huangshan', header: '黄山（安徽）', align: 'center' as const },
    { key: 'shandong', header: '山东', align: 'center' as const },
  ],
  rows: [
    {
      dimension: '目标年限',
      lishui: '无公开量化目标',
      huangshan: '2027 / 2030',
      shandong: '持续推进',
    },
    {
      dimension: '基地数量',
      lishui: '单项服务为主',
      huangshan: '8个(2027)\n15个(2030)',
      shandong: '全省范围推广',
    },
    {
      dimension: '团队规模',
      lishui: '未公开',
      huangshan: '500+(2027)\n1000+(2030)',
      shandong: '1510万乡创者',
    },
    {
      dimension: '资金补贴',
      lishui: '最高1000万奖励\n+1000万贴息',
      huangshan: '见正式文件',
      shandong: '见正式文件',
    },
    {
      dimension: '年吸引人次',
      lishui: '未公开',
      huangshan: '20万(2027)\n100万(2030)',
      shandong: '未公开',
    },
    {
      dimension: '特色定位',
      lishui: '「DN丽水」小程序\n一站式服务',
      huangshan: '「大黄山」全域\n数字双创品牌',
      shandong: '数字游民+数字乡民\n+乡村振兴',
    },
  ],
}
