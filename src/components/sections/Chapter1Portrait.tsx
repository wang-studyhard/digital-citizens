import { motion } from 'framer-motion'
import { ParentSize } from '@visx/responsive'
import { Icon } from '@iconify/react'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart'
import { DonutChart } from '@/components/charts/DonutChart'
import { FadeInView } from '@/components/shared/FadeInView'
import { DataTable } from '@/components/shared/DataTable'
import { ProfileReveal } from '@/components/effects/ProfileReveal'
import { ChartConstellation } from '@/components/effects/ChartConstellation'
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
} from '@/data/demographics'

export function Chapter1Portrait() {
  return (
    <section id="chapter1" className="py-20 md:py-28 px-6" style={{ background: '#1a2d2e' }}>
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

        {/* ================================================================ */}
        {/*  第一组：职业背景（核心圆） + 年龄/学历/性别（卫星方卡）            */}
        {/*  外层隔离容器 — 创建独立层叠上下文，防止被上方 ProfileReveal 遮挡   */}
        {/* ================================================================ */}
        <div className="relative" style={{ zIndex: 1, isolation: 'isolate' }}>
          <ChartConstellation
            groupKey="g1"
          coreChart={
            <div className="w-full h-full flex flex-col items-center justify-center px-1 py-0.5">
              <h3 className="text-[10px] md:text-xs font-medium text-charcoal mb-0.5 font-serif text-center">
                职业背景分布
              </h3>
              <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                <ParentSize>
                  {({ width }) => (
                    <HorizontalBarChart
                      data={careerDistribution.map((d) => ({
                        label: d.field,
                        value: d.percentage,
                      }))}
                      width={width}
                      height={140}
                      compact
                      margin={{ left: 32, right: 24, top: 2, bottom: 2 }}
                      color={[
                        '#A8C5C3',
                        '#B5C5B0',
                        '#C4BF9E',
                        '#CBB28F',
                        '#C4A882',
                        '#87B0AE',
                      ]}
                      formatValue={(v) => `${v}%`}
                    />
                  )}
                </ParentSize>
              </div>
              <div className="flex justify-center gap-0.5 mt-0.5 flex-wrap">
                {careerDistribution.map((d) => (
                  <span
                    key={d.field}
                    className="inline-flex items-center gap-0.5 text-[6px] md:text-[8px] text-slate"
                  >
                    <Icon
                      icon={d.icon!}
                      width={8}
                      height={8}
                      className="text-duck-400"
                    />
                    {d.field}
                  </span>
                ))}
              </div>
            </div>
          }
          satellites={[
            // 卫星 1: 年龄分布
            <div
              key="age"
              className="w-full h-full flex flex-col items-center justify-center px-1 py-1"
            >
              <h3 className="text-[9px] md:text-[10px] font-medium text-duck-400 mb-0.5 text-center font-serif">
                年龄分布 · 90后为绝对主力
              </h3>
              <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                <ParentSize>
                  {({ width }) => (
                    <HorizontalBarChart
                      data={ageDistribution.map((d) => ({
                        label: d.label,
                        value: d.percentage,
                        description: d.description,
                      }))}
                      width={width}
                      height={105}
                      compact
                      margin={{ left: 56, right: 24, top: 1, bottom: 1 }}
                      color={['#C4A882', '#B5C5B0', '#A8C5C3', '#87B0AE']}
                      formatValue={(v) => `${v}%`}
                    />
                  )}
                </ParentSize>
              </div>
              <p className="text-[7px] md:text-[9px] text-slate mt-0.5 text-center leading-tight">
                平均约31岁 · 90后占71.28%
              </p>
            </div>,

            // 卫星 2: 学历分布 (环形图占据 ~80% 容器面积，标题/图例置于外围)
            <div
              key="edu"
              className="w-full h-full flex flex-col items-center justify-center px-1 py-0.5"
            >
              <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                <ParentSize>
                  {({ width, height }) => (
                    <DonutChart
                      data={educationDistribution.map((d) => ({
                        label: d.label,
                        value: d.percentage,
                      }))}
                      width={width}
                      height={Math.max(height, 60)}
                      compact
                      centerValue={`${higherEducationPercent}%`}
                      centerLabel="本科及以上"
                      colors={['#A8C5C3', '#6A9897', '#4A6B6E', '#C4A882']}
                    />
                  )}
                </ParentSize>
              </div>
              <h3 className="text-[8px] md:text-[9px] font-medium text-duck-400 mt-0.5 text-center font-serif leading-tight">
                学历分布
              </h3>
            </div>,

            // 卫星 3: 性别分布 (环形图占据 ~80% 容器面积，标题/图例置于外围)
            <div
              key="gender"
              className="w-full h-full flex flex-col items-center justify-center px-1 py-0.5"
            >
              <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                <ParentSize>
                  {({ width, height }) => (
                    <DonutChart
                      data={genderDistribution.map((d) => ({
                        label: d.label,
                        value: d.percentage,
                      }))}
                      width={width}
                      height={Math.max(height, 60)}
                      compact
                      centerValue="51.8%"
                      centerLabel="男性"
                      colors={['#A8C5C3', '#C4A882', '#B5C5B0']}
                      thickness={30}
                    />
                  )}
                </ParentSize>
              </div>
              <h3 className="text-[8px] md:text-[9px] font-medium text-duck-400 mt-0.5 text-center font-serif leading-tight">
                性别分布 · 接近均衡
              </h3>
            </div>,
          ]}
        />
        </div>

        {/* 数据来源标注 */}
        <p className="text-[8px] md:text-[10px] text-slate/60 text-center mt-1 font-sans tracking-wide">
          数据来源：NCC 2024《全景式数字游民洞察报告》· 中国数字游民样本 n=282
          &nbsp;|&nbsp; 全球对比：MBO Partners 2024（美国）· Nomad List 2025（全球）
        </p>

        {/* ================================================================ */}
        {/*  第二组：每周工作时长（核心圆） + 职位/经验/游民时长（卫星方卡）      */}
        {/*  外层隔离容器 — z-index 高于第一组，确保滚动时不被遮挡                */}
        {/* ================================================================ */}
        <div className="relative" style={{ zIndex: 2, isolation: 'isolate' }}>
          <ChartConstellation
            groupKey="g2"
          coreChart={
            <div className="w-full h-full flex flex-col items-center justify-center px-1 py-0.5">
              <h3 className="text-[10px] md:text-xs font-medium text-charcoal mb-0.5 font-serif text-center">
                每周工作时长
              </h3>
              <p className="text-[7px] md:text-[9px] text-slate mb-0.5 text-center leading-tight">
                超越传统办公
              </p>

              {/* 50h 数字游民 */}
              <div className="w-full max-w-[85%] mb-1.5">
                <div className="flex items-end justify-between mb-0.5">
                  <span className="text-[7px] md:text-[9px] text-slate font-sans">
                    数字游民
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono text-duck-400 font-bold">
                    50h/周
                  </span>
                </div>
                <div className="h-3.5 md:h-4 bg-duck-50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{
                      background:
                        'linear-gradient(90deg, #6A9897, #A8C5C3)',
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <span className="text-[7px] md:text-[9px] text-white font-mono font-medium">
                      +25%
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* 40h 传统办公 */}
              <div className="w-full max-w-[85%] mb-1.5">
                <div className="flex items-end justify-between mb-0.5">
                  <span className="text-[7px] md:text-[9px] text-slate font-sans">
                    传统办公
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono text-slate">
                    40h/周
                  </span>
                </div>
                <div className="h-3.5 md:h-4 bg-duck-50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'rgba(168,197,195,0.35)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>
              </div>

              <p className="text-[6px] md:text-[8px] text-slate text-center max-w-[90%] leading-tight">
                自由≠轻松——每周多工作10小时，但换来了地点和时间的自主权
              </p>
            </div>
          }
          satellites={[
            // 卫星 1: 职位层级
            <div
              key="pos"
              className="w-full h-full flex flex-col items-center justify-center px-1 py-1"
            >
              <h3 className="text-[9px] md:text-[10px] font-medium text-duck-400 mb-0.5 text-center font-serif">
                职位层级 · 执行者为主体
              </h3>
              <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                <ParentSize>
                  {({ width }) => (
                    <HorizontalBarChart
                      data={positionDistribution.map((d) => ({
                        label: d.level,
                        value: d.percentage,
                      }))}
                      width={width}
                      height={100}
                      compact
                      margin={{ left: 42, right: 24, top: 1, bottom: 1 }}
                      color={['#A8C5C3', '#B5C5B0', '#C4A882', '#C4BF9E']}
                      formatValue={(v) => `${v}%`}
                    />
                  )}
                </ParentSize>
              </div>
            </div>,

            // 卫星 2: 从业经验
            <div
              key="exp"
              className="w-full h-full flex flex-col items-center justify-center px-1 py-1"
            >
              <h3 className="text-[9px] md:text-[10px] font-medium text-duck-400 mb-0.5 text-center font-serif">
                从业经验 · 职场老兵不少
              </h3>
              <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                <ParentSize>
                  {({ width }) => (
                    <HorizontalBarChart
                      data={experienceDistribution.map((d) => ({
                        label: d.range,
                        value: d.percentage,
                      }))}
                      width={width}
                      height={100}
                      compact
                      margin={{ left: 38, right: 24, top: 1, bottom: 1 }}
                      color={['#C4A882', '#C4BF9E', '#B5C5B0', '#A8C5C3']}
                      formatValue={(v) => `${v}%`}
                    />
                  )}
                </ParentSize>
              </div>
            </div>,

            // 卫星 3: 成为数字游民多长时间
            <div
              key="dur"
              className="w-full h-full flex flex-col items-center justify-center px-1 py-1"
            >
              <h3 className="text-[9px] md:text-[10px] font-medium text-duck-400 mb-0.5 text-center font-serif">
                成为数字游民多长时间了？
              </h3>
              <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                <ParentSize>
                  {({ width }) => (
                    <HorizontalBarChart
                      data={nomadDuration.data.map((d) => ({
                        label: d.label,
                        value: d.percentage,
                      }))}
                      width={width}
                      height={100}
                      compact
                      margin={{ left: 38, right: 24, top: 1, bottom: 1 }}
                      color={[
                        '#C4A882',
                        '#C4BF9E',
                        '#B5C5B0',
                        '#A8C5C3',
                        '#87B0AE',
                      ]}
                      formatValue={(v) => `${v}%`}
                    />
                  )}
                </ParentSize>
              </div>
            </div>,
          ]}
        />
        </div>

        {/* Q调查核心指标汇总表 */}
        <div className="mt-16">
          <DataTable
            columns={[
              { key: 'metric', header: '指标', align: 'left' as const },
              { key: 'value', header: '数值 (n=282)', align: 'center' as const },
              { key: 'highlight', header: '说明', align: 'left' as const },
            ]}
            rows={surveySummary.rows}
            caption={`Q调查核心指标一览（n=${surveySummary.sampleSize}）`}
            sourceRef={1}
            highlightCol="value"
            rowDelay={0.06}
          />
        </div>

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
