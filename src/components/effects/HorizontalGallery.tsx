import { useRef, useLayoutEffect, useState, useCallback, useEffect, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import type { CommunityHub } from '@/types'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// HorizontalGallery · GSAP 水平画廊 · pin + scrub
//
// 标准 GSAP 水平滚动模式：
//   - pin 锁定 section，scrub 将垂直滚动映射到水平平移
//   - 无 overflow:hidden 锁，无手动 tween，无级联刷新风险
//   - 向下滚动 → 卡片向左滑；向上滚动 → 卡片向右滑 — 双向自然
//
// 触发时机：
//   start: 'top top' — section 顶部触及视口顶部时 pin 住
//   end: `+=${totalScroll}` — 虚拟滚动距离 = 水平可滑动总距离
//   scrub: 0.8 — 轻微平滑延迟，消除卡顿感
//
// 逐卡 opacity 曲线：
//   0.00 – 0.35  → opacity: 1      全亮区
//   0.35 – 1.50  → opacity: 1 → 0  ease-out 渐隐
//   1.50+        → opacity: 0      完全隐藏
// ============================================================

const CARD_WIDTH = 420
const CARD_GAP = 32
const CARD_STEP = CARD_WIDTH + CARD_GAP
const FADE_FULL = 0.35
const FADE_HIDDEN = 1.5

interface HorizontalGalleryProps {
  hubs: CommunityHub[]
}

export function HorizontalGallery({ hubs }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const stRef = useRef<ScrollTrigger | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // ---- 窗口 resize → 刷新 ScrollTrigger 测量 ----
  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ---- GSAP ScrollTrigger: pin + scrub ----
  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const n = hubs.length

    const raf = requestAnimationFrame(() => {
      const totalScroll = track.scrollWidth - window.innerWidth
      if (totalScroll <= 0) return

      // ---- 视觉更新 — 每帧由 scrub onUpdate 调用 ----
      const updateVisuals = (progress: number) => {
        const p = Math.max(0, Math.min(1, progress))

        // 水平平移（仅 transform，不触发重排）
        gsap.set(track, { x: -p * totalScroll })

        // 焦点卡片索引
        const centerX = p * totalScroll + window.innerWidth / 2
        const rawIdx = Math.round(centerX / CARD_STEP)
        const idx = Math.max(0, Math.min(n - 1, rawIdx))
        setActiveIndex((prev) => (prev === idx ? prev : idx))

        // 逐卡渐显 / 渐隐
        cardRefs.current.forEach((el, i) => {
          if (!el) return
          const normDist = Math.abs(i - (n - 1) * p)
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

      // ---- 初始状态 ----
      updateVisuals(0)

      // ==========================================================
      // ScrollTrigger: pin + scrub
      //
      // start: 'top top' →
      //   section 顶部接触视口顶部时开始 pin，scrub 从 progress=0 开始
      // end: `+=${totalScroll}` →
      //   虚拟滚动 totalScroll px 后结束 pin，progress 到达 1
      //   e.g. 总滑距 1800px → 用户向下再滚 1800px 完成整段画廊
      // scrub: 0.8 →
      //   播放头平滑跟随滚动位置，延迟 0.8s，消除抖动
      // refreshPriority: -1 →
      //   低于其他 ScrollTrigger 的刷新优先级，避免 pin 重算干扰
      // ==========================================================
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: true,
        scrub: 0.8,
        refreshPriority: -1,
        onUpdate: (self) => updateVisuals(self.progress),
      })

      stRef.current = st
    })

    return () => {
      cancelAnimationFrame(raf)
      stRef.current?.kill()
      stRef.current = null
    }
  }, [hubs.length])

  // ---- 点击进度点 → 滚动到对应卡片 ----
  const jumpToCard = useCallback(
    (index: number) => {
      const st = stRef.current
      if (!st) return

      const n = Math.max(1, hubs.length - 1)
      const targetProgress = index / n

      // 计算目标 scroll 位置:
      // st.start 是触发开始的 scrollY, st.end 是触发结束的 scrollY
      // progress 在 start..end 之间线性映射
      const startScroll = st.start
      const endScroll = st.end
      const targetScrollY = startScroll + targetProgress * (endScroll - startScroll)

      // 用原生 scrollTo 平滑滚动到目标位置
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
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

      {/* ======== 左右渐变遮罩 ======== */}
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
      {/* ---- 缩放 + 滤镜层 (React transition) ---- */}
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
