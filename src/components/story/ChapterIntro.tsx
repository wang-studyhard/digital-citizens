type ChapterIntroProps = {
  id: string
  number?: string
  title: string
  intro: string
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
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{intro}</p>
      </div>
    </header>
  )
}
