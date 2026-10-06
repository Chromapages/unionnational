import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const state = vi.hoisted(() => ({
    secret: "test-revalidate-secret-abc123" as string | undefined,
    signatureValid: true,
    quota: vi.fn(),
}));
vi.mock("@/lib/config/env", () => ({ getEnv: (key: string) => key === "SANITY_REVALIDATE_SECRET" ? state.secret : undefined }));
vi.mock("@/lib/observability/logger", () => ({ logger: { warn: vi.fn(), error: vi.fn() }, getTraceId: () => "test-trace-id" }));
vi.mock("@/lib/security/rate-limiter", () => ({ checkRateLimit: state.quota }));
vi.mock("next-sanity/webhook", () => ({
    parseBody: vi.fn(async (req: Request) => ({ isValidSignature: state.signatureValid, body: JSON.parse(await req.text()) })),
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }));

function request(body: unknown = { _type: "blogPost", _id: "post-one", _rev: "rev-one" }, options: { timestamp?: number; signature?: string; media?: string; length?: string } = {}) {
    const headers = new Headers({
        "Content-Type": options.media ?? "application/json",
        "sanity-webhook-signature": options.signature ?? `t=${options.timestamp ?? Date.now()},v1=${"a".repeat(43)}`,
    });
    if (options.length) headers.set("content-length", options.length);
    return new NextRequest("https://example.test/api/revalidate", { method: "POST", headers, body: JSON.stringify(body) });
}

