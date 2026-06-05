import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FadeInViewProps {
  children: ReactNode
  /** 动画变体类型 */
  variant?: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scale'
  /** 延迟（秒） */
  delay?: number
  /** 触发阈值（0-1） */
  threshold?: number
  /** 是否只触发一次 */
  once?: boolean
  /** 额外 CSS 类名 */
  className?: string
  /** 是否启用 stagger children */
  staggerChildren?: boolean
  /** stagger 间隔 */
  staggerDelay?: number
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const variantMap: Record<string, Variants> = {
  fadeUp: fadeUpVariants,
  fadeIn: fadeInVariants,
  fadeLeft: fadeLeftVariants,
  fadeRight: fadeRightVariants,
  scale: scaleVariants,
}

export function FadeInView({
  children,
  variant = 'fadeUp',
  delay = 0,
  threshold = 0.15,
  once = true,
  className = '',
  staggerChildren = false,
  staggerDelay = 0.1,
}: FadeInViewProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    rootMargin: '-40px 0px',
  })

  const selectedVariant = variantMap[variant] || fadeUpVariants

  const variants: Variants = staggerChildren
    ? {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : {
        hidden: selectedVariant.hidden,
        visible: {
          ...selectedVariant.visible,
          transition: {
            ...(selectedVariant.visible as any)?.transition,
            delay,
          },
        },
      }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
