import Section, { Reveal } from './Section.jsx'
import { Badge } from '@/components/ui/badge'
import { skills } from '../data/portfolio.js'

export default function Skills() {
  return (
    <Section id="skills" index="02" kicker="Skills" title="Tools & technologies">
      <div className="border-t border-border">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.04}>
            <div className="grid gap-3 border-b border-border py-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:py-7">
              <h3 className="flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground">
                <span className="text-primary">{String(i + 1).padStart(2, '0')}</span>
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
