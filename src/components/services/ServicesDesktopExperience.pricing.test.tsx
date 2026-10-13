import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ServicesDesktopExperience } from "./ServicesDesktopExperience";
import type { PricingTier } from "@/types/sanity";
import type { Service } from "./ServicesClient";

const fixture = vi.hoisted(() => ({ locale: "en" }));
vi.mock("next-intl", () => ({
    useLocale: () => fixture.locale,
    useTranslations: () => Object.assign((key: string) => key, { raw: () => [] }),
}));
vi.mock("@/components/home/BookingCtaLink", () => ({ BookingCtaLink: () => null }));
vi.mock("@/components/industries/IndustryDiscovery", () => ({ IndustryDiscovery: () => null }));
vi.mock("./TaxResolutionSection", () => ({ TaxResolutionSection: () => null }));
vi.mock("next/image", () => ({ default: () => null }));

function offer(id: string, values: Partial<PricingTier> = {}): PricingTier {
    return { _id: id, name: id, category: "advisory", price: "From $2,500", billingPeriod: "monthly", features: [], ...values } as PricingTier;
}

function html(tiers: PricingTier[], services: Service[] = []) {
    return renderToStaticMarkup(<ServicesDesktopExperience tiers={tiers} services={services} faqItems={[]} />);
}

describe("services referenced pricing", () => {
    it("renders only selected advisory offers in source order without invented package names or annual suffixes", () => {
        fixture.locale = "en";
        const output = html([offer("review", { name: "Annual plan", price: "From $3,500", billingPeriod: "annually" }), offer("cpob", { name: "Construction blueprint" })]);
        expect(output.indexOf("Annual plan")).toBeLessThan(output.indexOf("Construction blueprint"));
        expect(output.match(/data-support-plan=/g)).toHaveLength(2);
        expect(output).toContain("From $2,500/month");
        expect(output).toContain("From $3,500/year");
        expect(output).not.toMatch(/foundation|executive|\$6,500|implementation fee/i);
    });

    it("retains Spanish CMS features, notes and price meaning instead of translation fallback content", () => {
        fixture.locale = "es";
        const output = html([offer("cpob", { name: "Plan de construcción", price: "Desde $2,500", features: ["Contabilidad de proyectos revisada"], priceNote: "El alcance se confirma antes de comenzar." })]);
        expect(output).toContain("Contabilidad de proyectos revisada");
        expect(output).toContain("El alcance se confirma antes de comenzar.");
        expect(output).toContain("Desde $2,500/mes");
        expect(output).not.toContain("fallbackFeatures");
    });

    it("keeps partnership and S-corp filing separate and never restores legacy card prices", () => {
        fixture.locale = "en";
        const services = [{ _id: "tax-service", slug: { current: "tax-preparation-and-filing" }, startingPrice: "$1,800", pricingOffers: [offer("partnership", { name: "Partnership returns", category: "business", price: "From $1,495", billingPeriod: "one-time", priceNote: "Federal and Utah included." }), offer("scorp", { name: "S-corporation returns", category: "business", price: "From $1,795", billingPeriod: "one-time" })] }] as Service[];
        const output = html([], services);
        expect(output).toContain("Partnership returns");
        expect(output).toContain("From $1,495");
        expect(output).toContain("S-corporation returns");
        expect(output).toContain("From $1,795");
        expect(output).toContain("Federal and Utah included.");
        expect(output).not.toContain("$1,800");
        expect(html([], [{ ...services[0], pricingOffers: undefined }])).toContain("Contact us for pricing");
        expect(html([], [{ ...services[0], pricingOffers: undefined }])).not.toContain("$1,800");
    });

    it("ignores dangling references and malformed arrays without resurrecting old prices", () => {
        fixture.locale = "en";
        const services = [{ _id: "broken", slug: { current: "tax-planning" }, startingPrice: "$6,500", pricingOffers: [null, { _id: "invalid", price: {} }] }] as unknown as Service[];
        const output = html([null, { _id: "invalid", price: {} }] as unknown as PricingTier[], services);
        expect(output).toContain("Contact us for pricing");
        expect(output).not.toContain("$6,500");
        expect(output).not.toContain("data-support-plan");
    });
});
