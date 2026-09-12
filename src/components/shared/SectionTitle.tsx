interface SectionTitleProps {
  chapter?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  mode?: 'light' | 'dark'
}

/** 章节标题保持首屏可见；动画只作为进入后的轻微增强，不承担内容显示。 */
export function SectionTitle({
  chapter,
  title,
  subtitle,
  align = 'center',
  mode = 'light',
}: SectionTitleProps) {
  const isDark = mode === 'dark'
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`${alignClass} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      <h2
        className="chapter-title text-[clamp(2.25rem,6vw,4.5rem)] text-charcoal"
      >
        {chapter && <span className="mr-3 text-[0.55em] font-normal text-duck-300/80">{chapter}</span>}
        {title}
      </h2>

      {subtitle && (
        <p
          className={`max-w-[70ch] text-base md:text-lg leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${isDark ? 'text-duck-200/85' : 'text-slate'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
