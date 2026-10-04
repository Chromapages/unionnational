# Team directory reference implementation

## Design read

Preserve the existing team page and restyle only the directory to match the supplied reference. DESIGN_VARIANCE: 3; MOTION_INTENSITY: 2; VISUAL_DENSITY: 5. Reuse the existing 94rem container, Outfit/Inter fonts, brand/slate/gold tokens, Lucide icons, CMS portraits, and profile modal.

## Implementation sequence

1. Add the reference's title, introductory copy, and pale connected-team summary panel.
2. Include the existing founder record in the directory without duplicating an existing member ID. Keep the founder spotlight above the directory.
3. Add All People, Tax & Accounting, Client Experience, Operations & Growth, and Leadership filters. Derive membership from actual roles, verified credentials, certifications, specialties, and the founder flag; groups may overlap. Calculate counts from actual records rather than copying mockup numbers.
4. Add a labeled search field matching names, roles, credentials, certifications, and specialties. Apply search and the selected group together, ignoring case and accents. Provide a result announcement and a reset action for no matches.
5. Use compact horizontal portrait cards with names, roles, verified credential/specialty chips, and a View profile button. Keep biographies in the existing accessible modal. Render one column on mobile, two on tablet, and three on desktop.
6. Add a pale recruitment banner using the existing CMS careers destination when configured; otherwise send introductions to the existing contact page without inventing vacancies or a careers route.
7. Localize the added copy in English and Spanish, then inspect responsive layouts, interactions, focus, and contrast.

## Success criteria

- 1440px: three card columns; 768px: two; 390px: one; no horizontal overflow.
- Founder appears once in the directory; All People and category counts reflect real data.
- Search and category filters combine correctly and reset restores the full directory.
- View profile opens the existing modal; Escape closes it and returns focus. Existing member anchor IDs remain stable.
- Controls measure at least 44px and have visible keyboard focus. Text pairings pass WCAG AA contrast.
- Both locales present equivalent controls and content; no fabricated credentials, portraits, or hiring claims.
- No new dependencies. Leave one small regression check for category overlap and accent-insensitive credential search; do not run test suites, lint, typecheck, or build under the standing user instruction.

## Known limitations

The CMS has no explicit department taxonomy. Category membership is inferred from actual role/specialty terms and may overlap; later department fields can replace those rules. Connected design-verification tools are unavailable; use repository tokens, contrast calculations, and live browser inspection. Preserve actual brand assets rather than inventing replacement portraits.

## Completion evidence

- Implemented directory header/summary, compact horizontal cards, live category counts, combined search, no-results/reset, and recruitment banner in English and Spanish.
- Added the real founder once: 12 directory entries. Categories contain 6 tax/accounting, 3 client experience, 3 operations/growth, and 4 leadership entries, with legitimate overlaps.
- Browser inspection confirmed one/two/three columns at 390/768/1440px and no horizontal or card overflow. Spanish mobile also passed.
- All directory controls measured at least 44px; recruitment CTA measured 56px. Keyboard filter focus showed a 2px outline, and selected filters have a checkmark.
- Tax/accounting plus QuickBooks returned Nela and Anna. JOSÉ matched Jose. No-results/reset restored all 12 profiles.
- Profile modal opened, focused its close control, closed with Escape, and restored focus to the profile button. The existing Sue deep link opened the correct profile.
- Calculated contrast ratios: active controls 14.56:1, inactive filters 13.14:1, credential chips 15.88:1, panel body 7.59:1, panel eyebrow 4.92:1, search border 4.69:1.
- No careers URL is configured, so Join Our Team routes to the existing contact page. No vacancies or specialties were fabricated.
- Added one filtering regression check without running suites, lint, typecheck, or build, following the standing instruction.
- Final visual review: 93/100. Saved viewport preview and verdict in .omx/state/team-directory-reference/. Full-directory recapture timed out; the final viewport capture succeeded.
