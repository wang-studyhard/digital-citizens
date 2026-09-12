import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { EvidenceDrawer } from '@/components/shared/EvidenceDrawer'
import { FinaleNetwork } from './FinaleNetwork'
import { PolicyTimeline } from './PolicyTimeline'
import { TensionField } from './TensionField'

export function Chapter5Conclusion() {
  return (
    <>
      <section id="scene5" className="scene scene--ink px-6 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ChapterHeader chapter="Scene 5" title="地方怎样“接住”这些流动？" subtitle="政策先提供条件，社区再把条件变成相遇；最后还要看有没有具体项目与被报道的结果。" align="left" mode="dark" />
          <div className="mt-12"><PolicyTimeline /></div>
        </div>
      </section>

      <section className="scene scene--ink px-6 pb-20 md:pb-32">
        <div className="mx-auto max-w-6xl"><TensionField /></div>
      </section>

      <section className="scene scene--paper px-6 py-20 md:py-32">
        <div className="mx-auto max-w-6xl"><FinaleNetwork /><div className="mt-14 flex justify-center"><EvidenceDrawer /></div></div>
      </section>
    </>
  )
}
