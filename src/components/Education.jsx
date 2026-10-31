import Section, { Reveal, stagger } from './Section.jsx'
import { Card } from '@/components/ui/card'
import { education } from '../data/portfolio.js'

export default function Education() {
  return (
    <Section id="education" title="Academic background">
      <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <Card className="flex h-full flex-col border-0 bg-secondary p-7">
            <h3 className="display text-2xl font-medium leading-snug text-foreground">
              {education.degree}
            </h3>
            <p className="mt-2 text-foreground">{education.school}</p>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="flex h-full flex-col border-0 bg-secondary p-7">
            <h3 className="display text-lg font-semibold text-foreground">Highlights</h3>
            <ul className="mt-5 space-y-3.5">
              {education.achievements.map((a, i) => (
                <Reveal as="li" key={i} delay={0.14 + stagger(i)} className="flex gap-3 text-foreground">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none bg-primary" />
                  <span className="leading-relaxed">{a}</span>
                </Reveal>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
