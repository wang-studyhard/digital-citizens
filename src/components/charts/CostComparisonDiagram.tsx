import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCountUp } from '@/hooks/useCountUp'
import { FadeInView } from '@/components/shared/FadeInView'

interface CostData {
  city: string
  income: number
  rent: number
  food: number
  savings: number
}

interface CostComparisonDiagramProps {
  leftData: CostData
  rightData: CostData
  savingsDifference: number
}

function CostBar({
  label,
  value,
  maxValue,
  color,
  delay,
}: {
  label: string
  value: number
  maxValue: number
  color: string
  delay: number
}) {
  const barWidth = (value / maxValue) * 200

  return (
    <motion.div
      className="flex items-center gap-3 mb-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <span className="text-xs text-slate w-16 text-right font-sans shrink-0">
        {label}
      </span>
      <div className="flex-1 h-6 bg-duck-50 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: barWidth }}
          transition={{
            delay: delay + 0.3,
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
      <span className="text-sm font-mono text-charcoal w-16 shrink-0">
        ¥{value.toLocaleString()}
      </span>
    </motion.div>
  )
}

export function CostComparisonDiagram({
  leftData,
  rightData,
  savingsDifference,
}: CostComparisonDiagramProps) {
  const { ref: counterRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const countedDiff = useCountUp({
    end: savingsDifference,
    duration: 2500,
    enabled: inView,
  })

  const maxValue = Math.max(
    leftData.income,
    leftData.rent + leftData.food,
    rightData.rent + rightData.food
  )

  return (
    <FadeInView variant="fadeUp" threshold={0.1}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左：大城市 */}
        <div className="bg-duck-900/50 rounded-card shadow-card p-6 border border-duck-200/8">
          <h4 className="text-center font-serif text-lg text-charcoal mb-6">
            {leftData.city}
          </h4>
          <div className="mb-4">
            <CostBar
              label="月收入"
              value={leftData.income}
              maxValue={maxValue}
              color="#4A6B6E"
              delay={0.2}
            />
          </div>
          <div className="border-t border-duck-100 pt-4 mb-4">
            <CostBar
              label="房租"
              value={leftData.rent}
              maxValue={maxValue}
              color="#C4A882"
              delay={0.4}
            />
            <CostBar
              label="饮食交通"
              value={leftData.food}
              maxValue={maxValue}
              color="#CBB28F"
              delay={0.6}
            />
          </div>
          <div className="border-t border-duck-100 pt-4">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-xs text-slate w-16 text-right font-sans shrink-0">
                月储蓄
              </span>
              <div className="flex-1 h-8 bg-duck-50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full flex items-center justify-end pr-3"
                  style={{
                    backgroundColor: '#A8C5C3',
                    width: `${(leftData.savings / maxValue) * 200}px`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(leftData.savings / maxValue) * 200}px` }}
                  transition={{
                    delay: 0.9,
                    duration: 1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <span className="text-sm font-mono text-white font-medium">
                    ¥{leftData.savings.toLocaleString()}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 右：小城镇 */}
        <div className="bg-duck-900/50 rounded-card shadow-card p-6 border border-duck-200/8">
          <h4 className="text-center font-serif text-lg text-charcoal mb-6">
            {rightData.city}
          </h4>
          <div className="mb-4">
            <CostBar
              label="月收入"
              value={rightData.income}
              maxValue={maxValue}
              color="#4A6B6E"
              delay={0.2}
            />
          </div>
          <div className="border-t border-duck-100 pt-4 mb-4">
            <CostBar
              label="房租"
              value={rightData.rent}
              maxValue={maxValue}
              color="#C4A882"
              delay={0.4}
            />
            <CostBar
              label="饮食交通"
              value={rightData.food}
              maxValue={maxValue}
              color="#CBB28F"
              delay={0.6}
            />
          </div>
          <div className="border-t border-duck-100 pt-4">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-xs text-slate w-16 text-right font-sans shrink-0">
                月储蓄
              </span>
              <div className="flex-1 h-8 bg-duck-50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full flex items-center justify-end pr-3"
                  style={{
                    backgroundColor: '#6A9897',
                    width: `${(rightData.savings / maxValue) * 200}px`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(rightData.savings / maxValue) * 200}px` }}
                  transition={{
                    delay: 0.9,
                    duration: 1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <span className="text-sm font-mono text-white font-medium">
                    ¥{rightData.savings.toLocaleString()}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 差额高亮 */}
      <div ref={counterRef} className="mt-8 text-center">
        <motion.div
          className="inline-block bg-duck-900/60 rounded-full px-6 py-3 border border-duck-200/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-sm text-slate font-sans mr-2">
            每月多储蓄
          </span>
          <motion.span
            className="text-2xl md:text-3xl font-bold font-serif text-duck-700"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.3 }}
          >
            ¥{Math.round(countedDiff).toLocaleString()}
          </motion.span>
        </motion.div>
        <p className="text-xs text-slate mt-2 font-sans">
          相同薪资，选择低成本城市生活，每年多存 ¥{(savingsDifference * 12).toLocaleString()}
        </p>
      </div>
    </FadeInView>
  )
}
