import { FadeInView } from '@/components/shared/FadeInView'

const STATS = [
  { value: '282', label: '问卷样本量' },
  { value: '7000万+', label: '中国数字游民规模' },
  { value: '31', label: '平均年龄（岁）' },
  { value: '76.4%', label: '00后愿意成为数字游民' },
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
              基于公开研究数据与282份问卷调查，以数据可视化叙事的方式，
              呈现中国数字游民群体的人口画像、经济动机、地理流动与政策生态。
            </p>
          </div>

          {/* ---- 关键数据速览 ---- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold font-serif text-duck-400">
                  {s.value}
                </div>
                <div className="text-xs text-slate mt-1 font-sans">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ---- 研究方法说明 ---- */}
          <div className="max-w-xl mx-auto mb-10 text-center">
            <p className="text-xs text-mist font-sans leading-relaxed">
              研究方法：问卷调查（n=282）+ 桌面研究 + 公开政策文件分析。
              数据来源包括智联招聘、北大国发院、各地政府公开文件、行业报告等。
              所有数据均已在文中标注来源编号，详见第五章参考文献。
            </p>
          </div>

          {/* ---- 底部 ---- */}
          <div className="border-t border-duck-200/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans">
            <span className="text-cream/40">
              本网页仅用于研究与学术展示目的。数据版权归原作者所有，如需引用请注明出处。
            </span>
            <div className="flex items-center gap-4 text-cream/30">
              <span>数据截至 2025</span>
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
