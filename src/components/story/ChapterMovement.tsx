import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DataSource } from '@/components/shared/DataSource'
import { ChapterIntro } from './ChapterIntro'

gsap.registerPlugin(ScrollTrigger)

export function ChapterMovement() {
  const rootRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const path = rootRef.current!.querySelector('.movement-sequence__path')!
      gsap.from(path.querySelector('.movement-sequence__rail'), {
        scaleY: 0, transformOrigin: 'top', ease: 'none',
        scrollTrigger: { trigger: path, start: 'top 60%', end: 'bottom 55%', scrub: true },
      })
    }, rootRef)
    return () => media.revert()
  }, [])
  return (
    <section ref={rootRef} id="scene11" className="story-subsection" aria-labelledby="scene11-title">
        <ChapterIntro id="scene11" title="自由移动之后" intro="工作可以跨过行政边界，社会保障和公共服务仍然需要制度去接住具体的人。" />

        <div className="movement-sequence">
          <div className="movement-sequence__intro">
            <p>村庄首先是当地居民长期生活的地方。</p>
            <p>流动带来机会，也带来需要共同回答的问题。</p>
          </div>
          <div className="movement-sequence__path">
          <span className="movement-sequence__rail" aria-hidden="true" />
          <ol className="movement-sequence__questions">
            <li><span>当新的青年、项目和资本进入以后，<strong>谁能够参与新的机会？</strong></span></li>
            <li>收益最终流向谁？</li>
            <li>新的生活方式怎样与原来的日常相处？</li>
            <li>流动中的劳动者，又怎样获得公共服务和社会保障？</li>
          </ol>
          </div>
        </div>

        <p className="movement-source">《人民论坛》从城乡关系、劳动形态和社区治理观察数字游民社区，提示区域不均衡，主张可持续、包容、共生。<DataSource refNumber={3} /></p>
    </section>
  )
}
