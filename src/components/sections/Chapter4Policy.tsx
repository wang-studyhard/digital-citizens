import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { AnjiNetwork } from './AnjiNetwork'
import { HuangshanScrollytelling } from './HuangshanScrollytelling'

export function Chapter4Policy() {
  return (
    <section id="scene4" className="scene scene--cases px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHeader chapter="Scene 4" title="抵达以后，发生了什么？" subtitle="两个地方案例都把“数字游民”放回具体行动：一个从社区进入青年入乡网络，一个让旅居者开始接近地方任务。" align="left" mode="dark" />
        <div className="mt-12"><AnjiNetwork /></div>
        <div className="mt-12"><HuangshanScrollytelling /></div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-7 text-slate">两则报道都能证明“发生过什么行动”，但不能单独证明长期就业、稳定增收或可复制的全国模式。真正的判断要继续看地方怎样接住这些流动。</p>
      </div>
    </section>
  )
}
