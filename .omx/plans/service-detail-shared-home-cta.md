# Service-detail homepage CTA alignment

Mode: DESIGN. Reuse the homepage's actual FinalBookingCTA component, rather than copy its markup. Existing service CTA labels and S-Corp disclaimer remain; shared booking destination, return path, scheduling state and analytics come from the existing component.

## Plan

1. Inventory the seven core CMS routes, their /services aliases and any additional published CMS slugs. Replace the shared ServicePageTemplate closing banner unconditionally so missing CMS closing copy cannot suppress the homepage CTA.
2. Replace the four service-linked partner-program closing sections (construction, restaurants, real estate, e-commerce) with the same component. Inspect the standalone legacy S-Corp offer and include its closing CTA with an EN provider if needed.
3. Use service-next-step as the section ID and preserve per-page analytics placement. Keep the existing S-Corp disclaimer beneath the shared component. Hide the existing mobile sticky CTA while the final CTA is visible; extend existing chat-widget visibility protection to this section.
4. Keep service copy, routes, hero, price, proof, FAQ and CMS data intact. No new dependency, CTA component or feature.
5. Verify every service/menu destination in the live browser, including dynamic CMS routes. Compare computed closing-panel styles with homepage; check 390/768/1440px, booking links, focus, contrast, single CTA instance and mobile obstruction. Save the browser evidence; do not run test/build/lint/typecheck suites under the workspace restriction.

## Scope

Core routes: /s-corp-tax-advantage, /tax-planning, /strategic-bookkeeping, /fractional-cfo, /tax-preparation-and-filing, /new-business-formation, /payroll-services. Service-linked partners: /industries/construction, /industries/restaurants, /industries/real-estate, /industries/e-commerce. /services/[slug] uses the same template or redirects to canonical routes. Standalone /scorp-advantage is also a service offer with a separate legacy closing CTA.

Expected source: ServicePageTemplate, four existing industry client components, legacy S-Corp page, MobileStickyCta and ChatWidget. Homepage component is reused unchanged. Current preview: localhost:3002.

## Implemented

All seven published servicePage documents use the shared ServicePageTemplate, which now renders FinalBookingCTA regardless of CMS closing heading/copy. Existing service booking labels are passed through the component's existing label prop; S-Corp disclaimer stays immediately below it. /services/[slug] fallback shares this template, and known aliases redirect to canonical pages.

The four service-linked partner programs and standalone /scorp-advantage also reuse FinalBookingCTA. The standalone page supplies a small EN translation provider because it has a separate root layout. Removed legacy closing sections and the unused CTASection/ClipboardCheck imports. No new dependency or copied CTA component. Existing booking behavior supplies /book, returnTo, campaign parameters, navigation feedback and analytics.

The mobile sticky CTA now yields when service-next-step is visible. Existing ChatWidget CTA visibility protection recognizes that same section.

## Route audit

| Destination | Implementation | Live result |
| --- | --- | --- |
| /en/s-corp-tax-advantage | Shared service template | One homepage CTA; evaluation label; disclaimer retained |
| /en/tax-planning | Shared service template | One homepage CTA |
| /en/strategic-bookkeeping | Shared service template | One homepage CTA; booking destination replaces old closing /contact destination |
| /en/fractional-cfo | Shared service template | One homepage CTA |
| /en/tax-preparation-and-filing | Shared service template | One homepage CTA |
| /en/new-business-formation | Shared service template | One homepage CTA |
| /en/payroll-services | Shared service template | One homepage CTA |
| /en/industries/construction | FinalBookingCTA | One homepage CTA |
| /en/industries/restaurants | FinalBookingCTA | One homepage CTA |
| /en/industries/real-estate | FinalBookingCTA | One homepage CTA |
| /en/industries/e-commerce | FinalBookingCTA | One homepage CTA |
| /scorp-advantage | FinalBookingCTA with EN provider | One homepage CTA; evaluation label |

Published CMS inventory: exactly seven servicePage slugs, no additional dynamic detail pages at audit time. Source routing confirms the other /services aliases share canonical destinations. Three live alias checks: tax-planning-consulting -> /tax-planning; tax-preparation-filing -> /tax-preparation-and-filing; s-corp-tax-advantage-program -> /s-corp-tax-advantage.

## Evaluation / success criteria

| Criterion | Evidence | Result |
| --- | --- | --- |
| Homepage section reused | All 12 route outputs share homepage panel classes, heading, cream background rgb(251,249,245), border rgb(230,225,216), 14px radius and three trust items | Pass |
| No duplicate closing CTA | #service-next-step count is one on all 12 pages | Pass |
| Booking destination | All closing links use localized /book with correct returnTo | Pass |
| Mobile containment | All 12 pages inspected at actual 390px; no clipped CTA heading, body, trust items or button | Pass; all targets >=56px. Longer labels wrap on mobile to 80px |
| Tablet/desktop | Representative shared CTA checked at actual 768px and 1440px; no clipped content | Pass |
| Spanish | All seven /es core service pages render localized shared heading and /es/book destinations without clipping at 390px | Pass; existing CMS labels may use EN fallback |
| Keyboard focus | Shared booking link receives focus and shows 3px visible outline | Pass |
| Contrast | Computed colors/backgrounds inspected; relative-luminance calculation; gradient endpoints checked | Meaningful text minimum 5.15:1; gradient button 10.64:1 / 9.28:1; disclaimer 7.33:1 |
| Mobile obstruction | CTA visible with its top at 296.56px, footer still below viewport at 1102.94px; mobile sticky CTA display none | Pass. Chat widget absent during mobile checks, so live launcher suppression was not independently exercised |
| S-Corp disclaimer | Original text remains below the shared component | Pass |

Changed source files:
- src/components/services/ServicePageTemplate.tsx
- src/components/services/MobileStickyCta.tsx
- src/components/ChatWidget.tsx
- src/app/[locale]/industries/construction/ConstructionIndustryClient.tsx
- src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx
- src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx
- src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx
- src/app/scorp-advantage/page.tsx

Simplification: replaced six distinct closing implementations with calls to the existing homepage component. Kept service-specific labels through an existing prop and legal copy outside the shared presentation. No new components, dependencies, CMS writes or deployment.

Remaining limits: existing Spanish CMS CTA labels can fall back to English; no copy was invented to replace them. The standalone legacy offer's other content is outside this CTA task. No test suite, lint, typecheck, static analysis or build was run. The connected token registry was unavailable; existing homepage source and rendered CSS values supplied verification evidence.

Evidence: .omx/state/service-detail-shared-cta/routes.json, desktop-audit.json, mobile-and-aliases.json, verification.json and service-cta-desktop.jpg.
