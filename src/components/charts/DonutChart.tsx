import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleOrdinal } from '@visx/scale'
import { useTooltip, TooltipWithBounds as Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { FadeInView } from '@/components/shared/FadeInView'

interface DonutData {
  label: string
  value: number
}

interface DonutChartProps {
  data: DonutData[]
  width: number
  height: number
  colors?: string[]
  /** 中心文本 */
  centerLabel?: string
  centerValue?: string
  /** 环的厚度 */
  thickness?: number
  /** 紧凑模式 — 缩小标签和中心文本 */
  compact?: boolean
}

export function DonutChart({
  data,
  width,
  height,
  colors = ['#A8C5C3', '#B5C5B0', '#C4BF9E', '#CBB28F', '#C4A882'],
  centerLabel,
  centerValue,
  thickness = 40,
  compact = false,
}: DonutChartProps) {
  const radiusPadding = compact ? 8 : 0
  const radius = Math.min(width, height) / 2 - radiusPadding
  // 紧凑模式下自动减薄环宽，防止内圆过小消失
  const effectiveThickness = compact ? Math.min(thickness, radius * 0.70) : thickness
  const innerRadius = Math.max(radius - effectiveThickness, radius * 0.18)

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<DonutData>()

  const colorScale = useMemo(
    () =>
      scaleOrdinal<string, string>({
        domain: data.map((d) => d.label),
        range: colors,
      }),
    [data, colors]
  )

  if (width < 10) return null

  const total = data.reduce((sum, d) => sum + d.value, 0)

  // 紧凑模式下缩小标签延伸距离，防止溢出容器
  const labelLineStart = compact ? 1.02 : 1.30
  const labelLineEnd = compact ? 1.08 : 1.60
  const labelTextPos = compact ? 1.12 : 1.65
  const labelClass = compact ? 'text-[6px]' : 'text-xs'
  const labelValueClass = compact ? 'text-[6px]' : 'text-[10px]'
  const labelValueGap = compact ? 7 : 14
  const centerValueClass = compact ? 'text-sm' : 'text-2xl'
  const centerLabelClass = compact ? 'text-[8px]' : 'text-xs'
  const centerLabelY = centerValue ? (compact ? 10 : 18) : 0

  return (
    <FadeInView variant="scale" threshold={0.2}>
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <Group left={width / 2} top={height / 2}>
          <Pie
            data={data}
            pieValue={(d) => d.value}
            outerRadius={radius - 4}
            innerRadius={innerRadius}
            padAngle={0.02}
          >
            {(pie) =>
              pie.arcs.map((arc, i) => {
                const [centroidX, centroidY] = pie.path.centroid(arc)
                const arcColor = colorScale(arc.data.label) || colors[0]

                return (
                  <motion.g key={`arc-${arc.data.label}-${i}`}>
                    <motion.path
                      d={pie.path(arc) || ''}
                      fill={arcColor}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.1 + i * 0.1,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                      onMouseMove={(event) => {
                        const coords = localPoint(event)
                        if (!coords) return
                        showTooltip({
                          tooltipData: arc.data,
                          tooltipLeft: coords.x + width / 2,
                          tooltipTop: coords.y + height / 2,
                        })
                      }}
                      onMouseLeave={hideTooltip}
                      style={{ cursor: 'pointer' }}
                    />
                    {/* 标签线 + 文本（紧凑模式仅对占比 > 8% 的扇区显示） */}
                    {arc.data.value / total > (compact ? 0.08 : 0.05) && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        <line
                          x1={centroidX * labelLineStart}
                          y1={centroidY * labelLineStart}
                          x2={centroidX * labelLineEnd}
                          y2={centroidY * labelLineEnd}
                          stroke={arcColor}
                          strokeWidth={compact ? 0.6 : 1}
                          opacity={0.5}
                        />
                        <text
                          x={centroidX * labelTextPos}
                          y={centroidY * labelTextPos}
                          textAnchor={centroidX > 0 ? 'start' : 'end'}
                          dominantBaseline="middle"
                          className={`${labelClass} fill-charcoal font-sans`}
                        >
                          {arc.data.label}
                        </text>
                        <text
                          x={centroidX * labelTextPos}
                          y={centroidY * labelTextPos + labelValueGap}
                          textAnchor={centroidX > 0 ? 'start' : 'end'}
                          dominantBaseline="middle"
                          className={`${labelValueClass} fill-slate font-mono`}
                        >
                          {arc.data.value}%
                        </text>
                      </motion.g>
                    )}
                  </motion.g>
                )
              })
            }
          </Pie>

          {/* 中心文本 */}
          {(centerValue || centerLabel) && (
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            >
              {centerValue && (
                <text
                  y={-4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${centerValueClass} font-bold fill-charcoal font-serif`}
                >
                  {centerValue}
                </text>
              )}
              {centerLabel && (
                <text
                  y={centerLabelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${centerLabelClass} fill-slate font-sans`}
                >
                  {centerLabel}
                </text>
              )}
            </motion.g>
          )}
        </Group>
      </svg>

      {tooltipOpen && tooltipData && tooltipTop != null && tooltipLeft != null && (
        <Tooltip
          top={tooltipTop + 8}
          left={tooltipLeft + 8}
          className="bg-charcoal text-cream text-xs rounded-lg px-3 py-2 shadow-lg font-sans"
        >
          <strong>{tooltipData.label}</strong>: {tooltipData.value}%
        </Tooltip>
      )}
    </FadeInView>
  )
}
