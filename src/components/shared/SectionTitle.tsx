import { motion } from 'framer-motion'

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
    <motion.div
      className={alignClass}
      initial={false}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2
        className="font-serif font-bold leading-tight tracking-[0.02em]"
        style={{
          fontSize: 'clamp(2.25rem, 6vw, 4.25rem)',
          color: '#b9c8be',
          textShadow: '0 1px 3px rgba(0,0,0,0.18), 0 0 22px rgba(185,200,190,0.14)',
          marginBottom: subtitle ? '0.75rem' : '0',
        }}
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
    </motion.div>
  )
}
