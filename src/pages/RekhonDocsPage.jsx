import { Link } from 'react-router-dom'
import { ArrowLeft, Github } from 'lucide-react'
import DocCard from '../components/DocCard.jsx'
import ArticleFigure, { WorkedSum } from '../components/ArticleFigure.jsx'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { rekhon } from '../data/rekhon.js'
import { docsMeta, docGroups, docContents, docTotals } from '../data/rekhonDocs.js'
import { articleSections, articleContents } from '../data/rekhonArticle.js'

/**
 * Why: The project's paperwork — a 234-page as-built blueprint, a report listing its own faults,
 *      a picture of every screen the build refuses to let go stale — was its least visible asset.
 *      It lived in a repository, written for engineers. /rekhon says what the app is and
 *      /works/rekhon says how it was built; neither hands over the documents or explains one to
 *      somebody who does not write software.
 * What: /rekhon/docs — eleven documents, each in the same four-line form, each downloadable.
 * Result: A page that gives the documents away and explains every one without jargon.
 * Changelog: 2026-10-24 - Created.
 */
export default function RekhonDocsPage() {
  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="container-x">
        <header>
          <p className="kicker">{docsMeta.kicker}</p>
          <h1 className="display mt-5 max-w-[24ch] text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.98] text-foreground">
            {docsMeta.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {docsMeta.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
          {docsMeta.intro.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="max-w-[68ch] text-lg leading-relaxed text-foreground/85"
            >
              {p}
            </p>
          ))}
        </div>

        {/* The article. It comes before the downloads because a shelf of PDFs answers a question
            nobody has yet asked: it is useful once you want a document, useless for deciding
            whether you do. Every picture is an artefact the app's own build produces. */}
        <nav
          aria-label="What this page explains"
          className="mt-14 rounded-lg border border-border bg-secondary/50 p-6"
        >
          <p className="kicker">What this page explains</p>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {articleContents.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="rounded-sm text-sm leading-relaxed text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>{' '}
                  {c.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {articleSections.map((section) => (
          <section key={section.id} aria-labelledby={section.id} className="mt-20">
            <h2
              id={section.id}
              className="display max-w-[26ch] text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
            >
              {section.heading}
            </h2>
            {section.body.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="mt-5 max-w-[68ch] text-lg leading-relaxed text-foreground/85"
              >
                {para}
              </p>
            ))}
            <WorkedSum sum={section.sum} />
            <ArticleFigure figure={section.figure} />
          </section>
        ))}

        <Separator className="mt-20" />

        <section aria-labelledby="library-title" className="mt-16">
          <h2
            id="library-title"
            className="display text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            Now the papers themselves
          </h2>
          <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-foreground/85">
            That was the short version. Underneath it sit {docTotals.documents} documents and{' '}
            {docTotals.pages} pages, free to download, none of which you need in order to have
            understood the article above. Each one gets the same four lines so you can tell in ten
            seconds whether you want it.
          </p>
        </section>

        {/* The four labels, explained once. Every card below repeats them in this order, so a
            reader who reads this knows the shape of all eleven. */}
        <section aria-labelledby="form-title" className="mt-14">
          <h2 id="form-title" className="kicker">
            Every document gets the same four lines
          </h2>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {docsMeta.form.map((field) => (
              <li key={field.label} className="bg-card p-5">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand">
                  {field.label}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{field.hint}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* On-page contents. Eleven cards is a long scroll, and these sometimes surface as
            sitelinks in search results. */}
        <nav
          aria-label="On this page"
          className="mt-14 rounded-lg border border-border bg-secondary/50 p-6"
        >
          <p className="kicker">On this page</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {docContents.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="rounded-sm text-sm leading-relaxed text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {c.title}{' '}
                  <span className="font-mono text-xs text-muted-foreground">({c.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {docGroups.map((group) => (
          <section key={group.id} aria-labelledby={group.id} className="mt-20">
            <h2
              id={group.id}
              className="display max-w-[30ch] text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
            >
              {group.title}
            </h2>
            <p className="mt-4 max-w-[66ch] leading-relaxed text-muted-foreground">
              {group.blurb}
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {group.docs.map((doc) => (
                <DocCard key={doc.slug} doc={doc} form={docsMeta.form} />
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="whole-set-title" className="mt-20">
          <Separator className="mb-10" />
          <h2
            id="whole-set-title"
            className="display text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
          >
            Where these come from
          </h2>
          <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-foreground/85">
            All {docTotals.documents} are copies of files in the app&rsquo;s own repository, taken
            at version 0.13.10 on 23 October 2026 — the path under each download button is where the
            original lives. They are written and rebuilt alongside the code, not assembled for this
            page, which is the only reason the figures in them are worth anything.
          </p>
          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-foreground/85">
            One difference worth explaining before you notice it yourself. The case study counts
            3,822 tests and 77 decision records, because it counts the public branch, which is still
            at v0.13.9. These documents describe v0.13.10, where the same two figures are 3,986 and
            82. Same project, a fortnight apart, and both numbers were counted rather than
            remembered.
          </p>
          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-foreground/85">
            Every one of them is printed by a script from a source that lives beside the code, so
            none is a second copy somebody has to remember to update. Two go further: the picture
            book is assembled from the screenshots the test suite itself records, and the map is
            read off the app&rsquo;s navigation code, so neither can disagree with the app without
            failing the build. The honest report is the one I would read first if I were deciding
            whether to trust the other ten.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link
              to="/rekhon"
              className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              What the app is
            </Link>
            <Link
              to={rekhon.caseStudy}
              className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              How it was built
            </Link>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Journal entries
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}
