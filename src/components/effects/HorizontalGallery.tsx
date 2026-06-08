import { useRef, useLayoutEffect, useState, useCallback, useEffect, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import type { CommunityHub } from '@/types'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// HorizontalGallery · GSAP 水平画廊 · scroll-lock + tween
// 纵向滚动触发 → overflow:hidden 锁定滚动 → 播放横向动画 → 解锁
//
// 架构:
//   ScrollTrigger(start:'top center' refreshPriority:-1) 检测进入
//   onEnter: overflow:hidden(on <html>) → tween 0→1 (1.6s) → 解锁+refresh
//   onEnterBack: overflow:hidden(on <html>) → tween 1→0 (1.6s) → 解锁+refresh
//   无 pin / scrub — overflow:hidden 不改变文档高度，避免 ScrollTrigger 级联刷新
//   地图(区块A)和 DataTable(区块C) 通过自然滚动进出视口，永不隐藏
//
// 为什么 overflow:hidden 而非 position:fixed？
//   position:fixed → body 脱离文档流 → document 高度→0 → resize 事件
//   → ScrollTrigger.refresh() → 所有 pin 触发器在 scrollY=0 时重算
//   → 页面"跳回开头" → onEnterBack → lock 循环
//
// 逐卡 opacity 曲线（距离视口中心的"卡片步数"）：
//   0.00 – 0.35  → opacity: 1      全亮区
//   0.35 – 1.50  → opacity: 1 → 0  ease-out 渐隐
//   1.50+        → opacity: 0      完全隐藏
// ============================================================

const CARD_WIDTH = 420
const CARD_GAP = 32
const CARD_STEP = CARD_WIDTH + CARD_GAP
const FADE_FULL = 0.35
const FADE_HIDDEN = 1.5
const ANIM_DURATION = 1.6

interface HorizontalGalleryProps {
  hubs: CommunityHub[]
}

export function HorizontalGallery({ hubs }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const stRef = useRef<ScrollTrigger | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const progressObjRef = useRef({ value: 0 })
  const isAnimatingRef = useRef(false)
  const totalScrollRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  // ---- 窗口 resize → 刷新 ScrollTrigger 测量 ----
  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ---- GSAP ScrollTrigger: 检测进入 → 锁定滚动 → 播放动画 → 解锁 ----
  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // 用于 effect 卸载时执行 rAF 内部清理
    let innerCleanup: (() => void) | null = null

    const raf = requestAnimationFrame(() => {
      const totalScroll = track.scrollWidth - window.innerWidth
      totalScrollRef.current = totalScroll
      if (totalScroll <= 0) return

      // ==========================================================
      // 视觉更新 — 每帧由 tween onUpdate 调用
      // 仅使用 gsap.set(x) 做 transform，绝不修改 width/height/top/left
      // 避免触发布局重排 → ScrollTrigger.refresh 死循环
      // ==========================================================
      const updateVisuals = (p: number) => {
        const progress = Math.max(0, Math.min(1, p))
        progressObjRef.current.value = progress

        gsap.set(track, { x: -progress * totalScroll })

        // 焦点卡片索引
        const centerX = progress * totalScroll + window.innerWidth / 2
        const rawIdx = Math.round(centerX / CARD_STEP)
        const idx = Math.max(0, Math.min(hubs.length - 1, rawIdx))
        setActiveIndex((prev) => (prev === idx ? prev : idx))

        // 逐卡渐显 / 渐隐
        const n = hubs.length
        cardRefs.current.forEach((el, i) => {
          if (!el) return
          const normDist = Math.abs(i - (n - 1) * progress)
          let opacity: number
          if (normDist <= FADE_FULL) {
            opacity = 1
          } else if (normDist >= FADE_HIDDEN) {
            opacity = 0
          } else {
            const t = (normDist - FADE_FULL) / (FADE_HIDDEN - FADE_FULL)
            opacity = 1 - t * t
          }
          gsap.set(el, { opacity })
        })
      }

      // ==========================================================
      // Scroll lock — overflow:hidden 方案
      //
      // 为什么不用 position:fixed？
      //   body{position:fixed} → body 脱离文档流 → document 高度≈0
      //   → 浏览器触发 resize → ScrollTrigger.refresh() 自动执行
      //   → 所有 pin/scrub 触发器重新计算（此时 scrollY≈0）
      //   → 页面"跳回开头" → onEnterBack 连锁触发 → 死循环
      //
      // overflow:hidden 不改变文档高度，ScrollTrigger 不会自动刷新，
      // 且 window.scrollY 在主流浏览器中得以保留。
      // ==========================================================
      const getScrollbarWidth = () =>
        window.innerWidth - document.documentElement.clientWidth

      let savedScrollY = 0

      const lockBodyScroll = () => {
        savedScrollY = window.scrollY
        // 必须在修改 overflow 之前读取 scrollbar 宽度
        // overflow:hidden 会使滚动条消失 → clientWidth 变大 → 读数失真
        const sbw = getScrollbarWidth()
        document.documentElement.style.overflow = 'hidden'
        if (sbw > 0) {
          document.documentElement.style.paddingRight = `${sbw}px`
        }
        // 兜底：部分浏览器可能在 overflow 切换时丢失滚动位置
        window.scrollTo(0, savedScrollY)
      }

      const unlockBodyScroll = () => {
        document.documentElement.style.overflow = ''
        document.documentElement.style.paddingRight = ''
        window.scrollTo(0, savedScrollY)
        // 异步刷新 ScrollTrigger，让布局先恢复再重新测量
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      }

      // ==========================================================
      // 正向播放: 0 → 1
      // ==========================================================
      const playForward = () => {
        if (isAnimatingRef.current) return
        isAnimatingRef.current = true
        lockBodyScroll()

        tweenRef.current?.kill()
        tweenRef.current = gsap.to(progressObjRef.current, {
          value: 1,
          duration: ANIM_DURATION,
          ease: 'power2.inOut',
          onUpdate: () => updateVisuals(progressObjRef.current.value),
          onComplete: () => {
            // 先解锁再延迟释放 isAnimating — 确保 unlock 可能引发的
            // 异步 scroll 事件被 isAnimating 挡住，避免 onEnter 立即重新触发
            unlockBodyScroll()
            setTimeout(() => {
              isAnimatingRef.current = false
            }, 120)
          },
        })
      }

      // ==========================================================
      // 逆向播放: 1 → 0
      // ==========================================================
      const playReverse = () => {
        if (isAnimatingRef.current) return
        isAnimatingRef.current = true
        lockBodyScroll()

        tweenRef.current?.kill()
        tweenRef.current = gsap.to(progressObjRef.current, {
          value: 0,
          duration: ANIM_DURATION,
          ease: 'power2.inOut',
          onUpdate: () => updateVisuals(progressObjRef.current.value),
          onComplete: () => {
            unlockBodyScroll()
            setTimeout(() => {
              isAnimatingRef.current = false
            }, 120)
          },
        })
      }

      // ==========================================================
      // ScrollTrigger — 仅检测进入/回入，不 pin/scrub
      // start: 'top center' → gallery 顶部到视口中央触发 (向下)
      // end: 'bottom center' → gallery 底部到视口中央触发 onEnterBack (向上)
      // refreshPriority: -1 → 在其他 pin 触发器之后刷新，避免级联
      // ==========================================================
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: playForward,
        onEnterBack: playReverse,
        refreshPriority: -1,
      })

      stRef.current = st

      // ---- 动画期间拦截所有滚动事件 ----
      const handleWheel = (e: WheelEvent) => {
        if (isAnimatingRef.current) e.preventDefault()
      }
      const handleTouchMove = (e: TouchEvent) => {
        if (isAnimatingRef.current) e.preventDefault()
      }
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          isAnimatingRef.current &&
          ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown'].includes(
            e.key,
          )
        ) {
          e.preventDefault()
        }
      }

      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      })
      window.addEventListener('keydown', handleKeyDown)

      // ==========================================================
      // 内层清理 — 赋值给 outer 变量，确保 effect 卸载时执行
      // ==========================================================
      innerCleanup = () => {
        st.kill()
        stRef.current = null
        tweenRef.current?.kill()
        tweenRef.current = null
        unlockBodyScroll()
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('keydown', handleKeyDown)
      }
    })

    // ============================================================
    // effect 清理：如果 rAF 还没执行就取消；如果已执行则调用内层清理
    // ============================================================
    return () => {
      cancelAnimationFrame(raf)
      innerCleanup?.()
    }
  }, [hubs.length])

  // ---- 点击进度点 → 跳转到对应卡片 ----
  const jumpToCard = useCallback(
    (index: number) => {
      if (isAnimatingRef.current) return

      const targetValue = index / Math.max(1, hubs.length - 1)
      const totalScroll = totalScrollRef.current

      tweenRef.current?.kill()
      tweenRef.current = gsap.to(progressObjRef.current, {
        value: targetValue,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          const p = progressObjRef.current.value
          if (totalScroll <= 0) return
          gsap.set(trackRef.current, { x: -p * totalScroll })

          const n = hubs.length
          cardRefs.current.forEach((el, i) => {
            if (!el) return
            const normDist = Math.abs(i - (n - 1) * p)
            let opacity: number
            if (normDist <= FADE_FULL) opacity = 1
            else if (normDist >= FADE_HIDDEN) opacity = 0
            else {
              const t = (normDist - FADE_FULL) / (FADE_HIDDEN - FADE_FULL)
              opacity = 1 - t * t
            }
            gsap.set(el, { opacity })
          })
        },
      })
      setActiveIndex(index)
    },
    [hubs.length],
  )

  // ============================================================
  // 渲染
  // ============================================================
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-duck-950"
      style={{ height: '100vh' }}
    >
      {/* ======== 标题区（固定在 pinned 容器顶部） ======== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 z-20 pt-10 md:pt-14 pointer-events-none"
      >
        <h3 className="text-2xl md:text-[1.75rem] font-serif text-charcoal text-center mb-2 tracking-wide">
          五大标志性社区据点
        </h3>
        <p className="text-center text-slate text-sm">
          从废弃厂房到云端办公室——中国数字游民社区的空间革命
        </p>
      </motion.div>

      {/* ======== 水平滚动轨道 ======== */}
      <div className="absolute inset-0 flex items-center">
        <div
          ref={trackRef}
          className="flex items-stretch"
          style={{
            gap: CARD_GAP,
            paddingLeft: `calc(50vw - ${CARD_WIDTH / 2}px)`,
            paddingRight: `calc(50vw - ${CARD_WIDTH / 2}px)`,
            willChange: 'transform',
          }}
        >
          {hubs.map((hub, i) => (
            <GalleryCard
              key={hub.shortName}
              hub={hub}
              isActive={i === activeIndex}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
            />
          ))}
        </div>
      </div>

      {/* ======== 进度指示器（底部圆点） ======== */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {hubs.map((hub, i) => (
          <button
            key={hub.shortName}
            onClick={() => jumpToCard(i)}
            className="w-2.5 h-2.5 rounded-full border-0 outline-none cursor-pointer transition-all duration-400"
            style={{
              background:
                i === activeIndex ? '#b9c8be' : 'rgba(168,197,195,0.15)',
              transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
              boxShadow:
                i === activeIndex
                  ? '0 0 14px rgba(185,200,190,0.35)'
                  : 'none',
            }}
            aria-label={`查看 ${hub.shortName}`}
            title={hub.name}
          />
        ))}
      </div>

      {/* ======== 左右渐变遮罩（暗示还有更多内容） ======== */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-duck-950 via-duck-950/70 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-duck-950/70 to-duck-950 pointer-events-none z-10" />
    </section>
  )
}

