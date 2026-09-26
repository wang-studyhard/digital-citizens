import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { ChartFrame } from '@/components/shared/ChartFrame'
import { sampleFlowData, stayScaleData } from '@/data/chartData'
import { ChapterIntro } from './ChapterIntro'
import { ChapterPeople } from './ChapterPeople'

const anjiFullWeeks = Math.floor(stayScaleData.anji.value / 7)
const anjiRemainingDays = stayScaleData.anji.value % 7

function PlaceIcon({ place }: { place: 'anji' | 'yixian' }) {
  return <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
    {place === 'anji' ? <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 31V10m-3 17h6m-6-8h6m-6-5h6M18 15c-6-5-9-3-9 1 4 2 7 2 9-1Zm4 4c6-5 9-3 9 1-4 2-7 2-9-1Zm-4 5c-6-4-9-2-9 2 4 2 7 1 9-2Z" />
    </g> : <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 21 12-8 12 8H8Zm4 1v9h16v-9M18 31v-6h4v6M10 17l4-7 4 4m8 0 4-5 3 8" />
    </g>}
  </svg>
}

function AnjiStayGraphic() {
  return <svg className="stay-scale__svg" viewBox="0 0 440 170" aria-hidden="true" focusable="false">
    <rect x="12" y="8" width="416" height="154" rx="3" fill="var(--paper-2)" />
    <path d="M12 42h416M46 2v16M394 2v16" fill="none" stroke="var(--field)" strokeWidth="2" />
    {Array.from({ length: 49 }, (_, index) => <rect key={index} x={34 + (index % 7) * 54} y={54 + Math.floor(index / 7) * 14} width="43" height="9" rx="1" fill={index < stayScaleData.anji.value ? 'var(--field)' : 'var(--chart-track)'} />)}
  </svg>
}

function YixianStayGraphic() {
  return <svg className="stay-scale__svg" viewBox="0 0 440 170" aria-hidden="true" focusable="false">
    <g fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round">
      <rect x="28" y="28" width="128" height="112" rx="3" />
      <path d="M28 55h128M48 21v14m88-14v14M49 80h86M49 104h86" />
      <path d="M192 84h53" strokeDasharray="5 6" />
      <path d="m236 76 10 8-10 8" />
      <rect x="275" y="42" width="104" height="96" rx="3" opacity=".45" />
      <rect x="288" y="30" width="104" height="96" rx="3" opacity=".7" />
      <rect x="301" y="18" width="104" height="96" rx="3" />
      <path d="M301 44h104M321 11v14m64-14v14M321 66h64M321 84h46" />
    </g>
  </svg>
}

function SampleJourney() {
  const nomads = sampleFlowData.branches[0]
  const explorers = sampleFlowData.branches[1]
  return <div className="survey-flow">
    <div className="survey-flow__node"><span>回收问卷</span><strong><EvidenceValue metricId={sampleFlowData.received.id} /></strong></div>
    <ul className="survey-flow__branches" aria-label="回收问卷清洗结果">
      <li>
        <div className="survey-flow__node survey-flow__node--valid"><span>保留有效问卷</span><strong><EvidenceValue metricId={sampleFlowData.valid.id} /></strong></div>
        <ul className="survey-flow__branches" aria-label="有效问卷分组">
          <li><div className="survey-flow__node survey-flow__node--nomads"><span>数字游民</span><strong><EvidenceValue metricId={nomads.id} /></strong></div></li>
          <li><div className="survey-flow__node"><span>探索者</span><strong><EvidenceValue metricId={explorers.id} /></strong></div></li>
        </ul>
      </li>
      <li><div className="survey-flow__node survey-flow__node--excluded"><span>清洗后未保留</span><strong>{sampleFlowData.excluded.value} 份</strong><small>派生：{sampleFlowData.received.value}－{sampleFlowData.valid.value}</small></div></li>
    </ul>
  </div>
}

