import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// Route contract tests isolate durable dispatch; delivery concurrency/outcome tests cover the real store.
vi.mock("@/lib/leads/delivery", () => ({
    LeadDeliveryError: class extends Error {},
    deliverLead: async (payload: unknown, url: string, id?: string, trace?: string) => fetch(url, {
        method: "POST", body: JSON.stringify(payload), signal: AbortSignal.timeout(8_000),
        headers: { "Content-Type": "application/json", ...(id ? { "X-Submission-Id": id } : {}), ...(trace ? { "X-Trace-Id": trace } : {}) },
    }),
}));

const settings = vi.hoisted(() => ({ url: "https://crm.example.test/survey" as string | undefined, limited: false, migration: undefined as string | undefined }));
vi.mock("@/lib/config/env", () => ({ getEnv: (name: string) => name === "HEALTH_SURVEY_FINGERPRINT_MIGRATION_CONFIRMED" ? settings.migration : settings.url }));
vi.mock("@/lib/security/rate-limiter", () => ({
  contactRateLimitKey: (email: string) => email,
  checkRateLimit: async () => ({ success: !settings.limited, resetTime: Date.now() + 60_000 }),
}));
vi.mock("@/lib/observability/logger", () => ({
  getTraceId: () => "trace-test",
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

import { POST } from "./route";
import { HEALTH_ANSWER_CONTRACT_VERSION, HEALTH_QUESTIONS } from "@/lib/intake/health-score";
import { logger } from "@/lib/observability/logger";

const contact = { firstName: "Ava", lastName: "Rivera", email: "ava@example.test", phone: "5550101234" };
const healthAnswers = { 1: 15, 2: 20, 3: 15, 4: 15, 5: 12, 6: 12, 7: 11 };
const request = (body: string) => new Request("http://localhost/api/survey", { method: "POST", headers: { "Content-Type": "application/json" }, body });

describe("survey capture", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    settings.url = "https://crm.example.test/survey";
    settings.limited = false;
    settings.migration = undefined;
    fetchMock.mockReset();
    vi.mocked(logger.info).mockClear();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it.each([undefined, "false", "configured", "TRUE"])("blocks production survey delivery before migration confirmation %s", async value => {
    vi.stubEnv("NODE_ENV", "production");
    settings.migration = value;
    const response = await POST(request(JSON.stringify({ ...contact, answers: healthAnswers })));
    expect(response.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("permits a synthetic confirmed production migration and keeps CFO delivery independent", async () => {
    vi.stubEnv("NODE_ENV", "production");
    settings.migration = "true";
    fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
    expect((await POST(request(JSON.stringify({ ...contact, answers: healthAnswers })))).status).toBe(200);
    settings.migration = undefined;
    const answers = ["under50k", "sole-prop", "no", "never", "no"].map((answer, index) => ({ questionId: index + 1, answer }));
    expect((await POST(request(JSON.stringify({ ...contact, phone: "", answers, lead_magnet_type: "PROACTIVE_CFO_ASSESSMENT" })))).status).toBe(200);
  });

  it.each([
    [40, [15, 20, 5, 0, 0, 0, 0], "critical"],
    [41, [15, 20, 0, 0, 0, 0, 6], "stable"],
    [75, [15, 20, 15, 15, 4, 0, 6], "stable"],
    [76, [15, 20, 15, 15, 8, 3, 0], "growth"],
  ])("recomputes the %i boundary instead of trusting the client", async (expected, values, category) => {
    fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
    const answers = Object.fromEntries(values.map((value, index) => [index + 1, value]));
    const response = await POST(request(JSON.stringify({ ...contact, answers, score: 999, locale: "es" })));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, score: expected, category });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).customData).toMatchObject({ financial_health_score: expected, locale: "es" });
  });

  it("recomputes CFO answers, preserves the phone and discards forged option scores", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
    const answers = ["under50k", "sole-prop", "no", "never", "no"].map((answer, index) => ({ questionId: index + 1, answer, score: 999 }));
    const response = await POST(request(JSON.stringify({ ...contact, phone: "", answers, score: 999, lead_magnet_type: "PROACTIVE_CFO_ASSESSMENT" })));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, score: 20 });
    const forwarded = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(forwarded.contact.phone).toBe("");
    expect(forwarded.raw_answers.every((answer: { score: number }) => answer.score === 1)).toBe(true);
  });

  it.each(HEALTH_QUESTIONS.flatMap(question => question.options.map(option => ({ question, option }))))("retains new option $question.id/$option.id and source through CRM mapping", async ({ question, option }) => {
    fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
    const answers = { ...healthAnswers, [question.id]: option.value };
    const ids = Object.fromEntries(HEALTH_QUESTIONS.map(item => [item.id, item.id === question.id ? option.id : item.options[0].id]));
    const response = await POST(request(JSON.stringify({ ...contact, answers, answer_option_ids: ids, answer_contract_version: HEALTH_ANSWER_CONTRACT_VERSION, locale: "es", source_page: "/es/health-check" })));
    expect(response.status).toBe(200);
    const forwarded = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(forwarded).toMatchObject(contact);
    expect(forwarded.customData).toMatchObject({ answer_option_ids: ids, answer_contract_version: HEALTH_ANSWER_CONTRACT_VERSION, locale: "es", source_page: "/es/health-check", raw_answers: JSON.stringify(answers) });
    expect(logger.info).toHaveBeenCalledWith("Survey accepted", { traceId: "trace-test" });
  });

  it("accepts legacy ambiguous zero without adding inferred IDs", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
    const response = await POST(request(JSON.stringify({ ...contact, answers: { ...healthAnswers, 2: 0 } })));
    expect(response.status).toBe(200);
    const customData = JSON.parse(fetchMock.mock.calls[0][1].body).customData;
    expect(customData).not.toHaveProperty("answer_option_ids");
    expect(customData).not.toHaveProperty("answer_contract_version");
  });

  it.each([
    { answer_contract_version: HEALTH_ANSWER_CONTRACT_VERSION },
    { answer_option_ids: {} },
    { answer_option_ids: {}, answer_contract_version: "unknown" },
    { answer_option_ids: {}, answer_contract_version: HEALTH_ANSWER_CONTRACT_VERSION },
    { answer_option_ids: null, answer_contract_version: HEALTH_ANSWER_CONTRACT_VERSION },
    { answer_option_ids: Object.fromEntries(HEALTH_QUESTIONS.map(question => [question.id, "unknown"])), answer_contract_version: HEALTH_ANSWER_CONTRACT_VERSION },
  ])("rejects invalid new identity metadata %j", async extra => {
    expect((await POST(request(JSON.stringify({ ...contact, answers: healthAnswers, ...extra })))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects forged answers, malformed JSON, oversized bodies and invalid contact", async () => {
    expect((await POST(request(JSON.stringify({ ...contact, answers: { ...healthAnswers, 1: 999 } })))).status).toBe(400);
    expect((await POST(request(JSON.stringify({ ...contact, email: "bad", answers: healthAnswers })))).status).toBe(400);
    expect((await POST(request("{"))).status).toBe(400);
    expect((await POST(request(JSON.stringify({ padding: "x".repeat(33_000) })))).status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(["constructor", "__proto__", "toString", ["under50k"], { answer: "under50k" }])("rejects inherited or coercible CFO option %s", async (answer) => {
    const answers = Array.from({ length: 5 }, (_, index) => ({ questionId: index + 1, answer }));
    expect((await POST(request(JSON.stringify({ ...contact, answers, lead_magnet_type: "PROACTIVE_CFO_ASSESSMENT" })))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([{}, [], [{ questionId: 1, answer: "under50k" }], [null, null, null, null, null], [[1], [2], [3], [4], [5]]])("rejects malformed CFO answer structure %s", async (answers) => {
    expect((await POST(request(JSON.stringify({ ...contact, answers, lead_magnet_type: "PROACTIVE_CFO_ASSESSMENT" })))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([null, [], { 1: 15 }, { "01": 15, 2: 20, 3: 15, 4: 15, 5: 12, 6: 12, 7: 11 }])("rejects malformed health answer structure %s", async answers => {
    expect((await POST(request(JSON.stringify({ ...contact, answers })))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("requires a phone for the health survey and rejects duplicate CFO questions", async () => {
    expect((await POST(request(JSON.stringify({ ...contact, phone: "", answers: healthAnswers })))).status).toBe(400);
    const answers = Array.from({ length: 5 }, () => ({ questionId: 1, answer: "under50k" }));
    expect((await POST(request(JSON.stringify({ ...contact, answers, lead_magnet_type: "PROACTIVE_CFO_ASSESSMENT" })))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    [40, ["50k-150k", "single-llc", "sometimes", "tax-time", "standard"], "MEDIUM", false],
    [100, ["over1m", "ccorp", "proactive", "monthly", "all"], "LOW", true],
  ])("derives CFO %i urgency and qualification while preserving source", async (score, options, urgency, highIntent) => {
    fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
    const answers = options.map((answer, index) => ({ questionId: index + 1, answer, score: 999 }));
    const response = await POST(request(JSON.stringify({ ...contact, answers, lead_magnet_type: "PROACTIVE_CFO_ASSESSMENT", source_page: "/es/proactive-cfo-assessment" })));
    expect(await response.json()).toMatchObject({ success: true, score });
    const forwarded = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(forwarded.source_page).toBe("/es/proactive-cfo-assessment");
    expect(forwarded.intent.urgency_level).toBe(urgency);
    expect(forwarded.results.high_intent_flag).toBe(highIntent);
    expect(forwarded.results.fit_score).toBeLessThanOrEqual(100);
  });

  it("fails closed for missing configuration and rate limit", async () => {
    settings.url = undefined;
    expect((await POST(request(JSON.stringify({ ...contact, answers: healthAnswers })))).status).toBe(503);
    settings.url = "https://crm.example.test/survey";
    settings.limited = true;
    expect((await POST(request(JSON.stringify({ ...contact, answers: healthAnswers })))).status).toBe(429);
  });

  it.each([400, 429, 500])("does not acknowledge upstream %i", async (status) => {
    fetchMock.mockResolvedValue(new Response(null, { status }));
    expect((await POST(request(JSON.stringify({ ...contact, answers: healthAnswers })))).status).toBe(502);
  });

  it.each([
    [new TypeError("network"), 502],
    [new DOMException("deadline", "TimeoutError"), 504],
  ])("reports transport failure %s", async (error, status) => {
    fetchMock.mockRejectedValue(error);
    expect((await POST(request(JSON.stringify({ ...contact, answers: healthAnswers })))).status).toBe(status);
  });
});
