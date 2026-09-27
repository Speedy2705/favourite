import { useEffect, useRef, useState } from 'react'

type MusicToggleProps = { src: string; label: string }

export function MusicToggle({ src, label }: MusicToggleProps) {
  const audio = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => () => audio.current?.pause(), [])
  const toggle = async () => {
    if (!audio.current || !src) return
    if (isPlaying) { audio.current.pause(); setIsPlaying(false) } else { await audio.current.play(); setIsPlaying(true) }
  }
  return <><audio ref={audio} src={src || undefined} loop /><button type="button" className="music-toggle" onClick={toggle} disabled={!src} aria-label={src ? `${isPlaying ? 'Pause' : 'Play'} ${label}` : 'Add a music track in content.ts'} title={src ? label : 'Add a music track in content.ts'}><span className={isPlaying ? 'music-bars music-bars--playing' : 'music-bars'}><i /><i /><i /></span><span>{isPlaying ? 'on' : 'off'}</span></button></>
}