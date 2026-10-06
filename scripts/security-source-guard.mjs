import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const patterns = [
  ["private-key", /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g],
  ["github-token", /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/g],
  ["stripe-secret", /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}\b/g],
  ["aws-access-key-id", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
  ["slack-token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g],
  ["ghl-capability", /https?:\/\/(?:[^/\s]+\.)?(?:leadconnectorhq\.com|msgsndr\.com)\/[^\s"'<>`\\]*?(?:hooks?|webhook)[^\s"'<>`\\]*/gi],
  ["webhook-capability", /https?:\/\/(?:hooks\.slack\.com\/services|hooks\.zapier\.com\/hooks|discord(?:app)?\.com\/api\/webhooks)\/[^\s"'<>`\\]+/gi],
  ["credential-in-url", /(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|https?):\/\/[^\s/@:'"]+:[^\s/@'"]+@[^\s'"]+/gi],
  ["secret-assignment", /\b[A-Za-z_]*(?:token|secret|password|api_?key)[A-Za-z_]*\b\s*[:=]\s*["']([^"'\r\n]{16,})["']/gi],
];

export function scanText(text, filename, scope = "source") {
  const normalized = text.replace(/\\\//g, "/");
  const findings = [];
  for (const [type, expression] of patterns) {
    for (const match of normalized.matchAll(expression)) {
      const value = match[1] || match[0];
      if ((type === "secret-assignment" || type === "credential-in-url") && /(?:\.test\.|\.spec\.|\/test\/|\/tests\/)/.test(filename)) continue;
      if (type === "secret-assignment" && (/^(?:test|mock|fixture|dry-run|your|example|placeholder)/i.test(value) || /^[A-Z][A-Z0-9_]+$/.test(value) || /\$\{|process\.env|import\.meta/.test(value))) continue;
      findings.push({ scope, path: filename, line: normalized.slice(0, match.index).split("\n").length, type,
        fingerprint: createHash("sha256").update(value).digest("hex").slice(0, 16) });
    }
  }
  return findings;
}

function git(args, options = {}) {
  return execFileSync("git", args, { encoding: "buffer", stdio: ["pipe", "pipe", "pipe"], maxBuffer: 72 * 1024 * 1024, ...options });
}

function textContent(buffer) {
  if (buffer.subarray(0, 4096).includes(0)) return undefined;
  try { return new TextDecoder("utf-8", { fatal: true }).decode(buffer); } catch { return undefined; }
}

function currentSource(root) {
  const filenames = git(["ls-files", "--cached", "--others", "--exclude-standard", "-z"], { cwd: root }).toString("utf8").split("\0").filter(Boolean);
  const findings = [];
  const skipped = [];
  let scanned = 0;
  for (const filename of new Set(filenames)) {
    const absolute = path.resolve(root, filename);
    if (!absolute.startsWith(`${root}${path.sep}`) || !fs.existsSync(absolute) || !fs.lstatSync(absolute).isFile()) continue;
    if (/(?:^|\/)(?:\.env(?:\..*)?|[^/]+\.(?:pem|key|p12|pfx))$/i.test(filename)) {
      findings.push({ scope: "source", path: filename, type: "sensitive-file-tracked" });
      continue;
    }
    if (fs.statSync(absolute).size > MAX_FILE_BYTES) { skipped.push({ path: filename, reason: "size" }); continue; }
    const content = textContent(fs.readFileSync(absolute));
    if (content === undefined) { skipped.push({ path: filename, reason: "binary-or-non-utf8" }); continue; }
    scanned += 1;
    findings.push(...scanText(content, filename));
  }
  return { scanned, skipped, findings };
}

export function historyDisposition(finding, object, baseline) {
  const disposition = baseline[finding.fingerprint];
  const retired = disposition?.status === "retired";
  const fixture = disposition?.status === "false-positive-confirmed" && finding.type === "secret-assignment" &&
    finding.path === disposition.path && object === disposition.object;
  return { disposition: disposition?.status || "unreviewed", retired, resolved: retired || fixture };
}

function historySource(root, baseline) {
  const paths = new Map(git(["rev-list", "--objects", "--all"], { cwd: root }).toString("utf8").trim().split("\n").map((line) => {
    const separator = line.indexOf(" ");
    return separator < 0 ? [line, "git-metadata"] : [line.slice(0, separator), line.slice(separator + 1)];
  }));
  const checked = git(["cat-file", "--batch-check=%(objectname) %(objecttype) %(objectsize)"], {
    cwd: root, input: Buffer.from([...paths.keys()].join("\n") + "\n"),
  }).toString("utf8").trim().split("\n").map((line) => line.split(" "));
  const objects = checked.filter(([, type, size]) => ["blob", "commit", "tag"].includes(type) && Number(size) <= MAX_FILE_BYTES);
  const findings = [];
  let scanned = 0;
  let skipped = checked.filter(([, , size]) => Number(size) > MAX_FILE_BYTES).length;
  for (let offset = 0; offset < objects.length; offset += 8) {
    const group = objects.slice(offset, offset + 8);
    const output = git(["cat-file", "--batch"], { cwd: root, input: Buffer.from(group.map(([oid]) => oid).join("\n") + "\n") });
    let position = 0;
    for (const [oid, type] of group) {
      const end = output.indexOf(10, position);
      const size = Number(output.subarray(position, end).toString("ascii").split(" ")[2]);
      const content = textContent(output.subarray(end + 1, end + 1 + size));
      position = end + 2 + size;
      if (content === undefined) { skipped += 1; continue; }
      scanned += 1;
      for (const match of scanText(content, type === "blob" ? paths.get(oid) : `${type}:${oid}`, "history")) {
        findings.push({ ...match, object: oid, ...historyDisposition(match, oid, baseline) });
      }
    }
  }
  return { scanned, skipped, findings };
}

export function runGuard(args = process.argv.slice(2), root = process.cwd()) {
  const source = currentSource(path.resolve(root));
  const baselineFile = path.join(root, ".github", "security-history-baseline.json");
  const baseline = fs.existsSync(baselineFile) ? JSON.parse(fs.readFileSync(baselineFile, "utf8")).capabilities : {};
  const history = args.includes("--history") ? historySource(root, baseline) : undefined;
  const blocking = source.findings.length + (history?.findings.filter((finding) => !finding.resolved).length || 0);
  const sourceSummary = { scanned: source.scanned, skippedCount: source.skipped.length,
    skippedByReason: Object.fromEntries(["size", "binary-or-non-utf8"].map((reason) => [reason, source.skipped.filter((entry) => entry.reason === reason).length])),
    findings: source.findings, ...(args.includes("--verbose") ? { skipped: source.skipped } : {}) };
  // Never print a source excerpt, credential value, Git object content, or command stderr.
  console.log(JSON.stringify({ event: "source_security_guard", source: sourceSummary, ...(history ? { history } : {}), blocking }, null, 2));
  return blocking === 0 ? 0 : 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { process.exitCode = runGuard(); }
  catch { console.error(JSON.stringify({ event: "source_security_guard_failed", reason: "Scan unavailable; review repository state and rerun." })); process.exitCode = 1; }
}
