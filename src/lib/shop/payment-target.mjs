/** @param {Record<string, string | undefined>} env */
export function paymentTargetGaps(env) {
    const gaps = [];
    const project = env.SANITY_PAYMENT_PROJECT_ID;
    const dataset = env.SANITY_PAYMENT_DATASET;
    if (!project || !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(project)) gaps.push("SANITY_PAYMENT_PROJECT_ID");
    // Preserve the existing public-dataset prohibition even across separate projects.
    if (!dataset || !/^[a-z0-9_-]{1,64}$/.test(dataset) || dataset === (env.NEXT_PUBLIC_SANITY_DATASET || "production")) gaps.push("SANITY_PAYMENT_DATASET");
    return gaps;
}
