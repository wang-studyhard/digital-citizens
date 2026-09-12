import { useState } from 'react'
import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { ImageCard } from '@/components/shared/ImageCard'
import { SceneShell } from '@/components/shared/SceneShell'
import { anjiSteps, huangshanSteps } from '@/data/derived'

const huangshanImages = [
  { src: '/media/editorial/xinhua-yixian-heidou-community.jpg', alt: '黟县黑多岛数字游民社区内，一名分享者站在投影幕前，观众坐在台下。', caption: '分享活动现场', credit: '新华社｜2024-09-14｜傅天 摄｜用户授权项目使用', width: 1024, height: 672 },
  { src: '/media/editorial/xinhua-yixian-heidou-discussion.jpg', alt: '黟县黑多岛数字游民社区内，多人围坐交流。', caption: '社区交流', credit: '新华社｜2024-09-14｜傅天 摄｜用户授权项目使用', width: 990, height: 660 },
] as const

export function Scene4Cases() {
  return (
    <SceneShell id="scene4" number="04" title="地方现场：安吉 × 黟县" intro="两个案例不负责证明全国结论，只负责把“发生了什么”放回地点、时间、行动与报道来源。" tone="field">
      <article className="case-archive case-archive--anji">
        <div className="case-archive__intro"><div><p className="case-location">浙江 / 安吉</p><h3>社区如何进入青年入乡网络？</h3><p>公开报道把安吉的社区、闲置空间、青年工作与本地需求放在同一条行动链上。这里的青年数据属于青年入乡生态，不等于数字游民规模。</p></div><div className="case-facts"><span><EvidenceValue metricId="anji-space-reuse" /></span><small>报道涉及的空间资源</small><span><EvidenceValue metricId="anji-youth-office" /></span><small>报道中的常态化办公青年</small></div></div>
        <div className="case-archive__body">
          <ImageCard src="/media/editorial/xinhua-anji-shared-office.jpg" alt="安吉溪龙乡数字游民公社共享办公区，木结构屋顶下有多人在工位办公。" caption="安吉县溪龙乡“数字游民公社”共享办公区内景。" credit="新华社｜2023-06-02｜韩传号 摄｜用户授权项目使用" width={1023} height={768} loading="lazy" />
          <div className="action-chain"><h4>行动链</h4><ol>{anjiSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol><p>这是编辑关系图，不是因果统计图。报道说明行动发生过，但没有提供总体就业或增收效果的调查。</p></div>
        </div>
        <dl className="case-ledger"><div><dt>谁</dt><dd>安吉青年入乡项目与社区成员</dd></div><div><dt>做了什么</dt><dd>为当地餐厅设计海报、门头和菜单，并制作《白茶原小报》。</dd></div><div><dt>已报道结果</dt><dd>空间被重新使用，青年与乡村、商户需求发生了具体连接。</dd></div><div><dt>不能推出什么</dt><dd>不能把青年入乡数字改写成数字游民人数，也不能推出长期就业或稳定增收。</dd></div></dl>
      </article>

      <HuangshanCase />
    </SceneShell>
  )
}

function HuangshanCase() {
  const [active, setActive] = useState(0)
  const current = huangshanSteps[active]
  return (
    <article className="case-archive case-archive--huangshan">
      <div className="case-archive__intro"><div><p className="case-location">安徽 / 黄山市黟县</p><h3>当旅居者开始接近地方任务</h3><p>新华社报道记录了一个由工业遗址改造而来的社区：空间先被打开，旅居者进入，活动与地方项目随后出现。</p></div><div className="case-stamp">报道档案<br /><strong>2025.03</strong></div></div>
      <div className="huangshan-reading">
        <div className="huangshan-reading__visual"><div className="huangshan-reading__current"><span>步骤 {String(active + 1).padStart(2, '0')} / 05</span><h4>{current.label}</h4>{'metricId' in current && current.metricId && <strong><EvidenceValue metricId={current.metricId} /></strong>}<p>{current.text}</p></div><div className="huangshan-reading__images">{huangshanImages.map((image) => <ImageCard key={image.src} {...image} />)}</div></div>
        <div className="huangshan-reading__steps" role="list" aria-label="黟县案例步骤">
          {huangshanSteps.map((step, index) => <button key={step.label} type="button" role="listitem" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-pressed={index === active}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step.label}</strong><small>{step.text}</small></button>)}
        </div>
      </div>
      <dl className="case-ledger"><div><dt>谁</dt><dd>黟县数字游民社区及进入社区的旅居者</dd></div><div><dt>做了什么</dt><dd>参与分享、户外工作、乡村电影活动及地方项目。</dd></div><div><dt>已报道结果</dt><dd>报道记录了具体活动与项目联系；政府公开信息另列入住、活动与任务等进展。</dd></div><div><dt>不能推出什么</dt><dd>入住人次不等于长期居住，消费数字也不等于数字游民单独创造的经济贡献。</dd></div></dl>
    </article>
  )
}
