# Harish G Portfolio

A clean, minimal, single-page portfolio built with **React 18 + Vite + Tailwind CSS**, with subtle
scroll animations (Framer Motion) and Lucide icons.

## Run locally

```bash
npm install      # first time only
npm run dev      # start dev server → http://localhost:5173
```

## Build & preview

```bash
npm run build    # output to dist/
npm run preview  # serve the production build locally
```

## Editing content

All text, skills, experience, projects and education live in **one file**:

```
src/data/portfolio.js
```

Edit that file to update content. You don't need to touch the components. Each project supports
`links: { github: '...', live: '...' }`; leave `links` empty (`{}`) to show a small lock icon
(used for private / internship work).

### Things to personalize

- **GitHub & LinkedIn URLs**: set `profile.socials.github` and `profile.socials.linkedin` in
  `src/data/portfolio.js` (currently placeholders).
- **Resume PDF**: a placeholder lives at `public/resume.pdf`. Replace it with your real resume
  (keep the same filename) and the Download / Resume buttons will just work.
- **Profile photo**: the hero shows an "HG" monogram. To use a photo, drop e.g. `public/profile.jpg`
  and follow the comment inside `src/components/Hero.jsx` to swap the monogram for an `<img>`.
- **Project repo / demo links**: add them to each project's `links` object in
  `src/data/portfolio.js`.

## Project structure

```
src/
  data/portfolio.js     # single source of truth for all content
  components/            # Navbar, Hero, About, Skills, Experience,
                         # Projects, ProjectCard, Education, Contact, Footer, Section
  index.css              # Tailwind layers + base styles / design tokens
  App.jsx, main.jsx
public/                  # favicon.svg, resume.pdf (replace placeholder)
tailwind.config.js       # accent color, fonts, shadows
```

## Deploy later (when ready)

The site is a static SPA, so any static host works:

- **Vercel / Netlify:** import the repo, framework = Vite, build = `npm run build`,
  output dir = `dist`. Zero extra config.
- **GitHub Pages:** run `npm run build`, then publish the `dist/` folder (e.g. via the
  `gh-pages` package or a GitHub Action). If served from a subpath, set `base` in
  `vite.config.js` to `'/<repo-name>/'`.
```
