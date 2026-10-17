import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const poster = `${import.meta.env.BASE_URL}media/hero-nomad-poster.webp`
const nodes = [0.18, 0.4, 0.61, 0.8, 0.94, 0.98]
const nodeTimes = [0.25, 0.38, 0.5, 0.61, 0.69, 0.74]

export function HeroScrollMedia() {
  const mediaRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const media = mediaRef.current
    const video = videoRef.current
    const path = pathRef.current
    const section = media?.closest('section')
    if (!media || !video || !path || !section) return

    const matchMedia = gsap.matchMedia()
    matchMedia.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, section)
      let timeline: gsap.core.Timeline | undefined

      const reset = () => {
        timeline?.scrollTrigger?.kill()
        context.revert()
        timeline = undefined
        section.classList.remove('hero-scene--scrub')
      }

      const initialize = () => {
        if (timeline || !Number.isFinite(video.duration) || video.duration <= 0) return
        section.classList.add('hero-scene--scrub')
        context.add(() => {
          const circles = media.querySelectorAll<SVGCircleElement>('.hero-river__node')
          circles.forEach((node, index) => {
            const point = path.getPointAtLength(path.getTotalLength() * nodes[index])
            gsap.set(node, { attr: { cx: point.x, cy: point.y }, opacity: 0, scale: 0.5, transformOrigin: 'center', transformBox: 'fill-box' })
          })
          const playhead = { time: 0 }
          timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
          })
          timeline.to(playhead, {
            time: Math.max(0, video.duration - 0.05), duration: 1,
            onUpdate: () => { video.currentTime = playhead.time },
          }, 0)
          timeline.fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.58 }, 0.12)
          circles.forEach((node, index) => {
            timeline!.to(node, { opacity: 1, scale: 1, duration: 0.04 }, nodeTimes[index])
          })
          timeline.to('.hero-start', { autoAlpha: 0, y: -8, duration: 0.08 }, 0.25)
          timeline.to('.hero-intro', { opacity: 0, y: -10, duration: 0.2 }, 0.38)
          timeline.to('.hero-question', { opacity: 0, y: -8, duration: 0.2 }, 0.55)
          timeline.to('.hero-copy h1', { opacity: 0, y: -8, duration: 0.16 }, 0.72)
          timeline.to(media, { opacity: 0.85, duration: 0.1 }, 0.9)
          timeline.scrollTrigger?.refresh()
        })
      }

      video.addEventListener('loadedmetadata', initialize)
      video.addEventListener('error', reset)
      video.preload = 'auto'
      video.src = `${import.meta.env.BASE_URL}media/hero-nomad.mp4`
      if (video.readyState >= 1) initialize()

      return () => {
        video.removeEventListener('loadedmetadata', initialize)
        video.removeEventListener('error', reset)
        reset()
        video.removeAttribute('src')
        video.preload = 'none'
        video.load()
      }
    })
    return () => matchMedia.revert()
  }, [])

  return (
    <div ref={mediaRef} className="hero-media" aria-hidden="true">
      <img className="hero-media__poster" src={poster} alt="" width="1920" height="1080" fetchPriority="high" />
      <video ref={videoRef} className="hero-media__video" muted playsInline preload="none" poster={poster} aria-hidden="true" />
      <div className="hero-media__wash" />
      <svg className="hero-river" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path ref={pathRef} className="hero-river__path" pathLength="1" d="M 0 820 C 210 690 300 610 500 645 C 700 680 820 665 970 555 C 1110 455 1260 500 1395 410 C 1510 335 1590 245 1710 210 C 1810 180 1870 145 1920 110" />
        {nodes.map((position) => <circle key={position} className="hero-river__node" cx="0" cy="0" r="4" />)}
      </svg>
    </div>
  )
}
