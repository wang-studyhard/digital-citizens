import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { metricNumber } from '@/data/derived'

const SAMPLE_STEPS = [
  { metricId: 'ncc-response-total', label: '回收问卷' },
  { metricId: 'ncc-valid-total', label: '有效问卷' },
  { metricId: 'ncc-digital-nomad-sample', label: '数字游民样本' },
]

export function Scene0Hero() {
  return (
    <section id="scene0" className="hero-scene" aria-labelledby="hero-title">
      <div className="hero-scene__ruler" aria-hidden="true"><span>01</span><i /><span>02</span><i /><span>03</span><i /><span>04</span><i /><span>05</span></div>
      <div className="hero-scene__inner">
        <div className="hero-copy">
          <h1 id="hero-title">数字江河</h1>
          <p className="hero-question">当工作离开固定办公室，<br /><em>年轻人与地方正在发生什么？</em></p>
          <p className="hero-intro">我们从一组社区渠道样本出发，再把视线放到社区、真实报道与地方政策。它不是一张全国人口画像，而是一份有边界的观察台账。</p>
          <a className="hero-start" href="#scene1">开始阅读 <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-record" aria-label="NCC 社区渠道样本链">
          <div className="hero-record__heading"><span>样本链 / NCC</span><span>2024.04—05</span></div>
          <div className="sample-chain">
            {SAMPLE_STEPS.map((step, index) => (
              <div className="sample-chain__step" key={step.metricId}>
                <span className="sample-chain__index">0{index + 1}</span>
                <strong><EvidenceValue metricId={step.metricId} display={String(metricNumber(step.metricId))} /></strong>
                <span>{step.label}</span>
                {index < SAMPLE_STEPS.length - 1 && <i className="sample-chain__arrow" aria-hidden="true">→</i>}
              </div>
            ))}
          </div>
          <div className="hero-record__branch"><span>有效问卷的另一分支</span><strong><EvidenceValue metricId="ncc-explorer-sample" display={String(metricNumber('ncc-explorer-sample'))} /></strong><span>名数字游民探索者</span></div>
          <div className="hero-boundary"><span className="hero-boundary__mark" aria-hidden="true">!</span><div><strong>这是一扇观察窗口，不是一张全国人口画像。</strong><p>社区渠道样本 · 另含 <EvidenceValue metricId="ncc-structured-interviews" display="8 名结构化访谈对象" /></p></div></div>
        </div>
      </div>
      <div className="hero-scene__bottom"><span>SCENE 00 / 08</span><span>向下进入研究台账</span></div>
    </section>
  )
}
