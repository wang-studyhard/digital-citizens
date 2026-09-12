import { useEffect, useRef, useState } from 'react'
import { evidenceMetrics } from '@/data/evidence'
import { references } from '@/data/references'

const STATUS_LABEL = {
  verified: '已核验',
  reported: '已报道',
  secondary: '二手材料',
  target: '政策目标',
  pending: '待核',
} as const

export function EvidenceDrawer({ showTrigger = true }: { showTrigger?: boolean }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const listener = (event: Event) => {
      const customEvent = event as CustomEvent<{ trigger?: HTMLElement }>
      returnFocusRef.current = customEvent.detail?.trigger ?? null
      setOpen(true)
    }
    window.addEventListener('open-evidence', listener)
    return () => window.removeEventListener('open-evidence', listener)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <>
      {showTrigger && <button ref={triggerRef} type="button" className="evidence-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog"><span aria-hidden="true">＋</span> 数据与来源</button>}
      <dialog ref={dialogRef} id="evidence" className="evidence-dialog" aria-labelledby="evidence-title" onCancel={() => setOpen(false)} onClose={() => { setOpen(false); (returnFocusRef.current ?? triggerRef.current)?.focus(); returnFocusRef.current = null }}>
        <div className="evidence-dialog__header">
          <div><p className="dialog-kicker">Evidence registry / V3</p><h2 id="evidence-title">数据、来源与方法</h2></div>
          <button type="button" className="dialog-close" onClick={() => setOpen(false)} aria-label="关闭数据、来源与方法">×</button>
        </div>
        <div className="evidence-dialog__body">
          <p className="dialog-intro">页面中的数字都保留统计对象、范围、时间边界和来源定位。NCC 是社区渠道样本；77 家是研究纳入的社区样本；安吉青年数据只描述青年入乡生态；政策目标不等于已经发生的结果。</p>
          <div className="method-strip"><span><strong>{evidenceMetrics.length}</strong> 条主线证据</span><span>派生人数按原始百分比计算并标记“约”</span><span>来源编号可回到公开材料</span></div>
          <h3>来源索引</h3>
          <div className="reference-list">
            {references.map((reference) => (
              <article id={`reference-${reference.id}`} key={reference.id} className="reference-item">
                <div className="reference-item__top"><span className="reference-number">[{reference.id}]</span><span className={`reference-status reference-status--${reference.status ?? 'pending'}`}>{STATUS_LABEL[reference.status ?? 'pending']}</span></div>
                <h4>{reference.title}</h4>
                <p>{reference.source}</p>
                {reference.locator && <p className="reference-locator">定位：{reference.locator}</p>}
                {reference.note && <p className="reference-note">口径：{reference.note}</p>}
                {reference.url && <a href={reference.url} target="_blank" rel="noreferrer">打开来源 ↗</a>}
              </article>
            ))}
          </div>
        </div>
      </dialog>
    </>
  )
}
