import { type ReactNode, useRef } from 'react'

interface CoordinatedRevealProps {
  main: ReactNode
  secondary: ReactNode[]
  groupKey: string
  mainScale?: number
}

export function CoordinatedReveal({ main, secondary, groupKey }: CoordinatedRevealProps) {
  return (
    <div className="relative mt-20">
      {/* 主元素 */}
      <div className="relative z-10" style={{ transformOrigin: 'center center' }}>
        <div
          className="absolute -inset-2 rounded-[20px] pointer-events-none -z-10 opacity-15"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(185,200,190,0.18) 0%, rgba(168,197,195,0.06) 50%, transparent 80%)',
          }}
        />
        {main}
      </div>

      {/* 次元素 */}
      <div className="relative z-10 mt-8 space-y-8">
        {secondary.map((item, i) => (
          <div key={`${groupKey}-sec-${i}`}>{item}</div>
        ))}
      </div>
    </div>
  )
}
