import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PricingPage, { generateMetadata } from "./page";
import { getPricingContent } from "@/lib/pricing/data";

vi.mock("@/lib/pricing/data", () => ({ getPricingContent: vi.fn() }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/pricing/PricingDraftNotice", () => ({ PricingDraftNotice: () => <p>Draft pending Jason approval</p> }));
vi.mock("@/sanity/lib/image", () => ({ urlFor: vi.fn() }));

beforeEach(() => { vi.mocked(getPricingContent).mockResolvedValue({ page: null, tiers: [], preview: false }); });

describe("pricing page editorial sources", () => {
    it("uses CMS hero, metadata, FAQ and closing instead of servicesPage or English fallbacks", async () => {
        vi.mocked(getPricingContent).mockResolvedValue({
            page: {
                hero: { heading: "Servicios y precios", description: "Alcance antes de comenzar." },
                seo: { metaTitle: "Precios revisados", metaDescription: "Descripción editorial." },
                faq: { heading: "Preguntas", items: [
                    { question: "¿Qué incluye?", answer: "Federal y Utah, según el servicio." },
                    { question: "", answer: "Unpublished empty question" },
                ] },
                closing: { heading: "Revisemos tu alcance", label: "Consultar", href: "javascript:alert(1)" },
            },
            tiers: [],
            preview: true,
        });
        const params = Promise.resolve({ locale: "es" });
        const metadata = await generateMetadata({ params });
        expect(metadata.title).toBe("Precios revisados");
        expect(metadata.description).toBe("Descripción editorial.");
        expect(metadata.robots).toEqual({ index: false, follow: false });
        const { container } = render(await PricingPage({ params }));
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Servicios y precios");
        expect(screen.getByText("Draft pending Jason approval")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Consultar" })).toHaveAttribute("href", "/es/contact");
        const schema = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
        expect(schema.mainEntity).toHaveLength(1);
        expect(schema.mainEntity[0].name).toBe("¿Qué incluye?");
        expect(schema.mainEntity[0].acceptedAnswer.text).toBe(screen.getByText("Federal y Utah, según el servicio.").textContent);
        expect(screen.queryByText("Unpublished empty question")).not.toBeInTheDocument();
    });

    it("keeps hostile FAQ text inside one escaped JSON-LD script", async () => {
        const answer = "</script><script>alert(1)</script>";
        vi.mocked(getPricingContent).mockResolvedValue({
            page: { faq: { items: [{ question: "Scope?", answer }] } },
            tiers: [], preview: false,
        });
        const { container } = render(await PricingPage({ params: Promise.resolve({ locale: "en" }) }));
        const scripts = container.querySelectorAll("script");
        expect(scripts).toHaveLength(1);
        expect(scripts[0].textContent).not.toContain("</script>");
        expect(JSON.parse(scripts[0].textContent!).mainEntity[0].acceptedAnswer.text).toBe(answer);
    });

    it("has localized neutral metadata and pricing when the page or references are absent", async () => {
        const params = Promise.resolve({ locale: "es" });
        expect((await generateMetadata({ params })).title).toBe("Precios | Union National Tax");
        render(await PricingPage({ params }));
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Precios de servicios");
        expect(screen.getByRole("link")).toHaveAttribute("href", "/es/contact");
        expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });
});
