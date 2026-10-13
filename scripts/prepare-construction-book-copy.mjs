import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { privateOutputDirectory } from "./lib/private-output.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const target = Object.freeze({ project: "p1x9y3wz", dataset: "production", id: "038a9b49-ee53-4e6a-9897-e9fe51693396", slug: "the-money-making-blueprint-for-construction-companies" });
const query = `*[_type == "product" && _id == "${target.id}" && slug.current == "${target.slug}"][0]`;
export const publicQueryUrl = `https://${target.project}.api.sanity.io/v2024-01-01/data/query/${target.dataset}?query=${encodeURIComponent(query)}&perspective=published`;
export const longDescription = Object.freeze({
  en: "This book connects financial management with day-to-day construction operations. It covers estimating, job costing, cash-flow planning, project kickoffs, scheduling, subcontractor accountability, quality control, and change orders. It also examines clear roles, communication rhythms, and leadership as a company grows. Its in-book checklists and examples provide starting points for reviewing these systems; they do not guarantee a particular financial result.",
  es: "Este libro relaciona la gestión financiera con las operaciones diarias de construcción. Abarca la estimación, los costos por proyecto, la planificación del flujo de caja, el inicio de los proyectos, la programación, la responsabilidad de los subcontratistas, el control de calidad y las órdenes de cambio. También examina las funciones claras, las rutinas de comunicación y el liderazgo a medida que crece una empresa. Sus listas de verificación y ejemplos incluidos en el libro ofrecen puntos de partida para revisar estos sistemas; no garantizan un resultado financiero específico.",
});

export function parseOptions(args) {
  const options = { output: ".release-evidence/construction-book-copy" };
  const seen = new Set();
  for (let index = 0; index < args.length; index++) {
    const [flag, ...inline] = args[index].split("=");
    if (!["--snapshot", "--output"].includes(flag)) throw new Error(`Unsupported option: ${flag}. This CLI only prepares; --apply is forbidden.`);
    if (seen.has(flag)) throw new Error(`Duplicate option: ${flag}`);
    seen.add(flag);
    const value = inline.length ? inline.join("=") : args[++index];
    if (!value || value.startsWith("--")) throw new Error(`Missing value: ${flag}`);
    options[flag.slice(2)] = value;
  }
  const parts = options.output.split(/[\\/]/).filter(Boolean);
  if (!['.local-backups', '.release-evidence'].includes(parts[0]) || parts.some(part => ["..", ".", "public", ".git"].includes(part))) throw new Error("Output must use a private directory without traversal.");
  return options;
}

export async function readStorefrontCopy(directory = root) {
  const copy = {};
  for (const locale of ["en", "es"]) {
    const messages = JSON.parse(await fs.readFile(path.join(directory, "src/messages", `${locale}.json`), "utf8"));
    const overview = messages.Shop.ProductPage.constructionOverview;
    copy[locale] = { shortDescription: messages.Shop.Desktop.books.construction.description, features: overview.features, learningObjectives: overview.learningObjectives, fullDescription: longDescription[locale] };
  }
  return copy;
}

function text(value) {
  assert.equal(typeof value, "string", "Copy must be text.");
  assert.ok(value.trim(), "Copy must not be blank.");
}

function keys(items, count) {
  assert.ok(Array.isArray(items) && items.length === count, `Expected ${count} keyed items.`);
  const values = items.map(item => item?._key);
  assert.ok(values.every(key => typeof key === "string" && /^[A-Za-z0-9_-]{1,100}$/.test(key)), "Invalid stable key.");
  assert.equal(new Set(values).size, count, "Duplicate stable key.");
}

function localized(value, type, requireBoth = true) {
  assert.equal(value?._type, type, `Expected ${type}.`);
  text(value.en);
  if (requireBoth || value.es !== undefined) text(value.es);
}

