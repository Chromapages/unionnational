import { afterEach, expect, it, vi } from "vitest";
const createClient = vi.hoisted(() => vi.fn(() => ({ private: true })));
vi.mock("next-sanity", () => ({ createClient }));
vi.mock("@/lib/config/env", () => ({ publicEnv: { sanityDataset: "public", sanityProjectId: "fixture", sanityApiVersion: "2026-01-09" } }));
import { getPaymentStorage } from "./payment-storage";
import { paymentConfigurationGaps } from "./payment-configuration";
afterEach(() => { vi.unstubAllEnvs(); createClient.mockClear(); });
it("fails closed without isolated, owner-confirmed migrated private storage", () => {
    vi.stubEnv("SANITY_PAYMENT_DATASET", "public");
    vi.stubEnv("SANITY_PAYMENT_AUTH_TOKEN", "fixture-private-only");
    vi.stubEnv("SANITY_PAYMENT_PRIVATE_CONFIRMED", "true");
    vi.stubEnv("SANITY_PAYMENT_MIGRATION_CONFIRMED", "true");
    expect(() => getPaymentStorage()).toThrow();
    vi.stubEnv("SANITY_PAYMENT_DATASET", "payments_private");
    vi.stubEnv("SANITY_PAYMENT_MIGRATION_CONFIRMED", "false");
    expect(() => getPaymentStorage()).toThrow();
    expect(createClient).not.toHaveBeenCalled();
    vi.stubEnv("SANITY_PAYMENT_MIGRATION_CONFIRMED", "true");
    expect(getPaymentStorage()).toEqual({ private: true });
    expect(createClient).toHaveBeenCalledWith(expect.objectContaining({ dataset: "payments_private", useCdn: false, maxRetries: 0 }));
});
it("treats false confirmation flags and insecure destinations as readiness gaps", () => {
    const gaps = paymentConfigurationGaps({ SANITY_PAYMENT_DATASET: "production", SANITY_PAYMENT_AUTH_TOKEN: "fixture", SANITY_PAYMENT_PRIVATE_CONFIRMED: "false", SANITY_PAYMENT_MIGRATION_CONFIRMED: "false", GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS: "receiver.example.test", GHL_SHOP_FULFILLMENT_SECRET: "x".repeat(32), GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED: "false", GHL_SHOP_PURCHASE_WEBHOOK_URL: "http://receiver.example.test" });
    expect(gaps).toEqual(expect.arrayContaining(["SANITY_PAYMENT_DATASET", "SANITY_PAYMENT_PRIVATE_CONFIRMED", "SANITY_PAYMENT_MIGRATION_CONFIRMED", "GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "GHL_SHOP_PURCHASE_WEBHOOK_URL"]));
});
