# Resume notes — Harish G

The advice that used to live here is now enforced rather than written down. It moved into the
**`resume-forge`** skill (`~/.claude/skills/resume-forge/`), which builds a resume from a verified
evidence ledger and then scores it.

> The previous version of this file was written before the August–September 2026 content rewrite and
> had gone stale in a way that was worse than useless: it gave advice about "Farmers Survey AI",
> "MedChat-AI" and "Task Tracker" (now KisanVoice AI, FinGraph AI and TaskFlow), claimed "5 Indian
> languages" against the current 24 configured locales and "200+ commits" against the actual 172 of
> 192, and described a final-year student rather than a working software developer. Advice that
> contradicts the source of truth is a liability, so it is gone.

## Where the advice lives now

| Was | Now |
|---|---|
| "Lead with quantified work", "every bullet answers how much" | `references/rubric.md` → bullet quality, scored |
| "Never claim a number you cannot point at" | `references/rubric.md` → fact traceability, scored against `docs/resume-evidence.json` |
| "Add the real projects the resume omits" | `references/evidence-ledger.md` → the full inventory |
| "Reorder for relevance per role" | `references/role-profiles.md` + `assets/role-profiles.json` |
| "One consistent email", "make links clickable" | `references/rubric.md` → contact check, scored |
| "ATS-friendly, single column, standard headings" | `references/rubric.md` → ATS check, scored |
| "Strong action verbs, avoid Worked on / Responsible for" | `references/rubric.md` → weak-opener list, scored |
| "One page" | `scripts/build_resume.sh` fails the build if `pdfinfo` says otherwise |

## Using it

```bash
# 1. Rebuild the fact base (do this first, every time)
python3 ~/.claude/skills/resume-forge/scripts/extract_evidence.py --repo .

# 2. Build a variant's PDF and check it is one page
bash ~/.claude/skills/resume-forge/scripts/build_resume.sh public/resume-java-developer.tex

# 3. Score it
python3 ~/.claude/skills/resume-forge/scripts/evaluate_resume.py \
  public/resume-java-developer.tex --role java-developer --min-score 85
```

Ready to send at **85 or above with zero fact-traceability and zero claim-integrity findings**. An
honest 78 beats a 92 that invented a number.

## Open items the evaluator currently reports

- Four company-targeted variants (`resume-anz-platform-engineer`, `resume-cgi-ai-engineer`,
  `resume-cgi-fullstack-ai`, `resume-hpe-agentic-rpa`) still say **380 of 418 commits**, an August
  snapshot. `portfolio.js` and `resume.tex` say **589 of 626** (plus 67 of 75 on the core engine).
  Commit counts only grow, so the higher figures are current and those four need updating.
- `resume.tex` calls the forecasting project **"Sales & Inventory Forecasting"**; `portfolio.js`
  calls it **"StockSense AI"**. Same project, two names. Pick one.
- Lendly, AI Personal CFO and Talo, the Dental Clinic AI Assistant, the Demand Forecasting System,
  Inventory & Sales Prediction and the AI Code-Review Gate appear on resumes but not on the site.
  Adding them to `portfolio.js` would need slugs, STAR case studies and metrics.
