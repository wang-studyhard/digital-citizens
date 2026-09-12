import { useEffect, useRef, useState, useCallback } from 'react'
import * as echarts from 'echarts'
import { FadeInView } from '@/components/shared/FadeInView'
import type { GeoHotspot } from '@/types'

// ============================================================
// ChinaMapScatter · 中国数字游民热点地图 (ECharts 6)
// 深海水下图 · 呼吸光晕标记 · effectScatter 涟漪动画
// GeoJSON: DataV GeoAtlas v3 — 含完整疆域 + 南海诸岛
// ============================================================

const CHINA_GEOJSON_URL = './geojson/china.json'

// ---------- 莫兰迪鸭蛋青 · 水下暗色体系 ----------
const OCEAN_BG = '#0a1929'
const PROVINCE_FILL = 'rgba(185,200,190,0.08)'
const PROVINCE_STROKE = '#b9c8be'
const GLOW_COLOR = '#b9c8be'
const MARKER_FILL = '#c8d9d6'
const LABEL_COLOR = '#c8d9d6'

// ---------- 地图中心 & 缩放 ----------
const MAP_CENTER: [number, number] = [104.5, 35.5]
const MAP_ZOOM = 1.2

interface ChinaMapScatterProps {
  hotspots: GeoHotspot[]
  width: number
  height: number
  onSelect?: (city: string) => void
}

interface MapDataItem {
  name: string
  value: [number, number, number]
  province?: string
  community?: string
  description?: string
}

function isMapDataItem(value: unknown): value is MapDataItem {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return typeof record.name === 'string' && Array.isArray(record.value)
}

// ============================================================
// ECharts 配置构建
// ============================================================
function buildEChartsOption(
  hotspots: GeoHotspot[],
  hasMap: boolean,
): echarts.EChartsOption {
  // ---- 散点数据: 坐标只用于定位，不映射热度或规模 ----
  const scatterData = hotspots.map((h) => ({
    name: h.city,
    value: [h.coordinates[0], h.coordinates[1], 1] as [
      number,
      number,
      number,
    ],
    province: h.province,
    community: h.community,
    description: h.description,
  }))

  // ---- Tooltip: 深海主题卡片 ----
  const tooltip: echarts.EChartsOption['tooltip'] = {
    trigger: 'item',
    backgroundColor: '#0d2333',
    borderColor: 'rgba(185, 200, 190, 0.25)',
    borderWidth: 1,
    padding: [10, 12],
    textStyle: { color: '#c8d9d6', fontSize: 11, fontFamily: 'sans-serif' },
    extraCssText:
      'border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); max-width: 220px;',
    formatter: (params) => {
      const current = Array.isArray(params) ? params[0] : params
      const d = current?.data
      if (!isMapDataItem(d)) return ''
      return [
        `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">`,
        `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${MARKER_FILL};box-shadow:0 0 8px ${GLOW_COLOR};"></span>`,
        `<strong style="font-size:14px;">${d.name}</strong>`,
        `<span style="font-size:10px;opacity:0.45;margin-left:auto;">${d.province || ''}</span>`,
        `</div>`,
        `<div style="font-size:11px;margin-bottom:4px;opacity:0.75;">案例地点</div>`,
        d.description
          ? `<div style="font-size:10px;opacity:0.65;margin-top:4px;line-height:1.4;">${d.description}</div>`
          : '',
      ].join('')
    },
  }

  // ---- 散点系列 ----
  const scatterSeries: echarts.EChartsOption['series'] = [
    {
      type: 'effectScatter',
      coordinateSystem: hasMap ? 'geo' : 'cartesian2d',
      data: scatterData,
      symbol: 'circle',
      symbolSize: 10,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke' as const,
        scale: 3.5,
        period: 5,
        number: 2,
      },
      itemStyle: {
        color: MARKER_FILL,
        shadowBlur: 14,
        shadowColor: GLOW_COLOR,
        shadowOffsetY: 0,
        borderColor: '#fff',
        borderWidth: 1,
        opacity: 0.92,
      },
      label: {
        show: true,
        formatter: '{b}',
        position: 'right',
        distance: 6,
        color: LABEL_COLOR,
        fontSize: 11,
        fontFamily: 'system-ui, sans-serif',
        fontWeight: 'normal',
        textShadowBlur: 4,
        textShadowColor: 'rgba(0,0,0,0.7)',
      },
      emphasis: {
        scale: 2.2,
        itemStyle: {
          color: '#ffffff',
          shadowBlur: 24,
          shadowColor: '#ffffff',
        },
        label: {
          fontSize: 13,
          fontWeight: 'bold',
        },
      },
      zlevel: 2,
    } satisfies echarts.EffectScatterSeriesOption,
  ]

  // ---- 基础配置 ----
  const baseOption: echarts.EChartsOption = {
    backgroundColor: OCEAN_BG,
    tooltip,
    series: scatterSeries,
  }

  // ---- 有地图: geo 组件 ----
  if (hasMap) {
    baseOption.geo = {
      map: 'china',
      roam: false,
      zoom: MAP_ZOOM,
      center: MAP_CENTER,
      aspectScale: 0.85,
      layoutCenter: ['50%', '50%'],
      layoutSize: '100%',
      itemStyle: {
        areaColor: PROVINCE_FILL,
        borderColor: PROVINCE_STROKE,
        borderWidth: 0.8,
        borderType: 'solid' as const,
      },
      emphasis: {
        label: { show: false },
        itemStyle: { areaColor: '#1a4a52' },
      },
      silent: true, // 地图不响应鼠标事件，由散点接管
      regions: [
        // 南海诸岛单列区域 — 如果 GeoJSON 包含则高亮标识
        {
          name: '南海诸岛',
          itemStyle: { areaColor: PROVINCE_FILL, borderColor: '#b9c8be' },
        },
      ],
    }
  } else {
    // ---- 无地图降级: 简易经纬度坐标网格 ----
    baseOption.grid = {
      left: '8%',
      right: '8%',
      top: '12%',
      bottom: '10%',
      containLabel: true,
    }
    baseOption.xAxis = {
      type: 'value',
      name: '经度 (°E)',
      min: 75,
      max: 135,
      nameTextStyle: { color: 'rgba(185,200,190,0.25)', fontSize: 9 },
      axisLabel: { color: 'rgba(185,200,190,0.3)', fontSize: 9 },
      axisLine: { lineStyle: { color: 'rgba(185,200,190,0.1)' } },
      splitLine: { lineStyle: { color: 'rgba(185,200,190,0.05)' } },
    }
    baseOption.yAxis = {
      type: 'value',
      name: '纬度 (°N)',
      min: 15,
      max: 55,
      nameTextStyle: { color: 'rgba(185,200,190,0.25)', fontSize: 9 },
      axisLabel: { color: 'rgba(185,200,190,0.3)', fontSize: 9 },
      axisLine: { lineStyle: { color: 'rgba(185,200,190,0.1)' } },
      splitLine: { lineStyle: { color: 'rgba(185,200,190,0.05)' } },
    }
    // 降级时仍使用等大小点，避免把坐标图误读成排名图。
  }

  return baseOption
}

