"use client";

import { useState, useRef, useEffect } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Hammer, Home, Utensils, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const industries = [
    {
        id: "construction",
        icon: <Hammer className="w-5 h-5" />,
        name: "Construction",
        description: "Contractors & Builders",
        detailTitle: "Build Wealth, Not Just Buildings",
        detailText: "Construction businesses face unique challenges with job costing, irregular cash flow, and heavy equipment depreciation. We help you optimize your tax structure so you can keep more capital for your next project.",
        benefits: ["Job Costing Analysis", "Equipment Depreciation Strategy", "Cash Flow Management"]
    },
    {
        id: "real-estate",
        icon: <Home className="w-5 h-5" />,
        name: "Real Estate",
        description: "Investors & Agents",
        detailTitle: "Maximize Your Real Estate Portfolio",
        detailText: "From 1031 exchanges to navigating passive activity loss rules, real estate tax law is complex. We ensure you're leveraging every deduction available to investors and agents.",
        benefits: ["1031 Exchange Planning", "Passive Activity Loss Rules", "Cost Segregation Studies"]
    },
    {
        id: "food",
        icon: <Utensils className="w-5 h-5" />,
        name: "Food Industry",
        description: "Restaurateurs & Franchisees",
        detailTitle: "Recipe for Financial Success",
        detailText: "Margins are tight in the food industry. We help restaurateurs and franchisees implement tight financial controls and tax strategies to improve the bottom line.",
        benefits: ["Inventory Management", "Tip Reporting Compliance", "Sales Tax Automation"]
    },
    {
        id: "ecommerce",
        icon: <ShoppingBag className="w-5 h-5" />,
        name: "E-Commerce",
        description: "Online Sellers & Brands",
        detailTitle: "Scale Your Online Store Smartly",
        detailText: "E-commerce moves fast. We specialize in nexus issues, inventory accounting, and multi-state sales tax compliance, letting you focus on scaling your brand.",
        benefits: ["Multi-State Sales Tax Nexus", "Inventory Accounting", "Platform Fee Analysis"]
    },
    {
        id: "insurance",
        icon: <ShieldCheck className="w-5 h-5" />,
        name: "Insurance",
        description: "Agency Owners",
        detailTitle: "Protect Your Agency's Earnings",
        detailText: "Insurance agencies have unique valuation and compensation models. We provide specialized tax planning to help agency owners maximize their retained earnings.",
        benefits: ["Commission Income Planning", "Agency Valuation Strategy", "Retirement Planning"]
    }
];

export function IndustriesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabsRef = useRef<HTMLDivElement>(null);

    // Auto-scroll tab into view on mobile when changing index
    useEffect(() => {
        if (tabsRef.current) {
            const activeTab = tabsRef.current.children[activeIndex] as HTMLElement;
            if (activeTab) {
                const scrollLeft = activeTab.offsetLeft - (tabsRef.current.clientWidth / 2) + (activeTab.clientWidth / 2);
                tabsRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }, [activeIndex]);

    return (
        <section className="bg-white border-y border-slate-100 mb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
                <RevealOnScroll className="text-center mb-10 sm:mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500 font-heading">
                        Who We Serve
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold mt-4 text-brand-900 tracking-tight font-heading">
                        Specialized Tax Strategy <br className="hidden sm:block" /> for Your Industry
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    {/* Mobile: Sticky Horizontal Tabs */}
                    {/* Desktop: Vertical Sidebar */}
                    <div className="lg:col-span-4 sticky top-20 z-30 lg:static bg-white/95 backdrop-blur-sm lg:bg-transparent -mx-4 px-4 sm:mx-0 sm:px-0 pt-2 pb-4 lg:py-0 border-b lg:border-none border-slate-100 lg:h-fit">
                        <div
                            ref={tabsRef}
                            className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar snap-x"
                        >
                            {industries.map((industry, index) => (
                                <button
                                    key={industry.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`shrink-0 snap-center group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl text-left transition-all duration-300 border lg:w-full min-w-[160px] sm:min-w-[200px] lg:min-w-0 ${activeIndex === index
                                        ? "bg-brand-900 border-brand-900 shadow-lg ring-1 ring-brand-900"
                                        : "bg-white border-slate-100 hover:border-gold-500/30 hover:shadow-md"
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg transition-colors duration-300 ${activeIndex === index
                                        ? "bg-gold-500 text-brand-900"
                                        : "bg-slate-50 text-slate-400 group-hover:bg-gold-50 group-hover:text-gold-600"
                                        }`}>
                                        {industry.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-bold transition-colors font-heading text-sm whitespace-nowrap lg:whitespace-normal ${activeIndex === index ? "text-white" : "text-brand-900"
                                            }`}>
                                            {industry.name}
                                        </h3>
                                        <p className={`hidden lg:block text-[11px] truncate font-medium ${activeIndex === index ? "text-white/60" : "text-slate-400 group-hover:text-slate-500"
                                            }`}>
                                            {industry.description}
                                        </p>
                                    </div>
                                    <ArrowRight className={`hidden lg:block w-4 h-4 transition-all ${activeIndex === index
                                        ? "opacity-100 text-gold-500 translate-x-0"
                                        : "opacity-0 -translate-x-2 text-gold-600 group-hover:opacity-100 group-hover:translate-x-0"
                                        }`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Display */}
                    <div className="lg:col-span-8">
                        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 sm:p-12 lg:p-14 relative overflow-hidden h-full min-h-[500px] flex flex-col justify-center transition-all duration-500">
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeIndex}>
                                <div className="inline-flex items-center gap-2 mb-8 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
                                    <span className="p-1 bg-gold-100 text-gold-700 rounded-full">
                                        {industries[activeIndex].icon}
                                    </span>
                                    <span className="text-xs font-bold text-brand-900 uppercase tracking-wide font-heading">
                                        {industries[activeIndex].name}
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-900 mb-6 leading-[1.15] font-heading">
                                    {industries[activeIndex].detailTitle}
                                </h3>

                                <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl font-sans">
                                    {industries[activeIndex].detailText}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-12">
                                    {industries[activeIndex].benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-4 group/benefit">
                                            <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover/benefit:bg-emerald-100 transition-colors">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                            </div>
                                            <span className="text-sm font-semibold text-brand-900 group-hover/benefit:text-brand-700 transition-colors font-sans pt-0.5">
                                                {benefit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
