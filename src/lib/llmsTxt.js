// Renders public llms.txt from the site's own data.
//
// Why:  llms.txt was the last hand-maintained file describing a generated site, and it drifted the
//       way hand-maintained copies do: "nine case studies" after the tenth shipped, a page total
//       typed from memory, and four journal entry pages it never mentioned. sitemap.xml has never
//       drifted, because it is built from the route list. This does the same for llms.txt.
// What: a renderer that takes the data modules' values plus the prose in src/data/llms.js and
//       returns the file's text together with every site route it listed.
// Result: the figures a crawler reads are the figures the pages render, and a new page that nobody
//         describes fails the build instead of being quietly left out.
//
// Pure by design: it imports nothing and reaches for no file. The caller (scripts/prerender.mjs)
// owns the data and the writing, which is what makes this testable by calling it.
//
// Changelog:
//   2026-10-24 — Created.

const WRAP = 78

/**
 * One llms.txt document.
 *
 * Why:  the sections share one set of facts and one route ledger, so they belong to one object
 *       rather than to eight functions passing the same arguments between them.
 * What: `render()` returns the finished text and the routes it covered.
 * Result: a caller can write the text and, separately, assert that every route it builds is
 *         described — the check that stops the file going stale.
 * Changelog: 2026-10-24 — Created.
 *
 * Input: one object holding the exports of the data modules —
 *        { site, profile, experience, projects, projectCategories, rekhon, rekhonCounted,
 *          docTotals, docsSource, designTotals, journalMeta, publishedEntries, plannedEntries,
 *          content }. `content` is `llmsContent` from src/data/llms.js.
 * Output: see `render()`.
 */
export class LlmsTxt {
  #d
  #content
  #routes
  #tokens

  constructor(data) {
    const { content, ...rest } = data
    this.#d = rest
    this.#content = content
    this.#routes = []
    this.#tokens = this.#buildTokens()
  }

  /**
   * Build the document.
   *
   * Why:  the routes are collected while the lines are written, so there is no second list to keep
   *       in step with the first.
   * Input:  none.
   * Output: { text, routes } — the file's contents, and the site-relative routes it listed in the
   *         order they appear. A duplicate route is a bug in the content file and is reported here
   *         rather than shipped twice.
   */
  render() {
    const text = [
      `# ${this.#d.profile.name}`,
      '',
      this.#quote(this.#summary()),
      '',
      this.#content.preamble.map((p) => this.#wrap(p)).join('\n\n'),
      '',
      this.#section(this.#content.headings.pages, this.#content.pages.map((p) => this.#page(p))),
      this.#rekhonSection(),
      this.#section(this.#content.headings.caseStudies, this.#caseStudies()),
      this.#section(this.#content.headings.journal, this.#journalEntries()),
      this.#section(this.#content.headings.contact, this.#contact()),
      this.#section(
        this.#content.headings.notes,
        this.#content.notes.map((n) => this.#proseBullet(this.#fill(n))),
      ),
      this.#section(this.#content.headings.sitemap, [`- ${this.#d.site.url}/sitemap.xml`]),
    ].join('\n')

    const duplicates = this.#routes.filter((r, i) => this.#routes.indexOf(r) !== i)
    if (duplicates.length) {
      throw new Error(`llms.txt: route listed twice: ${[...new Set(duplicates)].join(', ')}`)
    }
    return { text: `${text.replace(/\n{3,}/g, '\n\n').trimEnd()}\n`, routes: [...this.#routes] }
  }

  // --- sections -----------------------------------------------------------

  /** The blockquote summary: who this is, from `profile` and the current role in `experience`. */
  #summary() {
    const { profile, experience } = this.#d
    const [role] = experience
    const since = role.period.split(/[–-]/)[0].trim()
    return [
      `${profile.title} in ${profile.location}.`,
      profile.tagline,
      `${role.role} at ${role.company} since ${since}.`,
    ].join(' ')
  }

