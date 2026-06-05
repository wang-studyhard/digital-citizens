import { motion } from 'framer-motion'
import { FadeInView } from '@/components/shared/FadeInView'
import { DataSource } from '@/components/shared/DataSource'
import { CountUpNumber } from '@/components/shared/CountUpNumber'

// ============================================================
// HeatmapTable · 收入×经验 热力图矩阵
// 单元格背景色深浅映射百分比，逐个单元格淡入
// 色阶: duck-50(0%) → duck-300(25%) → duck-600(50%)
// ============================================================

interface HeatmapTableProps {
  experienceLabels: string[]
  incomeBrackets: string[]
  data: number[][] // [经验段][收入区间]
  note?: string
  sourceRef?: number
}

/** 百分比映射为鸭蛋青色阶 */
function heatColor(pct: number): string {
  // 0% → duck-50/30, 50%+ → duck-600/80
  const t = Math.min(pct / 50, 1)
  const r = Math.round(232 + (74 - 232) * t)
  const g = Math.round(237 + (107 - 237) * t)
  const b = Math.round(235 + (110 - 235) * t)
  return `rgba(${r},${g},${b},${0.18 + t * 0.65})`
}

export function HeatmapTable({
  experienceLabels,
  incomeBrackets,
  data,
  note,
  sourceRef,
}: HeatmapTableProps) {
  return (
    <div className="my-10">
      <div className="overflow-x-auto rounded-xl border border-duck-200/20">
        <table className="w-full min-w-[580px] text-sm">
          <thead>
            <tr className="border-b border-duck-200/20 bg-duck-100/30">
              <th className="px-4 py-3 text-left font-mono text-xs tracking-wider text-slate uppercase">
                年收入
              </th>
              {experienceLabels.map((label) => (
                <th
                  key={label}
                  className="px-3 py-3 text-center font-mono text-xs tracking-wider text-slate uppercase"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {incomeBrackets.map((bracket, rowIdx) => (
              <motion.tr
                key={bracket}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: rowIdx * 0.1 }}
                className="border-b border-duck-200/10 last:border-b-0"
              >
                <td className="px-4 py-2.5 font-mono text-xs text-slate whitespace-nowrap">
                  {bracket}
                </td>

                {experienceLabels.map((_, colIdx) => {
                  const val = data[colIdx][rowIdx]
                  const bg = heatColor(val)
                  return (
                    <motion.td
                      key={colIdx}
                      className="px-3 py-2.5 text-center font-mono text-sm tabular-nums"
                      style={{ background: bg }}
                      initial={{ scale: 0.85 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: rowIdx * 0.1 + colIdx * 0.06,
                        ease: 'easeOut',
                      }}
                    >
                      <span className={val >= 40 ? 'text-duck-900 font-semibold' : 'text-charcoal'}>
                        <CountUpNumber value={val} suffix="%" decimals={val % 1 !== 0 ? 1 : 0} duration={900} />
                      </span>
                    </motion.td>
                  )
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && (
        <p className="mt-3 text-xs text-slate/70 font-mono leading-relaxed">{note}</p>
      )}
      {sourceRef && (
        <div className="mt-1">
          <DataSource refNum={sourceRef} />
        </div>
      )}
    </div>
  )
}
