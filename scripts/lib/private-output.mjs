import fs from "node:fs";
import path from "node:path";

/** Reject output redirection through a symlink or a public/source directory. */
export function privateOutputDirectory(root, relative) {
  const parts = relative.split(/[\\/]/).filter(Boolean);
  if (![".local-backups", ".release-evidence"].includes(parts[0]) || parts.some((part) => ["..", ".", "public", ".git"].includes(part))) {
    throw new Error("Output must use the private backup or release-evidence directory.");
  }
  const resolvedRoot = fs.realpathSync(root);
  let current = resolvedRoot;
  for (const part of parts) {
    current = path.join(current, part);
    if (fs.existsSync(current)) {
      const info = fs.lstatSync(current);
      if (info.isSymbolicLink() || !info.isDirectory()) throw new Error("Private output cannot follow a symlink or regular file.");
    } else fs.mkdirSync(current, { mode: 0o700 });
    fs.chmodSync(current, 0o700);
  }
  if (fs.realpathSync(current) !== current) throw new Error("Private output was redirected.");
  return current;
}
