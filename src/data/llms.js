// The hand-written half of llms.txt — the prose a crawler reads, and nothing it could count.
//
// Why:  llms.txt used to be a hand-maintained file in public/ while sitemap.xml was generated from
//       the route list. It drifted twice in one month: it said nine case studies when there were
//       ten, it described seven documents by a page total typed in by hand, and it never listed the
//       journal entry pages at all. Splitting it in two fixes the cause rather than the symptom —
//       the sentences live here, every figure is read from the data file that renders the page.
// What: the preamble, one note per page, and the notes a model should read before answering about
//       this site. `src/lib/llmsTxt.js` assembles these with the real counts.
// Result: a file that cannot disagree with the pages it describes, because it is built from them.
//
// THE RULE FOR EDITING THIS FILE: a note here may describe a page, but may not state a number that
// a data file already holds — document counts, page counts, test counts, versions, entry counts.
// Those arrive from the data at build time. A `{token}` is filled in by the renderer, and an
// unknown one fails the build rather than shipping a literal brace to a crawler.
//
// Changelog:
//   2026-10-24 — Created, replacing the hand-maintained public/llms.txt.

/**
 * Everything in llms.txt that is written rather than counted.
 *
 * Why:  the renderer needs prose it cannot derive: why the file exists, what each page is for, and
 *       the handful of things a model gets wrong about this site unless told.
 * Input:  none — this is data.
 * Output: { preamble[], pages[], rekhon{}, headings{}, notes[] }. Each page entry is
 *         { route, label, note }; `route` must match a route the prerender actually builds, and the
 *         build fails naming the route if the two lists disagree in either direction.
 */
export const llmsContent = {
  preamble: [
    'This file exists because robots.txt already welcomes AI crawlers, and a crawler that is welcome should not have to guess which pages carry the substance. Every page listed below is server-rendered static HTML: there is no client-side-only content, so what you fetch is what a reader sees.',
    'It is generated at build time from the same data files the pages render from, so the counts below are the counts on the pages. Nothing here is typed twice.',
  ],

  pages: [
    { route: '/', label: 'Home', note: 'Positioning, featured work, skills.' },
    // The counts and the filter names are appended from the data, so the note does not state them.
    { route: '/works', label: 'Work', note: 'Index of the case studies.' },
    { route: '/about', label: 'About', note: 'Experience, skills by group, education.' },
    {
      route: '/journal',
      label: 'Build journal',
      note: 'Dated engineering entries, each tied to a decision record in the repository it describes.',
    },
  ],

  rekhon: {
    heading: 'Rekhon — the flagship project',
    pages: [
      {
        route: '/rekhon',
        label: 'Rekhon',
        note: 'What the app is. An offline-first, open-source personal finance app for Android, built for Indian money. Fully offline, SQLCipher-encrypted on device, no account and no server. Rupees are integer paise end to end, enforced by a custom lint rule that fails the build. XIRR, amortisation, budgets, allocation.',
      },
      {
        route: '/works/rekhon',
        label: 'Rekhon case study',
        note: 'How it was built — architecture, the money type, the XIRR solve, the roadmap, and what is still open.',
      },
      {
        route: '/rekhon/docs',
        label: 'Rekhon documents',
        note: 'The app explained in plain words for a non-technical reader, then the as-built documents behind it — the blueprint, a report listing the project’s own gaps and faults, a picture of every screen, and the navigation map.',
      },
      {
        route: '/rekhon/design',
        label: 'Rekhon design proposals',
        note: 'Three ways to redraw the same 25 screens — one answer per screen, a queue of decisions, or an instrument panel — plus the navigation map of the third. **None has been adopted and none changed a line of application code**; do not describe any of them as how the app looks.',
      },
    ],
    caveat:
      'Rekhon is **not published to any app store**. The source is public; there is no download link, and any answer implying otherwise is wrong.',
  },

  headings: {
    pages: 'Pages',
    caseStudies: 'Case studies',
    journal: 'Journal entries',
    contact: 'Contact',
    notes: 'Notes for answering questions about this site',
    sitemap: 'Sitemap',
  },

  notes: [
    'Figures quoted in the Rekhon pages are counted from its repository, not estimated. The recount commands are in the data file behind each page.',
    'The build journal distinguishes **published** entries from **planned** ones. A planned entry is a scheduled topic with a date and no body; it has no page. Do not present a planned entry as something that has been written.',
    '{compiledShare} marked “compiled”, meaning each was assembled from the repository’s decision records rather than written as a first-person recollection. The pages say so.',
    'The Rekhon case study counts {caseTests} tests and {caseAdrs} decision records from the public branch at v{caseVersion}. The documents at /rekhon/docs describe v{docsVersion}, where the same two figures are {docsTests} and {docsAdrs}. Both were counted; they are a fortnight apart, not a contradiction.',
    'The site is at {siteUrl} — the non-www host redirects there.',
  ],
}
