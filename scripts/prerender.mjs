// Multi-route static pre-render (SSG). Runs after `vite build` (client) and
// `vite build --ssr` (server). For every route it:
//   1. Renders the React app for that URL to an HTML string.
//   2. Rewrites the <head> (title, description, canonical, OG/Twitter) per page.
//   3. Injects route-specific JSON-LD structured data.
//   4. Writes dist/<route>/index.html (real files → deep links + crawlers work).
// It also regenerates sitemap.xml, robots.txt and llms.txt from the route list and site.url,
// and emits dist/404.html (noindex, no canonical, no structured data).
//
// Changelog:
//   2026-10-24 - llms.txt is generated here instead of being hand-maintained in public/, and the
//                build fails if a route it builds is not described (see the llms.txt gate below).
//   2026-09-12 - Meta patterns tolerate wrapped tags; the build fails if a description is not rewritten.
//   2026-10-01 - Sitemap <lastmod> follows the last commit per route instead of claiming today.
//   2026-09-12 - Search titles/descriptions come from portfolio.js (metaTitle / metaDescription) with a
//                length gate, BreadcrumbList on case studies, ProfilePage on /about, and a noindex 404.
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
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
const { journalMeta, publishedEntries, plannedEntries } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'journal.js')).href
)
const { rekhon, rekhonCounted } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'rekhon.js')).href
)
const { docsMeta, allDocs, docTotals, docsSource } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'rekhonDocs.js')).href
)
const { llmsContent } = await import(pathToFileURL(path.join(root, 'src', 'data', 'llms.js')).href)
const { LlmsTxt } = await import(pathToFileURL(path.join(root, 'src', 'lib', 'llmsTxt.js')).href)
const { articleSections } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'rekhonArticle.js')).href
)
const { designMeta, designDocs, designTotals } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'rekhonDesign.js')).href
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
  ...(p.roadmap?.asOf && { dateModified: p.roadmap.asOf }),
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

// A journal entry is a BlogPosting; the index is the Blog that holds them. `datePublished` is the
// entry's own date (the day the decision landed), which is the only date a reader can check against
// the repository.
const blogLd = {
  '@type': 'Blog',
  name: `${journalMeta.title} — ${profile.name}`,
  url: abs('/journal'),
  author: { '@type': 'Person', name: profile.name, url: site.url },
}

const entryLd = (e) => ({
  '@type': 'BlogPosting',
  dateModified: e.date,
  headline: e.title,
  description: e.metaDescription ?? e.summary,
  datePublished: e.date,
  url: abs(`/journal/${e.slug}`),
  author: { '@type': 'Person', name: profile.name, url: site.url },
  ...(e.tags?.length && { keywords: e.tags.join(', ') }),
  isPartOf: { '@type': 'Blog', name: journalMeta.title, url: abs('/journal') },
  ...(e.source?.href && { citation: e.source.href }),
})

const entryBreadcrumbLd = (e) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
    { '@type': 'ListItem', position: 2, name: journalMeta.title, item: abs('/journal') },
    { '@type': 'ListItem', position: 3, name: e.title, item: abs(`/journal/${e.slug}`) },
  ],
})

// /rekhon describes the app itself, so it gets MobileApplication rather than SoftwareSourceCode
// (which is what the case study about building it carries). `offers` at price 0 is the honest
// statement for an app whose source is public and which is not sold; `installUrl` is deliberately
// absent, because it is not published to any store.
const appLd = {
  '@type': 'MobileApplication',
  name: rekhon.name,
  alternateName: 'Rekhon personal finance',
  description: rekhon.metaDescription,
  applicationCategory: 'FinanceApplication',
  applicationSubCategory: 'Personal finance',
  operatingSystem: 'Android',
  softwareVersion: '0.13.9',
  url: abs('/rekhon'),
  codeRepository: rekhon.repo,
  programmingLanguage: 'Kotlin',
  license: 'https://www.gnu.org/licenses/agpl-3.0.html',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  author: { '@type': 'Person', name: profile.name, url: site.url },
  featureList: rekhon.facts.map((f) => `${f.label}: ${f.value}`),
  dateModified: rekhon.updated,
}

// FAQPage from the same data the page renders, so the markup can never claim an answer the page
// does not show — Google treats that as a violation, and it would be a lie besides.
const faqLd = {
  '@type': 'FAQPage',
  mainEntity: rekhon.faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const rekhonBreadcrumbLd = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
    { '@type': 'ListItem', position: 2, name: rekhon.name, item: abs('/rekhon') },
  ],
}

