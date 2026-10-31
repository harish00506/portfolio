import { Link } from 'react-router-dom'
import { ExternalLink, FileText, Github } from 'lucide-react'
import ProseBlock from '../components/ProseBlock.jsx'
import { Reveal, stagger, proseStagger } from '../components/Section.jsx'
import { Button } from '@/components/ui/button'
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
 *            2026-10-31 - Scroll motion and the taste-skill restyle: the header rises in with CSS,
 *            every block below reveals as it scrolls in, staggered within its group.
 */
export default function RekhonPage() {
  const entries = publishedEntriesForProject('rekhon')

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="container-x">
        <header>
          <h1 className="display rise max-w-[24ch] text-balance text-[clamp(1.875rem,6vw,4.5rem)] font-extrabold leading-[0.98] text-foreground">
            {rekhon.h1}
          </h1>
          <p style={{ animationDelay: '0.06s' }} className="kicker rise mt-4">{rekhon.kicker}</p>
          <p style={{ animationDelay: '0.12s' }} className="rise mt-6 max-w-3xl text-xl leading-relaxed text-foreground">
            {rekhon.tagline}
          </p>

          <div style={{ animationDelay: '0.18s' }} className="rise mt-8 flex flex-wrap items-center gap-3">
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
          <Reveal as="h2" id="facts-title" className="display text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            At a glance
          </Reveal>
          <dl className="mt-5 grid gap-2 sm:grid-cols-2">
            {rekhon.facts.map((f, i) => (
              <Reveal key={f.label} delay={stagger(i)} className="bg-secondary p-5">
                <dt className="text-sm text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="mt-1 font-semibold leading-snug text-foreground">
                  {f.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>

        <div className="mt-14 space-y-6">
          {rekhon.intro.map((p, i) => (
            <Reveal as="p" key={p.slice(0, 40)} delay={stagger(i)} className="max-w-[68ch] text-lg leading-relaxed text-foreground">
              {p}
            </Reveal>
          ))}
        </div>

        {/* On-page contents. A long page needs jump links, and they sometimes surface as sitelinks. */}
        {rekhonContents.length > 0 && (
          <Reveal as="nav" aria-label="On this page" className="mt-14 bg-secondary p-6">
            <h2 className="display text-xl font-bold text-foreground">On this page</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {rekhonContents.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="rounded-sm leading-relaxed text-foreground underline decoration-primary/60 underline-offset-[4px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {c.text}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <div>
          {rekhonBlocks.map((block, i) => (
            <Reveal key={i} delay={proseStagger(rekhonBlocks, i)}>
              <ProseBlock block={block} />
            </Reveal>
          ))}
        </div>

        {/* The documents are the project's least visible asset and the thing a reviewer asks for
            first, so they get a callout rather than only a header button. */}
        <Reveal as="section" aria-labelledby="docs-title" className="mt-20 bg-secondary p-6 sm:p-8">
          <h2
            id="docs-title"
            className="display text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
          >
            Read the documents, explained simply
          </h2>
          <p className="mt-4 max-w-[66ch] leading-relaxed text-foreground">
            Seven documents come with this app: the as-built blueprint, a report listing everything
            still wrong with it, a picture of every screen, and the map of how a person moves
            through it. The page explains the app itself first, in plain English, and every
            document is free to download. Three proposals for redesigning it live separately.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/rekhon/docs">
                <FileText />
                Read it, and take the papers
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/rekhon/design">Three redesigns of it</Link>
            </Button>
          </div>
        </Reveal>

        {/* FAQ: visible answers, and the FAQPage structured data is generated from the same data. */}
        <section aria-labelledby="faq-title" className="mt-20">
          <h2
            id="faq-title"
            className="display text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-8">
            {rekhon.faq.map((item, i) => (
              <Reveal key={item.q} delay={stagger(i)} className="max-w-[72ch]">
                <dt className="text-lg font-semibold leading-snug text-foreground">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-foreground">{item.a}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {entries.length > 0 && (
          <section aria-labelledby="writing-title" className="mt-20">
            <h2
              id="writing-title"
              className="display text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
            >
              Written up in depth
            </h2>
            <p className="mt-4 max-w-[66ch] leading-relaxed text-muted-foreground">
              Dated entries on the decisions behind the app, each linking to the record it came from.
            </p>
            <ul className="mt-8">
              {entries.map((entry, i) => (
                <Reveal as="li" key={entry.slug} delay={stagger(i)}>
                  <Link
                    to={`/journal/${entry.slug}`}
                    className="group flex flex-col gap-1.5 py-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <time
                      dateTime={entry.date}
                      className="min-w-[7rem] flex-none text-sm font-medium text-muted-foreground"
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
                </Reveal>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-6">
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 rounded-sm text-base font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                All journal entries
              </Link>
              <Link
                to={rekhon.caseStudy}
                className="inline-flex items-center gap-2 rounded-sm text-base font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
