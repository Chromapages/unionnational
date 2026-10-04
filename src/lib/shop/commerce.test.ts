import { describe, expect, it } from "vitest";

import {
    classifyFulfillment,
    normalizeEditionId,
    normalizeProductEdition,
    getDefaultProductEdition,
    formatProductPrice,
    hasPublishedProductDescription,
} from "@/lib/shop/commerce";

describe("shop commerce edition normalization", () => {
    it("keeps the approved PDF price and real description boundaries", () => {
        const editions = [
            { id: "bundle", name: "Bundle (Digital + Print)", format: "bundle", price: 59 },
            { id: "print", name: "Hardcover", format: "physical", price: 39 },
            { id: "pdf", name: "Digital PDF", format: "digital", price: 29 },
            { id: "audio", name: "Audiobook", format: "audio", price: 27 },
        ];
        expect(getDefaultProductEdition(editions)?.id).toBe("pdf");
        expect(getDefaultProductEdition(editions.filter(edition => edition.id !== "pdf"))?.id).toBe("bundle");
        expect(formatProductPrice(29.5)).toBe("$29.50");
        expect(hasPublishedProductDescription("Description coming soon.")).toBe(false);
        expect(hasPublishedProductDescription("A practical guide to business finances.")).toBe(true);
    });
    it("classifies localized Sanity fields without throwing", () => {
        expect(
            classifyFulfillment(
                { _type: "localizedString", en: "physical", es: "fisico" },
                { _type: "localizedString", en: "Hardcover", es: "Tapa dura" }
            )
        ).toBe("physical");
    });

    it("normalizes localized edition names into stable ids", () => {
        expect(
            normalizeEditionId("blueprint", {
                name: { _type: "localizedString", en: "Digital PDF", es: "PDF Digital" },
            })
        ).toBe("blueprint-digital-pdf");
    });

    it("treats malformed non-string values as unknown fulfillment", () => {
        expect(classifyFulfillment(["physical"], 42)).toBe("unknown");
    });

    it("normalizes a localized product edition without crashing", () => {
        const edition = normalizeProductEdition("blueprint", {
            name: { en: "Complete Bundle", es: "Paquete Completo" } as unknown as string,
            price: 79,
            format: { en: "bundle", es: "paquete" } as unknown as string,
        });

        expect(edition.id).toBe("blueprint-complete-bundle");
        expect(edition.fulfillmentType).toBe("bundle");
        expect(edition.requiresShipping).toBe(true);
    });
});
