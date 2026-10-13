export type HealthScoreCategory = "critical" | "stable" | "growth";
export type HealthCategory = "entity" | "compliance" | "operations";
export interface HealthScores { total: number; entity: number; compliance: number; operations: number }

export function getHealthScoreCategory(score: number): HealthScoreCategory {
    if (score <= 40) return "critical";
    if (score <= 75) return "stable";
    return "growth";
}

export const HEALTH_ANSWER_CONTRACT_VERSION = "health-check-v1";

export interface HealthOption {
    id: string;
    label: string;
    value: number;
    description?: string;
}

export interface HealthQuestion {
    id: number;
    category: HealthCategory;
    question: string;
    description?: string;
    options: HealthOption[];
}

export const HEALTH_QUESTIONS: HealthQuestion[] = [
    {
        id: 1,
        category: "entity",
        question: "What type of business entity do you operate?",
        description: "Your entity structure determines your tax liability and protection level.",
        options: [
            { id: "s-corp", label: "S-Corp", value: 15, description: "Pass-through taxation, potential SE tax savings" },
            { id: "llc", label: "LLC (Single or Partnership)", value: 10, description: "Flexible, but potentially higher SE taxes" },
            { id: "c-corp", label: "C-Corp", value: 8, description: "Double taxation potential, but good for scaling" },
            { id: "sole-proprietorship", label: "Sole Proprietorship", value: 3, description: "Simplest, but highest personal liability & tax" },
            { id: "unknown-other", label: "Not sure / Other", value: 0, description: "Let's figure this out immediately" },
        ],
    },
    {
        id: 2,
        category: "compliance",
        question: "Have you filed all federal & state tax returns for the last 3 years?",
        description: "Consistency with the IRS is the foundation of financial health.",
        options: [
            { id: "on-time", label: "Yes, all filed on time", value: 20 },
            { id: "late", label: "Filed, but some were late", value: 10 },
            { id: "missing-one-two", label: "Missing 1-2 returns", value: 0 },
            { id: "missing-over-two", label: "Missing more than 2 returns", value: -10 },
            { id: "not-sure", label: "Not sure", value: 0 },
        ],
    },
    {
        id: 3,
        category: "compliance",
        question: "Do you currently owe back taxes to the IRS or state?",
        options: [
            { id: "none", label: "No outstanding tax debt", value: 15 },
            { id: "under-10k", label: "Yes, under $10k", value: 10 },
            { id: "10k-50k", label: "Yes, $10k - $50k", value: 5 },
            { id: "over-50k", label: "Yes, over $50k", value: 0 },
            { id: "not-sure", label: "Not sure", value: 3 },
        ],
    },
    {
        id: 4,
        category: "operations",
        question: "How often do you review your financial statements?",
        description: "You can't manage what you don't measure.",
        options: [
            { id: "monthly", label: "Monthly", value: 15 },
            { id: "quarterly", label: "Quarterly", value: 10 },
            { id: "annually", label: "Annually (at tax time)", value: 5 },
            { id: "rarely-never", label: "Rarely / Never", value: 0 },
        ],
    },
    {
        id: 5,
        category: "operations",
        question: "Do you separate personal and business expenses?",
        options: [
            { id: "always", label: "Always (separate accounts)", value: 12 },
            { id: "usually", label: "Usually (rarely mixed)", value: 8 },
            { id: "sometimes", label: "Sometimes (occasional mixing)", value: 4 },
            { id: "mixed", label: "No (completely mixed)", value: 0 },
        ],
    },
    {
        id: 6,
        category: "operations",
        question: "What system do you use to track business expenses?",
        options: [
            { id: "accounting-software", label: "Accounting Software (QBO, Xero)", value: 12 },
            { id: "spreadsheets", label: "Spreadsheets", value: 8 },
            { id: "receipts", label: "Shoebox / Receipts", value: 3 },
            { id: "none", label: "No system", value: 0 },
        ],
    },
    {
        id: 7,
        category: "operations",
        question: "Do you engage in proactive tax planning?",
        description: "Tax planning happens before year-end, not after.",
        options: [
            { id: "year-round", label: "Year-round with a pro", value: 11 },
            { id: "year-end", label: "Some year-end planning", value: 6 },
            { id: "none", label: "No proactive planning", value: 0 },
        ],
    },
];

// Numeric legacy answers remain supported; duplicate weights do not identify an option.
export function getHealthAnswersScore(answers: unknown, optionIds?: unknown, version?: unknown): number | null {
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) return null;
    const entries = Object.entries(answers);
    if (entries.length !== HEALTH_QUESTIONS.length) return null;
    const versioned = optionIds !== undefined || version !== undefined;
    if (versioned && (version !== HEALTH_ANSWER_CONTRACT_VERSION || !optionIds || typeof optionIds !== "object" || Array.isArray(optionIds))) return null;
    const ids = versioned ? Object.entries(optionIds as object) : [];
    if (versioned && ids.length !== HEALTH_QUESTIONS.length) return null;
    for (const question of HEALTH_QUESTIONS) {
        const key = String(question.id);
        const answer = entries.find(([id]) => id === key)?.[1];
        if (typeof answer !== "number" || !question.options.some(option => option.value === answer)) return null;
        if (versioned) {
            const optionId = ids.find(([id]) => id === key)?.[1];
            if (!question.options.some(option => option.id === optionId && option.value === answer)) return null;
        }
    }
    return calculateHealthScores(answers as Record<number, number>).total;
}

export function calculateHealthScores(answers: Record<number, number>): HealthScores {
    const scores: HealthScores = { total: 0, entity: 0, compliance: 0, operations: 0 };
    for (const question of HEALTH_QUESTIONS) {
        const score = answers[question.id];
        if (score === undefined) continue;
        scores[question.category] += score;
        scores.total += score;
    }
    scores.total = Math.max(0, scores.total);
    return scores;
}
