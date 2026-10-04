import { beforeEach, describe, expect, it, vi } from "vitest";
import { parseBody } from "next-sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { POST } from "./route";

vi.mock("next-sanity/webhook", () => ({ parseBody: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }));
vi.mock("@/lib/config/env", () => ({ getEnv: () => "test-secret" }));
vi.mock("@/lib/observability/logger", () => ({ getTraceId: () => "test-trace", logger: { error: vi.fn() } }));

const request = () => new Request("http://localhost/api/revalidate", { method: "POST" });

describe("Sanity revalidation", () => {
    beforeEach(() => vi.clearAllMocks());

    it.each(["servicePage", "blogPost", "siteSettings", "product", "legalPage", "industryVertical", "playbook", "playbookChapter"])("refreshes locale trees, sitemap and settings after an authorized %s update", async (_type) => {
        vi.mocked(parseBody).mockResolvedValue({ isValidSignature: true, body: { _type, slug: { current: "sample" } } } as never);
        const response = await POST(request() as never);

        expect(response.status).toBe(200);
        expect(revalidatePath).toHaveBeenCalledWith("/en", "layout");
        expect(revalidatePath).toHaveBeenCalledWith("/es", "layout");
        expect(revalidatePath).toHaveBeenCalledWith("/sitemap.xml");
        expect(revalidateTag).toHaveBeenCalledWith("site-settings", { expire: 0 });
    });

    it("rejects bad signatures without invalidating content", async () => {
        vi.mocked(parseBody).mockResolvedValue({ isValidSignature: false, body: { _type: "servicePage" } } as never);
        const response = await POST(request() as never);

        expect(response.status).toBe(401);
        expect(revalidatePath).not.toHaveBeenCalled();
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("rejects malformed signed payloads without invalidating content", async () => {
        vi.mocked(parseBody).mockResolvedValue({ isValidSignature: true, body: {} } as never);
        const response = await POST(request() as never);
        expect(response.status).toBe(400);
        expect(revalidatePath).not.toHaveBeenCalled();
        expect(revalidateTag).not.toHaveBeenCalled();
    });
});
