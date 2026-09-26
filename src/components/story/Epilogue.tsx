import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { DataSource } from '@/components/shared/DataSource'
import { ChapterIntro } from './ChapterIntro'

export function Epilogue() {
  return (
    <section id="scene12" className="scene scene--paper" aria-labelledby="scene12-title">
      <div className="scene-shell">
        <ChapterIntro id="scene12" number="05" title="人才流动的新支流" intro="过去很长一段时间里，人跟着工作走。数字技术正在让这种关系出现新的可能。" />

        <p className="economy-context">2024年，全国数字经济核心产业增加值为 <EvidenceValue metricId="digital-economy-core-value-added-2024" showSource={false} />，占GDP的 <EvidenceValue metricId="digital-economy-core-gdp-share-2024" showSource={false} />；不能据此解释具体社区的发展原因。<DataSource refNumber={21} /></p>

        <div className="epilogue-story">
          <p>77 家数字游民社区，只是变化里的一扇小窗口。</p>
          <p>城市里的<strong>专业能力</strong>进入村庄，闲置空间重新被使用。</p>
          <p>面馆有了<strong>新菜单</strong>，陌生人一起编辑<strong>地方小报</strong>。</p>
          <p>设计、内容和创业能力，也进入了具体的<strong>地方项目</strong>。</p>
          <p>人才流动的方向，开始出现<strong>新的支流</strong>。</p>
          <small>77 家是研究纳入的社区样本，不能代表所有数字游民社区。</small>
          <div className="epilogue-story__questions">
            <p>这样的变化仍然年轻。</p>
            <p>社区和项目能否持续？</p>
            <p>菜单、小报与共创项目的连接，能延续到下一次停留之后吗？</p>
          </div>
        </div>

        <div className="epilogue-conclusion">
          <p className="epilogue-conclusion__kicker">一条真正健康的数字江河</p>
          <p>需要的不只是网络和空间。</p>
          <p>也需要让流动中的人，与地方建立能够持续的关系。</p>
          <small>这些是作品的结论性判断，仍需在地方的长期实践中检验。</small>
          <div className="epilogue-conclusion__action">
            <button type="button" onClick={(event) => window.dispatchEvent(new CustomEvent('open-evidence', { detail: { trigger: event.currentTarget } }))}>查看数据与来源 <span aria-hidden="true">↗</span></button>
          </div>
        </div>

        <p className="limits-rule limits-rule--chapter limits-rule--center epilogue-closing"><strong>当人重新选择工作的地点，也要重新理解地方怎样接住人。</strong></p>
      </div>
    </section>
  )
}
