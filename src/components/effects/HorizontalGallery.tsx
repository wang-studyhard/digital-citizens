import { useRef, useState } from 'react'
import type { CommunityHub } from '@/types'

interface HorizontalGalleryProps {
  hubs: CommunityHub[]
}

/**
 * 资料卡片横向浏览。使用原生 overflow + scroll-snap，避免把页面滚动锁进
 * 一段固定的 GSAP 轨道；手机可直接横向滑动，键盘也能按按钮切换。
 */
export function HorizontalGallery({ hubs }: HorizontalGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const selectCard = (index: number) => {
    const track = trackRef.current
    const card = track?.children[index] as HTMLElement | undefined
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    setActiveIndex(index)
  }

  if (hubs.length === 0) return null

  return (
    <section className="relative mt-12" aria-labelledby="community-gallery-title">
      <div className="mb-5">
        <h3 id="community-gallery-title" className="text-2xl font-serif text-charcoal">
          公开报道中的社区案例
        </h3>
        <p className="mt-1 text-sm text-slate">卡片记录可核对的行动，不对社区规模或热度排名。</p>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scroll-smooth"
        tabIndex={0}
        aria-label="社区案例横向列表"
      >
        {hubs.map((hub) => (
          <article
            key={hub.shortName}
            className="w-[min(86vw,27rem)] shrink-0 snap-center rounded-2xl border border-duck-200/15 bg-duck-900/60 p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="text-xl font-serif text-charcoal">{hub.shortName}</h4>
              <span className="text-xs text-duck-300/75">{hub.location}</span>
            </div>
            <p className="mt-1 text-xs text-mist">{hub.name} · 公开记录 {hub.founded} 年起</p>
            <p className="mt-4 text-sm leading-relaxed text-slate">{hub.description}</p>
            <dl className="mt-5 grid grid-cols-2 gap-2">
              {hub.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-duck-950/60 p-2">
                  <dt className="text-xs text-mist">{stat.label}</dt>
                  <dd className="mt-1 text-sm text-duck-200">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-mist">左右滑动查看更多案例</p>
        <div className="flex gap-2" aria-label="选择案例">
          {hubs.map((hub, index) => (
            <button
              key={hub.shortName}
              type="button"
              onClick={() => selectCard(index)}
              aria-label={`查看${hub.shortName}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-duck-300 ${
                index === activeIndex ? 'bg-duck-200' : 'bg-duck-300/30 hover:bg-duck-300/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
