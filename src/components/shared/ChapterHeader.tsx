import { useRef, useEffect } from 'react'
import { SectionTitle } from './SectionTitle'
import { useScrollCollapse } from '@/hooks/useScrollCollapse'
import { registerChapter, unregisterChapter } from './collapseStore'

// ============================================================
// ChapterHeader · 收缩式深度指示器
// 全宽背景 + 收缩追踪作用于文字块（非背景）
// ============================================================

interface ChapterHeaderProps {
  chapter?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  mode?: 'light' | 'dark'
}

export function ChapterHeader({
  chapter,
  title,
  subtitle,
  align = 'center',
  mode = 'light',
}: ChapterHeaderProps) {
  const inflowRef = useRef<HTMLDivElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)

  // 收缩态竖向标签
  const shortChapter = chapter?.replace(/第|章/g, '') ?? ''
  let collapseLabel = shortChapter + title
  if (collapseLabel.length > 6) collapseLabel = collapseLabel.slice(0, 6)

  // --collapse-progress 设置在 inflow 层自身（CSS 变量向上继承无效，必须同级或父级）
  useScrollCollapse(inflowRef)

  // IO 用文字块注册（紧贴文字位置，避免背景宽度干扰）
  useEffect(() => {
    const el = textBlockRef.current
    if (!el) return
    registerChapter(el, collapseLabel)
    return () => unregisterChapter(el)
  }, [collapseLabel])

  return (
    <div className="chapter-collapse-container">
      {/* IN-FLOW 层 — scrollCollapse 对此 ref 设置 --collapse-progress */}
      <div
        ref={inflowRef}
        className="chapter-collapse-inflow"
        style={{
          opacity:
            'calc(1 - max(0, var(--collapse-progress, 0) - 0.4) * 3.33)',
          transform:
            'translateX(calc(var(--collapse-progress, 0) * -60px))',
          pointerEvents: 'none',
        }}
      >
        {/* 全宽背景 — 负 margin 拉伸至视口边缘 */}
        <div
          className="py-6 md:py-8"
          style={{
            background: 'rgba(185,200,190,0.35)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
          }}
        >
          {/* 文字块 — IO 观察此元素 */}
          <div ref={textBlockRef} className="max-w-6xl mx-auto px-6">
            <SectionTitle
              chapter={chapter}
              title={title}
              subtitle={subtitle}
              align={align}
              mode={mode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
