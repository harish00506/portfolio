import { Link } from 'react-router-dom'
import { ExternalLink, FileText, Github } from 'lucide-react'
import ProseBlock from '../components/ProseBlock.jsx'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { rekhon, rekhonBlocks, rekhonContents } from '../data/rekhon.js'
import { publishedEntriesForProject } from '../data/journal.js'

/**
 * Why: The case study at /works/rekhon is about building the app, and its headings are STAR labels
 *      that carry no search terms. Someone searching for what the app *is* — an offline,
 *      open-source personal finance app for India — had nowhere to land. This page is that
 *      surface: one descriptive H1, keyword-bearing H2s, a facts table and an FAQ.
 * What: /rekhon — the project's own page.
 * Result: A page that can be indexed on its own terms and links onward to the case study, the
 *         journal and the source.
 * Changelog: 2026-10-11 - Created.
 */
export default function RekhonPage() {
  const entries = publishedEntriesForProject('rekhon')

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="container-x">
        <header>
          <p className="kicker">{rekhon.kicker}</p>
          <h1 className="display mt-5 max-w-[24ch] text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.98] text-foreground">
            {rekhon.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {rekhon.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href={rekhon.repo} target="_blank" rel="noreferrer">
                <Github />
                Source on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to={rekhon.caseStudy}>
                How it was built
                <ExternalLink />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/rekhon/docs">
                <FileText />
                The documents
              </Link>
            </Button>
          </div>
        </header>

        {/* Facts table: scannable for a reader, and the source of the structured data. */}
        <section aria-labelledby="facts-title" className="mt-14">
          <h2 id="facts-title" className="kicker">
            At a glance
          </h2>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {rekhon.facts.map((f) => (
              <div key={f.label} className="bg-card p-5">
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium leading-snug text-foreground">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-14 space-y-6">
          {rekhon.intro.map((p) => (
            <p key={p.slice(0, 40)} className="max-w-[68ch] text-lg leading-relaxed text-foreground/85">
              {p}
            </p>
          ))}
        </div>

        {/* On-page contents. A long page needs jump links, and they sometimes surface as sitelinks. */}
        {rekhonContents.length > 0 && (
          <nav aria-label="On this page" className="mt-14 rounded-lg border border-border bg-secondary/50 p-6">
            <p className="kicker">On this page</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {rekhonContents.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="rounded-sm text-sm leading-relaxed text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {c.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div>
          {rekhonBlocks.map((block, i) => (
            <ProseBlock key={i} block={block} />
          ))}
        </div>

        {/* The documents are the project's least visible asset and the thing a reviewer asks for
            first, so they get a callout rather than only a header button. */}
        <section
          aria-labelledby="docs-title"
          className="mt-20 rounded-lg border border-border bg-secondary/50 p-6 sm:p-8"
        >
          <h2
            id="docs-title"
            className="display text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
          >
            Read the documents, explained simply
          </h2>
          <p className="mt-4 max-w-[66ch] leading-relaxed text-muted-foreground">
            Seven documents come with this app: the as-built blueprint, a report listing everything
            still wrong with it, a picture of every screen, and the map of how a person moves
            through it. The page explains the app itself first, in plain English, and every
            document is free to download. Three proposals for redesigning it live separately.
          </p>
          <div className="mt-7">
            <Button asChild>
              <Link to="/rekhon/docs">
                <FileText />
                Read it, and take the papers
              </Link>
            </Button>
          </div>
        </section>

        {/* FAQ: visible answers, and the FAQPage structured data is generated from the same data. */}
        <section aria-labelledby="faq-title" className="mt-20">
          <h2
            id="faq-title"
            className="display text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-8">
            {rekhon.faq.map((item) => (
              <div key={item.q} className="max-w-[72ch]">
                <dt className="text-lg font-semibold leading-snug text-foreground">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {entries.length > 0 && (
          <section aria-labelledby="writing-title" className="mt-20">
            <Separator className="mb-10" />
            <h2
              id="writing-title"
              className="display text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
            >
              Written up in depth
            </h2>
            <p className="mt-4 max-w-[66ch] leading-relaxed text-muted-foreground">
              Dated entries on the decisions behind the app, each linking to the record it came from.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    to={`/journal/${entry.slug}`}
                    className="group flex flex-col gap-1.5 py-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <time
                      dateTime={entry.date}
                      className="min-w-[7rem] flex-none font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {entry.date}
                    </time>
                    <span className="min-w-0">
                      <span className="block text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                        {entry.title}
                      </span>
                      <span className="mt-1 block max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                        {entry.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-6">
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                All journal entries
              </Link>
              <Link
                to={rekhon.caseStudy}
                className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                The full case study
              </Link>
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
