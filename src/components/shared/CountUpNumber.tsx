import { useState, useEffect, useRef } from 'react'

// ============================================================
// CountUpNumber · 滚动触发数字递增动画
// 使用 IntersectionObserver，进入视口时从 0 递增到目标值
//
// 稳健策略：
//  - 立即显示目标值（不依赖 observer 触发才显示数据）
//  - observer 触发后播放 0→value 计数动画作为视觉增强
//  - 使用局部闭包变量管理 once/取消，兼容 React 18 StrictMode
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
  /** 仅播放一次（进入视口后不再重播） */
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
  // 立即显示目标值——不依赖 observer 触发。observer 仅在触发后做一次
  // 0→value 的计数动画（纯视觉增强）
  const [displayValue, setDisplayValue] = useState(value)
  const triggeredRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // 如果值没变且已经触发过，跳过
    if (once && triggeredRef.current && displayValue === value) return

    let cancelled = false
    const targetValue = value

    const play = () => {
      if (cancelled) return
      if (once && triggeredRef.current) return
      triggeredRef.current = true
      animateValue(0, targetValue, duration, decimals, (v) => {
        if (!cancelled) setDisplayValue(v)
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (cancelled) return
        if (entry.isIntersecting) {
          play()
        } else if (!once && !entry.isIntersecting) {
          setDisplayValue(0)
        }
      },
      { threshold },
    )

    observer.observe(el)

    // 兜底：如果元素在 observer 创建时已在视口中，
    // 使用 rAF 延迟一帧触发（让 React 完成 StrictMode 周期）
    const rect = el.getBoundingClientRect()
    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.width > 0 &&
      rect.height > 0
    ) {
      const frame = requestAnimationFrame(() => play())
      return () => {
        cancelled = true
        cancelAnimationFrame(frame)
        observer.disconnect()
      }
    }

    return () => {
      cancelled = true
      observer.disconnect()
    }
    // displayValue 不在 deps 中——play() 通过 setDisplayValue 更新，
    // 此 effect 仅在 value/duration 等变化时重建 observer
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
