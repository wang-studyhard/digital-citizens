import { useRef, useLayoutEffect, useState, useCallback, useEffect, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import type { CommunityHub } from '@/types'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// HorizontalGallery · GSAP 水平画廊 + 滚动劫持
// 纵向滚动驱动卡片横向平移 · 中心焦点高亮 · 逐卡渐显渐隐
// 仅用于第三章"五大标志性社区据点"区块
//
// 设计思路参照 HorizontalScroll.tsx — pin + scrub + onUpdate
// 滚动至此区域时劫持纵向滚动，转为横向平移卡片组，
// 全部卡片展示完毕后解锁纵向滚动继续向下。
//
// 逐卡 opacity 曲线（距离视口中心的"卡片步数"）：
//   0.00 – 0.35  → opacity: 1      全亮区
//   0.35 – 1.50  → opacity: 1 → 0  ease-out 渐隐
//   1.50+        → opacity: 0      完全隐藏
// ============================================================

const CARD_WIDTH = 420
const CARD_GAP = 32 // gap-8
const CARD_STEP = CARD_WIDTH + CARD_GAP // 卡片中心距 452px

// 逐卡 opacity 曲线参数 (单位: card-steps)
const FADE_FULL = 0.35 // 距中心 ≤0.35 步 → 全亮
const FADE_HIDDEN = 1.5 // 距中心 ≥1.5 步 → 全隐
// 中间区间使用 easeOutQuad: opacity = 1 - t²

interface HorizontalGalleryProps {
  hubs: CommunityHub[]
}

export function HorizontalGallery({ hubs }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]) // 逐卡 DOM 引用 → gsap.set opacity
  const stRef = useRef<ScrollTrigger | null>(null)
  const isExitedRef = useRef(false) // 标记画廊是否已完全滚出 (section 已隐藏)
  const isLockedRef = useRef(false) // 纵向滚动锁定状态 → wheel/touch handler 判断依据
  const progressRef = useRef(0)    // 当前横向进度 [0, 1] → 闭包内读写避免 stale state
  const totalScrollRef = useRef(0) // 横向可滚动总距离 → resize 后更新
  const [activeIndex, setActiveIndex] = useState(0)

  // ---- GSAP ScrollTrigger: pin + 手动 wheel/touch 驱动横向卷轴 ----
  // 核心改动 — 纵向滚动锁定 + 事件劫持:
  //   进入画廊 → overflow:hidden 锁定纵向滚动 → wheel/touchmove 转为横向进度
  //   横向到达 0 或 1 → 解锁、ScrollTrigger 自然退出
  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const raf = requestAnimationFrame(() => {
      const totalScroll = track.scrollWidth - window.innerWidth
      totalScrollRef.current = totalScroll

      if (totalScroll <= 0) return

      // ==========================================================
      // 滚动锁定工具
      // ==========================================================
      const lockScroll = () => {
        if (isLockedRef.current) return
        isLockedRef.current = true
        // 补偿滚动条宽度，避免 layout shift
        const scrollbarW = window.innerWidth - document.documentElement.clientWidth
        document.documentElement.style.overflow = 'hidden'
        if (scrollbarW > 0) {
          document.body.style.paddingRight = `${scrollbarW}px`
        }
      }

      const unlockScroll = (targetY?: number) => {
        if (!isLockedRef.current) return
        isLockedRef.current = false
        document.documentElement.style.overflow = ''
        document.body.style.paddingRight = ''
        if (targetY !== undefined) {
          window.scrollTo(0, targetY)
        }
      }

      // ==========================================================
      // 统一视觉更新 (替代原 onUpdate)
      // ==========================================================
      const updateVisuals = (p: number) => {
        const progress = Math.max(0, Math.min(1, p))
        progressRef.current = progress

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
      // 退出画廊 (向下)
      // ==========================================================
      const exitDown = () => {
        cardRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 0 })
        })
        if (section) {
          gsap.set(section, { opacity: 0, pointerEvents: 'none' })
        }
        isExitedRef.current = true
      }

      // ==========================================================
      // Wheel 事件 — 劫持纵向滚动 → 横向进度
      // ==========================================================
      const handleWheel = (e: WheelEvent) => {
        if (!isLockedRef.current) return
        e.preventDefault()

        // 灵敏度: ~400-600 像素 wheel delta = 完整横向滚动
        const progressDelta = e.deltaY / Math.max(400, totalScroll * 0.9)
        const newProgress = progressRef.current + progressDelta

        if (newProgress >= 1 && e.deltaY > 0) {
          updateVisuals(1)
          exitDown()
          unlockScroll(st.end + 1)
          return
        }
        if (newProgress <= 0 && e.deltaY < 0) {
          updateVisuals(0)
          unlockScroll(st.start - 1)
          return
        }
        updateVisuals(newProgress)
      }

      // ==========================================================
      // Touch 事件 — 移动端滑动 → 横向进度
      // ==========================================================
      let touchStartY = 0
      const handleTouchStart = (e: TouchEvent) => {
        if (!isLockedRef.current) return
        if (e.touches.length === 1) {
          touchStartY = e.touches[0].clientY
        }
      }
      const handleTouchMove = (e: TouchEvent) => {
        if (!isLockedRef.current) return
        if (e.touches.length !== 1) return
        e.preventDefault()

        const deltaY = touchStartY - e.touches[0].clientY
        touchStartY = e.touches[0].clientY

        const progressDelta = deltaY / Math.max(400, totalScroll * 0.9)
        const newProgress = progressRef.current + progressDelta

        if (newProgress >= 1 && deltaY > 0) {
          updateVisuals(1)
          exitDown()
          unlockScroll(st.end + 1)
          return
        }
        if (newProgress <= 0 && deltaY < 0) {
          updateVisuals(0)
          unlockScroll(st.start - 1)
          return
        }
        updateVisuals(newProgress)
      }

      // ==========================================================
      // ScrollTrigger — 仅负责 pin，动画由 wheel/touch 手动驱动
      // ==========================================================
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(totalScroll, window.innerHeight * 0.5)}`,
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          lockScroll()
          progressRef.current = 0
          updateVisuals(0)
        },
        onLeave: () => {
          // 程序化 scrollTo 触发 → 确保解锁
          if (isLockedRef.current) {
            unlockScroll(st.end + 1)
          }
        },
        onEnterBack: () => {
          // 从下方回滚进入画廊
          if (section) {
            gsap.set(section, { opacity: 1, pointerEvents: 'auto' })
          }
          isExitedRef.current = false
          lockScroll()
          progressRef.current = 1
          updateVisuals(1)
        },
        onLeaveBack: () => {
          // 向上完全退出画廊
          if (isLockedRef.current) {
            updateVisuals(0)
            unlockScroll(st.start - 1)
          }
        },
      })

      stRef.current = st

      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: false })

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
        stRef.current?.kill()
        stRef.current = null
      }
    })
  }, [hubs.length])

  // ---- 窗口 resize → 刷新 ScrollTrigger 测量 ----
  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ---- 点击进度点 → 直接更新视觉 (无需 scrollTo，滚动已锁定) ----
  const jumpToCard = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return

      const totalScroll = totalScrollRef.current
      if (totalScroll <= 0) return

      const targetProgress = index / Math.max(1, hubs.length - 1)
      progressRef.current = targetProgress

      // 直接更新 track 位移
      gsap.set(track, { x: -targetProgress * totalScroll })
      setActiveIndex(index)

      // 同步更新逐卡 opacity (保持与 updateVisuals 一致的曲线)
      const n = hubs.length
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const normDist = Math.abs(i - (n - 1) * targetProgress)
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
const GalleryCard = forwardRef<HTMLDivElement, { hub: CommunityHub; isActive: boolean }>(
  function GalleryCard({ hub, isActive }, ref) {
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
  },
)
