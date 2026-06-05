import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full flex items-center justify-center
                     border border-duck-200/15 cursor-pointer"
          style={{
            background: 'rgba(26,45,46,0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.25), 0 0 24px rgba(168,197,195,0.06)',
          }}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{
            scale: 1.08,
            boxShadow: '0 4px 24px rgba(0,0,0,0.3), 0 0 36px rgba(168,197,195,0.12)',
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="返回顶部"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b9c8be"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
