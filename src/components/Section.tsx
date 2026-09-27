import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type SectionProps = { id: string; title?: string; kicker?: string; className?: string; children: ReactNode }

export function Section({ id, title, kicker, className = '', children }: SectionProps) {
  return <motion.section id={id} className={`section ${className}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
    {title && <div className="section-heading"><p className="eyebrow">{kicker}</p><h2>{title}</h2></div>}
    {children}
  </motion.section>
}