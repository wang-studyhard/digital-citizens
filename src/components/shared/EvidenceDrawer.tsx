import { useEffect, useRef, useState } from 'react'
import { evidenceMetrics } from '@/data/evidence'
import { references } from '@/data/references'

const USED_SOURCE_IDS = new Set(evidenceMetrics.map((metric) => metric.sourceId))

const STATUS_LABEL = {
  verified: '已核',
  reported: '报道',
  secondary: '二手',
  target: '目标',
  pending: '待核',
} as const

export function EvidenceDrawer() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <>
      <button
        type="button"
        className="evidence-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <span aria-hidden="true">＋</span> 数据、来源与方法
      </button>
      <dialog
        ref={dialogRef}
        id="evidence"
        className="evidence-dialog"
        aria-labelledby="evidence-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div className="evidence-dialog__header">
          <div>
            <p className="data-label text-duck-300">Evidence registry · V2.1</p>
            <h2 id="evidence-title" className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">数据、来源与方法</h2>
          </div>
          <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="关闭数据、来源与方法">
            ×
          </button>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate">
          页面中的数字都保留统计对象、地理范围、时间边界和来源定位。NCC 是社区渠道样本；77 家是研究纳入的社区样本；安吉青年数据只描述青年入乡生态；政策目标不等于已经发生的结果。
        </p>
        <div className="evidence-dialog__body">
          <h3 className="font-serif text-lg text-charcoal">主线证据</h3>
          <div className="mt-4 space-y-3">
            {evidenceMetrics.map((metric) => (
              <article key={metric.id} className="evidence-row">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-duck-300">{metric.id}</p>
                  <p className="mt-1 text-sm text-charcoal">{metric.value}{metric.unit ? ` ${metric.unit}` : ''}</p>
                  <p className="mt-1 text-xs leading-5 text-mist">{metric.population} · {metric.geography} · {metric.scope}</p>
                </div>
                <div className="shrink-0 text-right text-xs text-slate">
                  <span className={`status-chip status-chip--${metric.status}`}>{STATUS_LABEL[metric.status]}</span>
                  <p className="mt-2 max-w-[14rem] leading-5 text-mist">来源 [{metric.sourceId}] · {metric.locator}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="evidence-dialog__body border-t border-duck-200/10">
          <h3 className="font-serif text-lg text-charcoal">来源索引</h3>
          <ol className="mt-4 space-y-3">
            {references.filter((reference) => USED_SOURCE_IDS.has(reference.id)).map((reference) => (
              <li key={reference.id} id={`reference-${reference.id}`} className="flex gap-3 scroll-mt-24 text-sm leading-6 text-slate">
                <span className="font-mono text-xs text-duck-300">[{reference.id}]</span>
                <span>
                  {reference.url ? <a className="text-charcoal underline decoration-duck-300/40 underline-offset-4" href={reference.url} target="_blank" rel="noreferrer">{reference.title}</a> : reference.title}
                  <span className="ml-1 text-mist">· {reference.source}</span>
                  {reference.locator && <span className="block text-xs text-mist">定位：{reference.locator}</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <p className="px-6 pb-7 text-xs leading-6 text-mist md:px-8">
          说明：本页面的编辑判断用于串联材料，不替代原始调查、正式政策文本或现场采访。待核材料不进入关键结论。
        </p>
      </dialog>
    </>
  )
}
