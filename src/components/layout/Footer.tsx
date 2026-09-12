import { FadeInView } from '@/components/shared/FadeInView'
import { DataSource } from '@/components/shared/DataSource'

const STATS = [
  { value: '282', label: '公开预览样本（n）', source: 1 },
  { value: '77', label: '社区研究样本（家）', source: 3 },
  { value: '52', label: '其中乡村社区（家）', source: 3 },
  { value: '4', label: '本文案例地点' },
]

export function Footer() {
  return (
    <footer className="relative bg-duck-900 border-t border-duck-200/8">
      {/* 顶部渐变光晕 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-px bg-gradient-to-r from-transparent via-duck-300/30 to-transparent" />

      <div className="container mx-auto max-w-6xl px-6 py-16">
        <FadeInView variant="fadeUp">
          {/* ---- 报告标题 ---- */}
          <div className="text-center mb-10">
            <h2
              className="font-serif text-2xl md:text-3xl tracking-[0.04em] mb-3"
              style={{ color: '#b9c8be' }}
            >
              中国数字游民研究报告
            </h2>
            <p className="text-sm text-slate font-sans max-w-lg mx-auto leading-relaxed">
              基于公开研究、媒体报道与政策文本，以数据可视化叙事的方式，
              观察中国数字游民的工作安排、地方实践与合作条件。
            </p>
          </div>

          {/* ---- 关键数据速览 ---- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold font-serif text-duck-400">
                  {s.value}
                </div>
                <div className="text-xs text-slate mt-1 font-sans">
                  {s.label}
                  {s.source && <DataSource refNumber={s.source} />}
                </div>
              </div>
            ))}
          </div>

          {/* ---- 研究方法说明 ---- */}
          <div className="max-w-xl mx-auto mb-10 text-center">
            <p className="text-xs text-mist font-sans leading-relaxed">
              研究方法：公开样本结构 + 媒体报道 + 政策文本分析。
              公开预览中的282份问卷与77家社区均有明确统计边界，不能替代全国人口普查；
              所有关键数字均在第五章标注来源编号。
            </p>
          </div>

          {/* ---- 底部 ---- */}
          <div className="border-t border-duck-200/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans">
            <span className="text-cream/40">
              本网页仅用于研究与学术展示目的。数据版权归原作者所有，如需引用请注明出处。
            </span>
            <div className="flex items-center gap-4 text-cream/30">
              <span>资料更新至 2026-09</span>
              <span className="text-duck-500">·</span>
              <span>样本量 n=282</span>
              <span className="text-duck-500">·</span>
              <span>v1.0</span>
            </div>
          </div>
        </FadeInView>
      </div>
    </footer>
  )
}
