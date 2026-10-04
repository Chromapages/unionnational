# S-Corp page cleanup plan

Mode: DESIGN. Preserve the existing brand, fonts, logo, routes, component family, and four fit bullets. No dependencies, new sections, or new features.

## Before edits

Rendered baseline inspected at 1440x900 and 390x844. The eyebrow forces the mobile hero beyond its container. Primary hero CTA height is 48px. Desktop headline occupies three lines. Keyword strip spacing is correct visually. All three existing FAQ answers are present and open correctly; collapsed content caused the extraction artifact. FAQ uses buttons and aria-expanded, but lacks an explicit focus style. CMS provides the active service copy and metadata. The title currently contains no savings figure, unlike the older text audit.

## Severity-ordered implementation

| Priority | Problem / consequence | Files or components | Minimal change | Verification |
| --- | --- | --- | --- | --- |
| Blocker | Unsupported savings and profit thresholds imply a universal outcome | CMS service delivery, site claims inventory | Inventory all occurrences; withhold target-page numeric claims until substantiated range and net profit/state/salary assumptions are approved | Rendered page, metadata, JSON-LD and inventory checked together |
| Blocker | Bypass implies employment taxes disappear | CMS hero and FAQ | Replace hero with evaluation-only copy pending approval; remove unsafe numeric FAQs from public output rather than fabricate answers | No bypass or numeric promises in rendered target page; IRS source supports review wording |
| High | Hero clips at 390px | ServiceHero | Scoped compact layout, wrapping eyebrow, one button and visible text link, remove keyword strip and footnote | Content inside viewport at 390/768/1440; target height >=44px |
| High | Booking paths use different labels | Template, navbar, mobile sidebar, footer | Target-page label Book an S-Corp Evaluation; destination /book | All conversion links including opened mobile nav inspected |
| High | Four-row comparison and methodology quote repeat content | ServicePageTemplate | Remove comparison on this page, carry costs warning into How we do it, keep four process steps, remove unapproved proof | Section order and four items preserved |
| High | Unapproved price and new FAQ answers | Scoped service copy, handoff | Draft price placeholder and questions only in handoff; omit them from live output until approved | No $X or unanswered FAQ published |
| Medium | Template headings and vague inclusions | Scoped service copy | Requested headings; four plain-language inclusions | Copy audit and heading hierarchy |
| Medium | Focus / contrast / disclaimer need verification | FAQ, hero, closing | Explicit focus states; scoped closing disclaimer; preserve existing legal disclaimer | Keyboard checks, rendered contrast calculations and target measurements |

## Pending client/compliance decisions (publication gates)

1. One supported savings range and eligibility threshold, net profit, state, reasonable salary, tax year, and costs included/excluded. No range selected by the agent.
2. Replacement proposal: Evaluate potential savings on distributions while wages remain subject to employment taxes. Compliance must review final wording. Interim hero is evaluation-only.
3. Price draft: Typical engagement: from $X. Client supplies X, scope and billing basis. Never render this placeholder.
4. Approve Torres wording for this page or keep the proof block removed. Other pages' prior qualitative approval does not establish a new quantified result.
5. Approve revised savings/timing FAQ answers and supply What does it cost? / What are the risks? No fabricated answer or empty accordion item.

IRS reference: https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-compensation-and-medical-insurance-issues

## Verification boundaries

Use the existing browser for rendered interaction checks. Do not run lint, typecheck, static analysis or test suites. No connected token registry or named contrast service is available: verify existing CSS tokens and computed DOM styles using browser calculations, and report that limitation. No CMS publishing or deployment is implied. Final completion remains gated by client-owned decisions.