function withoutCopy(document) {
  const result = structuredClone(document);
  for (const locale of ["en", "es"]) {
    delete result.shortDescription[locale];
    for (const feature of result.features) delete feature[locale];
    for (const objective of result.learningObjectives) {
      delete objective.title[locale];
      delete objective.description[locale];
    }
    delete result.fullDescription[locale][0].children[0].text;
  }
  return result;
}

const hash = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");

export function prepareProposal(document, copy, source) {
  assert.ok(document && typeof document === "object" && !Array.isArray(document), "Expected one published product document.");
  assert.equal(document._id, target.id, "Wrong document; drafts are forbidden.");
  assert.ok(document._type === "product" || document._type === undefined, "Unexpected document type.");
  assert.equal(document.slug?.current, target.slug, "Wrong product slug.");
  assert.ok(typeof document._rev === "string" && /^[A-Za-z0-9_-]{1,160}$/.test(document._rev), "Missing or invalid revision.");
  localized(document.shortDescription, "localizedText");
  keys(document.features, 5);
  keys(document.learningObjectives, 4);
  for (const feature of document.features) localized(feature, "localizedString", false);
  for (const objective of document.learningObjectives) {
    assert.ok(objective._type === undefined || objective._type === "object", "Unexpected objective type.");
    localized(objective.title, "localizedString");
    localized(objective.description, "localizedText");
  }
  assert.equal(document.fullDescription?._type, "localizedBlock");
  for (const locale of ["en", "es"]) {
    keys(document.fullDescription[locale], 1);
    const block = document.fullDescription[locale][0];
    assert.equal(block._type, "block", "Unknown long-description structure.");
    assert.equal(block.style, "normal", "Unknown long-description style.");
    assert.deepEqual(block.markDefs, [], "Long-description annotations need editorial review.");
    keys(block.children, 1);
    assert.equal(block.children[0]._type, "span", "Unknown long-description child.");
    assert.deepEqual(block.children[0].marks, [], "Long-description formatting needs editorial review.");
    text(block.children[0].text);
    assert.equal(copy[locale].features.length, 5);
    assert.equal(copy[locale].learningObjectives.length, 4);
  }
  const candidate = structuredClone(document);
  const set = {};
  const before = {};
  const replace = (field, object, property, value) => {
    assert.match(field, /^(shortDescription\.(en|es)|features\[_key=="[A-Za-z0-9_-]+"\]\.(en|es)|learningObjectives\[_key=="[A-Za-z0-9_-]+"\]\.(title|description)\.(en|es)|fullDescription\.(en|es)\[_key=="[A-Za-z0-9_-]+"\]\.children\[_key=="[A-Za-z0-9_-]+"\]\.text)$/);
    text(value);
    before[field] = object[property] ?? null;
    set[field] = value;
    object[property] = value;
  };
  for (const locale of ["en", "es"]) {
    replace(`shortDescription.${locale}`, candidate.shortDescription, locale, copy[locale].shortDescription);
    candidate.features.forEach((item, index) => replace(`features[_key=="${item._key}"].${locale}`, item, locale, copy[locale].features[index]));
    candidate.learningObjectives.forEach((item, index) => {
      for (const field of ["title", "description"]) replace(`learningObjectives[_key=="${item._key}"].${field}.${locale}`, item[field], locale, copy[locale].learningObjectives[index][field]);
    });
    const block = candidate.fullDescription[locale][0];
    replace(`fullDescription.${locale}[_key=="${block._key}"].children[_key=="${block.children[0]._key}"].text`, block.children[0], "text", copy[locale].fullDescription);
  }
  assert.equal(Object.keys(set).length, 30);
  assert.deepEqual(withoutCopy(candidate), withoutCopy(document), "An unrelated field changed.");
  const commerce = structuredClone(document);
  for (const field of ["shortDescription", "features", "learningObjectives", "fullDescription", "_rev", "_createdAt", "_updatedAt"]) delete commerce[field];
  const candidateCommerce = structuredClone(candidate);
  for (const field of ["shortDescription", "features", "learningObjectives", "fullDescription", "_rev", "_createdAt", "_updatedAt"]) delete candidateCommerce[field];
  assert.deepEqual(candidateCommerce, commerce, "Commerce or product identity changed.");
  return {
    status: "draft-awaiting-editorial-and-Spanish-approval", preparedAt: new Date().toISOString(), source,
    manuscript: "https://drive.google.com/file/d/1fVB2C3d57czUS23NT0JVpfsgool47Jpk/view",
    cms: { ...target, patch: { id: target.id, ifRevisionID: document._rev, set } },
    before, sourceDocument: document, candidate, commerceIdentity: commerce, commerceSha256: hash(commerce), revision: document._rev,
    rollback: { before, originallyAbsentPaths: Object.keys(before).filter(field => before[field] === null), requiresFreshRevision: true },
    cmsMutationPerformed: false,
    notes: [
      "Preparation only: no CMS write or mutator exists in this CLI. No authentication or environment values are read.",
      "Short description, five features and four objectives match the current EN/ES storefront. Long descriptions are manuscript-backed editorial drafts requiring English and Spanish approval.",
      "Missing _type is accepted only for the historical public projection; it does not verify the document type. A fresh full-document public read is required before future application.",
      "CMS may drift after preparation. Re-fetch the published document and compare revision, stable keys, structure and commerce identity before any separately authorized future application; regenerate on drift.",
      "The patch pins ifRevisionID to the observed revision. Preserve the full original and, for rollback, use a freshly verified revision with before values; unset originally absent paths instead of inserting null. Review rollback because it restores the known manuscript mismatch.",
      "Prices, title, author, cover, formats, editions, Stripe identifiers, offers, cart and every unrelated field are unchanged. Source verification is limited to the supplied public document; a historical projection cannot establish omitted fields.",
    ],
  };
}

