import Section, { Reveal } from './Section.jsx'
import { Badge } from '@/components/ui/badge'
import { skills } from '../data/portfolio.js'

export default function Skills() {
  return (
    <Section id="skills" title="Tools & technologies">
      <div>
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.04}>
            <div className="grid gap-3 py-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:py-7">
              <h3 className="display text-lg font-semibold text-foreground">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} variant="tech">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
