/**
 * Why: Dark mode is not optional on this site (CLAUDE.md §4), and a visitor's choice should outrank their
 *      system setting and survive a reload.
 * What: Icon button that switches between the light and dark Switchboard themes.
 * Result: Toggles the `dark` class on <html> and stores the choice under localStorage "theme". The inline
 *         script in index.html reads the same key before first paint, so a reload never flashes light.
 * Changelog: 2026-09-12 - Created with the Switchboard redesign.
 */
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'theme'

/**
 * Theme switch for the navbar.
 *
 * The server cannot know the visitor's theme, so the button renders a neutral, disabled state until it
 * mounts. Server HTML and the first client render therefore match (no hydration mismatch), and the real
 * state appears one tick later.
 *
 * Input:  className - optional extra classes for placement.
 * Output: <button> that flips the theme on click.
 */
export default function ThemeToggle({ className }) {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  /**
   * Applies the opposite theme and remembers it.
   * Input: none (reads current state). Output: none; updates the DOM class, storage and state.
   */
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
    setTheme(next)
  }

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      disabled={theme === null}
      aria-label={label}
      title={label}
      className={className}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
