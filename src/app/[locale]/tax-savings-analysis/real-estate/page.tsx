import { TaxAnalysisForm } from "@/components/tax-analysis/TaxAnalysisForm";
import { LandingHero } from "@/components/tax-analysis/LandingHero";
import { LandingBentoGrid } from "@/components/tax-analysis/LandingBentoGrid";
import { RevenueTierGrid } from "@/components/tax-analysis/RevenueTierGrid";
import { LandingTrustSignals } from "@/components/tax-analysis/LandingTrustSignals";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Tax Savings Analysis for Utah Real Estate Investors | Union National Tax",
    description: "Most Utah real estate investors leave $25,000–$100,000+ in tax savings unclaimed every year. Get your free segmented Tax Savings Analysis — built for real estate.",
};

export default async function RealEstateTaxAnalysisPage() {
    return (
        <div className="min-h-screen bg-brand-950 font-sans flex flex-col antialiased selection:bg-gold-500 selection:text-white">
            <HeaderWrapper />

            <main className="flex-grow">
                {/* Hero Section */}
                <LandingHero
                    badge="Free Analysis — Utah Real Estate"
                    title="Most Utah Real Estate Investors Are Overpaying"
                    titleHighlight="$25,000–$100,000+"
                    subtitle="Get a free, segmented Tax Savings Analysis — built for your portfolio and investment strategy. Delivered by email. No consultation required."
                    ctaPrimary="Get My Free Analysis"
                    trustSignals={["CPA + Enrolled Agents", "Utah-Based", "Real Estate Specialists"]}
                    industry="real-estate"
                />

                {/* Problem Section - Dark Bento */}
                <div className="relative border-t border-white/5">
                    <LandingBentoGrid
                        variant="dark"
                        eyebrow="The Real Estate Wealth Gap"
                        title="Unlock the Hidden Capital in Your Portfolio"
                        subtitle="Real estate is the most tax-advantaged asset class in the US, yet most investors use generic strategies that leave six figures on the table."
                        items={[
                          {
                            title: "Cost Segregation",
                            description: "Accelerate $50,000–$200,000+ in deductions on a single rental property through component-level depreciation.",
                            icon: "Building2",
                            className: "md:col-span-3",
                          },
                          {
                            title: "REPS Status",
                            description: "Strategic planning to qualify as a Real Estate Professional, unlocking losses against ordinary income.",
                            icon: "Users",
                            className: "md:col-span-3",
                          },
                          {
                            title: "1031 Exchanges",
                            description: "Structural guidance on deferring massive capital gains through proper exchange timing and identification.",
                            icon: "Key",
                            className: "md:col-span-2",
                          },
                          {
                            title: "Passive Loss Rules",
                            description: "Optimization of passive activity loss (PAL) limitations to maximize annual deductibility.",
                            icon: "Percent",
                            className: "md:col-span-2",
                          },
                          {
                            title: "Portfolio Structure",
                            description: "LLC and S-Corp structuring specifically for multi-unit and commercial holdings.",
                            icon: "Home",
                            className: "md:col-span-2",
                          }
                        ]}
                    />
                </div>

                {/* Process Section - Dark Variant for Consistency */}
                <div className="border-t border-white/5 bg-brand-950/50">
                    <LandingBentoGrid
                        variant="dark"
                        eyebrow="Strategic Workflow"
                        title="How It Works"
                        subtitle="We analyze your portfolio data against current IRS codes to identify immediate cash-flow opportunities."
                        items={[
                          {
                            title: "Provide Basic Data",
                            description: "Takes about 90 seconds. We need your portfolio size and average holding period to estimate savings.",
                            icon: "FileText",
                          },
                          {
                            title: "Receive Your Analysis",
                            description: "Within one business day, receive a segmented PDF showing your specific deduction levers and value ranges.",
                            icon: "Clock",
                          },
                          {
                            title: "Optimize Your Cash Flow",
                            description: "The analysis identifies 3–5 high-impact strategies with step-by-step logic for implementation.",
                            icon: "TrendingUp",
                          }
                        ]}
                    />
                </div>

                {/* Revenue Tier Breakdown */}
                <RevenueTierGrid
                    title="Sample Savings by Portfolio Size"
                    subtitle="Most analyses reveal $25,000–$100,000+ in typically-unclaimed deductions depending on portfolio size and structure."
                    className="border-t border-white/5"
                    tiers={[
                      {
                          range: "$500K – $1M Portfolio",
                          savings: "$12,000–$35,000",
                          deductions: "2–3 deductions typically applicable",
                      },
                      {
                          range: "$1M – $5M Portfolio",
                          savings: "$30,000–$75,000",
                          deductions: "4–5 deductions + cost seg. review",
                      },
                      {
                          range: "$5M+ Portfolio",
                          savings: "$60,000–$150,000+",
                          deductions: "Full structuring + REPS analysis",
                      },
                    ]}
                />

                {/* Trust Signals */}
                <LandingTrustSignals
                    variant="dark"
                    title="Expert Utah Representation"
                    items={[
                      {
                          icon: "Building2",
                          title: "Union National Tax LLC",
                          subtitle: "Orem, Utah",
                          description: "Deep roots in the Utah real estate market from St. George to Logan.",
                      },
                      {
                          icon: "Users",
                          title: "Industry Specialists",
                          subtitle: "Real Estate Focus",
                          description: "We work with investors, agents, and brokers to optimize every side of the deal.",
                      },
                      {
                          icon: "Star",
                          title: "CPA + Enrolled Agents",
                          subtitle: "Advanced Strategy",
                          description: "Going beyond tax prep to active tax engineering and capital preservation.",
                      },
                      {
                          icon: "Clock",
                          title: "Year-Round Strategy",
                          subtitle: "Deal-Level Planning",
                          description: "We help you structure deals before they close, not just report them after.",
                      },
                    ]}
                />

                {/* Form Section */}
                <section id="get-started" className="py-32 px-6 bg-brand-950 relative border-t border-white/5">
                    {/* Cinematic Accents */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
                    <div className="max-w-xl mx-auto relative z-10">
                        <TaxAnalysisForm industry="real-estate" source="meta-real-estate-tax-analysis" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
