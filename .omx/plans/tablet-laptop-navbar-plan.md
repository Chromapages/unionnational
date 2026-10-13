# UNT tablet and laptop navbar plan

Status: planning only. No application code, CMS content, navigation destinations or production configuration changed.

## Requirement and design read

Show every existing top-level navigation item on tablets and laptops at usable CSS viewport widths of 768px and above. Preserve current labels, locales, routes, branding, booking behavior, service navigation and mobile accessibility. Individual service destinations remain in the visible Services disclosure; this request does not expand every submenu into the header.

Reading this as: a navigation update for UNT business clients, with a trust-first visual language, evolving the existing Tailwind/React header. DESIGN_VARIANCE=3, MOTION_INTENSITY=2, VISUAL_DENSITY=5. Reuse existing components and dependencies; no imagery, animation library or new design system is needed.

Current stack: existing Next.js/React App Router, strict TypeScript, Tailwind styling and next-intl. This is a shared frontend layout change; no database, hosting or commerce changes are needed.

Visible inventory: Home, Services, Who We Help, Guides & Tools, About, Contact, FAQ, Shop, plus the existing booking CTA and language selector. Spanish labels remain Inicio, Servicios, A quién ayudamos, Guías y herramientas, Nosotros, Contacto, Preguntas frecuentes, Tienda. Source: `src/components/layout/navigationData.ts:23` and `src/messages/en.json` / `src/messages/es.json` Header fields. Home gets an explicit text link while the logo retains its existing home destination.

Pricing is not in the current navigation inventory. Adding Pricing is a separate scope decision, particularly while its commercial content remains unapproved; do not silently add it or new routes.

## Observed causes

- `src/components/layout/FloatingNavbar.tsx:162` hides full navigation below 1280px; the hamburger remains below that breakpoint. Tablet and compact laptop users receive the mobile layout.
- `FloatingNavbar.tsx:192`, `:206`, `:222` put secondary links and language switching behind More or hide them below 1440px. Contact and FAQ are absent from the desktop-derived lists (`navigationData.ts:35`, `:39`).
- `src/styles/globals.css:1113` absolutely centers the navigation, making it independent of the space used by logo and booking controls. A visibility-only breakpoint change can cause overlap.
- `globals.css:1175`, `:1183` progressively increase item padding, consuming the space required for additional visible links. `:1242` explicitly re-hides Spanish secondary links and language at 1440-1663px.
- `globals.css:1164`, `:1223` hardcode desktop/S-Corp spacers despite existing ResizeObserver measurement in `FloatingNavbar.tsx:46`. Taller responsive headers would cover content unless these overrides are removed.
- `globals.css:116` starts with a 69px fallback. Pre-hydration reservation must match each proposed layout to avoid an initial overlap/shift.

## Recommended responsive layout

Use CSS viewport/container width, not device names or user-agent detection. The following are initial design bands; confirm the one-row threshold with rendered EN/ES text, the S-Corp CTA, loaded fonts and existing CMS CTA content before implementation is considered complete.

| Available CSS width | Proposed layout | Visibility |
| --- | --- | --- |
| Below 768px | Retain current mobile logo, booking action and accessible drawer | Existing mobile behavior; all links remain reachable in drawer |
| 768-1023px | Utility row with logo, language and booking; eight nav items in an intentional four-column/two-row grid beneath it | All eight labels visible; no More/hamburger required to discover them |
| 1024-1535px | Utility row with logo, language and booking; all eight items in one full-width navigation row beneath it | All eight labels visible, including Contact and FAQ |
| 1536px and above, if fit is verified | One row containing logo, full navigation, language and booking in normal-flow CSS Grid | All items visible; keep the two-row layout if verified content cannot fit |

Height budget before safe-area inset: approximately 144-152px for portrait tablet, 104-112px for the two-row laptop layout, and at most 80px for a verified single-row layout. These are proposed budgets, not measurements. The extra portrait-tablet height is the deliberate tradeoff for visible links and long Spanish labels; do not conceal overflow or reduce text to compensate. Navigation remains available during scroll; compact mode must not remove items or change the number of rows unexpectedly.

