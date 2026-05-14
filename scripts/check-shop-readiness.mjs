import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const envPath = path.join(root, ".env.local");
const mapPath = path.join(root, "src", "lib", "shop", "stripe-price-map.ts");

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  return Object.fromEntries(
    fs.readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const [key, ...valueParts] = line.split("=");
        const value = valueParts.join("=").replace(/\s+#.*$/, "").replace(/^["']|["']$/g, "");
        return [key, value];
      })
  );
}

const localEnv = readEnvFile(envPath);
const env = { ...localEnv, ...process.env };
const failures = [];
const warnings = [];

function requireEnv(name, predicate = (value) => Boolean(value)) {
  if (!predicate(env[name])) {
    failures.push(`${name} is missing or invalid.`);
  }
}

requireEnv("STRIPE_SECRET_KEY", (value) => typeof value === "string" && /^sk_(test|live)_/.test(value));
requireEnv("STRIPE_WEBHOOK_SECRET", (value) => typeof value === "string" && value.startsWith("whsec_") && !value.includes("..."));
requireEnv("NEXT_PUBLIC_BASE_URL", (value) => typeof value === "string" && /^https?:\/\//.test(value));

if (!env.GHL_SHOP_PURCHASE_WEBHOOK_URL) {
  warnings.push("GHL_SHOP_PURCHASE_WEBHOOK_URL is not set; paid orders will be marked pending_manual.");
}

if (!fs.existsSync(mapPath)) {
  failures.push("Stripe price map file is missing.");
} else {
  const mapSource = fs.readFileSync(mapPath, "utf8");
  const genericKeys = ['"Hardcover"', '"Hardcover + Shipping & Handling"', '"Digital PDF"', '"Digital PDF Copy"'];
  const presentGenericKeys = genericKeys.filter((key) => mapSource.includes(`${key}:`));

  if (presentGenericKeys.length > 0) {
    warnings.push(`Generic Stripe fallback keys remain in stripe-price-map.ts: ${presentGenericKeys.join(", ")}.`);
  }

  const priceIds = [...mapSource.matchAll(/price_[A-Za-z0-9]+/g)].map((match) => match[0]);
  if (priceIds.length === 0) {
    failures.push("No Stripe price IDs were found in stripe-price-map.ts.");
  }
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`Failure: ${failure}`);
  }
  process.exit(1);
}

console.log("Shop readiness checks passed.");
