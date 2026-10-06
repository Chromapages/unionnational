import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("@/lib/config/env", () => ({ getEnv: () => undefined }));
const logs = vi.hoisted(() => ({ warn: vi.fn(), info: vi.fn() }));
vi.mock("@/lib/observability/logger", () => ({ logger: logs }));
const receiver = "https://crm.example.test/receiver";
const payload = { event_type: "SYNTHETIC_LOCAL_LEAD", contact: { email: "synthetic-local@audit.example.test" } };
const fetchMock = vi.fn();
beforeEach(() => { vi.resetModules(); fetchMock.mockReset().mockResolvedValue(new Response(null, { status: 202 })); logs.warn.mockClear(); logs.info.mockClear(); vi.stubGlobal("fetch", fetchMock); });
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("local fallback delivery boundaries", () => {
    it("refuses the development fallback in production before a CRM side effect", async () => {
        vi.stubEnv("NODE_ENV", "production");
        const { deliverLead } = await import("./delivery");
        await expect(deliverLead(payload, "https://services.leadconnectorhq.com/synthetic-fixture", crypto.randomUUID())).rejects.toMatchObject({ status: 503 });
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("uses fallback identity for submissions without a UUID and reconciles an uncertain local receipt", async () => {
        const { deliverLead, reconcileLeadDelivery } = await import("./delivery");
        fetchMock.mockRejectedValueOnce(new TypeError("synthetic transport failure"));
        await expect(deliverLead({ ...payload, source_page: "/synthetic-form" }, receiver)).rejects.toMatchObject({ status: 502 });
        const receipt = logs.warn.mock.calls[0][1].receipt;
        expect(await reconcileLeadDelivery(receipt, "accepted", "synthetic verified acknowledgement", "invalid operator with spaces")).toBe(false);
        expect(await reconcileLeadDelivery(receipt, "accepted", "synthetic verified acknowledgement")).toBe(true);
        expect((await deliverLead({ ...payload, source_page: "/synthetic-form" }, receiver)).ok).toBe(true);
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("deduplicates the tax-analysis transport shape without an event field", async () => {
        const { deliverLead } = await import("./delivery");
        const tax = { name: "Synthetic Contact", email: "synthetic-tax@audit.example.test", phone: "5550101234", business_type: "construction", revenue_range: "$1M-$3M", annual_revenue_band: "1M_3M", source: "unt-tax-analysis", locale: "es", timestamp: "2026-10-05T00:00:00.000Z" };
        await deliverLead(tax, receiver);
        expect((await deliverLead({ ...tax, timestamp: "2026-10-05T00:01:00.000Z" }, receiver, crypto.randomUUID())).ok).toBe(true);
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("keeps an operator acknowledgement when an in-flight sender finishes later", async () => {
        const { deliverLead, reconcileLeadDelivery } = await import("./delivery");
        fetchMock.mockRejectedValueOnce(new TypeError("synthetic initial transport failure"));
        await expect(deliverLead(payload, receiver)).rejects.toMatchObject({ status: 502 });
        const receipt = logs.warn.mock.calls[0][1].receipt;
        expect(await reconcileLeadDelivery(receipt, "not_delivered", "synthetic proven absence of initial delivery")).toBe(true);
        let finish!: (response: Response) => void;
        fetchMock.mockImplementation(() => new Promise<Response>(resolve => { finish = resolve; }));
        const pending = deliverLead(payload, receiver);
        await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
        expect(await reconcileLeadDelivery(receipt, "accepted", "synthetic receiver evidence while acknowledgement is in-flight")).toBe(true);
        finish(new Response(null, { status: 202 }));
        await expect(pending).rejects.toMatchObject({ status: 503 });
        expect((await deliverLead(payload, receiver)).ok).toBe(true);
        expect(await reconcileLeadDelivery(receipt, "accepted", "synthetic receiver evidence")).toBe(false);
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("bounds unique local claims without evicting an accepted receipt", async () => {
        const { deliverLead } = await import("./delivery");
        for (let index = 0; index < 10_000; index++) await deliverLead({ ...payload, answers: { unique_fixture: index } }, receiver);
        await expect(deliverLead({ ...payload, answers: { unique_fixture: 10_000 } }, receiver)).rejects.toMatchObject({ status: 503 });
        expect((await deliverLead({ ...payload, answers: { unique_fixture: 0 } }, receiver)).ok).toBe(true);
        expect(fetchMock).toHaveBeenCalledTimes(10_000);
    });

    it("bounds local submitted-ID aliases even when answers are duplicates", async () => {
        const { deliverLead } = await import("./delivery");
        const initial = crypto.randomUUID();
        await deliverLead(payload, receiver, initial);
        for (let index = 1; index < 10_000; index++) await deliverLead(payload, receiver, crypto.randomUUID());
        await expect(deliverLead(payload, receiver, crypto.randomUUID())).rejects.toMatchObject({ status: 503 });
        expect((await deliverLead(payload, receiver, initial)).ok).toBe(true);
        expect(fetchMock).toHaveBeenCalledOnce();
    });
});
