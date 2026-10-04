# Full website audit and safe remediation

Scope: public website, both locales, all page families, shared UI, CMS data boundaries, booking/lead/assessment journeys, commerce/fulfillment, security configuration, metadata/sitemaps/schema, performance and deployment readiness.

## Sequence

1. Record current dirty workspace state and inventory routes/critical flows. Independent reviewers cover security, features, SEO/reliability and UI/accessibility without overlapping edits.
2. Validate findings against actual callers and rendered pages. Distinguish active bugs, conditional defects, dormant code and unverifiable external configuration.
3. Fix confirmed, safely reversible code defects in bounded lanes, preserving user edits, current branding/layout and public contracts. Write meaningful regression fixtures for critical boundaries where useful; do not execute prohibited checks without user authorization.
4. Inspect navigation/forms/cart interactions manually without sending real leads, purchasing, refreshing external credentials, changing provider settings or publishing/deploying.
5. Review public production responses and official security/provider guidance where available. Record configuration/transaction-dependent checks as blocked, not passed.
6. Produce a severity-ranked report with scope, evidence, fixed/open findings, changed files, verification and remaining risks. Never claim the site has no possible bugs or is production-ready without adequate verification.

## Success criteria

- Every route family has source coverage; primary public routes and critical interactive flows receive rendered checks.
- Both locale versions, 390/768/1440px layouts, visible focus, menu stacking, metadata and JSON-LD are inspected.
- Payment price/edition/fulfillment fields originate from server catalog data; invalid cart input fails before Stripe/CRM calls.
- CMS JSON-LD cannot close its containing script; stale/foreign publishing paths are corrected without invented content.
- Identified fixes have recorded source/manual evidence and regression coverage where appropriate; tests/build/security scans run only if authorized.
- Live provider transactions, messaging, token rotation, credentials, Search Console access and deployed/cache differences are explicitly distinguished from local validation.

Standing instruction: no lint, typecheck, tests, static analysis or build unless explicitly authorized. A clarification request to include these checks is pending. No dependencies, commits, deployments or external state changes are authorized by this audit alone.
