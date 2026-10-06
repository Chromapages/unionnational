import { beforeEach, describe, expect, it } from "vitest";
import { calculateSCorpSavings } from "./calculator";
import { parseEstimatorResult, readEstimatorResult, saveEstimatorResult, RESULT_TTL_MS } from "./result-storage";

beforeEach(() => sessionStorage.clear());
describe("private estimator result boundary", () => {
    it("persists only expiring calculated results, never raw contact or inputs", () => {
        const estimate = calculateSCorpSavings(100000, "LLC");
        saveEstimatorResult({ ...estimate, email: "fixture@example.test", firstName: "Fixture", estimatedNetProfit: 100000 } as typeof estimate, 1000);
        const stored = sessionStorage.getItem("scorp-estimator-result")!;
        expect(JSON.parse(stored)).toEqual({ version: 1, expiresAt: 1000 + RESULT_TTL_MS, ...estimate });
        expect(stored).not.toMatch(/email|firstName|NetProfit/);
        expect(readEstimatorResult(1001)?.estimatedSavings).toBe(estimate.estimatedSavings);
    });
    it("rejects expired, legacy, extra fields and impossible financial values", () => {
        const valid = { version: 1, expiresAt: 2000, ...calculateSCorpSavings(100000) };
        expect(parseEstimatorResult(valid, 2000)).toBeNull();
        expect(parseEstimatorResult({ ...valid, expiresAt: 999999999 }, 1000)).toBeNull();
        expect(parseEstimatorResult({ ...valid, email: "fixture@example.test" }, 1000)).toBeNull();
        expect(parseEstimatorResult({ estimatedNetProfit: 100000 }, 1000)).toBeNull();
        for (const distributions of [-1, Number.NaN, Number.POSITIVE_INFINITY, 2e6]) {
            expect(parseEstimatorResult({ ...valid, distributions }, 1000)).toBeNull();
        }
    });
    it("deletes stale stored records instead of leaving raw old values behind", () => {
        sessionStorage.setItem("scorp-estimator-result", JSON.stringify({ email: "fixture@example.test" }));
        expect(readEstimatorResult()).toBeNull();
        expect(sessionStorage.getItem("scorp-estimator-result")).toBeNull();
    });
});
