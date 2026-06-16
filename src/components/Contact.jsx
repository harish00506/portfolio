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
    <Section id="contact" kicker="Get in touch">
      <Reveal>
        <h2 className="section-title max-w-[14ch] text-balance">
          Let's build something <span className="italic text-brand-accent">good</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          I'm open to AI engineering, backend and full-stack opportunities. Whether you have a role
          in mind or just want to talk shop, my inbox is always open.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {channels(profile).map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="group flex items-center gap-4 bg-card p-5 transition-colors hover:bg-secondary"
            >
              <Icon size={20} className="flex-none text-primary" />
              <span className="min-w-0">
                <span className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/70">
                  {label}
                </span>
                <span className="block truncate font-medium text-foreground">{value}</span>
              </span>
              <ArrowUpRight
                size={18}
                className="ml-auto flex-none text-muted-foreground/60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
              />
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
