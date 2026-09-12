import { SceneShell } from '@/components/shared/SceneShell'
import { workColumns } from '@/data/derived'

export function Scene2Work() {
  return (
    <SceneShell id="scene2" number="02" title="地点变化，不等于劳动条件消失" intro="地点可以移动，劳动关系不会自动消失。这里是编辑分析，不把访谈与判断伪装成统计趋势。" tone="night">
      <div className="work-lead"><p>工作地点离开固定办公室，时间、交付和关系被重新编排；真正变化的，是它们与地方相遇的方式。</p><span>编辑关系图 / 非统计图</span></div>
      <div className="work-columns">
        {workColumns.map((column) => (
          <article key={column.title} className={`work-column work-column--${column.tone}`}>
            <h3>{column.title}</h3>
            <ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
      <figure className="relation-figure" aria-labelledby="relation-title">
        <div className="relation-figure__text"><h3 id="relation-title">地点离开了，劳动仍在场</h3><p>网络可以把人带到远方，也把任务、排期和保障问题带进新的地方。社区提供相遇机会，但不能替代长期制度。</p></div>
        <svg className="relation-svg" viewBox="0 0 720 220" role="img" aria-label="工作地点、项目交付、地方接触和劳动保障之间的编辑关系图">
          <path d="M62 110 H210 M270 110 H420 M480 110 H650" />
          <circle cx="62" cy="110" r="25" /><circle cx="240" cy="110" r="25" /><circle cx="450" cy="110" r="25" /><circle cx="675" cy="110" r="25" />
        </svg>
        <div className="relation-labels"><span>工作地点</span><span>项目交付</span><span>地方接触</span><span>劳动保障</span></div>
        <figcaption>箭头表达阅读关系，不表达因果强度、自由度评分或稳定度指数。</figcaption>
      </figure>
    </SceneShell>
  )
}
