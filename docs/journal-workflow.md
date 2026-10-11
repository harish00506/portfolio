<!--
  Why:  The journal only stays worth reading if publishing an entry is a five-minute job and the
        rule about what may be published is written down somewhere other than in someone's memory.
  What: How to publish a journal entry, how the cadence works, and the one rule that decides
        whether an entry may go out.
  Result: A reader of this file can publish the next entry without rereading the components.
  Changelog:
    2026-10-11 — Created alongside src/data/journal.js.
-->

# Publishing a journal entry

Everything lives in **`src/data/journal.js`**. No component decides what is published, and there is
no CMS, no markdown loader and no second place to look.

---

## The one rule

> An entry may be `published` only when the claim it makes is in a **pushed public commit**, and it
> must carry a `source` link that resolves.

Rekhon's central claim is that its figures can be checked. A journal that describes work nobody can
see would be the first thing to break that, so the ceiling on what the journal may say is whatever
is on a public branch — not what is in the working tree.

As of 11 Oct 2026, `main` and `dev` are level at **v0.13.9** (ADRs up to 0078), so citations point
at `main` — the stable branch, which will not move under a link the way `dev` does. Anything newer
than the ceiling, including uncommitted work in the tree, belongs in a `planned` entry until it is
pushed.

---

## Publish the next entry

1. **Pick the topic.** Usually the oldest `planned` entry. It already has a title, a date, a
   `scope` and a `source`.

2. **Check the source link still resolves.**

   ```bash
   curl -s -o /dev/null -w '%{http_code}\n' "<the source.href>"
   ```

   A `404` means the ADR is on a branch that was never pushed, or was renamed. Fix the link or
   leave the entry planned — do not publish around it.

3. **Write the body.** Replace the entry's `scope` with a `body` array. Blocks available:

   | `type` | Fields | Renders as |
   |---|---|---|
   | `p` | `text` | A paragraph |
   | `h2` | `text` | A section heading |
   | `quote` | `text`, `cite?` | A pull quote with attribution |
   | `list` | `items[]` | A bulleted list |
   | `code` | `filename`, `language`, `code` | A `CodeSample` block |

   Unknown types render nothing rather than throwing, so adding a block type to the data before its
   case exists in `JournalPostPage.jsx` cannot take the page down.

4. **Add a `metaDescription`** of **160 characters or fewer**. The build fails if the description is
   longer, and `summary` is usually too long to double as one. Keep `title | Harish G` at **60
   characters or fewer** for the same reason.

5. **Flip the status** to `'published'` and set `date` to the day the decision landed — not the day
   you wrote the entry. The date is the point of a journal.

6. **Drop `compiled: true`** if you wrote the entry yourself. Leave it on only while the body is
   assembled from the repo's records rather than written first-person; the page prints a notice
   saying so, and that notice should never be on an entry you actually wrote.

7. **Build.**

   ```bash
   npm run build
   ```

   The new route appears in the prerender list and in `dist/sitemap.xml`. There is no test suite in
   this repo; the build *is* the gate, and it enforces the SEO limits above.

8. **Queue the next one.** Add a fresh `planned` entry two weeks after the last planned date, so
   the schedule never runs dry.

---

## The cadence

`journalMeta.cadence` is `biweekly`, and `journalMeta.cadenceLabel` is the sentence the index
prints. Planned entries are spaced 14 days apart by hand — nothing publishes on a timer, and
nothing is generated.

That is deliberate. A scheduler would eventually publish an empty or half-true entry on a day when
there was nothing to say, and the cost of that is exactly the credibility the journal exists to
build. The schedule is a commitment, not a cron job.

To change the interval, edit `cadence` and `cadenceLabel` and re-space the planned dates.

---

## What the pages do with the data

| File | Role |
|---|---|
| `src/data/journal.js` | Entries, cadence, and the three selectors. The only source of truth. |
| `src/pages/JournalPage.jsx` | `/journal` — published entries, then the planned schedule. |
| `src/pages/JournalPostPage.jsx` | `/journal/:slug` — one published entry. Planned slugs fall through to the 404. |
| `scripts/prerender.mjs` | Generates a route per **published** entry, its `BlogPosting` JSON-LD, and its sitemap row. |
| `src/components/ProjectRoadmap.jsx` | `project.roadmap` on a case study — separate from the journal. |

A planned entry deliberately has no page. It is listed on the index with its date so the schedule is
visible, and `JournalPostPage` returns the 404 for it, so a crawler never indexes an empty page.

---

## Keeping the roadmap honest

`project.roadmap` in `src/data/portfolio.js` carries `version`, `asOf` and `source`. The page prints
`asOf`, which is the whole point: a roadmap that has not been touched in six months should *look*
six months old rather than look current.

When you update it, re-read the lanes from the repository rather than from memory:

```bash
# what shipped
grep -E '^## \[[0-9]+\.[0-9]+\.[0-9]+\] — Epic' CHANGELOG.md

# the version a reader can actually verify
git show origin/dev:VERSION
```

Items that are designed, open or blocked stay in their own lanes. Promoting one to **Shipped**
needs a pushed commit behind it, same rule as the journal.
