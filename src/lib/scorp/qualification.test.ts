import { describe, expect, it } from "vitest";
import { ScorpEstimatorInputSchema } from "./schema";
import { calculateFitScore } from "./calculateFitScore";
import { calculateSavingsRange } from "./calculateSavingsRange";
import { getFitLevel, isHighIntent } from "./getFitLevel";
import { mapToGhlPayload } from "./mapToGhlPayload";

const reviewedInput = ScorpEstimatorInputSchema.parse({ full_name: "José", email: "synthetic-fit@audit.example.test", phone: "5550101234", business_name: "Synthetic Business", entity_type: "C_CORP", niche_vertical: "CONSTRUCTION", income_subject_to_se_tax: "NO", annual_revenue_band: "UNDER_100K", estimated_net_profit_range: "UNDER_50K", current_payroll_status: "RUNNING_PAYROLL", tax_payroll_readiness: "LOW", primary_pain_point: "BOOKKEEPING_CHAOS" });

describe("reviewed S-Corp qualification boundaries", () => {
    it("keeps a low-fit existing corporation out of high-intent routing", () => {
        const score = calculateFitScore(reviewedInput);
        expect(score).toBeLessThan(35);
        expect(getFitLevel(score)).toBe("LOW_FIT");
        expect(isHighIntent(score, reviewedInput)).toBe(false);
        expect(calculateSavingsRange(reviewedInput)).toBe("$0 – $3,000");
        const output = mapToGhlPayload(reviewedInput, { fit_score: score, scorp_fit_level: getFitLevel(score), scorp_estimated_savings: calculateSavingsRange(reviewedInput), high_intent_flag: false });
        expect(output).toMatchObject({ first_name: "José", last_name: "", urgency_level: "MEDIUM", high_intent_flag: false, locale: "en" });
        expect(output.email).toBe(reviewedInput.email);
    });

    it("preserves the existing-corporation savings special case", () => {
        const existing = ScorpEstimatorInputSchema.parse({ ...reviewedInput, entity_type: "S_CORP", income_subject_to_se_tax: "YES" });
        expect(calculateSavingsRange(existing)).toBe("$0 – $2,000");
        expect(calculateFitScore(existing)).toBeGreaterThanOrEqual(0);
    });

    it.each([[34, "LOW_FIT"], [35, "POSSIBLE_FIT"], [59, "POSSIBLE_FIT"], [60, "STRONG_CANDIDATE"], [79, "STRONG_CANDIDATE"], [80, "HIGH_INTENT_SCORP"]])("keeps the %i fit boundary in %s", (score, expected) => {
        expect(getFitLevel(score as number)).toBe(expected);
    });

    it.each([
        { annual_revenue_band: "500K_1M" }, { estimated_net_profit_range: "250K_PLUS" },
        { primary_pain_point: "OVERPAYING_TAXES" }, { current_payroll_status: "NOT_RUNNING_PAYROLL" }, { entity_type: "LLC" },
    ])("derives high intent from approved trigger %s without a client flag", change => {
        const input = ScorpEstimatorInputSchema.parse({ ...reviewedInput, ...change });
        const score = calculateFitScore(input);
        expect(score).toBeLessThan(80);
        expect(isHighIntent(score, input)).toBe(true);
    });
});
