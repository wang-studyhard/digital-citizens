import { useRef, useEffect } from 'react'
import { SectionTitle } from './SectionTitle'
import { ChapterBubbles } from './ChapterBubbles'
import { useScrollCollapse } from '@/hooks/useScrollCollapse'
import { useChapterBlur } from '@/hooks/useChapterBlur'
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

  // 章节标题模糊追踪 — 视口中央清晰，边缘模糊
  useChapterBlur(textBlockRef)

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
          // 收缩延迟：progress>0.94 才开始渐隐+左移，确保 blur=0 后 ~1s 清晰停顿
          opacity:
            'calc(1 - max(0, var(--collapse-progress, 0) - 0.94) * 16.67)',
          transform:
            'translateX(calc(max(0, var(--collapse-progress, 0) - 0.94) * -1000px))',
          pointerEvents: 'none',
        }}
      >
        {/* 全宽背景 + 动态气泡 — 负 margin 拉伸至视口边缘 */}
        <div
          className="py-8 md:py-10 relative overflow-hidden"
          style={{
            background: 'rgba(185,200,190,0.22)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            boxShadow:
              'inset 0 0 40px rgba(185,200,190,0.10),' +
              '0 1px 0 rgba(185,200,190,0.14),' +
              '0 -1px 0 rgba(185,200,190,0.06)',
            borderTop: '1px solid rgba(185,200,190,0.10)',
            borderBottom: '1px solid rgba(185,200,190,0.10)',
          }}
        >
          {/* 水下气泡层 */}
          <ChapterBubbles />

          {/* 文字块 — IO 观察此元素 */}
          <div ref={textBlockRef} className="chapter-blur-target relative z-10 max-w-6xl mx-auto px-6">
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
