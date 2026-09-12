import { SectionTitle } from './SectionTitle'
import { ChapterBubbles } from './ChapterBubbles'

// ============================================================
// ChapterHeader · 章节标题容器
// 全宽背景承接章节节奏，文字保持稳定可读
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
  return (
    <div className="chapter-header">
      {/* 全宽背景 + 动态气泡 — 负 margin 拉伸至视口边缘 */}
      <div
        className="relative overflow-hidden py-8 md:py-10"
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

        <div className="relative z-10 mx-auto max-w-6xl px-6">
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
  )
}
