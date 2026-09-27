import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function HeartSky({ backdrop = false }: { backdrop?: boolean }) {
  return <div className={`heart-sky${backdrop ? ' heart-sky--backdrop' : ''}`} aria-hidden="true">
    {Array.from({ length: backdrop ? 36 : 24 }, (_, index) => <span key={index} style={{
      left: `${3 + (index * 37) % 94}%`,
      top: `${2 + (index * 23) % 94}%`,
      fontSize: `${14 + (index * 7) % 22}px`,
      animationDelay: `${-(index * .7)}s`,
      animationDuration: `${4 + index % 5}s`,
    }}>{['♡', '✦', '♥', '✧', '★'][index % 5]}</span>)}
  </div>
}

export function LoveNote({ onSent }: { onSent: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sendingRef = useRef(false)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    const restoreScroll = () => { document.body.style.overflow = '' }
    dialog?.addEventListener('close', restoreScroll)
    return () => {
      dialog?.removeEventListener('close', restoreScroll)
      restoreScroll()
    }
  }, [])

  function open() {
    dialogRef.current?.showModal()
    document.body.style.overflow = 'hidden'
  }

  function close() {
    if (sendingRef.current) return
    dialogRef.current?.close()
    triggerRef.current?.focus()
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sendingRef.current) return
    if (!message.trim()) {
      setError('Leave a little piece of your heart before sending.')
      return
    }
    sendingRef.current = true
    setSending(true)
    setError('')
    try {
      const response = await fetch('https://formsubmit.co/ajax/kesarwaniaryan4278@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          _subject: 'A little love note from Maritreye ♥',
          _template: 'box',
        }),
        signal: AbortSignal.timeout(20000),
      })
      const result = await response.json()
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error('Message was not accepted')
      }
      dialogRef.current?.close()
      setMessage('')
      onSent()
    } catch {
      setError('Your note could not be confirmed as sent. It is still here — please try again in a moment.')
    } finally {
      sendingRef.current = false
      setSending(false)
    }
  }

  return (
    <section id="your-note" className="section love-note-section">
      <span className="love-note-ornament" aria-hidden="true">✦ ♡ ✦</span>
      <p className="eyebrow">One last little thing</p>
      <h2>Now, a little of <em>your heart.</em></h2>
      <p>Did this little corner of us make you smile? Tell me what you loved, what you felt, or anything your heart wants to say. I’d love to keep your words, too.</p>
      <button ref={triggerRef} className="love-button" type="button" onClick={open}>Leave me a little note <span aria-hidden="true">♡</span></button>
      <dialog ref={dialogRef} className="love-dialog" aria-labelledby="love-dialog-title" aria-describedby="love-dialog-description" onCancel={(event) => { if (sendingRef.current) event.preventDefault() }} onClick={(event) => { if (event.target === event.currentTarget) close() }}>
        <div className="love-dialog-inner">
          <HeartSky />
          <button type="button" className="love-dialog-close" onClick={close} disabled={sending} aria-label="Close note">×</button>
          <span className="love-note-ornament" aria-hidden="true">✧ ♡ ♥ ♡ ✧</span>
          <p className="eyebrow">From your heart to mine</p>
          <h2 id="love-dialog-title">Your words belong here.</h2>
          <p id="love-dialog-description">A thought, a feeling, a tiny wish — I’m listening to every word.</p>
          <form onSubmit={submit} aria-busy={sending}>
            <label htmlFor="love-message">What did your heart think?</label>
            <textarea id="love-message" name="message" required maxLength={5000} rows={6} value={message} onChange={(event) => setMessage(event.target.value)} disabled={sending} placeholder="Being here made me feel…" aria-describedby={error ? 'love-note-error' : undefined} />
            {error && <p id="love-note-error" className="love-note-error" role="alert">{error}</p>}
            <button className="love-button" type="submit" disabled={sending}>{sending ? 'Sending your little note…' : 'Send with love ♡'}</button>
            <p className="love-note-footnote" role="status">Just your words, sent straight to my inbox.</p>
          </form>
        </div>
      </dialog>
    </section>
  )
}

export function LoveThankYou({ onBack }: { onBack: () => void }) {
  const reducedMotion = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <main className="love-thank-you">
      <HeartSky backdrop />
      <div className="love-confetti" aria-hidden="true">
        {Array.from({ length: reducedMotion ? 0 : 48 }, (_, index) => {
          const fromLeft = index % 2 === 0
          return <motion.span key={index} style={{ left: fromLeft ? '0%' : '100%', color: index % 3 === 0 ? '#e5c77e' : '#f3bfc5' }} initial={{ x: 0, y: 0, opacity: 0, scale: .3 }} animate={{ x: `${(fromLeft ? 1 : -1) * (12 + (index * 17) % 75)}vw`, y: [0, -(180 + (index * 31) % 480), 180], opacity: [0, 1, 1, 0], scale: [0.3, 1.2, .8], rotate: (index % 2 ? 1 : -1) * (180 + index * 15) }} transition={{ duration: 3.5 + (index % 4) * .25, delay: (index % 8) * .08, ease: 'easeOut' }}>{index % 3 === 0 ? '✦' : index % 3 === 1 ? '♥' : '★'}</motion.span>
        })}
      </div>
      <motion.div className="love-thank-you-card" initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
        <span className="love-note-ornament" aria-hidden="true">✦ ♡ ✦</span>
        <p className="eyebrow">A little note, a whole lot of love</p>
        <h1 ref={headingRef} tabIndex={-1}>Your words have found<br /><em>their way to me.</em></h1>
        <p>Whatever you’ve written, know that every word is precious to me. Thank you for sharing a little piece of your heart.</p>
        <p>I love you for everything you’ve given me — your kindness, your laughter, and all the little ways you make my world feel like home.</p>
        <p className="love-signature">For all that you are, and all that we are.<br />Always, with love. ♡</p>
        <button className="love-button" type="button" onClick={onBack}>Back to our little world</button>
      </motion.div>
    </main>
  )
}
