/**
 * Why: Every route shares the same shell: navigation, the page itself, and a way to get in touch.
 * What: The layout App.jsx renders around every page.
 * Result: Navbar, the matched page, and the Say Hello footer, with the scroll position reset on navigation.
 * Changelog: 2026-09-12 - Contact section and footer merged into SayHello. The #top anchor moved here from
 *            the home hero, so "Back to top" works on every page.
 */
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import Navbar from './Navbar.jsx'
import SayHello from './SayHello.jsx'
import { profile } from '../data/portfolio.js'

export default function Layout() {
  const { pathname, hash } = useLocation()

  // On route change, jump to top, unless navigating to an in-page anchor (#contact).
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <TooltipProvider delayDuration={150}>
      <div id="top" className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
        <Navbar />
        <main className="relative flex-1">
          <Outlet />
        </main>
        <SayHello profile={profile} />
      </div>
    </TooltipProvider>
  )
}
