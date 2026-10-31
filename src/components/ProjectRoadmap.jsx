/**
 * Why: A case study is written in the past tense, so a reader cannot tell whether the project is
 *      finished, abandoned or still moving. This section answers that in the one way worth
 *      trusting: lanes that separate what shipped from what is only designed, each item naming the
 *      decision record behind it.
 * What: The "Where it stands" section on a project page, rendered from `project.roadmap`.
 * Result: Four or five short lanes, every planned or blocked item visibly labelled as such, and an
 *         as-of date so a stale roadmap looks stale instead of looking current.
 * Changelog: 2026-10-11 - Created for the Rekhon case study.
 */

const LANE_STYLE = {
  shipped: { dot: 'bg-primary', label: 'text-foreground' },
  current: { dot: 'bg-brand-accent', label: 'text-foreground' },
  open: { dot: 'bg-brand-accent/60', label: 'text-foreground' },
  designed: { dot: 'border border-border bg-transparent', label: 'text-muted-foreground' },
  blocked: { dot: 'border border-primary/50 bg-transparent', label: 'text-muted-foreground' },
}

/**
 * One lane of the roadmap.
 *
 * Input:  lane - { id, label, items: { title, detail?, ref?, href? }[] }.
 * Output: <section> for the lane, or null when it holds no items.
 */
function Lane({ lane }) {
  const { id, label, items = [] } = lane
  if (!items.length) return null
  const style = LANE_STYLE[id] ?? LANE_STYLE.shipped
  const compact = id === 'shipped'

  return (
    <section aria-labelledby={`lane-${id}`} className="min-w-0">
      <h3
        id={`lane-${id}`}
        className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground"
      >
        <span aria-hidden className={`h-2 w-2 flex-none rounded-full ${style.dot}`} />
        {label}
        <span className="text-muted-foreground">{items.length}</span>
      </h3>

      <ul className={`mt-4 ${compact ? 'space-y-1.5' : 'space-y-4'}`}>
        {items.map((item) => (
          <li key={item.title} className="min-w-0 text-sm leading-relaxed">
            <p className={`font-medium ${style.label}`}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm underline decoration-border decoration-1 underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </p>
            {item.detail && (
              <p className="mt-1 max-w-[62ch] text-muted-foreground">{item.detail}</p>
            )}
            {item.ref && (
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {item.ref}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * Project roadmap.
 *
 * Input:  roadmap - { version?, asOf?, source?, lanes: Lane[] }.
 * Output: <section>, or null when there is no roadmap or it has no lanes.
 */
export default function ProjectRoadmap({ roadmap }) {
  if (!roadmap?.lanes?.length) return null
  const { version, asOf, source, lanes } = roadmap

  const shipped = lanes.filter((l) => l.id === 'shipped')
  const rest = lanes.filter((l) => l.id !== 'shipped')

  return (
    <section
      aria-labelledby="roadmap-title"
      className="bg-secondary p-6 sm:p-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <p className="kicker">Where it stands</p>
          <h2
            id="roadmap-title"
            className="display mt-3 text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            Roadmap
          </h2>
        </div>
        {(version || asOf) && (
          <dl className="text-sm font-medium text-muted-foreground">
            {version && (
              <div className="flex gap-2">
                <dt>Version</dt>
                <dd className="text-foreground">{version}</dd>
              </div>
            )}
            {asOf && (
              <div className="mt-1 flex gap-2">
                <dt>As of</dt>
                <dd className="text-foreground">
                  <time dateTime={asOf}>{asOf}</time>
                </dd>
              </div>
            )}
          </dl>
        )}
      </div>

      <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="space-y-10">{shipped.map((lane) => <Lane key={lane.id} lane={lane} />)}</div>
        <div className="space-y-10">{rest.map((lane) => <Lane key={lane.id} lane={lane} />)}</div>
      </div>

      {source && (
        <p className="mt-10 pt-5 text-xs leading-relaxed text-muted-foreground">
          Read from {source}. Items that are designed, open or blocked are labelled as such and are
          not claimed as shipped.
        </p>
      )}
    </section>
  )
}
