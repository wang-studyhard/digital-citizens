import { motion } from 'framer-motion'
import { DataSource } from './DataSource'

interface Column {
  key: string
  header: string
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps {
  columns: Column[]
  rows: Record<string, string | number>[]
  caption?: string
  sourceRef?: number
  /** 行间 stagger 延迟（秒） */
  rowDelay?: number
  /** 高亮特定列 key */
  highlightCol?: string
}

const ALIGN_MAP: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export function DataTable({
  columns,
  rows,
  caption,
  sourceRef,
  rowDelay = 0.08,
  highlightCol,
}: DataTableProps) {
  return (
    <div className="my-10">
      {caption && (
        <p className="text-sm text-slate mb-3 font-mono tracking-wide">{caption}</p>
      )}

      {/* 响应式水平滚动容器 */}
      <div className="overflow-x-auto rounded-xl border border-duck-200/20">
        <table className="w-full min-w-[540px] text-sm">
          {/* 表头 */}
          <thead>
            <tr className="border-b border-duck-200/20 bg-duck-100/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${ALIGN_MAP[col.align ?? 'left']} px-4 py-3 font-mono text-xs tracking-wider text-slate uppercase whitespace-nowrap`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* 表体 — 逐行动画 */}
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={i}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  delay: i * rowDelay,
                  ease: 'easeOut',
                }}
                className="border-b border-duck-200/10 last:border-b-0 transition-colors duration-300 hover:bg-duck-100/20"
              >
                {columns.map((col) => {
                  const val = row[col.key]
                  const isHighlight = highlightCol === col.key
                  return (
                    <td
                      key={col.key}
                      className={`${ALIGN_MAP[col.align ?? 'left']} px-4 py-2.5 whitespace-pre-wrap leading-relaxed ${
                        isHighlight ? 'font-semibold text-duck-700' : 'text-charcoal'
                      }`}
                    >
                      {val}
                    </td>
                  )
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {sourceRef && (
        <div className="mt-2">
          <DataSource refNumber={sourceRef} />
        </div>
      )}
    </div>
  )
}
