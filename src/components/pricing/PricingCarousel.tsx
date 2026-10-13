"use client";

import { useId, useRef, useState } from "react";
import { CreditCard, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCarouselProps {
    advisoryView: React.ReactNode;
    taxPrepView: React.ReactNode;
    hideTaxPrep?: boolean;
    locale?: string;
}

export function PricingCarousel({ advisoryView, taxPrepView, hideTaxPrep = false, locale = "en" }: PricingCarouselProps) {
    const tabs = [
        { id: "advisory", label: locale === "es" ? "Todos los servicios" : "All offers", icon: CreditCard },
        { id: "taxprep", label: locale === "es" ? "Declaraciones" : "Tax returns", icon: FileText },
    ] as const;
    const [activeTab, setActiveTab] = useState<"advisory" | "taxprep">("advisory");
    const visibleTabs = hideTaxPrep ? tabs.filter((tab) => tab.id === "advisory") : tabs;
    const selectedTab = hideTaxPrep ? "advisory" : activeTab;
    const instanceId = useId();
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    return (
        <div className="w-full">
            {visibleTabs.length > 1 && <div className="mb-8 flex justify-center">
                <div className="grid w-full max-w-md grid-cols-2 gap-1 rounded-xl border border-brand-100 bg-brand-50 p-1 shadow-sm" role="tablist" aria-label={locale === "es" ? "Categorías de precios" : "Pricing categories"}>
                    {visibleTabs.map((tab, index) => {
                        const Icon = tab.icon;
                        const isActive = selectedTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                ref={node => { tabRefs.current[index] = node; }}
                                id={`${instanceId}-tab-${tab.id}`}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`${instanceId}-panel`}
                                tabIndex={isActive ? 0 : -1}
                                onClick={() => setActiveTab(tab.id)}
                                onKeyDown={event => {
                                    let next: number;
                                    switch (event.key) {
                                        case "ArrowRight": next = (index + 1) % visibleTabs.length; break;
                                        case "ArrowLeft": next = (index + visibleTabs.length - 1) % visibleTabs.length; break;
                                        case "Home": next = 0; break;
                                        case "End": next = visibleTabs.length - 1; break;
                                        default: return;
                                    }
                                    event.preventDefault();
                                    setActiveTab(visibleTabs[next].id);
                                    tabRefs.current[next]?.focus();
                                }}
                                className={cn(
                                    "flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors",
                                    isActive ? "bg-brand-900 text-white shadow-md" : "text-brand-900 hover:bg-white/50"
                                )}
                            >
                                <Icon className={cn("h-4 w-4", isActive ? "text-gold-500" : "text-brand-900/40")} aria-hidden="true" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>}

            <div id={`${instanceId}-panel`} role={visibleTabs.length > 1 ? "tabpanel" : undefined} aria-labelledby={visibleTabs.length > 1 ? `${instanceId}-tab-${selectedTab}` : undefined} tabIndex={visibleTabs.length > 1 ? 0 : undefined}>
                {selectedTab === "advisory" ? advisoryView : taxPrepView}
            </div>

        </div>
    );
}