  /** Rekhon gets its own heading: four of this site's pages are about one project. */
  #rekhonSection() {
    const { rekhon, rekhonCounted } = this.#d
    const lines = [
      ...this.#content.rekhon.pages.map((p) => this.#page(p)),
      this.#bullet(
        `[Source](${rekhon.repo}): ${this.#fact('Licence')}. v${rekhonCounted.version} on the public branch.`,
      ),
      '',
      this.#wrap(this.#content.rekhon.caveat),
    ]
    return this.#section(this.#content.rekhon.heading, lines)
  }

  /** Every case study except Rekhon, which has its own section above. */
  #caseStudies() {
    return this.#d.projects
      .filter((p) => p.slug !== this.#d.rekhon.slug)
      .map((p) =>
        this.#page({
          route: `/works/${p.slug}`,
          label: p.name,
          note: p.metaDescription ?? p.blurb,
        }),
      )
  }

  /**
   * The published journal entries, with the record each one cites.
   *
   * Why:  these pages were missing from the hand-written file entirely, and they are the only pages
   *       on the site that link to a primary source a crawler can fetch and check.
   */
  #journalEntries() {
    return this.#d.publishedEntries.map((e) => {
      this.#routes.push(`/journal/${e.slug}`)
      const record = e.source?.href ? ` Record: ${e.source.href}` : ''
      return this.#bullet(
        `[${e.title}](${this.#abs(`/journal/${e.slug}`)}) · ${e.date}: ${e.metaDescription ?? e.summary}${record}`,
      )
    })
  }

  #contact() {
    const { profile, site } = this.#d
    const strip = (url) => url.replace(/\/$/, '')
    return [
      this.#bullet(`Email: ${profile.email}`),
      this.#bullet(`LinkedIn: ${strip(profile.socials.linkedin)}`),
      this.#bullet(`GitHub: ${strip(profile.socials.github)}`),
      this.#bullet(`Résumé: ${site.url}${profile.resumeUrl}`),
    ]
  }

  // --- derived facts ------------------------------------------------------

  /**
   * The counted half of a page's line.
   *
   * Why:  this is the whole point of generating the file. Every number a reader could check against
   *       a page is produced here from the same export the page renders from, so the two cannot
   *       disagree. A page with nothing to count gets its prose and no more.
   * Input:  route - the site-relative route.
   * Output: a sentence or two, or '' when the page has no figures.
   */
  #facts(route) {
    const d = this.#d
    if (route === '/works') {
      const areas = this.#list(d.projectCategories.filter((c) => c !== 'All'))
      return `${d.projects.length} ${this.#plural(d.projects.length, 'entry', 'entries')}, filterable by ${areas}.`
    }
    if (route === '/journal') {
      return `${d.publishedEntries.length} published, ${d.plannedEntries.length} planned. ${d.journalMeta.cadenceLabel}.`
    }
    if (route === '/rekhon') {
      return `v${d.rekhonCounted.version}. Includes a ${d.rekhon.faq.length}-question FAQ.`
    }
    if (route === '/works/rekhon') {
      const c = d.rekhonCounted
      return `Counted on the public branch at v${c.version} (${c.asOf}): ${c.tests} tests across ${c.testFiles} files, ${c.adrs} decision records, ${c.modules} Gradle modules.`
    }
    if (route === '/rekhon/docs') {
      const { documents, pages } = d.docTotals
      return `${documents} ${this.#plural(documents, 'document')}, ${pages} pages, each downloadable as a PDF. Copied from the repository at v${d.docsSource.version} on ${d.docsSource.copiedOn}.`
    }
    if (route === '/rekhon/design') {
      const { documents, pages } = d.designTotals
      return `${documents} ${this.#plural(documents, 'document')}, ${pages} pages.`
    }
    return ''
  }

  /**
   * The values the notes may quote by name.
   *
   * Why:  a note about the two version counts has to state them, and a note stating them by hand is
   *       the drift this file exists to remove. An unknown token fails the build (see `#fill`).
   */
  #buildTokens() {
    const d = this.#d
    const published = d.publishedEntries.length
    const compiled = d.publishedEntries.filter((e) => e.compiled).length
    const share =
      compiled === published
        ? published === 1
          ? 'The one published journal entry is'
          : `All ${published} published journal entries are`
        : `${compiled} of ${published} published journal entries are`
    return {
      compiledShare: share,
      caseTests: d.rekhonCounted.tests,
      caseAdrs: d.rekhonCounted.adrs,
      caseVersion: d.rekhonCounted.version,
      docsTests: d.docsSource.tests,
      docsAdrs: d.docsSource.adrs,
      docsVersion: d.docsSource.version,
      siteUrl: d.site.url,
    }
  }

  /** One of `rekhon.facts`, by label. An absent label is a data change, so it fails loudly. */
  #fact(label) {
    const found = this.#d.rekhon.facts.find((f) => f.label === label)
    if (!found) {
      throw new Error(`llms.txt: rekhon.facts has no "${label}" row`)
    }
    return found.value
  }

  // --- text helpers -------------------------------------------------------

  /** Substitute `{token}` values, failing on one that is not defined rather than shipping it. */
  #fill(text) {
    return text.replace(/\{(\w+)\}/g, (_, key) => {
      if (!(key in this.#tokens)) {
        throw new Error(`llms.txt: unknown token {${key}} in src/data/llms.js`)
      }
      return String(this.#tokens[key])
    })
  }

  /** A page's bullet, and the record that it was described, which is what the build gate reads. */
  #page({ route, label, note }) {
    this.#routes.push(route)
    const facts = this.#facts(route)
    return this.#bullet(`[${label}](${this.#abs(route)}): ${note}${facts ? ` ${facts}` : ''}`)
  }

  #section(heading, lines) {
    return `\n## ${heading}\n\n${lines.join('\n')}\n`
  }

  // Link lines stay on one line however long they get: a parser splitting on newlines should see
  // one link per line. Only prose is wrapped.
  #bullet(text) {
    return text.startsWith('- ') ? text : `- ${text}`
  }

  // A note is prose, so it wraps, with its continuation indented under the bullet.
  #proseBullet(text) {
    return `- ${this.#wrap(text, WRAP - 2).split('\n').join('\n  ')}`
  }

  #quote(text) {
    return this.#wrap(text, WRAP - 2)
      .split('\n')
      .map((l) => `> ${l}`)
      .join('\n')
  }

  #wrap(text, width = WRAP) {
    const lines = []
    let line = ''
    for (const word of text.split(/\s+/)) {
      if (line && `${line} ${word}`.length > width) {
        lines.push(line)
        line = word
      } else {
        line = line ? `${line} ${word}` : word
      }
    }
    if (line) lines.push(line)
    return lines.join('\n')
  }

  #list(items) {
    if (items.length < 2) return items.join('')
    return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
  }

  #plural(count, singular, plural = `${singular}s`) {
    return count === 1 ? singular : plural
  }

  #abs(route) {
    return `${this.#d.site.url}${route}`
  }
}
