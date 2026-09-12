import { useState } from 'react'

export function Hero() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  return (
    <section id="scene0" className="hero-collage" onPointerMove={(event) => setPointer({ x: (event.clientX / window.innerWidth - 0.5) * 2, y: (event.clientY / window.innerHeight - 0.5) * 2 })}>
      <div className="hero-collage__grid" aria-hidden="true" />
      <div className="hero-collage__route" style={{ transform: `translate(${pointer.x * 8}px, ${pointer.y * 6}px)` }} aria-hidden="true"><svg viewBox="0 0 780 500" preserveAspectRatio="none"><path d="M36 420 C160 310 180 438 295 320 S480 150 744 82" /><circle cx="36" cy="420" r="9" /><circle cx="295" cy="320" r="9" /><circle cx="744" cy="82" r="9" /></svg></div>
      <div className="hero-collage__tape hero-collage__tape--one" aria-hidden="true" />
      <div className="hero-collage__tape hero-collage__tape--two" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[min(900px,100svh)] max-w-7xl flex-col justify-between px-6 pb-10 pt-28 md:px-12 md:pb-14 md:pt-36">
        <div className="flex items-center justify-between text-xs text-duck-200/70"><span className="data-label">data story · 2026</span><span className="font-mono">01 — 07</span></div>
        <div className="hero-collage__content grid items-end gap-10 lg:grid-cols-[1fr_0.42fr]">
          <div><h1 className="max-w-4xl font-serif text-[clamp(4.5rem,13vw,12rem)] leading-[0.82] tracking-[-0.06em] text-charcoal">数字<br /><span className="text-warm-300">江河</span></h1><p className="mt-8 max-w-xl text-base leading-8 text-slate md:text-lg">当工作离开固定办公室，中国的年轻人与地方正在发生什么？</p></div>
          <div className="hero-collage__artifact" aria-label="由路线、坐标、笔记本和社区节点组成的编辑拼贴示意图"><div className="artifact-screen"><span className="artifact-screen__dot" /><span className="artifact-screen__line" /><span className="artifact-screen__line artifact-screen__line--short" /></div><div className="artifact-coordinate">31°03′N<br />119°40′E</div><div className="artifact-label">work / place / relation</div></div>
        </div>
        <a className="hero-collage__start" href="#scene1"><span className="hero-collage__start-line" aria-hidden="true" />向下阅读 <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
