import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const CHAPTERS = [
  { id: 'chapter1', label: '画像', number: '一' },
  { id: 'chapter2', label: '动因', number: '二' },
  { id: 'chapter3', label: '洄游', number: '三' },
  { id: 'chapter4', label: '政策', number: '四' },
  { id: 'chapter5', label: '结语', number: '五' },
]

export function NavBar() {
  const progress = useScrollProgress()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeChapter, setActiveChapter] = useState<string | null>(null)

  const isScrolled = progress > 0.03

  // ---- 滚动方向检测（隐藏/显示导航栏） ----
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // ---- 当前章节检测 ----
  useEffect(() => {
    const handleChapterDetect = () => {
      const viewHeight = window.innerHeight
      let current: string | null = null

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= viewHeight * 0.45) {
            current = CHAPTERS[i].id
            break
          }
        }
      }
      setActiveChapter(current)
    }

    window.addEventListener('scroll', handleChapterDetect, { passive: true })
    handleChapterDetect()
    return () => window.removeEventListener('scroll', handleChapterDetect)
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled ? 'glass-nav' : 'bg-transparent'
      }`}
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={`font-serif font-bold text-lg tracking-tight transition-colors duration-500 ${
              isScrolled ? 'text-charcoal' : 'text-cream'
            }`}
          >
            数字游民
            <span
              className={`text-sm font-sans font-normal ml-1 transition-colors duration-500 ${
                isScrolled ? 'text-slate' : 'text-duck-200'
              }`}
            >
              研究报告
            </span>
          </a>

          {/* 桌面端章节导航 — 当前章节高亮 */}
          <div className="hidden md:flex items-center gap-1">
            {CHAPTERS.map((ch) => {
              const isActive = activeChapter === ch.id
              return (
                <button
                  key={ch.id}
                  onClick={() => scrollTo(ch.id)}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-sans transition-all duration-300 ${
                    isScrolled
                      ? isActive
                        ? 'text-duck-700 bg-duck-100/60'
                        : 'text-slate hover:text-charcoal hover:bg-duck-50'
                      : isActive
                        ? 'text-cream bg-white/10'
                        : 'text-duck-200/70 hover:text-cream hover:bg-white/10'
                  }`}
                >
                  <span className="font-serif mr-1">{ch.number}</span>
                  {ch.label}
                  {/* 活跃指示器 — 底部微光条 */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full"
                      style={{ background: '#b9c8be' }}
                      layoutId="nav-active-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* 移动端汉堡菜单 */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-charcoal' : 'text-cream'
            }`}
            aria-label="菜单"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass-nav border-t border-duck-200/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
              {CHAPTERS.map((ch) => {
                const isActive = activeChapter === ch.id
                return (
                  <button
                    key={ch.id}
                    onClick={() => scrollTo(ch.id)}
                    className={`text-left px-4 py-2.5 rounded-lg transition-colors font-sans text-sm ${
                      isActive
                        ? 'text-duck-700 bg-duck-100/60'
                        : 'text-charcoal hover:bg-duck-50'
                    }`}
                  >
                    <span className={`font-serif mr-2 ${isActive ? 'text-duck-600' : 'text-duck-600'}`}>
                      {ch.number}
                    </span>
                    {ch.label}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
