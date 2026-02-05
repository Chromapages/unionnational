"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, FileText, BarChart3, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCarouselProps {
    advisoryView: React.ReactNode;
    taxPrepView: React.ReactNode;
    comparisonView: React.ReactNode;
    optionalServicesView?: React.ReactNode;
}

const tabs = [
    { id: "advisory", label: "Advisory Plans", icon: CreditCard },
    { id: "taxprep", label: "Tax Preparation", icon: FileText },
    { id: "comparison", label: "Comparison", icon: BarChart3 },
    { id: "optional", label: "Optional Services", icon: ChevronRight },
];

export function PricingCarousel({ advisoryView, taxPrepView, comparisonView, optionalServicesView }: PricingCarouselProps) {
    const [activeTab, setActiveTab] = useState("advisory");

    const renderView = () => {
        switch (activeTab) {
            case "advisory":
                return advisoryView;
            case "taxprep":
                return taxPrepView;
            case "comparison":
                return comparisonView;
            case "optional":
                return optionalServicesView;
            default:
                return advisoryView;
        }
    };

    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div className="flex flex-col items-center mb-12">
                <div className="inline-flex p-1 bg-brand-50 rounded-xl border border-brand-100 shadow-sm overflow-x-auto max-w-full">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap",
                                    isActive
                                        ? "bg-brand-900 text-white shadow-md"
                                        : "text-brand-900/60 hover:text-brand-900 hover:bg-white/50"
                                )}
                            >
                                <Icon className={cn("w-4 h-4", isActive ? "text-gold-500" : "text-brand-900/40")} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Visual indicator for mobile scroll if needed, though hidden for now */}
                <div className="md:hidden mt-4 text-xs text-brand-900/40 flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />
                    Swipe tabs for more
                </div>
            </div>

            {/* Content Area with smooth transitions */}
            <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full"
                    >
                        {renderView()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
