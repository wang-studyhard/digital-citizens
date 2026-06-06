// ============================================================
// 第三章数据：洄游与栖居 — 地理分布与社区
// ============================================================

import type { GeoHotspot, CommunityHub, LivingPreference } from '@/types'

// ---------- 数字游民热点城市 ----------
// 热度指数 (heatIndex 1-10)：综合社区规模、知名度、政策支持、增长趋势
// 大理 9.5 · 安吉 9.0 · 丽江 8.5 · 成都 8.0 · 西双版纳 7.5 · 黄山 7.5
// 福州 7.0 · 陵水 6.5 · 丽水 6.0 · 南京 6.0 · 泉州 5.5 · 上海 5.0 · 威海 5.0

export const hotspots: GeoHotspot[] = [
  {
    city: '大理',
    province: '云南',
    coordinates: [100.23, 25.61],
    heatIndex: 9.5,
    description: '经典数字游民聚集地，苍山洱海间的远程办公天堂，全球知名度最高',
  },
  {
    city: '安吉',
    province: '浙江',
    coordinates: [119.68, 30.63],
    heatIndex: 9.0,
    community: 'DNA数字游民公社',
    description: '中国首个综合性数字游民创意园区，5000㎡废旧竹木加工厂改造',
  },
  {
    city: '丽江',
    province: '云南',
    coordinates: [100.23, 26.88],
    heatIndex: 8.5,
    description: 'UNESCO世界遗产古城，滇西北数字游民热门目的地，低成本高品质生活',
  },
  {
    city: '成都',
    province: '四川',
    coordinates: [104.07, 30.57],
    heatIndex: 8.0,
    community: '天星村',
    description: '四川首个"数字游民聚落"，2023年正式开放，城乡融合模式',
  },
  {
    city: '黄山',
    province: '安徽',
    coordinates: [118.34, 29.71],
    heatIndex: 7.5,
    community: 'NCC社区',
    description: '2027目标建成8个国家级数字游民创新基地，大黄山全域双创品牌',
  },
  {
    city: '西双版纳',
    province: '云南',
    coordinates: [100.80, 22.01],
    heatIndex: 7.5,
    description: '热带气候+低成本生活，冬季数字游民迁徙热门目的地',
  },
  {
    city: '福州',
    province: '福建',
    coordinates: [119.30, 26.07],
    heatIndex: 7.0,
    community: 'Q Space',
    description: '700+成员入驻，累计入住人次超2.5万，29%驻留超过6个月',
  },
  {
    city: '陵水',
    province: '海南',
    coordinates: [110.04, 18.51],
    heatIndex: 6.5,
    description: '海南自贸港腹地，热带滨海数字游民新兴据点，政策红利叠加',
  },
  {
    city: '丽水',
    province: '浙江',
    coordinates: [119.92, 28.47],
    heatIndex: 6.0,
    description: '全国首个县级数字游民专项政策出台地，最高1000万奖励+贴息',
  },
  {
    city: '南京',
    province: '江苏',
    coordinates: [118.80, 32.06],
    heatIndex: 6.0,
    community: '莱斯社区',
    description: '八百好社 + 莱斯社区，城市型数字游民空间，南京江宁',
  },
  {
    city: '泉州',
    province: '福建',
    coordinates: [118.59, 24.91],
    heatIndex: 5.5,
    description: '世界遗产城市，数字游民新兴目的地，文化底蕴深厚',
  },
  {
    city: '上海',
    province: '上海',
    coordinates: [121.47, 31.23],
    heatIndex: 5.0,
    description: '数字游民主要来源城市，远程办公高薪岗位集中地',
  },
  {
    city: '威海',
    province: '山东',
    coordinates: [122.12, 37.51],
    heatIndex: 5.0,
    description: '山东省数字游民政策先行区，滨海宜居+低成本优势',
  },
]

// ---------- 数字游民社区据点详情 ----------

