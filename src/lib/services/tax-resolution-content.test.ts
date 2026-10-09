import { describe, expect, it } from "vitest";
import { getTaxResolutionContent } from "./tax-resolution-content";

describe("tax-resolution detail content", () => {
    it.each(["en", "es"])("keeps the draft grounded in the known audience and existing consultation flow in %s", locale => {
        const { page, presentation } = getTaxResolutionContent(locale);
        expect(page.title).toBe("Back Taxes & IRS Tax Resolution");
        expect(page.eligibility?.items).toHaveLength(2);
        expect(page.hero.primaryCta.href).toBe("/book");
        expect(page.closing.href).toBe("/book");
        expect(presentation.faqSupport?.ctaHref).toBe("/book");
        expect(page.included.pricing).toBeUndefined();
        expect(page.process.steps.every(step => !step.duration && step.description.trim())).toBe(true);
        expect(page.faqSection.items.every(item => item.question.trim() && item.answer.trim())).toBe(true);
        expect(page).not.toHaveProperty("_id");
        expect(JSON.stringify({ page, presentation })).not.toMatch(/\$|\d+%|pennies|offer in compromise|penalty abatement|installment agreement|audit representation|30 minutes|Enrolled Agent/i);
    });
});
