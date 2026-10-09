import { describe, expect, it } from "vitest";
import { reportQuerySchema } from "./reporting";

describe("public report query contract", () => {
    it("rejects property overrides, invalid calendar dates and oversized ranges", () => {
        const valid = { report: "overview", from: "2026-01-01", to: "2026-01-28" };
        expect(reportQuerySchema.safeParse(valid).success).toBe(true);
        for (const query of [{ ...valid, property: "another" }, { ...valid, from: "2026-02-30" }, { ...valid, to: "2026-04-01" }, { ...valid, to: "2025-12-31" }]) expect(reportQuerySchema.safeParse(query).success).toBe(false);
    });
});
