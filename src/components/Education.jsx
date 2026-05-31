import { GraduationCap, Award } from 'lucide-react'
import Section, { Reveal } from './Section.jsx'
import { education } from '../data/portfolio.js'

export default function Education() {
  return (
    <Section id="education" kicker="Education" title="Academic background" alt>
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-accent-soft text-accent">
                <GraduationCap size={22} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{education.degree}</h3>
                <p className="mt-1 text-ink-muted">{education.school}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="chip">{education.period}</span>
                  <span className="chip border-accent/20 bg-accent-soft text-accent">
                    {education.score}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-card">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
              <Award size={16} />
              Achievements
            </h3>
            <ul className="space-y-3">
              {education.achievements.map((a, i) => (
                <li key={i} className="flex gap-3 text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent/60" />
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
