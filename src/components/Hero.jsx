import { ArrowDownRight, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile, experience } from '../data/portfolio.js'

const now = experience[0]

// The entrance itself is the `.rise` class in index.css; only the stagger differs per element,
// so this carries the delay alone and each element keeps `rise` in its own className.
const riseDelay = (delay) => ({ style: { animationDelay: `${delay}s` } })

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Ambient brand glow: subtle, behind the masthead. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -bottom-48 -left-24 h-[26rem] w-[26rem] rounded-full bg-brand-accent/[0.05] blur-3xl" />
      </div>

      <div className="container-x">
        <div className="grid items-end gap-12 lg:grid-cols-[1.55fr_1fr]">
          {/* Left: masthead */}
          <div>
            <p {...riseDelay(0)} className="kicker rise">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to AI · Backend · Full-Stack roles
            </p>

            <h1
              {...riseDelay(0.08)}
              className="display rise mt-6 text-[clamp(3rem,11vw,7.5rem)] font-semibold leading-[0.95] text-foreground"
            >
              Harish&nbsp;G
            </h1>

            <p
              {...riseDelay(0.16)}
              className="display rise mt-3 text-[clamp(1.4rem,4.5vw,2.6rem)] font-medium leading-tight text-primary"
            >
              {profile.title}
            </p>

            <p
              {...riseDelay(0.24)}
              className="rise mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {profile.tagline}
            </p>

            <div {...riseDelay(0.32)} className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a href="#projects">
                  View selected work
                  <ArrowDownRight />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <FileText />
                  Download résumé
                </a>
              </Button>
            </div>

            <div {...riseDelay(0.4)} className="rise mt-9 flex items-center gap-5">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Find me
              </span>
              <span className="h-px w-8 bg-border" />
              {[
                { href: profile.socials.github, icon: Github, label: 'GitHub' },
                { href: profile.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: framed monogram + current status */}
          <div
            style={{ animationDelay: '0.2s' }}
            className="rise-scale hidden lg:block"
          >
            <div className="relative aspect-[4/5] w-full max-w-xs rounded-lg border border-border bg-card shadow-card">
              <img
                src={profile.photo}
                alt="Harish G"
                className="absolute inset-0 h-full w-full rounded-lg object-cover"
              />

              {/* Corner ticks */}
              <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-primary" />
              <span className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-primary" />
              <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-primary" />
              <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-primary" />

              <div className="absolute inset-x-0 bottom-0 rounded-b-lg border-t border-border bg-background/80 px-4 py-3 backdrop-blur-sm">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                  Currently
                </p>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {now.role} <span className="text-primary">@ {now.company}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
