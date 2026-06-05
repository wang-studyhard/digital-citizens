import { ParentSize } from '@visx/responsive'
import { motion } from 'framer-motion'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { ChartCard } from '@/components/shared/ChartCard'
import { DonutChart } from '@/components/charts/DonutChart'
import { BigNumber } from '@/components/shared/BigNumber'
import { FadeInView } from '@/components/shared/FadeInView'
import { DataSource } from '@/components/shared/DataSource'
import { CoordinatedReveal } from '@/components/effects/CoordinatedReveal'
import { references } from '@/data/references'
import { genZWillingness, ruralStats, anjiImpact } from '@/data/policy'
import { averageAge, mainGroup, recentNomadPercent } from '@/data/demographics'
import { arbitrationGrowth, opcStats, savingsDifferenceAnnual } from '@/data/economics'

const SHIFT_METRICS = [
  { value: '1510万', label: '全国乡村振兴\n创业带头人', sub: '80后90后占70%+', color: '#A8C5C3' },
  { value: '1600万+', label: '全国OPC\n突破', sub: `上半年注册286万户 +47%`, color: '#B5C5B0' },
  { value: '551万', label: '数字仲裁\n年案件量', sub: `同比+41.4% 平均83天办结`, color: '#C4BF9E' },
  { value: `¥${(savingsDifferenceAnnual / 10000).toFixed(1)}万`, label: '地理套利\n年储蓄差', sub: '同薪不同命的量化证明', color: '#C4A882' },
]

