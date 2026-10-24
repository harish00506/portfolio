// The short article at the top of /rekhon/docs.
//
// Why:  this page has been wrong twice. First it was eleven download cards, which only help a
//       reader who already knows they want a document. Then it was seven sections each with a
//       phone screenshot, which measured 14,000px tall and 18 minutes of reading while the page
//       itself promised four — and the screenshots, shrunk to fit a column, read as grey noise
//       instead of explaining anything.
// What: six short sections. One worked sum a reader can follow line by line, one map, no app
//       screenshots.
// Result: a page somebody who has never written code can finish, and come away knowing what the
//         app does and why it is built the way it is.
//
// The sum in section one is real and it adds up: 80000 - 4000 - 12400 - 18000 - 2000 - 9000 =
// 34600. It is read off the dashboard baseline the app's test suite records
// (feature/dashboard/src/test/snapshots/images/…DashboardScreenshotTest_loaded_light.png). If that
// baseline is re-recorded, re-read these figures rather than trusting them.
//
// The map is docs/screens/flow/map.svg in the AI_personal_cfo repository, drawn from the
// navigation code rather than by hand.
//
// Changelog:
//   2026-10-24 — Created, then rewritten the same day: app screenshots removed, text cut from
//                1,022 words to roughly 600, the dashboard screenshot replaced by the sum itself.

/**
 * The article, in reading order.
 *
 * Why:  the page renders one column. A section may carry at most one visual, and most carry none,
 *       because the writing is meant to do the work.
 * Input:  none — this is data.
 * Output: { id, heading, body[], sum?, figure? }[].
 *         `sum`    - { caption, rows: [label, value][], total: [label, value] } rendered as a
 *                    small table. Cheaper than a picture and legible at any size.
 *         `figure` - { src, alt, caption } for the one real diagram on the page.
 */
export const articleSections = [
  {
    id: 'one-number',
    heading: 'It opens on one number',
    body: [
      'Most money apps open on your bank balance. Your balance lies to you. It happily counts money that already belongs to the landlord, to the electricity bill, and to the card you have not paid off yet.',
      'This one opens on what is genuinely yours to spend this month, and it shows you the whole subtraction:',
    ],
    sum: {
      caption:
        'Under that figure the app prints RULE-STS v1.0 — the name and version of the sum that made it. Feed the same numbers to the same rule in a year and you get the same answer. That is why the version is printed at all.',
      rows: [
        ['Money that came in', '₹80,000'],
        ['Already spent', '−₹12,400'],
        ['Payments due to leave', '−₹18,000'],
        ['Bills not yet paid', '−₹2,000'],
        ['Saving you asked for', '−₹9,000'],
        ['Kept back for surprises', '−₹4,000'],
      ],
      total: ['Safe to spend', '₹34,600'],
    },
  },
  {
    id: 'shows-its-working',
    heading: 'It shows its working, the way you had to at school',
    body: [
      'Tell it you want ₹30,000 headphones and it will not just say yes. It checks seven things and shows you all seven. Money left afterwards: ₹70,000, fine. Rent and loan payments: 30 percent, fine. Your savings goals: they would arrive about 60 days later than planned, which it calls worth knowing rather than fine.',
      'Then the part most apps leave out. The time you could survive with no income at all drops from 2.4 months to 1.7. It still says yes. It just will not pretend the purchase was free.',
    ],
  },
  {
    id: 'robot-cannot-count',
    heading: 'The robot is not allowed to do sums',
    body: [
      'There is an assistant you can ask questions. It is the same kind of thing that drafts your emails: good with words, and quietly, confidently terrible at arithmetic.',
      'So it is banned from doing any. The app works every figure out first; the assistant only wraps figures it was handed in a sentence. Then another piece of code reads every digit in that sentence and checks it against what was actually worked out. A number the assistant made up never reaches you. Neither does a rounded one, because ₹34,600 softened into "about ₹35,000" is a different claim about your money.',
      'Ask it something it cannot back up and it says so. One real answer from the app reads: I do not have enough recorded yet to answer that honestly. It would rather say nothing than say something it cannot stand behind.',
    ],
  },
  {
    id: 'stays-on-the-phone',
    heading: 'Nothing about your money leaves the phone',
    body: [
      'There is no account to make and no password to lose, because there is no server on the other end holding one. It all sits on your phone, locked with a key the phone keeps in its own secure chip. Switch off the internet and everything still works, because nothing was asking the internet in the first place.',
      'Anything optional — reading your bank text messages, fetching gold prices — has its own switch. Every switch starts off. Turn one off again and whatever depended on it stops at once, not at the next restart.',
      'This is also why the code is public. "We do not send your money anywhere" is not something a shop listing can prove. Publishing it is what turns the promise into something a stranger can check.',
    ],
  },
  {
    id: 'the-map',
    heading: 'Every place you can go, on one page',
    body: [
      'There are 25 screens. The dashboard is the middle of everything — twelve of the other twenty-four hang straight off it, and nothing at all is more than three taps from where the app opens.',
      'Nobody drew this map. Every box and arrow is read out of the app’s own navigation code, so it cannot quietly stop matching the app. Add a screen nobody can reach, or describe one the code never opens, and the document refuses to build.',
    ],
    figure: {
      src: '/docs/img/map.svg',
      alt: 'A map of the app. Along the top: open the app, app lock, onboarding, dashboard. Below, the dashboard sits above twelve destinations each one tap away, with the add-transaction button floating over every screen.',
      caption:
        'Drawn from the navigation code, so the picture cannot disagree with the app. Its footer mentions a table that follows — that is in the PDF, where this picture comes from.',
    },
  },
  {
    id: 'underneath',
    heading: 'The rules are not notes. They are things that break.',
    body: [
      'The app is built in 60 separate pieces with the arrows between them pointing one way only. The pieces that do the arithmetic are not allowed to know anything about Android, which sounds like fussiness until you notice what it buys: the money sums can be tested on a laptop in seconds, with no phone involved.',
      'None of that is written down and hoped for. Write a rupee as a decimal and the build stops. Read the clock in the wrong place and the build stops. Put somebody’s money in a log line and the build stops. That is the honest summary of the whole project, and it is why the documents below are worth anything.',
    ],
  },
]

/**
 * Headings for the on-page contents list.
 *
 * Input:  none (reads `articleSections`).
 * Output: { id, heading }[] in reading order.
 */
export const articleContents = articleSections.map((s) => ({ id: s.id, heading: s.heading }))
