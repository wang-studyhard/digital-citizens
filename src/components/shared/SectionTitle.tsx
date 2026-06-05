import { motion } from 'framer-motion'
import { FadeInView } from './FadeInView'

// ============================================================
// SectionTitle · 字符级逐字淡入 + 模糊→锐利
// "第X章"与主标题同字号同行，副标题 1/4 主标题
// ============================================================

interface SectionTitleProps {
  chapter?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  mode?: 'light' | 'dark'
}

/** 字符串拆为字符级 motion.span，stagger 0.02s 模糊→锐利 */
function CharByChar({
  text,
  as: Tag = 'span',
  style,
}: {
  text: string
  as?: 'span' | 'h2'
  style?: React.CSSProperties
}) {
  return (
    <motion.span
      as={Tag}
      style={{ ...style, display: Tag === 'h2' ? 'block' : 'inline' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.02 } },
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={{
            hidden: { opacity: 0.5, filter: 'blur(5px)' },
            visible: { opacity: 1, filter: 'blur(0px)' },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

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
    <FadeInView variant="fadeUp" className={`${alignClass}`}>
      {/* "第X章" + 主标题 — 同一行，同字号 */}
      <CharByChar
        as="h2"
        text={chapter ? `${chapter}  ${title}` : title}
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.4rem)',
          color: '#b9c8be',
          textShadow:
            '0 1px 3px rgba(0,0,0,0.10), 0 0 18px rgba(185,200,190,0.15)',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: 1.3,
          marginBottom: subtitle ? '0.5rem' : '0',
        }}
      />

      {/* 副标题 — 1/4 主标题字号 */}
      {subtitle && (
        <motion.p
          className={`max-w-2xl font-sans leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${isDark ? 'text-duck-200/80' : 'text-slate'}`}
          style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.85rem)' }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </FadeInView>
  )
}
