# Homepage positioning and proof plan

## Decision and scope

Lead the website with tax help for business owners across industries, while keeping clear routes for individuals where the firm serves them. The homepage must make three common needs easy to recognize: plan ahead, file accurately, and get help with an IRS problem. Construction, S-Corp, and fractional CFO work are specialist routes, not the firm's whole identity. Remove the $20k+/$23k+ homepage SEO promise unless a documented, permissioned result can support the exact claim.

This is a plan and paste-ready CMS copy. No site code or CMS documents have been changed. The existing Sanity documents may contain different live values; confirm them before publishing.

## Source map

| Surface | Current source | Consequence |
| --- | --- | --- |
| Homepage SEO title and description | `src/app/[locale]/page.tsx:25-66`, `src/sanity/schemaTypes/homePage.ts:360-365` | Paste into **Home Page → SEO Overrides**. |
| Hero H1, subtitle, primary CTA label | `src/components/home/VideoHero.tsx:74-83`, `src/sanity/schemaTypes/homePage.ts:27-85` | Paste into **Home Page → Hero Section**. Existing CMS values override translations. |
| Hero CTA destinations and secondary label | `src/components/home/VideoHero.tsx:249-265`, `src/messages/en.json:439-448` | Code/translation work; the primary button still goes to the S-Corp estimator, so do not publish the proposed general-help label until its destination changes. |
| Hero/trust credentials and counts | `src/components/home/VideoHero.tsx:80-84`, `src/components/home/TrustBar.tsx:10-17`, `src/messages/en.json:445-448` | Code/translation work; the CMS trust-logo field does not supply these labels. |
| Featured result, 98%, 1,000+, three quote cards | `src/components/home/TestimonialsSection.tsx:20-49,80-108,130-325`, `src/messages/en.json:780-843` | Currently hardcoded/translated. The component discards the fetched Sanity testimonials (`void testimonials`). CMS edits alone will not update this block. |
| Team hero and SEO | `src/app/[locale]/team/page.tsx:49-98`, `src/sanity/schemaTypes/teamPage.ts:10-37` | Paste into **Team Page Settings**. Code translations are fallback only. |
| Call length and closing CTA wording | `src/components/home/HowItWorksSection.tsx:84`, `src/components/home/HomepageCTASection.tsx:18-29`, `src/messages/en.json:930-943,1064-1075` | Code/translation work. The closing component uses a CMS URL but translation copy. |
| Contact facts | `src/sanity/schemaTypes/siteSettings.ts:53-75`, `src/app/[locale]/page.tsx:96-111` | Phone and address already have CMS fields, but the hero does not render them. |
| General tax-help intake | `src/components/contact/MultiStepContactForm.tsx:12-35,43-48`, `src/app/[locale]/contact/page.tsx:61-90` | The form accepts business and individual clients, but its choices name audit defense rather than the broader IRS notice/debt problem. |
| Contact-page proof and response promise | `src/app/[locale]/contact/page.tsx:65-69,93-105`, `src/components/contact/ContactHero.tsx:35-44`, `src/messages/en.json:1315-1333` | The page falls back to 5,000 clients, $2.3B in savings, and a two-business-hour response; clear or verify these before sending homepage traffic there. |
| Existing IRS-help route | `src/app/[locale]/vsl/tax-resolution/page.tsx:1-25` | A tax-resolution route exists; confirm its actual scope and operational availability before promising specific relief. |

## Paste-ready Sanity copy

Use both language fields. These lines avoid savings, client-volume, call-duration, and credential-rank claims while those facts are checked. The proposed hero CTA text must wait for the code destination change below.

### Home Page → Hero Section

| Field | English | Español |
| --- | --- | --- |
| Hero Title | Tax planning, filing, and IRS help for businesses and individuals. | Planificación fiscal, declaraciones y ayuda con el IRS para empresas y personas. |
| Hero Subtitle | Whether you need a better tax plan, help with a return, or support with an IRS problem, start with a clear review of your situation and next steps. | Ya sea que necesite un mejor plan fiscal, ayuda con una declaración o apoyo ante un problema con el IRS, comience con una revisión clara de su situación y sus próximos pasos. |
| Hero Primary CTA Text — publish after URL change | Get Tax Help | Obtenga ayuda fiscal |

The current primary hero button links to `/scorp-estimator`; changing only its CMS label would mislead visitors. First route it to the general contact/intake page, then publish the CTA label. The secondary link can point to a short “What do you need help with?” section.

