import { ChapterHeader } from '@/components/shared/ChapterHeader'

const TIME_STEPS = [
  ['地点变了', '办公桌从固定场所离开，日常被重新放进村庄、县城或旅居社区。'],
  ['时间重新组织', '自主安排带来弹性，也把排期、交付和自我管理交回个人。'],
  ['项目仍有截止时间', '工作地点可以移动，客户、团队和合同的时间不会因此消失。'],
  ['关系需要重新建立', '网络连接解决的是沟通，不自动产生信任、归属与劳动保障。'],
]

export function Chapter2Motivation() {
  return (
    <section id="scene2" className="scene scene--ink px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHeader chapter="Scene 2" title="离开办公室以后，工作真的更自由了吗？" subtitle="自由不是地点的同义词。地点变化之后，时间、交付和关系被重新编排。" align="left" mode="dark" />

        <figure className="time-diagram mt-14" aria-labelledby="time-diagram-title">
          <div className="max-w-2xl"><p className="data-label text-warm-300">editorial time diagram · not a statistical chart</p><h3 id="time-diagram-title" className="mt-3 font-serif text-3xl leading-tight text-charcoal md:text-5xl">工作地点离开固定办公室，<br /><em className="text-warm-300">劳动本身没有离开。</em></h3></div>
          <div className="time-rail" role="list" aria-label="自由与不稳定的关系链">
            {TIME_STEPS.map(([title, text], index) => <div key={title} className="time-node" role="listitem"><div className="time-node__number">0{index + 1}</div><div><h4 className="font-serif text-xl text-charcoal md:text-2xl">{title}</h4><p className="mt-2 max-w-[28ch] text-sm leading-7 text-slate">{text}</p></div></div>)}
          </div>
          <figcaption className="mt-10 border-t border-duck-200/10 pt-4 text-xs leading-6 text-mist">这是编辑图解，用来说明一条关系链，不把学术概念伪装成统计趋势。研究讨论的“时间编织”“结构性悬浮”和情感连接，需要回到具体地方与劳动经验中理解。</figcaption>
        </figure>

        <div className="mt-16 grid gap-0 border-y border-duck-200/10 md:grid-cols-3">
          {[['稳定交付', '网络、协作和任务边界，是远程工作能够持续的前提。'], ['自我管理', '弹性时间同时意味着排期、收入和项目风险由个人承担更多。'], ['社会连接', '社区提供相遇机会，但不能替代医疗、社保和长期关系。']].map(([title, text], index) => <article key={title} className="border-b border-duck-200/10 px-1 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"><p className="font-mono text-xs text-warm-300">0{index + 1}</p><h4 className="mt-3 font-serif text-2xl text-charcoal">{title}</h4><p className="mt-3 text-sm leading-7 text-slate">{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}
