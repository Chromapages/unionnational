import { describe, expect, it, vi } from "vitest";
import { sanityFetch } from "@/sanity/lib/live";
import Home from "./page";

vi.mock("@/sanity/lib/live", () => ({ sanityFetch: vi.fn() }));
vi.mock("next-intl/server", () => ({ getTranslations: async () => (key: string) => key }));

describe("homepage CMS recovery", () => {
    it("returns a usable page when settings and optional content fail", async () => {
        vi.mocked(sanityFetch).mockRejectedValue(new Error("CMS unavailable"));
        const page = await Home({ params: Promise.resolve({ locale: "en" }) });
        expect(page).toBeTruthy();
        expect(page.props.children).toBeTruthy();
    });

    it("returns a usable page when optional records are missing", async () => {
        vi.mocked(sanityFetch).mockResolvedValue({ data: null } as never);
        const page = await Home({ params: Promise.resolve({ locale: "es" }) });
        expect(page).toBeTruthy();
    });
});
