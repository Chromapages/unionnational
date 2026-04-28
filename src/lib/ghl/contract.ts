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
    "NOT_YET_FORMED"
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
    "CONSTRUCTION_BLUEPRINT"
]);

export const LeadMagnetTypeEnum = z.enum([
    "SCORP_ESTIMATOR",
    "TAX_SAVINGS_ANALYSIS",
    "STRATEGY_INTAKE",
    "VSL_WATCHED",
    "RESOURCE_DOWNLOAD",
    "CONSTRUCTION_ASSESSMENT",
    "BLOG_NEWSLETTER"
]);

// ─── PAYLOAD SCHEMAS ─────────────────────────────────────────────────────────

export const ContactSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export const BusinessSchema = z.object({
    business_name: z.string().optional(),
    annual_revenue_band: RevenueBandEnum.optional(),
    entity_type: EntityTypeEnum.optional(),
    industry: IndustryEnum.optional(),
    current_software: z.string().optional(),
});

export const IntentSchema = z.object({
    primary_service_interest: PrimaryServiceEnum.optional(),
    lead_magnet_type: LeadMagnetTypeEnum,
    urgency: UrgencyEnum.optional(),
    pain_points: z.array(z.string()).optional(),
    services_of_interest: z.array(z.string()).optional(),
    high_intent: z.boolean().optional(),
});

export const TrackingSchema = z.object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
    ad_id: z.string().optional(),
    gclid: z.string().optional(),
});

export const MetaSchema = z.object({
    submitted_at: z.string().datetime(),
    version: z.string().default("1.0"),
    locale: z.string().default("en"),
    user_agent: z.string().optional(),
    ip_hash: z.string().optional(),
});

export const ResultsSchema = z.object({
    scorp_estimated_savings: z.number().optional(),
    scorp_reasonable_salary: z.number().optional(),
    fit_score: z.number().optional(),
    tax_analysis_segment: z.string().optional(),
    assessment_label: z.string().optional(),
});

/**
 * MASTER GHL PAYLOAD SCHEMA
 * Every request to /api/ghl/intake must validate against this.
 */
export const GhlPayloadSchema = z.object({
    event_type: z.string(),
    contact: ContactSchema,
    business: BusinessSchema.optional(),
    intent: IntentSchema,
    tracking: TrackingSchema.optional(),
    meta: MetaSchema,
    results: ResultsSchema.optional(),
});

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type GhlPayload = z.infer<typeof GhlPayloadSchema>;
export type RevenueBand = z.infer<typeof RevenueBandEnum>;
export type EntityType = z.infer<typeof EntityTypeEnum>;
export type Industry = z.infer<typeof IndustryEnum>;
export type Urgency = z.infer<typeof UrgencyEnum>;
export type PrimaryService = z.infer<typeof PrimaryServiceEnum>;
export type LeadMagnetType = z.infer<typeof LeadMagnetTypeEnum>;

// ─── NORMALIZERS & HELPERS ───────────────────────────────────────────────────

/**
 * Normalizes common frontend industry strings to canonical GHL Enums
 */
export const normalizeIndustry = (input: string): Industry => {
    const raw = input.toUpperCase().replace(/\s+/g, "_");
    const found = IndustryEnum.safeParse(raw);
    return found.success ? found.data : "OTHER";
};

/**
 * Normalizes revenue strings (e.g. "$1M-$3M") to canonical GHL Enums
 */
export const normalizeRevenue = (input: string): RevenueBand => {
    const raw = input.toUpperCase();
    if (raw.includes("5M")) return "5M_PLUS";
    if (raw.includes("3M")) return "3M_5M";
    if (raw.includes("1M")) return "1M_3M";
    if (raw.includes("500K")) return "500K_1M";
    if (raw.includes("250K")) return "100K_500K";
    if (raw.includes("100K")) return "100K_500K";
    return "UNDER_100K";
};
