import { motion, useReducedMotion } from 'framer-motion'

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 37) % 86)}%`,
  delay: -((index * 1.7) % 9),
  duration: 8 + (index % 5),
  size: 7 + (index % 4) * 3,
}))

export function Particles() {
  const reducedMotion = useReducedMotion()
  return <div className="particles">
    {particles.map((particle) => <motion.span key={particle.id} className="floating-particle" style={{ left: particle.left, width: particle.size, height: particle.size }} initial={{ y: '110vh', opacity: 0 }} animate={reducedMotion ? { y: 0, opacity: .25 } : { y: '-15vh', opacity: [0, .55, .25, 0] }} transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'linear' }}><span>{particle.id % 3 === 0 ? '+' : '*'}</span></motion.span>)}
  </div>
}