import { motion } from 'framer-motion'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { FadeInView } from '@/components/shared/FadeInView'
import { DataSource } from '@/components/shared/DataSource'
import { policyCards, localEngagement } from '@/data/policy'

const STATUS_LABEL: Record<string, string> = {
  measure: '现行措施',
  target: '政策目标',
  reported: '公开报道',
  pending: '待核材料',
}

export function Chapter4Policy() {
  return (
    <section id="chapter4" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第四章"
          title="政策如何回应"
          subtitle="地方政策把空间、服务和产业连接放在一起，但政策目标、具体措施与实际成效仍需分开阅读。"
        />

        <QuoteBlock
          text="当青年进入乡村，地方需要的不只是人流，也包括能与本地产业和生活发生联系的长期合作。"
        />

        <div className="mt-14 space-y-5">
          {policyCards.map((card, idx) => (
            <FadeInView key={card.city} variant="fadeUp" delay={idx * 0.08} threshold={0.1}>
              <motion.article
                className="border-b border-duck-200/15 pb-6 md:pb-8"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xs font-mono tracking-wider text-duck-300/75">{card.province}</span>
                  <h3 className="text-2xl font-serif text-charcoal">{card.city}</h3>
                  <span className="text-sm text-slate">{card.title}</span>
                </div>
                <ul className="mt-3 grid gap-2 md:grid-cols-2">
                  {card.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm leading-relaxed text-slate flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-duck-400" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.keyNumbers.map((item) => (
                    <span key={item.label} className="rounded-full border border-duck-200/15 px-3 py-1 text-xs text-duck-200/80">
                      {item.label}：{item.value}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-mist">
                  {card.source}
                  {card.status && (
                    <span className="ml-2 rounded-full border border-duck-300/25 px-2 py-0.5 text-[0.68rem] text-duck-200/80">
                      {STATUS_LABEL[card.status]}
                    </span>
                  )}
                  {card.sourceId && <DataSource refNumber={card.sourceId} />}
                </p>
              </motion.article>
            </FadeInView>
          ))}
        </div>

        <FadeInView variant="fadeUp" className="mt-16">
          <div className="border-t border-duck-200/15 pt-8">
            <h3 className="text-2xl font-serif text-charcoal text-center">共同成长要经过哪些环节？</h3>
            <p className="mt-2 text-center text-sm text-slate">以下是本专题根据案例与研究整理出的观察框架，不是政策成效评分。</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {localEngagement.map((item, index) => (
                <div key={item.title} className="border-l border-duck-300/35 pl-4">
                  <p className="font-serif text-lg text-duck-200">{String(index + 1).padStart(2, '0')} {item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs leading-relaxed text-mist">
              政策可以提供条件，具体合作仍要回到村庄、商户、运营者与青年共同参与的日常。
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
