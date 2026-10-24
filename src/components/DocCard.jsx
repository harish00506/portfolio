import { Download, FileText } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/**
 * Why: /rekhon/docs repeats one unit eleven times — a document, its size, the same four labelled
 *      lines, and a download. Written inline it would be eleven copies of the same markup and the
 *      first thing to drift when a label changes.
 * What: one document's card.
 * Result: every document on the page has an identical shape, so a reader who has read one card
 *         knows where to look in the next.
 * Changelog: 2026-10-24 - Created.
 *
 * The four lines are rendered from `form` rather than hardcoded, so the labels are defined once in
 * `rekhonDocs.js` and the explanation at the top of the page cannot disagree with the cards.
 *
 * Input:  doc  - { slug, title, href, pages, size, source, what, why, like, inside, note? }
 *         form - { label, hint }[] in the order the four lines should render. Each label maps to a
 *                field on `doc` by position, so the array order is the render order.
 * Output: a card element. `Card` is a plain div and has no `asChild`, unlike `Button`, so the
 *         heading does the structural work rather than an <article> wrapper.
 */
export default function DocCard({ doc, form }) {
  const lines = [doc.what, doc.why, doc.like, doc.inside]

  return (
    <Card className="flex flex-col p-6 sm:p-8">
      <div>
          <h3 className="display text-balance text-xl font-bold leading-tight text-foreground sm:text-2xl">
            {doc.title}
          </h3>
          {/* The weight and page count are the two things that decide whether somebody on mobile
              taps download, so they go above the prose rather than beside the button. */}
          <p className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <FileText aria-hidden className="h-3.5 w-3.5" />
            <span>PDF</span>
            <span aria-hidden>·</span>
            <span>
              {doc.pages} {doc.pages === 1 ? 'page' : 'pages'}
            </span>
            <span aria-hidden>·</span>
            <span>{doc.size}</span>
          </p>
        </div>

        <dl className="mt-6 space-y-5">
          {form.map((field, i) => (
            <div key={field.label}>
              <dt className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-brand">
                {field.label}
              </dt>
              <dd className="mt-1.5 max-w-[62ch] leading-relaxed text-foreground/85">{lines[i]}</dd>
            </div>
          ))}
        </dl>

        {doc.note && (
          <p className="mt-6 max-w-[62ch] border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
            {doc.note}
          </p>
        )}

        {/* mt-auto pins the download to the bottom so cards in one row line their buttons up. */}
        <div className="mt-auto pt-7">
          <Button variant="outline" asChild>
            {/* `download` asks the browser to save rather than open a 10 MB file in a tab. */}
            <a href={doc.href} download>
              <Download />
              Download the PDF
            </a>
          </Button>
          <p className="mt-3 font-mono text-[0.68rem] leading-relaxed text-muted-foreground">
            <span className="uppercase tracking-[0.12em]">In the repo:</span> {doc.source}
          </p>
        </div>
    </Card>
  )
}
