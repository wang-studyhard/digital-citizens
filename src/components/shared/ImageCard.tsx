import { motion } from 'framer-motion'
import { FadeInView } from './FadeInView'

interface ImageCardProps {
  /** 图片 URL */
  src?: string
  /** 图片 alt */
  alt: string
  /** 标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 来源标注 */
  credit?: string
  /** 用户待提供素材标记 */
  userProvided?: boolean
  /** 宽高比 */
  aspectRatio?: '16/9' | '4/3' | '1/1'
  /** 自定义类名 */
  className?: string
}

const aspectRatioMap: Record<string, string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-4/3',
  '1/1': 'aspect-square',
}

export function ImageCard({
  src,
  alt,
  title,
  description,
  credit,
  userProvided = false,
  aspectRatio = '16/9',
  className = '',
}: ImageCardProps) {
  return (
    <FadeInView variant="fadeUp" threshold={0.1}>
      <motion.div
        className={`bg-duck-900/50 rounded-card shadow-card overflow-hidden border border-duck-200/8 ${className}`}
        whileHover={{ y: -2, boxShadow: '0 4px 24px rgba(45, 52, 54, 0.10)' }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`${aspectRatioMap[aspectRatio]} bg-duck-100 relative overflow-hidden`}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          ) : userProvided ? (
            <div className="flex flex-col items-center justify-center h-full text-duck-300">
              <svg
                className="w-10 h-10 mb-2 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs font-mono">素材待提供</span>
            </div>
          ) : (
            <img
              src={`https://picsum.photos/seed/${encodeURIComponent(alt.replace(/\s+/g, '-').toLowerCase())}/800/600`}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          )}
        </div>

        {(title || description || credit) && (
          <div className="p-4">
            {title && (
              <h4 className="font-serif font-medium text-charcoal mb-1">
                {title}
              </h4>
            )}
            {description && (
              <p className="text-sm text-slate leading-relaxed line-clamp-3">
                {description}
              </p>
            )}
            {credit && (
              <p className="text-xs text-mist mt-2 font-mono">{credit}</p>
            )}
          </div>
        )}
      </motion.div>
    </FadeInView>
  )
}
