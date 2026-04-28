"use client";

import { 
    ShoppingCart, 
    Globe, 
    Package, 
    Zap,
    BarChart3,
    ShieldCheck,
    Coins,
    CheckCircle2,
    CreditCard,
    Boxes,
    ArrowRight,
    Search,
    TrendingUp,
    Globe2,
    Layers,
    Cpu,
    Lock
} from "lucide-react";
import { IndustryHero } from "@/components/industries/IndustryHero";
import { IndustryBento } from "@/components/industries/IndustryBento";
import { ComparisonTable } from "@/components/industries/ComparisonTable";
import { CTASection } from "@/components/home/CTASection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

interface EcommerceIndustryClientProps {
    locale: string;
}

const FAQ_ITEMS = [
    {
        question: "How do you handle Sales Tax Nexus (Wayfair)?",
        answer: "We use automated tracking to monitor your economic nexus across all 50 states. Once you hit a threshold, we manage the registration, collection oversight, and filing so you don't get hit with massive back-tax penalties and interest."
    },
    {
        question: "Can you help optimize my inventory valuation?",
        answer: "Yes. Whether you should use FIFO, LIFO, or Average Cost can have a massive impact on your taxable income, especially during periods of inflation. We analyze your supply chain to select the method that keeps the most cash in your business."
    },
    {
        question: "Do you specialize in Amazon (FBA) or Shopify?",
        answer: "We work across all major platforms. We understand the specific settlement reports, referral fees, and multi-channel inventory challenges that come with FBA, Shopify, Walmart, and TikTok Shop."
    },
    {
        question: "Can e-commerce brands qualify for R&D tax credits?",
        answer: "Many brands don't realize that developing custom Shopify themes, proprietary apps, or unique product formulations can qualify for R&D credits. We perform the analysis to see if you can claim these 'hidden' dollar-for-dollar tax offsets."
    },
    {
        question: "How do you handle international sales and VAT?",
        answer: "Scaling globally introduces VAT, GST, and complex import duties. We provide the strategic oversight to ensure your international expansion is tax-efficient and compliant with local regulations."
    },
    {
        question: "Do we need to switch our accounting software?",
        answer: "We typically recommend QuickBooks Online or Xero integrated with A2X or Link My Books for clean settlement data. If your current setup is messy, we manage the migration to a clean, automated digital-first stack."
    }
];

const ECOMMERCE_CHALLENGES = [
    {
        title: "Wayfair Exposure",
        description: "Explosive sales across 50 states create a massive 'silent' liability for Sales Tax Nexus that triggers devastating audits if ignored.",
        icon: Globe2,
        size: "large" as const,
        stat: "50-State",
        statLabel: "Nexus Tracking Deployed",
        image: "/images/ecommerce-shipping.jpg"
    },
    {
        title: "Inventory Leakage",
        description: "Poor valuation methods (LIFO vs FIFO) often cause brands to pay taxes on profits that haven't even hit their bank account yet.",
        icon: Boxes,
        size: "medium" as const
    },
    {
        title: "Settlement Gaps",
        description: "Standard CPAs struggle to reconcile Amazon/Shopify settlement reports, leading to overstated income and wasted taxes.",
        icon: Search,
        size: "medium" as const
    },
    {
        title: "Margin Blindness",
        description: "Scaling without granular contribution margin visibility is the fastest way for a brand to go bankrupt while growing.",
        icon: TrendingUp,
        size: "small" as const
    },
    {
        title: "Fee Erosion",
        description: "Hidden referral, storage, and shipping fees that eat away at your ROI without appearing clearly in your P&L.",
        icon: CreditCard,
        size: "small" as const
    },
    {
        title: "Data Silos",
        description: "Marketing spend, COGS, and tax liability living in three different worlds instead of one unified growth engine.",
        icon: Cpu,
        size: "small" as const
    }
];

const ECOMMERCE_COMPARISON = [
    { feature: "Sales Tax Nexus", generic: "Reactive / Missing", architect: "Proactive 50-State Guard" },
    { feature: "Inventory Strategy", generic: "Basic year-end count", architect: "Landed-Cost Optimization", architectHighlight: true },
    { feature: "Settlement Recon", generic: "Bank-feed only", architect: "Deep Multi-Channel Link" },
    { feature: "Profit Visibility", generic: "Gross margin only", architect: "Granular Contribution Margin" },
    { feature: "Exit Readiness", generic: "Not considered", architect: "Institutional-Grade Cleanliness" }
];

