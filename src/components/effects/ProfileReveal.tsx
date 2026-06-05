import { useRef, useEffect, useState, useCallback } from 'react'
import { drawProfilePixel } from './drawProfilePixel'

// ============================================================
// ProfileReveal · 灰白画像 + 鼠标悬浮彩色揭示 + 画像标签
// 双 Canvas 层：底层彩色 → 顶层灰白 + 圆形镂空
// ============================================================

const SCALE = 10
const CANVAS_W = 16 * SCALE // 160
const CANVAS_H = 20 * SCALE // 200
const RADIUS = 90 // 彩色圆形半径（px）

// ---- 5 个热区（百分比坐标，相对 canvas 显示尺寸） ----
const HOT_ZONES: { xPct: number; yPct: number; wPct: number; hPct: number; label: string }[] = [
  { xPct: 18, yPct: 0, wPct: 64, hPct: 42, label: '典型画像1：31岁左右，INFP型人格' },
  { xPct: 20, yPct: 28, wPct: 60, hPct: 22, label: '典型画像2：人文社科背景，本科及以上学历' },
  { xPct: 20, yPct: 52, wPct: 55, hPct: 16, label: '典型画像3：信息技术行业，自由职业，中小公司' },
  { xPct: 10, yPct: 64, wPct: 80, hPct: 20, label: '典型画像4：3年+职场经验，近1年成为数字游民' },
  { xPct: 30, yPct: 44, wPct: 40, hPct: 18, label: '典型画像5：每周工作少于5天，年收入20万以内' },
]

export function ProfileReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const colorCanvasRef = useRef<HTMLCanvasElement>(null)
  const grayCanvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const [activeLabel, setActiveLabel] = useState<string | null>(null)
  const [pointerIn, setPointerIn] = useState(false)

  // ---- 绘制底层彩色肖像 ----
  useEffect(() => {
    const canvas = colorCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawProfilePixel(ctx, 0, 0, SCALE)
  }, [])

  // ---- 绘制顶层灰白肖像 ----
  useEffect(() => {
    const canvas = grayCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.filter = 'grayscale(100%)'
    drawProfilePixel(ctx, 0, 0, SCALE)
    ctx.filter = 'none'
  }, [])

  // ---- 指针移动 → 更新遮罩 & 热区检测 ----
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current
      const grayCanvas = grayCanvasRef.current
      const tooltip = tooltipRef.current
      if (!container || !grayCanvas) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // 更新灰白层的圆形镂空遮罩
      grayCanvas.style.webkitMaskImage = `radial-gradient(circle ${RADIUS}px at ${x}px ${y}px, transparent 0%, transparent ${RADIUS - 2}px, black ${RADIUS}px)`
      grayCanvas.style.maskImage = `radial-gradient(circle ${RADIUS}px at ${x}px ${y}px, transparent 0%, transparent ${RADIUS - 2}px, black ${RADIUS}px)`

      // 更新指针圆环的 CSS 变量
      container.style.setProperty('--px', `${x}px`)
      container.style.setProperty('--py', `${y}px`)

      // 热区检测（百分比坐标）
      const w = rect.width
      const h = rect.height
      let found: string | null = null
      for (const zone of HOT_ZONES) {
        const zx = (zone.xPct / 100) * w
        const zy = (zone.yPct / 100) * h
        const zw = (zone.wPct / 100) * w
        const zh = (zone.hPct / 100) * h
        if (x >= zx && x <= zx + zw && y >= zy && y <= zy + zh) {
          found = zone.label
          break
        }
      }

      setActiveLabel(found)
      setPointerIn(true)

      // 气泡位置跟随指针
      if (tooltip) {
        tooltip.style.left = `${e.clientX + 18}px`
        tooltip.style.top = `${e.clientY - 40}px`
      }
    },
    [],
  )

  const handlePointerLeave = useCallback(() => {
    const grayCanvas = grayCanvasRef.current
    if (grayCanvas) {
      // 重置遮罩 → 全灰白
      grayCanvas.style.webkitMaskImage = ''
      grayCanvas.style.maskImage = ''
    }
    setActiveLabel(null)
    setPointerIn(false)
  }, [])

  return (
    <div className="my-14">
      {/* 标题 */}
      <h3 className="text-xl font-serif text-charcoal text-center mb-3">
        典型画像 — 探索标签
      </h3>
      <p className="text-center text-sm text-slate mb-6">
        移动光标至画像不同区域，揭示对应的典型特征
      </p>

      {/* 画布容器 */}
      <div
        ref={containerRef}
        className="relative mx-auto select-none"
        style={{
          width: 'min(100%, 400px)',
          aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
          cursor: 'none',
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* 底层：彩色肖像 */}
        <canvas
          ref={colorCanvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="absolute inset-0 w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* 顶层：灰白肖像 + 圆形镂空（mask 由 JS 更新） */}
        <canvas
          ref={grayCanvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="absolute inset-0 w-full h-full"
          style={{
            imageRendering: 'pixelated',
            transition: 'mask-image 0s', // mask 位置即时更新
          }}
        />

        {/* 自定义指针圆环 */}
        {pointerIn && (
          <div
            className="absolute pointer-events-none rounded-full border-2 border-duck-300/50"
            style={{
              width: RADIUS * 2,
              height: RADIUS * 2,
              transform: 'translate(-50%, -50%)',
              left: 'var(--px)',
              top: 'var(--py)',
              boxShadow: '0 0 24px rgba(168,197,195,0.15), inset 0 0 12px rgba(168,197,195,0.06)',
            }}
          />
        )}
      </div>

      {/* 悬浮气泡 */}
      <div
        ref={tooltipRef}
        className="profile-tooltip fixed pointer-events-none z-50"
        style={{
          opacity: activeLabel ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {activeLabel && (
          <span className="inline-block bg-duck-900/90 backdrop-blur-md text-[#b9c8be] text-sm font-serif px-4 py-2 rounded-xl border border-duck-200/15 shadow-lg max-w-[260px] leading-relaxed">
            {activeLabel}
          </span>
        )}
      </div>

      {/* 指针位置 CSS 变量注入（通过隐藏的 style 标签） */}
      <style>{`
        .profile-tooltip {
          transform: translate(0, -100%);
        }
      `}</style>
    </div>
  )
}
