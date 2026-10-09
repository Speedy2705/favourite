import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), reducedMotion ? 150 : 650)
    return () => window.clearTimeout(timer)
  }, [reducedMotion])
  return <AnimatePresence>{isLoading && <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}><motion.span className="loading-heart" animate={reducedMotion ? undefined : { scale: [1, 1.18, 1] }} transition={{ duration: 1, repeat: Infinity }}>♥</motion.span><span>unwrapping your little surprise</span></motion.div>}</AnimatePresence>
}