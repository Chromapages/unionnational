import { describe, expect, it } from "vitest";
import { getCalendarUrl, getVideoEmbedUrl, safeHref } from "./content-urls";

describe("CMS URL policies", () => {
    it("rejects executable, unencrypted and ambiguous links while preserving approved destinations", () => {
        for (const value of [null, {}, "javascript:alert(1)", "data:text/html,x", "//evil.test", "/\\evil.test", "https://user:pass@example.test", "http://example.test", "https://example.test/\npath"]) expect(safeHref(value)).toBeNull();
        expect(safeHref("/en/services#faq")).toBe("/en/services#faq");
        expect(safeHref("#faq")).toBe("#faq");
        expect(safeHref("https://example.test/book")).toBe("https://example.test/book");
        expect(safeHref("mailto:office@example.test", { contact: true })).toBe("mailto:office@example.test");
    });
    it("accepts reviewed booking paths only", () => {
        expect(getCalendarUrl("https://link.agent-crm.com/widget/booking/sBGopjvf9OdyrfgWqOJx")).toContain("/widget/booking/");
        for (const value of ["https://link.agent-crm.com.evil.test/widget/booking/abc", "https://link.agent-crm.com/other", "https://evil.test/widget/booking/sBGopjvf9OdyrfgWqOJx", "javascript:x"]) expect(getCalendarUrl(value)).toBeNull();
    });
    it("parses exact YouTube and Vimeo hosts and video IDs", () => {
        expect(getVideoEmbedUrl("https://youtu.be/dQw4w9WgXcQ")).toContain("https://www.youtube.com/embed/dQw4w9WgXcQ");
        expect(getVideoEmbedUrl("https://vimeo.com/123456789")).toContain("https://player.vimeo.com/video/123456789");
        for (const value of ["https://evil.test/?youtube.com", "https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ", "https://www.youtube.com/embed/../anything", "javascript:youtube.com"]) expect(getVideoEmbedUrl(value)).toBeNull();
    });
});
