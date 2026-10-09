import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-scroll'
import { BackgroundLayer } from './components/BackgroundLayer'
import { Character } from './components/Character'
import { PlaceholderImage } from './components/PlaceholderImage'
import { Section } from './components/Section'
import { DaysCounter } from './components/DaysCounter'
import { Timeline } from './components/Timeline'
const Gallery = lazy(() => import('./components/Gallery').then((module) => ({ default: module.Gallery })))
const Letter = lazy(() => import('./components/Letter').then((module) => ({ default: module.Letter })))
import { useActiveSection } from './hooks/useActiveSection'
import { content } from './content'
import { CelebrationBurst } from './components/CelebrationBurst'
import { LoadingScreen } from './components/LoadingScreen'
import { ScrollProgress } from './components/ScrollProgress'
import { LoveNote, LoveThankYou } from './components/LoveNote'
import './App.css'

const thankYouPhotos = [
  ...content.timeline.map((entry) => ({ src: entry.image, alt: entry.title, caption: entry.title })),
  ...content.gallery.map((photo) => ({ src: photo.image, alt: photo.title, caption: photo.caption })),
]

const sections = [
  { id: 'beginning', label: 'Your surprise' },
  { id: 'days', label: 'Days of us' },
  { id: 'timeline', label: 'Our story' },
  { id: 'gallery', label: 'Our memories' },
  { id: 'letter', label: 'A letter' },
  { id: 'keepsake', label: 'Keepsake' },
]

function App() {
  const [thankYou, setThankYou] = useState(window.location.hash === '#thank-you')
  useEffect(() => {
    const syncPage = () => setThankYou(window.location.hash === '#thank-you')
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])
  const [showSurprise, setShowSurprise] = useState(false)
  const reducedMotion = useReducedMotion()
  const activeSection = useActiveSection(sections.map((section) => section.id))

  if (thankYou) return <div className="app"><BackgroundLayer /><LoveThankYou photos={thankYouPhotos} onBack={() => { window.location.hash = 'your-note' }} /></div>

  return (
    <div className="app">
      <LoadingScreen />
      <ScrollProgress />
      <BackgroundLayer />
      <Character activeSection={activeSection} onCelebrate={() => setShowSurprise(true)} />
      {showSurprise && <CelebrationBurst onComplete={() => setShowSurprise(false)} />}
      <header className="site-header">
        <Link className="wordmark" to="beginning" smooth duration={650}>
          <span className="wordmark__mark">f</span>
          Maritreye
        </Link>
        <nav className="section-nav" aria-label="Page sections">
          {sections.map((section) => (
            <Link key={section.id} to={section.id} smooth duration={650} className={activeSection === section.id ? 'is-active' : ''} aria-label={`Go to ${section.label}`} title={section.label}>
              <span className="nav-dot" /><span className="nav-label">{section.label}</span>
            </Link>
          ))}
        </nav>
        <a className="header-love-seal" href="#your-note" aria-label="Leave a little love note">
          <span className="header-love-seal-copy">sealed with<span>love, always</span></span>
          <span className="header-love-seal-heart" aria-hidden="true">♡<span>✦</span></span>
        </a>
      </header>

      <main>
        <Section id="beginning" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1>{content.hero.titlePrefix} <em>{content.hero.titleHighlight}</em> {content.hero.titleLine}<br /><span>{content.hero.titleEnding}</span></h1>
            <p className="hero-lede">{content.hero.subtitle}</p>
          </div>
          <motion.div className="hero-character" animate={reducedMotion ? undefined : { y: [0, -12, 0] }} transition={reducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>
            <PlaceholderImage src={content.hero.image.src} className="hero-image" alt={content.hero.image.alt} />
            <span className="character-spark character-spark--one">+</span><span className="character-spark character-spark--two">*</span>
          </motion.div>
          <span className="hero-stamp">across the miles<br /><strong>just for you</strong></span>
        </Section>

        <DaysCounter startDate={content.counter.startDate} eyebrow={content.counter.eyebrow} title={content.counter.title} titleHighlight={content.counter.titleHighlight} description={content.counter.description} />
        <Timeline entries={content.timeline} />
        <Suspense fallback={<div className="section-load-placeholder" aria-label="Loading section" />}>
          <Gallery photos={content.gallery} />
          <Letter content={content.letter} />
        </Suspense>

        <Section id="keepsake" title="Until I can hold you" kicker="02 / a keepsake" className="keepsake-section">
          <div className="keepsake-layout">
            <PlaceholderImage src={content.keepsake.image.src} className="keepsake-image" alt={content.keepsake.image.alt} />
            <div className="keepsake-quote"><span className="quote-mark">“</span><blockquote>{content.keepsake.quote}</blockquote><p>- {content.keepsake.credit}</p></div>
          </div>
        </Section>
        <LoveNote onSent={() => { window.location.hash = 'thank-you' }} />
      </main>

      <footer className="site-footer"><span>made for you, with love</span><span className="footer-heart">&lt;3</span><span>until our next hug</span></footer>
    </div>
  )
}

export default App
