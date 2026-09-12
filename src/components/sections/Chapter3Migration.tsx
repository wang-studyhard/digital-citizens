import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { Community77Morph } from './Community77Morph'
import { EvidenceValue } from '@/components/shared/EvidenceValue'

const OBSERVATIONS = [
  ['乡村', '52 家', '研究样本中，乡村是最主要的落点。'],
  ['中小型', '68 家', '规模结构以中小型社区为主。'],
  ['2025 新增', '33 家', '社区数量在研究记录中继续增加。'],
]

export function Chapter3Migration() {
  return (
    <section id="scene3" className="scene scene--paper px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHeader chapter="Scene 3" title="77 个社区出现了" subtitle="同一批 77 个节点，换一种排列方式，就能看见总量、增长、城乡区位、功能类型和规模结构。" align="left" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.34fr] lg:items-start">
          <Community77Morph />
          <aside className="space-y-4" aria-label="77家社区研究要点">
            {OBSERVATIONS.map(([label, value, text]) => <article key={label} className="paper-note paper-note--small"><p className="data-label text-duck-700">{label}</p><p className="mt-2 font-mono text-2xl text-duck-950">{value}</p><p className="mt-2 text-sm leading-6 text-duck-900/75">{text}</p></article>)}
            <div className="border-l-2 border-duck-300/60 pl-4 text-sm leading-7 text-slate"><p>这是研究样本，不是官方普查。</p><p className="mt-2 text-mist">港澳台、筹建中和已关闭社区未纳入。<EvidenceValue metricId="community-total-2025" display="查看口径" /></p></div>
          </aside>
        </div>
      </div>
    </section>
  )
}
