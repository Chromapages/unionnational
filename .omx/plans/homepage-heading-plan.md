# Homepage heading plan

Date: 2026-09-29  
Status: implemented and browser-verified on 2026-09-29  
Scope: the four section headings in the current English and Spanish homepage, their supporting hierarchy, spacing, and copy.

## Recommendation

Give every homepage section H2 the same responsive treatment: **44px desktop, 36px tablet, 32px mobile**, Outfit, weight 700, line height 1.15. Use shorter, descriptive headings that explain what each section contains. Keep the existing navbar-aligned containers. Weight increased from 600 to 700 following the user's request for bolder section headings.

The intended tone is calm, clear, and credible for a tax firm serving a broad audience. Design-taste direction: restrained variation, minimal motion, moderate density. Ponytail approach: one shared homepage heading treatment, existing fonts, no new dependencies or components.

## 1. What the current page actually does

Measured in the local Chrome browser at `http://localhost:3001/en` and `/es`, after fonts loaded. Checked 2048px, 1440px, 768px, and 390px viewport widths. Both languages use the same computed heading sizes. No horizontal page overflow was observed at those widths.

| Section H2 | At 2048px | At 1440px | At 390px | Current weight |
| --- | ---: | ---: | ---: | ---: |
| Strategy-call overview | 74.4px | 64.8px | 40.8px | 400 |
| Services and outcomes | 43.2px | 34.6px | 32px | 700 |
| Client story | 52.2px | 36.8px | 36.8px | 400 |
| Closing call to action | 54.3px | 48px | 48px | 700 |

The strategy-call H2 is nearly as large as the 76.8px desktop hero H1. Other sections alternate between regular and bold weight. That gives comparable sections different visual importance without a content reason.

Spanish shows the cost of the long copy: at 390px the current story H2 occupies four lines, and the final CTA occupies three. The English equivalents occupy three and two lines respectively.

Source locations:

- `src/components/home/ConsumerHome.tsx:101`: process H2.
- `src/components/home/ConsumerHome.tsx:146`: outcomes H2.
- `src/components/home/ConsumerHome.tsx:222`: story H2.
- `src/components/home/ConsumerHome.tsx:288`: closing H2.
- `src/styles/globals.css:222`: existing `.home-section-heading` styling; its current scale is 36/48/52px and differs from the component's inline utilities.

## 2. What the web guidance supports

