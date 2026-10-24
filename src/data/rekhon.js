// Long-form content for /rekhon — the project's own page, as opposed to the case study at
// /works/rekhon which is about building it.
//
// Why:  "Rekhon" is a coined name with no search volume, and the case study's headings are STAR
//       labels that carry no search terms. Someone looking for what this app actually is — an
//       offline, open-source personal finance app for India — had nothing to land on. This page is
//       that landing surface, written around the words people actually type.
// What: the H1, the sections, the verified facts and the FAQ, all read out of the repository.
// Result: one page that explains the project in depth and can be indexed on its own terms.
//
// EVERY NUMBER HERE IS FROM THE PUBLIC TREE (origin/main at v0.13.9), counted rather than
// remembered. If you change one, recount it:
//   modules   git show origin/main:settings.gradle.kts | grep -cE '^\s*include\('
//   tests     git grep -h -c '@Test' origin/main -- '*.kt' | awk '{s+=$1} END {print s}'
//   adrs      git ls-tree -r --name-only origin/main -- docs/adr | wc -l
//
// Changelog:
//   2026-10-11 — Created. Facts counted on origin/main: 60 modules, 3,822 tests across 355 files,
//                77 files in docs/adr, v0.13.9.

const REPO = 'https://github.com/harish00506/Rekhon'

/**
 * The counted figures, in one place.
 *
 * Why:  these numbers were prose in four different sentences across two files, and llms.txt quoted
 *       them from memory on top of that — which is how it came to state a version the repository had
 *       moved past. The recount commands are in this file's header; this is where their answers go,
 *       so a recount is one edit and every sentence that quotes one follows.
 * What: what was true on the public tree the day it was counted.
 * Result: the page, the structured data and the generated llms.txt cannot state three different
 *         test counts.
 * Changelog: 2026-10-24 — Created, from the figures already in this file's changelog.
 *
 * Input:  none - this is data.
 * Output: { version, asOf, modules, tests, testFiles, adrs }. `tests` is a formatted string because
 *         every reader of it prints it; the rest are what they look like.
 */
export const rekhonCounted = {
  version: '0.13.9',
  asOf: '2026-10-11',
  modules: 60,
  tests: '3,822',
  testFiles: 355,
  adrs: 77,
}

