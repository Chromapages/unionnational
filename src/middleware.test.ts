import { describe, expect, it, vi } from "vitest";
import { config } from "./middleware";

vi.mock("next-intl/middleware", () => ({ default: () => () => null }));

describe("locale middleware matcher", () => {
    it("leaves health and readiness endpoints reachable at their root URLs", () => {
        const match = new RegExp(config.matcher[0]);
        expect(match.test("/healthz")).toBe(false);
        expect(match.test("/readyz")).toBe(false);
        expect(match.test("/en/services")).toBe(true);
    });
});
