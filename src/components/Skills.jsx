import Section, { Reveal, stagger } from './Section.jsx'
import { Badge } from '@/components/ui/badge'
import { skills } from '../data/portfolio.js'

export default function Skills() {
  return (
    <Section id="skills" title="Tools & technologies">
      <div>
        {skills.map((group) => (
          // Each group enters as it scrolls in: its name first, then its chips 30ms apart.
          <div key={group.group} className="grid gap-3 py-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:py-7">
            <Reveal as="h3" className="display text-lg font-semibold text-foreground">
              {group.group}
            </Reveal>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, j) => (
                <Reveal as="span" key={item} delay={0.07 + stagger(j, 0.03, 0.3)} className="inline-flex">
                  <Badge variant="tech">{item}</Badge>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
