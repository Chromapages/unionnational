import { describe, expect, it } from "vitest";
import { calculateSCorpSavings, isHighIntent } from "./calculator";
import { calculateEmploymentTaxComparison, calculateEmploymentTax } from "./employment-tax";

describe("2026 illustrative employment-tax model", () => {
    it("uses the published 2026 base and fixed illustrative salary in the primary example", () => {
        expect(calculateSCorpSavings(200000)).toMatchObject({ applicable: true, suggestedSalary: 120000, distributions: 80000, estimatedSavings: 9874 });
        const comparison = calculateEmploymentTaxComparison(200000, 120000);
        expect(comparison.selfEmploymentTax).toBeCloseTo(28234.3, 2);
        expect(comparison.payrollTax).toBeCloseTo(18360, 2);
        expect(calculateEmploymentTaxComparison(200000, 85000).estimatedSavings).toBe(15229);
    });

    it("caps only Social Security and keeps Medicare uncapped", () => {
        expect(calculateEmploymentTax(184500)).toBeCloseTo(28228.5, 2);
        expect(calculateEmploymentTax(184501)).toBeCloseTo(28228.529, 3);
        expect(calculateSCorpSavings(1000000).estimatedSavings).toBe(9382);
    });

    it.each([40000, 100000, 250000])("does not introduce an arbitrary salary jump at %i", (profit) => {
        const below = calculateSCorpSavings(profit - 1);
        const at = calculateSCorpSavings(profit);
        expect(Math.abs(at.suggestedSalary - below.suggestedSalary)).toBeLessThanOrEqual(1);
        expect(Math.abs(at.estimatedSavings - below.estimatedSavings)).toBeLessThanOrEqual(1);
    });

    it.each(["S_CORP", "C_CORP"])("does not produce a new-election estimate for %s", (entity) => {
        expect(calculateSCorpSavings(200000, entity)).toMatchObject({ applicable: false, estimatedSavings: 0, suggestedSalary: 0, distributions: 0 });
    });

    it.each([-1, NaN, Infinity, 1000001])("rejects invalid or out-of-range profit %s", (profit) => {
        expect(() => calculateSCorpSavings(profit)).toThrow(RangeError);
    });

    it("accepts zero and the upper bound without nonfinite results", () => {
        expect(calculateSCorpSavings(0)).toMatchObject({ applicable: true, estimatedSavings: 0 });
        expect(Number.isFinite(calculateSCorpSavings(1000000).estimatedSavings)).toBe(true);
    });

    it("does not assess regular self-employment tax below $400 of adjusted earnings", () => {
        expect(calculateEmploymentTaxComparison(400, 240).selfEmploymentTax).toBe(0);
        expect(calculateEmploymentTaxComparison(500, 300).selfEmploymentTax).toBeCloseTo(70.64775, 5);
    });

    it("uses one high-intent rule for both caller and server", () => {
        expect(isHighIntent({ estimatedNetProfit: 200000, entityType: "C_CORP", urgencyLevel: "LOW", primaryPainPoint: "EXPLORING" })).toBe(false);
        expect(isHighIntent({ estimatedNetProfit: 200000, entityType: "LLC", urgencyLevel: "LOW", primaryPainPoint: "EXPLORING" })).toBe(true);
        expect(isHighIntent({ estimatedNetProfit: 0, entityType: "S_CORP", urgencyLevel: "HIGH" })).toBe(true);
    });
});