export function ChapterCases() {
  return (
    <section id="scene4" className="scene scene--field" aria-labelledby="scene4-title">
      <div className="scene-shell">
        <ChapterIntro id="scene4" number="02" title="停留与人群" intro="安吉与黟县让停留有了具体尺度。另一项NCC社区渠道调查，则提供了一组独立的人群样本。" />

        <article className="case-archive case-archive--anji" aria-labelledby="anji-stay-title">
          <div className="case-archive__intro">
            <div className="case-archive__intro-copy">
              <p className="case-location"><PlaceIcon place="anji" />浙江 <strong>安吉</strong></p>
              <h3 id="anji-stay-title">在社区住上一段时间</h3>
              <p>2022年，安吉DNA数字游民公社记录了 <EvidenceValue metricId="anji-dna-stays-2022" />。入住者平均年龄为 <EvidenceValue metricId="anji-dna-average-age-2022" />。</p>
            </div>
          </div>
          <div className="case-facts case-facts--two">
            <div><strong><EvidenceValue metricId="anji-dna-postgraduate-2022" /></strong><small>硕士及以上学历</small></div>
            <div><strong><EvidenceValue metricId="anji-dna-work-hours-2022" /></strong><small>每日平均工作时长</small></div>
          </div>
          <div className="case-archive__body">
            <p>这些社区记录描述了入住者的工作与停留，不能据此判断每个人如何融入当地生活。</p>
          </div>
        </article>

        <article className="case-archive case-archive--huangshan" aria-labelledby="yixian-stay-title">
          <div className="case-archive__intro">
            <div className="case-archive__intro-copy">
              <p className="case-location"><PlaceIcon place="yixian" />安徽 <strong>黟县</strong></p>
              <h3 id="yixian-stay-title">旧厂房里的共居空间</h3>
              <p>一处旧酿酒工业遗址被改造成共居空间。社区有 <EvidenceValue metricId="huangshan-rooms" />，成立不到一年已有 <EvidenceValue metricId="huangshan-stays" />来此旅居。</p>
            </div>
          </div>
          <div className="huangshan-reading">
            <div className="huangshan-reading__visual">
              <div className="huangshan-reading__current"><span>一位旅居者的声音</span><h4>“我辞去了在杭州的白领工作，很享受这种旅居状态。”</h4><p>——朱文静，新华社报道，2025年3月</p></div>
            </div>
            <div className="case-archive__reflection"><p>社区规定了入住的时间范围。住客是否参与地方日常，还要看具体发生的事情。</p></div>
          </div>
        </article>

        <ChartFrame id="stay-scale-chart" title={<>停留时间：<strong>安吉平均值</strong>与<strong>黟县入住规则</strong></>} unit="" population="安吉DNA 2022年入住者；黟县社区入住规则" scope="两处独立案例" period="安吉2022年；黟县报道截至2025年3月" cutoff="" locator="[20]平均入住天数段；[4]社区入住时间段" sourceRefs={[20, 4]} sourcePosition="after" note="47天是安吉已入住者的平均值；2周至3个月是黟县社区的入住规则。两种口径不能按同一标尺比较。">
          <div className="stay-scale">
            <div className="stay-scale__case">
              <h4>安吉 DNA · 平均停留</h4>
              <AnjiStayGraphic />
              <div className="stay-scale__reading"><strong><EvidenceValue metricId={stayScaleData.anji.id} /></strong><span>{anjiFullWeeks}周{anjiRemainingDays ? `＋${anjiRemainingDays}天` : ''}；每行代表一周</span></div>
            </div>
            <div className="stay-scale__case">
              <h4>黟县 · 入住规则</h4>
              <YixianStayGraphic />
              <div className="stay-scale__endpoints"><div><small>最短入住</small><strong><EvidenceValue metricId={stayScaleData.yixianMinimum.id} /></strong></div><div><small>最长通常不建议超过</small><strong><EvidenceValue metricId={stayScaleData.yixianMaximum.id} /></strong></div></div>
            </div>
          </div>
        </ChartFrame>

        <section id="scene5" className="survey-passage" aria-labelledby="scene5-title">
          <header className="survey-passage__header">
            <span>另一扇窗口 / NCC 社区渠道调查</span>
            <h3 id="scene5-title">从地方停留，转向一组人的样本</h3>
            <p>上面的停留数字来自安吉和黟县两处案例。下面的问卷来自另一项调查，不能把受访者视为这两处社区的同一批入住者。</p>
          </header>
          <ChartFrame id="sample-flow-chart" title="从回收到两组有效回答" unit="问卷清洗与分组" population="NCC社区渠道问卷" scope="仅社区渠道样本" period="2024年4月至5月" cutoff="" locator="[1]公开预览p.04研究说明" sourceRefs={[1]} sourcePosition="after" note={<>另有 <EvidenceValue metricId={sampleFlowData.interviews.id} />，属于独立的定性材料，不作为有效问卷的第三分支。</>}>
            <SampleJourney />
          </ChartFrame>
          <p className="limits-rule limits-rule--chapter limits-rule--center"><span>以下画像只观察这<strong>282个人</strong>。</span></p>
        </section>
        <ChapterPeople />
      </div>
    </section>
  )
}
