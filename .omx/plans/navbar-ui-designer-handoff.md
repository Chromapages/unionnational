# UI designer handoff: UNT tablet/laptop navbar

Copy the prompt below to the UI designer agent.

---

You are the UI designer agent working in `D:\WORK\WORK\unionnational`.

Fix the tablet and laptop navbar immediately. The user has reviewed the current uncommitted implementation and rejected its visual quality. Deliver a polished, compact header that fits Union National Tax's existing brand while showing every existing top-level navigation item at CSS widths of 768px and above.

Use `$design-taste-frontend` and `$ponytail`. Read AGENTS.md, git status and the actual current implementation first. Preserve unrelated/uncommitted pricing, CMS, health-check, commerce and translation work. Read `.omx/plans/tablet-laptop-navbar-plan.md` for requirements and affected offsets; its prescribed grids/heights are starting material, not an approved visual result. The user's latest visual feedback overrides that layout recommendation.

The project already uses Next.js, React, strict TypeScript, Tailwind and next-intl. Reuse its components, fonts, logo and green/gold palette. No new dependencies, assets, CMS work or broad redesign.

Requirements:

- Keep all eight top-level items visible: Home, Services, Who We Help, Guides & Tools, About, Contact, FAQ and Shop. Preserve the actual English/Spanish labels from Header messages, route destinations and active states.
- Keep booking and language controls visible. Preserve CMS-configured booking destinations and the longer S-Corp booking label. Do not add Pricing or rename labels/routes without a separate instruction.
- Preserve the accessible mobile drawer below 768px. Services may retain its existing disclosure for individual services; the top-level Services control must remain visible.
- Preserve keyboard/touch operation, focus indication, Escape dismissal, drawer resize cleanup, body scroll restoration and the measured header-height system. Keep anchors/sticky content clear of the header.

Visual direction:

- Make this feel like a cohesive professional tax-firm header: clear hierarchy, restrained borders, balanced spacing and a booking action that is prominent without crowding the navigation.
- Rework the current boxed, equal-width four-by-two navigation toolbar. Avoid a dashboard/tile-grid appearance, a visually detached menu container, oversized empty areas and controls stretching into large artificial buttons.
- Prefer one clean row where content actually fits. At narrower widths, compose an intentional, lightweight additional navigation row or balanced text-link arrangement. All links still need to be visible; do not force a single row by shrinking text, clipping, truncating, scrolling horizontally or bringing back More.
- Use content-driven spacing and breakpoint choices that accommodate Spanish. Do not treat 1024px or 1664px as fixed design mandates. Keep each label legible and touch targets comfortable, with a 44px project target where practical.
- Keep the logo recognizable and proportional. Align navigation, language and booking controls carefully. Existing fonts and colors are the foundation; no decorative animation, new icon family or invented branding.

Primary files:

- `src/components/layout/FloatingNavbar.tsx`
- `src/styles/globals.css`, specifically header/strategy-dock rules
- `src/components/layout/navigationData.ts`
- `src/components/layout/ServicesDropdown.tsx`
- `src/components/layout/LocaleSwitcher.tsx`
- `src/components/ui/MobileSidebar.tsx`, only if interaction corrections are necessary

Current implementation facts:

- All eight items now come from one `siteNavigationItems` inventory; desktop More was removed.
- Current CSS uses a utility row plus four-column/two-row navigation at 768-1023px; a utility row plus one navigation row at 1024-1663px; and a combined row at 1664px+. The user dislikes the resulting design. These layouts can be replaced.
- Existing Services panel centering was corrected, and drawer cleanup restores focus to the visible logo when resizing to tablet.
- Seventeen sticky/anchor offsets were changed to use `--header-height`. Preserve these fixes while changing header height; inspect their actual current diff rather than resetting them.
- Navigation unit checks last passed 27 tests. The latest broad TypeScript attempt found two scoped test typing issues: an unsupported `exact` option in Testing Library's getByRole and an unsupported top-level `reducedMotion` option in the new browser spec. It also found unrelated unknown-value typing errors in `src/app/[locale]/hub/industries/[slug]/page.tsx`. Repair any scoped typing issues needed for the change, preserve unrelated work and report outstanding errors accurately.

Verification restriction, directly from the user:

**Do not run Playwright or automated browser testing. Do not launch browser-test workers, install browsers, generate automated screenshots or extend the browser test suite. The user will check the result manually.** Follow this instruction over generic skill requirements to run browser checks. No full test/build loops solely to prove visual fit. Use targeted static or existing unit checks only where needed for code correctness, and clearly state what remains manually unverified.

Work quickly with the smallest complete diff. Apply the redesign locally so the user can refresh the preview on port 3030. Check whether that server is running before reporting it available; preserve other processes. Do not push, deploy, publish CMS content, submit forms, book appointments or touch payments.

Return a concise summary of the actual visual/layout changes, changed files, any checks performed and the tablet/laptop widths the user should inspect. Do not claim visual approval or accessibility compliance without evidence. Stop at local manual-review readiness.

---

This handoff does not authorize publication. The prior browser check was stopped; no further UI edits or browser checks were made while preparing this prompt.
