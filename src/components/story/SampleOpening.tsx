import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EvidenceTable } from '@/components/shared/EvidenceTable'
import { FigureSource } from '@/components/shared/FigureSource'
import { sampleFlowData } from '@/data/chartData'
import { ChapterIntro } from './ChapterIntro'

gsap.registerPlugin(ScrollTrigger)

const nomads = sampleFlowData.branches[0]
const explorers = sampleFlowData.branches[1]
const units = Array.from({ length: sampleFlowData.valid.value }, (_, index) => {
  const isNomad = index < nomads.value
  const localIndex = isNomad ? index : index - nomads.value
  return {
    isNomad,
    x: (isNomad ? 50 : 400) + (localIndex % (isNomad ? 18 : 30)) * 13,
    y: 24 + Math.floor(localIndex / (isNomad ? 18 : 30)) * 13,
  }
})

export function SampleOpening() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const media = gsap.matchMedia()
    media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const dots = root.querySelectorAll<SVGCircleElement>('circle')
      const draw = (split: boolean) => {
        gsap.to(dots, {
          x: (index: number) => split ? 0 : 50 + (index % 42) * 18 - units[index].x,
          y: (index: number) => split ? 0 : 24 + Math.floor(index / 42) * 13 - units[index].y,
          opacity: (index: number) => split && !units[index].isNomad ? 0.3 : 1,
          duration: 0.4, ease: 'power2.out', overwrite: true,
        })
      }
      gsap.set(dots, {
        opacity: 1,
        x: (index: number) => 50 + (index % 42) * 18 - units[index].x + (index * 37 % 101) - 50,
        y: (index: number) => 24 + Math.floor(index / 42) * 13 - units[index].y + (index * 61 % 71) - 35,
      })
      ScrollTrigger.create({
        trigger: root.querySelector('.sample-opening__visual'), start: 'top 85%',
        onEnter: () => gsap.to(dots, {
          x: (index: number) => 50 + (index % 42) * 18 - units[index].x,
          y: (index: number) => 24 + Math.floor(index / 42) * 13 - units[index].y,
          duration: 0.55, ease: 'power2.out', overwrite: true,
        }),
      })
      ScrollTrigger.create({
        trigger: root.querySelector('.sample-opening__visual'), start: 'top 35%',
        onEnter: () => draw(true), onLeaveBack: () => draw(false),
      })
      gsap.fromTo(root.querySelector('.subsection-heading > h3'), { y: 16 }, {
        y: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: root.querySelector('.subsection-heading > h3'), start: 'top 90%', once: true },
      })
      return () => { gsap.killTweensOf(dots) }
    }, root)
    return () => media.revert()
  }, [])

  return <section ref={rootRef} id="scene5" className="sample-opening" aria-labelledby="scene5-title">
    <p className="sample-opening__bridge">从安吉、黟县的停留现场，转向另一项 NCC 社区渠道调查。</p>
    <ChapterIntro id="scene5" title="这 798 份有效问卷，能告诉我们什么？" intro="接下来，走近其中282名数字游民。" visualIntro={<figure id="sample-flow-chart" aria-labelledby="sample-flow-chart-title">
      <div className="sample-opening__total"><h3 id="sample-flow-chart-title"><strong>{sampleFlowData.valid.value}</strong> 份有效问卷</h3><span>每个点代表1份问卷</span></div>
      <div className="sample-opening__visual">
        <svg viewBox="0 0 850 270" aria-hidden="true" focusable="false">
          {units.map((unit, index) => <circle key={index} data-branch={unit.isNomad ? 'nomad' : 'explorer'} cx={unit.x} cy={unit.y} r="3.4" fill={unit.isNomad ? 'var(--accent)' : 'var(--chart-primary)'} />)}
        </svg>
      </div>
      <div className="sample-opening__branches">
        <p><strong>{nomads.value}</strong><span>数字游民</span></p>
        <p><strong>{explorers.value}</strong><span>探索者</span></p>
      </div>
      <figcaption className="sample-reading__source"><span>NCC社区渠道样本</span><FigureSource figure={{
        title: '问卷清洗与分组', population: 'NCC社区渠道问卷', scope: '社区渠道样本', period: '2024年4月至5月', cutoff: '调查结束：2024年5月', locator: '[1]公开预览p.04研究说明',
        note: <p>回收{sampleFlowData.received.value}份问卷，清洗后保留{sampleFlowData.valid.value}份，未保留{sampleFlowData.excluded.value}份（{sampleFlowData.received.value}－{sampleFlowData.valid.value}）。另有{sampleFlowData.interviews.value}名结构化访谈对象，属于独立定性材料，不作为有效问卷的第三分支。该调查与前面的安吉、黟县入住记录相互独立。</p>,
        table: <EvidenceTable caption="问卷清洗与分组完整数据" columns={[{ key: 'label', label: '阶段' }, { key: 'value', label: '数量' }, { key: 'unit', label: '单位' }]} rows={[sampleFlowData.received, sampleFlowData.valid, sampleFlowData.excluded, ...sampleFlowData.branches, sampleFlowData.interviews].map((item) => ({ id: item.id, cells: { label: item.label, value: item.value, unit: item.unit } }))} />,
      }} /></figcaption>
    </figure>} />
  </section>
}
