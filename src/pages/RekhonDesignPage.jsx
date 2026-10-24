import { Link } from 'react-router-dom'
import { ArrowLeft, Github } from 'lucide-react'
import DocCard from '../components/DocCard.jsx'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { rekhon } from '../data/rekhon.js'
import { designMeta, designDocs, designTotals } from '../data/rekhonDesign.js'

/**
 * Why: these four proposals lived at the bottom of /rekhon/docs, which mixed two different kinds
 *      of document on one page. The others are a record of the app that exists; these argue about
 *      an app that does not. A reader after the first had to scroll past the second.
 * What: /rekhon/design — the three redesigns and the map of the third.
 * Result: a page that is unambiguously about ideas, and a documents page that is shorter and
 *         only about what shipped.
 * Changelog: 2026-10-24 - Created, splitting the proposals out of /rekhon/docs.
 */
export default function RekhonDesignPage() {
  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="container-x">
        <header>
          <p className="kicker">{designMeta.kicker}</p>
          <h1 className="display mt-5 max-w-[24ch] text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.98] text-foreground">
            {designMeta.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {designMeta.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/rekhon/docs">
                <ArrowLeft />
                The app as it is
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
          {designMeta.intro.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="max-w-[68ch] text-lg leading-relaxed text-foreground/85"
            >
              {p}
            </p>
          ))}
        </div>

        <section aria-labelledby="proposals-title" className="mt-16">
          <h2 id="proposals-title" className="kicker">
            {designTotals.documents} documents · {designTotals.pages} pages
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {designDocs.map((doc) => (
              <DocCard key={doc.slug} doc={doc} form={designMeta.form} />
            ))}
          </div>
        </section>

        <section aria-labelledby="whats-next-title" className="mt-20">
          <Separator className="mb-10" />
          <h2
            id="whats-next-title"
            className="display text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
          >
            What would have to happen to adopt one
          </h2>
          <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-foreground/85">
            More than redrawing. Every screen in the app is checked against a committed picture on
            each build, so changing the navigation means a written decision recording why, and
            every one of those pictures re-recorded in light, dark and at double-size text. That
            cost is the reason three proposals exist and none has been adopted: it is cheaper to
            argue on paper than to find out afterwards.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link
              to="/rekhon/docs"
              className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              The documents
            </Link>
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
          </div>
        </section>
      </div>
    </article>
  )
}