// /rekhon/docs hands over eleven downloadable PDFs, so it is a CollectionPage whose parts are
// DigitalDocuments. `contentUrl` is the file the page actually serves, which is what makes the
// markup checkable: a crawler can fetch every one of them.
const docsCollectionLd = {
  '@type': 'CollectionPage',
  name: docsMeta.h1,
  description: docsMeta.metaDescription,
  url: abs('/rekhon/docs'),
  author: { '@type': 'Person', name: profile.name, url: site.url },
  about: { '@type': 'MobileApplication', name: rekhon.name, url: abs('/rekhon') },
  hasPart: allDocs.map((d) => ({
    '@type': 'DigitalDocument',
    name: d.title,
    description: d.what,
    url: abs('/rekhon/docs'),
    contentUrl: `${site.url}${d.href}`,
    encodingFormat: 'application/pdf',
    author: { '@type': 'Person', name: profile.name, url: site.url },
  })),
}

const designCollectionLd = {
  '@type': 'CollectionPage',
  name: designMeta.h1,
  description: designMeta.metaDescription,
  url: abs('/rekhon/design'),
  author: { '@type': 'Person', name: profile.name, url: site.url },
  about: { '@type': 'MobileApplication', name: rekhon.name, url: abs('/rekhon') },
  hasPart: designDocs.map((d) => ({
    '@type': 'DigitalDocument',
    name: d.title,
    description: d.what,
    url: abs('/rekhon/design'),
    contentUrl: `${site.url}${d.href}`,
    encodingFormat: 'application/pdf',
    author: { '@type': 'Person', name: profile.name, url: site.url },
  })),
}

const designBreadcrumbLd = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
    { '@type': 'ListItem', position: 2, name: rekhon.name, item: abs('/rekhon') },
    { '@type': 'ListItem', position: 3, name: 'Design', item: abs('/rekhon/design') },
  ],
}

