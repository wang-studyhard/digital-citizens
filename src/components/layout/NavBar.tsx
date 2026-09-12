import { useEffect, useRef, useState } from 'react'

const NAV_ITEMS = [
  { id: 'scene1', label: '样本' },
  { id: 'scene2', label: '工作' },
  { id: 'scene3', label: '社区' },
  { id: 'scene4', label: '案例' },
  { id: 'scene5', label: '政策' },
  { id: 'scene6', label: '边界' },
  { id: 'scene7', label: '结论' },
]

export function NavBar() {
  const [active, setActive] = useState('scene1')
  const [progress, setProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
      const marker = window.innerHeight * 0.34
      const current = [...NAV_ITEMS].reverse().find((item) => {
        const element = document.getElementById(item.id)
        return element && element.getBoundingClientRect().top <= marker
      })
      if (current) setActive(current.id)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (mobileOpen && !dialog.open) dialog.showModal()
    if (!mobileOpen && dialog.open) dialog.close()
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const activeItem = NAV_ITEMS.find((item) => item.id === active) ?? NAV_ITEMS[0]
  const activeNumber = String(NAV_ITEMS.findIndex((item) => item.id === active) + 1).padStart(2, '0')

  return (
    <nav className="site-nav" aria-label="章节导航">
      <div className="site-nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="#scene0" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="site-nav__mark" aria-hidden="true">↗</span>
          <span>数字江河</span>
        </a>
        <div className="site-nav__links">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} type="button" onClick={() => scrollTo(item.id)} aria-current={active === item.id ? 'page' : undefined}>
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" className="site-nav__evidence" onClick={(event) => window.dispatchEvent(new CustomEvent('open-evidence', { detail: { trigger: event.currentTarget } }))}>来源</button>
        <button ref={menuRef} type="button" className="site-nav__menu" onClick={() => setMobileOpen(true)} aria-haspopup="dialog" aria-expanded={mobileOpen} aria-controls="mobile-nav">
          <span>{activeNumber} / 07 · {activeItem.label}</span><strong>目录</strong>
        </button>
      </div>
      <dialog ref={dialogRef} id="mobile-nav" className="nav-dialog" onCancel={() => setMobileOpen(false)} onClose={() => { setMobileOpen(false); menuRef.current?.focus() }}>
        <div className="nav-dialog__header"><span>阅读目录</span><button type="button" onClick={() => setMobileOpen(false)} aria-label="关闭目录">关闭</button></div>
        <div className="nav-dialog__links">
          {NAV_ITEMS.map((item, index) => (
            <button key={item.id} type="button" className={active === item.id ? 'is-active' : ''} onClick={() => scrollTo(item.id)}>
              <span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong>{active === item.id && <em>正在阅读</em>}
            </button>
          ))}
        </div>
      </dialog>
    </nav>
  )
}
