import { Component, StrictMode, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/globals.css'
import App from './App.tsx'

type AppErrorBoundaryState = { hasError: boolean }

class AppErrorBoundary extends Component<{ children: ReactNode }, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('数字江河渲染失败', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', background: '#17292b', color: '#d7e2dd', padding: '4rem 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <p style={{ color: '#d9c4a4', fontFamily: 'monospace', letterSpacing: '.12em' }}>DIGITAL RIVER / STATIC FALLBACK</p>
            <h1 style={{ margin: '1rem 0', fontFamily: 'Georgia, serif', fontSize: 'clamp(2.25rem, 8vw, 5rem)' }}>数字江河</h1>
            <p style={{ lineHeight: 1.9 }}>页面交互暂时不可用，但这篇报道的核心信息仍然可以阅读：有限样本显示，工作地点的移动会把人带到社区、乡村和政策现场；真正的问题不是“来过多少人”，而是流动是否形成了具体关系。</p>
            <p style={{ marginTop: '1.5rem', lineHeight: 1.9 }}>当前版本使用 NCC 社区渠道样本、77 家研究样本，以及安吉、黄山、丽水的公开报道。样本、报道、政策目标和已报道结果保持分层，不能外推为全国人口或长期效果。</p>
            <p style={{ marginTop: '1.5rem', color: '#a8c5c3', fontFamily: 'monospace' }}>827 / 798 / 282 / 516 / 8 · 77 · 58 / 约500 · 5 / 41 / 12</p>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
