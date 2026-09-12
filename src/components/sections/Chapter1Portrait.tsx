import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { EvidenceDrawer } from '@/components/shared/EvidenceDrawer'
import { EvidenceValue } from '@/components/shared/EvidenceValue'

const SAMPLE_STEPS = [
  { id: 'ncc-response-total', label: '回收', display: '827', tone: 'paper-blue' },
  { id: 'ncc-valid-total', label: '有效', display: '798', tone: 'paper-yellow' },
  { id: 'ncc-digital-nomad-sample', label: '数字游民', display: '282', tone: 'paper-red' },
  { id: 'ncc-explorer-sample', label: '探索者', display: '516', tone: 'paper-green' },
]

export function Chapter1Portrait() {
  return (
    <section id="scene1" className="scene scene--paper px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHeader chapter="Scene 1" title="我们知道他们多少？" subtitle="对中国数字游民，我们并没有一份全国人口普查。先把一份社区渠道样本的边界摆在桌面上。" align="left" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="paper-note paper-note--yellow rotate-[-1deg]">
            <p className="data-label text-duck-700">NCC 2024 · method first</p>
            <h3 className="mt-5 font-serif text-3xl leading-tight text-duck-950 md:text-4xl">这是一扇窗口，<br />不是一张全国画像。</h3>
            <p className="mt-5 text-sm leading-7 text-duck-900/80">问卷通过数字游民社区线上渠道发放。它能告诉我们参与者如何描述自己，却不能告诉我们中国有多少数字游民。</p>
            <div className="mt-8 flex items-center justify-between border-t border-duck-950/15 pt-4 text-xs text-duck-900/65"><span>社区渠道样本</span><span>2024.04—05</span></div>
          </div>

          <figure className="paper-frame" aria-labelledby="sample-funnel-title">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="data-label text-duck-300">sample boundary</p><h3 id="sample-funnel-title" className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">从回收到可描述的样本</h3></div>
              <EvidenceDrawer />
            </div>
            <div className="sample-funnel mt-8">
              {SAMPLE_STEPS.slice(0, 2).map((step, index) => (
                <div key={step.id} className={`sample-step ${step.tone}`}><span className="data-label text-duck-950/65">0{index + 1} · {step.label}</span><strong><EvidenceValue metricId={step.id} display={step.display} className="text-duck-950" /></strong><span className="text-xs text-duck-950/65">份问卷</span></div>
              ))}
              <div className="sample-branch" aria-hidden="true"><span>分成两类</span></div>
              {SAMPLE_STEPS.slice(2).map((step, index) => (
                <div key={step.id} className={`sample-step sample-step--branch ${step.tone}`}><span className="data-label text-duck-950/65">0{index + 3} · {step.label}</span><strong><EvidenceValue metricId={step.id} display={step.display} className="text-duck-950" /></strong><span className="text-xs text-duck-950/65">人</span></div>
              ))}
            </div>
            <figcaption className="mt-6 border-t border-duck-200/10 pt-4 text-xs leading-6 text-mist">827 份问卷回收后得到 798 份有效问卷，其中包含 282 名数字游民和 516 名探索者。样本来自社区渠道，不能外推全国人口。</figcaption>
          </figure>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <article className="evidence-card"><p className="data-label text-duck-300">what we can say</p><h3 className="mt-3 font-serif text-2xl text-charcoal">样本如何构成</h3><p className="mt-3 text-sm leading-7 text-slate">可以描述这 282 名数字游民样本的回答，也可以把 8 名结构化访谈作为经验材料。</p><p className="mt-5 font-mono text-sm text-duck-200"><EvidenceValue metricId="ncc-structured-interviews" display="8 名" /></p></article>
          <article className="evidence-card"><p className="data-label text-duck-300">what we cannot say</p><h3 className="mt-3 font-serif text-2xl text-charcoal">不是全国比例</h3><p className="mt-3 text-sm leading-7 text-slate">参与者并非随机抽取。任何“全国有多少”“中国人中占多少”的句子都不由这份样本支持。</p></article>
          <article className="evidence-card"><p className="data-label text-duck-300">next question</p><h3 className="mt-3 font-serif text-2xl text-charcoal">那什么在移动？</h3><p className="mt-3 text-sm leading-7 text-slate">当标签不再承担全国画像，答案要回到工作安排、具体地点和人与地方的联系。</p></article>
        </div>
      </div>
    </section>
  )
}
