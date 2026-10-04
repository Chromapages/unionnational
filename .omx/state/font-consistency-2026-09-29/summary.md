# Current typography check — September 29, 2026

## Scope

The user confirmed that “and more” means typography and readability. The current checkout was checked against the active brand rule: Outfit headings, Inter body and labels, and Inter with tabular figures for data.

## Findings and changes

- The newly active `ConsumerHome` homepage had eight hard-coded Georgia styles, including a section-level override inherited by body copy. Removed those styles and assigned `font-heading` to headings and `font-body` to quotes and supporting copy.
- `ShopDesktopExperience` had three hard-coded Georgia styles plus `font-serif` classes. Replaced them with `font-heading` for titles and `font-body` for the italic line.
- Existing shared font loading and theme tokens remained intact. No new dependencies or global CSS overrides were needed.

Changed source files: `src/components/home/ConsumerHome.tsx` and `src/components/shop/ShopDesktopExperience.tsx`. Existing unrelated working-tree edits were preserved.

## Verification

- Source scan found no remaining Georgia, Times New Roman, or `font-serif` use in public TSX. The CSS `--font-serif: initial` reset remains as intended.
- Browser checked `/en`, `/es`, `/en/shop`, and `/es/shop` at 1440 px and 390 px: both brand fonts loaded and page-level horizontal overflow was zero in all eight views.
- Computed font inspection across 542 visible text elements on the four desktop pages found no unexpected font families; headings reviewed were Outfit.
- Compared before/after screenshots for homepage process and story sections and the shop hero. Text remains readable within its layout after the brand-font change.
- Prior September 26 evidence covered 115 public route URLs. This follow-up checked the current source for new font declarations and rendered the pages that had changed since that audit.

## Limits

- Third-party iframe content and text embedded inside images have their own styling.
- No build, lint, typecheck, or automated test suite was run, following the workspace instruction.

Evidence: adjacent before/after screenshots, `font-consistency-2026-09-29-results.json`, and `ralph-progress.json`.
