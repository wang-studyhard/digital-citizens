import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { scaleLinear } from '@visx/scale'
import { curveMonotoneX } from '@visx/curve'
import { useTooltip, TooltipWithBounds as Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { FadeInView } from '@/components/shared/FadeInView'

// ============================================================
// MultiLineChart · 多折线趋势图
// 支持年度模式（2-4个数据点）和月度模式（36个数据点）
// 月度模式自动启用 45° 倾斜标签 + 间隔显示 + 细线宽
// ============================================================

interface LineDataPoint {
  year: number
  month?: number // 1-12; present → monthly mode
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
  // ---------- 模式检测 ----------
  const isMonthly = useMemo(() => {
    if (series.length === 0) return false
    const first = series[0].data
    return first.length > 0 && first[0].month !== undefined
  }, [series])

  const dataLength = useMemo(() => {
    return Math.max(...series.map((s) => s.data.length), 0)
  }, [series])

  // ---------- 布局 ----------
  const margin = {
    top: 16,
    right: 140,
    bottom: isMonthly ? 56 : 36,
    left: 48,
  }
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  // ---------- 值域 ----------
  const allValues = series.flatMap((s) => s.data.map((d) => d.percentage))
  const yMin = Math.max(0, Math.min(...allValues) - 5)
  const yMaxVal = Math.min(40, Math.max(...allValues) + 5)

  // ---------- 刻度 ----------
  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, Math.max(dataLength - 1, 1)],
        range: [0, xMax],
      }),
    [dataLength, xMax],
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [yMin, yMaxVal],
        range: [yMax, 0],
        nice: true,
      }),
    [yMax, yMin, yMaxVal],
  )

  // ---------- X轴标签 ----------
  const formatXLabel = (idx: number): string => {
    const pt = series[0]?.data[idx]
    if (!pt) return ''
    if (pt.month !== undefined) {
      return `${pt.year}-${String(pt.month).padStart(2, '0')}`
    }
    return `${pt.year}`
  }

  /** 哪些索引需要显示标签（月度：每3个 + 首尾；年度：全部） */
  const labelIndices = useMemo(() => {
    const indices: number[] = []
    if (isMonthly) {
      for (let i = 0; i < dataLength; i += 3) indices.push(i)
      if (indices[indices.length - 1] !== dataLength - 1) {
        indices.push(dataLength - 1)
      }
    } else {
      for (let i = 0; i < dataLength; i++) indices.push(i)
    }
    return indices
  }, [isMonthly, dataLength])

  // ---------- Tooltip ----------
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<{ category: string; label: string; value: number }>()

  if (width < 10 || dataLength === 0) return null

  return (
    <FadeInView variant="fadeIn" threshold={0.15}>
      <svg width={width} height={height}>
        {/* ---- 网格线 ---- */}
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
          {/* ---- Y轴刻度 ---- */}
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

          {/* ---- X轴刻度（月度模式：-45°倾斜 + 间隔显示） ---- */}
          {labelIndices.map((idx, i) => {
            const x = xScale(idx)
            if (x === undefined) return null
            const label = formatXLabel(idx)
            return (
              <motion.text
                key={`xtick-${idx}`}
                x={x}
                y={isMonthly ? yMax + 14 : yMax + 22}
                textAnchor={isMonthly ? 'end' : 'middle'}
                fontSize={isMonthly ? 9 : 12}
                transform={
                  isMonthly ? `rotate(-45, ${x}, ${yMax + 14})` : undefined
                }
                className="fill-slate font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                {label}
              </motion.text>
            )
          })}

          {/* ---- 折线 ---- */}
          {series.map((s, si) => (
            <motion.g
              key={`line-${s.category}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + si * 0.1 }}
            >
              <LinePath
                data={s.data}
                x={(_, idx) => xScale(idx) ?? 0}
                y={(d) => yScale(d.percentage)}
                stroke={colors[si % colors.length]}
                strokeWidth={2}
                curve={curveMonotoneX}
              />
              {/* 数据点：月度模式减小半径 + 间隔显示 */}
              {s.data.map((d, di) => {
                const cx = xScale(di) ?? 0
                const cy = yScale(d.percentage)
                const r = isMonthly ? (di % 3 === 0 ? 3 : 1.5) : 4
                return (
                  <motion.circle
                    key={`dot-${s.category}-${di}`}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={colors[si % colors.length]}
                    initial={{ r: 0 }}
                    animate={{ r }}
                    transition={{
                      delay: 0.8 + si * 0.1 + di * 0.003,
                      duration: 0.3,
                    }}
                    onMouseMove={(event) => {
                      const coords = localPoint(event)
                      if (!coords) return
                      showTooltip({
                        tooltipData: {
                          category: s.category,
                          label: formatXLabel(di),
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

        {/* ---- 图例（右侧） ---- */}
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

      {/* ---- Tooltip ---- */}
      {tooltipOpen && tooltipData && tooltipTop != null && tooltipLeft != null && (
        <Tooltip
          top={tooltipTop - 8}
          left={tooltipLeft}
          className="bg-charcoal text-cream text-xs rounded-lg px-3 py-2 shadow-lg font-sans"
        >
          <strong>{tooltipData.category}</strong>
          <br />
          {tooltipData.label}: {tooltipData.value}%
        </Tooltip>
      )}
    </FadeInView>
  )
}
