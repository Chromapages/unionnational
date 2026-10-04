# Desktop Homepage Hero Audit and Redesign Plan

## Requirements Summary

Redesign the homepage desktop hero as the page's primary communication and conversion surface. The result must:

- make the value proposition understandable within one short scan;
- establish an unmistakable primary action and a clearly secondary path;
- feel more premium, calm, and intentional without adding decorative elements;
- preserve the foreground/content video in the right column;
- preserve the cover video behind the green background treatment;
- improve accessibility, localization, motion behavior, performance, and failure handling;
- remain coherent at wide desktop, narrow desktop, high zoom, and with longer Spanish copy.

The hero is rendered by `VideoHero` from the localized homepage route ([src/app/[locale]/page.tsx:91](../../src/app/[locale]/page.tsx#L91), [src/app/[locale]/page.tsx:100](../../src/app/[locale]/page.tsx#L100)). The redesign should stay within the existing homepage composition rather than introducing another hero implementation.

## Current-State Audit

### What already works

- The hero has one semantic `h1` and labels the section with `aria-labelledby` ([src/components/home/VideoHero.tsx:22](../../src/components/home/VideoHero.tsx#L22), [src/components/home/VideoHero.tsx:30](../../src/components/home/VideoHero.tsx#L30)).
- The background cover video already fills the hero and sits below a green gradient ([src/components/home/VideoHero.tsx:23](../../src/components/home/VideoHero.tsx#L23), [src/components/home/VideoHero.tsx:26](../../src/components/home/VideoHero.tsx#L26)).
- The foreground video is already isolated as a reusable right-column player with controls, a poster, an accessible label, reduced-motion awareness, and error fallback ([src/components/home/HeroVideoPlayer.tsx:23](../../src/components/home/HeroVideoPlayer.tsx#L23), [src/components/home/HeroVideoPlayer.tsx:45](../../src/components/home/HeroVideoPlayer.tsx#L45), [src/components/home/HeroVideoPlayer.tsx:56](../../src/components/home/HeroVideoPlayer.tsx#L56)).
- The two-column layout becomes active at the `lg` breakpoint, and the player preserves a 16:9 ratio ([src/components/home/VideoHero.tsx:27](../../src/components/home/VideoHero.tsx#L27), [src/components/home/HeroVideoPlayer.tsx:57](../../src/components/home/HeroVideoPlayer.tsx#L57)).

### Problems to solve

1. **Message density weakens hierarchy.** The left column currently contains an eyebrow, a four-line headline, a long subhead, two CTAs, strategy-call explanation, audience qualifier, and a credential list ([src/components/home/VideoHero.tsx:29](../../src/components/home/VideoHero.tsx#L29), [src/components/home/VideoHero.tsx:33](../../src/components/home/VideoHero.tsx#L33), [src/components/home/VideoHero.tsx:36](../../src/components/home/VideoHero.tsx#L36), [src/components/home/VideoHero.tsx:42](../../src/components/home/VideoHero.tsx#L42), [src/components/home/VideoHero.tsx:44](../../src/components/home/VideoHero.tsx#L44)). This creates several competing stopping points instead of one clear argument.
2. **The primary homepage action is optimized for warm traffic.** The hero makes `Book a Strategy Call` primary ([src/components/home/VideoHero.tsx:37](../../src/components/home/VideoHero.tsx#L37)), while the approved funnel identifies an S-Corp/value assessment as the better homepage entry for cold visitors and booking as the secondary high-intent path ([union-national-tax-main-funnel-map-07.md:44](../../union-national-tax-main-funnel-map-07.md#L44), [union-national-tax-main-funnel-map-07.md:62](../../union-national-tax-main-funnel-map-07.md#L62)).
3. **The secondary CTA duplicates the right-column media's purpose.** `See How It Works` points down-page while the adjacent foreground video is already the most natural “how it works” interaction ([src/components/home/VideoHero.tsx:40](../../src/components/home/VideoHero.tsx#L40), [src/components/home/VideoHero.tsx:52](../../src/components/home/VideoHero.tsx#L52)).
4. **Proof is duplicated.** Hero credentials repeat claims immediately displayed in the separate trust bar ([src/components/home/VideoHero.tsx:44](../../src/components/home/VideoHero.tsx#L44), [src/components/home/TrustBar.tsx:3](../../src/components/home/TrustBar.tsx#L3)). The unsourced average-savings claim also needs evidence or removal before production use ([src/components/home/VideoHero.tsx:49](../../src/components/home/VideoHero.tsx#L49)).
5. **CMS localization is bypassed.** The homepage query fetches localized title, subtitle, and CTA fields ([src/sanity/lib/queries/shared-queries.ts:166](../../src/sanity/lib/queries/shared-queries.ts#L166)), and the schema defines them ([src/sanity/schemaTypes/homePage.ts:20](../../src/sanity/schemaTypes/homePage.ts#L20), [src/sanity/schemaTypes/homePage.ts:61](../../src/sanity/schemaTypes/homePage.ts#L61)), but `VideoHero` renders English literals and only consumes media URLs ([src/components/home/VideoHero.tsx:8](../../src/components/home/VideoHero.tsx#L8), [src/components/home/VideoHero.tsx:29](../../src/components/home/VideoHero.tsx#L29)).
6. **Two moving videos compete for attention.** The background cover video always autoplays ([src/components/home/VideoHero.tsx:24](../../src/components/home/VideoHero.tsx#L24)), while the foreground player also attempts autoplay when reduced motion is not enabled ([src/components/home/HeroVideoPlayer.tsx:32](../../src/components/home/HeroVideoPlayer.tsx#L32)). The foreground video should become a deliberate user-controlled interaction.
7. **The hero is taller than necessary.** At 1440×1000 the live hero measured approximately 827px tall beneath the header. Reducing copy and vertical padding should keep the complete message, CTA, and video visible together without making the hero feel compressed.

## Recommended Design Direction

Use a focused two-column “strategic clarity” composition:

```text
┌──────────────────────────────────────────────────────────────────────┐
│  restrained green cover video + dark readability scrim              │
│                                                                      │
│  EYEBROW                         ┌─────────────────────────────────┐  │
│  Clear 2–3 line headline         │  poster / foreground video      │  │
│  One concise supporting idea     │  visible play affordance         │  │
│                                  │  short context label             │  │
│  [PRIMARY ASSESSMENT CTA]        └─────────────────────────────────┘  │
│  Book a strategy call →                                               │
│  one short reassurance line                                           │
└──────────────────────────────────────────────────────────────────────┘
│  existing trust bar: three verified proof points                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Message hierarchy

1. Keep the approved core promise, but control its desktop line breaks to two or three lines rather than four: “Stop overpaying the IRS. Build a smarter business.”
2. Replace the current long paragraph with one sentence that identifies the audience, mechanism, and outcome. Target 110–150 characters in English and allow up to 190 characters in Spanish.
3. Remove the strategy-call explanation and separate “best for” paragraph from the initial scan. Fold the most important qualifier into the subhead or one short reassurance line.
4. Move all credential proof into the existing `TrustBar`; do not duplicate the same claims inside the hero.
5. Remove `Avg. Annual Savings $23,420` unless a documented calculation, sample definition, and approved disclaimer are available.

### CTA hierarchy

1. Make the cold-visitor value path the hero's dominant action: `See If an S-Corp Could Save You Money` (or the approved shorter localized equivalent) routed to the existing `/scorp-estimator` path. CMS may customize the localized label, but it must not override this destination without a separately approved funnel experiment.
2. Use `Book a Strategy Call` as a quieter text-link or low-emphasis secondary action for warm visitors. The same booking action remains persistent in the navbar, so it does not need equal hero weight.
3. Remove the `See How It Works` hero button. Give that job to the visible right-column video through its poster, play affordance, and contextual label.
4. Add a single short expectation line below the actions only if it resolves material uncertainty, such as assessment time or what happens next. Do not add badges or extra buttons.

### Visual hierarchy

1. Retain the existing cover video as `absolute`, full-bleed, and `object-cover`, but reduce its perceptual contrast under a layered brand-green treatment. Use a strong left-side scrim for text and a slightly lighter right-side window around the foreground player.
2. Keep the foreground video in the right column. Present it as one premium media object: consistent 16:9 frame, restrained border, subtle shadow, visible poster, and one play affordance. Avoid floating badges, decorative cards, or ornamental glows.
3. Adjust the desktop grid so the message gets enough width for controlled headline wrapping while the video remains at least 500px wide at 1280px and above.
4. Reduce `lg` vertical padding from the current `py-28` and target a hero height of 650–740px at 1440×900, excluding the header. The primary CTA and complete player must be visible without scrolling.
5. Keep one accent color—the existing gold—for eyebrow, primary CTA, focus treatments, and carefully selected emphasis. Do not introduce another accent.

## Implementation Steps

### 1. Define the localized content contract

- Expand `VideoHeroProps` so it consumes exact-locale CMS fields for `heroTitle`, `heroSubtitle`, `heroCtaText`, and `heroSecondaryCtaText` alongside the existing media fields ([src/components/home/VideoHero.tsx:8](../../src/components/home/VideoHero.tsx#L8), [src/sanity/lib/queries/shared-queries.ts:166](../../src/sanity/lib/queries/shared-queries.ts#L166)). CTA destinations are code-owned: primary `/scorp-estimator`, secondary `/book`.
- Change `HOME_PAGE_QUERY` to expose raw active-locale values such as `heroTitleLocalized: heroTitle[$locale]` rather than only English-coalesced hero values. For each visible hero field, use the precedence `exact-locale CMS value → same-locale message fallback → omit optional field`. Spanish must never receive an English CMS fallback. Keep existing coalesced fields only where another consumer demonstrably needs them.
- Establish the same-locale fallbacks in `src/messages/en.json` and `src/messages/es.json`, using one dedicated homepage-hero namespace rather than the currently duplicated `Hero` namespaces.
- Update misleading Sanity field descriptions, especially the primary CTA field currently described as a video URL ([src/sanity/schemaTypes/homePage.ts:61](../../src/sanity/schemaTypes/homePage.ts#L61)).

### 2. Simplify the content hierarchy

- Refactor the left column in `VideoHero.tsx` into four blocks only: eyebrow, headline, one supporting paragraph, and action group.
- Remove the current strategy-call explanation, separate best-fit paragraph, and inline credential list ([src/components/home/VideoHero.tsx:42](../../src/components/home/VideoHero.tsx#L42)).
- Keep proof in `TrustBar.tsx`, and ensure its three claims are non-duplicative and support the promise immediately above ([src/components/home/TrustBar.tsx:4](../../src/components/home/TrustBar.tsx#L4)).
- Use semantic emphasis rather than decorative spans; keep exactly one `h1`.

### 3. Rebuild the CTA group around one dominant action

- Render the assessment CTA as the only filled gold control.
- Render booking as a lower-emphasis inline link with a directional icon; do not give it a second outlined pill of equal size.
- Hard-code the assessment destination to `/scorp-estimator` and booking to the canonical `/book` resolver. CMS may customize localized action labels, not these routes.
- Give both actions visible `focus-visible` treatment with at least a two-pixel outline and sufficient offset.
- Track the three interactions through `window.dataLayer` from a small local `trackHeroEvent` function in `VideoHero`: `hero_primary_cta_click`, `hero_secondary_cta_click`, and `hero_video_start`. Every payload includes `{ locale, placement: "homepage_hero", destination }`; the video event uses `destination: "foreground_video"` and fires once per page view. Pass an `onPlay` callback into `HeroVideoPlayer` for the video event. Do not fire Meta `Lead`, `Schedule`, or other conversion events until the downstream conversion actually occurs, and do not add an analytics dependency.

### 4. Strengthen the desktop composition

- Replace the current desktop grid constraint at [src/components/home/VideoHero.tsx:27](../../src/components/home/VideoHero.tsx#L27) with a content-first two-column ratio that preserves a minimum 500px media column without forcing the headline into four short lines.
- Cap the text measure at approximately 620px and the supporting paragraph at 50–56 characters per line.
- Align the video frame optically with the headline/subhead block rather than centering it against the full height of all left-column microcopy.
- Set explicit desktop spacing tokens for eyebrow→headline, headline→subhead, subhead→CTA, and CTA→reassurance so the rhythm survives CMS copy changes.
- At 1100–1279px, reduce gaps and type scale before falling back to the stacked layout. Do not allow horizontal clipping or a video narrower than its usable controls.

### 5. Preserve the background video while reducing noise

- Keep the background cover video behind the green surface exactly as requested ([src/components/home/VideoHero.tsx:23](../../src/components/home/VideoHero.tsx#L23)).
- Add a dedicated localized-alt `heroBackgroundPoster` image field to `src/sanity/schemaTypes/homePage.ts`, project its URL from `HOME_PAGE_QUERY`, and render it as the static background before video readiness. If no poster exists or media fails, fall back to the existing CSS brand-green surface rather than borrowing the foreground player's poster.
- Respect `prefers-reduced-motion` by showing the poster/static frame instead of autoplaying the cover video.
- Consider `preload="none"` or delayed source attachment for the cover video when data-saving preferences are active; keep the foreground poster available immediately.
- Ensure the cover video remains decorative with `aria-hidden="true"`, no controls, and no focusability.

### 6. Make the right-column video intentional

- Keep `HeroVideoPlayer` in the right content column, but stop attempting foreground autoplay by default ([src/components/home/HeroVideoPlayer.tsx:32](../../src/components/home/HeroVideoPlayer.tsx#L32)).
- Use the CMS poster as the initial state and provide a clear native or custom-labelled play affordance.
- Add a short visible label or caption explaining the video's value, not merely “See how we work.”
- Preserve controls, keyboard access, focus ring, inline playback, error status, and the 16:9 container ([src/components/home/HeroVideoPlayer.tsx:45](../../src/components/home/HeroVideoPlayer.tsx#L45), [src/components/home/HeroVideoPlayer.tsx:56](../../src/components/home/HeroVideoPlayer.tsx#L56)).
- If the foreground player falls back to the background video source, ensure it still receives an appropriate poster and does not create two simultaneous audible/moving experiences.

### 7. Add regression and interaction coverage

- Add `VideoHero.test.tsx` for localized CMS content, translation fallbacks, CTA priority, internal CTA destinations, proof de-duplication, and missing-media states.
- Add `HeroVideoPlayer.test.tsx` for poster-first behavior, user-initiated playback, media error fallback, accessible name, and reduced-motion handling.
- Add a Playwright hero scenario covering wide desktop, 1280px desktop, Spanish, 200% zoom-equivalent reflow, keyboard focus order, and video failure.
- Add a lightweight visual-regression snapshot at 1440×900 and 1280×800 if the repository's existing tooling supports snapshots without a new dependency.

## Acceptance Criteria

### Clarity and hierarchy

- In a five-person internal comprehension check, at least four participants can identify the audience, primary value, and primary next step after a five-second exposure without scrolling.
- The desktop hero contains no more than one eyebrow, one `h1`, one supporting paragraph, two actions, and one optional reassurance line.
- The `h1` occupies no more than three lines at 1440px in both English and Spanish reference content.
- No credential or savings claim is duplicated between the hero and trust bar.

### CTA effectiveness

- Exactly one filled/high-emphasis CTA appears in the hero.
- The primary CTA routes exactly to localized `/scorp-estimator`; CMS content cannot silently replace the destination.
- The secondary booking action routes to localized `/book`.
- `See How It Works` is not rendered as a competing hero button; the right-column video supplies that interaction.
- Primary CTA, secondary booking, and video-start events emit `hero_primary_cta_click`, `hero_secondary_cta_click`, and one `hero_video_start` event respectively, with the required locale, placement, and destination payload.

### Layout and visual quality

- At 1440×900, the headline, subhead, both actions, and full 16:9 foreground video are visible without vertical scrolling below the fixed header.
- At 1280×800, no hero text, CTA, video control, or focus ring clips or overlaps.
- At 200% zoom or an equivalent 720px CSS viewport, content reflows to one column with logical reading order: message → actions → foreground video.
- The background cover video remains full-bleed behind a green overlay and never reduces normal text contrast below WCAG AA.
- No new badges, floating cards, gradients beyond the background readability treatment, or decorative icons are added.

### Accessibility

- The hero has exactly one `h1` and retains a named section.
- Keyboard order follows primary CTA → secondary booking → foreground video controls.
- All custom focus indicators remain visible against the green background.
- Background video is decorative and ignored by assistive technology.
- Reduced-motion users receive a static background and no attempted foreground autoplay.
- Foreground media retains controls, an accessible name, a poster, and a meaningful error status.
- English and Spanish content remain complete and understandable without language fallback leakage.

### Performance and resilience

- The foreground poster paints before video playback begins.
- A failed background video preserves the green hero and readable text without layout shift.
- A failed foreground video preserves the right-column frame and presents the existing accessible fallback message.
- Missing or partial Sanity hero content falls back per field rather than replacing the entire hero with English literals.
- Hero and trust-bar layout shift is visually imperceptible; the fixed aspect ratio reserves foreground-media space before loading.

## Risks and Mitigations

- **Risk: stronger assessment CTA conflicts with a sales preference for immediate calls.** Mitigation: preserve booking as the secondary action and the persistent navbar CTA; compare qualified assessment completions and booked calls after launch.
- **Risk: Spanish strings reintroduce four-line headlines.** Mitigation: approve Spanish content alongside English and test at 1280px, 1440px, and 200% zoom before release.
- **Risk: two videos create bandwidth and motion fatigue.** Mitigation: background-only autoplay when motion is allowed; poster-first foreground video; static fallback for reduced motion/data saving.
- **Risk: CMS editors reintroduce dense copy.** Mitigation: add sensible schema validation/character guidance and component-level maximum measures rather than truncating rendered copy.
- **Risk: chat launcher overlaps hero or trust content.** Mitigation: include the active chat widget in 1280px and 1440px visual checks and preserve adequate bottom/right clearance.
- **Risk: conversion claims lack substantiation.** Mitigation: remove the average-savings figure unless methodology and approval are documented.

## Verification Steps

1. Render `/en` and `/es` with complete CMS data, partial data, and no hero media.
2. Capture 1440×900 and 1280×800 screenshots with the chat widget present; compare hierarchy, headline wrapping, video visibility, and CTA prominence.
3. Run keyboard checks from the skip link through both hero actions and all foreground video controls; confirm visible focus and no trap.
4. Emulate `prefers-reduced-motion: reduce`; verify the background remains static and the foreground video does not autoplay.
5. Force background and foreground media failures separately; verify stable layout and accessible fallbacks.
6. Switch locales while query/hash state is present; verify localized copy, CTA destinations, and no state loss.
7. Confirm primary CTA, booking, and video-start analytics emit distinct events without duplicate firing.
8. Review final screenshots against the “no added visual noise” constraint before implementation sign-off.

## Recommended Delivery Order

1. Content contract and localized fallback wiring.
2. Hero hierarchy and CTA simplification.
3. Desktop grid, typography, and spacing.
4. Background and foreground video behavior.
5. Trust-bar de-duplication.
6. Tests, visual verification, and analytics validation.

Do not change downstream homepage sections unless needed to remove duplicated proof or maintain the hero-to-trust-bar transition.