export async function runPreparation(args, { directory = root, fetchImpl = fetch } = {}) {
  const options = parseOptions(args);
  let document;
  let source;
  if (options.snapshot) {
    const snapshotPath = path.resolve(directory, options.snapshot);
    const snapshot = JSON.parse(await fs.readFile(snapshotPath, "utf8"));
    document = snapshot.document ?? snapshot.result ?? snapshot;
    source = { mode: "supplied-snapshot-offline", snapshotPath, publicReadVerifiedThisRun: false, capturedAt: snapshot.capturedAt ?? null, warning: "Snapshot age and current CMS revision are not verified. An unwrapped snapshot has no verified capture time." };
  } else {
    let response;
    try { response = await fetchImpl(publicQueryUrl, { method: "GET", redirect: "error", credentials: "omit", signal: AbortSignal.timeout(15000) }); }
    catch { throw new Error("Public CMS GET unavailable. Use an explicitly supplied --snapshot for offline preparation; CMS freshness will remain unverified."); }
    if (!response.ok) throw new Error(`Public CMS read failed (${response.status}). Use an explicitly supplied --snapshot for offline preparation.`);
    const payload = await response.json();
    document = payload.result;
    assert.equal(document?._type, "product", "Public read must return the complete product document.");
    source = { mode: "fresh-public-get", endpoint: publicQueryUrl, capturedAt: new Date().toISOString(), publicReadVerifiedThisRun: true };
  }
  const proposal = prepareProposal(document, await readStorefrontCopy(directory), source);
  const output = privateOutputDirectory(directory, options.output);
  const filename = path.join(output, `${Date.now()}-${randomUUID()}-proposal.json`);
  await fs.writeFile(filename, JSON.stringify(proposal, null, 2) + "\n", { mode: 0o600, flag: "wx" });
  return { filename, fields: Object.keys(proposal.cms.patch.set).length, revision: proposal.revision, source: source.mode, cmsMutationPerformed: false };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await runPreparation(process.argv.slice(2)))); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
