import { NavBar } from '@/components/layout/NavBar'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { BackToTop } from '@/components/layout/BackToTop'
import { Footer } from '@/components/layout/Footer'
import { EvidenceDrawer } from '@/components/shared/EvidenceDrawer'
import { Hero } from '@/components/sections/Hero'
import { Chapter1Portrait } from '@/components/sections/Chapter1Portrait'
import { Chapter2Motivation } from '@/components/sections/Chapter2Motivation'
import { Chapter3Migration } from '@/components/sections/Chapter3Migration'
import { Chapter4Policy } from '@/components/sections/Chapter4Policy'
import { Chapter5Conclusion } from '@/components/sections/Chapter5Conclusion'

export default function App() {
  return (
    <div className="app-shell">
      <div className="noise-overlay" aria-hidden="true" />
      <NavBar />
      <ScrollProgress />
      <main>
        <Hero />
        <Chapter1Portrait />
        <Chapter2Motivation />
        <Chapter3Migration />
        <Chapter4Policy />
        <Chapter5Conclusion />
      </main>
      <Footer />
      <div className="evidence-dock"><EvidenceDrawer /></div>
      <BackToTop />
    </div>
  )
}
