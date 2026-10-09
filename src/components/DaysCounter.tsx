import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type DaysCounterProps = { startDate: string; eyebrow: string; title: string; titleHighlight: string; description: string }

function elapsedSeconds(startDate: string) {
  // A date without a time starts at midnight in the visitor's local timezone.
  const start = new Date(/^\d{4}-\d{2}-\d{2}$/.test(startDate) ? `${startDate}T00:00:00` : startDate).getTime()
  return Number.isFinite(start) ? Math.max(0, Math.floor((Date.now() - start) / 1000)) : 0
}

export function DaysCounter({ startDate, eyebrow, title, titleHighlight, description }: DaysCounterProps) {
  const reducedMotion = useReducedMotion()
  const [elapsed, setElapsed] = useState(() => elapsedSeconds(startDate))
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const update = () => setElapsed(elapsedSeconds(startDate))
    const resume = () => {
      if (timerRef.current !== null) clearInterval(timerRef.current)
      timerRef.current = null
      update()
      if (!document.hidden) timerRef.current = setInterval(update, 1000)
    }
    resume()
    document.addEventListener('visibilitychange', resume)
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current)
      document.removeEventListener('visibilitychange', resume)
    }
  }, [startDate])

  const days = Math.floor(elapsed / 86400)
  const weeks = Math.floor(days / 7)
  const weekDays = days % 7
  const hours = Math.floor(elapsed / 3600) % 24
  const minutes = Math.floor(elapsed / 60) % 60
  const seconds = elapsed % 60
  const clock = [{ value: hours, label: 'hours' }, { value: minutes, label: 'minutes' }, { value: seconds, label: 'seconds' }]

  return (
    <motion.section id="days" className="section counter-section" initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }}>
      <div className="counter-copy"><p className="eyebrow">{eyebrow}</p><h2>{title}<br /><em>{titleHighlight}</em></h2><p>{description}</p></div>
      <div className="time-keepsake">
        <div className="time-keepsake-heading"><span aria-hidden="true">✧</span> our love, still growing <span aria-hidden="true">✧</span></div>
        <div className="counter-badge">
          <motion.span className="counter-heart" aria-hidden="true" animate={reducedMotion ? undefined : { scale: [1, 1.14, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>♥</motion.span>
          <strong>{days.toLocaleString()}</strong><span>days of us</span>
        </div>
        <div className="week-ribbon"><span aria-hidden="true">♡</span><p><strong>{weeks.toLocaleString()}</strong> {weeks === 1 ? 'week' : 'weeks'} <span>&amp;</span> <strong>{weekDays}</strong> {weekDays === 1 ? 'day' : 'days'} of us</p></div>
        <div className="keepsake-clock" role="group" aria-label="Time since the last complete day">
          {clock.map(({ value, label }) => <div className={`clock-unit clock-unit--${label}`} key={label}><span className="clock-number">{String(value).padStart(2, '0')}</span><span className="clock-label">{label}</span></div>)}
        </div>
        <p className="time-keepsake-footnote"><span className="clock-live-dot" aria-hidden="true" />loving you through every second.</p>
      </div>
    </motion.section>
  )
}
