// src/lib/scorp-advantage/calculator.ts
import { calculateEmploymentTaxComparison, ILLUSTRATIVE_SALARY_RATIO } from "./employment-tax";

export type SCorpSavingsEstimate = {
    applicable: boolean;
    estimatedSavings: number;
    suggestedSalary: number;
    distributions: number;
};

export function calculateSCorpSavings(netProfit: number, entityType?: string): SCorpSavingsEstimate {
    if (!Number.isFinite(netProfit) || netProfit < 0 || netProfit > 1000000) {
        throw new RangeError("Estimated net profit must be between $0 and $1,000,000.");
    }
    if (entityType === "S_CORP" || entityType === "C_CORP") {
        return {
            applicable: false,
            estimatedSavings: 0,
            suggestedSalary: 0,
            distributions: 0,
        };
    }

    // Keep the legacy payload field name; this is an illustrative assumption, never a salary recommendation.
    const suggestedSalary = Math.round(netProfit * ILLUSTRATIVE_SALARY_RATIO);
    const distributions = netProfit - suggestedSalary;
    const { estimatedSavings } = calculateEmploymentTaxComparison(netProfit, suggestedSalary);

    return {
        applicable: true,
        estimatedSavings,
        suggestedSalary,
        distributions,
    };
}

export function isHighIntent(input: Parameters<typeof calculateFitScore>[0]): boolean {
    return input.urgencyLevel === "HIGH" || calculateFitScore(input) >= 70;
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

export function calculateFitScore(input: {
    estimatedNetProfit?: number;
    urgencyLevel?: string;
    entityType?: string;
    primaryPainPoint?: string;
}): number {
    let score = 0;

    if ((input.estimatedNetProfit || 0) >= 80000) score += 35;
    if ((input.estimatedNetProfit || 0) >= 150000) score += 20;
    if (["SOLE_PROP", "LLC", "LLC_MULTI", "UNKNOWN"].includes(input.entityType || "")) score += 20;
    if (input.urgencyLevel === "HIGH") score += 15;
    if (["OVERPAYING_TAXES", "WRONG_STRUCTURE", "YEAR_ROUND_PLANNING"].includes(input.primaryPainPoint || "")) score += 10;

    return Math.min(score, 100);
}
