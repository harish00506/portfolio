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
 *   2026-10-31 - Taste-skill restyle: no outlined boxes or dashed borders; surfaces separate by a
 *                tone step, outcomes use drawn check/cross icons instead of text glyphs, and the
 *                data table stacks into labelled rows on a phone instead of scrolling sideways.
 *   2026-10-31 - Scroll motion: the sum fills in line by line and lands its total last, and the
 *                guardrail plays out step by step before its two outcomes appear. Both are the
 *                page's argument ("it shows its working") performed, not decoration.
 */
import { Check, X } from 'lucide-react'
import { Reveal, stagger } from './Section.jsx'

// One beat of the sum and of the flow: slower than a list stagger, because each line is read.
const BEAT = 0.12

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
            {sum.rows.map(([label, value], i) => (
              <Reveal as="tr" key={label} delay={i * BEAT}>
                <th scope="row" className="px-5 py-2.5 font-normal text-muted-foreground">
                  {label}
                </th>
                <td className="px-5 py-2.5 text-right tabular-nums text-foreground">
                  {value}
                </td>
              </Reveal>
            ))}
            {/* The total arrives a beat after the last line, the way it would on paper. */}
            <Reveal as="tr" delay={(sum.rows.length + 1) * BEAT} className="border-t-2 border-foreground">
              <th scope="row" className="px-5 py-3.5 font-semibold text-foreground">
                {totalLabel}
              </th>
              <td className="px-5 py-3.5 text-right text-lg font-semibold tabular-nums text-primary">
                {totalValue}
              </td>
            </Reveal>
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
      {/* Below the sm breakpoint each row stacks into a block and every cell carries its column
          name (data-label), so three columns of real text read top to bottom on a phone instead
          of scrolling sideways past the screen edge. */}
      <div className="bg-secondary">
        <table className="w-full text-left text-sm">
          <thead className="max-sm:sr-only">
            <tr className="border-b-2 border-foreground">
              {table.head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-5 py-3 text-sm font-semibold text-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <Reveal
                as="tr"
                key={row[0]}
                delay={stagger(r)}
                className="border-b border-border last:border-0 max-sm:block max-sm:py-3"
              >
                {row.map((cell, i) => (
                  <td
                    key={i}
                    data-label={table.head[i]}
                    className={
                      i === 0
                        ? 'px-5 py-3 font-semibold text-foreground max-sm:block max-sm:py-1 max-sm:text-base'
                        : 'px-5 py-3 leading-relaxed text-foreground max-sm:block max-sm:py-1 max-sm:before:block max-sm:before:font-semibold max-sm:before:text-muted-foreground max-sm:before:content-[attr(data-label)]'
                    }
                  >
                    {cell}
                  </td>
                ))}
              </Reveal>
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
            <Reveal
              as="li"
              key={step.label}
              delay={i * BEAT}
              className="flex flex-1 flex-col sm:flex-row sm:items-center"
            >
              <div className="flex-1 bg-background px-4 py-3">
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
            </Reveal>
          ))}
        </ol>

        <Reveal as="p" aria-hidden delay={flow.steps.length * BEAT} className="mt-4 text-center text-muted-foreground">
          ↓
        </Reveal>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {flow.outcomes.map((o, i) => (
            <Reveal
              as="li"
              key={o.label}
              delay={(flow.steps.length + 1 + i) * BEAT}
              // Pass is the solid surface; fail is the carmine field, so the branch reads by
              // colour and by icon, never by colour alone.
              className={`px-4 py-3 ${
                o.tone === 'pass' ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground'
              }`}
            >
              <p className="flex items-center gap-2 font-semibold leading-snug">
                {o.tone === 'pass' ? (
                  <Check aria-hidden size={18} strokeWidth={2.5} className="flex-none text-primary" />
                ) : (
                  <X aria-hidden size={18} strokeWidth={2.5} className="flex-none" />
                )}
                {o.label}
              </p>
              <p className={`mt-1 text-sm leading-relaxed ${o.tone === 'pass' ? 'text-muted-foreground' : ''}`}>
                {o.detail}
              </p>
            </Reveal>
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
 * The map is drawn on white, so its panel is the secondary tone step rather than a raw hex: light
 * in the light theme, and a framed plate around the white drawing in the dark one.
 */
export default function ArticleFigure({ figure }) {
  if (!figure) return null

  return (
    <Reveal as="figure" className="mt-10">
      <div className="overflow-hidden bg-secondary p-3 sm:p-5">
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
    </Reveal>
  )
}
