import { useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { useRef } from 'react'

type DaysCounterProps = { startDate: string; eyebrow: string; title: string; titleHighlight: string; description: string }

export function DaysCounter({ startDate, eyebrow, title, titleHighlight, description }: DaysCounterProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const count = useMotionValue(0)
  const [target, setTarget] = useState(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setTarget(Math.max(0, Math.floor((Date.now() - new Date(startDate).getTime()) / 86400000)))
    })
    return () => cancelAnimationFrame(frame)
  }, [startDate])

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, target, { duration: 1.8, ease: 'easeOut' })
    const unsubscribe = count.on('change', (value) => setDisplay(Math.round(value)))
    return () => { controls.stop(); unsubscribe() }
  }, [count, isInView, target])

  return (
    <motion.section ref={sectionRef} id="days" className="section counter-section" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }}>
      <div className="counter-copy"><p className="eyebrow">{eyebrow}</p><h2>{title}<br /><em>{titleHighlight}</em></h2><p>{description}</p></div>
      <div className="counter-badge"><motion.span className="counter-heart" animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>♥</motion.span><strong>{display.toLocaleString()}</strong><span>days together</span></div>
    </motion.section>
  )
}