import { z } from "zod";

/**
 * GHL Payload Contract v1.0
 * Source of Truth for all lead capture data sent to CRM.
 */

// ─── CANONICAL ENUMS ─────────────────────────────────────────────────────────

export const RevenueBandEnum = z.enum([
    "UNDER_100K",
    "100K_500K",
    "500K_1M",
    "1M_3M",
    "3M_5M",
    "5M_PLUS",
    "PREFER_NOT_TO_SAY"
]);

export const EntityTypeEnum = z.enum([
    "SOLE_PROP",
    "LLC_SINGLE",
    "LLC_MULTI",
    "S_CORP",
    "C_CORP",
    "PARTNERSHIP",
    "NOT_YET_FORMED",
    "OTHER"
]);

export const IndustryEnum = z.enum([
    "CONSTRUCTION",
    "HOSPITALITY",
    "REAL_ESTATE",
    "PROFESSIONAL_SERVICES",
    "E_COMMERCE",
    "MANUFACTURING",
    "OTHER"
]);

export const UrgencyEnum = z.enum([
    "IMMEDIATE",
    "THIS_QUARTER",
    "PLANNING_ONLY",
    "JUST_CURIOUS"
]);

export const PrimaryServiceEnum = z.enum([
    "S_CORP_STRATEGY",
    "FRACTIONAL_CFO",
    "TAX_PLANNING",
    "TAX_PREPARATION",
    "NEW_BUSINESS_FORMATION",
    "BOOKKEEPING",
    "CONSTRUCTION_BLUEPRINT",
    "RESTAURANT_CFO_PARTNERSHIP",
    "CONSTRUCTION_CFO_PARTNERSHIP"
]);

export const PreferredNextStepEnum = z.enum([
    "BOOK_STRATEGY_CALL",
    "EMAIL_SUMMARY_REQUESTED",
    "CALLBACK_REQUESTED",
]);

export const LeadMagnetTypeEnum = z.enum([
    "SCORP_ESTIMATOR",
    "TAX_SAVINGS_ANALYSIS",
    "STRATEGY_INTAKE",
    "VSL_WATCHED",
    "RESOURCE_DOWNLOAD",
    "CONSTRUCTION_ASSESSMENT",
    "BOOK_DOWNLOAD",
    "RESTAURANT_PROFIT_LEAK_ASSESSMENT",
    "BOOK_CONSTRUCTION",
    "CONSTRUCTION_PROFIT_LEAK_CHECKLIST",
    "CONSTRUCTION_PROFITABILITY_ASSESSMENT",
    "BLUEPRINT_MORE_INFO",
]);

// ─── PAYLOAD SCHEMAS ─────────────────────────────────────────────────────────

export const ContactSchema = z.object({
    first_name: z.string().trim().min(1, "First name is required").max(100),
    last_name: z.string().trim().max(100).optional(),
    email: z.string().trim().email("Invalid email address").max(254),
    phone: z.string().max(30).optional(),
    tags: z.array(z.string().max(100)).max(20).optional(),
});

export const BusinessSchema = z.object({
    business_name: z.string().trim().max(200).optional(),
    annual_revenue_band: RevenueBandEnum.optional(),
    entity_type: EntityTypeEnum.optional(),
    industry: IndustryEnum.optional(),
    current_software: z.string().max(100).optional(),
    business_type: z.string().max(100).optional(),
    state_location: z.string().max(100).optional(),
    employee_count_band: z.string().max(50).optional(),
    revenue_range_label: z.string().max(50).optional(),
});

export const IntentSchema = z.object({
    primary_service_interest: PrimaryServiceEnum.optional(),
    lead_magnet_type: LeadMagnetTypeEnum,
    urgency: UrgencyEnum.optional(),
    pain_points: z.array(z.string().max(500)).max(10).optional(),
    services_of_interest: z.array(z.string().max(100)).max(10).optional(),
    preferred_next_step: PreferredNextStepEnum.optional(),
    high_intent: z.boolean().optional(),
});

export const TrackingSchema = z.object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    ad_id: z.string().max(200).optional(),
    gclid: z.string().max(200).optional(),
});

export const MetaSchema = z.object({
    submitted_at: z.string().datetime(),
    version: z.string().max(10).default("1.0"),
    locale: z.string().max(10).default("en"),
    user_agent: z.string().max(500).optional(),
    ip_hash: z.string().max(100).optional(),
    source_page: z.string().max(200).optional(),
    book_slug: z.string().max(100).optional(),
    submission_id: z.string().uuid().optional(),
});

