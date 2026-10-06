import { afterEach, describe, expect, it, vi } from "vitest";
import { getEnv, getMissingReadinessEnv, publicEnv, readinessChecks, requireEnv } from "./env";

describe("env config", () => {
  function configureFixtures() {
    for (const name of readinessChecks) vi.stubEnv(name, "configured");
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

  it("exposes lazy public Sanity defaults and required values", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "project-id");

    expect(publicEnv.sanityApiVersion).toBe("2026-01-09");
    expect(publicEnv.sanityDataset).toBe("production");
    expect(publicEnv.sanityProjectId).toBe("project-id");
  });
});
