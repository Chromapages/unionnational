import { createHmac, webcrypto } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const fixture = vi.hoisted(() => ({ secret: "synthetic-CMS-signature-secret", quota: vi.fn() }));
vi.mock("@/lib/config/env", () => ({ getEnv: (key: string) => key === "SANITY_REVALIDATE_SECRET" ? fixture.secret : undefined }));
vi.mock("@/lib/security/rate-limiter", () => ({ checkRateLimit: fixture.quota }));
vi.mock("@/lib/observability/logger", () => ({ logger: { warn: vi.fn() }, getTraceId: () => "synthetic-trace" }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }));

function signed(raw: string, timestamp = Date.now(), payload = raw) {
    const hmac = createHmac("sha256", fixture.secret).update(`${timestamp}.${payload}`).digest("base64url");
    return new NextRequest("https://example.test/api/revalidate", { method: "POST", headers: { "content-type": "application/json", "sanity-webhook-signature": `t=${timestamp},v1=${hmac}` }, body: raw });
}

describe("installed next-sanity HMAC boundary", () => {
    beforeEach(() => { vi.resetModules(); vi.clearAllMocks(); vi.stubGlobal("crypto", webcrypto); fixture.quota.mockResolvedValue({ success: true }); });
    afterEach(() => { vi.unstubAllGlobals(); });

    it("preserves original whitespace bytes and rejects duplicate signed deliveries without a second purge", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath } = await import("next/cache");
        const raw = '{  "_type":"faq", "_id":"synthetic-faq", "_rev":"synthetic-rev" }\n';
        const timestamp = Date.now();
        const first = await POST(signed(raw, timestamp));
        expect(first.status).toBe(200);
        const count = vi.mocked(revalidatePath).mock.calls.length;
        expect(await (await POST(signed(raw, timestamp))).json()).toMatchObject({ duplicate: true, revalidated: false });
        expect(revalidatePath).toHaveBeenCalledTimes(count);
        expect(fixture.quota.mock.calls.filter(([key]) => key === "sanity:revalidation-authenticated")).toHaveLength(2);
    }, 12_000);

    it("rejects a body altered after signing", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath } = await import("next/cache");
        const raw = '{"_type":"faq"}';
        expect((await POST(signed('{"_type":"testimonial"}', Date.now(), raw))).status).toBe(401);
        expect(revalidatePath).not.toHaveBeenCalled();
        expect(fixture.quota.mock.calls.map(([key]) => key)).toEqual(["sanity:revalidation-ingress"]);
    });

    it("rejects authentic stale and future signatures before invalidation", async () => {
        const { POST } = await import("@/app/api/revalidate/route");
        const { revalidatePath } = await import("next/cache");
        const raw = '{"_type":"faq"}';
        expect((await POST(signed(raw, Date.now() - 301_000))).status).toBe(401);
        expect((await POST(signed(raw, Date.now() + 31_000))).status).toBe(401);
        expect(revalidatePath).not.toHaveBeenCalled();
    });
});
