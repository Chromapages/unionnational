# Site number inventory for About approval

Collected 2026-10-01 from the working checkout and an anonymous read of the configured public Sanity production dataset. No figures have been selected, changed, or verified against business records.

## Scope and limitations

- All digit-bearing EN message leaves are listed.
- Static TS/TSX content candidates from public app routes, components, data, service helpers, and CMS schema initial values are listed with lines. Candidates include unused components and fallback/schema text; their presence does not prove live rendering. Mixed inline Spanish content may also appear.
- CMS content was retrieved for 141 published/non-draft documents from the public content types used by the site, including all 46 blogPost documents in this snapshot. Numeric leaf fields are inventoried (excluding display ordering and visual metadata); this is not a tax/legal fact check or confirmation every stored field renders. Drafts, legacy post/category types, private/task documents, asset metadata, URL identifiers, scripts, binary media, and third-party embeds are excluded.
- Dynamic calculator outcomes, formatted dates, progress/step indexes, technical styling dimensions, and runtime-generated numeric text are not exhaustively enumerated. Spelled-out quantities may require editorial review.
- Schema initial values are separately identified by their src/sanity/schemaTypes source and are not treated as published CMS values.
- No build, tests, lint, typecheck, or static quality analysis was run. The TypeScript parser only extracts literal content for this inventory.

## Conflicts and approval questions

| Topic | Figures found | Meaning/approval needed |
|---|---|---|
| Business owners / clients | EN 1,000+ owners; Contact CMS/rendered 5,000+ clients; VSL fallback 12,400+ clients and 12K+ satisfied clients; unused StatsSection 500+ clients; About ImpactMetrics 1,000+ active clients | Define served/active/client audience, dates, and supporting record; rounded 12K and 12,400 may agree but differ greatly from general totals. Home CMS 200+ contractors is a subset claim. |
| Experience / tenure | EN 15+ years; published founder bio 15+; stored AboutPage.FounderSection.bio says “two decades”; Blueprint author 10+ years in practice; unused About ImpactMetrics 10+ years service; unused StatsSection 48+ years experience | Individual, firm, and combined experience need labels and dates; do not replace with one figure without approval. The spelled-out About quantity is manually included because the digit inventory does not capture it. |
| Tax savings | About rendered mobile timeline $25M saved (2021); Contact published/rendered $2.3B tax savings represented; home fallback $2M+; home CMS $23,420 average annual savings; blog CTA $20K annual average | Total savings and annual average differ; approve total scope/time period and average methodology. |
| About timeline | Rendered 2012 founding / 2018 EA / 2021 $25M / 2024 1,000+ / 2025 CFO; CMS years 2015/2018/2021 CFO/2024 $100M+ optimized taxable income; schema initially 2018/2020/2022 $10M/2024 | CMS timeline currently is not passed to CompanyTimeline. 2015/2018 CMS entries have no titles. Do not equate optimized income with savings. |
| Call duration | Site EN defaults 30 minutes; published home CTA 15 minutes; published Contact SEO 15 minutes | Approve intended call duration and update page copy/metadata consistently. |
| Response time | Published Contact 1 Hour; EN and fallback 2 hours; form within 2 business hours; Blueprint inquiry within 24 hours | Distinguish measured average from service commitments and distinct inquiry routes. |
| Success rate | VSLMetricsBar 97%; VSLTrustBar 98%; VSLFaq 97% settlement acceptance | Different measures may be valid; both success-rate labels need a defined population and period. 98% recommend and 94% retention are separate measures. |
| Debt reduction / resolution duration | Published tax-resolution CMS average 40–60%, most cases 3–6 months; VSLClientResults 78% avg debt reduction and 21 days protection; VSLFaq 78%, 4–12 months settlement, 21 days collections | Reduction average conflicts; protection speed and full settlement duration are different measures. |
| Contractor savings range | Contractors metadata/hero $20K–$80K annual savings; same page result intro $15K–$80K deductions | Clarify savings versus deductions and minimum bounds. |
| Real-estate savings / deductions | Hero $25K–$100K+ annual savings; analysis intro $25K–$100K+ deductions; cost segregation $50K–$200K+ deductions; published VSL $15K+ avg savings | Scope and savings/deduction units need approval. |
| Capacity / promotion | Home CMS 150 client capacity cap; Construction VSL 4 new partners/month; Services EN 12 partner spots/year; Blueprint bonus before June 30, 2026 | Different capacities may coexist but need labels; dated bonus is expired as of this audit date unless conditionally hidden. |

## Values that must remain separate

Proof/experience/results claims require substantiation. Pricing, revenue eligibility bands, illustrative calculator assumptions/examples, legal deadlines, phone/address identifiers, dates, and technical security sizes serve different purposes and must not be normalized to an About proof number. Numbers such as 50 states, 256-bit encryption, 3-year audit protection, 2–5 hotel nights, and 100% confidentiality are claims/commitments even though they are not client results.

## Public CMS document coverage

- aboutPage: 1
- author: 2
- blogCategory: 23
- blogPost: 46
- blogSettings: 1
- contactSettings: 1
- faq: 4
- homePage: 1
- legalPage: 1
- pricingTier: 14
- product: 7
- service: 7
- servicePage: 7
- servicesPage: 1
- shopSettings: 1
- siteSettings: 1
- teamMember: 12
- teamPage: 1
- testimonial: 6
- vslPage: 4

## EN messages (59 numeric leaves)

| Source | Numeric content |
|---|---|
| EN.Footer.fallbackPhone | (801) 555-0123 |
| EN.Footer.metaStarted | 30 minutes to get started |
| EN.Common.trustedByBusinessOwners | 1,000+ business owners served |
| EN.ServicesPage.Desktop.packages.foundation.fallbackFeatures.2 | 3-Year Audit Protection |
| EN.ServicesPage.Desktop.packages.growth.welcomeBenefit | Growth welcome benefit: qualifying clients may receive a private hotel stay of 2–5 nights, subject to eligibility and stay terms. |
| EN.ServicesPage.ComparisonTable.features.auditProtection | 3-Year Audit Protection |
| EN.ServicesPage.ComparisonTable.investmentTiers.foundation | $3,500+ |
| EN.ServicesPage.ComparisonTable.investmentTiers.growth | $6,500+ |
| EN.ServicesPage.ComparisonTable.investmentTiers.executive | $10,000+ |
| EN.ServicesPage.ComparisonTable.hotelNights | 2-5 Nights |
| EN.ServicesPage.ExecutiveIncentive.description | Disconnect from day-to-day operations and spend two days with Union National strategists and 11 of America's most serious business owners — working on your business, not just in it. |
| EN.ServicesPage.ExecutiveIncentive.features.privateRetreats | 2-Day Private Strategy Summit |
| EN.ServicesPage.ExecutiveIncentive.features.assetProtection | 3-Year Audit Shield Included |
| EN.ServicesPage.ExecutiveIncentive.limitText | 12 partner spots available — {year} |
| EN.ServicesPage.ExecutiveIncentive.qualificationNote | For qualified businesses · $500K+ annual revenue |
| EN.HomeHero.trustVolume | 1,000+ Business Owners Served |
| EN.HomeHero.trustExperience | 15+ Years Experience |
| EN.HomeHero.trustAdvisory | 15+ Years Experience |
| EN.HomePage.VideoHero.calculator.placeholder | Net Income (e.g. 150,000) |
| EN.HomePage.VideoHero.dashboard.retainedEarnings | +15.3% retained earnings vs Sole Prop |
| EN.HomePage.VideoHero.primaryCtaNote | Free 30-minute consultation • No obligation |
| EN.HomePage.SingleCTA.subtitle | Book a 30-minute discovery evaluation with an enrolled agent. We'll identify planning gaps, S-Corp opportunities, and immediate savings. |
| EN.HomePage.NationwideServiceSection.subtitle | No location barriers. We provide expert tax strategy to business owners in all 50 states through our secure digital platform. |
| EN.HomePage.NationwideServiceSection.visual.titleAccent | across all 50 states. |
| EN.HomePage.TestimonialsSection.stats.ownersServedValue | 1,000+ |
| EN.HomePage.TestimonialsSection.stats.recommendRateValue | 98% |
| EN.HomePage.HowItWorksSection.metaDuration | 30 minutes |
| EN.HomePage.HowItWorksSection.ctaSupport | 30-minute discovery call • No preparation required • Direct with an Enrolled Agent |
| EN.HomePage.ExitIntentModal.title | Check your business tax blind spots in 2 minutes. |
| EN.HomePage.ExitIntentModal.subtitle | Answer 7 quick questions to uncover hidden tax savings—no call required. |
| EN.HomePage.ExitIntentModal.meta | 7 questions • Instant health score • 100% confidential |
| EN.HomePage.ExitIntentModal.mobileSubtitle | 7 quick questions • 2 min assessment |
| EN.HomePage.CTASection.homepageReassurance | Free 30-minute consultation · No obligation |
| EN.HomePage.CTASection.trustDurationTitle | 30 minutes |
| EN.HomePage.CTASection.footerText | No obligation. 100% Confidential. |
| EN.HomePage.CTASection.consultationNote | Free 30-minute consultation |
| EN.HomePage.CTASection.strategySessionNote | Free 30-minute strategy session |
| EN.Booking.meetingMeta | Free 30-minute consultation · No obligation |
| EN.Booking.hero.subtitle | Choose a time for a free 30-minute conversation. We'll learn about your business and discuss what deserves attention next. |
| EN.Booking.hero.facts.0.title | 30 minutes |
| EN.AboutPage.Desktop.hero.metrics.0.title | 1,000+ |
| EN.AboutPage.TrustVault.items.encryption.title | 256-bit Encryption |
| EN.ContactPage.Hero.proof.avgResponse | 2hr Avg. Response |
| EN.ContactPage.Hero.stats.responseTimeValue | 2 hours |
| EN.ContactPage.AlternativeCTA.fallbackSubtitle | Skip the back-and-forth email tag. Book a free 30-minute strategy call with our team. |
| EN.ContactPage.TrustBadges.encryption | 256-bit Encryption |
| EN.ContactPage.TrustBadges.avgResponse | 2hr Avg. Response |
| EN.ContactPage.TeamMemberCard.fallbackCredentials.2 | 15+ Years Exp |
| EN.ContactPage.TeamMemberCard.fallbackPhone | (555) 123-4567 |
| EN.ContactPage.MultiStepForm.microcopy | Takes 45 seconds · No obligation · We'll match you to the right strategist within 2 business hours. |
| EN.ContactPage.MultiStepForm.success.responseTime | Expect a response within 2 business hours |
| EN.ContactPage.MultiStepForm.step2.placeholders.phone | (555) 000-0000 |
| EN.ConstructionBlueprint.credentials | IRS Enrolled Agent · Licensed in all 50 states |
| EN.Shop.FeatureBento.execution.value | Under 2 hours |
| EN.ConsumerHome.hero.microproof | 30-minute call · No obligation |
| EN.ConsumerHome.proof.experience | 15+ years of experience |
| EN.ConsumerHome.proof.owners | 1,000+ business owners served |
| EN.ConsumerHome.process.booking.duration | 30 minutes |
| EN.ConsumerHome.final.duration.label | 30 minutes |

## Static content and schema initial values (1072 candidates)

