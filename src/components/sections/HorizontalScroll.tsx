import { useRef, useLayoutEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimationFrame } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// HorizontalScroll · GSAP 水平卷轴 + 文本压力交互
// 在 Hero 与 Preamble 之间，纵向滚动驱动文字横向卷动
// 鼠标靠近文字时产生"水压"加重效果
// ============================================================

const LINES = [
  '数字江河之下',
  '千万中国青年正在流动',
  '他们叫「数字游民」',
  '与时代同频共振',
  '在城乡之间重塑工作的意义',
]

const MAX_DIST = 150 // 压力影响半径 (px)
const MAX_SCALE = 1.10
const MAX_WEIGHT = 900
const MIN_WEIGHT = 300

export function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([])
  const pointerRef = useRef({ x: -9999, y: -9999, active: false })

  // ---- GSAP ScrollTrigger ----
  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth + window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      refreshPriority: 1,
      onUpdate: (self) => {
        const p = self.progress
        gsap.set(track, {
          x: -p * (track.scrollWidth - window.innerWidth),
        })
        // 滚动进度 → 渐隐：进度 0→1，透明度 1→0.2
        track.style.setProperty('--hs-fade', p.toFixed(3))
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  // ---- 指针追踪 ----
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    pointerRef.current = { x: e.clientX, y: e.clientY, active: true }
  }, [])

  const handlePointerLeave = useCallback(() => {
    pointerRef.current = { x: -9999, y: -9999, active: false }
    // 重置所有 span
    spanRefs.current.forEach((el) => {
      if (!el) return
      el.style.fontWeight = ''
      el.style.transform = ''
      el.style.color = ''
    })
  }, [])

  // ---- 文本压力：rAF 中计算每个 chunk 与指针的距离 ----
  useAnimationFrame(() => {
    const { x: px, y: py, active } = pointerRef.current
    if (!active) return

    spanRefs.current.forEach((el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(px - cx, py - cy)

      if (dist > MAX_DIST) {
        el.style.fontWeight = ''
        el.style.transform = ''
        el.style.color = ''
        return
      }

      const t = 1 - dist / MAX_DIST // 0(远) → 1(近)
      const w = Math.round(MIN_WEIGHT + t * (MAX_WEIGHT - MIN_WEIGHT))
      const s = 1 + t * (MAX_SCALE - 1)

      el.style.fontWeight = String(w)
      el.style.transform = `scale(${s.toFixed(3)})`
      el.style.color = `rgb(${Math.round(185 + t * 60)},${Math.round(200 + t * 45)},${Math.round(190 + t * 50)})`
    })
  })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-duck-950"
      style={{ height: '100vh' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* 极淡背景光晕 */}
      <div className="absolute inset-0 bg-gradient-to-r from-duck-950 via-duck-900/30 to-duck-950 pointer-events-none" />

      {/* 水平滚动轨道 */}
      <div className="absolute inset-0 flex items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-8 md:gap-12 lg:gap-16 whitespace-nowrap px-[20vw] select-none"
          style={{ willChange: 'transform' }}
        >
          {LINES.map((text, i) => (
              <span
                key={i}
                ref={(el) => { spanRefs.current[i] = el }}
                className="text-[#b9c8be] text-[1.25rem] md:text-[2rem] lg:text-[2.5rem] font-serif tracking-[0.04em] shrink-0"
                style={{
                  fontWeight: 300,
                  opacity: 'calc(1 - var(--hs-fade, 0) * 0.8)',
                  textShadow:
                    '0 2px 8px rgba(0,0,0,0.15), 0 0 40px rgba(185,200,190,0.10)',
                  transition: 'none',
                  willChange: 'transform',
                }}
              >
                {text}
              </span>
            ))}
        </div>
      </div>

      {/* 底部渐变指示器 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-duck-950 to-transparent pointer-events-none" />
    </section>
  )
}
