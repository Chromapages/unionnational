import { describe, expect, it } from "vitest";
import { sanitizeReferrerUrl } from "./referrer";

describe("estimator referrer privacy", () => {
    it("retains only origin and path", () => {
        expect(sanitizeReferrerUrl("https://user:password@example.test/start?email=private@example.test&utm_source=ad#private"))
            .toBe("https://example.test/start");
    });
    it.each(["", "invalid", "javascript:alert(1)"])("omits unsupported referrer %s", (referrer) => {
        expect(sanitizeReferrerUrl(referrer)).toBeUndefined();
    });
});
