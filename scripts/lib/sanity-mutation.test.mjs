import { strict as assert } from "node:assert";
import { test } from "node:test";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { mutationOptions, backupForMutation } from "./sanity-mutation.mjs";
import { privateOutputDirectory } from "./private-output.mjs";

const config = { projectId: "example1", dataset: "production", token: "fixture" };
test("admin writes default to preview and require an acknowledged configured target", () => {
  assert.equal(mutationOptions([], config).apply, false);
  assert.throws(() => mutationOptions(["--apply"], config));
  assert.throws(() => mutationOptions(["--apply", "--target=staging", "--project=example1"], config));
  assert.throws(() => mutationOptions(["--apply", "--dry-run"], config));
  assert.equal(mutationOptions(["--apply", "--target=production", "--project=example1"], config).apply, true);
});
test("private output rejects public paths and traversal", () => {
  assert.throws(() => privateOutputDirectory(process.cwd(), "public/backups"));
  assert.throws(() => privateOutputDirectory(process.cwd(), ".local-backups/../public"));
});
test("backup rejects stale plans before writing and never mutates the client", async () => {
  const client = { config: () => config, fetch: async () => [{ _id: "doc", _rev: "changed" }] };
  const options = { ...config, apply: true };
  await assert.rejects(backupForMutation(client, options, [{ _id: "doc", _rev: "previous" }]));
  await assert.rejects(backupForMutation(client, { ...options, apply: false }, [{ _id: "doc" }]));
});
test("backup stores originals and creation markers without a token", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "sanity-guard-test-"));
  try {
    const original = { _id: "doc", _rev: "revision", content: "original content" };
    const client = { config: () => config, fetch: async () => [original] };
    await backupForMutation(client, { ...config, apply: true }, [original, { _id: "new-doc" }], directory);
    const backupDirectory = path.join(directory, ".local-backups", "sanity");
    const [file] = await readdir(backupDirectory);
    const backup = JSON.parse(await readFile(path.join(backupDirectory, file), "utf8"));
    assert.deepEqual(backup.documents, [original]);
    assert.deepEqual(backup.missingDocumentIds, ["new-doc"]);
    assert.equal(backup.token, undefined);
  } finally {
    if (!path.resolve(directory).startsWith(path.resolve(os.tmpdir()) + path.sep) || !path.basename(directory).startsWith("sanity-guard-test-")) throw new Error("Unsafe fixture directory.");
    await rm(directory, { recursive: true, force: true });
  }
});