export function Chapter5Conclusion() {
  return (
    <section id="chapter5" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第五章"
          title="未来的工作"
          subtitle={'不是某个地点，而是一种可能——当76.4%的年轻人说“我愿意”时，他们选择的不是逃避，而是一种新的价值实现方式。'}
        />

        {/* 开篇金句 */}
        <QuoteBlock
          text="数字游民不是'流浪者'，而是数字时代的人才流动先遣队。他们的出现，正在倒逼社保制度、劳动权益、城乡治理等一系列现代性改革。"
          size="large"
        />

        {/* ============ 00后意愿 · 环形图 + 解读 ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-16">
          <FadeInView variant="fadeLeft">
            <ChartCard title="00后的选择 · 一代人的答案" sourceRef={13}>
              <ParentSize>
                {({ width }) => (
                  <DonutChart
                    data={[
                      { label: '愿意成为数字游民', value: genZWillingness.percentage },
                      { label: '其他选择', value: 100 - genZWillingness.percentage },
                    ]}
                    width={width}
                    height={280}
                    centerValue={`${genZWillingness.percentage}%`}
                    centerLabel="愿意成为数字游民"
                    colors={['#A8C5C3', '#1e3233']}
                    thickness={45}
                  />
                )}
              </ParentSize>
              <p className="text-sm text-slate mt-3 text-center">
                数据来源：《2022雇佣关系趋势报告》智联招聘 / 北大国发院
              </p>
            </ChartCard>
          </FadeInView>

          <FadeInView variant="fadeRight">
            <div className="space-y-6">
              <BigNumber
                value={genZWillingness.percentage}
                suffix="%"
                label="中国00后表示愿意成为数字游民"
                color="#4A6B6E"
              />
              <p className="prose-body text-slate leading-relaxed">
                这不仅是一个就业选择，更是一次劳动价值观的代际更替——
                从<strong className="text-charcoal">"为组织奉献"</strong>到
                <strong className="text-charcoal">"为自己创造"</strong>。
              </p>
              <p className="prose-body text-slate leading-relaxed">
                当超过四分之三的年轻人说"我愿意"时，他们选择将自己的技能
                直接对接到全球价值链中，绕过传统组织的层层过滤。
                这不是逃离——这是<strong className="text-duck-400">重新定义</strong>。
              </p>
            </div>
          </FadeInView>
        </div>

        {/* ============ 结构性转变 · 四项关键指标 ============ */}
        <FadeInView variant="fadeUp" className="mt-20">
          <h3 className="text-2xl font-serif text-charcoal text-center mb-2">
            静默而深刻的结构性转变
          </h3>
          <p className="text-center text-slate mb-8 text-sm">
            四个数字，四种力量——它们共同描绘了一个正在成形的新经济图景
          </p>
        </FadeInView>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SHIFT_METRICS.map((m, i) => (
            <FadeInView key={m.label} variant="fadeUp" delay={i * 0.12} threshold={0.05}>
              <motion.div
                className="bg-duck-900/50 rounded-card p-5 md:p-6 h-full border border-duck-200/8 text-center"
                whileHover={{ y: -3 }}
              >
                <div
                  className="text-2xl md:text-3xl font-bold font-serif mb-2"
                  style={{ color: m.color }}
                >
                  {m.value}
                </div>
                <div className="text-sm text-charcoal font-medium whitespace-pre-line leading-snug">
                  {m.label}
                </div>
                <div className="text-xs text-slate mt-2 font-sans">
                  {m.sub}
                </div>
              </motion.div>
            </FadeInView>
          ))}
        </div>

        {/* ============ 人与制度 — 协调入场 ============ */}
        <CoordinatedReveal
          groupKey="ch5-people-system"
          mainScale={1.03}
          main={
            <div className="bg-duck-900/40 rounded-card p-6 md:p-8 border border-duck-200/8">
              <h3 className="text-xl font-serif text-charcoal mb-6 text-center">
                他们已经在这条路上
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold font-serif text-duck-400">
                    {averageAge}岁
                  </div>
                  <p className="text-sm text-slate mt-1">平均年龄</p>
                  <p className="text-xs text-mist mt-0.5">{mainGroup}</p>
                </div>
                <div>
                  <div className="text-3xl font-bold font-serif text-duck-400">
                    {recentNomadPercent}%
                  </div>
                  <p className="text-sm text-slate mt-1">近3年内成为数字游民</p>
                  <p className="text-xs text-mist mt-0.5">其中54.4%在1年内开始</p>
                </div>
                <div>
                  <div className="text-3xl font-bold font-serif text-duck-400">
                    {ruralStats.totalEntrepreneurs}万
                  </div>
                  <p className="text-sm text-slate mt-1">全国乡村振兴创业带头人</p>
                  <p className="text-xs text-mist mt-0.5">80后90后占比{ruralStats.mainGroupPercent}%+</p>
                </div>
              </div>
              <p className="text-center text-sm text-slate mt-6 max-w-2xl mx-auto leading-relaxed">
                从安吉白茶田边的代码，到黄山酒厂改建空间里的共创，
                再到福州闽江畔的创意实验室——
                他们正在用<strong className="text-charcoal">"云端办公 + 在地生活"</strong>的方式，
                重新定义21世纪中国人的工作与生活。
              </p>
            </div>
          }
          secondary={[
            <div key="institutions" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-duck-900/40 rounded-card p-6 border border-duck-200/8 text-center">
                <div className="text-3xl font-bold font-serif text-duck-700">
                  {opcStats.total}+ 万
                </div>
                <p className="text-sm text-slate mt-1">
                  全国OPC突破{opcStats.total}万家（{opcStats.asOf}）
                </p>
                <p className="text-xs text-mist mt-0.5">
                  上半年注册{opcStats.firstHalfRegistrations}万户 · 同比+{opcStats.yoyGrowth}%
                </p>
                <p className="text-xs text-slate mt-3 leading-relaxed">
                  越来越多个体不再依附于公司，直接面向市场提供价值。
                  这是劳动关系史上一次静默而深刻的范式转移。
                </p>
              </div>
              <div className="bg-duck-900/40 rounded-card p-6 border border-duck-200/8 text-center">
                <div className="text-3xl font-bold font-serif text-warm-600">
                  {arbitrationGrowth.cases}万件
                </div>
                <p className="text-sm text-slate mt-1">
                  2025年数字仲裁案件 · 同比+{arbitrationGrowth.yoyGrowth}%
                </p>
                <p className="text-xs text-mist mt-0.5">
                  平均{arbitrationGrowth.averageDays}天办结 · {arbitrationGrowth.mainAgeGroup}占比{arbitrationGrowth.mainAgePercent}%
                </p>
                <p className="text-xs text-slate mt-3 leading-relaxed">
                  制度正在追赶先行者的脚步。从丽水的专项政策到黄山的全域计划，
                  地方政府以前所未有的姿态拥抱这股新经济力量。
                </p>
              </div>
            </div>,
          ]}
        />

        {/* ============ 核心结语 ============ */}
        <QuoteBlock
          text="数字游民不仅推动了城乡空间的社会化重构，更重要的是——作为高端人才，他们携带着知识资本在全球市场中自由配置，能够为在地经济注入新的发展动能，推动地方品牌和高端人力资源的聚集，促进数字文化创意产业和地区经济的发展。"
          size="large"
        />

        <FadeInView variant="fadeUp" className="mt-12 text-center max-w-3xl mx-auto">
          <p className="prose-body text-lg text-charcoal leading-relaxed">
            当数字游民在安吉的白茶田边敲下代码，在黄山的酒厂改建空间里探讨共创，
            在福州闽江畔的实验室里孵化创意——他们正在用"云端办公 + 在地生活"的方式，
            重新定义21世纪中国人的工作与生活。
          </p>
          <p className="prose-body text-slate mt-4">
            这或许就是未来的工作：<strong>不是去某个地点上班，而是带着工作去生活。</strong>
          </p>
        </FadeInView>

        {/* ============ 安吉影响力实证 ============ */}
        <FadeInView variant="fadeUp" className="mt-14">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-duck-900/60 rounded-full px-5 py-2 border border-duck-200/10">
              <span className="text-sm text-slate font-sans">安吉 · 一年内的改变</span>
              <span className="text-duck-700 font-bold font-serif text-lg">
                {anjiImpact.jobsCreated}+ 就业岗位
              </span>
              <span className="text-slate">·</span>
              <span className="text-duck-700 font-bold font-serif text-lg">
                ¥{anjiImpact.villageIncomeIncrease}万 村集体增收
              </span>
            </div>
            <p className="text-xs text-mist mt-2 font-sans">
              {anjiImpact.description}
            </p>
          </div>
        </FadeInView>

        {/* ============ 参考文献 ============ */}
        <FadeInView variant="fadeIn" threshold={0.1} className="mt-24">
          <div className="border-t border-duck-200 pt-12">
            <h3 className="text-lg font-serif text-charcoal mb-6 text-center">
              参考文献
            </h3>
            <ol className="max-w-2xl mx-auto space-y-2 text-sm text-slate font-sans">
              {references.map((ref) => (
                <li key={ref.id} className="pl-2 leading-relaxed">
                  <span className="font-mono text-xs text-duck-600 mr-2">
                    [{ref.id}]
                  </span>
                  {ref.title}
                  <span className="text-mist ml-1">— {ref.source}</span>
                </li>
              ))}
            </ol>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
