import { Link } from 'react-router-dom'
import { ArrowLeft, Github, Palette } from 'lucide-react'
import DocCard from '../components/DocCard.jsx'
import ArticleFigure, { WorkedSum, DataTable, FlowDiagram } from '../components/ArticleFigure.jsx'
import { Button } from '@/components/ui/button'
import { Reveal, stagger } from '../components/Section.jsx'
import { rekhon, rekhonCounted } from '../data/rekhon.js'
import { docsMeta, docGroups, docContents, docTotals, docsSource } from '../data/rekhonDocs.js'
import { articleSections, articleContents } from '../data/rekhonArticle.js'

/**
 * Why: The project's paperwork — a 234-page as-built blueprint, a report listing its own faults,
 *      a picture of every screen the build refuses to let go stale — was its least visible asset.
 *      It lived in a repository, written for engineers. /rekhon says what the app is and
 *      /works/rekhon says how it was built; neither hands over the documents or explains one to
 *      somebody who does not write software.
 * What: /rekhon/docs — a short article, then the as-built documents, each downloadable.
 * Result: A page that gives the documents away and explains every one without jargon.
 * Changelog:
 *   2026-10-24 - Created.
 *   2026-10-24 - The version and the two test/ADR counts in the closing prose now read from
 *                `docsSource` and `rekhonCounted`. They were four literals in this file, which is
 *                the wrong layer for a number (§1.1) and left llms.txt quoting them from memory.
 *   2026-10-31 - Scroll motion: header rises in with CSS; headings, paragraphs, tables, cards and
 *                callouts reveal as they scroll in. The sum and the flow animate themselves.
 */

