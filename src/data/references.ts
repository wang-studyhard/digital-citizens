// 作品内来源索引。主线只使用已能定位的公开材料；其余材料保留为待核，不进入关键结论。
import type { Reference } from '@/types'

export const references: Reference[] = [
  { id: 1, title: '《全景式数字游民洞察报告》（公开预览）', source: 'NCC / 第三方公开预览，2024年4—5月调查', url: 'https://www.fxbaogao.com/detail/4614525', status: 'reported', locator: '研究说明：问卷回收、有效样本与样本构成段；报告原图未纳入本仓库', note: '仅用于说明社区渠道样本的方法与边界，不承担全国规模或全国人口结论。' },
  { id: 2, title: '当工作可以网约 数字游民一根网线“闯天下”', source: '中国青年报，新华网转载，2023-03-23', url: 'https://www.news.cn/2023-03/23/c_1129456154.htm', status: 'verified', locator: '正文第17—74段' },
  { id: 3, title: '中国数字游民社区的发展演进调查', source: '姚建华，《人民论坛》，2026-07-20', url: 'https://paper.people.com.cn/rmlt/pc/content/202607/20/content_30178497.html', status: 'verified', locator: '第95段样本说明；第134段区位统计', note: '样本为公开可识别且截至2025年底正常运营的内地社区，不是人口普查。' },
  { id: 4, title: '中国引导数字游民更好参与乡村振兴', source: '新华社，2025-03-27', url: 'https://www3.xinhuanet.com/politics/20250327/cb9de601c22e44c59843ab96124b30f8/c.html', status: 'verified', locator: '正文黄山社区与丰梧村案例' },
  { id: 5, title: '青年与乡村的双向奔赴——浙江安吉青年入乡新观察', source: '新华社，2025-02-08', url: 'https://www.xinhuanet.com/20250208/e67b874a40c0474a825fed82f95d623c/c.html', status: 'verified', locator: '正文“青来集”及青年入乡统计段' },
  { id: 6, title: '大黄山全球数字游民集聚创业地建设行动方案', source: '安徽省大黄山办，2024-08-14发布', url: 'https://www.cnjx.gov.cn/OpennessContent/show/3392059.html', status: 'verified', locator: '正文第1—27条', note: '文中数字为目标，不是已实现成果。' },
  { id: 7, title: '丽水市支持数字游民旅居共创十条措施', source: '浙江日报，商务部服务贸易指南转载，2025-12-12', url: 'https://tradeinservices.mofcom.gov.cn/article/szmy/hydt/202512/180554.html', status: 'reported', locator: '政策工具、社区数量与旅居共创进展段', note: '主线仅概述公开报道中的政策方向与进展，具体资格以正式政策文本为准。' },
  { id: 8, title: '数字游民社区促进乡村振兴的实践探索', source: '《群言》，2024年第11期', url: 'https://www.mmzy.org.cn/qunyan/pmjl/202411/149042.aspx', status: 'verified', locator: '正文关于人才、产业、文化与治理的分析' },
  { id: 9, title: '数字游民社区样本的统计口径说明', source: '据《人民论坛》调查注释整理', url: 'https://paper.people.com.cn/rmlt/pc/content/202607/20/content_30178497.html', status: 'verified', locator: '注释②' },
  { id: 10, title: '第九届（2026）全国大学生数字编辑创新大赛山东赛区参赛通知', source: '山东大学新闻传播学院，2026-09-04', url: 'https://www.jc.sdu.edu.cn/info/1103/15254.htm', status: 'verified', locator: '第三部分总体要求；第五部分日程' },
  { id: 11, title: '安吉DNA数字游民公社公开报道', source: '中国青年报，新华网转载，2023-03-23', url: 'https://www.news.cn/2023-03/23/c_1129456154.htm', status: 'verified', locator: '正文第46—58段' },
  { id: 12, title: '黄山数字游民社区公开报道', source: '新华社，2025-03-27', url: 'https://www3.xinhuanet.com/politics/20250327/cb9de601c22e44c59843ab96124b30f8/c.html', status: 'verified', locator: '正文第1—12段' },
  { id: 13, title: '待核统计与媒体材料', source: '暂不进入主线', status: 'pending', note: '用于保留旧版引用编号，完成核验前不展示为事实。' },
]
