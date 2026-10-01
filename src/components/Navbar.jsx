/**
 * Why: Visitors need the same way around the site on every page, and a theme switch that is always
 *      within reach.
 * What: Fixed top navigation: logo, page links, theme toggle, résumé link, and a sheet menu on phones.
 * Result: A navbar that turns solid once the page scrolls, highlights the current page after hydration,
 *         and puts the theme toggle beside the menu button on small screens.
 * Changelog: 2026-09-12 - Added ThemeToggle on desktop and mobile for the Switchboard dark mode.
 */
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { profile } from '../data/portfolio.js'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { to: '/', label: 'Home', n: '01', end: true },
  { to: '/works', label: 'Work', n: '02' },
  { to: '/about', label: 'About', n: '03' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Gate active-link styling behind mount so the server-rendered HTML and the
  // first client render are identical. React Router's BrowserRouter location is
  // not resolved on the very first hydration render, so computing `isActive`
  // during SSR would set `aria-current` that the client omits → hydration
  // mismatch. With `mounted`, both render inactive first, then the highlight
  // appears after hydration (client-only, no mismatch).
  const [mounted, setMounted] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (to, end) =>
    mounted && (end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`))

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        {/* No aria-label here: one that did not repeat the visible "HG" / "harish.g" made the
            accessible name disagree with the label a speech-input user would say (WCAG 2.5.3).
            The mark names the link; the hidden word supplies the destination. */}
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground font-display text-sm font-bold text-background transition-colors group-hover:bg-primary">
            HG
          </span>
          <span className="hidden font-mono text-sm font-medium tracking-tight text-foreground sm:inline">
            harish<span className="text-primary">.</span>g
          </span>
          <span className="sr-only">Home</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const active = isActive(l.to, l.end)
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group flex items-baseline gap-1.5 text-sm font-medium transition-colors',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[0.65rem] transition-colors',
                      active ? 'text-primary' : 'text-muted-foreground group-hover:text-primary',
                    )}
                  >
                    {l.n}
                  </span>
                  <span className={cn('link-underline', active && 'bg-[length:100%_1.5px]')}>
                    {l.label}
                  </span>
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              to="/#contact"
              className="group flex items-baseline gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="font-mono text-[0.65rem] text-muted-foreground group-hover:text-primary">
                04
              </span>
              <span className="link-underline">Contact</span>
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <FileText />
              Résumé
            </a>
          </Button>
        </div>

        {/* Mobile: the theme toggle sits beside the menu button so it is one tap away. */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="!size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader className="text-left">
                <SheetTitle className="font-display text-xl">
                  harish<span className="text-primary">.</span>g
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>

              <ul className="mt-8 flex flex-col px-1">
                {links.map((l) => {
                  const active = isActive(l.to, l.end)
                  return (
                    <li key={l.to} className="border-b border-border/70">
                      <SheetClose asChild>
                        <Link
                          to={l.to}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex items-baseline gap-3 py-3.5 text-base font-medium transition-colors',
                            active ? 'text-primary' : 'text-muted-foreground hover:text-primary',
                          )}
                        >
                          <span className="font-mono text-xs text-muted-foreground">{l.n}</span>
                          {l.label}
                        </Link>
                      </SheetClose>
                    </li>
                  )
                })}
                <li className="border-b border-border/70">
                  <SheetClose asChild>
                    <Link
                      to="/#contact"
                      className="flex items-baseline gap-3 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="font-mono text-xs text-muted-foreground">04</span>
                      Contact
                    </Link>
                  </SheetClose>
                </li>
              </ul>

              <Button className="mt-6 w-full" asChild>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <FileText />
                  Résumé
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
