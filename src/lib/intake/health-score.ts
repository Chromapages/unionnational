export type HealthScoreCategory = "critical" | "stable" | "growth";

export function getHealthScoreCategory(score: number): HealthScoreCategory {
    if (score <= 40) return "critical";
    if (score <= 75) return "stable";
    return "growth";
}
