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
//   2026-10-24 — The first two planned entries published. Both sources verified present on
//                origin/main and resolving publicly before the status changed, per the
//                provenance rule above. Dated by the record, not by the schedule slot: the
//                rules landed on main 2026-07-18, the architecture record is dated 2026-07-17.

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
  // The full series: W01→13 Oct … W15→19 Jan, one per Tuesday.
  //
  // W06, W07, W08 and W09 carry no `source`: their proof is ADR-0079/0080, the verbaliser eval set
  // and LlmModelStore, none of which are pushed yet. A planned entry may name a topic, but it does
  // not get a link that 404s — the record goes in when the work does.
  {
    slug: 'the-seven-rules-i-cannot-break',
    project: 'rekhon',
    title: 'The seven rules I cannot break',
    // The day the rules landed on the public branch, not the day this was written — the journal
    // dates a decision, not its write-up. The detectors that enforce them arrived a week later,
    // which is the other published entry.
    date: '2026-07-18',
    status: 'published',
    compiled: true,
    summary:
      'Seven rules written down before the first line of application code, under a heading saying they override feature requests. Six of them later became detectors that fail the build.',
    metaDescription:
      'Seven binding rules written before any code, and the six custom lint detectors that turn the mechanical half of them into build failures.',
    tags: ['Product', 'Rules'],
    source: {
      label: 'CLAUDE.md §1 — the rules that bind the code',
      href: `${REKHON}/blob/main/CLAUDE.md`,
    },
    body: [
      {
        type: 'p',
        text: 'Seven rules went into the repository before the first line of application code, under a heading that does not leave room for interpretation.',
      },
      {
        type: 'quote',
        text: 'Golden rules (never violate — these override feature requests).',
        cite: 'CLAUDE.md §1',
      },
      {
        type: 'p',
        text: 'They are: every figure comes from deterministic code and a language model may only phrase it; every model output passes a numeric guardrail before display; no financial data leaves the device without explicit, revocable, per-feature consent; the app advises and never moves money; every core feature works in airplane mode; every engine turns fixed input into fixed output, with randomness only from an injected seedable source; and every recommendation shows its inputs and the rule that fired.',
      },
      {
        type: 'p',
        text: 'The trouble with a rule in a document is that documents are read once, usually by somebody who already agreed. A week later the lint module landed, and six of these stopped being prose.',
      },
      {
        type: 'h2',
        text: 'The six that became build failures',
      },
      {
        type: 'list',
        items: [
          'MoneyDoubleDetector — a floating-point declaration whose name looks monetary.',
          'DomainClockDetector — a wall-clock read inside a domain module instead of an injected clock.',
          'GlobalScopeDetector — GlobalScope anywhere.',
          'PiiLoggingDetector — a log line whose arguments name money or personal data.',
          'HardcodedUiStringDetector — a user-visible string written in a feature module instead of the string resources.',
          'HandRolledCryptoDetector — cryptography written by hand rather than through the sanctioned library.',
        ],
      },
      {
        type: 'h2',
        text: 'What a detector can and cannot hold',
      },
      {
        type: 'p',
        text: 'The six do not map one-to-one onto the seven, and it would be tidier if they did. What they catch is the mechanical precondition of a rule, not the rule. Floating-point money and a wall-clock read are how determinism dies in practice. An amount in a log line is how privacy dies. Hand-rolled crypto is how the encrypted store stops being encrypted.',
      },
      {
        type: 'p',
        text: 'Two of the seven have no detector and never will. "Advice, never orders" is a statement about what the app refuses to build, and no static analysis can see an absence. "Show the work" is a claim about what a screen displays, held by screenshot tests and by review. Writing them down beside five mechanised rules is honest about which kind each one is.',
      },
      {
        type: 'p',
        text: 'The set also grew rather than arriving complete. The crypto detector came last, in October, with an architecture decision record that argues two exemptions rather than pretending there are none. A rule in a document is a wish. A rule in the build is a rule, and the difference shows up the first time it stops you.',
      },
    ],
  },
  {
    slug: 'numbers-from-math-words-from-ai',
    project: 'rekhon',
    title: 'Numbers from math, words from AI',
    // The date on the architecture record itself.
    date: '2026-07-17',
    status: 'published',
    compiled: true,
    summary:
      'A language model in a finance app will eventually state a confident, wrong rupee figure. The architecture answers by never handing it one to state, and checking the sentence afterwards anyway.',
    metaDescription:
      'A six-layer AI pipeline where the language model may not compute, and a deterministic guardrail that verifies every digit before it reaches the screen.',
    tags: ['AI', 'Guardrails'],
    source: {
      label: 'ai/architecture/ai-architecture.md — the engine/model boundary',
      href: `${REKHON}/blob/main/ai/architecture/ai-architecture.md`,
    },
    body: [
      {
        type: 'p',
        text: 'A language model asked about money will produce a figure. It will be formatted correctly, phrased confidently, and sometimes wrong, and nothing about the sentence will say which. The architecture record answers this by removing the opportunity rather than by trying to detect the mistake.',
      },
      {
        type: 'quote',
        text: 'LLMs never compute amounts, scores, or forecasts. They only verbalise deterministic-engine results.',
        cite: 'P-03, ai/architecture/ai-architecture.md',
      },
      {
        type: 'p',
        text: 'The AI is six layers, not one model, and determinism increases as you go down. The encrypted database is the bottom. Above it sit aggregation and classification, then the rules engine, then the prediction models, then the decision engine that ranks what to do next. The language model is the top layer and the only one that writes English. It consumes structured results and may depend only on layers below it.',
      },
      {
        type: 'h2',
        text: 'The guardrail does not ask the model anything',
      },
      {
        type: 'p',
        text: 'Every piece of model output passes a numeric check before display — chat replies and any generated explanation alike. It extracts every numeric claim in the candidate text: currency amounts in either minor units or Indian digit grouping, percentages, counts, scores, dates. Each one is resolved against the values the engines and tools actually produced this turn. What cannot be resolved does not ship.',
      },
      {
        type: 'quote',
        text: 'It is a deterministic L3 check — it never uses the LLM to judge the LLM.',
        cite: 'ai/chat/guardrail.md',
      },
      {
        type: 'p',
        text: 'That sentence is the whole design. A model asked to check its own arithmetic is a second opportunity to be confidently wrong, and the check has to be cheaper and more certain than the thing it is checking.',
      },
      {
        type: 'h2',
        text: 'What the record admits it does not do',
      },
      {
        type: 'p',
        text: 'The useful part of the file is its changelog. It states plainly that regeneration is not implemented: the engine can say "ask again", and until the chat layer existed nothing was asking. It records that the refusal wording and its audit entry belong to a layer that had not been built. And it names a bound the prose above it does not — rounding stops at the rupee, so lakh and crore wording verifies only when the figure is exact.',
      },
      {
        type: 'p',
        text: 'A design document that lists what it has not done yet is worth more than one that reads as though everything shipped. It is also the reason this entry can cite it: the claim and its limits are both on the public record, and a reader can check either.',
      },
    ],
  },
  // Covers ADR-0001, the same decision as the published entry
  // 'a-lint-rule-instead-of-a-reviewer'. Kept because it is the series' own framing of it;
  // delete this entry if one telling is enough.
  {
    slug: 'money-is-a-long-and-double-fails-my-build',
    project: 'rekhon',
    title: 'Money is a `Long`, and `Double` fails my build',
    date: '2026-10-27',
    status: 'planned',
    summary:
      '0.1 + 0.2 != 0.3. In a finance app that is not a curiosity, it is a bug you ship and find months later.',
    tags: ['Money', 'Lint'],
    scope:
      'Why exact paise is a build-blocking rule rather than a review note, and what the detector does and does not flag.',
    source: {
      label: 'ADR-0001 — custom lint module and money heuristic',
      href: `${REKHON_ADR}/main/docs/adr/0001-custom-lint-module-and-money-heuristic.md`,
    },
  },
  {
    slug: 'indian-digit-grouping-is-not-a-formatting-detail',
    project: 'rekhon',
    title: '₹1,23,456.78 is not a formatting detail',
    date: '2026-11-03',
    status: 'planned',
    summary:
      'Most apps show ₹123,456.78. Indian digit grouping is ₹1,23,456.78, and reading it should not take three attempts.',
    tags: ['India', 'Formatting'],
    scope:
      'Lakh and crore, Indian digit grouping, and why the formatter is a correctness concern rather than a cosmetic one.',
    source: {
      label: 'MoneyFormatter — Indian digit grouping, lakh and crore',
      href: `${REKHON}/blob/main/core/model/src/main/kotlin/com/aicfo/core/model/MoneyFormatter.kt`,
    },
  },
  {
    slug: 'the-gate-that-never-ran',
    project: 'rekhon',
    title: 'The gate that never ran',
    date: '2026-11-10',
    status: 'planned',
    summary: 'My CI was green for weeks. Then I checked what it was actually running.',
    tags: ['CI', 'War story'],
    scope:
      'A coverage gate that passed because it was measuring almost nothing, and how that was found.',
    source: {
      label: 'ProjectExtensions.configureCoverage — the coverage gate',
      href: `${REKHON}/blob/main/build-logic/convention/src/main/kotlin/ProjectExtensions.kt`,
    },
  },
  {
    slug: 'a-real-llm-on-the-phone-with-no-numbers',
    project: 'rekhon',
    title: 'I put a real LLM on the phone and gave it no numbers',
    date: '2026-11-17',
    status: 'planned',
    summary:
      'There is a language model inside the app, and it has never been given a figure to compute.',
    tags: ['On-device', 'AI'],
    scope:
      'A real model running on the phone, handed figures already rendered and no arithmetic to do. The decision record publishes with the work.',
  },
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