export const rekhon = {
  slug: 'rekhon',
  name: 'Rekhon',
  repo: REPO,
  caseStudy: '/works/rekhon',
  // Feeds `dateModified` in the MobileApplication schema — the date of the last commit on the
  // public branch, not the day this page was edited.
  updated: '2026-10-11',

  // 46 chars + ' | Harish G' = 57, inside the prerender's 60-char gate.
  metaTitle: 'Rekhon: Offline Personal Finance App for India',
  // 157 chars, inside the 160-char gate.
  metaDescription:
    'Open-source Android personal finance app for India. Fully offline, encrypted on device, no account. Exact paise maths, XIRR, budgets that show their working.',

  // The H1 is not the brand name on its own: nobody searches a word they have not heard.
  h1: 'An offline, open-source personal finance app for India',
  kicker: 'Open source · AGPL-3.0 · Android',

  tagline:
    'A full-time CFO for your money, that runs entirely on your phone — and shows the working behind every figure.',

  intro: [
    'Rekhon is an Android personal finance app that runs entirely on your phone. There is no account to create, no server to sign in to, and no sync. Every core feature works in airplane mode, the database is encrypted on the device, and nothing about your money leaves it without explicit permission you can withdraw.',
    'It is also an app that shows its working. Most finance apps hand you a number — a health score, a projection, a “you can afford this” — with no statement of what was measured or what it was measured against. Rekhon cites the rule that produced each figure, by id and version, so an answer it gave six months ago can still be reproduced today.',
    'The source is public because the central claim — that nothing about your money leaves your device — is not something a store listing can prove. Publishing the code is what makes it checkable rather than marketed.',
  ],

  // Rendered as a definition list and reused in the MobileApplication structured data.
  facts: [
    { label: 'Platform', value: 'Android (Kotlin, Jetpack Compose)' },
    { label: 'Version', value: `v${rekhonCounted.version} — epics 0–13 complete` },
    { label: 'Account required', value: 'None. No sign-up, no server' },
    { label: 'Network', value: 'Optional. Every core feature works offline' },
    { label: 'Storage', value: 'On device, SQLCipher-encrypted' },
    { label: 'Licence', value: 'AGPL-3.0 with a linking exception, plus a commercial option' },
    { label: 'Price', value: 'Free — the source is public' },
    { label: 'Availability', value: 'Source only. Not published to any app store' },
  ],

  sections: [
    {
      id: 'what-it-does',
      blocks: [
        { type: 'h2', id: 'what-it-does', text: 'What the app does' },
        {
          type: 'p',
          text: 'Rekhon tracks a whole balance sheet rather than just spending. Eleven account types are first-class: bank, cash, credit card, loan, investment, gold, crypto, property, vehicle, money owed to you, and money you owe. Net worth is assets minus liabilities, snapshotted daily so the series is a record rather than a recalculation.',
        },
        {
          type: 'list',
          items: [
            'Record a transaction in three taps — amount, category, save. A transfer is one logical record instead of two transactions that can drift apart.',
            'Split a bill across any number of categories, and date something in the future so it posts itself when the day comes.',
            'Read receipts with on-device OCR: ML Kit pulls the total, the date and the merchant off a photo.',
            'Parse bank transaction SMS into proposed entries — with explicit permission that is off by default and revocable at any time.',
            'Classify every rupee as a need, a want, an investment, an asset or a liability, so “where did it go” has an answer beyond a pie chart.',
            'A home-screen widget showing Safe-to-Spend and net worth, and a privacy blur that masks every amount on every screen, widget included, with one tap.',
            'Export the whole dataset to a JSON archive and import it back. Your data stays yours.',
          ],
        },
      ],
    },
    {
      id: 'offline-and-private',
      blocks: [
        { type: 'h2', id: 'offline-and-private', text: 'Offline-first, and private by default' },
        {
          type: 'p',
          text: 'Offline-first here is a constraint on the code, not a feature in a list. Every core path works with no network, because there is no server for it to reach. That removes a whole class of problems rather than mitigating them: no outage, no breach of a central store, no account to be compromised, and no third party holding a copy of your spending.',
        },
        {
          type: 'p',
          text: 'The database is encrypted with SQLCipher under a key held in the Android Keystore, in the strongest hardware the phone provides. Consent is per-feature, off by default, and revocable, with the grant and revoke both timestamped — and revoking one stops the data path that depends on it immediately. An erase destroys the keys first and then says plainly what it could not reach, because deleting a file on flash storage does not reliably delete anything.',
        },
        {
          type: 'list',
          items: [
            'No account, no sign-up, no server, no sync.',
            'Receipt OCR and SMS parsing both run on the device; neither sends anything anywhere.',
            'A consents dashboard shows the record, not just the switch — what you granted and when.',
            'Screen-capture protection and a one-tap privacy blur for amounts.',
          ],
        },
      ],
    },
    {
      id: 'exact-money',
      blocks: [
        { type: 'h2', id: 'exact-money', text: 'Exact money: rupees as integer paise' },
        {
          type: 'p',
          text: 'Binary floating point cannot represent 0.10. A rupee amount held in a Double is therefore wrong the moment it is added, split or accumulated — and wrong by an amount too small to notice until a reconciliation disagrees months later. Rekhon holds money as integer paise end to end, and no floating-point value ever touches an amount.',
        },
        {
          type: 'p',
          text: 'That rule is enforced by the build rather than by a reviewer. A custom Android Lint module flags any declaration whose type is floating point and whose name looks monetary, and fails the build. It is one of six custom lint rules that turn the project’s written rules into build failures.',
        },
        {
          type: 'code',
          filename: 'what the money lint rule does and does not flag',
          language: 'kotlin',
          code: `val amountMinor: Double     // ./gradlew lint FAILS  — monetary name, floating-point type
val amountMinor: Long       // passes                — the representation the codebase wants
val scrollFraction: Double  // passes                — floating point, but not money`,
        },
      ],
    },
    {
      id: 'built-for-india',
      blocks: [
        { type: 'h2', id: 'built-for-india', text: 'Built for Indian money, not translated into it' },
        {
          type: 'p',
          text: 'Most apps show ₹123,456.78. Indian digit grouping is ₹1,23,456.78, and reading an amount should not take three attempts. Rekhon formats in lakh and crore with Indian grouping throughout, and treats the instruments people here actually hold as first-class rather than as a generic “investment”.',
        },
        {
          type: 'list',
          items: [
            'SIPs, EPF, PPF, NPS, ELSS and sovereign gold bonds as recognised instrument types.',
            'UPI and Indian bank SMS formats understood by the parser.',
            'Gold and crypto as their own asset classes, with their own concentration caps.',
            'Amounts in lakh and crore with Indian digit grouping (₹1,23,456.78).',
          ],
        },
      ],
    },
    {
      id: 'wealth',
      blocks: [
        { type: 'h2', id: 'wealth', text: 'Credit cards, loans and investments, done properly' },
        {
          type: 'p',
          text: 'A credit card carries its real billing cycle, utilisation and due date rather than a balance. A loan’s EMI is split into principal and interest and amortised to the rupee. Investment holdings carry dated lots and a money-weighted return, because a SIP’s cost-to-value ratio understates its return by roughly half — it ignores when each instalment went in.',
        },
        {
          type: 'p',
          text: 'That money-weighted return is XIRR, and computing it exactly took some care. The textbook form needs a fractional exponent, which has no exact decimal representation, so implementations reach for Double and inherit its drift. Substituting x = (1+r)^(1/365) turns the equation into a polynomial with whole-number exponents, which BigDecimal can solve exactly; bisection over a fixed bracket then replaces Newton-Raphson, so there is no starting guess to depend on and no tolerance test to drift. The same cash flows give the same basis points on every machine and every build.',
        },
        {
          type: 'p',
          text: 'Budgets tell the truth mid-month: not just spent against planned, but pace — what even spending would have been by today — and a projection of where the month actually lands. Alerts fire at 80% and 100%, once each, because an app that notifies you about every coffee is one you learn to mute.',
        },
      ],
    },
    {
      id: 'how-its-built',
      blocks: [
        { type: 'h2', id: 'how-its-built', text: 'How it is built' },
        {
          type: 'p',
          text: `The app is ${rekhonCounted.modules} Gradle modules on a one-way dependency rule — feature modules depend on domain, domain depends on data and core, and never the reverse. The calculation engines are pure Kotlin that cannot import Android, which is what makes the money maths testable on the JVM without a device, and what forced the honest answer when a Kotlin Multiplatform spike found that “Android-free” still did not mean “portable”.`,
        },
        {
          type: 'list',
          items: [
            'Kotlin and Jetpack Compose, Material 3, edge-to-edge, dark mode.',
            'Room over SQLCipher, keyed from the Android Keystore; Proto DataStore for settings and the consent ledger.',
            'Hilt for the object graph, coroutines and Flow throughout.',
            'ML Kit for on-device receipt OCR.',
            'Financial thresholds live as versioned data rows in ai/rules, not as constants buried in code.',
          ],
        },
        {
          type: 'p',
          text: 'The rule about AI is the one worth stating plainly: deterministic engines compute every figure, and a language model may only put those figures into sentences. It is never given anything to calculate, and a guardrail refuses any digit it was not handed — a rounded figure is refused as firmly as an invented one, because it is a different claim.',
        },
      ],
    },
    {
      id: 'verification',
      blocks: [
        { type: 'h2', id: 'verification', text: 'How the claims are checked' },
        {
          type: 'p',
          text: `The project treats its own rules as things to be enforced rather than asserted. ${rekhonCounted.tests} tests across ${rekhonCounted.testFiles} test files run on the JVM; six custom lint rules fail the build on a broken rule; and every decision that a reader could reasonably have expected to go the other way is written up as an architecture decision record, with ${rekhonCounted.adrs} files in docs/adr at the time of writing.`,
        },
        {
          type: 'p',
          text: 'Because thresholds are versioned data and every insight cites the rule id and version behind it, an answer stays reproducible after the rules move on. That is the difference between a figure you can audit and a verdict you have to accept.',
        },
      ],
    },
    {
      id: 'licence',
      blocks: [
        { type: 'h2', id: 'licence', text: 'Licence, and why the source is public' },
        {
          type: 'p',
          text: 'Rekhon is dual-licensed. The AGPL-3.0, with a narrow linking exception, is free for everyone including commercial use — distribute a modified version or run one as a network service and you publish your changes under the same licence, so improvements come back. A commercial licence exists for building on Rekhon without opening your own source.',
        },
        {
          type: 'p',
          text: 'The linking exception covers Google ML Kit and Play services, which are proprietary and cannot be AGPL. Without it, shipping an APK containing both would be an unresolvable conflict rather than a choice. It is deliberately narrow, and the coupling it covers sits behind one interface, so a fully free build with an open-source recogniser is a contained change.',
        },
      ],
    },
  ],

  // Rendered as visible H3s and emitted as FAQPage structured data. Questions are the ones people
  // actually type; every answer is true of the public tree.
  faq: [
    {
      q: 'Is Rekhon on the Google Play Store?',
      a: 'No. The source code is public on GitHub, but the app is not published to any app store. You can build it yourself from the repository.',
    },
    {
      q: 'Does Rekhon need an account or an internet connection?',
      a: 'Neither. There is no sign-up and no server. Every core feature works in airplane mode, and network access is optional rather than assumed.',
    },
    {
      q: 'Where is my financial data stored?',
      a: 'Only on your device, in a SQLCipher-encrypted database whose key lives in the Android Keystore. There is no cloud copy, because there is no server.',
    },
    {
      q: 'Does the app read my SMS messages?',
      a: 'Only if you grant that specific permission, which is off by default and revocable at any time. Bank-transaction SMS is parsed on the device into entries you confirm, and nothing is transmitted.',
    },
    {
      q: 'Does Rekhon use AI, and can it invent a number?',
      a: 'Deterministic engines compute every figure. A language model may only phrase them into sentences, it is never given anything to calculate, and a guardrail refuses any digit it was not handed — including a rounded one.',
    },
    {
      q: 'Why store rupees as integer paise instead of a Double?',
      a: 'Binary floating point cannot represent 0.10, so a Double amount is wrong as soon as it is added or split, by an amount too small to notice until a reconciliation disagrees. A custom lint rule fails the build if a floating-point type ever holds money.',
    },
    {
      q: 'Does it support Indian number formatting, lakh and crore?',
      a: 'Yes. Amounts use Indian digit grouping throughout — ₹1,23,456.78 — with lakh and crore, and Indian instruments like SIPs, EPF, PPF, NPS, ELSS and sovereign gold bonds are first-class.',
    },
    {
      q: 'How does it calculate investment returns?',
      a: 'With XIRR, a money-weighted return over dated cash flows, solved exactly in BigDecimal rather than floating point. A plain cost-to-value ratio understates a monthly SIP by roughly half because it ignores when each instalment went in.',
    },
    {
      q: 'What licence is Rekhon under?',
      a: 'AGPL-3.0 with a narrow linking exception for Google ML Kit, plus a separate commercial licence for building on it without opening your own source.',
    },
  ],
}

/**
 * Flattens the section blocks into one array for rendering.
 *
 * Why:  the page renders a single prose column, and the sections exist to group the data rather
 *       than to nest the markup.
 * Input:  none (reads `rekhon.sections`).
 * Output: a flat array of prose blocks in reading order.
 */
export const rekhonBlocks = rekhon.sections.flatMap((s) => s.blocks)

/**
 * The section headings, for an on-page contents list.
 *
 * Why:  a long page needs jump links, and Google sometimes surfaces them as sitelinks.
 * Input:  none.
 * Output: { id, text }[] — one entry per h2 that carries an id.
 */
export const rekhonContents = rekhon.sections
  .map((s) => s.blocks.find((b) => b.type === 'h2' && b.id))
  .filter(Boolean)
  .map((b) => ({ id: b.id, text: b.text }))