export default function EcommerceIndustryClient({ locale }: EcommerceIndustryClientProps) {
    return (
        <div className="bg-white overflow-x-hidden">
            {/* 1. Breadcrumbs Overlay */}
            <div className="absolute top-24 left-0 right-0 z-50 pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { label: "Industries", href: "/industries" },
                            { label: "E-commerce", href: "/industries/e-commerce" }
                        ]} 
                    />
                </div>
            </div>

            {/* 2. Industry Hero */}
            <IndustryHero 
                eyebrow="Digital-First Scale"
                eyebrowIcon={Zap}
                title="Scale with"
                highlight="Certainty."
                subtitle="High-growth brands often outpace their accounting. We provide the institutional-grade financial leadership required to handle multi-state nexus and multi-channel scale."
                ctaText="Book Growth Audit"
                ctaUrl="/intake"
                stats={[
                    { label: "Compliance Rate", value: "99.9%", icon: ShieldCheck, subValue: "Automated Nexus Guard" },
                    { label: "Profit Retained", value: "+12%", icon: TrendingUp, subValue: "Through margin optimization" },
                    { label: "Audit Risk", value: "Minimal", icon: Lock, subValue: "Verified settlement data" }
                ]}
            />

            {/* 3. The Challenges (Bento Grid) */}
            <IndustryBento 
                eyebrow="The Digital-First Gap"
                title="Why most brands"
                highlight="choke on success."
                subtitle="Generalist CPAs don't understand Wayfair thresholds or Shopify/Amazon settlement reports. You need a partner who speaks the language of high-velocity digital trade."
                items={ECOMMERCE_CHALLENGES}
            />

            {/* 4. Comparison (Fintech Style) */}
            <ComparisonTable 
                title="Digital Force vs. Standard Prep."
                subtitle="We don't just keep books. We install the financial infrastructure required for multi-channel expansion."
                rows={ECOMMERCE_COMPARISON}
            />

            {/* 5. Deep Dive Section */}
            <section className="py-32 px-6 lg:px-8 bg-brand-950 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.02] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <RevealOnScroll>
                            <div className="space-y-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 text-[10px] font-bold uppercase tracking-widest">
                                    Margin Mastery
                                </div>
                                <h2 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter leading-[0.95]">
                                    Scalable <br />
                                    <span className="text-gold-500 italic">Profit.</span>
                                </h2>
                                <p className="text-xl text-slate-300 font-light leading-relaxed">
                                    In e-commerce, complexity is the enemy of profit. We simplify your financial engine so you can focus on product, marketing, and customer acquisition.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                                    {[
                                        { title: "Nexus Guard", text: "Proactive management of economic and physical nexus thresholds across all states." },
                                        { title: "Inventory Alpha", text: "Optimized inventory tax strategies to minimize year-end tax liabilities." },
                                        { title: "Settlement Clarity", text: "Crystal-clear visibility into net margins after referral fees and shipping costs." },
                                        { title: "Exit Readiness", text: "Institutional-grade financial cleanup to maximize your valuation for a future exit." }
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
                                        src="/images/ecommerce-cfo.jpg" 
                                        alt="Brand Review"
                                        className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent opacity-60" />
                                    
                                    <div className="absolute bottom-10 left-10 right-10 p-8 bg-brand-900/80 backdrop-blur-xl rounded-3xl border border-white/10">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-gold-500 flex items-center justify-center text-brand-950">
                                                <Layers size={24} />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold font-heading">Margin Visibility</div>
                                                <div className="text-gold-500 text-xs font-bold uppercase tracking-widest">Digital Hub</div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full w-[94%] bg-gold-500" />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <span>Settlement Accuracy</span>
                                                <span className="text-white">94%</span>
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
                            Brand Scaling FAQs
                        </h2>
                        <p className="text-slate-500 font-light">
                            Common questions from high-growth digital brand founders.
                        </p>
                    </RevealOnScroll>
                    <FAQAccordion items={FAQ_ITEMS} />
                </div>
            </section>

            {/* 7. Final CTA */}
            <CTASection 
                variant="homepageWireframe"
                data={{
                    ctaTitle: "Protect Your Margins.",
                    ctaSubtitle: "Stop guessing at your tax liability. Join the elite brands using the Digital-First CFO Partnership to protect profits and scale.",
                    ctaButtonText: "Book Growth Audit",
                    ctaButtonUrl: "/intake"
                }}
            />
        </div>
    );
}
