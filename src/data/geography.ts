// 第三章数据：案例地点与社区。点位用于定位案例，不代表热度或规模排名。
import type { GeoHotspot, CommunityHub, LivingPreference } from '@/types'

export const hotspots: GeoHotspot[] = [
  {
    city: '安吉',
    province: '浙江',
    coordinates: [119.68, 30.63],
    community: 'DNA数字游民公社',
    description: '公开报道记录了社区成员与当地餐饮、乡村文化传播发生联系。',
    sourceId: 2,
  },
  {
    city: '黄山',
    province: '安徽',
    coordinates: [118.34, 29.71],
    community: '黄山数字游民社区',
    description: '新华社报道记录社区成员参与户外文旅和乡村电影活动。',
    sourceId: 4,
  },
  {
    city: '丽水',
    province: '浙江',
    coordinates: [119.92, 28.47],
    description: '公开政策报道显示当地持续探索旅居共创服务。',
    sourceId: 7,
  },
  {
    city: '大理',
    province: '云南',
    coordinates: [100.23, 25.61],
    description: '研究将大理列为已有数字游民社区与旅居网络的地区案例。',
    sourceId: 3,
  },
]

export const communityHubs: CommunityHub[] = [
  {
    name: 'DNA数字游民公社',
    shortName: 'DNA',
    location: '浙江安吉',
    coordinates: [119.68, 30.63],
    founded: 2021,
    description:
      '中国青年报报道：安吉溪龙乡政府与企业合作改造闲置厂房，社区成员为当地餐厅设计海报、门头和菜单，并制作《白茶原小报》。',
    stats: [
      { label: '公开报道', value: '2023年' },
      { label: '合作方式', value: '设计与内容' },
    ],
    sourceId: 2,
    evidenceStatus: 'verified',
  },
  {
    name: '黄山数字游民社区',
    shortName: '黄山',
    location: '安徽黟县',
    coordinates: [118.05, 29.92],
    founded: 2024,
    description:
      '新华社报道：社区成员参与当地户外旅游业务，并在丰梧村参与国际乡村电影营造季等文化活动。',
    stats: [
      { label: '公开报道', value: '2025年' },
      { label: '合作方式', value: '文旅与文化' },
    ],
    sourceId: 4,
    evidenceStatus: 'verified',
  },
]

// 这些统计在完整原始报告取得前不进入主线，保留空数组兼容旧组件。
export const livingPreferences: LivingPreference[] = []
export const stayDuration: { label: string; percentage: number; description?: string }[] = []
export const settlementIntention: { label: string; percentage: number }[] = []
export const relocationFrequency: { label: string; percentage: number }[] = []

export const chinaMapCenter: [number, number] = [104.0, 35.0]
export const chinaMapZoom = 1.6
