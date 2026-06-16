import Section, { Reveal } from './Section.jsx'
import { profile } from '../data/portfolio.js'

const meta = [
  { k: 'Focus', v: 'AI · Backend · Full-Stack' },
  { k: 'Stack', v: 'Java · Python · JavaScript' },
  { k: 'Based in', v: profile.location },
  { k: 'Status', v: 'Final-year B.E. (ISE)' },
]

export default function About() {
  return (
    <Section id="about" index="01" kicker="About" title="A bit about me" alt>
      <div className="grid gap-12 md:grid-cols-[1.7fr_1fr] md:gap-16">
        <Reveal className="space-y-6">
          {profile.about.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'display text-2xl font-medium leading-snug text-foreground sm:text-[1.7rem]'
                  : 'max-w-prose text-lg leading-relaxed text-muted-foreground'
              }
            >
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="divide-y divide-border border-y border-border">
            {meta.map((item) => (
              <div key={item.k} className="flex items-baseline justify-between gap-4 py-4">
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                  {item.k}
                </dt>
                <dd className="text-right font-medium text-foreground">{item.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
