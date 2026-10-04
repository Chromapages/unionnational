import nextEnv from "@next/env";
import { createClient } from "@sanity/client";
import fs from "node:fs/promises";
nextEnv.loadEnvConfig(process.cwd());
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2026-01-09", useCdn: false });
const data = await client.fetch('{"pages": *[_type == "servicePage" && !(_id in path("drafts.**"))]{_id, "slug":slug.current, canonicalPath}, "catalog": *[_type == "service" && !(_id in path("drafts.**"))]{"slug":slug.current, "title":coalesce(title.en,title)}}');
await fs.writeFile(".omx/state/service-detail-shared-cta/routes.json", JSON.stringify(data, null, 2));
console.log(JSON.stringify(data));
