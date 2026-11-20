/** @param {Record<string, string | undefined>} env */
export function paymentsEnabled(env = process.env) {
    return env.SHOP_PAYMENTS_ENABLED === "true";
}
