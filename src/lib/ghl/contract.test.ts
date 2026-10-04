import { describe, expect, it } from "vitest";
import { GhlPayloadSchema, normalizeEntityType, normalizeIndustry, normalizePreferredNextStep, normalizeRevenue, normalizeUrgency } from "./contract";

describe("visible strategy intake options", () => {
    it.each([
        ["Construction", "CONSTRUCTION"],
        ["Restaurant", "HOSPITALITY"],
        ["Real Estate", "REAL_ESTATE"],
        ["Professional Services", "PROFESSIONAL_SERVICES"],
        ["E-commerce", "E_COMMERCE"],
        ["Other", "OTHER"],
    ])("maps industry %s to %s", (label, expected) => {
        expect(normalizeIndustry(label)).toBe(expected);
    });

    it.each([
        ["$0-$100k", "UNDER_100K"],
        ["Under $100K", "UNDER_100K"],
        ["$100k-$500k", "100K_500K"],
        ["$100K-$500K", "100K_500K"],
        ["$250K–$500K", "100K_500K"],
        ["$100K–$250K", "100K_500K"],
        ["$500k-$1M", "500K_1M"],
        ["$500K–$1M", "500K_1M"],
        ["$1M-$3M", "1M_3M"],
        ["$1M–$3M", "1M_3M"],
        ["$3M-$5M", "3M_5M"],
        ["$3M–$5M", "3M_5M"],
        ["$5M+", "5M_PLUS"],
    ])("maps revenue %s to %s", (label, expected) => {
        expect(normalizeRevenue(label)).toBe(expected);
    });

    it.each(["Under $250K", "Under $500K", "$1M–$5M", "$1M+", "unknown"])(
        "rejects a revenue answer that crosses CRM bands: %s",
        (label) => expect(() => normalizeRevenue(label)).toThrow(),
    );

    it.each([
        ["Sole Proprietorship", "SOLE_PROP"],
        ["LLC (Single)", "LLC_SINGLE"],
        ["LLC (Multi)", "LLC_MULTI"],
        ["S-Corp", "S_CORP"],
        ["C-Corp", "C_CORP"],
        ["Other", "OTHER"],
    ])("maps entity %s to %s", (label, expected) => {
        expect(normalizeEntityType(label)).toBe(expected);
    });

    it.each([
        ["Immediate (This month)", "IMMEDIATE"],
        ["1-3 Months", "THIS_QUARTER"],
        ["Looking for next year", "PLANNING_ONLY"],
        ["Just researching", "JUST_CURIOUS"],
    ])("maps urgency %s to %s", (label, expected) => {
        expect(normalizeUrgency(label)).toBe(expected);
    });

    it.each([
        ["Book Strategy Call Now", "BOOK_STRATEGY_CALL"],
        ["Receive Email Summary", "EMAIL_SUMMARY_REQUESTED"],
        ["Wait for callback", "CALLBACK_REQUESTED"],
    ])("maps preferred next step %s to %s", (label, expected) => {
        expect(normalizePreferredNextStep(label)).toBe(expected);
    });

    it("accepts OTHER locally while CRM handling awaits owner confirmation", () => {
        const parsed = GhlPayloadSchema.safeParse({
            event_type: "GENERAL_INQUIRY_SUBMITTED",
            contact: { first_name: "Alex", email: "alex@example.com" },
            business: { entity_type: "OTHER" },
            intent: { lead_magnet_type: "STRATEGY_INTAKE" },
            meta: { submitted_at: new Date().toISOString() },
        });
        expect(parsed.success).toBe(true);
    });
});
