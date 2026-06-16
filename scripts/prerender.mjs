// Multi-route static pre-render (SSG). Runs after `vite build` (client) and
// `vite build --ssr` (server). For every route it:
//   1. Renders the React app for that URL to an HTML string.
//   2. Rewrites the <head> (title, description, canonical, OG/Twitter) per page.
//   3. Injects route-specific JSON-LD structured data.
//   4. Writes dist/<route>/index.html (real files → deep links + crawlers work).
// It also regenerates sitemap.xml from the route list and emits dist/404.html.
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(fileURLToPath(import.meta.url), '../..')
const distDir = path.join(root, 'dist')
const templatePath = path.join(distDir, 'index.html')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render } = await import(pathToFileURL(ssrEntry).href)
const { site, profile, skills, projects, experience, education } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'portfolio.js')).href
)

const template = await readFile(templatePath, 'utf8')

// --- helpers --------------------------------------------------------------
const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (route) => `${site.url}${route === '/' ? '/' : route}`

// --- shared JSON-LD builders ----------------------------------------------
const [locality, country] = profile.location.split(',').map((s) => s.trim())
const sameAs = Object.values(profile.socials).filter(
  (u) => u && !u.endsWith('github.com/') && !u.endsWith('linkedin.com/'),
)

const personLd = {
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: profile.tagline,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: site.url,
  image: `${site.url}${site.ogImage}`,
  address: { '@type': 'PostalAddress', addressLocality: locality, addressCountry: country },
  knowsAbout: skills.flatMap((g) => g.items),
  alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
  ...(experience[0] && { worksFor: { '@type': 'Organization', name: experience[0].company } }),
  ...(sameAs.length && { sameAs }),
}

const websiteLd = { '@type': 'WebSite', name: `${profile.name} — Portfolio`, url: site.url }

const projectLd = (p) => ({
  '@type': 'SoftwareSourceCode',
  name: p.name,
  description: p.blurb,
  keywords: p.tags.join(', '),
  url: abs(`/works/${p.slug}`),
  author: { '@type': 'Person', name: profile.name },
})

const itemListLd = {
  '@type': 'ItemList',
  name: `Projects by ${profile.name}`,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: abs(`/works/${p.slug}`),
    item: projectLd(p),
  })),
}

// --- per-route metadata + structured data ---------------------------------
function metaFor(route) {
  if (route === '/') {
    return {
      title: `${profile.name} — ${profile.title}`,
      description: profile.tagline,
      ld: { '@context': 'https://schema.org', '@graph': [personLd, websiteLd, itemListLd] },
    }
  }
  if (route === '/works') {
    return {
      title: `Work — ${profile.name}`,
      description: `Selected and full project work by ${profile.name}: AI, full-stack, ML and mobile applications.`,
      ld: { '@context': 'https://schema.org', ...itemListLd },
    }
  }
  if (route === '/about') {
    return {
      title: `About — ${profile.name}`,
      description: `About ${profile.name} — skills, experience and education. ${profile.title}.`,
      ld: { '@context': 'https://schema.org', ...personLd },
    }
  }
  // /works/:slug
  const slug = route.replace('/works/', '')
  const p = projects.find((x) => x.slug === slug)
  return {
    title: `${p.name} — ${profile.name}`,
    description: p.blurb,
    ld: { '@context': 'https://schema.org', ...projectLd(p) },
  }
}

// Rewrite the template <head> for a given route and inject body + JSON-LD.
function buildHtml(route, appHtml) {
  const { title, description, ld } = metaFor(route)
  const url = abs(route)
  const jsonLd = `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`)
    .replace(
      /(<meta name="description" content=")[\s\S]*?(" \/>)/,
      `$1${escapeAttr(description)}$2`,
    )
    .replace(/(<link rel="canonical" href=")[\s\S]*?(" \/>)/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[\s\S]*?(" \/>)/, `$1${escapeAttr(title)}$2`)
    .replace(
      /(<meta property="og:description" content=")[\s\S]*?(" \/>)/,
      `$1${escapeAttr(description)}$2`,
    )
    .replace(/(<meta property="og:url" content=")[\s\S]*?(" \/>)/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[\s\S]*?(" \/>)/, `$1${escapeAttr(title)}$2`)
    .replace(
      /(<meta name="twitter:description" content=")[\s\S]*?(" \/>)/,
      `$1${escapeAttr(description)}$2`,
    )

  if (!html.includes('<div id="root"></div>')) {
    throw new Error('prerender: could not find empty <div id="root"></div> in template')
  }
  html = html
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace('</head>', `    ${jsonLd}\n  </head>`)
  return html
}

async function writeRoute(route) {
  const html = buildHtml(route, render(route))
  const outPath =
    route === '/'
      ? templatePath
      : path.join(distDir, route, 'index.html')
  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, html, 'utf8')
}

// --- run ------------------------------------------------------------------
const routes = ['/', '/works', '/about', ...projects.map((p) => `/works/${p.slug}`)]

for (const route of routes) {
  await writeRoute(route)
  console.log(`  ✓ ${route}`)
}

// 404 page — render the catch-all route to a path that matches no route.
const notFoundHtml = buildHtml('/', render('/__not_found__')).replace(
  /<title>[\s\S]*?<\/title>/,
  `<title>Not found — ${escapeText(profile.name)}</title>`,
)
await writeFile(path.join(distDir, '404.html'), notFoundHtml, 'utf8')

// Regenerate sitemap.xml from the route list (overwrites the static copy).
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${abs(r)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${r === '/' ? '1.0' : '0.8'}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')

// Clean up the temporary SSR bundle.
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`✓ prerender: ${routes.length} routes + 404 + sitemap written to dist/`)
