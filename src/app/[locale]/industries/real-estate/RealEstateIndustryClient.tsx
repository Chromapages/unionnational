"use client";

import { 
    Building2, 
    TrendingUp, 
    Landmark,
    ShieldCheck,
    Coins,
    BarChart3,
    CheckCircle2,
    Zap,
    Scale,
    Clock,
    UserCheck,
    Wallet,
    Building,
    Key,
    ArrowRight,
    PieChart,
    Activity,
    Lock,
    Globe
} from "lucide-react";
import { IndustryHero } from "@/components/industries/IndustryHero";
import { IndustryBento } from "@/components/industries/IndustryBento";
import { ComparisonTable } from "@/components/industries/ComparisonTable";
import { CTASection } from "@/components/home/CTASection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { useState } from "react";

interface RealEstateIndustryClientProps {
    locale: string;
}

const FAQ_ITEMS = [
    {
        question: "How does cost segregation work for my properties?",
        answer: "Cost segregation allows you to accelerate depreciation on specific components of your property (like HVAC, flooring, or landscaping) over 5, 7, or 15 years instead of the standard 27.5 or 39 years. This creates massive immediate tax deductions that can offset your rental income or even other passive gains."
    },
    {
        question: "What is the 'Real Estate Professional' status (REPS)?",
        answer: "REPS allows you to treat rental losses as non-passive, meaning you can use them to offset your W-2 or active business income. This requires meeting strict IRS hour requirements (750+ hours and more than half of your professional time). We help you document and defend this status to maximize your tax shelter."
    },
    {
        question: "Can you help with 1031 exchange strategy?",
        answer: "Absolutely. A 1031 exchange is a powerful wealth-building tool, but it has strict timelines (45/180 days). We provide the strategic oversight to ensure your exchange is executed perfectly, deferring capital gains tax indefinitely while you scale your portfolio."
    },
    {
        question: "Do you work with short-term rentals (AirBnB/VRBO)?",
        answer: "Yes. Short-term rentals have a specific 'loophole' where they can sometimes be treated as non-passive even without REPS status if the average stay is 7 days or less. We specialize in optimizing these 'STR' strategies for high-earning professionals."
    },
    {
        question: "How do you handle multi-state property portfolios?",
        answer: "Investing across state lines creates complex 'Nexus' issues. We manage your multi-state filing requirements and ensure you aren't being double-taxed while maintaining compliance in every jurisdiction where you hold title."
    },
    {
        question: "Is your fee deductible for my real estate business?",
        answer: "Yes. Strategic tax and accounting services are a deductible business expense for your real estate holdings, effectively reducing the net cost of our partnership while we grow your net worth."
    }
];

const REAL_ESTATE_CHALLENGES = [
    {
        title: "Trapped Equity",
        description: "Most investors use standard 27.5-year depreciation, leaving hundreds of thousands in immediate tax benefits locked in the brick and mortar.",
        icon: Lock,
        size: "large" as const,
        stat: "$240k+",
        statLabel: "Avg. Year 1 Deduction Found",
        image: "/images/real-estate-building.jpg"
    },
    {
        title: "REPS Exposure",
        description: "Improper documentation of Real Estate Professional Status is the #1 reason for IRS audits among high-net-worth investors.",
        icon: ShieldCheck,
        size: "medium" as const,
        color: "red"
    },
    {
        title: "Exchange Friction",
        description: "Missing the 45-day identification window in a 1031 exchange can trigger massive immediate capital gains liabilities.",
        icon: Clock,
        size: "medium" as const
    },
    {
        title: "Nexus Complexity",
        description: "Owning property across state lines creates 'silent' filing requirements that trigger penalties if not managed proactively.",
        icon: Globe,
        size: "small" as const
    },
    {
        title: "Entity Leakage",
        description: "Poor LLC structuring often leads to double-taxation or unnecessary self-employment tax on rental operations.",
        icon: Scale,
        size: "small" as const
    },
    {
        title: "Passive Activity Loss",
        description: "Unused losses that sit on your balance sheet for years instead of offsetting your highest-taxed active income.",
        icon: Activity,
        size: "small" as const
    }
];

const REAL_ESTATE_COMPARISON = [
    { feature: "Depreciation", generic: "Straight-line (27.5y)", architect: "Institutional Cost Segregation" },
    { feature: "1031 Exchanges", generic: "Basic calculations", architect: "Strategic Deal Oversight", architectHighlight: true },
    { feature: "Loss Treatment", generic: "Passive / Trapped", architect: "Active Shield (REPS/STR)" },
    { feature: "Asset Protection", generic: "Single entity/none", architect: "Multi-Tiered LLC Guard" },
    { feature: "Strategic Growth", generic: "Tax compliance only", architect: "Portfolio Acquisition Advisory" }
];

