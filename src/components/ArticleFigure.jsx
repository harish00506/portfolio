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
      <div className="max-w-[30rem] overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <table className="w-full text-left">
          <tbody>
            {sum.rows.map(([label, value]) => (
              <tr key={label} className="border-b border-border/60">
                <th scope="row" className="px-5 py-2.5 font-normal text-muted-foreground">
                  {label}
                </th>
                <td className="px-5 py-2.5 text-right font-mono tabular-nums text-foreground">
                  {value}
                </td>
              </tr>
            ))}
            <tr className="bg-secondary/60">
              <th scope="row" className="px-5 py-3.5 font-semibold text-foreground">
                {totalLabel}
              </th>
              <td className="px-5 py-3.5 text-right font-mono text-lg font-semibold tabular-nums text-primary">
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
      <div className="overflow-hidden rounded-lg border border-border bg-[#fcfcfd] p-3 shadow-card sm:p-5">
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
