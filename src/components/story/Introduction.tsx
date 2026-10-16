import { DataSource } from '@/components/shared/DataSource'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { introResidenceData, introTrendData } from '@/data/chartData'

const trendPoints = introTrendData.map((item, index) => `${40 + index * 86},${164 - item.value * 7}`).join(' ')

export function Introduction() {
  return (
    <section id="introduction" className="scene introduction" aria-labelledby="introduction-title">
      <div className="scene-shell">
        <header className="introduction__heading">
          <h2 id="introduction-title">当工作可以随人移动</h2>
          <p><span className="story-line">数字游民用电脑和网络远程完成工作，也可以在不同地方生活、停留。</span><span className="story-line">他们既可能跨国移动，也可能只在一国内更换地点；移动不意味着一直在旅行。</span></p>
        </header>

        <div className="introduction__china">
          <h3>从中国的社区看起</h3>
          <p><span className="story-line">远程办公让一部分人把工作带到大理等地。</span><span className="story-line">网络、交通、生活成本与社群交流，影响他们在哪里停留。<DataSource refNumber={25} /></span><span className="story-line">随着共居和共创空间出现，社区成为观察人与地方关系的窗口。<DataSource refNumber={3} /></span></p>
          <p><span className="story-line">接下来，我们从一项纳入77家社区的研究出发，沿安吉、黟县与丽水的公开记录，观察停留、参与和地方合作。</span><span className="story-line">这些样本与案例，不能代替全国数字游民的全貌。</span></p>
        </div>

        <div className="introduction__global">
          <p className="introduction__global-label">全球参照 · 两项不同范围的研究</p>
          <div className="introduction__figures">
          <figure className="introduction__figure" aria-labelledby="intro-trend-title">
            <h3 id="intro-trend-title">一项美国调查记录的增长</h3>
            <p className="introduction__figure-intro">2019—2025年，美国数字游民劳动者估计人数从730万增至1850万。</p>
            <svg className="introduction__trend" viewBox="0 0 600 185" aria-hidden="true" focusable="false">
              <path className="introduction__axis" d="M40 164H556" />
              <polyline points={trendPoints} />
              {introTrendData.map((item, index) => <circle key={item.id} cx={40 + index * 86} cy={164 - item.value * 7} r="4.5" />)}
            </svg>
            <ol className="introduction__years" aria-label="各年美国数字游民估计人数，单位百万人">
              {introTrendData.map((item) => <li key={item.id}><span>{item.label}</span><strong><EvidenceValue metricId={item.id} showSource={false} display={String(item.value)} /></strong></li>)}
            </ol>
            <figcaption>单位：百万人。MBO Partners历年美国调查估计；不代表全球人数。<DataSource refNumber={23} /></figcaption>
          </figure>

          <figure className="introduction__figure" aria-labelledby="intro-residence-title">
            <h3 id="intro-residence-title">一项跨国调查中的停留地点</h3>
            <p className="introduction__figure-intro"><span className="story-line">受访者当时住在哪些国家？</span><span className="story-line">研究报告列出了这些居住地。</span></p>
            <ol className="introduction__residence">
              {introResidenceData.map((item) => <li key={item.id}>
                <span>{item.label}</span>
                <span className="introduction__bar" aria-hidden="true"><span style={{ width: `${item.value / 13.1 * 100}%` }} /></span>
                <strong><EvidenceValue metricId={item.id} showSource={false} display={`${item.value}%`} /></strong>
              </li>)}
            </ol>
            <figcaption>仅列出报告展示的居住国；比例没有重新归一。502人核心分析组，每年至少在三个国家间移动；截至2025年4月5日。<DataSource refNumber={24} /></figcaption>
          </figure>
        </div>
        </div>
        <a className="introduction__next" href="#scene1">进入第一章：网络与社区 <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