### Home Page → SEO Overrides

| Field | English | Español |
| --- | --- | --- |
| Meta Title | Tax Planning, Filing & IRS Help \| Union National Tax | Impuestos y ayuda con el IRS \| Union National Tax |
| Meta Description | Tax planning, filing, and IRS problem support for business owners and individuals. Get clear next steps from Union National Tax, led by Jason Astwood, EA. | Planificación, preparación de impuestos y ayuda con problemas del IRS para dueños de negocios y personas. Obtenga pasos claros con Union National Tax. |

Both proposed titles fit the CMS 60-character guideline, and both descriptions fit its 160-character guideline. Update any CMS social preview that duplicates the old savings promise.

### Team Page Settings → Hero and SEO

| Field | English | Español |
| --- | --- | --- |
| Hero Badge Text | Tax Guidance for People and Businesses | Orientación fiscal para personas y empresas |
| Hero Title | Meet the people behind your tax guidance. | Conozca al equipo detrás de su orientación fiscal. |
| Hero Subtitle | Led by Jason Astwood, EA, our team helps clients plan ahead, prepare returns, and address IRS problems with clear next steps. | Dirigido por Jason Astwood, EA, nuestro equipo ayuda a los clientes a planificar, preparar declaraciones y atender problemas con el IRS mediante pasos claros. |
| SEO Meta Title | Meet Our Tax Team \| Union National Tax | Conozca a nuestro equipo fiscal \| Union National Tax |
| SEO Meta Description | Meet Jason Astwood, EA, and the Union National Tax team supporting business owners with planning, filing, and IRS matters. | Conozca a Jason Astwood, EA, y al equipo de Union National Tax que apoya a dueños de negocios con planificación, declaraciones y asuntos del IRS. |

### Site Settings → Content

Confirm the client-facing phone and Orem office address in the existing **Phone Number** and **Office Address** fields. Do not paste a number or street address from an unverified third-party listing. Confirm Jason's EA status and that the call actually includes him before saying so on the page.

### Testimonial → Case Study (template; fill and verify before publishing)

The schema already has Client Name, Company, Before, After, Outcome, Quote, and Featured fields (`src/sanity/schemaTypes/testimonial.ts:23-96`). Use one permissioned case relevant to a core service; it need not be from construction. These are input prompts, not publishable claims:

- **Before:** In [tax year], [client] had [entity or filing situation] and [income/profit range, if relevant]. The documented issue was [specific issue].
- **After:** After reviewing [the relevant tax or IRS facts], the agreed plan was [specific steps and dates].
- **Outcome:** [Measured result and period], calculated against [baseline and method]. If no financial result can be documented, describe a verified process result without a dollar figure.
- **Quote:** Only the client's approved words, with approved name, company, role, and photo use.

Record the approval and supporting calculation outside the public CMS fields. The current `testimonial` schema defines `outcome` twice (`src/sanity/schemaTypes/testimonial.ts:70,124`); resolve that before relying on this document for the featured case.

## Implementation sequence

