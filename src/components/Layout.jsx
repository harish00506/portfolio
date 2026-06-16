import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import Navbar from './Navbar.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const { pathname, hash } = useLocation()

  // On route change, jump to top — unless navigating to an in-page anchor (#contact).
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
      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
        <Navbar />
        <main className="relative flex-1">
          <Outlet />
        </main>
        <Contact />
        <Footer />
      </div>
    </TooltipProvider>
  )
}
