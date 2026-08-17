import { describe, expect, it } from "vitest";
import { buildLocaleNavigationHref } from "./use-synchronized-locale";

describe("buildLocaleNavigationHref", () => {
  it("preserves query parameters and hashes during a locale change", () => {
    expect(buildLocaleNavigationHref("/shop", "?category=books&q=scorp", "#results")).toBe(
      "/shop?category=books&q=scorp#results",
    );
  });

  it("normalizes query and hash fragments supplied without prefixes", () => {
    expect(buildLocaleNavigationHref("/scorp-estimator", "utm_source=email", "estimate")).toBe(
      "/scorp-estimator?utm_source=email#estimate",
    );
  });
});
