import { ParentSize } from '@visx/responsive'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart'
import { DonutChart } from '@/components/charts/DonutChart'
import { FadeInView } from '@/components/shared/FadeInView'
import { DataTable } from '@/components/shared/DataTable'
import { DataSource } from '@/components/shared/DataSource'
import { surveySummary } from '@/data/tables'
import { ageDistribution, educationDistribution, genderDistribution, careerDistribution, experienceDistribution, higherEducationPercent } from '@/data/demographics'

export function Chapter1Portrait() {
  return (
    <section id="chapter1" className="py-20 md:py-28 px-6" style={{ background: '#1a2d2e' }}>
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第一章"
          title="他们是谁"
          subtitle="数字游民不是单一职业，也不是一张固定画像。我们先从一份公开预览样本，观察他们的年龄、学历和工作背景。"
        />

        <QuoteBlock
          text="同一个标签之下，可能是远程雇员、自由职业者，也可能是正在探索这种生活方式的人。"
          size="large"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FadeInView variant="fadeUp">
            <div className="rounded-2xl border border-duck-200/15 bg-duck-900/45 p-5 md:p-6">
              <h3 className="text-xl font-serif text-charcoal">年龄与职业经历</h3>
              <p className="mt-1 text-sm text-slate">公开预览样本的结构描述；不代表全国人口构成。</p>
              <div className="mt-5">
                <ParentSize>
                  {({ width }) => (
                    <HorizontalBarChart
                      data={ageDistribution.map((item) => ({ label: item.label, value: item.percentage }))}
                      width={width}
                      height={180}
                      margin={{ left: 70, right: 30, top: 10, bottom: 10 }}
                      color={['#C4A882', '#B5C5B0', '#A8C5C3', '#87B0AE']}
                      formatValue={(value) => `${value}%`}
                    />
                  )}
                </ParentSize>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-mist">从业经验较长，不等于以数字游民身份生活的时间更长。</p>
              <div className="mt-4">
                <ParentSize>
                  {({ width }) => (
                    <HorizontalBarChart
                      data={experienceDistribution.map((item) => ({ label: item.range, value: item.percentage }))}
                      width={width}
                      height={150}
                      margin={{ left: 70, right: 30, top: 10, bottom: 10 }}
                      color={['#C4A882', '#C4BF9E', '#B5C5B0', '#A8C5C3']}
                      formatValue={(value) => `${value}%`}
                    />
                  )}
                </ParentSize>
              </div>
            </div>
          </FadeInView>

          <FadeInView variant="fadeUp" delay={0.08}>
            <div className="rounded-2xl border border-duck-200/15 bg-duck-900/45 p-5 md:p-6">
              <h3 className="text-xl font-serif text-charcoal">学历与性别</h3>
              <p className="mt-1 text-sm text-slate">同一公开预览样本中的两个结构维度。</p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <ParentSize>
                  {({ width }) => (
                    <DonutChart
                      data={educationDistribution.map((item) => ({ label: item.label, value: item.percentage }))}
                      width={width}
                      height={220}
                      centerValue={`${higherEducationPercent}%`}
                      centerLabel="本科及以上"
                      colors={['#A8C5C3', '#6A9897', '#4A6B6E', '#C4A882']}
                    />
                  )}
                </ParentSize>
                <ParentSize>
                  {({ width }) => (
                    <DonutChart
                      data={genderDistribution.map((item) => ({ label: item.label, value: item.percentage }))}
                      width={width}
                      height={220}
                      centerValue="51.8%"
                      centerLabel="男性"
                      colors={['#A8C5C3', '#C4A882', '#B5C5B0']}
                      thickness={30}
                    />
                  )}
                </ParentSize>
              </div>
              <h3 className="mt-5 text-base font-serif text-charcoal">职业背景（部分类别）</h3>
              <div className="mt-3">
                <ParentSize>
                  {({ width }) => (
                    <HorizontalBarChart
                      data={careerDistribution.map((item) => ({ label: item.field, value: item.percentage }))}
                      width={width}
                      height={190}
                      margin={{ left: 98, right: 30, top: 8, bottom: 8 }}
                      color={['#A8C5C3', '#B5C5B0', '#C4BF9E', '#CBB28F', '#C4A882', '#87B0AE']}
                      formatValue={(value) => `${value}%`}
                    />
                  )}
                </ParentSize>
              </div>
              <p className="mt-2 text-xs text-mist">职业分类为多选或部分呈现时，合计不必等于100%。</p>
            </div>
          </FadeInView>
        </div>

        <div className="mt-12">
          <DataTable
            columns={[
              { key: 'metric', header: '指标', align: 'left' as const },
              { key: 'value', header: '样本数值', align: 'center' as const },
              { key: 'highlight', header: '说明', align: 'left' as const },
            ]}
            rows={surveySummary.rows}
            caption={`公开预览样本结构摘要（n=${surveySummary.sampleSize}）`}
            sourceRef={1}
            highlightCol="value"
            rowDelay={0.06}
          />
        </div>

        <FadeInView variant="fadeUp" className="mt-8 text-center">
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate">
            这组画像的作用是提出问题：不同工作者如何安排劳动、生活与关系？答案需要回到具体案例，而不是由一张比例图代替。
            <DataSource refNumber={1} />
          </p>
        </FadeInView>
      </div>
    </section>
  )
}
