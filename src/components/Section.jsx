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
            viewport={{ once: true, margin: '-80px' }}
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

/** Reusable fade-up motion wrapper for content blocks. */
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
