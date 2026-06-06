import { useRef, useLayoutEffect, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// ChartConstellation — 图表星座布局
// 滚动驱动：正方形四角分散 → 中心三角环绕聚合 + SVG 连接线
// ============================================================

// -- 布局常量 (vw 基准, 移动端优先) --
const CORE_SIZE_VW = 30
const CORE_MAX = 300 // 核心图表最大尺寸 (px)
const SAT_SIZE_RATIO = 0.9 // 方形图表 = 核心 * 0.9
const GAP_PX = 28 // 聚合后圆框边缘与方框边缘之间的固定间隙 (px)
const SQUARE_HALF_SPREAD = 0.18 // 分散正方形半边长 (vw), 四角到中心的距离

// -- 聚合后卫星环绕角度 (120° 间隔, 顶点朝上) --
//    卫星索引: [0]=左上→顶部, [1]=右下→右下, [2]=左下→左下
const SAT_ANGLES_DEG = [-90, 30, 150]

// ============================================================
// Helpers
// ============================================================

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Smoothstep: 零导数边界, S 曲线过渡 */
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

/**
 * 将图表中心点 clamp 到容器内，保留安全边距
 * 确保图表不会被视口边缘裁切
 */
function clampCenter(
  cx: number,
  cy: number,
  halfW: number,
  halfH: number,
  cw: number,
  ch: number,
  margin: number,
): { x: number; y: number } {
  return {
    x: Math.max(halfW + margin, Math.min(cw - halfW - margin, cx)),
    y: Math.max(halfH + margin, Math.min(ch - halfH - margin, cy)),
  }
}

// ============================================================
// Props
// ============================================================

interface ChartConstellationProps {
  /** 核心图表内容 (圆形容器) */
  coreChart: ReactNode
  /** 三个卫星图表内容 (方形卡片) */
  satellites: [ReactNode, ReactNode, ReactNode]
  /** 唯一标识, 用于 SVG filter id */
  groupKey: string
}

// ============================================================
// Component
// ============================================================

export function ChartConstellation({
  coreChart,
  satellites,
  groupKey,
}: ChartConstellationProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const coreGlowRef = useRef<HTMLDivElement>(null)
  const satRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(SVGLineElement | null)[]>([])

  // ==========================================================
  // GSAP ScrollTrigger — pin + scrub
  // ==========================================================
  useLayoutEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    /**
     * 每帧更新：根据 scroll progress (0→1) 计算所有元素位置
     * - 0.00–0.30 : 分散展示 (四象限紧凑排列)
     * - 0.30–1.00 : 聚合连接 (中心三角环绕 + 连线渐显)
     */
    function update(progress: number) {
      const cw = pin!.clientWidth
      const ch = pin!.clientHeight

      // 聚合进度 (0=分散, 1=完全聚合)
      const convergeRaw = Math.max(0, Math.min(1, (progress - 0.30) / 0.70))
      const cp = smoothstep(convergeRaw)

      // 尺寸 (响应式)
      const coreSize = Math.min(cw * (CORE_SIZE_VW / 100), CORE_MAX)
      const satSize = coreSize * SAT_SIZE_RATIO
      const coreR = coreSize / 2
      const satHalf = satSize / 2

      // 聚合后卫星中心到核心中心的距离 = 核心半径 + 固定间隙 + 卫星半宽
      const convergeDist = coreR + GAP_PX + satHalf

      // 安全边距 (16px, 确保图表不贴边、不互相压盖)
      const SAFE_MARGIN = 16

      // =====================================================
      // 分散状态：正方形四角布局 (整体居中)
      // 核心→右上角, 卫星0→左上角, 卫星1→右下角, 卫星2→左下角
      // =====================================================
      const spread = cw * SQUARE_HALF_SPREAD
      const scatCoreX = cw * 0.5 + spread
      const scatCoreY = ch * 0.5 - spread
      const scatSats = [
        { x: cw * 0.5 - spread, y: ch * 0.5 - spread }, // 左上
        { x: cw * 0.5 + spread, y: ch * 0.5 + spread }, // 右下
        { x: cw * 0.5 - spread, y: ch * 0.5 + spread }, // 左下
      ]

      // ----- 核心图表 -----

      const rawCoreX = lerp(scatCoreX, cw * 0.5, cp)
      const rawCoreY = lerp(scatCoreY, ch * 0.5, cp)

      // clamp 确保核心始终在可视区域内
      const { x: coreX, y: coreY } = clampCenter(
        rawCoreX, rawCoreY, coreR, coreR, cw, ch, SAFE_MARGIN,
      )

      if (coreRef.current) {
        gsap.set(coreRef.current, {
          x: coreX - coreR,
          y: coreY - coreR,
          width: coreSize,
          height: coreSize,
        })
      }

      // 光晕随聚合增强
      if (coreGlowRef.current) {
        gsap.set(coreGlowRef.current, {
          opacity: 0.5 + cp * 0.5,
          scale: 1 + cp * 0.15,
        })
      }

      // ----- 卫星图表 + 连线 -----
      for (let i = 0; i < 3; i++) {
        const angleRad = SAT_ANGLES_DEG[i] * (Math.PI / 180)

        // 聚合目标位置 (以核心为中心的正三角形顶点)
        const convX = cw * 0.5 + convergeDist * Math.cos(angleRad)
        const convY = ch * 0.5 + convergeDist * Math.sin(angleRad)

        // 分散起始位置 (正方形四角)
        const scatX = scatSats[i].x
        const scatY = scatSats[i].y

        const rawSx = lerp(scatX, convX, cp)
        const rawSy = lerp(scatY, convY, cp)

        // clamp 确保卫星始终在可视区域内
        const { x: sx, y: sy } = clampCenter(
          rawSx, rawSy, satHalf, satHalf, cw, ch, SAFE_MARGIN,
        )

        const satEl = satRefs.current[i]
        if (satEl) {
          gsap.set(satEl, {
            x: sx - satHalf,
            y: sy - satHalf,
            width: satSize,
            height: satSize,
            rotation: 0, // 不旋转
          })
        }

        // ----- SVG 连线 (从核心边缘到卫星中心) -----
        const lineEl = lineRefs.current[i]
        if (lineEl) {
          const dx = sx - coreX
          const dy = sy - coreY
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          // 线段起点在核心圆边缘上
          const lx1 = coreX + (dx / dist) * coreR
          const ly1 = coreY + (dy / dist) * coreR

          lineEl.setAttribute('x1', String(lx1))
          lineEl.setAttribute('y1', String(ly1))
          lineEl.setAttribute('x2', String(sx))
          lineEl.setAttribute('y2', String(sy))
          // 连线在聚合阶段渐显 (max opacity 0.5)
          lineEl.style.opacity = String(cp * 0.5)
        }
      }
    }

    // 创建 ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=250%', // 2.5 视口高度的滚动距离
      pin: true,
      pinSpacing: true, // 维持自然文档流，防止遮挡
      scrub: 1,
      onUpdate: (self) => update(self.progress),
    })

    // resize 时重新计算 (进度保持不变)
    const onResize = () => update(st.progress)
    window.addEventListener('resize', onResize)

    // 初始渲染 — 分散状态
    requestAnimationFrame(() => update(0))

    return () => {
      st.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // ==========================================================
  // Render
  // ==========================================================
  const glowFilterId = `cc-glow-${groupKey}`

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: '100vh',
        overflow: 'hidden', // 裁剪超出内容，防止遮挡后续板块
        isolation: 'isolate', // 创建独立层叠上下文
        zIndex: 1,
        background: '#1a2d2e', // 与全局 duck-950 一致，消除断层
      }}
    >
      {/* 顶部渐变过渡带 — 从深色背景柔和过渡到透明，消除与上方板块的视觉断层 */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: 0,
          height: 'clamp(32px, 5vh, 64px)',
          background: 'linear-gradient(to bottom, #1a2d2e 0%, transparent 100%)',
          zIndex: 20,
        }}
      />
      {/* 底部渐变过渡带 — 从透明柔和过渡到深色背景 */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          bottom: 0,
          height: 'clamp(32px, 5vh, 64px)',
          background: 'linear-gradient(to top, #1a2d2e 0%, transparent 100%)',
          zIndex: 20,
        }}
      />

      {/* 被 GSAP pin 的容器 */}
      <div
        ref={pinRef}
        className="absolute inset-0 overflow-hidden"
        style={{ background: 'transparent' }}
      >
        {/* ==================================================== */}
        {/*  SVG 连接线层 (z-5)                                    */}
        {/* ==================================================== */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <defs>
            <filter id={glowFilterId}>
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el
              }}
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="#b9c8be"
              strokeWidth={1.5}
              strokeDasharray="6 5"
              strokeLinecap="round"
              opacity={0}
              filter={`url(#${glowFilterId})`}
              style={{ transition: 'none' }}
            />
          ))}
        </svg>

        {/* ==================================================== */}
        {/*  核心图表 — 圆形容器 (z-10)                            */}
        {/* ==================================================== */}
        <div
          ref={coreRef}
          className="absolute"
          style={{
            left: 0,
            top: 0,
            zIndex: 10,
            willChange: 'transform',
          }}
        >
          {/* 光晕扩散环 */}
          <div
            ref={coreGlowRef}
            className="absolute pointer-events-none"
            style={{
              inset: '-15%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(185,200,190,0.14) 0%, transparent 70%)',
              boxShadow:
                '0 0 50px rgba(185,200,190,0.22),' +
                '0 0 100px rgba(168,197,195,0.10),' +
                '0 0 160px rgba(185,200,190,0.05)',
              opacity: 0.5,
              zIndex: -1,
            }}
          />

          {/* 圆形内容框 */}
          <div
            className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(185,200,190,0.20) 0%, rgba(26,45,46,0.92) 100%)',
              border: '2px solid rgba(185,200,190,0.35)',
              boxShadow:
                'inset 0 0 30px rgba(185,200,190,0.05),' +
                '0 0 30px rgba(185,200,190,0.12)',
            }}
          >
            <div className="w-[80%] h-[80%] flex items-center justify-center">
              {coreChart}
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/*  卫星图表 — 方形卡片 (z-8) × 3                          */}
        {/* ==================================================== */}
        {satellites.map((chart, i) => (
          <div
            key={i}
            ref={(el) => {
              satRefs.current[i] = el
            }}
            className="absolute"
            style={{
              left: 0,
              top: 0,
              zIndex: 8,
              willChange: 'transform',
            }}
          >
            <div
              className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                background: 'rgba(26,45,46,0.88)',
                border: '1px solid rgba(168,197,195,0.18)',
                boxShadow:
                  '0 1px 0 rgba(185,200,190,0.05),' +
                  'inset 0 0 20px rgba(185,200,190,0.03)',
              }}
            >
              <div className="w-[80%] h-[80%] flex items-center justify-center">
                {chart}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
