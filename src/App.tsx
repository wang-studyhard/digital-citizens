import { Footer } from '@/components/layout/Footer'
import { NavBar } from '@/components/layout/NavBar'
import { EvidenceDrawer } from '@/components/shared/EvidenceDrawer'
import { ChapterCases } from '@/components/story/ChapterCases'
import { ChapterInfrastructure } from '@/components/story/ChapterInfrastructure'
import { ChapterPolicy } from '@/components/story/ChapterPolicy'
import { ChapterRelations } from '@/components/story/ChapterRelations'
import { Epilogue } from '@/components/story/Epilogue'
import { Prologue } from '@/components/story/Prologue'

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main>
        <Prologue />
        <ChapterInfrastructure />
        <ChapterCases />
        <ChapterRelations />
        <ChapterPolicy />
        <Epilogue />
      </main>
      <Footer />
      <EvidenceDrawer showTrigger={false} />
    </div>
  )
}
