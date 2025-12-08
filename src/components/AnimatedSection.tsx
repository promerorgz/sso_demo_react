import { motion, type Variants } from 'framer-motion'
import { PropsWithChildren } from 'react'

type AnimatedSectionProps = PropsWithChildren<{
  className?: string
  delay?: number
  y?: number
}>

const variants: Variants = {
  hidden: (y: number = 24) => ({ opacity: 0, y }),
  show: { opacity: 1, y: 0 },
}

export default function AnimatedSection({ children, className, delay = 0.05, y = 24 }: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      custom={y}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay }}
    >
      {children}
    </motion.section>
  )
}
