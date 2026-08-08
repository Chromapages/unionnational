import nextEnv from "@next/env";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const apply = process.argv.includes("--apply");
const token = process.env.SANITY_AUTH_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-09";
const client = token
    ? createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion, useCdn: false, token })
    : getCliClient({ apiVersion }).withConfig({ useCdn: false });
if (apply && !client.config().token) throw new Error("A Sanity write token is required when using --apply.");

const loc = (value, type = "localizedString") => ({ _type: type, en: value });
const row = (slug, index, problem, solution) => ({ _key: `${slug}-comparison-${index}`, _type: "object", problem: loc(problem), solution: loc(solution) });
const step = (slug, index, title, duration, description) => ({ _key: `${slug}-step-${index}`, _type: "object", title: loc(title), duration: loc(duration), description: loc(description, "localizedText") });
const stat = (slug, index, value, label) => ({ _key: `${slug}-stat-${index}`, _type: "object", value: loc(value), label: loc(label) });

const configs = {
    "strategic-bookkeeping": {
        audience: "For businesses that need current, decision-ready numbers",
        headline: "Know your numbers every month — not once a year.",
        highlight: "not once a year.",
        cta: "Book a Strategy Call",
        stats: [["Monthly", "reconciliation"], ["IRS-ready", "records"], ["Decision-ready", "reporting"]],
        eligibility: ["You're a contractor, trades business, or service company doing $500K+ per year", "Your books are behind or do not provide a clear financial picture", "You need reliable data for hiring, pricing, and growth decisions", "You want your bookkeeping connected to proactive tax planning"],
        comparison: {
            eyebrow: "The cost of waiting", heading: "Why compliance-only bookkeeping fails", description: "Historical records alone cannot guide decisions that are happening now.", withoutLabel: "Basic bookkeeping", withLabel: "Strategic bookkeeping",
            pairs: [["Books updated once a year", "Accounts reconciled throughout the year"], ["Cash flow managed by instinct", "Current reports guide operating decisions"], ["Deductions found after deadlines", "Tax-ready categories maintained continuously"], ["Audit records assembled under pressure", "Documentation stays organized and review-ready"]],
        },
        process: [
            ["Discovery & Financial Audit", "Step 1", "We review the current books, accounts, and reporting gaps."],
            ["Chart of Accounts Rebuild", "Step 2", "We organize categories around operations, job costing, and tax reporting."],
            ["Monthly Reconciliation & Reporting", "Monthly", "We reconcile activity and deliver current financial statements."],
            ["Tax-Ready Year-End Package", "Year-end", "We close the year with complete, organized, filing-ready records."],
        ],
        processHeading: "A reliable monthly rhythm", includedHeading: "The strategic bookkeeping system", proofQuote: "Current books create the visibility needed to make better operating and tax decisions.", closingHeading: "Ready to make decisions from reliable numbers?",
    },
    "payroll-services": {
        audience: "For growing teams that need accurate, connected payroll",
        headline: "Payroll that works with your tax strategy.", highlight: "works with your tax strategy.", cta: "Book a Payroll Consultation",
        stats: [["On-time", "processing"], ["Multi-state", "compliance"], ["Tax-ready", "reporting"]],
        eligibility: ["Businesses with employees", "Companies paying 1099 contractors", "Growing teams with multi-state requirements", "Owners who want payroll connected to bookkeeping and tax planning"],
        comparison: { eyebrow: "The payroll difference", heading: "Payroll should support the whole financial system", description: "Processing paychecks is only one part of maintaining accurate payroll.", withoutLabel: "Disconnected payroll", withLabel: "Integrated payroll", pairs: [["Payroll data lives in a separate system", "Payroll reconciles with the books"], ["Tax filings handled only when due", "Filing obligations managed throughout the year"], ["Owner compensation set without strategy", "Owner pay aligned with the entity plan"], ["Contractor records gathered at year-end", "Worker documentation maintained continuously"]] },
        process: [["Setup & Assessment", "Step 1", "Review the team, payroll calendar, states, and existing records."], ["System Configuration", "Step 2", "Configure pay schedules, withholding, direct deposit, and reporting."], ["Ongoing Processing", "Every pay period", "Run payroll and coordinate required federal and state filings."], ["Tax & Bookkeeping Sync", "Ongoing", "Reconcile payroll data with bookkeeping and tax-planning records."]],
        processHeading: "A dependable payroll cadence", includedHeading: "Your payroll support system", proofQuote: "Accurate payroll protects employees, keeps filings current, and strengthens the financial records used for tax decisions.", closingHeading: "Ready for payroll that runs cleanly?",
    },
    "fractional-cfo": {
        audience: "For established businesses that need forward-looking financial leadership",
        headline: "Make decisions with financial clarity — not guesswork.", highlight: "not guesswork.", cta: "Book a CFO Strategy Call",
        stats: [["Cash flow", "visibility"], ["Forward", "planning"], ["Executive", "decision support"]],
        eligibility: ["Revenue is growing but cash flow remains unpredictable", "Leadership needs forecasts and decision-ready reporting", "Margins or pricing need deeper analysis", "The business is preparing for financing, expansion, or an exit"],
        comparison: { eyebrow: "The leadership gap", heading: "Historical reporting is not a forward plan", description: "Leadership decisions need current data, forecasts, and financial context.", withoutLabel: "Reporting only", withLabel: "Fractional CFO leadership", pairs: [["Decisions based only on past statements", "Forecasts model what happens next"], ["Cash needs discovered after they occur", "Cash requirements planned in advance"], ["Margins reviewed at the company level", "Profitability analyzed by service or product"], ["Capital decisions made reactively", "Debt and investment choices evaluated strategically"]] },
        process: [["Financial diagnostic", "Step 1", "Review reporting, cash flow, margins, and decision priorities."], ["Forecasting model", "Step 2", "Build the operating forecast and decision dashboard."], ["Leadership cadence", "Monthly", "Review performance, risks, and upcoming decisions."], ["Strategic adjustment", "Quarterly", "Update forecasts and priorities as conditions change."]],
        processHeading: "A financial leadership cadence", includedHeading: "Your CFO decision system", proofQuote: "A useful forecast turns financial data into decisions leadership can act on.", closingHeading: "Ready to lead with greater financial clarity?",
    },
    "new-business-formation": {
        audience: "For owners building the right legal and tax foundation",
        headline: "Build the right structure before it becomes expensive to change.", highlight: "before it becomes expensive to change.", cta: "Book a Formation Consultation",
        stats: [["Entity", "strategy"], ["IRS-ready", "setup"], ["Growth-ready", "foundation"]],
        eligibility: ["You are launching a new business", "You need help choosing an entity structure", "You want formation decisions connected to tax planning", "An existing business needs to correct or restructure its setup"],
        comparison: { eyebrow: "The formation difference", heading: "Formation should begin with strategy", description: "A filing service can create an entity. A strategic process aligns that entity with ownership, operations, and tax goals.", withoutLabel: "Form-first setup", withLabel: "Strategy-led formation", pairs: [["Entity selected from a generic checklist", "Structure evaluated against ownership and income"], ["State filing treated as the finish line", "Registrations and operating requirements coordinated"], ["Tax elections considered later", "Election timing reviewed during formation"], ["No implementation plan after approval", "Banking, payroll, and compliance next steps defined"]] },
        process: [["Formation strategy", "Step 1", "Review ownership, liability, projected income, and operating plans."], ["Entity selection", "Step 2", "Choose the legal and tax structure that fits the business."], ["Registration & filings", "Setup", "Coordinate state formation, EIN, and applicable elections."], ["Implementation", "Launch", "Put banking, payroll, bookkeeping, and compliance foundations in place."]],
        processHeading: "A formation process built around the business", includedHeading: "Your formation foundation", proofQuote: "The right entity is the one that fits how the business earns, operates, and plans to grow.", closingHeading: "Ready to launch on the right foundation?",
    },
    "s-corp-tax-advantage": {
        audience: "For profitable owners evaluating an S-Corporation strategy",
        headline: "Stop overpaying self-employment tax. Build the right S-Corp strategy.", highlight: "Build the right S-Corp strategy.", cta: "Book an S-Corp Evaluation",
        stats: [["S-Corp", "evaluation"], ["Reasonable", "compensation"], ["Payroll-ready", "implementation"]],
        eligibility: ["The business produces consistent owner profit", "You want to evaluate potential self-employment tax savings", "You can support reasonable compensation and payroll", "You want implementation and ongoing compliance coordinated"],
        comparison: { eyebrow: "The S-Corp decision", heading: "An election only works when the numbers support it", description: "Potential savings must be weighed against payroll, compliance, and implementation costs.", withoutLabel: "Election without analysis", withLabel: "S-Corp strategy", pairs: [["Election based on a rule of thumb", "Savings modeled using actual business profit"], ["Owner pay selected without support", "Reasonable compensation documented"], ["Payroll added after the election", "Payroll readiness included in implementation"], ["Compliance handled in separate silos", "Books, payroll, planning, and filing coordinated"]] },
        process: [["Savings evaluation", "Step 1", "Model potential savings, compensation, and implementation costs."], ["Fit & timing decision", "Step 2", "Confirm whether and when the election makes sense."], ["Election & setup", "Implementation", "Coordinate filings, payroll, and entity requirements."], ["Ongoing alignment", "Quarterly", "Review compensation, distributions, estimates, and compliance."]],
        processHeading: "From evaluation to compliant implementation", includedHeading: "Your S-Corp strategy system", proofQuote: "S-Corp savings are strongest when the election, compensation, payroll, and records operate as one system.", closingHeading: "Ready to evaluate your S-Corp opportunity?",
    },
    "tax-planning-consulting": {
        audience: "For profitable owners who want to plan before filing",
        headline: "Filing is not a strategy.", highlight: "not", cta: "Book a Strategy Audit",
        stats: [["Year-round", "strategy"], ["EA-led", "advisory"], ["Proactive", "tax decisions"]],
        eligibility: ["The business is consistently profitable", "You make hiring, equipment, compensation, or investment decisions during the year", "Your entity or estimated payments need regular review", "You want implementation support, not a year-end list of ideas"],
        comparison: { eyebrow: "The compliance trap", heading: "The cost of waiting until filing season", description: "Once the tax year closes, many legal planning opportunities are no longer available.", withoutLabel: "Reactive filing", withLabel: "Proactive planning", pairs: [["Decisions made without tax context", "Strategy reviewed before major moves"], ["Deductions discovered after year-end", "Opportunities evaluated while action is possible"], ["Entity structure left on autopilot", "Structure reviewed as profit and operations change"], ["Estimated payments based on guesswork", "Forward-looking projections guide payments"]] },
        process: [["Strategy audit", "Step 1", "Review the entity, income, prior returns, and current tax position."], ["Planning map", "Step 2", "Prioritize strategies and define implementation requirements."], ["Implementation", "Ongoing", "Coordinate elections, documentation, timing, and operating changes."], ["Quarterly review", "Quarterly", "Update projections and adjust the plan as the business changes."]],
        processHeading: "A strategy that keeps pace with the business", includedHeading: "Your year-round planning system", proofQuote: "The most valuable tax decisions happen before the transaction, not after the return is prepared.", closingHeading: "Ready to make tax strategy a year-round advantage?",
    },
    "tax-preparation-filing": {
        audience: "For owners who need accurate, connected filing",
        headline: "File with confidence — and preserve every strategic advantage.", highlight: "preserve every strategic advantage.", cta: "Book a Filing Consultation",
        stats: [["EA-prepared", "returns"], ["Multi-state", "filing support"], ["Review-ready", "process"]],
        eligibility: ["You need business and owner returns coordinated", "The business has multi-state or entity-level filing requirements", "Payroll and bookkeeping records need to connect cleanly to the return", "You want filing results carried into the next planning cycle"],
        comparison: { eyebrow: "The filing difference", heading: "A return should be accurate, complete, and connected", description: "Strong filing work brings the books, entity details, payroll, and prior planning decisions together before submission.", withoutLabel: "Last-minute filing", withLabel: "Connected filing process", pairs: [["Documents gathered only at deadline time", "Preparation requirements communicated early"], ["Books reconciled after preparation begins", "Financial records reviewed before filing is finalized"], ["State obligations discovered late", "Federal and state requirements coordinated"], ["Return filed without forward context", "Results inform the next planning cycle"]] },
        process: [["Filing review", "Step 1", "Review the entity, prior return, financial records, and filing requirements."], ["Document collection", "Preparation", "Coordinate records, payroll data, and state information."], ["Return preparation", "Review", "Prepare and review the return for consistency and compliance."], ["File & plan ahead", "Next steps", "Submit the return and identify considerations for the next tax year."]],
        processHeading: "A clear, professional filing process", includedHeading: "Your filing support system", proofQuote: "A well-prepared return closes the year with the records and context needed to plan the next one.", closingHeading: "Ready for a filing process you can trust?",
    },
};

