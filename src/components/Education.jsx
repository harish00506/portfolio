import { Award } from 'lucide-react'
import Section, { Reveal } from './Section.jsx'
import { Card } from '@/components/ui/card'
import { education } from '../data/portfolio.js'

export default function Education() {
  return (
    <Section id="education" index="04" kicker="Education" title="Academic background" alt>
      <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <Card className="flex h-full flex-col p-7">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-accent">
              Degree
            </span>
            <h3 className="display mt-3 text-2xl font-medium leading-snug text-foreground">
              {education.degree}
            </h3>
            <p className="mt-2 text-muted-foreground">{education.school}</p>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="flex h-full flex-col p-7">
            <h3 className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-accent">
              <Award size={15} />
              Highlights
            </h3>
            <ul className="mt-5 space-y-3.5">
              {education.achievements.map((a, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-primary" />
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
