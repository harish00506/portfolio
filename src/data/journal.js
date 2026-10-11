// Single source of truth for the development journal.
//
// Why:  A case study says what a project became. It cannot show how the thinking moved, because it
//       is written once and in the past tense. The journal is the other half: dated entries, newest
//       first, each one tied to a decision that is on the public record.
// What: `journalMeta` (cadence + the provenance rule), `journal` (the entries) and the three
//       selectors the pages read. Nothing else in the app decides what is published.
// Result: a reader can see the order the decisions arrived in, and check every one of them.
//
// ─── The provenance rule ──────────────────────────────────────────────────────
// An entry may only be `published` when its claim is in a **pushed public commit**, and it must
// carry a `source` link that resolves. Entries about uncommitted or unpushed work stay `planned`.
// This is not a style preference: the repository's own claim is that it can be checked, and a
// journal that outruns the commits would be the first thing to break it.
//
// `compiled: true` marks an entry assembled from the repository's decision records rather than
// written as a first-person account, and the page says so. Replace the body with your own account
// and drop the flag — see docs/journal-workflow.md.
//
// Changelog:
//   2026-10-11 — Created. Two published entries (ADR-0001, ADR-0028, both on `main`) and three
//                planned ones drawn from the open items on `dev` at v0.13.9.

const REKHON = 'https://github.com/harish00506/Rekhon'
const REKHON_ADR = `${REKHON}/blob`

/**
 * Journal-wide settings the pages read instead of hardcoding them.
 *
 * `cadence` is the interval the planned entries are spaced on, and the index prints it so the
 * schedule is a stated intention rather than something a reader has to infer from the dates.
 */
export const journalMeta = {
  title: 'Build journal',
  kicker: 'Journal',
  cadence: 'weekly',
  cadenceLabel: 'Weekly, on Tuesdays',
  intro:
    'Dated notes from building Rekhon, newest first. Each entry is tied to a decision record in the repository and links to it, so the reasoning can be read at its source rather than taken on trust.',
  provenanceNote:
    'Entries marked “compiled” are assembled from the repository’s own decision records and changelog, not written as first-person recollections. Planned entries are topics with a date, not drafts held back.',
}

/**
 * The entries. Newest first is enforced by the selectors, not by the order here.
 *
 * Shape:
 *   slug     — URL segment under /journal
 *   project  — the portfolio project slug this belongs to
 *   title    — the entry heading
 *   date     — ISO day. For a published entry this is the day the decision landed, not the day
 *              the entry was written, because the date is the point of a journal.
 *   status   — 'published' (body renders, gets its own page) | 'planned' (listed with its date only)
 *   summary  — one or two sentences for the index and the meta description
 *   tags     — short labels for the index
 *   source   — { label, href } the decision record behind the entry. Required when published.
 *   compiled — true when the body is assembled from records rather than written first-person
 *   body     — blocks: { type: 'p' | 'h2' | 'quote' | 'list' | 'code' }
 *   scope    — planned entries only: the one line of what it will cover
 */
