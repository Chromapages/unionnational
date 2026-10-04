import { describe, expect, it } from "vitest";
import { bookingHref } from "./ServicePageTemplate";

describe("CMS service booking links", () => {
    it("routes booking labels to the calendar without changing informational links", () => {
        expect(bookingHref("Book an S-Corp Evaluation", "/contact")).toBe("/book");
        expect(bookingHref("Reservar una llamada", "/contact")).toBe("/book");
        expect(bookingHref("Discuss your situation", "/contact")).toBe("/contact");
        expect(bookingHref("Book now", "https://example.com/calendar")).toBe("https://example.com/calendar");
    });
});
