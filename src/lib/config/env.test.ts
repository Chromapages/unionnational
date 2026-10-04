import { afterEach, describe, expect, it, vi } from "vitest";
import { getEnv, getMissingReadinessEnv, publicEnv, readinessChecks, requireEnv } from "./env";

describe("env config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads optional env values", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://example.test");

    expect(getEnv("NEXT_PUBLIC_BASE_URL")).toBe("https://example.test");
    expect(publicEnv.baseUrl).toBe("https://example.test");
  });

  it("throws when required env is missing", () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "");

    expect(() => requireEnv("STRIPE_SECRET_KEY")).toThrow("STRIPE_SECRET_KEY is missing");
  });

  it("reports missing readiness env values", () => {
    for (const name of readinessChecks) vi.stubEnv(name, "configured");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "");
    vi.stubEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL", "");

    expect(getMissingReadinessEnv()).toEqual(["NEXT_PUBLIC_SANITY_PROJECT_ID", "GHL_SHOP_PURCHASE_WEBHOOK_URL"]);
  });

  it("exposes lazy public Sanity defaults and required values", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "project-id");

    expect(publicEnv.sanityApiVersion).toBe("2026-01-09");
    expect(publicEnv.sanityDataset).toBe("production");
    expect(publicEnv.sanityProjectId).toBe("project-id");
  });
});
