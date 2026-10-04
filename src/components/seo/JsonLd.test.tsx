import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { JsonLd } from "./JsonLd";

describe("JsonLd", () => {
    it("keeps hostile CMS text inside one parseable JSON-LD script", () => {
        const companyName = '</script><script>alert("x")</script>';
        const html = renderToStaticMarkup(<JsonLd siteSettings={{ companyName }} />);
        const scripts = html.match(/<\/script>/g) ?? [];
        const content = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

        expect(scripts).toHaveLength(1);
        expect(content).toBeDefined();
        expect(JSON.parse(content!)).toMatchObject({ name: companyName });
    });
});
