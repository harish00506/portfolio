// Multi-route static pre-render (SSG). Runs after `vite build` (client) and
// `vite build --ssr` (server). For every route it:
//   1. Renders the React app for that URL to an HTML string.
//   2. Rewrites the <head> (title, description, canonical, OG/Twitter) per page.
//   3. Injects route-specific JSON-LD structured data.
//   4. Writes dist/<route>/index.html (real files → deep links + crawlers work).
// It also regenerates sitemap.xml and robots.txt from the route list and site.url,
// and emits dist/404.html (noindex, no canonical, no structured data).
//
// Changelog:
//   2026-09-12 - Meta patterns tolerate wrapped tags; the build fails if a description is not rewritten.
//   2026-09-12 - Search titles/descriptions come from portfolio.js (metaTitle / metaDescription) with a
//                length gate, BreadcrumbList on case studies, ProfilePage on /about, and a noindex 404.
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(fileURLToPath(import.meta.url), '../..')
const distDir = path.join(root, 'dist')
const templatePath = path.join(distDir, 'index.html')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render } = await import(pathToFileURL(ssrEntry).href)
const { site, profile, skills, projects, projectCategories, experience, education } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'portfolio.js')).href
)

const template = await readFile(templatePath, 'utf8')

// Google truncates titles past ~60 characters and descriptions past ~160. A longer value is a data bug,
// so the build stops and names the route rather than shipping a cut-off search snippet.
const TITLE_MAX = 60
const DESCRIPTION_MAX = 160

// --- helpers --------------------------------------------------------------
const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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
  description: profile.metaDescription,
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

const websiteLd = { '@type': 'WebSite', name: `${profile.name} | Portfolio`, url: site.url }

const projectLd = (p) => ({
  '@type': 'SoftwareSourceCode',
  name: p.name,
  description: p.metaDescription ?? p.blurb,
  keywords: p.tags.join(', '),
  url: abs(`/works/${p.slug}`),
  author: { '@type': 'Person', name: profile.name, url: site.url },
})

// Breadcrumbs let Google show "Home › Work › Project" in place of a bare URL.
const breadcrumbLd = (p) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
    { '@type': 'ListItem', position: 2, name: 'Work', item: abs('/works') },
    { '@type': 'ListItem', position: 3, name: p.name, item: abs(`/works/${p.slug}`) },
  ],
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
      title: `${profile.name} | ${profile.title}`,
      description: profile.metaDescription,
      ld: { '@context': 'https://schema.org', '@graph': [personLd, websiteLd, itemListLd] },
    }
  }
  if (route === '/works') {
    const areas = projectCategories.filter((c) => c !== 'All').join(', ')
    return {
      title: `Projects by ${profile.name} | ${profile.title}`,
      description: `Case studies by ${profile.name} across ${areas}: each with its architecture, real code and results.`,
      ld: { '@context': 'https://schema.org', ...itemListLd },
    }
  }
  if (route === '/about') {
    return {
      title: `About ${profile.name} | ${profile.title}`,
      description: `${profile.name}, ${profile.title} in ${locality}: skills, experience at ${experience[0].company} and education.`,
      ld: { '@context': 'https://schema.org', '@type': 'ProfilePage', url: abs('/about'), mainEntity: personLd },
    }
  }
  // /works/:slug
  const slug = route.replace('/works/', '')
  const p = projects.find((x) => x.slug === slug)
  return {
    title: `${p.metaTitle ?? p.name} | ${profile.name}`,
    description: p.metaDescription ?? p.blurb,
    ld: { '@context': 'https://schema.org', '@graph': [projectLd(p), breadcrumbLd(p)] },
  }
}

// Rewrite the template <head> for a given route and inject body + JSON-LD.
function buildHtml(route, appHtml) {
  const { title, description, ld } = metaFor(route)
  if (title.length > TITLE_MAX) {
    throw new Error(`prerender: title for ${route} is ${title.length} chars (max ${TITLE_MAX}): "${title}"`)
  }
  if (description.length > DESCRIPTION_MAX) {
    throw new Error(`prerender: description for ${route} is ${description.length} chars (max ${DESCRIPTION_MAX})`)
  }

  const url = abs(route)
  const jsonLd = `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`

  // `\s+` between attributes: index.html wraps long meta tags across lines, and the old single-space
  // patterns silently matched nothing, so every page shipped the home page's description.
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[\s\S]*?("\s*\/>)/,
      `$1${escapeAttr(description)}$2`,
    )
    .replace(/(<link\s+rel="canonical"\s+href=")[\s\S]*?("\s*\/>)/, `$1${url}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[\s\S]*?("\s*\/>)/, `$1${escapeAttr(title)}$2`)
    .replace(
      /(<meta\s+property="og:description"\s+content=")[\s\S]*?("\s*\/>)/,
      `$1${escapeAttr(description)}$2`,
    )
    .replace(/(<meta\s+property="og:url"\s+content=")[\s\S]*?("\s*\/>)/, `$1${url}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[\s\S]*?("\s*\/>)/, `$1${escapeAttr(title)}$2`)
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[\s\S]*?("\s*\/>)/,
      `$1${escapeAttr(description)}$2`,
    )

  // Fail the build rather than ship a page whose meta tags quietly kept the template's copy.
  for (const tag of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
    const written = new RegExp(`<meta\\s+${tag}\\s+content="${escapeRegExp(escapeAttr(description))}"`)
    if (!written.test(html)) {
      throw new Error(`prerender: ${tag} was not rewritten for ${route}`)
    }
  }

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

// 404 page: render the catch-all route, then strip everything that would let a crawler index it as a
// copy of the home page (a canonical pointing at "/", index robots, and the home page's structured data).
const notFoundHtml = buildHtml('/', render('/__not_found__'))
  .replace(/<title>[\s\S]*?<\/title>/, `<title>Not found | ${escapeText(profile.name)}</title>`)
  .replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/>/, '<meta name="robots" content="noindex, follow" />')
  .replace(/\s*<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, '')
  .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
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

// Regenerate robots.txt so its Sitemap: line follows site.url instead of being a
// second hardcoded copy of the domain that silently goes stale when the URL changes.
const robotsSrc = await readFile(path.join(root, 'public', 'robots.txt'), 'utf8')
const robots = robotsSrc.replace(/^Sitemap:.*$/m, `Sitemap: ${site.url}/sitemap.xml`)
await writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8')

// Clean up the temporary SSR bundle.
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`✓ prerender: ${routes.length} routes + 404 + sitemap written to dist/`)
