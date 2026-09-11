/**
 * Why: A project page has to read like a case study: the facts up front, how the system is built, the
 *      story, an honest look back, and a way on to the next project.
 * What: The /works/:slug route. Reads the project from src/data/portfolio.js and composes the
 *       case-study sections from presentational components.
 * Result: One prerendered case study per project, or the 404 page for an unknown slug.
 * Changelog: 2026-09-12 - Rebuilt for the Switchboard layout: details block, architecture flow,
 *            reflection and previous/next links. The body no longer waits on an animation to be visible,
 *            so the prerendered HTML reads correctly before (and without) JavaScript.
 */
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { projects, getProjectBySlug } from '../data/portfolio.js'
import ArchitectureDiagram from '../components/ArchitectureDiagram.jsx'
import CodeSample from '../components/CodeSample.jsx'
import MetricStat from '../components/MetricStat.jsx'
import ProjectDetails from '../components/ProjectDetails.jsx'
import ProjectPager from '../components/ProjectPager.jsx'
import Reflection from '../components/Reflection.jsx'
import Screenshot from '../components/Screenshot.jsx'
import { Button } from '@/components/ui/button'
import NotFoundPage from './NotFoundPage.jsx'

/**
 * One chapter of the story (Situation, Task, Action or Result): the label beside a readable text
 * column, with any wide media (code, screenshots, metrics) spanning the full width below.
 *
 * Input:  label - chapter name; text - narrative string; media - optional React node.
 * Output: <section>, or null when the chapter has neither text nor media.
 */
function Chapter({ label, text, media }) {
  if (!text && !media) return null
  return (
    <section className="border-t border-border pt-10">
      <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-12">
        <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary md:pt-1.5">
          {label}
        </h2>
        {text && <p className="max-w-[68ch] text-lg leading-relaxed text-foreground/85">{text}</p>}
      </div>
      {media && <div className="mt-8">{media}</div>}
    </section>
  )
}

/**
 * The projects either side of `slug` in listing order, wrapping at both ends so every case study
 * links onward.
 *
 * Input:  slug - the current project's slug (known to exist).
 * Output: { prev, next } project objects.
 */
function neighbours(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  const at = (k) => projects[(k + projects.length) % projects.length]
  return { prev: at(i - 1), next: at(i + 1) }
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFoundPage />

  const { name, blurb, tags, categories = [], links = {}, note, star = {}, details, diagram, reflection } =
    project
  const action = star.action ?? {}
  const samples = action.samples ?? []
  const screenshots = action.screenshots ?? []
  const metrics = star.result?.metrics ?? []
  const { prev, next } = neighbours(slug)

  const actionMedia =
    samples.length || screenshots.length ? (
      <div className="space-y-6">
        {samples.map((sample) => (
          <CodeSample key={sample.filename} sample={sample} />
        ))}
        {screenshots.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {screenshots.map((shot) => (
              <Screenshot key={shot.src} shot={shot} />
            ))}
          </div>
        )}
      </div>
    ) : null

  const resultMedia = metrics.length ? (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
      {metrics.map((m) => (
        <MetricStat key={m.label} metric={m} />
      ))}
    </div>
  ) : null

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="container-x">
        <Link
          to="/works"
          className="group inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft size={14} aria-hidden className="transition-transform group-hover:-translate-x-1" />
          All work
        </Link>

        <header className="mt-10">
          <p className="kicker">{[...categories, 'Case study'].join(' · ')}</p>
          {note && (
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-brand-accent">{note}</p>
          )}
          <h1 className="display mt-5 max-w-[18ch] text-balance text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.95] text-foreground">
            {name}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">{blurb}</p>

          {(links.live || links.github) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {links.live && (
                <Button asChild>
                  <a href={links.live} target="_blank" rel="noreferrer">
                    <ExternalLink />
                    Live site
                  </a>
                </Button>
              )}
              {links.github && (
                <Button variant="outline" asChild>
                  <a href={links.github} target="_blank" rel="noreferrer">
                    <Github />
                    Source code
                  </a>
                </Button>
              )}
            </div>
          )}
        </header>

        <div className="mt-14">
          <ProjectDetails details={details} stack={tags} />
        </div>

        {diagram && (
          <div className="mt-14">
            <ArchitectureDiagram diagram={diagram} />
          </div>
        )}

        <div className="mt-16 space-y-14">
          <Chapter label="Situation" text={star.situation} />
          <Chapter label="Task" text={star.task} />
          <Chapter label="Action" text={action.narrative} media={actionMedia} />
          <Chapter label="Result" text={star.result?.narrative} media={resultMedia} />
        </div>

        {reflection?.length > 0 && (
          <div className="mt-20">
            <Reflection items={reflection} />
          </div>
        )}

        <div className="mt-20">
          <ProjectPager prev={prev} next={next} />
        </div>
      </div>
    </article>
  )
}
