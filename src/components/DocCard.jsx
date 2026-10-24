import { Download, FileText } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/**
 * Why: /rekhon/docs repeats one unit eleven times. Written inline it would be eleven copies of the
 *      same markup and the first thing to drift when a label changes.
 * What: one document's card.
 * Result: every document on the page has an identical shape, so a reader who has read one card
 *         knows where to look in the next.
 * Changelog:
 *   2026-10-24 - Created.
 *   2026-10-24 - The four lines moved behind a disclosure. Eleven cards showing four lines each
 *                came to 1,488 words, half the page, and buried the article above them. The first
 *                line now shows and the rest open on request.
 *
 * The disclosure is a native <details>, not a scripted accordion: it is keyboard accessible for
 * free, and it still opens when JavaScript has not loaded — which matters on a site whose
 * prerendered pages are meant to stand on their own.
 *
 * Input:  doc  - { slug, title, href, pages, size, source, what, why, like, inside, note? }
 *         form - { label, hint }[] in render order. Labels map to fields by position, so the
 *                array order is the render order.
 * Output: a card element.
 */
export default function DocCard({ doc, form }) {
  // form[0] is always "What it is", which stays visible; the rest open on request.
  const hidden = [doc.why, doc.like, doc.inside]

  return (
    <Card className="flex flex-col p-6">
      <div>
        <h3 className="display text-balance text-xl font-bold leading-tight text-foreground">
          {doc.title}
        </h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
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

      <p className="mt-4 max-w-[60ch] leading-relaxed text-foreground/85">{doc.what}</p>

      <details className="group mt-4">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-sm font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="group-open:hidden">Why I wrote it, and what is inside</span>
          <span className="hidden group-open:inline">Close</span>
        </summary>
        <dl className="mt-4 space-y-4">
          {form.slice(1).map((field, i) => (
            <div key={field.label}>
              <dt className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-brand">
                {field.label}
              </dt>
              <dd className="mt-1.5 max-w-[60ch] leading-relaxed text-foreground/85">
                {hidden[i]}
              </dd>
            </div>
          ))}
          {doc.note && (
            <p className="max-w-[60ch] border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
              {doc.note}
            </p>
          )}
        </dl>
      </details>

      {/* mt-auto pins the download to the bottom so cards in one row line their buttons up. */}
      <div className="mt-auto pt-6">
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
