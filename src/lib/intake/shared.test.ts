import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("@/lib/config/env", () => ({ getEnv: () => undefined }));
import { readLeadJson, forwardToGhl, normalizePhone, leadFailureStatus } from "./shared";
import { LeadDeliveryError } from "@/lib/leads/delivery";
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
const request = (body: string, media = "application/json") => new Request("https://app.example.test/api/lead", { method: "POST", headers: { "Content-Type": media }, body });

describe("bounded lead JSON reader", () => {
    it("checks media type, rejects malformed JSON and counts actual UTF-8 bytes", async () => {
        expect(await readLeadJson(request("{}", "text/plain"))).toMatchObject({ ok: false, status: 415 });
        expect(await readLeadJson(request("{"))).toMatchObject({ ok: false, status: 400 });
        expect(await readLeadJson(request(JSON.stringify({ value: "é".repeat(17_000) })))).toMatchObject({ ok: false, status: 413 });
        expect(await readLeadJson(request('{"name":"José"}', "application/json; charset=utf-8"))).toEqual({ ok: true, value: { name: "José" } });
    });

    it("times out and cancels an incomplete stream without waiting for the sender", async () => {
        vi.useFakeTimers();
        const cancel = vi.fn();
        const stream = new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode("{")); }, cancel });
        const req = new Request("https://app.example.test/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: stream, duplex: "half" } as RequestInit);
        const outcome = readLeadJson(req);
        await vi.advanceTimersByTimeAsync(5_001);
        expect(await outcome).toMatchObject({ ok: false, status: 408 });
        expect(cancel).toHaveBeenCalledOnce();
    });

    it("rejects an absent body or media type and contains stream read errors", async () => {
        expect(await readLeadJson(new Request("https://app.example.test/api/lead", { method: "POST", headers: { "Content-Type": "application/json" } }))).toMatchObject({ ok: false, status: 400 });
        expect(await readLeadJson(new Request("https://app.example.test/api/lead", { method: "POST", body: "{}" }))).toMatchObject({ ok: false, status: 415 });
        const stream = new ReadableStream({ start(controller) { controller.error(new Error("synthetic stream fault")); } });
        const req = new Request("https://app.example.test/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: stream, duplex: "half" } as RequestInit);
        expect(await readLeadJson(req)).toMatchObject({ ok: false, status: 400 });
    });

    it("reassembles a split UTF-8 character without corrupting contact data", async () => {
        const bytes = new TextEncoder().encode('{"name":"José"}');
        const position = bytes.indexOf(0xc3);
        const stream = new ReadableStream({ start(controller) { controller.enqueue(bytes.slice(0, position + 1)); controller.enqueue(bytes.slice(position + 1)); controller.close(); } });
        const req = new Request("https://app.example.test/api/lead", { method: "POST", headers: { "Content-Type": "Application/JSON; charset=utf-8" }, body: stream, duplex: "half" } as RequestInit);
        expect(await readLeadJson(req)).toEqual({ ok: true, value: { name: "José" } });
    });

    it("contains cancellation failures on oversized and stalled senders", async () => {
        const cancel = vi.fn().mockRejectedValue(new Error("synthetic cancel failure"));
        const large = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(33_000)); }, cancel });
        const largeReq = new Request("https://app.example.test/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: large, duplex: "half" } as RequestInit);
        expect(await readLeadJson(largeReq)).toMatchObject({ ok: false, status: 413 });
        vi.useFakeTimers();
        const stalled = new ReadableStream({ cancel });
        const stalledReq = new Request("https://app.example.test/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: stalled, duplex: "half" } as RequestInit);
        const outcome = readLeadJson(stalledReq);
        await vi.advanceTimersByTimeAsync(5_001);
        expect(await outcome).toMatchObject({ ok: false, status: 408 });
        expect(cancel).toHaveBeenCalledTimes(2);
    });

    it("fails before dispatch when CRM configuration is missing and maps typed recovery failures safely", async () => {
        const fetch = vi.fn(); vi.stubGlobal("fetch", fetch);
        await expect(forwardToGhl({ event_type: "SYNTHETIC" })).rejects.toThrow("not configured");
        expect(fetch).not.toHaveBeenCalled();
        expect(leadFailureStatus(new LeadDeliveryError(503, "synthetic unavailable"))).toBe(503);
        expect(leadFailureStatus({ name: "TimeoutError" })).toBe(504);
        expect(leadFailureStatus(new Error("synthetic transport failure"))).toBe(502);
    });

    it("preserves international and extension-bearing callback numbers", () => {
        expect(normalizePhone(undefined)).toBeUndefined();
        expect(normalizePhone("+33123456789")).toBe("+33123456789");
        expect(normalizePhone(" 555-010-1234 ext.99 ")).toBe("555-010-1234 ext.99");
    });
});
