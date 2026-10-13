import {describe, expect, it, vi} from "vitest";
import {createTranslator} from "next-intl";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import {generateMetadata} from "./page";

vi.mock("@/components/health-check/HealthCheckSurvey", () => ({HealthCheckSurvey: () => null}));
vi.mock("@/components/layout/HeaderWrapper", () => ({HeaderWrapper: () => null}));
vi.mock("@/components/layout/Footer", () => ({Footer: () => null}));
vi.mock("next-intl/server", () => ({getTranslations: async ({locale, namespace}: {locale: "en" | "es"; namespace: "HealthCheck.metadata"}) =>
    createTranslator({locale, messages: locale === "es" ? es : en, namespace}),
}));

describe("assessment metadata", () => {
    it.each(["en", "es"] as const)("uses neutral %s metadata and preserves assessment locale destinations", async locale => {
        const metadata = await generateMetadata({params: Promise.resolve({locale})});
        const copy = (locale === "es" ? es : en).HealthCheck.metadata;
        expect(metadata.title).toBe(copy.title);
        expect(metadata.description).toBe(copy.description);
        expect(metadata.description).not.toMatch(/2 minutes|2 minutos|thriving|prosperando/i);
        expect(metadata.alternates).toEqual({
            canonical: `https://unionnationaltax.com/${locale}/health-check`,
            languages: {en: "https://unionnationaltax.com/en/health-check", es: "https://unionnationaltax.com/es/health-check"},
        });
    });
});
