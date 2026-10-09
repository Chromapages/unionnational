import { z } from "zod";

// Neutral campaign codes are reviewed configuration, never visitor-supplied labels.
const campaignCode = z.string().max(40).regex(/^[a-z][a-z0-9_-]*$/)
    .refine(value => !/(?:^|[_-])(?:tax|irs|debt|ssn|ein|token|session|receipt)(?:$|[_-])|[0-9]{7}/.test(value));
export const ga4CampaignRegistrySchema = z.object({
    sources: z.array(campaignCode).max(100),
    mediums: z.array(campaignCode).max(100),
    campaigns: z.array(campaignCode).max(100),
}).strict();
export type Ga4CampaignRegistry = z.infer<typeof ga4CampaignRegistrySchema>;
export type Ga4Attribution = { campaign_source?: string; campaign_medium?: string; campaign_name?: string };

export function resolveGa4Attribution(search: URLSearchParams, registry: Ga4CampaignRegistry): Ga4Attribution | null {
    const parsed = ga4CampaignRegistrySchema.safeParse(registry);
    if (!parsed.success) return null;
    const fields = {
        utm_source: { registry: parsed.data.sources, output: "campaign_source" },
        utm_medium: { registry: parsed.data.mediums, output: "campaign_medium" },
        utm_campaign: { registry: parsed.data.campaigns, output: "campaign_name" },
    } as const;
    const result: Ga4Attribution = {};
    for (const [key, value] of search) {
        if (!Object.hasOwn(fields, key) || search.getAll(key).length !== 1) return null;
        const field = fields[key as keyof typeof fields];
        if (!field.registry.includes(value)) return null;
        result[field.output] = value;
    }
    return result;
}
