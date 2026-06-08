import { useEffect, useRef, useCallback } from 'react'
import * as echarts from 'echarts'
import { FadeInView } from '@/components/shared/FadeInView'

// ============================================================
// IncomeGroupedBarChart · 各经验段收入分布 (ECharts 6 分组柱状图)
// 莫兰迪鸭蛋青暗色主题 · 5 级收入阶梯 · 4 组经验段
// 数据来源：NCC 2024《全景式数字游民洞察报告》n=282
// ============================================================

// ---------- 莫兰迪鸭蛋青 · 5 级收入配色 ----------
const INCOME_COLORS = [
  '#5c7a73', // 10万以下 — 深鸭蛋青
  '#7fa998', // 10-20万 — 潭水绿
  '#b9c8be', // 20-50万 — 鸭蛋青高亮
  '#d9a066', // 50-100万 — 暖沙强调
  '#c4a484', // 100万以上 — 浅驼强调
]

const BG_COLOR = '#1a2d2e'
const TEXT_COLOR = '#9bb0b2'
const GRID_COLOR = 'rgba(168, 197, 195, 0.10)'
const AXIS_LINE_COLOR = 'rgba(168, 197, 195, 0.18)'

export interface IncomeGroupData {
  label: string
  segments: { key: string; value: number }[]
}

interface IncomeGroupedBarChartProps {
  data: IncomeGroupData[]
  /** 收入层级 key 列表（保持颜色一致） */
  segmentKeys: string[]
  width: number
  height: number
}

export function IncomeGroupedBarChart({
  data,
  segmentKeys,
  width,
  height,
}: IncomeGroupedBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  // ---------- 构建 ECharts option ----------
  const buildOption = useCallback((): echarts.EChartsOption => {
    const experienceLabels = data.map((d) => d.label)

    // 每个收入层级一个 bar series
    const series: echarts.EChartsOption['series'] = segmentKeys.map(
      (key, idx) => ({
        name: key,
        type: 'bar' as const,
        emphasis: { focus: 'series' as const },
        itemStyle: {
          color: INCOME_COLORS[idx % INCOME_COLORS.length],
          borderRadius: [3, 3, 0, 0],
          borderWidth: 0,
        },
        barMaxWidth: 52,
        barMinWidth: 8,
        barGap: '20%',
        barCategoryGap: '35%',
        label: {
          show: false,
        },
        animationDuration: 800,
        animationDelay: idx * 80,
        animationEasing: 'cubicOut',
        data: data.map((d) => {
          const seg = d.segments.find((s) => s.key === key)
          return seg?.value ?? 0
        }),
      }),
    )

    return {
      backgroundColor: BG_COLOR,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(185, 200, 190, 0.04)',
          },
        },
        backgroundColor: 'rgba(26, 45, 46, 0.96)',
        borderColor: 'rgba(168, 197, 195, 0.22)',
        borderWidth: 1,
        padding: [10, 14],
        textStyle: {
          color: '#c8d9d6',
          fontSize: 12,
          fontFamily: 'system-ui, sans-serif',
        },
        extraCssText:
          'border-radius: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.35);',
        formatter: (params: any) => {
          if (!Array.isArray(params) || params.length === 0) return ''
          const expLabel = params[0]?.axisValueLabel ?? ''
          const lines = params.map(
            (p: any) =>
              `<div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
                <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${p.color};"></span>
                <span style="flex:1;">${p.seriesName}</span>
                <strong>${p.value}%</strong>
              </div>`,
          )
          return [
            `<div style="font-weight:600;margin-bottom:6px;font-size:13px;">${expLabel}</div>`,
            ...lines,
          ].join('')
        },
      },
      legend: {
        bottom: 0,
        textStyle: {
          color: TEXT_COLOR,
          fontSize: 11,
          fontFamily: 'system-ui, sans-serif',
        },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 18,
        icon: 'roundRect',
      },
      grid: {
        left: 48,
        right: 24,
        top: 16,
        bottom: 44,
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        data: experienceLabels,
        axisLine: {
          lineStyle: { color: AXIS_LINE_COLOR, width: 1 },
        },
        axisTick: { show: false },
        axisLabel: {
          color: TEXT_COLOR,
          fontSize: 12,
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 500,
        },
        nameTextStyle: {
          color: TEXT_COLOR,
          fontSize: 11,
        },
      },
      yAxis: {
        type: 'value',
        name: '%',
        min: 0,
        max: 65,
        interval: 10,
        nameTextStyle: {
          color: 'rgba(155, 176, 178, 0.45)',
          fontSize: 11,
          fontFamily: 'system-ui, sans-serif',
        },
        axisLabel: {
          color: 'rgba(155, 176, 178, 0.55)',
          fontSize: 10,
          fontFamily: 'JetBrains Mono, monospace',
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: {
            color: GRID_COLOR,
            type: 'dashed',
            width: 0.5,
          },
        },
      },
      series,
    }
  }, [data, segmentKeys])

  // ---------- 初始化 / 更新 ECharts ----------
  const updateChart = useCallback(() => {
    if (!containerRef.current || width < 10 || height < 10) return

    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current, undefined, {
        devicePixelRatio: window.devicePixelRatio || 1,
        renderer: 'canvas',
      })
    }

    chartRef.current.setOption(buildOption(), true)
  }, [buildOption, width, height])

  useEffect(() => {
    updateChart()
  }, [updateChart])

  // ---------- 尺寸变化 resize ----------
  useEffect(() => {
    if (chartRef.current && width > 0 && height > 0) {
      chartRef.current.resize({ width, height })
    }
  }, [width, height])

  // ---------- 窗口 resize ----------
  useEffect(() => {
    const handleResize = () => {
      chartRef.current?.resize()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ---------- 清理 ----------
  useEffect(() => {
    return () => {
      chartRef.current?.dispose()
      chartRef.current = null
    }
  }, [])

  if (width < 10 || height < 10) return null

  return (
    <FadeInView variant="fadeIn" threshold={0.12}>
      <div
        ref={containerRef}
        style={{
          width,
          height,
          background: BG_COLOR,
          borderRadius: 12,
        }}
      />
    </FadeInView>
  )
}
