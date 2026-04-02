import { TaxAnalysisForm } from "@/components/tax-analysis/TaxAnalysisForm";
import { LandingHero } from "@/components/tax-analysis/LandingHero";
import { LandingBentoGrid } from "@/components/tax-analysis/LandingBentoGrid";
import { RevenueTierGrid } from "@/components/tax-analysis/RevenueTierGrid";
import { LandingTrustSignals } from "@/components/tax-analysis/LandingTrustSignals";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Tax Savings Analysis for Utah Contractors | Union National Tax",
    description: "Most Utah contractors leave $20,000–$80,000 in tax savings unclaimed every year. Get your free segmented Tax Savings Analysis — built for construction businesses.",
};

export default async function ContractorsTaxAnalysisPage() {
    return (
        <div className="min-h-screen bg-brand-950 font-sans flex flex-col antialiased selection:bg-gold-500 selection:text-white">
            <HeaderWrapper />

            <main className="flex-grow">
                {/* Hero Section */}
                <LandingHero
                    badge="Free Analysis — Utah Contractors"
                    title="Most Utah Contractors Are Leaving"
                    titleHighlight="$20,000–$80,000"
                    subtitle="Get a free, segmented Tax Savings Analysis — built specifically for the construction industry and your revenue range. Delivered by email. No consultation required."
                    ctaPrimary="Get My Free Analysis"
                    trustSignals={["CPA + Enrolled Agents", "Utah-Based", "Construction Specialists"]}
                    industry="construction"
                />

                {/* Problem Section - Dark Bento with Blueprint Accents */}
                <div className="relative border-t border-white/5">
                    <LandingBentoGrid
                        variant="dark"
                        eyebrow="The Construction Tax Gap"
                        title="The Gap Between What You're Paying and What You Should Be Paying"
                        subtitle="Construction businesses have more moving tax parts than almost any other industry. Most generalist preparers miss the structured optimization required for high-revenue contractors."
                        items={[
                          {
                            title: "1099 Subcontractors",
                            description: "Structuring independent contractor payments to maximize QBI deductions and minimize audit risk.",
                            icon: "Users",
                            className: "md:col-span-3",
                          },
                          {
                            title: "Equipment Strategy",
                            description: "Section 179 and cost segregation for heavy machinery and shop investments.",
                            icon: "Gauge",
                            className: "md:col-span-3",
                          },
                          {
                            title: "199A QBI Optimization",
                            description: "The 199A deduction can be worth $20,000–$45,000 annually if structured right.",
                            icon: "ShieldCheck",
                            className: "md:col-span-2",
                          },
                          {
                            title: "Revenue Streams",
                            description: "Optimizing mixed residential and commercial revenue flows for tax efficiency.",
                            icon: "TrendingUp",
                            className: "md:col-span-2",
                          },
                          {
                            title: "Asset Planning",
                            description: "Strategic planning for year-end surprises and tax liability management.",
                            icon: "Landmark",
                            className: "md:col-span-2",
                          }
                        ]}
                    />
                </div>

                {/* Process Section - Dark Variant for Consistency */}
                <div className="border-t border-white/5 bg-brand-950/50">
                    <LandingBentoGrid
                        variant="dark"
                        eyebrow="Process Workflow"
                        title="How It Works"
                        subtitle="Designed for busy owners. No sales calls, just a precise analysis in your inbox."
                        items={[
                          {
                            title: "Fill Out the Form",
                            description: "Takes about 90 seconds. We ask for your name, email, phone, business type, and revenue range. That's it.",
                            icon: "FileText",
                          },
                          {
                            title: "Get Your Segmented Analysis",
                            description: "Within one business day, you receive a PDF Tax Savings Analysis specific to construction — not a generic checklist.",
                            icon: "Clock",
                          },
                          {
                            title: "See Your Real Numbers",
                            description: "The analysis identifies 3–5 specific deductions your business type qualifies for, with approximate value ranges based on your revenue tier.",
                            icon: "TrendingUp",
                          }
                        ]}
                    />
                </div>

                {/* Revenue Tier Breakdown */}
                <RevenueTierGrid
                    title="Sample Savings by Revenue Tier"
                    subtitle="Most analyses reveal $15,000–$80,000 in typically-unclaimed deductions depending on business structure and revenue."
                    className="border-t border-white/5"
                    tiers={[
                      {
                          range: "$500K – $1M",
                          savings: "$8,000–$25,000",
                          deductions: "2–3 deductions typically applicable",
                      },
                      {
                          range: "$1M – $3M",
                          savings: "$20,000–$50,000",
                          deductions: "4–5 deductions + QBI optimization",
                      },
                      {
                          range: "$3M+",
                          savings: "$40,000–$80,000+",
                          deductions: "Full structuring review + credits",
                      },
                    ]}
                />

                {/* Trust Signals */}
                <LandingTrustSignals
                    variant="dark"
                    title="Who We Are"
                    items={[
                      {
                          icon: "Building2",
                          title: "Union National Tax LLC",
                          subtitle: "Orem, Utah",
                          description: "Serving Utah business owners statewide from our Orem headquarters.",
                      },
                      {
                          icon: "Users",
                          title: "Industry Specialists",
                          subtitle: "Construction Focus",
                          description: "We work exclusively with construction, real estate, and hospitality sectors.",
                      },
                      {
                          icon: "Star",
                          title: "CPA + Enrolled Agents",
                          subtitle: "Strategic Focus",
                          description: "Strategists — year-round tax planning, not just seasonal April filings.",
                      },
                      {
                          icon: "Clock",
                          title: "Year-Round Strategy",
                          subtitle: "Proactive Planning",
                          description: "Proactive strategy January through December — when the decisions happen.",
                      },
                    ]}
                />

                {/* Form Section */}
                <section id="get-started" className="py-32 px-6 bg-brand-950 relative border-t border-white/5">
                    {/* Cinematic Accents */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
                    <div className="max-w-xl mx-auto relative z-10">
                        <TaxAnalysisForm industry="construction" source="meta-contractors-tax-analysis" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
