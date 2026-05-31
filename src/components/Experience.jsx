import { Briefcase } from 'lucide-react'
import Section, { Reveal } from './Section.jsx'
import { experience } from '../data/portfolio.js'

export default function Experience() {
  return (
    <Section id="experience" kicker="Experience" title="Where I've been working" alt>
      <div className="relative border-l border-slate-200 pl-8">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${i}`} delay={i * 0.05}>
            <div className="relative pb-2">
              {/* Timeline dot */}
              <span className="absolute -left-[42px] grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-accent shadow-card">
                <Briefcase size={14} />
              </span>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold text-ink">
                    {job.role} <span className="text-accent">· {job.company}</span>
                  </h3>
                  <span className="text-sm font-medium text-ink-faint">{job.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-ink-muted">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent/60" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