export const communityHubs: CommunityHub[] = [
  {
    name: 'NCC社区',
    shortName: 'NCC',
    location: '安徽黄山',
    coordinates: [118.34, 29.71],
    founded: 2023,
    description:
      '全球Nomad Co-living Co-creating社区，2023年创立，首发据点位于浙江安吉。2024年品牌扩展至安徽黄山，利用黟县老酒厂改造，举办以"共居·共创·共栖"为主题的数字游民大会。致力于为数字游民和自由职业者构建"共居空间+数字平台"的共创生态。',
    stats: [
      { label: '第二站', value: '黄山黟县' },
      { label: '主题', value: '共居·共创·共栖' },
    ],
    photoUrl: `https://picsum.photos/seed/ncc-community/800/600`,
    userProvided: false,
  },
  {
    name: 'DNA数字游民公社',
    shortName: 'DNA',
    location: '浙江安吉',
    coordinates: [119.68, 30.63],
    founded: 2019,
    description:
      '位于浙江安吉溪龙乡横山村，中国首个数字游民综合性创意园区。由废弃竹木加工厂改造，占地约5000㎡。2019年由上海爱家集团投资建设，总投资2500万元。集社群生活、共享办公、创意孵化于一体，配备住宿、图书馆、会议室及烧烤场地。选址距上海2.5小时车程、杭州2小时车程。2024年累计接待数字游民超1.5万人次，常态驻留150—200人。配套白茶原餐厅、精酿酒吧、窑烤面包房等消费业态。2023年1月DNA项目二期启动，形成"一溪两岸"双区格局。',
    stats: [
      { label: '总投资', value: '2500万元' },
      { label: '累计接待', value: '1.5万人次' },
      { label: '常态驻留', value: '150-200人' },
      { label: '距上海', value: '2.5小时' },
    ],
    photoUrl: `https://picsum.photos/seed/dna-anji/800/600`,
    userProvided: false,
  },
  {
    name: 'Q Space',
    shortName: 'Q Space',
    location: '福建福州',
    coordinates: [119.30, 26.07],
    founded: 2024,
    description:
      '2024年福州团队将闽江畔的闲置空间改造为"数字游民实验室"。由政府人才计划支持，低成本、高密度的创新孵化运营。700余名数字游民入驻，累计入住人次突破2.5万，29%的成员驻留超过6个月。',
    stats: [
      { label: '入驻人数', value: '700+' },
      { label: '累计入住', value: '2.5万人次' },
      { label: '长期驻留(>6月)', value: '29%' },
    ],
    photoUrl: `https://picsum.photos/seed/qspace-fuzhou/800/600`,
    userProvided: false,
  },
  {
    name: '天星村数字游民聚落',
    shortName: '天星村',
    location: '四川成都',
    coordinates: [103.84, 30.71],
    founded: 2023,
    description:
      '四川全省首个落地的"数字游民聚落"项目，2023年正式对外开放。以城乡融合为核心，将"数字游民"的生活方式引入成都近郊的乡村空间。',
    stats: [
      { label: '定位', value: '全省首个' },
      { label: '模式', value: '城乡融合' },
    ],
    photoUrl: `https://picsum.photos/seed/tianxing-chengdu/800/600`,
    userProvided: false,
  },
  {
    name: '莱斯社区',
    shortName: '莱斯',
    location: '江苏南京',
    coordinates: [118.80, 32.06],
    founded: 2023,
    description:
      '八百好社联合莱斯社区落地南京江宁，定位为"城市数字游民空间"。越来越多"数字游民"在此定居，逐渐成为城市数字游民生活方式的代表。',
    stats: [
      { label: '类型', value: '城市型空间' },
      { label: '定位', value: '南京江宁' },
    ],
    photoUrl: `https://picsum.photos/seed/laisi-nanjing/800/600`,
    userProvided: false,
  },
]

// ---------- 居住偏好 ----------

export const livingPreferences: LivingPreference[] = [
  {
    category: '数字游民',
    arrangements: [
      { label: '定居（固定地点上班）', percentage: 15.6 },
      { label: '半定居（固定地点上班）', percentage: 13.12 },
      { label: '游牧（固定地点上班）', percentage: 19.86 },
    ],
  },
  {
    category: '半游民',
    arrangements: [
      { label: '定居（固定地点上班）', percentage: 3.55 },
      { label: '半定居（固定地点上班）', percentage: 19.15 },
      { label: '游牧（固定地点上班）', percentage: 12.06 },
    ],
  },
  {
    category: '非游民',
    arrangements: [
      { label: '定居（固定地点上班）', percentage: 1.42 },
      { label: '半定居（固定地点上班）', percentage: 1.06 },
      { label: '游牧（固定地点上班）', percentage: 14.18 },
    ],
  },
]

// 换城频率
export const relocationFrequency = [
  { label: '三个月之内', percentage: 11.70 },
  { label: '三个月到半年', percentage: 23.05 },
  { label: '半年到一年', percentage: 13.83 },
  { label: '不确定', percentage: 51.42 },
]

// ---------- 地图视图配置 ----------

export const chinaMapCenter: [number, number] = [104.0, 35.0]
export const chinaMapZoom = 1.6
