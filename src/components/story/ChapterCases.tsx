import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { DataSource } from '@/components/shared/DataSource'
import { ChartFrame } from '@/components/shared/ChartFrame'
import { ImageCard } from '@/components/shared/ImageCard'
import { stayScaleData } from '@/data/chartData'
import { editorialPhoto } from '@/data/editorialPhoto'
import { ChapterIntro } from './ChapterIntro'
import { ChapterPeople } from './ChapterPeople'
import { SampleOpening } from './SampleOpening'

const anjiFullWeeks = Math.floor(stayScaleData.anji.value / 7)
const anjiRemainingDays = stayScaleData.anji.value % 7

const anjiPhoto = editorialPhoto('xinhua-anji-shared-office')

function PlaceIcon({ place }: { place: 'anji' | 'yixian' }) {
  return <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.1" />
    {place === 'anji' ? <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 30V16m0 8c-5-5-10-6-12-2 2 5 7 6 12 4m0-7c4-6 9-7 12-4-1 5-5 8-12 8M13 31h14" />
      <path d="M20 16c-2-3-2-5 0-7 2 2 2 4 0 7" />
    </g> : <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18 20 10l11 8v12H9V18Z M13 30v-8h14v8M17 30v-5h6v5" />
      <path d="M8 18h24M12 14V9h4v3M25 13V9h3v6" />
    </g>}
  </svg>
}

function CaseFactIcon({ kind }: { kind: 'degree' | 'hours' }) {
  return <svg className="case-fact__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {kind === 'degree' ? <><circle cx="24" cy="19" r="5" /><path d="M14 36c1-7 5-10 10-10s9 3 10 10M9 14l15-7 15 7-15 7-15-7Z M37 15v11m0 0-2 3h4l-2-3Z" /></> : <><circle cx="24" cy="24" r="17" /><circle cx="24" cy="24" r="1.5" /><path d="M24 11v3m13 10h-3M24 37v-3M11 24h3M24 24l7-8m-7 8v8" /></>}
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

export function ChapterCases() {
  return (
    <section id="scene4" className="scene scene--field" aria-labelledby="scene4-title">
      <div className="scene-shell">
        <ChapterIntro id="scene4" number="02" title="停留与人群" intro="安吉、黟县呈现停留尺度；独立的NCC社区渠道调查呈现另一组人群样本。" />

        <article className="case-archive case-archive--anji" aria-labelledby="anji-stay-title">
          <div className="case-archive__intro">
            <div className="case-archive__intro-copy">
              <p className="case-location"><PlaceIcon place="anji" /><span>01 / 浙江 · <strong>安吉</strong></span></p>
              <h3 id="anji-stay-title">在社区住上一段时间</h3>
              <p>2022年，安吉DNA数字游民公社记录了 <EvidenceValue metricId="anji-dna-stays-2022" showSource={false} />，平均年龄 <EvidenceValue metricId="anji-dna-average-age-2022" showSource={false} />。<DataSource refNumber={20} /></p>
            </div>
          </div>
          <div className="case-facts case-facts--two">
            <div><CaseFactIcon kind="degree" /><strong><EvidenceValue metricId="anji-dna-postgraduate-2022" showSource={false} /></strong><small>硕士及以上学历<DataSource refNumber={20} /></small></div>
            <div><CaseFactIcon kind="hours" /><strong><EvidenceValue metricId="anji-dna-work-hours-2022" showSource={false} /></strong><small>每日平均工作时长<DataSource refNumber={20} /></small></div>
          </div>
          <div className="case-archive__body">
            <p>记录呈现了工作与停留，无法判断每个人怎样融入当地生活。</p>
            <ImageCard src={`${import.meta.env.BASE_URL}${anjiPhoto.path.slice(1)}`} alt={anjiPhoto.alt} caption={anjiPhoto.caption} credit={`${anjiPhoto.publishedAt}｜${anjiPhoto.photographer} 摄｜${anjiPhoto.publisher}`} sourceUrl={anjiPhoto.sourceUrl} width={anjiPhoto.intrinsicWidth} height={anjiPhoto.intrinsicHeight} />
          </div>
        </article>

        <article className="case-archive case-archive--huangshan" aria-labelledby="yixian-stay-title">
          <div className="case-archive__intro">
            <div className="case-archive__intro-copy">
              <p className="case-location"><PlaceIcon place="yixian" /><span>02 / 安徽 · <strong>黟县</strong></span></p>
              <h3 id="yixian-stay-title">旧厂房里的共居空间</h3>
              <p>旧酿酒工业遗址改成共居空间，有 <EvidenceValue metricId="huangshan-rooms" showSource={false} />；开办不足一年，已有 <EvidenceValue metricId="huangshan-stays" showSource={false} />来此旅居。<DataSource refNumber={4} /></p>
            </div>
          </div>
          <div className="huangshan-reading">
            <div className="huangshan-reading__visual">
              <div className="huangshan-reading__current"><span>一位旅居者的声音</span><blockquote>“我辞去了在杭州的白领工作，很享受这种旅居状态。”</blockquote><p>——朱文静，新华社报道，2025年3月</p></div>
            </div>
          </div>
          <div className="case-archive__reflection"><p><span className="story-line">社区规定了入住的时间范围。</span><span className="story-line">住客是否参与地方日常，还要看具体发生的事情。</span></p></div>
        </article>

        <ChartFrame id="stay-scale-chart" title={<>停留时间：<strong>安吉平均值</strong>与<strong>黟县入住规则</strong></>} unit="" population="安吉DNA 2022年入住者；黟县社区入住规则" scope="两处独立案例" period="安吉2022年；黟县报道截至2025年3月" cutoff="" locator="[20]平均入住天数段；[4]社区入住时间段" sourceRefs={[20, 4]} note="47天是安吉已入住者的平均值；2周至3个月是黟县社区的入住规则。两种口径不能按同一标尺比较。">
          <div className="stay-scale">
            <div className="stay-scale__case">
              <h4>安吉 DNA · 平均停留</h4>
              <AnjiStayGraphic />
              <div className="stay-scale__reading"><strong><EvidenceValue metricId={stayScaleData.anji.id} showSource={false} /></strong><span>{anjiFullWeeks}周{anjiRemainingDays ? `＋${anjiRemainingDays}天` : ''}；每行代表一周</span></div>
            </div>
            <div className="stay-scale__case">
              <h4>黟县 · 入住规则</h4>
              <YixianStayGraphic />
              <div className="stay-scale__endpoints"><div><small>最短入住</small><strong><EvidenceValue metricId={stayScaleData.yixianMinimum.id} showSource={false} /></strong></div><div><small>最长通常不建议超过</small><strong><EvidenceValue metricId={stayScaleData.yixianMaximum.id} showSource={false} /></strong></div></div>
            </div>
          </div>
        </ChartFrame>

        <SampleOpening />
        <ChapterPeople />
      </div>
    </section>
  )
}
