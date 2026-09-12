export function FinaleNetwork() {
  return (
    <figure id="scene7" className="finale-network" aria-labelledby="finale-title">
      <div className="finale-network__copy"><p className="data-label text-duck-300">scene 7 · what remains</p><h3 id="finale-title" className="mt-4 font-serif text-4xl leading-tight text-charcoal md:text-6xl">当工作可以去往任何地方，<br /><em className="text-warm-300">真正重要的，是它与一个地方建立了什么关系。</em></h3><p className="mt-7 max-w-xl text-sm leading-7 text-slate">有的关系只持续几周，有的关系变成一个项目、一份工作、一次共同创作。数字游民是否真正“留下”，不能只由入住人数回答。</p></div>
      <div className="finale-map" role="img" aria-label="远程工作者通过社区连接村庄、商户与产业文化项目，再形成内容、服务、项目和地方关系">
        <svg viewBox="0 0 820 420" preserveAspectRatio="none" aria-hidden="true"><path d="M410 56 V138 M410 214 V286 M410 286 C245 286 190 332 110 360 M410 286 C410 330 410 332 410 360 M410 286 C575 286 630 332 710 360" /><path d="M110 360 C220 392 300 392 410 360 M410 360 C520 392 600 392 710 360" /></svg>
        <div className="finale-node finale-node--root">远程工作者</div>
        <div className="finale-node finale-node--community">社区</div>
        <div className="finale-node finale-node--leaf finale-node--village">村庄</div>
        <div className="finale-node finale-node--leaf finale-node--shop">商户</div>
        <div className="finale-node finale-node--leaf finale-node--industry">产业 / 文化项目</div>
        <div className="finale-node finale-node--outcome">内容 · 服务 · 项目</div>
        <div className="finale-node finale-node--relation">地方关系</div>
      </div>
      <figcaption className="mt-10 border-t border-duck-200/10 pt-4 text-xs leading-6 text-mist">这不是一张产业链流程图，而是一种判断：关系是否留下，要看具体合作能否从到访变成共同完成的事情。</figcaption>
    </figure>
  )
}
