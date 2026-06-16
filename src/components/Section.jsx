import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

/**
 * Shared section wrapper: anchor id, consistent padding, an editorial numbered
 * header (hairline rule + mono index + serif title), and a fade-up reveal.
 */
export default function Section({ id, index, kicker, title, children, className = '', alt = false }) {
  return (
    <section id={id} className={`section ${alt ? 'bg-secondary/50' : 'bg-background'} ${className}`}>
      <div className="container-x">
        {(kicker || title) && (
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 sm:mb-14"
          >
            <Separator className="mb-5" />
            {kicker && (
              <p className="kicker">
                {index && <span className="text-muted-foreground/70">{index}</span>}
                {index && <span className="text-muted-foreground/40">/</span>}
                {kicker}
              </p>
            )}
            {title && <h2 className="section-title mt-4 max-w-[18ch] text-balance">{title}</h2>}
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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
