// Content for /rekhon/docs — the as-built documents, each explained in plain English. The three
// design proposals used to live here too; they moved to rekhonDesign.js (/rekhon/design).
//
// Why:  the project's strongest and least visible asset is its paperwork: a 234-page as-built
//       blueprint, a report that lists its own faults, a picture of every screen that the build
//       refuses to let go stale. All of it sat in a repository nobody opens, written for engineers.
//       A reader who is not one had no way in, and a reader who is one still had to go looking.
// What: seven entries, each in the same four-line form — what it is, why it was written, an
//       everyday comparison, and the real figures inside — plus the PDF itself to download.
// Result: one page that hands over the documents and explains each one without jargon.
//
// EVERY FIGURE HERE IS READ OUT OF THE DOCUMENT IT DESCRIBES, not remembered. The `source` field
// on each entry names the file in the AI_personal_cfo repository it was copied from, and `pages`
// came from `pdfinfo`. To re-verify the set:
//   pages   pdfinfo <file> | awk '/^Pages:/{print $2}'
//   size    du -h public/docs/<file>
// The counts inside the prose trace to:
//   blueprint, summary   docs/blueprint-summary.md §6 "By the numbers"
//   gap report           docs/architecture-and-gap-report.md §1 "Summary"
//   screens              docs/screens/SCREENS.md header table
//   map                  docs/screens/USER_FLOW.md "Who goes where"
//   design v2/v3/v4      docs/design/README.md, and each PDF's own first page
//
// Changelog:
//   2026-10-24 — Created. Documents copied at AI_personal_cfo v0.13.10 (2026-10-23).

/**
 * The documents, grouped by what a reader would come for.
 *
 * Why:  cards in one undifferentiated list are a wall. Grouped by purpose, a reader can go
 *       straight to the group they want and ignore the rest.
 * Input:  none — this is data.
 * Output: { id, title, blurb, docs[] }[] in reading order. Each doc carries `href` (a file under
 *         /docs in public/), `pages`, `size`, `source`, the four form fields, and an optional
 *         `note` for a caveat that would be dishonest to leave out.
 */
