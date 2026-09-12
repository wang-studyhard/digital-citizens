import { EvidenceValue } from '@/components/shared/EvidenceValue'
import { ImageCard } from '@/components/shared/ImageCard'

const NODES = [
  { label: '闲置空间', detail: '3.7 万平方米资源整合', className: 'network-node--space' },
  { label: 'DNA 社区', detail: '设计、内容与协作', className: 'network-node--community' },
  { label: '青创场景', detail: '乡村工位与项目', className: 'network-node--project' },
  { label: '村集体 / 商户', detail: '从具体需求开始', className: 'network-node--local' },
]

export function AnjiNetwork() {
  return (
    <figure className="case-panel case-panel--anji" aria-labelledby="anji-network-title">
      <div className="case-panel__header"><div><p className="data-label text-duck-700">case 01 · anji</p><h3 id="anji-network-title" className="mt-2 font-serif text-3xl text-duck-950 md:text-4xl">一个社区，如何进入更大的青年入乡网络？</h3></div><span className="case-index">01</span></div>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-duck-900/80">安吉的公开报道没有把“数字游民”写成一项人口统计，而是记录了社区成员怎样为当地餐厅设计海报、门头、菜单，并制作白茶相关内容。</p>
      <div className="mt-8 max-w-3xl">
        <ImageCard
          src="/media/editorial/xinhua-anji-shared-office.jpg"
          alt="安吉溪龙乡数字游民公社共享办公区，木结构屋顶下有多人在工位办公。"
          title="共享办公区内景"
          description="新华社报道配图：安吉县溪龙乡的“数字游民公社”共享办公区内景。"
          credit="新华社｜2023-06-02｜韩传号 摄｜用户授权项目使用"
          aspectRatio="16/9"
        />
      </div>
      <div className="anji-network" role="img" aria-label="闲置空间连接数字游民社区、青创场景和村集体商户">
        <svg className="network-lines" viewBox="0 0 800 260" preserveAspectRatio="none" aria-hidden="true"><path d="M100 130 C220 35 270 35 400 130 S580 225 700 130" /><path d="M100 130 C220 225 270 225 400 130 S580 35 700 130" /></svg>
        {NODES.map((node) => <div key={node.label} className={`network-node ${node.className}`}><span>{node.label}</span><small>{node.detail}</small></div>)}
      </div>
      <div className="mt-8 grid gap-4 border-t border-duck-950/15 pt-5 sm:grid-cols-3">
        <p className="text-sm leading-6 text-duck-900/75"><strong className="block font-mono text-xl text-duck-950"><EvidenceValue metricId="anji-space-reuse" display="3.7 万㎡" /></strong>被重新组织的空间</p>
        <p className="text-sm leading-6 text-duck-900/75"><strong className="block font-mono text-xl text-duck-950"><EvidenceValue metricId="anji-youth-office" display="1200+" /></strong>常态化办公青年</p>
        <p className="text-sm leading-6 text-duck-900/75"><strong className="block font-mono text-xl text-duck-950">DNA</strong>具体合作的入口</p>
      </div>
      <figcaption className="mt-5 text-xs leading-6 text-duck-900/65">图中连接表示报道记录的行动关系，不表示因果模型或总体经济贡献。青年入乡统计与数字游民案例严格分层。</figcaption>
    </figure>
  )
}
