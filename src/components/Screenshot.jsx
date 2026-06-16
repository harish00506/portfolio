import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

/**
 * Screenshot frame that degrades gracefully: if the image at `src` is missing
 * (placeholder not yet added to /public/projects/<slug>/), it shows an intentional,
 * branded preview frame rather than exposing the raw file path to visitors.
 * `shot` = { src, caption }
 */
export default function Screenshot({ shot }) {
  const { src, caption } = shot
  const [errored, setErrored] = useState(false)

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      {errored ? (
        <div className="relative flex aspect-video flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-secondary via-card to-secondary px-4 text-center">
          {/* Subtle editorial grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:22px_22px]"
          />
          <span className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-primary shadow-card">
            <ImageIcon size={18} />
          </span>
          <span className="relative font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
            Visual preview
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={caption || 'Project screenshot'}
          loading="lazy"
          onError={() => setErrored(true)}
          className="aspect-video w-full object-cover"
        />
      )}
      {caption && (
        <figcaption className="border-t border-border px-4 py-2.5 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
