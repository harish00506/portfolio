import Section, { Reveal, stagger } from './Section.jsx'
import { experience } from '../data/portfolio.js'

export default function Experience() {
  return (
    <Section id="experience" title="Where I've worked" alt>
      {/* No timeline rule: each job is its own block, on the page's ground, and the jobs read in
          order by position. The role leads, then the dates, then the bullets one by one. */}
      <div className="space-y-14">
        {experience.map((job, i) => (
          <div key={`${job.company}-${i}`}>
            <Reveal className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="display text-2xl font-medium text-foreground">
                  {job.role}
                  <span className="text-primary"> · {job.company}</span>
                </h3>
                <span className="text-sm font-medium text-muted-foreground">
                  {job.period}
                </span>
            </Reveal>

            <ul className="mt-5 space-y-2.5">
              {job.bullets.map((b, bi) => (
                <Reveal as="li" key={bi} delay={stagger(bi + 1)} className="flex max-w-[75ch] gap-3 text-foreground">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none bg-primary" />
                  <span className="leading-relaxed">{b}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