1. **Confirm the service and claim register.** Verify which planning, filing, IRS notice, audit, debt, and representation services are currently offered, to whom, and in which jurisdictions. Record actual call length/cost, what “served” counts, the 98% survey denominator/method, Jason's credentials, contact details, response commitments, and written case-study permission. Until a claim is documented, omit it from the homepage, contact page, SEO, structured data, and social previews. The contact page's 5,000-client and $2.3B-savings fallbacks require immediate removal or evidence.
2. **Paste the CMS copy that already matches its destination.** Update Home Page H1, subtitle, and SEO plus Team Page Settings in both languages. Hold the proposed hero CTA label until its URL changes from the S-Corp estimator to the general intake. Sanity `initialValue` affects only new documents; existing documents need direct edits.
3. **Create clear need-based routes.** Replace the large homepage service showcase with a compact “What do you need help with?” section: **Plan ahead** → tax planning, **File and stay current** → tax preparation, **Resolve an IRS problem** → a confirmed IRS-help destination. Include an “I'm not sure” link to the contact intake. Confirm the tax-resolution page is appropriate for public traffic before linking to it. Keep industry specialization visible one level deeper, without calling the firm construction-exclusive.
4. **Fix the intake and conversion paths.** First remove or verify the contact page's numeric fallbacks and two-business-hour response promise. Then route the primary hero CTA and final CTA to the general contact/intake flow, and the secondary hero link to the need-based section. Extend `MultiStepContactForm` beyond “audit defense” so a visitor with an IRS notice or tax debt can select the right reason; retain the existing business/individual distinction and route urgent matters to a suitable human follow-up. Keep the S-Corp estimator on its own service path. Confirm call duration, then use one value everywhere or omit duration.
5. **Repair the proof pipeline in code.** Make `TestimonialsSection` render approved Sanity testimonials instead of translation placeholders; remove the hardcoded, unverified fallback case and unattributed industry quote cards. If no approved case exists, show a factual description of the process without a named result. Resolve the duplicate testimonial `outcome` field. Remove 98% and numerical client counts until the register supplies the definitions, sample/date, and method. A featured case from any served industry is suitable if its context is clear.
6. **Trim repetition and align trust details.** In `src/app/[locale]/page.tsx`, retain one explanation of planning versus reactive filing, one three-step path that also makes sense for IRS cases, one proof block, and one final action. Remove repeated Evaluate/Plan/Adjust and quarterly-review passages; target roughly 30% fewer visible words in each locale. Replace “Highest Credential” and unsupported CPA comparisons. Show Jason's name and EA status alongside verified phone and city near the hero; keep the video sound button attached to the player.
7. **Align adjacent pages.** Check Team, Industries, Services, Contact, estimator, blog, tax-resolution landing page, and footer for construction-exclusive positioning, unqualified savings, invented client counts, contradictory call details, and unsupported promises about IRS outcomes. Present construction and S-Corp as specialist offerings within a broader tax practice. Rename footer “Shop” to “Resources” only if the destination remains the resource store.

## Acceptance and verification

- English and Spanish homepage title, H1, subtitle, and first proof line describe the same broad tax-help offer. Neither homepage SEO field contains an unsupported dollar claim.
- No homepage or team instance of “Highest Credential,” unsupported CPA staffing/comparison, or conflicting 30/45-minute call duration remains.
- Every displayed numerical proof claim has an internal source record with a definition and date; recommendation rates also have a sample size and method. Otherwise the claim is absent.
- The homepage featured case comes from a published, approved CMS record with a real attribution and documented outcome, or the section shows a claim-free substitute. Editing that CMS record updates the page.
- The contact destination shows no undocumented 5,000-client, $2.3B-savings, or two-business-hour claim before the homepage points to it.
- Business owners and individuals can reach planning, filing, and IRS-help routes from the first screen or the immediately following section. A visitor with an IRS notice can identify that need in the intake form. The hero and final CTA route to the same general tax-help intake; the S-Corp estimator remains on its specialist path.
- Hero displays a verified phone and city on desktop and mobile. Site copy and structured data agree with CMS contact details.
- A desktop and mobile manual review at both locales confirms readable layout, working links, correct metadata, and about one-third less homepage copy. Do not run lint, typecheck, tests, or static analysis under this repository's `AGENTS.md` rule unless the user directly requests `npm run build`.

## Risks and constraints

- A CMS text paste cannot alter hardcoded homepage results, trust chips, CTA URLs, or closing CTA text; those need the code steps above.
- Publishing a new case without written permission or a traceable calculation would recreate the original trust problem. Keep the proof block claim-free until those records exist.
- “200+ contractors” may be a subset of “1,000+ business owners”; confirm the definitions before treating them as contradictory or combining them.
- The tax-resolution route exists, but its actual intake capacity and promises need confirmation before the homepage directs urgent IRS cases there. The general contact form already accepts business and individual clients.
- Industry pages may speak directly to their audience; the homepage and Team page should represent the full practice accurately.

## Design audit amendments — 29 September 2026

See `homepage-design-review-2026-09-29.md` for browser measurements and official sources. Prioritize visible video pause, stopping hidden/reduced-motion foreground autoplay, and the measured low-contrast mobile service caption. Shorten the mobile Services section (about 3,348px at 390px width) and move credible proof above the current position more than 7,200px down. Keep the planning comparison compact or move its full version to the planning route so IRS-help visitors reach their service promptly. Do not enlarge the already-128px-high desktop service selectors just to reach a 44px target. Current selected controls are native buttons, not ARIA tabs; preserve valid button behavior or implement the full tabs pattern if changing semantics. Unify the Client results text edge with other sections (44px difference at 1920px). These findings refine implementation priorities without changing the CMS copy above.
