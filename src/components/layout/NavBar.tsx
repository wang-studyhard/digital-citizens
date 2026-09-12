import { useEffect, useRef, useState } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const NAV_ITEMS = [
  { id: 'scene1', label: '样本' },
  { id: 'scene2', label: '工作' },
  { id: 'scene3', label: '77家' },
  { id: 'scene4', label: '案例' },
  { id: 'scene5', label: '政策' },
  { id: 'scene6', label: '张力' },
]

export function NavBar() {
  const progress = useScrollProgress()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [active, setActive] = useState<string | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const update = () => {
      const currentY = window.scrollY
      setVisible(currentY < lastScrollY.current || currentY < 80)
      lastScrollY.current = currentY
      const point = window.innerHeight * 0.42
      let current: string | null = null
      for (let i = NAV_ITEMS.length - 1; i >= 0; i -= 1) {
        const section = document.getElementById(NAV_ITEMS[i].id)
        if (section && section.getBoundingClientRect().top <= point) { current = NAV_ITEMS[i].id; break }
      }
      setActive(current)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  return (
    <nav className={`site-nav ${progress > 0.03 ? 'site-nav--solid' : ''} ${visible ? '' : 'site-nav--hidden'}`} aria-label="章节导航">
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="#scene0" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>数字江河 <span>DATA STORY</span></a>
        <div className="site-nav__links">
          {NAV_ITEMS.map((item) => <button key={item.id} type="button" onClick={() => scrollTo(item.id)} aria-current={active === item.id ? 'page' : undefined} className={active === item.id ? 'is-active' : ''}>{item.label}</button>)}
          <button type="button" onClick={() => scrollTo('scene7')}>结尾</button>
        </div>
        <button type="button" className="site-nav__menu" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="mobile-nav" aria-label={mobileOpen ? '关闭章节菜单' : '打开章节菜单'}>{mobileOpen ? '×' : '目录'}</button>
      </div>
      {mobileOpen && <div id="mobile-nav" className="site-nav__mobile">{[...NAV_ITEMS, { id: 'scene7', label: '结尾' }].map((item) => <button key={item.id} type="button" onClick={() => scrollTo(item.id)}>{item.label}<span>→</span></button>)}</div>}
    </nav>
  )
}
