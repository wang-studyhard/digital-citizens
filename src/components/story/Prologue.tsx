import { ImageCard } from '@/components/shared/ImageCard'
import { editorialPhoto } from '@/data/editorialPhoto'
import { HeroScrollMedia } from './HeroScrollMedia'

const coverPhoto = editorialPhoto('xinhua-anji-shared-office')

export function Prologue() {
  return (
    <>
      <section id="scene0" className="hero-scene hero-scene--scroll" aria-labelledby="hero-title">
        <div className="hero-scene__sticky">
          <HeroScrollMedia />
          <div className="hero-scene__inner">
            <div className="hero-copy">
              <h1 id="hero-title">数字江河</h1>
              <p className="hero-question">当工作地点可以移动，<em>一个地方怎样让短暂的停留产生具体的连接？</em></p>
              <div className="hero-intro" role="group" aria-label="作品导语">
                <p><span className="story-line">工作可以在不同地方继续，停留又会改变人与地方的关系。</span><span className="story-line">先认识数字游民，再走进中国社区。</span></p>
              </div>
              <a className="hero-start" href="#introduction">沿着这条河往下看 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </div>
      </section>
      <div className="hero-followup">
        <div className="hero-dossier" role="group" aria-label="安吉共享办公现场">
          <ImageCard className="hero-dossier__photo" src={`${import.meta.env.BASE_URL}${coverPhoto.path.slice(1)}`} alt={coverPhoto.alt} caption={coverPhoto.caption} credit={`${coverPhoto.publishedAt}｜${coverPhoto.photographer} 摄｜${coverPhoto.publisher}`} sourceUrl={coverPhoto.sourceUrl} width={coverPhoto.intrinsicWidth} height={coverPhoto.intrinsicHeight} loading="eager" fetchPriority="high" />
        </div>
        <nav className="case-route" aria-label="按地点进入案例">
        <p>按地点进入案例</p>
        <ol>
          <li><a href="#anji-stay-title"><span>01 / 浙江 · 安吉</span><strong>工作与停留</strong><small>473 位入住者的记录；后来还有菜单与小报。</small><em>阅读案例</em></a></li>
          <li><a href="#yixian-stay-title"><span>02 / 安徽 · 黟县</span><strong>共居与地方行动</strong><small>旧厂房改造出 58 个房间，入住者还参与地方项目。</small><em>阅读案例</em></a></li>
          <li><a href="#scene9"><span>03 / 浙江 · 丽水</span><strong>共创提案</strong><small>41 项提案中，12 项已有公开落地记录。</small><em>阅读案例</em></a></li>
        </ol>
        </nav>
      </div>
    </>
  )
}
