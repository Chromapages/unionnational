import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { FAQPageSchema } from "./FAQPageSchema";

const fetchMock = vi.hoisted(() => vi.fn());
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));
vi.mock("@/sanity/lib/queries", () => ({ FAQ_QUERY: "faq" }));
vi.mock("next-intl/server", () => ({ getLocale: () => Promise.resolve("en") }));

describe("FAQ JSON-LD", () => {
    it("keeps hostile published FAQ text inside one parseable script", async () => {
        const question = '</script><script>alert("question")</script>';
        const answer = '</script><img src=x onerror="alert(1)">';
        fetchMock.mockResolvedValue({ data: [{ question, answer }] });
        const html = renderToStaticMarkup(await FAQPageSchema());
        const content = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

        expect(html.match(/<\/script>/g)).toHaveLength(1);
        expect(content).toBeDefined();
        expect(JSON.parse(content!)).toMatchObject({
            mainEntity: [{ name: question, acceptedAnswer: { text: answer } }],
        });
    });
});
