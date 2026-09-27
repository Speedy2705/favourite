import { useState } from 'react'
import { motion } from 'framer-motion'

type LetterContent = { eyebrow: string; title: string; greeting: string; paragraphs: readonly string[]; signoff: string; signature: string }

export function Letter({ content }: { content: LetterContent }) {
  const [isOpen, setIsOpen] = useState(false)
  return <section id="letter" className={`section letter-section ${isOpen ? 'letter-section--open' : ''}`}><div className="section-heading"><p className="eyebrow">{content.eyebrow}</p><h2>{content.title}</h2></div><button type="button" className="envelope" onClick={() => setIsOpen((previous) => !previous)} aria-expanded={isOpen} aria-label={isOpen ? 'Close letter' : 'Open letter'}><motion.span className="envelope-flap" animate={{ rotateX: isOpen ? 180 : 0 }} transition={{ duration: .7 }} /><motion.div className="letter-paper" aria-hidden={!isOpen} initial={{ y: 20, opacity: 0 }} animate={{ y: isOpen ? -72 : 20, opacity: isOpen ? 1 : 0 }} transition={{ delay: isOpen ? .35 : 0, duration: .6 }}><p className="letter-greeting">{content.greeting}</p>{content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className="letter-signoff">{content.signoff}<br />{content.signature}</p></motion.div><span className="envelope-seal">M</span><span className="envelope-hint">{isOpen ? 'tap to close' : 'tap to open'}</span></button></section>
}

export default Letter