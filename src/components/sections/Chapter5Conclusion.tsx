import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { FadeInView } from '@/components/shared/FadeInView'
import { DataSource } from '@/components/shared/DataSource'
import { references } from '@/data/references'

const TAKEAWAYS = [
  {
    title: '流动是一种工作安排',
    text: '地点变化并不会自动带来自由。稳定交付、技能积累和清晰的合作边界，决定了流动能否持续。',
  },
  {
    title: '乡村不是背景',
    text: '社区、村集体、商户和原有产业都拥有自己的需求与经验。青年参与要从真实需求出发，尊重在地节奏。',
  },
  {
    title: '合作需要留下来',
    text: '一次到访可以带来注意力，持续的项目、能力和关系，才可能转化为共同成长。',
  },
]

const STATUS_LABEL: Record<string, string> = {
  verified: '已核',
  reported: '报道',
  pending: '待核',
}

export function Chapter5Conclusion() {
  return (
    <section id="chapter5" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第五章"
          title="让流动留下合作"
          subtitle="公开材料展示了正在发生的探索，也提醒我们：合作的价值要用具体行动和持续时间来检验。"
        />

        <QuoteBlock
          text="数字游民带来的不只是新的工作地点，也是一场关于劳动、地方与公共生活如何重新连接的实验。"
          size="large"
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {TAKEAWAYS.map((item, index) => (
            <FadeInView key={item.title} variant="fadeUp" delay={index * 0.08} threshold={0.1}>
              <article className="h-full border-t-2 border-duck-300/35 pt-4">
                <p className="text-xs font-mono tracking-wider text-duck-300/75">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-serif text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{item.text}</p>
              </article>
            </FadeInView>
          ))}
        </div>

        <FadeInView variant="fadeUp" className="mx-auto mt-20 max-w-3xl text-center">
          <h3 className="text-2xl font-serif text-charcoal">我们能确认什么？</h3>
          <p className="prose-body mt-5 text-slate">
            一项公开研究在明确筛选范围内记录了截至2025年末仍在运营的77家中国内地数字游民社区，其中52家位于乡村。
            这说明乡村是重要落点，也说明样本边界必须被看见。
            <DataSource refNumber={3} />
          </p>
          <p className="prose-body mt-4 text-slate">
            新华社对安吉与黄山的报道记录了青年为当地餐饮、文旅和乡村文化项目提供设计、内容与运营协作。
            这些是可以核对的行动，不足以单独证明长期就业或增收效果。
            <DataSource refNumber={2} />
            <DataSource refNumber={4} />
          </p>
        </FadeInView>

        <FadeInView variant="fadeIn" threshold={0.1} className="mt-24">
          <div id="references" className="scroll-mt-24 border-t border-duck-200/20 pt-10">
            <h3 className="text-xl font-serif text-charcoal">资料与方法</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate">
              本专题使用公开报道、研究文章和政策文本；数字旁标注统计对象、时间与来源。
              “报道”表示媒体记录，“目标”表示政策提出的未来安排，“待核”不进入主线结论。
              页面中的分析判断由编辑整理，不能替代原始调查。
            </p>
            <ol className="mt-7 space-y-3 text-sm leading-relaxed text-slate">
              {references.map((reference) => (
                <li key={reference.id} id={`reference-${reference.id}`} className="flex gap-3 scroll-mt-24">
                  <span className="font-mono text-xs text-duck-300/75">[{reference.id}]</span>
                  <span>
                    {reference.url ? (
                      <a href={reference.url} target="_blank" rel="noreferrer" className="text-charcoal underline decoration-duck-300/50 underline-offset-4 hover:text-duck-200">
                        {reference.title}
                      </a>
                    ) : (
                      reference.title
                    )}
                    <span className="text-mist"> · {reference.source}</span>
                    {reference.status && (
                      <span className="ml-2 rounded-full border border-duck-300/25 px-2 py-0.5 text-[0.68rem] text-duck-200/80">
                        {STATUS_LABEL[reference.status]}
                      </span>
                    )}
                    {reference.locator && <span className="block text-xs text-mist">定位：{reference.locator}</span>}
                    {reference.note && <span className="block text-xs text-mist">说明：{reference.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