describe("signed CMS revalidation", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        state.secret = "test-revalidate-secret-abc123";
        state.signatureValid = true;
        state.quota.mockResolvedValue({ success: true });
    });
    afterEach(() => { vi.useRealTimers(); });

    it("invalidates blog/hub in both locales without purging unrelated locale layouts or echoing the document", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath, revalidateTag } = await import("next/cache");
        const res = await POST(request());
        expect(res.status).toBe(200);
        expect(await res.json()).toMatchObject({ revalidated: true });
        expect(revalidatePath).toHaveBeenCalledWith("/en/blog", "layout");
        expect(revalidatePath).toHaveBeenCalledWith("/es/hub", "layout");
        expect(revalidatePath).not.toHaveBeenCalledWith("/en", "layout");
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it.each(["faq", "testimonial", "siteSettings", "legalPage"])("keeps shared %s content coherent across both language trees", async type => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath, revalidateTag } = await import("next/cache");
        expect((await POST(request({ _type: type }))).status).toBe(200);
        expect(revalidatePath).toHaveBeenCalledWith("/en", "layout");
        expect(revalidatePath).toHaveBeenCalledWith("/es", "layout");
        if (type === "siteSettings" || type === "legalPage") expect(revalidateTag).toHaveBeenCalledWith("site-settings", { expire: 0 });
    });

    it("acknowledges a duplicate signed document revision without another invalidation even when delivery headers change", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath } = await import("next/cache");
        const first = request();
        const duplicate = request(undefined, { timestamp: Date.now() + 1000 });
        duplicate.headers.set("idempotency-key", "attacker-changed-unsigned-header");
        expect((await POST(first)).status).toBe(200);
        const calls = vi.mocked(revalidatePath).mock.calls.length;
        const second = await POST(duplicate);
        expect(await second.json()).toMatchObject({ duplicate: true, revalidated: false });
        expect(revalidatePath).toHaveBeenCalledTimes(calls);
    });

    it("revalidates a genuinely new signed revision", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        expect((await POST(request())).status).toBe(200);
        expect(await (await POST(request({ _type: "blogPost", _id: "post-one", _rev: "rev-two" }))).json()).toMatchObject({ revalidated: true });
    });

    it.each([-301_000, 31_000])("rejects expired/future timestamps (%s ms) before reading/signature parsing", async offset => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { parseBody } = await import("next-sanity/webhook");
        expect((await POST(request(undefined, { timestamp: Date.now() + offset }))).status).toBe(401);
        expect(parseBody).not.toHaveBeenCalled();
        expect(state.quota).not.toHaveBeenCalled();
    });

    it("accepts a signed retry within the provider's current retry window", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        expect((await POST(request(undefined, { timestamp: Date.now() - 120_000 }))).status).toBe(200);
    });

    it.each(["", "v1=bad", "t=2025-01-01,v1=bad"])("rejects malformed/missing signed headers", async signature => {
        const { POST } = await import("@/app/api/revalidate/route");
        expect((await POST(request(undefined, { signature }))).status).toBe(401);
    });

    it("fails closed when the configured signature secret is absent", async () => {
        state.secret = undefined;
        const { POST } = await import("@/app/api/revalidate/route");
        expect((await POST(request())).status).toBe(401);
    });

    it("rejects an invalid HMAC without cache operations", async () => {
        state.signatureValid = false;
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath } = await import("next/cache");
        expect((await POST(request())).status).toBe(401);
        expect(revalidatePath).not.toHaveBeenCalled();
    });

    it.each([{}, { _type: "stripeWebhookIdempotency" }, { _type: "blogPost", slug: { current: "../../secret" } }])("rejects unsupported or malformed signed payloads", async body => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath } = await import("next/cache");
        expect((await POST(request(body))).status).toBe(400);
        expect(revalidatePath).not.toHaveBeenCalled();
    });

    it.each(["drafts.post-one", "versions.release.post-one"])("ignores unpublished %s without invalidating public content", async id => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath } = await import("next/cache");
        const res = await POST(request({ _type: "blogPost", _id: id }));
        expect(res.status).toBe(200);
        expect(await res.json()).toMatchObject({ ignored: true, revalidated: false });
        expect(revalidatePath).not.toHaveBeenCalled();
    });

    it("bounds declared and actual body length before SDK verification", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { parseBody } = await import("next-sanity/webhook");
        expect((await POST(request(undefined, { length: "300000" }))).status).toBe(413);
        expect((await POST(request({ _type: "blogPost", padding: "x".repeat(300000) }))).status).toBe(413);
        expect(parseBody).not.toHaveBeenCalled();
    });

    it("rejects other media types before signature parsing", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { parseBody } = await import("next-sanity/webhook");
        expect((await POST(request(undefined, { media: "text/plain" }))).status).toBe(415);
        expect(parseBody).not.toHaveBeenCalled();
    });

    it("cancels an incomplete body and returns a retryable deadline response", async () => {
        vi.useFakeTimers();
        const { POST } = await import("@/app/api/revalidate/route");
        const cancelled = vi.fn();
        const stream = new ReadableStream<Uint8Array>({ cancel: cancelled });
        const headers = request().headers;
        const slow = new NextRequest("https://example.test/api/revalidate", { method: "POST", headers, body: stream });
        const response = POST(slow);
        await vi.advanceTimersByTimeAsync(5001);
        expect((await response).status).toBe(503);
        expect(cancelled).toHaveBeenCalled();
    });

    it("returns a retryable quota response without reading the body", async () => {
        state.quota.mockResolvedValue({ success: false });
        const { POST } = await import("@/app/api/revalidate/route");
        const { parseBody } = await import("next-sanity/webhook");
        expect((await POST(request())).status).toBe(429);
        expect(parseBody).not.toHaveBeenCalled();
    });

    it("returns retryable unavailable when shared quota fails", async () => {
        state.quota.mockRejectedValue(new Error("unavailable"));
        const { POST } = await import("@/app/api/revalidate/route");
        expect((await POST(request())).status).toBe(503);
    });

    it("releases a failed cache claim so a legitimate retry can complete", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath } = await import("next/cache");
        vi.mocked(revalidatePath).mockImplementationOnce(() => { throw new Error("Cache unavailable"); });
        expect((await POST(request())).status).toBe(503);
        expect(await (await POST(request())).json()).toMatchObject({ revalidated: true });
    });
});
