import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { useTooltip, TooltipWithBounds as Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { FadeInView } from '@/components/shared/FadeInView'

interface BarData {
  label: string
  value: number
  description?: string
}

interface HorizontalBarChartProps {
  data: BarData[]
  width: number
  height: number
  /** 颜色，可以是单色或数组 */
  color?: string | string[]
  /** 数值格式化 */
  formatValue?: (v: number) => string
  /** 延迟 stagger */
  staggerDelay?: number
  /** 自定义边距 (覆盖默认值，适用于小容器) */
  margin?: Partial<{ top: number; right: number; bottom: number; left: number }>
  /** 紧凑模式 — 缩小标签和间距 */
  compact?: boolean
}

export function HorizontalBarChart({
  data,
  width,
  height,
  color = '#A8C5C3',
  formatValue = (v) => `${v}%`,
  staggerDelay = 0.08,
  margin: customMargin,
  compact = false,
}: HorizontalBarChartProps) {
  const defaultMargin = compact
    ? { top: 4, right: 48, bottom: 4, left: 48 }
    : { top: 8, right: 60, bottom: 8, left: 100 }
  const margin = { ...defaultMargin, ...customMargin }
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<BarData>()

  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, Math.max(...data.map((d) => d.value)) * 1.15],
        range: [0, xMax],
        nice: true,
      }),
    [xMax, data]
  )

  const yScale = useMemo(
    () =>
      scaleBand<string>({
        domain: data.map((d) => d.label),
        range: [0, yMax],
        padding: compact ? 0.25 : 0.35,
      }),
    [yMax, data, compact]
  )

  const colors = Array.isArray(color)
    ? color
    : data.map(() => color as string)

  if (width < 10) return null

  const barHeight = yScale.bandwidth()
  const labelClass = compact ? 'text-[7px]' : 'text-xs'
  const valueClass = compact ? 'text-[7px]' : 'text-xs'

  return (
    <FadeInView variant="fadeIn" threshold={0.15}>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {/* Y轴标签 */}
          {data.map((d, i) => {
            const y = yScale(d.label)
            if (y === undefined) return null
            return (
              <motion.text
                key={`label-${d.label}`}
                x={-8}
                y={y + barHeight / 2}
                textAnchor="end"
                dominantBaseline="middle"
                className={`${labelClass} fill-slate font-sans`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: -8 }}
                transition={{ delay: 0.2 + i * staggerDelay, duration: 0.5 }}
              >
                {d.label}
              </motion.text>
            )
          })}

          {/* 柱子 */}
          {data.map((d, i) => {
            const barWidth = xScale(d.value)
            const y = yScale(d.label)
            const c = colors[i] || '#A8C5C3'
            if (y === undefined) return null

            return (
              <motion.g key={`bar-${d.label}`}>
                <motion.rect
                  x={0}
                  y={y}
                  width={0}
                  height={barHeight}
                  fill={c}
                  rx={4}
                  initial={{ width: 0 }}
                  animate={{ width: barWidth }}
                  transition={{
                    delay: 0.3 + i * staggerDelay,
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  onMouseMove={(event) => {
                    const coords = localPoint(event)
                    if (!coords) return
                    showTooltip({
                      tooltipData: d,
                      tooltipLeft: coords.x + margin.left,
                      tooltipTop: coords.y + margin.top,
                    })
                  }}
                  onMouseLeave={hideTooltip}
                  style={{ cursor: 'pointer' }}
                />
                {/* 数值标签 */}
                <motion.text
                  x={barWidth + 6}
                  y={y + barHeight / 2}
                  dominantBaseline="middle"
                  className={`${valueClass} fill-charcoal font-mono`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: barWidth > 0 ? 1 : 0 }}
                  transition={{
                    delay: 0.8 + i * staggerDelay,
                    duration: 0.4,
                  }}
                >
                  {formatValue(d.value)}
                </motion.text>
              </motion.g>
            )
          })}
        </Group>
      </svg>

      {tooltipOpen && tooltipData && tooltipTop != null && tooltipLeft != null && (
        <Tooltip
          top={tooltipTop - 8}
          left={tooltipLeft}
          className="bg-charcoal text-cream text-xs rounded-lg px-3 py-2 shadow-lg font-sans"
        >
          <div>
            <strong>{tooltipData.label}</strong>: {formatValue(tooltipData.value)}
          </div>
          {tooltipData.description && (
            <div className="text-duck-300 mt-0.5">{tooltipData.description}</div>
          )}
        </Tooltip>
      )}
    </FadeInView>
  )
}
