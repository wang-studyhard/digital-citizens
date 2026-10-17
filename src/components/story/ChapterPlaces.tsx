import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChartFrame } from '@/components/shared/ChartFrame'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { communityChartData } from '@/data/chartData'
import { ChapterIntro } from './ChapterIntro'

gsap.registerPlugin(ScrollTrigger)

const communityTotal = communityChartData.total[0].value
const before2025 = communityChartData.growth[1].value
const new2025 = communityChartData.growth[0].value
const percentage = (value: number) => `${(value / communityTotal * 100).toFixed(1)}%`

function CommunityIcon({ group }: { group: number }) {
  return <svg className={`community-units__dot community-units__dot--${group}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <g fill="none" stroke="var(--paper)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {group === 0 && <path d="m12 5-4.5 8h9L12 5Zm0 8v5M6.5 18h11" />}
      {group === 1 && <path d="m5 11 5-4 5 4v7H5v-7Zm10-5h4v12h-4M8 14h2m7-5v1" />}
      {group === 2 && <path d="M5 18V9h5v9m3 0V6h6v12M7 12h1m-1 3h1m9-6h-2m2 3h-2m2 3h-2M4 18h16" />}
    </g>
  </svg>
}

function CommunityTypePie() {
  const center = 160
  const radius = 146
  return <div className="community-type-chart">
    <svg className="community-type-pie" viewBox="0 0 320 320" aria-hidden="true" focusable="false">
      {communityChartData.function.map((item, index) => {
        const start = -90 + communityChartData.function.slice(0, index).reduce((sum, previous) => sum + previous.value * 3.6, 0)
        const end = start + item.value * 3.6
        const point = (angle: number, distance: number) => {
          const radians = angle * Math.PI / 180
          return [center + Math.cos(radians) * distance, center + Math.sin(radians) * distance]
        }
        const [x1, y1] = point(start, radius)
        const [x2, y2] = point(end, radius)
        const segment = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${item.value > 50 ? 1 : 0} 1 ${x2} ${y2} Z`
        return <g className={`community-type-pie__segment community-type-pie__segment--${index}`} key={item.id}>
          <path d={segment} />
        </g>
      })}
    </svg>
    <ul className="community-type-key" aria-label="77家研究样本社区的功能类型占比">
      {communityChartData.function.map((item, index) => <li key={item.id}>
        <span className={`community-type-key__swatch community-type-key__swatch--${index}`} aria-hidden="true" />
        <span>{item.label}</span>
        <strong><EvidenceValue metricId={item.id} showSource={false} /></strong>
      </li>)}
    </ul>
  </div>
}

export function CommunityLocations() {
  const rootRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const dots = rootRef.current!.querySelector<HTMLElement>('.community-units__dots')!
      const icons = [...dots.querySelectorAll<SVGSVGElement>('.community-units__dot')]
      const bounds = dots.getBoundingClientRect()
      const positions = icons.map((icon, index) => {
        const rect = icon.getBoundingClientRect()
        return {
          x: bounds.left + (index % 11 + 0.5) * bounds.width / 11 - rect.left - rect.width / 2,
          y: bounds.top + (Math.floor(index / 11) + 0.5) * bounds.height / 7 - rect.top - rect.height / 2,
        }
      })
      gsap.from(icons, {
        x: index => positions[index].x, y: index => positions[index].y,
        duration: 0.4, ease: 'power2.out', clearProps: 'transform',
        scrollTrigger: { trigger: dots, start: 'top 78%', once: true },
      })
    }, rootRef)
    return () => media.revert()
  }, [])
  return (
    <div ref={rootRef} id="scene2" className="community-passage">
      <p className="community-passage__lead">
        <span>77家社区，52家在乡村。</span>
        <span>短短几年里，一种新的承接空间开始出现。</span>
        <span>更值得注意的，不只是数量，而是它们落在哪里。</span>
        <span>我们在每三家社区样本中，就有两家来自农村。</span>
      </p>

      <ChartFrame id="community-units-chart" title="77家社区：区位与纳入年份" unit="" population="研究纳入的77家中国内地正常运营社区" scope="研究样本；非全国普查" period="截至2025年末" cutoff="2025-12-31" sourceRefs={[3]}>
        <div className="community-units">
          <div className="community-units__total"><strong>{communityTotal}</strong><span>家研究样本社区</span></div>
          <div className="community-units__location">
            <h4>城乡区位</h4>
            <p className="community-units__unit-note">一个图标代表一家研究样本社区</p>
            <div className="community-units__dots" aria-hidden="true">
              {communityChartData.location.map((group, groupIndex) => <div className={`community-units__group community-units__group--${groupIndex}`} key={group.id}>
                {Array.from({ length: group.value }, (_, index) => <CommunityIcon key={index} group={groupIndex} />)}
              </div>)}
            </div>
            <ul className="community-units__labels" aria-label="城乡区位：研究样本社区家数">
              {communityChartData.location.map((group, index) => <li key={group.id}><CommunityIcon group={index} /><span>{group.label}</span> <strong><EvidenceValue metricId={group.id} display={`${group.value} 家`} showSource={false} /></strong><span>{percentage(group.value)}</span></li>)}
            </ul>
          </div>
          <div className="community-units__growth">
            <h4>纳入年份</h4>
            <div className="community-units__bar" aria-hidden="true"><span style={{ width: percentage(before2025) }} /><span style={{ width: percentage(new2025) }} /></div>
            <div className="community-units__growth-labels"><span>此前纳入 <strong>{before2025} 家</strong> · {percentage(before2025)}</span><span>2025年新增 <strong><EvidenceValue metricId={communityChartData.growth[0].id} display={`${new2025} 家`} showSource={false} /></strong> · {percentage(new2025)}</span></div>
          </div>
        </div>
      </ChartFrame>
    </div>
  )
}

export function ChapterPlaces() {
  return (
    <section id="scene3" className="story-subsection" aria-labelledby="scene3-title">
        <ChapterIntro id="scene3" title="这些社区长什么样" intro="它们很少是独立园区，更多是一栋房子、旧厂房、民宿，或村庄里重新被使用的小空间。" />

        <ChartFrame id="community-types-chart" title="四种社区类型" unit="" population="研究纳入的77家中国内地正常运营社区" scope="功能类型仅有聚合占比" period="截至2025年末" cutoff="" locator="[3]正文第61、66段与图3说明" sourceRefs={[3]} note={<>规模另按大小划分：中小型 <EvidenceValue metricId="community-small" showSource={false} />，大型 <EvidenceValue metricId="community-large" showSource={false} />。功能类型没有逐家记录。</>}>
          <CommunityTypePie />
        </ChartFrame>

        <p className="limits-rule limits-rule--chapter"><span>空间被重新打开，</span><strong>人</strong><span>开始进入。</span></p>
    </section>
  )
}
