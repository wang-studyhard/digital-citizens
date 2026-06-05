import { motion } from 'framer-motion'
import { ChapterHeader } from '@/components/shared/ChapterHeader'
import { QuoteBlock } from '@/components/shared/QuoteBlock'
import { FadeInView } from '@/components/shared/FadeInView'
import { BigNumber } from '@/components/shared/BigNumber'
import { DataSource } from '@/components/shared/DataSource'
import { DataTable } from '@/components/shared/DataTable'
import { CoordinatedReveal } from '@/components/effects/CoordinatedReveal'
import { policyMatrix } from '@/data/tables'
import { policyCards, ruralStats, anjiImpact, localEngagement } from '@/data/policy'

export function Chapter4Policy() {
  return (
    <section
      id="chapter4"
      className="py-20 md:py-28 px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <ChapterHeader
          chapter="第四章"
          title="政策春风"
          subtitle="中国地方政府正在以前所未有的姿态拥抱数字游民——
          从浙江丽水的全国首个县级专项政策，到安徽黄山的大规模基地建设计划，
          再到山东的乡村振兴融合探索。"
        />

        <QuoteBlock
          text="全国乡村振兴创业带头人已达1510万人，其中'80后''90后'占比超70%。数字游民成为一股不能被忽视的新经济力量。"
        />

        {/* 政策卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
          {policyCards.map((card, idx) => (
            <FadeInView
              key={card.city}
              variant="fadeUp"
              delay={idx * 0.15}
              threshold={0.1}
            >
              <motion.div
                className="bg-duck-900/50 rounded-card shadow-card p-6 h-full flex flex-col border border-duck-200/8"
                whileHover={{ y: -4, boxShadow: '0 4px 24px rgba(45, 52, 54, 0.10)' }}
              >
                <div className="mb-4">
                  <span className="text-xs font-mono text-duck-600 tracking-wider">
                    {card.province}
                  </span>
                  <h3 className="text-xl font-serif text-charcoal mt-1">
                    {card.city}
                  </h3>
                  <h4 className="text-sm font-medium text-slate mt-0.5">
                    {card.title}
                  </h4>
                </div>

                <ul className="space-y-2 mb-4 flex-1">
                  {card.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="text-sm text-slate leading-relaxed flex gap-2">
                      <span className="text-duck-400 mt-1 shrink-0">•</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-duck-100 pt-3 flex flex-wrap gap-2">
                  {card.keyNumbers.map((kn) => (
                    <span
                      key={kn.label}
                      className="inline-flex items-center gap-1 bg-duck-100/60 rounded-full px-3 py-1 text-xs"
                    >
                      <span className="text-slate">{kn.label}</span>
                      <span className="font-bold font-serif text-duck-700">
                        {kn.value}
                      </span>
                    </span>
                  ))}
                </div>

                <p className="text-[10px] text-mist mt-3 font-sans">
                  来源：{card.source.slice(0, 40)}...
                </p>
              </motion.div>
            </FadeInView>
          ))}
        </div>

        {/* 政策对比矩阵 */}
        <h3 className="text-xl font-serif text-charcoal text-center mt-14 mb-2">
          三大地方政策维度对比
        </h3>
        <DataTable
          columns={policyMatrix.columns}
          rows={policyMatrix.rows}
          sourceRef={9}
          rowDelay={0.1}
        />

        {/* 乡村振兴统计 + 参与形式 — 协调入场 */}
        <FadeInView variant="fadeUp" className="mt-20">
          <h3 className="text-2xl font-serif text-charcoal text-center mb-2">
            数字游民与乡村振兴
          </h3>
          <p className="text-center text-slate mb-8 text-sm">
            当"云端办公"遇见中国传统村落——一场双向奔赴
          </p>
        </FadeInView>

        <CoordinatedReveal
          groupKey="ch4-rural"
          mainScale={1.04}
          main={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BigNumber
                value={ruralStats.totalEntrepreneurs}
                suffix="万"
                label="全国乡村振兴创业带头人"
                color="#A8C5C3"
              />
              <BigNumber
                value={ruralStats.mainGroupPercent}
                prefix=""
                suffix="%+"
                label="'80后''90后'占比"
                color="#C4A882"
              />
              <BigNumber
                value={anjiImpact.jobsCreated}
                suffix="+"
                label="安吉一社区带动就业岗位"
                color="#6A9897"
              />
            </div>
          }
          secondary={[
            <div key="desc">
              <p className="text-center text-sm text-slate max-w-xl mx-auto">
                {anjiImpact.description}
              </p>
            </div>,
            <div key="engagement" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {localEngagement.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="bg-duck-900/50 rounded-card shadow-card p-5 border border-duck-200/8"
                  whileHover={{ y: -3 }}
                >
                  <div className="w-10 h-10 bg-duck-100/60 rounded-full flex items-center justify-center mb-3">
                    <span className="text-duck-700 text-lg font-serif">{i + 1}</span>
                  </div>
                  <h4 className="font-serif font-medium text-charcoal mb-2">{item.title}</h4>
                  <p className="text-sm text-slate leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>,
          ]}
        />
      </div>
    </section>
  )
}
