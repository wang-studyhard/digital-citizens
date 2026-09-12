import { SectionTitle } from './SectionTitle'

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
    <div className="chapter-header relative overflow-hidden py-10 md:py-14">
      <div className="chapter-header__rule" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle chapter={chapter} title={title} subtitle={subtitle} align={align} mode={mode} />
      </div>
    </div>
  )
}
