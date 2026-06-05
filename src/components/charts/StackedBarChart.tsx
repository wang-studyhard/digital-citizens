import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarStack } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { useTooltip, TooltipWithBounds as Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { FadeInView } from '@/components/shared/FadeInView'

interface StackedBarData {
  label: string
  segments: {
    key: string
    value: number
  }[]
}

interface StackedBarChartProps {
  data: StackedBarData[]
  width: number
  height: number
  colors?: string[]
  segmentKeys?: string[]
  staggerDelay?: number
}

export function StackedBarChart({
  data,
  width,
  height,
  colors = ['#A8C5C3', '#B5C5B0', '#C4BF9E', '#CBB28F', '#C4A882'],
  segmentKeys,
  staggerDelay = 0.1,
}: StackedBarChartProps) {
  const margin = { top: 8, right: 20, bottom: 8, left: 90 }
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

  const keys =
    segmentKeys || data[0]?.segments.map((s) => s.key) || []

  const allValues = data.flatMap((d) => d.segments.map((s) => s.value))
  const maxTotal = Math.max(
    ...data.map((d) => d.segments.reduce((sum, s) => sum + s.value, 0))
  )

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        domain: data.map((d) => d.label),
        range: [0, xMax],
        padding: 0.3,
      }),
    [xMax, data]
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, maxTotal * 1.1],
        range: [yMax, 0],
        nice: true,
      }),
    [yMax, maxTotal]
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

  const barWidth = xScale.bandwidth()

  return (
    <FadeInView variant="fadeIn" threshold={0.15}>
      <svg width={width} height={height}>
        {/* Y轴参考线 */}
        {yScale.ticks(4).map((tick) => (
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
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        ))}
        <Group left={margin.left} top={margin.top}>
          <BarStack
            data={data}
            keys={keys}
            x={(d) => d.label}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
            value={(d, key) => d.segments.find((s) => s.key === key)?.value ?? 0}
          >
            {(barStacks) =>
              barStacks.map((barStack, stackIdx) =>
                barStack.bars.map((bar, barIdx) => {
                  const barHeight = bar.height || 0
                  const barY = bar.y || 0

                  return (
                    <motion.rect
                      key={`bar-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={yMax}
                      width={bar.width}
                      height={0}
                      fill={bar.color}
                      rx={barIdx === barStack.bars.length - 1 ? 3 : 0}
                      initial={{ y: yMax, height: 0 }}
                      animate={{
                        y: barY,
                        height: barHeight > 0 ? barHeight : 0,
                      }}
                      transition={{
                        delay: 0.3 + stackIdx * staggerDelay,
                        duration: 0.7,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onMouseMove={(event) => {
                        const coords = localPoint(event)
                        if (!coords) return
                        showTooltip({
                          tooltipData: {
                            key: bar.key,
                            value: bar.bar.data.segments.find((s) => s.key === bar.key)?.value ?? 0,
                            bar: bar.bar.data.label,
                          },
                          tooltipLeft: coords.x + margin.left,
                          tooltipTop: coords.y + margin.top,
                        })
                      }}
                      onMouseLeave={hideTooltip}
                      style={{ cursor: 'pointer' }}
                    />
                  )
                })
              )
            }
          </BarStack>

          {/* X轴标签 */}
          {data.map((d, i) => {
            const x = xScale(d.label)
            if (x === undefined) return null
            return (
              <motion.text
                key={`xlabel-${d.label}`}
                x={x + barWidth / 2}
                y={yMax + 20}
                textAnchor="middle"
                className="text-xs fill-slate font-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
              >
                {d.label}
              </motion.text>
            )
          })}
        </Group>

        {/* 图例 */}
        <Group left={margin.left} top={-4}>
          {keys.map((key, i) => (
            <motion.g
              key={`legend-${key}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <rect
                x={i * 100}
                y={0}
                width={10}
                height={10}
                rx={2}
                fill={colorScale(key)}
              />
              <text
                x={i * 100 + 14}
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

      {tooltipOpen && tooltipData && tooltipTop != null && tooltipLeft != null && (
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
