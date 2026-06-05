import { NavBar } from '@/components/layout/NavBar'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { BackToTop } from '@/components/layout/BackToTop'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { HorizontalScroll } from '@/components/sections/HorizontalScroll'
import { Preamble } from '@/components/sections/Preamble'
import { Chapter1Portrait } from '@/components/sections/Chapter1Portrait'
import { Chapter2Motivation } from '@/components/sections/Chapter2Motivation'
import { Chapter3Migration } from '@/components/sections/Chapter3Migration'
import { Chapter4Policy } from '@/components/sections/Chapter4Policy'
import { Chapter5Conclusion } from '@/components/sections/Chapter5Conclusion'
import { CollapseOverlay } from '@/components/shared/CollapseOverlay'
import { useDepthFade } from '@/hooks/useDepthFade'

export default function App() {
  useDepthFade()

  return (
    <div className="bg-duck-950">
      {/* 全局噪点纹理 — 胶片颗粒感 */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 视口暗角 — 水下深度感 */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(26,45,46,0.25) 80%, rgba(26,45,46,0.45) 100%)',
        }}
      />

      <NavBar />
      <ScrollProgress />

      <main>
        <Hero />
        <HorizontalScroll />
        <Preamble />
        <div className="relative h-8 bg-duck-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 max-w-md h-px bg-gradient-to-r from-transparent via-duck-200/20 to-transparent" />
        </div>
        <Chapter1Portrait />
        <div className="relative h-8 bg-duck-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 max-w-md h-px bg-gradient-to-r from-transparent via-duck-200/20 to-transparent" />
        </div>
        <Chapter2Motivation />
        <div className="relative h-8 bg-duck-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 max-w-md h-px bg-gradient-to-r from-transparent via-duck-200/20 to-transparent" />
        </div>
        <Chapter3Migration />
        <div className="relative h-8 bg-duck-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 max-w-md h-px bg-gradient-to-r from-transparent via-duck-200/20 to-transparent" />
        </div>
        <Chapter4Policy />
        <div className="relative h-8 bg-duck-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 max-w-md h-px bg-gradient-to-r from-transparent via-duck-200/20 to-transparent" />
        </div>
        <Chapter5Conclusion />
      </main>

      <Footer />
      <CollapseOverlay />
      <BackToTop />
    </div>
  )
}
