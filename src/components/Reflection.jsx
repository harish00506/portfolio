/**
 * Why: Saying what you would change shows judgement, and it keeps a case study honest about the gaps a
 *      reviewer would otherwise find for themselves in the code.
 * What: The "What I would do differently" section near the end of a project page.
 * Result: A short list of concrete changes, or nothing when the project has none recorded.
 * Changelog: 2026-09-12 - Created for the Switchboard case-study layout.
 */

/**
 * Reflection section.
 *
 * Input:  items - string[] of reflections, in reading order.
 * Output: <section>, or null when there are no items.
 */
export default function Reflection({ items = [] }) {
  if (!items.length) return null

  return (
    <section
      aria-labelledby="reflection-title"
      className="rounded-lg border border-border bg-secondary/60 p-6 sm:p-10"
    >
      <p className="kicker">Looking back</p>
      <h2
        id="reflection-title"
        className="display mt-3 text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
      >
        What I would do differently
      </h2>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex max-w-[68ch] gap-4 text-lg leading-relaxed text-foreground/85">
            <span aria-hidden className="mt-3 h-1.5 w-1.5 flex-none bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
