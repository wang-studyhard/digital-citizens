import { motion } from 'framer-motion'
import { ParentSize } from '@visx/responsive'
import { Icon } from '@iconify/react'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { ChartCard } from '@/components/shared/ChartCard'
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart'
import { DonutChart } from '@/components/charts/DonutChart'
import { FadeInView } from '@/components/shared/FadeInView'
import { DataTable } from '@/components/shared/DataTable'
import { ProfileReveal } from '@/components/effects/ProfileReveal'
import { ScrollRevealGroup } from '@/components/effects/ScrollRevealGroup'
import { surveySummary } from '@/data/tables'
import {
  ageDistribution,
  educationDistribution,
  genderDistribution,
  careerDistribution,
  positionDistribution,
  experienceDistribution,
  higherEducationPercent,
  recentNomadPercent,
  nomadDuration,
  weeklyWorkHours,
} from '@/data/demographics'

export function Chapter1Portrait() {
  return (
    <section id="chapter1" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第一章"
          title="他们是谁"
          subtitle="7000万至1亿之间，超过英国人口。他们是程序员、设计师、写作者——
          一群用笔记本电脑在全球各地谋生的中国青年。"
        />

        <QuoteBlock
          text="这不止关乎职业选择，更是一种在中国城乡结构裂变中，个体重新掌控生活定义的集体实践。"
          size="large"
        />

        {/* 典型画像 · 悬浮彩色揭示 */}
        <ProfileReveal />

        {/* ============ 第一组：职业背景（主） + 年龄/学历/性别（次） ============ */}
        <ScrollRevealGroup
          groupKey="g1"
          main={
            <ChartCard title="职业背景分布" sourceRef={3}>
              <ParentSize>
                {({ width }) => (
                  <HorizontalBarChart
                    data={careerDistribution.map((d) => ({
                      label: d.field,
                      value: d.percentage,
                    }))}
                    width={width}
                    height={280}
                    color={['#A8C5C3', '#B5C5B0', '#C4BF9E', '#CBB28F', '#C4A882', '#87B0AE']}
                    formatValue={(v) => `${v}%`}
                  />
                )}
              </ParentSize>
              <div className="flex justify-center gap-3 md:gap-5 mt-3 flex-wrap">
                {careerDistribution.map((d) => (
                  <span key={d.field} className="inline-flex items-center gap-1 text-xs text-slate">
                    <Icon icon={d.icon!} width={14} height={14} className="text-duck-400" />
                    {d.field}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate mt-3 text-center">
                信息技术与创意服务共占33% · 来自金融、教育、咨询等多元领域的跨界转型者
              </p>
            </ChartCard>
          }
          secondary={[
            <ChartCard key="age" title="年龄分布 · 90后为绝对主力" sourceRef={1}>
              <ParentSize>
                {({ width }) => (
                  <HorizontalBarChart
                    data={ageDistribution.map((d) => ({
                      label: d.label, value: d.percentage, description: d.description,
                    }))}
                    width={width} height={180}
                    color={['#C4A882', '#B5C5B0', '#A8C5C3', '#87B0AE']}
                    formatValue={(v) => `${v}%`}
                  />
                )}
              </ParentSize>
              <p className="text-sm text-slate mt-3 text-center">
                平均年龄约31岁 · 90后占比71.28%
              </p>
            </ChartCard>,

            <ChartCard key="edu" title="学历分布" sourceRef={1}>
              <ParentSize>
                {({ width }) => (
                  <DonutChart
                    data={educationDistribution.map((d) => ({
                      label: d.label, value: d.percentage,
                    }))}
                    width={width} height={240}
                    centerValue={`${higherEducationPercent}%`}
                    centerLabel="本科及以上"
                    colors={['#A8C5C3', '#6A9897', '#4A6B6E', '#C4A882']}
                  />
                )}
              </ParentSize>
              <p className="text-sm text-slate mt-2 text-center">
                25.17%拥有硕士及以上学历 · 19.50%有海外留学经历
              </p>
            </ChartCard>,

            <ChartCard key="gender" title="性别分布 · 接近均衡" sourceRef={1}>
              <ParentSize>
                {({ width }) => (
                  <DonutChart
                    data={genderDistribution.map((d) => ({
                      label: d.label, value: d.percentage,
                    }))}
                    width={width} height={240}
                    centerValue="51.8%" centerLabel="男性"
                    colors={['#A8C5C3', '#C4A882', '#B5C5B0']}
                    thickness={35}
                  />
                )}
              </ParentSize>
              <p className="text-sm text-slate mt-2 text-center">
                相比全球数据（男性62%-82%），中国数字游民性别比更均衡
              </p>
            </ChartCard>,
          ]}
        />

        {/* ============ 第二组：每周工作时长（主） + 职位/经验/游民时长（次） ============ */}
        <ScrollRevealGroup
          groupKey="g2"
          main={
            <ChartCard title="每周工作时长 · 超越传统办公" sourceRef={2}>
              <div className="flex flex-col items-center justify-center py-4 px-2">
                {/* 50h 数字游民 */}
                <div className="w-full max-w-xs mb-5">
                  <div className="flex items-end justify-between mb-1">
                    <span className="text-xs text-slate font-sans">数字游民</span>
                    <span className="text-sm font-mono text-duck-400 font-bold">50h/周</span>
                  </div>
                  <div className="h-7 bg-duck-50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full flex items-center justify-end pr-3"
                      style={{ background: 'linear-gradient(90deg, #6A9897, #A8C5C3)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <span className="text-xs text-white font-mono font-medium">+25%</span>
                    </motion.div>
                  </div>
                </div>
                {/* 40h 传统办公 */}
                <div className="w-full max-w-xs mb-5">
                  <div className="flex items-end justify-between mb-1">
                    <span className="text-xs text-slate font-sans">传统办公</span>
                    <span className="text-sm font-mono text-slate">40h/周</span>
                  </div>
                  <div className="h-7 bg-duck-50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'rgba(168,197,195,0.35)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: '80%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate text-center max-w-xs mt-2">
                  自由≠轻松——数字游民平均每周多工作10小时，但换来了地点和时间的自主权
                </p>
              </div>
            </ChartCard>
          }
          secondary={[
            <ChartCard key="pos" title="职位层级 · 执行者为主体" sourceRef={2}>
              <ParentSize>
                {({ width }) => (
                  <HorizontalBarChart
                    data={positionDistribution.map((d) => ({
                      label: d.level, value: d.percentage,
                    }))}
                    width={width} height={160}
                    color={['#A8C5C3', '#B5C5B0', '#C4A882', '#C4BF9E']}
                    formatValue={(v) => `${v}%`}
                  />
                )}
              </ParentSize>
              <p className="text-sm text-slate mt-2 text-center">
                60.58%为执行人员 · 仅4.47%为高层/创始人
              </p>
            </ChartCard>,

            <ChartCard key="exp" title="从业经验 · 职场老兵不是少数" sourceRef={2}>
              <ParentSize>
                {({ width }) => (
                  <HorizontalBarChart
                    data={experienceDistribution.map((d) => ({
                      label: d.range, value: d.percentage,
                    }))}
                    width={width} height={160}
                    color={['#C4A882', '#C4BF9E', '#B5C5B0', '#A8C5C3']}
                    formatValue={(v) => `${v}%`}
                  />
                )}
              </ParentSize>
              <p className="text-sm text-slate mt-2 text-center">
                52.13%拥有5年以上工作经验
              </p>
            </ChartCard>,

            <ChartCard key="dur" title="成为数字游民多长时间了？" sourceRef={1}>
              <ParentSize>
                {({ width }) => (
                  <HorizontalBarChart
                    data={nomadDuration.data.map((d) => ({
                      label: d.label, value: d.percentage,
                    }))}
                    width={width} height={160}
                    color={['#C4A882', '#C4BF9E', '#B5C5B0', '#A8C5C3', '#87B0AE']}
                    formatValue={(v) => `${v}%`}
                  />
                )}
              </ParentSize>
              <p className="text-sm text-slate mt-2 text-center">
                22.4%在1年内开始 · 32%已持续1-2年
              </p>
            </ChartCard>,
          ]}
        />

        {/* Q调查核心指标汇总表 */}
        <DataTable
          columns={[
            { key: 'metric', header: '指标', align: 'left' },
            { key: 'value', header: '数值 (n=282)', align: 'center' },
            { key: 'highlight', header: '说明', align: 'left' },
          ]}
          rows={surveySummary.rows}
          caption={`Q调查核心指标一览（n=${surveySummary.sampleSize}）`}
          sourceRef={1}
          highlightCol="value"
          rowDelay={0.06}
        />

        {/* 关键洞察 */}
        <FadeInView variant="fadeUp" className="mt-12 text-center">
          <div className="inline-block bg-duck-900/50 rounded-card px-8 py-5 max-w-2xl border border-duck-200/8">
            <p className="prose-body text-slate">
              <span className="text-duck-700 font-semibold font-serif">
                80%的受访者
              </span>
              在近3年内成为数字游民，其中
              <span className="text-warm-700 font-semibold font-serif">
                {recentNomadPercent}%
              </span>
              在近1年内才开始。
              <br />
              这不是"逃离大厂"的浪漫叙事——这是结构性转型中，越来越多个体的理性生存实验。
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
