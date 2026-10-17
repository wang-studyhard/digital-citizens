import { useEffect, useRef, useState } from 'react'
import { evidenceMetrics } from '@/data/evidence'
import { references } from '@/data/references'
import type { FigureEvidence } from './FigureSource'

const STATUS_LABEL = {
  verified: '已核验',
  reported: '已报道',
  secondary: '二手材料',
  target: '政策目标',
  pending: '待核',
} as const

const visibleReferences = references.filter((reference) => reference.status !== 'pending' && !reference.usedFor?.includes('未进入主线'))
const TYPE_LABEL: Record<string, string> = { SURVEY: '问卷调查', REPORT: '新闻报道', RESEARCH: '研究文章', POLICY: '政策文件', OFFICIAL: '官方信息', NOTICE: '机构通知' }

function revealInDrawer(dialog: HTMLDialogElement, target: HTMLElement | null) {
  target?.focus({ preventScroll: true })
  const body = dialog.querySelector<HTMLElement>('.evidence-dialog__body')
  if (body) {
    body.scrollTop = target && body.contains(target)
      ? body.scrollTop + target.getBoundingClientRect().top - body.getBoundingClientRect().top - Number.parseFloat(getComputedStyle(body).paddingTop)
      : 0
  }
}

export function EvidenceDrawer({ showTrigger = true }: { showTrigger?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const readingHashRef = useRef('')
  const readingScrollRef = useRef<number | undefined>(undefined)
  const [figure, setFigure] = useState<FigureEvidence | undefined>()
  const figureTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (figure && dialogRef.current?.open) {
      revealInDrawer(dialogRef.current, figureTitleRef.current)
    }
  }, [figure])

  const close = () => {
    if (/^#(?:reference-\d+|evidence)$/.test(window.location.hash)) {
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}${readingHashRef.current}`)
    }
    dialogRef.current?.close()
    if (readingScrollRef.current !== undefined) window.scrollTo({ top: readingScrollRef.current, behavior: 'instant' })
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const syncHash = () => {
      const hash = window.location.hash
      const reference = visibleReferences.find((item) => hash === `#reference-${item.id}`)
      if (hash === '#evidence' || reference) {
        if (!dialog.open) dialog.showModal()
        const target = reference ? document.getElementById(`reference-${reference.id}`) : document.getElementById('evidence-title')
        revealInDrawer(dialog, target)
      } else {
        readingHashRef.current = hash
        if (dialog.open) dialog.close()
      }
    }
    const listener = (event: Event) => {
      const { trigger, reference, figure: nextFigure } = (event as CustomEvent<{ trigger?: HTMLElement; reference?: number; figure?: FigureEvidence }>).detail ?? {}
      setFigure(nextFigure ? { ...nextFigure } : undefined)
      returnFocusRef.current = trigger ?? null
      if (!dialog.open) {
        readingHashRef.current = window.location.hash
        readingScrollRef.current = window.scrollY
      }
      const hash = reference ? `#reference-${reference}` : '#evidence'
      if (window.location.hash !== hash) window.history.pushState(null, '', hash)
      syncHash()
    }
    const navigate = () => {
      setFigure(undefined)
      readingScrollRef.current = undefined
      syncHash()
    }
    window.addEventListener('open-evidence', listener)
    window.addEventListener('hashchange', navigate)
    window.addEventListener('popstate', navigate)
    syncHash()
    return () => {
      window.removeEventListener('open-evidence', listener)
      window.removeEventListener('hashchange', navigate)
      window.removeEventListener('popstate', navigate)
    }
  }, [])

  return (
    <>
      {showTrigger && <button ref={triggerRef} type="button" className="evidence-trigger" onClick={(event) => window.dispatchEvent(new CustomEvent('open-evidence', { detail: { trigger: event.currentTarget } }))} aria-haspopup="dialog">数据与来源</button>}
      <dialog ref={dialogRef} id="evidence" className="evidence-dialog" aria-labelledby="evidence-title" onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]')
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && (document.activeElement === first || document.activeElement?.getAttribute('tabindex') === '-1')) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }} onCancel={(event) => { event.preventDefault(); close() }} onClose={() => {
        if (!dialogRef.current?.open) (returnFocusRef.current ?? triggerRef.current ?? document.querySelector<HTMLElement>('.site-nav__evidence'))?.focus({ preventScroll: true })
      }}>
        <div className="evidence-dialog__header">
          <div><h2 id="evidence-title" tabIndex={-1}>数据、来源与方法</h2></div>
          <button type="button" className="dialog-close" onClick={close} aria-label="关闭数据、来源与方法">×</button>
        </div>
        <div className="evidence-dialog__body">
          {figure && <section className="figure-context" aria-labelledby="figure-context-title">
            <h3 ref={figureTitleRef} id="figure-context-title" tabIndex={-1}>{figure.title}</h3>
            <dl className="reference-item__meta">
              <div><dt>统计对象</dt><dd>{figure.population}</dd></div>
              <div><dt>范围</dt><dd>{figure.scope}</dd></div>
              <div><dt>调查时间</dt><dd>{figure.period}</dd></div>
              <div><dt>截止</dt><dd>{figure.cutoff}</dd></div>
              <div><dt>来源定位</dt><dd>{figure.locator}</dd></div>
            </dl>
            <div className="figure-context__note">{figure.note}</div>
            {figure.table}
          </section>}
          <p className="dialog-intro">页面中的数字都保留统计对象、范围、时间边界和来源定位。NCC 是社区渠道样本；77 家是研究纳入的社区样本；安吉青年数据只描述青年入乡生态；政策目标不等于已经发生的结果。</p>
          <div className="method-strip"><span><strong>{evidenceMetrics.length}</strong> 条主线证据</span><span>派生人数按原始百分比计算并标记“约”</span><span>来源编号可回到公开材料</span></div>
          <h3>来源索引</h3>
          <div className="reference-list">
            {visibleReferences.map((reference) => (
              <article id={`reference-${reference.id}`} key={reference.id} className="reference-item" tabIndex={-1} aria-labelledby={`reference-title-${reference.id}`}>
                <div className="reference-item__top"><span className="reference-number">[{reference.id}]</span><span className={`reference-status reference-status--${reference.status ?? 'pending'}`}>{STATUS_LABEL[reference.status ?? 'pending']}</span></div>
                <h4 id={`reference-title-${reference.id}`}>{reference.title}</h4>
                <p>{reference.source}</p>
                <dl className="reference-item__meta">
                  <div><dt>材料类型</dt><dd>{TYPE_LABEL[reference.type ?? ''] ?? '公开材料'}</dd></div>
                  <div><dt>本文用途</dt><dd>{reference.usedFor}</dd></div>
                  <div><dt>核验状态</dt><dd>{STATUS_LABEL[reference.status ?? 'pending']}</dd></div>
                </dl>
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
