import { useEffect, useRef, type RefObject } from 'react'

// ============================================================
// 章节标题模糊追踪
// 元素中心越靠近视口中线越清晰，越靠近上下边缘越模糊
// 模糊范围 0~8px · rAF 节流 · --chapter-blur CSS 变量
// ============================================================

/**
 * 将章节标题的模糊程度绑定到滚动位置
 * - 标题中心在视口中央 50% → blur=0（完全清晰）
 * - 标题中心接近视口顶部/底部 → blur→8px（最大模糊）
 * - will-change: filter 仅在 blur > 0.5px 时启用，避免持续消耗 GPU 资源
 */
export function useChapterBlur(ref: RefObject<HTMLElement | null>) {
  const ticking = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const centerY = rect.top + rect.height * 0.5

      // 视口中央距离 → 模糊值 (V 形曲线)
      const distanceFromCenter = Math.abs(centerY - vh * 0.5)
      const maxDistance = vh * 0.5
      const blur = Math.min(8, Math.max(0, (distanceFromCenter / maxDistance) * 8))

      el.style.setProperty('--chapter-blur', `${blur.toFixed(2)}px`)

      // 条件 will-change: 仅在模糊生效时启用 GPU 合成层
      if (blur > 0.5) {
        el.style.setProperty('will-change', 'filter')
      } else {
        el.style.removeProperty('will-change')
      }

      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])
}
