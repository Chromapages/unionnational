import { ScorpEstimatorInput, ScorpFitLevel } from "./schema";

/**
 * Builds the final structured payload for the GHL Webhook exactly as per spec.
 */
export const mapToGhlPayload = (
    input: ScorpEstimatorInput,
    derived: {
        fit_score: number;
        scorp_fit_level: ScorpFitLevel;
        scorp_estimated_savings: string;
        high_intent_flag: boolean;
    }
) => {
    return {
        // Event Metadata
        event_type: "SCORP_ESTIMATOR_SUBMITTED",
        submitted_at: new Date().toISOString(),
        source_page: "/scorp-estimator", // Overridable if we ever move it
        lead_magnet_type: "SCORP_ESTIMATOR",
        primary_service_interest: "S_CORP_STRATEGY",
        consultation_type: "SCORP_REVIEW",
        
        // Contact Information
        first_name: input.full_name.split(" ")[0] || "",
        last_name: input.full_name.split(" ").slice(1).join(" ") || "",
        email: input.email,
        phone: input.phone,
        business_name: input.business_name,
        website_url: input.website_url || "",
        
        // Business Context
        niche_vertical: input.niche_vertical,
        annual_revenue_band: input.annual_revenue_band,
        entity_type: input.entity_type,
        state_location: input.state_location || "",
        
        // Financials
        estimated_net_profit_range: input.estimated_net_profit_range,
        current_payroll_status: input.current_payroll_status,
        tax_payroll_readiness: input.tax_payroll_readiness,
        income_subject_to_se_tax: input.income_subject_to_se_tax,
        primary_pain_point: input.primary_pain_point,
        
        // Derived Logic Results
        scorp_estimated_savings: derived.scorp_estimated_savings,
        fit_score: derived.fit_score,
        scorp_fit_level: derived.scorp_fit_level,
        high_intent_flag: derived.high_intent_flag,
        
        // CRM Internal Tracking
        qualification_status: "REVIEWING",
        urgency_level: derived.high_intent_flag ? "HIGH" : "MEDIUM",
        last_assessment_date: new Date().toISOString().split('T')[0],
        
        // Marketing Tracking
        utm_source: input.utm_source || "",
        utm_medium: input.utm_medium || "",
        utm_campaign: input.utm_campaign || "",
        utm_content: input.utm_content || "",
        utm_term: input.utm_term || "",
        referrer_url: input.referrer_url || ""
    };
};
