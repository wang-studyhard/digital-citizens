import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EvidenceTable } from '@/components/shared/EvidenceTable'
import { FigureSource } from '@/components/shared/FigureSource'
import { ageChartData, educationChartData, genderChartData, sampleFlowData, type ChartDatum } from '@/data/chartData'
import { ChapterIntro } from './ChapterIntro'

gsap.registerPlugin(ScrollTrigger)

const profiles = [
  { id: 'age', title: '出生年代', data: ageChartData, text: '90后占七成以上，80后与00后也在这组样本中。' },
  { id: 'education', title: '学历', data: educationChartData, text: '本科是最多的一组；硕士、博士与大专及以下，共同构成其余部分。' },
  { id: 'gender', title: '性别认同', data: genderChartData, text: '男性与女性的比例接近，另有受访者认同为非二元性别。' },
] as const
const colors = ['var(--chart-primary)', 'var(--chart-secondary)', 'var(--accent)', 'var(--chart-tertiary)']

function Composition({ data }: { data: readonly ChartDatum[] }) {
  return <div className="sample-composition">
    <div className="sample-composition__bar" aria-hidden="true">
      {data.map((item, index) => <span key={index} style={{ transform: `translateX(${data.slice(0, index).reduce((sum, group) => sum + group.value, 0)}%) scaleX(${item.value / 100})`, background: colors[index] }} />)}
    </div>
    <ul>{data.map((item, index) => <li key={item.id}><i style={{ background: colors[index] }} aria-hidden="true" /><span>{item.label}</span><strong data-evidence-id={item.id}>{item.value.toFixed(2)}%</strong></li>)}</ul>
  </div>
}

export function ChapterPeople() {
  const rootRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const current = profiles[active]

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const media = gsap.matchMedia()
    media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const steps = [...root.querySelectorAll<HTMLElement>('.sample-reading__step')]
      let previousReadingPosition: number | undefined
      const update = () => {
        const readingPosition = window.scrollY + window.innerHeight * 0.45
        const anchors = steps.map((step, index) => ({
          index,
          position: window.scrollY + (step.querySelector('h4')!.getBoundingClientRect().top + step.querySelector('p')!.getBoundingClientRect().bottom) / 2,
        }))
        // 正反滚动都等正文阅读块实际越线，刷新布局不提前切段。
        const previous = previousReadingPosition
        const candidates = previous === undefined ? anchors : anchors.filter(({ position }) =>
          previous < readingPosition
            ? position > previous && position <= readingPosition
            : position < previous && position >= readingPosition,
        )
        if (candidates.length) {
          const nearest = candidates.reduce((best, anchor) => Math.abs(anchor.position - readingPosition) < Math.abs(best.position - readingPosition) ? anchor : best)
          setActive(nearest.index)
        }
        previousReadingPosition = readingPosition
      }
      ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: update, onRefresh: () => {
        if (previousReadingPosition === undefined) update()
        else previousReadingPosition = window.scrollY + window.innerHeight * 0.45
      } })
      root.classList.add('sample-reading--enhanced')
      ScrollTrigger.refresh()
      const layoutObserver = new ResizeObserver(() => ScrollTrigger.refresh())
      layoutObserver.observe(root.closest('main') ?? root)
      update()
      return () => { layoutObserver.disconnect(); root.classList.remove('sample-reading--enhanced') }
    }, root)
    return () => media.revert()
  }, [])

  return <section ref={rootRef} id="scene6" className="story-subsection sample-reading" aria-labelledby="scene6-title" data-active-profile={current.id}>
    <ChapterIntro id="scene6" title="走近这282人" intro="出生年代、学历、性别认同，是观察这组样本的三个切面。" />
    <div className="sample-reading__source"><span>NCC社区渠道样本 · 比例（%）</span><FigureSource figure={{
      title: '282人样本画像', population: `${sampleFlowData.branches[0].value}名数字游民`, scope: 'NCC社区渠道样本内部比例', period: '2024年4月至5月', cutoff: '调查结束：2024年5月', locator: '[1]原始阅读器第9页（页脚08）：出生年代正文；第11页（页脚10）：学历与性别分布图',
      note: <p>三个维度来自同一组282名数字游民有效回答，仅有各维度聚合百分比，未提供逐人交叉记录。不能据此推算全国数字游民画像。图形使用报告原百分比，没有折算或构造个人记录。</p>,
      table: <EvidenceTable caption="282人样本画像完整数据" columns={[{ key: 'dimension', label: '维度' }, { key: 'label', label: '分类' }, { key: 'value', label: '样本内比例' }]} rows={profiles.flatMap((profile) => profile.data.map((item) => ({ id: item.id, cells: { dimension: profile.title, label: item.label, value: `${item.value.toFixed(2)}%` } })))} />,
    }} /></div>
    <div className="sample-reading__layout">
      <figure className="sample-reading__sticky" aria-labelledby="people-profile-title">
        <figcaption id="people-profile-title">{current.title}</figcaption>
        <Composition data={current.data} />
      </figure>
      <div className="sample-reading__steps">
        {profiles.map((profile) => <article key={profile.id} className="sample-reading__step" aria-labelledby={`people-${profile.id}-title`}>
          <h4 id={`people-${profile.id}-title`}>{profile.title}</h4>
          <p>{profile.text}</p>
          <div className="sample-reading__static"><Composition data={profile.data} /></div>
        </article>)}
      </div>
    </div>
    <p className="sample-reading__closing">接下来，回到人与地方一起做过的事情。</p>
  </section>
}
