import { useRef, useState, useMemo, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion'

// ============================================================
// Canvas 像素潜水员 · 16×20 逻辑像素 → ×5 放大 → 80×100
// 严格按照像素设计稿逐字符绘制
// ============================================================

// ---- 像素设计稿（16 列 × 20 行，每字符 = 1 逻辑像素） ----
const PIXEL_GRID = [
  //  0000000000111111
  //  0123456789012345
  '.........HH.....', //  0  头发顶（灰白鬓角）
  '........HHHH....', //  1  头发
  '.......HHHHHH...', //  2  头发铺展
  '.......HKKKKH...', //  3  额头（暖黄肤）
  '.......KVVVVK...', //  4  潜水镜上框
  '.......KVLVLK...', //  5  镜片 + 下框
  '.......KZKZK....', //  6  鼻下 + 胡茬
  '........KKKK....', //  7  下颌
  '.....YYBBBBBYY..', //  8  亮黄气瓶 + 肩
  '....YYBBBBBBBYY.', //  9  气瓶 + 上躯干
  '....YYBBBBBBBYY.', // 10  气瓶 + 躯干
  '.....BBBBBBBBBB.', // 11  躯干
  '...B.BBBBBBBBBB.', // 12  手臂外展（漂浮）
  '.....BBBBBBBBBB.', // 13  下躯干
  '......BBBBBBBB..', // 14  腰
  '......BBBBBBBB..', // 15  大腿
  '......BBBBBBBB..', // 16  小腿
  '....FFFFFFFF....', // 17  脚蹼伸展
  '.....FFFFFFFF...', // 18  脚蹼下缘
  '......FFFFF.....', // 19  蹼尖
]

const COLOR_MAP: Record<string, string> = {
  H: '#3a3a3a', // 深灰头发
  K: '#e8c27a', // 暖黄亚裔肤色
  V: '#1c1c1c', // 潜水镜框（深黑橡胶）
  L: '#546e7a', // 镜片玻璃（蓝灰）
  Z: '#5c5c5c', // 胡茬（深灰点）
  B: '#1a1a1e', // 黑色潜水服
  Y: '#ffd600', // 亮黄氧气瓶
  F: '#1c1c1c', // 深色脚蹼
}

const GRID_W = 16 // 逻辑像素宽
const GRID_H = 20 // 逻辑像素高
const PX = 5 // 放大倍率（每逻辑像素 → PX×PX 屏幕像素）
const W = GRID_W * PX // 80
const H = GRID_H * PX // 100

// ---- 弹簧参数（水下惯性感） ----
const SPRING = { stiffness: 35, damping: 22, mass: 0.5 }

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

interface PixelDaveProps {
  mousePos: { x: number; y: number }
}

export function PixelDave({ mousePos }: PixelDaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const prevScreenX = useRef<number | null>(null)
  const [facingRight, setFacingRight] = useState(true)

  // ---- Canvas 绘制（仅挂载一次，像素稿是静态的） ----
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.clearRect(0, 0, W, H)

    // 逐逻辑像素绘制 PX×PX 色块
    for (let y = 0; y < GRID_H; y++) {
      const row = PIXEL_GRID[y]
      for (let x = 0; x < GRID_W; x++) {
        const c = row[x]
        if (c === '.') continue
        const color = COLOR_MAP[c]
        if (!color) continue
        ctx.fillStyle = color
        ctx.fillRect(x * PX, y * PX, PX, PX)
      }
    }
  }, [])

  // ---- 弹簧驱动的鼠标追随（物理缓动） ----
  const targetX = useMotionValue(0.5)
  const targetY = useMotionValue(0.5)
  const springX = useSpring(targetX, SPRING)
  const springY = useSpring(targetY, SPRING)

  targetX.set(mousePos.x)
  targetY.set(mousePos.y)

  const leftPct = useTransform(springX, (v) => `${clamp(v * 100, 3, 97)}%`)
  const topPct = useTransform(springY, (v) => `${clamp(v * 100, 5, 92)}%`)

  // ---- 方向检测（根据屏幕坐标变化判断朝向） ----
  useAnimationFrame(() => {
    const el = containerRef.current
    if (!el) return
    const cx = el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2
    if (prevScreenX.current !== null) {
      const dx = cx - prevScreenX.current
      if (Math.abs(dx) > 0.15) setFacingRight(dx > 0)
    }
    prevScreenX.current = cx
  })

  // ---- 尾部气泡 ----
  const bubbles = useMemo(
    () => [
      { dx: -10, dy: 4, size: 4, delay: 0.0 },
      { dx: -16, dy: -6, size: 3, delay: 0.5 },
      { dx: -7, dy: 14, size: 5, delay: 1.0 },
      { dx: -20, dy: 2, size: 2.5, delay: 0.3 },
      { dx: -12, dy: -14, size: 3.5, delay: 0.8 },
    ],
    [],
  )

  return (
    <motion.div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        width: W,
        height: H,
        marginLeft: -W / 2,
        marginTop: -H / 2,
        left: leftPct,
        top: topPct,
      }}
      animate={{ rotate: [-2, 4, -3, 1, -2] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* 生物荧光光晕 */}
      <div
        className="absolute rounded-full blur-xl pointer-events-none"
        style={{
          width: W * 2.6,
          height: H * 2.6,
          left: -(W * 0.8),
          top: -(H * 0.8),
          background:
            'radial-gradient(circle, rgba(168,197,195,0.22) 0%, rgba(135,176,174,0.08) 40%, transparent 70%)',
        }}
      />

      {/* Canvas 像素角色（scaleX 朝向翻转 + 微旋转肢体摆动） */}
      <motion.canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{
          width: W,
          height: H,
          imageRendering: 'pixelated',
          scaleX: facingRight ? 1 : -1,
        }}
        animate={{ rotate: [-1, 3, -2, 2, -1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 尾部气泡 */}
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-duck-300/30 pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: facingRight ? b.dx : W - b.dx,
            top: H * 0.4 + b.dy,
          }}
          animate={{
            y: [0, -80],
            x: [0, facingRight ? -18 : 18],
            opacity: [0.4, 0],
            scale: [1, 0.2],
          }}
          transition={{
            duration: 2.4 + i * 0.4,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  )
}
