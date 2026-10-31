import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import ProseBlock from '../components/ProseBlock.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import { Badge } from '@/components/ui/badge'
import { getEntryBySlug, publishedEntries } from '../data/journal.js'
import { getProjectBySlug } from '../data/portfolio.js'

/**
 * Why: A journal entry needs its own URL so it can be linked, shared and indexed on its own terms.
 *      It also needs to be impossible to reach a planned entry's page, because a planned entry has
 *      no body and an empty page would read as a broken one.
 * What: /journal/:slug — renders a published entry's blocks, its provenance link and its neighbours.
 * Result: One readable page per published entry; anything else falls through to the 404.
 * Changelog: 2026-10-11 - Created.
 */

/** Renders an ISO day as e.g. "25 July 2026". Input: iso - 'YYYY-MM-DD'. Output: string. */
function formatDay(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * Previous and next published entries in date order.
 *
 * Input:  slug - the current entry's slug.
 * Output: { prev, next } — either may be undefined at the ends of the list (no wraparound, because
 *         a two-entry journal would otherwise link an entry to itself).
 */
function neighbours(slug) {
  const i = publishedEntries.findIndex((e) => e.slug === slug)
  return { prev: publishedEntries[i - 1], next: publishedEntries[i + 1] }
}

export default function JournalPostPage() {
  const { slug } = useParams()
  const entry = getEntryBySlug(slug)

  // A planned entry has no body: it is listed on the index with its date, and has no page.
  if (!entry || entry.status !== 'published') return <NotFoundPage />

  const { title, date, summary, tags = [], body = [], source, compiled, project } = entry
  const { prev, next } = neighbours(slug)
  const parent = project ? getProjectBySlug(project) : undefined

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="container-x">
        <Link
          to="/journal"
          className="group inline-flex items-center gap-2 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft size={14} aria-hidden className="transition-transform group-hover:-translate-x-1" />
          Build journal
        </Link>

        <header className="mt-10">
          <h1 className="display max-w-[22ch] text-balance text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold uppercase leading-[0.98] text-foreground">
            {title}
          </h1>
          <p className="kicker mt-4">
            <time dateTime={date}>{formatDay(date)}</time>
            {parent && (
              <>
                <span aria-hidden className="text-muted-foreground">
                  /
                </span>
                <Link
                  to={parent.appPage ?? `/works/${parent.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {parent.name}
                </Link>
              </>
            )}
          </p>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">{summary}</p>

          {tags.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          )}

          {compiled && (
            <p className="mt-8 max-w-[68ch] bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
              Compiled from the repository’s decision records and changelog rather than written as a
              first-person account. The reasoning is the project’s; the summarising is editorial.
              {source && ' The record itself is linked at the end.'}
            </p>
          )}
        </header>


        <div className="mt-2">
          {body.map((block, i) => (
            <ProseBlock key={i} block={block} />
          ))}
        </div>

        {source && (
          <aside className="mt-16 bg-secondary p-6 sm:p-7">
            <p className="kicker">Source</p>
            <a
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="group mt-3 inline-flex max-w-full items-start gap-2 rounded-sm text-lg font-medium leading-snug text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="min-w-0">{source.label}</span>
              <ExternalLink size={16} aria-hidden className="mt-1.5 flex-none" />
            </a>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Read the decision at its source instead of taking this summary on trust.
            </p>
          </aside>
        )}

        {(prev || next) && (
          <nav aria-label="Other entries" className="mt-20 grid gap-px pt-10 sm:grid-cols-2">
            {prev ? (
              <Link
                to={`/journal/${prev.slug}`}
                className="group rounded-sm py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <ArrowLeft size={14} aria-hidden className="transition-transform group-hover:-translate-x-1" />
                  Earlier
                </span>
                <p className="display mt-2 max-w-[24ch] text-balance text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={`/journal/${next.slug}`}
                className="group rounded-sm py-2 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:justify-self-end"
              >
                <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  Later
                  <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </span>
                <p className="display mt-2 max-w-[24ch] text-balance text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        )}
      </div>
    </article>
  )
}
