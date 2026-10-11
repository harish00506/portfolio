import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import CodeSample from '../components/CodeSample.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
 * Renders one body block.
 *
 * Why:  the entries are data, not markup, so the renderer owns the typography and an entry cannot
 *       inject HTML. Unknown block types render nothing rather than throwing, so a new type added
 *       to the data cannot take the page down before its case exists here.
 * Input:  block - { type: 'p' | 'h2' | 'quote' | 'list' | 'code', ... }.
 * Output: an element, or null for an unrecognised type.
 */
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="display mt-14 max-w-[26ch] text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {block.text}
        </h2>
      )
    case 'p':
      return (
        <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-foreground/85">{block.text}</p>
      )
    case 'quote':
      return (
        <figure className="mt-8 max-w-[62ch] border-l-2 border-primary pl-6">
          <blockquote className="text-lg italic leading-relaxed text-foreground">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {block.cite}
            </figcaption>
          )}
        </figure>
      )
    case 'list':
      return (
        <ul className="mt-7 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex max-w-[66ch] gap-4 text-lg leading-relaxed text-foreground/85"
            >
              <span aria-hidden className="mt-3 h-1.5 w-1.5 flex-none bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <div className="mt-8">
          <CodeSample sample={block} />
        </div>
      )
    default:
      return null
  }
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
          className="group inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft size={14} aria-hidden className="transition-transform group-hover:-translate-x-1" />
          Build journal
        </Link>

        <header className="mt-10">
          <p className="kicker">
            <time dateTime={date}>{formatDay(date)}</time>
            {parent && (
              <>
                <span aria-hidden className="text-muted-foreground/40">
                  /
                </span>
                <Link to={`/works/${parent.slug}`} className="transition-colors hover:text-primary">
                  {parent.name}
                </Link>
              </>
            )}
          </p>

          <h1 className="display mt-5 max-w-[22ch] text-balance text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold uppercase leading-[0.98] text-foreground">
            {title}
          </h1>
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
            <p className="mt-8 max-w-[68ch] rounded-lg border border-dashed border-border bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
              Compiled from the repository’s decision records and changelog rather than written as a
              first-person account. The reasoning is the project’s; the summarising is editorial.
              {source && ' The record itself is linked at the end.'}
            </p>
          )}
        </header>

        <Separator className="mt-12" />

        <div className="mt-2">
          {body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {source && (
          <aside className="mt-16 rounded-lg border border-border bg-card p-6 shadow-card sm:p-7">
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
          <nav aria-label="Other entries" className="mt-20 grid gap-px border-t border-border pt-10 sm:grid-cols-2">
            {prev ? (
              <Link
                to={`/journal/${prev.slug}`}
                className="group rounded-sm py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
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
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
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
