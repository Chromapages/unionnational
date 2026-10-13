import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseOptions, prepareProposal, readStorefrontCopy, runPreparation, publicQueryUrl, target, longDescription } from "./prepare-construction-book-copy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Published October 10 keys/structure; synthetic old text keeps this fixture independent of private evidence.
const baseline = {
  _id: target.id, _rev: "aY7Z7554SNEJL0Uz6cbSu3", slug: { _type: "slug", current: target.slug },
  title: { _type: "localizedString", en: "The Money‑Making Blueprint for Construction Companies", es: "El Plan Maestro de Rentabilidad para Empresas de Construcción" },
  author: { name: "Jason Astwood" }, price: 27,
  coverRef: "image-fa0de758c05a6ebc863e41bc185645feb27e3360-1620x1620-png",
  editions: [
    { _key: "qmhcu1dgv", format: "bundle", name: "Bundle (Digital + Print)", price: 59, stripePriceId: "fixture-bundle" },
    { _key: "0yojp28zt", format: "physical", name: "Hardcover", price: 39, stripePriceId: "fixture-print" },
    { _key: "5htyhz1qd", format: "digital", name: "Digital PDF", price: 27, stripePriceId: "fixture-pdf" },
    { _key: "ur4qbl6u0", format: "audio", name: "Audiobook", price: 27, stripePriceId: "fixture-audio" },
  ],
  shortDescription: { _type: "localizedText", en: "Existing English description", es: "Descripción existente" },
  features: ["da6eae2ef995", "e875504fdb56", "af240a947858", "ad95b5849894", "e3748fea817d"].map(_key => ({ _key, _type: "localizedString", en: "Existing English feature" })),
  learningObjectives: ["04213f6fd6de", "9326bb963836", "386849e825e0", "461be9e0fc65"].map(_key => ({
    _key, title: { _type: "localizedString", en: "Existing English title", es: "Título existente" },
    description: { _type: "localizedText", en: "Existing English objective", es: "Objetivo existente" },
  })),
  fullDescription: {
    _type: "localizedBlock",
    en: [{ _key: "5f980e828292", _type: "block", style: "normal", markDefs: [], children: [{ _key: "32cc543ef58f", _type: "span", marks: [], text: "Existing English long description" }] }],
    es: [{ _key: "73d622ddb45c", _type: "block", style: "normal", markDefs: [], children: [{ _key: "3b4331451df8", _type: "span", marks: [], text: "Descripción larga existente" }] }],
  },
};
const copy = await readStorefrontCopy(root);
const prepare = document => prepareProposal(document, copy, { mode: "historical-test-fixture" });

async function withFixture(callback) {
  const temporaryRoot = path.join(root, ".omx/tmp");
  await fs.mkdir(temporaryRoot, { recursive: true });
  const directory = await fs.mkdtemp(path.join(temporaryRoot, "construction-copy-test-"));
  try { await callback(directory); }
  finally {
    assert.ok(path.resolve(directory).startsWith(path.resolve(temporaryRoot) + path.sep));
    assert.ok(path.basename(directory).startsWith("construction-copy-test-"));
    await fs.rm(directory, { recursive: true, force: true });
  }
}

test("prepares 30 keyed bilingual text paths with revision guard and preserves the published structure", () => {
  const original = structuredClone(baseline);
  const proposal = prepare(baseline);
  assert.equal(proposal.cms.patch.id, target.id);
  assert.equal(proposal.cms.patch.ifRevisionID, baseline._rev);
  assert.equal(Object.keys(proposal.cms.patch.set).length, 30);
  assert.equal(proposal.before['shortDescription.en'], baseline.shortDescription.en);
  assert.equal(proposal.cmsMutationPerformed, false);
  assert.equal(proposal.rollback.originallyAbsentPaths.length, 5);
  assert.deepEqual(baseline, original);
  for (const locale of ["en", "es"]) {
    const block = proposal.candidate.fullDescription[locale][0];
    assert.equal(block._key, baseline.fullDescription[locale][0]._key);
    assert.equal(block.children[0]._key, baseline.fullDescription[locale][0].children[0]._key);
    assert.equal(block.children[0].text, longDescription[locale]);
  }
});

test("proposal agrees exactly with the actual EN and ES storefront construction messages", async () => {
  const proposal = prepare(baseline);
  for (const locale of ["en", "es"]) {
    const messages = JSON.parse(await fs.readFile(path.join(root, "src/messages", `${locale}.json`), "utf8"));
    assert.equal(proposal.candidate.shortDescription[locale], messages.Shop.Desktop.books.construction.description);
    assert.deepEqual(proposal.candidate.features.map(item => item[locale]), messages.Shop.ProductPage.constructionOverview.features);
    assert.deepEqual(proposal.candidate.learningObjectives.map(item => ({ title: item.title[locale], description: item.description[locale] })), messages.Shop.ProductPage.constructionOverview.learningObjectives);
  }
});

test("preserves commerce, identity, other locales and unrelated fields exactly", () => {
  const document = { ...structuredClone(baseline), _type: "product", compareAtPrice: 99, buyLink: "https://example.com/book", orderBump: { price: 20, stripePriceId: "fixture-offer" }, coverImage: { asset: { _ref: baseline.coverRef } }, unrelated: { enabled: true } };
  document.shortDescription.fr = "Texte existant";
  document.features[0].fr = "Fonction existante";
  const proposal = prepare(document);
  for (const field of Object.keys(document).filter(field => !["shortDescription", "features", "learningObjectives", "fullDescription"].includes(field))) assert.deepEqual(proposal.candidate[field], document[field]);
  assert.equal(proposal.candidate.shortDescription.fr, document.shortDescription.fr);
  assert.equal(proposal.candidate.features[0].fr, document.features[0].fr);
  assert.match(proposal.commerceSha256, /^[a-f0-9]{64}$/);
  assert.equal(proposal.commerceSha256, prepare(document).commerceSha256);
});

