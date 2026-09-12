import type { ReactNode } from 'react'

type SceneShellProps = {
  id: string
  number: string
  title: string
  intro: string
  children: ReactNode
  tone?: 'paper' | 'night' | 'field'
}

export function SceneShell({ id, number, title, intro, children, tone = 'paper' }: SceneShellProps) {
  return (
    <section id={id} className={`scene scene--${tone}`} aria-labelledby={`${id}-title`}>
      <div className="scene-shell">
        <header className="scene-heading">
          <span className="scene-heading__index" aria-hidden="true">{number}</span>
          <div className="scene-heading__copy">
            <h2 id={`${id}-title`}>{title}</h2>
            <p>{intro}</p>
          </div>
        </header>
        {children}
      </div>
    </section>
  )
}
