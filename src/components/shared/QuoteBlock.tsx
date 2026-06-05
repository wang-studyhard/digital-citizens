import { motion } from 'framer-motion'
import { FadeInView } from './FadeInView'

interface QuoteBlockProps {
  text: string
  attribution?: string
  size?: 'normal' | 'large'
  centered?: boolean
}

export function QuoteBlock({
  text,
  attribution,
  size = 'normal',
  centered = true,
}: QuoteBlockProps) {
  const isLarge = size === 'large'

  return (
    <FadeInView
      variant="fadeIn"
      threshold={0.2}
      className={`py-8 md:py-12 ${centered ? 'text-center' : 'text-left'}`}
    >
      <div className="relative inline-block max-w-3xl">
        {/* 上装饰线 — 微光渐变 */}
        {isLarge && (
          <motion.div
            className="mb-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-duck-300/40 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          />
        )}

        {/* 装饰性左引号 — 中式直角引号 */}
        <motion.span
          className={`absolute -top-3 -left-2 md:-top-5 md:-left-4 font-serif text-duck-300/20 select-none leading-none ${
            isLarge ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'
          }`}
          aria-hidden="true"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          「
        </motion.span>

        {/* 引用文本 */}
        <blockquote
          className={`quote-text relative z-10 ${
            isLarge
              ? 'text-lg md:text-xl lg:text-2xl'
              : 'text-base md:text-lg'
          } text-charcoal leading-relaxed ${centered ? 'mx-auto' : ''}`}
          style={{
            textShadow: isLarge
              ? '0 0 60px rgba(185,200,190,0.08), 0 1px 2px rgba(0,0,0,0.1)'
              : undefined,
          }}
        >
          {text}
        </blockquote>

        {/* 装饰性右引号 */}
        <motion.span
          className={`inline-block font-serif text-duck-300/20 select-none leading-none align-bottom ${
            isLarge ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'
          }`}
          aria-hidden="true"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          」
        </motion.span>

        {attribution && (
          <motion.footer
            className="mt-4 text-sm text-slate data-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            — {attribution}
          </motion.footer>
        )}

        {/* 下装饰线 — 微光渐变 */}
        {isLarge && (
          <motion.div
            className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-duck-300/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
        )}
      </div>
    </FadeInView>
  )
}
