import { describe, expect, it } from "vitest";
import { getHealthScoreCategory } from "./health-score";

describe("shared health score categories", () => {
    it.each([[40, "critical"], [41, "stable"], [70, "stable"], [73, "stable"], [75, "stable"], [76, "growth"]] as const)(
        "classifies %i as %s", (score, category) => expect(getHealthScoreCategory(score)).toBe(category),
    );
});
