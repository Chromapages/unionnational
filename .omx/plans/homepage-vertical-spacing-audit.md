# Homepage vertical spacing audit

Date: 2026-09-29  
Routes: `/en` and `/es`  
Scope: section-boundary spacing only. Preserve content, colors, typography, order, horizontal sizing, and internal component spacing.

## Inspection and measurement

Read the active homepage route, `ConsumerHome.tsx`, shared CSS tokens, header wrapper, footer, and footer analytics before implementation. The active homepage has six sections followed by the shared footer. Tailwind's existing `--spacing` is 0.25rem; semantic tokens already include `--space-4` (1rem), `--space-6` (1.5rem), `--space-12` (3rem), and `--space-24` (6rem). There is no shared responsive section-boundary scale in use.

Browser baseline collected in English and Spanish at 320, 375, 768, 1024, 1440, and 1920px after fonts loaded. Baseline geometry and non-spacing style/content snapshots are saved in `homepage-spacing/before-snapshot.json` in the thread visualization folder.

Values below measure section edge to first/last in-flow content box. Existing 1px borders are excluded from spacing values. For the hero this is its copy/CTA group; for the trust strip it is the grid of proof items; for the closing CTA it is the card; for the footer it is the content grid through the legal row. Glyph ink and internal card padding are not boundary measurements.

### Current insets: above / below (px)

| Section | Mobile: 320, 375 | Tablet: 768 | Desktop: 1024, 1440, 1920 |
| --- | ---: | ---: | ---: |
| Hero | 64 / 64 | 96 / 96 | 96 / 96 |
| Trust strip | 24 / 24 | 24 / 24 | 24 / 24 |
| Strategy-call brief | 40 / 40 | 40 / 40 | 36 / 32 |
| Outcomes | 36 / 36 | 36 / 36 | 36 / 36 |
| Client story | 40 / 96 | 40 / 96 | 40 / 120 |
| Closing CTA | 0 / 80 | 0 / 80 | 0 / 80 |
| Footer | 48 / 24 | 64 / 48 | 64 / 48 |

Outliers: regular desktop content boundaries vary from 60 to 76px; the client-story-to-CTA gap rises to 120px, and CTA-to-footer rises to 144px. Mobile retains 96px and 128px closing gaps despite having a much narrower viewport. The CTA's zero top inset also makes its perceived spacing depend entirely on the preceding section. Ordinary boundaries are not severely cramped, but they are inconsistent; the closing transitions are disproportionately loose.

## Shared scale and boundary ownership

Use existing tokens to derive a responsive unit: 8px on mobile (`--space-4 / 2`), 12px on tablet (`--space-6 / 2`), and 16px on desktop (`--space-4`). Every scale step therefore uses **mobile : tablet : desktop = 1 : 1.5 : 2**.

| Token | Multiplier | Mobile | Tablet | Desktop | Purpose |
| --- | ---: | ---: | ---: | ---: | --- |
| `--home-gap-related` | 2 units | 16px | 24px | 32px | Related group/edge insets |
| `--home-gap-topic` | 4 units | 32px | 48px | 64px | Ordinary topic boundaries |
| `--home-gap-pause` | 6 units | 48px | 72px | 96px | Evidence-to-action and action-to-footer transitions; hero framing |
| `--home-gap-frame` | 8 units | 64px | 96px | 128px | Hero content to proof content across the introductory surface change |

One boundary owns one total token. Ordinary topic boundaries use half a topic token on each adjoining surface. Closing boundaries use half a pause token on each side. The hero's bottom uses `frame - related`, and the proof strip's top uses `related`, giving exactly one frame token. No additional section margins or wrapper gaps are added. Positive edge padding prevents first/last child margins from escaping their section.

