// Static pre-render (SSG) step. Runs after `vite build` (client) and
// `vite build --ssr` (server). It:
//   1. Renders <App /> to an HTML string and injects it into dist/index.html.
//   2. Generates JSON-LD structured data from the single source of truth
//      (src/data/portfolio.js) and injects it into <head>.
//   3. Cleans up the temporary SSR build output.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(fileURLToPath(import.meta.url), '../..')
const distHtml = path.join(root, 'dist', 'index.html')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

// Pull in the SSR render() and the portfolio data (plain ESM, no browser APIs).
const { render } = await import(pathToFileURL(ssrEntry).href)
const { site, profile, skills, projects, experience, education } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'portfolio.js')).href
)

const appHtml = render()

// --- Build JSON-LD structured data from the data file ---------------------
const [locality, country] = profile.location.split(',').map((s) => s.trim())
const sameAs = Object.values(profile.socials).filter(
  (u) => u && !u.endsWith('github.com/') && !u.endsWith('linkedin.com/'),
)

const person = {
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: profile.tagline,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: site.url,
  image: `${site.url}${site.ogImage}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: locality,
    addressCountry: country,
  },
  knowsAbout: skills.flatMap((g) => g.items),
  alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
  ...(experience[0] && {
    worksFor: { '@type': 'Organization', name: experience[0].company },
  }),
  ...(sameAs.length && { sameAs }),
}

const website = {
  '@type': 'WebSite',
  name: `${profile.name} — Portfolio`,
  url: site.url,
}

const projectList = {
  '@type': 'ItemList',
  name: `Projects by ${profile.name}`,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareSourceCode',
      name: p.name,
      description: p.blurb,
      keywords: p.tags.join(', '),
      author: { '@type': 'Person', name: profile.name },
    },
  })),
}

const jsonLd = { '@context': 'https://schema.org', '@graph': [person, website, projectList] }

// Escape "<" so the payload can never break out of the <script> element.
const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(
  /</g,
  '\\u003c',
)}</script>`

// --- Inject into dist/index.html ------------------------------------------
let html = await readFile(distHtml, 'utf8')

if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find empty <div id="root"></div> to inject into')
}
html = html
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace('</head>', `    ${jsonLdScript}\n  </head>`)

await writeFile(distHtml, html, 'utf8')

// --- Clean up the temporary SSR bundle ------------------------------------
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log('✓ prerender: injected static HTML + JSON-LD into dist/index.html')
