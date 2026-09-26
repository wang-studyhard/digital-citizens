import type { ReactNode } from 'react'

type ChapterIntroProps = {
  id: string
  number?: string
  title: string
  intro: string
}

function ChapterGlyph({ id }: { id: string }) {
  const paths: Record<string, ReactNode> = {
    scene1: <><circle cx="7" cy="9" r="2.2" /><circle cx="23" cy="7" r="2.2" /><circle cx="17" cy="23" r="2.2" /><path d="m9 9 12-2M8 11l8 10M22 9l-4 12" /></>,
    scene4: <><path d="M5 15 16 5l11 10v12H5V15Z" /><path d="M12 27v-8h8v8M10 14h3m7 0h3" /></>,
    scene7: <><path d="M6 6h14l5 5v16H6V6Z M20 6v5h5M10 16h8M10 21h6" /><path d="m20 22 5-5 2 2-5 5-3 1 1-3Z" /></>,
    scene10: <><path d="M7 5h18v22H7V5Z M11 11h10M11 16h10M11 21h6" /><circle cx="23" cy="23" r="4" /></>,
    scene12: <><path d="M4 4c6 5 10 8 11 13s4 8 13 11M16 4c-1 6-4 8-1 13M4 24c5-2 8-4 11-7" /><circle cx="4" cy="4" r="1.4" /><circle cx="28" cy="28" r="1.4" /></>,
  }
  return <svg className="scene-heading__glyph" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[id]}</svg>
}

export function ChapterIntro({ id, number, title, intro }: ChapterIntroProps) {
  if (!number) return (
    <header className="subsection-heading">
      <h3 id={`${id}-title`}>{title}</h3>
      <p>{intro}</p>
    </header>
  )
  return (
    <header className="scene-heading">
      <span className="scene-heading__index" aria-hidden="true">{number}</span>
      <div className="scene-heading__copy">
        <div className="scene-heading__title"><h2 id={`${id}-title`}>{title}</h2><ChapterGlyph id={id} /></div>
        <p>{intro}</p>
      </div>
    </header>
  )
}
