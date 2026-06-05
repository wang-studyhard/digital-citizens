import { useInView } from 'react-intersection-observer'
import { useCountUp } from '@/hooks/useCountUp'

interface BigNumberProps {
  /** 数值 */
  value: number
  /** 前缀，如 "¥"、"+" */
  prefix?: string
  /** 后缀，如 "万"、"%"、"+" */
  suffix?: string
  /** 小数位数 */
  decimals?: number
  /** 标签（数值下方的说明文字） */
  label?: string
  /** 动画时长（毫秒） */
  duration?: number
  /** 自定义类名 */
  className?: string
  /** 数值颜色 */
  color?: string
  /** 深色背景模式（标签文字变亮） */
  light?: boolean
}

export function BigNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  duration = 2000,
  className = '',
  color,
  light = false,
}: BigNumberProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    rootMargin: '-20px 0px',
  })

  const counted = useCountUp({
    end: value,
    duration,
    decimals,
    enabled: inView,
  })

  const displayValue = decimals > 0 ? counted.toFixed(decimals) : Math.round(counted).toString()

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div
        className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight"
        style={color ? { color } : undefined}
      >
        {prefix}
        {displayValue}
        {suffix}
      </div>
      {label && (
        <p className={`mt-2 text-sm font-mono tracking-wider ${light ? 'text-duck-200/60' : 'text-slate'}`}>
          {label}
        </p>
      )}
    </div>
  )
}