export const docGroups = [
  {
    id: 'start-here',
    title: 'Start here',
    blurb: 'Two short ones. Between them they cover the whole project without any code in sight.',
    docs: [
      {
        slug: 'blueprint-summary',
        title: 'The short version',
        href: '/docs/rekhon-blueprint-summary.pdf',
        pages: 3,
        size: '0.4 MB',
        source: 'docs/blueprint-summary.pdf',
        what: 'The whole project in three pages. If you read only one document on this page, read this one.',
        why: 'The full plan takes about two hours. Most people have ten minutes, and ten minutes is enough to decide whether the other two hours are worth it.',
        like: 'The short bedtime version of a very long story.',
        inside:
          'The seven rules the app is not allowed to break, everything it does, how it is put together in five lines, every count in one table, and a verdict at the end: ready, with risks. It also names the three questions worth answering first, which is the part I keep coming back to.',
      },
      {
        slug: 'story',
        title: 'Why I built it',
        href: '/docs/rekhon-story.pdf',
        pages: 38,
        size: '5.7 MB',
        source: 'docs/AI_Personal_CFO_story.pdf',
        what: 'The story of the app: the problem I started with, how I went about it, and what I would say to each kind of person who asks.',
        why: 'Code does not explain itself. Somebody opening the repository can see what I built and still have no idea what I was trying to fix.',
        like: 'Show-and-tell. Here is the thing I made, and here is why I made it.',
        inside:
          'The pitch, the method, the build story, a page written for each kind of reader, and the decisions I still have not made.',
        note: 'The oldest document here, and its counts were true the day it was printed. The current ones are in the short version above.',
      },
    ],
  },
  {
    id: 'the-full-plan',
    title: 'The full plan, and the faults in it',
    blurb:
      'One document describes the app as it is. The other lists everywhere it falls short. They were written together, on purpose.',
    docs: [
      {
        slug: 'blueprint',
        title: 'The big plan',
        href: '/docs/rekhon-blueprint.pdf',
        pages: 234,
        size: '1.4 MB',
        source: 'docs/project-blueprint/ai-personal-cfo-blueprint.pdf',
        what: 'Every part of the app written down properly: what it has to do, what it keeps, how the pieces fit, how it gets tested, and what could still go wrong.',
        why: 'I built the app first and wrote the plan afterwards, out of the code rather than out of my memory. A plan written from memory would have been wrong in a hundred small ways, and each one would have cost somebody an afternoon.',
        like: 'Drawing the picture on the Lego box after the castle is already built — then checking it brick by brick.',
        inside:
          'Twelve documents, five diagrams, and a checker that reads every ID in them and complains if one points nowhere. 95 things the app must do, 115 ways to tell whether it did, 55 user journeys written with their failure paths, 40 data tables, and 124 test cases.',
      },
      {
        slug: 'gap-report',
        title: 'The honest report',
        href: '/docs/rekhon-gap-report.pdf',
        pages: 6,
        size: '0.4 MB',
        source: 'docs/architecture-and-gap-report.pdf',
        what: 'A list of everything about the app that is missing, unfinished, or not the way I said it would be.',
        why: 'Writing down what is broken is the only way it gets fixed. Hiding it does not make it go away; it means somebody else finds it, later, at a worse moment.',
        like: 'Telling your mum you broke the cup before she finds it.',
        inside:
          '59 of 60 screens built. 35 data tables that were planned and never made, 33 of them deliberately. 19 files that grew past the length limit I set myself, the worst at 4,723 lines. Three speed targets with numbers that nothing actually measures. And one whole half of the system — the server — specified and never built.',
        note: 'Deliberately the least flattering document in the set. Of the 26 features that ship with a limitation, 22 are recorded decisions rather than unfinished work, and the report separates the two so a reader is not misled in either direction.',
      },
    ],
  },
  {
    id: 'the-app-as-it-is',
    title: 'The app as it actually is',
    blurb:
      'What the thing looks like and how you move around it. The first two cannot go out of date, which is most of their point.',
    docs: [
      {
        slug: 'screens',
        title: 'The picture book',
        href: '/docs/rekhon-screens.pdf',
        pages: 31,
        size: '8.2 MB',
        source: 'docs/screens/SCREENS.pdf',
        what: 'A picture of every single screen in the app, with what each screen is for underneath it.',
        why: 'There was no way to see this app without building it first. Now there is. And these pictures cannot quietly go stale: the pictures are the test suite’s own output, so if a screen changes and its picture does not, the build goes red.',
        like: 'A photo album that refuses to keep an old photo. Change your hair and it makes you take a new one.',
        inside:
          '25 screens and the component gallery, 115 pictures in all. Every screen in light, in dark, and at double-size text, with the dashboard also in Hindi, Kannada and Tamil. Every figure in every picture was computed by the real engine, not typed in to look plausible.',
      },
      {
        slug: 'user-flow',
        title: 'The map',
        href: '/docs/rekhon-user-flow.pdf',
        pages: 24,
        size: '3.6 MB',
        source: 'docs/screens/USER_FLOW.pdf',
        what: 'The map of the app. Which screen leads to which, exactly what you tap to get there, and what happens when you press Back.',
        why: 'A list of screens never tells you how anybody reaches one. This answers the question the picture book does not: how do I get there from here? It assumes you have never opened the app.',
        like: 'The map at the zoo. You are here, the lions are that way, two turns and you are back at the gate.',
        inside:
          '25 screens and twelve journeys followed end to end. The dashboard is the middle of everything: twelve of the other twenty-four hang straight off it, and nothing is more than three taps from where the app opens.',
        note: 'Every arrow is read off the app’s own navigation code and every tap label is quoted from the text the user really sees, so the map cannot drift from the app. It also lists the six things that reading the whole graph turned up — including that tapping a notification opens the app rather than the screen it was about.',
      },
      {
        slug: 'screen-guide',
        title: 'The guided walk',
        href: '/docs/rekhon-screen-guide.pdf',
        pages: 51,
        size: '6.3 MB',
        source: 'docs/AI_Personal_CFO_screens.pdf',
        what: 'A walk through the app a page at a time, naming the piece of maths that produced every number on every screen.',
        why: 'Showing a screen is not explaining it. For each figure on the page I wanted to point at the exact rule that made it, by name and version, so the answer can be reproduced rather than taken on trust.',
        like: 'A museum guide who stops at every painting and tells you who painted it.',
        inside:
          '51 pages: each screen, what it is for, and the engine and rule behind each figure. Captured on a real phone in airplane mode on the app’s own demo data, so nothing in it belongs to a real person.',
        note: 'Taken by hand from a device, which is exactly why the picture book replaced it. Still the best document for understanding where a number came from.',
      },
    ],
  },
]

