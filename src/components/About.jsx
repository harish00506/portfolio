import Section, { Reveal, stagger } from './Section.jsx'
import { profile } from '../data/portfolio.js'

const meta = [
  { k: 'Focus', v: 'AI · Backend · Full-Stack' },
  { k: 'Stack', v: 'Java · Python · JavaScript' },
  { k: 'Based in', v: profile.location },
  { k: 'Status', v: 'Software Developer @ CortexCraft.ai' },
]

/**
 * Input: headingLevel - passed to Section; the About page sets 1 because this is its main heading.
 */
export default function About({ headingLevel = 2 }) {
  return (
    <Section id="about" title="A bit about me" alt headingLevel={headingLevel}>
      <div className="grid gap-12 md:grid-cols-[1.7fr_1fr] md:gap-16">
        <div className="space-y-6">
          {profile.about.map((para, i) => (
            <Reveal
              as="p"
              key={i}
              delay={stagger(i)}
              className={
                i === 0
                  ? 'display text-2xl font-medium leading-snug text-foreground sm:text-[1.7rem]'
                  : 'max-w-prose text-lg leading-relaxed text-foreground'
              }
            >
              {para}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.07}>
          <dl className="space-y-5 bg-background p-6 sm:p-8">
            {meta.map((item, i) => (
              <Reveal key={item.k} delay={0.14 + stagger(i)} className="flex flex-col gap-1">
                <dt className="text-sm font-medium text-muted-foreground">
                  {item.k}
                </dt>
                <dd className="text-lg font-semibold text-foreground">{item.v}</dd>
              </Reveal>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