// ============================================================
// GalleryCard · 单张画廊卡片
// opacity 由父组件通过 gsap.set 逐帧控制 (cardRefs)
// scale / filter / border / shadow 由 isActive 驱动 (React transition)
// ============================================================
const GalleryCard = forwardRef<
  HTMLDivElement,
  { hub: CommunityHub; isActive: boolean }
>(function GalleryCard({ hub, isActive }, ref) {
  return (
    <div
      ref={ref}
      className="shrink-0 select-none"
      style={{
        width: CARD_WIDTH,
        willChange: 'transform, opacity',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ---- 缩放 + 滤镜层 (React transition, 仅在 activeIndex 变化时触发) ---- */}
      <div
        className="transition-all duration-500 ease-out flex-1 flex flex-col"
        style={{
          transform: isActive ? 'scale(1.04)' : 'scale(0.90)',
          filter: isActive
            ? 'brightness(1.05) saturate(1.08)'
            : 'brightness(0.62) saturate(0.55)',
        }}
      >
        <div
          className="rounded-2xl overflow-hidden border transition-all duration-500 flex-1 flex flex-col"
          style={{
            background: 'rgba(26,45,46,0.78)',
            borderColor: isActive
              ? 'rgba(185,200,190,0.22)'
              : 'rgba(168,197,195,0.05)',
            boxShadow: isActive
              ? '0 0 48px rgba(185,200,190,0.07), 0 4px 28px rgba(0,0,0,0.28)'
              : 'none',
          }}
        >
          {/* ---- 照片区 ---- */}
          <div className="relative h-52 overflow-hidden shrink-0">
            {hub.photoUrl ? (
              <img
                src={hub.photoUrl}
                alt={hub.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-duck-900/60">
                <span className="text-duck-300/25 font-serif text-6xl">
                  {hub.shortName[0]}
                </span>
              </div>
            )}

            {/* 底部渐变 — 衔接内容区 */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,45,46,0.88)] via-transparent to-transparent" />

            {/* 地点标签 */}
            <div
              className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-sans backdrop-blur-sm"
              style={{
                background: 'rgba(26,45,46,0.78)',
                borderColor: 'rgba(168,197,195,0.10)',
                color: '#a8c5c3',
              }}
            >
              <span className="text-[10px]">📍</span>
              {hub.location}
            </div>
          </div>

          {/* ---- 内容区 ---- */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-baseline gap-2 mb-1">
              <h4 className="font-serif text-xl text-charcoal tracking-wide">
                {hub.shortName}
              </h4>
              <span className="text-xs text-duck-300/35 font-sans">
                创于 {hub.founded}
              </span>
            </div>
            <p className="text-xs text-duck-300/40 font-sans mb-3">
              {hub.name}
            </p>

            {/* ---- 数据指标 ---- */}
            <div className="flex flex-wrap gap-2 mb-4 shrink-0">
              {hub.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="px-2.5 py-1.5 rounded-lg border"
                  style={{
                    background: 'rgba(26,45,46,0.65)',
                    borderColor: 'rgba(168,197,195,0.05)',
                  }}
                >
                  <span className="text-[10px] text-duck-300/40 block leading-none mb-0.5">
                    {stat.label}
                  </span>
                  <span className="text-sm font-medium text-[#c8d9d6] font-mono tabular-nums">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* ---- 描述 ---- */}
            <p className="text-sm text-slate leading-relaxed line-clamp-3 mt-auto">
              {hub.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})
