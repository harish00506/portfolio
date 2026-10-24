# Harish G — Portfolio

**Live: [www.harishg.com](https://www.harishg.com)**

The source of my portfolio: nine engineering case studies, a dated build journal, and a page for
[Rekhon](https://www.harishg.com/rekhon), an offline-first personal finance app for Android.

Built with React 18, Vite and Tailwind CSS. Not a single-page app in the usual sense — every route
is **pre-rendered to static HTML** at build time, so a crawler and a reader get the same thing and
no content depends on JavaScript running.

| | |
|---|---|
| **Site** | [www.harishg.com](https://www.harishg.com) |
| **Case studies** | [/works](https://www.harishg.com/works) — nine, each with architecture, real code and results |
| **Build journal** | [/journal](https://www.harishg.com/journal) — dated entries, each tied to a decision record |
| **Rekhon** | [/rekhon](https://www.harishg.com/rekhon) · [source](https://github.com/harish00506/Rekhon) |
| **Résumé** | [/resume.pdf](https://www.harishg.com/resume.pdf) |

---

## Run locally

```bash
npm install      # first time only
npm run dev      # dev server → http://localhost:5173
npm run build    # client + SSR bundle + prerender → dist/
npm run preview  # serve the production build
```

`npm run build` does three things in order: builds the client bundle, builds an SSR bundle, then
runs `scripts/prerender.mjs` to render every route to `dist/<route>/index.html` and regenerate
`sitemap.xml` and `robots.txt`.

**The build is the test suite.** There is no separate test runner, and the prerender deliberately
fails rather than shipping a broken page. It stops the build if a page title exceeds 60 characters,
a meta description exceeds 160, or a meta tag was not rewritten for a route — the last one caught a
bug where every page silently shipped the home page's description.

---

## Where the content lives

All text, projects, skills and experience live in data files. The components read from them, so
editing content means editing one of these and nothing else:

```
src/data/portfolio.js   # profile, skills, experience, education, and all ten projects
src/data/journal.js     # journal entries + the publishing cadence
src/data/rekhon.js      # the long-form Rekhon page, its FAQ and the counted figures
src/data/rekhonArticle.js  # the plain-English article at the top of /rekhon/docs
src/data/rekhonDocs.js     # the as-built PDFs, and where each was copied from
src/data/rekhonDesign.js   # the three design proposals
src/data/llms.js           # the prose half of llms.txt; the figures come from the files above
```

Each project supports `links: { github, live }` and an optional `appPage` for a project with its
own page. A project with a `roadmap` renders status lanes on its case study; one with
`star.headings` gets descriptive H2s in place of the Situation/Task/Action/Result labels.

Publishing a journal entry is documented in **[docs/journal-workflow.md](docs/journal-workflow.md)**,
including the rule that decides what may go out: an entry is only published when its claim sits in a
pushed public commit and carries a source link that resolves.

---

## Structure

```
src/
  data/           portfolio.js · journal.js · rekhon.js   (the only places content lives)
  pages/          HomePage · WorksPage · ProjectDetailPage · RekhonPage
                  JournalPage · JournalPostPage · AboutPage · NotFoundPage
  components/     Hero · Navbar · Section · ProjectCard · ProjectDetails
                  ArchitectureDiagram · ProjectRoadmap · ProseBlock · CodeSample
                  MetricStat · Reflection · Skills · Experience · Education
                  Layout · SayHello · ThemeToggle · Screenshot · ProjectPager
  lib/            highlight.js  (dependency-free tokenizer for the code samples)
  index.css       Tailwind layers, design tokens, light/dark themes
scripts/
  prerender.mjs   SSG: per-route HTML, meta, JSON-LD, sitemap, robots, llms.txt, 404
docs/
  journal-workflow.md   how to publish an entry
  sitemap.md            how to find and verify an XML sitemap
public/           fonts · og-image · robots.txt · docs/ (the Rekhon PDFs) · résumé PDFs
```

---

## SEO and crawlability

Worth describing, because most of it is enforced rather than hoped for:

- Every route is **static HTML** — no client-side-only content.
- Per-page `title`, `description`, canonical, and Open Graph / Twitter tags, each length-gated by
  the build.
- JSON-LD per route: `Person` + `WebSite` + `ItemList` on the home page, `SoftwareSourceCode` +
  `BreadcrumbList` on a case study, `MobileApplication` + `FAQPage` on `/rekhon`, `Blog` and
  `BlogPosting` on the journal.
- `sitemap.xml` generated from the route list, with `lastmod` taken from **the last commit that
  touched the files each route is built from** rather than today's date — a lastmod Google cannot
  trust is worse than none.
- `robots.txt` welcomes search and AI crawlers, and declares both the sitemap and an IndexNow key.
- `llms.txt` gives AI crawlers a map of the site rather than just an invitation, and it is
  **generated from the data files too** — the hand-maintained copy drifted, so the prose now lives
  in `src/data/llms.js` and every figure is read from the export the page renders from. The build
  fails if a route it builds is not described there, or a described route no longer exists.
- The LaTeX résumé sources are served `noindex`: they are duplicate content of their PDFs.

---

## Theming

Colors, fonts and shadows are design tokens in `src/index.css` (and `tailwind.config.js`), defined
once for light mode and redefined for dark. The brand is carmine `#b3223a` with a slate-blue accent;
nothing hardcodes a hex outside those token definitions.

---

## Licence

Code is free to learn from. The written content, case studies and résumés are mine — please do not
republish those as your own.
