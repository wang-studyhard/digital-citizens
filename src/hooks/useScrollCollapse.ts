import { useEffect, useRef, type RefObject } from 'react'

/**
 * 章节收缩追踪 —— 将元素在视口中的位置映射为 --collapse-progress (0~1)
 * 0 = 完全可见（视口底部以下）  1 = 已滚出视口顶部
 * rAF 节流，不触发 React 重渲染
 * onChange 回调用于外部报告进度（如竞争唯一固定标签位）
 */
export function useScrollCollapse(
  ref: RefObject<HTMLElement | null>,
  onChange?: (progress: number) => void,
) {
  const ticking = useRef(false)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const update = () => {
      const el = ref.current
      if (!el) {
        ticking.current = false
        return
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = (vh - rect.top) / (vh + rect.height)
      const p = Math.max(0, Math.min(1, raw))
      el.style.setProperty('--collapse-progress', p.toFixed(3))
      onChangeRef.current?.(p)
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
