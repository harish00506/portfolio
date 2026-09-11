/**
 * Why: The end of every page should make getting in touch the obvious next step: one big, unmissable
 *      way to reach out, the way design portfolios sign off.
 * What: Site-wide footer with a "Say hello." call to action, the email address, profile links and a
 *       slim bottom bar.
 * Result: A contact block on every route, anchored at #contact for the navbar. It deliberately shows no
 *         phone number.
 * Changelog: 2026-09-12 - Created; replaces Contact.jsx and Footer.jsx.
 */
import { ArrowUp, ArrowUpRight, FileText, Github, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Contact footer.
 *
 * Input:  profile - { name, email, resumeUrl, contactNote, socials: { github, linkedin } }, as exported
 *         by src/data/portfolio.js.
 * Output: <footer id="contact">.
 */
export default function SayHello({ profile }) {
  const { name, email, resumeUrl, contactNote, socials } = profile
  const links = [
    { href: socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: socials.github, label: 'GitHub', Icon: Github },
    { href: resumeUrl, label: 'Résumé', Icon: FileText },
  ]

  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="container-x py-20 sm:py-28">
        <p className="kicker">Get in touch</p>
        <h2 className="display mt-5 text-[clamp(3.5rem,14vw,10rem)] font-extrabold leading-[0.88] text-foreground">
          Say hello<span className="text-primary">.</span>
        </h2>

        {contactNote && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{contactNote}</p>
        )}

        <a
          href={`mailto:${email}`}
          className="group mt-10 inline-flex max-w-full items-center gap-3 text-[clamp(1.15rem,4vw,2.25rem)] font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[0.3em] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <span className="break-all">{email}</span>
          <ArrowUpRight
            aria-hidden
            className="h-[0.9em] w-[0.9em] flex-none transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>

        <ul className="mt-10 flex flex-wrap gap-3">
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <Button variant="outline" asChild>
                <a href={href} target="_blank" rel="noreferrer">
                  <Icon />
                  {label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {name}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back to top
            <ArrowUp size={14} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
