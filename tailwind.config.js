/**
 * Why: Colours, fonts, radii and shadows must come from one place, so components never carry raw values
 *      (CLAUDE.md §4) and a theme change is a token change rather than a hunt through JSX.
 * What: Tailwind theme wired to the CSS variables declared in src/index.css.
 * Result: Semantic colour utilities (bg-primary, text-muted-foreground, ...) that follow the active
 *         light or dark Switchboard palette, plus the site's three font roles.
 * Changelog: 2026-09-12 - Switchboard: Schibsted Grotesk / Atkinson Hyperlegible Next / Martian Mono,
 *            and shadows derived from theme tokens instead of fixed rgba values.
 */
import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // shadcn/ui semantic tokens, driven by CSS variables in index.css.
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        // shadcn's `accent` = subtle hover surface (NOT a brand colour).
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Switchboard brand accents: carmine primary + slate-blue accent for code strings and notes.
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
          accent: 'hsl(var(--brand-accent))',
        },
      },
      fontFamily: {
        display: ['"Schibsted Grotesk"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        sans: ['"Atkinson Hyperlegible Next"', '"Atkinson Hyperlegible"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['"Martian Mono"', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      maxWidth: {
        container: '1180px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        // Soft elevation derived from the ink and brand tokens, so it adapts to both themes.
        card: '0 1px 2px hsl(var(--foreground) / 0.04), 0 12px 28px -18px hsl(var(--foreground) / 0.18)',
        cardHover: '0 1px 2px hsl(var(--foreground) / 0.05), 0 24px 48px -24px hsl(var(--primary) / 0.28)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
