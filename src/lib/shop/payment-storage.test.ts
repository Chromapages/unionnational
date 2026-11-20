import { afterEach, expect, it, vi } from "vitest";
const createClient = vi.hoisted(() => vi.fn(() => ({ private: true })));
vi.mock("next-sanity", () => ({ createClient }));
import { getPaymentStorage } from "./payment-storage";
import { paymentConfigurationGaps } from "./payment-configuration";
afterEach(() => { vi.unstubAllEnvs(); createClient.mockClear(); });
it("fails closed without isolated, owner-confirmed migrated private storage", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "public");
    vi.stubEnv("SANITY_PAYMENT_PROJECT_ID", "payment-fixture");
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
    expect(createClient).toHaveBeenCalledWith(expect.objectContaining({ projectId: "payment-fixture", dataset: "payments_private", useCdn: false, maxRetries: 0 }));
});
it("does not use the public project when the payment project is missing or the public project changes", () => {
    vi.stubEnv("SANITY_PAYMENT_DATASET", "payments_private");
    vi.stubEnv("SANITY_PAYMENT_AUTH_TOKEN", "fixture-private-only");
    vi.stubEnv("SANITY_PAYMENT_PRIVATE_CONFIRMED", "true");
    vi.stubEnv("SANITY_PAYMENT_MIGRATION_CONFIRMED", "true");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "legacy-public");
    for (const project of [undefined, "../public"]) {
        vi.stubEnv("SANITY_PAYMENT_PROJECT_ID", project);
        expect(() => getPaymentStorage()).toThrow();
    }
    expect(createClient).not.toHaveBeenCalled();
    vi.stubEnv("SANITY_PAYMENT_PROJECT_ID", "payment-fixture");
    getPaymentStorage();
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "new-public");
    getPaymentStorage();
    expect(createClient).toHaveBeenCalledTimes(2);
    expect(createClient.mock.calls).toEqual([
        [expect.objectContaining({ projectId: "payment-fixture", dataset: "payments_private" })],
        [expect.objectContaining({ projectId: "payment-fixture", dataset: "payments_private" })],
    ]);
});
it("treats false confirmation flags and insecure destinations as readiness gaps", () => {
    const gaps = paymentConfigurationGaps({ SANITY_PAYMENT_DATASET: "production", SANITY_PAYMENT_AUTH_TOKEN: "fixture", SANITY_PAYMENT_PRIVATE_CONFIRMED: "false", SANITY_PAYMENT_MIGRATION_CONFIRMED: "false", GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS: "receiver.example.test", GHL_SHOP_FULFILLMENT_SECRET: "x".repeat(32), GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED: "false", GHL_SHOP_PURCHASE_WEBHOOK_URL: "http://receiver.example.test" });
    expect(gaps).toEqual(expect.arrayContaining(["SANITY_PAYMENT_DATASET", "SANITY_PAYMENT_PRIVATE_CONFIRMED", "SANITY_PAYMENT_MIGRATION_CONFIRMED", "GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "GHL_SHOP_PURCHASE_WEBHOOK_URL"]));
});
