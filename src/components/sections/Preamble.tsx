import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BigNumber } from '@/components/shared/BigNumber'
import { FadeInView } from '@/components/shared/FadeInView'
import { averageAge } from '@/data/demographics'
import { genZWillingness } from '@/data/policy'

// ============================================================
// 序言 · 位于首页与第一章之间
// 暗色全屏背景，大留白，文字淡入上浮
// 新增：漂浮光粒子（水下光斑）+ 文本辉光
// ============================================================

const CAUSTIC_PRESETS = [
  { left: '5%',  delay: '0s',   dur: '12s', size: '3px',  opacity: 0.12 },
  { left: '15%', delay: '1.8s', dur: '16s', size: '4px',  opacity: 0.10 },
  { left: '25%', delay: '3.2s', dur: '14s', size: '2px',  opacity: 0.08 },
  { left: '35%', delay: '0.5s', dur: '18s', size: '5px',  opacity: 0.10 },
  { left: '48%', delay: '4.1s', dur: '13s', size: '3px',  opacity: 0.09 },
  { left: '55%', delay: '2.0s', dur: '20s', size: '4px',  opacity: 0.11 },
  { left: '68%', delay: '5.5s', dur: '15s', size: '2px',  opacity: 0.07 },
  { left: '78%', delay: '1.2s', dur: '17s', size: '6px',  opacity: 0.09 },
  { left: '88%', delay: '3.7s', dur: '14s', size: '3px',  opacity: 0.10 },
  { left: '95%', delay: '6.3s', dur: '19s', size: '4px',  opacity: 0.08 },
]

export function Preamble() {
  const caustics = useMemo(() => CAUSTIC_PRESETS, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-duck-900 overflow-hidden">
      {/* 暗色渐变底 */}
      <div className="absolute inset-0 bg-gradient-to-b from-duck-950 via-duck-900 to-duck-800/80" />

      {/* 中央微光晕 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[45vh] rounded-full blur-3xl bg-duck-400/4 pointer-events-none" />

      {/* 次级暖光点 — 增加层次 */}
      <div className="absolute top-2/3 left-1/4 w-[30vw] h-[20vh] rounded-full blur-3xl bg-warm-400/3 pointer-events-none" />

      {/* 漂浮光粒子 — 水下光斑（极淡） */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {caustics.map((c, i) => (
          <span
            key={`caustic-${i}`}
            className="absolute rounded-full bg-duck-300"
            style={{
              left: c.left,
              bottom: '-4%',
              width: c.size,
              height: c.size,
              opacity: 0,
              animation: `dataFloat ${c.dur} linear infinite`,
              animationDelay: c.delay,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-8 py-20 max-w-3xl text-center">
        {/* 核心介绍段落 */}
        <FadeInView variant="fadeUp" delay={0.4}>
          <p
            className="prose-body text-[1.15rem] md:text-[1.35rem] leading-[2.1] text-duck-200/60 max-w-2xl mx-auto mb-14"
            style={{
              textShadow: '0 0 80px rgba(168,197,195,0.06), 0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            截至2023年底，约7000万至1亿中国青年
            <br />
            正在经历这场流动的生存实验。
            <br />
            <span className="text-duck-200/40 text-sm">
              ——这不只是远程办公，而是一种新生活形态的集体实践。
            </span>
          </p>
        </FadeInView>

        {/* 关键数字 — BigNumber */}
        <FadeInView variant="fadeUp" delay={0.8}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 max-w-2xl mx-auto mb-14">
            <BigNumber value={75} suffix="M+" label="中国数字游民规模" color="#C4A882" light />
            <BigNumber value={averageAge} suffix="岁" label="平均年龄" color="#A8C5C3" light />
            <BigNumber value={71.28} suffix="%" label="90后为主力" color="#B5C5B0" light />
            <BigNumber
              value={genZWillingness.percentage}
              suffix="%"
              label="00后愿成为数字游民"
              color="#87B0AE"
              light
            />
          </div>
        </FadeInView>

        {/* 底部引语 */}
        <FadeInView variant="fadeUp" delay={1.1}>
          <p
            className="text-sm text-duck-300/35 font-mono tracking-wider"
            style={{ textShadow: '0 0 40px rgba(168,197,195,0.04)' }}
          >
            这并非大厂逃离的浪漫叙事，而是结构性压力下的生存实验。
          </p>
        </FadeInView>
      </div>

      {/* 向下滚动指示器 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6a9897"
          strokeWidth={1.5}
          strokeLinecap="round"
          className="opacity-40"
        >
          <path d="M7 10l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  )
}
