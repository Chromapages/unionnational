# Annual support plans reference redesign

Date: 2026-09-30
Scope: `#support-plans` on `/en/services` and `/es/services`.
Status: implemented and browser-verified.

## Current state

`src/components/services/ServicesDesktopExperience.tsx` renders the existing three advisory tiers using CMS prices/features and localized fallback lists. The current section has a plain heading, scope notice above cards, small prices/icons and text-only details links. Growth has a qualified welcome-benefit note. Prices observed in the local page: $3,500 / $6,500 / $10,000 annually. Keep actual benefits; the reference's additional benefits are not substantiated by the current data.

## Plan

1. Reuse the existing section/container and map. Add an annual-plans eyebrow, explanatory H2 and support statement with a shield callout. Keep Outfit/Inter and the established green/gold palette. New copy addresses business owners broadly.
2. Restyle Foundation as white, Growth as warm cream with gold border/recommended badge, Executive as deep green. Add circular icons and localized short taglines, separate price block with a Starting at label, large price and annual suffix. Put inherited benefits inside light tinted panels and replace text-only details links with full-width buttons pointing to the existing pricing page.
3. Move the existing scope notice into the bottom strip alongside a booking prompt and reuse BookingCtaLink with its tracking/focus/loading behavior. Retain Growth's qualified welcome-offer note and feature exclusions.
4. Use a container query for three columns when content width is sufficient; stack on mobile and at enlarged text sizes. Verify both languages at 320, 375, 768, 1024, 1440 and 1920px, plus enlarged text, links, visibility and browser errors. Review screenshot against the reference and record the visual verdict. No dependencies, unrelated sections, live CMS writes, build or test suite runs.

Files: existing services component, EN/ES locale messages, this plan and visual-verdict state. Extend the existing small runnable services browser check if needed; do not add another framework or suite.

## Result and verification

Implemented the reference composition with circular icons, large annual prices, equal-height desktop cards, tinted inherited-benefit panels, recommended Growth styling, full-width details buttons and a compact booking strip. The existing CMS benefits and qualified Growth welcome-offer note were retained. No extra benefits were invented. The prior scope notice moved below the cards; no duplicate plan component or dependencies were added.

Changed files:
- `src/components/services/ServicesDesktopExperience.tsx`
- `src/messages/en.json`
- `src/messages/es.json`
- `scripts/check-services-priority.mjs` (extended the existing runnable check)
- This plan and `.omx/state/services-annual-support-reference/ralph-progress.json`

Browser inspection covered EN/ES at 320, 375, 768, 1024, 1440 and 1920px plus 200% text at 1440px: 14 states. Final results: no overflow, clipping, desktop button wrapping or browser errors. Three prices and localized `/pricing` links remained intact; the booking link points to `/book` with its return parameter. Desktop and Spanish mobile screenshots reviewed. At narrow container widths, cards stack to accommodate full localized labels. Saved check, build, lint and typecheck were not run per workspace instructions; no live CMS edits were made.

Evidence: `services-plans-final-verification.json` and `services-plans-final-{en,es}-{375,1440}.png` in the current visualization artifact directory.

## New English copy for CMS reuse

Eyebrow: Annual support plans

Heading: Choose the level of support your business needs.

Subtitle: Three levels. The same commitment to practical tax planning and a stronger business.

Assurance heading: A higher standard at every level.

Assurance body: Proactive guidance. Real relationships. Support built around your business.

Foundation tagline: Get the essentials right.

Growth tagline: Stay ahead all year.

Executive tagline: Strategic guidance in your corner.

Price label: Starting at

Scope heading: Annual plans bundle services and support.

Help heading: Not sure which plan fits?

Help body: Talk through your current setup and goals.
