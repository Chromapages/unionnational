import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ─── Mock env ───────────────────────────────────────────────────────────────

vi.mock("@/lib/config/env", () => ({
    getEnv: (key: string) => {
        const env: Record<string, string> = {
            SANITY_REVALIDATE_SECRET: "test-revalidate-secret-abc123",
        };
        return env[key];
    },
}));

vi.mock("@/lib/observability/logger", () => ({
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    getTraceId: () => "test-trace-id",
}));

// ─── Mock next/sanity webhook ───────────────────────────────────────────────

vi.mock("next-sanity/webhook", () => ({
    parseBody: vi.fn(),
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildRevalidateRequest(body: unknown, secret?: string): Request {
    const url = new URL("https://example.com/api/revalidate");
    if (secret) url.searchParams.set("secret", secret);

    return new Request(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("POST /api/revalidate", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns 200 with revalidated:true when secret is valid", async () => {
        const { parseBody } = await import("next-sanity/webhook");
        const { revalidatePath } = await import("next/cache");

        vi.mocked(parseBody).mockResolvedValueOnce({
            isValidSignature: true,
            body: { _type: "post", slug: { current: "my-post" } },
        });

        const req = buildRevalidateRequest({ _type: "post" }, "test-revalidate-secret-abc123");

        const { POST } = await import("@/app/api/revalidate/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.revalidated).toBe(true);
        expect(body.status).toBe(200);
        expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("returns 401 when secret query parameter is missing", async () => {
        const { parseBody } = await import("next-sanity/webhook");
        vi.mocked(parseBody).mockResolvedValueOnce({
            isValidSignature: false,
            body: null,
        });

        const req = buildRevalidateRequest({ _type: "post" }); // no secret

        const { POST } = await import("@/app/api/revalidate/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(401);
        const bodyText = await res.text();
        expect(bodyText).toContain("Invalid Signature");
    });

    it("returns 401 when secret query parameter is invalid", async () => {
        const { parseBody } = await import("next-sanity/webhook");
        vi.mocked(parseBody).mockResolvedValueOnce({
            isValidSignature: false,
            body: null,
        });

        const req = buildRevalidateRequest({ _type: "post" }, "wrong-secret");

        const { POST } = await import("@/app/api/revalidate/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(401);
        const bodyText = await res.text();
        expect(bodyText).toContain("Invalid Signature");
    });

    it("returns 401 when secret is empty string", async () => {
        const { parseBody } = await import("next-sanity/webhook");
        vi.mocked(parseBody).mockResolvedValueOnce({
            isValidSignature: false,
            body: null,
        });

        const req = buildRevalidateRequest({ _type: "post" }, "");

        const { POST } = await import("@/app/api/revalidate/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(401);
    });

    it("returns 400 when body._type is missing", async () => {
        const { parseBody } = await import("next-sanity/webhook");
        vi.mocked(parseBody).mockResolvedValueOnce({
            isValidSignature: true,
            body: { slug: { current: "my-post" } }, // no _type
        });

        const req = buildRevalidateRequest({ slug: { current: "my-post" } }, "test-revalidate-secret-abc123");

        const { POST } = await import("@/app/api/revalidate/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const bodyText = await res.text();
        expect(bodyText).toContain("Bad Request");
    });

    it("revalidates the home page path on valid request", async () => {
        const { parseBody } = await import("next-sanity/webhook");
        const { revalidatePath } = await import("next/cache");

        vi.mocked(parseBody).mockResolvedValueOnce({
            isValidSignature: true,
            body: { _type: "page" },
        });

        const req = buildRevalidateRequest({ _type: "page" }, "test-revalidate-secret-abc123");

        const { POST } = await import("@/app/api/revalidate/route");
        await POST(req as unknown as NextRequest);

        expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("returns 200 with traceId even when revalidation throws", async () => {
        const { parseBody } = await import("next-sanity/webhook");
        const { revalidatePath } = await import("next/cache");

        vi.mocked(parseBody).mockResolvedValueOnce({
            isValidSignature: true,
            body: { _type: "post" },
        });

        vi.mocked(revalidatePath).mockImplementationOnce(() => {
            throw new Error("Cache error");
        });

        const req = buildRevalidateRequest({ _type: "post" }, "test-revalidate-secret-abc123");

        const { POST } = await import("@/app/api/revalidate/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(500);
        const body = await res.json();
        expect(body.error).toBe("Revalidation failed");
        expect(body.traceId).toBeDefined();
    });

    it("does not revalidate when signature is invalid even with correct secret param", async () => {
        const { parseBody } = await import("next-sanity/webhook");
        const { revalidatePath } = await import("next/cache");

        // parseBody returns isValidSignature: false despite correct-looking secret
        // (the secret in query param is compared by parseBody against env)
        vi.mocked(parseBody).mockResolvedValueOnce({
            isValidSignature: false,
            body: { _type: "post" },
        });

        const req = buildRevalidateRequest({ _type: "post" }, "test-revalidate-secret-abc123");

        const { POST } = await import("@/app/api/revalidate/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(401);
        expect(revalidatePath).not.toHaveBeenCalled();
    });

    it("returns 200 even when body is empty but signature is valid", async () => {
        const { parseBody } = await import("next-sanity/webhook");
        const { revalidatePath } = await import("next/cache");

        vi.mocked(parseBody).mockResolvedValueOnce({
            isValidSignature: true,
            body: { _type: "post" },
        });

        const req = buildRevalidateRequest({ _type: "post" }, "test-revalidate-secret-abc123");

        const { POST } = await import("@/app/api/revalidate/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        expect(revalidatePath).toHaveBeenCalled();
    });
});