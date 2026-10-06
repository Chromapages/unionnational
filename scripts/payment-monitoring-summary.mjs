import { createClient } from "@sanity/client";

const statuses = ["pending", "processing", "processed", "failed", "pending_manual", "pending_review"];
const query = `{
  ${statuses.map((status) => `"${status}": count(*[_type == "stripeWebhookIdempotency" && status == "${status}"])`).join(",\n  ")},
  "oldestOpenUpdatedAt": *[_type == "stripeWebhookIdempotency" && status in ["pending", "processing", "failed", "pending_manual", "pending_review"] && defined(updatedAt)] | order(updatedAt asc)[0].updatedAt
}`;

function option(args, flag) {
  const inline = args.find((value) => value.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.includes("--read-private-state")) {
    console.log(JSON.stringify({ event: "payment_monitoring_preview", mode: "local-query-preview", query,
      requiredEnvironment: ["NEXT_PUBLIC_SANITY_PROJECT_ID", "SANITY_PAYMENT_DATASET", "SANITY_PAYMENT_AUTH_TOKEN", "SANITY_PAYMENT_PRIVATE_CONFIRMED"],
      requiredFlags: ["--read-private-state", "--project=<configured-project>", "--target=<private-dataset>"] }));
    return;
  }
  const project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_PAYMENT_DATASET;
  const token = process.env.SANITY_PAYMENT_AUTH_TOKEN;
  if (!project || !dataset || !/^[a-z0-9_-]{1,64}$/.test(dataset) || dataset === (process.env.NEXT_PUBLIC_SANITY_DATASET || "production") || !token ||
      process.env.SANITY_PAYMENT_PRIVATE_CONFIRMED !== "true" || option(args, "--project") !== project || option(args, "--target") !== dataset) {
    throw new Error("An acknowledged private target and read-scoped credentials are required.");
  }
  const client = createClient({ projectId: project, dataset, token, useCdn: false, apiVersion: "2026-01-09" });
  const result = await client.fetch(query);
  const counts = Object.fromEntries(statuses.map((status) => [status, Number.isSafeInteger(result[status]) && result[status] >= 0 ? result[status] : null]));
  const oldest = typeof result.oldestOpenUpdatedAt === "string" && result.oldestOpenUpdatedAt.length <= 40 &&
    Number.isFinite(Date.parse(result.oldestOpenUpdatedAt)) && /^\d{4}-\d{2}-\d{2}T[\d:.+-]+Z?$/.test(result.oldestOpenUpdatedAt)
    ? result.oldestOpenUpdatedAt : null;
  console.log(JSON.stringify({ event: "payment_monitoring_summary", counts, oldestOpenUpdatedAt: oldest }));
}

main().catch(() => { console.error(JSON.stringify({ event: "payment_monitoring_failed", reason: "Review private target, read access, and provider availability." })); process.exitCode = 1; });