const documents = await client.fetch(`*[_type == "service"]{_id, slug, title, shortDescription, keyBenefit, heroHeadline, heroHighlight, heroCta, heroSecondaryCta, heroTrustStats, heroMicrocopy, heroVisual, targetAudience, eligibilityPros, roadmap, pageSections, startingPrice, impactGoal}`);
let transaction = client.transaction();
const report = [];

for (const document of documents) {
    const slug = document.slug?.current;
    const config = configs[slug];
    if (!config) continue;

    const title = document.title?.en || document.title || slug;
    const pageSections = {
        _type: "object",
        eligibility: { _type: "object", eyebrow: loc("Built for the work ahead"), heading: loc(`Is ${title} right for you?`), description: loc(`A focused fit review confirms whether ${title} matches your current needs and next decisions.`, "localizedText") },
        comparison: { _type: "object", eyebrow: loc(config.comparison.eyebrow), heading: loc(config.comparison.heading), description: loc(config.comparison.description, "localizedText"), withoutLabel: loc(config.comparison.withoutLabel), withLabel: loc(config.comparison.withLabel), pairs: config.comparison.pairs.map((pairValues, index) => row(slug, index, ...pairValues)) },
        process: { _type: "object", eyebrow: loc("How it works"), heading: loc(config.processHeading), description: loc("A defined sequence keeps the work organized, visible, and connected to the decisions that follow.", "localizedText") },
        included: { _type: "object", eyebrow: loc("What's included"), heading: loc(config.includedHeading), description: loc(`The core work and deliverables included with ${title}.`, "localizedText") },
        pricing: { _type: "object", headline: document.startingPrice || loc("Scope and pricing are confirmed after the initial review"), detail: loc("Your consultation confirms the appropriate scope before work begins.", "localizedText") },
        video: { _type: "object", eyebrow: loc("Service overview"), heading: loc(`See how ${title} works`) },
        proof: { _type: "object", eyebrow: loc("Our approach"), heading: loc("Results you can act on"), quote: loc(config.proofQuote, "localizedText"), attribution: loc(`Union National Tax ${title} methodology`), linkLabel: loc("Discuss your situation"), href: "/contact" },
        faq: { _type: "object", eyebrow: loc("Questions answered"), heading: loc(`${title} FAQs`) },
        closing: { _type: "object", heading: loc(config.closingHeading), description: loc(document.impactGoal?.en || `Start with a focused review of your needs and the right next step for ${title}.`, "localizedText"), label: loc(config.cta), href: "/contact" },
    };

    const setIfMissing = {
        heroHeadline: loc(config.headline),
        heroHighlight: loc(config.highlight),
        heroCta: { _type: "object", label: loc(config.cta), href: "/contact" },
        heroSecondaryCta: { _type: "object", label: loc("See what's included"), anchorTarget: "#included" },
        heroTrustStats: config.stats.map((values, index) => stat(slug, index, ...values)),
        heroMicrocopy: loc("No commitment — start with a focused consultation."),
        heroVisual: { _type: "object", type: "none" },
        targetAudience: loc(config.audience),
        eligibilityPros: config.eligibility.map((item, index) => ({ _key: `${slug}-eligibility-${index}`, ...loc(item) })),
        roadmap: config.process.map((values, index) => step(slug, index, ...values)),
        pageSections,
    };

    if (!document.keyBenefit && document.shortDescription) setIfMissing.keyBenefit = document.shortDescription;
    report.push({ slug, fields: Object.keys(setIfMissing).filter((field) => document[field] == null) });
    if (apply) transaction = transaction.patch(document._id, (patch) => patch.setIfMissing(setIfMissing));
}

if (apply && report.some((item) => item.fields.length)) await transaction.commit();
console.log(JSON.stringify({ mode: apply ? "applied" : "dry-run", documents: report }, null, 2));
