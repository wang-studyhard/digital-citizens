import { DataSource } from '@/components/shared/DataSource'
import { ChartFrame } from '@/components/shared/ChartFrame'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { lishuiCoCreationData, yixianActionData } from '@/data/chartData'
import { ChapterIntro } from './ChapterIntro'

function ActionIcon({ index }: { index: number }) {
  const drawing = [
    <><path d="M40 69c12-15 20-24 20-36a20 20 0 0 0-40 0c0 12 8 21 20 36Z" /><circle cx="40" cy="32" r="7" /><path d="M15 69h50" /></>,
    <><circle cx="27" cy="28" r="6" /><circle cx="53" cy="28" r="6" /><path d="M15 54c1-10 5-15 12-15s11 5 12 15M41 54c1-10 5-15 12-15s11 5 12 15M17 63h46" /></>,
    <><path d="M18 12h34l10 10v46H18V12ZM52 12v10h10M27 33h22M27 43h17" /><path d="m34 58 19-19 6 6-19 19-10 3 4-9Z" /></>,
    <><path d="M13 19h27v30H13V19ZM40 31h27v30H40V31ZM24 26h8M48 40h11" /><path d="m29 53 9 9 14-16M17 66h46" /></>,
  ][index]
  return <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawing}</svg>
}

export function ChapterRelations() {
  return (
      <section id="scene7" className="scene scene--field" aria-labelledby="scene7-title">
        <div className="scene-shell">
          <ChapterIntro id="scene7" number="03" title="从停留到共创" intro="这一幕暂时离开统计图表，回到一家没有店招和菜单的小面店。" />
          <h3 className="chapter-passage-title">故事从一份菜单开始</h3>

          <article className="case-archive menu-story" aria-labelledby="menu-story-title">
            <p className="case-location">浙江 / 安吉</p>
            <h3 id="menu-story-title">把专业能力用在一件地方小事上</h3>
            <div className="menu-story__sequence">
              <p>一位社区成员为曹大姐的小面店<strong>手绘菜单</strong>，取名“大姐面馆”。<DataSource refNumber={20} /></p>
              <p>社区成员还编辑两期《白茶原小报》，参与三册《白茶原手账2022》的撰稿、绘画、编辑和设计。<DataSource refNumber={20} /></p>
              <p>一份菜单无法证明村庄因此发生巨大变化。</p>
              <p>人与地方之间，多了一条具体的连接。</p>
            </div>
          </article>
      <section id="scene8" className="story-subsection" aria-labelledby="scene8-title">
          <ChapterIntro id="scene8" title="从住下来，到一起做事" intro="黟县公开材料记录到访，也记录专业能力如何进入地方项目。" />

          <ChartFrame id="yixian-action-chart" title="四类并列的地方行动" unit="人数、场次、项目与任务分别记录" population="黟县政府公开信息" scope="民宿与地方项目" period="2024年7月运营以来；2025年公开" cutoff="" locator="[16]数字游民生态段" sourceRefs={[16]} note="四项记录的对象与单位不同，不能计算参与者逐步转化的比例；5000余名为报道概数。">
            <div className="action-visual">{yixianActionData.map((item, index) => <div className="action-visual__item" key={item.id}><ActionIcon index={index} /><span>{['抵达', '相遇', '参与', '协作'][index]}</span><strong><EvidenceValue metricId={item.id} showSource={false} /></strong><p>{item.label}</p></div>)}</div>
          </ChartFrame>

          <div className="action-conclusion">
            <p>到访之外，公开记录里也留下了<strong>活动、项目设计和任务</strong>。</p>
            <p>黄山市政府还公布“带动消费 <EvidenceValue metricId="huangshan-consumption-2025-followup" display="2200余万元" showSource={false} />”。<DataSource refNumber={16} /></p>
            <small>公开材料未给出计算方法，不能据此确定净新增经济价值。</small>
          </div>

      </section>

      <section id="scene9" className="story-subsection" aria-labelledby="scene9-title">
          <ChapterIntro id="scene9" title="41个想法，12个落地" intro="旅居记录谁来到这里；共创还要看哪些想法真正进入地方。" />

          <div className="story-summary" aria-label="丽水公开进展">
            <p className="story-summary__eyebrow">丽水52赫兹社区 · 试运营不足一年</p>
            <p>同一报道还称，丽水已有 <EvidenceValue metricId="lishui-communities-2026" showSource={false} />。<DataSource refNumber={14} /></p>
          </div>

          <ChartFrame id="lishui-cocreation-chart" title="提案中的落地进展" unit="一张纸页代表1个提案，共41项" population="丽水52赫兹社区共创提案" scope="该社区试运营不足一年" period="截至2026年6月报道" cutoff="" locator="[14]共创项目段" sourceRefs={[14]} note="余下29项由41－12推得；报道未称已落地，不代表失败或正在推进。纸页只表达数量，不是原始文件，也不对应具体项目身份。">
            <div className="proposal-outcome" aria-label="41个共创提案中，12个已落地，其余29个未被报道为落地">
              <div className="proposal-pages" aria-hidden="true">{Array.from({ length: lishuiCoCreationData.proposals.value }, (_, index) => {
                const landed = index < lishuiCoCreationData.landed.value
                return <svg key={index} className={landed ? 'is-landed' : undefined} viewBox="0 0 36 46" focusable="false">
                  <path className="proposal-pages__paper" d="M3 2h21l9 9v33H3V2Z" />
                  <path className="proposal-pages__fold" d="M24 2v9h9M9 17h17M9 22h12" />
                  {landed ? <path className="proposal-pages__status" d="m10 33 5 5 11-12" /> : <path className="proposal-pages__status" d="M11 34h14" />}
                </svg>
              })}</div>
              <div className="proposal-outcome__labels"><div><i /><strong><EvidenceValue metricId={lishuiCoCreationData.landed.id} showSource={false} /></strong><span>报道已落地</span></div><div><i /><strong>{lishuiCoCreationData.proposals.value - lishuiCoCreationData.landed.value} 个提案</strong><span>报道未称已落地</span></div></div>
            </div>
          </ChartFrame>

          <p className="limits-rule limits-rule--chapter limits-rule--center"><span>空间让人相遇。具体的事情，让<strong>关系继续发生</strong>。</span></p>
      </section>
        </div>
      </section>
  )
}
