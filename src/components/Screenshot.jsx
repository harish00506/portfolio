/**
 * Why: Case studies reserve image slots before the screenshots exist. A missing file must not show a
 *      broken image or a placeholder frame, and the slot should appear by itself once the file is added
 *      under /public/projects/<slug>/.
 * What: Figure for one project screenshot.
 * Result: The figure stays hidden until its image has actually loaded; a missing image renders nothing.
 * Changelog: 2026-09-12 - Hide until loaded, replacing the "Visual preview" placeholder frame.
 */
import { useEffect, useRef, useState } from 'react'

/**
 * Screenshot figure.
 *
 * Input:  shot - { src: string path under /public, caption?: string }.
 * Output: <figure>, hidden until the image loads.
 */
export default function Screenshot({ shot }) {
  const { src, caption } = shot
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // A prerendered image can finish loading before React hydrates, and then onLoad never fires.
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <figure
      hidden={!loaded}
      className="overflow-hidden rounded-lg border border-border bg-card shadow-card"
    >
      {/* No loading="lazy": a lazy image inside a hidden figure would never start loading. */}
      <img
        ref={imgRef}
        src={src}
        alt={caption || 'Project screenshot'}
        onLoad={() => setLoaded(true)}
        className="w-full object-cover"
      />
      {caption && (
        <figcaption className="border-t border-border px-4 py-2.5 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
