import { afterEach, describe, expect, it, vi } from "vitest";
import { getEnv, getMissingReadinessEnv, publicEnv, readinessChecks, requireEnv } from "./env";

describe("env config", () => {
  function configureFixtures() {
    for (const name of readinessChecks) vi.stubEnv(name, "configured");
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://www.example.test");
    vi.stubEnv("SHOP_PAYMENTS_ENABLED", "true");
    vi.stubEnv("STRIPE_SECRET_KEY", "configured");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "configured");
    vi.stubEnv("SANITY_PAYMENT_PROJECT_ID", "private-project");
    vi.stubEnv("SANITY_PAYMENT_AUTH_TOKEN", "configured");
    vi.stubEnv("SANITY_PAYMENT_DATASET", "private_fixture");
    vi.stubEnv("SANITY_PAYMENT_PRIVATE_CONFIRMED", "true");
    vi.stubEnv("SANITY_PAYMENT_MIGRATION_CONFIRMED", "true");
    vi.stubEnv("GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS", "receiver.example.test");
    vi.stubEnv("GHL_SHOP_FULFILLMENT_SECRET", "synthetic-private-receiver-secret-value");
    vi.stubEnv("GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "true");
    vi.stubEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL", "https://receiver.example.test/order");
  }
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
    configureFixtures();
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "");
    vi.stubEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL", "");

    expect(getMissingReadinessEnv()).toEqual(["NEXT_PUBLIC_SANITY_PROJECT_ID", "GHL_SHOP_PURCHASE_WEBHOOK_URL"]);
  });

  it("reports invalid privacy and receiver attestations even when settings are present", () => {
    configureFixtures();
    vi.stubEnv("SANITY_PAYMENT_PRIVATE_CONFIRMED", "false");
    vi.stubEnv("SANITY_PAYMENT_DATASET", "configured");
    vi.stubEnv("GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "false");
    vi.stubEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL", "https://unapproved.example.test/order");
    expect(getMissingReadinessEnv()).toEqual(expect.arrayContaining([
      "SANITY_PAYMENT_PRIVATE_CONFIRMED", "SANITY_PAYMENT_DATASET", "GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "GHL_SHOP_PURCHASE_WEBHOOK_URL",
    ]));
  });

  it.each([undefined, "false", "TRUE", "1"])("requires nonpayment readiness and omits payment requirements with SHOP_PAYMENTS_ENABLED=%s", (value) => {
    configureFixtures();
    vi.stubEnv("SHOP_PAYMENTS_ENABLED", value);
    vi.stubEnv("STRIPE_SECRET_KEY", "");
    vi.stubEnv("SANITY_PAYMENT_AUTH_TOKEN", "");
    vi.stubEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL", "invalid");
    expect(getMissingReadinessEnv()).toEqual([]);

    vi.stubEnv("GHL_WEBHOOK_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "");
    expect(getMissingReadinessEnv()).toEqual(["SANITY_REVALIDATE_SECRET", "GHL_WEBHOOK_URL", "UPSTASH_REDIS_REST_URL"]);
  });

  it.each([undefined, "not a URL", "ftp://example.test"])("does not attest to contact readiness without a usable configured origin (%s)", (value) => {
    configureFixtures();
    vi.stubEnv("SHOP_PAYMENTS_ENABLED", undefined);
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", value);
    expect(getMissingReadinessEnv()).toEqual(["NEXT_PUBLIC_BASE_URL"]);
  });

  it("exposes lazy public Sanity defaults and required values", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "project-id");

    expect(publicEnv.sanityApiVersion).toBe("2026-01-09");
    expect(publicEnv.sanityDataset).toBe("production");
    expect(publicEnv.sanityProjectId).toBe("project-id");
  });
});
