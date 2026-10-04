# S-Corp page review and handoff

Mode: DESIGN. Status: independent target-page edits implemented; full request awaiting client content and site-wide claim reconciliation. No deployment or CMS publication performed.

## Severity-ordered plan and outcome

| Severity | Problem / consequence | Affected files or components | Minimal change | Verification / status |
| --- | --- | --- | --- | --- |
| Blocker | Conflicting savings/threshold claims undermine a reliable decision | CMS service copy, metadata, homepage and site claim sources | Inventory all occurrences; suppress unsupported target-page claims, without selecting a new range | Current target page, metadata and JSON-LD have no financial figures. Homepage currently has no figures. Additional public sources remain in the inventory and need reconciliation |
| Blocker | Bypass implies wages escape employment taxes | S-Corp content review, CmsServicePage | Replace with evaluation-only copy pending final compliance language | Rendered page and JSON-LD contain no bypass claim. IRS guidance confirms wages remain subject to employment taxes |
| High | 390px hero clipping prevents reading the offer and CTA | ServiceHero | Remove keyword strip and footnote; use contained width, shorter existing headline, one button and a visible text link | No clipped main text, list items or links at 390/768/1440px; hero button 48px, text link 44px |
| High | Different conversion labels/destinations split the booking path | ServicePageTemplate, FloatingNavbar, MobileSidebar, Footer | Target-page conversion label Book an S-Corp Evaluation and /book | Checked desktop, opened mobile menu, hero, closing, sticky CTA and footer; localized link destination is /en/book |
| High | Comparison repeats the process; methodology statement is not proof | ServicePageTemplate, reviewedScorpService | Remove comparison and methodology block; retain costs warning under How we do it and all four steps | Four fit bullets, four process steps and four inclusions remain; proof removed pending Torres approval |
| High | No approved price or new FAQ answers | reviewedScorpService | Keep price placeholder and questions in handoff only; withhold numeric FAQs rather than create answers | No $X or empty FAQ ships. One original compensation FAQ remains; savings/timing/cost/risk entries are pending |
| Medium | Template headings and vague inclusion wording obscure scope | reviewedScorpService | Requested short headings; four plain-language inclusion items | Rendered copy and heading sequence inspected |
| Medium | Focus, hidden answers and contrast need verification | ServiceFAQ, ServiceHero, closing block | Keep answers in linked hidden panels, add explicit focus outline and button type, retain existing legal disclaimer and add short closing disclaimer | Enter/Space toggling, aria-expanded and panel visibility checked; 2px focus outline verified; meaningful text contrast passes AA |
| Medium | Longer CTA crowds desktop nav; empty label pills remain | Scoped navbar CSS, SectionHeader | Use normal-flow nav, existing spacing values and conditional label rendering | Desktop header 73px tall; nav and language control do not overlap; no empty eyebrow pills |
| Optional | Further visual redesign | None | No optional changes | Existing colors, logo, fonts and component family preserved; no dependencies, new sections or features |

## Client and compliance decisions

| Decision | Required input | Publication rule |
| --- | --- | --- |
| Savings range and threshold | Substantiated range, net profit, state, reasonable salary, tax year and costs included/excluded | No figure chosen. Apply the approved claim and assumptions consistently across the inventory before declaring site-wide completion |
| Replacement for bypass | Review proposal: “Evaluate potential savings on distributions while wages remain subject to employment taxes.” | Current hero uses evaluation-only wording: “Review profit, reasonable compensation, and payroll costs before deciding whether an S-Corp election fits your business.” Final compliance review remains required |
| Price | Amount, included scope and billing basis | Handoff placeholder: “Typical engagement: from $X.” Never publish until filled and approved |
| Torres wording | Confirm exact wording and placement on this page | Proposed existing qualitative source: “An S-Corp strategy and proactive quarterly planning gave Torres Built clearer tax decisions, defined next steps, and a year-round planning cadence.” Source: src/messages/en.json, existing client-results copy. No savings figure or new quote invented. Proof stays removed until confirmed |
| FAQ answers | Approve revised “How much does an S-Corp save in taxes?” and “When should an LLC switch to an S-Corp?”; supply “What does it cost?” and “What are the risks?” | No agent-written replacement answers, empty accordion entries, or invented price/risk claims |

