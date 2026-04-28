import { ScorpEstimatorInput } from "./schema";

/**
 * Calculates the S-Corp Fit Score (0-100) exactly as per spec.
 */
export const calculateFitScore = (input: ScorpEstimatorInput): number => {
    let score = 0;

    // 1. Entity Type Weight
    const entityWeights: Record<string, number> = {
        SOLE_PROP: 25,
        LLC: 20,
        NOT_SURE: 10,
        PARTNERSHIP: 5,
        C_CORP: 0,
        S_CORP: -20
    };
    score += entityWeights[input.entity_type] || 0;

    // 2. Revenue Band Weight
    const revenueWeights: Record<string, number> = {
        UNDER_100K: 5,
        "100K_250K": 10,
        "250K_500K": 15,
        "500K_1M": 20,
        "1M_5M": 20,
        "5M_PLUS": 15
    };
    score += revenueWeights[input.annual_revenue_band] || 0;

    // 3. Net Profit Range Weight
    const profitWeights: Record<string, number> = {
        UNDER_50K: 5,
        "50K_100K": 15,
        "100K_150K": 20,
        "150K_250K": 25,
        "250K_PLUS": 25
    };
    score += profitWeights[input.estimated_net_profit_range] || 0;

    // 4. Income Subject to SE Tax Weight
    const seTaxWeights: Record<string, number> = {
        YES: 20,
        NOT_SURE: 10,
        NO: 0
    };
    score += seTaxWeights[input.income_subject_to_se_tax] || 0;

    // 5. Current Payroll Status Weight
    const payrollWeights: Record<string, number> = {
        NOT_RUNNING_PAYROLL: 10,
        NOT_SURE: 5,
        RUNNING_PAYROLL: 3
    };
    score += payrollWeights[input.current_payroll_status] || 0;

    // 6. Readiness Weight
    const readinessWeights: Record<string, number> = {
        HIGH: 10,
        MEDIUM: 5,
        LOW: 0
    };
    score += readinessWeights[input.tax_payroll_readiness] || 0;

    // Clamp score 0-100
    return Math.max(0, Math.min(100, score));
};
