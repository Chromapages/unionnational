import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateMetadata } from "./layout";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";

vi.mock("@/sanity/lib/getSiteSettings", () => ({ getSiteSettings: vi.fn() }));
vi.mock("@/sanity/lib/image", () => ({ urlFor: vi.fn() }));
vi.mock("@/lib/fonts", () => ({ inter: { variable: "inter" }, outfit: { variable: "outfit" } }));
vi.mock("@/components/ChatWidget", () => ({ ChatWidget: () => null }));
vi.mock("@/lib/theme/ThemeProvider", () => ({ ThemeProvider: () => null }));
vi.mock("@/components/seo/MetaPixel", () => ({ MetaPixel: () => null }));
vi.mock("@/components/ProgressBar", () => ({ ProgressBar: () => null }));
vi.mock("@/components/layout/SkipLink", () => ({ SkipLink: () => null }));
vi.mock("@/sanity/lib/live", () => ({ SanityLive: () => null }));
vi.mock("next-intl", () => ({ NextIntlClientProvider: () => null }));
vi.mock("next-intl/server", () => ({ getMessages: vi.fn(), getTranslations: vi.fn() }));

describe("locale layout global indexing", () => {
    beforeEach(() => vi.mocked(getSiteSettings).mockReset());

    it.each(["en", "es"])("honors an explicit global noindex flag for general and Google robots in %s", async (locale) => {
        vi.mocked(getSiteSettings).mockResolvedValue({ companyName: "Union National Tax", seo: { noIndex: true } } as never);
        const metadata = await generateMetadata({ params: Promise.resolve({ locale }) });

        expect(metadata.robots).toMatchObject({ index: false, follow: false, googleBot: { index: false, follow: false } });
        expect(metadata.title).toBe("Union National Tax");
        expect(metadata.metadataBase?.href).toBe("https://unionnationaltax.com/");
    });

    it.each([false, undefined])("retains current indexing when global noindex is %s", async (noIndex) => {
        vi.mocked(getSiteSettings).mockResolvedValue({ seo: { noIndex } } as never);
        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
        expect(metadata.robots).toMatchObject({ index: true, follow: true, googleBot: { index: true, follow: true } });
    });

    it("does not guess a global noindex flag when settings are unavailable", async () => {
        vi.mocked(getSiteSettings).mockResolvedValue(null);
        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
        expect(metadata.robots).toMatchObject({ index: true, googleBot: { index: true } });
    });
});
