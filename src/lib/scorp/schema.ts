import { z } from "zod";

// --- Enums from Spec ---

export const EntityTypeEnum = z.enum([
    "SOLE_PROP",
    "LLC",
    "S_CORP",
    "C_CORP",
    "PARTNERSHIP",
    "NOT_SURE"
]);

export const NicheVerticalEnum = z.enum([
    "CONSTRUCTION",
    "RESTAURANT",
    "REAL_ESTATE",
    "ECOMMERCE",
    "INSURANCE",
    "AGENCY",
    "PROFESSIONAL_SERVICES",
    "OTHER"
]);

export const SeTaxSubjectivityEnum = z.enum([
    "YES",
    "NO",
    "NOT_SURE"
]);

export const AnnualRevenueBandEnum = z.enum([
    "UNDER_100K",
    "100K_250K",
    "250K_500K",
    "500K_1M",
    "1M_5M",
    "5M_PLUS"
]);

export const NetProfitRangeEnum = z.enum([
    "UNDER_50K",
    "50K_100K",
    "100K_150K",
    "150K_250K",
    "250K_PLUS"
]);

export const PayrollStatusEnum = z.enum([
    "RUNNING_PAYROLL",
    "NOT_RUNNING_PAYROLL",
    "NOT_SURE"
]);

export const ReadinessLevelEnum = z.enum([
    "LOW",
    "MEDIUM",
    "HIGH"
]);

export const ScorpPainPointEnum = z.enum([
    "OVERPAYING_TAXES",
    "ENTITY_STRUCTURE_CONFUSION",
    "BOOKKEEPING_CHAOS",
    "UNCLEAR_NUMBERS",
    "CASH_FLOW_ISSUES",
    "WANT_SCALABLE_GROWTH"
]);

export const ScorpFitLevelEnum = z.enum([
    "LOW_FIT",
    "POSSIBLE_FIT",
    "STRONG_CANDIDATE",
    "HIGH_INTENT_SCORP"
]);

// --- Master Schema ---

export const ScorpEstimatorInputSchema = z.object({
    // Step 1
    full_name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number required"),
    business_name: z.string().min(1, "Business name is required"),
    website_url: z.string().optional(),
    
    // Step 2
    entity_type: EntityTypeEnum,
    niche_vertical: NicheVerticalEnum,
    state_location: z.string().optional(),
    income_subject_to_se_tax: SeTaxSubjectivityEnum,
    
    // Step 3
    annual_revenue_band: AnnualRevenueBandEnum,
    estimated_net_profit_range: NetProfitRangeEnum,
    current_payroll_status: PayrollStatusEnum,
    tax_payroll_readiness: ReadinessLevelEnum,
    primary_pain_point: ScorpPainPointEnum,

    // Meta (Tracking)
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
    referrer_url: z.string().optional(),
});

export type ScorpEstimatorInput = z.infer<typeof ScorpEstimatorInputSchema>;
export type EntityType = z.infer<typeof EntityTypeEnum>;
export type NicheVertical = z.infer<typeof NicheVerticalEnum>;
export type SeTaxSubjectivity = z.infer<typeof SeTaxSubjectivityEnum>;
export type AnnualRevenueBand = z.infer<typeof AnnualRevenueBandEnum>;
export type NetProfitRange = z.infer<typeof NetProfitRangeEnum>;
export type PayrollStatus = z.infer<typeof PayrollStatusEnum>;
export type ReadinessLevel = z.infer<typeof ReadinessLevelEnum>;
export type ScorpPainPoint = z.infer<typeof ScorpPainPointEnum>;
export type ScorpFitLevel = z.infer<typeof ScorpFitLevelEnum>;
