import { motion } from 'framer-motion'

/**
 * Shared section wrapper: anchor id, consistent padding, a display-type heading that names the
 * section, and a fade-up reveal.
 *
 * Input:  headingLevel - 1 when this section's title is the page's main heading (a page needs exactly
 *         one <h1> for search engines and screen readers), otherwise 2 (default). The look is the same.
 * Changelog: 2026-09-12 - Added headingLevel so /works and /about render a real <h1>.
 *            2026-10-31 - Dropped the hairline rule, the 01/02 index and the mono kicker above
 *            the title (taste-skill restyle): the heading alone names the section.
 */
export default function Section({ id, title, children, className = '', alt = false, headingLevel = 2 }) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2'
  return (
    <section id={id} className={`section ${alt ? 'bg-secondary' : 'bg-background'} ${className}`}>
      <div className="container-x">
        {title && (
          <motion.header
            data-reveal
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 sm:mb-14"
          >
            <Heading className="section-title max-w-[22ch] text-balance">{title}</Heading>
          </motion.header>
        )}
        {children}
      </div>
    </section>
  )
}

/**
 * Reusable fade-up motion wrapper for content blocks.
 *
 * Why:  every long page reveals its parts as they scroll in, and one definition keeps the
 *       distance, easing and the no-JS / reduced-motion fallback (`data-reveal`, index.css) shared.
 * Input:  as        - the element to render ('div', 'p', 'h2', 'li', 'tr', 'section'...); default div.
 *         delay     - seconds before this element starts, for staggering siblings (see `stagger`).
 *         className - passed through; any other prop (id, aria-*) is passed through too.
 * Output: a framer-motion element that rises 16px and fades in once, when it enters the viewport.
 * Changelog: 2026-10-31 - `as` and prop pass-through added so headings, list items and table rows
 *            can reveal themselves without a wrapper div breaking their markup.
 *            2026-10-31 - Viewport inset is '-60px 0px', vertical only. A bare '-60px' also cut
 *            60px off the left and right, so on a phone (20px gutter) a short chip at the start of a
 *            line, like 'Git', never intersected and stayed invisible however far you scrolled.
 */
export function Reveal({ children, as = 'div', delay = 0, className = '', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/**
 * Delay for the i-th sibling in a group that enters the viewport together.
 *
 * Why:  a row of cards or a run of paragraphs that all fade at once reads as one block; 70ms apart
 *       they read as a sequence. Capped so the tenth item never waits long enough to look broken.
 * Input:  i - zero-based position in the group; step - seconds between items; max - the cap.
 * Output: seconds, a number.
 */
export function stagger(i, step = 0.07, max = 0.35) {
  return Math.min(i * step, max)
}

/**
 * Stagger for the i-th block of a prose array, counted from the nearest h2 before it.
 *
 * Why:  long-form pages (/rekhon, journal posts) render data blocks in one flat list. Counting
 *       from the section's heading makes the heading lead and its paragraphs follow, instead of a
 *       whole section popping in at once or the hundredth paragraph waiting the full cap.
 * Input:  blocks - the prose block array ({ type }); i - index into it.
 * Output: seconds, a number (see `stagger`).
 */
export function proseStagger(blocks, i) {
  let j = i
  while (j > 0 && blocks[j].type !== 'h2') j -= 1
  return stagger(i - j)
}
