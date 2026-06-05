import { useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

// ============================================================
// MiniDave — 章节标题用的轻量潜水员（无鼠标追踪）
// 与 PixelDave 共用像素设计稿，缩小至 48×60
// ============================================================

const PIXEL_GRID = [
  '.........HH.....',
  '........HHHH....',
  '.......HHHHHH...',
  '.......HKKKKH...',
  '.......KVVVVK...',
  '.......KVLVLK...',
  '.......KZKZK....',
  '........KKKK....',
  '.....YYBBBBBYY..',
  '....YYBBBBBBBYY.',
  '....YYBBBBBBBYY.',
  '.....BBBBBBBBBB.',
  '...B.BBBBBBBBBB.',
  '.....BBBBBBBBBB.',
  '......BBBBBBBB..',
  '......BBBBBBBB..',
  '......BBBBBBBB..',
  '....FFFFFFFF....',
  '.....FFFFFFFF...',
  '......FFFFF.....',
]

const COLOR_MAP: Record<string, string> = {
  H: '#3a3a3a', K: '#e8c27a', V: '#1c1c1c',
  L: '#546e7a', Z: '#5c5c5c', B: '#1a1a1e',
  Y: '#ffd600', F: '#1c1c1c',
}

const GW = 16
const GH = 20
const SCALE = 3 // 48×60
const W = GW * SCALE
const H = GH * SCALE

export function MiniDave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, W, H)
    for (let y = 0; y < GH; y++) {
      const row = PIXEL_GRID[y]
      for (let x = 0; x < GW; x++) {
        const c = row[x]
        if (c === '.') continue
        const color = COLOR_MAP[c]
        if (!color) continue
        ctx.fillStyle = color
        ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE)
      }
    }
  }, [])

  const bubbles = useMemo(
    () => [
      { dx: -6, dy: 3, size: 2.5, delay: 0.0 },
      { dx: -10, dy: -4, size: 2, delay: 0.5 },
      { dx: -4, dy: 10, size: 3, delay: 1.0 },
      { dx: -12, dy: 2, size: 1.8, delay: 0.3 },
      { dx: -8, dy: -10, size: 2.2, delay: 0.8 },
    ],
    [],
  )

  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: W, height: H }}
      animate={{ rotate: [-2, 4, -3, 1, -2] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow */}
      <div
        className="absolute rounded-full blur-md pointer-events-none"
        style={{
          width: W * 2.2,
          height: H * 2.2,
          left: -(W * 0.6),
          top: -(H * 0.6),
          background:
            'radial-gradient(circle, rgba(168,197,195,0.18) 0%, rgba(135,176,174,0.06) 40%, transparent 70%)',
        }}
      />
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{
          width: W,
          height: H,
          imageRendering: 'pixelated',
        }}
      />
      {/* Bubbles */}
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-duck-300/25 pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: b.dx,
            top: H * 0.4 + b.dy,
          }}
          animate={{
            y: [0, -50],
            x: [0, -10],
            opacity: [0.35, 0],
            scale: [1, 0.2],
          }}
          transition={{
            duration: 2 + i * 0.35,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  )
}
