import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

type CharacterProps = { activeSection: string; onCelebrate: () => void }

const states: Record<string, { pose: string; message: string }> = {
  beginning: { pose: 'wave', message: 'hi, Maritreye!' },
  days: { pose: 'idle', message: 'still counting...' },
  timeline: { pose: 'walk', message: 'this way!' },
  gallery: { pose: 'point', message: 'look at this one' },
  letter: { pose: 'hug', message: 'made with love' },
  'little-things': { pose: 'idle', message: 'the little things' },
  keepsake: { pose: 'hug', message: 'keep it close' },
}

export function Character({ activeSection, onCelebrate }: CharacterProps) {
  const [isReacting, setIsReacting] = useState(false)
  const heroClicks = useRef(0)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, .5, 1], [0, -32, 12])
  const rotate = useTransform(scrollYProgress, [0, .5, 1], [-3, 3, -2])
  const current = states[activeSection] ?? states.beginning
  const isNarrow = typeof window !== 'undefined' && window.innerWidth <= 720

  return <motion.button type="button" className={`character character--${current.pose} ${isReacting ? 'character--reacting' : ''}`} style={reducedMotion || isNarrow ? undefined : { x, rotate }} onClick={() => { setIsReacting(true); window.setTimeout(() => setIsReacting(false), 900); if (activeSection === 'beginning') { heroClicks.current += 1; if (heroClicks.current === 3) { heroClicks.current = 0; onCelebrate() } } }} aria-label="Say hello to the character">
    <motion.span className="character-bubble" initial={{ opacity: 0, scale: .8 }} animate={isReacting ? { opacity: 1, scale: 1 } : { opacity: 0, scale: .8 }} transition={{ duration: .2 }}>{current.message}</motion.span>
    <span className="character-ear character-ear--left" /><span className="character-ear character-ear--right" />
    <span className="character-head"><span className="character-eye character-eye--left" /><span className="character-eye character-eye--right" /><span className="character-cheek character-cheek--left" /><span className="character-cheek character-cheek--right" /><span className="character-mouth" /></span>
    <span className="character-body"><span className="character-heart">♥</span></span>
    <span className="character-foot character-foot--left" /><span className="character-foot character-foot--right" />
  </motion.button>
}