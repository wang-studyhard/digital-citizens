import type { ReactNode } from 'react'

type StorySectionProps = {
  id?: string
  title?: string
  children: ReactNode
  className?: string
  as?: 'section' | 'aside'
}

export function StorySection({ id, title, children, className = '', as = 'section' }: StorySectionProps) {
  const labelledBy = title && id ? `${id}-title` : undefined
  const content = (
    <>
      {title && <h3 id={labelledBy}>{title}</h3>}
      {children}
    </>
  )

  if (as === 'aside') {
    return <aside id={id} className={className || undefined} aria-labelledby={labelledBy}>{content}</aside>
  }

  return <section id={id} className={className || undefined} aria-labelledby={labelledBy}>{content}</section>
}
