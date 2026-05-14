/**
 * Static fallback data for S-Corp Tax Advantage pages.
 * Extracted from SCorpAdvantageClient for clarity and maintainability.
 */

export const FALLBACK_FAQS = [
    {
        q: "How do I know if an S-Corp is right for me?",
        a: "The right answer depends on your business profit, the role you play in the company, how you pay yourself, and how the business is currently structured. That is why review comes first — before any assumptions or recommendations."
    },
    {
        q: "Is an S-Corp always the best tax strategy?",
        a: "No. It can be powerful in the right scenario, but it is not the right fit for every business. The decision should be based on actual business conditions, not internet hype or generic advice."
    },
    {
        q: "Do I need to already have an LLC?",
        a: "Not always. Your current setup will affect the next steps, but the right path depends on how your business is presently structured and what changes are needed."
    },
    {
        q: "Does this only help with filing Form 2553?",
        a: "No. Filing is only one part of the picture. The real value comes from assessing whether the strategy fits, implementing it correctly, and supporting the business afterward."
    },
    {
        q: "What happens after I book a call?",
        a: "You will speak with Union National Tax about your business, current structure, goals, and whether an S-Corp review makes sense as the next step."
    },
    {
        q: "Can this connect to bookkeeping or CFO support later?",
        a: "Yes. For many businesses, S-Corp strategy is the starting point that leads into stronger planning, cleaner reporting, and more ongoing financial support."
    }
] as const;

export const FALLBACK_ROADMAP = [
    { stepNumber: "01", title: "Evaluate", description: "We review your profit picture and role to determine S-Corp potential." },
    { stepNumber: "02", title: "Recommend", description: "If the numbers support it, we build a customized transition roadmap." },
    { stepNumber: "03", title: "Election", description: "We guide the filing path and handle the critical election process." },
    { stepNumber: "04", title: "Support", description: "Ongoing leadership to ensure the strategy works long-term." }
] as const;

export const FALLBACK_CRITERIA_PROS = [
    "Self-employed business owners with healthy profit",
    "Single-owner or owner-operated businesses",
    "Sole proprietors looking for better efficiency",
    "Owners who want proactive tax strategy",
    "Businesses seeking cleaner compensation structure"
] as const;

export const FALLBACK_CRITERIA_CONS = [
    "If you are looking for a shortcut without compliance discipline, or if the business isn&apos;t yet at the right profit level—we aren&apos;t the right fit.",
    "We specialize in businesses ready to integrate professional structure as part of a bigger business strategy."
] as const;

export const FALLBACK_COMPARISON = [
    { feature: "Business Structure", diy: "Reactive filing", unionNational: "Structure-First Review" },
    { feature: "Relationship", diy: "Seasonal/Transactional", unionNational: "Ongoing Strategy" },
    { feature: "Optimization", diy: "Minimal attention", unionNational: "Core Decision Point" },
    { feature: "Audit Defense", diy: "General support", unionNational: "Specialized Guard" },
    { feature: "Decision Making", diy: "Compliance only", unionNational: "Advisory-Led" }
] as const;

export const FALLBACK_TRUST_SIGNALS = [
    "IRS Enrolled Agent Prepared",
    "Strategy-First Guidance",
    "Audit Protection Built-in",
    "High-Value Implementation",
] as const;

export const SCORP_ADVANTAGE_HERO_TITLE = "Stop Overpaying Yourself Into Higher Taxes.";
export const SCORP_ADVANTAGE_HERO_DESCRIPTION = "The S-Corp Tax Advantage Program helps qualified business owners evaluate whether an S-Corp election could lower tax burden, improve compensation structure, and support smarter long-term growth.";
export const SCORP_ADVANTAGE_IMPACT_GOAL = "Strategic Tax Optimization";
export const SCORP_ADVANTAGE_AGITATION_TITLE = "Why your current setup is costing you money.";
export const SCORP_ADVANTAGE_AGITATION_DESC = "A lot of self-employed professionals and growing small business owners start as sole proprietors or single-member LLCs — and stay there far too long.";

export const SCORP_ADVANTAGE_FEATURES = [
    {
        icon: "Search",
        title: "Strategic Evaluation",
        category: "Tax Audit",
        body: "We review your business structure, income profile, and owner compensation picture to assess whether an S-Corp election is likely to create real value."
    },
    {
        icon: "FileCheck",
        title: "Entity & Election Guidance",
        category: "Implementation",
        body: "If the strategy is a fit, we help guide the transition and filing process, including the S-Corp election path and related setup considerations."
    },
    {
        icon: "Layers",
        title: "Ongoing Tax Alignment",
        category: "Long-term Strategy",
        body: "An S-Corp is not just a form. It affects compensation, planning, and compliance. We help make sure the structure supports the bigger strategy."
    },
    {
        icon: "BarChart3",
        title: "Financial Decision-Making",
        category: "Executive Leadership",
        body: "The goal is not only tax savings. It is a cleaner, smarter financial setup that gives the owner more control over how the business runs and grows."
    }
] as const;