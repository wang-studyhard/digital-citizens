// ============================================================
// 章节收缩共享状态（模块级单例 + IntersectionObserver）
// IO 观察所有章节容器，判断哪个在视口上半部
// 带滞回：当前章节未离开上半部前不会切换到下一章
// ============================================================

type Listener = () => void

interface ChapterInfo {
  el: HTMLElement
  label: string
  top: number
}

const chapterMap = new Map<HTMLElement, ChapterInfo>()
let listeners = new Set<Listener>()
let activeLabel: string | null = null
let activeEl: HTMLElement | null = null
let observer: IntersectionObserver | null = null
let scrollTicking = false

// ——— 更新所有已注册元素的 top（IO 回调 + scroll rAF 共用） ———
function refreshAllTops() {
  chapterMap.forEach((info, el) => {
    info.top = el.getBoundingClientRect().top
  })
}

// ——— 滞回选择 ———
function selectActive() {
  const vh = window.innerHeight

  // 候选：元素 top 在视口上半部 [0, vh/2]，越靠近顶部越优先
  const candidates: ChapterInfo[] = []
  chapterMap.forEach((info) => {
    if (info.top >= 0 && info.top < vh / 2) {
      candidates.push(info)
    }
  })
  candidates.sort((a, b) => a.top - b.top)

  let nextLabel: string | null = null
  let nextEl: HTMLElement | null = null

  if (candidates.length > 0) {
    const best = candidates[0]

    if (activeEl === null) {
      // 尚无活跃章节 → 直接采用最佳候选
      nextLabel = best.label
      nextEl = best.el
    } else if (best.el === activeEl) {
      // 同一个章节 → 保持
      nextLabel = best.label
      nextEl = best.el
    } else {
      // 不同章节 → 仅在旧章节离开上半部后才切换
      const currentInfo = chapterMap.get(activeEl)
      const currentTop = currentInfo?.top ?? -999
      if (currentTop < 0) {
        nextLabel = best.label
        nextEl = best.el
      }
      // 否则旧章节仍可见 → 保持，不做切换
    }
  } else {
    // 无候选 → 检查当前活跃是否仍在合理范围内
    if (activeEl) {
      const currentInfo = chapterMap.get(activeEl)
      const top = currentInfo?.top ?? -999
      if (top > -vh * 0.8) {
        return // 缓冲带内 → 保持
      }
      // 滚出很远 → 清除（nextLabel/nextEl 保持 null）
    }
    // 无活跃 → 继续保持 null
  }

  if (nextLabel !== activeLabel) {
    activeLabel = nextLabel
    activeEl = nextEl
    listeners.forEach((l) => l())
  }
}

function getOrCreateObserver() {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      // IO 触发时刷新全部 top（不止回调里给出的 entry）
      for (const entry of entries) {
        const info = chapterMap.get(entry.target as HTMLElement)
        if (info) info.top = entry.boundingClientRect.top
      }
      selectActive()
    },
    { threshold: [0, 0.5] },
  )

  // scroll + rAF 持续刷新 top，弥补 IO 回调间隙
  const onScroll = () => {
    if (!scrollTicking) {
      scrollTicking = true
      requestAnimationFrame(() => {
        refreshAllTops()
        selectActive()
        scrollTicking = false
      })
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  return observer
}

// ——— 对外 API ———

export function registerChapter(el: HTMLElement, label: string) {
  const obs = getOrCreateObserver()
  obs.observe(el)
  chapterMap.set(el, { el, label, top: 999 })
}

export function unregisterChapter(el: HTMLElement) {
  const obs = observer
  if (obs) obs.unobserve(el)
  chapterMap.delete(el)
  // 如果注销的是当前活跃章节，立刻清除
  if (el === activeEl) {
    activeEl = null
    if (activeLabel !== null) {
      activeLabel = null
      listeners.forEach((l) => l())
    }
  }
}

export function subscribe(fn: Listener) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function getActiveLabel() {
  return activeLabel
}