- **Use a deliberate responsive scale.** GOV.UK's current type scale uses 36px and 48px large-screen heading tiers, with smaller-screen counterparts of 27px and 32px. It outputs relative units for resizing. Our 44/36/32px proposal is a project-specific adaptation for Outfit and this marketing page. [GOV.UK type scale](https://design-system.service.gov.uk/styles/type-scale/)
- **Make headings predictable and descriptive.** Readers scan headings to find relevant content. NN/g recommends a consistent visual treatment and warns against excessively prominent subheadings that resemble advertisements. [NN/g scanning research](https://www.nngroup.com/articles/layer-cake-pattern-scanning/)
- **Connect headings to their content through spacing.** USWDS recommends tighter spacing below a heading than between unrelated content. It also treats short headings differently from longer reading text when choosing line height. [USWDS typography](https://designsystem.digital.gov/components/typography/)
- **Use sentence case.** Reserve capitals for short eyebrow labels. [GOV.UK headings](https://design-system.service.gov.uk/styles/headings/)
- **Describe the section's purpose.** WCAG 2.4.6 calls for headings that describe topic or purpose; it does not prescribe our pixel scale. [W3C headings and labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html)

## 3. Typography and spacing specifications

Values below assume a 16px root size; implement font sizes in rem. The exact sizes and spacing are design decisions for this homepage.

| Element | Mobile: below 768px | Tablet: 768–1023px | Desktop: 1024px+ | Weight / line height |
| --- | ---: | ---: | ---: | --- |
| Section H2, including closing CTA | 32px / 2rem | 36px / 2.25rem | 44px / 2.75rem | Outfit 700 / 1.15 |
| Card outcome H3 and client-company H3 | 22px / 1.375rem | 24px / 1.5rem | 26px / 1.625rem | Outfit 600 / 1.2 |
| Nested service H4 | 20px / 1.25rem | 20px / 1.25rem | 22px / 1.375rem | Outfit 600 / 1.25 |
| Eyebrow and short group labels | 12px / 0.75rem | 13px / 0.8125rem | 14px / 0.875rem | Inter 600 / 1.4 |
| Section introduction | 18px / 1.125rem | 18px / 1.125rem | 20px / 1.25rem | Inter 400 / 1.5 |

The hero remains the separate H1 tier during this section-heading pass. Its current size and audience wording can be addressed in a subsequent hero review.

Heading rules:

- Left-align each title with the section content. In the final CTA, use the existing internal card inset.
- Use letter spacing `-0.025em` for H2s; `-0.015em` for card headings.
- Set a preferred H2 maximum width of **32ch**, capped by available width. Do not constrain short titles to create unnecessary wraps.
- Aim for one or two desktop lines and two or three mobile lines. These are editorial targets: let translations and enlarged text grow naturally.
- Use natural wrapping and balanced headings where supported. No fixed heading heights, truncation, or hardcoded line breaks.
- Keep the same font size for English and Spanish at each breakpoint.
- Retain the existing dark heading colors on light sections and white on the closing dark section. Keep gold for accents and short labels.
- Use actual H2 elements for the four sections. Keep one H1, then H3/H4 for nested content. Eyebrows are supporting text, not extra H2s.
- Keep action links visually separate from the title. Allow links such as “Compare all services” to move below the introduction when space is tight.

Spacing rules:

| Relationship | Mobile | Desktop |
| --- | ---: | ---: |
| Eyebrow to H2 | 12px | 12px |
| H2 to introduction | 12px | 16px |
| Introduction to cards/content | 24px | 32px |
| Heading directly to content, with no introduction | 24px | 32px |

Keep the larger boundary between sections. Avoid enlarging the whole section to compensate for a smaller heading. The final CTA keeps its compact layout and button prominence.

## 4. Recommended section headlines

The sequence should answer four questions: what happens on the call, what support is available, what a client experienced, and how to begin.

| Section | Current English title | Recommended English title | Reason |
| --- | --- | --- | --- |
| A clear first step | Your strategy call, at a glance. | What to expect from your strategy call | Describes the review, evaluation, and next steps shown below. |
| What you get | Real outcomes. Matched with the right support. | Tax planning, clear books, better decisions | Names the three service areas instead of using an abstract outcome claim. |
| One client story | From reactive filing to proactive financial planning. | How Torres Built moved to year-round planning | Identifies the client and the process change described in the existing story. |
| Your next step | Start with a strategy call. | Start with a strategy call | Retains the direct action and matches the booking button. |

Use consistent sentence case and omit terminal periods on display headings.

### Paste-ready copy and field map

The current homepage reads these strings from `ConsumerHome` in `src/messages/en.json` and `src/messages/es.json`. The existing Sanity homepage fields are not the active source for these four headings. These values are ready to paste into the equivalent CMS fields if that mapping is connected later.

| Field | English value | Spanish value |
| --- | --- | --- |
| `ConsumerHome.process.title` | What to expect from your strategy call | Qué esperar de su llamada estratégica |
| `ConsumerHome.outcomes.title` | Tax planning, clear books, better decisions | Planificación fiscal, cuentas claras y mejores decisiones |
| `ConsumerHome.story.title` | How Torres Built moved to year-round planning | Cómo Torres Built empezó a planificar todo el año |
| `ConsumerHome.final.title` | Start with a strategy call | Comience con una llamada estratégica |
| `ConsumerHome.story.eyebrow` | One client story | La historia de un cliente |

The story eyebrow describes the evidence currently presented without implying a verified financial result. Confirm permission and factual accuracy before publishing the named story; no savings figure is added by this plan.

### Audience limitation to address separately

The current hero eyebrow targets contractors and service businesses, and the three outcomes cards cover business planning, bookkeeping, and CFO support. Individual tax help and IRS problems still need visible service routes to reflect the audience you described. This heading pass can improve clarity, but adding those audience paths requires a separate content/layout decision. Do not label the existing three-card section as covering all tax needs.

## 5. Implementation sequence

1. Apply one homepage-only H2 style to the four section titles. Reuse the existing fonts and styling conventions; remove the conflicting per-section size, weight, line-height, and tracking utilities.
2. Scope changes to `ConsumerHome`. Check callers before altering any global `.home-*` rule, because other pages may use those styles.
3. Normalize the card hierarchy and section introduction spacing using the scale above.
4. Apply the approved English and Spanish strings in the actual content source. Keep content changes separately reviewable from styling.
5. Capture both languages at 2048, 1440, 768, and 390px. Check wrapping at the desktop breakpoint and narrower widths as needed.
6. Verify enlargement, contrast, and heading navigation before treating the implementation as complete. No new packages are needed.

Expected implementation files: `src/components/home/ConsumerHome.tsx`, `src/styles/globals.css` if a scoped shared rule is needed, and the two locale message files for copy.

## 6. Acceptance criteria and remaining checks

- All four H2s compute to 44px at desktop, 36px at tablet, and 32px at mobile, with weight 700 and line height 1.15 at the default root size.
- Section titles remain visibly above the card-title tier and below the hero tier.
- English and Spanish headings remain fully visible with no collision with adjacent links or CTA controls.
- The existing navbar-aligned section containers remain intact.
- Copy accurately describes each section, with no invented savings figures or outcome guarantees.
- At 200% text enlargement, all heading text and associated controls remain available. [W3C resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- At 320 CSS pixels, content reflows without horizontal scrolling for these sections. [W3C reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- Check actual rendered text contrast: at least 4.5:1 for normal text and 3:1 for qualifying large text; target 4.5:1 for the entire heading family where practical. [W3C contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

Implementation verification: both locales checked at 2048, 1440, 1024, 768, 390, and 320px. All four H2s match the specified size, weight, and line height. No normal-size page overflow or heading/card-title/link clipping was observed. One H1 remains. Process intro/content margins match the plan. All four H2s and closing booking buttons remain unclipped with the root font enlarged to 200% at 1440px. Checked heading/intro/eyebrow color pairs exceed 4.5:1; the CTA uses a conservative upper bound on its gradient's brightness.

Evidence: screenshots and `measurements.json` in `C:/Users/ericb/.codex/visualizations/2026/09/22/01a0cb28-f65b-7510-bc37-04884e495874/homepage-headings/`. Visual verdict persisted in `.omx/state/homepage-headings/ralph-progress.json` (pass, 96).

This is scoped browser verification, not a full-site accessibility audit. Enlarging the root font exposes existing navbar crowding outside this heading pass. Build, lint, typecheck, and test suites were not run under the workspace instructions.

## Delivery record

### Latest reference: strategy-call brief

Refinement following the user's repeated reference request: at 1280px and wider, the internal layout now uses 56px step numbers, 64px icon circles, 22px list text, 20px descriptions, inset column content, 36px connector SVGs, and an 80px booking-strip icon circle. The new booking button uses a warm gold gradient, 18px text, and a 68px minimum height. These treatments are scoped to this section; the shared main heading remains 44/36/32px bold. Smaller screens retain compact rows and stacked columns. Both locales passed browser checks at 1536, 1440, 1280, 1024, 768, 390, and 320px with no section text clipping or page overflow; enlarged text was also checked at 1440px. Updated screenshots and measurements are in `strategy-call-brief/refined-*.png` and `refined-measurements.json`. Final verdict: pass, 96. This refinement changed `ConsumerHome.tsx` only, plus documentation and the verdict record.

The user supplied `codex-clipboard-73b2a3d0-00d4-4ec0-a667-751417f9a3a6.png` and requested the section's internal content match it. The section now has a centered introduction, three numbered columns (business today, attention, takeaways), aligned icon lists, gold dividers with connector arrows, and a cream booking strip. The previous bordered review cards and separate takeaway strip were removed. The main heading retains the shared 44/36/32px, weight-700 scale; list text retains the restrained 18/20px scale.

English and Spanish `ConsumerHome.process` copy now follows the reference, with new column descriptions, split takeaway titles/details, and booking-strip labels. `BookingCtaLink` gained a default-true `showCalendarIcon` option so this strip uses the reference's label-and-arrow button while existing callers retain their calendar icons and booking tracking. The destination includes a return path to `#how-it-works`.

Browser checks passed for both locales at 2048, 1536, 1440, 1024, 768, 390, and 320px, including matching desktop list-start positions, no text clipping or horizontal page overflow, and no text clipping at 200% root enlargement. Keyboard Enter opened `/en/book?returnTo=%2F%23how-it-works`; the focused button had a 3px outline. No page runtime errors were observed. Desktop section height is about 802–826px at wider widths; mobile stacks the full three-step brief and booking strip naturally.

Evidence: `C:/Users/ericb/.codex/visualizations/2026/09/22/01a0cb28-f65b-7510-bc37-04884e495874/strategy-call-brief/`; final visual verdict `.omx/state/homepage-strategy-brief/ralph-progress.json` (pass, 94). Connector artwork was verified after moving its background padding to a wrapper. Full build/test suites were not run per workspace instructions. The final arrow-wrapper correction affects decorative desktop connectors only.

Files for this reference update: `src/components/home/ConsumerHome.tsx`, `src/components/home/BookingCtaLink.tsx`, `src/messages/en.json`, and `src/messages/es.json`, plus this plan and verdict record. No dependencies added. Remaining verification scope: booking navigation was checked; no appointment was submitted and no full-site accessibility audit was performed.

### Follow-up: balance the strategy-call section

Implemented the user's correction that “A clear first step” felt oversized: review/evaluation and takeaway text now uses Inter at 18px below desktop and 20px on desktop, icon circles use 48px, and the review cards use 24px vertical padding with natural height instead of oversized minimum heights. Takeaway numbers use 32px/36px. The shared bold H2 scale remains 32/36/44px.

Browser and screenshot checks passed in English and Spanish at 1440, 768, 390, and 320px with no clipped section text or page overflow. English desktop section height decreased from 886px to 747px (about 16%); the mobile section decreased from 1539px to 1385px. Evidence is recorded in `homepage-headings/compact-process-measurements.json` and the compact-process screenshots in the visualization folder above. Verdict: `.omx/state/homepage-process-scale/ralph-progress.json`.

Changed implementation files: `src/components/home/ConsumerHome.tsx`, `src/messages/en.json`, and `src/messages/es.json`; plan and visual-verdict records updated.  
Simplification delivered: four independent section-heading treatments now share one scale, with shared card-heading, label, and introduction utilities scoped to the component. The closing CTA uses wrapping flex columns to accommodate enlarged text. No global typography rules or dependencies changed.  
Remaining risks: named-story permission/factual accuracy remains unverified; the broader individual-tax and IRS-help audience still needs content routing; navbar behavior at enlarged root text remains outside this scoped pass.
