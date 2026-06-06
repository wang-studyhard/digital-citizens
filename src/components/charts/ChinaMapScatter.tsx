import { useEffect, useRef, useState, useCallback } from 'react'
import * as echarts from 'echarts'
import { FadeInView } from '@/components/shared/FadeInView'
import type { GeoHotspot } from '@/types'

// ============================================================
// ChinaMapScatter · 中国数字游民热点地图 (ECharts 6)
// 深海水下图 · 呼吸光晕标记 · effectScatter 涟漪动画
// GeoJSON: DataV GeoAtlas v3 — 含完整疆域 + 南海诸岛
// ============================================================

const CHINA_GEOJSON_URL =
  'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'

// ---------- 莫兰迪鸭蛋青 · 水下暗色体系 ----------
const OCEAN_BG = '#0a1929'
const PROVINCE_FILL = '#14363d'
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
}

// ============================================================
// ECharts 配置构建
// ============================================================
function buildEChartsOption(
  hotspots: GeoHotspot[],
  hasMap: boolean,
): echarts.EChartsOption {
  // ---- 散点数据: [lng, lat, heatIndex, province?, community?, description?] ----
  const scatterData = hotspots.map((h) => ({
    name: h.city,
    value: [h.coordinates[0], h.coordinates[1], h.heatIndex] as [
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
    formatter: (params: any) => {
      const d = params.data
      if (!d || !d.value) return ''
      const heat = d.value[2] as number
      const heatPct = Math.round(heat * 10)
      const tier =
        heat >= 8 ? '🔥 核心聚集地' : heat >= 6 ? '✨ 新兴目的地' : '📍 潜力城市'
      return [
        `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">`,
        `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${MARKER_FILL};box-shadow:0 0 8px ${GLOW_COLOR};"></span>`,
        `<strong style="font-size:14px;">${d.name}</strong>`,
        `<span style="font-size:10px;opacity:0.45;margin-left:auto;">${d.province || ''}</span>`,
        `</div>`,
        `<div style="font-size:11px;margin-bottom:4px;">${tier}</div>`,
        `<div style="display:flex;align-items:center;gap:6px;">`,
        `<span style="font-size:9px;opacity:0.5;">热度</span>`,
        `<div style="flex:1;height:5px;background:rgba(185,200,190,0.08);border-radius:3px;overflow:hidden;">`,
        `<div style="width:${heatPct}%;height:100%;background:${GLOW_COLOR};border-radius:3px;"></div>`,
        `</div>`,
        `<span style="font-size:11px;font-weight:600;">${heat.toFixed(1)}</span>`,
        `</div>`,
        d.community
          ? `<div style="font-size:10px;opacity:0.55;margin-top:4px;">🏠 ${d.community}</div>`
          : '',
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
      data: scatterData as any,
      symbol: 'circle',
      symbolSize: (val: number[]) => {
        const heat = val[2] as number
        return Math.max(7, Math.min(22, heat * 2.2 + 3))
      },
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
    } as any,
  ]

  // ---- 基础配置 ----
  const baseOption: echarts.EChartsOption = {
    backgroundColor: OCEAN_BG,
    tooltip,
    series: scatterSeries,
  }

  // ---- 有地图: geo 组件 ----
  if (hasMap) {
    ;(baseOption as any).geo = {
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
        scale: 1,
      },
      silent: true, // 地图不响应鼠标事件，由散点接管
      regions: [
        // 南海诸岛单列区域 — 如果 GeoJSON 包含则高亮标识
        {
          name: '南海诸岛',
          itemStyle: { areaColor: '#14363d', borderColor: '#b9c8be' },
        },
      ],
    }
  } else {
    // ---- 无地图降级: 简易经纬度坐标网格 ----
    ;(baseOption as any).grid = {
      left: '8%',
      right: '8%',
      top: '12%',
      bottom: '10%',
      containLabel: true,
    }
    ;(baseOption as any).xAxis = {
      type: 'value',
      name: '经度 (°E)',
      min: 75,
      max: 135,
      nameTextStyle: { color: 'rgba(185,200,190,0.25)', fontSize: 9 },
      axisLabel: { color: 'rgba(185,200,190,0.3)', fontSize: 9 },
      axisLine: { lineStyle: { color: 'rgba(185,200,190,0.1)' } },
      splitLine: { lineStyle: { color: 'rgba(185,200,190,0.05)' } },
    }
    ;(baseOption as any).yAxis = {
      type: 'value',
      name: '纬度 (°N)',
      min: 15,
      max: 55,
      nameTextStyle: { color: 'rgba(185,200,190,0.25)', fontSize: 9 },
      axisLabel: { color: 'rgba(185,200,190,0.3)', fontSize: 9 },
      axisLine: { lineStyle: { color: 'rgba(185,200,190,0.1)' } },
      splitLine: { lineStyle: { color: 'rgba(185,200,190,0.05)' } },
    }
    // 降级时调整 symbolSize 映射（无 heatIndex 参与）
    if (Array.isArray(scatterSeries) && scatterSeries[0]) {
      ;(scatterSeries[0] as any).symbolSize = (val: number[]) =>
        Math.max(8, Math.min(20, (val[2] as number) * 2 + 4))
    }
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
}: ChinaMapScatterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasMap, setHasMap] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  // ---------- 加载 GeoJSON → 注册地图 ----------
  useEffect(() => {
    let cancelled = false

    console.log('[ChinaMap] 开始加载 GeoJSON:', CHINA_GEOJSON_URL)
    fetch(CHINA_GEOJSON_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((geoJson) => {
        if (cancelled) return
        const featureCount = geoJson?.features?.length || 0
        console.log(
          `[ChinaMap] GeoJSON 加载成功 · ${featureCount} 个 feature · 注册为 'china'`,
        )
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
      console.log('[ChinaMap] ECharts 实例已初始化')
    }

    const option = buildEChartsOption(hotspots, hasMap)
    chartRef.current.setOption(option, true)
    console.log(
      `[ChinaMap] setOption 完成 · hasMap=${hasMap} · ${hotspots.length} 个热点`,
    )
  }, [hotspots, hasMap, loading])

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
        console.log('[ChinaMap] ECharts 实例已销毁')
      }
    }
  }, [])

  // ================================================================
  // 边界检查
  // ================================================================
  if (width < 10 || height < 10) return null

  // ---------- 加载态 ----------
  if (loading) {
    return (
      <div
        className="flex items-center justify-center rounded-card"
        style={{ width, height, background: OCEAN_BG }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-duck-300/40 border-t-duck-300 rounded-full animate-spin" />
          <span className="text-sm text-duck-300/60 font-sans">
            加载地图数据...
          </span>
        </div>
      </div>
    )
  }

  // ---------- 渲染: ECharts 容器 (无论 hasMap 或 fetchError 都使用 ECharts 渲染) ----------
  return (
    <FadeInView variant="fadeIn" threshold={0.1}>
      <div style={{ position: 'relative', width, height }}>
        <div
          ref={containerRef}
          style={{
            width,
            height,
            background: OCEAN_BG,
            borderRadius: 12,
          }}
        />
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
            地图底图加载失败 — 显示简易坐标分布
          </div>
        )}
      </div>
    </FadeInView>
  )
}
