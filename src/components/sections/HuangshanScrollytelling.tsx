import { useState } from 'react'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { ImageCard } from '@/components/shared/ImageCard'

const STEPS = [
  { label: '酿酒工业遗址', text: '旧空间先被改造成可以居住、工作和相遇的地方。' },
  { label: '58 个房间', text: '空间有了可被使用的尺度；它仍然是一个具体社区，不是全市总量。', metricId: 'huangshan-rooms', display: '58 个' },
  { label: '旅居', text: '新华社报道记录，社区成立不到一年约有 500 人旅居；通常是数周到数月。', metricId: 'huangshan-stays', display: '约 500 人' },
  { label: '户外工作 / 乡村电影', text: '工作经验开始和当地文旅、文化活动发生联系。' },
  { label: '揭榜挂帅 / 本地项目', text: '当社区开始承接地方任务，问题就从“谁来住”转向“共同做什么”。' },
]

export function HuangshanScrollytelling() {
  const [active, setActive] = useState(0)
  const current = STEPS[active]

  return (
    <div className="huangshan-scroll">
      <div className="huangshan-sticky">
        <div className="case-panel__header"><div><p className="data-label text-warm-300">case 02 · huangshan / yixian</p><h3 className="mt-2 font-serif text-3xl text-charcoal md:text-4xl">当社区开始承接地方任务</h3></div><span className="case-index text-warm-300">02</span></div>
        <div className="huangshan-visual" aria-live="polite"><div className="huangshan-visual__ring" aria-hidden="true" /><p className="font-mono text-xs text-warm-300">0{active + 1} / 05</p><h4 className="mt-3 font-serif text-3xl text-charcoal md:text-5xl">{current.label}</h4>{current.metricId && <p className="mt-5 font-mono text-xl text-warm-300"><EvidenceValue metricId={current.metricId} display={current.display} /></p>}</div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ImageCard
            src="/media/editorial/xinhua-yixian-heidou-community.jpg"
            alt="黟县黑多岛数字游民社区内，一名分享者站在投影幕前，观众坐在台下。"
            title="分享活动现场"
            description="新华社报道配图：NCC黄山数字游民社区举办的分享活动现场。"
            credit="新华社｜2024-09-14｜傅天 摄｜用户授权项目使用"
            aspectRatio="4/3"
          />
          <ImageCard
            src="/media/editorial/xinhua-yixian-heidou-discussion.jpg"
            alt="黟县黑多岛数字游民社区内，多人围坐交流。"
            title="社区交流"
            description="同一篇报道记录的社区分享与交流场景。"
            credit="新华社｜2024-09-14｜傅天 摄｜用户授权项目使用"
            aspectRatio="4/3"
          />
        </div>
      </div>
      <div className="huangshan-steps" role="list" aria-label="黄山案例步骤">
        {STEPS.map((step, index) => <button key={step.label} type="button" className={`huangshan-step ${active === index ? 'is-active' : ''}`} onClick={() => setActive(index)} aria-pressed={active === index}><span className="font-mono text-xs text-warm-300">0{index + 1}</span><span><strong className="block font-serif text-xl text-charcoal">{step.label}</strong><span className="mt-2 block text-sm leading-7 text-slate">{step.text}</span></span></button>)}
      </div>
    </div>
  )
}
