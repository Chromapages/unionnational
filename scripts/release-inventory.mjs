import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { privateOutputDirectory } from "./lib/private-output.mjs";

const NOTICE_FILE = /^(?:licen[sc]e|copying|copyright|notice)(?:[._-].*)?$/i;
const NOTICE_LIMIT = 1024 * 1024;

function packageName(location) { return location.split("node_modules/").at(-1); }
function fingerprint(content) { return createHash("sha256").update(content).digest("hex"); }
function publicRegistryUrl(value) {
  try { const url = new URL(value); url.username = ""; url.password = ""; url.search = ""; url.hash = ""; return url.protocol === "https:" ? url.href : undefined; }
  catch { return undefined; }
}

export function createReleaseInventory(root, { production = true, output = ".release-evidence" } = {}) {
  const lockContent = fs.readFileSync(path.join(root, "package-lock.json"), "utf8");
  const lock = JSON.parse(lockContent);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const evidenceRoot = privateOutputDirectory(root, output);
  const entries = [];
  const review = [];
  const notices = new Map();
  for (const [location, metadata] of Object.entries(lock.packages || {})) {
    if (!location || (production && metadata.dev)) continue;
    if (!location.startsWith("node_modules/") || location.split("/").includes("..")) throw new Error("Unexpected lockfile package path.");
    const directory = path.resolve(root, location);
    if (!directory.startsWith(`${path.resolve(root, "node_modules")}${path.sep}`)) throw new Error("Unexpected package location.");
    const name = metadata.name || packageName(location);
    const version = metadata.version || "unknown";
    const identifier = `${name}@${version}`;
    let installed;
    try { installed = JSON.parse(fs.readFileSync(path.join(directory, "package.json"), "utf8")); } catch { /* Optional/platform packages may be absent. */ }
    const license = installed?.license || metadata.license || "UNKNOWN";
    const licenseExpression = typeof license === "string" ? license : license.type || "UNKNOWN";
    const legalFiles = [];
    if (installed) {
      for (const filename of fs.readdirSync(directory).filter((value) => NOTICE_FILE.test(value)).sort()) {
        const filenamePath = path.join(directory, filename);
        const info = fs.lstatSync(filenamePath);
        if (!info.isFile() || info.size > NOTICE_LIMIT) { review.push({ package: identifier, reason: "Notice is nonregular or exceeds the safe read bound." }); continue; }
        const contents = fs.readFileSync(filenamePath, "utf8");
        legalFiles.push({ filename, sha256: fingerprint(contents) });
        if (!notices.has(`${identifier}:${filename}`)) notices.set(`${identifier}:${filename}`, { identifier, filename, contents });
      }
      if (installed.version !== version) review.push({ package: identifier, reason: "Installed version differs from the lockfile; regenerate after a clean installation." });
      if (legalFiles.length === 0) review.push({ package: identifier, reason: "No packaged license/notice text found; obtain source notice before distributing." });
    } else if (!metadata.optional) review.push({ package: identifier, reason: "Required locked package is absent; regenerate on the release build host." });
    if (licenseExpression === "UNKNOWN" || /UNLICENSED|AGPL|GPL|LGPL|MPL|EPL|CDDL|SSPL|BUSL|BSL|COMMERCIAL|PROPRIETARY|LICENSEREF|SEE LICENSE/i.test(licenseExpression)) {
      review.push({ package: identifier, reason: "License metadata requires owner/legal review.", license: licenseExpression });
    }
    entries.push({ name, version, path: location, license: licenseExpression, installed: Boolean(installed), optional: Boolean(metadata.optional),
      ...(installed ? { installedVersion: installed.version } : {}), ...(publicRegistryUrl(metadata.resolved) ? { registryUrl: publicRegistryUrl(metadata.resolved) } : {}), notices: legalFiles });
  }
  entries.sort((a, b) => a.path.localeCompare(b.path));
  const timestamp = new Date().toISOString();
  const bom = { bomFormat: "CycloneDX", specVersion: "1.6", version: 1,
    metadata: { timestamp, component: { type: "application", name: manifest.name, version: manifest.version || "unknown" },
      properties: [{ name: "unionnational:lockfile-sha256", value: fingerprint(lockContent) }, { name: "unionnational:scope", value: production ? "locked-production-dependencies" : "all-locked-dependencies" }] },
    components: entries.map((entry) => ({ type: "library", "bom-ref": entry.path, name: entry.name, version: entry.version,
      purl: `pkg:npm/${entry.name.split("/").map(encodeURIComponent).join("/")}@${encodeURIComponent(entry.version)}`,
      licenses: [{ license: { name: entry.license } }],
      properties: [{ name: "unionnational:installed", value: String(entry.installed) }, { name: "unionnational:optional", value: String(entry.optional) }],
    })) };
  const inventory = { generatedAt: timestamp, lockfileSha256: fingerprint(lockContent), scope: production ? "locked-production-dependencies" : "all-locked-dependencies",
    limitations: "Inventory includes optional/platform candidates. Generate on the actual release build host. Notices preserve packaged text; missing notices and licensing obligations require review. This is not legal approval.", entries, review };
  const noticeText = ["# Third-party notices", "", "Generated from the locked dependency inventory and installed packages. Preserve this file with distributed artifacts. Missing notices and license obligations require owner/legal review; this file does not grant legal approval.", "",
    ...[...notices.values()].map((notice) => `## ${notice.identifier} — ${notice.filename}\n\n${notice.contents}\n`)].join("\n");
  fs.writeFileSync(path.join(evidenceRoot, "dependency-inventory.json"), JSON.stringify(inventory, null, 2));
  fs.writeFileSync(path.join(evidenceRoot, "sbom.cdx.json"), JSON.stringify(bom, null, 2));
  fs.writeFileSync(path.join(evidenceRoot, "THIRD-PARTY-NOTICES.md"), noticeText);
  return { event: "release_inventory", dependencies: entries.length, installed: entries.filter((entry) => entry.installed).length,
    preservedNotices: notices.size, reviewItems: review.length, output, lockfileSha256: fingerprint(lockContent) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = createReleaseInventory(process.cwd(), { production: !process.argv.includes("--all") });
    console.log(JSON.stringify(result));
    if (process.argv.includes("--strict") && result.reviewItems > 0) process.exitCode = 1;
  } catch { console.error(JSON.stringify({ event: "release_inventory_failed", reason: "Review local manifest, lockfile, and installed package consistency." })); process.exitCode = 1; }
}
