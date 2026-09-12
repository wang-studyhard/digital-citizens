import { useState, useEffect } from 'react'
import { subscribe, getActiveLabel } from './collapseStore'

// ============================================================
// CollapseOverlay · 唯一固定收缩标签
// 订阅 collapseStore，只渲染当前胜出的章节标签
// CSS transition 实现 0.3s 淡入淡出
// ============================================================

export function CollapseOverlay() {
  const [label, setLabel] = useState<string | null>(() => getActiveLabel())

  useEffect(() => {
    return subscribe(() => {
      const next = getActiveLabel()
      setLabel(next)
    })
  }, [])

  return (
    <div
      className="chapter-collapse-fixed"
      style={{
        opacity: label ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
        pointerEvents: 'none',
      }}
    >
      {label && <span className="chapter-collapse-label">{label}</span>}
    </div>
  )
}
