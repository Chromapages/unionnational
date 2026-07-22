"use client";

import { useState } from "react";
import { CreditCard, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCarouselProps {
    advisoryView: React.ReactNode;
    taxPrepView: React.ReactNode;
    comparisonView: React.ReactNode;
    hideTaxPrep?: boolean;
}

const tabs = [
    { id: "advisory", label: "Advisory Plans", icon: CreditCard },
    { id: "taxprep", label: "Tax Preparation", icon: FileText },
] as const;

export function PricingCarousel({ advisoryView, taxPrepView, comparisonView, hideTaxPrep = false }: PricingCarouselProps) {
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("advisory");
    const visibleTabs = hideTaxPrep ? tabs.filter((tab) => tab.id === "advisory") : tabs;

    return (
        <div className="w-full">
            {visibleTabs.length > 1 && <div className="mb-8 flex justify-center">
                <div className="grid w-full max-w-md grid-cols-2 gap-1 rounded-xl border border-brand-100 bg-brand-50 p-1 shadow-sm" role="tablist" aria-label="Pricing categories">
                    {visibleTabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors",
                                    isActive ? "bg-brand-900 text-white shadow-md" : "text-brand-900/60 hover:bg-white/50 hover:text-brand-900"
                                )}
                            >
                                <Icon className={cn("h-4 w-4", isActive ? "text-gold-500" : "text-brand-900/40")} aria-hidden="true" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>}

            <div role="tabpanel">
                {activeTab === "advisory" ? advisoryView : taxPrepView}
            </div>

            {activeTab === "advisory" && (
                <details id="pricing-comparison" className="mx-auto mt-8 max-w-7xl rounded-2xl border border-brand-100 bg-white px-5 py-1">
                    <summary className="flex min-h-11 cursor-pointer items-center font-semibold text-brand-900 marker:text-gold-500">
                        Compare all plans
                    </summary>
                    <div className="border-t border-brand-100 py-6">
                        {comparisonView}
                    </div>
                </details>
            )}
        </div>
    );
}
