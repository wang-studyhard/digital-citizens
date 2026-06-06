import { useMemo } from 'react'

// ============================================================
// ChapterBubbles · 章节标题背景动态气泡
// 随机尺寸 4-12px · 鸭蛋青 #b9c8be · 透明度 0.15-0.3
// 缓慢上浮 + 水平漂移 · 循环播放 · 不遮挡文字 (z-0)
// ============================================================

interface Bubble {
  id: number
  left: string    // 水平位置 (百分比)
  bottom: string  // 垂直起始 (百分比)
  size: number    // 直径 (px)
  opacity: number // 0.15–0.30
  duration: string // 动画周期 (s)
  delay: string   // 动画延迟 (s)
  drift: number   // 水平漂移量 (px, 正=右飘)
}

/** 生成 12-18 个随机气泡，useMemo 确保只在挂载时随机一次 */
function generateBubbles(count: number): Bubble[] {
  const bubbles: Bubble[] = []
  for (let i = 0; i < count; i++) {
    bubbles.push({
      id: i,
      left: `${Math.random() * 92 + 4}%`,
      bottom: `${Math.random() * 85 + 5}%`,
      size: Math.round(Math.random() * 8 + 4),     // 4–12px
      opacity: Math.round((Math.random() * 0.15 + 0.15) * 100) / 100, // 0.15–0.30
      duration: `${(Math.random() * 4 + 5).toFixed(1)}s`,   // 5–9s
      delay: `${(Math.random() * 3).toFixed(1)}s`,          // 0–3s
      drift: Math.round((Math.random() - 0.5) * 30),        // -15~+15px
    })
  }
  return bubbles
}

export function ChapterBubbles() {
  const bubbles = useMemo(() => generateBubbles(16), [])

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: b.left,
            bottom: b.bottom,
            width: b.size,
            height: b.size,
            background: '#b9c8be',
            animation: `chapterBubbleFloat ${b.duration} ${b.delay} ease-in-out infinite`,
            '--bubble-alpha': String(b.opacity),
            '--bubble-drift': `${b.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
