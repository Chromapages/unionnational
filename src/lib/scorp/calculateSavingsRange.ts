import { ScorpEstimatorInput } from "./schema";

/**
 * Returns a formatted string representing the estimated annual savings range.
 */
export const calculateSavingsRange = (input: ScorpEstimatorInput): string => {
    // 1. Special Cases
    if (input.entity_type === "S_CORP") {
        return "$0 – $2,000";
    }

    if (input.income_subject_to_se_tax === "NO") {
        return "$0 – $3,000";
    }

    // 2. Standard Ranges by Net Profit
    const ranges: Record<string, string> = {
        UNDER_50K: "$1,000 – $3,000",
        "50K_100K": "$3,000 – $7,000",
        "100K_150K": "$7,000 – $12,000",
        "150K_250K": "$12,000 – $18,000",
        "250K_PLUS": "$18,000 – $30,000+"
    };

    return ranges[input.estimated_net_profit_range] || "$0 - $1,000";
};
