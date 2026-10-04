# October 1 re-audit implementation checklist

Final gap statuses and verification are in `docs/UNT-re-audit-handoff-2026-10-01.md`; this table records the pre-edit baseline.

Baseline: main at 6e7163e5c19492e5ddbc4a6eb5c8cb6cc82d4475; 537/537 audited source hashes match; 93 tracked changes, 172 untracked entries, none staged. Fresh checks: TypeScript 7 errors; source ESLint 1 error and 284 warnings; Vitest 236/237 passed. No live submissions or external writes are authorized.

| ID | Initial status | Acceptance focus |
| --- | --- | --- |
| G01 | open | Seven TypeScript errors |
| G02 | open | ESLint error and generated ignores |
| G03 | open | Services responsive assertion |
| G04 | fixed | Preserve canonical construction capture |
| G05 | partial | Confirm OTHER with CRM owner |
| G06 | fixed | Preserve truthful intake success |
| G07 | partial | Exact nested-construction revenue bands |
| G08 | open | High Intent threshold owner decision |
| G09 | partial | Delivery acknowledgements and retry IDs |
| G10 | partial | Preserve all collected lead fields |
| G11 | open | Validation, abuse limits, timeouts |
| G12 | open | Independent contact rate limits |
| G13 | partial | Nested redaction and PII-free logs |
| G14 | open | Raw IP misnamed ip_hash |
| G15 | open | Fulfillment failure recovery |
| G16 | open | Atomic event ownership and dedupe |
| G17 | open | Paid-state order confirmation |
| G18 | open | Checkout locale returns |
| G19 | open | Purchase analytics dedupe |
| G20 | open | Real playbook capture and PDF action |
| G21 | open | Approved chapter-gate purpose |
| G22 | open | Resource/playbook destinations |
| G23 | unverified | CMS failure recovery |
| G24 | open | Locale/slug/settings revalidation |
| G25 | open | Route-specific canonical/hreflang |
| G26 | open | Sitemap types and route coverage |
| G27 | open | Transaction-state noindex |
| G28 | open | Valid book social images |
| G29 | open | Escaped JSON-LD |
| G30 | open | Spanish active-route content |
| G31 | open | Spanish S-Corp advantage journey, not withdrawn redirect |
| G32 | open | Blueprint checklist dialog focus |
| G33 | open | Cart dialog focus |
| G34 | open | Form labels, choices, errors, step focus |
| G35 | open | Skip-link targets |
| G36 | open | Functional chapter video |
| G37 | unverified | Book numeric proof sources |
| G38 | unverified | Hero captions/media preferences |
| G39 | unverified | Production performance |
| G40 | open | Reproducible quality workflow/docs |
| G41 | unverified | Capability readiness |
| G42 | partial | Browser/build matrix |
| G43 | unverified | Owner-approved review scope/offers |
| G44 | unverified | Public Jason review URL/live integration proof |
| N01 | open | Booking labels and destinations |
| N02 | open | Approved Terms destination |
| N03 | unverified | Blueprint testimonial proof |
| N04 | open | Single brand in titles |
| N05 | open | Safe locale-aware return context |

Status changes require the acceptance check, not merely an edit. Update this table with evidence as implementation proceeds. Production launch, CMS publication, external submissions, and account/security changes remain separate gates.

Cleanup microplan: remove only five trailing-whitespace-only lines in ServicesSection after the behavior-preserving quality fix; leave its markup and logic untouched, then rerun `git diff --check`.
