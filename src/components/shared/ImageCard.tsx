import { useState } from 'react'

type ImageCardProps = {
  src: string
  alt: string
  caption?: string
  credit?: string
  width: number
  height: number
  fit?: 'natural' | 'contain' | 'cover'
  objectPosition?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'auto' | 'low'
  srcSet?: string
  sizes?: string
  synthetic?: boolean
  syntheticLabel?: string
  className?: string
}

export function ImageCard({
  src,
  alt,
  caption,
  credit,
  width,
  height,
  fit = 'natural',
  objectPosition = 'center',
  loading = 'lazy',
  fetchPriority = 'auto',
  srcSet,
  sizes,
  synthetic = false,
  syntheticLabel = 'AI 生成编辑插画',
  className = '',
}: ImageCardProps) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className={`image-card ${className}`}>
      <div className={`image-card__media image-card__media--${fit}`} style={{ aspectRatio: `${width} / ${height}` }}>
        {failed ? (
          <div className="image-card__fallback">
            <span>图片暂时无法加载</span>
            <small>{alt}</small>
          </div>
        ) : (
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            width={width}
            height={height}
            alt={alt}
            loading={loading}
            fetchPriority={fetchPriority}
            onError={() => setFailed(true)}
            style={{ objectPosition }}
          />
        )}
      </div>
      {(caption || credit || synthetic) && (
        <figcaption>
          {caption && <span>{caption}</span>}
          {synthetic && <span className="image-card__synthetic">{syntheticLabel}</span>}
          {credit && <small>{credit}</small>}
        </figcaption>
      )}
    </figure>
  )
}
