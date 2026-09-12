const TENSIONS = [
  ['自由', '不稳定', '地点更灵活，不代表劳动权益、收入和保障同步变得稳定。'],
  ['流动', '归属', '社区能创造相遇，但归属需要更长时间与更深的在地关系。'],
  ['风景', '产业', '好看的地方可以吸引到访，长期运营仍要回答与本地产业怎样协作。'],
  ['短期热度', '长期运营', '入住、活动和传播是开始，复合型运营能力与持续项目才是考验。'],
]

export function TensionField() {
  return (
    <section id="scene6" className="tension-field" aria-labelledby="tension-title">
      <p className="data-label text-warm-300">scene 6 · structural tensions</p>
      <h3 id="tension-title" className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-charcoal md:text-5xl">流动之后，问题没有消失。</h3>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-slate">如果一篇作品只有政策、风景和正面案例，它会很快变成宣传片。研究与案例同时提醒我们：地方关系的建立，伴随着制度、基础设施和运营的张力。</p>
      <div className="tension-grid mt-12">{TENSIONS.map(([left, right, text]) => <article key={left} className="tension-item"><div className="tension-pair"><span>{left}</span><i aria-hidden="true">↔</i><span>{right}</span></div><p className="mt-4 text-sm leading-7 text-slate">{text}</p></article>)}</div>
      <p className="mt-8 text-xs leading-6 text-mist">结构性观察来自公开研究对劳动权益、政策碎片化、区域差异、基础设施、景观化、盈利模式与社群维护成本的讨论；它们不是四张风险警告卡片。</p>
    </section>
  )
}
