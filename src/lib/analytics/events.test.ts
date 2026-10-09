import { describe, expect, it } from "vitest";
import { adaptGa4Event, ga4EventSchema } from "./events";
import { resolveGa4PageContext, type Ga4Policy } from "./page-policy";

const policy: Ga4Policy = { origin: "https://unt.example", approvedPageKeys: ["about", "team"],
    campaigns: { sources: ["newsletter"], mediums: [], campaigns: [] } };
const context = resolveGa4PageContext("/en/about?utm_source=newsletter", policy)!;
const viewed = { event: "strategy_call_cta_viewed", funnel: "strategy_call", placement: "about_final_cta" };
describe("strict reviewed GA4 event adaptation", () => {
    it("uses the currently sanitized context and finite CTA fields", () => {
        expect(adaptGa4Event(viewed, context)).toEqual({ eventName: viewed.event, params: {
            ...context, funnel: "strategy_call", placement: "about_final_cta",
        } });
        expect(adaptGa4Event({ ...viewed, event: "strategy_call_cta_activated", destination_type: "internal" }, context))
            .toMatchObject({ eventName: "strategy_call_cta_activated", params: { destination_type: "internal" } });
        const teamContext = resolveGa4PageContext("/es/team", policy)!;
        expect(adaptGa4Event({ ...viewed, placement: "team_final_cta" }, teamContext)).not.toBeNull();
        expect(adaptGa4Event(viewed, teamContext)).toBeNull();
    });
    it("allows only general company footer navigation", () => {
        const footer = { event: "footer_navigation_item_navigate", surface: "global_footer", category_id: "company", destination_id: "/team" };
        expect(adaptGa4Event(footer, context)).not.toBeNull();
        for (const destination_id of ["/services", "/back-taxes-irs-tax-resolution", "/contact", "tel:123456789", "/team?email=fixture"])
            expect(adaptGa4Event({ ...footer, destination_id }, context)).toBeNull();
    });
    it.each(["generate_lead", "appointment_booked", "strategy_call_page_viewed", "strategy_call_scheduler_opened",
        "strategy_call_scheduler_error", "strategy_call_scheduler_abandoned", "page_view", "footer_contact_activate"])
        ("does not promote %s to an approved event", event => {
            expect(adaptGa4Event({ ...viewed, event }, context)).toBeNull();
        });
    it("rejects extra properties, arbitrary labels and forged context rather than truncating", () => {
        for (const event of [{ ...viewed, email: "fixture@example.test" }, { ...viewed, placement: "tax-resolution" },
            { ...viewed, page_title: "Secret" }, { ...viewed, placement: "a".repeat(200) },
            { ...viewed, funnel: "other" }, null]) {
            expect(ga4EventSchema.safeParse(event).success).toBe(false);
            expect(adaptGa4Event(event, context)).toBeNull();
        }
        expect(adaptGa4Event(viewed, { ...context })).toBeNull();
        expect(adaptGa4Event(viewed, { ...context, page_referrer: "" })).toBeNull();
    });
});
