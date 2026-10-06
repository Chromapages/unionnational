import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("@/lib/config/env", () => ({ getEnv: (name: string) => name === "GHL_WEBHOOK_URL" || name === "GHL_SURVEY_WEBHOOK_URL" ? "https://crm.example.test/receiver" : undefined }));
vi.mock("@/lib/observability/logger", () => ({ getTraceId: () => "synthetic-trace", logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() }, createLogger: () => ({ withTrace: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }) }) }));
vi.mock("@/lib/observability/request-metrics", () => ({ incrementCounter: vi.fn(), withLatencyAsync: async (_name: string, fn: () => unknown) => fn() }));
import { POST as legacy } from "./ghl-intake/route";
import { POST as survey } from "./survey/route";
const fetchMock = vi.fn();
beforeEach(() => { fetchMock.mockReset(); vi.stubGlobal("fetch", fetchMock); });
afterEach(() => vi.unstubAllGlobals());
const request = (path: string, value: unknown) => new Request("https://app.example.test" + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(value) });

describe("logical lead equivalence across supported transport variants", () => {
    it("normalizes the legacy revenue alias before durable hashing", async () => {
        fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
        const value = { contact: { firstName: "Synthetic", lastName: "Test", email: "alias@audit.example.test" }, business: { annualRevenueband: "500K_1M", estimatedNetProfit: 100_000 }, tracking: { clientTimestamp: "first" }, meta: { submissionId: crypto.randomUUID() } };
        expect((await legacy(request("/api/ghl-intake", value))).status).toBe(200);
        const equivalent = { ...value, business: { annualRevenueBand: "500K_1M", estimatedNetProfit: 100_000 }, tracking: { clientTimestamp: "second" } };
        expect((await legacy(request("/api/ghl-intake", equivalent))).status).toBe(200);
        expect(fetchMock).toHaveBeenCalledOnce();
        expect(JSON.parse(fetchMock.mock.calls[0][1].body).business).not.toHaveProperty("annualRevenueband");
    });

    it("holds reordered CFO answers without another CRM request", async () => {
        fetchMock.mockRejectedValue(new DOMException("synthetic deadline", "TimeoutError"));
        const answers = ["under50k", "sole-prop", "no", "never", "no"].map((answer, index) => ({ questionId: index + 1, answer }));
        const value = { firstName: "Synthetic", email: "cfo-order@audit.example.test", lead_magnet_type: "PROACTIVE_CFO_ASSESSMENT", submission_id: crypto.randomUUID(), answers };
        expect((await survey(request("/api/survey", value))).status).toBe(504);
        expect((await survey(request("/api/survey", { ...value, answers: [...answers].reverse(), submission_id: crypto.randomUUID() }))).status).toBe(503);
        expect(fetchMock).toHaveBeenCalledOnce();
        expect(JSON.parse(fetchMock.mock.calls[0][1].body).raw_answers.map((answer: { questionId: number }) => answer.questionId)).toEqual([1, 2, 3, 4, 5]);
    });
});
