import Section, { Reveal } from './Section.jsx'
import { skills } from '../data/portfolio.js'

export default function Skills() {
  return (
    <Section id="skills" kicker="Skills" title="Tools & technologies I work with">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05}>
            <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-card transition-shadow hover:shadow-cardHover">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
