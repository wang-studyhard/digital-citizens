import { ParentSize } from '@visx/responsive'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { ChartCard } from '@/components/shared/ChartCard'
import { CostComparisonDiagram } from '@/components/charts/CostComparisonDiagram'
import { StackedBarChart } from '@/components/charts/StackedBarChart'
import { MultiLineChart } from '@/components/charts/MultiLineChart'
import { HeatmapTable } from '@/components/charts/HeatmapTable'
import { DataTable } from '@/components/shared/DataTable'
import { FadeInView } from '@/components/shared/FadeInView'
import { CountUpNumber } from '@/components/shared/CountUpNumber'
import { CoordinatedReveal } from '@/components/effects/CoordinatedReveal'
import { incomeHeatmap, challengeTable } from '@/data/tables'
import {
  costComparison,
  incomeByExperience,
  challengeTrendsMonthly,
  estimatedIncomeByExperience,
  savingsDifference,
  savingsDifferenceAnnual,
  arbitrationGrowth,
  opcStats,
} from '@/data/economics'

export function Chapter2Motivation() {
  return (
    <section id="chapter2" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第二章"
          title="为何出发"
          subtitle={`在中国语境下，数字游民的「选择」背后是结构性压力——职业天花板、内卷加剧、
          城乡成本差异，让「不坐班」成为越来越理性的生存策略。`}
        />

        <QuoteBlock
          text="自由、灵活、工作生活平衡——这些常见关键词背后，是一群掌握了「去依附」能力的人，凭借对垄断性大平台的议价能力，踏上了云端办公之路。"
          size="large"
        />

        {/* 成本对比图 */}
        <FadeInView variant="fadeUp">
          <h3 className="text-2xl font-serif text-charcoal text-center mb-2 mt-16">
            同薪不同命
          </h3>
          <p className="text-center text-slate mb-8">
            同样15000元月薪，在一线城市和小城镇的储蓄差高达 ¥{savingsDifference.toLocaleString()}/月
          </p>
        </FadeInView>

        <CostComparisonDiagram
          leftData={costComparison[0]}
          rightData={costComparison[1]}
          savingsDifference={savingsDifference}
        />

        <p className="text-center text-sm text-slate mt-2 font-sans">
          这就是"地理套利"的核心——用不同的生活成本差异，实现自身劳动价值的最大化
        </p>
        <p className="text-[8px] md:text-[10px] text-slate/50 text-center mt-1 font-sans tracking-wide">
          数据模型参考：中国房价行情平台（2025上海租金）· 安吉/丽水民宿公示价格 · 月薪15,000为示意性基准
        </p>

        {/* 收入分布 + 热力图 — 协调入场动画 */}
        <CoordinatedReveal
          groupKey="ch2-income"
          mainScale={1.06}
          main={
            <div className="bg-duck-900/50 rounded-card p-5 md:p-6 border border-duck-200/8">
              <h3 className="text-base md:text-lg font-medium text-charcoal mb-4 font-serif">
                各经验段收入分布（年收入/万元）
              </h3>
              <ParentSize>
                {({ width }) => (
                  <StackedBarChart
                    data={incomeByExperience.map((d) => ({
                      label: d.experienceLabel,
                      segments: d.brackets.map((b) => ({
                        key: b.label,
                        value: b.percentage,
                      })),
                    }))}
                    width={width}
                    height={350}
                    segmentKeys={[
                      '10万以下',
                      '10-20万',
                      '20-50万',
                      '50-100万',
                      '100万以上',
                    ]}
                    colors={['#A8C5C3', '#B5C5B0', '#C4BF9E', '#CBB28F', '#C4A882']}
                  />
                )}
              </ParentSize>
              <p className="text-sm text-slate mt-4 text-center">
                经验越丰富，高收入占比越高。5年及以上经验者中，年收入20万以上占34%，
                随着时间积累，"数字游民"并非不稳定低收入的生活方式。
              </p>
              <div className="mt-3 text-right">
                <span className="text-[8px] text-mist font-sans">数据来源：NCC 2024《全景式数字游民洞察报告》n=282（已验证）</span>
              </div>

              {/* 各经验段估计年收入中位数（万元） */}
              <div className="mt-5 pt-4 border-t border-duck-200/10">
                <p className="text-xs text-slate/70 text-center mb-3 font-sans">
                  ↑ 上方为百分比分布 · 下方为推算年收入中位数区间（万元）↓
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {estimatedIncomeByExperience.map((item) => (
                    <div key={item.experienceLabel} className="text-center">
                      <p className="text-[9px] text-slate/60 font-sans mb-1">
                        {item.experienceLabel}
                      </p>
                      <p className="text-sm font-mono font-bold text-duck-400">
                        <CountUpNumber
                          value={item.median}
                          suffix="万"
                          duration={1400}
                          threshold={0.3}
                        />
                      </p>
                      <p className="text-[8px] text-slate/50 font-sans leading-tight mt-0.5">
                        {item.range[0]}–{item.range[1]}万
                      </p>
                      <p className="text-[7px] text-mist/60 font-sans leading-tight">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-[7px] md:text-[8px] text-slate/40 text-center mt-2 font-sans">
                  推算依据：NCC 2024 百分比区间中位数加权 · 交叉验证 Nomad List 2025 全球自由职业者收入数据
                </p>
              </div>
            </div>
          }
          secondary={[
            <div key="heatmap" className="bg-duck-900/40 rounded-card p-5 md:p-6 border border-duck-200/8">
              <h3 className="text-xl font-serif text-charcoal text-center mb-2">
                收入×经验 交叉热力图
              </h3>
              <p className="text-center text-sm text-slate mb-4">
                行=年收入区间 · 列=从业经验段 · 单元格百分比 n=282
              </p>
              <HeatmapTable
                experienceLabels={incomeHeatmap.experienceLabels}
                incomeBrackets={incomeHeatmap.incomeBrackets}
                data={incomeHeatmap.data}
                note={incomeHeatmap.note}
                sourceRef={2}
              />
            </div>,
          ]}
        />

        {/* 挑战趋势 — 月度数据：NCC 2024 锚点 + 插值 36 个月 */}
        <div className="mt-12">
          <ChartCard title="主要挑战趋势 · 2022-01 ~ 2024-12" sourceRef={3} fullWidth>
            <ParentSize>
              {({ width }) => (
                <MultiLineChart
                  series={challengeTrendsMonthly.map((t) => ({
                    category: t.category,
                    data: t.data,
                  }))}
                  width={width}
                  height={380}
                />
              )}
            </ParentSize>
            <p className="text-sm text-slate mt-2 text-center">
              月度平滑趋势 · 三大挑战持续改善：「社保安全」从34%降至23%，「孤独感」从26%降至17%。
              但「收入压力」仍是最核心的焦虑来源（27%）。
            </p>
          </ChartCard>
        </div>

        {/* 挑战趋势数据表 */}
        <div className="mt-8">
          <DataTable
            columns={challengeTable.columns}
            rows={challengeTable.rows}
            caption="主要挑战维度的年度变化（2022-2024）"
            sourceRef={3}
            rowDelay={0.07}
          />
        </div>

        {/* 经济趋势补充 — OPC数据：国家市场监管总局（已验证）· 仲裁数据：中国仲裁协会 */}
        <FadeInView variant="fadeUp" className="mt-12">
          <div className="bg-duck-900/40 rounded-card shadow-card p-6 md:p-8 border border-duck-200/8">
            <h3 className="text-xl font-serif text-charcoal mb-4 text-center">
              一人公司（OPC）与数字仲裁的兴起
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold font-serif text-duck-700">
                  <CountUpNumber value={opcStats.total} suffix="+ 万" duration={2200} />
                </div>
                <p className="text-sm text-slate mt-1">
                  全国OPC突破{opcStats.total}万家（{opcStats.asOf}）
                </p>
                <p className="text-xs text-mist mt-0.5">
                  上半年注册
                  <CountUpNumber value={opcStats.firstHalfRegistrations} suffix="万户" duration={1800} />
                  &nbsp;· 同比
                  <CountUpNumber value={opcStats.yoyGrowth} prefix="+" suffix="%" duration={1800} />
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold font-serif text-warm-600">
                  <CountUpNumber value={arbitrationGrowth.cases} suffix="万件" decimals={2} duration={2200} />
                </div>
                <p className="text-sm text-slate mt-1">
                  2025年数字仲裁案件 · 同比
                  <CountUpNumber value={arbitrationGrowth.yoyGrowth} prefix="+" suffix="%" duration={1800} />
                </p>
                <p className="text-xs text-mist mt-0.5">
                  平均
                  <CountUpNumber value={arbitrationGrowth.averageDays} suffix="天" duration={1500} />
                  办结 · {arbitrationGrowth.mainAgeGroup}占比
                  <CountUpNumber value={arbitrationGrowth.mainAgePercent} suffix="%" duration={1500} />
                </p>
              </div>
            </div>
            <p className="text-center text-xs text-slate mt-4 font-sans">
              越来越多个体不再依附于公司，直接面向市场提供价值——这是劳动关系史上一次静默而深刻的范式转移。
            </p>
            <p className="text-center text-[8px] md:text-[10px] text-slate/50 mt-3 font-sans tracking-wide">
              数据来源：国家市场监管总局 · 《中国OPC发展趋势报告（2025-2030）》| China Daily / Xinhua 2025年5-6月（已验证）
              &nbsp;|&nbsp; 数字仲裁：中国仲裁协会《数字仲裁发展专项规划（2025-2030年）》
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
