import { ChapterIntro } from './ChapterIntro'

export function Epilogue() {
  return (
    <section id="scene12" className="scene scene--paper" aria-labelledby="scene12-title">
      <div className="scene-shell">
        <ChapterIntro id="scene12" number="05" title="人才流动的新支流" intro={<><span className="story-line">过去很长一段时间里，人跟着工作走。</span><span className="story-line">数字技术正在让这种关系出现新的可能。</span></>} />

        <div className="epilogue-story">
          <p>77 家数字游民社区，只是变化里的一扇小窗口。</p>
          <p>城市里的<strong>专业能力</strong>进入村庄，闲置空间重新被使用。</p>
          <p>面馆有了<strong>新菜单</strong>，陌生人一起编辑<strong>地方小报</strong>。</p>
          <p>设计、内容和创业能力，也进入了具体的<strong>地方项目</strong>。</p>
          <small>77 家是研究纳入的社区样本，不能代表所有数字游民社区。</small>
          <div className="epilogue-story__questions">
            <p>菜单、小报与共创项目的连接，能延续到下一次停留之后吗？</p>
          </div>
        </div>

        <div className="epilogue-conclusion">
          <p className="epilogue-judgment"><span>当人重新选择工作的地点，</span><span>也要重新理解地方怎样接住人。</span></p>
          <small>答案仍要交给更长时间的地方实践。</small>
          <div className="epilogue-conclusion__action">
            <button type="button" onClick={(event) => window.dispatchEvent(new CustomEvent('open-evidence', { detail: { trigger: event.currentTarget } }))}>查看数据与来源 <span aria-hidden="true">↗</span></button>
          </div>
        </div>

      </div>
    </section>
  )
}
