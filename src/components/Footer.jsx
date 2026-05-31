import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { profile } from '../data/portfolio.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-x flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-ink-faint">
          © {year} {profile.name}. Built with React, Vite & Tailwind CSS.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-ink-faint transition-colors hover:text-accent"
          >
            <Github size={20} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-ink-faint transition-colors hover:text-accent"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-ink-faint transition-colors hover:text-accent"
          >
            <Mail size={20} />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-ink-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
