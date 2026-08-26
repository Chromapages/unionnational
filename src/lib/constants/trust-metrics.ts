/**
 * @file trust-metrics.ts
 * @description Centralized Single Source of Truth for Union National Tax trust signals,
 * firm credentials, client metrics, and experience statistics.
 *
 * GOVERNANCE & UPDATE OWNERSHIP:
 * - Ownership: Marketing Operations & Principal Enrolled Agent
 * - Audit Cadence: Quarterly Review
 * - Rule: All user-facing components, copy keys, and landing pages must derive their claims
 *   from these standardized metric tokens to prevent conflicting cross-page figures.
 */

export const TRUST_METRICS = {
  /** Credentials & Accreditations */
  credentials: {
    ea: {
      short: "IRS Enrolled Agent",
      full: "IRS Enrolled Agent (Highest Credential)",
      qualifier: "Highest IRS Credential",
      description: "Federally authorized tax practitioner with unlimited rights to represent taxpayers before the IRS.",
    },
    mba: {
      short: "MBA",
      full: "Master of Business Administration",
    },
    fscp: {
      short: "FSCP®",
      full: "Financial Services Certified Professional",
    },
    lutcf: {
      short: "LUTCF®",
      full: "Life Underwriter Training Council Fellow",
    },
    taxCourt: {
      short: "Tax Court",
      full: "Authorized Tax Court Practitioner",
    },
  },

  /** Experience & Track Record */
  experience: {
    years: 15,
    yearsFormatted: "15+",
    label: "15+ Years Experience",
  },

  /** Client Volume & Outcomes */
  volume: {
    /** Broad multi-industry client base */
    cumulativeClients: "1,000+",
    /** Core niche vertical (Contractors & Trades) */
    contractorsServed: "200+",
    /** Tax resolution and advisory outcomes */
    debtResolved: "$10M+",
    avgSavings: "$2.4M+",
  },

  /** Service Commitments */
  commitments: {
    auditProtection: "3-Year Audit Shield",
    responseStandard: "2hr Avg. Response",
    encryption: "256-bit Bank-Level Encryption",
    representation: "Full IRS Representation",
  },
} as const;

export type TrustMetrics = typeof TRUST_METRICS;
