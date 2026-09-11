/**
 * Why: Engineering projects rarely have the full-width visuals a design case study relies on, but the
 *      way a request moves through a system is exactly what a technical reader wants to see. Each step
 *      names the real file that handles it, so the picture doubles as evidence.
 * What: The architecture flow on a project page.
 * Result: An ordered chain of steps (numbered, because the order is the point) with the data stores
 *         beneath. It is plain HTML rather than SVG, so it reads in order for screen readers, wraps to a
 *         vertical chain on phones, and takes every colour from the theme tokens.
 * Changelog: 2026-09-12 - Created for the Switchboard case-study layout.
 */
import { ArrowDown, ArrowRight } from 'lucide-react'

/**
 * Architecture flow figure.
 *
 * Input:  diagram - { title: string, steps: { label: string, detail?: string }[], stores?: string[] }.
 *         `detail` is normally the source path that implements the step.
 * Output: <figure>.
 */
export default function ArchitectureDiagram({ diagram }) {
  const { title, steps = [], stores = [] } = diagram

  return (
    <figure className="rounded-lg border border-border bg-card p-5 sm:p-8">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          How it works
        </span>
        <span className="display text-lg font-bold text-foreground sm:text-xl">{title}</span>
      </figcaption>

      <ol
        style={{ '--steps': steps.length }}
        className="mt-7 grid gap-8 lg:gap-6 lg:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]"
      >
        {steps.map(({ label, detail }, i) => (
          <li key={label} className="relative">
            <div className="h-full rounded-md border border-border bg-background p-3">
              <span className="font-mono text-[0.65rem] text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{label}</p>
              {detail && (
                <p className="mt-1 break-words font-mono text-[0.65rem] leading-snug text-muted-foreground">
                  {detail}
                </p>
              )}
            </div>
            {i < steps.length - 1 && (
              <>
                <ArrowDown
                  aria-hidden
                  size={16}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground lg:hidden"
                />
                <ArrowRight
                  aria-hidden
                  size={16}
                  className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-muted-foreground lg:block"
                />
              </>
            )}
          </li>
        ))}
      </ol>

      {stores.length > 0 && (
        <p className="mt-7 flex flex-wrap items-center gap-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
          <span className="mr-1 uppercase tracking-[0.14em]">Data</span>
          {stores.map((store) => (
            <span key={store} className="rounded border border-border px-2 py-0.5 text-foreground">
              {store}
            </span>
          ))}
        </p>
      )}
    </figure>
  )
}
