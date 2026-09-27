import { motion } from 'framer-motion'
import { useEffect } from 'react'

type CelebrationBurstProps = { onComplete: () => void }

export function CelebrationBurst({ onComplete }: CelebrationBurstProps) {
  useEffect(() => { const timer = window.setTimeout(onComplete, 2200); return () => window.clearTimeout(timer) }, [onComplete])
  return <motion.div className="celebration-burst" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 2.2 }} aria-live="polite"><strong>you found the secret</strong>{Array.from({ length: 12 }, (_, index) => <motion.span key={index} initial={{ x: 0, y: 0, scale: 0 }} animate={{ x: Math.cos(index) * (80 + index * 4), y: Math.sin(index) * (80 + index * 4), scale: 1 }} transition={{ duration: 1.2, ease: 'easeOut' }}>♥</motion.span>)}</motion.div>
}