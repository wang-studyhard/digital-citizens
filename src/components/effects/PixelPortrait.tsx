import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// ============================================================
// 像素半身像 · 亚裔男性 · 黑框眼镜 · 白衬衫 · 深色西装
// 16×20 逻辑像素 → ×5 放大 → 80×100
// ============================================================

const GRID: string[] = [
  // 0000000000111111
  // 0123456789012345
  '......HHHH......', //  0  发顶
  '.....HHHHHHH....', //  1  头发
  '....HHHHHHHHH...', //  2  头发铺展
  '....HKKKKKKKH...', //  3  额头 + 鬓角
  '....KKBK.KBKK...', //  4  眉毛
  '....K#####.#K...', //  5  黑框镜架（横贯眼部）
  '....K#LE..EL#K...', //  6  镜片 + 眼睛 + 桥
  '....K###NN###K...', //  7  镜框下沿 + 鼻部
  '....KKKMMMKKK...', //  8  嘴部（温和浅笑）
  '.....KKKKKKK....', //  9  下颌
  '......KKKKK.....', // 10  下巴收窄
  '.....WWWWWWW....', // 11  白衬衫领露出
  '....WWT.WWT.WW..', // 12  领结 + 衣领
  '...DDDTTWWTTDDD.', // 13  西装翻领 + 领带
  '..DDDDTWWWWTDDDD', // 14  西装外套 + 领带垂下
  '..DDDDDWWWWDDDDD', // 15  西装扣合处 + 衬衫
  '..DDDDDWWWWDDDDD', // 16  躯干
  '..DDDDDDDDDDDDD.', // 17  西装主体
  '...DDDDDDDDDDD..', // 18  西装下摆
  '....DDDDDDDDD...', // 19  腰线
]

const COLORS: Record<string, string> = {
  H: '#2c2c2c', // 黑色短发
  K: '#e8c27a', // 暖黄肤色
  B: '#3a3a3a', // 眉毛
  '#': '#1a1a1a', // 黑框眼镜
  L: '#8ab4b8', // 镜片反光（鸭蛋青，呼应页面主色）
  E: '#1a1a1a', // 眼珠
  N: '#c4956a', // 鼻影
  M: '#c4956a', // 唇线
  W: '#e8e4df', // 白衬衫
  T: '#6a9897', // 领带（鸭蛋青）
  D: '#2d3436', // 深色西装
}

const GW = 16
const GH = 20
const SCALE = 5
const W = GW * SCALE // 80
const H = GH * SCALE // 100

export function PixelPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, W, H)
    for (let y = 0; y < GH; y++) {
      const row = GRID[y]
      for (let x = 0; x < GW; x++) {
        const c = row[x]
        if (c === '.') continue
        const color = COLORS[c]
        if (!color) continue
        ctx.fillStyle = color
        ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE)
      }
    }
  }, [])

  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: W, height: H }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
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
    </motion.div>
  )
}
