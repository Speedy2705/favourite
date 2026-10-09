type PlaceholderImageProps = { src?: string; alt: string; className?: string }

export function PlaceholderImage({ src, alt, className = '' }: PlaceholderImageProps) {
  if (src) return <img className={`original-photo ${className}`} src={src} alt={alt} loading="lazy" decoding="async" />
  return <div className={`image-placeholder ${className}`} role="img" aria-label={alt}><span className="placeholder-sun" /><span className="placeholder-flower placeholder-flower--one">*</span><span className="placeholder-flower placeholder-flower--two">*</span><span className="placeholder-caption">your photo here</span></div>
}
