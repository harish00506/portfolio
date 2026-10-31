/**
 * Why: The works list and the home page need a scannable summary of each project that leads into its
 *      case study.
 * What: One project card.
 * Result: A fully clickable card (stretched link) with the project's category, name, blurb, highlights
 *         and stack; external links sit above the overlay so they stay separately clickable.
 * Changelog: 2026-09-12 - Category kicker replaces the running index number (Switchboard restyle).
 *            2026-10-31 - Title leads; categories and the featured mark moved under it. No outline,
 *            shadow or top bar: the card is a white surface on the grey section.
 */
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github, ArrowUpRight, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/**
 * Project card. Wrapped in forwardRef so it can be a direct child of <AnimatePresence>, which needs a
 * ref to track exit animations. The stretched-link overlay avoids invalid nested <a> elements.
 *
 * Input:  project - a project object from portfolio.js ({ slug, name, blurb, categories, highlights,
 *         tags, links, featured, note }); ref - forwarded to the root <article>;
 *         headingLevel - 2 where the card sits directly under the page's <h1> (/works), 3 where a
 *         section <h2> comes between (the home page). Mirrors Section's own `headingLevel` prop.
 * Output: <motion.article>.
 * Changelog: 2026-10-24 - headingLevel added; /works went <h1> straight to <h3>, leaving a hole in
 *            the screen-reader outline. data-reveal added so the no-JS fallback can reach the card.
 */
const ProjectCard = forwardRef(function ProjectCard({ project, headingLevel = 3 }, ref) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const { slug, name, blurb, categories = [], highlights, tags, links = {}, featured, note, appPage, docsPage } =
    project

  return (
    <motion.article
      ref={ref}
      data-reveal
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8',
      )}
    >
      {/* Stretched link: makes the entire card clickable to the detail page. */}
      <Link
        to={`/works/${slug}`}
        aria-label={`${name}, view case study`}
        className="absolute inset-0 z-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />

      {/* Title first; the categories and the featured mark sit under it as one plain line. */}
      <div className="flex items-start justify-between gap-4">
        <Heading className="display text-[1.75rem] font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          {name}
        </Heading>
        {links.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} source code`}
            className="relative z-10 mt-1.5 rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Github size={18} />
          </a>
        )}
      </div>

      <p className="mt-1.5 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
        {categories.join(' · ')}
        {featured && (
          <span className="flex items-center gap-1 font-medium text-primary">
            <Star size={13} aria-hidden className="fill-primary text-primary" />
            Featured
          </span>
        )}
      </p>

      {note && (
        <p className="mt-1.5 text-sm font-medium text-brand-accent">
          {note}
        </p>
      )}

      {/* The card itself links to the case study. A project with its own page needs a second,
          separately clickable link — and it puts that page one hop from the home page and /works,
          which are the pages with the most inbound weight. `z-10` keeps it above the card overlay. */}
      {(appPage || docsPage) && (
        <div className="relative z-10 mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          {[
            { to: appPage, label: 'What the app does' },
            { to: docsPage, label: 'The documents' },
          ]
            .filter((l) => l.to)
            .map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-block rounded-sm text-sm font-medium text-foreground underline decoration-primary underline-offset-[3px] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {l.label} →
              </Link>
            ))}
        </div>
      )}

      <p className="mt-3 leading-relaxed text-foreground">{blurb}</p>

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
          <span className="text-sm font-medium text-muted-foreground">
            +{tags.length - 5}
          </span>
        )}
        <ArrowUpRight
          size={18}
          className="ml-auto flex-none text-muted-foreground opacity-0 transition-[opacity,transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100"
        />
      </div>
    </motion.article>
  )
})

export default ProjectCard
