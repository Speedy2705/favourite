import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PlaceholderImage } from './PlaceholderImage'

type GalleryPhoto = { title: string; caption: string; image?: string; rotation: string }
type GalleryProps = { photos: readonly GalleryPhoto[] }

export function Gallery({ photos }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null)
  return <section id="gallery" className="section gallery-section"><div className="section-heading"><p className="eyebrow">05 / snapshots</p><h2>A few memories</h2></div><div className="gallery-grid">{photos.map((photo, index) => <motion.button key={photo.title} type="button" className="gallery-photo" style={{ rotate: photo.rotation }} whileHover={{ scale: 1.04, rotate: 0, zIndex: 2 }} whileTap={{ scale: .98 }} onClick={() => setSelected(index)}><PlaceholderImage src={photo.image} alt={photo.title} /><span>{photo.caption}</span></motion.button>)}</div><AnimatePresence>{selected !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.div className="lightbox-content" initial={{ scale: .75 }} animate={{ scale: 1 }} exit={{ scale: .75 }} onClick={(event) => event.stopPropagation()}><PlaceholderImage src={photos[selected].image} alt={photos[selected].title} /><button type="button" className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close photo">×</button><p>{photos[selected].caption}</p></motion.div></motion.div>}</AnimatePresence></section>
}

export default Gallery