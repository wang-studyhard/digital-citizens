import { Footer } from '@/components/layout/Footer'
import { NavBar } from '@/components/layout/NavBar'
import { EvidenceDrawer } from '@/components/shared/EvidenceDrawer'
import { Scene0Hero } from '@/components/scenes/Scene0Hero'
import { Scene1Sample } from '@/components/scenes/Scene1Sample'
import { Scene2Work } from '@/components/scenes/Scene2Work'
import { Scene3Communities } from '@/components/scenes/Scene3Communities'
import { Scene4Cases } from '@/components/scenes/Scene4Cases'
import { Scene5Policy } from '@/components/scenes/Scene5Policy'
import { Scene6Limits } from '@/components/scenes/Scene6Limits'
import { Scene7Conclusion } from '@/components/scenes/Scene7Conclusion'

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main>
        <Scene0Hero />
        <Scene1Sample />
        <Scene2Work />
        <Scene3Communities />
        <Scene4Cases />
        <Scene5Policy />
        <Scene6Limits />
        <Scene7Conclusion />
      </main>
      <Footer />
      <EvidenceDrawer showTrigger={false} />
    </div>
  )
}
