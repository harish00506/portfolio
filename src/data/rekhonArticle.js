// The illustrated article at the top of /rekhon/docs.
//
// Why:  the page was a shelf of eleven PDFs. Useful if you already knew you wanted one, useless
//       otherwise — nobody downloads a 234-page blueprint to find out whether the app is
//       interesting. Somebody landing here should be able to read for four minutes, look at the
//       real screens, and understand what the thing does before a single file is offered.
// What: short sections in plain words, each with a picture taken from the app itself.
// Result: the page explains first and hands over files second.
//
// EVERY PICTURE IS A REAL ARTEFACT, not a mock-up. The phone screens are Paparazzi baselines the
// app's own test suite records and checks on every run, so a screen that changes without its
// picture changing turns that build red. The map is drawn from the navigation code. The diagram
// comes from the blueprint. Sources, in the AI_personal_cfo repository:
//   dashboard  feature/dashboard/src/test/snapshots/images/…DashboardScreenshotTest_loaded_light
//   advisor    feature/advisor/src/test/snapshots/images/…AdvisorScreenshotTest_comfortable_light
//   chat       feature/chat/src/test/snapshots/images/…ChatScreenshotTest_refused_light
//   add        feature/transactions/src/test/snapshots/images/…AddTransactionScreenshotTest_filled_light
//   ledger     feature/transactions/src/test/snapshots/images/…TransactionsScreenshotTest_loaded_light
//   consents   feature/settings/src/test/snapshots/images/…ConsentsScreenshotTest_mixed_light
//   map        docs/screens/flow/map.svg
//   diagram    docs/project-blueprint/diagrams/architecture.png
//
// Every figure quoted below is read off the picture beside it. If a baseline is re-recorded, read
// the numbers again rather than trusting these.
//
// Changelog:
//   2026-10-24 — Created. Baselines as committed at v0.13.10.

/**
 * The article, in reading order.
 *
 * Why:  the page renders one column of alternating text and pictures, so the data is a flat list
 *       rather than a nested tree. A section without a `figure` is simply text.
 * Input:  none — this is data.
 * Output: { id, heading, body[], figure? }[]. `body` is an array of paragraphs. `figure` is
 *         { src, alt, caption, kind } where kind is 'phone' (a narrow screen render, framed) or
 *         'wide' (a map or diagram that wants the full column).
 */
