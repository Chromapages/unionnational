import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { BOOKING_ROUTE } from "@/lib/booking";
import type { ServicePageContent, ServicePagePresentation } from "@/components/services/ServicePageTemplate";

// Local review copy based on Jason's stated audience; no CMS document is fabricated.
export function getTaxResolutionContent(locale: string): { page: ServicePageContent; presentation: ServicePagePresentation } {
    const copy = (locale === "es" ? es : en).TaxResolution;
    const detail = copy.detail;
    const page: ServicePageContent = {
        title: copy.title,
        slug: { current: "back-taxes-irs-tax-resolution" },
        canonicalPath: "/back-taxes-irs-tax-resolution",
        hero: {
            eyebrow: detail.eyebrow,
            headline: copy.title,
            highlight: "IRS Tax Resolution",
            subheadline: copy.intro,
            primaryCta: { label: copy.cta, href: BOOKING_ROUTE },
            secondaryCta: { label: detail.preparationLink, href: "#conversation-checklist" },
        },
        eligibility: {
            heading: detail.fitHeading,
            description: detail.fitDescription,
            items: [copy.filings.title, copy.balance.title],
        },
        comparison: { heading: detail.summaryTitle, description: copy.scopeNote, pairs: [] },
        process: { eyebrow: detail.processEyebrow, heading: detail.processHeading, description: detail.processDescription, steps: detail.steps },
        included: { eyebrow: detail.checklistEyebrow, heading: detail.checklistHeading, description: detail.checklistDescription, items: detail.checklist },
        faqSection: { heading: detail.faqHeading, items: detail.faq },
        closing: { heading: detail.final.title, description: detail.final.support, label: copy.cta, href: BOOKING_ROUTE, disclaimer: detail.disclaimer },
        seo: { metaTitle: `${copy.title} | Union National Tax`, metaDescription: copy.intro },
    };

    return {
        page,
        presentation: {
            finalCta: detail.final,
            faqSupport: { ...detail.faqSupport, cta: copy.cta, ctaHref: BOOKING_ROUTE, answersTitle: detail.faqHeading },
        },
    };
}
