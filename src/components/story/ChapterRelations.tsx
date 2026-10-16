import { DataSource } from '@/components/shared/DataSource'
import { ChartFrame } from '@/components/shared/ChartFrame'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { ImageCard } from '@/components/shared/ImageCard'
import { lishuiCoCreationData, yixianActionData } from '@/data/chartData'
import { editorialPhoto } from '@/data/editorialPhoto'
import { ChapterIntro } from './ChapterIntro'

const menuPhoto = editorialPhoto('tidenews-anji-menu-wall')
const newspaperPhoto = editorialPhoto('tidenews-baichayuan-newspapers')
const notebookIllustration = editorialPhoto('generated-anji-notebook-concept')
const yixianPhoto = editorialPhoto('xinhua-yixian-heidou-discussion')
const lishuiIllustration = editorialPhoto('generated-lishui-cocreation-concept')

export function ChapterRelations() {
  return (
      <section id="scene7" className="scene scene--field" aria-labelledby="scene7-title">
        <div className="scene-shell">
          <ChapterIntro id="scene7" number="03" title="从停留到共创" intro="这一幕暂时离开统计图表，回到一家没有店招和菜单的小面店。" />
          <h3 className="chapter-passage-title">故事从一份菜单开始</h3>

          <article className="case-archive menu-story" aria-labelledby="menu-story-title">
            <p className="case-location">01 / 浙江 · <strong>安吉</strong></p>
            <h3 id="menu-story-title">把专业能力用在一件地方小事上</h3>
            <div className="menu-story__sequence">
              <p>一位社区成员为曹大姐的小面店<strong>手绘菜单</strong>，取名“大姐面馆”。<DataSource refNumber={20} /></p>
              <p>社区成员还编辑两期《白茶原小报》，参与三册《白茶原手账2022》的撰稿、绘画、编辑和设计。<DataSource refNumber={20} /></p>
              <div className="menu-story__materials">
                <ImageCard src={`${import.meta.env.BASE_URL}${menuPhoto.path.slice(1)}`} alt={menuPhoto.alt} caption={menuPhoto.caption} credit={`报道：${menuPhoto.publishedAt}｜图片来源：DNA｜${menuPhoto.publisher}刊载`} sourceUrl={menuPhoto.sourceUrl} width={menuPhoto.intrinsicWidth} height={menuPhoto.intrinsicHeight} />
                <ImageCard src={`${import.meta.env.BASE_URL}${newspaperPhoto.path.slice(1)}`} alt={newspaperPhoto.alt} caption={newspaperPhoto.caption} credit={`报道：${newspaperPhoto.publishedAt}｜${newspaperPhoto.publisher}报道配图`} sourceUrl={newspaperPhoto.sourceUrl} width={newspaperPhoto.intrinsicWidth} height={newspaperPhoto.intrinsicHeight} />
              </div>
              <ImageCard className="menu-story__handbook" src={`${import.meta.env.BASE_URL}${notebookIllustration.path.slice(1)}`} alt={notebookIllustration.alt} caption={notebookIllustration.caption} width={notebookIllustration.intrinsicWidth} height={notebookIllustration.intrinsicHeight} />
              <p>一份菜单无法证明村庄因此发生巨大变化。</p>
              <p>人与地方之间，多了一条具体的连接。</p>
            </div>
          </article>
      <section id="scene8" className="story-subsection" aria-labelledby="scene8-title">
          <ChapterIntro id="scene8" title="从住下来，到一起做事" intro="黟县公开材料记录到访，也记录专业能力如何进入地方项目。" />
          <p className="case-location">02 / 安徽 · <strong>黟县</strong></p>
          <ImageCard className="yixian-field-photo" src={`${import.meta.env.BASE_URL}${yixianPhoto.path.slice(1)}`} alt={yixianPhoto.alt} caption={yixianPhoto.caption} credit={`${yixianPhoto.publishedAt}｜${yixianPhoto.photographer} 摄｜${yixianPhoto.publisher}`} sourceUrl={yixianPhoto.sourceUrl} width={yixianPhoto.intrinsicWidth} height={yixianPhoto.intrinsicHeight} />

          <ChartFrame id="yixian-action-chart" title="四类并列的地方行动" unit="人数、场次、项目与任务分别记录" population="黟县政府公开信息" scope="民宿与地方项目" period="2024年7月运营以来；2025年公开" cutoff="" locator="[16]数字游民生态段" sourceRefs={[16]} note="四项记录的对象与单位不同，不能计算参与者逐步转化的比例；5000余名为报道概数。">
            <div className="action-visual">{yixianActionData.map((item, index) => <div className="action-visual__item" key={item.id}><span>{['入住记录', '活动记录', '项目设计', '揭榜任务'][index]}</span><strong><EvidenceValue metricId={item.id} showSource={false} /></strong><p>{item.label}</p></div>)}</div>
          </ChartFrame>

          <div className="action-conclusion">
            <p>到访之外，公开记录里也留下了<strong>活动、项目设计和任务</strong>。</p>
            <p>黄山市政府还公布“带动消费 <EvidenceValue metricId="huangshan-consumption-2025-followup" display="2200余万元" showSource={false} />”。<DataSource refNumber={16} /></p>
            <small>公开材料未给出计算方法，不能据此确定净新增经济价值。</small>
          </div>

      </section>

      <section id="scene9" className="story-subsection" aria-labelledby="scene9-title">
          <ChapterIntro id="scene9" title="41个想法，12个落地" intro="旅居记录谁来到这里；共创还要看哪些想法真正进入地方。" />
          <p className="case-location">03 / 浙江 · <strong>丽水</strong></p>

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

          <ImageCard className="lishui-cocreation-illustration" src={`${import.meta.env.BASE_URL}${lishuiIllustration.path.slice(1)}`} alt={lishuiIllustration.alt} caption={lishuiIllustration.caption} width={lishuiIllustration.intrinsicWidth} height={lishuiIllustration.intrinsicHeight} />

          <p className="limits-rule limits-rule--chapter limits-rule--center"><span className="story-line">空间让人相遇。</span><span className="story-line">具体的事情，让<strong>关系继续发生</strong>。</span></p>
      </section>
        </div>
      </section>
  )
}
