import { calculateSCorpSavings, type SCorpSavingsEstimate } from "./calculator";

const RESULT_KEY = "scorp-estimator-result";
export const RESULT_TTL_MS = 15 * 60 * 1000;
export type EstimatorResult = SCorpSavingsEstimate & { version: 1; expiresAt: number };
let memoryResult: EstimatorResult | null = null;

export function parseEstimatorResult(value: unknown, now = Date.now()): EstimatorResult | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const record = value as Record<string, unknown>;
    const keys = ["version", "expiresAt", "applicable", "estimatedSavings", "suggestedSalary", "distributions"];
    if (Object.keys(record).length !== keys.length || keys.some((key) => !Object.hasOwn(record, key))) return null;
    if (record.version !== 1 || typeof record.expiresAt !== "number" || !Number.isFinite(record.expiresAt)
        || record.expiresAt <= now || record.expiresAt > now + RESULT_TTL_MS || typeof record.applicable !== "boolean") return null;
    const amounts = [record.estimatedSavings, record.suggestedSalary, record.distributions];
    if (!amounts.every((amount) => typeof amount === "number" && Number.isFinite(amount) && amount >= 0 && amount <= 1000000)) return null;
    const estimate = record as EstimatorResult;
    const profit = estimate.suggestedSalary + estimate.distributions;
    if (profit > 1000000) return null;
    const calculated = calculateSCorpSavings(profit, estimate.applicable ? undefined : "S_CORP");
    if (calculated.applicable !== estimate.applicable || ["estimatedSavings", "suggestedSalary", "distributions"].some((key) =>
        Math.abs(calculated[key as keyof Omit<SCorpSavingsEstimate, "applicable">] - estimate[key as keyof Omit<SCorpSavingsEstimate, "applicable">]) > 0.01)) return null;
    return { version: 1, expiresAt: estimate.expiresAt, ...calculated };
}

export function clearEstimatorResult() {
    memoryResult = null;
    try { sessionStorage.removeItem(RESULT_KEY); } catch { /* Storage may be unavailable. */ }
}

export function saveEstimatorResult(estimate: SCorpSavingsEstimate, now = Date.now()) {
    // Explicit projection excludes every contact field and raw financial input.
    const result = parseEstimatorResult({ version: 1, expiresAt: now + RESULT_TTL_MS,
        applicable: estimate.applicable, estimatedSavings: estimate.estimatedSavings,
        suggestedSalary: estimate.suggestedSalary, distributions: estimate.distributions }, now);
    clearEstimatorResult();
    if (!result) return;
    memoryResult = result;
    try { sessionStorage.setItem(RESULT_KEY, JSON.stringify(result)); } catch { /* Navigation still works using memory. */ }
}

export function readEstimatorResult(now = Date.now()): EstimatorResult | null {
    try {
        const raw = sessionStorage.getItem(RESULT_KEY);
        if (raw) {
            const parsed = parseEstimatorResult(JSON.parse(raw), now);
            if (!parsed) clearEstimatorResult();
            return parsed;
        }
    } catch { clearEstimatorResult(); return null; }
    const result = parseEstimatorResult(memoryResult, now);
    if (!result) clearEstimatorResult();
    return result;
}
