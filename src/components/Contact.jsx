import { Mail, Phone, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import Section, { Reveal } from './Section.jsx'
import { profile } from '../data/portfolio.js'

const channels = (p) => [
  { icon: Mail, label: 'Email', value: p.email, href: `mailto:${p.email}` },
  { icon: Phone, label: 'Phone', value: p.phone, href: `tel:${p.phone.replace(/\s+/g, '')}` },
  { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: p.socials.linkedin },
  { icon: Github, label: 'GitHub', value: 'See my code', href: p.socials.github },
]

export default function Contact() {
  return (
    <Section id="contact" kicker="Contact" title="Let's build something">
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-10 lg:p-12">
          <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            I'm open to AI engineering, backend and full-stack opportunities. Whether you have a role
            in mind or just want to talk shop, my inbox is always open.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {channels(profile).map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-accent hover:shadow-cardHover"
              >
                <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-widest text-ink-faint">
                    {label}
                  </span>
                  <span className="block truncate font-medium text-ink">{value}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="ml-auto flex-none text-ink-faint transition-colors group-hover:text-accent"
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
