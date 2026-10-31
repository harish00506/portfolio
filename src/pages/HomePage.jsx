import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Section, { Reveal, stagger } from '../components/Section.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { Badge } from '@/components/ui/badge'
import { featuredProjects, skills, profile } from '../data/portfolio.js'

// A flat, de-duplicated set of headline skills for the snapshot row.
const skillPreview = [
  ...skills.find((g) => g.group === 'AI / ML').items,
  'Spring Boot',
  'FastAPI',
  'React',
  'Neo4j',
  'Docker',
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Selected work: the featured projects, projects-first ordering */}
      <Section id="projects" title="Selected work" alt>
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              // Staggered by column, so each row of two ripples left to right as it scrolls in.
              delay={stagger(i % 2)}
              // An odd last card spans the row so it never leaves half the grid empty.
              className={i === featuredProjects.length - 1 && i % 2 === 0 ? 'sm:col-span-2' : ''}
            />
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            to="/works"
            className="group mt-10 inline-flex items-center gap-2 text-base font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] transition-colors hover:text-primary"
          >
            View all work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Section>

      {/* Snapshot: skills and about teaser, secondary content */}
      <Section id="snapshot" title="About me">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <Reveal as="p" className="display text-2xl font-medium leading-snug text-foreground sm:text-[1.7rem]">
              {profile.about[0]}
            </Reveal>
            <Reveal delay={0.14}>
            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-2 text-base font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] transition-colors hover:text-primary"
            >
              More about me
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            </Reveal>
          </div>

          <div>
            <Reveal as="h3" delay={0.07} className="display text-lg font-semibold text-foreground">
              Core toolkit
            </Reveal>
            {/* The toolkit fills in chip by chip, 40ms apart: a short cascade, not a wait. */}
            <div className="mt-4 flex flex-wrap gap-2">
              {skillPreview.map((s, i) => (
                <Reveal as="span" key={s} delay={0.14 + stagger(i, 0.04, 0.5)} className="inline-flex">
                  <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                    {s}
                  </Badge>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