export const journal = [
  {
    slug: 'a-lint-rule-instead-of-a-reviewer',
    project: 'rekhon',
    title: 'A lint rule instead of a reviewer',
    date: '2026-07-25',
    status: 'published',
    compiled: true,
    summary:
      'Rupees are integer paise in Rekhon, and the rule is enforced by a custom Android Lint module that fails the build. The interesting part is why a reviewer was not enough.',
    metaDescription:
      'Rupees are integer paise in Rekhon, enforced by a custom Android Lint rule that fails the build. Why a code reviewer was not enough.',
    tags: ['Money', 'Lint', 'Kotlin'],
    source: {
      label: 'ADR-0001 — custom lint module and money heuristic',
      href: `${REKHON_ADR}/main/docs/adr/0001-custom-lint-module-and-money-heuristic.md`,
    },
    body: [
      {
        type: 'p',
        text: 'Binary floating point cannot represent 0.10. A rupee amount held in a Double is therefore wrong the moment it is added, split or accumulated — and wrong by an amount too small to notice, until a reconciliation disagrees months later. That delay is the whole problem: the bug does not announce itself when it is cheap to fix.',
      },
      {
        type: 'p',
        text: 'The project had already written the rule down. CLAUDE.md §3 called a floating-point amount review-blocking, which makes it a thing a reviewer must spot. ADR-0001 records the step from there to build-blocking: a custom Android Lint module, so the rule stops depending on attention.',
      },
      { type: 'h2', text: 'The heuristic, and why there has to be one' },
      {
        type: 'p',
        text: 'Kotlin cannot express “this Double is money” in its type system. That is the reason the Money type exists at all, and it is also why the detector cannot simply ban a type. It requires two halves to be true at once: the declared type is floating point, and the name looks monetary. Both, because either alone is wrong — banning Double would block a perfectly good animation fraction, and matching only names would miss nothing and catch nothing.',
      },
      {
        type: 'code',
        filename: 'what the detector does and does not flag',
        language: 'kotlin',
        code: `val amountMinor: Double     // ./gradlew lint FAILS  — monetary name, floating-point type
val amountMinor: Long       // passes                — the representation the codebase wants
val scrollFraction: Double  // passes                — floating point, but not money`,
      },
      {
        type: 'p',
        text: 'A name heuristic is a judgement call, and the ADR treats it as one rather than pretending otherwise. The trade-off it sets is explicit:',
      },
      {
        type: 'quote',
        text: 'Prefer missing an exotic case over blocking valid code.',
        cite: 'ADR-0001',
      },
      {
        type: 'p',
        text: 'So the word list stays narrow — terms that are monetary in this domain and little else — and it is maintained in the ADR rather than edited in the detector, so a change to what counts as money arrives with its reasoning attached.',
      },
      {
        type: 'p',
        text: 'The module did not stay a single rule. It now carries six detectors, each one a project rule that used to live in prose: the money type, the domain clock, GlobalScope, hand-rolled crypto, hardcoded UI strings, and PII in logs.',
      },
    ],
  },

  {
    slug: 'xirr-without-floating-point',
    project: 'rekhon',
    title: 'XIRR without floating point',
    date: '2026-08-24',
    status: 'published',
    compiled: true,
    summary:
      'A SIP’s cost-to-value ratio understates its return by roughly half, so the app needed a money-weighted return. The textbook way to compute one reaches for Double and a starting guess — both unusable here.',
    metaDescription:
      'A money-weighted return without floating point: a substitution turns XIRR into an integer-exponent polynomial, solved by BigDecimal bisection.',
    tags: ['Money', 'Investments', 'Determinism'],
    source: {
      label: 'ADR-0028 — XIRR by bisection over the daily growth factor',
      href: `${REKHON_ADR}/main/docs/adr/0028-xirr-by-bisection-over-the-daily-growth-factor.md`,
    },
    body: [
      {
        type: 'p',
        text: 'Showing a holding’s return as value over cost understates a SIP by roughly half, because it ignores when each instalment went in. The honest figure is money-weighted: XIRR. Writing one the usual way turns out to collide with two rules the project had already committed to.',
      },
      {
        type: 'p',
        text: 'XIRR is normally stated as NPV(r) = Σ cf·(1+r)^(−d/365) = 0 and solved with Newton-Raphson from a guess. The fractional exponent has no exact decimal form, so an implementation reaches for Double and inherits its drift. And Newton’s answer depends on where it started, can diverge on a series with one large early outflow, and stops on a tolerance test. That is three separate places where an innocent refactor quietly changes what the app said last year about a holding nobody touched.',
      },
      { type: 'h2', text: 'A substitution, and then the slow method on purpose' },
      {
        type: 'p',
        text: 'Let x = (1+r)^(1/365). Then (1+r)^(d/365) becomes x^d with d a whole number of days, and multiplying the equation through by x^dMax clears every division. What is left is a polynomial in x with non-negative integer exponents that shares NPV’s positive roots — so the solve needs only BigDecimal.pow, multiply and add. No fractional powers, so nothing has to be approximated.',
      },
      {
        type: 'code',
        filename: 'the shape the substitution leaves behind',
        language: 'kotlin',
        code: `// F(x) = Σ cf_i · x^(dMax − d_i)      — integer exponents only
private fun bisect(signAtLow: Int, values: List<Long>, exponents: List<Int>): BigDecimal {
    var low = X_LOW
    var high = X_HIGH
    // Fixed iteration count over a literal bracket, no early exit: no guess to depend on
    // and no tolerance branch to drift.
    repeat(ITERATIONS) {
        val mid = low.add(high).divide(TWO, CONTEXT)
        if (polynomialAt(mid, values, exponents).signum() == signAtLow) low = mid else high = mid
    }
    return low.add(high).divide(TWO, CONTEXT)
}`,
      },
      {
        type: 'p',
        text: 'The second half is bisection rather than Newton — slower, and chosen for exactly that reason. There is no starting guess to depend on and no tolerance branch to drift, so the same cash flows give the same basis points on every machine and every build. For a figure the app will still be showing in five years, reproducibility is the property that matters and speed is not close.',
      },
      {
        type: 'h2',
        text: 'The constants are a contract',
      },
      {
        type: 'p',
        text: 'PRECISION, X_LOW, X_HIGH, ITERATIONS and DAYS_PER_YEAR are versioned, not tuned. Changing any one of them changes every historical answer, so it is an engine-version bump rather than an adjustment. DAYS_PER_YEAR is 365 because that is what Excel’s XIRR uses — a user who checks the app against a spreadsheet should get the same number, and a golden file pins it.',
      },
      {
        type: 'list',
        items: [
          'Three unsolvable shapes are refused by name rather than returned as a number: too few flows, all flows the same sign, and a bracket that does not straddle a root.',
          'Same-day flows are summed before anything else, so the answer does not depend on the order the caller happened to list them in.',
        ],
      },
    ],
  },

  {
    slug: 'account-aggregator-and-the-enum-that-shipped-first',
    project: 'rekhon',
    title: 'Account Aggregator, and the enum that had to ship first',
    date: '2027-01-26',
    status: 'planned',
    summary:
      'The Account Aggregator design landed with one reserved source value shipped ahead of it, because the enum had to be right before any data existed to put in it.',
    tags: ['Account Aggregator', 'Schema'],
    scope:
      'Why a reserved enum value shipped before the integration it describes, and what that costs if the design later changes.',
    source: {
      label: 'ADR-0074 — AA is designed and the reserved source value had to ship now',
      href: `${REKHON_ADR}/main/docs/adr/0074-aa-is-designed-and-the-reserved-source-value-had-to-ship-now.md`,
    },
  },

  {
    slug: 'why-money-is-what-blocks-ios',
    project: 'rekhon',
    title: 'Why Money is what blocks iOS',
    date: '2027-02-02',
    status: 'planned',
    summary:
      'The engines import no Android classes and still do not port. The blocker is the exact-paise money type itself.',
    tags: ['KMP', 'Money', 'Portability'],
    scope:
      'What a KMP spike actually found, and why the one type that must never change is the one that stands in the way.',
    source: {
      label: 'ADR-0075 — Android-free is not KMP-portable, and Money is the blocker',
      href: `${REKHON_ADR}/main/docs/adr/0075-android-free-is-not-kmp-portable-and-money-is-the-blocker.md`,
    },
  },

  {
    slug: 'orphaned-blobs-and-shredding-what-you-cannot-find',
    project: 'rekhon',
    title: 'Orphaned blobs, and shredding what you cannot find',
    date: '2027-02-09',
    status: 'planned',
    summary:
      'Closing the import-batch finding opened a new one: receipt blobs that outlive the rows pointing at them. Crypto-shredding only erases what the key covers.',
    tags: ['Privacy', 'Erase', 'Findings'],
    scope:
      'How a fix produced its own finding, and what “erase everything” has to mean when a blob has no row left to reach it from.',
    source: {
      label: 'ADR-0078 — import_batches exists, and the wipe is checked, not trusted',
      href: `${REKHON_ADR}/main/docs/adr/0078-import-batches-exists-and-the-wipe-is-checked-not-trusted.md`,
    },
  },
  // ─── From the fifteen-week LinkedIn series (Rekhon docs/linkedin-posts.md) ───
  // Titles and dates are the author's own, taken from that plan: weekly, Tuesdays.
  // Mapping: W07→24 Nov … W15→19 Jan. W01–W06 fall before this queue starts.
  //
  // W07, W08 and W09 carry no `source`: their proof is ADR-0079/0080, the verbaliser eval set and
  // LlmModelStore, none of which are pushed yet. A planned entry may name a topic, but it does not
  // get a link that 404s — the record goes in when the work does.
  {
    slug: 'a-check-stricter-than-the-gate-it-guarded',
    project: 'rekhon',
    title: 'My safety check was stricter than my safety gate',
    date: '2026-11-24',
    status: 'planned',
    summary:
      'A check meant to protect a feature silently switched it off instead, and nothing went red.',
    tags: ['Guardrails', 'War story'],
    scope:
      'How an inner sanitiser ended up stricter than the guardrail it was guarding, and why a refused reply looked identical to a phone with no model installed. The decision record publishes with the work.',
  },
  {
    slug: 'how-do-you-test-a-feature-that-writes-sentences',
    project: 'rekhon',
    title: 'How do you test a feature that writes sentences?',
    date: '2026-12-01',
    status: 'planned',
    summary:
      'You cannot unit-test a language model. You can unit-test what you do with its output.',
    tags: ['Testing', 'AI'],
    scope:
      'The eval set and frozen expectations that stand in for a unit test when the output is prose. Publishes with the work.',
  },
  {
    slug: 'a-truncated-download-is-not-a-model',
    project: 'rekhon',
    title: 'A truncated download is not a model',
    date: '2026-12-08',
    status: 'planned',
    summary:
      'Half a gigabyte of model weights fails inside a native library in ways no Kotlin can catch.',
    tags: ['On-device', 'Integrity'],
    scope:
      'Verifying length and digest before trusting a model file, and treating the presence of a verified file as the opt-in. Publishes with the work.',
  },
  {
    slug: 'your-receipts-never-leave-your-phone',
    project: 'rekhon',
    title: 'Your receipts never leave your phone',
    date: '2026-12-15',
    status: 'planned',
    summary:
      'A receipt says where you were, when, and what you bought — the most personal data the app holds.',
    tags: ['Privacy', 'OCR', 'Consent'],
    scope:
      'What on-device OCR has to guarantee, and how the consents dashboard shows the record rather than just the switch.',
    source: {
      label: 'ADR-0059 — the consents dashboard shows the record, not just the switch',
      href: `${REKHON_ADR}/main/docs/adr/0059-the-consents-dashboard-shows-the-record-not-just-the-switch.md`,
    },
  },
  {
    slug: 'erase-should-destroy-the-key-not-the-files',
    project: 'rekhon',
    title: '“Erase everything” should destroy the key, not the files',
    date: '2026-12-22',
    status: 'planned',
    summary: 'Deleting a file on flash storage does not necessarily delete anything.',
    tags: ['Privacy', 'Crypto-shredding'],
    scope:
      'Why an erase destroys keys first, and then says plainly what it cannot reach.',
    source: {
      label: 'ADR-0060 — an erase destroys keys first and says what it cannot reach',
      href: `${REKHON_ADR}/main/docs/adr/0060-an-erase-destroys-keys-first-and-says-what-it-cannot-reach.md`,
    },
  },
  {
    slug: 'every-verdict-names-the-rule-that-fired',
    project: 'rekhon',
    title: 'Every verdict names the rule that fired',
    date: '2026-12-29',
    status: 'planned',
    summary:
      'A score you cannot check is a verdict, so every figure cites the rule and version behind it.',
    tags: ['Rules', 'Reproducibility'],
    scope:
      'Thresholds as versioned data rows instead of constants buried in code, and what that buys six months later.',
    source: {
      label: 'ai/rules — the versioned rulebook every insight cites',
      href: `${REKHON}/tree/main/ai/rules`,
    },
  },
  {
    slug: 'your-sips-return-is-roughly-double-what-your-app-shows',
    project: 'rekhon',
    title: 'Your SIP’s return is roughly double what your app shows',
    date: '2027-01-05',
    status: 'planned',
    summary:
      'A cost-to-value ratio understates a monthly SIP by roughly half. The honest figure is money-weighted.',
    tags: ['Investments', 'XIRR'],
    scope:
      'The user-facing half of the XIRR story: what the common portfolio screen gets wrong, and by how much.',
    source: {
      label: 'domain/engines/investment — the holdings and XIRR engine',
      href: `${REKHON}/tree/main/domain/engines/investment`,
    },
  },
  {
    slug: 'open-source-as-proof-not-marketing',
    project: 'rekhon',
    title: 'Open source as proof, not marketing',
    date: '2027-01-12',
    status: 'planned',
    summary:
      'The claim is that nothing about your money leaves your phone — not something a store listing can prove.',
    tags: ['Licensing', 'Open source'],
    scope:
      'Why the source is public, and why the AGPL linking exception is deliberately narrow.',
    source: {
      label: 'LICENSE — AGPL-3.0 with an ML Kit linking exception',
      href: `${REKHON}/blob/main/LICENSE`,
    },
  },
  {
    slug: 'fifteen-weeks-in-public',
    project: 'rekhon',
    title: 'Fifteen weeks in public — and what I am looking for',
    date: '2027-01-19',
    status: 'planned',
    summary: 'What fifteen weeks of building in public changed, and what comes next.',
    tags: ['Retrospective'],
    scope: 'A closing retrospective on the series, and what it was for.',
    source: {
      label: 'The repository',
      href: REKHON,
    },
  },

]

