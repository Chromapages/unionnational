import { writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { privateOutputDirectory } from "./private-output.mjs";

function optionValue(args, flag) {
  if (args.filter((arg) => arg === flag || arg.startsWith(`${flag}=`)).length > 1) throw new Error("Target flags must be supplied once.");
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 && !args[index + 1]?.startsWith("--") ? args[index + 1] : undefined;
}

/** Preview is the default. Application must explicitly acknowledge both targets. */
export function mutationOptions(args, config) {
  const apply = args.includes("--apply");
  if (apply && args.includes("--dry-run")) throw new Error("Choose either --apply or --dry-run.");
  const target = optionValue(args, "--target");
  const project = optionValue(args, "--project");
  if (apply && (!target || !project || target !== config.dataset || project !== config.projectId)) {
    throw new Error("Application requires --apply --target=<configured-dataset> --project=<configured-project>.");
  }
  if ((target && target !== config.dataset) || (project && project !== config.projectId)) {
    throw new Error("The acknowledged target must match the configured Sanity project and dataset.");
  }
  return { apply, projectId: config.projectId, dataset: config.dataset };
}

/** Persist full originals locally before any write; reject stale or incomplete plans. */
export async function backupForMutation(client, options, plannedDocuments, root = process.cwd()) {
  if (!options.apply) throw new Error("Backups are created only for an explicit application.");
  const config = client.config();
  if (config.projectId !== options.projectId || config.dataset !== options.dataset || !config.token) {
    throw new Error("Application target or authentication changed after planning.");
  }
  if (!Array.isArray(plannedDocuments) || plannedDocuments.length === 0 || plannedDocuments.length > 1000) {
    throw new Error("A bounded document plan is required before writing.");
  }
  const ids = plannedDocuments.map((document) => document._id);
  if (ids.some((id) => typeof id !== "string" || !/^[\w.-]{1,160}$/.test(id)) || new Set(ids).size !== ids.length) {
    throw new Error("The mutation plan has invalid or duplicate document IDs.");
  }
  const originals = await client.fetch("*[_id in $ids]", { ids });
  const byId = new Map(originals.map((document) => [document._id, document]));
  for (const planned of plannedDocuments) {
    const current = byId.get(planned._id);
    if (current ? !planned._rev || current._rev !== planned._rev : Boolean(planned._rev)) {
      throw new Error("Content changed since preview. Regenerate the mutation plan before applying.");
    }
  }
  const directory = privateOutputDirectory(root, ".local-backups/sanity");
  const filename = path.join(directory, `${Date.now()}-${randomUUID()}.json`);
  await writeFile(filename, JSON.stringify({
    createdAt: new Date().toISOString(), projectId: options.projectId, dataset: options.dataset,
    documents: originals, missingDocumentIds: ids.filter((id) => !byId.has(id)),
  }, null, 2), { mode: 0o600, flag: "wx" });
  console.log(JSON.stringify({ event: "sanity_mutation_backup", documents: ids.length, directory: ".local-backups/sanity" }));
}

export function reportMutationFailure(error) {
  console.error(JSON.stringify({ event: "sanity_mutation_failed", errorType: error instanceof Error ? error.name : "UnknownError" }));
  process.exitCode = 1;
}
