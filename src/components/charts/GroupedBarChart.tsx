import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { useTooltip, TooltipWithBounds as Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { FadeInView } from '@/components/shared/FadeInView'

interface GroupedBarData {
  label: string
  segments: {
    key: string
    value: number
  }[]
}

interface GroupedBarChartProps {
  data: GroupedBarData[]
  width: number
  height: number
  /** 收入层级颜色数组，按 segmentKeys 顺序 */
  colors?: string[]
  /** 收入层级 key 列表 */
  segmentKeys?: string[]
  /** 动画交错延迟 */
  staggerDelay?: number
}

/** 莫兰迪鸭蛋青 · 5 级收入阶梯配色 */
const DEFAULT_COLORS = ['#5c7a73', '#7fa998', '#b9c8be', '#d9a066', '#c4a484']

export function GroupedBarChart({
  data,
  width,
  height,
  colors = DEFAULT_COLORS,
  segmentKeys,
  staggerDelay = 0.08,
}: GroupedBarChartProps) {
  const margin = { top: 8, right: 20, bottom: 56, left: 52 }
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<{ key: string; value: number; bar: string }>()

  const keys = segmentKeys || data[0]?.segments.map((s) => s.key) || []

  const maxValue = Math.max(
    ...data.flatMap((d) => d.segments.map((s) => s.value))
  )

  // 外层 scale：4 个经验段分组位置
  const x0Scale = useMemo(
    () =>
      scaleBand<string>({
        domain: data.map((d) => d.label),
        range: [0, xMax],
        padding: 0.32,
      }),
    [xMax, data]
  )

  // 内层 scale：每组内 5 个收入层级位置
  const x1Scale = useMemo(
    () =>
      scaleBand<string>({
        domain: keys,
        range: [0, x0Scale.bandwidth()],
        padding: 0.12,
      }),
    [x0Scale, keys]
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, maxValue * 1.18],
        range: [yMax, 0],
        nice: true,
      }),
    [yMax, maxValue]
  )

  const colorScale = useMemo(
    () =>
      scaleOrdinal<string, string>({
        domain: keys,
        range: colors,
      }),
    [keys, colors]
  )

  if (width < 10 || data.length === 0) return null

  const legendSpacing = Math.min(90, (xMax - 10) / keys.length)

  return (
    <FadeInView variant="fadeIn" threshold={0.15}>
      <svg width={width} height={height}>
        {/* Y 轴网格线 */}
        {yScale.ticks(5).map((tick) => (
          <motion.line
            key={`grid-${tick}`}
            x1={margin.left}
            x2={width - margin.right}
            y1={yScale(tick)}
            y2={yScale(tick)}
            stroke="#DFE6E9"
            strokeWidth={0.5}
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          />
        ))}

        {/* Y 轴刻度标签 */}
        {yScale.ticks(5).map((tick) => (
          <motion.text
            key={`ytick-${tick}`}
            x={margin.left - 8}
            y={yScale(tick)}
            textAnchor="end"
            dominantBaseline="middle"
            className="text-[9px] fill-slate font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            {tick}%
          </motion.text>
        ))}

        <Group left={margin.left} top={margin.top}>
          {/* 分组柱状 */}
          {data.map((d, groupIdx) => {
            const groupX = x0Scale(d.label)
            if (groupX === undefined) return null

            return (
              <g key={`group-${d.label}`}>
                {keys.map((key, barIdx) => {
                  const barX = x1Scale(key)
                  if (barX === undefined) return null

                  const seg = d.segments.find((s) => s.key === key)
                  const value = seg?.value ?? 0
                  const barH = value > 0 ? yMax - yScale(value) : 0
                  const barY = yScale(value)
                  const barW = x1Scale.bandwidth()

                  const delay =
                    0.3 + groupIdx * staggerDelay + barIdx * 0.04

                  return (
                    <motion.rect
                      key={`bar-${d.label}-${key}`}
                      x={groupX + barX}
                      y={yMax}
                      width={barW}
                      height={0}
                      fill={colorScale(key)}
                      rx={barW < 6 ? 1 : 2}
                      initial={{ y: yMax, height: 0 }}
                      animate={{
                        y: barY,
                        height: barH > 0 ? barH : 0,
                      }}
                      transition={{
                        delay,
                        duration: 0.7,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onMouseMove={(event) => {
                        const coords = localPoint(event)
                        if (!coords) return
                        showTooltip({
                          tooltipData: { key, value, bar: d.label },
                          tooltipLeft: coords.x + margin.left,
                          tooltipTop: coords.y + margin.top,
                        })
                      }}
                      onMouseLeave={hideTooltip}
                      style={{ cursor: 'pointer' }}
                    />
                  )
                })}
              </g>
            )
          })}

          {/* X 轴标签（经验段）· 旋转倾斜 */}
          {data.map((d, i) => {
            const cx = (x0Scale(d.label) ?? 0) + x0Scale.bandwidth() / 2
            return (
              <motion.text
                key={`xlabel-${d.label}`}
                x={cx}
                y={yMax + 6}
                textAnchor="end"
                transform={`rotate(-35, ${cx}, ${yMax + 6})`}
                className="text-[11px] fill-slate font-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              >
                {d.label}
              </motion.text>
            )
          })}
        </Group>

        {/* 图例 · 水平排列 */}
        <Group left={margin.left} top={-4}>
          {keys.map((key, i) => (
            <motion.g
              key={`legend-${key}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <rect
                x={i * legendSpacing}
                y={0}
                width={10}
                height={10}
                rx={2}
                fill={colorScale(key)}
              />
              <text
                x={i * legendSpacing + 14}
                y={9}
                className="text-[10px] fill-slate font-sans"
                dominantBaseline="middle"
              >
                {key}
              </text>
            </motion.g>
          ))}
        </Group>
      </svg>

      {tooltipOpen &&
        tooltipData &&
        tooltipTop != null &&
        tooltipLeft != null && (
          <Tooltip
            top={tooltipTop - 8}
            left={tooltipLeft}
            className="bg-charcoal text-cream text-xs rounded-lg px-3 py-2 shadow-lg font-sans"
          >
            <div className="text-duck-300">{tooltipData.bar}</div>
            <strong>{tooltipData.key}</strong>: {tooltipData.value}%
          </Tooltip>
        )}
    </FadeInView>
  )
}
