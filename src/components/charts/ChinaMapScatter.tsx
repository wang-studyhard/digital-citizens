import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Group } from '@visx/group'
import { Mercator } from '@visx/geo'
import { scaleLinear } from '@visx/scale'
import { useTooltip, TooltipWithBounds as Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { FadeInView } from '@/components/shared/FadeInView'
import type { GeoHotspot } from '@/types'

// Simplified China GeoJSON URL (DataV GeoAtlas)
const CHINA_GEOJSON_URL =
  'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'

interface ChinaMapScatterProps {
  hotspots: GeoHotspot[]
  width: number
  height: number
}

interface Feature {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: {
    type: string
    coordinates: number[][][][] | number[][][]
  }
}

interface GeoJSON {
  type: 'FeatureCollection'
  features: Feature[]
}

export function ChinaMapScatter({
  hotspots,
  width,
  height,
}: ChinaMapScatterProps) {
  const [geoData, setGeoData] = useState<GeoJSON | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<GeoHotspot>()

  useEffect(() => {
    let cancelled = false
    fetch(CHINA_GEOJSON_URL)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setGeoData(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  // 散点大小比例
  const sizeScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [1, Math.max(...hotspots.map(() => 5), 5)],
        range: [4, 12],
      }),
    [hotspots]
  )

  if (width < 10) return null

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-duck-50/50 rounded-card" style={{ width, height }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-duck-300 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate font-sans">加载地图数据...</span>
        </div>
      </div>
    )
  }

  if (error || !geoData) {
    // 降级：无地图数据时，仅显示散点
    return (
      <FadeInView variant="fadeIn" threshold={0.1}>
        <svg width={width} height={height}>
          <rect width={width} height={height} fill="#1a2d2e" rx={12} />
          <text
            x={width / 2}
            y={height / 2 - 14}
            textAnchor="middle"
            className="text-sm fill-duck-300 font-sans"
          >
            中国地图数据加载失败
          </text>
          <text
            x={width / 2}
            y={height / 2 + 10}
            textAnchor="middle"
            className="text-xs fill-slate font-sans"
          >
            以下为数字游民热点分布
          </text>

          {/* 仍显示散点 */}
          {hotspots.map((spot, i) => {
            const x = ((spot.coordinates[0] - 75) / 60) * width
            const y = ((55 - spot.coordinates[1]) / 35) * height
            const r = sizeScale(5)

            return (
              <motion.g
                key={spot.city}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              >
                <motion.circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="#6A9897"
                  fillOpacity={0.7}
                  stroke="#fff"
                  strokeWidth={2}
                  initial={{ r: 0 }}
                  animate={{ r }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() =>
                    showTooltip({
                      tooltipData: spot,
                      tooltipLeft: x,
                      tooltipTop: y,
                    })
                  }
                  onMouseLeave={hideTooltip}
                />
                <motion.text
                  x={x}
                  y={y - r - 6}
                  textAnchor="middle"
                  className="text-[10px] fill-charcoal font-sans font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {spot.city}
                </motion.text>
              </motion.g>
            )
          })}
        </svg>
      </FadeInView>
    )
  }

  return (
    <FadeInView variant="fadeIn" threshold={0.1}>
      <svg width={width} height={height} className="overflow-visible">
        <rect width={width} height={height} fill="transparent" rx={12} />

        <Mercator
          data={geoData.features as any}
          fitSize={[[width, height], geoData as any]}
        >
          {(mercator) => {
            const features = mercator.features
            const projection = mercator.projection
            return (
              <>
                {features.map(({ feature, path }, i) => (
                  <motion.path
                    key={`prov-${i}`}
                    d={path || ''}
                    fill="#F0EBE3"
                    stroke="#D5CFC5"
                    strokeWidth={0.5}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  />
                ))}

                {/* 南海诸岛示意框（右下角） */}
                <rect
                  x={width - 80}
                  y={height - 60}
                  width={70}
                  height={50}
                  fill="none"
                  stroke="#D5CFC5"
                  strokeWidth={0.5}
                  rx={2}
                />
                <text
                  x={width - 45}
                  y={height - 35}
                  textAnchor="middle"
                  className="text-[9px] fill-slate font-sans"
                >
                  南海诸岛
                </text>

                {/* 散点 */}
                {hotspots.map((spot, i) => {
                  const projected = projection
                    ? projection(spot.coordinates)
                    : null
                  const x = projected ? projected[0] : width / 2
                  const y = projected ? projected[1] : height / 2

                  if (!projected) return null

                  const r = sizeScale(5)

                  return (
                    <motion.g
                      key={spot.city}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                    >
                      {/* 涟漪 */}
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={r * 1.6}
                        fill="#6A9897"
                        fillOpacity={0.1}
                        initial={{ r: 0 }}
                        animate={{ r: [r * 1.2, r * 2, r * 1.2] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          delay: 1 + i * 0.2,
                          ease: 'easeInOut',
                        }}
                      />
                      {/* 主圆点 */}
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={0}
                        fill="#6A9897"
                        fillOpacity={0.85}
                        stroke="#fff"
                        strokeWidth={2}
                        animate={{ r }}
                        transition={{
                          delay: 0.8 + i * 0.1,
                          duration: 0.5,
                          ease: 'easeOut',
                        }}
                        style={{ cursor: 'pointer' }}
                        onMouseMove={(event) => {
                          const coords = localPoint(event)
                          if (!coords) return
                          showTooltip({
                            tooltipData: spot,
                            tooltipLeft: coords.x,
                            tooltipTop: coords.y,
                          })
                        }}
                        onMouseLeave={hideTooltip}
                      />
                      {/* 城市名 */}
                      <motion.text
                        x={x}
                        y={y - r - 6}
                        textAnchor="middle"
                        className="text-[10px] fill-charcoal font-sans font-medium pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 + i * 0.1 }}
                      >
                        {spot.city}
                      </motion.text>
                      {/* 社区 tag */}
                      {spot.community && (
                        <motion.text
                          x={x}
                          y={y - r - 20}
                          textAnchor="middle"
                          className="text-[8px] fill-duck-600 font-sans pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.8 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                        >
                          {spot.community}
                        </motion.text>
                      )}
                    </motion.g>
                  )
                })}
              </>
            )
          }}
        </Mercator>
      </svg>

      {tooltipOpen && tooltipData && tooltipTop != null && tooltipLeft != null && (
        <Tooltip
          top={tooltipTop + 16}
          left={tooltipLeft + 16}
          className="bg-charcoal text-cream text-xs rounded-lg px-3 py-2 shadow-lg font-sans max-w-[180px]"
        >
          <div className="font-bold text-sm">{tooltipData.city}</div>
          {tooltipData.community && (
            <div className="text-duck-300">{tooltipData.community}</div>
          )}
          {tooltipData.description && (
            <div className="mt-1 text-cream/70">{tooltipData.description}</div>
          )}
        </Tooltip>
      )}
    </FadeInView>
  )
}
