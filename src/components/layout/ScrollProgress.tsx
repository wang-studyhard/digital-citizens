import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CHAPTERS = [
  { id: 'hero', label: '首页' },
  { id: 'chapter1', label: '一' },
  { id: 'chapter2', label: '二' },
  { id: 'chapter3', label: '三' },
  { id: 'chapter4', label: '四' },
  { id: 'chapter5', label: '五' },
]

/**
 * 侧边滚动进度指示器（仅桌面端显示）
 */
export function ScrollProgress() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight - viewHeight
      setProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0)

      // 判断当前在哪个章节
      let currentIdx = 0
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= viewHeight * 0.4) {
            currentIdx = i
            break
          }
        }
      }
      setActiveIndex(currentIdx)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
      {/* 进度竖线 */}
      <div className="relative flex flex-col items-center gap-5">
        {/* 背景线 */}
        <div className="absolute top-0 bottom-0 w-px bg-duck-200/40 left-1/2 -translate-x-1/2" />

        {/* 激活进度 */}
        <motion.div
          className="absolute top-0 w-px bg-duck-500 left-1/2 -translate-x-1/2 origin-top"
          style={{ scaleY: progress, height: '100%' }}
        />

        {/* 圆点 */}
        {CHAPTERS.map((ch, i) => (
          <button
            key={ch.id}
            onClick={() => scrollTo(ch.id)}
            className="relative z-10 group flex items-center"
            aria-label={`滚动到${ch.label}`}
          >
            <motion.div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-duck-600 scale-125'
                  : 'bg-duck-200/60 hover:bg-duck-400'
              }`}
            />
            <span
              className={`absolute right-5 text-xs font-sans whitespace-nowrap transition-all duration-200 ${
                i === activeIndex
                  ? 'text-charcoal opacity-100 translate-x-0'
                  : 'text-slate opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
              }`}
            >
              {ch.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
