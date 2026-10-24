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
import { publishedEntriesForProject } from '../data/journal.js'
import ArchitectureDiagram from '../components/ArchitectureDiagram.jsx'
import CodeSample from '../components/CodeSample.jsx'
import MetricStat from '../components/MetricStat.jsx'
import ProjectDetails from '../components/ProjectDetails.jsx'
import ProjectPager from '../components/ProjectPager.jsx'
import Reflection from '../components/Reflection.jsx'
import ProjectRoadmap from '../components/ProjectRoadmap.jsx'
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
function Chapter({ label, heading, text, media }) {
  if (!text && !media) return null
  // With a `heading`, the STAR label demotes to a kicker and the descriptive line becomes the h2 —
  // "Situation" is a structure label, not something anyone searches for. Without one, the label
  // stays the h2 so the older case studies keep their heading outline unchanged.
  const Label = heading ? 'p' : 'h2'
  return (
    <section className="border-t border-border pt-10">
      <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-12">
        <Label className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary md:pt-1.5">
          {label}
        </Label>
        <div>
          {heading && (
            <h2 className="display max-w-[30ch] text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {heading}
            </h2>
          )}
          {text && (
            <p className={`max-w-[68ch] text-lg leading-relaxed text-foreground/85${heading ? ' mt-5' : ''}`}>
              {text}
            </p>
          )}
        </div>
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

  const { name, blurb, tags, categories = [], links = {}, note, star = {}, details, diagram, reflection, roadmap } =
    project
  const entries = publishedEntriesForProject(slug)
  const action = star.action ?? {}
  const headings = star.headings ?? {}
  const appPage = project.appPage
  const docsPage = project.docsPage
  const designPage = project.designPage
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

          {(links.live || links.github || appPage || docsPage || designPage) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {appPage && (
                <Button asChild>
                  <Link to={appPage}>What the app does</Link>
                </Button>
              )}
              {docsPage && (
                <Button variant="outline" asChild>
                  <Link to={docsPage}>The documents</Link>
                </Button>
              )}
              {designPage && (
                <Button variant="outline" asChild>
                  <Link to={designPage}>Design proposals</Link>
                </Button>
              )}
              {links.live && (
                <Button variant={appPage ? 'outline' : 'default'} asChild>
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
          <Chapter label="Situation" heading={headings.situation} text={star.situation} />
          <Chapter label="Task" heading={headings.task} text={star.task} />
          <Chapter label="Action" heading={headings.action} text={action.narrative} media={actionMedia} />
          <Chapter
            label="Result"
            heading={headings.result}
            text={star.result?.narrative}
            media={resultMedia}
          />
        </div>

        {roadmap && (
          <div className="mt-20">
            <ProjectRoadmap roadmap={roadmap} />
          </div>
        )}

        {entries.length > 0 && (
          <section aria-labelledby="journal-title" className="mt-20">
            <p className="kicker">Build journal</p>
            <h2
              id="journal-title"
              className="display mt-3 text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
            >
              How the thinking moved
            </h2>
            <p className="mt-4 max-w-[66ch] leading-relaxed text-muted-foreground">
              Dated entries on the decisions behind this project, each linking to the record it came
              from.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    to={`/journal/${entry.slug}`}
                    className="group flex flex-col gap-1.5 py-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <time
                      dateTime={entry.date}
                      className="min-w-[7rem] flex-none font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {entry.date}
                    </time>
                    <span className="min-w-0">
                      <span className="block text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                        {entry.title}
                      </span>
                      <span className="mt-1 block max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                        {entry.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/journal"
              className="mt-7 inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              All entries
            </Link>
          </section>
        )}

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
