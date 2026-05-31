import Section, { Reveal } from './Section.jsx'
import { profile } from '../data/portfolio.js'

export default function About() {
  return (
    <Section id="about" kicker="About" title="A bit about me" alt>
      <div className="grid gap-10 md:grid-cols-3">
        <Reveal className="md:col-span-2 space-y-5">
          {profile.about.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink-muted">
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {[
              { k: 'Focus', v: 'AI · Backend · Full-Stack' },
              { k: 'Stack', v: 'Java · Python · JavaScript' },
              { k: 'Based in', v: profile.location },
              { k: 'Status', v: 'Final-year B.E. (ISE)' },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-card"
              >
                <dt className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {item.k}
                </dt>
                <dd className="mt-1 font-medium text-ink">{item.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
