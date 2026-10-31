import { Link } from 'react-router-dom'
import Section, { Reveal } from '../components/Section.jsx'
import { Badge } from '@/components/ui/badge'
import { journalMeta, publishedEntries, plannedEntries } from '../data/journal.js'

/**
 * Why: The case studies say what each project became; they cannot show the order the decisions
 *      arrived in. This index is the other half, and it is also where the publishing cadence is
 *      stated rather than left for a reader to infer from two dates.
 * What: /journal — published entries newest first, then the planned schedule.
 * Result: A reader sees what has been written, what is coming and when, and that the two are
 *         different kinds of thing.
 * Changelog: 2026-10-11 - Created.
 */

/** Renders an ISO day as e.g. "25 Jul 2026". Input: iso - 'YYYY-MM-DD'. Output: string. */
function formatDay(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * One published entry in the list.
 *
 * Input:  entry - a journal entry with status 'published'; index - position, for the mono counter.
 * Output: <li> linking to the entry's page.
 */
function PublishedRow({ entry, index }) {
  const { slug, title, date, summary, tags = [], compiled } = entry
  return (
    <li>
      <Reveal delay={index * 0.04}>
        <Link
          to={`/journal/${slug}`}
          className="group block rounded-sm py-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <time
              dateTime={date}
              className="text-sm font-medium text-muted-foreground"
            >
              {formatDay(date)}
            </time>
            {compiled && (
              <span className="text-sm font-medium text-brand-accent">
                Compiled
              </span>
            )}
          </div>

          <h3 className="display mt-3 max-w-[30ch] text-balance text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-[68ch] leading-relaxed text-muted-foreground">{summary}</p>

          {tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </Link>
      </Reveal>
    </li>
  )
}

/**
 * One planned entry — a date and a scope, deliberately not a link.
 *
 * Input:  entry - a journal entry with status 'planned'.
 * Output: <li>.
 */
function PlannedRow({ entry }) {
  const { title, date, scope, source } = entry
  return (
    <li className="flex flex-col gap-1.5 border-l border-dashed border-border pl-5 sm:flex-row sm:gap-6 sm:pl-6">
      <time
        dateTime={date}
        className="min-w-[8.5rem] flex-none text-sm font-medium text-muted-foreground"
      >
        {formatDay(date)}
      </time>
      <div className="min-w-0">
        <p className="font-medium leading-snug text-foreground">{title}</p>
        {scope && <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">{scope}</p>}
        {source && (
          <a
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="mt-1.5 inline-block rounded-sm text-sm font-medium text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {source.label}
          </a>
        )}
      </div>
    </li>
  )
}

export default function JournalPage() {
  return (
    <Section
      id="journal"
     
      title={journalMeta.title}
      className="pt-28 sm:pt-32"
      headingLevel={1}
    >
      <div className="max-w-[72ch]">
        <p className="text-xl leading-relaxed text-muted-foreground">{journalMeta.intro}</p>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground/90">
          {journalMeta.provenanceNote}
        </p>
      </div>

      {publishedEntries.length > 0 && (
        <>
          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="kicker">Published</h2>
            <span className="text-sm font-medium text-muted-foreground">
              {publishedEntries.length} entries
            </span>
          </div>
          <ul>
            {publishedEntries.map((entry, i) => (
              <PublishedRow key={entry.slug} entry={entry} index={i} />
            ))}
          </ul>
        </>
      )}

      {plannedEntries.length > 0 && (
        <div className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="kicker">Planned</h2>
            <span className="text-sm font-medium text-muted-foreground">
              {journalMeta.cadenceLabel}
            </span>
          </div>
          <p className="mt-6 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
            These are scheduled topics, each tied to a decision already recorded in the repository.
            They are not drafts being withheld, and nothing below has been written yet.
          </p>
          <ul className="mt-9 space-y-9">
            {plannedEntries.map((entry) => (
              <PlannedRow key={entry.slug} entry={entry} />
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}
