import { evaluate, parse } from "groq-js";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-sanity", () => ({ defineQuery: (query: string) => query }));

import { BOOK_LANDING_QUERY } from "./book-queries";
import { PRODUCT_DETAIL_QUERY } from "./shop-queries";
import { INDUSTRY_VERTICAL_QUERY, INDUSTRY_VERTICALS_QUERY, PLAYBOOK_CHAPTER_QUERY } from "./resource-queries";
import { FAQ_QUERY, HEADER_SETTINGS_QUERY, SITE_SETTINGS_QUERY, TESTIMONIALS_QUERY } from "./shared-queries";

const localized = (value: string) => ({ en: `${value} EN`, es: `${value} ES` });
const references = ["approved", "withdrawn", "legacy", "missing"].map(_ref => ({ _type: "reference", _ref }));
const dataset = [
    ...["approved", "withdrawn", "legacy"].map((id, index) => ({
        _id: id, _type: "testimonial", clientName: id, quote: localized(id),
        ...(id !== "legacy" ? { isPublished: id === "approved" } : {}), displayOrder: index,
    })),
    ...["approved", "withdrawn", "legacy"].map((id, index) => ({
        _id: `faq-${id}`, _type: "faq", question: localized(id), answer: localized(`answer-${id}`),
        ...(id !== "legacy" ? { isPublished: id === "approved" } : {}), displayOrder: index,
    })),
    { _id: "product", _type: "product", slug: { current: "book" }, title: localized("book"), featuredTestimonials: references },
    { _id: "industry", _type: "industryVertical", isActive: true, slug: { current: "industry" }, title: localized("industry"), clientTestimonials: references },
    { _id: "chapter", _type: "playbookChapter", slug: { current: "chapter" }, title: localized("chapter"), content: { en: [{ _type: "block", children: [{ text: "Public chapter EN" }] }], es: [{ _type: "block", children: [{ text: "Public chapter ES" }] }] }, isGated: true, gatedContent: { en: [{ confidentialSentinel: "omit-legacy-payload" }] } },
    { _id: "settings", _type: "siteSettings", companyName: "Approved company", phone: "555-0100", tagline: localized("tagline"), ctaButtonText: localized("CTA"), ctaButtonUrl: "/book", footerDisclaimerSummary: localized("approved legal copy"), credentialVerifiedBy: "private-owner-sentinel", credentialVerifiedAt: "2026-10-01", unapprovedFutureField: "internal-sentinel" },
];

async function query(queryText: string, locale: string, slug?: string) {
    const params = { locale, slug };
    return (await evaluate(parse(queryText, { params }), { dataset, params })).get();
}

describe.each(["en", "es"])("public CMS projection (%s)", locale => {
    it("preserves approved and legacy FAQ wording while omitting explicit withdrawals", async () => {
        const result = await query(FAQ_QUERY, locale);
        expect(result.map((item: { question: string }) => item.question)).toEqual([`approved ${locale.toUpperCase()}`, `legacy ${locale.toUpperCase()}`]);
    });

    it("keeps approved legacy testimonials and excludes withheld root records", async () => {
        const result = await query(TESTIMONIALS_QUERY, locale);
        expect(result.map((item: { _id: string }) => item._id)).toEqual(["approved", "legacy"]);
    });

    it.each([BOOK_LANDING_QUERY, PRODUCT_DETAIL_QUERY])("filters testimonials in product references without changing localized approved quotes", async queryText => {
        const result = await query(queryText, locale, "book");
        expect(result.featuredTestimonials.map((item: { _id: string }) => item._id)).toEqual(["approved", "legacy"]);
        expect(result.featuredTestimonials[0].quote).toBe(`approved ${locale.toUpperCase()}`);
    });

    it("filters industry testimonials and counts only public references", async () => {
        const detail = await query(INDUSTRY_VERTICAL_QUERY, locale, "industry");
        const list = await query(INDUSTRY_VERTICALS_QUERY, locale);
        expect(detail.clientTestimonials.map((item: { _id: string }) => item._id)).toEqual(["approved", "legacy"]);
        expect(list[0].testimonialCount).toBe(2);
    });

    it("preserves approved public settings while excluding internal/future fields", async () => {
        const result = await query(SITE_SETTINGS_QUERY, locale);
        expect(result.companyName).toBe("Approved company");
        expect(result.phone).toBe("555-0100");
        expect(result.ctaButtonText).toBe(`CTA ${locale.toUpperCase()}`);
        expect(result.footerDisclaimerSummary).toBe(`approved legal copy ${locale.toUpperCase()}`);
        expect(result).not.toHaveProperty("credentialVerifiedBy");
        expect(result).not.toHaveProperty("unapprovedFutureField");
        expect(result.credentialVerified).toBe(true);
    });

    it("passes only navigation display fields to the header client boundary", async () => {
        const result = await query(HEADER_SETTINGS_QUERY, locale);
        expect(result.companyName).toBe("Approved company");
        expect(result.ctaButtonTextLocalized).toBe(`CTA ${locale.toUpperCase()}`);
        expect(Object.keys(result).sort()).toEqual(["companyName", "ctaButtonTextLocalized", "ctaButtonUrl", "logo", "logoAlt"].sort());
    });

    it("keeps chapter content public for marketing capture and omits unused legacy gated payload", async () => {
        const result = await query(PLAYBOOK_CHAPTER_QUERY, locale, "chapter");
        expect(result.content[0].children[0].text).toBe(`Public chapter ${locale.toUpperCase()}`);
        expect(result.isGated).toBe(true);
        expect(result).not.toHaveProperty("gatedContent");
    });
});
