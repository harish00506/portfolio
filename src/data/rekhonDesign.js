// Content for /rekhon/design — three proposals for redrawing the app, and the map of the third.
//
// Why:  these sat at the bottom of /rekhon/docs among the as-built documents, which put two
//       different kinds of thing on one page. The others describe the app that exists; these three
//       argue about an app that does not. A reader looking for what Rekhon *is* had to scroll past
//       four proposals for what it might become, and the page was the longer for it.
// What: the three design proposals, the map of the third, and the framing they need.
// Result: one page that is clearly about ideas rather than record.
//
// NONE OF THESE HAS CHANGED A LINE OF APPLICATION CODE, and the page says so more than once,
// because a reader who mistakes a proposal for the shipped app has been misled by the layout.
// Page counts came from `pdfinfo`; the premises and screen counts are each PDF's own first page
// and docs/design/README.md in the AI_personal_cfo repository.
//
// Changelog:
//   2026-10-24 — Split out of rekhonDocs.js, unchanged except for this framing.

/** Page copy and search metadata. */
export const designMeta = {
  // 43 chars + ' | Harish G' = 54, inside the prerender's 60-char title gate.
  metaTitle: 'Three redesigns of an Indian finance app',
  // 155 chars, inside the 160-char gate.
  metaDescription:
    'Three ways to redraw the same Android money app: one answer per screen, a queue of decisions, or an instrument panel. All 25 screens, argued and drawn.',

  h1: 'Three ways to redraw the same app',
  kicker: 'Rekhon · design proposals · none adopted',

  tagline:
    'The same 25 screens, drawn three times, each version arguing with the ones before it. No application code was changed to make any of them.',

  intro: [
    'Everything on the documents page describes the app as it is. These do the opposite. They are three answers to one question — what should this app feel like to use? — and each is drawn against the ones before it, screen by screen, so the comparison is about shape rather than taste.',
    'They use the same colours, down to the hex, on purpose. If two versions look different it is because they ask something different of you, not because one got a nicer palette.',
    'None of them has been adopted, and none has changed a line of application code. Adopting any would need a written decision about the navigation and a re-recording of every screenshot the build checks. They exist to be argued with.',
  ],

  // Repeated from the documents page so a card has the same shape wherever a reader meets it.
  form: [
    { label: 'What it is', hint: 'the proposal in one or two plain sentences' },
    { label: 'Why I wrote it', hint: 'the question it was trying to answer' },
    { label: 'Like this', hint: 'an everyday thing it resembles' },
    { label: 'What\u2019s inside', hint: 'the real counts, read off the document itself' },
  ],
}

/**
 * The proposals, in the order they were made.
 *
 * Why:  each one argues with the ones before it, so the order is the argument.
 * Input:  none — this is data.
 * Output: the same shape a document card takes on /rekhon/docs.
 */
export const designDocs = [
    {
      slug: 'design-v2',
      title: 'Idea one · one answer per screen',
      href: '/docs/rekhon-design-v2.pdf',
      pages: 34,
      size: '4.7 MB',
      source: 'docs/design/AI_Personal_CFO_redesign.pdf',
      what: 'All 25 screens redrawn so that each one leads with a single big figure and answers exactly one question.',
      why: 'The app had grown screens that tried to show everything at once. I wanted to see what happened if a screen was only allowed to say one thing.',
      like: 'Tidying a bedroom by giving every toy one box, then putting the box you actually want on top.',
      inside:
        '25 screens redrawn, with the reason written beside every decision. It answers “how am I doing?” Not one line of app code was changed to produce it.',
    },
    {
      slug: 'design-v3',
      title: 'Idea two · one queue of decisions',
      href: '/docs/rekhon-design-v3.pdf',
      pages: 45,
      size: '7.9 MB',
      source: 'docs/design/AI_Personal_CFO_v3.pdf',
      what: 'The same app drawn as a single queue of things that need you today, instead of a set of dashboards to read.',
      why: 'Nearly every money app hands you pages to look at. I wanted to try one that hands you a list to clear, and find out which I would rather open on a Tuesday.',
      like: 'Swapping a noticeboard for a to-do list you can tick off.',
      inside:
        '31 screens, answering “what needs me?” It copies idea one’s colours byte for byte, so putting the two side by side compares their shape and not their paint. Argued against idea one on every screen.',
    },
    {
      slug: 'design-v4',
      title: 'Idea three · the instrument panel',
      href: '/docs/rekhon-design-v4.pdf',
      pages: 47,
      size: '10.6 MB',
      source: 'docs/design/AI_Personal_CFO_v4.pdf',
      what: 'The same app again, drawn the way the money apps Indians already open every day are drawn: dense, tabular, full of charts.',
      why: 'Kite, Groww and Coin have already taught this audience what a money app looks like. A design that ignores that vocabulary is asking its users to learn the job twice.',
      like: 'Writing in the handwriting everybody at school already reads.',
      inside:
        '34 screens: all 25 the app ships, plus nine that those apps have and this one is missing. It answers “let me look.” Its closing section argues when its own approach would be the wrong one, and names the hybrid worth considering instead.',
    },
    {
      slug: 'design-v4-flow',
      title: 'The map of idea three',
      href: '/docs/rekhon-design-v4-flow.pdf',
      pages: 23,
      size: '3.3 MB',
      source: 'docs/design/AI_Personal_CFO_v4_flow.pdf',
      what: 'The zoo map again, drawn for the third idea — a version of the app that does not exist yet.',
      why: 'A pile of mockups can look finished and still not join up anywhere. Asking the proposal the same question I had asked the real app was the cheapest way to find the holes.',
      like: 'Checking a new bus timetable actually gets you home before you buy the ticket.',
      inside:
        'Five tabs, 54 arrows and ten journeys — and which of those arrows a mockup actually draws, as opposed to which are still only lines on a diagram.',
    },
]

/**
 * Totals, counted rather than written down.
 *
 * Input:  none (reads `designDocs`).
 * Output: { documents, pages } — integers.
 */
export const designTotals = {
  documents: designDocs.length,
  pages: designDocs.reduce((sum, d) => sum + d.pages, 0),
}
