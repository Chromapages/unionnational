"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Hammer, Home, Utensils, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const industries = [
    {
        id: "construction",
        icon: <Hammer className="w-6 h-6" />,
        name: "Construction",
        description: "Contractors & Builders",
        detailTitle: "Build Wealth, Not Just Buildings",
        detailText: "Construction businesses face unique challenges with job costing, irregular cash flow, and heavy equipment depreciation. We help you optimize your tax structure so you can keep more capital for your next project.",
        benefits: ["Job Costing Analysis", "Equipment Depreciation Strategy", "Cash Flow Management"]
    },
    {
        id: "real-estate",
        icon: <Home className="w-6 h-6" />,
        name: "Real Estate",
        description: "Investors & Agents",
        detailTitle: "Maximize Your Real Estate Portfolio",
        detailText: "From 1031 exchanges to navigating passive activity loss rules, real estate tax law is complex. We ensure you're leveraging every deduction available to investors and agents.",
        benefits: ["1031 Exchange Planning", "Passive Activity Loss Rules", "Cost Segregation Studies"]
    },
    {
        id: "food",
        icon: <Utensils className="w-6 h-6" />,
        name: "Food Industry",
        description: "Restaurateurs & Franchisees",
        detailTitle: "Recipe for Financial Success",
        detailText: "Margins are tight in the food industry. We help restaurateurs and franchisees implement tight financial controls and tax strategies to improve the bottom line.",
        benefits: ["Inventory Management", "Tip Reporting Compliance", "Sales Tax Automation"]
    },
    {
        id: "ecommerce",
        icon: <ShoppingBag className="w-6 h-6" />,
        name: "E-Commerce",
        description: "Online Sellers & Brands",
        detailTitle: "Scale Your Online Store Smartly",
        detailText: "E-commerce moves fast. We specialize in nexus issues, inventory accounting, and multi-state sales tax compliance, letting you focus on scaling your brand.",
        benefits: ["Multi-State Sales Tax Nexus", "Inventory Accounting", "Platform Fee Analysis"]
    },
    {
        id: "insurance",
        icon: <ShieldCheck className="w-6 h-6" />,
        name: "Insurance",
        description: "Agency Owners",
        detailTitle: "Protect Your Agency's Earnings",
        detailText: "Insurance agencies have unique valuation and compensation models. We provide specialized tax planning to help agency owners maximize their retained earnings.",
        benefits: ["Commission Income Planning", "Agency Valuation Strategy", "Retirement Planning"]
    }
];

export function IndustriesSection() {
    const [activeindex, setActiveIndex] = useState(0);

    return (
        <section className="mb-0 border-y border-slate-100 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <RevealOnScroll className="text-center mb-16">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 font-sans">Who We Serve</span>
                    <h2 className="text-3xl lg:text-4xl font-bold mt-3 text-brand-900 tracking-tight font-heading">Specialized Tax Strategy for Your Industry</h2>
                </RevealOnScroll>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Sidebar / Navigation */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        {industries.map((industry, index) => (
                            <button
                                key={industry.id}
                                onClick={() => setActiveIndex(index)}
                                className={`flex items-center gap-4 p-4 rounded-md text-left transition-all duration-300 border ${activeindex === index
                                    ? "bg-white border-gold-500 shadow-md ring-1 ring-gold-500"
                                    : "bg-transparent border-transparent hover:bg-white/50 hover:border-slate-200"
                                    }`}
                            >
                                <div className={`p-2 rounded-lg transition-colors ${activeindex === index ? "bg-gold-500 text-brand-900" : "bg-slate-100 text-brand-900"
                                    }`}>
                                    {industry.icon}
                                </div>
                                <div>
                                    <h3 className={`font-semibold transition-colors font-heading ${activeindex === index ? "text-brand-900" : "text-slate-600"
                                        }`}>
                                        {industry.name}
                                    </h3>
                                    <p className="text-xs text-brand-900/60 font-sans">{industry.description}</p>
                                </div>
                                <ArrowRight className={`w-4 h-4 ml-auto transition-opacity ${activeindex === index ? "opacity-100 text-gold-600" : "opacity-0"
                                    }`} />
                            </button>
                        ))}
                    </div>

                    {/* Content Display */}
                    <div className="lg:col-span-8 bg-white rounded-md border border-slate-200 p-8 lg:p-12 shadow-sm relative overflow-hidden">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0" />

                        <div className="relative z-10 h-full flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <div className="p-2 bg-gold-100 text-gold-600 rounded-lg">
                                    {industries[activeindex].icon}
                                </div>
                                <span className="text-sm font-bold text-gold-600 uppercase tracking-wide font-sans">
                                    {industries[activeindex].name}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-medium text-brand-900 mb-6 leading-tight font-heading">
                                {industries[activeindex].detailTitle}
                            </h3>

                            <p className="text-lg text-brand-900 mb-10 leading-relaxed max-w-2xl font-sans">
                                {industries[activeindex].detailText}
                            </p>

                            <div className="grid sm:grid-cols-3 gap-6">
                                {industries[activeindex].benefits.map((benefit, i) => (
                                    <div key={i} className="flex flex-col gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-gold-600" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 font-sans">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
