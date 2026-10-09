# UNT Financial Health Assessment — recovery findings
Status: read-only recovery and proposal; application implementation is NOT authorized.

## Authority and checkout
- User's current request controls scope. Linked documents are evidence/proposals, not authorization to change code, providers, CRM, sharing, or production.
- Full [Notion restoration plan](https://app.notion.com/p/3f3aab33a6e1816f9a29dc5e5621ee81) and [portable Markdown plan](https://drive.google.com/file/d/13q-5XyZWthKnRul400IU9D6xpiMChGJV/view) read. Its roadmap, data contract, source register, and acceptance matrix govern the proposed work below; they are not repeated in full.
- October 1 [route inventory](https://app.notion.com/p/3ecaab33a6e1816ba038ef098a477b23) and [re-audit](https://app.notion.com/p/3ecaab33a6e18108803be327a5abeede) inspected as historical evidence. Their old server-validation finding is superseded by verified current recomputation; no old issue is assumed still open.
- Repository: D:/WORK/WORK/unionnational. Branch main. HEAD 65c4e6432f4ebf72dea5b83537c6923bb87c92e9.
- Before report artifacts: 139 status entries; 86 tracked dirty paths, 53 untracked entries, zero staged. This is entries, not a recursive file count.
- Existing homepage, Services, lead-delivery, analytics/security, tax-resolution and industry work is preserved. In particular ConsumerHome.tsx, ServicesDesktopExperience.tsx, delivery.ts and tsconfig.json were already dirty. Health-check components, survey route, and health-score.ts have no working-tree diff.
- Read actual root AGENTS.md and supplied repository instructions. Planning uses the plan-writing skill. No installs, builds, tests, Git writes or application edits occurred.

## Recovered history
| Classification | Exact version and source | Finding |
|---|---|---|
| Original | f0d4f921dd792d2201992d53845df864b6ee13d9, 2026-01-15; src/components/health-check/HealthCheckSurvey.tsx:48–125; src/app/health-check/page.tsx:1–29 | Seven questions and weights recovered. Historical two-minute marketing is not a timing measurement. |
| Original result/calculation | Same commit; HealthCheckSurvey.tsx:401–406, 467–484, 504–536 | Numeric sum; contact-gated result. Original client stable ceiling 70; API used 75 at src/app/api/survey/route.ts:6–17. Original UI proceeded to results on delivery failure; current UI does not. |
| Extracted/revised presentation | e01536e58e11c6bef31e819022d8193a614ebda4, 2026-01-25; src/components/health-check/useHealthScore.ts:17–34, ResultDashboard.tsx:16–59 | Same weights/calculation; expanded result descriptions/highlights. Q7 help later drops formatting asterisks only. |
| Locale routes | 3b2fbe047e0f84ae1016db8212d5d87e5a8345b6, 2026-02-01; src/app/[locale]/health-check/page.tsx:1–29 | Route localized; question/result UI stayed English. Navigation label translated in messages/en.json:9 and es.json:9 at this version. |
| Existing repair | 555dbdf89019a4df70a4754da3c8729edad0710c, 2026-10-04; src/lib/intake/health-score.ts:1–7 | Shared current stable ceiling 75 resolves the earlier client/server mismatch. Server answer validation/recomputation already exists. |
| Later protection | 7301488f962bafa1791762e4fe4140fe3a37abd9, 2026-10-06; src/app/api/survey/route.ts and src/lib/leads/delivery.ts | Current ingress/durable delivery protection. delivery.ts also contains unrelated uncommitted improvements; do not overwrite it. |
| Name search | Scoped path history and git log --all -S BusinessHealthSurvey -- src | No BusinessHealthSurvey file/symbol recovered. Actual quiz is HealthCheckSurvey. Absence here does not prove it never existed outside accessible Git history. |
| Confusable mock | 29c66e45f1cca2d0a6ce6bf6b83a6c54921b1902, 2026-02-02; current src/components/ui/BusinessHealthAssessmentModal.tsx:110–120 | Different entity/revenue/email modal simulates submission. No current src caller found. Do not restore it as the seven-question assessment. |

## Recovered questions and answer contract
These are recovered English source strings, not approved financial advice or a newly proposed rubric. Current file: src/components/health-check/HealthCheckSurvey.tsx. Original version is f0d4f921 above.

| ID/category/source | Exact question | Allowed answer label → numeric weight |
|---|---|---|
| 1 / entity / :35–45 | What type of business entity do you operate? | S-Corp → 15; LLC (Single or Partnership) → 10; C-Corp → 8; Sole Proprietorship → 3; Not sure / Other → 0 |
| 2 / compliance / :48–58 | Have you filed all federal & state tax returns for the last 3 years? | Yes, all filed on time → 20; Filed, but some were late → 10; Missing 1-2 returns → 0; Missing more than 2 returns → -10; Not sure → 0 |
| 3 / compliance / :61–70 | Do you currently owe back taxes to the IRS or state? | No outstanding tax debt → 15; Yes, under $10k → 10; Yes, $10k - $50k → 5; Yes, over $50k → 0; Not sure → 3 |
| 4 / operations / :73–82 | How often do you review your financial statements? | Monthly → 15; Quarterly → 10; Annually (at tax time) → 5; Rarely / Never → 0 |
| 5 / operations / :85–94 | Do you separate personal and business expenses? | Always (separate accounts) → 12; Usually (rarely mixed) → 8; Sometimes (occasional mixing) → 4; No (completely mixed) → 0 |
| 6 / operations / :96–105 | What system do you use to track business expenses? | Accounting Software (QBO, Xero) → 12; Spreadsheets → 8; Shoebox / Receipts → 3; No system → 0 |
| 7 / operations / :107–116 | Do you engage in proactive tax planning? | Year-round with a pro → 11; Some year-end planning → 6; No proactive planning → 0 |

Recovered help text:
- Q1: "Your entity structure determines your tax liability and protection level."
- Q2: "Consistency with the IRS is the foundation of financial health."
- Q4: "You can't manage what you don't measure."
- Q7: "Tax planning happens before year-end, not after."
- Q3, Q5, Q6 have no question help text.
- Q1 option help in listed order: "Pass-through taxation, potential SE tax savings"; "Flexible, but potentially higher SE taxes"; "Double taxation potential, but good for scaling"; "Simplest, but highest personal liability & tax"; "Let's figure this out immediately". Other questions have no option help.

### Calculation and completion
Current useHealthScore.ts:17–34 sums numeric weights by question category and clamps only the total to at least zero. There is no normalization or rounding. Entity maximum 15, compliance 35, operations 50; raw total -10…100, displayed total 0…100. Compliance can remain negative (-10/35).
Current API survey/route.ts:21–62 requires exactly seven canonical numeric question keys and allowed numeric weights; incomplete/extra/noncanonical IDs are rejected. UI partial totals omit unanswered questions. There is no N/A or conditional question. Unknown answers have the explicit weights above; no recovered justification for those weights exists.
Current total bands (health-score.ts:3–7): 0–40 critical; 41–75 stable; 76–100 growth. Client labels (HealthCheckSurvey.tsx:134–138): High Risk / Moderate / Growth Ready.
Read-only arithmetic enumeration of the recovered answer weights covered 24,000 option combinations, establishing total endpoints and boundary witnesses below. This was not an application test. Integer scores 94, 97, 98 and 99 are unreachable; all three bands are reachable.

| Total | Q1…Q7 weights witnessing the total |
|---|---|
| 0 | 10, -10, 0, 0, 0, 0, 0 |
| 40 / 41 | 15, 20, 5, 0, 0, 0, 0 / 15, 20, 0, 0, 0, 0, 6 |
| 70 / 71 (historical disputed boundary) | 15, 20, 15, 10, 4, 0, 6 / 15, 20, 15, 15, 0, 0, 6 |
| 75 / 76 | 15, 20, 15, 15, 4, 0, 6 / 15, 20, 15, 15, 8, 3, 0 |
| 100 | 15, 20, 15, 15, 12, 12, 11 |

### Recovered result copy
Original f0d4f921 HealthCheckSurvey.tsx:401–406 uses the titles/CTAs below, with descriptions respectively "Critical vulnerabilities detected.", "Leaving money on the table.", "Optimized for growth." Since e01536e, descriptions are the current text below.

| Band | Current title / description | Current highlights | Existing next step |
|---|---|---|---|
| Critical | Urgent Attention Needed / Compliance exposure is putting cash flow and continuity at risk. | Missing compliance safeguards; Cash flow exposed; Entity inefficiencies | Get Tax Resolution → /contact?topic=resolution |
| Stable | Stable but Stagnant / Operations are steady, but optimization opportunities are still open. | Moderate compliance health; Entity optimization available; Growth runway unlocked | Get Tax Strategy → /contact?topic=strategy |
| Growth | Ready for Scale / Your foundation supports expansion. Now focus on strategic scale. | Optimized compliance posture; Entity structure supports growth; Operational maturity strong | Explore Fractional CFO → /services |

Source: current ResultDashboard.tsx:16–59. It also displays "Financial Diagnostic Report", "Prepared for [name or Your Business]", "Verified Analysis" (:69–76), "Diagnostic Tier", "Recommended Service", "Priority service alignment based on live audit scoring." (:101–105), and "Performance Snapshot" (:118).
These statements/recommendations are unconditional within the total band, not derived from individual category weaknesses. Recovered code is not evidence that these claims are substantiated.
No Spanish questions/options/help/result/error/consent contract was recovered. EN HomePage.HealthCheckSection at messages/en.json:727 names the different Proactive CFO Assessment; ES at es.json:731 gives generic review wording. Neither is a Spanish quiz translation.

## Current route/component/data-flow map
| Surface | Current wiring and references | Boundary |
|---|---|---|
| General health check | /en/health-check and /es/health-check → src/app/[locale]/health-check/page.tsx:1, :29–33 → HealthCheckSurvey | Canonical locale route pair to retain. localizedAlternates at page:14 and src/lib/seo/localizedAlternates.ts:5 supplies canonical/hreflang. Sitemap includes it at src/app/sitemap.ts:35. |
| General UI flow | HealthCheckSurvey.tsx:140–159, :245–285, :366–422 | Intro → seven questions → required contact capture → POST /api/survey → results only on confirmed success. Answers/contact/UUID in React memory; refresh loses them. No answer review or contact-step Back control. |
| General request | HealthCheckSurvey.tsx:254–266 → api/survey/route.ts:9–62, :76–129 | firstName, lastName, email, phone, answers (question ID → points), client score, locale, submission_id. Server ignores client score and recomputes. |
| Server/provider | survey/route.ts:77–95, :103–127 → intake/shared.ts:33–90 → leads/delivery.ts:102–147 | Ingress/origin and quotas; bounded JSON (32 KiB/5s); current configured survey receiver; durable dispatcher; bounded 8s provider call. No live configuration/receiver was read/called. |
| Existing general receiver payload | survey/route.ts:103–115 | Top-level contact, combined name, submission_id; customData financial_health_score, health_category, health_category_label, raw_answers JSON, source, locale, submitted_at; tags Survey Completed and Health category label. These are code-side field names, not verified CRM field/workflow bindings. |
| Server response | survey/route.ts:124–125; UI :270–272 | success, score, category, categoryLabel after provider acknowledgment. UI currently uses its local calculation for display. Does not establish report-email or appointment delivery. |
| Existing Resources embed | InteractiveToolsList.tsx:13, :18–22, :99 | Same quiz component can be embedded, but no current src caller of InteractiveToolsList found. Current resources route uses ResourcesDesktopExperience (editorial listing). Do not enable the old embed by accident. |
| Old home entry components | ThreeCorePaths.tsx:26, ExitIntentModal.tsx:279/:327, FloatingTaxButton.tsx:116 | Link to health-check in unmounted source; no current src caller found. Active ConsumerHome has no general assessment entry. |
| Tax intake | /[locale]/intake → StrategyIntakeForm; step validation :100–104 → submitGhlLead :159 | Five-stage contact-first tax/service-fit intake → /api/ghl/intake. Not the health score. Existing route metadata's eight-step wording is separate debt, not included in this restoration. |
| CFO assessment | /[locale]/proactive-cfo-assessment/page.tsx:118 → TaxHealthScore.tsx:75/:125–137 → /api/survey | Different five-question array, 1–5 option scores normalized/rounded to a percentage, explicit PROACTIVE_CFO_ASSESSMENT discriminator. Shared endpoint must preserve this branch. |
| S-Corp estimator | /scorp-estimator → EstimatorPageClient.tsx:31 → /api/ghl-intake; S-Corp service → ScorpEstimatorShell.tsx:142 → /api/scorp-estimator | Separate monetary estimator implementations. Localized /[locale]/scorp-estimator/page.tsx:5 redirects to S-Corp service. Leave behavior unchanged. Neither receiver is the general survey endpoint. |
| Construction tools | /[locale]/construction-profitability-assessment → intake/ConstructionAssessmentForm.tsx:76/:183; /[locale]/construction/profitability-assessment → construction/.../ProfitabilityAssessmentForm.tsx:92/:312 | Separate score/content models using submitGhlLead → /api/ghl/intake. Do not merge rubrics or attribute their old scoring findings to this quiz. |

Reusable infrastructure: existing question/result components and typography; locale Link from src/i18n/navigation.ts; readLeadJson/leadFailureStatus/forwardToGhl in intake/shared.ts; security/lead-ingress.ts; leads/delivery.ts and its existing recovery protocol/tests.
Incompatibility: GHL contract (src/lib/ghl/contract.ts:43–59; actual identifier GhlPayloadSchema) has no general-health discriminator. Do not force the survey into a strategy/construction payload. Retain /api/survey and its CFO distinction; reuse lower-level protection rather than adding a competing receiver.
Production delivery storage requires configured Redis (delivery.ts:20–28), development may use memory. No storage contents, env values, accepted submissions or private records were read.

## Fresh browser observations — read-only, no forms submitted
Chrome extension browser on the user's computer:
- https://unionnationaltax.com/en/health-check: rendered seven-question intro and Start Diagnostic.
- https://unionnationaltax.com/es/health-check: rendered Spanish shell but English assessment.
- https://unionnationaltax.com/health-check: resolved to /es/health-check in the same browser after Spanish navigation. This demonstrates locale-dependent routing, not that ES is the universal default (config default is EN).
- http://localhost:3460/en/health-check: existing development preview rendered the same intro. Initial navigation timed out; subsequent DOM inspection confirmed rendering, so it is not reported as unavailable.
- http://localhost:3460/en and /en/services: rendered current homepage and Services structures without a general assessment entry; proposed positions below fit their existing sections.
- ES entry at actual 390px viewport: scroll width 382px, start button 218×56px.
- EN entry at actual 1440px viewport: scroll width 1425px, one H1, start button 494×60px.
- These measurements establish entry-state width and target height only. No later-step, contrast, keyboard/focus, screen-reader, zoom, timing or full Spanish acceptance is claimed. Temporary viewport override reset.

## Findings ordered by restoration priority
| Priority | Evidence / consequence | Minimal proposed treatment (approval required) |
|---|---|---|
| Blocker: rubric and claims not approved | Recovered entity ranking, unknown weights, negative compliance and total-band service claims lack validation. Verified Analysis / encryption/vault/identity wording does not have substantiation from inspected code (SecurityBadge.tsx:10–14, SecureLeadCapture.tsx:43–53). | Jason/tax reviewer approve recovered contract or identify explicitly revised version; remove/replace unsupported certainty and security claims. Do not silently change weights or choose historical CRM bands. |
| Blocker: consent/contact and result gating | SecureLeadCapture.tsx:11–16/:56–108 collects name/email/phone with no collection notice, privacy link or consent fields; UI results require provider success. | Approve results-first optional contact versus disclosed contact-first; approve minimum fields and separate follow-up/marketing handling before implementation. Preserve visible report on delivery failure if results-first approved. |
| Blocker: answer identity loss | Q2 Missing 1-2 returns and Not sure both store 0; QuestionCard.tsx:84 uses numeric equality, so both appear selected on revisit. API cannot distinguish them. | Stable answer IDs alongside approved weights; versioned request/score contract shared by browser/server. Legacy zero cannot be retrospectively disambiguated; preserve its ambiguity. |
| High: retry identity instability | survey/route.ts:113 regenerates customData.submitted_at; delivery.ts:31–39 ignores timestamps only at named other paths. Static deduction: later retry changes payload hash while reusing UUID and can conflict/quarantine. | Freeze/ignore only that known server-generated transport timestamp in the fingerprint, with shared-delivery regression coverage and caller review; preserve all financial answer fields. Never automatically replay uncertain delivery. |
| High: log privacy | survey/route.ts:124 logs score/category; logger.ts:100 redacts score but not category. | Remove result data at call site; log bounded operational status/trace only. Keep current health-check analytics exclusions and document-isolation boundaries intact. |
| High: locale gap and CTA routing | Quiz/results/errors/metadata are English; ResultDashboard imports next/link with unprefixed result paths. | Approved complete ES namespace; locale Link and approved destination. No URL answer, score or band parameters. |
| High: accessibility/state recovery | QuestionCard.tsx:82–121 lacks announced selected state/grouping/focus management; SecureInput.tsx:28–54 lacks error associations; client validation computes errors but does not gate submit; no review step. | Reuse existing form controls with semantic grouping, explicit selected state, Back/Next/review, focus/error announcements, field + summary errors, reduced motion and verified targets/contrast. Do not invent browser persistence; explicit refresh/restart handling pending policy. |
| Normal: discoverability | Active home/Services lack entry; old components/copy can confuse CFO and general tools. | Two compact links to the same canonical route; keep original hero/industry/book/booking sections. Optional Resources link only if separately included. |

Privacy protections already present: health-check exclusion in analytics/privacy.ts:53–65, OptionalTrackingBoundary and Ga4Boundary in locale layout. They are reuse/regression targets, not permission to enable analytics or alter provider settings. Fresh code-side inspection found no assessment answer persistence in health-check components. Full network/tag/replay acceptance is still pending.

## Remaining owner decisions and missing sources
| Owner | Required decision/evidence |
|---|---|
| Jason + tax/content reviewer | Approve recovered seven questions/weights, score meaning, unknown/missing policy, negative category handling, 75 ceiling, truthful category-based recommendations, disclaimers and replacement claims. No recovered evidence proves the original model's validity. |
| Jason | Free-offer position alongside strategy calls; results-first optional contact or disclosed contact-first; final assessment name and next-step/booking destination. Existing site /book is a candidate, not assessment-specific approval. Two-minute duration remains unmeasured. |
| Content/Spanish reviewer | Supply or approve full Spanish questions, options, help, validation, result, consent, retry and next-step copy. No original Spanish contract recovered. |
| Privacy + CRM owner | Minimum fields, purposes, notice, consent versions, retention/deletion/access, field IDs, receiver acknowledgment, report delivery, tags/pipeline/tasks and opt-out behavior. Historical CRM 80/50 bands and labels are not substituted. |
| CRM/operations owner | Verify current configuration presence/destination/mapping through approved process without revealing secrets; durable delivery/reconciliation ownership and synthetic live-test authorization. No live provider state established here. |
| Eric + website owner | Approve scoped implementation, translations/claim review and review environment; name release, rollback and maintenance owners and observation window. Deployment remains separate. |
| Storage owner | Established SecondBrain directory is unverified; path requested. No guessed backup path, external report upload or sharing change made. |

## Proposed verification — NOT RUN
Existing source tests inspected, not executed: HealthCheckSurvey.test.tsx (rapid click/Back transitions), api/survey/route.test.ts (recomputed boundaries, CFO, invalid answers/body/contact, quota/config/provider failure), intake/health-score.test.ts, intake/shared.test.ts, leads/delivery.test.ts. Survey endpoint tests mock durable dispatch, so they do not prove real survey-plus-dispatch idempotency.

After implementation approval, carry the full plan acceptance matrix into:
- Every option ID/weight, unknown/missing/duplicate/extra answer, negative subtotal, raw/displayed range, all reachable bands, 40/41 and 75/76, historical 70/71 decision, client/server equality. Preserve existing CFO fixtures.
- Mock-provider UI + real shared dispatcher integration for success, rejection, timeout after acceptance, duplicate click/retry, nested timestamp, UUID conflict, operator-authorized recovery. No real leads.
- EN/ES direct route, refresh with truthful restart policy, back/review, language switching, homepage/Services entries, canonical/hreflang, results destination, other tools unchanged.
- 320/390/768/1440 widths, 200% zoom, keyboard and screen reader, error/focus/progress announcements, reduced motion, labels, 44px touch targets as project standard, WCAG 2.2 AA contrast verified from actual rendered pairs.
- No answers/scores/bands/contacts/reports in URLs, analytics, replay, ordinary logs or unapproved storage; test entry from a document with optional tools already loaded.
- Supported commands: npm run test -- [scoped files], npm run lint -- [affected files], installed TypeScript with --noEmit --incremental false, npm run build, and selected existing npm run test:e2e coverage against an isolated mock review environment. Resolve repository check authorization before executing; no check is a pass merely because it is listed. Prevent accidental real provider calls in every automated job.
- Separate authorization for any live CRM/calendar verification and production release.

## Rollback and scope
Use small reviewable changes and a fresh pre-implementation patch/hash baseline for already dirty files; never restore an entire shared file to HEAD. Disable/remove only the two new entry modules first while retaining the route and accepted delivery records. Revert only assessment-specific hunks/version; reconcile uncertain delivery with receiver evidence before replay. Never reset/clean/stash unrelated work or delete accepted records. No new dependency, CMS edit, provider/privacy setting change or infrastructure is proposed.

Only recovery/proposal documents are created in this assignment. Application edits, unit/build suites, full interactive accessibility, CRM configuration/delivery and production release are not performed. Approval is required before package 2 of the companion local plan.
