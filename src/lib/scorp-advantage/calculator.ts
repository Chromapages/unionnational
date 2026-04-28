// src/lib/scorp-advantage/calculator.ts
export type SCorpSavingsEstimate = {
    estimatedSavings: number;
    suggestedSalary: number;
    distributions: number;
    seRateSaved: number;
};

export function calculateSCorpSavings(netProfit: number): SCorpSavingsEstimate {
    if (netProfit < 40000) {
        return {
            estimatedSavings: 0,
            suggestedSalary: netProfit,
            distributions: 0,
            seRateSaved: 0,
        };
    }

    const salaryRatio = netProfit < 100000 ? 0.6 : netProfit < 250000 ? 0.5 : 0.4;
    const suggestedSalary = Math.round(netProfit * salaryRatio);
    const distributions = netProfit - suggestedSalary;
    const seRateSaved = 0.153;
    const estimatedSavings = Math.round(distributions * seRateSaved);

    return {
        estimatedSavings,
        suggestedSalary,
        distributions,
        seRateSaved,
    };
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
