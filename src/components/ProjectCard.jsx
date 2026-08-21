import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github, ArrowUpRight, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/**
 * Project card. The whole card links to the detail page via a stretched-link
 * overlay (so we avoid invalid nested <a>); external GitHub/live links sit
 * above the overlay with `relative z-10`. Wrapped in forwardRef so it can be a
 * direct child of <AnimatePresence>, which needs a ref to track exit.
 */
const ProjectCard = forwardRef(function ProjectCard({ project, index }, ref) {
  const { slug, name, blurb, highlights, tags, links = {}, featured, note } = project

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover sm:p-7',
        featured ? 'border-primary/40' : 'border-border hover:border-primary/40',
      )}
    >
      {featured && <span className="absolute inset-x-0 top-0 h-[3px] bg-primary" />}

      {/* Stretched link: makes the entire card clickable to the detail page. */}
      <Link
        to={`/works/${slug}`}
        aria-label={`${name}, view case study`}
        className="absolute inset-0 z-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground/70">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative z-10 flex items-center gap-3 text-muted-foreground">
          {featured && (
            <span className="flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary">
              <Star size={11} className="fill-primary text-primary" />
              Featured
            </span>
          )}
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} source code`}
              className="transition-colors hover:text-primary"
            >
              <Github size={17} />
            </a>
          )}
        </div>
      </div>

      <h3 className="display mt-4 text-2xl font-medium leading-tight text-foreground transition-colors group-hover:text-primary">
        {name}
      </h3>

      {note && (
        <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-accent">
          {note}
        </p>
      )}

      <p className="mt-3 leading-relaxed text-muted-foreground">{blurb}</p>

      {highlights?.length > 0 && (
        <ul className="mt-5 space-y-2">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-primary" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
        {tags.slice(0, 5).map((t) => (
          <Badge key={t} variant="tech" className="relative z-10">
            {t}
          </Badge>
        ))}
        {tags.length > 5 && (
          <span className="font-mono text-[0.7rem] text-muted-foreground/70">
            +{tags.length - 5}
          </span>
        )}
        <ArrowUpRight
          size={18}
          className="ml-auto flex-none text-muted-foreground/60 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100"
        />
      </div>
    </motion.article>
  )
})

export default ProjectCard
