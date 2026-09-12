import { SceneShell } from '@/components/shared/SceneShell'

export function Scene7Conclusion() {
  return (
    <SceneShell id="scene7" number="07" title="最后，观察关系有没有留下来" intro="当工作可以去往任何地方，真正值得观察的，不是一个人在哪里打开电脑，而是流动是否与一个地方形成了持续的关系。">
      <div className="conclusion-layout">
        <div className="conclusion-statement"><p>工作地点可以移动，关系需要时间。</p><strong>地方真正接住的，<br />不是一次抵达，<br />而是一段持续的共同工作。</strong></div>
        <div className="conclusion-aside"><p>继续观察的问题</p><h3>这些短期的相遇，能否变成持续的项目、工作与地方连接？</h3><button type="button" onClick={() => window.dispatchEvent(new Event('open-evidence'))}>查看数据与来源 <span aria-hidden="true">↗</span></button></div>
      </div>
    </SceneShell>
  )
}
