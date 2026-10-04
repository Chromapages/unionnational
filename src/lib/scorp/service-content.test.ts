import { expect, it } from "vitest";
import type { ServicePage } from "@/types/sanity";
import { reviewedScorpService } from "./service-content";

it("keeps safe S-Corp booking and FAQ behavior while localizing the fit-check hero", () => {
    const page: ServicePage = {
        _id: "example-scorp-service",
        _type: "servicePage",
        _rev: "test-revision",
        _createdAt: "2026-10-04T00:00:00Z",
        _updatedAt: "2026-10-04T00:00:00Z",
        title: "Example service",
        slug: { current: "s-corp-tax-advantage" },
        canonicalPath: "/s-corp-tax-advantage",
        hero: { eyebrow: "", headline: "Original headline", subheadline: "Original description", primaryCta: { label: "Contact", href: "/contact" } },
        comparison: { heading: "Comparison", description: "Review the business", pairs: [] },
        process: { heading: "Process", steps: [] },
        eligibility: { heading: "Original suitability", items: ["Original indicator"] },
        included: { heading: "Included", items: [] },
        faqSection: { heading: "Questions", items: [
            { question: "How does it work?", answer: "We review the business before recommending next steps." },
            { question: "Unapproved claim", answer: "Save 25% guaranteed." },
        ] },
        closing: { heading: "Next step", label: "Contact", href: "/contact" },
    };
    const reviewed = reviewedScorpService(page, "en");
    expect(reviewed.hero.headline).toContain(reviewed.hero.highlight);
    expect(reviewed.hero.primaryCta.href).toBe("/book");
    expect(reviewed.hero.secondaryCta?.href).toBe("#included");
    expect(reviewed.faqSection.items).toHaveLength(1);
    expect(reviewed.eligibility?.description).toContain("not a final determination");
    expect(reviewedScorpService(page, "es").hero.headline).toContain("adecuada para su negocio");
    const other = { ...page, slug: { current: "tax-planning" } };
    expect(reviewedScorpService(other, "en")).toBe(other);
});
