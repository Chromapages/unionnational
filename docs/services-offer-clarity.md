# Services offer clarity — 2026-09-30

The Services page now uses one responsive composition, one four-problem selector, three recommendations for the selected problem, annual plans, a short process/client example, four FAQs, and two consistent page-level booking CTAs.

## Source and scope of pricing

Prices still come from the existing public service and pricing-tier queries. Numeric individual prices are presented as From; payroll's monthly base and per-employee fee are retained. Custom/missing numeric prices are quoted after a scope review. Plan prices retain their published lower bounds and explicitly show annual billing.

The public Foundation tier lists annual tax-return filing, strategic tax planning, three-year audit protection, and the client portal. Growth inherits Foundation and adds tax preparation and quarterly reviews. Executive inherits Growth and lists priority support and dedicated senior-advisor access. The page explicitly explains that individual prices refer to standalone engagements and annual plans include their listed services; Foundation's included filing is called out rather than implying a second filing charge.

## Hotel benefit

The user confirmed that the Private Hotel Incentive is a welcome/value-added benefit UNT can award to qualifying Growth clients, approximately 2–5 nights. It is shown in a small separate Growth note, subject to eligibility and stay terms. It is not the hero offer, a professional-fee discount, or a standalone travel product. The page does not invent hotel availability, destinations, included travel costs, or universal eligibility.

## Pending Executive scope

The user has not confirmed delivery/scope of Complex Estate Planning Review. It is omitted from the condensed Services summary. CMS records and the separate Pricing page were not changed by this pass.

## Client proof

The Torres Built account remains attributed to the team and uses the previously approved S-Corp evaluation, quarterly planning, clearer decisions, and defined next steps. No supported savings figure exists, so none is introduced. The process/result card uses generated construction artwork labeled as illustrative, rather than representing it as photography of the client's project.

## Verification

The four existing recommendation-route mappings were exercised before editing and are preserved in `src/test/e2e/services-simplification.spec.ts`. The native problem tabs support arrows, Home, and End. Mobile service details and the FAQ use exclusive native disclosure groups. Manual browser verification checks EN/ES, 390px/1280px/1672px, pricing text, visible links, FAQ expansion, and booking destinations. Automated suites/build/lint/typecheck are not run under the workspace instruction.
