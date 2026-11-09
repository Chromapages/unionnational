import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FAQPageSchema } from "./FAQPageSchema";

describe("FAQ JSON-LD", () => {
    it("keeps hostile FAQ text inside one parseable script", () => {
        const question = '</script><script>alert("question")</script>';
        const answer = '</script><img src=x onerror="alert(1)">';
        const html = renderToStaticMarkup(<FAQPageSchema items={[{ question, answer }]} />);
        const content = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

        expect(html.match(/<\/script>/g)).toHaveLength(1);
        expect(content).toBeDefined();
        expect(JSON.parse(content!)).toMatchObject({
            mainEntity: [{ name: question, acceptedAnswer: { text: answer } }],
        });
    });

    it("omits structured data when no answers are displayed", () => {
        expect(renderToStaticMarkup(<FAQPageSchema items={[]} />)).toBe("");
    });
});
