import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  /** 目标值 */
  end: number
  /** 动画持续时间（毫秒） */
  duration?: number
  /** 小数位数 */
  decimals?: number
  /** 是否启用（例如：进入视口时才启用） */
  enabled?: boolean
  /** 前缀 */
  prefix?: string
  /** 后缀 */
  suffix?: string
}

/**
 * 数字滚动动画 hook
 * 用于 BigNumber 等组件
 */
export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  enabled = true,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const startValueRef = useRef(0)

  useEffect(() => {
    if (!enabled) {
      setValue(0)
      return
    }

    startValueRef.current = value
    startTimeRef.current = null

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // easeOutExpo 缓动函数
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      const current =
        startValueRef.current + (end - startValueRef.current) * eased
      setValue(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [end, duration, enabled])

  return enabled ? Number(value.toFixed(decimals)) : 0
}