/**
 * Published entries, newest first.
 *
 * Why:  the index and the prerendered routes must agree on exactly one definition of "published",
 *       or a page would exist that the index never links to.
 * Input:  none (reads `journal`).
 * Output: a new array of entries with status 'published', sorted by `date` descending.
 */
export const publishedEntries = journal
  .filter((e) => e.status === 'published')
  .sort((a, b) => b.date.localeCompare(a.date))

/**
 * Planned entries, oldest first — the schedule reads forwards.
 *
 * Input:  none (reads `journal`).
 * Output: a new array of entries with status 'planned', sorted by `date` ascending.
 */
export const plannedEntries = journal
  .filter((e) => e.status === 'planned')
  .sort((a, b) => a.date.localeCompare(b.date))

/**
 * Look up one entry by slug.
 *
 * Why:  the detail page and the prerender both resolve a URL segment to an entry, and a second
 *       copy of this lookup is a second place for them to disagree.
 * Input:  slug — the URL segment.
 * Output: the entry object, or undefined when nothing matches.
 */
export function getEntryBySlug(slug) {
  return journal.find((e) => e.slug === slug)
}

/**
 * Published entries belonging to one project, newest first.
 *
 * Why:  a case study links to its own journal entries, and must not advertise planned ones as
 *       readable pages.
 * Input:  projectSlug — a portfolio project slug.
 * Output: a filtered array (possibly empty).
 */
export function publishedEntriesForProject(projectSlug) {
  return publishedEntries.filter((e) => e.project === projectSlug)
}
