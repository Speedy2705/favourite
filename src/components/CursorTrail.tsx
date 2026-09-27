import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CursorTrail() {
  const [isTouch, setIsTouch] = useState(true)
  const reducedMotion = useReducedMotion()
  const x = useSpring(useMotionValue(-30), { stiffness: 350, damping: 28 })
  const y = useSpring(useMotionValue(-30), { stiffness: 350, damping: 28 })

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)')
    const update = () => setIsTouch(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (isTouch || reducedMotion) return
    const move = (event: MouseEvent) => { x.set(event.clientX - 8); y.set(event.clientY - 8) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [isTouch, reducedMotion, x, y])

  if (isTouch || reducedMotion) return null
  return <motion.span className="cursor-trail" style={{ x, y }}>♥</motion.span>
}