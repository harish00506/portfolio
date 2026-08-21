import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Section, { Reveal } from '../components/Section.jsx'
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
      <Section id="projects" index="01" kicker="Selected work" title="Things I've built" alt>
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            to="/works"
            className="group mt-10 inline-flex items-center gap-2 font-mono text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            View all work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Section>

      {/* Snapshot: skills and about teaser, secondary content */}
      <Section id="snapshot" index="02" kicker="Snapshot" title="A quick look">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <Reveal>
            <p className="display text-2xl font-medium leading-snug text-foreground sm:text-[1.7rem]">
              {profile.about[0]}
            </p>
            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-2 font-mono text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              More about me
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/70">
              Core toolkit
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skillPreview.map((s) => (
                <Badge key={s} variant="secondary" className="px-3 py-1 text-sm font-medium">
                  {s}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
