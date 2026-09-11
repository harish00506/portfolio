/**
 * Why: A recruiter scans a case study for a handful of facts (role, team, timeline, commits, stack)
 *      before reading the story. Design case studies put those facts in one block under the title.
 * What: The details block at the top of a project page.
 * Result: Dotted-leader rows for whichever verified facts the project has, plus its responsibilities.
 *         A fact that was never verified is simply absent from the data, so it never renders.
 * Changelog: 2026-09-12 - Created for the Switchboard case-study layout.
 */

// Rows appear in this order; each renders only when the project supplies that key.
const FACT_ROWS = [
  ['role', 'Role'],
  ['team', 'Team'],
  ['timeline', 'Timeline'],
  ['commits', 'Commits'],
]

/**
 * Project facts block.
 *
 * Input:  details - { role?, team?, timeline?, commits?: string, responsibilities?: string[] };
 *         stack   - string[] of technology names (the project's tags).
 * Output: <section>, or null when there is nothing to show.
 */
export default function ProjectDetails({ details = {}, stack = [] }) {
  const rows = FACT_ROWS.filter(([key]) => details[key]).map(([key, label]) => ({
    label,
    value: details[key],
  }))
  if (stack.length) rows.push({ label: 'Stack', value: stack.join(' · ') })
  const responsibilities = details.responsibilities ?? []

  if (!rows.length && !responsibilities.length) return null

  return (
    <section
      aria-label="Project details"
      className="grid gap-10 border-y border-border py-8 md:grid-cols-[1.25fr_1fr] md:gap-14"
    >
      <dl className="space-y-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-baseline gap-3">
            <dt className="flex min-w-[5.5rem] flex-1 items-baseline gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground after:h-px after:min-w-[1.5rem] after:flex-1 after:border-b after:border-dotted after:border-border after:content-['']">
              {label}
            </dt>
            <dd className="max-w-[65%] text-right text-sm font-medium leading-snug text-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {responsibilities.length > 0 && (
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Responsibilities
          </h2>
          <ul className="mt-4 space-y-2.5">
            {responsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
