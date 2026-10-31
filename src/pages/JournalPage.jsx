import { Link } from 'react-router-dom'
import Section, { Reveal, stagger } from '../components/Section.jsx'
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
 *            2026-10-31 - Scroll motion: the intro, each section heading and each entry's
 *            parts reveal in sequence. Restyle: real h2s, planned entries on a tone step instead
 *            of a dashed rule, full-ink summaries.
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
 * Input:  entry - a journal entry with status 'published'. Each part reveals in turn: the title,
 *         the date under it, the summary, then the tags.
 * Output: <li> linking to the entry's page.
 */
function PublishedRow({ entry }) {
  const { slug, title, date, summary, tags = [], compiled } = entry
  return (
    <li>
        <Link
          to={`/journal/${slug}`}
          className="group block rounded-sm py-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Reveal as="h3" className="display max-w-[30ch] text-balance text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
            {title}
          </Reveal>
          <Reveal delay={0.07} className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
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
          </Reveal>
          <Reveal as="p" delay={0.14} className="mt-3 max-w-[68ch] leading-relaxed text-foreground">
            {summary}
          </Reveal>

          {tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <Reveal as="span" key={t} delay={0.21 + stagger(i, 0.04, 0.3)} className="inline-flex">
                  <Badge variant="secondary">{t}</Badge>
                </Reveal>
              ))}
            </div>
          )}
        </Link>
    </li>
  )
}

/**
 * One planned entry — a date and a scope, deliberately not a link.
 *
 * Input:  entry - a journal entry with status 'planned'; index - its position, for the stagger.
 * Output: <li>.
 */
function PlannedRow({ entry, index }) {
  const { title, date, scope, source } = entry
  return (
    <Reveal as="li" delay={stagger(index)} className="flex flex-col gap-1.5 bg-secondary p-5 sm:flex-row sm:gap-6 sm:p-6">
      <time
        dateTime={date}
        className="min-w-[8.5rem] flex-none text-sm font-medium text-muted-foreground"
      >
        {formatDay(date)}
      </time>
      <div className="min-w-0">
        <p className="font-medium leading-snug text-foreground">{title}</p>
        {scope && <p className="mt-1 max-w-[62ch] leading-relaxed text-foreground">{scope}</p>}
        {source && (
          <a
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="mt-1.5 inline-block rounded-sm text-sm font-medium text-foreground underline decoration-primary underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {source.label}
          </a>
        )}
      </div>
    </Reveal>
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
        <Reveal as="p" delay={0.07} className="text-xl leading-relaxed text-foreground">
          {journalMeta.intro}
        </Reveal>
        <Reveal as="p" delay={0.14} className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {journalMeta.provenanceNote}
        </Reveal>
      </div>

      {publishedEntries.length > 0 && (
        <>
          <Reveal className="mt-16 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="display text-2xl font-bold leading-tight text-foreground sm:text-3xl">Published</h2>
            <span className="text-sm font-medium text-muted-foreground">
              {publishedEntries.length} entries
            </span>
          </Reveal>
          <ul>
            {publishedEntries.map((entry) => (
              <PublishedRow key={entry.slug} entry={entry} />
            ))}
          </ul>
        </>
      )}

      {plannedEntries.length > 0 && (
        <div className="mt-20">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="display text-2xl font-bold leading-tight text-foreground sm:text-3xl">Planned</h2>
            <span className="text-sm font-medium text-muted-foreground">
              {journalMeta.cadenceLabel}
            </span>
          </Reveal>
          <Reveal as="p" delay={0.07} className="mt-6 max-w-[68ch] leading-relaxed text-foreground">
            These are scheduled topics, each tied to a decision already recorded in the repository.
            They are not drafts being withheld, and nothing below has been written yet.
          </Reveal>
          <ul className="mt-9 space-y-3">
            {plannedEntries.map((entry, i) => (
              <PlannedRow key={entry.slug} entry={entry} index={i} />
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}
