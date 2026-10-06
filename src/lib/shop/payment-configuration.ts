type Configuration = Record<string, string | undefined>;

export function paymentStorageGaps(env: Configuration = process.env) {
    const gaps: string[] = [];
    const dataset = env.SANITY_PAYMENT_DATASET;
    if (!dataset || !/^[a-z0-9_-]{1,64}$/.test(dataset) || dataset === (env.NEXT_PUBLIC_SANITY_DATASET || "production")) gaps.push("SANITY_PAYMENT_DATASET");
    if (!env.SANITY_PAYMENT_AUTH_TOKEN) gaps.push("SANITY_PAYMENT_AUTH_TOKEN");
    for (const flag of ["SANITY_PAYMENT_PRIVATE_CONFIRMED", "SANITY_PAYMENT_MIGRATION_CONFIRMED"]) if (env[flag] !== "true") gaps.push(flag);
    return gaps;
}

export function fulfillmentConfigurationGaps(url: string | undefined, env: Configuration = process.env) {
    const gaps: string[] = [];
    const allowed = env.GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS?.split(",").map(host => host.trim().toLowerCase()).filter(Boolean) ?? [];
    if (!allowed.length) gaps.push("GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS");
    if (!env.GHL_SHOP_FULFILLMENT_SECRET || env.GHL_SHOP_FULFILLMENT_SECRET.length < 32) gaps.push("GHL_SHOP_FULFILLMENT_SECRET");
    if (env.GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED !== "true") gaps.push("GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED");
    try {
        const parsed = new URL(url ?? "");
        if (parsed.protocol !== "https:" || parsed.username || parsed.password || (parsed.port && parsed.port !== "443") || !allowed.includes(parsed.hostname)) gaps.push("GHL_SHOP_PURCHASE_WEBHOOK_URL");
    } catch { gaps.push("GHL_SHOP_PURCHASE_WEBHOOK_URL"); }
    return gaps;
}

export function paymentConfigurationGaps(env: Configuration = process.env) {
    return [...paymentStorageGaps(env), ...fulfillmentConfigurationGaps(env.GHL_SHOP_PURCHASE_WEBHOOK_URL, env)];
}
