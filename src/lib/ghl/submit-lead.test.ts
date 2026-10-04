import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { GhlPayload } from "./contract";
import { submitGhlLead } from "./submit-lead";

const payload: GhlPayload = {
    event_type: "GENERAL_INQUIRY_SUBMITTED",
    contact: { first_name: "Alex", email: "alex@example.com" },
    intent: { lead_magnet_type: "STRATEGY_INTAKE" },
    meta: { submitted_at: "2026-09-30T00:00:00.000Z", version: "1.0", locale: "en" },
};

describe("lead submission acknowledgement", () => {
    const fetchMock = vi.fn();

    beforeEach(() => vi.stubGlobal("fetch", fetchMock));
    afterEach(() => {
        fetchMock.mockReset();
        vi.unstubAllGlobals();
    });

    it("reports success only after a successful acknowledgement", async () => {
        fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
        expect(await submitGhlLead(payload)).toEqual({ success: true });
        expect(fetchMock).toHaveBeenCalledWith("/api/ghl/intake", expect.objectContaining({ method: "POST" }));
        expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject(payload);
    });

    it.each([400, 429, 500])("keeps the form retryable after HTTP %i", async (status) => {
        fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: false }), { status }));
        expect(await submitGhlLead(payload)).toMatchObject({ success: false, message: expect.any(String) });
    });

    it("rejects an unacknowledged 200 response", async () => {
        fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 200 }));
        expect(await submitGhlLead(payload)).toMatchObject({ success: false });
    });

    it("rejects a malformed acknowledgement", async () => {
        fetchMock.mockResolvedValue(new Response("not json", { status: 200 }));
        expect(await submitGhlLead(payload)).toMatchObject({ success: false });
    });

    it("keeps the form retryable after a network failure", async () => {
        fetchMock.mockRejectedValue(new TypeError("Network failure"));
        expect(await submitGhlLead(payload)).toMatchObject({ success: false, message: expect.any(String) });
    });
});