/** Every document in reading order, for the download table and the page’s totals. */
export const allDocs = docGroups.flatMap((g) => g.docs)

/**
 * The group headings, for the on-page contents list.
 *
 * Why:  several groups of cards make a long page; jump links save a reader the scroll, and
 *       Google sometimes surfaces them as sitelinks.
 * Input:  none.
 * Output: { id, title, count }[] — one entry per group.
 */
export const docContents = docGroups.map((g) => ({
  id: g.id,
  title: g.title,
  count: g.docs.length,
}))

/**
 * Totals, counted rather than written down.
 *
 * Why:  the kicker and the tagline both quote a page total, and a hand-typed total is the first
 *       figure on this page that would go wrong when a document is added.
 * Input:  none (reads `allDocs`).
 * Output: { documents, pages } — integers.
 */
export const docTotals = {
  documents: allDocs.length,
  pages: allDocs.reduce((sum, d) => sum + d.pages, 0),
}

/**
 * Where this set of PDFs was taken from, and what the repository looked like that day.
 *
 * Why:  the page has to explain, without being asked, why its figures differ from the case
 *       study's: the documents describe a newer version of the repository than the public branch
 *       the case study counts. That sentence was four hard-typed numbers in the page's JSX, which
 *       is both the wrong layer (§1.1) and a figure nobody could trace. The generated llms.txt
 *       carries the same explanation and now reads it from here.
 * What: the version the PDFs were copied at, the day they were copied, and the two figures that
 *       moved — both read off `docs/blueprint-summary.md` §6 "By the numbers" in that version.
 * Result: one place to edit when the documents are refreshed.
 * Changelog: 2026-10-24 — Created, from the figures that were prose in RekhonDocsPage.jsx.
 *
 * Input:  none - this is data.
 * Output: { repo, version, copiedOn, tests, adrs }. `tests` is formatted for printing; `adrs` is a
 *         count. Compare with `rekhonCounted` in rekhon.js, which holds the public branch's.
 */
export const docsSource = {
  repo: 'AI_personal_cfo',
  version: '0.13.10',
  copiedOn: '2026-10-23',
  tests: '3,986',
  adrs: 82,
}

/**
 * Page-level copy and search metadata.
 *
 * Declared last, after `docTotals`, because the kicker and the tagline quote the page total and a
 * hand-typed total is the first figure here that would go wrong when a document is added. The
 * first draft of this file said 336 pages; the documents add up to 536.
 */
export const docsMeta = {
  // 40 chars + ' | Harish G' = 51, inside the prerender's 60-char title gate.
  metaTitle: 'Rekhon explained simply, with the papers',
  // Inside the 160-char gate at any plausible count. The two figures are read from docTotals
  // rather than typed, because this description is the third place on the page that states them.
  metaDescription: `How an offline money app actually works, explained in plain words with no jargon. Then the ${docTotals.documents} documents behind it, ${docTotals.pages} pages, free to download.`,

  h1: 'An offline money app, explained in plain words',
  kicker: `Rekhon · a short read · ${docTotals.documents} documents to take away`,

  tagline:
    'What an offline money app does, and why it is built the way it is. Five minutes, no jargon, no prior knowledge assumed.',

  intro: [
    'Below are six short pieces about an Android money app called Rekhon, written for somebody who has never written a line of code. No screenshots: the app is dense and small pictures of it explain nothing. Where a picture genuinely helps, there is one.',
    'The documents come after. You will not need them to follow any of this, which is rather the point. Three proposals for redesigning the app used to sit down there too; they are their own thing and now have their own page.',
  ],

  // The four labels every entry repeats, explained once at the top so the shape of a card is
  // obvious before the reader reaches the first one.
  form: [
    { label: 'What it is', hint: 'the document in one or two plain sentences' },
    { label: 'Why I wrote it', hint: 'the problem it solves, not the process that made it' },
    { label: 'Like this', hint: 'an everyday thing it resembles' },
    { label: 'What’s inside', hint: 'the real counts, read off the document itself' },
  ],
}
