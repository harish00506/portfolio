import Section, { Reveal } from './Section.jsx'
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
        <Reveal className="space-y-6">
          {profile.about.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'display text-2xl font-medium leading-snug text-foreground sm:text-[1.7rem]'
                  : 'max-w-prose text-lg leading-relaxed text-foreground'
              }
            >
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="space-y-5 bg-background p-6 sm:p-8">
            {meta.map((item) => (
              <div key={item.k} className="flex flex-col gap-1">
                <dt className="text-sm font-medium text-muted-foreground">
                  {item.k}
                </dt>
                <dd className="text-lg font-semibold text-foreground">{item.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
