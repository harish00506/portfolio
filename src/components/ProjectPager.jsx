/**
 * Why: A reader who finishes one case study should be one click from the next, instead of having to go
 *      back to the list.
 * What: Previous / next navigation at the bottom of a project page.
 * Result: Two large links naming the neighbouring projects.
 * Changelog: 2026-09-12 - Created for the Switchboard case-study layout.
 */
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const cardClass =
  'group bg-secondary p-6 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:p-8'
const directionClass = 'flex items-center gap-2 text-sm font-medium text-muted-foreground'
const nameClass = 'display mt-2 block text-2xl font-bold leading-tight text-foreground group-hover:text-primary'

/**
 * Previous / next project links.
 *
 * Input:  prev, next - project objects with at least { slug, name }.
 * Output: <nav> containing two links.
 */
export default function ProjectPager({ prev, next }) {
  return (
    <nav
      aria-label="More case studies"
      className="grid gap-2 sm:grid-cols-2"
    >
      <Link to={`/works/${prev.slug}`} className={cardClass}>
        <span className={directionClass}>
          <ArrowLeft size={14} aria-hidden className="transition-transform group-hover:-translate-x-1" />
          Previous
        </span>
        <span className={nameClass}>{prev.name}</span>
      </Link>

      <Link to={`/works/${next.slug}`} className={`${cardClass} sm:text-right`}>
        <span className={`${directionClass} sm:justify-end`}>
          Next
          <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-1" />
        </span>
        <span className={nameClass}>{next.name}</span>
      </Link>
    </nav>
  )
}
