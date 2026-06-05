import { useEffect, useRef } from 'react'

/**
 * 深度渐退 —— 每个文字元素根据自身在视口中的位置独立计算透明度
 *
 * 规则：元素中心越靠近视口顶部越清晰，越靠近底部越透明
 * 区间：视口中央（opacity=1） → 视口底部边缘（opacity=0.2），线性过渡
 * 视口中央以上的元素保持完全清晰
 *
 * rAF 实时更新，反复滚动连续变化，无一次性事件
 */

const TEXT_SELECTOR = [
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  '.prose-body', '.chapter-title', '.quote-text', '.data-label',
  'blockquote', 'li', 'figcaption', 'label',
].join(', ')

const EXCLUDED = 'button, nav, [data-no-depth], canvas, a, [role="button"]'

export function useDepthFade() {
  const ticking = useRef(false)

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      const half = vh * 0.5 // 视口中央 Y
      const span = vh * 0.5 // 过渡跨度 = 中央→底部

      const els = document.querySelectorAll<HTMLElement>(TEXT_SELECTOR)

      for (let i = 0; i < els.length; i++) {
        const el = els[i]

        // 跳过被排除容器包裹的元素
        if (el.closest(EXCLUDED)) continue

        const rect = el.getBoundingClientRect()

        // 性能：跳过远在视口外的元素
        if (rect.bottom < -400 || rect.top > vh + 400) continue

        const centerY = rect.top + rect.height * 0.5

        // centerY <= half  → depth=0（完全清晰）
        // centerY >= vh    → depth=1（最大渐隐）
        // 中间线性插值
        const depth =
          centerY <= half ? 0 : centerY >= vh ? 1 : (centerY - half) / span

        el.style.setProperty('--depth', depth.toFixed(3))
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
  }, [])
}
