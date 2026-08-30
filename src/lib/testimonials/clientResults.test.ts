import { describe, expect, it } from "vitest";
import { getClientResults, validateQuoteAttribution } from "./clientResults";

const translate = (key: string) => ({
    "featuredResult": "Featured result",
    "before": "Before",
    "after": "After",
    "outcome": "Outcome",
}[key] || key);

describe("client results data layer", () => {
    it("includes the curated featured case study with structured result fields", () => {
        const [featured] = getClientResults(translate);

        expect(featured).toMatchObject({
            id: "michael-torres",
            format: "case-study",
            eyebrowLabel: "Featured result",
            name: "Michael Torres",
            company: "Torres Built Construction",
        });
        expect(featured.before).toBeTruthy();
        expect(featured.after).toBeTruthy();
        expect(featured.outcome).toBeTruthy();
    });

    it("includes a fully attributed quote in editor-defined order", () => {
        const results = getClientResults(translate, [{
            _id: "quote-1",
            format: "quote",
            displayOrder: 2,
            quote: "We finally have a plan we can act on.",
            clientName: "Avery Stone",
            clientTitle: "Owner",
            clientCompany: "Stoneworks LLC",
        }]);

        expect(results[1]).toMatchObject({
            id: "quote-1",
            format: "quote",
            order: 2,
            quoteText: "We finally have a plan we can act on.",
            name: "Avery Stone",
            role: "Owner",
            company: "Stoneworks LLC",
        });
    });

    it("rejects a quote with a bare name and no verified-client status", () => {
        const incompleteQuote = {
            format: "quote" as const,
            quote: "Helpful team.",
            clientName: "Carla Bassano",
        };

        expect(validateQuoteAttribution(incompleteQuote)).toBe(false);
        expect(getClientResults(translate, [incompleteQuote])).toHaveLength(1);
    });
});