export const articleSections = [
  {
    id: 'one-number',
    heading: 'It opens on one number',
    body: [
      'Most money apps open on your balance. Your balance lies. It counts money that is already promised to the electricity bill, to rent, to the card you have not paid yet.',
      'This one opens on what is actually yours to spend. It starts with what came in, takes away what has already gone, takes away the bills that have not left your account yet, takes away what you said you wanted to save, and keeps a little back in case something surprises you. What survives all that is the number at the top. Here it is ₹34,600.',
      'Look under it and there is a small grey line: RULE-STS v1.0. That is the name of the sum that produced the figure, and its version. You can go and read it. Six months from now, that same rule and those same inputs will give that same answer, which is the whole reason the version number is printed there at all.',
    ],
    figure: {
      src: '/docs/img/dashboard.png',
      alt: 'The app’s first screen. A large green figure reads plus ₹34,600 under the words Safe to spend, with the income, the buffer, the money already spent and the bills still due listed underneath it, and the rule id RULE-STS v1.0 at the bottom.',
      caption: 'The first screen. Every figure on it carries the name of the rule that made it.',
      kind: 'phone',
    },
  },
  {
    id: 'shows-its-working',
    heading: 'It shows its working, the way you had to at school',
    body: [
      'Tell it what you want to buy and how much it costs, and it will not simply say yes or no. It checks seven separate things and shows you every one.',
      'Headphones, ₹30,000. Money available: fine, you would have ₹70,000 left. Rent and loan payments afterwards: fine, 30 percent. Your goals: worth knowing, because they would arrive about 60 days later than planned. Then it tells you plainly what the purchase does to you — your money goes from ₹1,00,000 to ₹70,000, and the time you could survive with no income at all drops from 2.4 months to 1.7.',
      'It says comfortable. It also shows you the one thing that is not comfortable about it, which is the part most apps would have left out.',
    ],
    figure: {
      src: '/docs/img/advisor.png',
      alt: 'A screen headed Can I afford this? showing a verdict of Comfortable for headphones at ₹30,000, with a list of what was checked: money available, EMIs and rent, and goals, each with its own figure, followed by what the purchase moves.',
      caption: 'Seven checks, each shown. The verdict is the small part; the working is the point.',
      kind: 'phone',
    },
  },
  {
    id: 'robot-cannot-count',
    heading: 'The robot is not allowed to do sums',
    body: [
      'There is an assistant you can ask questions. It is a language model, the same sort of thing that drafts emails. Those are good with words and quietly, confidently bad at arithmetic.',
      'So it is not allowed to do any. Every figure is worked out by the app’s own calculators first. The model only puts figures it was handed into a sentence. Before that sentence reaches you, something else reads every digit in it and checks it against what the calculators actually produced. A number the model invented does not get through. Nor does a rounded one: ₹34,600 softened into "about ₹35,000" is a different claim about your money, so it is refused just as firmly.',
      'In this picture somebody asked how much they could spend this month. The answer was: I do not have enough recorded yet to answer that honestly. An app that wanted to look clever would have guessed. This one would rather say nothing than say something it cannot stand behind.',
    ],
    figure: {
      src: '/docs/img/chat.png',
      alt: 'A chat screen headed Ask your CFO. The user asked how much can I spend this month, and the reply reads: I do not have enough recorded yet to answer that honestly. A line at the bottom says the assistant reads and explains, and never moves money.',
      caption: 'Refusing is the feature. The assistant may phrase a figure, never produce one.',
      kind: 'phone',
    },
  },
  {
    id: 'three-taps',
    heading: 'Writing down what you spent takes three taps',
    body: [
      'How much, what for, save. If recording a coffee is a chore you will stop doing it by Thursday, and an app nobody feeds is an app that knows nothing.',
      'It will also read a shop receipt from a photo, on the phone, with no internet. If you let it — and this is off until you turn it on — it will read the little messages your bank sends and turn them into entries you check before they count. Moving money between your own accounts is one record, not two, so the two halves can never drift apart and quietly invent money that does not exist.',
    ],
    figure: {
      src: '/docs/img/add.png',
      alt: 'The add-a-transaction screen with an amount typed in, a category chosen and a save button, showing how few fields there are.',
      caption: 'Amount, category, save.',
      kind: 'phone',
    },
  },
  {
    id: 'stays-on-the-phone',
    heading: 'Nothing about your money leaves the phone',
    body: [
      'There is no account to make and no password to forget, because there is no server on the other end to hold one. Everything lives on your phone, locked with a key the phone keeps in its own secure hardware. Turn off the internet and every part of the app still works, because nothing was ever asking the internet in the first place.',
      'Anything optional has its own switch, every switch starts off, and every one can be turned back off. The app records when you granted a thing and when you took it back. Turn one off and whatever depended on it stops immediately — not at the next restart.',
      'This is also why the code is public. "We do not send your money anywhere" is not a promise a shop listing can prove. Publishing the thing is what turns it into something a stranger can check rather than something you have to believe.',
    ],
    figure: {
      src: '/docs/img/consents.png',
      alt: 'A consents screen listing each optional permission with its own switch, most of them off, each row showing when it was granted or withdrawn.',
      caption: 'One switch per thing, all off to begin with, each with a date you can read.',
      kind: 'phone',
    },
  },
  {
    id: 'the-map',
    heading: 'Every place you can go, on one page',
    body: [
      'The app has 25 screens. The dashboard is the middle of everything: twelve of the other twenty-four hang straight off it, and nothing at all is more than three taps from where the app opens.',
      'This map was not drawn by hand. Every box and every arrow is read out of the app’s own navigation code, and every label in bold is the exact text you would see on the button. So the map cannot quietly stop matching the app. If somebody adds a screen nobody can reach, or writes up a screen the code never opens, the document refuses to build.',
    ],
    figure: {
      src: '/docs/img/map.svg',
      alt: 'A map of the app. A row at the top shows how a session starts: open the app, app lock, onboarding, dashboard. Below it the dashboard sits above twelve destinations, each one tap away, with the add-transaction button floating over every screen.',
      caption: 'Drawn from the navigation code, so the picture cannot disagree with the app.',
      kind: 'wide',
    },
  },
  {
    id: 'underneath',
    heading: 'What it looks like underneath',
    body: [
      'The app is built in 60 separate pieces, and the arrows between them only ever point one way. The pieces that do the arithmetic sit at the bottom, and they are not allowed to know anything about Android at all. That sounds like fussiness until you see what it buys. The money sums can be tested on a laptop in seconds, with no phone plugged in anywhere.',
      'That rule is not a note in a document somebody might read. It is a test. Point one arrow the wrong way and the build stops. Six more checks work the same way: write a rupee as a decimal number and the build stops, read the clock directly in the wrong place and the build stops, put somebody’s money into a log line and the build stops.',
      'That is the honest summary of the whole project. The rules are not written down and hoped for. They are the things that break.',
    ],
    figure: {
      src: '/docs/img/architecture.png',
      alt: 'The architecture diagram: boxes for the app shell, the feature modules, the domain engines and the data layer, with arrows running one way only, from features down to domain and then to data and core.',
      caption: 'The 60 pieces, and the one-way arrows a test refuses to let you break.',
      kind: 'wide',
    },
  },
]

/**
 * Headings for the on-page contents list.
 *
 * Why:  the article sits above eleven document cards, so a reader needs to see what is here and
 *       jump to it.
 * Input:  none (reads `articleSections`).
 * Output: { id, heading }[] in reading order.
 */
export const articleContents = articleSections.map((s) => ({ id: s.id, heading: s.heading }))
