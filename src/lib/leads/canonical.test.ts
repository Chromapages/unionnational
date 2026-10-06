import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ fetchBook: vi.fn(), env: {} as Record<string, string> }));
vi.mock("@/sanity/lib/client", () => ({ client: { fetch: mocks.fetchBook } }));
vi.mock("@/lib/config/env", () => ({ getEnv: (key: string) => mocks.env[key] }));
import { canonicalLead, canonicalReceiver } from "./canonical";
import { GhlPayloadSchema } from "@/lib/ghl/contract";
beforeEach(() => { mocks.fetchBook.mockReset(); mocks.env = {}; });

function form(magnet: string, extra: Record<string, unknown> = {}) {
    return GhlPayloadSchema.parse({
        event_type: "FORGED", contact: { first_name: "José", email: "synthetic@audit.example.test", tags: ["FORGED_PAID"] },
        intent: { lead_magnet_type: magnet, high_intent: true }, results: { fit_score: 100 },
        meta: { locale: "es", source_page: "/synthetic-source", submitted_at: "2026-10-05T00:00:00.000Z", submission_id: "d3db602a-72d1-496d-9f43-c3fb3e9c03f1" }, ...extra,
    });
}

describe("server-owned CRM contracts", () => {
    it("preserves descriptive intake fields and Other while discarding privileged fields", async () => {
        const input = form("STRATEGY_INTAKE", { business: { entity_type: "OTHER", business_type: "Other", annual_revenue_band: "1M_3M" }, answers: { books_status: "Somewhat behind", interested_in_scorp: true, unrecognized: "stripped" } });
        const output = await canonicalLead(input);
        expect(output.event_type).toBe("GENERAL_INQUIRY_SUBMITTED");
        expect(output.contact.tags).toBeUndefined();
        expect(output.results).toBeUndefined();
        expect(output.intent.high_intent).toBeUndefined();
        expect(output.business).toEqual(input.business);
        expect(output.meta).toMatchObject({ locale: "es", source_page: "/synthetic-source", submission_id: input.meta.submission_id });
        expect(output.answers).toEqual({ books_status: "Somewhat behind", interested_in_scorp: true });
    });

    it("recomputes construction and restaurant classifications from valid answers", async () => {
        const construction = await canonicalLead(form("CONSTRUCTION_ASSESSMENT", { business: { annual_revenue_band: "1M_3M" }, answers: { job_costing: "Yes, fully automated", cash_flow: "Weekly / Real-time", estimating: "Highly accurate / Data-driven", reviews: "Monthly / Proactive" } }));
        expect(construction.results).toEqual({ fit_score: 80, assessment_label: "Strong Foundation" });
        expect(construction.intent.high_intent).toBe(false);
        expect(construction.contact.tags).toEqual(["unt-construction-blueprint", "unt-fit-score-high"]);
        const restaurant = await canonicalLead(form("RESTAURANT_PROFIT_LEAK_ASSESSMENT", { business: { annual_revenue_band: "1M_3M" }, answers: { prime_cost: "Never", food_cost: "Guesswork", labor_burden: "Over 35%", menu_pricing: "Never", financial_rhythm: "Never", cash_flow: "Blind", tax_compliance: "No" } }));
        expect(restaurant.results).toEqual({ fit_score: 0, assessment_label: "Critical" });
        expect(restaurant.intent.high_intent).toBe(true);
        expect(restaurant.business?.industry).toBe("HOSPITALITY");
    });

    it("preserves the construction maximum71 and existing75 threshold for owner disposition", async () => {
        const output = await canonicalLead(form("CONSTRUCTION_PROFITABILITY_ASSESSMENT", {
            business: { annual_revenue_band: "1M_3M", revenue_range_label: "$1M–$3M", employee_count_band: "10–19" },
            answers: { trade_type: "HVAC", biggest_challenge: "Cash Flow", job_costing_knows_profit: "Yes", cash_flow_forecast: "Yes", operational_change_orders: "Yes", estimating_current_data: "Yes", cash_flow_payroll_stress: "No", operational_sub_accountability: "Yes" },
        }));
        expect(output.results).toEqual({ fit_score: 71, assessment_label: "Good Fit" });
        expect(output.intent.high_intent).toBe(false);
        expect(output.contact.tags).not.toContain("Qualified_HighIntent");
        expect(output.meta.version).toBe("2.0");
    });

    it.each(["CONSTRUCTION_PROFIT_LEAK_CHECKLIST", "BLUEPRINT_MORE_INFO"])("derives approved tags for %s and requires separate receiver config", async (magnet) => {
        const output = await canonicalLead(form(magnet));
        expect(output.contact.tags).not.toContain("FORGED_PAID");
        expect(output.intent.primary_service_interest).toBe("CONSTRUCTION_BLUEPRINT");
        expect(canonicalReceiver(output.intent.lead_magnet_type)).toBeUndefined();
        if (magnet === "BLUEPRINT_MORE_INFO") expect(output.contact.tags).toContain("Lang_ES");
    });

    it("derives book tags/service from published server metadata and preserves book identity", async () => {
        mocks.fetchBook.mockResolvedValue({ leadMagnetTag: "APPROVED_BOOK", serviceLane: "tax-planning" });
        const input = form("BOOK_DOWNLOAD", { meta: { locale: "es", book_slug: "audit-book", source_page: "/books/audit-book", submitted_at: "2026-10-05T00:00:00.000Z" }, answers: { service_lane: "forged" } });
        const output = await canonicalLead(input);
        expect(output.contact.tags).toEqual(["APPROVED_BOOK"]);
        expect(output.intent.primary_service_interest).toBe("TAX_PLANNING");
        expect(output.answers).toEqual({ service_lane: "tax-planning" });
        expect(output.meta).toMatchObject({ locale: "es", source_page: "/books/audit-book", book_slug: "audit-book" });
        expect(mocks.fetchBook.mock.calls.at(-1)?.[1]).toEqual({ slug: "audit-book" });
        expect(mocks.fetchBook.mock.calls.at(-1)?.[2].perspective).toBe("published");
    });

    it("rejects unknown form types and forged answer values instead of forwarding them", async () => {
        await expect(canonicalLead(form("RESOURCE_DOWNLOAD"))).rejects.toThrow();
        await expect(canonicalLead(form("CONSTRUCTION_ASSESSMENT", { business: { annual_revenue_band: "1M_3M" }, answers: { job_costing: "constructor" } }))).rejects.toThrow();
    });

    it("preserves approved strategy interests but rejects invented workflow options", async () => {
        const input = form("STRATEGY_INTAKE", { intent: { lead_magnet_type: "STRATEGY_INTAKE", urgency: "THIS_QUARTER", preferred_next_step: "EMAIL_SUMMARY_REQUESTED", services_of_interest: ["S-Corp Advantage", "Strategic Visibility/Books"] } });
        expect((await canonicalLead(input)).intent.services_of_interest).toEqual(["S-Corp Advantage", "Strategic Visibility/Books"]);
        await expect(canonicalLead({ ...input, intent: { ...input.intent, services_of_interest: ["FORGED_FULFILLMENT"] } })).rejects.toThrow();
    });

    it("preserves the tax source with optional answers and derives its fixed service", async () => {
        const tax = await canonicalLead(form("TAX_SAVINGS_ANALYSIS", { answers: { source: "synthetic-campaign", ignored: "FORGED" } }));
        expect(tax.event_type).toBe("TAX_ANALYSIS_SUBMITTED");
        expect(tax.intent).toEqual({ lead_magnet_type: "TAX_SAVINGS_ANALYSIS", primary_service_interest: "TAX_PLANNING" });
        expect(tax.answers).toEqual({ source: "synthetic-campaign" });
        expect((await canonicalLead(form("TAX_SAVINGS_ANALYSIS"))).answers).toEqual({});
    });

    it.each([
        [20, "High Risk", "IMMEDIATE", "low", { job_costing: "No, we don&apos;t track job-by-job", cash_flow: "Never / We just check bank balance", estimating: "Guesswork / Based on intuition", reviews: "Never / Only at tax time" }],
        [35, "Profit Leaks Present", "THIS_QUARTER", "medium", { job_costing: "Partially / Inconsistent", cash_flow: "Never / We just check bank balance", estimating: "Guesswork / Based on intuition", reviews: "Annually / Semi-annually" }],
        [60, "Strong Foundation", "PLANNING_ONLY", "high", { job_costing: "Yes, fully automated", cash_flow: "Weekly / Real-time", estimating: "Mostly accurate, but we miss things", reviews: "Never / Only at tax time" }],
    ])("derives the construction %i classification boundary instead of client results", async (score, label, urgency, tier, answers) => {
        const output = await canonicalLead(form("CONSTRUCTION_ASSESSMENT", { business: { annual_revenue_band: "1M_3M" }, answers }));
        expect(output.results).toEqual({ fit_score: score, assessment_label: label });
        expect(output.intent.urgency).toBe(urgency);
        expect(output.contact.tags).toContain(`unt-fit-score-${tier}`);
        expect(output.intent.high_intent).toBe(score < 60);
    });

    it.each([
        [10, "Needs Work", "THIS_QUARTER", { prime_cost: "Weekly", food_cost: "Full plate costing", labor_burden: "30–35%", menu_pricing: "Never", financial_rhythm: "Never", cash_flow: "Blind", tax_compliance: "No" }],
        [18, "Strong Foundation", "PLANNING_ONLY", { prime_cost: "Weekly", food_cost: "Full plate costing", labor_burden: "Under 30%", menu_pricing: "Within 6 months", financial_rhythm: "1–2 weeks", cash_flow: "Blind", tax_compliance: "No" }],
    ])("derives the restaurant %i classification boundary", async (score, label, urgency, answers) => {
        const output = await canonicalLead(form("RESTAURANT_PROFIT_LEAK_ASSESSMENT", { business: { annual_revenue_band: "UNDER_100K" }, answers }));
        expect(output.results).toEqual({ fit_score: score, assessment_label: label });
        expect(output.intent.urgency).toBe(urgency);
        expect(output.intent.high_intent).toBe(false);
    });

    it.each([
        ["CONSTRUCTION_ASSESSMENT", { job_costing: "Partially / Inconsistent", cash_flow: "Monthly / Quarterly", estimating: "Mostly accurate, but we miss things", reviews: "Annually / Semi-annually" }],
        ["RESTAURANT_PROFIT_LEAK_ASSESSMENT", { prime_cost: "Never", food_cost: "Guesswork", labor_burden: "Over 35%", menu_pricing: "Never", financial_rhythm: "Never", cash_flow: "Blind", tax_compliance: "No" }],
    ])("rejects a missing or unsupported revenue answer for %s", async (magnet, answers) => {
        await expect(canonicalLead(form(magnet, { answers }))).rejects.toThrow("Invalid revenue answer");
        await expect(canonicalLead(form(magnet, { business: { annual_revenue_band: "PREFER_NOT_TO_SAY" }, answers }))).rejects.toThrow("Invalid revenue answer");
    });

    it.each([
        [0, "Low Fit", "Under $100K", "UNDER_100K", { job_costing_knows_profit: "No", cash_flow_forecast: "No", operational_change_orders: "No", estimating_current_data: "Starting", cash_flow_payroll_stress: "Yes", operational_sub_accountability: "No" }],
        [25, "Nurture", "$250K–$500K", "100K_500K", { job_costing_knows_profit: "No", cash_flow_forecast: "Yes", operational_change_orders: "No", estimating_current_data: "Starting", cash_flow_payroll_stress: "Yes", operational_sub_accountability: "No" }],
        [50, "Good Fit", "$1M–$3M", "1M_3M", { job_costing_knows_profit: "Yes", cash_flow_forecast: "Yes", operational_change_orders: "Yes", estimating_current_data: "Starting", cash_flow_payroll_stress: "Yes", operational_sub_accountability: "No" }],
    ])("derives the v2 construction %i bucket without inventing the unreachable75 threshold", async (score, label, revenueLabel, band, options) => {
        const output = await canonicalLead(form("CONSTRUCTION_PROFITABILITY_ASSESSMENT", { business: { annual_revenue_band: band, revenue_range_label: revenueLabel, employee_count_band: "1–4" }, answers: { trade_type: "HVAC", biggest_challenge: "Job Costing", ...options } }));
        expect(output.results).toEqual({ fit_score: score, assessment_label: label });
        expect(output.intent.high_intent).toBe(false);
    });

    it("rejects contradictory v2 revenue and invalid employee options", async () => {
        const answers = { trade_type: "HVAC", biggest_challenge: "Job Costing", job_costing_knows_profit: "Sometimes", cash_flow_forecast: "Sometimes", operational_change_orders: "Usually", estimating_current_data: "Somewhat", cash_flow_payroll_stress: "No", operational_sub_accountability: "Sometimes" };
        await expect(canonicalLead(form("CONSTRUCTION_PROFITABILITY_ASSESSMENT", { answers, business: { annual_revenue_band: "1M_3M", revenue_range_label: "$250K–$500K", employee_count_band: "1–4" } }))).rejects.toThrow("Revenue answers disagree");
        await expect(canonicalLead(form("CONSTRUCTION_PROFITABILITY_ASSESSMENT", { answers, business: { annual_revenue_band: "100K_500K", revenue_range_label: "$250K–$500K", employee_count_band: "invented" } }))).rejects.toThrow();
    });

    it("derives English blueprint tags and uses the configured approved receiver map", async () => {
        const output = await canonicalLead(form("BLUEPRINT_MORE_INFO", { meta: { locale: "en", submitted_at: "2026-10-05T00:00:00.000Z" } }));
        expect(output.contact.tags).toContain("Lang_EN");
        mocks.env = { GHL_CONSTRUCTION_CHECKLIST_WEBHOOK_URL: "https://crm.example.test/checklist", GHL_CONSTRUCTION_ASSESSMENT_WEBHOOK_URL: "https://crm.example.test/assessment", GHL_BLUEPRINT_MORE_INFO_WEBHOOK_URL: "https://crm.example.test/info", GHL_WEBHOOK_URL: "https://crm.example.test/generic" };
        expect(canonicalReceiver("CONSTRUCTION_PROFIT_LEAK_CHECKLIST")).toBe(mocks.env.GHL_CONSTRUCTION_CHECKLIST_WEBHOOK_URL);
        expect(canonicalReceiver("CONSTRUCTION_PROFITABILITY_ASSESSMENT")).toBe(mocks.env.GHL_CONSTRUCTION_ASSESSMENT_WEBHOOK_URL);
        expect(canonicalReceiver("BLUEPRINT_MORE_INFO")).toBe(mocks.env.GHL_BLUEPRINT_MORE_INFO_WEBHOOK_URL);
        expect(canonicalReceiver("STRATEGY_INTAKE")).toBe(mocks.env.GHL_WEBHOOK_URL);
    });

    it("fails safely for book lookup outage, unknown identity and absent campaign metadata", async () => {
        const input = form("BOOK_DOWNLOAD", { meta: { book_slug: "audit-book", submitted_at: "2026-10-05T00:00:00.000Z" } });
        mocks.fetchBook.mockRejectedValueOnce(new Error("synthetic metadata outage"));
        await expect(canonicalLead(input)).rejects.toMatchObject({ status: 503 });
        mocks.fetchBook.mockResolvedValueOnce(null);
        await expect(canonicalLead(input)).rejects.toThrow("Unknown book");
        mocks.fetchBook.mockResolvedValueOnce({});
        const output = await canonicalLead(input);
        expect(output.contact.tags).toEqual([]);
        expect(output.intent.primary_service_interest).toBeUndefined();
        expect(output.answers).toBeUndefined();
    });
});