Keep link text at a readable starting size of 14-16px and unchanged wording. Retain the logo asset with reserved dimensions; reduce excessive padding before considering more rows. Use explicit CSS Grid composition, not accidental flex wrapping, absolute centering, horizontal navigation scrolling, ellipsis or shortened translations. If the entire navigation cannot fit in one line, use the deliberate grid layout.

Preserve current booking destination and localized S-Corp label. Measure the actual CMS-configured CTA; a longer label can require retaining the utility row at wider widths. Do not change commercial meaning or booking destinations to solve spacing.

## Accessibility and interaction requirements

- Use the existing localized navigation landmark, a list of links and the existing disclosure behavior. Keep normal Tab/Shift+Tab order and visible `aria-current` states; do not add application-style menu/menubar semantics. W3C recommends the disclosure approach for ordinary website navigation: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/.
- Design tablet controls with at least 44x44 CSS-pixel targets and comfortable spacing as the project usability target. This exceeds the WCAG 2.2 AA minimum of 24x24 or its applicable spacing exceptions; 44px is not claimed to be the AA minimum. Source: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html.
- Services and language disclosures must work by tap/click and keyboard, including Enter/Space, Escape, outside interaction and focus restoration. Hover is optional enhancement for mouse users, never the only entry path. Existing behavior/tests: `ServicesDropdown.tsx:158`, `ServicesDropdown.test.tsx:63`, `LocaleSwitcher.tsx:49`.
- Preserve visible focus and existing contrast, and verify focused controls/anchors are not covered by the fixed header. Source: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html.
- At 200% text enlargement and 400% browser zoom, reflow based on available CSS width. If zoom reduces usable width below 768px, the accessible mobile drawer is allowed; do not force a physical-device layout or introduce horizontal page scrolling. Source: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html.
- Close an open mobile drawer when resizing into the persistent 768px+ navigation. Remove its body scroll lock/background inertness and return focus to a visible logo/link rather than its now-hidden hamburger. Current cleanup/focus ownership: `src/components/ui/MobileSidebar.tsx:135`, `:156`.
- Use deterministic CSS breakpoints and matching pre-hydration header-height reservations. Keep the existing ResizeObserver for actual height changes, with its cleanup. Avoid scroll listeners, resize-per-frame React state or a new global store.

## Bounded implementation steps

1. **Lock the requested behavior before the cleanup.** Extend `src/components/layout/navigationData.test.ts` to protect all eight ordered items/localized destinations; replace the old primary/secondary inventory expectations. Extend `FloatingNavbar.test.tsx` for visible full navigation, drawer-to-full-nav resize cleanup and preserved S-Corp booking behavior. Keep current mobile Escape/focus/scroll-lock and service disclosure regression coverage.
2. **Consolidate rendering around the existing inventory.** Update `navigationData.ts` and `FloatingNavbar.tsx` to render all top-level items in a single consistent order. Keep `ServicesDropdown` as the service expansion; retain access to the existing Services overview. Use existing translations and next-intl Link, without a second menu configuration. Remove desktop More state, duplicate secondary rendering and obsolete visibility listeners. `DesktopOverflowMenu.tsx` has only one production caller; delete it and its dedicated test only after the final caller check confirms removal. Preserve `mobileSection` grouping and mobile drawer behavior.
3. **Implement the responsive header and matching offsets.** Change only header-related rules in `src/styles/globals.css`, removing absolute centering, growing padding and locale-specific hiding. Keep unrelated Spanish services/shop container widths intact. Make header spacer depend on measured/fallback height for every page variant. Preserve safe-area inset and reduced-motion handling. Reuse `LocaleSwitcher.tsx` rather than duplicating language controls.
4. **Check affected fixed/sticky consumers.** `ServicesDropdown.tsx:277` already positions its portal using header height; verify placement and viewport-constrained scrolling. Audit actual overlap before modifying downstream components: `ServiceSidebar.tsx:93`, `BookkeepingStickyCard.tsx:54`, `TransactionCard.tsx:52`, `LegalContentClient.tsx:102`, hub sticky sidebars, `book/page.tsx:47` and `IndustryServiceExperience.tsx:80`. `src/components/ui/StickyBuyBar.tsx:24` reads header height once; verify resize behavior and repair its threshold only if the taller header produces a regression. Keep all forms, product/cart behavior and destinations unchanged.
5. **Verify local previews and capture evidence.** Add a bounded navbar browser spec using `src/test/e2e/fixtures.ts` to block submissions/provider transactions. Extend `live-audit-navigation.spec.ts:11` into tablet/laptop sizes and replace the literal 112px scroll-margin assertion at `:29` with measured header/target geometry. Run scoped navigation/disclosure/locale tests and local browser checks during the authorized implementation phase, with build/lint/source checks when authorized under workspace rules. Capture EN/ES portrait-tablet, landscape-tablet, compact-laptop and wide-laptop screenshots; apply Visual Verdict against the existing UNT brand and requirements before the next visual edit. Do not publish or deploy as part of this plan.