test("rejects malformed documents, drafts, wrong identity, key counts and unsafe or duplicate keys", () => {
  for (const malformed of [null, [], { ...baseline, _id: `drafts.${target.id}` }, { ...baseline, _rev: "" }, { ...baseline, _type: "service" }, { ...baseline, slug: { current: "other-book" } }, { ...baseline, features: baseline.features.slice(1) }, { ...baseline, learningObjectives: baseline.learningObjectives.slice(1) }]) assert.throws(() => prepare(malformed));
  for (const field of ["features", "learningObjectives"]) {
    const duplicate = structuredClone(baseline);
    duplicate[field][1]._key = duplicate[field][0]._key;
    assert.throws(() => prepare(duplicate));
    duplicate[field][1]._key = 'bad"key';
    assert.throws(() => prepare(duplicate));
  }
});

test("rejects unexpected localized types and every unverified long-description structure", () => {
  const changes = [
    document => { document.shortDescription._type = "localizedString"; },
    document => { document.features[0]._type = "object"; },
    document => { document.learningObjectives[0]._type = "reference"; },
    document => { document.learningObjectives[0].title.en = 3; },
    document => { document.fullDescription.en.push(structuredClone(document.fullDescription.en[0])); },
    document => { document.fullDescription.es[0].children.push(structuredClone(document.fullDescription.es[0].children[0])); },
    document => { document.fullDescription.en[0].children[0]._type = "image"; },
    document => { document.fullDescription.en[0].children[0].marks = ["strong"]; },
    document => { document.fullDescription.en[0].markDefs = [{ _type: "link" }]; },
    document => { document.fullDescription.en[0].style = "h2"; },
  ];
  for (const change of changes) {
    const document = structuredClone(baseline);
    change(document);
    assert.throws(() => prepare(document));
  }
});

test("rejects apply and unknown flags before any fetch or local write", async () => {
  await withFixture(async directory => {
    let fetched = false;
    for (const args of [["--apply"], ["--apply=true"], ["--snapshot", "missing.json", "--apply"], ["--project=other"], ["--output=public/copy"], ["--snapshot"], ["--output=a", "--output=b"]]) {
      await assert.rejects(runPreparation(args, { directory, fetchImpl: async () => { fetched = true; throw new Error("Unexpected fetch"); } }));
    }
    assert.equal(fetched, false);
    assert.deepEqual(await fs.readdir(directory), []);
  });
  assert.deepEqual(parseOptions(["--snapshot=input.json", "--output", ".release-evidence/review"]), { snapshot: "input.json", output: ".release-evidence/review" });
});

test("fresh public preparation uses only the fixed unauthenticated GET and writes a private proposal", async () => {
  await withFixture(async directory => {
    await fs.mkdir(path.join(directory, "src/messages"), { recursive: true });
    for (const locale of ["en", "es"]) await fs.copyFile(path.join(root, "src/messages", `${locale}.json`), path.join(directory, "src/messages", `${locale}.json`));
    let calls = 0;
    const result = await runPreparation([], { directory, fetchImpl: async (url, options) => {
      calls++;
      assert.equal(url, publicQueryUrl);
      assert.equal(options.method, "GET");
      assert.equal(options.redirect, "error");
      assert.equal(options.credentials, "omit");
      assert.equal(options.headers, undefined);
      return { ok: true, json: async () => ({ result: { ...baseline, _type: "product" } }) };
    } });
    assert.equal(calls, 1);
    assert.equal(result.source, "fresh-public-get");
    assert.ok(result.filename.startsWith(path.join(directory, ".release-evidence/construction-book-copy") + path.sep));
    const proposal = JSON.parse(await fs.readFile(result.filename, "utf8"));
    assert.equal(proposal.source.publicReadVerifiedThisRun, true);
    assert.equal(proposal.cmsMutationPerformed, false);
  });
});

test("explicit offline snapshots are labeled unverified and public failures do not write proposals", async () => {
  await withFixture(async directory => {
    await fs.mkdir(path.join(directory, "src/messages"), { recursive: true });
    for (const locale of ["en", "es"]) await fs.copyFile(path.join(root, "src/messages", `${locale}.json`), path.join(directory, "src/messages", `${locale}.json`));
    for (const fetchImpl of [async () => { throw new Error("blocked"); }, async () => ({ ok: false, status: 403 }), async () => ({ ok: true, json: async () => ({ result: baseline }) })]) await assert.rejects(runPreparation([], { directory, fetchImpl }));
    await assert.rejects(fs.access(path.join(directory, ".release-evidence")));
    await fs.writeFile(path.join(directory, "snapshot.json"), JSON.stringify(baseline));
    const result = await runPreparation(["--snapshot", "snapshot.json"], { directory, fetchImpl: async () => { throw new Error("Offline must not fetch"); } });
    const proposal = JSON.parse(await fs.readFile(result.filename, "utf8"));
    assert.equal(proposal.source.mode, "supplied-snapshot-offline");
    assert.equal(proposal.source.publicReadVerifiedThisRun, false);
    assert.equal(proposal.source.capturedAt, null);
    assert.equal(proposal.revision, baseline._rev);
  });
});
