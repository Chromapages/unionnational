# Explore industries reference cards

Date: 2026-10-01
Status: implemented and browser-verified.
Reference: codex-clipboard-20a7b97b-85ac-44f7-be24-40c4a0d3f77c.png.
Scope: #industry-picker on /en/industries and matching ES route.

## Design read and current state

A reference-led financial-advisory section for business owners, with restrained green/gold brand styling, clear hierarchy and four equally weighted choices. Design variance 3, motion intensity 1, visual density 5. Reuse existing Tailwind layout, Outfit/Inter and Lucide icons; preserve the 94rem container and native link cards.

The existing section in IndustriesDesktopExperience.tsx already has four equal-height cards, three help areas and one canonical industry-page destination each. Container queries handle enlarged text. Currently there is only a small heading, bare industry icons and unadorned area lists. Hero, short proof, closing CTA and relocated detail pages are outside this change.

## Plan before implementation

1. Use Explore industries as a tracked uppercase eyebrow with a thin gold rule. Add the supplied two-line Choose your industry / Get the right financial guidance heading and introductory sentence, translated for ES. Keep the established section heading scale and brand fonts.
2. Give each industry icon a circular brand tint, keep restaurant's circle warm cream, and use brand green for icons. Add the supplied card descriptions, a divider and three relevant icon/text help rows. Reuse the existing three keywords and link labels/destinations. Preserve equal heights and bottom-aligned underlined actions; add no new components or dependencies.
3. Review desktop screenshot against the reference. Check EN/ES at 320, 375, 768, 1024, 1440 and 1920px and enlarged text: four equal cards, three help rows each, no clipping/overflow, keyboard focus and links intact. Existing saved browser check remains unrun per workspace instructions; extend it only for the new icon rows. No build/lint/typecheck/test-suite runs or live CMS edits.

Expected files: IndustriesDesktopExperience.tsx, existing scripts/check-industry-expertise.mjs, this plan and visual-verdict state. Paste-ready English copy will be recorded here on completion.

## Completion and verification

Updated the existing section with the two-line heading, eyebrow/rule, introductory sentence, circular industry icons, supplied descriptions, dividers, icon-led help rows and stronger underlined actions. Kept brand fonts, 94rem width, four equal cards, one canonical link each, three help areas and native keyboard navigation. Brand green/gold tints are used throughout, including the E-commerce circle; the reference's blue tint was adapted to the existing palette. No new components or dependencies, no restored tabs or repeated industry blocks, no live CMS edits.

Changed files: `src/components/industries/IndustriesDesktopExperience.tsx`, `scripts/check-industry-expertise.mjs`, this plan and `.omx/state/explore-industries-reference-cards/ralph-progress.json`. The existing saved check was extended to count the three decorative help icons per card and was not executed. Build/lint/typecheck/test suites remain unrun per workspace instructions.

Browser inspection covered EN/ES at 320, 375, 768, 1024, 1440 and 1920px plus 200% text at 1440px: 14 states. No section clipping, horizontal overflow or browser errors. All four cards had equal heights, three icon/help rows and unchanged links. Keyboard Tab visited all four links with visible 2px outlines. Desktop and Spanish mobile screenshots reviewed against the reference.

Evidence: `explore-industries-verification.json` and `explore-industries-final-{en,es}-{375,1440,1920}.png` in the current visualization artifact directory.

## English copy for CMS reuse

Eyebrow: Explore industries

Heading line 1: Choose your industry.

Heading line 2: Get the right financial guidance.

Intro: Different businesses. Different challenges. A financial partner who gets it.

Construction: Get a clearer view of job margins and build a stronger, more profitable business.

Restaurants: Understand where margins need attention and protect what you’ve built.

Real estate: See how property decisions affect your tax picture and long-term wealth.

E-commerce: Understand margins across sales channels and keep more of what you grow.

Existing help areas and industry-link labels are unchanged.
