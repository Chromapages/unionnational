import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
type Guard = { ok: true } | { ok: false; status: 403 | 429 | 503; error: string; retryAfter?: string };
const controls = vi.hoisted(() => ({ ingress: { ok: true } as Guard, contact: { ok: true } as Guard, env: {} as Record<string, string>, calculatorError: undefined as unknown }));
vi.mock("@/lib/security/lead-ingress", () => ({ checkLeadIngress: vi.fn(async () => controls.ingress), checkLeadContact: vi.fn(async () => controls.contact) }));
vi.mock("@/lib/config/env", () => ({ getEnv: (name: string) => controls.env[name] }));
vi.mock("@/lib/observability/logger", () => ({ getTraceId: () => "synthetic-trace", logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() }, createLogger: () => ({ withTrace: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }) }) }));
vi.mock("@/lib/observability/request-metrics", () => ({ incrementCounter: vi.fn(), withLatencyAsync: async (_name: string, fn: () => unknown) => fn() }));
vi.mock("@/sanity/lib/client", () => ({ client: { fetch: vi.fn().mockRejectedValue(new Error("synthetic book metadata outage")) } }));
vi.mock("@/lib/scorp/calculateFitScore", async (original) => {
    const originalModule = await original<typeof import("@/lib/scorp/calculateFitScore")>();
    return { ...originalModule, calculateFitScore: (...args: Parameters<typeof originalModule.calculateFitScore>) => { if (controls.calculatorError !== undefined) throw controls.calculatorError; return originalModule.calculateFitScore(...args); } };
});
vi.mock("@/lib/leads/delivery", async (original) => {
    const originalModule = await original<typeof import("@/lib/leads/delivery")>();
    return { ...originalModule, deliverLead: async (payload: unknown, url: string) => fetch(url, { method: "POST", body: JSON.stringify(payload) }) };
});
import { POST as canonical } from "./ghl/intake/route";
import { POST as legacy } from "./ghl-intake/route";
import { POST as construction } from "./submit-application/route";
import { POST as restaurant } from "./submit-restaurant-application/route";
import { POST as tax } from "./leads/tax-analysis/route";
import { POST as survey } from "./survey/route";
import { POST as scorp } from "./scorp-estimator/route";
import { LeadDeliveryError } from "@/lib/leads/delivery";
const email = "synthetic-guards@audit.example.test";
const contact = { firstName: "Synthetic", lastName: "Contact", email, phone: "5550101234" };
const application = { ...contact, companyName: "Synthetic Business", revenue: "1M_3M" };
const scorpInput = { full_name: "Synthetic Contact", email, phone: "5550101234", business_name: "Synthetic Business", entity_type: "LLC", niche_vertical: "CONSTRUCTION", income_subject_to_se_tax: "YES", annual_revenue_band: "100K_250K", estimated_net_profit_range: "100K_150K", current_payroll_status: "NOT_RUNNING_PAYROLL", tax_payroll_readiness: "MEDIUM", primary_pain_point: "OVERPAYING_TAXES" };
const routes = [
    ["canonical", canonical, { contact: { first_name: "Synthetic", email }, event_type: "FORGED", intent: { lead_magnet_type: "STRATEGY_INTAKE" } }],
    ["legacy", legacy, { contact }], ["construction", construction, application], ["restaurant", restaurant, application],
    ["tax", tax, { name: "Synthetic Contact", email, phone: contact.phone, businessType: "construction", revenueRange: "$1M-$3M" }],
    ["survey", survey, { ...contact, answers: { 1: 15, 2: 20, 3: 15, 4: 15, 5: 12, 6: 12, 7: 11 } }], ["scorp", scorp, scorpInput],
] as const;
const request = (body: unknown) => new Request("https://app.example.test/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const fetchMock = vi.fn();
beforeEach(() => {
    controls.ingress = { ok: true }; controls.contact = { ok: true }; controls.calculatorError = undefined;
    controls.env = Object.fromEntries(["GHL_WEBHOOK_URL", "GHL_SURVEY_WEBHOOK_URL", "GHL_APPLICATION_WEBHOOK_URL", "GHL_RESTAURANT_APPLICATION_WEBHOOK_URL", "GHL_TAX_ANALYSIS_WEBHOOK_URL", "GHL_SCORP_ESTIMATOR_WEBHOOK_URL"].map(name => [name, "https://crm.example.test/receiver"]));
    fetchMock.mockReset().mockResolvedValue(new Response(null, { status: 202 })); vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

for (const [name, post, body] of routes) {
    describe(`${name} failure boundaries`, () => {
        it.each([429, 503] as const)("rejects ingress %i before body work or provider calls", async (status) => {
            controls.ingress = { ok: false, status, error: "Synthetic guard rejection", ...(status === 429 ? { retryAfter: "60" } : {}) };
            const req = request(body);
            const read = vi.spyOn(req.body!, "getReader");
            const response = await post(req);
            expect(response.status).toBe(status);
            expect(response.headers.get("Retry-After")).toBe(status === 429 ? "60" : null);
            expect(read).not.toHaveBeenCalled(); expect(fetchMock).not.toHaveBeenCalled();
        });
        it.each([429, 503] as const)("rejects a valid lead at the independent contact quota %i", async (status) => {
            controls.contact = { ok: false, status, error: "Synthetic contact quota rejection", ...(status === 429 ? { retryAfter: "42" } : {}) };
            const response = await post(request(body));
            expect(response.status).toBe(status); expect(fetchMock).not.toHaveBeenCalled();
        });
    });
}

describe("canonical validation and provider failure boundaries", () => {
    it.each([null, [], "a string"])("rejects non-object JSON payload %s before forwarding", async body => {
        expect((await canonical(request(body))).status).toBe(400); expect(fetchMock).not.toHaveBeenCalled();
    });
    it("reports invalid contact/schema and unsupported workflow answers without leaking input", async () => {
        const invalid = await canonical(request({ event_type: "FORGED", contact: { email: "invalid" }, intent: { lead_magnet_type: "STRATEGY_INTAKE" } }));
        expect(invalid.status).toBe(400);
        expect(await invalid.json()).toMatchObject({ success: false, error: "GHL Validation Failed", details: expect.any(Array) });
        const unsupported = await canonical(request({ contact: { first_name: "Synthetic", email }, event_type: "FORGED", intent: { lead_magnet_type: "RESOURCE_DOWNLOAD" } }));
        expect(unsupported.status).toBe(400); expect(fetchMock).not.toHaveBeenCalled();
    });
    it("reports durable submission identity conflicts as409 without success acknowledgement", async () => {
        fetchMock.mockRejectedValue(new LeadDeliveryError(409, "Synthetic identity conflict"));
        expect((await canonical(request(routes[0][2]))).status).toBe(409);
    });
    it("keeps book metadata outages unavailable instead of misclassifying them as accepted leads", async () => {
        const response = await canonical(request({ event_type: "FORGED", contact: { first_name: "Synthetic", email }, intent: { lead_magnet_type: "BOOK_DOWNLOAD" }, meta: { book_slug: "audit-book" } }));
        expect(response.status).toBe(503); expect(fetchMock).not.toHaveBeenCalled();
    });
    it("rejects oversized/malformed S-Corp bodies and preserves calculation when CRM is unconfigured", async () => {
        const malformed = new Request("https://app.example.test/api/scorp", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
        expect((await scorp(malformed)).status).toBe(400);
        expect((await scorp(request({ padding: "x".repeat(33_000) }))).status).toBe(413);
        delete controls.env.GHL_SCORP_ESTIMATOR_WEBHOOK_URL;
        const response = await scorp(request(scorpInput));
        expect(await response.json()).toMatchObject({ success: true, lead_captured: false }); expect(fetchMock).not.toHaveBeenCalled();
    });
    it.each([new Error("Synthetic confidential failure"), "synthetic non-error rejection"])("contains calculator exception %s", async error => {
        controls.calculatorError = error;
        const response = await scorp(request(scorpInput));
        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ success: false, message: "Failed to process estimate" }); expect(fetchMock).not.toHaveBeenCalled();
    });
    it("does not claim delivery after a non-Error transport rejection", async () => {
        fetchMock.mockRejectedValue("synthetic rejection");
        const response = await scorp(request(scorpInput));
        expect(await response.json()).toMatchObject({ success: true, lead_captured: false });
    });
    it("fails safely when legacy forwarding is unconfigured", async () => {
        delete controls.env.GHL_WEBHOOK_URL;
        expect((await legacy(request(routes[1][2]))).status).toBe(503); expect(fetchMock).not.toHaveBeenCalled();
    });
    it("uses the tax source default when no marketing source was supplied", async () => {
        expect((await tax(request(routes[4][2]))).status).toBe(200);
        expect(JSON.parse(fetchMock.mock.calls[0][1].body).source).toBe("unt-tax-analysis");
    });
});
