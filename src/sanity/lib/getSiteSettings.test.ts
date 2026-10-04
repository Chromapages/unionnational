import { describe, expect, it, vi } from "vitest";
import { sanityFetchWithLocale } from "./live";
import { getSiteSettings } from "./getSiteSettings";

vi.mock("./live", () => ({ sanityFetchWithLocale: vi.fn() }));

describe("site settings fallback", () => {
    it("keeps the shared layout available when Sanity rejects", async () => {
        vi.mocked(sanityFetchWithLocale).mockRejectedValue(new Error("CMS unavailable"));
        await expect(getSiteSettings("es")).resolves.toBeNull();
    });

    it("preserves available settings", async () => {
        vi.mocked(sanityFetchWithLocale).mockResolvedValue({ data: { companyName: "Union National Tax" } } as never);
        await expect(getSiteSettings("en")).resolves.toMatchObject({ companyName: "Union National Tax" });
    });
});