| Source | Numeric content |
|---|---|
| src/components/about/ClientLogosSection.tsx:31 | Trusted by 1,000+ Business Owners |
| src/components/about/CompanyTimeline.tsx:12 | 2012 |
| src/components/about/CompanyTimeline.tsx:13 | 2018 |
| src/components/about/CompanyTimeline.tsx:14 | 2021 |
| src/components/about/CompanyTimeline.tsx:14 | $25M Saved |
| src/components/about/CompanyTimeline.tsx:14 | Milestone: $25M in client tax savings |
| src/components/about/CompanyTimeline.tsx:15 | 2024 |
| src/components/about/CompanyTimeline.tsx:15 | 1,000+ Clients |
| src/components/about/CompanyTimeline.tsx:15 | Serving 1,000+ business owners |
| src/components/about/CompanyTimeline.tsx:16 | 2025 |
| src/components/about/ImpactMetrics.tsx:11 | value={25000000} |
| src/components/about/ImpactMetrics.tsx:18 | value={1000} |
| src/components/about/ImpactMetrics.tsx:25 | value={10} |
| src/components/books/BookHero.tsx:109 | out of 5 Reader Rating |
| src/components/books/BookLeadForm.tsx:71 | 1.0 |
| src/components/books/BookLeadForm.tsx:176 | (555) 123-4567 |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:19 | $23,420 |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:20 | 1,000+ |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:21 | 10+ |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:33 | Est. 2012 - Orem, UT |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:34 | Licensed in all 50 states |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:88 | EA — IRS Enrolled Agent, licensed to represent taxpayers in audits across all 50 states |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:119 | — a firm built from the ground up to serve contractors, construction companies, and trade businesses. Since 2012, his firm has helped |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:120 | 1,000+ business owners |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:121 | $23,420 per year |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:129 | , Jason distills a decade of frontline advisory work into an actionable framework any contractor can implement — whether they&apos;re doing $500K or $10M a year. |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:148 | *Methodology: average tax savings figure is calculated from internal advisory engagements completed between 2012–2024. Individual results vary based on entity structure, revenue, deductions, and current IRS regulations. Past performance is not a guarantee of future outcomes. |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:158 | Book 30 minutes with Jason. Apply the blueprint to your specific numbers — no pitch, no obligation. |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:166 | Book a Free 30-Minute Call with Jason Astwood (opens in a new tab) |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:169 | Book a Free 30-Min Call |
| src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx:175 | Video call · 30 min · No prep needed |
| src/components/construction/profit-blueprint/BlueprintFAQ.tsx:10 | Not at all. The blueprint works for any construction or trade business doing $250K–$20M in revenue. The systems scale up — but they're designed to start working immediately regardless of your current size. |
| src/components/construction/profit-blueprint/BlueprintFAQ.tsx:18 | Physical books ship within 3–5 business days via standard US shipping (free). You'll receive an order confirmation with tracking. All digital formats are available immediately after purchase. |
| src/components/construction/profit-blueprint/BlueprintFAQ.tsx:30 | The book is designed to be read in one Saturday morning — about 3 hours. The implementation checklists at the end of each chapter take 15 minutes each to apply. Most contractors start with Chapter 2 (Pricing) because it gives them an immediate win on their next bid. |
| src/components/construction/profit-blueprint/BlueprintMastery.tsx:19 | Build a markup calculator that prices every job at 18% minimum net margin — in under 20 minutes. |
| src/components/construction/profit-blueprint/BlueprintMastery.tsx:37 | Create a 5-step daily project check-in SOP that PMs follow to log labor and material changes on-site. |
| src/components/construction/profit-blueprint/BlueprintMoreInfoForm.tsx:70 | 1.0 |
| src/components/construction/profit-blueprint/BlueprintMoreInfoForm.tsx:144 | Envíenos un mensaje y le responderemos en un plazo de 24 horas. |
| src/components/construction/profit-blueprint/BlueprintMoreInfoForm.tsx:145 | Send us a message and we'll get back to you within 24 hours. |
| src/components/construction/profit-blueprint/BlueprintMoreInfoForm.tsx:195 | (555) 555-5555 |
| src/components/construction/profit-blueprint/BlueprintMoreInfoForm.tsx:228 | address-level1 |
| src/components/construction/profit-blueprint/BlueprintVideoSection.tsx:79 | Watch the 4-Minute Walkthrough |
| src/components/construction/profit-blueprint/BlueprintVideoSection.tsx:87 | 5% to 18% net margin in 18 months. |
| src/components/construction/profit-blueprint/BlueprintVideoSection.tsx:93 | A 4-minute walkthrough of the system Jason has used with hundreds of contractors to plug profit leaks and build a company that runs without the owner on every job site. |
| src/components/construction/profit-blueprint/CallBookingEmbed.tsx:13 | Book Your Free 30-Minute Call |
| src/components/construction/profit-blueprint/CallBookingEmbed.tsx:20 | 30 minutes with our team. No pitch. We&apos;ll help you identify the single biggest profit leak in your business and what to do about it. |
| src/components/construction/profit-blueprint/CallBookingEmbed.tsx:36 | Video call &middot; 30 min &middot; No prep needed |
| src/components/construction/profit-blueprint/ConstructionBookForm.tsx:60 | 1.0 |
| src/components/construction/profit-blueprint/ConstructionBookForm.tsx:147 | (555) 555-5555 |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:120 | price: 39 |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:298 | 5.0 (247 opiniones) |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:298 | 5.0 (247 reviews) |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:301 | 5.0 (247 contratistas compraron este mes) |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:301 | 5.0 (247 contractors bought this month) |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:428 | 5.0 (247 opiniones) |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:428 | 5.0 (247 reviews) |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:431 | 5.0 (247 contratistas compraron este mes) |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:431 | 5.0 (247 contractors bought this month) |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:533 | $130 |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:534 | You save $51 |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:579 | 30-Day Money-Back Guarantee · No questions asked |
| src/components/construction/profit-blueprint/ConstructionBookSalesSection.tsx:590 | 60-Day Money-Back Guarantee |
| src/components/construction/profit-blueprint/ControlSystemSection.tsx:29 | 90-day rolling cash flow forecasts so you can see gaps before they become crises. Plan for payroll, not around it. |
| src/components/construction/profit-blueprint/ExitIntentChecklist.tsx:67 | button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"]) |
| src/components/construction/profit-blueprint/ExitIntentChecklist.tsx:108 | 1.0 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:13 | 2026-06-30T23:59:59-04:00 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:52 | Limited Q2 Bonus |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:53 | Order Before June 30 — Get the $297 Template Stack Free |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:54 | Three implementation tools Jason built for his private clients. Yours free when you order the blueprint before Q2 close. |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:59 | Track direct labor, materials, subs, and equipment per job against contracted price. Reveals the 20% of jobs losing money. |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:64 | 13-Week Cash Flow Forecast |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:65 | Rolling 13-week projection with starting cash and variance columns. The survival tool for slow-paying GCs and seasonal swings. |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:76 | $297 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:78 | Blueprint from $27 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:80 | $324+ |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:84 | Bonus delivered via email within 24 hours of purchase. No code required — included automatically with orders placed before June 30, 2026. |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:88 | Bono Limitado del Q2 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:89 | Ordene Antes del 30 de Junio — Reciba el Paquete de Plantillas de $297 Gratis |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:90 | Tres herramientas de implementación que Jason creó para sus clientes privados. Suyas gratis al ordenar el plan antes del cierre del Q2. |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:95 | Siga mano de obra directa, materiales, subcontratistas y equipo por trabajo contra el precio contratado. Revela el 20% de trabajos que pierden dinero. |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:100 | Pronóstico de Flujo de Efectivo a 13 Semanas |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:101 | Proyección continua de 13 semanas con efectivo inicial y columnas de varianza. La herramienta de supervivencia para contratistas generales con pagos lentos. |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:112 | $297 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:114 | Plan desde $27 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:116 | $324+ |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:120 | Bono entregado por correo electrónico dentro de las 24 horas posteriores a la compra. Sin código requerido — incluido automáticamente con pedidos realizados antes del 30 de junio de 2026. |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:232 | $27 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:236 | $99 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:240 | $129 |
| src/components/construction/profit-blueprint/LimitedBonusCard.tsx:244 | $79 |
| src/components/construction/profit-blueprint/MathSection.tsx:38 | Select your annual revenue below to calculate the real, compounding cost of a 5% average profit margin compared to a systems-driven 18% margin. |
| src/components/construction/profit-blueprint/MathSection.tsx:63 | $250K |
| src/components/construction/profit-blueprint/MathSection.tsx:64 | $5M |
| src/components/construction/profit-blueprint/MathSection.tsx:65 | $10M+ |
| src/components/construction/profit-blueprint/MathSection.tsx:81 | 5% Net Margin |
| src/components/construction/profit-blueprint/MathSection.tsx:91 | 5% |
| src/components/construction/profit-blueprint/MathSection.tsx:114 | 18% Net Margin |
| src/components/construction/profit-blueprint/MathSection.tsx:124 | 18% |
| src/components/construction/profit-blueprint/MathSection.tsx:159 | Over 5 Years |
| src/components/construction/profit-blueprint/MathSection.tsx:163 | Over 10 Years |
| src/components/construction/profit-blueprint/MathSection.tsx:187 | The Blueprint · $27 Digital or $39 Print |
| src/components/construction/profit-blueprint/MobileStickyCta.tsx:46 | Get It Now · $27 |
| src/components/construction/profit-blueprint/MobileStickyCta.tsx:53 | Get the Blueprint · $27 |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:15 | The 6 Chapters That Decide Whether You Build Wealth |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:54 | 5&ndash;6% net margin |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:54 | 15&ndash;25% |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:67 | Picture This: 12 Months From Now |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:79 | You open the books. Revenue is up 18%. Profit is up 60% &mdash; not because you raised prices, but because you stopped losing money on jobs you thought were winners. |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:85 | You have 3 months of operating cash in the account. The line of credit is paid off. The tax estimate next April is fully covered, set aside monthly, automated. |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:127 | Option 1: |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:127 | Put the book down, close this page, and go back to running your company the way you&apos;ve been running it. The 5% margin stays. The 60-hour weeks stay. The April tax bill stays. The gap between revenue and wealth stays. |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:133 | Option 2: |
| src/components/construction/profit-blueprint/SalesLetterSection.tsx:133 | Spend $27 today. Read it on Saturday. Implement one system on Monday. Watch what happens to the next job you estimate. |
| src/components/construction/profit-blueprint/SoundFamiliarSection.tsx:43 | &ldquo;The average general contractor runs on a 5&ndash;6% net margin. Healthy operators hit 8&ndash;10%. The top performers in specialty trades run 15&ndash;25%. The gap? Leadership, structure, and knowing your numbers.&rdquo; |
| src/components/construction/profit-blueprint/SoundFamiliarSection.tsx:53 | plug the leaks, build real profit, and create a company that runs without the owner being on-site 24/7. |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:48 | Under $100K |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:48 | $100K–$250K |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:48 | $250K–$500K |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:48 | $500K–$1M |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:48 | $1M–$3M |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:48 | $3M–$5M |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:48 | $5M+ |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:50 | 1–4 |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:50 | 5–9 |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:50 | 10–19 |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:50 | 20–49 |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:50 | 50+ |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:85 | Please enter a valid phone number (10+ digits) |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:96 | $250K–$500K |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:97 | $500K–$1M |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:98 | $1M–$3M |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:98 | $3M–$5M |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:99 | $5M+ |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:151 | Without 90-day forecasting, cash crunches catch you off guard — even during busy seasons. |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:304 | 2.0 |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:498 | Do you use 90-day cash flow forecasts? |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:672 | (555) 123-4567 |
| src/components/construction/profitability-assessment/ProfitabilityAssessmentForm.tsx:749 | Score / 100 |
| src/components/contact/MobileContactBar.tsx:6 | (801) 890-1040 |
| src/components/contact/MultiStepContactForm.tsx:58 | step1.goals.taxReduction |
| src/components/contact/MultiStepContactForm.tsx:58 | step1.helpers.taxReduction |
| src/components/contact/MultiStepContactForm.tsx:59 | step1.goals.auditDefense |
| src/components/contact/MultiStepContactForm.tsx:59 | step1.helpers.auditDefense |
| src/components/contact/MultiStepContactForm.tsx:60 | step1.goals.restructure |
| src/components/contact/MultiStepContactForm.tsx:60 | step1.helpers.restructure |
| src/components/contact/MultiStepContactForm.tsx:61 | step1.goals.partnership |
| src/components/contact/MultiStepContactForm.tsx:61 | step1.helpers.partnership |
| src/components/contact/MultiStepContactForm.tsx:141 | step1.fallbackTitle |
| src/components/contact/MultiStepContactForm.tsx:142 | step1.fallbackSubtitle |
| src/components/contact/MultiStepContactForm.tsx:143 | step1.fallbackTitle |
| src/components/contact/MultiStepContactForm.tsx:161 | step1.errorMessage |
| src/components/contact/MultiStepContactForm.tsx:163 | step1.continueButton |
| src/components/contact/MultiStepContactForm.tsx:170 | step2.backButton |
| src/components/contact/MultiStepContactForm.tsx:184 | step2.backButton |
| src/components/contact/MultiStepContactForm.tsx:185 | step2.title |
| src/components/contact/MultiStepContactForm.tsx:186 | step2.subtitle |
| src/components/contact/MultiStepContactForm.tsx:188 | step2.labels.firstName |
| src/components/contact/MultiStepContactForm.tsx:188 | step2.placeholders.firstName |
| src/components/contact/MultiStepContactForm.tsx:189 | step2.labels.lastName |
| src/components/contact/MultiStepContactForm.tsx:189 | step2.placeholders.lastName |
| src/components/contact/MultiStepContactForm.tsx:190 | step2.labels.email |
| src/components/contact/MultiStepContactForm.tsx:190 | step2.placeholders.email |
| src/components/contact/MultiStepContactForm.tsx:191 | step2.labels.phone |
| src/components/contact/MultiStepContactForm.tsx:191 | step2.placeholders.phone |
| src/components/contact/MultiStepContactForm.tsx:193 | step2.labels.message |
| src/components/contact/MultiStepContactForm.tsx:193 | step2.placeholders.message |
| src/components/contact/MultiStepContactForm.tsx:194 | step2.privacyText |
| src/components/contact/MultiStepContactForm.tsx:197 | step2.sending |
| src/components/contact/MultiStepContactForm.tsx:197 | step2.submitButton |
| src/components/health-check/HealthCheckSurvey.tsx:49 | Have you filed all federal & state tax returns for the last 3 years? |
| src/components/health-check/HealthCheckSurvey.tsx:54 | Missing 1-2 returns |
| src/components/health-check/HealthCheckSurvey.tsx:55 | Missing more than 2 returns |
| src/components/health-check/HealthCheckSurvey.tsx:65 | Yes, under $10k |
| src/components/health-check/HealthCheckSurvey.tsx:66 | Yes, $10k - $50k |
| src/components/health-check/HealthCheckSurvey.tsx:67 | Yes, over $50k |
| src/components/health-check/HealthCheckSurvey.tsx:285 | Premium-grade insight across entity structure, compliance, and operations in under 2 minutes. |
| src/components/health-check/HealthCheckSurvey.tsx:330 | Estimated time: 2 minutes |
| src/components/health-check/SecurityBadge.tsx:10 | 256-bit Encryption |
| src/components/home/BentoGridSection.tsx:155 | $2M+ |
| src/components/home/ConsumerHome.tsx:117 | 0 |
| src/components/home/ExitIntentModal.tsx:136 | button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]) |
| src/components/home/FloatingTaxButton.tsx:67 | -100% |
| src/components/home/FloatingTaxButton.tsx:69 | -100% |
| src/components/home/HowItWorksSection.tsx:84 | 30 minutes |
| src/components/home/HowItWorksSection.tsx:110 | whyItWorksPoints.0 |
| src/components/home/HowItWorksSection.tsx:110 | whyItWorksPoints.0 |
| src/components/home/HowItWorksSection.tsx:110 | whyItWorksPoints.0 |
| src/components/home/HowItWorksSection.tsx:111 | whyItWorksPoints.1 |
| src/components/home/HowItWorksSection.tsx:111 | whyItWorksPoints.1 |
| src/components/home/HowItWorksSection.tsx:111 | whyItWorksPoints.1 |
| src/components/home/HowItWorksSection.tsx:112 | whyItWorksPoints.2 |
| src/components/home/HowItWorksSection.tsx:112 | whyItWorksPoints.2 |
| src/components/home/HowItWorksSection.tsx:112 | whyItWorksPoints.2 |
| src/components/home/HowItWorksSection.tsx:113 | whyItWorksPoints.3 |
| src/components/home/HowItWorksSection.tsx:113 | whyItWorksPoints.3 |
| src/components/home/HowItWorksSection.tsx:113 | whyItWorksPoints.3 |
| src/components/home/HowItWorksSection.tsx:237 | 1– |
| src/components/home/NationwideServiceSection.tsx:47 | CheckCircle2 |
| src/components/home/NationwideServiceSection.tsx:77 | 50 |
| src/components/home/NationwideServiceSection.tsx:83 | 100% |
| src/components/home/ServicesSection.tsx:146 | blocks.01.eyebrow |
| src/components/home/ServicesSection.tsx:146 | blocks.01.eyebrow |
| src/components/home/ServicesSection.tsx:146 | blocks.01.eyebrow |
| src/components/home/ServicesSection.tsx:147 | blocks.01.title |
| src/components/home/ServicesSection.tsx:147 | blocks.01.title |
| src/components/home/ServicesSection.tsx:147 | blocks.01.title |
| src/components/home/ServicesSection.tsx:148 | blocks.01.subtitle |
| src/components/home/ServicesSection.tsx:148 | blocks.01.subtitle |
| src/components/home/ServicesSection.tsx:148 | blocks.01.subtitle |
| src/components/home/ServicesSection.tsx:154 | blocks.02.eyebrow |
| src/components/home/ServicesSection.tsx:154 | blocks.02.eyebrow |
| src/components/home/ServicesSection.tsx:154 | blocks.02.eyebrow |
| src/components/home/ServicesSection.tsx:155 | blocks.02.title |
| src/components/home/ServicesSection.tsx:155 | blocks.02.title |
| src/components/home/ServicesSection.tsx:155 | blocks.02.title |
| src/components/home/ServicesSection.tsx:156 | blocks.02.subtitle |
| src/components/home/ServicesSection.tsx:156 | blocks.02.subtitle |
| src/components/home/ServicesSection.tsx:156 | blocks.02.subtitle |
| src/components/home/ServicesSection.tsx:162 | blocks.03.eyebrow |
| src/components/home/ServicesSection.tsx:162 | blocks.03.eyebrow |
| src/components/home/ServicesSection.tsx:162 | blocks.03.eyebrow |
| src/components/home/ServicesSection.tsx:163 | blocks.03.title |
| src/components/home/ServicesSection.tsx:163 | blocks.03.title |
| src/components/home/ServicesSection.tsx:163 | blocks.03.title |
| src/components/home/ServicesSection.tsx:164 | blocks.03.subtitle |
| src/components/home/ServicesSection.tsx:164 | blocks.03.subtitle |
| src/components/home/ServicesSection.tsx:164 | blocks.03.subtitle |
| src/components/home/ServicesSection.tsx:170 | blocks.04.eyebrow |
| src/components/home/ServicesSection.tsx:170 | blocks.04.eyebrow |
| src/components/home/ServicesSection.tsx:170 | blocks.04.eyebrow |
| src/components/home/ServicesSection.tsx:171 | blocks.04.title |
| src/components/home/ServicesSection.tsx:171 | blocks.04.title |
| src/components/home/ServicesSection.tsx:171 | blocks.04.title |
| src/components/home/ServicesSection.tsx:172 | blocks.04.subtitle |
| src/components/home/ServicesSection.tsx:172 | blocks.04.subtitle |
| src/components/home/ServicesSection.tsx:172 | blocks.04.subtitle |
| src/components/home/ServicesSection.tsx:184 | centerHub.subtitle1 |
| src/components/home/ServicesSection.tsx:184 | centerHub.subtitle1 |
| src/components/home/ServicesSection.tsx:184 | centerHub.subtitle1 |
| src/components/home/ServicesSection.tsx:185 | centerHub.subtitle2 |
| src/components/home/ServicesSection.tsx:185 | centerHub.subtitle2 |
| src/components/home/ServicesSection.tsx:185 | centerHub.subtitle2 |
| src/components/home/ServicesSection.tsx:196 | comparisonBanner.benefits.0 |
| src/components/home/ServicesSection.tsx:196 | comparisonBanner.benefits.0 |
| src/components/home/ServicesSection.tsx:196 | comparisonBanner.benefits.0 |
| src/components/home/ServicesSection.tsx:197 | comparisonBanner.benefits.1 |
| src/components/home/ServicesSection.tsx:197 | comparisonBanner.benefits.1 |
| src/components/home/ServicesSection.tsx:197 | comparisonBanner.benefits.1 |
| src/components/home/ServicesSection.tsx:198 | comparisonBanner.benefits.2 |
| src/components/home/ServicesSection.tsx:198 | comparisonBanner.benefits.2 |
| src/components/home/ServicesSection.tsx:198 | comparisonBanner.benefits.2 |
| src/components/home/ServicesSection.tsx:249 | 1.5 |
| src/components/home/ServicesSection.tsx:250 | 3.5 |
| src/components/home/ServicesSection.tsx:251 | 1.5 |
| src/components/home/ServicesSection.tsx:254 | 1.5 |
| src/components/home/ServicesSection.tsx:255 | 3.5 |
| src/components/home/ServicesSection.tsx:256 | 1.5 |
| src/components/home/ServicesSection.tsx:259 | 1.5 |
| src/components/home/ServicesSection.tsx:260 | 3.5 |
| src/components/home/ServicesSection.tsx:261 | 1.5 |
| src/components/home/ServicesSection.tsx:264 | 1.5 |
| src/components/home/ServicesSection.tsx:265 | 3.5 |
| src/components/home/ServicesSection.tsx:266 | 1.5 |
| src/components/home/ServicesSection.tsx:269 | 1.5 |
| src/components/home/ServicesSection.tsx:270 | 1.5 |
| src/components/home/ServicesSection.tsx:271 | 3.5 |
| src/components/home/ServicesSection.tsx:274 | 1.5 |
| src/components/home/ServicesSection.tsx:275 | 1.5 |
| src/components/home/ServicesSection.tsx:276 | 3.5 |
| src/components/home/ServicesSection.tsx:279 | 3.5 |
| src/components/home/ServicesSection.tsx:280 | 3.5 |
| src/components/home/ServicesSection.tsx:464 | desktop.quotes.01 |
| src/components/home/ServicesSection.tsx:465 | desktop.quotes.02 |
| src/components/home/ServicesSection.tsx:466 | desktop.quotes.03 |
| src/components/home/ServicesSection.tsx:467 | desktop.quotes.04 |
| src/components/home/StatsSection.tsx:143 | value={500} |
| src/components/home/StatsSection.tsx:144 | value={3528} |
| src/components/home/StatsSection.tsx:145 | value={48} |
| src/components/home/StatsSection.tsx:146 | value={6} |
| src/components/home/TestimonialsSection.tsx:28 | proof.card1Service |
| src/components/home/TestimonialsSection.tsx:29 | proof.card1Quote |
| src/components/home/TestimonialsSection.tsx:30 | proof.card1Industry |
| src/components/home/TestimonialsSection.tsx:35 | proof.card2Service |
| src/components/home/TestimonialsSection.tsx:36 | proof.card2Quote |
| src/components/home/TestimonialsSection.tsx:37 | proof.card2Industry |
| src/components/home/TestimonialsSection.tsx:42 | proof.card3Service |
| src/components/home/TestimonialsSection.tsx:43 | proof.card3Quote |
| src/components/home/TestimonialsSection.tsx:44 | proof.card3Industry |
| src/components/home/TestimonialsSection.tsx:83 | 1,000+ |
| src/components/home/TestimonialsSection.tsx:94 | 98% |
| src/components/home/WhyUsConversionArea.tsx:112 | 1.2 |
| src/components/home/WhyUsConversionArea.tsx:118 | 1.2 |
| src/components/home/WhyUsConversionArea.tsx:124 | 1.2 |
| src/components/home/WhyUsConversionArea.tsx:130 | 0.8 |
| src/components/home/WhyUsConversionArea.tsx:131 | 0.6 |
| src/components/home/WhyUsSection.tsx:100 | headerInsightEyebrow1 |
| src/components/home/WhyUsSection.tsx:103 | headerInsightEyebrow2 |
| src/components/home/WhyUsSection.tsx:236 | step-1 |
| src/components/home/WhyUsSection.tsx:237 | evidence.step1.eyebrow |
| src/components/home/WhyUsSection.tsx:238 | evidence.step1.label |
| src/components/home/WhyUsSection.tsx:239 | evidence.step1.body |
| src/components/home/WhyUsSection.tsx:242 | step-2 |
| src/components/home/WhyUsSection.tsx:243 | evidence.step2.eyebrow |
| src/components/home/WhyUsSection.tsx:244 | evidence.step2.label |
| src/components/home/WhyUsSection.tsx:245 | evidence.step2.body |
| src/components/home/WhyUsSection.tsx:248 | step-3 |
| src/components/home/WhyUsSection.tsx:249 | evidence.step3.eyebrow |
| src/components/home/WhyUsSection.tsx:250 | evidence.step3.label |
| src/components/home/WhyUsSection.tsx:251 | evidence.step3.body |
| src/components/industries/ComparisonTable.tsx:82 | Strategic Analysis Verified • 2026 Standards |
| src/components/industries/IndustriesDesktopExperience.tsx:103 | 1031 exchanges · Depreciation · Entity strategy |
| src/components/industries/IndustriesDesktopExperience.tsx:285 | Intercambios 1031 · Depreciación · Estructura empresarial |
| src/components/industries/IndustryHero.tsx:134 | 85% |
| src/components/intake/ConstructionAssessmentForm.tsx:28 | Under $100K |
| src/components/intake/ConstructionAssessmentForm.tsx:28 | $100K-$500K |
| src/components/intake/ConstructionAssessmentForm.tsx:28 | $500K-$1M |
| src/components/intake/ConstructionAssessmentForm.tsx:28 | $1M-$3M |
| src/components/intake/ConstructionAssessmentForm.tsx:28 | $3M-$5M |
| src/components/intake/ConstructionAssessmentForm.tsx:28 | $5M+ |
| src/components/intake/ConstructionAssessmentForm.tsx:80 | $100K-$500K |
| src/components/intake/ConstructionAssessmentForm.tsx:81 | $500K-$1M |
| src/components/intake/ConstructionAssessmentForm.tsx:82 | $1M-$3M |
| src/components/intake/ConstructionAssessmentForm.tsx:82 | $3M-$5M |
| src/components/intake/ConstructionAssessmentForm.tsx:82 | $5M+ |
| src/components/intake/ConstructionAssessmentForm.tsx:139 | Under $100K |
| src/components/intake/ConstructionAssessmentForm.tsx:139 | $100K-$500K |
| src/components/intake/ConstructionAssessmentForm.tsx:175 | 1.0 |
| src/components/intake/ConstructionAssessmentForm.tsx:248 | Under $100K |
| src/components/intake/ConstructionAssessmentForm.tsx:248 | $100K-$500K |
| src/components/intake/ConstructionAssessmentForm.tsx:248 | $500K-$1M |
| src/components/intake/ConstructionAssessmentForm.tsx:248 | $1M-$3M |
| src/components/intake/ConstructionAssessmentForm.tsx:248 | $3M-$5M |
| src/components/intake/ConstructionAssessmentForm.tsx:248 | $5M+ |
| src/components/intake/ConstructionAssessmentForm.tsx:385 | (555) 000-0000 |
| src/components/intake/ConstructionResults.tsx:75 | Score / 80 |
| src/components/intake/RestaurantAssessmentResults.tsx:58 | Uncaptured FICA Tip Credits (Section 45B) — up to $10,000/yr |
| src/components/intake/RestaurantAssessmentResults.tsx:100 | Score / 28 |
| src/components/intake/RestaurantAssessmentResults.tsx:176 | Your assessment results suggest you may be leaving 15%–25% of your potential profit on the table through unchecked prime costs, labor overruns, and missed FICA tip credits. |
| src/components/intake/RestaurantAssessmentResults.tsx:182 | Capture Section 45B FICA Tip Credits |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:32 | Over 35% |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:32 | 30–35% |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:32 | Under 30% |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:33 | Over 12 months ago |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:33 | 6–12 months ago |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:33 | Within 6 months |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:34 | 1–2 weeks |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:37 | Under $100K |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:37 | $100K-$500K |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:37 | $500K-$1M |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:37 | $1M-$3M |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:37 | $3M-$5M |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:37 | $5M+ |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:55 | Are you capturing the FICA Tip Credit (Section 45B)? |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:99 | 30–35% |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:100 | Under 30% |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:103 | 6–12 months ago |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:104 | Within 6 months |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:105 | Over 12 months ago |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:108 | 1–2 weeks |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:160 | Under $100K |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:160 | $100K-$500K |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:200 | 1.0 |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:347 | Over 35% |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:347 | 30–35% |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:347 | Under 30% |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:377 | Over 12 months ago |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:377 | 6–12 months ago |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:377 | Within 6 months |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:409 | 1–2 weeks |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:505 | Under $100K |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:505 | $100K-$500K |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:505 | $500K-$1M |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:505 | $1M-$3M |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:505 | $3M-$5M |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:505 | $5M+ |
| src/components/intake/RestaurantProfitLeakAssessment.tsx:591 | (555) 000-0000 |
| src/components/intake/StrategyIntakeForm.tsx:43 | $0-$100k |
| src/components/intake/StrategyIntakeForm.tsx:43 | $100k-$500k |
| src/components/intake/StrategyIntakeForm.tsx:43 | $500k-$1M |
| src/components/intake/StrategyIntakeForm.tsx:43 | $1M-$3M |
| src/components/intake/StrategyIntakeForm.tsx:43 | $3M-$5M |
| src/components/intake/StrategyIntakeForm.tsx:43 | $5M+ |
| src/components/intake/StrategyIntakeForm.tsx:56 | 1-3 Months |
| src/components/intake/StrategyIntakeForm.tsx:151 | 1.0 |
| src/components/intake/StrategyIntakeForm.tsx:272 | (555) 000-0000 |
| src/components/intake/StrategyIntakeForm.tsx:328 | $0-$100k |
| src/components/intake/StrategyIntakeForm.tsx:328 | $100k-$500k |
| src/components/intake/StrategyIntakeForm.tsx:328 | $500k-$1M |
| src/components/intake/StrategyIntakeForm.tsx:328 | $1M-$3M |
| src/components/intake/StrategyIntakeForm.tsx:328 | $3M-$5M |
| src/components/intake/StrategyIntakeForm.tsx:328 | $5M+ |
| src/components/intake/StrategyIntakeForm.tsx:477 | 1-3 Months |
| src/components/layout/FooterDisclaimerModal.tsx:45 | a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]) |
| src/components/layout/navigationData.ts:104 | Building2 |
| src/components/layout/navigationData.ts:125 | Building2 |
| src/components/layout/navigationData.ts:126 | Portfolio tax shields & 1031 oversight |
| src/components/pricing/IncludedFeatures.tsx:10 | 3-Year Audit Protection |
| src/components/pricing/OptionalServices.tsx:34 | BarChart3 |
| src/components/pricing/OptionalServices.tsx:35 | Building2 |
| src/components/pricing/OptionalServicesTable.tsx:9 | $750 – $1,500 / year |
| src/components/pricing/OptionalServicesTable.tsx:13 | $650+ |
| src/components/pricing/OptionalServicesTable.tsx:17 | $350 – $1,200 |
| src/components/pricing/OptionalServicesTable.tsx:21 | $200+ per state |
| src/components/pricing/OptionalServicesTable.tsx:25 | $250 |
| src/components/pricing/PricingTrustSection.tsx:25 | 3-Year Audit Protection |
| src/components/pricing/TaxPrepGrid.tsx:111 | 3-Year Audit Protection |
| src/components/pricing/TaxPrepPricingTables.tsx:11 | W-2 / 1099 Filers |
| src/components/pricing/TaxPrepPricingTables.tsx:12 | Federal + 1 state • E-file • Secure portal • EA review • Audit protection |
| src/components/pricing/TaxPrepPricingTables.tsx:13 | $595+ |
| src/components/pricing/TaxPrepPricingTables.tsx:19 | $795+ |
| src/components/pricing/TaxPrepPricingTables.tsx:24 | Everything above + Schedule C (1 business) or Schedule E (up to 2 rentals), depreciation review |
| src/components/pricing/TaxPrepPricingTables.tsx:25 | $995+ |
| src/components/pricing/TaxPrepPricingTables.tsx:32 | Under $1M revenue |
| src/components/pricing/TaxPrepPricingTables.tsx:33 | 1120-S / 1065 / Complex LLC • K-1s • Compliance review • EA audit protection |
| src/components/pricing/TaxPrepPricingTables.tsx:34 | $1,800 |
| src/components/pricing/TaxPrepPricingTables.tsx:38 | $1M–$3M revenue |
| src/components/pricing/TaxPrepPricingTables.tsx:40 | $2,800 |
| src/components/pricing/TaxPrepPricingTables.tsx:44 | $3M+ revenue |
| src/components/pricing/TaxPrepPricingTables.tsx:46 | $3,800+ |
| src/components/pricing/TaxPrepPricingTables.tsx:58 | 2026 Tax Preparation Pricing |
| src/components/pricing/TaxPrepPricingTables.tsx:63 | 3-Year Audit Protection Included |
| src/components/resources/calculators/CalculatorInputGroup.tsx:67 | 0% |
| src/components/resources/calculators/CalculatorInputGroup.tsx:68 | 100% |
| src/components/resources/calculators/CalculatorResultPanel.tsx:62 | Includes Self-Employment Tax (15.3%) and estimated State/Federal Income Tax. |
| src/components/resources/calculators/CalculatorResultPanel.tsx:80 | of your job profit to taxes. A strategic S-Corp election or specialized deductions could save you over $10,000 annually. |
| src/components/resources/InteractiveToolsList.tsx:20 | Get a comprehensive analysis of your tax strategy in under 2 minutes. |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:18 | Under $50,000 |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:19 | $50,000 - $80,000 |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:20 | $80,000 - $150,000 |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:21 | $150,000 - $300,000 |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:22 | Over $300,000 |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:30 | Under $5,000 |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:31 | $5,000 - $12,000 |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:32 | $12,000 - $25,000 |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:33 | Over $25,000 |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:41 | A small amount ($0-20k) |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:42 | Yes, significant ($20k-50k) |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:43 | Very significant (over $50k) |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:68 | Save $8,000-$20,000+ Annually |
| src/components/resources/lead-magnets/SCorpAdvantageGuide.tsx:69 | Reduce SE Tax by 50% |
| src/components/resources/lead-magnets/SCorpElectionChecklist.tsx:16 | Does your business have fewer than 100 shareholders? |
| src/components/resources/lead-magnets/SCorpElectionChecklist.tsx:17 | S-Corps are limited to 100 or fewer shareholders. |
| src/components/resources/lead-magnets/SCorpElectionChecklist.tsx:44 | Do you have $80,000+ in annual business income? |
| src/components/resources/lead-magnets/SCorpElectionChecklist.tsx:59 | S-Corps have more paperwork: Form 1120-S, payroll tax filings, state requirements. |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:20 | Under $50,000 |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:20 | under50k |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:21 | $50,000 - $150,000 |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:21 | 50k-150k |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:22 | $150,000 - $500,000 |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:22 | 150k-500k |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:23 | $500,000 - $1M |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:23 | 500k-1m |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:24 | Over $1M |
| src/components/resources/lead-magnets/TaxHealthScore.tsx:24 | over1m |
| src/components/resources/resourceCatalog.ts:27 | llc-vs-s-corp-vs-c-corp-real-tax-impact-2026 |
| src/components/resources/resourceCatalog.ts:27 | how-to-handle-an-irs-notice-before-you-panic-2026 |
| src/components/resources/resourceCatalog.ts:27 | small-business-tax-planning-strategies-to-save-money-in-2026 |
| src/components/resources/resourceCatalog.ts:28 | myth-vs-reality-7-common-tax-deductions-trigger-audits |
| src/components/resources/resourceCatalog.ts:28 | tax-deadlines-2026-important-dates-every-small-business-owner-must-know |
| src/components/resources/resourceCatalog.ts:28 | construction-tax-strategy-general-contractors-2026 |
| src/components/resources/resourceCatalog.ts:28 | solo-401k-building-wealth-reducing-tax-bill |
| src/components/resources/resourceCatalog.ts:28 | the-2026-restaurant-survival-guide-how-to-protect-your-margins-when-everything-costs-more |
| src/components/resources/resourceCatalog.ts:67 | s-corp-reasonable-compensation-audit-trap-2026 |
| src/components/resources/resourceCatalog.ts:69 | s-corp-reasonable-compensation-audit-trap-2026 |
| src/components/resources/resourceCatalog.ts:70 | cfo-tool-stack-growing-business-2026 |
| src/components/resources/resourceCatalog.ts:70 | why-your-bookkeeper-might-be-costing-you-more-2026 |
| src/components/resources/resourceCatalog.ts:71 | financial-blueprint-high-income-freelancers-6-figures-7-figures |
| src/components/resources/resourceCatalog.ts:71 | cfo-tool-stack-growing-business-2026 |
| src/components/resources/ResourceGrid.tsx:225 | Never miss a deduction again — print and keep this in your truck. Hand-vetted for 2025/2026. |
| src/components/resources/ResourceGrid.tsx:368 | 5-Min Assessment |
| src/components/resources/ResourceGrid.tsx:403 | 8-Min Assessment |
| src/components/resources/ResourcesDesktopExperience.tsx:12 | focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900 |
| src/components/resources/ResourcesDesktopExperience.tsx:53 | Se cargó 1 recurso adicional. |
| src/components/scorp/AuthorityBadge.tsx:8 | 20+ Years |
| src/components/scorp/BeforeAfterTable.tsx:17 | Salary (W-2) |
| src/components/scorp/BeforeAfterTable.tsx:17 | $0 |
| src/components/scorp/BeforeAfterTable.tsx:18 | $0 |
| src/components/scorp/BeforeAfterTable.tsx:20 | $0 |
| src/components/scorp/EstimatorPageClient.tsx:35 | 1.0 |
| src/components/scorp/EstimatorResultsClient.tsx:63 | Based on your current profit level, a formal S-Corp election may not generate enough savings to offset the added compliance costs yet. But there are other strategies we can explore. Book a free 30-minute discovery call to find out where you stand. |
| src/components/scorp/SavingsEstimatorForm.tsx:16 | 50K_100K |
| src/components/scorp/SavingsEstimatorForm.tsx:16 | 100K_250K |
| src/components/scorp/SavingsEstimatorForm.tsx:16 | 250K_500K |
| src/components/scorp/SavingsEstimatorForm.tsx:16 | 500K_1M |
| src/components/scorp/SavingsEstimatorForm.tsx:36 | 100K_250K |
| src/components/scorp/SavingsEstimatorForm.tsx:53 | Under $50K |
| src/components/scorp/SavingsEstimatorForm.tsx:54 | $50K - $100K |
| src/components/scorp/SavingsEstimatorForm.tsx:54 | 50K_100K |
| src/components/scorp/SavingsEstimatorForm.tsx:55 | $100K - $250K |
| src/components/scorp/SavingsEstimatorForm.tsx:55 | 100K_250K |
| src/components/scorp/SavingsEstimatorForm.tsx:56 | $250K - $500K |
| src/components/scorp/SavingsEstimatorForm.tsx:56 | 250K_500K |
| src/components/scorp/SavingsEstimatorForm.tsx:57 | $500K - $1M |
| src/components/scorp/SavingsEstimatorForm.tsx:57 | 500K_1M |
| src/components/scorp/SavingsEstimatorForm.tsx:58 | Over $1M |
| src/components/scorp/SavingsEstimatorForm.tsx:131 | of 4 |
| src/components/scorp/ScorpEstimatorStepContact.tsx:52 | (555) 000-0000 |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:54 | Under $100K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:55 | 100K_250K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:55 | $100K – $250K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:56 | 250K_500K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:56 | $250K – $500K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:57 | 500K_1M |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:57 | $500K – $1M |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:58 | 1M_5M |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:58 | $1M – $5M |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:59 | 5M_PLUS |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:59 | $5M+ |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:63 | Under $50K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:64 | 50K_100K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:64 | $50K – $100K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:65 | 100K_150K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:65 | $100K – $150K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:66 | 150K_250K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:66 | $150K – $250K |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:67 | 250K_PLUS |
| src/components/scorp/ScorpEstimatorStepFinancials.tsx:67 | $250K+ |
| src/components/seo/GhlExternalTracking.tsx:5 | tk_34d847b194af40c086c4125cb0852173 |
| src/components/seo/JsonLd.tsx:137 | \u003c |
| src/components/seo/LocalBusinessSchema.tsx:10 | 2950 E Harmony Rd |
| src/components/seo/LocalBusinessSchema.tsx:22 | +18015550123 |
| src/components/seo/LocalBusinessSchema.tsx:34 | 09:00 |
| src/components/seo/LocalBusinessSchema.tsx:35 | 17:00 |
| src/components/services/BookkeepingStickyCard.tsx:11 | Growth-stage businesses with $250K+ revenue. |
| src/components/services/BookkeepingStickyCard.tsx:56 | 3 days |
| src/components/services/BookkeepingStickyCard.tsx:56 | to close the books for our featured $1.2M contractor result. |
| src/components/services/CmsServicePage.tsx:86 | \u003c |
| src/components/services/PartnerProgramCard.tsx:59 | from-emerald-400 to-emerald-600 |
| src/components/services/PartnerProgramCard.tsx:60 | shadow-emerald-500/20 |
| src/components/services/PartnerProgramCard.tsx:64 | hover:shadow-emerald-500/10 |
| src/components/services/PartnerProgramCard.tsx:75 | from-orange-400 to-orange-600 |
| src/components/services/PartnerProgramCard.tsx:76 | shadow-orange-500/20 |
| src/components/services/PartnerProgramCard.tsx:80 | hover:shadow-orange-500/10 |
| src/components/services/PartnerProgramsSection.tsx:143 | Stop bleeding cash on job costing & labor. The 'Hybrid CFO + COO' model for $1M-$10M contractors. |
| src/components/services/PartnerProgramsSection.tsx:158 | Stop profit leaks on food cost & labor. The 'Kitchen Command Center' system for $500K-$5M venues. |
| src/components/services/ServicesDesktopExperience.tsx:233 | 0 |
| src/components/services/ServiceSidebar.tsx:154 | Trusted by 500+ businesses |
| src/components/services/StrategyVideoSection.tsx:26 | video/mp4 |
| src/components/shop/CartSidebar.tsx:20 | 30-Min Tax Strategy Call with Jason |
| src/components/shop/CartSidebar.tsx:21 | price: 97 |
| src/components/shop/CartSidebar.tsx:28 | Apply the blueprint to your business. 30 minutes with Jason, focused on your numbers. |
| src/components/shop/CartSidebar.tsx:40 | 100% |
| src/components/shop/CartSidebar.tsx:52 | 100% |
| src/components/shop/CartSidebar.tsx:107 | button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"]) |
| src/components/shop/CartSidebar.tsx:374 | 038a9b49-ee53-4e6a-9897-e9fe51693396 |
| src/components/shop/CartSidebar.tsx:446 | $197 |
| src/components/shop/CartSidebar.tsx:448 | Save 50% |
| src/components/shop/LearningObjectives.tsx:26 | What You&#39;ll Learn |
| src/components/shop/ShopDesktopExperience.tsx:229 | 3m |
| src/components/shop/ShopDesktopExperience.tsx:367 | hero.proof.0.title |
| src/components/shop/ShopDesktopExperience.tsx:370 | hero.proof.0.detail |
| src/components/shop/ShopDesktopExperience.tsx:382 | hero.proof.1.title |
| src/components/shop/ShopDesktopExperience.tsx:385 | hero.proof.1.detail |
| src/components/shop/ShopDesktopExperience.tsx:554 | 3m |
| src/components/shop/TrustMetrics.tsx:17 | 500+ |
| src/components/tax-analysis/LandingHero.tsx:66 | 0.05 |
| src/components/tax-analysis/TaxAnalysisForm.tsx:69 | 1.0 |
| src/components/tax-analysis/TaxAnalysisForm.tsx:101 | 1 |
| src/components/tax-analysis/TaxAnalysisForm.tsx:107 | 2 |
| src/components/tax-analysis/TaxAnalysisForm.tsx:109 | 3–5 specific deduction categories identified. |
| src/components/tax-analysis/TaxAnalysisForm.tsx:142 | under_100k |
| src/components/tax-analysis/TaxAnalysisForm.tsx:142 | Under $100,000 |
| src/components/tax-analysis/TaxAnalysisForm.tsx:143 | 100k_500k |
| src/components/tax-analysis/TaxAnalysisForm.tsx:143 | $100,000 – $500,000 |
| src/components/tax-analysis/TaxAnalysisForm.tsx:144 | 500k_1m |
| src/components/tax-analysis/TaxAnalysisForm.tsx:144 | $500,000 – $1,000,000 |
| src/components/tax-analysis/TaxAnalysisForm.tsx:145 | 1m_3m |
| src/components/tax-analysis/TaxAnalysisForm.tsx:145 | $1,000,000 – $3,000,000 |
| src/components/tax-analysis/TaxAnalysisForm.tsx:146 | 3m_5m |
| src/components/tax-analysis/TaxAnalysisForm.tsx:146 | $3,000,000 – $5,000,000 |
| src/components/tax-analysis/TaxAnalysisForm.tsx:147 | 5m_plus |
| src/components/tax-analysis/TaxAnalysisForm.tsx:147 | $5,000,000+ |
| src/components/team/FounderSpotlight.tsx:74 | An EA is federally licensed by the U.S. Treasury with unlimited practice rights before the IRS in all 50 states. |
| src/components/ui/BottomSheet.tsx:81 | 100% |
| src/components/ui/BottomSheet.tsx:83 | 100% |
| src/components/ui/BottomSheet.tsx:178 | 100% |
| src/components/ui/BottomSheet.tsx:180 | 100% |
| src/components/ui/BusinessHealthAssessmentModal.tsx:43 | 0-100k |
| src/components/ui/BusinessHealthAssessmentModal.tsx:43 | $0 - $100K |
| src/components/ui/BusinessHealthAssessmentModal.tsx:44 | 100k-500k |
| src/components/ui/BusinessHealthAssessmentModal.tsx:44 | $100K - $500K |
| src/components/ui/BusinessHealthAssessmentModal.tsx:45 | 500k-1m |
| src/components/ui/BusinessHealthAssessmentModal.tsx:45 | $500K - $1M |
| src/components/ui/BusinessHealthAssessmentModal.tsx:46 | 1m-5m |
| src/components/ui/BusinessHealthAssessmentModal.tsx:46 | $1M - $5M |
| src/components/ui/BusinessHealthAssessmentModal.tsx:47 | 5m+ |
| src/components/ui/BusinessHealthAssessmentModal.tsx:47 | $5M+ |
| src/components/ui/BusinessHealthAssessmentModal.tsx:186 | Thank you for completing the assessment. Our team will review your business profile and contact you within 24 hours with personalized recommendations. |
| src/components/ui/BusinessHealthAssessmentModal.tsx:214 | Step 1 of 3 |
| src/components/ui/BusinessHealthAssessmentModal.tsx:266 | Step 2 of 3 |
| src/components/ui/ContactModal.tsx:35 | button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]) |
| src/components/ui/ContactModal.tsx:45 | button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]) |
| src/components/ui/MobileSidebar.tsx:60 | 100% |
| src/components/ui/MobileSidebar.tsx:72 | 100% |
| src/components/ui/MobileSidebar.tsx:175 | a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]) |
| src/components/ui/StickyBuyBar.tsx:77 | -50% |
| src/components/ui/StickyBuyBar.tsx:78 | -50% |
| src/components/ui/StickyBuyBar.tsx:79 | -50% |
| src/components/ui/TestimonialModal.tsx:73 | button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]) |
| src/components/ui/VideoEmbed.tsx:134 | This video file format is not supported in the browser. Upload an `mp4` or `webm` file to display it here. |
| src/components/ui/VideoPlayer.tsx:88 | 0:00 |
| src/components/ui/VideoPlayer.tsx:324 | 0.05 |
| src/components/ui/VideoPlayer.tsx:376 | Rewind 10 seconds |
| src/components/ui/VideoPlayer.tsx:383 | Forward 10 seconds |
| src/components/vsl/VSLClientResults.tsx:13 | $847 |
| src/components/vsl/VSLClientResults.tsx:14 | 78 |
| src/components/vsl/VSLClientResults.tsx:15 | 21 |
| src/components/vsl/VSLClientResults.tsx:16 | 12 |
| src/components/vsl/VSLFaq.tsx:17 | Results vary based on your financial situation, but our clients see an average 78% reduction in total liability. Many qualify for federal programs like Offer in Compromise that allow for settling for cents on the dollar. |
| src/components/vsl/VSLFaq.tsx:21 | We typically stop immediate IRS collections (levies/garnishments) within 21 days. The full negotiation and settlement process usually takes between 4 to 12 months depending on the complexity. |
| src/components/vsl/VSLFaq.tsx:25 | Absolutely. The Offer in Compromise and Currently Not Collectible programs are federally authorized. As IRS-authorized Enrolled Agents, we have a 97% acceptance rate on filed settlements. |
| src/components/vsl/VSLFaq.tsx:33 | The initial strategy call is 100% free with no obligation. We analyze your situation and tell you exactly what we can achieve for you before you commit to anything. |
| src/components/vsl/VSLFinalCta.tsx:24 | The first step is a 30-minute strategy call. We analyze your situation and tell you exactly what we can achieve. No pressure — just a plan. |
| src/components/vsl/VSLFinalCta.tsx:66 | 30-MINUTE CALL |
| src/components/vsl/VSLHowItWorks.tsx:24 | CheckCircle2 |
| src/components/vsl/VSLHowItWorks.tsx:63 | 0 |
| src/components/vsl/VSLMetricsBar.tsx:15 | $847M+ |
| src/components/vsl/VSLMetricsBar.tsx:16 | 12,400+ |
| src/components/vsl/VSLMetricsBar.tsx:17 | 97% |
| src/components/vsl/VSLMetricsBar.tsx:18 | 4.9★ |
| src/components/vsl/VSLProblemStatement.tsx:22 | The IRS can seize up to 90% of your paycheck with zero warning. |
| src/components/vsl/VSLProblemStatement.tsx:94 | $184,500 |
| src/components/vsl/VSLProblemStatement.tsx:98 | +$2,300/mo in compounding penalties |
| src/components/vsl/VSLProblemStatement.tsx:109 | $24,200 |
| src/components/vsl/VSLProblemStatement.tsx:112 | 87% Reduction · All Liens Removed |
| src/components/vsl/VSLResults.tsx:16 | 340% |
| src/components/vsl/VSLResults.tsx:17 | $2.1M |
| src/components/vsl/VSLResults.tsx:18 | 450+ |
| src/components/vsl/VSLResults.tsx:19 | 92% |
| src/components/vsl/VSLTestimonial.tsx:24 | I owed $210,000 to the IRS from my restaurant. Union National settled it for $18,400. I thought I'd lose everything — instead, I kept my business and my home. They're the real deal. |
| src/components/vsl/VSLTestimonial.tsx:27 | rating: 5 |
| src/components/vsl/VSLTestimonial.tsx:29 | $210,000 |
| src/components/vsl/VSLTestimonial.tsx:30 | $18,400 |
| src/components/vsl/VSLTrustBar.tsx:16 | 98% |
| src/app/hq/layout.tsx:23 | const originalError = console.error; console.error = (...args) => { if (typeof args[0] === 'string' && args[0].includes('disableTransition')) return; originalError.call(console, ...args); }; |
| src/app/scorp-advantage/page.tsx:30 | A structured 3-phase S-Corp evaluation and implementation program for profitable business owners. Entity Evaluation, Compensation Design, and Tax Savings Report. |
| src/app/scorp-advantage/page.tsx:47 | Self-employment tax is 15.3%. S-Corp distributions aren't subject to it. The difference can be $10,000-$30,000 per year. |
| src/app/scorp-advantage/page.tsx:67 | Reasonable compensation analysis (IRS 9-factor test) |
| src/app/scorp-advantage/page.tsx:70 | Retirement contribution strategy overlay (Solo 401k / SEP IRA) |
| src/app/scorp-advantage/page.tsx:80 | 5-year savings projection |
| src/app/scorp-advantage/page.tsx:85 | Tax Savings Report PDF (8-12 pages, branded) |
| src/app/scorp-advantage/page.tsx:92 | Phase 1 only - Qualification + Savings Projection |
| src/app/scorp-advantage/page.tsx:93 | Starting at $497 |
| src/app/scorp-advantage/page.tsx:97 | All 3 Phases - Full evaluation, compensation design, and Tax Savings Report |
| src/app/scorp-advantage/page.tsx:98 | Starting at $1,500 |
| src/app/scorp-advantage/page.tsx:103 | Full Program + Entity Formation, Form 2553 Filing, Payroll Setup |
| src/app/scorp-advantage/page.tsx:104 | Starting at $2,500 |
| src/app/scorp-advantage/page.tsx:109 | Starting at $3,500/yr |
| src/app/scorp-advantage/page.tsx:128 | For a business netting $80,000+, the savings routinely exceed the cost of the program in year one. The evaluation will tell you exactly where you stand - no guesswork. |
| src/app/scorp-advantage/page.tsx:133 | $17,595 |
| src/app/scorp-advantage/page.tsx:134 | $87,975 |
| src/app/scorp-advantage/page.tsx:135 | 15.3% |
| src/app/scorp-advantage/page.tsx:139 | 3 |
| src/app/scorp-advantage/page.tsx:140 | 8-12 pages |
| src/app/scorp-advantage/page.tsx:141 | $80K+ |
| src/app/scorp-advantage/page.tsx:142 | 10 min |
| src/app/scorp-advantage/page.tsx:187 | Find Out in 10 Minutes |
| src/app/scorp-advantage/page.tsx:190 | The S-Corp Advantage Program is a structured 3-phase evaluation and implementation process that helps profitable business owners reduce self-employment taxes, design their compensation correctly, and receive a written Tax Savings Report. |
| src/app/scorp-advantage/page.tsx:304 | The 3-Phase Program |
| src/app/scorp-advantage/page.tsx:325 | A concrete example: $17,595 kept in the business. |
| src/app/scorp-advantage/page.tsx:328 | Michael owns an HVAC company. His S-Corp nets $200,000 after expenses. With a reasonable salary of $85,000 and $115,000 in distributions, he saves $17,595 in payroll taxes. Legally. Every year. Over 5 years: $87,975 kept instead of paid to the IRS. |
| src/app/scorp-advantage/page.tsx:429 | Get your personalized S-Corp savings estimate in 10 minutes - or book your evaluation directly with Jason. |
| src/app/scorp-estimator/page.tsx:9 | Find out how much you could save with proper S-Corp structure. Get your personalized estimate in under 10 minutes. |
| src/app/[locale]/blog/[slug]/page.tsx:151 | Our partners save an average of $20K annually in self-employment taxes. See your potential savings in 60 seconds. |
| src/app/[locale]/book/page.tsx:67 | 0 |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:18 | 100K_500K |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:18 | 500K_1M |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:18 | 1M_3M |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:18 | 3M_5M |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:18 | 5M_PLUS |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:61 | 100K_500K |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:150 | (555) 123-4567 |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:192 | Under $100k |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:193 | 100K_500K |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:193 | $100k - $500k |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:194 | 500K_1M |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:194 | $500k - $1M |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:195 | 1M_3M |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:195 | $1M - $3M |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:196 | 3M_5M |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:196 | $3M - $5M |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:197 | 5M_PLUS |
| src/app/[locale]/construction/apply/ApplicationForm.tsx:197 | $5M+ |
| src/app/[locale]/construction/apply/page.tsx:29 | Step 2 of 3: Application |
| src/app/[locale]/construction/apply/page.tsx:61 | We accept 5 new construction partners per month. |
| src/app/[locale]/construction/booking/page.tsx:29 | Step 3 of 3: Booking |
| src/app/[locale]/construction/booking/page.tsx:66 | 2 more partners |
| src/app/[locale]/construction/booking/page.tsx:89 | Complimentary 5-Day Luxury Stay |
| src/app/[locale]/construction/downsell/page.tsx:59 | $497 |
| src/app/[locale]/construction/downsell/page.tsx:89 | When you hit $1M in revenue, come back and we&apos;ll upgrade you to the CFO package. |
| src/app/[locale]/construction/profit-blueprint/page.tsx:53 | 038a9b49-ee53-4e6a-9897-e9fe51693396 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:60 | price: 27 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:89 | price: 79 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:93 | prod_UNRJ66222da3Bv |
| src/app/[locale]/construction/profit-blueprint/page.tsx:105 | price: 39 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:109 | prod_U0I59FqHVgmIKe |
| src/app/[locale]/construction/profit-blueprint/page.tsx:121 | price: 27 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:125 | prod_UNAGtZ3NgI4Aue |
| src/app/[locale]/construction/profit-blueprint/page.tsx:137 | price: 27 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:141 | prod_U0I8eAAAHeCBBA |
| src/app/[locale]/construction/profit-blueprint/page.tsx:155 | price: 27 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:169 | 30-Min Tax Strategy Call with Jason |
| src/app/[locale]/construction/profit-blueprint/page.tsx:170 | Llamada de Estrategia Fiscal de 30 Minutos con Jason |
| src/app/[locale]/construction/profit-blueprint/page.tsx:172 | price: 97 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:175 | Apply the blueprint to your business. 30 minutes with Jason, focused on your numbers. |
| src/app/[locale]/construction/profit-blueprint/page.tsx:176 | Aplique el plan a su negocio. 30 minutos con Jason, enfocados en sus números. |
| src/app/[locale]/construction/profit-blueprint/page.tsx:291 | benefits.0 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:292 | benefits.1 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:293 | benefits.2 |
| src/app/[locale]/construction/profit-blueprint/page.tsx:380 | Después de obtener el plan, realice la Evaluación de Rentabilidad de la Construcción: un diagnóstico de 6 preguntas que identifica exactamente dónde su empresa está perdiendo el control. |
| src/app/[locale]/construction/profit-blueprint/page.tsx:381 | After you get the blueprint, take the Construction Profitability Assessment — a 6-question diagnostic that identifies exactly where your business is losing control. |
| src/app/[locale]/construction/profitability-assessment/page.tsx:35 | This 6-section diagnostic identifies gaps in job costing, estimating, cash flow, margin visibility, and project financial control. Answer honestly — there are no wrong answers. |
| src/app/[locale]/construction-profitability-assessment/page.tsx:40 | Answer 6 high-impact questions about your current business operations, revenue, and job costing methods. |
| src/app/[locale]/construction-profitability-assessment/page.tsx:134 | You&apos;re doing $500k+ in revenue but your bank balance doesn&apos;t reflect it. |
| src/app/[locale]/construction-profitability-assessment/page.tsx:174 | Learn how to calculate and maintain a 20%+ net margin across every single job. |
| src/app/[locale]/construction-profitability-assessment/page.tsx:204 | It takes less than 3 minutes. The questions are designed to be answered from your current knowledge of your business. |
| src/app/[locale]/construction-profitability-assessment/page.tsx:206 | No. The preliminary score and profit leak analysis are 100% free as part of our outreach to the construction industry. |
| src/app/[locale]/contact/actions.ts:74 | 1.0 |
| src/app/[locale]/contact/page.tsx:62 | $2.3B |
| src/app/[locale]/contact/page.tsx:63 | 2 hours |
| src/app/[locale]/fractional-cfo/FractionalCFOClient.tsx:29 | Most businesses reach out to us when they hit the $1M-$2M revenue mark. At this stage, complex issues like job costing, multi-state growth, and cash-flow management become too risky to handle based on &apos;gut feel&apos; alone. |
| src/app/[locale]/fractional-cfo/FractionalCFOClient.tsx:41 | Your time commitment is low. We spend 1-2 hours per month in strategic review meetings. Our team does the heavy lifting on the data modeling and system build-out in the background. |
| src/app/[locale]/fractional-cfo/FractionalCFOClient.tsx:49 | While we specialize in businesses generating $1M+, we work with earlier-stage, high-growth companies that need a solid financial foundation built early to avoid structural debt later. |
| src/app/[locale]/fractional-cfo/FractionalCFOClient.tsx:153 | of your next hire? Can you predict your cash position 90 days from now? |
| src/app/[locale]/fractional-cfo/FractionalCFOClient.tsx:323 | Growth-stage businesses doing $1M-$10M in annual revenue |
| src/app/[locale]/fractional-cfo/FractionalCFOClient.tsx:326 | Founders planning for a major expansion or exit in 2-3 years |
| src/app/[locale]/fractional-cfo/FractionalCFOClient.tsx:400 | 90-day rolling cash flow forecasting |
| src/app/[locale]/fractional-cfo/FractionalCFOClient.tsx:490 | Strategy Audit • 100% Confidential • Professional Grade |
| src/app/[locale]/health-check/page.tsx:13 | Get your Financial Health Score in 2 minutes. Discover if your business is thriving or needs attention with our free diagnostic tool. |
| src/app/[locale]/industries/construction/ConstructionIndustryClient.tsx:49 | We specialize in mid-sized commercial and residential firms generating between $1M and $10M in annual revenue who have outgrown their 'home-office' accounting setup. |
| src/app/[locale]/industries/construction/ConstructionIndustryClient.tsx:57 | Construction is a high-scrutiny industry. We provide 3-year audit protection and ensure every strategy—from equipment depreciation to sub-contractor classification—is documented and defensible. |
| src/app/[locale]/industries/construction/ConstructionIndustryClient.tsx:191 | on a job before it starts? Most firms find out they lost money 30 days after the project is done. |
| src/app/[locale]/industries/construction/ConstructionIndustryClient.tsx:345 | Commercial or residential firms doing $1M-$10M revenue |
| src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx:29 | We use automated tracking to monitor your economic nexus across all 50 states. Once you hit a threshold, we manage the registration, collection oversight, and filing so you don&apos;t get hit with massive back-tax penalties and interest. |
| src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx:49 | We typically recommend QuickBooks Online or Xero integrated with A2X or Link My Books for clean settlement data. If your current setup is messy, we manage the migration to a clean, automated digital-first stack. |
| src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx:56 | Explosive sales across 50 states create a massive &apos;silent&apos; liability for Sales Tax Nexus that triggers devastating audits if ignored. |
| src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx:59 | 50-State |
| src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx:96 | Proactive 50-State Guard |
| src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx:126 | 99.9% |
| src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx:127 | +12% |
| src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx:213 | 94% |
| src/app/[locale]/industries/real-estate/page.tsx:12 | Sophisticated tax strategy and financial leadership for real estate investors and developers. Unlock equity via cost segregation and 1031 exchanges. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:29 | Cost segregation allows you to accelerate depreciation on specific components of your property (like HVAC, flooring, or landscaping) over 5, 7, or 15 years instead of the standard 27.5 or 39 years. This creates massive immediate tax deductions that can offset your rental income or even other passive gains. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:33 | REPS allows you to treat rental losses as non-passive, meaning you can use them to offset your W-2 or active business income. This requires meeting strict IRS hour requirements (750+ hours and more than half of your professional time). We help you document and defend this status to maximize your tax shelter. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:36 | Can you help with 1031 exchange strategy? |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:37 | Absolutely. A 1031 exchange is a powerful wealth-building tool, but it has strict timelines (45/180 days). We provide the strategic oversight to ensure your exchange is executed perfectly, deferring capital gains tax indefinitely while you scale your portfolio. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:41 | Yes. Short-term rentals have a specific 'loophole' where they can sometimes be treated as non-passive even without REPS status if the average stay is 7 days or less. We specialize in optimizing these 'STR' strategies for high-earning professionals. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:56 | Most investors use standard 27.5-year depreciation, leaving hundreds of thousands in immediate tax benefits locked in the brick and mortar. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:59 | $240k+ |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:60 | Avg. Year 1 Deduction Found |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:65 | Improper documentation of Real Estate Professional Status is the #1 reason for IRS audits among high-net-worth investors. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:72 | Missing the 45-day identification window in a 1031 exchange can trigger massive immediate capital gains liabilities. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:97 | Straight-line (27.5y) |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:98 | 1031 Exchanges |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:129 | 3.5x |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:130 | $1.2M |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:131 | 100% |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:174 | Drastically increase cash flow in year 1 through accelerated depreciation schedules. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:175 | Utilize 1031 exchanges to trade up portfolios without capital gains erosion. |
| src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx:219 | 88% |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:31 | A standard accountant gives you a P&L 30 days after the month ends. A Hospitality CFO helps you manage Prime Costs (Labor + COGS) in real-time, ensuring you stay below the 60% threshold required for sustainable profitability. |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:35 | The Section 45B credit allows restaurant owners to get a dollar-for-dollar tax credit for the employer portion of FICA taxes paid on employee tips. Many generalist CPAs miss this or miscalculate it; we ensure it&apos;s fully maximized. |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:51 | The hospitality industry faces frequent sales tax and labor audits. We provide 3-year audit protection and ensure your tip-reporting and labor practices are fully compliant and defensible. |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:102 | In the restaurant business, 1% is the difference between profit and loss. We provide high-volume operators with the financial leadership required to protect their bottom line and scale with precision. |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:172 | Labor burden exceeding 30% with no productivity oversight |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:173 | Missing out on $10k+ in Section 45B FICA Tip Credits |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:251 | We maximize the Section 45B credit to recover thousands in taxes literally 'left on the table' by standard accountants. |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:292 | The restaurant business moves in seconds, not months. We provide the 24/7 financial dashboarding required to lead with numbers, not feelings. |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:300 | 24/7 Visibility |
| src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx:355 | We specialize in high-overhead, high-volume hospitality where 1% makes or breaks the year. |
| src/app/[locale]/intake/page.tsx:11 | Discover how much you could save with our 8-step Tax Strategy Assessment. Specialized for business owners and high-growth firms. |
| src/app/[locale]/not-found.tsx:8 | 404 |
| src/app/[locale]/proactive-cfo-assessment/page.tsx:41 | Answer 5 questions about your revenue, entity structure, tax planning, expense review, and deduction maximization. |
| src/app/[locale]/proactive-cfo-assessment/page.tsx:135 | You&apos;re doing $500k+ in revenue but your bank balance doesn&apos;t reflect it. |
| src/app/[locale]/proactive-cfo-assessment/page.tsx:205 | It takes less than 3 minutes. The questions are designed to be answered from your current knowledge of your business. |
| src/app/[locale]/proactive-cfo-assessment/page.tsx:207 | No. The preliminary score and analysis are 100% free as part of our outreach to business owners who want more control over their numbers. |
| src/app/[locale]/restaurants/apply/page.tsx:30 | Step 2 of 3: Application |
| src/app/[locale]/restaurants/apply/page.tsx:62 | We partner with 4 new restaurants per month. |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:18 | 100K_500K |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:18 | 500K_1M |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:18 | 1M_3M |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:18 | 3M_5M |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:18 | 5M_PLUS |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:61 | 100K_500K |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:150 | (555) 123-4567 |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:192 | Under $100k |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:193 | 100K_500K |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:193 | $100k - $500k |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:194 | 500K_1M |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:194 | $500k - $1M |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:195 | 1M_3M |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:195 | $1M - $3M |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:196 | 3M_5M |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:196 | $3M - $5M |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:197 | 5M_PLUS |
| src/app/[locale]/restaurants/apply/RestaurantApplicationForm.tsx:197 | $5M+ |
| src/app/[locale]/restaurants/booking/page.tsx:30 | Step 3 of 3: Booking |
| src/app/[locale]/restaurants/booking/page.tsx:67 | 2 more partners |
| src/app/[locale]/restaurants/booking/page.tsx:90 | Complimentary 5-Day Luxury Stay |
| src/app/[locale]/restaurants/downsell/page.tsx:61 | $497 |
| src/app/[locale]/restaurants/downsell/page.tsx:91 | When you hit $1M in revenue, come back and we'll upgrade you to the Kitchen Command Center package. |
| src/app/[locale]/restaurants/profit-leak-assessment/page.tsx:46 | Answer 7 high-impact questions about your restaurant operations, prime costs, and financial visibility. |
| src/app/[locale]/restaurants/profit-leak-assessment/page.tsx:88 | You&apos;re Making $2M in Revenue. |
| src/app/[locale]/restaurants/profit-leak-assessment/page.tsx:149 | You&apos;re doing $500K+ in annual revenue but cash flow feels unpredictable. |
| src/app/[locale]/restaurants/profit-leak-assessment/page.tsx:202 | Learn how to track and reduce combined food + labor cost as a percentage of revenue — the #1 metric for restaurant profitability. |
| src/app/[locale]/restaurants/profit-leak-assessment/page.tsx:207 | Many restaurants fail to capture Section 45B FICA Tip Credits — worth up to $10,000/year in federal tax savings for eligible operators. |
| src/app/[locale]/restaurants/profit-leak-assessment/page.tsx:244 | It takes less than 5 minutes. The questions are designed to be answered from your current knowledge of your restaurant operations — no spreadsheets required. |
| src/app/[locale]/restaurants/profit-leak-assessment/page.tsx:252 | No. The preliminary profit leak score and analysis are 100% free as part of our outreach to the restaurant industry. |
| src/app/[locale]/s-corp-tax-advantage/fallbackData.ts:15 | Does this only help with filing Form 2553? |
| src/app/[locale]/s-corp-tax-advantage/SCorpAdvantageClient.tsx:195 | $12,000+ |
| src/app/[locale]/s-corp-tax-advantage/SCorpAdvantageClient.tsx:200 | 75% |
| src/app/[locale]/strategic-bookkeeping/page.tsx:11 | Usually a fit if you're a contractor or service business at $250K+ revenue and the books are slowing down decisions or tax planning. |
| src/app/[locale]/strategic-bookkeeping/page.tsx:12 | $250K+ revenue |
| src/app/[locale]/strategic-bookkeeping/page.tsx:16 | Contractor, trades, or service business at $250K+ revenue |
| src/app/[locale]/strategic-bookkeeping/page.tsx:40 | Suele ser ideal si dirige un negocio de contratistas o servicios con ingresos de $250K o más y la contabilidad está retrasando decisiones o la planificación fiscal. |
| src/app/[locale]/strategic-bookkeeping/page.tsx:41 | $250K+ de ingresos |
| src/app/[locale]/strategic-bookkeeping/page.tsx:45 | Negocio de contratistas, oficios o servicios con ingresos de $250K o más |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:37 | Tax planning is most valuable for business owners generating over $150k-$200k in net income or those with complex entity structures. If your business is profitable, you are almost certainly a candidate for strategy. |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:41 | Now. The tax year is 365 days long. The best strategies are implemented in real-time as you make hiring, equipment, and investment decisions, not during the 'scramble' in March. |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:296 | +18-24% |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:324 | Profitable business owners doing $200k+ in net income |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:340 | If you are looking for the cheapest annual filing possible, or if you only have a W-2 and no business activity, you likely won&apos;t see the ROI from advanced tax planning. |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:362 | A continuous 365-day loop of optimization. |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:367 | Q1 |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:368 | Q2 |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:369 | Q3 |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:370 | Q4 |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:399 | Year-Round (365 Days) |
| src/app/[locale]/tax-planning/TaxPlanningClient.tsx:492 | Assessment • 100% Confidential • Advisor-Led |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:15 | Most Utah contractors leave $20,000–$80,000 in tax savings unclaimed every year. Get your free segmented Tax Savings Analysis — built for construction businesses. |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:30 | $20,000–$80,000 |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:46 | 1099 Subcontractors |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:53 | Section 179 and cost segregation for heavy machinery and shop investments. |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:58 | 199A QBI Optimization |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:59 | The 199A deduction can be worth $20,000–$45,000 annually if structured right. |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:89 | Takes about 90 seconds. We ask for your name, email, phone, business type, and revenue range. That's it. |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:99 | The analysis identifies 3–5 specific deductions your business type qualifies for, with approximate value ranges based on your revenue tier. |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:109 | Most analyses reveal $15,000–$80,000 in typically-unclaimed deductions depending on business structure and revenue. |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:113 | $500K – $1M |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:114 | $8,000–$25,000 |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:115 | 2–3 deductions typically applicable |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:118 | $1M – $3M |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:119 | $20,000–$50,000 |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:120 | 4–5 deductions + QBI optimization |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:123 | $3M+ |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:124 | $40,000–$80,000+ |
| src/app/[locale]/tax-savings-analysis/contractors/page.tsx:136 | Building2 |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:15 | Most Utah restaurant and hospitality owners leave $15,000–$60,000 in tax savings unclaimed every year. Get your free segmented Tax Savings Analysis — built for hospitality. |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:30 | $15,000–$60,000 |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:47 | The Section 45B credit allows you to claim a dollar-for-dollar credit for social security taxes paid on employee tips. |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:54 | Building2 |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:89 | Takes about 90 seconds. We ask for your location count, revenue range, and tip-volume to estimate credits. |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:99 | The analysis provides 3–5 specific action items to reclaim capital that is currently being lost to over-taxation. |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:113 | $500K – $1.5M Revenue |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:114 | $10,000–$25,000 |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:118 | $1.5M – $5M Revenue |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:119 | $25,000–$65,000 |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:120 | Cost seg + 45B credits + Structuring |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:123 | $5M+ Revenue |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:124 | $75,000–$150,000+ |
| src/app/[locale]/tax-savings-analysis/hospitality/page.tsx:136 | Building2 |
| src/app/[locale]/tax-savings-analysis/page.tsx:23 | Identify $20k–$80k in unclaimed deductions specific to job costing, equipment, and S-Corp optimization. |
| src/app/[locale]/tax-savings-analysis/page.tsx:39 | Strategic analysis for portfolio scaling, cost segregation, and 1031 exchange planning. |
| src/app/[locale]/tax-savings-analysis/page.tsx:59 | Receive your segmented PDF analysis via email within 24–48 business hours. |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:15 | Most Utah real estate investors leave $25,000–$100,000+ in tax savings unclaimed every year. Get your free segmented Tax Savings Analysis — built for real estate. |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:30 | $25,000–$100,000+ |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:47 | Accelerate $50,000–$200,000+ in deductions on a single rental property through component-level depreciation. |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:48 | Building2 |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:58 | 1031 Exchanges |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:89 | Takes about 90 seconds. We need your portfolio size and average holding period to estimate savings. |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:99 | The analysis identifies 3–5 high-impact strategies with step-by-step logic for implementation. |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:109 | Most analyses reveal $25,000–$100,000+ in typically-unclaimed deductions depending on portfolio size and structure. |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:113 | $500K – $1M Portfolio |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:114 | $12,000–$35,000 |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:115 | 2–3 deductions typically applicable |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:118 | $1M – $5M Portfolio |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:119 | $30,000–$75,000 |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:120 | 4–5 deductions + cost seg. review |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:123 | $5M+ Portfolio |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:124 | $60,000–$150,000+ |
| src/app/[locale]/tax-savings-analysis/real-estate/page.tsx:136 | Building2 |
| src/data/privacy-policy-content.ts:20 | 2026-03-10 |
| src/data/privacy-policy-content.ts:45 | Because we handle sensitive tax return information subject to Internal Revenue Code Section 6103, we maintain strict confidentiality protocols that exceed standard commercial privacy practices. Please read this policy carefully. |
| src/data/privacy-policy-content.ts:57 | 1. Information We Collect |
| src/data/privacy-policy-content.ts:114 | Tax Return Information: Information obtained from IRS Form 1040, 941, 940, state tax returns, and related schedules and attachments, all of which is subject to confidentiality protections under IRC Section 6103. |
| src/data/privacy-policy-content.ts:136 | 2. How We Use Your Information |
| src/data/privacy-policy-content.ts:157 | Preparing and filing federal and state tax returns (Form 1040, 941, 940, and related forms) |
| src/data/privacy-policy-content.ts:198 | list10 |
| src/data/privacy-policy-content.ts:210 | list11 |
| src/data/privacy-policy-content.ts:222 | list12 |
| src/data/privacy-policy-content.ts:239 | 3. Confidentiality of Tax Return Information (IRC Section 6103) |
| src/data/privacy-policy-content.ts:248 | Your tax return information obtained from the IRS or state tax authorities is confidential under Internal Revenue Code Section 6103. This means: |
| src/data/privacy-policy-content.ts:253 | list13 |
| src/data/privacy-policy-content.ts:265 | list14 |
| src/data/privacy-policy-content.ts:277 | list15 |
| src/data/privacy-policy-content.ts:289 | list16 |
| src/data/privacy-policy-content.ts:296 | As a firm practicing before the IRS, we are subject to IRS Circular 230 regulations, which impose additional obligations regarding client data confidentiality |
| src/data/privacy-policy-content.ts:306 | 4. Data Sharing & Disclosure |
| src/data/privacy-policy-content.ts:320 | h4a |
| src/data/privacy-policy-content.ts:337 | h4b |
| src/data/privacy-policy-content.ts:354 | list17 |
| src/data/privacy-policy-content.ts:366 | list18 |
| src/data/privacy-policy-content.ts:378 | list19 |
| src/data/privacy-policy-content.ts:390 | list20 |
| src/data/privacy-policy-content.ts:402 | list21 |
| src/data/privacy-policy-content.ts:430 | 5. SMS & Mobile Messaging |
| src/data/privacy-policy-content.ts:450 | SMS messages are sent in compliance with the Telephone Consumer Protection Act (TCPA) and CAN-SPAM regulations. You can opt out of SMS messages at any time by replying STOP to any message. Opt-out requests are processed within 24 hours. |
| src/data/privacy-policy-content.ts:455 | block10 |
| src/data/privacy-policy-content.ts:468 | h5b |
| src/data/privacy-policy-content.ts:471 | 6. Email Marketing & Communications |
| src/data/privacy-policy-content.ts:474 | block11 |
| src/data/privacy-policy-content.ts:480 | If we send marketing or promotional emails, each such email will: (a) clearly identify that it is a marketing communication; (b) include our physical postal address; (c) provide a clear opt-out mechanism; and (d) process opt-out requests within 10 business days. You may opt out of marketing emails at any time by clicking the unsubscribe link in any email or contacting us directly. |
| src/data/privacy-policy-content.ts:490 | 7. Data Retention Policy |
| src/data/privacy-policy-content.ts:493 | block12 |
| src/data/privacy-policy-content.ts:504 | list22 |
| src/data/privacy-policy-content.ts:511 | Tax Records and Returns: Minimum seven (7) years from the filing date, as required by IRS guidelines |
| src/data/privacy-policy-content.ts:516 | list23 |
| src/data/privacy-policy-content.ts:523 | Client Account Information: Duration of the client relationship plus seven (7) years |
| src/data/privacy-policy-content.ts:528 | list24 |
| src/data/privacy-policy-content.ts:535 | IRS Correspondence (OIC, Installment Agreements): Duration of the agreement plus seven (7) years |
| src/data/privacy-policy-content.ts:540 | list25 |
| src/data/privacy-policy-content.ts:547 | SMS and Communication Records: Five (5) years from the date of communication |
| src/data/privacy-policy-content.ts:552 | list26 |
| src/data/privacy-policy-content.ts:559 | Security Logs: Three (3) years from the date of log entry |
| src/data/privacy-policy-content.ts:564 | block13 |
| src/data/privacy-policy-content.ts:580 | 8. Security Measures |
| src/data/privacy-policy-content.ts:583 | block14 |
| src/data/privacy-policy-content.ts:594 | list27 |
| src/data/privacy-policy-content.ts:606 | list28 |
| src/data/privacy-policy-content.ts:618 | list29 |
| src/data/privacy-policy-content.ts:630 | list30 |
| src/data/privacy-policy-content.ts:642 | list31 |
| src/data/privacy-policy-content.ts:654 | list32 |
| src/data/privacy-policy-content.ts:671 | 9. Your Rights to Access, Correct, and Delete |
| src/data/privacy-policy-content.ts:674 | block15 |
| src/data/privacy-policy-content.ts:685 | list33 |
| src/data/privacy-policy-content.ts:692 | Access: Request a copy of all personal information we hold about you. We will provide this within 30 days of your request. |
| src/data/privacy-policy-content.ts:697 | list34 |
| src/data/privacy-policy-content.ts:704 | Correct: Request correction of any inaccurate personal information. We will process corrections within 15 business days. |
| src/data/privacy-policy-content.ts:709 | list35 |
| src/data/privacy-policy-content.ts:716 | Delete: Request deletion of your personal information, subject to legal retention requirements (see Section 7: Data Retention Policy). |
| src/data/privacy-policy-content.ts:721 | list36 |
| src/data/privacy-policy-content.ts:733 | block16 |
| src/data/privacy-policy-content.ts:749 | 10. California Consumer Rights (CCPA/CPRA) |
| src/data/privacy-policy-content.ts:752 | block17 |
| src/data/privacy-policy-content.ts:763 | list37 |
| src/data/privacy-policy-content.ts:770 | Right to Know: Request disclosure of: (1) categories of personal information collected; (2) specific pieces of personal information collected; (3) purposes for collection; (4) sources of information; (5) third parties with whom information is shared. |
| src/data/privacy-policy-content.ts:775 | list38 |
| src/data/privacy-policy-content.ts:782 | Right to Delete: Request deletion of your personal information, except where retention is required by law (including IRS record-keeping requirements for tax records for minimum 7 years). |
| src/data/privacy-policy-content.ts:787 | list39 |
| src/data/privacy-policy-content.ts:794 | Right to Correct: Request correction of inaccurate personal information. We will respond within 30 days. |
| src/data/privacy-policy-content.ts:799 | list40 |
| src/data/privacy-policy-content.ts:811 | list41 |
| src/data/privacy-policy-content.ts:823 | list42 |
| src/data/privacy-policy-content.ts:835 | block18 |
| src/data/privacy-policy-content.ts:841 | To submit a verifiable consumer request under CCPA, contact us at the email address provided in the 'Contact Us' section. We will verify your identity and respond within 45 days. |
| src/data/privacy-policy-content.ts:848 | h10 |
| src/data/privacy-policy-content.ts:851 | 11. EU/EEA Data Subject Rights (GDPR) |
| src/data/privacy-policy-content.ts:854 | block19 |
| src/data/privacy-policy-content.ts:865 | list43 |
| src/data/privacy-policy-content.ts:872 | Right of Access (Art. 15): Request a copy of your personal data and information about how it is processed. |
| src/data/privacy-policy-content.ts:877 | list44 |
| src/data/privacy-policy-content.ts:884 | Right to Rectification (Art. 16): Request correction of inaccurate personal data. |
| src/data/privacy-policy-content.ts:889 | list45 |
| src/data/privacy-policy-content.ts:896 | Right to Erasure (Art. 17): Request deletion of your personal data, subject to legal retention requirements for tax records (minimum 7 years under IRS regulations). |
| src/data/privacy-policy-content.ts:901 | list46 |
| src/data/privacy-policy-content.ts:908 | Right to Restriction of Processing (Art. 18): Request limitation of processing in certain circumstances. |
| src/data/privacy-policy-content.ts:913 | list47 |
| src/data/privacy-policy-content.ts:920 | Right to Data Portability (Art. 20): Receive your data in a structured, commonly used, machine-readable format. |
| src/data/privacy-policy-content.ts:925 | list48 |
| src/data/privacy-policy-content.ts:932 | Right to Object (Art. 21): Object to processing based on legitimate interests. |
| src/data/privacy-policy-content.ts:937 | list49 |
| src/data/privacy-policy-content.ts:949 | block20 |
| src/data/privacy-policy-content.ts:955 | We process personal data under one or more of the following legal bases under GDPR Article 6: (a) Consent — where you have given explicit consent; (b) Contract — processing necessary to perform a contract with you; (c) Legal Obligation — processing required to comply with applicable tax laws including IRS regulations and IRC 6103; (d) Legitimate Interests — processing for legitimate business purposes that do not override your rights. |
| src/data/privacy-policy-content.ts:960 | block21 |
| src/data/privacy-policy-content.ts:973 | h11 |
| src/data/privacy-policy-content.ts:976 | 12. Data Breach Notification Procedures |
| src/data/privacy-policy-content.ts:979 | block22 |
| src/data/privacy-policy-content.ts:990 | list50 |
| src/data/privacy-policy-content.ts:997 | Notification Timeline: Notify affected individuals within 60 days of discovering the breach, in accordance with applicable state and federal requirements. |
| src/data/privacy-policy-content.ts:1002 | list51 |
| src/data/privacy-policy-content.ts:1014 | list52 |
| src/data/privacy-policy-content.ts:1026 | list53 |
| src/data/privacy-policy-content.ts:1038 | block23 |
| src/data/privacy-policy-content.ts:1051 | h12 |
| src/data/privacy-policy-content.ts:1054 | 13. Children's Privacy |
| src/data/privacy-policy-content.ts:1057 | block24 |
| src/data/privacy-policy-content.ts:1063 | Our services are not directed to individuals under 18 years of age, and we do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected information from a child under 13, we will delete that information promptly. Parents or guardians who believe we may have collected information from a child under 13 should contact us immediately. |
| src/data/privacy-policy-content.ts:1070 | h13 |
| src/data/privacy-policy-content.ts:1073 | 14. Health Information |
| src/data/privacy-policy-content.ts:1076 | block25 |
| src/data/privacy-policy-content.ts:1082 | In the course of tax preparation and resolution services, we may encounter health-related information necessary for accurate tax filing (such as medical expense deductions, health insurance premiums, or HSA/FSA distributions). This information is treated with strict confidentiality and protected under our security measures described in Section 8. |
| src/data/privacy-policy-content.ts:1089 | h14 |
| src/data/privacy-policy-content.ts:1092 | 15. Changes to This Privacy Policy |
| src/data/privacy-policy-content.ts:1095 | block26 |
| src/data/privacy-policy-content.ts:1108 | h15 |
| src/data/privacy-policy-content.ts:1111 | 16. Contact Us |
| src/data/privacy-policy-content.ts:1114 | block27 |
| src/data/privacy-policy-content.ts:1120 | If you have questions about this Privacy Policy, wish to exercise any of your rights, or believe we may have collected information from a child under 13, please contact us: |
| src/data/privacy-policy-content.ts:1125 | block28 |
| src/data/privacy-policy-content.ts:1136 | block29 |
| src/lib/services/coreServiceCards.ts:33 | Building2 |
| src/sanity/schemaTypes/aboutPage.ts:26 | The only nationwide tax firm dedicated 100% to the construction industry. Combining aggressive S-Corp strategies with bulletproof IRS defense. |
| src/sanity/schemaTypes/aboutPage.ts:26 | La única firma fiscal a nivel nacional dedicada 100% a la industria de la construcción. Combinando estrategias agresivas de S-Corp con defensa inquebrantable ante el IRS. |
| src/sanity/schemaTypes/aboutPage.ts:40 | The tax code is 70,000 pages long. For most, it's a liability. For us, it's a blueprint. Our mission is to arm American contractors with the same high-level tax strategies used by Fortune 500 construction firms. |
| src/sanity/schemaTypes/aboutPage.ts:40 | El código fiscal tiene 70,000 páginas. Para la mayoría, es una carga. Para nosotros, es un plan. Nuestra misión es armar a los contratistas estadounidenses con las mismas estrategias fiscales de alto nivel que utilizan las empresas constructoras Fortune 500. |
| src/sanity/schemaTypes/aboutPage.ts:151 | 2018 |
| src/sanity/schemaTypes/aboutPage.ts:156 | 2020 |
| src/sanity/schemaTypes/aboutPage.ts:158 | Achieved Enrolled Agent status across all 50 states, allowing us to defend clients anywhere. |
| src/sanity/schemaTypes/aboutPage.ts:158 | Obtuvimos el estatus de Agente Inscrito en los 50 estados, lo que nos permite defender clientes en cualquier lugar. |
| src/sanity/schemaTypes/aboutPage.ts:161 | 2022 |
| src/sanity/schemaTypes/aboutPage.ts:162 | The $10M Milestone |
| src/sanity/schemaTypes/aboutPage.ts:162 | El Hito de los $10M |
| src/sanity/schemaTypes/aboutPage.ts:163 | Surpassed $10 Million in tax savings generated for our construction clients. |
| src/sanity/schemaTypes/aboutPage.ts:163 | Superamos los $10 millones en ahorros fiscales generados para nuestros clientes de construcción. |
| src/sanity/schemaTypes/aboutPage.ts:166 | 2024 |
| src/sanity/schemaTypes/aboutPage.ts:167 | Union National 2.0 |
| src/sanity/schemaTypes/aboutPage.ts:167 | Union National 2.0 |
| src/sanity/schemaTypes/aboutPage.ts:220 | Switch to a strategic partner who builds wealth. Get a free analysis of your last 2 tax returns. |
| src/sanity/schemaTypes/aboutPage.ts:220 | Cambie a un socio estratégico que construye riqueza. Obtenga un análisis gratuito de sus últimas 2 declaraciones de impuestos. |
| src/sanity/schemaTypes/blogPost.ts:122 | Agregue de 3 a 5 preguntas específicas respondidas en este artículo para calificar para fragmentos enriquecidos de preguntas frecuentes. |
| src/sanity/schemaTypes/caseStudy.ts:86 | ej. "$23,400 por año" o "38% de reducción total". |
| src/sanity/schemaTypes/caseStudy.ts:93 | ej. "Primeros 12 meses" o "Ahorros anuales continuos". |
| src/sanity/schemaTypes/contactSettings.ts:32 | Total Tax Savings (e.g., "$2.3B") |
| src/sanity/schemaTypes/homePage.ts:49 | Upload a video file (MP4, WebM, MOV) or asset for the hero background video. |
| src/sanity/schemaTypes/homePage.ts:65 | Upload a video file (MP4, WebM, MOV) for the homepage hero player. |
| src/sanity/schemaTypes/homePage.ts:110 | Value (e.g. $10M+) |
| src/sanity/schemaTypes/homePage.ts:202 | Licensed in All 50 States |
| src/sanity/schemaTypes/homePage.ts:202 | Autorizados en los 50 Estados |
| src/sanity/schemaTypes/homePage.ts:237 | Avoid the 'nexus trap'. We proactively manage your state-to-state tax triggers to eliminate double taxation across all 50 states. |
| src/sanity/schemaTypes/homePage.ts:237 | Evite la 'trampa del nexo'. Gestionamos proactivamente sus disparadores fiscales entre estados para eliminar la doble tributación en los 50 estados. |
| src/sanity/schemaTypes/homePage.ts:247 | Maximize local tax credits, construction tax breaks, and Section 199A mastery unique to each jurisdiction you build in. |
| src/sanity/schemaTypes/homePage.ts:247 | Maximice los créditos fiscales locales, los beneficios de construcción y el dominio de la Sección 199A únicos en cada jurisdicción donde construye. |
| src/sanity/schemaTypes/legalPage.ts:47 | circular-230 |
| src/sanity/schemaTypes/legalPage.ts:109 | Versión semántica de este documento legal (ej., "1.0", "2.1") |
| src/sanity/schemaTypes/legalPage.ts:115 | La versión debe ser una versión semántica válida (ej., "1.0" o "1.0.0") |
| src/sanity/schemaTypes/playbookChapter.ts:44 | URL de inserción de YouTube o Vimeo para el video "El Experto en 2 Minutos" |
| src/sanity/schemaTypes/pricingTier.ts:39 | Descripción breve de a quién está dirigido este plan (ej., "Declarantes W-2 / 1099") |
| src/sanity/schemaTypes/product.ts:65 | Optional. Upload an MP4 or similar file for the English-language product walkthrough. |
| src/sanity/schemaTypes/product.ts:72 | Optional. Upload an MP4 or similar file for the Spanish-language product walkthrough. |
| src/sanity/schemaTypes/product.ts:196 | Order Bump (1-Click Upsell in Cart) |
| src/sanity/schemaTypes/product.ts:254 | Rating (1-5) |
| src/sanity/schemaTypes/product.ts:288 | The 2x2 grid of what the reader will achieve. |
| src/sanity/schemaTypes/product.ts:340 | ISBN-13 for print editions. |
| src/sanity/schemaTypes/service.ts:35 | 2025-01-01 |
| src/sanity/schemaTypes/service.ts:36 | *[_id == $id][0]{size} |
| src/sanity/schemaTypes/service.ts:42 | Strategy video uploads must be 25MB or smaller. Upload the compressed media-pipeline version instead. |
| src/sanity/schemaTypes/service.ts:94 | Full H1 shown in the service-page hero. Keep each translation concise enough for two lines on mobile. |
| src/sanity/schemaTypes/service.ts:175 | Lucide icon name (e.g., 'Notebook', 'BarChart3'). |
| src/sanity/schemaTypes/service.ts:179 | BarChart3 |
| src/sanity/schemaTypes/service.ts:180 | Building2 |
| src/sanity/schemaTypes/service.ts:224 | Por ejemplo, 'Desde $500/mes' o 'Cotización personalizada' |
| src/sanity/schemaTypes/service.ts:246 | Controls this card's position in the homepage outcomes grid (1–6). |
| src/sanity/schemaTypes/service.ts:300 | For example: Week 1, Monthly, or Step 1. |
| src/sanity/schemaTypes/service.ts:432 | Legacy upload only. Use Strategy Video URL from the approved media pipeline for new video; direct uploads must be 25MB or smaller. |
| src/sanity/schemaTypes/service.ts:433 | video/mp4,video/webm |
| src/sanity/schemaTypes/service.ts:479 | 3-5 preguntas de alto volumen específicamente para el esquema FAQPage. Distintas de las preguntas frecuentes mostradas. |
| src/sanity/schemaTypes/servicePage.ts:89 | Upload an MP4 or WebM file for the hero player. |
| src/sanity/schemaTypes/servicePage.ts:90 | video/mp4,video/webm |
| src/sanity/schemaTypes/servicePage.ts:161 | Direct HTTPS URL for an MP4 or WebM video. |
| src/sanity/schemaTypes/servicesPage.ts:45 | Every engagement starts with a diagnostic. We'll examine your last 2 years of returns to tell you exactly where you're overpaying—before you sign a contract. |
| src/sanity/schemaTypes/shopSettings.ts:48 | URL directa a un archivo mp4 o stream HLS (ej. desde Mux o BunnyCDN). |
| src/sanity/schemaTypes/teamMember.ts:97 | Short biography for E-E-A-T authorship signals (160 chars recommended) |
| src/sanity/schemaTypes/teamPage.ts:108 | We are building the premier financial team for the construction industry. If you want to specialize, stop grinding through 1040s and start building wealth for clients. |
| src/sanity/schemaTypes/teamPage.ts:108 | Estamos construyendo el equipo financiero líder para la industria de la construcción. Si quiere especializarse, deje de luchar con 1040s y empiece a construir riqueza para clientes. |
| src/sanity/schemaTypes/teamPage.ts:118 | 100% Remote Context |
| src/sanity/schemaTypes/teamPage.ts:118 | Trabajo 100% Remoto |
| src/sanity/schemaTypes/testimonial.ts:67 | Rating (1-5) |
| src/sanity/schemaTypes/testimonial.ts:100 | ej. '$12,400' - poderosa métrica de prueba social. |
| src/sanity/schemaTypes/testimonial.ts:129 | ej. 'Ahorró $23k con elección de S-Corp'. Breve y fácil de leer. |
| src/sanity/schemaTypes/vslPage.ts:100 | CheckCircle2 |
| src/sanity/schemaTypes/vslPage.ts:190 | Upload MP4, WebM, or MOV video file |