export const ResultsSchema = z.object({
    scorp_estimated_savings: z.number().min(0).max(1_000_000).optional(),
    scorp_reasonable_salary: z.number().min(0).max(1_000_000).optional(),
    fit_score: z.number().min(0).max(100).optional(),
    tax_analysis_segment: z.string().max(100).optional(),
    assessment_label: z.string().max(100).optional(),
});

/**
 * MASTER GHL PAYLOAD SCHEMA
 * Every request to /api/ghl/intake must validate against this.
 */
export const GhlPayloadSchema = z.object({
    event_type: z.string().max(100),
    contact: ContactSchema,
    business: BusinessSchema.optional(),
    intent: IntentSchema,
    tracking: TrackingSchema.optional(),
    meta: MetaSchema,
    results: ResultsSchema.optional(),
    answers: z.record(z.string().max(100), z.union([z.string().max(500), z.number().min(-1_000_000).max(1_000_000), z.boolean()])).refine(value => Object.keys(value).length <= 30, "Too many answers").optional(),
});

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type GhlPayload = z.infer<typeof GhlPayloadSchema>;
export type RevenueBand = z.infer<typeof RevenueBandEnum>;
export type EntityType = z.infer<typeof EntityTypeEnum>;
export type Industry = z.infer<typeof IndustryEnum>;
export type Urgency = z.infer<typeof UrgencyEnum>;
export type PrimaryService = z.infer<typeof PrimaryServiceEnum>;
export type LeadMagnetType = z.infer<typeof LeadMagnetTypeEnum>;
export type PreferredNextStep = z.infer<typeof PreferredNextStepEnum>;

// ─── NORMALIZERS & HELPERS ───────────────────────────────────────────────────

/**
 * Normalizes common frontend industry strings to canonical GHL Enums
 */
export const normalizeIndustry = (input: string): Industry => {
    const aliases: Record<string, Industry> = {
        RESTAURANT: "HOSPITALITY",
        "REAL-ESTATE": "REAL_ESTATE",
        "E-COMMERCE": "E_COMMERCE",
    };
    const raw = input.trim().toUpperCase();
    if (aliases[raw]) return aliases[raw];
    const found = IndustryEnum.safeParse(raw.replace(/\s+/g, "_"));
    return found.success ? found.data : "OTHER";
};

/**
 * Normalizes revenue strings (e.g. "$1M-$3M") to canonical GHL Enums
 */
export const normalizeRevenue = (input: string): RevenueBand => {
    const raw = input.trim().toUpperCase();
    const exact: Record<string, RevenueBand> = {
        "UNDER $100K": "UNDER_100K",
        "$0-$100K": "UNDER_100K",
        "$100K-$500K": "100K_500K",
        "$100K–$250K": "100K_500K",
        "$250K–$500K": "100K_500K",
        "$500K-$1M": "500K_1M",
        "$500K–$1M": "500K_1M",
        "$1M-$3M": "1M_3M",
        "$1M–$3M": "1M_3M",
        "$3M-$5M": "3M_5M",
        "$3M–$5M": "3M_5M",
        "$5M+": "5M_PLUS",
        "500K_1M": "500K_1M",
        "1M_3M": "1M_3M",
        "3M_5M": "3M_5M",
        "5M_PLUS": "5M_PLUS",
        "UNDER_100K": "UNDER_100K",
        "100K_500K": "100K_500K",
    };
    if (exact[raw]) return exact[raw];
    throw new Error(`Unsupported revenue range: ${input}`);
};

export const normalizeEntityType = (input: string): EntityType => {
    const exact: Record<string, EntityType> = {
        "Sole Proprietorship": "SOLE_PROP",
        "LLC (Single)": "LLC_SINGLE",
        "LLC (Multi)": "LLC_MULTI",
        "S-Corp": "S_CORP",
        "C-Corp": "C_CORP",
        Other: "OTHER",
    };
    const result = exact[input];
    if (!result) throw new Error(`Unsupported entity type: ${input}`);
    return result;
};

export const normalizeUrgency = (input: string): Urgency => {
    const exact: Record<string, Urgency> = {
        "Immediate (This month)": "IMMEDIATE",
        "1-3 Months": "THIS_QUARTER",
        "Looking for next year": "PLANNING_ONLY",
        "Just researching": "JUST_CURIOUS",
    };
    const result = exact[input];
    if (!result) throw new Error(`Unsupported urgency: ${input}`);
    return result;
};

export const normalizePreferredNextStep = (input: string): PreferredNextStep => {
    const exact: Record<string, PreferredNextStep> = {
        "Book Strategy Call Now": "BOOK_STRATEGY_CALL",
        "Receive Email Summary": "EMAIL_SUMMARY_REQUESTED",
        "Wait for callback": "CALLBACK_REQUESTED",
    };
    const result = exact[input];
    if (!result) throw new Error(`Unsupported next step: ${input}`);
    return result;
};