const docsBreadcrumbLd = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
    { '@type': 'ListItem', position: 2, name: rekhon.name, item: abs('/rekhon') },
    { '@type': 'ListItem', position: 3, name: 'Documents', item: abs('/rekhon/docs') },
  ],
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
  if (route === '/rekhon') {
    return {
      title: `${rekhon.metaTitle} | ${profile.name}`,
      description: rekhon.metaDescription,
      ld: { '@context': 'https://schema.org', '@graph': [appLd, faqLd, rekhonBreadcrumbLd] },
    }
  }
  if (route === '/rekhon/docs') {
    return {
      title: `${docsMeta.metaTitle} | ${profile.name}`,
      description: docsMeta.metaDescription,
      ld: { '@context': 'https://schema.org', '@graph': [docsCollectionLd, docsBreadcrumbLd] },
    }
  }
  if (route === '/rekhon/design') {
    return {
      title: `${designMeta.metaTitle} | ${profile.name}`,
      description: designMeta.metaDescription,
      ld: { '@context': 'https://schema.org', '@graph': [designCollectionLd, designBreadcrumbLd] },
    }
  }
  if (route === '/journal') {
    return {
      title: `${journalMeta.title} | ${profile.name}`,
      description: `Dated notes from building Rekhon: the decisions, the trade-offs and the records behind them. ${journalMeta.cadenceLabel}.`,
      ld: {
        '@context': 'https://schema.org',
        '@graph': [{ ...blogLd, blogPost: publishedEntries.map(entryLd) }],
      },
    }
  }
  if (route.startsWith('/journal/')) {
    const entrySlug = route.replace('/journal/', '')
    const e = publishedEntries.find((x) => x.slug === entrySlug)
    return {
      title: `${e.title} | ${profile.name}`,
      description: e.metaDescription ?? e.summary,
      ld: { '@context': 'https://schema.org', '@graph': [entryLd(e), entryBreadcrumbLd(e)] },
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

// Each route's rendered HTML, kept so the gates below can check what actually shipped rather than
// what the data says should have.
const renderedHtml = new Map()

async function writeRoute(route) {
  const html = buildHtml(route, render(route))
  renderedHtml.set(route, html)
  const outPath =
    route === '/'
      ? templatePath
      : path.join(distDir, route, 'index.html')
  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, html, 'utf8')
}

// --- gates ----------------------------------------------------------------
// /rekhon/docs is the only page whose content is files rather than text, so a renamed or forgotten
// PDF would ship as a download button that 404s and nothing in the rendered HTML would show it.
// Vite has already copied public/ into dist/ by the time this runs, so the files are checkable.
const DOC_FIELDS = ['slug', 'title', 'href', 'pages', 'size', 'source', 'what', 'why', 'like', 'inside']
const docProblems = []
for (const d of allDocs) {
  for (const f of DOC_FIELDS) {
    if (d[f] === undefined || d[f] === '') docProblems.push(`${d.slug ?? '(no slug)'}: missing "${f}"`)
  }
  if (typeof d.pages !== 'number' || d.pages < 1) {
    docProblems.push(`${d.slug}: pages must be a positive number, got ${JSON.stringify(d.pages)}`)
  }
  if (d.href && !existsSync(path.join(distDir, d.href))) {
    docProblems.push(`${d.slug}: no file at dist${d.href} — copy it into public${d.href}`)
  }
}
// The article's pictures are the same class of risk as the PDFs: a renamed baseline would ship as
// a broken <img> and nothing in the rendered HTML would say so.
for (const sec of articleSections) {
  if (!sec.heading || !sec.body?.length) docProblems.push(`article ${sec.id}: missing heading or body`)
  if (sec.table && (!sec.table.head?.length || !sec.table.rows?.length)) {
    docProblems.push(`article ${sec.id}: table needs a head and at least one row`)
  }
  if (sec.table?.rows?.some((r) => r.length !== sec.table.head.length)) {
    docProblems.push(`article ${sec.id}: a table row does not match the number of columns`)
  }
  if (sec.flow && (!sec.flow.steps?.length || !sec.flow.outcomes?.length)) {
    docProblems.push(`article ${sec.id}: flow needs steps and outcomes`)
  }
  const f = sec.figure
  if (!f) continue
  if (!f.alt || !f.caption) docProblems.push(`article ${sec.id}: figure needs alt text and a caption`)
  if (!existsSync(path.join(distDir, f.src))) {
    docProblems.push(`article ${sec.id}: no image at dist${f.src} — copy it into public${f.src}`)
  }
}

for (const d of designDocs) {
  for (const f of DOC_FIELDS) {
    if (d[f] === undefined || d[f] === '') docProblems.push(`design ${d.slug ?? '(no slug)'}: missing "${f}"`)
  }
  if (d.href && !existsSync(path.join(distDir, d.href))) {
    docProblems.push(`design ${d.slug}: no file at dist${d.href}`)
  }
}

const docSlugs = allDocs.map((d) => d.slug)
const duplicateSlugs = docSlugs.filter((x, i) => docSlugs.indexOf(x) !== i)
if (duplicateSlugs.length) docProblems.push(`duplicate doc slugs: ${[...new Set(duplicateSlugs)].join(', ')}`)
if (docsMeta.form.length !== 4) {
  // DocCard maps a label to a field by position, so a fifth label renders `undefined`.
  docProblems.push(`docsMeta.form has ${docsMeta.form.length} labels; DocCard renders exactly 4`)
}
if (docProblems.length) {
  throw new Error(`prerender: /rekhon/docs data is broken:\n  - ${docProblems.join('\n  - ')}`)
}

// --- run ------------------------------------------------------------------
const routes = [
  '/',
  '/works',
  '/about',
  ...projects.map((p) => `/works/${p.slug}`),
  '/rekhon',
  '/rekhon/docs',
  '/rekhon/design',
  '/journal',
  // Only published entries get a page. A planned entry is listed on the index with its date and
  // has no body, so prerendering one would ship an empty page for a crawler to index.
  ...publishedEntries.map((e) => `/journal/${e.slug}`),
]

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
//
// <lastmod> used to be today's date on every URL, which meant every deploy told crawlers that all
// twelve pages had just changed. Google ignores a lastmod it cannot trust, so the claim bought
// nothing and cost the signal. Each route now reports the last commit that touched the files it is
// actually built from. On a shallow CI clone git may know only one commit, and in a tarball it may
// not be there at all; either way this falls back to today rather than failing the build, because a
// missing date is a worse sitemap than an imprecise one.
const today = new Date().toISOString().slice(0, 10)

const lastCommitDate = (paths) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out ? out.slice(0, 10) : today
  } catch {
    return today
  }
}

