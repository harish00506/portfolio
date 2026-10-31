import CodeSample from './CodeSample.jsx'

/**
 * Why: Two pages now render long-form prose from data — journal entries and the Rekhon page. A
 *      second copy of the block switch would be a second place for the typography to drift, and
 *      the first thing to go stale when a block type is added.
 * What: The shared renderer for a prose block array.
 * Result: One definition of how a paragraph, heading, quote, list and code sample look.
 * Changelog: 2026-10-11 - Extracted from JournalPostPage so the Rekhon page can share it.
 *
 * Blocks are data, not markup: a block cannot inject HTML, and an unrecognised `type` renders
 * nothing rather than throwing, so adding a type to the data before its case exists here cannot
 * take a page down.
 *
 * Input:  block        - { type: 'p' | 'h2' | 'h3' | 'quote' | 'list' | 'code', ... }
 *         headingClass - optional override for the h2 size, so a page can set its own rhythm.
 * Output: an element, or null for an unrecognised type.
 */
export default function ProseBlock({ block, headingClass }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={block.id}
          className={
            headingClass ??
            'display mt-14 max-w-[26ch] text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl'
          }
        >
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="mt-10 max-w-[34ch] text-balance text-lg font-semibold leading-snug text-foreground">
          {block.text}
        </h3>
      )
    case 'p':
      return (
        <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-foreground/85">{block.text}</p>
      )
    case 'quote':
      return (
        <figure className="mt-8 max-w-[62ch] border-l-2 border-primary pl-6">
          <blockquote className="text-lg italic leading-relaxed text-foreground">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-2 text-sm font-medium text-muted-foreground">
              {block.cite}
            </figcaption>
          )}
        </figure>
      )
    case 'list':
      return (
        <ul className="mt-7 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex max-w-[66ch] gap-4 text-lg leading-relaxed text-foreground/85"
            >
              <span aria-hidden className="mt-3 h-1.5 w-1.5 flex-none bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <div className="mt-8">
          <CodeSample sample={block} />
        </div>
      )
    default:
      return null
  }
}