// ============================================================
// 主组件
// ============================================================
export function ChinaMapScatter({
  hotspots,
  width,
  height,
  onSelect,
}: ChinaMapScatterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasMap, setHasMap] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  // ---------- 加载 GeoJSON → 注册地图 ----------
  useEffect(() => {
    let cancelled = false

    fetch(CHINA_GEOJSON_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((geoJson) => {
        if (cancelled) return
        echarts.registerMap('china', geoJson)
        setHasMap(true)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        console.warn('[ChinaMap] GeoJSON 加载失败:', err.message)
        setFetchError(true)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  // ---------- 初始化 / 更新 ECharts ----------
  const updateChart = useCallback(() => {
    if (!containerRef.current || loading) return

    // 首次创建实例
    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current, undefined, {
        devicePixelRatio: window.devicePixelRatio || 1,
        renderer: 'canvas',
      })
    }

    const option = buildEChartsOption(hotspots, hasMap)
    chartRef.current.setOption(option, true)
    chartRef.current.off('click')
    chartRef.current.on('click', (params) => {
      if (params?.name) onSelect?.(params.name)
    })
  }, [hotspots, hasMap, loading, onSelect])

  // 当状态就绪时初始化
  useEffect(() => {
    updateChart()
  }, [updateChart])

  // ---------- 尺寸变化时 resize ----------
  useEffect(() => {
    if (chartRef.current && width > 0 && height > 0) {
      chartRef.current.resize({ width, height })
    }
  }, [width, height])

  // ---------- 窗口 resize ----------
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ---------- 清理 ----------
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose()
        chartRef.current = null
      }
    }
  }, [])

  // ================================================================
  // 边界检查
  // ================================================================
  if (width < 10 || height < 10) return null

  // ================================================================
  // 始终渲染 ECharts 容器 — 海洋背景立即可见
  // GeoJSON 加载期间显示海底氛围（容器已初始化），加载完成后
  // setOption 更新为完整地图。消除"白屏等待"感。
  // ================================================================
  return (
    <FadeInView variant="fadeIn" threshold={0.1}>
      <div style={{ position: 'relative', width, height }}>
        {/* ECharts 容器 — 始终存在，loading 期间也初始化 */}
        <div
          ref={containerRef}
          style={{
            width,
            height,
            background: OCEAN_BG,
            borderRadius: 12,
          }}
        />

        {/* 加载指示器 — 半透明叠加，不遮挡海底背景 */}
        {loading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 5,
              background:
                'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10,25,41,0.3) 100%)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {/* 呼吸光点 — 模拟海底标记 */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#b9c8be',
                  boxShadow: '0 0 12px rgba(185,200,190,0.5), 0 0 28px rgba(185,200,190,0.2)',
                  animation: 'map-pulse 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  color: 'rgba(200,217,214,0.4)',
                  fontSize: 11,
                  fontFamily: 'system-ui, sans-serif',
                  letterSpacing: '0.05em',
                }}
              >
                地图加载中…
              </span>
            </div>
          </div>
        )}

        {/* 降级提示 (无地图底图时显示) */}
        {fetchError && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(10,25,41,0.85)',
              border: '1px solid rgba(185,200,190,0.15)',
              borderRadius: 6,
              padding: '4px 12px',
              color: 'rgba(200,217,214,0.5)',
              fontSize: 10,
              fontFamily: 'sans-serif',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            地图底图加载失败 — 下方案例列表仍可阅读
          </div>
        )}
      </div>
    </FadeInView>
  )
}
