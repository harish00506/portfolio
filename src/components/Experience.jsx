import Section, { Reveal } from './Section.jsx'
import { experience } from '../data/portfolio.js'

export default function Experience() {
  return (
    <Section id="experience" index="03" kicker="Experience" title="Where I've worked" alt>
      <div className="relative border-l border-border pl-7 sm:pl-10">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${i}`} delay={i * 0.05}>
            <div className="relative pb-10 last:pb-0">
              {/* Timeline marker */}
              <span className="absolute top-1.5 -left-[33px] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background sm:-left-[43px]" />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="display text-2xl font-medium text-foreground">
                  {job.role}
                  <span className="text-primary"> · {job.company}</span>
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground/70">
                  {job.period}
                </span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {job.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-primary" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
