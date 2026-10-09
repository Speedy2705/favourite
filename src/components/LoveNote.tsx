import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PlaceholderImage } from './PlaceholderImage'

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
      <p className="eyebrow">One last thing, my love</p>
      <h2>Did I make <em>you smile?</em></h2>
      <p>I wish I could see your face after this little surprise. Tell me how it made you feel, what you miss about us, or anything you wish you could say in person. I’m right here, listening.</p>
      <button ref={triggerRef} className="love-button" type="button" onClick={open}>Send me a little love <span aria-hidden="true">♡</span></button>
      <dialog ref={dialogRef} className="love-dialog" aria-labelledby="love-dialog-title" aria-describedby="love-dialog-description" onCancel={(event) => { if (sendingRef.current) event.preventDefault() }} onClick={(event) => { if (event.target === event.currentTarget) close() }}>
        <div className="love-dialog-inner">
          <HeartSky />
          <button type="button" className="love-dialog-close" onClick={close} disabled={sending} aria-label="Close note">×</button>
          <span className="love-note-ornament" aria-hidden="true">✧ ♡ ♥ ♡ ✧</span>
          <p className="eyebrow">From your heart to mine</p>
          <h2 id="love-dialog-title">A little closer, in your words.</h2>
          <p id="love-dialog-description">Something you miss, a wish for our next hello, or just a little love — tell me.</p>
          <form onSubmit={submit} aria-busy={sending}>
            <label htmlFor="love-message">What would you tell me if I were beside you?</label>
            <textarea id="love-message" name="message" required maxLength={5000} rows={6} value={message} onChange={(event) => setMessage(event.target.value)} disabled={sending} placeholder="Your little surprise made me feel…" aria-describedby={error ? 'love-note-error' : undefined} />
            {error && <p id="love-note-error" className="love-note-error" role="alert">{error}</p>}
            <button className="love-button" type="submit" disabled={sending}>{sending ? 'Sending your little note…' : 'Send with love ♡'}</button>
            <p className="love-note-footnote" role="status">Just your words, sent straight to my inbox.</p>
          </form>
        </div>
      </dialog>
    </section>
  )
}

type ThankYouPhoto = { src: string; alt: string; caption: string }

export function LoveThankYou({ onBack, photos }: { onBack: () => void; photos: readonly ThankYouPhoto[] }) {
  const reducedMotion = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  const memories = photos.filter((photo) => photo.src)
  const columns = 8
  const rows = Math.max(4, Math.ceil((memories.length - columns * 2) / 2) + 2)
  const positions = [
    ...Array.from({ length: columns }, (_, i) => ({ gridColumn: i + 1, gridRow: 1 })),
    ...Array.from({ length: rows - 2 }, (_, i) => ({ gridColumn: columns, gridRow: i + 2 })),
    ...Array.from({ length: columns }, (_, i) => ({ gridColumn: columns - i, gridRow: rows })),
    ...Array.from({ length: rows - 2 }, (_, i) => ({ gridColumn: 1, gridRow: rows - i - 1 })),
  ]

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
        <p className="eyebrow">Your words made the miles feel smaller</p>
        <h1 ref={headingRef} tabIndex={-1}>Thank youuu sooo muchhhh,<br /><em>for just being with me.</em></h1>
        <p>Bas ab jaldi se milna hai tumse kaash kanpur aa pate.</p>
        <p>Toh phir thik hai kya hua nhi aa paye toh, tum humko bas yaad karo hum samne honge.</p>
        <p className="love-signature">Baki peeche toh dekho♡</p>
        <button className="love-button" type="button" onClick={onBack}>Back to your surprise</button>
      </motion.div>
      <section className="thank-you-scrapbook" aria-label="All our timeline and gallery memories">
        <div className="scrapbook-wall" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
          {memories.map((photo, index) => <figure className="scrapbook-photo" key={`${photo.src}-${index}`} style={positions[index]} title={photo.caption}>
            <PlaceholderImage src={photo.src} alt={photo.alt} />
          </figure>)}
        </div>
      </section>
    </main>
  )
}
