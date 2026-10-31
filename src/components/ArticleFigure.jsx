/**
 * Why: the article on /rekhon/docs needs two visuals and only two. A worked sum, which explains
 *      the app's central idea better than a screenshot of that sum ever did, and one real diagram.
 *      The phone screenshots that used to live here were removed: shrunk into a text column they
 *      read as grey noise, and they pushed the page to 14,000px.
 * What: `WorkedSum` renders a subtraction a reader can follow line by line. `ArticleFigure`
 *       renders the one diagram.
 * Result: visuals that carry meaning at any size, and a page that is mostly words again.
 * Changelog:
 *   2026-10-24 - Created to frame app screenshots.
 *   2026-10-24 - Screenshots dropped; replaced by WorkedSum, and the figure frame simplified.
 */

/**
 * A small subtraction, rendered as a table.
 *
 * Why:  the app's whole argument is "here is the number and here is how it was reached". Showing
 *       the arithmetic in HTML makes that argument at any screen size and costs no image weight.
 * Input:  sum - { caption, rows: [label, value][], total: [label, value] }.
 * Output: a <figure>, or null when no sum was supplied.
 */
export function WorkedSum({ sum }) {
  if (!sum) return null
  const [totalLabel, totalValue] = sum.total

  return (
    <figure className="mt-8">
      <div className="max-w-[30rem] overflow-hidden bg-secondary">
        <table className="w-full text-left">
          <tbody>
            {sum.rows.map(([label, value]) => (
              <tr key={label} className="border-b border-border/60">
                <th scope="row" className="px-5 py-2.5 font-normal text-muted-foreground">
                  {label}
                </th>
                <td className="px-5 py-2.5 text-right tabular-nums text-foreground">
                  {value}
                </td>
              </tr>
            ))}
            <tr className="bg-secondary/60">
              <th scope="row" className="px-5 py-3.5 font-semibold text-foreground">
                {totalLabel}
              </th>
              <td className="px-5 py-3.5 text-right text-lg font-semibold tabular-nums text-primary">
                {totalValue}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {sum.caption && (
        <figcaption className="mt-4 max-w-[62ch] leading-relaxed text-muted-foreground">
          {sum.caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * A small table.
 *
 * Why:  three of the article's sections were walls of prose. Each one had a short, concrete set of
 *       facts buried in a sentence — the advisor's checks, what does and does not leave the phone —
 *       and a table shows those faster than a paragraph does, at any width.
 * Input:  table - { head: string[], rows: string[][], caption? }. The first column is the row
 *         header; later columns are data.
 * Output: a <figure>, or null when no table was supplied.
 */
export function DataTable({ table }) {
  if (!table) return null

  return (
    <figure className="mt-8">
      {/* Horizontal scroll rather than a squeeze: three columns of real text cannot wrap into
          320px without becoming unreadable, and a scrolling table is honest about that. */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60">
              {table.head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-5 py-3 text-sm font-medium text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row[0]} className="border-b border-border/60 last:border-0">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={
                      i === 0
                        ? 'px-5 py-3 font-medium text-foreground'
                        : 'px-5 py-3 leading-relaxed text-muted-foreground'
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.caption && (
        <figcaption className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
          {table.caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * A left-to-right pipeline with one branch at the end.
 *
 * Why:  the guardrail is the project's central idea and it is a sequence, which prose makes a
 *       reader hold in their head and a picture does not.
 * What: built from HTML rather than SVG on purpose — it reflows to a column on a phone, the text
 *       stays selectable and searchable, and it takes the theme's colours in both modes instead of
 *       carrying its own.
 * Input:  flow - { steps: [{ label, detail }], outcomes: [{ label, detail, tone }], caption? }
 *         where tone is 'pass' or 'fail'.
 * Output: a <figure>, or null when no flow was supplied.
 */
export function FlowDiagram({ flow }) {
  if (!flow) return null

  return (
    <figure className="mt-8">
      <div className="bg-secondary p-5 sm:p-6">
        <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
          {flow.steps.map((step, i) => (
            <li key={step.label} className="flex flex-1 flex-col sm:flex-row sm:items-center">
              <div className="flex-1 rounded-md border border-border bg-background px-4 py-3">
                <p className="font-semibold leading-snug text-foreground">{step.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
              {i < flow.steps.length - 1 && (
                <span
                  aria-hidden
                  className="flex-none self-center px-2 py-1 text-muted-foreground"
                >
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </span>
              )}
            </li>
          ))}
        </ol>

        <p aria-hidden className="mt-4 text-center text-muted-foreground">
          ↓
        </p>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {flow.outcomes.map((o) => (
            <li
              key={o.label}
              className={`rounded-md border px-4 py-3 ${
                o.tone === 'pass' ? 'border-border bg-background' : 'border-dashed border-border bg-secondary/50'
              }`}
            >
              <p className="font-semibold leading-snug text-foreground">
                <span aria-hidden className="mr-1.5 text-muted-foreground">
                  {o.tone === 'pass' ? '✓' : '✕'}
                </span>
                {o.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{o.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      {flow.caption && (
        <figcaption className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
          {flow.caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * The one diagram on the page.
 *
 * Why:  the navigation map is the only picture that earns its place — it shows a shape words
 *       cannot, and it is generated from the code rather than drawn.
 * Input:  figure - { src, alt, caption }.
 * Output: a <figure>, or null when no figure was supplied.
 *
 * The pale surface is kept in both themes: the map is drawn on white, and a light panel reads as
 * a diagram rather than as a styling mistake when the page is dark.
 */
export default function ArticleFigure({ figure }) {
  if (!figure) return null

  return (
    <figure className="mt-10">
      <div className="overflow-hidden rounded-lg border border-border bg-[#fcfcfd] p-3 sm:p-5">
        <img
          src={figure.src}
          alt={figure.alt}
          loading="lazy"
          decoding="async"
          className="w-full"
        />
      </div>
      <figcaption className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
        {figure.caption}
      </figcaption>
    </figure>
  )
}
