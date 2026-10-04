import fs from "node:fs/promises";
import path from "node:path";
import nextEnv from "@next/env";
import { createClient } from "@sanity/client";

nextEnv.loadEnvConfig(process.cwd());
const rows = [];
const figures = /\$\s*\d|\d[\d,.]*\s*%/;
const topic = /s.?corp|self.employment|savings|tax saved|ahorr|net profit|netting|reasonable salary/i;
async function scan(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) await scan(file);
        else if (/\.(tsx?|json|mjs)$/.test(file) && !/\.(test|spec)\./.test(file)) {
            const lines = (await fs.readFile(file, "utf8")).split(/\r?\n/);
            const scorpFile = /scorp|s-corp/i.test(file);
            lines.forEach((line, index) => {
                if (figures.test(line) && (scorpFile || topic.test(lines.slice(Math.max(0, index - 2), index + 3).join(" ")))) {
                    rows.push({ source: `${file.replaceAll('\\', '/')}:${index + 1}`, text: line.trim() });
                }
            });
        }
    }
}
await scan("src");
await scan("scripts");
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2026-01-09", useCdn: false });
const documents = await client.fetch('*[!(_id in path("drafts.**")) && _type in ["service", "servicePage", "homePage", "siteSettings", "caseStudy", "testimonial", "faq", "resource", "post", "blogPost"]]');
function walk(value, field, doc, relevant) {
    if (typeof value === "string" && figures.test(value) && (relevant || topic.test(value))) rows.push({ source: `CMS ${doc._id}.${field}`, text: value });
    else if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${field}[${index}]`, doc, relevant));
    else if (value && typeof value === "object") {
        const related = relevant || topic.test(JSON.stringify(value));
        for (const [key, item] of Object.entries(value)) if (!key.startsWith("_")) walk(item, field ? `${field}.${key}` : key, doc, related);
    }
}
documents.forEach(doc => walk(doc, "", doc, false));
const esc = value => value.replaceAll("|", "\\|").replaceAll("\n", " ");
const preface = `# S-Corp claims and thresholds inventory\n\nCaptured 2026-10-03 from source and published CMS documents. This is an audit, not approval of any figure. Source rows include legacy/inactive components, input bands, fees and calculation outputs where adjacent S-Corp context warrants review. CMS rows include article examples and other strategies; a different input or strategy is not automatically a contradiction. Each needs classification before client approval.\n\n## Confirmed conflicts\n\n- Active S-Corp hero: $80,000+ profit threshold; FAQ: $100,000 profit and $7,000-$9,000 annual savings; closing: $15k+. No state, salary or implementation-cost assumptions beside the claims.\n- Older text audit reported $20k+ page title and $23k+ homepage. Current rendered service title has no number; homepage is separately checked. Do not repeat the older figures as current evidence.\n- Legacy /scorp-advantage: $10,000-$30,000 annual claim, $80,000+ threshold, $17,595 annual / $87,975 five-year example ($200,000 profit, $85,000 wages), missing state/tax-year/cost assumptions.\n- Resource guide: $8,000-$20,000+ and 50% promises. Blog sidebar: $20K average. ES legacy hero: $20k+.\n- Estimator profit buckets return differing $1k-$30k+ ranges; these are fixed outputs, not substantiated estimates with salary/state/cost assumptions. Input bands are not eligibility promises.\n\n## Client/compliance publication gates\n\n1. Savings range and threshold, supported net profit/state/salary/tax-year/cost assumptions. Until supplied, no universal range is selected.\n2. Compliance review of replacement for bypass: Evaluate potential savings on distributions while wages remain subject to employment taxes. Interim hero uses evaluation-only language.\n3. Price placeholder (handoff only): Typical engagement: from $X. Supply amount, scope and billing basis; never publish $X.\n4. Approve Torres wording for this surface or leave proof removed. No quantified client savings are established.\n5. Supply/approve savings, timing, cost and risk FAQ answers. No invented answers or empty questions will ship.\n\n## Occurrences\n\n| Location | Figure / context |\n| --- | --- |\n`;
await fs.writeFile("docs/s-corp-claims-inventory.md", preface + rows.map(row => `| ${esc(row.source)} | ${esc(row.text)} |`).join("\n") + "\n");
await fs.writeFile(".omx/state/s-corp-copy-and-claims/claims.json", JSON.stringify(rows, null, 2));
console.log(JSON.stringify({ occurrences: rows.length, publishedCmsDocuments: documents.length, artifact: "docs/s-corp-claims-inventory.md" }));
