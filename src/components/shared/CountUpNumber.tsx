import { useState, useEffect, useRef } from 'react'

// ============================================================
// CountUpNumber · 滚动触发数字递增动画
// 使用 IntersectionObserver，进入视口时从 0 递增到目标值
// ============================================================

interface CountUpNumberProps {
  /** 目标数值 */
  value: number
  /** 小数位数 */
  decimals?: number
  /** 前缀（如 ¥） */
  prefix?: string
  /** 后缀（如 %、万） */
  suffix?: string
  /** 动画时长 (ms) */
  duration?: number
  /** 额外的 className */
  className?: string
  /** 触发阈值（元素可见比例） */
  threshold?: number
  /** 仅播放一次 */
  once?: boolean
}

export function CountUpNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1200,
  className = '',
  threshold = 0.3,
  once = true,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !triggered.current)) {
          triggered.current = true
          animateValue(0, value, duration, decimals, setDisplayValue)
        } else if (!once && !entry.isIntersecting) {
          setDisplayValue(0)
          triggered.current = false
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, decimals, threshold, once])

  const formatted =
    decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toString()

  return (
    <span ref={ref} className={`count-up-number tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

// ---- 缓动函数（ease-out cubic） ----
function animateValue(
  from: number,
  to: number,
  duration: number,
  decimals: number,
  setter: (v: number) => void,
) {
  const start = performance.now()
  const diff = to - from

  function tick(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = from + diff * eased
    setter(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current))

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      setter(to) // 确保精确结束值
    }
  }

  requestAnimationFrame(tick)
}
