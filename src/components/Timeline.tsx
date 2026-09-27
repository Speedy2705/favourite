import { motion } from 'framer-motion'
import { PlaceholderImage } from './PlaceholderImage'

type TimelineEntry = { date: string; title: string; description: string; image?: string }
type TimelineProps = { entries: readonly TimelineEntry[] }

export function Timeline({ entries }: TimelineProps) {
  return <section id="timeline" className="section timeline-section"><div className="section-heading"><p className="eyebrow">04 / our story</p><h2>Pieces of us</h2></div><div className="timeline-list"><motion.div className="timeline-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} />{entries.map((entry, index) => <motion.article key={entry.date} className="timeline-item" initial={{ opacity: 0, x: index % 2 ? 45 : -45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: .65, delay: index * .12 }}><div className="timeline-card"><p className="card-number">{entry.date}</p><h3>{entry.title}</h3><p>{entry.description}</p></div><PlaceholderImage src={entry.image} className="timeline-image" alt={`Placeholder for ${entry.title}`} /></motion.article>)}</div></section>
}