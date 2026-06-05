// ============================================================
// drawProfilePixel(ctx, x, y, [scale])
// 亚裔男性半身像 · 黑框眼镜 · 白衬衫 · 深色西装
// 16×20 逻辑像素 → ×scale 放大（默认 5 → 80×100）
// 可在任意 Canvas 2D 上下文中调用
// ============================================================

const GRID: string[] = [
  '......HHHH......',
  '.....HHHHHHH....',
  '....HHHHHHHHH...',
  '....HKKKKKKKH...',
  '....KKBK..KBK...',
  '....K#####.#K...',
  '....K#LE..EL#K...',
  '....K###NN###K...',
  '....KKKMMMKKK...',
  '.....KKKKKKK....',
  '......KKKKK.....',
  '.....WWWWWWW....',
  '....WWT..WT.WW..',
  '...DDDTTWWTTDDD.',
  '..DDDDTWWWWTDDDD',
  '..DDDDDWWWWDDDDD',
  '..DDDDDWWWWDDDDD',
  '..DDDDDDDDDDDDD.',
  '...DDDDDDDDDDD..',
  '....DDDDDDDDD...',
]

const COLORS: Record<string, string> = {
  H: '#2c2c2c',
  K: '#e8c27a',
  B: '#3a3a3a',
  '#': '#1a1a1a',
  L: '#8ab4b8',
  E: '#1a1a1a',
  N: '#c4956a',
  M: '#c4956a',
  W: '#e8e4df',
  T: '#6a9897',
  D: '#2d3436',
}

export function drawProfilePixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number = 5,
) {
  const GW = 16
  const GH = 20

  for (let row = 0; row < GH; row++) {
    const line = GRID[row]
    for (let col = 0; col < GW; col++) {
      const char = line[col]
      if (char === '.') continue
      const color = COLORS[char]
      if (!color) continue
      ctx.fillStyle = color
      ctx.fillRect(x + col * scale, y + row * scale, scale, scale)
    }
  }
}
