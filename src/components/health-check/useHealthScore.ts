import { useMemo } from "react";
import { calculateHealthScores } from "@/lib/intake/health-score";
export type { HealthCategory, HealthScores } from "@/lib/intake/health-score";

export function useHealthScore(answers: Record<number, number>) {
    return useMemo(() => calculateHealthScores(answers), [answers]);
}
