import "server-only";
import { z } from "zod";
import { getEnv } from "@/lib/config/env";
import { GhlPayloadSchema, PrimaryServiceEnum, normalizeRevenue, type GhlPayload } from "@/lib/ghl/contract";
import { LeadDeliveryError } from "./delivery";

const business = (payload: GhlPayload) => payload.business ?? {};
const revenuePoints: Record<string, number> = { UNDER_100K: 0, "100K_500K": 5, "500K_1M": 10, "1M_3M": 20, "3M_5M": 20, "5M_PLUS": 20 };
const ConstructionAnswers = z.object({
    job_costing: z.enum(["No, we don&apos;t track job-by-job", "Partially / Inconsistent", "Yes, fully automated"]),
    cash_flow: z.enum(["Never / We just check bank balance", "Monthly / Quarterly", "Weekly / Real-time"]),
    estimating: z.enum(["Guesswork / Based on intuition", "Mostly accurate, but we miss things", "Highly accurate / Data-driven"]),
    reviews: z.enum(["Never / Only at tax time", "Annually / Semi-annually", "Monthly / Proactive"]),
});
const RestaurantAnswers = z.object({
    prime_cost: z.enum(["Never", "Occasionally", "Weekly"]), food_cost: z.enum(["Guesswork", "Partial costing", "Full plate costing"]),
    labor_burden: z.enum(["Over 35%", "30–35%", "Under 30%"]), menu_pricing: z.enum(["Never", "Over 12 months ago", "6–12 months ago", "Within 6 months"]),
    financial_rhythm: z.enum(["Never", "Monthly", "1–2 weeks", "Within days"]), cash_flow: z.enum(["Blind", "Reactive", "Real-time"]),
    tax_compliance: z.enum(["No", "Partially", "Yes, fully"]),
});
const ProfitabilityAnswers = z.object({
    trade_type: z.enum(["General contractor", "HVAC", "Roofing", "Plumbing", "Electrical", "Concrete", "Landscaping", "Remodeling", "Other"]),
    biggest_challenge: z.enum(["Job Costing", "Cash Flow", "Estimating", "Margin Fade", "Change Orders", "Subcontractor Control", "Scaling Chaos", "Weekly Reviews", "Systems & Documentation"]),
    job_costing_knows_profit: z.enum(["Yes", "Sometimes", "No"]), cash_flow_forecast: z.enum(["Yes", "Sometimes", "No"]),
    operational_change_orders: z.enum(["Yes", "Usually", "Sometimes", "No"]), estimating_current_data: z.enum(["Yes", "Somewhat", "Using old data", "Starting"]),
    cash_flow_payroll_stress: z.enum(["Yes", "No"]), operational_sub_accountability: z.enum(["Yes", "Usually", "Sometimes", "No"]),
});
const StrategyAnswers = z.object({
    has_accountant: z.enum(["Yes, I have an accountant", "I do it myself", "I have a bookkeeper only", "No professional help"]).optional(),
    books_status: z.enum(["Books are current", "Somewhat behind", "Major cleanup needed", "I don&apos;t know"]).optional(),
    interested_in_scorp: z.boolean().optional(),
    investment_willingness: z.enum(["Yes, ready to invest in strategy", "Maybe, depending on ROI", "Mostly looking for free advice"]).optional(),
});
const point = (value: string, values: Record<string, number>) => Object.hasOwn(values, value) ? values[value] : 0;

