import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { CostComparisonDiagram } from '@/components/charts/CostComparisonDiagram'
import { FadeInView } from '@/components/shared/FadeInView'
import { DataSource } from '@/components/shared/DataSource'
import { costComparison, savingsDifference } from '@/data/economics'

const SUPPORTS = [
  ['稳定交付', '远程工作的前提仍是清晰的任务、稳定的网络和可预期的协作。'],
  ['自我管理', '公开采访中的受访者提到，自由意味着自己安排工作节奏，也要承担失去项目的风险。'],
  ['社会连接', '社区提供交流机会，但它不能替代劳动保障、医疗服务和长期的社会关系。'],
]

export function Chapter2Motivation() {
  return (
    <section id="chapter2" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第二章"
          title="自由需要支撑"
          subtitle="工作地点可以移动，交付、收入、公共服务与人与人的连接仍然存在。"
        />

        <QuoteBlock
          text="数字游民不是把工作留在城市之外，而是把工作带进新的生活场景。"
          size="large"
        />

        <FadeInView variant="fadeUp" className="mt-14">
          <h3 className="text-2xl font-serif text-charcoal text-center">同一份收入，生活成本会怎样变化？</h3>
          <p className="mt-2 text-center text-sm text-slate">
            以下是帮助读者理解“地理套利”的示意模型，不代表调查结果或任何个人的实际预算。
          </p>
        </FadeInView>

        <div className="mt-8">
          <CostComparisonDiagram
            leftData={costComparison[0]}
            rightData={costComparison[1]}
            savingsDifference={savingsDifference}
          />
          <p className="mt-3 text-center text-xs leading-relaxed text-mist">
            假设月收入均为15,000元，仅比较示例中的房租和日常支出；交通、医疗、税费与家庭责任未纳入。
          </p>
        </div>

        <FadeInView variant="fadeUp" className="mt-20">
          <div className="border-t border-duck-200/15 pt-8">
            <h3 className="text-2xl font-serif text-charcoal text-center">地点改变之后，什么仍然重要？</h3>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {SUPPORTS.map(([title, text], index) => (
                <article key={title} className="border-l border-duck-300/35 pl-4">
                  <p className="font-serif text-lg text-duck-200">{String(index + 1).padStart(2, '0')} {title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{text}</p>
                </article>
              ))}
            </div>
            <p className="mt-7 text-center text-xs text-mist">
              受访者经验来自公开媒体报道，不能代替对所有数字游民的调查。
              <DataSource refNumber={2} />
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