## Testable acceptance criteria

1. At 768, 820, 834, 1024, 1180, 1280, 1366, 1440, 1536, 1664 and 1920 CSS pixels, all eight top-level items plus booking/language are visible without opening More or a hamburger, in both locales. At 767px and below, current mobile navigation works.
2. Test breakpoint neighbors 767/768, 1023/1024 and 1535/1536 and representative short landscape heights. No item is clipped, overlapped, ellipsized or hidden by locale/page overrides; no horizontal page scrolling occurs.
3. All menu targets meet the 44px project target at tablet widths, focus remains visible, and every route is reachable with keyboard and touch. No visible label changes are needed to make the layout fit.
4. The header spacer matches actual header height within 1px after layout stabilizes; anchor targets and focused sticky content remain below its bottom edge. Opening services/language does not change header height or push the page.
5. Resize/orientation change with a drawer or Services disclosure open does not leave invisible overlays, inert background content, body scroll lock, stale dropdown position or focus on a hidden control.
6. Test default and S-Corp headers, CMS logo failure fallback and the longest currently configured localized booking label. Verify normal and compact scroll states without hiding links.
7. Preserve `/book`, service redirects, locale navigation, shop/cart flows, industry forms and the `/health-check` versus `/intake` distinction. Browser checks submit no leads, appointments or charges.
8. Verify 200% text sizing, real 400% browser zoom/320 CSS-pixel reflow, reduced motion and no-JavaScript initial header geometry. Record checks separately from full assistive-technology/physical-device verification.

## Alternatives, risks and limits

- Changing only `xl` to `md` was rejected: existing absolute positioning, Spanish overrides, utility widths and fixed spacers remain and can overlap.
- One row at every tablet/laptop width was rejected: preserving eight labels, long Spanish copy, booking, language and comfortable targets at 768px needs more space. Font shrinking, truncation, scrolling and More would undermine the request.
- A measured wide one-row layout is preferred over locale-specific hiding thresholds. If the candidate 1536px threshold fails, retain the already complete two-row layout until a wider content-safe threshold is validated; never hide links to force it.
- Extra fixed-header height can obscure sticky cards/anchors and reduce short-screen space. Mitigate with explicit height budgets, measured offsets and the bounded downstream audit rather than a whole-site redesign.
- Contact/FAQ exposure and the explicit Home text link are intentional. Pricing and other new destinations remain an unresolved optional addition, not part of the existing eight-item requirement.
- Existing pricing implementation and dirty translation work must remain intact. No CMS schema/mutation, dependency addition, new icon family, route rename or general header redesign is proposed.

Planning evidence: source/caller/CSS/test inventory plus current W3C guidance. No app changes, rendered fit measurements, new screenshots, automated checks or physical-device validation were performed for this plan. The exact single-row cutoff and height budgets remain implementation validation points.
