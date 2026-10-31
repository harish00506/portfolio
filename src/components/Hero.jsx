/**
 * Why: The first screen has to say who this is, what they build and what to do next, in large type,
 *      before anything else loads.
 * What: Home-page masthead: name, title, one plain sentence, the two actions, the contact links and
 *       the portrait with the current role as its caption.
 * Result: A server-rendered hero that animates in with CSS (no JS needed to become visible).
 * Changelog: 2026-10-31 - Taste-skill restyle: removed the glow blobs, the pinging "open to roles"
 *            eyebrow, the corner ticks and the frosted caption; the photo is larger, square-cornered
 *            and captioned in plain text; availability moved into the contact row.
 */
import { ArrowDownRight, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile, experience } from '../data/portfolio.js'

const now = experience[0]

// The entrance itself is the `.rise` class in index.css; only the stagger differs per element,
// so this carries the delay alone and each element keeps `rise` in its own className.
const riseDelay = (delay) => ({ style: { animationDelay: `${delay}s` } })

const contactLinks = [
  { href: profile.socials.github, icon: Github, label: 'GitHub' },
  { href: profile.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
]

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="container-x">
        <div className="grid items-end gap-12 lg:grid-cols-[1.55fr_1fr]">
          <div>
            <h1
              {...riseDelay(0)}
              className="display rise text-[clamp(3.5rem,12vw,9rem)] font-semibold leading-[0.92] text-foreground"
            >
              Harish&nbsp;G
            </h1>

            <p
              {...riseDelay(0.08)}
              className="display rise mt-4 text-[clamp(1.5rem,4.5vw,2.6rem)] font-medium leading-tight text-primary"
            >
              {profile.title}
            </p>

            <p
              {...riseDelay(0.16)}
              className="rise mt-7 max-w-[34rem] text-lg leading-relaxed text-foreground sm:text-xl"
            >
              {profile.tagline}
            </p>

            <div {...riseDelay(0.24)} className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

            <div {...riseDelay(0.32)} className="rise mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
              <p className="mr-2 text-base text-muted-foreground">{profile.availability}</p>
              {contactLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={label}
                  className="-m-2 rounded-sm p-2 text-foreground transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* The portrait, square-cornered, with the current role as a plain caption. */}
          <figure {...riseDelay(0.2)} className="rise-scale hidden w-full max-w-sm justify-self-end lg:block">
            <img
              src={profile.photo}
              alt="Harish G"
              width={520}
              height={540}
              fetchpriority="high"
              decoding="async"
              className="aspect-[4/5] w-full bg-secondary object-cover"
            />
            <figcaption className="mt-4 text-base text-muted-foreground">
              Now <span className="font-semibold text-foreground">{now.role}</span> at{' '}
              <span className="font-semibold text-primary">{now.company}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
