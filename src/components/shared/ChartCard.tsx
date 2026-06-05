import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { FadeInView } from './FadeInView'
import { DataSource } from './DataSource'

interface ChartCardProps {
  /** 图表标题 */
  title?: string
  /** 图表内容 */
  children: ReactNode
  /** 数据来源引用编号 */
  sourceRef?: number
  /** 自定义类名 */
  className?: string
  /** 是否占满宽度 */
  fullWidth?: boolean
}

export function ChartCard({
  title,
  children,
  sourceRef,
  className = '',
  fullWidth = false,
}: ChartCardProps) {
  return (
    <FadeInView variant="fadeUp" threshold={0.1}>
      <motion.div
        className={`bg-duck-900/50 rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-300 p-5 md:p-6 border border-duck-200/8 ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        whileHover={{ y: -2 }}
      >
        {title && (
          <h3 className="text-base md:text-lg font-medium text-charcoal mb-4 font-serif">
            {title}
          </h3>
        )}
        <div className="w-full">{children}</div>
        {sourceRef && (
          <div className="mt-3 text-right">
            <span className="text-xs text-mist">
              数据来源
              <DataSource refNumber={sourceRef} />
            </span>
          </div>
        )}
      </motion.div>
    </FadeInView>
  )
}
