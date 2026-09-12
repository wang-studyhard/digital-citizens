import { SceneShell } from '@/components/shared/SceneShell'
import { limits } from '@/data/derived'

export function Scene6Limits() {
  return (
    <SceneShell id="scene6" number="06" title="我们目前能确认什么？" intro="证据的边界不是附注，而是这篇作品最重要的结论。知道什么，也知道还不能说什么。">
      <div className="limits-grid">
        <article className="limits-column limits-column--can"><h3>能确认</h3><p>公开研究、报道和政策材料共同指向一些正在发生的变化。</p><ul>{limits.canSay.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="limits-column limits-column--cannot"><h3>证据还不能回答</h3><p>现有材料不足以把局部观察推成全国结果或长期因果关系。</p><ul>{limits.cannotSay.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div>
      <div className="limits-rule"><span>一条判断规则</span><strong>入住 ≠ 留下 · 到访 ≠ 就业 · 项目 ≠ 长期结果</strong></div>
    </SceneShell>
  )
}
