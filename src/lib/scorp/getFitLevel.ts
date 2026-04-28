import { ScorpEstimatorInput, ScorpFitLevel } from "./schema";

/**
 * Maps the fit score to a categorical fit level.
 */
export const getFitLevel = (score: number): ScorpFitLevel => {
    if (score >= 80) return "HIGH_INTENT_SCORP";
    if (score >= 60) return "STRONG_CANDIDATE";
    if (score >= 35) return "POSSIBLE_FIT";
    return "LOW_FIT";
};

/**
 * Determines if a lead is "High Intent" based on score OR specific value triggers.
 */
export const isHighIntent = (score: number, input: ScorpEstimatorInput): boolean => {
    // 1. Score Trigger
    if (score >= 80) return true;

    // 2. Revenue Triggers
    const highRevenueBands = ["500K_1M", "1M_5M", "5M_PLUS"];
    if (highRevenueBands.includes(input.annual_revenue_band)) return true;

    // 3. Profit Trigger
    if (input.estimated_net_profit_range === "250K_PLUS") return true;

    // 4. Pain Point Trigger
    if (input.primary_pain_point === "OVERPAYING_TAXES") return true;

    // 5. Setup Triggers
    if (input.current_payroll_status === "NOT_RUNNING_PAYROLL") return true;
    if (["SOLE_PROP", "LLC"].includes(input.entity_type)) return true;

    return false;
};
