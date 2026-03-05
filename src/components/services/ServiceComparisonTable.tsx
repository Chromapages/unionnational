"use client";

import { CheckCircle2, Minus, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ServiceComparisonTableProps {
    className?: string;
}

export function ServiceComparisonTable({ className }: ServiceComparisonTableProps) {
    const t = useTranslations("ServicesPage.ComparisonTable");

    const features = [
        {
            label: t("features.idealFor"),
            values: [t("targetAudience.businessOwners"), t("targetAudience.growingBusinesses"), t("targetAudience.highNetWorth")],
            isText: true,
        },
        {
            label: t("features.annualInvestment"),
            values: [t("investmentTiers.foundation"), t("investmentTiers.growth"), t("investmentTiers.executive")],
            isText: true,
            isBold: true,
        },
        {
            label: t("features.taxPrepIncluded"),
            values: [false, true, true],
        },
        {
            label: t("features.strategicTaxPlanning"),
            values: [true, true, true],
        },
        {
            label: t("features.quarterlyReviews"),
            values: [false, true, true],
        },
        {
            label: t("features.prioritySupport"),
            values: [false, false, true],
        },
        {
            label: t("features.auditProtection"),
            values: [true, true, true],
        },
        {
            label: t("features.hotelIncentive"),
            values: [null, t("hotelNights"), t("hotelNights")],
            isIncentive: true,
        },
    ];

    return (
        <div className={cn("w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
            {/* Scroll Container for Mobile */}
            <div className="overflow-x-auto">
                <div className="min-w-[800px] grid grid-cols-[250px_1fr_1fr_1fr]">

                    {/* Header Row */}
                    <div className="contents text-sm font-bold text-brand-900 font-heading">
                        <div className="p-6 bg-white sticky left-0 z-10 border-b border-r border-slate-100 flex items-end">
                            <span className="sr-only">{t("features.features")}</span>
                        </div>
                        <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col justify-end gap-2 text-center">
                            <span className="text-lg">{t("tierNames.foundation")}</span>
                        </div>
                        <div className="p-6 bg-gold-500/5 border-b border-x border-gold-500/20 flex flex-col justify-end gap-2 text-center relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gold-500 text-brand-900 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-b-lg shadow-sm">
                                {t("badge.mostPopular")}
                            </div>
                            <span className="text-lg text-brand-900">{t("tierNames.growth")}</span>
                        </div>
                        <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col justify-end gap-2 text-center">
                            <span className="text-lg">{t("tierNames.executive")}</span>
                        </div>
                    </div>

                    {/* Data Rows */}
                    {features.map((feature, idx) => (
                        <div
                            key={feature.label}
                            className={cn(
                                "contents group transition-colors hover:bg-slate-50",
                                idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                            )}
                        >
                            {/* Label Column (Sticky) */}
                            <div className={cn(
                                "p-5 flex items-center font-medium text-sm text-brand-900 sticky left-0 z-10 border-r border-slate-100 transition-colors group-hover:bg-slate-50",
                                idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                            )}>
                                {feature.label}
                            </div>

                            {/* Foundation Value */}
                            <div className="p-5 flex items-center justify-center border-r border-slate-100/50">
                                <CellContent value={feature.values[0]} feature={feature} />
                            </div>

                            {/* Growth Value (Highlighted) */}
                            <div className="p-5 flex items-center justify-center bg-gold-500/5 border-x border-gold-500/20">
                                <CellContent value={feature.values[1]} feature={feature} />
                            </div>

                            {/* Executive Value */}
                            <div className="p-5 flex items-center justify-center">
                                <CellContent value={feature.values[2]} feature={feature} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CellContent({ value, feature }: { value: any, feature: any }) {
    if (value === null || value === false) {
        return <Minus className="w-5 h-5 text-slate-200" />;
    }

    if (value === true) {
        return <CheckCircle2 className="w-6 h-6 text-brand-500 fill-brand-50" />;
    }

    if (feature.isIncentive) {
        return (
            <div className="flex items-center gap-2 font-bold text-brand-900 text-sm">
                <Gift className="w-4 h-4 text-gold-600" />
                {value}
            </div>
        );
    }

    return (
        <span className={cn(
            "text-sm text-brand-900 text-center",
            feature.isBold ? "font-bold font-heading text-base" : "font-sans"
        )}>
            {value}
        </span>
    );
}
