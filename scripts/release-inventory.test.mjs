import { strict as assert } from "node:assert";
import { test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createReleaseInventory } from "./release-inventory.mjs";

test("release inventory preserves notices, excludes development dependencies, and strips registry credentials", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "release-inventory-test-"));
  try {
    fs.mkdirSync(path.join(directory, "node_modules", "example"), { recursive: true });
    fs.writeFileSync(path.join(directory, "package.json"), JSON.stringify({ name: "fixture", version: "1.0.0" }));
    fs.writeFileSync(path.join(directory, "package-lock.json"), JSON.stringify({ packages: {
      "": {}, "node_modules/example": { version: "1.0.0", license: "MIT", resolved: "https://fixture:credential@example.test/example.tgz?credential=fixture" },
      "node_modules/dev-example": { version: "2.0.0", dev: true },
    } }));
    fs.writeFileSync(path.join(directory, "node_modules", "example", "package.json"), JSON.stringify({ name: "example", version: "1.0.0", license: "MIT" }));
    fs.writeFileSync(path.join(directory, "node_modules", "example", "LICENSE"), "Copyright fixture\nPermission notice must remain intact.");
    const result = createReleaseInventory(directory);
    assert.equal(result.dependencies, 1);
    assert.equal(result.reviewItems, 0);
    const inventory = JSON.parse(fs.readFileSync(path.join(directory, ".release-evidence", "dependency-inventory.json"), "utf8"));
    assert.equal(inventory.entries[0].registryUrl, "https://example.test/example.tgz");
    assert.ok(fs.readFileSync(path.join(directory, ".release-evidence", "THIRD-PARTY-NOTICES.md"), "utf8").includes("Permission notice must remain intact."));
    assert.equal(JSON.parse(fs.readFileSync(path.join(directory, ".release-evidence", "sbom.cdx.json"), "utf8")).components[0].purl, "pkg:npm/example@1.0.0");
  } finally {
    if (!path.resolve(directory).startsWith(path.resolve(os.tmpdir()) + path.sep) || !path.basename(directory).startsWith("release-inventory-test-")) throw new Error("Unsafe fixture directory.");
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