/** Existing browser payload is a transport shape, never authority for tags or calculated results. */
export async function canonicalLead(input: GhlPayload): Promise<GhlPayload> {
    const payload: GhlPayload = {
        contact: { first_name: input.contact.first_name, last_name: input.contact.last_name, email: input.contact.email.toLowerCase(), phone: input.contact.phone },
        event_type: "", business: input.business, intent: { lead_magnet_type: input.intent.lead_magnet_type }, tracking: input.tracking,
        meta: { ...input.meta, locale: z.enum(["en", "es"]).parse(input.meta.locale), version: "1.0", submitted_at: new Date().toISOString(), ip_hash: undefined },
    };
    const magnet = input.intent.lead_magnet_type;
    if (magnet === "STRATEGY_INTAKE") {
        payload.event_type = "GENERAL_INQUIRY_SUBMITTED";
        payload.intent = { lead_magnet_type: magnet, urgency: input.intent.urgency, preferred_next_step: input.intent.preferred_next_step, pain_points: input.intent.pain_points,
            services_of_interest: input.intent.services_of_interest ? z.array(z.enum(["S-Corp Advantage", "Fractional CFO Strategy", "Proactive Tax Planning", "Strategic Visibility/Books", "Premium Tax Filing"])).max(5).parse(input.intent.services_of_interest) : undefined };
        payload.answers = StrategyAnswers.parse(input.answers ?? {});
    } else if (magnet === "TAX_SAVINGS_ANALYSIS") {
        payload.event_type = "TAX_ANALYSIS_SUBMITTED";
        payload.intent.primary_service_interest = "TAX_PLANNING";
        payload.answers = z.object({ source: z.string().max(200).optional() }).parse(input.answers ?? {});
    } else if (magnet === "CONSTRUCTION_PROFIT_LEAK_CHECKLIST") {
        payload.event_type = "CONSTRUCTION_CHECKLIST_SUBMITTED";
        payload.contact.tags = ["LM_Construction_ProfitLeakChecklist", "Interest_Construction"];
        payload.intent.primary_service_interest = "CONSTRUCTION_BLUEPRINT";
        payload.business = { ...business(input), industry: "CONSTRUCTION" };
    } else if (magnet === "BLUEPRINT_MORE_INFO") {
        payload.event_type = "BLUEPRINT_MORE_INFO_REQUEST";
        payload.contact.tags = ["LM_Blueprint_MoreInfo", "Interest_Construction", input.meta.locale === "es" ? "Lang_ES" : "Lang_EN"];
        payload.intent.primary_service_interest = "CONSTRUCTION_BLUEPRINT";
        payload.business = { ...business(input), industry: "CONSTRUCTION" };
    } else if (magnet === "CONSTRUCTION_ASSESSMENT") {
        const answers = ConstructionAnswers.parse(input.answers);
        const band = business(input).annual_revenue_band;
        if (!band || !Object.hasOwn(revenuePoints, band)) throw new Error("Invalid revenue answer");
        const score = revenuePoints[band] + point(answers.job_costing, { "Partially / Inconsistent": 10, "Yes, fully automated": 15 }) + point(answers.cash_flow, { "Monthly / Quarterly": 10, "Weekly / Real-time": 15 }) + point(answers.estimating, { "Mostly accurate, but we miss things": 10, "Highly accurate / Data-driven": 15 }) + point(answers.reviews, { "Annually / Semi-annually": 5, "Monthly / Proactive": 15 });
        payload.event_type = "CONSTRUCTION_ASSESSMENT_SUBMITTED";
        payload.contact.tags = ["unt-construction-blueprint", `unt-fit-score-${score >= 60 ? "high" : score >= 35 ? "medium" : "low"}`];
        payload.business = { ...business(input), industry: "CONSTRUCTION" };
        payload.intent = { lead_magnet_type: magnet, primary_service_interest: "CONSTRUCTION_BLUEPRINT", urgency: score < 35 ? "IMMEDIATE" : score < 60 ? "THIS_QUARTER" : "PLANNING_ONLY", high_intent: !["UNDER_100K", "100K_500K"].includes(band) && score < 60 };
        payload.results = { fit_score: score, assessment_label: score < 35 ? "High Risk" : score < 60 ? "Profit Leaks Present" : "Strong Foundation" };
        payload.answers = answers;
    } else if (magnet === "RESTAURANT_PROFIT_LEAK_ASSESSMENT") {
        const answers = RestaurantAnswers.parse(input.answers);
        const band = business(input).annual_revenue_band;
        if (!band || !Object.hasOwn(revenuePoints, band)) throw new Error("Invalid revenue answer");
        const score = point(answers.prime_cost, { Occasionally: 2, Weekly: 4 }) + point(answers.food_cost, { "Partial costing": 2, "Full plate costing": 4 }) + point(answers.labor_burden, { "30–35%": 2, "Under 30%": 4 }) + point(answers.menu_pricing, { "Over 12 months ago": 1, "6–12 months ago": 2, "Within 6 months": 4 }) + point(answers.financial_rhythm, { Monthly: 1, "1–2 weeks": 2, "Within days": 4 }) + point(answers.cash_flow, { Reactive: 2, "Real-time": 4 }) + point(answers.tax_compliance, { Partially: 2, "Yes, fully": 4 });
        payload.event_type = "RESTAURANT_PROFIT_LEAK_ASSESSMENT_SUBMITTED";
        payload.contact.tags = ["unt-restaurant-pla", `unt-fit-score-${score >= 18 ? "high" : score >= 10 ? "medium" : "low"}`];
        payload.business = { ...business(input), industry: "HOSPITALITY" };
        payload.intent = { lead_magnet_type: magnet, primary_service_interest: "RESTAURANT_CFO_PARTNERSHIP", urgency: score < 10 ? "IMMEDIATE" : score < 18 ? "THIS_QUARTER" : "PLANNING_ONLY", high_intent: !["UNDER_100K", "100K_500K"].includes(band) && score < 18 };
        payload.results = { fit_score: score, assessment_label: score < 10 ? "Critical" : score < 18 ? "Needs Work" : "Strong Foundation" };
        payload.answers = answers;
    } else if (magnet === "CONSTRUCTION_PROFITABILITY_ASSESSMENT") {
        const answers = ProfitabilityAnswers.parse(input.answers);
        const revenue = z.enum(["Under $100K", "$100K–$250K", "$250K–$500K", "$500K–$1M", "$1M–$3M", "$3M–$5M", "$5M+"]).parse(business(input).revenue_range_label);
        if (normalizeRevenue(revenue) !== business(input).annual_revenue_band) throw new Error("Revenue answers disagree");
        z.enum(["1–4", "5–9", "10–19", "20–49", "50+"]).parse(business(input).employee_count_band);
        const score = point(revenue, { "$250K–$500K": 15, "$500K–$1M": 25, "$1M–$3M": 30, "$3M–$5M": 30, "$5M+": 25 }) + point(answers.job_costing_knows_profit, { Yes: 5, Sometimes: 2 }) + point(answers.estimating_current_data, { Yes: 6, Somewhat: 3 }) + point(answers.cash_flow_forecast, { Yes: 10, Sometimes: 5 }) + point(answers.cash_flow_payroll_stress, { No: 5 }) + point(answers.operational_change_orders, { Yes: 5, Sometimes: 2 }) + point(answers.operational_sub_accountability, { Yes: 5, Usually: 3 }) + (answers.biggest_challenge === "Cash Flow" ? 5 : 0);
        // Preserve the existing 75 threshold (current option maximum is 71); owner decides any change.
        const high = score >= 75;
        const tier = high ? "high" : score >= 50 ? "medium" : "low";
        payload.event_type = "CONSTRUCTION_ASSESSMENT_SUBMITTED";
        payload.contact.tags = ["LM_Construction_ProfitabilityAssessment", "Interest_Construction", `unt-fit-score-${tier}`, ...(high ? ["Qualified_HighIntent"] : [])];
        payload.business = { ...business(input), industry: "CONSTRUCTION" };
        payload.intent = { lead_magnet_type: magnet, primary_service_interest: "CONSTRUCTION_CFO_PARTNERSHIP", pain_points: [answers.biggest_challenge], high_intent: high };
        payload.results = { fit_score: score, assessment_label: high ? "High Intent" : score >= 50 ? "Good Fit" : score >= 25 ? "Nurture" : "Low Fit" };
        payload.answers = answers;
        payload.meta.version = "2.0";
    } else if (magnet === "BOOK_DOWNLOAD") {
        const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100).parse(input.meta.book_slug);
        const { client } = await import("@/sanity/lib/client");
        const book = await client.fetch<{ leadMagnetTag?: string; serviceLane?: string } | null>(`*[_type == "product" && slug.current == $slug && !(_id in path("drafts.**"))][0]{leadMagnetTag, serviceLane}`, { slug }, { perspective: "published", signal: AbortSignal.timeout(2_000) }).catch(() => { throw new LeadDeliveryError(503, "Book lead configuration is unavailable"); });
        if (!book) throw new Error("Unknown book");
        payload.event_type = "BOOK_DOWNLOAD_SUBMITTED";
        payload.contact.tags = book.leadMagnetTag ? [z.string().max(100).parse(book.leadMagnetTag)] : [];
        const service = PrimaryServiceEnum.safeParse(book.serviceLane?.toUpperCase().replace(/-/g, "_"));
        payload.intent.primary_service_interest = service.success ? service.data : undefined;
        payload.answers = book.serviceLane ? { service_lane: z.string().max(100).parse(book.serviceLane) } : undefined;
        payload.meta.book_slug = slug;
        payload.meta.source_page = `/books/${slug}`;
    } else {
        throw new Error("Unsupported lead form");
    }
    return GhlPayloadSchema.parse(payload);
}

export function canonicalReceiver(magnet: GhlPayload["intent"]["lead_magnet_type"]): string | undefined {
    if (magnet === "CONSTRUCTION_PROFIT_LEAK_CHECKLIST") return getEnv("GHL_CONSTRUCTION_CHECKLIST_WEBHOOK_URL");
    if (magnet === "CONSTRUCTION_PROFITABILITY_ASSESSMENT") return getEnv("GHL_CONSTRUCTION_ASSESSMENT_WEBHOOK_URL");
    if (magnet === "BLUEPRINT_MORE_INFO") return getEnv("GHL_BLUEPRINT_MORE_INFO_WEBHOOK_URL");
    return getEnv("GHL_WEBHOOK_URL");
}
