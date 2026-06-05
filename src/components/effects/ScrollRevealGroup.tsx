import { type ReactNode, useRef } from 'react'

interface ScrollRevealGroupProps {
  main: ReactNode
  secondary: ReactNode[]
  groupKey: string
}

export function ScrollRevealGroup({ main, secondary, groupKey }: ScrollRevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative mt-12 mb-8">
      {/* 主图表 */}
      <div className="relative z-10 mx-auto" style={{ maxWidth: '720px' }}>
        <div
          className="rounded-2xl p-[1px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(185,200,190,0.28), rgba(168,197,195,0.10), rgba(185,200,190,0.28))',
          }}
        >
          <div className="rounded-2xl bg-duck-950/60 p-5 md:p-7">{main}</div>
        </div>
      </div>

      {/* 次图表 */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {secondary.map((chart, i) => (
          <div key={`${groupKey}-sec-${i}`}>
            <div
              className="rounded-xl p-[1px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(185,200,190,0.12), rgba(168,197,195,0.04))',
              }}
            >
              <div className="rounded-xl bg-duck-950/40 p-4 md:p-5 h-full">{chart}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
