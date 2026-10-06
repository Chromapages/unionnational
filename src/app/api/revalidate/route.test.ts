import { createHmac, webcrypto } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { POST } from "./route";

const SECRET = "synthetic-CMS-route-secret";
vi.mock("next-sanity/webhook", async () => {
    const sdk = await vi.importActual<typeof import("next-sanity/webhook")>("next-sanity/webhook");
    // Keep the installed HMAC verifier; skip only its three-second consistency sleep.
    return { parseBody: vi.fn((req: NextRequest, secret?: string) => sdk.parseBody(req, secret, false)) };
});
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }));
vi.mock("@/lib/config/env", () => ({ getEnv: (key: string) => key === "SANITY_REVALIDATE_SECRET" ? "synthetic-CMS-route-secret" : undefined }));
vi.mock("@/lib/security/rate-limiter", () => ({ checkRateLimit: vi.fn(async () => ({ success: true })) }));
vi.mock("@/lib/observability/logger", () => ({ getTraceId: () => "test-trace", logger: { error: vi.fn(), warn: vi.fn() } }));

function request(body: unknown, secret = SECRET) {
    const raw = JSON.stringify(body);
    const timestamp = Date.now();
    const hmac = createHmac("sha256", secret).update(`${timestamp}.${raw}`).digest("base64url");
    return new NextRequest("https://example.test/api/revalidate", { method: "POST", headers: {
        "content-type": "application/json",
        "sanity-webhook-signature": `t=${timestamp},v1=${hmac}`,
    }, body: raw });
}

const scopes = [
    ["servicePage", null],
    ["blogPost", ["blog", "hub"]],
    ["siteSettings", null],
    ["product", ["shop", "books"]],
    ["legalPage", null],
    ["industryVertical", ["industries", "hub"]],
    ["playbook", ["hub"]],
    ["playbookChapter", ["hub"]],
] as const;

describe("Sanity public revalidation contracts", () => {
    beforeEach(() => { vi.clearAllMocks(); vi.stubGlobal("crypto", webcrypto); });
    afterEach(() => { vi.unstubAllGlobals(); });

    it.each(scopes)("refreshes the approved locale scope and sitemap after an authentic %s update", async (_type, sections) => {
        const body = { _type, _id: `fixture-${_type}`, _rev: "fixture-revision", slug: { current: "sample" } };
        const req = request(body);
        const response = await POST(req);

        expect(response.status).toBe(200);
        expect(await response.json()).toMatchObject({ revalidated: true });
        expect(parseBody).toHaveBeenCalledWith(expect.any(NextRequest), SECRET);
        for (const locale of ["en", "es"]) {
            if (sections) {
                for (const section of sections) expect(revalidatePath).toHaveBeenCalledWith(`/${locale}/${section}`, "layout");
                expect(revalidatePath).toHaveBeenCalledWith(`/${locale}`, "page");
                expect(revalidatePath).not.toHaveBeenCalledWith(`/${locale}`, "layout");
            } else {
                expect(revalidatePath).toHaveBeenCalledWith(`/${locale}`, "layout");
            }
        }
        expect(revalidatePath).toHaveBeenCalledWith("/sitemap.xml");
        if (_type === "siteSettings" || _type === "legalPage") expect(revalidateTag).toHaveBeenCalledWith("site-settings", { expire: 0 });
        else expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("rejects a fresh but incorrect HMAC without invalidating content", async () => {
        const response = await POST(request({ _type: "servicePage" }, "different-synthetic-secret"));
        expect(response.status).toBe(401);
        expect(parseBody).toHaveBeenCalled();
        expect(revalidatePath).not.toHaveBeenCalled();
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("rejects an authentically signed malformed payload without invalidating content", async () => {
        const response = await POST(request({}));
        expect(response.status).toBe(400);
        expect(parseBody).toHaveBeenCalled();
        expect(revalidatePath).not.toHaveBeenCalled();
        expect(revalidateTag).not.toHaveBeenCalled();
    });
});
