import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import { getProjectBySlug } from '../data/portfolio.js'
import CodeSample from '../components/CodeSample.jsx'
import Screenshot from '../components/Screenshot.jsx'
import MetricStat from '../components/MetricStat.jsx'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import NotFoundPage from './NotFoundPage.jsx'

const ease = [0.16, 1, 0.3, 1]

// One STAR step: big serif letter + label, with the content beside it.
function StarStep({ letter, label, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease }}
      className="grid gap-5 border-t border-border pt-8 md:grid-cols-[150px_1fr] md:gap-10"
    >
      <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
        <span className="display text-5xl font-semibold leading-none text-primary">{letter}</span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70">
          {label}
        </span>
      </div>
      <div className="min-w-0">{children}</div>
    </motion.div>
  )
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFoundPage />

  const { name, blurb, tags, links = {}, note, star } = project
  const action = star?.action

  return (
    <article className="section pt-28 sm:pt-32">
      <div className="container-x">
        {/* Back link */}
        <Link
          to="/works"
          className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          All work
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mt-8"
        >
          {note && (
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-accent">
              {note}
            </p>
          )}
          <h1 className="display mt-2 text-4xl font-semibold leading-[1.05] text-foreground sm:text-6xl">
            {name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{blurb}</p>

          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {tags.map((t) => (
              <Badge key={t} variant="tech">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {links.live && (
              <Button asChild>
                <a href={links.live} target="_blank" rel="noreferrer">
                  <ExternalLink />
                  Live demo
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
        </motion.header>

        {/* STAR case study */}
        {star && (
          <div className="mt-14 space-y-10">
            {star.situation && (
              <StarStep letter="S" label="Situation">
                <p className="text-lg leading-relaxed text-muted-foreground">{star.situation}</p>
              </StarStep>
            )}

            {star.task && (
              <StarStep letter="T" label="Task">
                <p className="text-lg leading-relaxed text-muted-foreground">{star.task}</p>
              </StarStep>
            )}

            {action && (
              <StarStep letter="A" label="Action">
                {action.narrative && (
                  <p className="text-lg leading-relaxed text-muted-foreground">{action.narrative}</p>
                )}

                {action.samples?.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {action.samples.map((sample) => (
                      <CodeSample key={sample.filename} sample={sample} />
                    ))}
                  </div>
                )}

                {action.screenshots?.length > 0 && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {action.screenshots.map((shot) => (
                      <Screenshot key={shot.src} shot={shot} />
                    ))}
                  </div>
                )}
              </StarStep>
            )}

            {star.result && (
              <StarStep letter="R" label="Result">
                {star.result.narrative && (
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {star.result.narrative}
                  </p>
                )}
                {star.result.metrics?.length > 0 && (
                  <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                    {star.result.metrics.map((m) => (
                      <MetricStat key={m.label} metric={m} />
                    ))}
                  </div>
                )}
              </StarStep>
            )}
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-16">
          <Separator className="mb-8" />
          <Link
            to="/works"
            className="group inline-flex items-center gap-2 font-mono text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to all work
          </Link>
        </div>
      </div>
    </article>
  )
}
