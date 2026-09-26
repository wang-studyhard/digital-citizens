import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { FigureNotes } from '@/components/shared/FigureNotes'
import { ageChartData, educationChartData, genderChartData } from '@/data/chartData'
import { ChapterIntro } from './ChapterIntro'

function EducationBooks() {
  const groups = [...educationChartData].sort((a, b) => b.value - a.value)
  return (
    <section className="viz-figure education-books" aria-labelledby="people-education-title">
      <header className="viz-figure__header"><div><h3 id="people-education-title">学历</h3><p className="viz-figure__unit">书脊高度表示样本内比例 · 0—100%</p></div></header>
      <svg className="education-books__plot" viewBox="0 0 400 240" aria-hidden="true" focusable="false">
        {[0, 25, 50, 75, 100].map((tick) => <g key={tick}>
          <text x="30" y={218 - tick * 2} textAnchor="end">{tick}</text>
          <path className="education-books__grid" d={`M40 ${214 - tick * 2}H396`} />
        </g>)}
        {groups.map((group, index) => {
          const x = 57 + index * 88
          const height = group.value * 2
          const y = 214 - height
          return <g className="education-books__book" key={group.id}>
            <rect x={x} y={y} width="52" height={height} />
            <path className="education-books__binding" d={`M${x + 8} ${y}V214`} />
            {height >= 8 && <path className="education-books__pages" d={`M${x + 15} ${y + 4}h32`} />}
          </g>
        })}
      </svg>
      <ul className="education-books__labels">{groups.map((group) => <li key={group.id}><span>{group.label}</span><strong data-evidence-id={group.id}>{group.value}%</strong></li>)}</ul>
    </section>
  )
}

export function ChapterPeople() {
  return (
      <section id="scene6" className="story-subsection" aria-labelledby="scene6-title">
          <ChapterIntro id="scene6" title="他们是谁" intro="前面的问卷留下282名数字游民有效回答。接下来只看这组样本内部的年龄、学历与性别认同。" />

          <figure className="profile-dots" aria-labelledby="people-profile-title">
            <div className="profile-dots__title"><h3 id="people-profile-title">282人的年龄、学历与性别认同</h3><FigureNotes sourceRefs={[1]} population="NCC社区渠道282名数字游民" scope="仅样本内部比例" period="2024年4月至5月" cutoff="" locator="[1]年龄、学历与性别分布" note="样本渠道有限，不能推算全国数字游民。" /></div>
            <p className="profile-dots__deck">三组数值均为这282人的样本内比例。</p>
            <div className="profile-grid">
              <section className="viz-figure profile-age" aria-labelledby="people-age-title">
                <header className="viz-figure__header"><h3 id="people-age-title">出生年代</h3></header>
                <div className="profile-age__bar" aria-hidden="true">{ageChartData.map((item) => <span key={item.id} style={{ width: `${item.value}%` }} />)}</div>
                <ul className="profile-age__key">{ageChartData.map((item) => <li key={item.id}><i aria-hidden="true" /><span>{item.label}</span><strong><EvidenceValue metricId={item.id} showSource={false} /></strong></li>)}</ul>
              </section>
              <EducationBooks />
              <section className="viz-figure profile-gender" aria-labelledby="people-gender-title">
                <header className="viz-figure__header"><div><h3 id="people-gender-title">性别认同</h3><p className="viz-figure__unit">282人样本内比例</p></div></header>
                <div className="profile-gender__bar" aria-hidden="true">{genderChartData.map((item) => <span key={item.id} style={{ width: `${item.value}%` }} />)}</div>
                <ul className="profile-gender__key">{genderChartData.map((item) => <li key={item.id}><i /><span>{item.label}</span><strong><EvidenceValue metricId={item.id} showSource={false} /></strong></li>)}</ul>
              </section>
            </div>
          </figure>

          <p className="limits-rule limits-rule--chapter limits-rule--center"><span>真正改变故事的，是他们来到一个地方以后<strong>发生的事情</strong>。</span></p>
      </section>
  )
}
