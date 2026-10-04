import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CmsServicePage } from "./CmsServicePage";

const fetchMock = vi.hoisted(() => vi.fn());
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));
vi.mock("@/sanity/lib/queries", () => ({ SERVICE_PAGE_QUERY: "service" }));
vi.mock("@/sanity/lib/image", () => ({ urlFor: vi.fn() }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/services/ServicePageTemplate", () => ({ ServicePageTemplate: () => null }));

const service = {
    slug: { current: "custom-advisory" }, title: "Custom Advisory",
    hero: { subheadline: "Financial planning", primaryCta: { label: "Book" } },
    faqSection: { items: [] },
};

async function schemaFor(data: Record<string, unknown>) {
    fetchMock.mockResolvedValue({ data: { ...service, ...data } });
    const html = renderToStaticMarkup(await CmsServicePage({ cmsSlug: "custom-advisory", locale: "es", canonicalPath: "/services/custom-advisory" }));
    const content = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    expect(content).toBeDefined();
    return { html, schema: JSON.parse(content!) };
}

describe("CMS service JSON-LD graph", () => {
    beforeEach(() => fetchMock.mockReset());

    it.each(["Person", "Article", "FAQPage"])("keeps a Service entity when the editor hint is %s", async (structuredDataType) => {
        const { schema } = await schemaFor({ seo: { structuredDataType } });

        expect(schema["@graph"]).toHaveLength(1);
        expect(schema["@graph"][0]).toMatchObject({
            "@type": "Service", name: "Custom Advisory", url: "https://unionnationaltax.com/es/services/custom-advisory",
        });
        expect(schema["@graph"][0].mainEntity).toBeUndefined();
    });

    it("puts valid visible questions in a separate FAQPage node and safely preserves CMS strings", async () => {
        const question = '</script><script>alert("question")</script>';
        const answer = '</script><img src=x onerror="alert(1)">';
        const { html, schema } = await schemaFor({ faqSection: { items: [
            { question, answer }, { question: "Incomplete answer", answer: "" }, { question: "", answer: "Incomplete question" },
        ] } });

        expect(html.match(/<\/script>/g)).toHaveLength(1);
        expect(schema["@graph"]).toHaveLength(2);
        expect(schema["@graph"][1]).toMatchObject({
            "@type": "FAQPage", url: "https://unionnationaltax.com/es/services/custom-advisory",
            mainEntity: [{ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }],
        });
        expect(schema["@graph"][1].mainEntity).toHaveLength(1);
        expect(schema["@graph"][0].mainEntity).toBeUndefined();
    });
});
