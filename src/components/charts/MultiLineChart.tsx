import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { scaleLinear, scalePoint } from '@visx/scale'
import { curveMonotoneX } from '@visx/curve'
import { useTooltip, TooltipWithBounds as Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { FadeInView } from '@/components/shared/FadeInView'

interface LineDataPoint {
  year: number
  percentage: number
}

interface LineSeries {
  category: string
  data: LineDataPoint[]
}

interface MultiLineChartProps {
  series: LineSeries[]
  width: number
  height: number
  colors?: string[]
}

export function MultiLineChart({
  series,
  width,
  height,
  colors = ['#A8C5C3', '#C4A882', '#6A9897', '#CBB28F', '#87B0AE', '#B3926B', '#4A6B6E'],
}: MultiLineChartProps) {
  const margin = { top: 16, right: 140, bottom: 36, left: 48 }
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const years = useMemo(() => {
    const all = new Set<number>()
    series.forEach((s) => s.data.forEach((d) => all.add(d.year)))
    return Array.from(all).sort()
  }, [series])

  const allValues = series.flatMap((s) => s.data.map((d) => d.percentage))
  const yMin = Math.max(0, Math.min(...allValues) - 5)
  const yMaxVal = Math.min(40, Math.max(...allValues) + 5)

  const xScale = useMemo(
    () =>
      scalePoint<number>({
        domain: years,
        range: [0, xMax],
      }),
    [xMax, years]
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [yMin, yMaxVal],
        range: [yMax, 0],
        nice: true,
      }),
    [yMax, yMin, yMaxVal]
  )

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<{ category: string; year: number; value: number }>()

  if (width < 10) return null

  return (
    <FadeInView variant="fadeIn" threshold={0.15}>
      <svg width={width} height={height}>
        {/* 网格线 */}
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
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        ))}
        <Group left={margin.left} top={margin.top}>
          {/* Y轴刻度 */}
          {yScale.ticks(5).map((tick, i) => (
            <motion.text
              key={`ytick-${tick}`}
              x={-8}
              y={yScale(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className="text-[10px] fill-slate font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              {tick}%
            </motion.text>
          ))}

          {/* X轴刻度 */}
          {years.map((year, i) => {
            const x = xScale(year)
            if (x === undefined) return null
            return (
              <motion.text
                key={`xtick-${year}`}
                x={x}
                y={yMax + 22}
                textAnchor="middle"
                className="text-xs fill-slate font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {year}
              </motion.text>
            )
          })}

          {/* 折线 */}
          {series.map((s, si) => (
            <motion.g
              key={`line-${s.category}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + si * 0.1 }}
            >
              <LinePath
                data={s.data}
                x={(d) => xScale(d.year) ?? 0}
                y={(d) => yScale(d.percentage)}
                stroke={colors[si % colors.length]}
                strokeWidth={2.5}
                curve={curveMonotoneX}
              />
              {/* 数据点 */}
              {s.data.map((d) => {
                const cx = xScale(d.year) ?? 0
                const cy = yScale(d.percentage)
                return (
                  <motion.circle
                    key={`dot-${s.category}-${d.year}`}
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={colors[si % colors.length]}
                    initial={{ r: 0 }}
                    animate={{ r: 4 }}
                    transition={{
                      delay: 0.8 + si * 0.1,
                      duration: 0.3,
                    }}
                    onMouseMove={(event) => {
                      const coords = localPoint(event)
                      if (!coords) return
                      showTooltip({
                        tooltipData: {
                          category: s.category,
                          year: d.year,
                          value: d.percentage,
                        },
                        tooltipLeft: coords.x + margin.left,
                        tooltipTop: coords.y + margin.top,
                      })
                    }}
                    onMouseLeave={hideTooltip}
                    style={{ cursor: 'pointer' }}
                  />
                )
              })}
            </motion.g>
          ))}
        </Group>

        {/* 图例 */}
        <Group left={width - margin.right + 10} top={margin.top}>
          {series.map((s, i) => (
            <motion.g
              key={`legend-${s.category}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <line
                x1={0}
                x2={18}
                y1={8 + i * 22}
                y2={8 + i * 22}
                stroke={colors[i % colors.length]}
                strokeWidth={2}
              />
              <text
                x={24}
                y={12 + i * 22}
                className="text-[10px] fill-slate font-sans"
              >
                {s.category}
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
          <strong>{tooltipData.category}</strong>
          <br />
          {tooltipData.year}年: {tooltipData.value}%
        </Tooltip>
      )}
    </FadeInView>
  )
}