This is a project scale, informed by responsive spacing guidance rather than a mandated standard. GOV.UK documents responsive spacing tokens and reusable spacing helpers. USWDS recommends less space within related groups and more between different groups. MDN explains how block margins can collapse and how separating padding prevents parent/child collapse. [GOV.UK spacing](https://design-system.service.gov.uk/styles/spacing/), [USWDS whitespace guidance](https://designsystem.digital.gov/components/typography/), [MDN margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing).

## Boundary assignments: current to proposed

| Section boundary | Breakpoint | Current value | New value (token) | Reason |
| --- | --- | ---: | --- | --- |
| Header → hero content | Mobile | 64px | 48px (`pause`) | Tighten the introductory inset proportionally. |
| Header → hero content | Tablet | 96px | 72px (`pause`) | Use the same responsive ratio. |
| Header → hero content | Desktop | 96px | 96px (`pause`) | Retain the established desktop frame. |
| Hero → trust content | Mobile | 88px | 64px (`frame`) | Group the proof with the opening offer. |
| Hero → trust content | Tablet | 120px | 96px (`frame`) | Remove disproportionate tablet space. |
| Hero → trust content | Desktop | 120px | 128px (`frame`) | Normalize the opening frame to the same scale. |
| Trust → strategy brief | Mobile | 64px | 32px (`topic`) | Compact handoff to the next topic. |
| Trust → strategy brief | Tablet | 64px | 48px (`topic`) | Match equivalent topic boundaries. |
| Trust → strategy brief | Desktop | 60px | 64px (`topic`) | Remove the asymmetric one-off inset. |
| Strategy brief → outcomes | Mobile | 76px | 32px (`topic`) | Tighten long mobile-page transitions. |
| Strategy brief → outcomes | Tablet | 76px | 48px (`topic`) | Use the shared topic rhythm. |
| Strategy brief → outcomes | Desktop | 68px | 64px (`topic`) | Normalize without increasing space. |
| Outcomes → client story | Mobile | 76px | 32px (`topic`) | Match the preceding topic boundary. |
| Outcomes → client story | Tablet | 76px | 48px (`topic`) | Match the preceding topic boundary. |
| Outcomes → client story | Desktop | 76px | 64px (`topic`) | Remove the extra separation. |
| Client story → closing CTA | Mobile | 96px | 48px (`pause`) | Distinguish action with a controlled pause. |
| Client story → closing CTA | Tablet | 96px | 72px (`pause`) | Preserve hierarchy at the tablet ratio. |
| Client story → closing CTA | Desktop | 120px | 96px (`pause`) | Reduce the oversized closing gap. |
| Closing CTA → footer content | Mobile | 128px | 48px (`pause`) | Remove stacked closing whitespace. |
| Closing CTA → footer content | Tablet | 144px | 72px (`pause`) | Remove stacked closing whitespace. |
| Closing CTA → footer content | Desktop | 144px | 96px (`pause`) | Match the other closing transition. |
| Footer content → page end | Mobile | 24px | 16px (`related`) | Use the smallest named edge inset. |
| Footer content → page end | Tablet | 48px | 24px (`related`) | Use the same responsive ratio. |
| Footer content → page end | Desktop | 48px | 32px (`related`) | Normalize the terminal inset. |

Footer bottom padding retains `max(token, env(safe-area-inset-bottom))`. A real device safe area may enlarge that final protective inset.

## Implementation sequence

1. Add the spacing-system scope to the homepage main element.
2. Add named spacing tokens and shared section/hero/proof/pause rules in the existing utilities layer. Scope footer rules to the adjacent homepage footer so other routes retain their spacing.
3. Remove only the conflicting vertical section/edge utilities from `ConsumerHome.tsx`; apply shared semantic classes. Keep inner margins, icon sizing, typography, copy, colors, minimum heights, and layout rules.
4. Repeat geometry and non-spacing snapshots for both locales at all six requested widths. Compare typography, colors, text, hrefs, image sources, widths, and content order against the baseline.
5. Check boundary totals and representative screenshots, late layout movement, clipping, and overflow. Capture verification results and a visual verdict.

No dependencies, new UI components, CMS changes, or content edits are needed. Build/lint/typecheck/test suites are not run under the workspace instructions; verification uses the rendered browser.

## Acceptance and completion record

- All three ordinary topic boundaries must compute to the same topic token at a given breakpoint.
- Both closing boundaries must compute to the same pause token.
- Every section's above/below inset must be derived from the named scale.
- No new section margins or implicit spacing from a wrapper gap.
- Non-spacing snapshots must match baseline; content widths and order must remain identical.
- No new overflow, clipped content, or unexpected late layout movement.
- Verify 320, 375, 768, 1024, 1440, and 1920px in English and Spanish.

Status: implemented and verified on 2026-09-29.

### Final section insets: above / below (px)

| Section | Mobile: 320, 375 | Tablet: 768 | Desktop: 1024, 1440, 1920 |
| --- | ---: | ---: | ---: |
| Hero | 48 / 48 | 72 / 72 | 96 / 96 |
| Trust strip | 16 / 16 | 24 / 24 | 32 / 32 |
| Strategy-call brief | 16 / 16 | 24 / 24 | 32 / 32 |
| Outcomes | 16 / 16 | 24 / 24 | 32 / 32 |
| Client story | 16 / 24 | 24 / 36 | 32 / 48 |
| Closing CTA | 24 / 24 | 36 / 36 | 48 / 48 |
| Footer | 24 / 16 | 36 / 24 | 48 / 32 |

All 12 viewport/locale combinations matched the token totals exactly: ordinary topic boundaries were 32/48/64px, closing boundaries 48/72/96px, and the introductory frame 64/96/128px. No new section margins were introduced. The measured internal heights, horizontal positions/widths, fonts, sizes, weights, line heights, letter spacing, colors, borders, shadows, copy, links, image sources, and content order of sections/footer matched the baseline.

Responsive header animations produced transient differences in the raw snapshots during viewport resizing; header code and styles were not edited. A second check after responsive state settled found no late section movement or layout-shift entries at any requested width. No page runtime errors, horizontal overflow, or clipped text were observed. These are bounded browser checks, not a guarantee about all third-party behavior or devices.

Evidence folder: `C:/Users/ericb/.codex/visualizations/2026/09/22/01a0cb28-f65b-7510-bc37-04884e495874/homepage-spacing/`. Files include `before-snapshot.json`, `after-snapshot.json`, `verification.json`, full-page screenshots, and focused desktop/mobile boundary screenshots. Visual verdict: `.omx/state/homepage-vertical-spacing/ralph-progress.json` (pass, 97).

### Files changed and simplification

- `src/app/[locale]/page.tsx`: homepage spacing scope marker.
- `src/components/home/ConsumerHome.tsx`: replaced only outer vertical edge utilities with shared spacing classes.
- `src/styles/globals.css`: shared responsive tokens, boundary rules, and homepage-only footer edge rules.
- `.omx/plans/homepage-vertical-spacing-audit.md`: baseline, design decisions, and final evidence.
- `.omx/state/homepage-vertical-spacing/ralph-progress.json`: final visual verdict.

Removed one-off section-edge values (including 7.5rem story bottom and 5rem CTA bottom) instead of layering new overrides on them. No content/message files, typography, colors, inner component spacing, horizontal gutters, section order, or shared footer component were changed. No dependencies added. Device safe-area padding is retained; build/test suites were not run per workspace instructions.
