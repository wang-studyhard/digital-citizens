import { useRef, useLayoutEffect, useCallback, memo, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import type { CommunityHub } from '@/types'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// HorizontalGallery · GSAP 水平画廊 · pin + scrub
//
// 设计原则：
//   1. 所有视觉状态（opacity / scale / filter / border / shadow）
//      均由 GSAP 直接操作 DOM，React 不参与。避免 React
//      reconciliation 覆盖 GSAP 样式 → 卡片"消失"。
//   2. GalleryCard 使用 React.memo 阻止父组件重渲染时
//      重置 DOM 样式。
//   3. start: 'top bottom' — 画廊顶部触及视口底部才开始 pin。
//      确保地图（上方 120vh wrapper）完全滚出视口后横向动画
//      才启动，地图获得完整展示时间。
//   4. invalidateOnRefresh: false — 阻止 ScrollTrigger.refresh()
//      级联导致画廊意外重新进入 pin 状态（"重复播放"根因）。
//   5. hasCompletedRef + onLeave / onEnterBack 双重守卫 —
//      向下播放完毕后标记 completed=true，防止 refresh 级联
//      重新触发；向上回滚时重置，保证双向滚动正常。
//   6. 始终 ≥3 张卡片可见（opacity ≥ 0.55），避免用户
//      感觉内容"凭空消失"。
// ============================================================

const CARD_WIDTH = 420
const CARD_GAP = 32
const CARD_STEP = CARD_WIDTH + CARD_GAP

interface HorizontalGalleryProps {
  hubs: CommunityHub[]
}

export function HorizontalGallery({ hubs }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const hasCompletedRef = useRef(false) // 防重复：向下播放完毕后标记，onLeaveBack 重置

  // ---- 直接 DOM 操作的 ref 集合 (React 不参与动画循环) ----
  const cardOuterRefs = useRef<(HTMLDivElement | null)[]>([]) // 外层容器 (opacity)
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]) // 内层 (scale / filter)
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]) // 进度圆点
  const activeIdxRef = useRef(0)

  // ---- 初始样式（一次性设置，避免 JSX inline style 被 React 覆盖） ----
  useLayoutEffect(() => {
    const n = hubs.length
    cardOuterRefs.current.forEach((el, i) => {
      if (!el) return
      const dist = Math.abs(i)
      el.style.opacity = String(dist <= 1 ? 1 : dist === 2 ? 0.89 : dist === 3 ? 0.56 : 0.08)
    })
    cardInnerRefs.current.forEach((el, i) => {
      if (!el) return
      const dist = Math.abs(i)
      const focus = dist === 0 ? 1 : dist === 1 ? 0.42 : 0
      el.style.transform = `scale(${(0.9 + focus * 0.14).toFixed(3)})`
      el.style.filter = `brightness(${(0.62 + focus * 0.43).toFixed(2)}) saturate(${(0.55 + focus * 0.53).toFixed(2)})`
      el.style.borderColor = `rgba(185,200,190,${(0.05 + focus * 0.17).toFixed(2)})`
      el.style.boxShadow = focus > 0.3
        ? `0 0 ${Math.round(48 * focus)}px rgba(185,200,190,${(focus * 0.07).toFixed(2)}), 0 4px 28px rgba(0,0,0,0.28)`
        : 'none'
    })
  }, [hubs.length])

  // ================================================================
  // GSAP ScrollTrigger: pin + scrub
  // ================================================================
  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const n = hubs.length
    if (n === 0) return

    const raf = requestAnimationFrame(() => {
      const totalScroll = track.scrollWidth - window.innerWidth
      if (totalScroll <= 0) return

      // ---- 视觉更新 — 纯 DOM 操作，零 React state ----
      function updateVisuals(progress: number) {
        const p = Math.max(0, Math.min(1, progress))

        // 水平平移
        gsap.set(track, { x: -p * totalScroll })

        // 焦点卡片索引
        const idx = n > 1 ? Math.round(p * (n - 1)) : 0
        const activeIdx = Math.max(0, Math.min(n - 1, idx))

        // 仅在索引变化时更新 dots
        if (activeIdxRef.current !== activeIdx) {
          activeIdxRef.current = activeIdx
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return
            const isActive = i === activeIdx
            dot.style.background = isActive
              ? '#b9c8be'
              : 'rgba(168,197,195,0.15)'
            dot.style.transform = isActive ? 'scale(1.3)' : 'scale(1)'
            dot.style.boxShadow = isActive
              ? '0 0 14px rgba(185,200,190,0.35)'
              : 'none'
          })
        }

        // ---- 逐卡样式 ----
        cardOuterRefs.current.forEach((outerEl, i) => {
          if (!outerEl) return
          const innerEl = cardInnerRefs.current[i]

          // opacity: 始终保持 ≥3 张卡片可见
          const dist = Math.abs(i - activeIdx)
          let opacity: number
          if (dist <= 1) {
            opacity = 1
          } else if (dist >= 4) {
            opacity = 0.08 // 极淡幽灵态，不彻底消失
          } else {
            // dist=2 → t=1/3 → 0.889
            // dist=3 → t=2/3 → 0.556
            const t = (dist - 1) / 3
            opacity = 1 - t * t
          }
          outerEl.style.opacity = String(opacity)

          if (!innerEl) return

          // focus: 0(远离) → 1(焦点)
          const focus = dist === 0 ? 1 : dist === 1 ? 0.42 : dist === 2 ? 0.08 : 0
          const cardScale = 0.9 + focus * 0.14
          const brightness = 0.62 + focus * 0.43
          const saturate = 0.55 + focus * 0.53
          const borderAlpha = 0.05 + focus * 0.17

          innerEl.style.transform = `scale(${cardScale.toFixed(3)})`
          innerEl.style.filter = `brightness(${brightness.toFixed(2)}) saturate(${saturate.toFixed(2)})`
          innerEl.style.borderColor = `rgba(185,200,190,${borderAlpha.toFixed(2)})`
          innerEl.style.boxShadow =
            focus > 0.3
              ? `0 0 ${Math.round(48 * focus)}px rgba(185,200,190,${(focus * 0.07).toFixed(2)}), 0 4px 28px rgba(0,0,0,0.28)`
              : 'none'
        })
      }

      // 初始状态
      updateVisuals(0)

      // ScrollTrigger — pin+scrub 水平画廊
      //
      // start: 'top bottom' — 画廊顶部触及视口底部时才开始 pin。
      //   此时地图（上方 120vh wrapper）已完全滚出视口，
      //   确保地图获得完整展示时间后再启动横向动画。
      //
      // invalidateOnRefresh: false — 关键：阻止其他组件
      //   ScrollTrigger.refresh() 级联导致本触发器 end 重算 →
      //   意外重新进入 pin 状态（"重复播放"根因）。
      //   本触发器的滚动距离仅取决于 track 宽度，不受其他
      //   组件影响，因此关闭 invalidateOnRefresh 是安全的。
      //
      // hasCompletedRef 双重守卫：
      //   onLeave 标记向下播放完毕 → onUpdate 中检测
      //   progress < 0.01 时跳过（拦截 refresh 级联导致的
      //   虚假重新进入），onEnterBack（向上回滚）时重置，
      //   保证双向滚动正常。
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: `+=${totalScroll + window.innerHeight * 0.35}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        invalidateOnRefresh: false,
        fastScrollEnd: true,
        refreshPriority: -1,
        onLeave: () => {
          hasCompletedRef.current = true
        },
        onEnterBack: () => {
          hasCompletedRef.current = false
        },
        onUpdate: (self) => {
          // 防重复：如果向下播放已完成，且 progress 被拉回起点
          // （由外部 ScrollTrigger.refresh() 级联导致），跳过更新
          if (hasCompletedRef.current && self.progress < 0.01) return
          updateVisuals(self.progress)
        },
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
      const targetScrollY =
        st.start + targetProgress * (st.end - st.start)

      window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
    },
    [hubs.length],
  )

  // ================================================================
  // 渲染
  // ================================================================
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-duck-950"
      style={{ height: '100vh' }}
    >
      {/* ======== 标题区 ======== */}
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
              ref={(el) => {
                cardOuterRefs.current[i] = el
              }}
              innerRef={(el) => {
                cardInnerRefs.current[i] = el
              }}
            />
          ))}
        </div>
      </div>

      {/* ======== 进度指示器 ======== */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {hubs.map((hub, i) => (
          <button
            key={hub.shortName}
            ref={(el) => {
              dotRefs.current[i] = el
            }}
            onClick={() => jumpToCard(i)}
            className="w-2.5 h-2.5 rounded-full border-0 outline-none cursor-pointer transition-none"
            style={{
              background: 'rgba(168,197,195,0.15)',
              transform: 'scale(1)',
              boxShadow: 'none',
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

// ================================================================
// GalleryCard · React.memo 阻止父组件重渲染时重置 DOM 样式
//
// 所有视觉状态（transform / filter / borderColor / boxShadow）
// 由父组件 useLayoutEffect + GSAP onUpdate 直接操作 DOM 控制。
// React 不管理这些样式 → 永远不会因 reconciliation 被覆盖。
// ================================================================
interface GalleryCardProps {
  hub: CommunityHub
  innerRef?: (el: HTMLDivElement | null) => void
}

const GalleryCard = memo(
  forwardRef<HTMLDivElement, GalleryCardProps>(function GalleryCard(
    { hub, innerRef },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className="shrink-0 select-none"
        style={{
          width: CARD_WIDTH,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 缩放 + 滤镜层 — 样式仅由 GSAP 设置，JSX 不设 transform/filter */}
        <div
          ref={innerRef}
          className="flex-1 flex flex-col"
        >
          <div
            className="rounded-2xl overflow-hidden flex-1 flex flex-col"
            style={{
              background: 'rgba(26,45,46,0.78)',
              border: '1px solid rgba(168,197,195,0.05)',
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

              {/* 底部渐变 */}
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

              {/* 数据指标 */}
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

              {/* 描述 */}
              <p className="text-sm text-slate leading-relaxed line-clamp-3 mt-auto">
                {hub.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }),
  // 仅 hub 标识变化时才重新渲染（数据不变则永远不重渲染）
  (prev, next) => prev.hub.shortName === next.hub.shortName,
)
