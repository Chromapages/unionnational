import { strict as assert } from "node:assert";
import { test } from "node:test";
import { scanText, historyDisposition } from "./security-source-guard.mjs";

test("source guard detects capability URLs and emits only hashes and locations", () => {
  const capability = "https://" + ["services", "leadconnectorhq", "com"].join(".") + "/hooks/fixture-capability";
  const findings = scanText(`const endpoint = '${capability}';`, "src/example.ts");
  assert.equal(findings[0].type, "ghl-capability");
  assert.equal(findings[0].line, 1);
  assert.match(findings[0].fingerprint, /^[a-f0-9]{16}$/);
  assert.ok(!JSON.stringify(findings).includes(capability));
});
test("source guard accepts environment reads and ignores explicitly mocked assignment fixtures", () => {
  assert.deepEqual(scanText('const token = process.env.SANITY_AUTH_TOKEN;', "src/example.ts"), []);
  assert.deepEqual(scanText('const secret = "test-secret-fixture-value";', "src/example.test.ts"), []);
});
test("source guard recognizes credential values without exposing them", () => {
  const value = "ghp_" + "a".repeat(36);
  const findings = scanText(`const authorization = '${value}';`, "src/example.ts");
  assert.equal(findings[0].type, "github-token");
  assert.ok(!JSON.stringify(findings).includes(value));
});
test("history fixture dispositions cannot suppress current source or webhook findings", () => {
  const baseline = { fingerprint: { status: "false-positive-confirmed", path: "fixture.cjs", object: "fixture-object" } };
  assert.equal(historyDisposition({ fingerprint: "fingerprint", path: "fixture.cjs", type: "secret-assignment" }, "fixture-object", baseline).resolved, true);
  assert.equal(historyDisposition({ fingerprint: "fingerprint", path: "fixture.cjs", type: "ghl-capability" }, "fixture-object", baseline).resolved, false);
  assert.equal(historyDisposition({ fingerprint: "fingerprint", path: "other.cjs", type: "secret-assignment" }, "fixture-object", baseline).resolved, false);
});
