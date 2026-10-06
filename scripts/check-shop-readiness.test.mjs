import { strict as assert } from "node:assert";
import { test } from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixture = {
  SHOP_READINESS_STATIC: "1", STRIPE_SECRET_KEY: "sk_test_ci_fixture", STRIPE_WEBHOOK_SECRET: "whsec_ci_fixture",
  NEXT_PUBLIC_BASE_URL: "https://example.test", NEXT_PUBLIC_SANITY_DATASET: "public-ci-fixture",
  SANITY_PAYMENT_DATASET: "private-ci-fixture", SANITY_PAYMENT_AUTH_TOKEN: "fixture-ci-private-sanity-token",
  SANITY_PAYMENT_PRIVATE_CONFIRMED: "true", SANITY_PAYMENT_MIGRATION_CONFIRMED: "true",
  GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS: "example.test", GHL_SHOP_FULFILLMENT_SECRET: "fixture-ci-fulfillment-secret-value-not-for-production",
  GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED: "true", GHL_SHOP_PURCHASE_WEBHOOK_URL: "https://example.test/webhook",
};
function check(overrides = {}) {
  return spawnSync(process.execPath, ["scripts/check-shop-readiness.mjs"], {
    cwd: root, encoding: "utf8", env: { PATH: process.env.PATH, SystemRoot: process.env.SystemRoot, ...fixture, ...overrides },
  });
}
test("static readiness accepts synthetic shapes without claiming provider readiness", () => {
  const result = check();
  assert.equal(result.status, 0);
  assert.match(result.stdout, /shape checks passed with fixtures/);
  assert.match(result.stdout, /require owner verification/);
});
test("readiness blocks absent private storage and migration gates", () => {
  assert.equal(check({ SANITY_PAYMENT_PRIVATE_CONFIRMED: "false" }).status, 1);
  assert.equal(check({ SANITY_PAYMENT_MIGRATION_CONFIRMED: "false" }).status, 1);
  assert.equal(check({ SANITY_PAYMENT_DATASET: "public-ci-fixture" }).status, 1);
});
test("readiness blocks an unauthenticated or unapproved receiver configuration", () => {
  assert.equal(check({ GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS: "different.example.test" }).status, 1);
  assert.equal(check({ GHL_SHOP_FULFILLMENT_SECRET: "short" }).status, 1);
  assert.equal(check({ GHL_SHOP_PURCHASE_WEBHOOK_URL: "http://example.test/webhook" }).status, 1);
});