## Evaluation / success criteria

| Check | Evidence | Result |
| --- | --- | --- |
| No unsupported numeric claims, bypass or price placeholders on target page | Rendered main, title, description, Open Graph and JSON-LD inspected | Pass for current claim-free draft; approved range still pending |
| Site-wide agreement with one approved range | Source and 80 published CMS documents inventoried | Pending. Legacy/public claim surfaces and dormant CMS fields remain; full site-wide acceptance does not pass yet |
| One booking label/destination | Desktop and opened mobile navigation plus page links | Pass on /en/s-corp-tax-advantage; informational See what's included links to #included |
| One H1; logical headings | DOM H1/H2/H3 inventory | Pass |
| 390/768/1440 containment | DOM bounds and screenshots | Pass; 390px hero CTA 342x48px; inclusion link 342x44px; FAQ button 340x104px |
| Hero fits initial viewport | Desktop headline 75px tall (one line); CTA bottom 429px before header adjustment; tablet CTA bottom 358px | Pass |
| Text contrast | Calculated from inspected CSS colors, ancestor backgrounds and hero overlay | CTA 8.55:1; hero body 9.05:1; process description 4.68:1; FAQ answer 7.27:1; closing disclaimer 14.55:1. Decorative aria-hidden legal separator excluded |
| FAQ accessibility | Existing answer linked through aria-controls / aria-labelledby; Enter/Space opens and closes; focus inspection | Pass for retained FAQ. New/revised content entries pending approval |
| Existing disclaimer | Footer legal links/modal retained; short closing disclaimer added | Pass |
| Automated regression suite | Added ServiceFAQ.test.tsx for multi-item keyboard access and linked panels | Not run, per workspace restriction. No lint, typecheck, static analysis, test suite or build run |

No connected design-token registry or named contrast verification service was available. Existing CSS custom properties and rendered computed styles were inspected instead, and WCAG relative-luminance calculations were performed on those values. This is a targeted rendered review, not a complete WCAG conformance certification or Lighthouse performance audit.

## Files changed by this task

- src/lib/scorp/service-content.ts: one scoped content review shared by rendered copy, metadata and structured data.
- src/components/services/CmsServicePage.tsx: apply the review and target-page footer booking label.
- src/components/services/ServicePageTemplate.tsx: remove this page's comparison, simplify closing and render disclaimer.
- src/components/services/ServiceHero.tsx: contained simplified hero, omit empty trust stack and show mobile text link.
- src/components/services/ServiceFAQ.tsx: linked hidden answer panels, explicit focus and keyboard-compatible buttons; remove height animation.
- src/components/services/ServiceFAQ.test.tsx: regression check added but not executed.
- src/components/layout/FloatingNavbar.tsx: scoped booking label/destination and header marker.
- src/components/ui/MobileSidebar.tsx: same booking intent in mobile navigation.
- src/components/layout/Footer.tsx: optional booking label, retain legal copy.
- src/components/ui/SectionHeader.tsx: omit empty label pills.
- src/styles/globals.css: scoped S-Corp desktop navigation containment using existing tokens.
- src/types/sanity.ts: optional closing disclaimer.
- docs/s-corp-claims-inventory.md: baseline source/CMS claims inventory and decision gates.
- .omx/plans/2026-10-03-s-corp-copy-and-claims.md and .omx/state/s-corp-copy-and-claims/: plan, verdict, claims data and screenshots.

Existing workspace changes were preserved. No commit was created.

IRS source: https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-compensation-and-medical-insurance-issues