export default function RealEstateIndustryClient({ locale }: RealEstateIndustryClientProps) {
    return (
        <div className="bg-white overflow-x-hidden">
            {/* 1. Breadcrumbs Overlay */}
            <div className="absolute top-24 left-0 right-0 z-50 pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { label: "Industries", href: "/industries" },
                            { label: "Real Estate", href: "/industries/real-estate" }
                        ]} 
                    />
                </div>
            </div>

            {/* 2. Industry Hero */}
            <IndustryHero 
                eyebrow="Wealth Architect"
                eyebrowIcon={Building}
                title="Real Estate is a"
                highlight="Tax Shield."
                subtitle="Most investors sit on millions in trapped tax benefits. We provide the elite strategy required to unlock your equity and scale your portfolio tax-free."
                ctaText="Get Portfolio Audit"
                ctaUrl="/intake"
                stats={[
                    { label: "Depreciation Speed", value: "3.5x", icon: Zap, subValue: "Front-loaded deductions" },
                    { label: "Equity Retained", value: "$1.2M", icon: Wallet, subValue: "Across average portfolio" },
                    { label: "Audit Defense", value: "100%", icon: ShieldCheck, subValue: "Verified REPS Status" }
                ]}
            />

            {/* 3. The Challenges (Bento Grid) */}
            <IndustryBento 
                eyebrow="The Investor's Tax Gap"
                title="Why most portfolios"
                highlight="bleed equity."
                subtitle="If your CPA is only doing standard preparation, they aren't a partner—they're a bookkeeper. You need architectural tax leadership."
                items={REAL_ESTATE_CHALLENGES}
            />

            {/* 4. Comparison (Fintech Style) */}
            <ComparisonTable 
                title="Architectural Strategy vs. Compliance."
                subtitle="We don't just file returns. We engineer the tax infrastructure required for large-scale property acquisition."
                rows={REAL_ESTATE_COMPARISON}
            />

            {/* 5. Deep Dive Section (Modern Layout) */}
            <section className="py-32 px-6 lg:px-8 bg-brand-950 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.02] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <RevealOnScroll>
                            <div className="space-y-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 text-[10px] font-bold uppercase tracking-widest">
                                    Strategic Advantage
                                </div>
                                <h2 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter leading-[0.95]">
                                    Equity <br />
                                    <span className="text-gold-500 italic">Retention.</span>
                                </h2>
                                <p className="text-xl text-slate-300 font-light leading-relaxed">
                                    In real estate, tax is your largest expense. By eliminating it through strategic depreciation and deferral, you effectively double your available acquisition capital.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                                    {[
                                        { title: "Cost Segregation", text: "Drastically increase cash flow in year 1 through accelerated depreciation schedules." },
                                        { title: "Tax-Free Scaling", text: "Utilize 1031 exchanges to trade up portfolios without capital gains erosion." },
                                        { title: "Status Defense", text: "Expert guidance on qualifying and defending Real Estate Professional Status (REPS)." },
                                        { title: "Portfolio Shield", text: "Multi-entity structuring to separate liability while maintaining consolidated tax flow." }
                                    ].map((benefit, i) => (
                                        <div key={i} className="space-y-4 group">
                                            <div className="flex items-center gap-3 text-gold-500 group-hover:text-white transition-colors">
                                                <CheckCircle2 size={18} />
                                                <span className="font-bold uppercase tracking-widest text-[10px]">{benefit.title}</span>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed font-light">{benefit.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>

                        <div className="relative">
                            <RevealOnScroll delay={300}>
                                <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                                    <img 
                                        src="/images/real-estate-cfo.jpg" 
                                        alt="Portfolio Review"
                                        className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent opacity-60" />
                                    
                                    <div className="absolute bottom-10 left-10 right-10 p-8 bg-brand-900/80 backdrop-blur-xl rounded-3xl border border-white/10">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-gold-500 flex items-center justify-center text-brand-950">
                                                <PieChart size={24} />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold font-heading">Portfolio Efficiency</div>
                                                <div className="text-gold-500 text-xs font-bold uppercase tracking-widest">Live Integration</div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full w-[88%] bg-gold-500" />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <span>Optimization Level</span>
                                                <span className="text-white">88%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="py-24 px-6 lg:px-8 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <RevealOnScroll className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-brand-950 tracking-tighter mb-4">
                            Strategic FAQs
                        </h2>
                        <p className="text-slate-500 font-light">
                            Common questions from elite real estate investors.
                        </p>
                    </RevealOnScroll>
                    <FAQAccordion items={FAQ_ITEMS} />
                </div>
            </section>

            {/* 7. Final CTA */}
            <CTASection 
                variant="homepageWireframe"
                data={{
                    ctaTitle: "Scale Your Legacy Wealth.",
                    ctaSubtitle: "Stop leaving your equity on the table. Join the elite investors using the Wealth Architect Partnership to build tax-free legacy wealth.",
                    ctaButtonText: "Book Portfolio Audit",
                    ctaButtonUrl: "/intake"
                }}
            />
        </div>
    );
}