/** Renders an ISO day as e.g. "23 October 2026". Input: iso - 'YYYY-MM-DD'. Output: string. */
function formatDay(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function RekhonDocsPage() {
  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="container-x">
        <header>
          <h1 className="display rise max-w-[22ch] text-balance text-[clamp(1.875rem,6vw,4.5rem)] font-extrabold leading-[0.98] text-foreground">
            {docsMeta.h1}
          </h1>
          <p style={{ animationDelay: '0.06s' }} className="kicker rise mt-4">{docsMeta.kicker}</p>
          <p style={{ animationDelay: '0.12s' }} className="rise mt-6 max-w-3xl text-xl leading-relaxed text-foreground">
            {docsMeta.tagline}
          </p>

          <div style={{ animationDelay: '0.18s' }} className="rise mt-8 flex flex-wrap items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/rekhon">
                <ArrowLeft />
                What the app is
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={rekhon.repo} target="_blank" rel="noreferrer">
                <Github />
                Source on GitHub
              </a>
            </Button>
          </div>
        </header>

        <div className="mt-14 space-y-6">
          {docsMeta.intro.map((p, i) => (
            <Reveal as="p" key={p.slice(0, 40)} delay={stagger(i)} className="max-w-[68ch] text-lg leading-relaxed text-foreground">
              {p}
            </Reveal>
          ))}
        </div>

        {/* The article. It comes before the downloads because a shelf of PDFs answers a question
            nobody has yet asked: it is useful once you want a document, useless for deciding
            whether you do. Every picture is an artefact the app's own build produces. */}
        <Reveal as="nav" aria-label="What this page explains" className="mt-14 bg-secondary p-6">
          <h2 className="display text-xl font-bold text-foreground">What this page explains</h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {articleContents.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="rounded-sm leading-relaxed text-foreground underline decoration-primary/60 underline-offset-[4px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {c.heading}
                </a>
              </li>
            ))}
          </ol>
        </Reveal>

        {articleSections.map((section) => (
          <section key={section.id} aria-labelledby={section.id} className="mt-20">
            <Reveal
              as="h2"
              id={section.id}
              className="display max-w-[26ch] text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
            >
              {section.heading}
            </Reveal>
            {section.body.map((para, i) => (
              <Reveal
                as="p"
                key={para.slice(0, 40)}
                delay={stagger(i + 1)}
                className="mt-5 max-w-[68ch] text-lg leading-relaxed text-foreground"
              >
                {para}
              </Reveal>
            ))}
            <WorkedSum sum={section.sum} />
            <DataTable table={section.table} />
            <FlowDiagram flow={section.flow} />
            <ArticleFigure figure={section.figure} />
          </section>
        ))}


        <section aria-labelledby="library-title" className="mt-16">
          <Reveal as="h2"
            id="library-title"
            className="display text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            Now the papers themselves
          </Reveal>
          <Reveal as="p" delay={stagger(1)} className="mt-4 max-w-[68ch] text-lg leading-relaxed text-foreground">
            That was the short version. Underneath it sit {docTotals.documents} documents and{' '}
            {docTotals.pages} pages, free to download, none of which you need in order to have
            understood the article above. Each one gets the same four lines so you can tell in ten
            seconds whether you want it.
          </Reveal>
        </section>

        {/* The four labels, explained once. Every card below repeats them in this order, so a
            reader who reads one knows the shape of the rest. */}
        <section aria-labelledby="form-title" className="mt-14">
          <Reveal as="h2" id="form-title" className="display text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            Every document gets the same four lines
          </Reveal>
          <ol className="mt-5 grid gap-2 sm:grid-cols-2">
            {docsMeta.form.map((field, i) => (
              <Reveal as="li" key={field.label} delay={stagger(i)} className="bg-secondary p-5">
                <p className="font-semibold text-foreground">{field.label}</p>
                <p className="mt-1 leading-snug text-muted-foreground">{field.hint}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* On-page contents. Eleven cards is a long scroll, and these sometimes surface as
            sitelinks in search results. */}
        <Reveal as="nav" aria-label="On this page" className="mt-14 bg-secondary p-6">
          <h2 className="display text-xl font-bold text-foreground">On this page</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {docContents.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="rounded-sm leading-relaxed text-foreground underline decoration-primary/60 underline-offset-[4px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {c.title}{' '}
                  <span className="text-muted-foreground">({c.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {docGroups.map((group) => (
          <section key={group.id} aria-labelledby={group.id} className="mt-20">
            <Reveal
              as="h2"
              id={group.id}
              className="display max-w-[30ch] text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
            >
              {group.title}
            </Reveal>
            <Reveal as="p" delay={0.07} className="mt-4 max-w-[66ch] leading-relaxed text-foreground">
              {group.blurb}
            </Reveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {group.docs.map((doc, i) => (
                <Reveal key={doc.slug} delay={stagger(i)} className="h-full">
                  <DocCard doc={doc} form={docsMeta.form} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        {/* The proposals moved to their own page. A reader at the bottom of this one is exactly
            the reader who might want them, so the pointer goes here rather than only in the nav. */}
        <Reveal as="section" aria-labelledby="design-title" className="mt-20 bg-secondary p-6 sm:p-8">
          <h2
            id="design-title"
            className="display text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
          >
            And three ideas for what it could look like instead
          </h2>
          <p className="mt-4 max-w-[66ch] leading-relaxed text-foreground">
            Everything above describes the app that exists. Three separate proposals redraw all 25
            screens three different ways, each arguing with the one before it. None has been
            adopted and none changed a line of code, so they live on their own page.
          </p>
          <div className="mt-7">
            <Button asChild>
              <Link to="/rekhon/design">
                <Palette />
                The design proposals
              </Link>
            </Button>
          </div>
        </Reveal>

        <section aria-labelledby="whole-set-title" className="mt-20">
          <Reveal as="h2"
            id="whole-set-title"
            className="display text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
          >
            Where these come from
          </Reveal>
          <Reveal as="p" delay={stagger(1)} className="mt-4 max-w-[68ch] text-lg leading-relaxed text-foreground">
            All {docTotals.documents} are copies of files in the app&rsquo;s own repository, taken
            at version {docsSource.version} on {formatDay(docsSource.copiedOn)} — the path under
            each download button is where the original lives. They are written and rebuilt
            alongside the code, not assembled for this page, which is the only reason the figures in
            them are worth anything.
          </Reveal>
          <Reveal as="p" delay={stagger(2)} className="mt-6 max-w-[68ch] text-lg leading-relaxed text-foreground">
            One difference worth explaining before you notice it yourself. The case study counts{' '}
            {rekhonCounted.tests} tests and {rekhonCounted.adrs} decision records, because it counts
            the public branch, which is still at v{rekhonCounted.version}. These documents describe
            v{docsSource.version}, where the same two figures are {docsSource.tests} and{' '}
            {docsSource.adrs}. Same project, a fortnight apart, and both numbers were counted rather
            than remembered.
          </Reveal>
          <Reveal as="p" delay={stagger(3)} className="mt-6 max-w-[68ch] text-lg leading-relaxed text-foreground">
            Every one of them is printed by a script from a source that lives beside the code, so
            none is a second copy somebody has to remember to update. Two go further: the picture
            book is assembled from the screenshots the test suite itself records, and the map is
            read off the app&rsquo;s navigation code, so neither can disagree with the app without
            failing the build. The honest report is the one I would read first if I were deciding
            whether to trust the other ten.
          </Reveal>
          <Reveal delay={stagger(4)} className="mt-8 flex flex-wrap gap-6">
            <Link
              to="/rekhon"
              className="inline-flex items-center gap-2 rounded-sm text-base font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              What the app is
            </Link>
            <Link
              to={rekhon.caseStudy}
              className="inline-flex items-center gap-2 rounded-sm text-base font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              How it was built
            </Link>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 rounded-sm text-base font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Journal entries
            </Link>
          </Reveal>
        </section>
      </div>
    </article>
  )
}
