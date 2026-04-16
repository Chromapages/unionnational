import { TaxAnalysisForm } from "@/components/tax-analysis/TaxAnalysisForm";
import { LandingHero } from "@/components/tax-analysis/LandingHero";
import { LandingBentoGrid } from "@/components/tax-analysis/LandingBentoGrid";
import { RevenueTierGrid } from "@/components/tax-analysis/RevenueTierGrid";
import { LandingTrustSignals } from "@/components/tax-analysis/LandingTrustSignals";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Tax Savings Analysis for Utah Restaurant & Hospitality Owners | Union National Tax",
    description: "Most Utah restaurant and hospitality owners leave $15,000–$60,000 in tax savings unclaimed every year. Get your free segmented Tax Savings Analysis — built for hospitality.",
};

export default async function HospitalityTaxAnalysisPage() {
    return (
        <div className="min-h-screen bg-brand-950 font-sans flex flex-col antialiased selection:bg-gold-500 selection:text-white">
            <HeaderWrapper />

            <main id="main-content" className="flex-grow">
                {/* Hero Section */}
                <LandingHero
                    badge="Free Analysis — Utah Hospitality"
                    title="Most Utah Hospitality Owners Are Overpaying"
                    titleHighlight="$15,000–$60,000"
                    subtitle="Get a free, segmented Tax Savings Analysis — built for restaurants, hotels, and service-based businesses. Delivered by email. No consultation required."
                    ctaPrimary="Get My Free Analysis"
                    trustSignals={["CPA + Enrolled Agents", "Utah-Based", "Hospitality Specialists"]}
                    industry="hospitality"
                />

                {/* Problem Section - Dark Bento */}
                <div className="relative border-t border-white/5">
                    <LandingBentoGrid
                        variant="dark"
                        eyebrow="The Hospitality Margin Gap"
                        title="Stop Overpaying the IRS from Your Hard-Earned Margins"
                        subtitle="Hospitality businesses operate on thin margins where every tax dollar saved is a pure profit dollar added to the bottom line."
                        items={[
                          {
                            title: "FICA Tip Credit",
                            description: "The Section 45B credit allows you to claim a dollar-for-dollar credit for social security taxes paid on employee tips.",
                            icon: "ReceiptText",
                            className: "md:col-span-3",
                          },
                          {
                            title: "Cost Segregation",
                            description: "Accelerate depreciation on kitchen builds, interior improvements, and restaurant build-outs to massive year-one deductions.",
                            icon: "Building2",
                            className: "md:col-span-3",
                          },
                          {
                            title: "High Turnover Strategy",
                            description: "Optimization of payroll structures and Work Opportunity Tax Credits (WOTC) for consistent hiring cycles.",
                            icon: "Users",
                            className: "md:col-span-2",
                          },
                          {
                            title: "Inventory Efficiency",
                            description: "Strategic tax treatment of spoilage, shrinkage, and high-volume food and beverage inventory flows.",
                            icon: "Utensils",
                            className: "md:col-span-2",
                          },
                          {
                            title: "Multi-Location Scaling",
                            description: "Structural guidance for owners scaling from a single location to a regional hospitality group.",
                            icon: "Coffee",
                            className: "md:col-span-2",
                          }
                        ]}
                    />
                </div>

                {/* Process Section - Dark Variant for Consistency */}
                <div className="border-t border-white/5 bg-brand-950/50">
                    <LandingBentoGrid
                        variant="dark"
                        eyebrow="Operational Workflow"
                        title="How It Works"
                        subtitle="We analyze your operational data to identify industry-specific credits that generalist accountants often overlook."
                        items={[
                          {
                            title: "Enter Your Details",
                            description: "Takes about 90 seconds. We ask for your location count, revenue range, and tip-volume to estimate credits.",
                            icon: "FileText",
                          },
                          {
                            title: "Get Your PDF Analysis",
                            description: "Within one business day, receive a high-level overview of the exact credits and deductions available to your specific concept.",
                            icon: "Clock",
                          },
                          {
                            title: "Maximize Your Margins",
                            description: "The analysis provides 3–5 specific action items to reclaim capital that is currently being lost to over-taxation.",
                            icon: "TrendingUp",
                          }
                        ]}
                    />
                </div>

                {/* Revenue Tier Breakdown */}
                <RevenueTierGrid
                    title="Sample Savings by Revenue Tier"
                    subtitle="Hospitality businesses often qualify for massive credits that differ significantly from other sectors."
                    className="border-t border-white/5"
                    tiers={[
                      {
                          range: "$500K – $1.5M Revenue",
                          savings: "$10,000–$25,000",
                          deductions: "Tip credits + QBI + Local credits",
                      },
                      {
                          range: "$1.5M – $5M Revenue",
                          savings: "$25,000–$65,000",
                          deductions: "Cost seg + 45B credits + Structuring",
                      },
                      {
                          range: "$5M+ Revenue",
                          savings: "$75,000–$150,000+",
                          deductions: "Full group optimization + R&D review",
                      },
                    ]}
                />

                {/* Trust Signals */}
                <LandingTrustSignals
                    variant="dark"
                    title="Built for Utah Hospitality"
                    items={[
                      {
                          icon: "Building2",
                          title: "Union National Tax LLC",
                          subtitle: "Orem, Utah",
                          description: "Supporting local Utah restaurant groups and hotel operators statewide.",
                      },
                      {
                          icon: "Utensils",
                          title: "Industry Specialists",
                          subtitle: "Hospitality Focus",
                          description: "We understand the 'back of house' tax world better than anyone in the state.",
                      },
                      {
                          icon: "Star",
                          title: "CPA + Enrolled Agents",
                          subtitle: "Margin Focused",
                          description: "We focus on your net profit, not just your tax liability.",
                      },
                      {
                          icon: "Clock",
                          title: "Year-Round Strategy",
                          subtitle: "Continuous Support",
                          description: "Proactive planning to keep your cash flow healthy through every season.",
                      },
                    ]}
                />

                {/* Form Section */}
                <section id="get-started" className="py-32 px-6 bg-brand-950 relative border-t border-white/5">
                    {/* Cinematic Accents */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
                    <div className="max-w-xl mx-auto relative z-10">
                        <TaxAnalysisForm industry="hospitality" source="meta-hospitality-tax-analysis" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
