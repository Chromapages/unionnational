type EnvName =
  | "GHL_CLIENT_ID"
  | "GHL_CLIENT_SECRET"
  | "GHL_LOCATION_ID"
  | "GHL_REFRESH_TOKEN"
  | "GHL_SHOP_PURCHASE_WEBHOOK_URL"
  | "GHL_WEBHOOK_URL"
  | "GHL_SURVEY_WEBHOOK_URL"
  | "GHL_TAX_ANALYSIS_WEBHOOK_URL"
  | "GHL_APPLICATION_WEBHOOK_URL"
  | "GHL_RESTAURANT_APPLICATION_WEBHOOK_URL"
  | "GHL_SCORP_ESTIMATOR_WEBHOOK_URL"
  | "NEXT_PUBLIC_BASE_URL"
  | "NEXT_PUBLIC_SANITY_API_VERSION"
  | "NEXT_PUBLIC_SANITY_DATASET"
  | "NEXT_PUBLIC_SANITY_PROJECT_ID"
  | "SANITY_AUTH_TOKEN"
  | "SANITY_REVALIDATE_SECRET"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET"
  | "UPSTASH_REDIS_REST_URL"
  | "UPSTASH_REDIS_REST_TOKEN"
  | "RL_WINDOW"
  | "RL_MAX"
  | "ENABLE_UPSTASH";

export function getEnv(name: EnvName): string | undefined {
  if (name === "NEXT_PUBLIC_BASE_URL") {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  if (name === "NEXT_PUBLIC_SANITY_API_VERSION") {
    return process.env.NEXT_PUBLIC_SANITY_API_VERSION;
  }

  if (name === "NEXT_PUBLIC_SANITY_DATASET") {
    return process.env.NEXT_PUBLIC_SANITY_DATASET;
  }

  if (name === "NEXT_PUBLIC_SANITY_PROJECT_ID") {
    return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  }

  return process.env[name];
}

export function requireEnv(name: EnvName): string {
  const value = getEnv(name);

  if (!value) {
    throw new Error(`${name} is missing from environment variables`);
  }

  return value;
}

export const publicEnv = {
  get baseUrl() {
    return getEnv("NEXT_PUBLIC_BASE_URL") || "https://unionnationaltax.com";
  },
  get sanityApiVersion() {
    return getEnv("NEXT_PUBLIC_SANITY_API_VERSION") || "2026-01-09";
  },
  get sanityDataset() {
    return getEnv("NEXT_PUBLIC_SANITY_DATASET") || "production";
  },
  get sanityProjectId() {
    return getEnv("NEXT_PUBLIC_SANITY_PROJECT_ID") || "p1x9y3wz";
  },
};

export const readinessChecks = [
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "STRIPE_SECRET_KEY",
] as const satisfies readonly EnvName[];

export function getMissingReadinessEnv(): string[] {
  return readinessChecks.filter((name) => !getEnv(name));
}
