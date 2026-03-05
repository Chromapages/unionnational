import { useMemo } from "react";

export type HealthCategory = "entity" | "compliance" | "operations";

export interface HealthScores {
    total: number;
    entity: number;
    compliance: number;
    operations: number;
}

interface HealthQuestion {
    id: number;
    category: HealthCategory;
}

export function useHealthScore(answers: Record<number, number>, questions: HealthQuestion[]) {
    return useMemo<HealthScores>(() => {
        let total = 0;
        let entity = 0;
        let compliance = 0;
        let operations = 0;

        Object.entries(answers).forEach(([qId, score]) => {
            const question = questions.find((item) => item.id === Number(qId));
            if (!question) return;
            total += score;
            if (question.category === "entity") entity += score;
            if (question.category === "compliance") compliance += score;
            if (question.category === "operations") operations += score;
        });

        return { total: Math.max(0, total), entity, compliance, operations };
    }, [answers, questions]);
}
