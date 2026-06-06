import { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion'
import { PixelDave } from '@/components/effects/PixelDave'

// ============================================================
// 数据粒子文本池
// ============================================================
const DATA_SNIPPETS = [
  '71.28%', '31岁', 'n=282', '90后',
  '¥15000', '76.4%', '80后', '00后',
  '19.15%', '14.18%', '61.34%', '4300元',
  '7000万+', '70%+', '1510万',
]

// ============================================================
// 波浪层路径生成
// ============================================================
function wavePath(midY: number, amp: number): string {
  const s = 250
  return [
    `M 0,${midY}`,
    `C ${s * 0.33},${midY - amp} ${s * 0.67},${midY - amp} ${s},${midY}`,
    `C ${s * 1.33},${midY + amp} ${s * 1.67},${midY + amp} ${s * 2},${midY}`,
    `C ${s * 2.33},${midY - amp} ${s * 2.67},${midY - amp} ${s * 3},${midY}`,
    `C ${s * 3.33},${midY + amp} ${s * 3.67},${midY + amp} ${s * 4},${midY}`,
    `L 1000,0 L 0,0 Z`,
  ].join(' ')
}

const WAVE_LAYERS = [
  { top: '2%', h: '16%', midY: 70, amp: 38, color: 'rgba(168,197,195,0.14)', speed: 14 },
  { top: '14%', h: '14%', midY: 90, amp: 28, color: 'rgba(135,176,174,0.10)', speed: 19 },
  { top: '24%', h: '12%', midY: 110, amp: 20, color: 'rgba(74,107,110,0.08)', speed: 25 },
  { top: '38%', h: '10%', midY: 140, amp: 14, color: 'rgba(45,67,68,0.06)', speed: 32 },
]

const PARTICLE_PRESETS = [
  { left: '5%', delay: '0s', dur: '14s', size: '12px' },
  { left: '12%', delay: '2.3s', dur: '18s', size: '10px' },
  { left: '20%', delay: '5.1s', dur: '15s', size: '13px' },
  { left: '28%', delay: '1.0s', dur: '20s', size: '10px' },
  { left: '35%', delay: '7.4s', dur: '16s', size: '14px' },
  { left: '44%', delay: '3.2s', dur: '22s', size: '11px' },
  { left: '52%', delay: '8.5s', dur: '13s', size: '12px' },
  { left: '60%', delay: '0.7s', dur: '19s', size: '10px' },
  { left: '68%', delay: '4.4s', dur: '17s', size: '13px' },
  { left: '76%', delay: '6.1s', dur: '21s', size: '11px' },
  { left: '84%', delay: '1.9s', dur: '15s', size: '14px' },
  { left: '92%', delay: '5.8s', dur: '18s', size: '10px' },
]

// ============================================================
// Hero · 大字报美学 — 仅标题，占据 70%+ 垂直空间
// ============================================================
export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const glassRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  // ---- 聚光灯 · 虚拟进度（wheel 驱动，锁定期间禁止真滚动） ----
  const rawProgress = useMotionValue(0)
  const smoothProgress = useSpring(rawProgress, { stiffness: 70, damping: 24 })
  const spotlightDone = useRef(false)
  const touchStartY = useRef(0)

  // wheel / touch → 累积虚拟进度 → 驱动聚光灯（仅未完成时拦截）
  useEffect(() => {
    const SENSITIVITY = 0.0012

    const handleWheel = (e: WheelEvent) => {
      if (spotlightDone.current) return // 已完成 → 不拦截

      e.preventDefault()
      const next = Math.max(0, Math.min(1, rawProgress.get() + e.deltaY * SENSITIVITY))
      rawProgress.set(next)

      if (next >= 1) {
        spotlightDone.current = true // 永久标记，不再拦截任何事件
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (spotlightDone.current) return

      const dy = touchStartY.current - (e.touches[0]?.clientY ?? touchStartY.current)
      const next = Math.max(0, Math.min(1, rawProgress.get() + dy * SENSITIVITY * 0.4))
      rawProgress.set(next)
      touchStartY.current = e.touches[0]?.clientY ?? touchStartY.current

      if (next >= 1) {
        spotlightDone.current = true
      } else if (next > 0.01) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // 每帧更新聚光灯半径 + 毛玻璃透明度
  useAnimationFrame(() => {
    const p = smoothProgress.get()
    const r = p * 150 // 从 0vmax 开始，初始完全黑场，随进度扩大至 150vmax 全透
    const glassAlpha = Math.max(0, 1 - p * 4)

    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--spotlight-r', `${r}vmax`)
    }
    if (glassRef.current) {
      glassRef.current.style.opacity = String(glassAlpha)
    }
  })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0.5, y: 0.5 })
  }, [])

  const particles = useMemo(
    () =>
      PARTICLE_PRESETS.map((p, i) => ({
        ...p,
        text: DATA_SNIPPETS[i % DATA_SNIPPETS.length],
      })),
    [],
  )

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-duck-900"
    >
      {/* ================================================================ */}
      {/*  LAYER 0-5 — 湖底场景（不变）                                      */}
      {/* ================================================================ */}
      <div className="absolute inset-0 bg-gradient-to-b from-duck-500 via-duck-700 to-duck-950" />
      <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-duck-300/15 via-duck-400/5 to-transparent pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={`ray-${i}`}
            className="absolute top-0 origin-top will-change-transform"
            style={{
              left: `${4 + i * 17}%`,
              width: '13%',
              height: '85%',
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, rgba(168,197,195,0.04) 30%, transparent 75%)',
              transform: `rotate(${(i - 2.5) * 5.5}deg)`,
              animation: `raySway ${7 + i * 2.5}s ease-in-out infinite`,
              animationDelay: `${i * 1.6}s`,
            }}
          />
        ))}
      </div>

      {WAVE_LAYERS.map((wl, i) => (
        <div
          key={`wave-${i}`}
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{ top: wl.top, height: wl.h }}
        >
          <div
            className="absolute h-full will-change-transform"
            style={{ width: '200%', animation: `waveSlide ${wl.speed}s linear infinite` }}
          >
            <svg className="absolute left-0 w-1/2 h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d={wavePath(wl.midY, wl.amp)} fill={wl.color} />
            </svg>
            <svg className="absolute left-1/2 w-1/2 h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d={wavePath(wl.midY, wl.amp)} fill={wl.color} />
            </svg>
          </div>
        </div>
      ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={`dp-${i}`}
            className="absolute font-mono text-duck-200 whitespace-nowrap select-none"
            style={{
              left: p.left,
              bottom: '-6%',
              fontSize: p.size,
              animation: `dataFloat ${p.dur} linear infinite`,
              animationDelay: p.delay,
              opacity: 0,
            }}
          >
            {p.text}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-duck-950/75 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none opacity-30">
        {[
          { l: '10%', s: 4, d: '2s' },
          { l: '25%', s: 3, d: '3.5s' },
          { l: '40%', s: 5, d: '1.8s' },
          { l: '58%', s: 2.5, d: '4.2s' },
          { l: '72%', s: 3.5, d: '2.7s' },
          { l: '88%', s: 4.5, d: '3.1s' },
        ].map((dot, i) => (
          <div
            key={`dot-${i}`}
            className="absolute bottom-2 rounded-full bg-duck-300/25"
            style={{
              left: dot.l,
              width: dot.s,
              height: dot.s,
              animation: `breathe ${dot.d} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* ================================================================ */}
      {/*  LAYER 6 — 像素潜水员                                              */}
      {/* ================================================================ */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <PixelDave mousePos={mousePos} />
      </div>

      {/* ================================================================ */}
      {/*  LAYER 7 — 大字报标题层（z-30，低于聚光灯遮罩 z-40，被黑场完全覆盖）  */}
      {/*          标题始终静态存在于背景层，随黑场消退自然露出                  */}
      {/* ================================================================ */}
      <div className="relative z-30 flex flex-col items-center justify-center" style={{ height: '72vh' }}>

        {/* 大字报主标题 · 始终静态可见，仅被上层黑色遮罩遮挡 */}
        <h1
          className="tracking-[0.06em] leading-[0.85] select-none text-center"
          style={{
            fontFamily:
              '"华文行楷", "STXingkai", "楷体", "KaiTi", "Noto Serif SC", serif',
            fontSize: 'clamp(5rem, 18vw, 12rem)',
            color: '#b9c8be',
            textShadow:
              '2px 2px 6px rgba(45,67,68,0.22),' +
              '0 2px 12px rgba(0,0,0,0.18),' +
              '0 0 60px rgba(185,200,190,0.22),' +
              '0 0 120px rgba(168,197,195,0.10)',
            fontWeight: 400,
          }}
        >
          数字江河
        </h1>

        {/* 副标题 · 始终静态可见，仅被上层黑色遮罩遮挡 */}
        <p
          className="tracking-[0.12em] select-none text-center font-serif"
          style={{
            fontSize: 'clamp(1.35rem, 5.3vw, 3.3rem)',
            color: '#b9c8be',
            textShadow:
              '0 1px 4px rgba(0,0,0,0.12), 0 0 20px rgba(185,200,190,0.10)',
            fontWeight: 400,
            marginTop: 'clamp(0.8rem, 2vw, 2rem)',
          }}
        >
          中国数字游民的水下新大陆
        </p>
      </div>

      {/* 向下滚动指示器 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#A8C5C3"
          strokeWidth={1.5}
          strokeLinecap="round"
          className="opacity-50"
        >
          <path d="M7 10l5 5 5-5" />
        </svg>
      </motion.div>

      {/* ================================================================ */}
      {/*  LAYER 8 — 聚光灯黑色遮罩（圆形镂空随滚动扩大）                     */}
      {/* ================================================================ */}
      <div
        ref={spotlightRef}
        className="spotlight-overlay absolute inset-0 bg-black pointer-events-none"
        style={{
          zIndex: 40,
          WebkitMaskImage:
            'radial-gradient(circle at 50% 40%, transparent var(--spotlight-r, 0vmax), black calc(var(--spotlight-r, 0vmax) + 0.5vmax))',
          maskImage:
            'radial-gradient(circle at 50% 40%, transparent var(--spotlight-r, 0vmax), black calc(var(--spotlight-r, 0vmax) + 0.5vmax))',
        }}
      />

      {/* ================================================================ */}
      {/*  LAYER 9 — 毛玻璃引导文字（初始可见，滚动后淡出）                    */}
      {/* ================================================================ */}
      <div
        ref={glassRef}
        className="absolute inset-0 flex items-center pointer-events-none"
        style={{
          zIndex: 50,
          justifyContent: 'center',
          paddingTop: '0vh',
        }}
      >
        <span
          className="glass-intro-text font-mono text-sm md:text-base tracking-[0.3em] uppercase px-6 py-3"
          style={{
            color: '#b9c8be',
            textShadow:
              '0 0 24px rgba(185,200,190,0.30), 0 0 64px rgba(168,197,195,0.15), 0 2px 8px rgba(0,0,0,0.20)',
            background: 'rgba(185,200,190,0.06)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(185,200,190,0.12)',
            borderRadius: '9999px',
            marginTop: '-10vh',
          }}
        >
          中国数字游民研究报告
        </span>
      </div>
    </section>
  )
}