## Public CMS numeric fields (1766 leaves)
| Source | Numeric content |
|---|---|
| product/038a9b49-ee53-4e6a-9897-e9fe51693396.editions.0.price | 59 |
| product/038a9b49-ee53-4e6a-9897-e9fe51693396.editions.1.price | 39 |
| product/038a9b49-ee53-4e6a-9897-e9fe51693396.editions.2.price | 27 |
| product/038a9b49-ee53-4e6a-9897-e9fe51693396.editions.3.price | 27 |
| product/038a9b49-ee53-4e6a-9897-e9fe51693396.features.1.en | Equipment depreciation and Section 179 strategy |
| product/038a9b49-ee53-4e6a-9897-e9fe51693396.learningObjectives.3.description.en | Properly classify subcontractors, issue 1099s, and protect your business from IRS penalties. |
| product/038a9b49-ee53-4e6a-9897-e9fe51693396.pageCount | 161 |
| product/038a9b49-ee53-4e6a-9897-e9fe51693396.price | 27 |
| product/038a9b49-ee53-4e6a-9897-e9fe51693396.rating | 5 |
| pricingTier/06d1c30a-ebf8-4df7-881a-b621ee7d34ea.price.en | $250 |
| pricingTier/102b8a5a-6711-4e7e-b0f3-1e87ed3938c0.bestFor.en | $3M+ revenue |
| pricingTier/102b8a5a-6711-4e7e-b0f3-1e87ed3938c0.price.en | $3,800+ |
| service/13c242a1-578f-4017-b269-a72526b7fed2.eligibility.en | Designed for business owners with employees or 1099 contractors who need reliable, compliant payroll processing. |
| service/13c242a1-578f-4017-b269-a72526b7fed2.eligibilityPros.1.en | Companies paying 1099 contractors |
| service/13c242a1-578f-4017-b269-a72526b7fed2.features.3.en | Quarterly payroll reports (Forms 941) |
| service/13c242a1-578f-4017-b269-a72526b7fed2.features.4.en | Annual payroll reporting (Forms W-2 and W-3) |
| service/13c242a1-578f-4017-b269-a72526b7fed2.features.5.en | Contractor payments and Form 1099 preparation |
| service/13c242a1-578f-4017-b269-a72526b7fed2.pageSections.pricing.headline.en | $250/mo and $15 per employee |
| service/13c242a1-578f-4017-b269-a72526b7fed2.roadmap.0.stepNumber | 01 |
| service/13c242a1-578f-4017-b269-a72526b7fed2.roadmap.1.stepNumber | 02 |
| service/13c242a1-578f-4017-b269-a72526b7fed2.roadmap.2.stepNumber | 03 |
| service/13c242a1-578f-4017-b269-a72526b7fed2.roadmap.3.stepNumber | 04 |
| service/13c242a1-578f-4017-b269-a72526b7fed2.startingPrice.en | $250/mo and $15 per employee |
| product/158d4dbe-a86c-4eaf-abe1-7d8574057cf0.features.0 | Focus on how market-based accounts like 401(k)s and IRAs expose savers to severe losses and volatility near retirement. |
| product/158d4dbe-a86c-4eaf-abe1-7d8574057cf0.fullDescription.0.children.0.text | The Retirement Crisis in America” explains why traditional retirement plans are failing many workers and leaving them dangerously exposed to market losses, taxes, inflation, and rising living costs. Drawing on real-world data and case studies, Jason Astwood shows how overreliance on 401(k)s and similar market-based accounts can wipe out decades of savings, then walks readers through strategies to reposition assets, reduce risk, and create predictable income that can last for life. The book also highlights how debt, poor tax planning, and underfunded government programs compound the problem, and it offers step-by-step, practical guidance for restructuring finances so retirees can maintain their lifestyle instead of running out of money. |
| product/158d4dbe-a86c-4eaf-abe1-7d8574057cf0.price | 29 |
| product/158d4dbe-a86c-4eaf-abe1-7d8574057cf0.rating | 5 |
| service/22c20065-7eca-47c3-94a3-d4a445d8f9e4.faq.3.answer.en | Your peace of mind is included. Every tax return we prepare comes with 3-Year Audit Protection. If you receive a notice or are selected for an audit, our experts will review the documentation and represent you at no additional cost. |
| service/22c20065-7eca-47c3-94a3-d4a445d8f9e4.features.0.en | Business (1120, 1120-S, 1065) & Personal (1040) Filing |
| service/22c20065-7eca-47c3-94a3-d4a445d8f9e4.features.2.en | Section 179 & Bonus Depreciation Optimization |
| service/22c20065-7eca-47c3-94a3-d4a445d8f9e4.fullDescription.en.1.children.1.text | We treat your tax return as a legal document that must be both aggressive and ironclad. Our team of specialists meticulously audits your data before filing to ensure 100% accuracy, optimal entity treatment, and maximum utilization of credits like the R&D credit and Section 179 depreciation. |
| service/22c20065-7eca-47c3-94a3-d4a445d8f9e4.pageSections.pricing.headline.en | From $595 |
| service/22c20065-7eca-47c3-94a3-d4a445d8f9e4.roadmap.0.duration.en | Step 1 |
| service/22c20065-7eca-47c3-94a3-d4a445d8f9e4.schema_faq.0.answer | Professional tax preparation includes the meticulous review of financial records, calculation of federal and state tax liabilities, identification of tax credits and deductions, preparation of all required forms (e.g., 1040, 1120-S), and electronic filing. |
| service/22c20065-7eca-47c3-94a3-d4a445d8f9e4.startingPrice.en | From $595 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.0.children.0.text | On July 4, 2025, the One Big Beautiful Bill Act (OBBBA) was signed into law — and buried inside it was a provision that every restaurant and QSR operator in America needs to fully understand before their next payroll run. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.1.children.1.text | employees in tipped occupations can now deduct up to $25,000 of qualified tip income from federal taxable income |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.1.children.2.text | , effective for tax years 2025 through 2028. For your staff, that's a meaningful tax break. For you as the employer, it creates a new set of compliance obligations — and a real risk of losing a credit worth thousands of dollars per year if you don't act now. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.4.style | h2 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.6.children.1.text | Employees in qualifying tipped occupations can deduct up to $25,000 of qualified tip income when filing their federal income tax return. This directly reduces their federal taxable income. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.7.children.1.text | Tips are still fully subject to FICA taxes (Social Security and Medicare — 7.65% employee, 7.65% employer). Employees still must report all tips to you as the employer. You still withhold FICA on those tips every payroll cycle. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.8.children.1.text | Only employees in occupations that "customarily and regularly" received tips on or before December 31, 2024 — servers, bartenders, bussers, valets, hairstylists, and others on the IRS Treasury Tipped Occupation list. Each qualifying occupation has been assigned a Treasury Tipped Occupation Code (TTOC). |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.9.children.1.text | The deduction phases out for employees with Modified Adjusted Gross Income (MAGI) above $150,000 for single filers. Tips above $25,000 remain fully taxable. Married employees must file jointly to claim the deduction. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.11.children.1.text | Tax years 2025 through 2028. This is a temporary provision — not permanent law. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.12.children.0.text | The W-2 Reporting Changes You Cannot Ignore |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.12.style | h2 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.13.children.0.text | Here is where most QSR operators are getting caught flat-footed. The OBBBA didn't just change tax treatment for employees — it changed what you are required to report on their W-2s starting with the 2026 tax year. If your payroll system isn't already updated, you are behind. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.14.children.0.text | Beginning with 2026 W-2s, employers must: |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.15.children.0.text | Report qualified tips in Box 12, Code TP. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.16.children.0.text | Report Treasury Tipped Occupation Codes (TTOC) in Box 14b. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.18.children.0.text | The IRS announced penalty relief for 2025 W-2s (filed in early 2026) while the proposed regulations were being finalized. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.18.children.1.text | That relief does not extend to 2026 W-2s. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.18.children.2.text | The new Box 12 Code TP and TTOC reporting requirements are mandatory for the 2026 tax year — filed in early 2027. Get your payroll and POS systems updated now, not next December. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.19.style | h2 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.20.children.1.text | FICA Tip Credit (Form 8846) |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.21.style | h3 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.22.children.2.text | that allows restaurant employers to recover 7.65% of the FICA taxes they pay on employee tips that exceed the federal minimum wage ($7.25/hour). Since tips are treated as wages for FICA purposes and you pay the employer's 7.65% share on all reported tip income, the IRS created this credit specifically to offset that cost — and to incentivize restaurants to encourage full tip reporting. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.24.children.0.text | FICA Tip Credit = 7.65% × (Total reported tips − Tips used to bring wages to $5.15/hour) |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.25.children.1.text | Form 8846 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.25.children.2.text | , which flows through to Form 3800 (General Business Credit) on your business tax return. Unused credit can be |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.25.children.3.text | carried back one year or forward 20 years |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.25.children.4.text | . For a mid-size QSR with $200,000 in annual reported tip income, this credit alone can be worth $10,000–$15,000 per year. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.26.style | h3 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.33.children.0.text | Each of these scenarios was a gray area before the OBBBA. In 2026, they are compliance failures with real financial consequences. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.34.children.0.text | The 5 Actions QSR Owners Must Take Right Now |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.34.style | h2 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.35.children.0.text | 1. Audit Your POS Tip Classification System |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.35.style | h3 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.36.children.0.text | Log into your POS system today and identify every payment type that currently flows into a "tip" category. Separate voluntary customer tips from automatic gratuities and mandatory service charges. These must be coded differently at the POS level, processed differently in payroll, and reported differently on W-2s. If your POS doesn't support this separation natively, contact your provider for a configuration update or workaround. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.37.children.0.text | 2. Update Your Payroll System for Box 12 Code TP and TTOC |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.37.style | h3 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.38.children.0.text | Contact your payroll provider — whether that's Gusto, ADP, Paychex, or a local processor — and confirm they are configured to report qualified tips in Box 12 Code TP and to accept Treasury Tipped Occupation Codes in Box 14b for the 2026 tax year. If they are not yet updated, escalate the issue in writing and document your request. You are legally responsible for correct W-2 reporting regardless of whether your payroll provider is ready. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.39.children.0.text | 3. Map Every Tipped Employee to a Treasury Occupation Code |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.39.style | h3 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.40.children.0.text | The IRS NPRM published in September 2025 includes the full list of qualifying occupations and their assigned Treasury Tipped Occupation Codes (TTOCs). Review your entire front-of-house roster — servers, bartenders, bussers, food runners, counter staff — and match each job title to the appropriate TTOC. Back-of-house employees who receive tips through tip pooling but whose occupation is not on the qualifying list do not generate qualified tips for Box 12 Code TP purposes. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.41.children.0.text | 4. Eliminate Automatic Gratuities on Customer Receipts — or Reclassify Them |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.41.style | h3 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.42.children.0.text | If you currently add automatic gratuities for large parties and route them through payroll as tips, you have two options: eliminate them entirely and allow customers to tip voluntarily, or keep them as mandatory service charges but ensure they are classified as regular wage income — not tips — in your payroll system and on W-2s. Reporting a mandatory service charge as a "qualified tip" is a misclassification that creates exposure on both your FICA Tip Credit and your employees' deductions. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.43.children.0.text | 5. Start Claiming the FICA Tip Credit If You Aren't Already |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.43.style | h3 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.44.children.0.text | If you have tipped employees and you are not filing Form 8846 with your business tax return, you are leaving a significant dollar-for-dollar credit unclaimed. Pull your reported tip income from the last three years, calculate the credit you should have claimed, and speak with your tax professional about filing amended returns to recover it. Going forward, ensure Form 8846 is part of your annual tax return preparation process — and that the credit is being calculated on properly classified voluntary tips only. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.45.children.0.text | A Quick-Reference: Tips vs. Service Charges in 2026 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.45.style | h2 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.56.children.0.text | No (up to $25,000 deduction) |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.62.children.0.text | Yes (if above $5.15/hr threshold) |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.64.children.0.text | W-2 reporting |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.65.children.0.text | Box 12 Code TP + TTOC in Box 14b |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.66.children.0.text | Box 1 wages — no special code |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.69.children.0.text | Auto-gratuity (18%), banquet service fees, delivery surcharges paid to staff |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.70.style | h2 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.71.children.0.text | The no-tax-on-tips rule is genuinely good news for your employees — and a powerful recruiting and retention tool at a time when labor competition in the QSR industry is fierce. But the employer-side compliance requirements that come with it are real, and the operators who ignore them face a double exposure: IRS penalties for incorrect W-2 reporting |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.72.children.2.text | , we specialize in tax compliance and financial strategy for restaurant and QSR operators. We'll audit your current tip reporting setup, map your employees to the correct Treasury occupation codes, ensure your FICA Tip Credit is being fully captured, and get your payroll aligned with the 2026 W-2 requirements before the deadline hits. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.73.children.2.marks.1 | f384cc327eaa |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.body.en.74.children.0.text | Sources: One Big Beautiful Bill Act (OBBBA), signed July 4, 2025; IRS Notice of Proposed Rulemaking on No Tax on Tips, September 2025; IRS Form 8846 Instructions 2026; Jackson Lewis OBBBA Employer Alert, January 2026; Netchex 2026 Payroll Compliance Guide. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.excerpt.en | The OBBBA's no-tax-on-tips provision gives your staff a $25,000 federal income tax deduction — but it changes your W-2 reporting, tip classification, and FICA Tip Credit calculation in ways that could cost you thousands if you're not ready. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.publishedAt | 2026-04-03T17:19:00.000Z |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.readingTime | 7 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.seo.keywords.0 | qualified tips W-2 Box 12 Code TP |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.seo.keywords.1 | tip compliance 2026 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.seo.keywords.3 | FICA tip credit 2026 |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.seo.keywords.4 | no tax on tips 2026 restaurant owners |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.seo.keywords.5 | Form 8846 restaurant |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.seo.metaDescription | The OBBBA no-tax-on-tips rule changes W-2 reporting and FICA Tip Credit rules for QSRs in 2026. Here's the compliance checklist restaurant owners need. |
| blogPost/24fd77f6-3e62-465f-ac97-a4247d6cc6f2.seo.metaTitle | No Tax on Tips 2026: What QSR Owners Must Do Now |
| product/25aef3d9-6147-44be-812a-451b655ffe92.buyLink | https://www.amazon.com/S-Corp-Playbook-Secret-Strategies-Business-ebook/dp/B0CQZ6DSS8 |
| product/25aef3d9-6147-44be-812a-451b655ffe92.editions.0.price | 59 |
| product/25aef3d9-6147-44be-812a-451b655ffe92.editions.1.price | 39 |
| product/25aef3d9-6147-44be-812a-451b655ffe92.editions.2.price | 29 |
| product/25aef3d9-6147-44be-812a-451b655ffe92.editions.3.price | 27 |
| product/25aef3d9-6147-44be-812a-451b655ffe92.price | 29 |
| product/25aef3d9-6147-44be-812a-451b655ffe92.rating | 5 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.0.children.0.text | Missing a tax deadline doesn't just cost you money — it can trigger penalties, interest, and unnecessary IRS scrutiny. In 2026, several key filing dates fall on slightly shifted days due to weekends and holidays, making it easy to assume you have more time than you do. This complete 2026 tax deadline calendar covers every critical date for small business owners, self-employed individuals, and entrepreneurs — so you can plan ahead, avoid penalties, and stay in full compliance all year long. |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.1.children.0.text | Why Deadlines Matter More Than Ever in 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.1.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.2.children.1.text | Failure to File penalty of 5% of unpaid taxes per month |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.2.children.2.text | , up to 25% of your total bill. Missing a |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.2.children.5.text | Failure to Pay penalty of 0.5% per month |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.3.children.0.text | January 2026 Deadlines |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.3.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.5.children.0.text | January 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.5.children.1.text | — Q4 2025 estimated tax payment due (final estimated payment for the 2025 tax year) |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.6.children.0.text | January 31 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.6.children.2.text | W-2s |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.6.children.4.text | 1099-NEC/1099-MISC |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.7.children.0.text | January 31 is one of the most overlooked deadlines of the year. |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.7.children.1.text | If you paid any contractor $600 or more in 2025, the 1099-NEC must be in their hands by this date — and filed with the IRS simultaneously.​ |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.8.children.0.text | February & March 2026 Deadlines |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.8.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.9.children.0.text | February 28 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.9.children.1.text | — Paper filing deadline for 1099s and W-2s to the IRS (if not e-filing)​ |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.10.children.0.text | March 16 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.10.children.2.text | S-Corporation (Form 1120-S) & Partnership/LLC (Form 1065) returns due |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.11.children.0.text | March 16 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.11.children.2.text | Form 7004 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.12.children.0.text | March 31 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.12.children.1.text | — E-file deadline to submit 1099-MISC and 1099-K to the IRS​ |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.13.children.2.text | March 15 falls on a Sunday in 2026, so the S-corp and partnership deadline shifts to |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.13.children.3.text | Monday, March 16 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.13.children.4.text | . Don't assume you have until the 17th.​ |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.14.children.0.text | If you need more time, filing Form 7004 by March 16 automatically extends your deadline to |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.14.children.1.text | September 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.15.children.0.text | April 2026 Deadlines |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.15.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.17.children.0.text | April 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.17.children.2.text | Individual income tax return (Form 1040) |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.18.children.0.text | April 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.18.children.2.text | C-Corporation return (Form 1120) |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.19.children.0.text | April 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.19.children.2.text | Q1 2026 estimated tax payment |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.19.children.3.text | due (Jan 1 – Mar 31 income) |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.20.children.0.text | April 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.20.children.2.text | Form 4868 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.20.children.4.text | Form 7004 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.21.children.0.text | April 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.21.children.3.text | for 2025 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.22.children.0.text | Filing an extension by April 15 gives individuals and C-corps until |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.22.children.1.text | October 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.22.children.2.text | to file — but again, any taxes owed are still due on April 15.​ |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.23.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.30.children.0.text | Form 1065 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.31.children.0.text | March 16, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.32.children.0.text | September 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.34.children.0.text | Form 1120-S |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.35.children.0.text | March 16, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.36.children.0.text | September 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.38.children.0.text | Form 1120 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.39.children.0.text | April 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.40.children.0.text | October 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.42.children.0.text | Schedule C (Form 1040) |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.43.children.0.text | April 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.44.children.0.text | October 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.45.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.46.children.0.text | If you're self-employed, a freelancer, or a business owner who expects to owe more than $1,000 in taxes this year, you're required to make quarterly estimated payments. Here are all four due dates for 2026: |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.50.children.0.text | Q1 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.51.children.0.text | January 1 – March 31 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.52.children.0.text | April 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.53.children.0.text | Q2 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.54.children.0.text | April 1 – May 31 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.55.children.0.text | June 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.56.children.0.text | Q3 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.57.children.0.text | June 1 – August 31 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.58.children.0.text | September 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.59.children.0.text | Q4 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.60.children.0.text | September 1 – December 31 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.61.children.0.text | January 15, 2027 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.62.children.1.text | 90% of your 2026 tax liability |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.62.children.3.text | 100% of your 2025 tax liability |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.63.children.0.text | June – September 2026 Deadlines |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.63.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.64.children.0.text | June 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.64.children.1.text | — Q2 2026 estimated tax payment due​ |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.65.children.0.text | June 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.66.children.0.text | September 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.66.children.1.text | — Q3 2026 estimated tax payment due​ |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.67.children.0.text | September 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.67.children.3.text | that filed Form 7004 in March​ |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.68.children.0.text | October 2026 Deadlines |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.68.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.69.children.0.text | October 15 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.69.children.2.text | individual returns (Form 1040) |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.69.children.4.text | C-corporation returns (Form 1120) |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.70.children.0.text | October 15 is the absolute last day to file for individuals and C-corps who requested an extension in April. There are no further extensions available after this date — any return filed after October 15 is considered late.​ |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.71.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.73.children.1.text | — Federal payroll taxes (FICA + withheld income tax) are generally due by the 15th of the following month for monthly depositors |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.74.children.0.text | Quarterly (Form 941) |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.74.children.1.text | — Employer's Quarterly Federal Tax Return is due April 30, July 31, October 31, and January 31 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.75.children.0.text | Annual (Form 940) |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.75.children.2.text | January 31, 2027 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.75.children.3.text | for the 2026 tax year |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.76.children.0.text | W-2 & 1099 distribution |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.76.children.2.text | January 31, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.76.children.3.text | (for 2025 payments); January 31, 2027 for 2026 payments |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.77.children.0.text | Your Complete 2026 Tax Deadline Snapshot |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.77.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.80.children.0.text | Jan 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.81.children.0.text | Q4 2025 estimated tax payment |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.82.children.0.text | Jan 31, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.83.children.0.text | W-2s & 1099-NECs to recipients |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.84.children.0.text | Feb 28, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.85.children.0.text | Paper 1099/W-2 filing with IRS |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.86.children.0.text | Mar 16, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.87.children.0.text | S-Corp (1120-S) & Partnership (1065) returns |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.88.children.0.text | Mar 16, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.89.children.0.text | Form 7004 extension for S-corps & partnerships |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.90.children.0.text | Mar 31, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.91.children.0.text | E-file deadline for 1099-MISC/1099-K |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.92.children.0.text | Apr 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.93.children.0.text | Individual (1040), C-Corp (1120) returns + Q1 estimated payment |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.94.children.0.text | Jun 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.95.children.0.text | Q2 estimated tax payment |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.96.children.0.text | Sep 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.97.children.0.text | Q3 estimated payment + extended S-corp/partnership returns |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.98.children.0.text | Oct 15, 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.100.children.0.text | Jan 15, 2027 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.101.children.0.text | Q4 2026 estimated tax payment |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.body.en.102.style | h2 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.excerpt.en | From S-corp filings on March 16 to quarterly estimated payments throughout the year, 2026 has critical tax deadlines that can't be missed. Here's the complete filing calendar for small business owners, freelancers, and entrepreneurs — with every IRS date in one place. |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.keywords.0 | tax deadlines 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.keywords.1 | 2026 estimated tax payment dates |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.keywords.2 | when are business taxes due 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.keywords.3 | tax extension deadline 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.keywords.4 | small business tax calendar 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.keywords.5 | IRS filing deadlines 2026 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.metaDescription | Don't miss a single 2026 tax deadline. From March 16 S-corp filings to April 15 individual returns, here's the complete small business tax calendar with key dates & penalties to avoid. |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.metaTitle | Tax Deadlines 2026: Important Dates Every Small Business Owner Must Know |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.publishedAt | 2026-03-16T14:58:00.000Z |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.readingTime | 5 |
| blogPost/2968b3cc-936b-4ada-b3d7-5382fee07018.title.en | Tax Deadlines 2026: Important Dates Every Small Business Owner Must Know |
| service/2f1ac481-3d6f-479c-975f-f6a7e9b355d6.eligibility.en | Strategic bookkeeping services are built for 7-figure contractors, real estate investors, and service businesses who have outgrown their basic data-entry clerk and need hyper-accurate, job-costed financial reports to protect their profit margins and facilitate aggressive growth. |
| service/2f1ac481-3d6f-479c-975f-f6a7e9b355d6.eligibilityPros.0.en | You're a contractor, trades business, or service company doing $500K+ per year |
| service/2f1ac481-3d6f-479c-975f-f6a7e9b355d6.roadmap.0.stepNumber | 01 |
| service/2f1ac481-3d6f-479c-975f-f6a7e9b355d6.roadmap.1.stepNumber | 02 |
| service/2f1ac481-3d6f-479c-975f-f6a7e9b355d6.roadmap.2.stepNumber | 03 |
| service/2f1ac481-3d6f-479c-975f-f6a7e9b355d6.roadmap.3.stepNumber | 04 |
| service/2f1ac481-3d6f-479c-975f-f6a7e9b355d6.schema_faq.0.question | Strategic bookkeeping services are built for 7-figure contractors, real estate investors, and service businesses who have outgrown their basic data-entry clerk and need hyper-accurate, job-costed financial reports to protect their profit margins and facilitate aggressive growth. |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.2.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.5.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.13.children.0.text | A solo freelancer with one 1099 may need very different support than an LLC with employees. The better you define your needs, the easier it is to find a preparer who matches your business model. |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.14.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.22.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.25.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.27.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.29.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.31.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.34.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.41.children.0.text | This is especially important if you are self-employed, operate an LLC, or have 1099 income. The IRS provides separate small business and self-employed guidance because those tax issues often differ from standard wage-earner returns. |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.42.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.53.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.67.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.69.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.71.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.73.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.75.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.77.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.79.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.88.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.98.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.111.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.120.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.124.style | h2 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.125.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.127.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.129.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.131.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.body.en.133.style | h3 |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.coverImage.alt | Blog post header for "UNT Accounting" titled "How to Choose a Tax Preparer for Your Small Business." The graphic features a deep green gradient background with subtle geometric line accents. Centered at the top is an icon of three professional figures in suits, with the middle figure highlighted by a glowing question mark and holding a clipboard and calculator. Below the title, white subtext describes a step-by-step guide for small business owners. A prominent pink "Read More →" button sits at the bottom, with a blue "How To" tag in the bottom-left corner and the date "March 2026" in the bottom-right. |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.featuredImage.alt | Blog post header for "UNT Accounting" titled "How to Choose a Tax Preparer for Your Small Business." The graphic features a deep green gradient background with subtle geometric line accents. Centered at the top is an icon of three professional figures in suits, with the middle figure highlighted by a glowing question mark and holding a clipboard and calculator. Below the title, white subtext describes a step-by-step guide for small business owners. A prominent pink "Read More →" button sits at the bottom, with a blue "How To" tag in the bottom-left corner and the date "March 2026" in the bottom-right. |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.publishedAt | 2026-03-23T14:57:00.000Z |
| blogPost/30b4bccc-ccbc-4fa8-a2e2-1fdea504384c.readingTime | 7 |
| testimonial/3380e871-a317-46ad-be27-d67ede36b45f.quote.en | Jason Astwood is very professional and has a lot of knowledge. I have been using his services for the past 3 years, and I definitely feel I’m in good hands. I highly recommend Jason and his team. |
| testimonial/3380e871-a317-46ad-be27-d67ede36b45f.rating | 5 |
| service/343d9342-3fac-4db2-9ac1-aeb71c34d021.eligibility.en | Fractional CFO services are designed for scaling businesses generating $1M to $20M+ in annual revenue, particularly in construction, hospitality, and digital economy sectors, that need high-level financial strategy without the $150k+ salary of a full-time executive. |
| service/343d9342-3fac-4db2-9ac1-aeb71c34d021.faq.1.answer.en | Typically, businesses crossing the $1M to $2M revenue mark begin to experience financial complexity that requires a CFO. If you have multiple departments, complex inventory, or are looking to raise capital, a fractional CFO is critical regardless of revenue. |
| service/343d9342-3fac-4db2-9ac1-aeb71c34d021.fullDescription.en.0.children.3.text | the future. As your business scales beyond $1M in revenue, the financial complexity multiplies. You can no longer rely on your gut, your bank balance, or rear-view-mirror accounting to make critical decisions. |
| service/343d9342-3fac-4db2-9ac1-aeb71c34d021.fullDescription.en.3.children.0.text | Growing businesses doing $1M - $20M+ in revenue. |
| service/343d9342-3fac-4db2-9ac1-aeb71c34d021.roadmap.0.duration.en | Step 1 |
| service/343d9342-3fac-4db2-9ac1-aeb71c34d021.roadmap.1.duration.en | Step 2 |
| service/343d9342-3fac-4db2-9ac1-aeb71c34d021.schema_faq.1.answer | A Fractional CFO typically costs between $2,000 and $7,000 per month depending on the complexity of the business, representing a fraction of the $150,000+ salary of a full-time Chief Financial Officer. |
| service/343d9342-3fac-4db2-9ac1-aeb71c34d021.schema_faq.2.answer | Businesses should hire a Fractional CFO when crossing the $1M revenue mark, experiencing rapid growth, struggling with cash flow visibility, or preparing for an acquisition, exit, or major capital raise. |
| vslPage/3c767d22-4ae1-4944-8030-6d3f358b87c8.benefitsList.1.en | Unpaid Tax Bills ($10k - $500k+) |
| vslPage/3c767d22-4ae1-4944-8030-6d3f358b87c8.resultsList.0.en | Average Debt Reduction: 40-60% |
| vslPage/3c767d22-4ae1-4944-8030-6d3f358b87c8.resultsList.1.en | Most Cases Resolved In 3-6 Months |
| vslPage/3c767d22-4ae1-4944-8030-6d3f358b87c8.testimonial.quote.en | Union National Tax settled my $120k IRS debt for just $15k. They literally saved my business and my sanity. |
| pricingTier/3d71aa08-d3cd-4b3e-8b67-ee12bdefc059.price.en | $795 |
| testimonial/448cc3f3-1a6b-4460-a811-d8babe815b72.rating | 5 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.0.children.0.text | If you're working as an independent contractor, freelancer, or self-employed professional in 2026, you're wearing two hats at tax time — employee |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.1.children.0.text | The problem? Most 1099 contractors only claim the obvious ones — and walk away overpaying by thousands of dollars every year. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.2.children.1.text | top 10 tax deductions for 1099 contractors in 2026 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.4.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.5.children.5.text | Schedule C (Form 1040) |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.6.children.0.text | 1. Home Office Deduction |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.6.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.13.children.2.text | ($5/sq ft, up to 300 sq ft) or the |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.14.children.0.text | 2. Vehicle & Mileage Expenses |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.14.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.15.children.1.text | 2026 tax year, the standard IRS mileage rate is 72.5 cents per mile |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.19.children.0.text | 3. Business Equipment & Section 179 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.19.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.20.children.3.text | Section 179 deduction |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.21.children.0.text | In 2026, the Section 179 deduction cap is approximately |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.21.children.1.text | $2.56 million |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.21.children.2.text | , with a phase-out beginning at around $4.09 million in total equipment purchases. For most independent contractors, that means you can write off your entire equipment purchase the year you buy it. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.21.children.3.text | Bonus depreciation for 2026 is 20% |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.21.children.4.text | of new or used equipment costs after applying Section 179. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.22.children.0.text | 4. Health Insurance Premiums |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.22.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.23.children.1.text | 100% of health, dental, and vision insurance premiums |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.23.children.2.text | paid for yourself, your spouse, and your dependents — directly on your Form 1040 as an above-the-line deduction. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.25.children.0.text | 5. Retirement Plan Contributions |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.25.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.26.children.0.text | Contributing to a retirement account doesn't just secure your future — it lowers your tax bill today. As a 1099 contractor, you have access to: |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.27.children.1.text | — Contribute up to 25% of net self-employment income (max ~$69,000 in 2026) |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.28.children.0.text | Solo 401(k) |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.31.children.0.text | 6. Phone & Internet Bills |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.31.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.32.children.0.text | Your cell phone and internet plan are partially or fully deductible if they're essential to your work. If you use your phone 70% for business, you deduct 70% of the bill. If your internet is used almost exclusively for work — common for remote contractors — you may be able to deduct the full amount. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.34.children.0.text | 7. 🚨 The Self-Employment Tax Deduction (Most People Miss This) |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.34.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.36.children.0.text | As a 1099 worker, you pay |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.36.children.1.text | self-employment tax at a rate of 15.3% |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.36.children.2.text | — that's 12.4% for Social Security and 2.9% for Medicare — on your net earnings. Unlike W-2 employees, you're covering both the employee |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.37.children.1.text | the IRS lets you deduct 50% of your self-employment tax |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.37.children.2.text | when calculating your Adjusted Gross Income. You claim this directly on Schedule 1 (Line 15) after completing Schedule SE — no itemizing required. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.38.children.1.text | If you paid $6,000 in self-employment tax this year, you can deduct $3,000 right off the top of your gross income. That's real money back in your pocket — and most contractors never claim it because they don't realize it exists. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.39.children.0.text | 8. Business Travel & Meals |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.39.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.40.children.0.text | Work-related travel expenses are deductible when the trip requires an overnight stay away from your regular tax home. Fully deductible 2026 travel expenses include: |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.44.children.1.text | 50% deductible |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.46.children.0.text | 9. Professional Services & Contracted Help |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.46.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.52.children.0.text | If you pay any individual contractor $600 or more in a calendar year, you're required to issue them a |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.52.children.1.text | Form 1099-NEC |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.53.children.0.text | 10. The 20% Qualified Business Income (QBI) Deduction |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.53.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.54.children.0.text | One of the most valuable deductions available in 2026: the |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.54.children.1.text | Section 199A QBI deduction |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.54.children.3.text | up to 20% of their qualified business income |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.55.children.0.text | For 2026, you qualify for the full 20% deduction if your taxable income is: |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.56.children.1.text | $203,000 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.57.children.1.text | $406,000 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.58.children.0.text | Above those thresholds, limitations may apply depending on your industry and W-2 wages paid. Most trade contractors, consultants, and freelancers fall well within the qualifying range. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.59.style | h2 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.61.children.2.text | , we specialize in helping 1099 contractors, freelancers, and self-employed professionals maximize every legal deduction. Whether it's your first year working independently or your tenth, we'll make sure you're not leaving money with the IRS that belongs in your pocket. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.62.children.2.marks.1 | fc125c3b76c4 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.body.en.63.children.0.text | Last updated: March 2026. Tax laws are subject to change. Always consult a licensed tax professional for advice specific to your situation. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.coverImage.alt | 1099 contractor reviewing tax deductions checklist at a desk in 2026 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.excerpt.en | Are you a 1099 contractor leaving money on the table? Discover the top 10 tax deductions for independent contractors in 2026 — including the write-off most people never claim. Cut your tax bill legally and keep more of what you earn. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.featuredImage.alt | 1099 contractor reviewing tax deductions checklist at a desk in 2026 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.publishedAt | 2026-03-27T17:12:00.000Z |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.readingTime | 5 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.seo.keywords.0 | 1099 tax deductions 2026 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.seo.keywords.1 | contractor taxes 2026 |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.seo.metaDescription | Discover the top 10 tax deductions every 1099 contractor should claim in 2026. Learn how to reduce your self-employment tax bill and keep more of what you earn. |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.seo.metaTitle | 1099 Tax Deductions 2026 \| Union National Tax |
| blogPost/497b5d33-a164-434d-be2f-802ad5530e0f.title.en | Top 10 Tax Deductions for 1099 Contractors in 2026 |
| legalPage/4eac1dac-02fa-43a9-bac9-211c33c7de5f.body.0.style | h3 |
| legalPage/4eac1dac-02fa-43a9-bac9-211c33c7de5f.body.5.children.0.text | IRS Circular 230 Disclosure |
| legalPage/4eac1dac-02fa-43a9-bac9-211c33c7de5f.lastUpdated | 2026-01-29T03:26:00.000Z |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.0.children.0.text | If you work as a 1099 contractor, freelancer, or self-employed professional, the IRS expects you to pay your taxes |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.0.children.2.text | the year — not just at April filing time. Miss those payments and you'll face underpayment penalties, even if you pay everything you owe by April 15. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.1.children.1.text | everything contractors need to know about quarterly estimated taxes in 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.3.style | h2 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.4.children.0.text | When you're a W-2 employee, your employer automatically withholds federal and state income taxes from every paycheck. As a 1099 contractor, no one does that for you — so the IRS requires you to estimate your tax liability and pay it in four installments throughout the year using |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.4.children.1.text | Form 1040-ES |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.5.children.1.text | at least $1,000 in federal taxes |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.5.children.4.text | your self-employment tax (15.3%), which means most active 1099 contractors hit this threshold quickly. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.6.children.0.text | 2026 Quarterly Due Dates |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.6.style | h2 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.7.children.0.text | The IRS divides the tax year into four uneven payment periods. Here are the exact deadlines for 2026: |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.11.children.0.text | Q1 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.12.children.0.text | Jan 1 – Mar 31, 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.13.children.0.text | April 15, 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.14.children.0.text | Q2 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.15.children.0.text | Apr 1 – May 31, 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.16.children.0.text | June 15, 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.17.children.0.text | Q3 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.18.children.0.text | Jun 1 – Aug 31, 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.19.children.0.text | September 15, 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.20.children.0.text | Q4 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.21.children.0.text | Sep 1 – Dec 31, 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.22.children.0.text | January 15, 2027 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.23.children.0.text | Note that Q2 only covers two months (April–May), not three. This is a common source of confusion — and missed payments. Mark all four dates on your calendar now. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.24.style | h2 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.26.children.0.text | Method 1: Estimate Your Current Year Income |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.26.style | h3 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.30.children.1.text | : Multiply net profit by 92.35%, then multiply that result by 15.3%. This is your SE tax. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.31.children.0.text | Deduct 50% of SE tax |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.32.children.1.text | ($15,000 single / $30,000 married filing jointly in 2026) or your itemized deductions. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.33.children.1.text | on your remaining taxable income using the 2026 federal tax brackets. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.34.children.1.text | for your total annual tax liability, then divide by 4 for your quarterly payment amount. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.35.children.1.text | A contractor with $80,000 net profit pays roughly $11,304 in self-employment tax (15.3% × 92.35% × $80,000). After deducting half of SE tax ($5,652) and the standard deduction ($15,000), taxable income is approximately $59,348 — placing them in the 22% bracket. Total estimated annual tax: roughly $24,000, or |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.35.children.2.text | ~$6,000 per quarter |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.36.children.0.text | Method 2: Use the Safe Harbor Rule (Easiest & Safest) |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.36.style | h3 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.38.children.0.text | If your 2025 AGI was $150,000 or less: |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.38.children.1.text | Pay 100% of your 2025 total tax liability, divided by 4 each quarter. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.39.children.0.text | If your 2025 AGI exceeded $150,000: |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.39.children.1.text | Pay 110% of your 2025 total tax liability, divided by 4 each quarter. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.41.style | h2 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.42.children.2.text | . In 2026, the underpayment interest rate is the federal short-term rate plus 3 percentage points, charged from the due date of the missed payment through the date it's actually paid. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.43.children.2.text | , not just at year-end. That means skipping Q1 and catching up in Q4 still results in penalties for Q1, Q2, and Q3 underpayment periods — even if your annual total is correct. Don't wait to "catch up" at the end of the year. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.44.style | h2 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.45.children.1.text | Self-employment tax (15.3%) is often larger than your income tax bill. Always calculate both when estimating payments. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.47.children.0.text | Missing the Q2 short quarter. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.47.children.1.text | The second quarter only covers April and May — not a full three months. Many contractors calculate a standard "quarterly" payment without realizing Q2 comes after just 60 days, not 90. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.48.style | h2 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.52.children.0.text | IRS2Go App |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.54.style | h2 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.55.children.1.text | 30% due in Q1, 40% in Q2, 0% in Q3, and 30% in Q4 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.57.style | h2 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.59.children.2.text | , we help 1099 contractors set up a bulletproof quarterly payment plan so you never face an IRS penalty again. We'll calculate your exact payments, remind you of every deadline, and adjust your estimates as your income changes throughout the year. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.60.children.2.marks.1 | 5b6bb9ec2c86 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.body.en.61.children.0.text | Last updated: March 2026. Tax laws are subject to change. Consult a licensed tax professional for advice specific to your situation. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.coverImage.alt | Contractor reviewing quarterly estimated tax payment schedule and IRS Form 1040-ES |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.excerpt.en | Missing a quarterly estimated tax payment can cost you — even if you pay everything by April. Learn exactly how to calculate your payments, when they're due in 2026, and how the IRS safe harbor rule keeps you penalty-free. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.featuredImage.alt | Contractor reviewing quarterly estimated tax payment schedule and IRS Form 1040-ES |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.publishedAt | 2026-03-30T17:33:00.000Z |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.readingTime | 6 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.seo.keywords.1 | quarterly estimated taxes for contractors 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.seo.keywords.3 | 1099 contractor quarterly taxes |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.seo.keywords.4 | estimated tax due dates 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.seo.metaDescription | Calculate quarterly estimated taxes as a 1099 contractor in 2026, meet every due date, and use the safe harbor rule to avoid IRS penalties. |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.seo.metaTitle | Quarterly Estimated Taxes for Contractors 2026 |
| blogPost/5fb8be79-1789-4286-92f4-14f524ee8dd8.title.en | Quarterly Estimated Taxes for Contractors: How to Calculate, When to Pay & Avoid IRS Penalties (2026) |
| pricingTier/5fd48f0a-d700-4159-a461-fcbc2318dd22.features.3.en | Private Hotel Incentive (2–5 Nights) |
| pricingTier/5fd48f0a-d700-4159-a461-fcbc2318dd22.price.en | $6,500+ |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.0.children.0.text | How the One Big Beautiful Bill Act Changes Small Business Taxes in 2026 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.0.style | h2 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.1.children.0.text | The One Big Beautiful Bill Act (OBBBA) reshapes small business taxes in 2026 by locking in key breaks and tweaking how deductions, expensing, and credits work for owners. If you run a sole proprietorship, LLC, S‑corp, or partnership, it changes how much of your income is taxed, when you can write off major purchases, and which tax credits are worth planning around. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.2.children.0.text | This guide breaks down the biggest OBBBA changes for 2026—tax brackets and the standard deduction, the QBI deduction, bonus depreciation and expensing, and key deductions and credits—so you can adjust your strategy before year‑end instead of reacting at filing time. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.3.children.0.text | 1. Tax brackets and standard deduction in 2026 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.3.style | h2 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.4.children.0.text | OBBBA keeps the seven‑bracket individual structure (10% through 37%) but updates the thresholds and increases the standard deduction starting in 2026. That matters because most small business owners ultimately pay tax on business profit through their personal returns. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.5.children.0.text | For 2026, you’ll see: |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.6.children.0.text | A higher standard deduction (roughly mid‑$16k for single filers and low‑$32k for married filing jointly, with head of household in the mid‑$24k range). |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.9.children.0.text | 2. QBI deduction: permanent and more planning‑friendly |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.9.style | h2 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.10.children.0.text | The Qualified Business Income (QBI) deduction—up to 20% of qualified pass‑through income—was originally scheduled to sunset but is made permanent and adjusted under OBBBA starting in 2026. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.14.children.0.text | A new, inflation‑adjusted minimum QBI deduction (starting at a few hundred dollars for businesses with at least around $1,000 of QBI) helps smaller operators receive some benefit if they materially participate. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.16.children.0.text | 3. Bonus depreciation and expensing: more immediate write‑offs |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.16.style | h2 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.17.children.2.text | in 2026. Instead of letting bonus depreciation phase down to lower percentages, the law restores 100% bonus depreciation for qualifying property. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.18.children.0.text | For 2026 and beyond: |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.19.children.0.text | 100% bonus depreciation |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.21.children.0.text | Section 179 expensing limits and phase‑outs are increased and indexed, allowing many small businesses to fully expense equipment purchases up to higher ceilings.​ |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.23.children.0.text | 4. Deductions and credits reshuffled |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.23.style | h2 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.29.children.0.text | 5. Practical planning moves for 2026 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.29.style | h2 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.30.children.0.text | To actually benefit from these changes, build them into your 2026 plan instead of discovering them at tax time. Consider: |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.32.children.0.text | Mapping equipment, vehicle, and technology purchases around 100% bonus depreciation and Section 179 so you maximize deductions in the right year. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.35.children.0.text | For many owners, 2026 is a smart year for a full tax and entity “checkup” anchored around these OBBBA changes. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.36.style | h2 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.38.children.0.text | Model your 2026 tax bill under different entity choices. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.body.en.41.children.0.text | If you’re planning big investments, a change in how you pay yourself, or a possible entity change in 2026, getting a personalized review now is often worth far more than the cost of the advice. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.excerpt.en | See how the One Big Beautiful Bill Act reshapes small business taxes in 2026, from QBI and higher standard deductions to 100% bonus depreciation and refreshed credits you can use to lower your bill. |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.publishedAt | 2026-02-13T17:00:00.000Z |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.readingTime | 6 |
| blogPost/605c6f26-10b0-46ab-bcbd-3f286de28dab.title.en | How the One Big Beautiful Bill Act Changes Small Business Taxes in 2026 |
| testimonial/68eaad7e-cd82-492e-9318-d5557b516445.rating | 5 |
| pricingTier/7d752ca2-1611-4a22-9749-e40f7c60b0f0.price.en | $350 – $1,200 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.0.children.0.text | If you run a small business, 2026 is one of the most strategically significant tax years in recent memory. Thanks to the One Big Beautiful Bill Act (OBBBA), several major provisions have been made permanent — giving business owners the long-term clarity needed to make smart financial decisions. Whether you're a freelancer, LLC owner, S-corp, or brick-and-mortar business, this guide breaks down the most impactful tax planning strategies available to you right now. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.1.children.0.text | What Changed for Small Businesses in 2026? |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.1.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.3.children.1.text | — Pass-through business owners can deduct up to 20% of qualified business income indefinitely​ |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.4.children.0.text | 100% Bonus Depreciation is restored and permanent |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.5.children.0.text | Section 179 limit expanded to $2.56 million |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.5.children.1.text | — Up significantly from $1.25 million in 2025​ |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.7.children.1.text | — 401(k) contributions up to $24,500; SIMPLE IRA up to $17,000​ |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.9.children.0.text | Strategy 1: Maximize the QBI Deduction |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.9.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.10.children.1.text | up to 20% of their net business income |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.10.children.2.text | . If you earn $150,000 in qualified business income, that's potentially $30,000 off your taxable income.​ |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.11.children.0.text | What changed in 2026: |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.11.children.2.text | minimum $400 deduction |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.11.children.3.text | is guaranteed for anyone with at least $1,000 in QBI — so even lower-income business owners benefit. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.15.children.0.text | Work with a tax advisor to optimize your W-2 wages if you're in an S-corp structure |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.16.children.0.text | Strategy 2: Take Advantage of 100% Bonus Depreciation |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.16.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.17.children.1.text | deduct 100% of the cost in the year it's placed in service |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.18.children.0.text | This is a powerful cash flow tool. If your business invested $80,000 in new equipment in 2026, you can write off the entire amount this year instead of spreading it over 5–7 years. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.25.children.1.text | Coordinate bonus depreciation with your income projections. If you anticipate a high-income year, accelerating large purchases to 2026 can significantly reduce your tax liability. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.26.children.0.text | Strategy 3: Use Section 179 for Immediate Equipment Expensing |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.26.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.27.children.0.text | Section 179 and bonus depreciation work together but serve different purposes. In 2026, |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.27.children.1.text | Section 179 allows up to $2.56 million in qualifying purchases to be immediately expensed |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.27.children.2.text | , with a phase-out beginning at $4.09 million. Unlike bonus depreciation, Section 179 can't create a net operating loss — but it gives you more control over which assets to expense first.​ |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.33.children.1.text | Section 179 is elected on an asset-by-asset basis, giving you strategic flexibility. Work with your tax advisor to determine the optimal combination of both deductions for your specific situation. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.34.children.0.text | Strategy 4: Contribute to a Retirement Plan |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.34.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.35.children.0.text | Retirement plan contributions are one of the most underused tax strategies for small business owners. In 2026, |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.35.children.2.text | , and SECURE Act 2.0 provisions continue to expand eligibility and matching credits.​ |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.37.children.0.text | 2026 Contribution Limit |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.39.children.0.text | Solo 401(k) |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.40.children.0.text | Up to $24,500 + employer match |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.43.children.0.text | Up to $17,000 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.44.children.0.text | Small teams under 100 employees |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.46.children.0.text | Up to 25% of compensation |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.49.children.0.text | $275,000+ (actuarially determined) |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.51.children.0.text | Every dollar contributed reduces your taxable income dollar-for-dollar. For a business owner in the 24% tax bracket, maxing out a Solo 401(k) saves over $5,800 in federal taxes alone — while building long-term wealth. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.52.children.3.text | for your business, you may qualify for a tax credit covering up to 100% of startup costs (up to $5,000/year for 3 years).​ |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.53.children.0.text | Strategy 5: Elect S-Corp Status to Reduce Self-Employment Taxes |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.53.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.54.children.0.text | Self-employment tax (15.3%) is one of the biggest tax burdens for small business owners — and it's also one of the most reducible. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.56.children.0.text | You earn $200,000 net profit from your business |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.57.children.0.text | You pay yourself a reasonable salary of $80,000 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.58.children.0.text | The remaining $120,000 is taken as a distribution |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.59.children.0.text | You save self-employment taxes on that $120,000 — potentially $18,000+ per year |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.60.children.1.text | An S-corp election makes the most sense once your net profit consistently exceeds $50,000–$60,000 annually. Below that threshold, the administrative costs may outweigh the savings. A fractional CFO or tax advisor can run a personalized breakeven analysis. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.61.children.0.text | Strategy 6: Time Your Income and Expenses Strategically |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.61.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.67.children.0.text | Strategy 7: Maximize the Business Interest Deduction |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.67.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.74.children.0.text | Strategy 8: Review and Optimize Your Business Structure |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.74.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.82.children.0.text | Full 15.3% |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.86.children.0.text | Full 15.3% |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.98.children.0.text | Full 15.3% |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.102.children.0.text | Strategy 9: Don't Overlook These Often-Missed Deductions |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.102.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.105.children.1.text | — Track every business mile; the 2026 standard mileage rate applies to qualifying trips |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.106.children.1.text | — Self-employed business owners can deduct 100% of health insurance premiums for themselves and their family |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.109.children.1.text | — 50% of qualifying business meal expenses with clients or employees remain deductible |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.110.children.1.text | — New businesses can deduct up to $5,000 in startup costs and $5,000 in organizational costs in the first year |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.111.children.0.text | Strategy 10: Work with a Tax Professional Year-Round, Not Just at Filing |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.111.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.120.children.0.text | Ready to Build Your 2026 Tax Strategy? |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.120.style | h2 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.121.children.0.text | 2026 is a year of opportunity for small business owners who plan ahead. Between permanent QBI deductions, 100% bonus depreciation, expanded Section 179 limits, and smarter entity structuring, the tools to significantly reduce your tax burden are available right now. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.body.en.123.children.0.text | Don't wait until tax season to discover what you missed. Let's build your 2026 tax strategy today. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.excerpt.en | The One Big Beautiful Bill Act made several major tax provisions permanent in 2026, and small business owners who plan ahead stand to save thousands. From maximizing the 20% QBI deduction to full first-year equipment expensing, the tools to reduce your tax burden are available right now. Here's how to use them. |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.publishedAt | 2026-03-13T14:24:00.000Z |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.readingTime | 7 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.seo.metaTitle | Small Business Tax Planning: Save More in 2026 |
| blogPost/7f51e8dd-45c0-4a0d-85c5-c25602f49c17.title.en | Small Business Tax Planning: Strategies to Save Money in 2026 |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.body.en.0.children.0.text | Filing Form 2553 is how you elect S-Corp status, unlocking significant tax savings on self-employment taxes. But the deadlines are strict, the rules are nuanced, and the consequences of missing them are costly. Here's exactly what you need to know to make the election correctly and on time. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.body.en.1.children.0.text | Form 2553, "Election by a Small Business Corporation," is the document you file with the IRS to elect S-Corp status. The form must be signed by all shareholders who owned stock during the tax year, and it must be filed properly to be valid. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.body.en.2.children.0.text | The standard deadline for filing Form 2553 is the 15th day of the 3rd month of the tax year (March 15 for calendar-year taxpayers). For a new business or an election taking effect in the current year, this deadline must be met exactly. If you're reading this in February and want S-Corp status for this tax year, you still have time. But the deadline approaches quickly. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.body.en.3.children.0.text | But what if you've missed the deadline? There are two pathways to a late election relief. First, the IRS sometimes accepts late elections if you file Form 2553 and attach a reasonable explanation for the lateness and demonstrate reasonable cause. This approach is uncertain and often denied. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.body.en.4.children.0.text | Second, you can make a "relief" election by filing Form 2553 within six months of the due date (September 15 for calendar-year taxpayers) with a cover letter requesting automatic late election relief. The IRS generally grants this relief automatically if the election is made within this extended window and the corporation was eligible for S-Corp status from the beginning. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.body.en.5.children.0.text | For elections intended to take effect in a prior year (e.g., you realized in April that you should have elected S-Corp status for last year), the late election relief is more complicated. You'd need to file Form 2553 with a detailed explanation and likely request IRS consent for the retroactive election. This is possible but requires strong justification. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.body.en.8.children.0.text | Another common mistake is using the wrong tax year. The form requires specifying whether you're electing for a calendar year or fiscal year, and the fiscal year must be a valid S-Corp fiscal year (one that satisfies the "majority test" or "26-week test" for how closely it follows the calendar year). |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.body.en.11.children.0.text | What happens if you file on time but the IRS rejects your election? Sometimes the IRS will reject Form 2553 due to technical issues—missing information, wrong format, unclear answers. If this happens, you typically have 60 days to correct and refile. Keep copies of everything you send and consider using certified mail for proof of timely filing. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.body.en.12.children.0.text | Working with a tax professional is strongly recommended for S-Corp elections. They can ensure the form is completed correctly, all shareholders sign, the timing is optimal, and any elections within the form (like the qualified business income deduction under Section 199A) are handled properly. The cost of professional preparation is trivial compared to the risk of a rejected or ineffective election. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.coverImage.alt | Union National Tax blog hero image for “S-Corp Election Deadline,” showing Form 2553 on a professional desk with a pen, clock, March calendar highlighting the 15th deadline, timing checklist, and green-and-gold tax strategy branding. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.excerpt.en | Filing Form 2553 is how you elect S-Corp status for tax savings. But the deadlines are strict and the consequences of missing them are costly. Here's what you need to know. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.faqItems.0.answer | Form 2553 must be filed by the 15th day of the 3rd month of the tax year (March 15 for calendar-year taxpayers) to take effect for that year. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.faqItems.0.question | What is the deadline to file Form 2553 for S-Corp election? |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.faqItems.1.answer | Yes, you can file Form 2553 within six months of the original deadline (September 15 for calendar-year taxpayers) with a request for automatic late election relief. The IRS generally grants this. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.faqItems.2.question | Who must sign Form 2553? |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.faqItems.3.question | What happens after I file Form 2553? |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.featuredImage.alt | Union National Tax blog hero image for “S-Corp Election Deadline,” showing Form 2553 on a professional desk with a pen, clock, March calendar highlighting the 15th deadline, timing checklist, and green-and-gold tax strategy branding. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.publishedAt | 2026-05-04T18:52:00.000Z |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.readingTime | 4 |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.seo.keywords.0 | Form 2553 |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.seo.keywords.3 | IRS Form 2553 |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.seo.metaDescription | Complete guide to filing Form 2553 for S-Corp election. Deadlines, late election relief, required signatures, and common mistakes to avoid. |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.seo.metaTitle | Form 2553 and S-Corp Election: What You Need to Know |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.targetKeyword | Form 2553 S-Corp election |
| blogPost/7w6UtaYGFCs1ynfwHzRr2C.title.en | S-Corp Election Deadline: Everything You Need to Know About Form 2553 |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.body.en.0.children.0.text | Reaching six figures as a freelancer is a significant achievement. But scaling to seven figures—$1 million or more in annual revenue—requires more than working harder or raising your rates. It requires systems, structures, and financial discipline that most solo practitioners never develop. Here's how top freelancers build sustainable, scalable wealth. |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.body.en.2.children.0.text | One common pathway is developing recurring revenue. Instead of billing by the hour, create retainer relationships with clients. A client paying $5,000 per month for ongoing advisory services generates $60,000 per year with less effort than billing $250 per hour for project work. Retainers provide predictability—for both your cash flow and theirs—and allow you to deliver deeper value. |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.body.en.4.children.0.text | Some seven-figure freelancers build agencies. They hire subcontractors or employees to deliver work while they focus on client relationships and business development. An agency generating $1 million in revenue with 30% profit margins produces $300,000 in take-home pay—significantly more than a solo consultant at the same revenue level. |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.body.en.6.children.0.text | Separate business entities. At higher revenue levels, operating as an S-Corp becomes essential for tax savings. The self-employment tax savings alone can be $20,000-$50,000 per year for high earners. Combine this with the solo 401(k) for retirement savings. |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.body.en.7.children.0.text | Multiple bank accounts. At minimum, you need a business operating account, a tax reserve account (where you set aside 30% of every payment), and a profit distribution account. Some freelancers add a reinvestment account for business development spending. This structure makes cash flow management systematic rather than stressful. |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.coverImage.alt | Union National Tax blog hero image featuring a premium dark green and gold financial blueprint scene for high-income freelancers, with growth markers from $100K to $1M, financial dashboards, a laptop, tablet, and headline text reading “The Financial Blueprint for High-Income Freelancers: From 6 Figures to 7 Figures.” |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.faqItems.2.answer | High-income freelancers typically set aside 30-35% of income for taxes, kept in a separate account and only accessed for quarterly estimated tax payments. |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.featuredImage.alt | Union National Tax blog hero image featuring a premium dark green and gold financial blueprint scene for high-income freelancers, with growth markers from $100K to $1M, financial dashboards, a laptop, tablet, and headline text reading “The Financial Blueprint for High-Income Freelancers: From 6 Figures to 7 Figures.” |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.publishedAt | 2026-05-08T18:45:00.000Z |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.readingTime | 4 |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.seo.metaDescription | How top freelancers scale to 7 figures. Systems, tax strategies, retirement planning, & financial discipline that separate thriving owners from struggling ones. |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.seo.metaTitle | From 6 to 7 Figures: Financial Blueprint for Freelancers |
| blogPost/7w6UtaYGFCs1ynfwHzRsMd.title.en | The Financial Blueprint for High-Income Freelancers: From 6 Figures to 7 Figures |
| testimonial/85810542-9b7f-4788-9ef2-640a394985e0.quote.en | I have been coming to Astwood Insurance for the past 4 years, and he always comes through. Mr. Astwood himself is always professional, gets to the point, and gets you in and out. Really fast process and would definitely recommend anyone to come do their taxes here or any other needs you may have. I am definitely going to keep coming back here to do my taxes again!!!! |
| testimonial/85810542-9b7f-4788-9ef2-640a394985e0.rating | 5 |
| vslPage/8b592ed6-09c8-4ca4-a0d8-3195be92409f.benefitsList.0.en | Landlords with 1+ rental properties |
| vslPage/8b592ed6-09c8-4ca4-a0d8-3195be92409f.resultsList.0.en | $15,000+ Average Annual Tax Savings |
| vslPage/8b592ed6-09c8-4ca4-a0d8-3195be92409f.resultsList.1.en | 4-6 Hours Saved On Tax Planning |
| vslPage/8b592ed6-09c8-4ca4-a0d8-3195be92409f.testimonial.quote.en | Union National helped me restructure my portfolio. I'm now saving over $40k a year in taxes while growing my property count. |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.0.children.0.text | S-Corp Reasonable Compensation: The 2026 Guide to Avoiding Audits |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.0.style | h2 |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.2.children.0.text | In 2026, the IRS is using more advanced data analytics to flag business owners whose salaries look suspiciously low compared to their industry and revenue. |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.3.style | h3 |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.4.children.0.text | It isn’t a "rule of thumb" or a flat 50/50 split. The IRS looks at: |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.6.children.0.text | **Time Spent:** Is this a side hustle (5 hrs/week) or full-time (60 hrs/week)? |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.8.style | h3 |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.11.style | h3 |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.13.children.0.text | 1. You owe back taxes (FICA) on that money. |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.14.children.0.text | 2. You owe penalties for late payroll filing. |
| blogPost/8dnoIGEnvmlOR57uybPLBt.body.en.15.children.0.text | 3. You owe interest on the underpayment. |
| blogPost/8dnoIGEnvmlOR57uybPLBt.excerpt.en | Authority: The #1 audit fear. Show how you use data (RCReports, etc.) to defend their salary. |
| blogPost/8dnoIGEnvmlOR57uybPLBt.publishedAt | 2026-02-25T17:00:00.000Z |
| blogPost/8dnoIGEnvmlOR57uybPLBt.readingTime | 2 |
| blogPost/8dnoIGEnvmlOR57uybPLBt.seo.keywords.0 | S Corp reasonable salary IRS guidelines 2026 |
| blogPost/8dnoIGEnvmlOR57uybPLBt.seo.metaDescription | Authority: The #1 audit fear. Show how you use data (RCReports, etc.) to defend their salary. |
| blogPost/8dnoIGEnvmlOR57uybPLBt.seo.metaTitle | S-Corp Reasonable Compensation: The 2026 Guide to Avoiding Audits |
| blogPost/8dnoIGEnvmlOR57uybPLBt.title.en | S-Corp Reasonable Compensation: The 2026 Guide to Avoiding Audits |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.0.children.0.text | How to Report Health Insurance on W-2s for S-Corp Owners |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.0.style | h2 |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.1.children.1.text | 2% (or greater) shareholders |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.1.children.2.text | . If this isn't handled correctly on your W-2, you could lose the ability to deduct those premiums on your personal return. |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.2.children.0.text | The Rules for 2026 |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.2.style | h3 |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.3.children.2.text | (an "above-the-line" deduction on Form 1040), the following must happen: |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.4.children.0.text | 1. |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.5.children.0.text | 2. |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.5.children.3.text | must be included in Box 1 |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.5.children.4.text | (Federal Wages) on the shareholder's W-2. |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.6.children.0.text | 3. |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.7.style | h3 |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.10.children.0.text | **The Owner:** Deducts the premiums on their personal 1040, offsetting the income addition. |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.12.children.0.text | Is Your W-2 Wrong? |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.12.style | h3 |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.13.children.0.text | Check your 2025 W-2. Look at Box 14 for a code like "SCORP HEALTH." If your health insurance premiums aren't reflected there or in Box 1, your CPA might be missing a critical compliance step. |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.body.en.14.children.1.text | We review S-Corp W-2s to ensure you're maximizing every deduction available to you. |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.publishedAt | 2026-02-27T17:00:00.000Z |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.readingTime | 2 |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.seo.keywords.0 | S Corp shareholder health insurance W2 reporting |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.seo.metaTitle | How to Report Health Insurance on W-2s for S-Corp Owners |
| blogPost/8dnoIGEnvmlOR57uyfOlcs.title.en | How to Report Health Insurance on W-2s for S-Corp Owners |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.3.children.0.text | When you're operating as a sole proprietor or single-member LLC, every dollar your business earns is subject to self-employment tax — that's 15.3% on top of your income tax. On $150,000 in net profit, that's roughly $22,950 going to self-employment tax alone. |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.4.children.0.text | An S-Corp election changes the math. Once you make the election, you can pay yourself a reasonable salary — say $60,000 — and take the remaining $90,000 as a distribution, which is not subject to self-employment tax. |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.7.children.0.text | Here's a side-by-side comparison for a business earning $150,000 in net profit: |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.9.children.0.text | Net Profit: $150,000 vs. $150,000 |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.10.children.0.text | Self-Employment Tax: $22,950 vs. $9,180 |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.11.children.0.text | Annual Savings: $13,770 |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.12.children.0.text | Even after accounting for the cost of payroll processing (often $500–$1,000/year), the net benefit is $8,000–$13,000 in your pocket — every year, not just once. |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.15.children.0.text | Your business net profit exceeds $40,000/year You have clients or contracts outside your employer You're already paying self-employment tax on freelance or side income You want a clearer separation between personal and business finances |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.18.children.0.text | You can make the S-Corp election anytime — but timing matters. The election is made by filing Form 2553 with the IRS. For it to apply to the current tax year, you typically need to file it by the 15th day of the 3rd month of your tax year (March 15 for calendar-year filers). |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.23.children.0.text | Not sure if you qualify? Schedule a free 30-minute consultation. We'll review your business structure, run the numbers, and give you a straight answer — no pressure, no obligation. |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.33.children.0.text | What's the deadline to file Form 2553? |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.body.en.34.children.0.text | For calendar-year businesses, the deadline is March 15. For fiscal-year businesses, it's the 15th day of the 3th month of your fiscal year. Late filings are treated as applying to the following tax year. |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.coverImage.alt | Union National Tax blog hero image for “The S-Corp Tax Loophole Most Small Business Owners Miss in 2026,” showing a dark green and gold split-path design comparing a default LLC or sole proprietor setup with an optimized S-Corp strategy, featuring cards for reasonable salary, distributions, entity structure, payroll tax strategy, and estimated annual savings. |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.excerpt.en | Most LLC owners and 1099 contractors are overpaying taxes by thousands every year — not because they lack deductions, but because they've structured their business wrong. Here's how an S-Corp election could put $8,000+ back in your pocket this year. |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.featuredImage.alt | Union National Tax blog hero image for “The S-Corp Tax Loophole Most Small Business Owners Miss in 2026,” showing a dark green and gold split-path design comparing a default LLC or sole proprietor setup with an optimized S-Corp strategy, featuring cards for reasonable salary, distributions, entity structure, payroll tax strategy, and estimated annual savings. |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.publishedAt | 2026-04-15T19:18:00.000Z |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.readingTime | 1 |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.seo.keywords.5 | Form 2553 filing deadline |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.seo.keywords.6 | small business tax structure 2026 |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.seo.metaDescription | Most LLC owners overpay thousands in taxes — not from missing deductions, but wrong structure. See how an S-Corp election can put $8,000+ back in your pocket. |
| blogPost/8ejm7yxhwRT4gOeFSJ2VdV.title.en | The S-Corp Tax Loophole Most Small Business Owners Miss in 2026 |
| blogPost/8q3olrehLhYUlNPaYZvfDm.body.en.3.children.0.text | A single-member LLC is taxed as a sole proprietorship by default. That means all profits flow through to your personal tax return, and you pay self-employment tax (15.3%) on the entire amount. No分离 between salary and distributions. No payroll tax savings. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.body.en.5.children.0.text | The LLC's real advantage is liability protection and simplicity, not tax savings. If your business earns under $80,000-$100,000 in net profit, the entity structure matters less. Above that threshold, an LLC alone is leaving money on the table. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.body.en.7.children.0.text | An S-Corp lets you split profits into two categories: a reasonable salary (subject to payroll tax) and distributions (not subject to payroll tax). The salary portion is taxed as W-2 income. The distribution portion is not. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.body.en.8.children.0.text | This is the key distinction. In an LLC, every dollar of profit is subject to 15.3% self-employment tax. In an S-Corp, only the salary portion is. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.body.en.9.children.0.text | Example: Your business makes $180,000 net profit. With a single-member LLC, you pay self-employment tax on all $180,000 = ~$27,540 in additional tax. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.body.en.10.children.0.text | If you elect S-Corp status and pay yourself a $70,000 salary and take $110,000 in distributions, you pay payroll tax on $70,000 only = ~$10,710. You save approximately $16,830 in self-employment tax. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.body.en.13.children.0.text | A C-Corp pays corporate tax (21% flat rate) on profits, then you pay personal income tax again on distributions as dividends. This is double taxation, and it's generally inefficient for businesses making under $250,000-$300,000 in net profit. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.body.en.18.children.0.text | Rule of thumb: Under $80K net profit — LLC default is fine. $80K-$250K — strongly consider S-Corp election. Over $250K — run the numbers on both S-Corp and C-Corp. Your tax professional should be modeling these scenarios annually. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.body.en.20.children.0.text | The best time to make the S-Corp election is January 1 of the tax year — or within 75 days of year-end for the current year. If you're reading this in Q4 and you expect to hit the $80K threshold this year, talk to your tax pro now about making the election. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.faqItems.0.answer | Most tax professionals recommend S-Corp election when net profits exceed 80,000 to 100,000 annually, because the payroll tax savings typically outweigh the added compliance cost of running payroll. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.faqItems.1.answer | File Form 2553 with the IRS by the deadline (January 1 of the tax year, or up to 75 days after year-end for the current year). All shareholders must sign. |
| blogPost/8q3olrehLhYUlNPaYZvfDm.lastReviewedAt | 2026-05-14T16:41:20.741Z |
| blogPost/8q3olrehLhYUlNPaYZvfDm.publishedAt | 2026-05-13T16:41:00.000Z |
| blogPost/8q3olrehLhYUlNPaYZvfDm.readingTime | 8 |
| blogPost/8q3olrehLhYUlNPaYZvfDm.seo.keywords.4 | tax strategy 2026 |
| blogPost/8q3olrehLhYUlNPaYZvfDm.seo.metaTitle | LLC vs S-Corp vs C-Corp: Tax Impact Guide 2026 |
| blogPost/8q3olrehLhYUlNPaYZvfDm.title.en | LLC vs S-Corp vs C-Corp: The Real Tax Impact for Small Business Owners in 2026 |
| testimonial/9f199aab-5412-4157-a827-0fc2a9d786dd.rating | 5 |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.3.children.0.text | Strategy 1: Qualified Business Income (QBI) Deduction Optimization |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.3.style | h2 |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.4.children.0.text | The Tax Cuts and Jobs Act created a 20% deduction for pass-through businesses — known as the Qualified Business Income (QBI) deduction. For construction companies structured as S-Corps, LLCs, or partnerships, this is real money. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.5.children.1.text | On $300,000 of taxable business income, the QBI deduction can be worth $60,000 — off your taxable income, not just your tax liability. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.9.children.0.text | Strategy 2: Vehicle and Equipment Depreciation — The Timing Game |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.9.style | h2 |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.10.children.0.text | Construction businesses are asset-heavy. Trucks, trailers, excavators, tools, equipment. Most contractors know Section 179 lets you deduct the full purchase price of equipment in the year it's placed in service instead of depreciating it over time. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.13.children.0.text | You buy a new truck in November for $55,000. If you don't have a depreciation strategy in place, you might miss the window to expense it in the current year — or worse, you don't know you could have accelerated a purchase you were going to make anyway and moved the deduction forward. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.14.children.0.text | Bonus depreciation is another tool. Congress has made significant bonus depreciation available in recent years, and the rules have been shifting. If nobody on your tax team is monitoring the current bonus depreciation percentages and how they interact with Section 179, you're leaving real deductions on the table. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.15.children.1.text | Should you buy equipment before year-end? Should you accelerate a planned purchase? Those are not January questions. They're Q3 and Q4 questions. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.16.children.0.text | Strategy 3: Year-End Tax Planning vs. Year-Round Tax Engineering |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.16.style | h2 |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.25.children.0.text | For construction companies in Utah, Q4 close is also when you're busiest — which is exactly why it's the worst time to be making tax decisions reactively. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.26.style | h2 |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.body.en.29.children.0.text | If you're a Utah contractor or construction company owner and you're tired of getting a tax bill instead of a tax plan, let's talk before Q4 closes. The decisions that affect your 2026 tax year are being made right now — whether you realize it or not. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.coverImage.alt | Union National Tax blog hero image for “3 Tax Strategies Construction Companies in Utah Use to Keep More Revenue,” showing a premium green-and-gold construction planning scene with Utah mountains, a contractor financial dashboard, blueprint desk, hardhat, calculator, project estimate sheet, and three strategy cards for entity structure, equipment and depreciation, and job costing and cash flow. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.featuredImage.alt | Union National Tax blog hero image for “3 Tax Strategies Construction Companies in Utah Use to Keep More Revenue,” showing a premium green-and-gold construction planning scene with Utah mountains, a contractor financial dashboard, blueprint desk, hardhat, calculator, project estimate sheet, and three strategy cards for entity structure, equipment and depreciation, and job costing and cash flow. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.publishedAt | 2026-04-13T15:23:00.000Z |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.readingTime | 7 |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.seo.metaDescription | QBI deduction, equipment depreciation, and year-round tax planning can save Utah contractors $30K+. See three strategies construction companies overlook. |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.seo.metaTitle | 3 Tax Strategies for Utah Construction Companies |
| blogPost/9f3d2c81-7d58-49d7-9af3-e0685f4b7062.title.en | 3 Tax Strategies Construction Companies in Utah Use to Keep More Revenue |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.0.children.0.text | Missed the March 15 S-Corp Election? How to File Form 2553 Late |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.0.style | h2 |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.1.children.0.text | The official deadline to elect S-Corp status for the 2026 tax year is |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.1.children.1.text | March 16, 2026 |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.1.children.2.text | (since March 15th falls on a Sunday). If you missed that window, you might think you’re stuck paying high self-employment taxes for the rest of the year. |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.2.children.0.text | Most business owners assume that if they miss the date, they have to wait until 2027. |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.3.children.0.text | The "Wizard" Level Fix: Rev. Proc. 2013-30 |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.3.style | h3 |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.4.children.1.text | Revenue Procedure 2013-30 |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.4.children.4.text | . This is effectively a "Safety Net" that lets you file Form 2553 (the S-Corp election form) up to 3 years and 75 days late, provided you meet certain criteria. |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.5.style | h3 |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.6.children.0.text | To successfully file a late S-Corp election, you must attach a statement to your Form 2553 establishing "Reasonable Cause." Valid reasons often include: |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.10.style | h3 |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.11.children.0.text | If your business nets over $80,000 a year, operating as an LLC (Sole Proprietorship) vs. an S-Corp is costing you roughly |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.11.children.1.text | 15.3% |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.body.en.14.children.1.text | We specialize in helping businesses navigate these specific IRS procedures. If you missed the March deadline, contact us immediately. We can likely attach the late election to your 2026 tax return and save your tax strategy for the year. |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.excerpt.en | The Safety Net: Captures the procrastinators. Mention Rev. Proc. 2013-30 to sound like a wizard. Note: S-Corp Deadline is March 16 (Sunday rule). |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.publishedAt | 2026-02-20T17:00:00.000Z |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.readingTime | 2 |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.seo.keywords.0 | Late S Corp election relief 2026 |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.seo.metaDescription | The Safety Net: Captures the procrastinators. Mention Rev. Proc. 2013-30 to sound like a wizard. Note: S-Corp Deadline is March 16 (Sunday rule). |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.seo.metaTitle | Missed the March 15 S-Corp Election? How to File Form 2553 Late |
| blogPost/BZ20yT0TZX0jrdmpXX64pT.title.en | Missed the March 15 S-Corp Election? How to File Form 2553 Late |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.0.style | h2 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.1.children.0.text | Despite the rapid adoption of artificial intelligence across industries, a surprising trend has emerged in tax season 2026: trust in AI-powered tax filing is slipping. A recent survey found that taxpayers across every generation—from Millennials to Gen Z—are increasingly skeptical of AI handling their most sensitive financial data. |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.3.style | h2 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.4.children.0.text | 1. Complexity of Tax Situations |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.4.style | h3 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.6.children.0.text | 2. Audit Anxiety |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.6.style | h3 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.8.children.0.text | 3. Personal Relationship |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.8.style | h3 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.10.children.0.text | 4. Liability Concerns |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.10.style | h3 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.12.style | h2 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.13.style | h3 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.body.en.15.style | h3 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.keywords.3 | accounting careers 2026 |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.publishedAt | 2026-03-09T23:00:00.000Z |
| blogPost/ED4xAcg5kSy4svU6nn76Jd.readingTime | 6 |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.body.en.0.children.0.text | If you're running a profitable business as a sole proprietor or LLC, you're likely overpaying in self-employment taxes. The self-employment tax rate is 15.3% on net earnings—and that's on top of your income tax. For high-earning consultants, contractors, and business owners, this can mean tens of thousands of dollars in unnecessary tax burden every single year. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.body.en.2.children.0.text | Here's the basic concept: When you operate as a sole proprietor or single-member LLC, all the profit from your business flows directly to your personal tax return and is subject to self-employment tax. But when you elect S-Corp status, you can split your business income into two parts—a reasonable salary (subject to payroll taxes) and distributions (NOT subject to payroll taxes). The distributions flow through to your personal return but escape the 15.3% self-employment tax entirely. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.body.en.3.children.0.text | Let's look at a real example. Say you're a consultant earning $200,000 per year in net profit. As a sole proprietor, you'd pay self-employment tax on the full $200,000—that's $30,600 in self-employment tax alone, before income tax. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.body.en.4.children.0.text | Now let's say you make an S-Corp election and pay yourself a reasonable salary of $100,000. The remaining $100,000 comes to you as distributions. Your self-employment tax is now only $15,300—a savings of $15,300 compared to the sole proprietorship structure. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.body.en.6.children.0.text | Who qualifies for S-Corp election? Any eligible domestic corporation can elect S-Corp status by filing Form 2553 with the IRS. Eligibility requirements include having fewer than 100 shareholders, having only one class of stock, and being organized in the United States. Most importantly, you must be a U.S. citizen or resident alien. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.body.en.7.children.0.text | The timing matters. You can generally elect S-Corp status to take effect for the current tax year if you file Form 2553 by the 15th day of the 3rd month of your tax year (March 15 for calendar-year taxpayers). Late elections can sometimes be accepted, but it's cleaner to plan ahead. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.body.en.8.children.0.text | What about the added complexity? Yes, S-Corps require more administration. You need to run payroll, file quarterly payroll tax returns, and maintain corporate minutes. But for most profitable business owners, the tax savings far outweigh the added compliance costs. When you're saving $10,000, $20,000, or even $50,000 per year in taxes, paying a CPA a few thousand dollars extra to handle the compliance is still a net win. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.body.en.11.children.0.text | If you're a business owner earning over $80,000 in net profit annually and you're currently operating as a sole proprietorship or single-member LLC, an S-Corp election could be one of the most impactful financial decisions you make this year. The potential tax savings are substantial, and the compliance requirements, while real, are manageable with proper planning. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.faqItems.0.answer | For a business owner earning $200,000 in net profit, switching to S-Corp status can save approximately $15,300 per year in self-employment taxes by splitting income into a salary and distributions. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.faqItems.1.answer | The IRS requires S-Corp owners to pay themselves a "reasonable salary" for the work they perform. This must be at least what would be paid in an arm's-length transaction for similar services, typically between $30,000-$60,000 for many professional roles. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.faqItems.2.answer | To elect S-Corp status, file Form 2553 with the IRS by the 15th day of the 3rd month of your tax year (March 15 for calendar-year taxpayers). All shareholders must sign the election form. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.faqItems.3.answer | S-Corp election typically becomes advantageous when net profits exceed $80,000-$100,000 per year, as the tax savings on distributions outweigh the added compliance costs. |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.publishedAt | 2026-04-17T19:18:00.000Z |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.readingTime | 3 |
| blogPost/Jl05JbWvbVsByEkDHuPtVb.seo.keywords.4 | Form 2553 |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.body.en.1.children.0.text | As a self-employed individual, you're responsible for paying taxes on your income as you earn it, not just at tax time. The IRS requires you to pay estimated taxes quarterly if you expect to owe at least $1,000 in taxes for the year. This includes both income tax and self-employment tax combined. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.body.en.2.children.0.text | The four quarterly payment due dates are April 15, June 15, September 15, and January 15 (the following year). These dates apply to calendar-year taxpayers. If any due date falls on a weekend or holiday, the deadline shifts to the next business day. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.body.en.3.children.0.text | Calculating your quarterly payment doesn't require you to be a math wizard. The simplest method is to look at last year's tax return and divide last year's total tax liability by four. This is called the "prior year safe harbor" method—it protects you from penalties as long as you pay at least 100% of last year's tax liability (110% if your AGI was over $150,000). |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.body.en.5.children.0.text | Here's a practical example. Let's say you expect to earn $150,000 in net profit this year, and you estimate $30,000 in deductions, leaving you with $120,000 in taxable income. After accounting for self-employment tax and income tax combined, you might owe roughly $35,000 for the year. Dividing by four, you'd need to pay $8,750 per quarter. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.body.en.6.children.0.text | You have several options for making these payments. The IRS offers the Electronic Federal Tax Payment System (EFTPS), which allows you to schedule payments in advance and receive instant confirmation. You can also pay via the IRS Direct Pay website for free, or use a credit/debit card (though this involves processing fees). If you prefer mail, you can send a check with Form 1040-ES voucher to the appropriate IRS address based on your state. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.body.en.7.children.0.text | What happens if you don't pay enough? The IRS charges a penalty for underpayment, calculated based on the federal short-term interest rate (which is currently elevated). For 2024, the underpayment penalty rate is around 8% annually. That might not sound terrible, but it's completely avoidable with proper planning. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.body.en.9.children.0.text | One key tip: Set aside a percentage of every payment you receive for taxes. Many financial advisors recommend saving 25-35% of your income for taxes, though your exact percentage depends on your bracket and situation. Creating a separate savings account and automating transfers makes this easier. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.coverImage.alt | Union National Tax blog hero image for “Quarterly Estimated Taxes,” showing a green-and-gold quarterly tax roadmap with Q1, Q2, Q3, and Q4 payment dates, step-by-step tax planning cards, a tax planning notebook, calendar, income dashboard, and business snapshot charts. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.faqItems.0.answer | Quarterly estimated tax payments are due on April 15, June 15, September 15, and January 15 of the following year. If a deadline falls on a weekend or holiday, it shifts to the next business day. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.faqItems.1.answer | Most financial advisors recommend setting aside 25-35% of your self-employment income for taxes. Your exact rate depends on your income bracket and whether you have other sources of income. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.faqItems.2.answer | The IRS charges penalties for underpayment, calculated at the federal short-term interest rate plus 3%. For 2024, this rate is around 8%, making it costly to skip quarterly payments. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.faqItems.3.answer | Yes, the "prior year safe harbor" method lets you pay 100% of last year's total tax liability (110% if your AGI exceeded $150,000) divided by four. This protects you from penalties. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.featuredImage.alt | Union National Tax blog hero image for “Quarterly Estimated Taxes,” showing a green-and-gold quarterly tax roadmap with Q1, Q2, Q3, and Q4 payment dates, step-by-step tax planning cards, a tax planning notebook, calendar, income dashboard, and business snapshot charts. |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.publishedAt | 2026-04-20T19:20:00.000Z |
| blogPost/Jl05JbWvbVsByEkDHuPtrX.readingTime | 4 |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.body.en.1.children.0.text | Home office deduction. Myth: You can deduct any room in your home where you occasionally check email. Reality: The IRS requires that you use the space exclusively and regularly for business. A spare bedroom that doubles as a guest room doesn't qualify. The simplified method ($5 per square foot) is safer from audit risk than the regular method, but even the simplified method requires a genuine business use. |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.body.en.3.children.0.text | Business entertainment. Myth: Taking clients to dinner is fully deductible as a business expense. Reality: Business entertainment deductions were largely eliminated by the Tax Cuts and Jobs Act. Meals while traveling for business are still 50% deductible, but pure entertainment (tickets to sporting events, golf outings, etc.) is no longer deductible. Many people don't realize this change and claim disallowed deductions. |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.body.en.6.children.0.text | Home improvements for business. Myth: Renovating your home office is a deductible business expense. Reality: Only the portion of improvements attributable to the business use of your home qualifies. A $100,000 kitchen renovation doesn't become fully deductible just because you work from home occasionally. The deduction is limited to the square footage percentage of business use and only for direct business expenses, not capital improvements. |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.body.en.7.children.0.text | Charitable contributions. Myth: Donating to charity is always deductible and there's no limit. Reality: Charitable deductions are limited based on your AGI (typically 60% for cash donations). Excess contributions carry forward for five years. And you must receive something in return (like a dinner ticket or auction item) if the donation is $75 or more—the IRS requires acknowledgment for these "quid pro quo" contributions. |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.coverImage.alt | Union National Tax blog hero image for “Myth vs. Reality: 7 Common Tax Deductions That Trigger Audits,” showing a dark green and gold split design with seven deduction icons, audit documentation checklist, magnifying glass, tax strategy notebook, and compliance-focused visuals. |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.faqItems.1.answer | Mostly no. The Tax Cuts and Jobs Act eliminated deductions for business entertainment (sports events, golf outings). Meals while traveling are still 50% deductible, but pure entertainment is not. |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.faqItems.3.answer | The simplified method ($5 per square foot, up to $1,500) is harder for the IRS to challenge because it's a mechanical calculation. The regular method requires calculating actual expenses and is scrutinized more closely. |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.featuredImage.alt | Union National Tax blog hero image for “Myth vs. Reality: 7 Common Tax Deductions That Trigger Audits,” showing a dark green and gold split design with seven deduction icons, audit documentation checklist, magnifying glass, tax strategy notebook, and compliance-focused visuals. |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.publishedAt | 2026-05-06T18:48:00.000Z |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.readingTime | 4 |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.seo.metaDescription | Busted: 7 common tax deduction myths that trigger IRS audits. Learn which deductions are legal but risky, and how to claim them defensibly. |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.seo.metaTitle | Tax Deduction Myths Debunked: 7 Write-Offs That Trigger |
| blogPost/Jl05JbWvbVsByEkDHuPyA3.title.en | Myth vs. Reality: 7 Common Tax Deductions That Trigger Audits |
| product/NjFKn5TWxAiAPiVihBdhlh.editions.0.price | 59 |
| product/NjFKn5TWxAiAPiVihBdhlh.editions.1.price | 39 |
| product/NjFKn5TWxAiAPiVihBdhlh.editions.2.price | 29 |
| product/NjFKn5TWxAiAPiVihBdhlh.editions.3.price | 27 |
| product/NjFKn5TWxAiAPiVihBdhlh.price | 59 |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.0.style | h2 |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.2.children.0.text | An extension (Form 7004 for businesses) only grants you more time to |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.2.children.2.text | . The IRS still expects you to pay your estimated tax liability by the original deadline (March 16 for S-Corps/Partnerships, April 15 for C-Corps). |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.3.style | h3 |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.5.children.0.text | **The Cost:** 0.5% of the unpaid taxes for *each month* or part of a month the tax remains unpaid, up to 25%. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.6.children.0.text | **Interest:** Plus, you will be charged interest on the underpayment (currently hovering around 7-8%). |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.7.style | h3 |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.9.children.0.text | 1. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.9.children.2.text | It allows you to ensure all 1099s, K-1s, and expense categorizations are correct without rushing. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.10.children.0.text | 2. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.10.children.3.text | 5% per month |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.10.children.4.text | —than the penalty for not paying (0.5%). |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.11.children.0.text | 3. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.11.children.2.text | It gives you more time to fund certain retirement plans (like a SEP IRA or Solo 401k) for the previous tax year. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.12.style | h3 |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.14.children.0.text | 1. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.14.children.2.text | Protect yourself from the 5% "Failure to File" penalty. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.15.children.0.text | 2. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.15.children.2.text | Work with us to calculate a "safe harbor" payment by March 16. Send that money to the IRS. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.body.en.16.children.0.text | 3. |
| blogPost/UkQBLj7l7r27M1hWARMGtV.publishedAt | 2026-02-18T17:00:00.000Z |
| blogPost/UkQBLj7l7r27M1hWARMGtV.readingTime | 2 |
| blogPost/UkQBLj7l7r27M1hWARMGtV.seo.keywords.0 | IRS business tax extension rules 2026 |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.3.children.0.text | This guide walks you through exactly what to do in the first 48 hours of receiving an IRS notice, how to decode what you're reading, and when to bring in a tax resolution professional. |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.4.children.0.text | Step 1: Read It Completely — Twice |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.6.children.0.text | Common notice types include: CP14 (balance due), CP501 (reminder), CP503 (urgent), LT39 (intent to levy), CP90 (final notice of intent to levy). The number matters. A CP14 is a billing notice. An LT39 means the IRS is actively preparing to seize assets. Know where you stand. |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.7.children.0.text | Step 2: Don't Ignore It — But Also Don't Overreact |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.9.children.0.text | If you ignore it: the IRS will follow up, and penalties and interest will compound daily. A balance due of $5,000 today could be $6,200 in six months due to penalties and interest. |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.11.children.0.text | Step 3: Verify the Numbers |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.12.children.0.text | Pull your records for the tax year in question. Compare the IRS's figures against your filed return. Check your W-2s, 1099s, and any deduction documentation you have. |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.13.children.0.text | If the notice says you owe $8,400 and your return showed $0 balance due, something is wrong. This happens more often than you'd think — especially with math errors on the IRS's end or mismatched 1099s. |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.14.children.0.text | Step 4: Know Your Response Options |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.16.children.0.text | If you disagree: You have the right to contest. File a written protest within the timeframe shown on the notice (usually 30-60 days). Include your reasoning and any supporting documentation. This is where a tax resolution professional earns their fee. |
| blogPost/WEuNuhI85DeerGb0clUejC.body.en.17.children.0.text | Step 5: Call a Tax Resolution Pro for These Specific Notices |
| blogPost/WEuNuhI85DeerGb0clUejC.excerpt.en | Receiving an IRS notice is stressful — but it doesn't have to be devastating. Here's exactly what to do in the first 48 hours, what each notice type means, and when to call a tax resolution professional. |
| blogPost/WEuNuhI85DeerGb0clUejC.faqItems.0.answer | Most IRS notices give you 30 to 60 days to respond. Missing that window lets the IRS move forward with their proposed action — which is rarely in your favor. |
| blogPost/WEuNuhI85DeerGb0clUejC.lastReviewedAt | 2026-05-14T16:41:20.741Z |
| blogPost/WEuNuhI85DeerGb0clUejC.publishedAt | 2026-05-11T16:41:00.000Z |
| blogPost/WEuNuhI85DeerGb0clUejC.readingTime | 7 |
| blogPost/WEuNuhI85DeerGb0clUejC.seo.metaTitle | How to Handle an IRS Notice in 48 Hours |
| blogPost/WEuNuhI85DeerGb0clUf5Y.body.en.2.children.0.text | I've seen it firsthand: a $2M consulting firm paying a bookkeeper $45,000/year to reconcile accounts and generate financial statements—but never once being told that their average collection period for receivables was 67 days, or that their job costing data showed margin had dropped 8 points year-over-year. |
| blogPost/WEuNuhI85DeerGb0clUf5Y.body.en.11.children.0.text | 1. Mispriced contracts: Without accurate job costing or margin data, companies don't realize they're losing money on certain clients or project types until it's too late. |
| blogPost/WEuNuhI85DeerGb0clUf5Y.body.en.12.children.0.text | 2. Cash flow surprises: Revenue looks healthy on paper, but the bank account is always tight. Usually this means slow collections, uneven billing cycles, or revenue recognition timing issues—none of which show up on a basic P&L. |
| blogPost/WEuNuhI85DeerGb0clUf5Y.body.en.13.children.0.text | 3. Tax surprises: When bookkeeping is only done for compliance (once a year at tax time), you can't make tax-optimization decisions throughout the year. You're always behind, always reactive. |
| blogPost/WEuNuhI85DeerGb0clUf5Y.body.en.16.children.0.text | 1. Clean, current books: Transactions are categorized weekly, at minimum. Bank statements are reconciled within days, not weeks. |
| blogPost/WEuNuhI85DeerGb0clUf5Y.body.en.17.children.0.text | 2. Monthly financial review: A monthly meeting (even 30 minutes) where someone walks through the numbers—not just the revenue and profit, but the key metrics that drive business health: gross margins, collections, cash runway, and pipeline. |
| blogPost/WEuNuhI85DeerGb0clUf5Y.body.en.18.children.0.text | 3. Proactive tax visibility: Estimated tax payments are calculated and set aside throughout the year, not discovered in a panic every quarter. |
| blogPost/WEuNuhI85DeerGb0clUf5Y.faqItems.1.answer | Fractional CFO services typically range from 1,500 to 5,000 per month depending on business complexity, scope of work, and whether they are embedded in operations or serving primarily as a strategic advisor. |
| blogPost/WEuNuhI85DeerGb0clUf5Y.lastReviewedAt | 2026-05-14T16:41:20.741Z |
| blogPost/WEuNuhI85DeerGb0clUf5Y.publishedAt | 2026-05-15T16:41:00.000Z |
| blogPost/WEuNuhI85DeerGb0clUf5Y.readingTime | 8 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.0.children.0.text | The CFO Tool Stack Every Growing Business Needs in 2026 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.0.style | h1 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.3.children.1.text | $500K and $10M in revenue |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.4.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.13.children.0.text | Layer 1: Core Accounting (The Foundation) |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.13.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.18.children.0.text | Layer 2: Integrated Payroll |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.18.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.25.children.0.text | Layer 3: Cash Flow Management |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.25.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.28.children.1.text | 13-week rolling cash flow forecast |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.33.children.0.text | Layer 4: Job Costing and Project Tracking |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.33.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.38.children.0.text | Layer 5: Tax Optimization Infrastructure |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.38.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.41.children.0.text | The two-step setup that eliminates 90% of tax surprises: |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.43.children.1.text | 25–30% of every payment received |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.44.children.0.text | That's it. This takes 15 minutes to configure and permanently eliminates the most common cash flow crisis we see in growing businesses — the one where a $40K quarterly estimated tax bill arrives and the money is already spent. |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.45.children.2.text | Your fractional CFO or tax advisor should be running a tax projection mid-year (June/July) so you can make strategic decisions — retirement contributions, equipment purchases, entity structure — before December 31. |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.46.children.0.text | Layer 6: Financial Dashboard and Reporting |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.46.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.57.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.58.children.0.text | Role: Fractional CFO (8–15 hours/month for businesses under $5M) |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.60.children.2.text | is the right human layer on top of this tool stack. They run the monthly review, model financial scenarios, and provide the strategic input that turns data into decisions—without the $200K+ cost of a full-time hire. |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.61.children.1.text | $1,500–$4,000/month |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.62.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.69.children.0.text | Under $500K |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.75.children.0.text | $500K–$2M |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.81.children.0.text | $2M–$10M |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.87.children.0.text | $10M+ |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.93.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.95.children.0.text | Books are reconciled within 5 business days of real time |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.97.children.0.text | You have a 13-week cash flow forecast updated weekly |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.99.children.0.text | The tax reserve account is funded at 25–30% of revenue |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.103.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.104.children.1.text | The tools themselves typically run $300–$800/month depending on team size and which layers you implement. Add a fractional CFO at $1,500–$3,500/month, and the total investment for a complete system is usually under $5,000/month—far less than a full-time hire and significantly less than the cost of financial blind spots. |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.105.children.1.text | Not necessarily from day one. Start with Layer 1 (accounting) and Layer 5 (tax reserve)—those two alone eliminate the most common pain points. Add layers as revenue grows and financial complexity increases. |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.108.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfTw.body.en.112.children.1.marks.0 | 05de078be387 |
| blogPost/WEuNuhI85DeerGb0clUfTw.coverImage.alt | CFO Tool Stack for growing businesses in 2026 — integrated financial command center showing bookkeeping, payroll, cash flow forecasting, KPI dashboard, tax planning, and CRM pipeline |
| blogPost/WEuNuhI85DeerGb0clUfTw.excerpt.en | The right financial technology stack doesn't just save time — it gives you the visibility to make better decisions faster. Here's what the modern CFO tool stack looks like for businesses between $500K and $10M in revenue. |
| blogPost/WEuNuhI85DeerGb0clUfTw.faqItems.0.answer | Core accounting runs 50 to 150 per month depending on complexity. Payroll integrated with accounting runs 20 to 50 per month per employee. Cash flow forecasting tools run 50 to 150 per month. In total, expect 500 to 1,500 per month for a comprehensive tool stack for a business with 1M to 3M in revenue. |
| blogPost/WEuNuhI85DeerGb0clUfTw.faqItems.1.answer | For businesses under 5M in revenue, a fractional CFO (typically 8-15 hours/month) is usually sufficient. They provide strategic financial leadership — monthly reviews, forecasting, tax planning — without the cost of a full-time executive. As you approach 10M+ in revenue, a dedicated CFO often becomes necessary. |
| blogPost/WEuNuhI85DeerGb0clUfTw.featuredImage.alt | CFO Tool Stack for growing businesses in 2026 — integrated financial command center showing bookkeeping, payroll, cash flow forecasting, KPI dashboard, tax planning, and CRM pipeline |
| blogPost/WEuNuhI85DeerGb0clUfTw.lastReviewedAt | 2026-05-14T16:41:20.741Z |
| blogPost/WEuNuhI85DeerGb0clUfTw.publishedAt | 2026-05-22T16:41:00.000Z |
| blogPost/WEuNuhI85DeerGb0clUfTw.readingTime | 8 |
| blogPost/WEuNuhI85DeerGb0clUfTw.seo.metaDescription | Modern financial tech stack for businesses from 500K to 10M. Tool recommendations for accounting, cash flow, and forecasting. |
| blogPost/WEuNuhI85DeerGb0clUfTw.targetKeyword | CFO tool stack small business 2026 |
| blogPost/WEuNuhI85DeerGb0clUfTw.title.en | The CFO Tool Stack Every Growing Business Needs in 2026 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.0.style | h1 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.4.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.6.children.0.text | W-2 salary |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.6.children.1.text | — subject to payroll taxes (15.3% SE tax split between employer and employee) |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.9.children.2.text | exists specifically to prevent owners from paying themselves a $1 salary and taking everything as distributions to eliminate payroll tax. The law requires that your W-2 salary reflect what a reasonable, arm's-length employer would pay someone to perform your same role in the same market. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.10.children.2.text | If you own a $2M HVAC company and personally manage operations, run service calls, and handle sales — your reasonable compensation is very different from an owner who only handles board-level decisions and hired a GM to run day-to-day operations. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.11.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.18.children.1.text | — A $30K salary with $270K in distributions on a $300K profit is a red flag, regardless of market data |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.19.children.1.text | Form 1125-E (Compensation of Officers) |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.19.children.2.text | , which is required for S-Corps with more than $500K in gross receipts. Your numbers are visible—and they're compared against industry norms. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.20.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.23.children.0.text | Salary is less than 30–35% of total S-Corp net income |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.27.children.1.text | IRS Revenue Ruling 74-44 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.28.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.30.children.0.text | 1. Back payroll taxes |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.30.children.1.text | Both the employer and employee portions of FICA are assessed on the reclassified amount—that's 15.3% on the reclassified wages. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.31.children.0.text | 2. Interest |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.31.children.1.text | Accrues from the original due date on each quarter's underpayment—typically going back 3 years, sometimes more. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.32.children.0.text | 3. Accuracy-related penalties |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.32.children.1.text | 20% of the underpayment on top of the taxes and interest. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.33.children.0.text | 4. Failure-to-deposit penalties |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.33.children.1.text | If payroll taxes weren't deposited on time, an additional 2–15% penalty applies. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.34.children.2.text | An owner who took $200K in distributions annually for three years with a $40K salary — and whose reasonable compensation was later determined to be $100K — could face $90,000+ in back taxes, penalties, and interest across those three years. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.35.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.36.children.0.text | Step 1: Document Your Role |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.36.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.38.children.0.text | Step 2: Research Market Comparables |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.38.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.40.children.0.text | Step 3: Apply a Defensible Benchmark |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.40.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.41.children.1.text | at least 30–40% of total S-Corp net income (profit + salary) |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.42.children.0.text | Step 4: Be Consistent Year Over Year |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.42.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.44.children.0.text | Step 5: Work with a Tax Professional Who Knows S-Corps |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.44.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.46.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.53.children.0.text | $65,000–$110,000 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.56.children.0.text | $55,000–$90,000 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.59.children.0.text | $80,000–$150,000 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.62.children.0.text | $100,000–$180,000 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.65.children.0.text | $75,000–$130,000 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.66.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.68.children.0.text | Your W-2 salary is documented and reflects market rate for your role |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.71.children.0.text | Your salary is at least 30–40% of total S-Corp net income |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.73.children.0.text | Form 1125-E is accurately completed if your gross receipts exceed $500K. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.74.children.0.text | Your compensation strategy has been consistent across the past 2–3 years |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.75.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.77.children.1.text | Not officially—but a salary representing at least 30–40% of total net income (profit + salary) is widely considered defensible. Technical professionals with high market rates should lean higher. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.80.children.1.text | Not required, but recommended every 2–3 years for high-income S-Corps. A written compensation analysis prepared by a tax professional provides strong audit protection. |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.81.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUfoG.body.en.85.children.1.marks.0 | 63bda4fa392c |
| blogPost/WEuNuhI85DeerGb0clUfoG.coverImage.alt | S-Corp reasonable compensation audit map showing 5-step owner pay structure, audit trap warning, and six documentation factors including owner duties, industry benchmark, and market pay range |
| blogPost/WEuNuhI85DeerGb0clUfoG.faqItems.0.answer | The IRS will assess back payroll taxes (both employer and employee portions of FICA) on the reclassified amount, plus interest and accuracy-related penalties. In egregious cases, fraud penalties can apply. A 50,000 reclassification over three years can easily result in 15,000 to 25,000 in taxes, penalties, and interest. |
| blogPost/WEuNuhI85DeerGb0clUfoG.faqItems.1.answer | Your salary should reflect what a reasonable person would earn for performing the same services in your role. A common rule of thumb: your salary should be at least 30-40% of your total S-Corp earnings (salary + distributions). In technical fields with higher market compensation, this percentage should be higher. Document your role and compensation annually to build a defensible record. |
| blogPost/WEuNuhI85DeerGb0clUfoG.faqItems.2.answer | The IRS looks at Form 1125-E (Compensation of Officers), compares your salary to distributions ratio, and uses market data to evaluate whether your compensation is reasonable for your role and industry. They also use audit techniques that identify S-Corp owners with suspiciously low salary-to-distribution ratios. |
| blogPost/WEuNuhI85DeerGb0clUfoG.featuredImage.alt | S-Corp reasonable compensation audit map showing 5-step owner pay structure, audit trap warning, and six documentation factors including owner duties, industry benchmark, and market pay range |
| blogPost/WEuNuhI85DeerGb0clUfoG.lastReviewedAt | 2026-05-14T16:41:20.741Z |
| blogPost/WEuNuhI85DeerGb0clUfoG.publishedAt | 2026-05-25T16:41:00.000Z |
| blogPost/WEuNuhI85DeerGb0clUfoG.readingTime | 9 |
| blogPost/WEuNuhI85DeerGb0clUfoG.seo.keywords.3 | Form 1125-E |
| blogPost/WEuNuhI85DeerGb0clUfoG.targetKeyword | S-Corp reasonable compensation audit 2026 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.0.style | h1 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.3.children.0.text | Here's exactly how the FICA Tip Credit works in 2026, where restaurants lose it, and what to do to protect it. |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.4.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.5.children.1.text | FICA Tip Credit (Section 45B) |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.5.children.2.text | allows restaurant employers to claim a federal tax credit for FICA taxes paid on tips above the $5.15/hour minimum wage threshold. |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.7.children.0.text | You can claim 7.65% (the employer portion of FICA) on all qualifying tips above $5.15/hour per employee |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.9.children.0.text | For a QSR with 20 tipped employees working 30 hours/week at an average tip rate of $8/hour above minimum wage, the credit can be worth |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.9.children.1.text | $25,000–$40,000 per year per location |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.11.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.15.children.1.text | within 10 days of the end of each month (Form 4070 or electronic equivalent) |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.18.children.0.text | 2026 Update: What Changed Under IRS Notice 2024-79 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.18.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.20.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.21.children.1.text | as long as they capture the same information as a paper Form 4070 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.23.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.26.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.29.children.0.text | 4 Ways Restaurants Lose the FICA Tip Credit |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.29.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.30.children.0.text | ❌ 1. Tip Pooling Errors |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.30.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.32.children.0.text | ❌ 2. Using Federal-Only Minimum Wage Calculations in High-Wage States |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.32.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.33.children.0.text | If your state minimum wage exceeds $5.15/hour (which it does in most states), your offset calculation must account for it. Restaurants in California routinely overstate the credit using federal-only numbers. |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.34.children.0.text | ❌ 3. Reconstructed Year-End Records |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.34.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.36.children.0.text | ❌ 4. Missing Individual Employee Tip Tracking |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.36.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.38.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.44.children.0.text | Form 8846 is prepared using accurate, supporting documentation |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.46.style | h2 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.body.en.49.children.1.marks.0 | 2fb4f975d25c |
| blogPost/WEuNuhI85DeerGb0clUg6Y.faqItems.0.answer | The FICA Tip Credit allows restaurant employers to claim a credit for employer FICA taxes on tips above 5.15 per hour per employee. For a QSR with 20 tipped employees working 30 hours/week at an average tip rate of 8 per hour above minimum wage, the credit can be worth 25,000 to 40,000 per year per location. |
| blogPost/WEuNuhI85DeerGb0clUg6Y.faqItems.1.answer | The IRS requires contemporaneous records of tip reporting — records created at the time tips are received. Each employee must report tips in writing (paper Form 4070 or electronic equivalent) within 10 days of the end of the month in which they were received. Records must show the date, amount, and employee acknowledgment. |
| blogPost/WEuNuhI85DeerGb0clUg6Y.faqItems.2.answer | Yes, for tax years 2024-2028 the two credits can be stacked. The standard FICA Tip Credit and Section 45B are complementary but require separate tracking and documentation. Section 45B has its own compliance requirements that must be met in addition to standard tip credit rules. |
| blogPost/WEuNuhI85DeerGb0clUg6Y.faqItems.2.question | Can restaurant owners claim both the standard FICA Tip Credit and the Section 45B credit? |
| blogPost/WEuNuhI85DeerGb0clUg6Y.featuredImage.alt | FICA Tip Credit compliance checklist for QSR owners showing six steps including track cash tips, reconcile payroll, and prepare Form 8846 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.lastReviewedAt | 2026-05-14T16:41:20.741Z |
| blogPost/WEuNuhI85DeerGb0clUg6Y.publishedAt | 2026-05-27T16:41:00.000Z |
| blogPost/WEuNuhI85DeerGb0clUg6Y.readingTime | 10 |
| blogPost/WEuNuhI85DeerGb0clUg6Y.seo.keywords.3 | Section 45B credit |
| blogPost/WEuNuhI85DeerGb0clUg6Y.targetKeyword | restaurant FICA tip credit QSR tax strategy 2026 |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.0.children.0.text | If you've been in business as an LLC for a few years and you're consistently netting $80K or more, this is the article you didn't know you needed. |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.3.style | h2 |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.9.children.0.text | If your business nets $180,000 and you pay yourself a $65,000 salary, the remaining $115,000 is a distribution. You just saved 15.3% on $115,000. |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.10.style | h2 |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.15.children.0.text | 15.3% on ALL net profit |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.16.children.0.text | 15.3% on salary portion only |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.22.children.0.text | Payroll runs, S-Corp tax return (1120-S) |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.28.children.0.text | ~$80K net income and above |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.31.children.0.text | Established contractors netting $80K+ |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.32.children.1.text | Below $80K net, the S-Corp savings often don't outweigh the compliance cost. We won't recommend it unless it actually makes sense for your numbers. That's the standard we hold. |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.33.style | h2 |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.34.children.0.text | Utah conforms to federal S-Corp treatment. There's no separate Utah S-Corp tax — your pass-through income flows through to your personal return, same as an LLC. The state tax rate tops out at 4.85% on personal income, which is relatively low. |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.37.style | h2 |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.39.children.0.text | S-Corp elections have a filing window. To make the election for the current tax year, you must file Form 2553 with the IRS by the 15th day of the 3rd month after your tax year begins — which is |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.39.children.1.text | March 15 for calendar-year taxpayers |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.41.children.0.text | This means right now — in Q1 — is when contractors who want to make this election for 2026 need to be moving. Not April. Not December. Now. |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.43.style | h2 |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.body.en.44.children.0.text | [S-Corp Calculator — 90 seconds] |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.coverImage.alt | Industry guidance graphic for Utah contractors titled "S-Corp vs. LLC in Utah: Which Entity Structure Actually Saves You More as a Contractor?" with a subheading describing it as a comparison guide for general, specialized, and trade contractors in the Utah market. Features a contractor in a hard hat reviewing documents at a desk, with a Deberet-branded truck fleet visible through a window, surrounded by a 2026 contractor tax and finance guide and a coffee mug. UNT branding in the lower left corner. |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.excerpt.en | Been running as an LLC for a few years and netting $80K+? You might be leaving $15,000–$30,000 on the table every year. Here's the honest comparison — in dollars, not legalese. |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.featuredImage.alt | Industry guidance graphic for Utah contractors titled "S-Corp vs. LLC in Utah: Which Entity Structure Actually Saves You More as a Contractor?" with a subheading describing it as a comparison guide for general, specialized, and trade contractors in the Utah market. Features a contractor in a hard hat reviewing documents at a desk, with a Deberet-branded truck fleet visible through a window, surrounded by a 2026 contractor tax and finance guide and a coffee mug. UNT branding in the lower left corner. |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.publishedAt | 2026-04-08T15:12:00.000Z |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.readingTime | 7 |
| blogPost/a0402be4-a1bb-4aad-b1a7-7894285e6bda.seo.metaDescription | Running an LLC in Utah and netting $80K+? You may be leaving $15K–$30K on the table. See the honest S-Corp vs. LLC comparison. |
| teamMember/a12bba28-6091-437d-8956-50ce172bef82.description | Jason Astwood is a highly credentialed tax strategist and financial advisor who bridges the gap between complex tax law and holistic business growth. As an IRS Enrolled Agent with an MBA and advanced designations as a Financial Services Certified Professional (FSCP) and Life Underwriter Training Council Fellow (LUTCF), Jason provides a 360-degree view of business health that generalist CPAs simply cannot match. With over 15 years of experience, he specializes in building proactive tax strategies and S-Corp optimization systems that protect assets, minimize liability, and ensure his clients keep more of what they earn.Jason specializes in helping business owners minimize tax liability, optimize cash flow, and build long-term financial success. His combined expertise as a tax strategist, financial advisor, and Fractional CFO empowers entrepreneurs to scale their businesses with confidence. |
| teamMember/a12bba28-6091-437d-8956-50ce172bef82.socialHandles.linkedin | https://www.linkedin.com/in/jason-astwood-ea-lutcf%C2%AE-fscp%C2%AE-8337a476/ |
| teamMember/a12bba28-6091-437d-8956-50ce172bef82.yearsExperience | 15 |
| vslPage/a3ca8af3-db11-438a-ad49-e1398aee522d.ctaSubheadline.en | You have the revenue—now let’s secure the margins. If you generate $500k+ annually, apply for your strategy session today to fix your job costing, accurate your bids, and stabilize your cash flow. |
| vslPage/a3ca8af3-db11-438a-ad49-e1398aee522d.heroBadge.en | For Construction Companies Generating $500k+ Revenue |
| vslPage/a3ca8af3-db11-438a-ad49-e1398aee522d.seo.metaDescription | Blueprint for construction owners to slash taxes. Discover how S-Corps and Job Costing accounting can save you $20k+ annually. |
| vslPage/a3ca8af3-db11-438a-ad49-e1398aee522d.testimonial.quote.en | I’ve been in construction for 15 years. I thought my problem was that I needed more jobs. Jason and Chris showed me I was actually bleeding money on my biggest projects because my labor rates were off. They didn't just give me advice; they fixed my bidding calculator and standardized my crew's daily logs. We increased our net profit margin by 12% in just 4 months. |
| vslPage/a3ca8af3-db11-438a-ad49-e1398aee522d.urgencyText.en | Limited Availability: We only onboard 4 construction partners per month. |
| aboutPage/aboutPage.heroSubtitle.en | The only nationwide tax firm dedicated 100% to the construction industry. Combining aggressive S-Corp strategies with bulletproof IRS defense. |
| aboutPage/aboutPage.missionStatement.en | The tax code is 70,000 pages long. For most, it's a liability. For us, it's a blueprint. Our mission is to arm American contractors with the same high-level tax strategies used by Fortune 500 construction firms. |
| aboutPage/aboutPage.timeline.0.year | 2015 |
| aboutPage/aboutPage.timeline.1.year | 2018 |
| aboutPage/aboutPage.timeline.2.year | 2021 |
| aboutPage/aboutPage.timeline.3.description.en | Reached the milestone of helping our clients protect and optimize over $100M in taxable income. |
| aboutPage/aboutPage.timeline.3.title.en | $100M+ Optimized |
| aboutPage/aboutPage.timeline.3.year | 2024 |
| product/ac1ae1d7-7efd-436f-9ac7-1940da6a4580.editions.0.price | 59 |
| product/ac1ae1d7-7efd-436f-9ac7-1940da6a4580.editions.1.price | 39 |
| product/ac1ae1d7-7efd-436f-9ac7-1940da6a4580.editions.2.price | 29 |
| product/ac1ae1d7-7efd-436f-9ac7-1940da6a4580.editions.3.price | 27 |
| product/ac1ae1d7-7efd-436f-9ac7-1940da6a4580.fullDescription.0.children.0.text | “The 3M’s to Freedom” reveals a practical system for turning an owner‑dependent hustle into a scalable, wealth‑producing business that can run smoothly with or without you. Drawing on real‑world experience advising small business owners, Jason Astwood breaks success down into three core “M’s” that, when aligned, increase profits, stabilize cash flow, and free up your time. The book shows how to attract higher‑value clients consistently, price and position your offers for better margins, and install the processes, metrics, and people needed so your business no longer relies on your constant involvement. Designed as a straightforward playbook rather than theory, it gives you concrete tools, checklists, and action steps to build a business you can scale, step back from, or eventually sell on your terms. |
| product/ac1ae1d7-7efd-436f-9ac7-1940da6a4580.price | 29 |
| product/ac1ae1d7-7efd-436f-9ac7-1940da6a4580.rating | 5 |
| product/ac1ae1d7-7efd-436f-9ac7-1940da6a4580.title | The 3M’s to Freedom |
| pricingTier/ad14c3fb-555b-4748-9575-0a25c25712c3.bestFor.en | $1M–$3M revenue |
| pricingTier/ad14c3fb-555b-4748-9575-0a25c25712c3.price.en | $2,800 |
| pricingTier/b119a572-ebd3-4b57-ab4e-754e134ebda2.includes.en | 1120-S / 1065 / Complex LLC K-1s generation Compliance review EA audit protection |
| pricingTier/b119a572-ebd3-4b57-ab4e-754e134ebda2.price.en | $1,800 |
| service/b18b7b49-1b08-4e71-a327-e4c18f011bd0.eligibility.en | Tax planning consulting services are designed for business owners, independent contractors, real estate investors, and high-net-worth individuals generating over $500,000 in revenue who want to minimize their tax liabilities proactively before year-end, rather than merely reacting during tax season. |
| service/b18b7b49-1b08-4e71-a327-e4c18f011bd0.faq.1.question.en | What is included in the "3-Year Audit Protection" mentioned in the plan? |
| service/b18b7b49-1b08-4e71-a327-e4c18f011bd0.faq.2.answer.en | While we serve many clients, this service is specifically optimized for business owners (S-Corps, Real Estate investors, Construction) and high-net-worth individuals with complex income streams. If your tax situation involves more than just a single W-2, a strategic partnership usually pays for itself through identified savings. |
| service/b18b7b49-1b08-4e71-a327-e4c18f011bd0.pageSections.pricing.headline.en | From $1,800 |
| service/b18b7b49-1b08-4e71-a327-e4c18f011bd0.roadmap.0.duration.en | Step 1 |
| service/b18b7b49-1b08-4e71-a327-e4c18f011bd0.roadmap.1.duration.en | Step 2 |
| service/b18b7b49-1b08-4e71-a327-e4c18f011bd0.schema_faq.1.answer | Depending on the business structure and revenue, a dedicated tax planner can save a business anywhere from $10,000 to over $100,000 annually through entity optimization, accelerated depreciation, and advanced deductions. |
| service/b18b7b49-1b08-4e71-a327-e4c18f011bd0.startingPrice.en | From $1,800 |
| service/b2f7f14d-2acf-483f-a73e-78001d773956.roadmap.0.duration.en | Step 1 |
| service/b2f7f14d-2acf-483f-a73e-78001d773956.roadmap.1.duration.en | Step 2 |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.1.children.0.text | If you're an HVAC contractor pulling in $150K, $200K, $250K a year and watching a massive tax bill hit every April, you're not alone. You're also not helpless. |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.3.style | h2 |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.5.children.0.text | When you're a sole proprietor or single-member LLC, every dollar of net profit gets hit with 15.3% self-employment tax — before income tax even enters the picture. |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.6.children.0.text | Let's run the math on a $200,000 net profit year: |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.7.children.0.text | $200,000 net profit |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.8.children.0.text | × 15.3% self-employment tax = $30,600 |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.11.style | h2 |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.15.children.0.text | With an S-Corp, you pay yourself a reasonable salary — say $60,000 — and take the remaining $140,000 as distributions. Only the $60,000 salary is subject to self-employment tax. |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.16.children.0.text | The math on that same $200,000: |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.17.children.0.text | Salary portion: $60,000 × 15.3% = |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.17.children.1.text | $9,180 |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.18.children.0.text | Distribution portion: $140,000 × 0% SE tax |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.19.children.0.text | Your self-employment tax drops from $30,600 to $9,180 |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.20.children.0.text | That's $21,420 back in your pocket |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.22.style | h2 |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.25.children.0.text | Proactive tax strategy means we look at your business in January — before the year starts — and engineer your tax situation. We decide how to structure income, when to take distributions, whether to accelerate expenses, and what equipment purchases make sense before Q4. |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.27.style | h2 |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.28.children.0.text | If you're a contractor earning over $80K net and you've never had an S-Corp analysis done, there's a real chance you overpaid. |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.body.en.29.children.0.text | It takes 90 seconds to run the numbers. |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.coverImage.alt | Industry guidance graphic for HVAC business owners titled "Why Your HVAC Business Paid $30,000 More in Taxes Than Necessary This Year" with a subheading about identifying critical tax strategies, overlooked deductions, and proactive planning. Features an HVAC technician reviewing tax documents at a desk, surrounded by a 2026 HVAC Industry Tax & Finance Guide, a profits reclaimed display showing $30,000, and a checklist of HVAC tax savings strategies. UNT branding in the lower left corner. |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.featuredImage.alt | Industry guidance graphic for HVAC business owners titled "Why Your HVAC Business Paid $30,000 More in Taxes Than Necessary This Year" with a subheading about identifying critical tax strategies, overlooked deductions, and proactive planning. Features an HVAC technician reviewing tax documents at a desk, surrounded by a 2026 HVAC Industry Tax & Finance Guide, a profits reclaimed display showing $30,000, and a checklist of HVAC tax savings strategies. UNT branding in the lower left corner. |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.publishedAt | 2026-04-06T15:10:00.000Z |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.readingTime | 6 |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.seo.metaDescription | Running an HVAC business as an LLC? You may be overpaying by $20,000+ a year. Here's how an S-Corp election fixes it. |
| blogPost/b59f05f6-a179-4da7-acfd-5d866bbf42d3.title.en | Why Your HVAC Business Paid $30,000 More in Taxes Than Necessary This Year |
| pricingTier/b644edb7-1bf3-44ae-a49c-97db57fba835.price.en | $10,000+ |
| pricingTier/bab44e91-1390-4528-a195-a79c9bed6800.bestFor.en | W-2 / 1099 Filers |
| pricingTier/bab44e91-1390-4528-a195-a79c9bed6800.features.0.en | Federal + 1 state |
| pricingTier/bab44e91-1390-4528-a195-a79c9bed6800.features.4.en | 3-Year Audit protection |
| pricingTier/bab44e91-1390-4528-a195-a79c9bed6800.includes.en | Federal + 1 state E-file • Secure portal EA review Audit protection |
| pricingTier/bab44e91-1390-4528-a195-a79c9bed6800.price.en | $595 |
| vslPage/be663db3-28db-402c-936e-9cb8ffde974c.ctaSubheadline.en | You have the revenue—now let’s secure the profit. If you generate $500k+ annually, apply for your strategy session today to identify exactly where your margins are leaking and how to fix them. |
| vslPage/be663db3-28db-402c-936e-9cb8ffde974c.heroBadge.en | For Restaurants Generating $500k+ Annual Revenue |
| vslPage/be663db3-28db-402c-936e-9cb8ffde974c.testimonial.quote.en | I thought my problem was food costs or bad luck. The truth was I didn't have a system. The Kitchen Command Center didn't just give me advice; they installed the financial controls and kitchen workflows I was missing. We cut labor costs by 8% in the first 90 days and I finally know exactly where my profit is coming from. |
| blogSettings/blogSettings.heroSubtitle | Small Business Tax, Cash Flow & 2026 Financial Strategy |
| blogSettings/blogSettings.postsPerPage | 9 |
| blogSettings/blogSettings.seo.keywords.3 | tax planning 2026 |
| blogSettings/blogSettings.seo.metaDescription | Expert tax planning, S-Corp strategies, and fractional CFO advice to help business owners build wealth and stay compliant in 2026. |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.0.children.0.text | 🚨 ATTENTION Construction Business Owners: Your Schedule K-1 Just Got an Upgrade |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.0.style | h1 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.1.children.0.text | The IRS is watching closer than ever. If you run your construction business as a partnership or LLC, the new 2026 tax season brings changes you need to understand—NOW. |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.2.style | h2 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.3.children.0.text | The IRS has added NEW codes to Box 19 of your Schedule K-1: |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.7.style | h2 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.8.children.0.text | If you're a general contractor, subcontractor, or construction LLC owner, you likely operate as a partnership or S-corp for tax purposes. These new K-1 codes mean: |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.12.style | h2 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.13.children.0.text | 1. Review Your Partnership Agreement |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.13.style | h3 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.15.children.0.text | 2. Document Everything |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.15.style | h3 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.17.children.0.text | 3. Consult a Pro |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.17.style | h3 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.19.style | h2 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.body.en.20.children.0.text | The IRS isn't targeting construction specifically—but they ARE paying attention to how partnership profits move. If you're not reporting correctly, 2026 is the year they'll notice. |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.excerpt.en | The IRS is watching closer than ever. If you run your construction business as a partnership or LLC, the new 2026 tax season brings changes you need to understand—NOW. |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.keywords.0 | schedule k-1 changes 2026 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.keywords.2 | IRS box 19 k-1 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.metaDescription | New IRS Box 19 Schedule K-1 codes could increase scrutiny on distributions and related-party activity. Here's what construction business owners need to know for 2026. |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.metaTitle | Schedule K-1 Changes for Construction Business Owners in 2026 \| Union National Tax |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.publishedAt | 2026-03-20T16:05:00.000Z |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.readingTime | 4 |
| blogPost/blogpost-schedule-k-1-changes-2026-construction-business-owners.title.en | Construction Business Owners: Your Schedule K-1 Just Got an Upgrade |
| product/c019a1fd-342e-4fbb-bc6c-57e58505715f.editions.0.price | 59 |
| product/c019a1fd-342e-4fbb-bc6c-57e58505715f.editions.1.price | 39 |
| product/c019a1fd-342e-4fbb-bc6c-57e58505715f.editions.2.price | 29 |
| product/c019a1fd-342e-4fbb-bc6c-57e58505715f.editions.3.price | 27 |
| product/c019a1fd-342e-4fbb-bc6c-57e58505715f.price | 29 |
| product/c019a1fd-342e-4fbb-bc6c-57e58505715f.rating | 5 |
| pricingTier/c107e904-dc4f-4fda-bf7b-7e13adce9f4e.price.en | $200+ per state |
| faq/caf04ecc-5c0a-4719-8e72-20567fcf900c.answer.0.children.0.text | Yes—Union National Tax serves clients nationwide in all 50 states through a secure, virtual-first process. Onboarding typically follows Discovery → Strategy → Implementation → Ongoing Reviews, supported by video consultations and a secure digital portal for document uploads and signatures. |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.2.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.3.children.3.text | Schedule SE (Form 1040) |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.12.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.13.children.1.text | net earnings from self-employment are $400 or more |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.19.children.0.text | a consultant paid on 1099s |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.21.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.27.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.33.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.35.children.0.text | For 2026, IRS materials show the Social Security wage base is |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.35.children.1.text | $184,500 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.41.children.0.text | Report the result with your Form 1040 filing. |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.42.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.43.children.2.text | on your Form 1040. That does |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.46.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.47.children.3.text | Form 1040-ES |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.49.children.0.text | April 15 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.49.children.1.text | for income earned January 1 through March 31 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.50.children.0.text | June 15 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.50.children.1.text | for income earned April 1 through May 31 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.51.children.0.text | September 15 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.51.children.1.text | for income earned June 1 through August 31 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.52.children.0.text | January 15 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.52.children.1.text | of the following year for income earned September 1 through December 31 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.54.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.56.children.0.text | 1. Not setting aside enough money |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.56.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.58.children.0.text | 2. Forgetting quarterly payments |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.58.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.60.children.0.text | 3. Mixing personal and business expenses |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.60.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.62.children.0.text | 4. Assuming side income does not count |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.62.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.63.children.0.text | The IRS threshold for self-employment tax can be lower than many people expect. Net earnings of $400 or more can trigger self-employment tax. |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.64.children.0.text | 5. Not getting help early |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.64.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.66.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.77.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.87.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.88.children.3.text | $400 or more |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.92.style | h2 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.93.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.95.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.96.children.1.text | $400 or more |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.97.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.99.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.101.style | h3 |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.body.en.102.children.2.text | when figuring adjusted gross income on your Form 1040. |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.coverImage.alt | Blog post card for "UNT Accounting" titled "Self-Employment Tax Explained for Freelancers and Owners." The background features a warm orange-to-deep-maroon gradient with subtle geometric line patterns. At the center is a stylized illustration of two people—a man with a laptop and a woman with a clipboard—both with blank faces. Surrounding them are floating business icons: a lightbulb, a calculator, an art palette, and a storefront. Below the title, white subtext outlines a guide for independent workers. A pink "Read More →" button is centered at the bottom, with a blue "How To" tag in the bottom-left and the date "March 2026" in the bottom-right. |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.featuredImage.alt | Blog post card for "UNT Accounting" titled "Self-Employment Tax Explained for Freelancers and Owners." The background features a warm orange-to-deep-maroon gradient with subtle geometric line patterns. At the center is a stylized illustration of two people—a man with a laptop and a woman with a clipboard—both with blank faces. Surrounding them are floating business icons: a lightbulb, a calculator, an art palette, and a storefront. Below the title, white subtext outlines a guide for independent workers. A pink "Read More →" button is centered at the bottom, with a blue "How To" tag in the bottom-left and the date "March 2026" in the bottom-right. |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.publishedAt | 2026-03-25T15:18:00.000Z |
| blogPost/cc8edde3-b758-4482-b892-7f56c853ea09.readingTime | 8 |
| testimonial/cd226a8d-98bb-4a67-a61a-68ef8f63cc78.rating | 5 |
| pricingTier/cf520b81-a3c4-48ea-886b-9cc877af7e62.price.en | $650+ |
| contactSettings/contactSettings.contactPhone | (385) 425-5410 |
| contactSettings/contactSettings.founder.credentials.2.en | 15+ Years Exp |
| contactSettings/contactSettings.heroStats.clients | 5000 |
| contactSettings/contactSettings.heroStats.responseTime | 1 Hour |
| contactSettings/contactSettings.heroStats.savings | $2.3B |
| contactSettings/contactSettings.officeAddress.street | 285 E 950 S |
| contactSettings/contactSettings.officeAddress.zip | 84058 |
| contactSettings/contactSettings.officeHours.0.hours | 9:00am – 5:00pm |
| contactSettings/contactSettings.officeHours.1.hours | 9:00am – 5:00pm |
| contactSettings/contactSettings.officeHours.2.hours | 9:00am – 5:00pm |
| contactSettings/contactSettings.officeHours.3.hours | 9:00am – 5:00pm |
| contactSettings/contactSettings.officeHours.4.hours | 9:00am – 5:00pm |
| contactSettings/contactSettings.seo.metaDescription | Take the first step toward tax efficiency. Schedule your free 15-minute strategy discovery call to uncover immediate tax savings. |
| pricingTier/d946122d-353e-46f3-b3a0-15f413b6ccf1.price.en | $750 – $1,500 / year |
| product/d9a1775b-6369-4f6e-b2a6-38dbfaa3c945.editions.0.price | 59 |
| product/d9a1775b-6369-4f6e-b2a6-38dbfaa3c945.editions.1.price | 39 |
| product/d9a1775b-6369-4f6e-b2a6-38dbfaa3c945.editions.2.price | 29 |
| product/d9a1775b-6369-4f6e-b2a6-38dbfaa3c945.editions.3.price | 27 |
| product/d9a1775b-6369-4f6e-b2a6-38dbfaa3c945.price | 29 |
| product/d9a1775b-6369-4f6e-b2a6-38dbfaa3c945.rating | 5 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.0.children.0.text | Tax deductions are the single most powerful tool individual taxpayers have to legally reduce what they owe the IRS — but most people only scratch the surface of what's available to them. In 2026, the landscape shifted significantly. The One Big Beautiful Bill Act (OBBBA), signed into law on July 4, 2025, introduced several brand-new deductions for individuals while expanding existing ones. Whether you take the standard deduction or itemize, this guide covers every deduction worth knowing — including several that may be completely new to you this year.​ |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.1.children.0.text | Step 1: Standard vs. Itemized — Know Your Starting Point |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.1.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.3.children.0.text | 2026 Standard Deduction Amounts |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.3.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.4.children.0.text | The IRS increased standard deduction amounts for tax year 2026:​ |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.6.children.0.text | 2026 Standard Deduction |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.8.children.0.text | $16,100 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.10.children.0.text | $32,200 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.12.children.0.text | $24,200 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.14.children.0.text | Step 2: Brand-New Deductions in 2026 (Don't Miss These) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.14.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.16.children.0.text | No-Tips Tax Deduction (Up to $25,000) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.16.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.17.children.1.text | up to $25,000 in qualified tip income |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.17.children.2.text | from their taxable income. The deduction phases out once gross income exceeds $150,000 for single filers or $300,000 for joint filers. |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.18.children.0.text | Overtime Pay Deduction (Up to $12,500 / $25,000) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.18.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.19.children.1.text | $12,500 in qualified overtime pay |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.19.children.2.text | ($25,000 for joint filers) from their taxable income. The same $150,000/$300,000 phase-out thresholds apply. Both the tip and overtime deductions are temporary, running |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.19.children.3.text | 2025 through 2028 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.20.children.0.text | Senior Bonus Deduction ($6,000) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.20.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.21.children.1.text | 65 and older |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.21.children.3.text | $6,000 deduction |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.22.children.0.text | Car Loan Interest Deduction (Up to $10,000) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.22.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.23.children.1.text | up to $10,000 in qualified interest |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.23.children.2.text | on loans for new passenger vehicles purchased in the U.S.. This deduction makes buying American-made vehicles significantly more tax-advantaged in 2026.​ |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.24.children.0.text | Charitable Deduction Without Itemizing (Up to $1,000 / $2,000) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.24.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.25.children.0.text | Previously, you could only deduct charitable contributions if you itemized. Starting in 2026, even standard deduction filers can claim |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.25.children.1.text | up to $1,000 in charitable donations |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.25.children.2.text | ($2,000 for joint filers) as an above-the-line deduction. |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.26.children.0.text | Step 3: Above-the-Line Deductions (Everyone Qualifies) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.26.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.28.children.0.text | Key above-the-line deductions available in 2026: |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.29.children.1.text | — Up to $7,000 ($8,000 if age 50+); deductibility phases out if you have a workplace retirement plan​ |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.30.children.1.text | — Up to $4,300 for self-only coverage, $8,550 for family coverage; plus $1,000 catch-up contribution if age 55+​ |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.31.children.1.text | — Up to $2,500 in interest paid on qualified student loans |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.32.children.1.text | — 100% of premiums paid for yourself and your family if self-employed |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.33.children.1.text | (pre-2019 divorce agreements) — Deductible for the payer if your divorce was finalized before January 1, 2019 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.34.children.1.text | — Up to $300 for eligible K–12 teachers who pay out-of-pocket classroom expenses |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.35.children.0.text | SEP-IRA / SIMPLE IRA / Solo 401(k) contributions |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.36.children.0.text | Step 4: Itemized Deductions Worth Knowing |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.36.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.37.children.0.text | If your total qualifying expenses exceed your standard deduction, itemizing can save you significantly more. Here are the most impactful itemized deductions for 2026: |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.38.children.0.text | SALT Deduction — Now $40,000 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.38.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.39.children.1.text | $40,000 per year |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.39.children.2.text | (up from the previous $10,000 cap). The phase-out begins at a MAGI of $505,000, dropping to a hard floor of $10,000 for the highest earners. This is one of the biggest wins for homeowners and residents of high-tax states like California, New York, and New Jersey. |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.40.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.41.children.1.text | $750,000 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.41.children.2.text | in principal. If your mortgage was originated before December 15, 2017, the limit is $1,000,000. For most homeowners, mortgage interest plus property taxes alone can push itemized deductions above the standard deduction threshold.​ |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.42.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.43.children.1.text | 7.5% of your AGI |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.44.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.45.children.1.text | 60% of your AGI |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.45.children.3.text | 30% of AGI |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.46.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.47.children.0.text | Losses from federally declared disasters may be deductible when they exceed 10% of AGI plus $100. Given increased natural disaster activity in recent years, this is worth noting for residents in disaster-prone areas.​ |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.48.children.0.text | Step 5: Retirement Contributions — The Highest-ROI Deduction |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.48.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.51.children.0.text | 2026 Contribution Limit |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.52.children.0.text | Catch-Up (Age 50+) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.53.children.0.text | 401(k) / 403(b) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.54.children.0.text | $24,500 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.55.children.0.text | +$7,500 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.57.children.0.text | $7,000 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.58.children.0.text | +$1,000 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.60.children.0.text | 25% of compensation (max $70,000) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.63.children.0.text | $4,300 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.64.children.0.text | +$1,000 (Age 55+) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.66.children.0.text | $8,550 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.67.children.0.text | +$1,000 (Age 55+) |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.69.children.0.text | Step 6: Don't Overlook Education & Dependent Deductions |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.69.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.70.children.1.text | — Up to $2,500 per eligible student for the first four years of higher education; 40% is refundable |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.71.children.1.text | — Up to $2,000 per return for qualified tuition and related expenses |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.72.children.0.text | 529 Plan contributions |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.73.children.1.text | — Credit (not deduction) for up to $3,000 in care expenses per child, $6,000 for two or more children |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.74.children.0.text | Strategy: Should You Itemize or Take the Standard Deduction in 2026? |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.74.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.76.children.0.text | Own a home with a mortgage above $300,000 and pay significant property taxes |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.77.children.0.text | Live in a high-tax state and your SALT liability alone approaches $40,000 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.80.children.0.text | Paid substantial mortgage interest + SALT + charitable donations totaling more than $16,100 (single) or $32,200 (joint)​ |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.87.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.94.children.1.text | under pre-2019 divorce agreements |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.96.style | h2 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.body.en.98.children.0.text | [Schedule Your Free 2026 Tax Strategy Session →] |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.excerpt.en | In 2026, the One Big Beautiful Bill Act introduced brand-new deductions most individuals don't know about — including a $25,000 tip income deduction, a $40,000 SALT cap, and a $6,000 senior bonus deduction. Whether you take the standard deduction or itemize, this complete guide covers every tax deduction available to individuals so you can legally keep more of what you earn. |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.keywords.0 | tax deductions for individuals 2026 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.keywords.1 | SALT deduction 2026 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.keywords.3 | standard vs itemized deduction 2026 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.keywords.5 | new tax deductions 2026 OBBBA |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.metaDescription | Learn how to maximize every tax deduction available to individuals in 2026 — from the new tips & overtime deductions to SALT, mortgage interest, and retirement contributions. |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.metaTitle | Maximizing Tax Deductions in 2026: A Complete Guide for Individuals |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.publishedAt | 2026-03-18T15:10:00.000Z |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.readingTime | 9 |
| blogPost/da44102d-4d17-4304-ad3c-e6912f3de507.title.en | Maximizing Tax Deductions in 2026: A Complete Guide for Individuals |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.2.style | h2 |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.9.style | h2 |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.12.children.1.text | We identify the 5–7 numbers in your business that actually tell you if you're winning or losing — not vanity metrics, not gut feelings. Revenue is not a KPI. Margin is. Days sales outstanding is. Customer acquisition cost vs. lifetime value is. |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.13.children.1.text | You want to raise prices? We'll model the customer loss rate, the margin improvement, and tell you the exact price point where you're better off even if you lose 20% of customers. Usually it's higher than you think. |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.16.style | h2 |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.18.children.0.text | You're doing $500K+ in revenue and flying blind. |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.23.style | h2 |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.25.children.0.text | Ranges vary by scope and complexity, but here's the honest frame: most small business engagements that move the needle deliver ROI within 60–90 days of the first major decision made with better financial clarity. |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.27.children.0.text | A pricing decision that adds 3–5 points of margin on $800K revenue = $24,000–$40,000 in additional profit |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.28.children.0.text | A cash flow model that prevents a credit line draw at 12% interest during a slow quarter |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.29.children.0.text | A tax strategy alignment that shifts $50K of income into a lower-tax quarter via timing |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.body.en.31.style | h2 |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.lastReviewedAt | 2026-05-13T19:33:00.000Z |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.publishedAt | 2026-04-10T15:17:00.000Z |
| blogPost/e5732514-ea10-4c7a-92f7-6bf2c500fbdf.readingTime | 8 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.0.children.0.text | If you are a profitable sole proprietor or single‑member LLC, 2026 is the year to re‑check whether your current setup still makes tax sense. With the One Big Beautiful Bill Act making the QBI deduction permanent and expensing rules more generous, an S‑corp election can cut self‑employment taxes—but only if your numbers and salary strategy truly support it. |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.1.children.0.text | This guide walks through when a move from sole prop to S‑corp is worth exploring, how the 2026 rules shape that decision, and what to watch so you do not swap one set of headaches for another. |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.2.children.0.text | Sole prop vs. S‑corp: 2026 basics |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.2.style | h2 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.3.children.2.text | , your net business profit is generally subject to both income tax and the full 15.3% self‑employment tax. It is simple and flexible, but as profits climb, the payroll tax bill climbs right alongside them. |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.8.style | h2 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.10.children.0.text | Rules of thumb for 2026: |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.11.children.1.text | $60,000 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.12.children.1.text | $60,000–$150,000+ |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.14.children.0.text | How 2026 QBI rules factor in |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.14.style | h2 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.15.children.2.text | of up to 20% of qualified business income is now permanent and still applies to qualifying pass‑through businesses such as sole props, S‑corps, and many LLCs. That matters because both structures can qualify; the difference is how salary interacts with QBI. |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.18.children.1.text | , so shifting some profit from wages to distributions can increase the slice that gets the 20% deduction. |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.24.style | h2 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.31.style | h2 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.37.children.0.text | Quick 2026 S‑corp checklist |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.37.style | h2 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.39.children.1.text | $60,000–$80,000 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.42.children.0.text | You want to proactively manage self‑employment tax and take full advantage of 2026’s permanent QBI framework. |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.body.en.43.children.3.text | 2026 S‑corp |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.coverImage.alt | Vector illustration of a digital tablet on a desk displaying a '2026 Entity Choice Checkup.' The 'S-Corp' option is checked in bright teal, highlighting it as the recommended structure over 'Sole Prop' and 'LLC.' Subtle background icons represent QBI protection and pass-through tax savings. |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.excerpt.en | Thinking about an S‑corp election in 2026? Learn when a profitable sole prop should switch, how QBI and reasonable salary work, and when the added complexity actually pays off. |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.featuredImage.alt | Vector illustration of a digital tablet on a desk displaying a '2026 Entity Choice Checkup.' The 'S-Corp' option is checked in bright teal, highlighting it as the recommended structure over 'Sole Prop' and 'LLC.' Subtle background icons represent QBI protection and pass-through tax savings. |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.publishedAt | 2026-02-16T17:00:00.000Z |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.readingTime | 5 |
| blogPost/ea2c3d37-52c8-49c4-9fff-d13451447833.title.en | 2026 Entity Choice Checkup: When a Sole Prop Should Switch to an S‑Corp Under the New Rules |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.eligibility.en | The S-Corp strategy is ideal for growth-minded business owners, contractors, and real estate operators who are currently taxed as sole proprietors or single-member LLCs and are generating at least $80,000 in net profit. If you are paying standard 15.3% self-employment tax on your entire net income, your current structure is costing you money. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.faq.0.answer.en | While savings vary, a business netting $100,000 annually can often save between $7,000 and $9,000 per year in self-employment taxes by electing S-corp status and implementing a strategic, reasonable compensation split. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.faq.1.answer.en | We generally advise evaluating an S-Corp election once your business consistently nets $80,000 or more in profit. At this threshold, the tax savings typically outpace the added costs of payroll administration and corporate tax returns. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.faq.2.answer.en | The IRS requires S-Corp owners who work in the business to pay themselves a W-2 salary that matches what it would cost to hire someone for their duties. The remaining profit can then be taken as distributions, which are exempt from self-employment tax. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.fullDescription.en.0.children.0.text | Most business owners operating as sole proprietors or single-member LLCs are leaving thousands of dollars on the table every year. As your revenue scales, so does your 15.3% self-employment tax burden. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.fullDescription.en.4.children.0.text | Preparation and filing of IRS Form 2553 (S-Corp Election) |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.icon | Building2 |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.impactGoal.en | Save $15k+ annually by restructuring how you pay yourself. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.keyBenefit.en | Legally bypass the 15.3% self-employment tax on your business distributions. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.pageSections.closing.description.en | Save $15k+ annually by restructuring how you pay yourself. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.roadmap.0.duration.en | Step 1 |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.roadmap.1.duration.en | Step 2 |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.schema_faq.0.answer | The primary tax advantage of an S-Corp is the ability to bypass the 15.3% self-employment tax on a portion of the company's profits. Owners pay themselves a reasonable W-2 salary (subject to payroll taxes) and take the remaining profits as distributions, which are free from self-employment tax. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.schema_faq.1.answer | A common threshold is $80,000 in net profit. Below this amount, the administrative costs of running an S-Corp—such as payroll processing and filing a corporate tax return—may outweigh the self-employment tax savings. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.schema_faq.2.answer | Yes, an existing Limited Liability Company (LLC) can elect to be taxed as an S-Corporation by filing IRS Form 2553. This changes how the IRS taxes the entity without changing your state-level legal LLC structure. |
| service/f00389cd-eab4-4c88-b91f-5253af17ecbc.targetAudience | Profitable service businesses netting $80,000+ annually. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.0.children.0.text | Let's be honest: 2026 is not a forgiving year to run a restaurant. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.1.children.1.text | more than 35% above pre-pandemic levels |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.1.children.2.text | . Labor costs have risen nearly 10% since 2020. Food-away-from-home prices are expected to climb another 3.3% this year — and |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.1.children.3.text | 42% of restaurant operators reported their business was not profitable last year |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.3.children.0.text | ⚠️ Note: The statistics in this guide are sourced from the National Restaurant Association's 2026 State of the Industry Report, USDA Food Price Outlook, and Bureau of Labor Statistics data. Every restaurant is different — use these strategies as a starting framework and adapt them to your specific operation. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.4.style | h2 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.5.children.0.text | Before you can fix a margin problem, you need to understand exactly what's squeezing it. In 2026, the pressure is coming from five directions simultaneously: |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.6.children.1.text | — Up 35%+ from pre-pandemic levels. Expected to rise another 3.3% in 2026. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.7.children.1.text | — QSR labor now averages 25% of revenue. Full-service climbs to 36.5%. Both are trending up, with 89% of operators expecting continued wage increases. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.8.children.1.text | — More than 9 in 10 operators cite these as significant cost challenges alongside food and labor. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.9.children.1.text | — Delivery now costs diners nearly 80% more than pickup, driving a 12% drop in delivery orders and a 14% increase in pickup — squeezing operator margins on third-party orders. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.10.children.1.text | — Real sales growth is forecast at just 1.3% in 2026. Operators can't volume their way out of a margin problem this year. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.11.children.1.text | 70% of a restaurant's total expenses |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.12.children.0.text | Strategy 1: Engineer Your Menu for Profit, Not Just Variety |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.12.style | h2 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.13.children.0.text | Most restaurant owners built their menu around what they love to cook or what customers have historically ordered. In 2026, that approach is quietly killing margins. Menu engineering — the practice of analyzing each item's profitability against its popularity — is one of the highest-leverage moves an operator can make without spending a dollar on marketing. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.19.children.0.text | A real-world example: a 60-seat Oakland restaurant implemented menu engineering in late 2025 — cutting 8 Dogs, repricing 6 Plowhorses by an average of $2.25, and repositioning 3 Puzzles. Within 90 days, food cost dropped from 34% to 31%, average check increased by $3.80, and net margin grew from 4.1% to 7.3%. No new marketing. No new customers. Just a smarter menu. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.20.children.0.text | Strategy 2: Renegotiate Supplier Relationships — Now |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.20.style | h2 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.23.children.0.text | Audit your top 20 ingredients by spend. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.23.children.1.text | These likely account for 80% of your food cost. Focus negotiation energy here, not across your entire inventory. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.25.children.1.text | Negotiate fixed pricing for 90–180 days on proteins, oils, and staple produce where possible — predictability protects margins as well as low pricing does. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.26.children.1.text | Case pricing typically runs 8–15% lower than split-case pricing. Adjust par levels and storage to accommodate. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.28.children.0.text | Strategy 3: Control Labor Cost Without Killing Your Team |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.28.style | h2 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.30.children.0.text | The highest-impact changes operators are making in 2026: |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.31.children.1.text | Pull your hourly POS data and map it against your schedule. Most operators are overstaffed in the hour before and after peak and understaffed at peak itself — a schedule built around real traffic data can cut 15–20 labor hours per week without touching service quality. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.32.children.1.text | An employee who can run the register, prep, and cover a station is worth 40% more operationally than a single-skilled hire. Cross-training also improves retention because employees feel more invested. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.35.children.0.text | Strategy 4: Price Strategically, Not Reactively |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.35.style | h2 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.36.children.0.text | After five consecutive years of price increases, consumers in 2026 are acutely aware of restaurant pricing — and many have pulled back. But that doesn't mean you can't raise prices. It means you need to raise the |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.38.children.1.text | A combo meal priced at $12.99 feels like value to the customer even when the individual items total $11.50 — and bundles steer customers toward your higher-margin items naturally. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.41.children.0.text | Strategy 5: Attack Waste Before You Cut Staff |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.41.style | h2 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.42.children.1.text | 4–10% of its food revenue to waste |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.43.children.1.text | Even a simple whiteboard log of what gets thrown out each day creates awareness that reduces waste by 20–30% on its own. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.44.children.1.text | Inconsistent portioning is invisible to customers but devastating to food cost. A 10% portion overrun on a high-volume item can cost thousands per month. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.47.children.0.text | Strategy 6: Own the Digital Channel Before the Platforms Do |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.47.style | h2 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.48.children.0.text | Third-party delivery apps charge 15–30% commission on every order — and they own the customer relationship, not you. In 2026, every order that comes through a third-party platform instead of your own ordering system is a margin leak. The operators protecting their margins most aggressively are investing in direct digital channels. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.49.children.1.text | A branded online order page costs far less per month than the commissions you're paying platforms. Even converting 20% of your delivery orders to direct orders meaningfully improves margin. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.52.style | h2 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.53.children.0.text | Protecting your restaurant's margin in 2026 isn't about one big change — it's about running tighter systems in every corner of your operation simultaneously. Operators who survive the current environment aren't necessarily the ones with the best food or the most foot traffic. They're the ones who know their numbers, engineer their menus intentionally, and treat every dollar of waste and inefficiency as the profit it could be. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.56.children.2.marks.1 | a8e846cb8fbd |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.body.en.57.children.0.text | Sources: National Restaurant Association 2026 State of the Industry Report; USDA Food Price Outlook 2026; Bureau of Labor Statistics Producer Price Index; UC Santa Cruz Fast Food Minimum Wage Study, March 2026. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.excerpt.en | Food costs are 35% above pre-pandemic levels. Labor is still climbing. 42% of restaurant operators weren't profitable last year. Here are the six margin protection strategies QSR and independent restaurant owners are using to stay in the black in 2026. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.publishedAt | 2026-04-01T17:10:00.000Z |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.readingTime | 7 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.seo.keywords.1 | menu engineering 2026 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.seo.keywords.2 | restaurant food costs 2026 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.seo.keywords.5 | how to protect restaurant margins 2026 |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.seo.metaDescription | Food costs are up 35%, and labor keeps rising. Learn how restaurant and QSR owners are protecting margins and staying profitable in 2026. |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.seo.metaTitle | 2026 Restaurant Survival Guide: Protect Your Margins |
| blogPost/f16ce884-6b26-4418-b836-1cac75ee3687.title.en | The 2026 Restaurant Survival Guide: How to Protect Your Margins When Everything Costs More |
| pricingTier/f2ca9032-8297-4e2d-8bff-b0724baa5f4b.features.2.en | 3-Year Audit Protection |
| pricingTier/f2ca9032-8297-4e2d-8bff-b0724baa5f4b.price.en | $3,500+ |
| pricingTier/ffbdf1ec-8121-492b-b89e-bfc635395140.includes | Everything above Schedule C (1 business) or Schedule E (up to 2 rentals) Depreciation Review |
| pricingTier/ffbdf1ec-8121-492b-b89e-bfc635395140.price | $995 |
| blogPost/g0IfLMaaBm3290uqwL8CNh.body.en.2.children.0.text | An S-Corp election changes this dynamic. When you file Form 2553 to elect S-Corp status, your LLC (or corporation) becomes a pass-through entity for income tax purposes—but with a crucial twist. You must pay yourself a reasonable salary, which is subject to payroll taxes. Any additional profits can be taken as distributions, which are NOT subject to payroll taxes. |
| blogPost/g0IfLMaaBm3290uqwL8CNh.body.en.4.children.0.text | Imagine you run a consulting business with $250,000 in net profit. As a single-member LLC (sole proprietorship), you'd pay self-employment tax of 15.3% on the entire $250,000—that's $38,250. Add your income tax, and your total tax burden is substantial. |
| blogPost/g0IfLMaaBm3290uqwL8CNh.body.en.5.children.0.text | As an S-Corp, you pay yourself a reasonable salary of $100,000, which is subject to payroll taxes of $15,300. The remaining $150,000 flows to you as distributions, free from payroll taxes. You've just saved $22,950 in self-employment tax alone. |
| blogPost/g0IfLMaaBm3290uqwL8CNh.body.en.7.children.0.text | First, S-Corps require more formalities. You need to hold regular shareholder meetings, maintain corporate minutes, file separate tax returns (Form 1120-S), and run payroll—even if you're the only employee. These requirements add complexity and accounting costs. |
| blogPost/g0IfLMaaBm3290uqwL8CNh.body.en.9.children.0.text | Third, S-Corps make less sense at lower income levels. The additional compliance costs might exceed the tax savings if your profit is below $80,000-$100,000. The break-even point depends on your specific situation, but as a general rule, S-Corp elections become advantageous when net profits exceed six figures. |
| blogPost/g0IfLMaaBm3290uqwL8CNh.body.en.12.children.0.text | The choice between LLC and S-Corp ultimately comes down to your profit level, desired lifestyle, and willingness to handle added compliance. If you're earning under $80,000 in net profit, the default LLC taxation probably makes the most sense. Above that threshold, especially above $100,000, an S-Corp election can produce significant tax savings that more than compensate for the added complexity. |
| blogPost/g0IfLMaaBm3290uqwL8CNh.faqItems.1.answer | On $250,000 net profit, an S-Corp with a $100,000 salary could save approximately $22,950 in self-employment taxes compared to a single-member LLC taxed as a sole proprietorship. |
| blogPost/g0IfLMaaBm3290uqwL8CNh.faqItems.1.question | How much can I save with S-Corp vs LLC on $250,000 profit? |
| blogPost/g0IfLMaaBm3290uqwL8CNh.faqItems.2.answer | S-Corps must file Form 1120-S annually, run payroll (even for owner-employees), hold regular shareholder meetings, maintain corporate minutes, and issue W-2s to employees. |
| blogPost/g0IfLMaaBm3290uqwL8CNh.faqItems.3.answer | S-Corp election typically becomes beneficial when net profits exceed $80,000-$100,000 annually, as the tax savings begin to outweigh the added compliance complexity and costs. |
| blogPost/g0IfLMaaBm3290uqwL8CNh.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/g0IfLMaaBm3290uqwL8CNh.publishedAt | 2026-04-22T19:20:00.000Z |
| blogPost/g0IfLMaaBm3290uqwL8CNh.readingTime | 4 |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.body.en.0.children.0.text | If you're a 1099 contractor, you're likely leaving thousands of dollars in deductions on the table. The tax code is complex, and most self-employed professionals simply don't know all the expenses they can legally deduct. This guide covers the most commonly overlooked write-offs that can reduce your tax bill significantly. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.body.en.1.children.0.text | First, understand the basic rule: to deduct a business expense, it must be ordinary and necessary for your work. "Ordinary" means it's something commonly accepted in your field. "Necessary" means it's helpful and appropriate for your business. You don't need to be 100% certain the expense will be allowed—a reasonable belief is sufficient. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.body.en.3.children.0.text | Home office deduction. If you use a portion of your home exclusively for business, you can deduct related expenses. The simplified method allows $5 per square foot (up to 300 square feet). The regular method calculates the actual percentage of your home used for business and applies that to all home expenses—mortgage interest, property taxes, utilities, insurance, repairs. For high-income areas with expensive homes, the regular method often produces a larger deduction. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.body.en.4.children.0.text | Health insurance premiums. As a self-employed individual, you can deduct 100% of your health insurance premiums for yourself, your spouse, and dependents. This includes medical, dental, and vision insurance. The deduction is taken on Line 17 of Schedule 1, and it reduces your adjusted gross income (AGI), which can also lower other income-based limitations. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.body.en.5.children.0.text | Retirement contributions. Solo 401(k)s, SEP-IRAs, and SIMPLE IRAs all allow significant tax-deductible contributions. A solo 401(k) lets you contribute both as an employee (up to $23,000 in 2024) and as an employer (up to 25% of compensation), potentially allowing six-figure contributions. SEP-IRAs permit contributions up to 25% of net self-employment income, with a $69,000 cap for 2024. These deductions reduce your taxable income substantially. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.body.en.6.children.0.text | Vehicle expenses. If you use your car for business, you can deduct either the standard mileage rate (67 cents per mile for 2024) or actual expenses (gas, insurance, repairs, depreciation). If you drive significant miles for work—especially if you visit clients, job sites, or supply stores—this deduction can be substantial. Keep detailed mileage logs to support your deduction. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.body.en.9.children.0.text | Marketing and business development. Professional website costs, business cards, marketing materials, advertising, and even some client entertainment expenses can be deducted. The key distinction for entertainment (now largely eliminated) versus meals is that meals are still 50% deductible when business-related. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.body.en.10.children.0.text | Equipment and machinery. Section 179 of the tax code allows immediate deduction of equipment purchases (up to $1,160,000 for 2024, with phase-out starting at $2,890,000). This includes computers, machinery, office furniture, and tools. You can also elect to depreciate equipment over time instead of taking the immediate deduction. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.coverImage.alt | Union National Tax blog hero image for “1099 Contractors: 10 Deductions You’re Probably Missing,” showing a professional tax planning workspace with a laptop deduction dashboard, 1099-NEC form, calculator, notebook checklist, hard hat, and green-and-gold Union National Tax branding. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.excerpt.en | If you're a 1099 contractor, you're likely leaving thousands of dollars in deductions on the table. Here are the most commonly overlooked write-offs that can reduce your tax bill. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.faqItems.0.answer | Yes, self-employed individuals can deduct 100% of their health, dental, and vision insurance premiums for themselves, their spouse, and dependents as an adjustment to income, reducing AGI. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.faqItems.0.question | Can I deduct health insurance premiums as a 1099 contractor? |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.faqItems.1.answer | The simplified method allows $5 per square foot (up to $1,500 for 300 sq ft). The regular method calculates actual expenses based on the percentage of your home used exclusively for business. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.faqItems.3.answer | Absolutely. Solo 401(k)s, SEP-IRAs, and SIMPLE IRAs all allow tax-deductible contributions, with solo 401(k)s potentially allowing over $60,000 per year for those 50 and older. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.faqItems.3.question | Are retirement contributions deductible for 1099 contractors? |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.featuredImage.alt | Union National Tax blog hero image for “1099 Contractors: 10 Deductions You’re Probably Missing,” showing a professional tax planning workspace with a laptop deduction dashboard, 1099-NEC form, calculator, notebook checklist, hard hat, and green-and-gold Union National Tax branding. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.publishedAt | 2026-04-24T19:20:00.000Z |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.readingTime | 4 |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.seo.keywords.0 | 1099 deductions |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.seo.metaDescription | Top 10 tax deductions 1099 contractors overlook. From home office to retirement contributions, learn which expenses can significantly reduce your tax bill. |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.seo.metaTitle | 1099 Contractor Deductions: 10 Write-Offs You're Missing |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.targetKeyword | 1099 contractor deductions |
| blogPost/g0IfLMaaBm3290uqwL8Cjt.title.en | 1099 Contractors: 10 Deductions You're Probably Missing |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.0.children.0.text | The solo 401(k) is one of the most powerful retirement savings tools available to self-employed business owners—and it's dramatically underutilized. If you're self-employed with no employees (other than a spouse), this retirement plan deserves serious consideration. It offers contribution limits that rival corporate executive packages, and the tax benefits are substantial. |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.1.children.0.text | Let's start with the basics. A solo 401(k) is simply a 401(k) plan that covers only one person—the business owner. Because there's no need to include employees, the plan can be structured with features unavailable in traditional 401(k)s, including the ability to make profit-sharing contributions that escape payroll taxes entirely. |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.2.children.0.text | The contribution limits for 2024 are generous. As an employee, you can contribute up to $23,000 in salary deferrals (the same as a regular 401(k)). But as an employer, you can also make profit-sharing contributions of up to 25% of your net self-employment income. Combined, this can total over $50,000 per year in tax-deductible contributions—and if you're 50 or older, you get an additional $7,500 catch-up contribution, bringing the potential total to over $60,000. |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.3.children.0.text | Let's work through an example. Say you're a consultant with $200,000 in net self-employment income. As an employee, you defer $23,000. Your profit-sharing contribution is calculated as 25% of your net income minus the self-employment tax deduction. Roughly, you could add another $40,000-$45,000 in employer contributions. That's a potential $63,000 to $68,000 in total contributions—all tax-deductible. |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.5.children.0.text | There's a Roth option too. You can make Roth contributions to your solo 401(k), allowing your money to grow tax-free forever. While you don't get an immediate deduction for Roth contributions, qualified withdrawals in retirement are completely tax-free. For high earners who expect to be in a similar or higher tax bracket in retirement, the Roth option is compelling. |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.6.children.0.text | Another advantage of solo 401(k)s is the loan feature. You can borrow up to 50% of your account balance (maximum $50,000) as a loan from your own plan. This can be useful for business emergencies or major personal expenses, though the rules around plan loans are strict and must be followed carefully. |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.7.children.0.text | Setting up a solo 401(k) is straightforward. You can open an account with any major brokerage—Fidelity, Vanguard, Schwab, and others offer solo 401(k) plans with no account fees. You'll need an Employer Identification Number (EIN) for the account, which is free to obtain from the IRS. The plan must be established by December 31 to take effect for that year, though contributions can be made until your tax filing deadline (typically April 15). |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.8.children.0.text | One common mistake is not maximizing contributions. Many solo 401(k) holders contribute only the employee portion ($23,000) but forget the employer profit-sharing contribution. If you have a good year, maxing out the profit-sharing contribution can dramatically accelerate your retirement savings and reduce your tax bill at the same time. |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.10.children.0.text | A solo 401(k) works exceptionally well when combined with an S-Corp election. The S-Corp allows you to reduce self-employment tax on a portion of your income, and the solo 401(k) lets you redirect those tax savings into tax-deferred retirement savings. The combination is powerful. |
| blogPost/g0IfLMaaBm3290uqwL8Div.body.en.11.children.0.text | If you're self-employed and not currently maximizing a retirement plan, start researching your options today. The solo 401(k) offers unmatched flexibility and contribution limits for the self-employed. With proper planning, you can build substantial retirement savings while reducing your current tax burden. |
| blogPost/g0IfLMaaBm3290uqwL8Div.coverImage.alt | Union National Tax blog hero image for “The Solo 401(k),” showing a premium green-and-gold retirement planning workspace with a laptop retirement savings chart, 401(k) plan notebook, tax planning documents, calculator, rising gold growth bars, and wealth-building visuals. |
| blogPost/g0IfLMaaBm3290uqwL8Div.excerpt.en | The solo 401(k) is one of the most powerful retirement savings tools available to self-employed business owners—and it's dramatically underutilized. Here's how to maximize it. |
| blogPost/g0IfLMaaBm3290uqwL8Div.faqItems.0.answer | In 2024, you can contribute up to $23,000 as an employee, plus up to 25% of net self-employment income as an employer contribution. With catch-up contributions (age 50+), you can contribute over $60,000. |
| blogPost/g0IfLMaaBm3290uqwL8Div.faqItems.0.question | How much can I contribute to a solo 401(k) in 2024? |
| blogPost/g0IfLMaaBm3290uqwL8Div.faqItems.1.question | Can I have both a Roth and traditional solo 401(k)? |
| blogPost/g0IfLMaaBm3290uqwL8Div.faqItems.2.answer | Solo 401(k)s allow employee deferrals ($23,000 in 2024) that SEP-IRAs don't. For a self-employed person earning $100,000, this means up to $41,500 more in potential contributions. |
| blogPost/g0IfLMaaBm3290uqwL8Div.faqItems.2.question | What's the main advantage of a solo 401(k) over a SEP-IRA? |
| blogPost/g0IfLMaaBm3290uqwL8Div.faqItems.3.answer | Yes, solo 401(k)s permit loans up to 50% of your account balance or $50,000, whichever is less. The loan must be repaid with interest. |
| blogPost/g0IfLMaaBm3290uqwL8Div.faqItems.3.question | Can I borrow from my solo 401(k)? |
| blogPost/g0IfLMaaBm3290uqwL8Div.featuredImage.alt | Union National Tax blog hero image for “The Solo 401(k),” showing a premium green-and-gold retirement planning workspace with a laptop retirement savings chart, 401(k) plan notebook, tax planning documents, calculator, rising gold growth bars, and wealth-building visuals. |
| blogPost/g0IfLMaaBm3290uqwL8Div.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/g0IfLMaaBm3290uqwL8Div.publishedAt | 2026-04-27T19:10:00.000Z |
| blogPost/g0IfLMaaBm3290uqwL8Div.readingTime | 4 |
| blogPost/g0IfLMaaBm3290uqwL8Div.seo.keywords.0 | solo 401k |
| blogPost/g0IfLMaaBm3290uqwL8Div.seo.metaDescription | Maximize your solo 401(k) contributions to build retirement wealth while reducing your tax bill. Contribution limits, strategies, and Roth options explained. |
| blogPost/g0IfLMaaBm3290uqwL8Div.seo.metaTitle | Solo 401(k): Most Powerful Retirement Plan for Self-Employed |
| blogPost/g0IfLMaaBm3290uqwL8Div.targetKeyword | solo 401k |
| blogPost/g0IfLMaaBm3290uqwL8Div.title.en | The Solo 401(k): Building Wealth While Reducing Your Tax Bill |
| blogPost/g0IfLMaaBm3290uqwL8EKN.body.en.0.children.0.text | The IRS audited over 1 million taxpayers last year. While audit rates are low for most individuals—less than 1% for wage earners—the risk is real, and certain red flags can significantly increase your chances of being selected. Understanding what triggers audits is the first step in protecting yourself. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.body.en.1.children.0.text | First, understand how the IRS selects returns for audit. The IRS uses the Discriminant Index Function (DIF) score, which flags returns that deviate statistically from norms for similar taxpayers. The higher your score, the more likely you are to be audited. The IRS also uses document matching (comparing W-2s and 1099s to reported income) and related examinations (auditing business partners or transactions that involve your return). |
| blogPost/g0IfLMaaBm3290uqwL8EKN.body.en.3.children.0.text | High income. This is the most significant factor. Audit rates increase substantially for higher earners. For individuals earning over $200,000, audit rates begin to rise. For those over $1 million, the audit rate is significantly higher. Your business income is already scrutinized more heavily than wage income, so keeping meticulous records is essential. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.body.en.4.children.0.text | Large deductions relative to income. If your Schedule C shows expenses that are unusually high compared to your revenue, the IRS will take notice. For example, if you report $200,000 in revenue but $180,000 in expenses (90% deduction rate), that looks suspicious. The IRS knows industry norms, and if you're claiming deductions well outside typical ranges, you'll likely receive scrutiny. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.body.en.5.children.0.text | Home office deduction. While legitimate, this deduction is a common audit target because it's prone to abuse. Ensure you're actually using the space exclusively and regularly for business, and that your calculation method is defensible. The simplified method ($5 per square foot) is harder to challenge than the regular method, which requires calculating actual expenses. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.body.en.9.children.0.text | 1099 mismatches. The IRS matches 1099 forms (from clients who paid you $600 or more) to the income you report. If you receive 1099s but underreport income, the IRS will notice. Ensure all 1099 income is reported, even if you made mistakes or didn't receive the form. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.body.en.11.children.0.text | Charitable contributions. Large charitable donations relative to your income draw attention. If you claim $30,000 in charitable contributions on a $100,000 income, the IRS will want documentation. Keep receipts for all donations and ensure you're not claiming donations you didn't actually make. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.coverImage.alt | Union National Tax blog hero image for “IRS Audit Triggers for Small Business Owners,” showing organized tax documents, an audit prevention checklist, a business financial dashboard, calculator, and callout labels for common audit triggers like large deductions, home office, mileage, 1099 vs W-2, round numbers, and late or missing records. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.excerpt.en | The IRS audited over 1 million taxpayers last year. While audit rates are low for most individuals, certain red flags can increase your chances. Here's what triggers audits and how to stay safe. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.faqItems.0.answer | Yes, audit rates increase significantly for higher income earners. While less than 1% of wage earners are audited, individuals earning over $200,000 face elevated scrutiny. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.faqItems.0.question | Does earning over $200,000 increase audit risk? |
| blogPost/g0IfLMaaBm3290uqwL8EKN.faqItems.1.answer | The home office deduction is scrutinized because it's prone to abuse. Using the simplified method ($5/sq ft) is safer than the regular method, which requires calculating actual expenses. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.faqItems.2.answer | Keep meticulous records, avoid claiming deductions wildly outside industry norms, ensure all 1099 income is reported, file on time, and maintain consistent deduction patterns year-over-year. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.faqItems.3.answer | Audit rates begin rising noticeably above $200,000 and increase substantially above $500,000. For those earning over $1 million, audit rates are significantly higher than the general population. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.featuredImage.alt | Union National Tax blog hero image for “IRS Audit Triggers for Small Business Owners,” showing organized tax documents, an audit prevention checklist, a business financial dashboard, calculator, and callout labels for common audit triggers like large deductions, home office, mileage, 1099 vs W-2, round numbers, and late or missing records. |
| blogPost/g0IfLMaaBm3290uqwL8EKN.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/g0IfLMaaBm3290uqwL8EKN.publishedAt | 2026-04-29T19:03:00.000Z |
| blogPost/g0IfLMaaBm3290uqwL8EKN.readingTime | 4 |
| blogPost/g0IfLMaaBm3290uqwL8F6v.body.en.1.children.0.text | Understanding the cash flow cycle is the foundation. As a consultant, you typically invoice for work performed, then wait 30, 45, or even 60 days for payment. During that waiting period, you still have expenses—software subscriptions, insurance, taxes, rent if you have office space. The gap between when you do the work and when you get paid can create serious cash crunches if you're not prepared. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.body.en.2.children.0.text | The first step is accurate forecasting. You need to know when money is coming in and when it's going out. Create a rolling 12-week cash flow forecast that estimates all expected income (by client and date) and all expected expenses (by type and date). Update this forecast weekly and compare actual results to projections. Over time, you'll get better at predicting your cash flow, which removes uncertainty and stress. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.body.en.3.children.0.text | One of the most effective strategies is to invoice promptly and clearly. Don't wait until the end of the month to send invoices. As soon as work is completed, send the invoice. Make your payment terms explicit (Net 30 is standard), and ensure your invoices include all necessary information for the client to process payment quickly. Complicated, unclear invoices delay payment. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.body.en.4.children.0.text | Consider requiring deposits or milestone payments for large projects. For engagements exceeding $10,000, asking for 25-50% upfront significantly reduces your risk and improves cash flow. Many clients are accustomed to this arrangement, especially for large, long-term projects. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.body.en.5.children.0.text | Accelerate your payment collection. Send payment reminders before invoices are due (a simple "just a reminder that invoice #X is due in 7 days"). Follow up immediately when invoices become overdue. You might feel uncomfortable doing this, but it's a normal part of business, and your clients expect it. Consider offering small discounts (2-3%) for early payment to incentivize faster payment. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.body.en.9.children.0.text | Plan for taxes. Set aside 25-30% of every payment you receive in a separate savings account. This money belongs to the IRS and your state—you're just holding it until tax day. When quarterly estimated tax payments are due, the money is already there. This discipline prevents the shock of a large tax bill you weren't prepared for. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.body.en.10.children.0.text | Finally, consider your pricing strategy. If you're constantly cash-strapped despite having good clients, your rates may simply be too low. Raising your rates—even modestly—can dramatically improve cash flow without requiring you to find new clients or work more hours. Even a 10-15% rate increase can transform your business economics. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.faqItems.1.answer | Invoice promptly upon completing work, make payment terms explicit (Net 30), and consider requiring deposits or milestone payments for large engagements exceeding $10,000. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.faqItems.2.answer | Set aside 25-30% of every payment you receive in a dedicated tax savings account. This prevents the shock of a large tax bill at filing time. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.faqItems.3.answer | Send payment reminders before invoices are due, follow up immediately on overdue invoices, offer small discounts (2-3%) for early payment, and use clear, professional invoices with all necessary payment details. |
| blogPost/g0IfLMaaBm3290uqwL8F6v.lastReviewedAt | 2026-05-07T00:00:00Z |
| blogPost/g0IfLMaaBm3290uqwL8F6v.publishedAt | 2026-05-01T19:19:00.000Z |
| blogPost/g0IfLMaaBm3290uqwL8F6v.readingTime | 4 |
| homePage/homePage.ctaSubtitle.en | Book a free 15‑minute call for year‑round tax planning, S‑Corp optimization, and Fractional CFO support for contractors and growing businesses nationwide. |
| homePage/homePage.nationwideFeatures.0.title.en | Licensed in All 50 States |
| homePage/homePage.seo.metaDescription.en | Expert S Corp tax optimization for contractors. IRS Enrolled Agents help construction, real estate contractors save $23k+ annually. Free strategy call. |
| homePage/homePage.seo.metaTitle.en | S Corp Tax Planning \| Save $20k+ \| Union National Tax |
| homePage/homePage.stats.0.value | $23,420 |
| homePage/homePage.stats.1.value | 200+ |
| homePage/homePage.stats.2.value | 94% |
| homePage/homePage.stats.3.value | 150 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.0.style | h1 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.2.children.1.text | — not last-minute scrambles. By the time Q1 rolls around, receipts are scattered, mileage logs are incomplete, and deductions have quietly expired. This guide covers every deduction available to HVAC contractors across the full calendar year, with specifics on what qualifies, what documentation you need, and when to act. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.3.children.0.text | 1. Equipment and Tool Purchases |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.3.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.5.children.1.text | Section 179 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.12.children.3.text | 51% of the time. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.13.children.1.text | Don't wait until December. If you know you'll need a new recovery unit or leak detector in Q1 of next year, buy it before December 31 and deduct it this year. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.14.children.0.text | 2. Vehicle Expenses |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.14.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.26.children.1.text | For HVAC contractors driving 30,000+ business miles annually, actual expenses often win. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.28.children.0.text | 3. Business Operating Expenses |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.28.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.34.children.0.text | Professional licenses and permits (contractor licenses, EPA Section 608 certification fees) |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.39.children.0.text | 4. Training and Certifications |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.39.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.42.children.0.text | EPA 608 Universal certification renewal |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.45.children.0.text | OSHA 10 or 30-hour safety training |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.48.children.0.text | 5. Health Insurance Premiums |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.48.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.49.children.1.text | 100% of health insurance premiums |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.50.children.2.text | taken on Form 1040—not on Schedule C—which means it reduces your adjusted gross income regardless of whether you itemize. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.51.children.0.text | 6. Retirement Contributions |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.51.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.53.children.0.text | Your options in 2026: |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.58.children.0.text | Up to 25% of net SE income (~$66,000 max) |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.60.children.0.text | Solo 401(k) |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.66.children.0.text | Contributions made before your tax filing deadline (including extensions) count for the prior tax year. This means you can reduce your 2026 tax bill as late as October 2027 if you file on extension. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.67.children.0.text | 7. Year-Round Estimated Tax Payments |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.67.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.68.children.1.text | $1,000 or more |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.69.children.0.text | 2026 Quarterly Deadlines: |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.70.children.0.text | Q1 → April 15 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.71.children.0.text | Q2 → June 15 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.72.children.0.text | Q3 → September 15 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.73.children.0.text | Q4 → January 15, 2027 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.74.children.3.text | 25–30% of every job payment |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.75.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.77.children.0.text | Section 179 equipment and tools purchased before Dec 31 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.85.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.86.children.1.text | Yes—if the tools are used exclusively for your HVAC business. Tools under $2,500 per item can often be expensed immediately under the de minimis safe harbor. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.87.children.1.text | Yes, if you have a dedicated space used exclusively for business. Use the simplified method ($5/sq ft, up to 300 sq ft) or the regular method (actual expenses × business-use percentage). |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.88.children.1.text | Yes. Self-employed individuals deduct 100% of health insurance premiums for themselves, a spouse, and dependents as an adjustment to income on Form 1040—above the line. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.89.children.1.text | Receipts for all deductible expenses, daily mileage logs, bank and credit card statements, and home office measurements — for a minimum of 3 years. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.90.style | h2 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.body.en.93.children.1.marks.0 | e8aa31d4e1c3 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.excerpt.en | Most HVAC contractors leave thousands on the table at tax time—not from carelessness, but because the tax code rewards year-round attention. Here's every deduction available to HVAC contractors in 2026, with specifics on what qualifies, how to document it, and when to act. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.faqItems.0.answer | Yes — if the tools are used exclusively for your HVAC business. Tools under $2,500 per item can often be expensed immediately under the de minimis safe harbor. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.faqItems.1.answer | Yes, if you have a dedicated space used exclusively for business. Use the simplified method (5% of home sq ft, up to 300 sq ft) or the regular method (actual expenses times business percentage). |
| blogPost/i4oJGTLjqCsdGKitgZy09D.faqItems.2.answer | Yes, self-employed individuals can deduct 100% of their health insurance premiums for themselves, a spouse, and dependents as an adjustment to income. This is taken on Form 1040, not Schedule C, and is above-the-line. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.faqItems.3.answer | Keep receipts for all deductible expenses, mileage logs, bank and credit card statements, and any home office measurements for at least 3 years. |
| blogPost/i4oJGTLjqCsdGKitgZy09D.lastReviewedAt | 2026-05-18T00:00:00Z |
| blogPost/i4oJGTLjqCsdGKitgZy09D.publishedAt | 2026-05-29T10:00:00.000Z |
| blogPost/i4oJGTLjqCsdGKitgZy09D.readingTime | 5 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.seo.keywords.2 | contractor tax deductions 2026 |
| blogPost/i4oJGTLjqCsdGKitgZy09D.seo.metaTitle | Tax Deductions for HVAC Contractors \| Year-Round Guide 2026 |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.0.children.0.text | LLC vs. S-Corp Calculator: The $80,000 Profit Tipping Point |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.0.style | h2 |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.1.children.1.text | $80,000 in net profit |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.2.children.0.text | Below $80,000, the administrative costs of running an S-Corp (payroll, separate tax filings, bookkeeping) often outweigh the tax savings. But once you cross that $80k threshold, the math changes drastically. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.3.children.0.text | The 15.3% Problem |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.3.style | h3 |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.4.children.1.text | 15.3% Self-Employment Tax |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.4.children.2.text | on 100% of your profit. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.5.children.0.text | Profit: $100,000 |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.6.children.0.text | SE Tax: ~$15,300 |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.8.style | h3 |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.10.children.0.text | 1. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.10.children.1.text | Salary (W-2): |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.10.children.2.text | Subject to 15.3% FICA tax. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.11.children.0.text | 2. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.11.children.1.text | Distributions (K-1): |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.11.children.4.text | from 15.3% FICA tax. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.12.children.0.text | ### The Math at $100k Profit |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.13.children.0.text | If you elect S-Corp status and pay yourself a "Reasonable Salary" of $60,000: |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.14.children.0.text | You pay 15.3% tax on the $60,000 salary ($9,180). |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.15.children.0.text | You pay **0%** SE tax on the remaining $40,000 distribution. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.16.children.0.text | **Total Savings:** ~$6,120 per year. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.17.style | h3 |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.19.children.0.text | **Net Profit < $60k:** Stay an LLC. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.20.children.0.text | **Net Profit $60k-$80k:** Grey zone. Start planning. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.21.children.0.text | **Net Profit > $80k:** **Mandatory S-Corp territory.** |
| blogPost/j8wRLgCMkJFzGEXummvo4v.body.en.22.children.1.text | We can run a custom projection for your business to show you exactly how much an S-Corp election would save you in 2026. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.excerpt.en | The Filter: We only want clients making $80k+. This article filters out the hobbyists so your sales team talks to qualified leads. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.publishedAt | 2026-02-23T17:00:00.000Z |
| blogPost/j8wRLgCMkJFzGEXummvo4v.readingTime | 2 |
| blogPost/j8wRLgCMkJFzGEXummvo4v.seo.keywords.0 | S Corp tax savings calculator 2026 |
| blogPost/j8wRLgCMkJFzGEXummvo4v.seo.metaDescription | The Filter: We only want clients making $80k+. This article filters out the hobbyists so your sales team talks to qualified leads. |
| blogPost/j8wRLgCMkJFzGEXummvo4v.seo.metaTitle | LLC vs. S-Corp Calculator: The $80,000 Profit Tipping Point |
| blogPost/j8wRLgCMkJFzGEXummvo4v.title.en | LLC vs. S-Corp Calculator: The $80,000 Profit Tipping Point |
| servicePage/servicePage-fractional-cfo.faqSection.items.1.answer.en | Typically, businesses crossing the $1M to $2M revenue mark begin to experience financial complexity that requires a CFO. If you have multiple departments, complex inventory, or are looking to raise capital, a fractional CFO is critical regardless of revenue. |
| servicePage/servicePage-fractional-cfo.process.steps.0.duration.en | Step 1 |
| servicePage/servicePage-fractional-cfo.process.steps.1.duration.en | Step 2 |
| servicePage/servicePage-new-business-formation.process.steps.0.duration.en | Step 1 |
| servicePage/servicePage-new-business-formation.process.steps.1.duration.en | Step 2 |
| servicePage/servicePage-payroll-services.eligibility.items.1.en | Companies paying 1099 contractors |
| servicePage/servicePage-payroll-services.included.items.3.en | Quarterly payroll reports (Forms 941) |
| servicePage/servicePage-payroll-services.included.items.4.en | Annual payroll reporting (Forms W-2 and W-3) |
| servicePage/servicePage-payroll-services.included.items.5.en | Contractor payments and Form 1099 preparation |
| servicePage/servicePage-payroll-services.included.pricing.headline.en | $250/mo and $15 per employee |
| servicePage/servicePage-payroll-services.process.steps.0.stepNumber | 01 |
| servicePage/servicePage-payroll-services.process.steps.1.stepNumber | 02 |
| servicePage/servicePage-payroll-services.process.steps.2.stepNumber | 03 |
| servicePage/servicePage-payroll-services.process.steps.3.stepNumber | 04 |
| servicePage/servicePage-s-corp-tax-advantage.closing.description.en | Save $15k+ annually by restructuring how you pay yourself. |
| servicePage/servicePage-s-corp-tax-advantage.faqSection.items.0.answer.en | While savings vary, a business netting $100,000 annually can often save between $7,000 and $9,000 per year in self-employment taxes by electing S-corp status and implementing a strategic, reasonable compensation split. |
| servicePage/servicePage-s-corp-tax-advantage.faqSection.items.1.answer.en | We generally advise evaluating an S-Corp election once your business consistently nets $80,000 or more in profit. At this threshold, the tax savings typically outpace the added costs of payroll administration and corporate tax returns. |
| servicePage/servicePage-s-corp-tax-advantage.faqSection.items.2.answer.en | The IRS requires S-Corp owners who work in the business to pay themselves a W-2 salary that matches what it would cost to hire someone for their duties. The remaining profit can then be taken as distributions, which are exempt from self-employment tax. |
| servicePage/servicePage-s-corp-tax-advantage.hero.eyebrow.en | Profitable service businesses netting $80,000+ annually. |
| servicePage/servicePage-s-corp-tax-advantage.hero.subheadline.en | Legally bypass the 15.3% self-employment tax on your business distributions. |
| servicePage/servicePage-s-corp-tax-advantage.process.steps.0.duration.en | Step 1 |
| servicePage/servicePage-s-corp-tax-advantage.process.steps.1.duration.en | Step 2 |
| servicePage/servicePage-strategic-bookkeeping.eligibility.items.0.en | You're a contractor, trades, or service business doing $250K+ a year |
| servicePage/servicePage-strategic-bookkeeping.hero.visual.dashboardMetrics.1.value.en | 0 |
| servicePage/servicePage-strategic-bookkeeping.process.steps.0.duration.en | Step 1 |
| servicePage/servicePage-strategic-bookkeeping.process.steps.1.duration.en | Step 2 |
| servicePage/servicePage-tax-planning.faqSection.items.1.question.en | What is included in the "3-Year Audit Protection" mentioned in the plan? |
| servicePage/servicePage-tax-planning.faqSection.items.2.answer.en | While we serve many clients, this service is specifically optimized for business owners (S-Corps, Real Estate investors, Construction) and high-net-worth individuals with complex income streams. If your tax situation involves more than just a single W-2, a strategic partnership usually pays for itself through identified savings. |
| servicePage/servicePage-tax-planning.included.pricing.headline.en | From $1,800 |
| servicePage/servicePage-tax-planning.process.steps.0.duration.en | Step 1 |
| servicePage/servicePage-tax-planning.process.steps.1.duration.en | Step 2 |
| servicePage/servicePage-tax-preparation-and-filing.faqSection.items.3.answer.en | Your peace of mind is included. Every tax return we prepare comes with 3-Year Audit Protection. If you receive a notice or are selected for an audit, our experts will review the documentation and represent you at no additional cost. |
| servicePage/servicePage-tax-preparation-and-filing.included.items.0.en | Business (1120, 1120-S, 1065) & Personal (1040) Filing |
| servicePage/servicePage-tax-preparation-and-filing.included.items.2.en | Section 179 & Bonus Depreciation Optimization |
| servicePage/servicePage-tax-preparation-and-filing.included.pricing.headline.en | From $595 |
| servicePage/servicePage-tax-preparation-and-filing.process.steps.0.duration.en | Step 1 |
| shopSettings/shopSettings.faq.1.answer.en | It depends on your biggest financial pain point. If you're a small business owner looking to reduce your tax bill, start with The S-Corp Playbook. If you want full financial clarity and a CFO-level system for your business, start with The Proactive CFO Solution. If you own real estate or have high W-2 income, go straight to Why the Rich Don't Pay Taxes. |
| shopSettings/shopSettings.faq.4.answer.en | Digital PDF and audio downloads are delivered instantly upon purchase. Hardcover and Bundle orders include physical shipping—delivery times vary by location but are typically 5–10 business days within the U.S. |
| shopSettings/shopSettings.faq.5.answer.en | Digital downloads are non-refundable once accessed. For physical hardcover orders, please contact us within 14 days of delivery if there is a defect or shipping issue and we'll make it right. Reach us at support@unionnationaltax.com or call 385-425-5410. |
| shopSettings/shopSettings.faq.6.answer.en | Yes — in fact, they're even more valuable before you structure your business. Books like The S-Corp Playbook walk you through exactly when and how to elect S-Corp status, what it saves you, and how to do it correctly from day one. The 3 M's to Freedom is ideal for any entrepreneur at any stage. |
| siteSettings/siteSettings.address.street | 285 E 950 S |
| siteSettings/siteSettings.address.zip | 84058 |
| siteSettings/siteSettings.businessHours.0.hours.en | 9:00am – 5:00pm |
| siteSettings/siteSettings.businessHours.1.hours.en | 9:00am – 5:00pm |
| siteSettings/siteSettings.businessHours.2.hours.en | 9:00am – 5:00pm |
| siteSettings/siteSettings.businessHours.3.hours.en | 9:00am – 5:00pm |
| siteSettings/siteSettings.businessHours.4.hours.en | 9:00am – 5:00pm |
| siteSettings/siteSettings.copyrightText.en | © 2026 Union National Tax. All Rights Reserved. |
| siteSettings/siteSettings.phone | (385) 425-5410 |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.2.children.0.text | Here are the four highest-leverage construction tax strategies for 2026. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.3.children.0.text | 1. S-Corp Election: The Most Underused Tool in Construction |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.5.children.0.text | If your construction business is netting $150,000 or more per year after costs, an S-Corp election could save you $15,000-$25,000 annually in self-employment tax. That's not a rounding error — that's a truck payment, a crew bonus, or a equipment upgrade. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.7.children.0.text | 2. Section 179 and Bonus Depreciation: Equipment Is a Tax Advantage |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.8.children.0.text | Construction equipment is expensive and the tax code is generous. Section 179 allows you to expense the full purchase price of qualifying equipment in the year it's placed in service, rather than depreciating it over time. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.9.children.0.text | For 2026, bonus depreciation remains at 40% (phasing down 20% per year through 2027). If you're buying a new excavator, compact track loader, or concrete saw for $85,000, you can deduct $34,000 immediately (40% bonus) plus the standard Section 179 deduction in year one. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.10.children.0.text | Even if you're not buying new equipment, review your existing asset schedule. Are you using accelerated depreciation methods? Are there assets that could be expensed under Section 179 that are currently being depreciated over 7 or 15 years? A mid-year strategy review could unlock significant deductions. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.11.children.0.text | 3. Cost Segregation: Turn One Building Into Multiple Tax Breaks |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.13.children.0.text | Cost segregation reclassifies a building's components into shorter depreciation periods. The building itself is depreciated over 39 years (commercial). But the electrical, plumbing, HVAC, carpet, fixtures, and finish work inside can often be reclassified to 5, 7, or 15-year property — generating massive first-year depreciation deductions. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.14.children.0.text | For a $500,000 commercial building, a proper cost segregation study can generate $80,000-$120,000 in additional first-year deductions. The cost of the study ($3,000-$8,000 typically) is almost always worth it. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.15.children.0.text | 4. Worker Classification: The Audit Trap That Costs the Most |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.16.children.0.text | The IRS and state agencies are aggressively auditing construction companies on worker misclassification. Using 1099 subcontractors where the facts suggest an employee relationship is one of the highest-risk areas in construction tax compliance. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.body.en.20.children.0.text | Construction tax strategy isn't one thing — it's a combination of entity optimization, depreciation acceleration, real estate tax structuring, and compliance risk management. Most GCs are strong on the job site and weak in the financial back office. That's fixable. The first step is getting a tax professional who specializes in construction in front of your numbers — not just at tax time, but in Q1 before the year even starts. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.faqItems.0.answer | Yes. Any legitimate business entity can elect S-Corp status by filing Form 2553 with the IRS. GCs with net profits over 80,000 to 100,000 frequently benefit significantly due to self-employment tax savings on profit distributions. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.faqItems.1.answer | Cost segregation is a depreciation strategy that reclassifies building components into shorter recovery periods (5, 7, 15 years instead of 39). Any construction business that owns commercial real estate qualifies. A study typically costs 3,000 to 8,000 and can unlock 80,000 to 120,000 in additional deductions on a 500,000 building. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.faqItems.2.question | How do I know if my 1099 workers are properly classified? |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.lastReviewedAt | 2026-05-14T16:41:20.741Z |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.publishedAt | 2026-05-18T16:41:00.000Z |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.readingTime | 9 |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.seo.metaDescription | Entity structure, depreciation strategies, and cost segregation approaches every general contractor needs in 2026. |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.targetKeyword | construction tax strategy general contractor 2026 |
| blogPost/tG2GvC0R3oqeLqHiVkz4ph.title.en | Construction Tax Strategy: How General Contractors Can Protect More Revenue in 2026 |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.1.children.0.text | The advertising around OICs makes it sound almost magical: settle your $75,000 tax debt for $20,000, wipe the slate clean, start fresh. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.2.children.0.text | The reality is more complicated, and the approval rate reflects that. The IRS accepts roughly 30-40% of OIC applications. The ones that get rejected often failed not because the taxpayer didn't qualify — but because the application wasn't prepared correctly. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.6.children.0.text | There are two bases for an OIC: (1) Doubt as to Liability — you genuinely believe you don't owe the full amount, and (2) Doubt as to Collectibility — you can't pay the full amount and have no realistic means to do so in the future. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.13.children.0.text | Step 1: Determine if OIC is even the right option. If your income is high enough that you could pay the debt in full within 24 months, the IRS will likely reject your application. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.14.children.0.text | Step 2: Complete Form 656 (Offer in Compromise) and Form 433-A (Collection Information Statement). These are detailed financial disclosures. Every asset, every income source, every household expense must be documented. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.15.children.0.text | Step 3: Submit the application with a non-refundable $205 application fee and an initial payment. You can choose to pay 20% of the offer amount upfront or the full offer amount if it's under $100/month for 24 months. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.16.children.0.text | Step 4: The IRS reviews — this typically takes 6-12 months. During review, the IRS will contact you with questions and may counter-offer with a higher amount than you proposed. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.18.children.0.text | 1. Unrealistic offer amount: If your offer is too low relative to your RCP, they'll reject it. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.19.children.0.text | 2. Unreported assets: If you don't disclose all assets, they'll find them and reject the offer. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.20.children.0.text | 3. Inconsistent financials: If your Form 433-A doesn't match what they can see in their records, that's an immediate red flag. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.body.en.21.children.0.text | 4. Not fully compliant on filings: You must have all tax returns filed before they'll consider an OIC. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.faqItems.0.answer | The IRS typically takes 6 to 12 months to review an OIC application, though complex cases can take longer. During this period, collection activity is generally paused but not stopped entirely. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.faqItems.1.answer | The IRS accepts roughly 30-40% of OIC applications. Many rejections come from incomplete applications, unrealistic offer amounts, or undisclosed assets discovered during the review process. |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.lastReviewedAt | 2026-05-14T16:41:20.741Z |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.publishedAt | 2026-05-20T16:41:00.000Z |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.readingTime | 9 |
| blogPost/tG2GvC0R3oqeLqHiVkz5KW.targetKeyword | IRS Offer in Compromise guide 2026 |
| teamPage/teamPage.hiringBenefits.0.en | 100% Remote Context |
| teamPage/teamPage.hiringDescription.en | We are building the premier financial team for the construction industry. If you want to specialize, stop grinding through 1040s and start building wealth for clients. |
| blogPost/unt-irs-100-percent-depreciation-2026.body.en.0.children.0.text | What Is IRS Notice 2026-16? |
| blogPost/unt-irs-100-percent-depreciation-2026.body.en.0.style | h2 |
| blogPost/unt-irs-100-percent-depreciation-2026.body.en.1.children.0.text | If you are in construction accounting, this is the news you have been waiting for. The new Section 168(n) allows taxpayers to elect a 100% depreciation deduction on qualified production property—essentially factory buildings used in manufacturing. |
| blogPost/unt-irs-100-percent-depreciation-2026.body.en.2.style | h2 |
| blogPost/unt-irs-100-percent-depreciation-2026.body.en.3.children.0.text | ✅ Construction must BEGIN after January 19, 2025 |
| blogPost/unt-irs-100-percent-depreciation-2026.body.en.4.children.0.text | ✅ Property placed in service before 2031 |
| blogPost/unt-irs-100-percent-depreciation-2026.body.en.6.style | h2 |
| blogPost/unt-irs-100-percent-depreciation-2026.body.en.8.style | h2 |
| blogPost/unt-irs-100-percent-depreciation-2026.body.en.10.style | h2 |
| blogPost/unt-irs-100-percent-depreciation-2026.excerpt.en | The new section 168(n) allows taxpayers to elect a 100% depreciation deduction on qualified production property. This is the biggest depreciation benefit since bonus depreciation was made permanent. |
| blogPost/unt-irs-100-percent-depreciation-2026.metaDescription | The new section 168(n) allows 100% depreciation deduction on qualified production property. The biggest tax benefit since bonus depreciation. |
| blogPost/unt-irs-100-percent-depreciation-2026.metaTitle | IRS Notice 2026-16: 100% Depreciation for Construction \| Union National Tax |
| blogPost/unt-irs-100-percent-depreciation-2026.publishedAt | 2026-03-06T10:00:00.000Z |
| blogPost/unt-irs-100-percent-depreciation-2026.readingTime | 8 |
| blogPost/unt-irs-100-percent-depreciation-2026.title.en | IRS Notice 2026-16: 100% Depreciation Is Now Reality for Construction |
| blogPost/unt-quarterly-tax-planning-2026.body.en.0.style | h2 |
| blogPost/unt-quarterly-tax-planning-2026.body.en.1.children.0.text | Waiting until April 15 to think about taxes is a recipe for stress and missed opportunities. Quarterly tax planning keeps you ahead of the curve and saves money. |
| blogPost/unt-quarterly-tax-planning-2026.body.en.2.style | h2 |
| blogPost/unt-quarterly-tax-planning-2026.body.en.3.children.0.text | Mark your calendar: Q1 - April 15, Q2 - June 16, Q3 - September 15, Q4 - January 15. Missing these dates means penalties and interest. |
| blogPost/unt-quarterly-tax-planning-2026.body.en.4.style | h2 |
| blogPost/unt-quarterly-tax-planning-2026.body.en.5.children.0.text | Use last year tax return as a baseline. Divide by 4 and adjust for any changes in income. Our team can help you calculate the right amount. |
| blogPost/unt-quarterly-tax-planning-2026.body.en.6.style | h2 |
| blogPost/unt-quarterly-tax-planning-2026.body.en.8.style | h2 |
| blogPost/unt-quarterly-tax-planning-2026.body.en.10.style | h2 |
| blogPost/unt-quarterly-tax-planning-2026.publishedAt | 2026-03-04T17:00:00.000Z |
| blogPost/unt-quarterly-tax-planning-2026.readingTime | 8 |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.0.style | h2 |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.2.style | h2 |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.4.style | h2 |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.6.style | h2 |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.7.children.0.text | If your business makes $150,000 profit: As an LLC, you pay self-employment tax on $150,000 (about $21,000). As an S-Corp paying yourself a $75,000 salary, you pay employment tax on $75,000 (about $11,000) plus income tax on all $150,000. The difference can be thousands per year. |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.8.style | h2 |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.9.children.0.text | LLC is often better when: Your profit is under $80,000 (the S-Corp savings may not justify the extra paperwork), You want simplicity, or You plan to bring on investors (C-Corp may be better). |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.10.style | h2 |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.11.children.0.text | S-Corp often makes more sense when: Your profit exceeds $80,000-$100,000, You want to minimize employment taxes, You have consistent profits year after year, or You are already operating as an LLC and want to elect S-Corp status. |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.12.style | h2 |
| blogPost/unt-s-corp-vs-llc-tax-structure.body.en.13.children.0.text | You can elect S-Corp status by filing Form 2553 with the IRS. The election must be made by March 15 to be effective for the current tax year. Our team can help you determine if this switch makes sense for your situation. |
| blogPost/unt-s-corp-vs-llc-tax-structure.publishedAt | 2026-03-02T17:00:00.000Z |
| blogPost/unt-s-corp-vs-llc-tax-structure.readingTime | 10 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.0.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.1.children.0.text | The IRS processes over 150 million tax returns each year, and millions of them contain errors that cost taxpayers hundreds—or even thousands—of dollars. At Union National Tax, we have seen the same mistakes repeat year after year. Do not let these common errors reduce your refund or increase your tax bill. |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.2.children.0.text | Mistake #1: Not Reporting All Income |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.2.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.3.children.1.text | Many taxpayers fail to report all their income, especially from side hustles, freelance work, or interest earnings. The IRS receives copies of all W-2s and 1099s, so they already know about your income. |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.5.children.1.text | Keep records of all income sources. Report even small amounts from freelance work. Check all 1099 forms against your records. Include interest and dividend income. |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.6.children.0.text | Mistake #2: Claiming the Wrong Filing Status |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.6.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.9.children.0.text | Mistake #3: Missing Out on Deductions |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.9.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.12.children.0.text | Mistake #4: Incorrect Bank Account Information |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.12.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.14.children.0.text | Mistake #5: Not Signing the Return |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.14.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.16.children.0.text | Mistake #6: Math Errors |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.16.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.18.children.0.text | Mistake #7: Missing Deadlines |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.18.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.20.children.0.text | Mistake #8: Not Filing Even When You Cannot Pay |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.20.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.22.children.0.text | Mistake #9: Forgetting About State Taxes |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.22.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.23.children.0.text | Mistake #10: Not Checking Tax Law Changes |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.23.style | h3 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.body.en.24.style | h2 |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.publishedAt | 2026-03-11T17:00:00.000Z |
| blogPost/vpRjRXp3a43oXmiL0V9Kaq.readingTime | 6 |