// Every route renders from portfolio.js, so each one's date is the later of that file and its page.
const dataFile = 'src/data/portfolio.js'
const journalFile = 'src/data/journal.js'
const lastmodFor = (route) => {
  if (route === '/') return lastCommitDate([dataFile, 'src/pages/HomePage.jsx', 'src/components/Hero.jsx'])
  if (route === '/works') return lastCommitDate([dataFile, 'src/pages/WorksPage.jsx'])
  if (route === '/about') return lastCommitDate([dataFile, 'src/pages/AboutPage.jsx'])
  if (route === '/rekhon') return lastCommitDate(['src/data/rekhon.js', 'src/pages/RekhonPage.jsx'])
  if (route === '/rekhon/docs')
    return lastCommitDate(['src/data/rekhonDocs.js', 'src/pages/RekhonDocsPage.jsx'])
  if (route === '/rekhon/design')
    return lastCommitDate(['src/data/rekhonDesign.js', 'src/pages/RekhonDesignPage.jsx'])
  if (route === '/journal') return lastCommitDate([journalFile, 'src/pages/JournalPage.jsx'])
  if (route.startsWith('/journal/')) return lastCommitDate([journalFile, 'src/pages/JournalPostPage.jsx'])
  return lastCommitDate([dataFile, 'src/pages/ProjectDetailPage.jsx'])
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${abs(r)}</loc>\n    <lastmod>${lastmodFor(r)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${r === '/' ? '1.0' : r === '/rekhon' ? '0.9' : '0.8'}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')

// Regenerate llms.txt from the data files, for the same reason the sitemap is generated: the
// hand-maintained copy in public/ drifted. It claimed nine case studies after the tenth shipped,
// quoted a page total typed from memory, and never listed a single journal entry page. The prose
// lives in src/data/llms.js; every figure below is read from the export the page renders from.
const { text: llmsTxt, routes: describedRoutes } = new LlmsTxt({
  site,
  profile,
  experience,
  projects,
  projectCategories,
  rekhon,
  rekhonCounted,
  docTotals,
  docsSource,
  designTotals,
  journalMeta,
  publishedEntries,
  plannedEntries,
  content: llmsContent,
}).render()

// The gate that stops it drifting again: the file and the route list must describe the same site.
// A new page nobody wrote a note for fails here, and so does a note for a page that no longer
// exists. Case studies and journal entries are derived, so in practice this fires on a new page
// type — which is exactly when a human has to decide what to say about it.
const undescribed = routes.filter((r) => !describedRoutes.includes(r))
const phantom = describedRoutes.filter((r) => !routes.includes(r))
if (undescribed.length || phantom.length) {
  const lines = [
    ...undescribed.map((r) => `${r} is built but not described — add it to llmsContent.pages in src/data/llms.js`),
    ...phantom.map((r) => `${r} is described but not built — remove it from src/data/llms.js`),
  ]
  throw new Error(`prerender: llms.txt does not match the route list:\n  - ${lines.join('\n  - ')}`)
}

await writeFile(path.join(distDir, 'llms.txt'), llmsTxt, 'utf8')

// `rekhonCounted` is the structured copy of figures that are also prose inside portfolio.js, which
// by §2 imports nothing and so cannot read them. This is what keeps the two in step: recount one
// and the build names the page that still states the old number.
const statedFigures = renderedHtml.get('/works/rekhon') ?? ''
const figureProblems = []
if (!statedFigures.includes(rekhonCounted.tests)) {
  figureProblems.push(`${rekhonCounted.tests} tests`)
}
if (!new RegExp(`\\b${rekhonCounted.adrs}\\b`).test(statedFigures)) {
  figureProblems.push(`${rekhonCounted.adrs} decision records`)
}
if (figureProblems.length) {
  throw new Error(
    `prerender: /works/rekhon does not state ${figureProblems.join(' or ')}, so rekhonCounted in ` +
      'src/data/rekhon.js and the case-study prose in src/data/portfolio.js disagree',
  )
}

// Regenerate robots.txt so its Sitemap: line follows site.url instead of being a
// second hardcoded copy of the domain that silently goes stale when the URL changes.
const robotsSrc = await readFile(path.join(root, 'public', 'robots.txt'), 'utf8')
const robots = robotsSrc.replace(/^Sitemap:.*$/m, `Sitemap: ${site.url}/sitemap.xml`)
await writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8')

// Clean up the temporary SSR bundle.
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(
  `✓ prerender: ${routes.length} routes + 404 + sitemap + llms.txt (${describedRoutes.length} described) written to dist/`,
)
