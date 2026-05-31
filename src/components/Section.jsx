import { motion } from 'framer-motion'

/**
 * Shared section wrapper: provides an anchor id, consistent padding,
 * an optional kicker + title header, and a subtle fade-up reveal on scroll.
 */
export default function Section({ id, kicker, title, children, className = '', alt = false }) {
  return (
    <section id={id} className={`section ${alt ? 'bg-slate-50' : 'bg-white'} ${className}`}>
      <div className="container-x">
        {(kicker || title) && (
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-8 sm:mb-12"
          >
            {kicker && <p className="section-kicker">{kicker}</p>}
            {title && <h2 className="section-title">{title}</h2>}
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
