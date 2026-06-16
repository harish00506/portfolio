import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { profile } from '../data/portfolio.js'

const socials = [
  { href: profile.socials.github, icon: Github, label: 'GitHub' },
  { href: profile.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
        <p className="font-mono text-xs tracking-tight text-muted-foreground">
          © {year} {profile.name} — built with React, Vite &amp; Tailwind.
        </p>

        <div className="flex items-center gap-1">
          {socials.map(({ href, icon: Icon, label }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="ml-2" asChild>
                <a href="#top" aria-label="Back to top">
                  <ArrowUp />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back to top</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </footer>
  )
}
