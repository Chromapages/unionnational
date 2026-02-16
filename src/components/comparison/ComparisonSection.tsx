"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Check, X, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface Feature {
    featureName: string;
    unionValue: string;
    unionHighlight?: boolean;
    competitorValues?: string[];
    isCheckmark?: boolean;
    icon?: string;
}

interface ComparisonTable {
    _id: string;
    title: string;
    subtitle?: string;
    comparisonType: string;
    industry?: string;
    showUnionNational: boolean;
    unionNationalLabel: string;
    competitors: string[];
    features: Feature[];
    cta?: {
        text: string;
        url: string;
    };
    badge?: string;
}

interface ComparisonSectionProps {
    comparison: ComparisonTable;
    className?: string;
}

function CheckIcon({ className }: { className?: string }) {
    return <Check className={cn("h-5 w-5 text-gold-400", className)} />;
}

function XIcon({ className }: { className?: string }) {
    return <X className={cn("h-5 w-5 text-white/30", className)} />;
}

function UnionValue({ value, highlight, isCheckmark }: { value: string; highlight?: boolean; isCheckmark?: boolean }) {
    if (isCheckmark) {
        return value.toLowerCase().includes("true") || value.toLowerCase().includes("yes") || value.toLowerCase().includes("check") 
            ? <CheckIcon /> 
            : <XIcon />;
    }

    return (
        <span className={cn(
            "font-medium",
            highlight ? "text-gold-200" : "text-white"
        )}>
            {value}
        </span>
    );
}

function CompetitorValue({ value, isCheckmark }: { value: string; isCheckmark?: boolean }) {
    if (isCheckmark) {
        return value.toLowerCase().includes("true") || value.toLowerCase().includes("yes") || value.toLowerCase().includes("check")
            ? <Check className="h-5 w-5 text-white/40" />
            : <XIcon />;
    }

    return <span className="text-white/60">{value}</span>;
}

export function ComparisonSection({ comparison, className }: ComparisonSectionProps) {
    const [activeCard, setActiveCard] = useState(0);
    const { title, subtitle, competitors, features, cta, badge, unionNationalLabel, showUnionNational } = comparison;

    const totalColumns = showUnionNational ? competitors.length + 1 : competitors.length;

    return (
        <section className={cn("py-20 bg-brand-950", className)}>
            <div className="max-w-7xl mx-auto px-6">
                <RevealOnScroll>
                    <div className="text-center mb-12">
                        {badge && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold-300 mb-4">
                                <Star className="h-3 w-3" />
                                {badge}
                            </span>
                        )}
                        <h2 className="text-3xl md:text-4xl font-semibold text-white font-heading mb-4">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="max-w-2xl mx-auto text-lg text-white/70">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </RevealOnScroll>

                {/* Mobile View - Swipeable Cards */}
                <div className="lg:hidden">
                    <div className="relative overflow-hidden">
                        <div 
                            className="flex transition-transform duration-300 ease-out"
                            style={{ transform: `translateX(-${activeCard * 100}%)` }}
                        >
                            {/* Union National Card */}
                            {showUnionNational && (
                                <div className="w-full flex-shrink-0 px-4">
                                    <ComparisonCard
                                        title={unionNationalLabel}
                                        features={features}
                                        isUnion={true}
                                        isHighlighted={true}
                                    />
                                </div>
                            )}
                            {/* Competitor Cards */}
                            {competitors.map((competitor, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-4">
                                    <ComparisonCard
                                        title={competitor}
                                        features={features}
                                        isUnion={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: totalColumns }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCard(index)}
                                className={cn(
                                    "h-2 rounded-full transition-all",
                                    activeCard === index ? "w-8 bg-gold-500" : "w-2 bg-white/20"
                                )}
                            />
                        ))}
                    </div>

                    {/* Arrow Navigation */}
                    <div className="flex justify-between items-center mt-4 px-4">
                        <button
                            onClick={() => setActiveCard(Math.max(0, activeCard - 1))}
                            disabled={activeCard === 0}
                            className="p-2 rounded-full bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="text-sm text-white/50">
                            {activeCard + 1} of {totalColumns}
                        </span>
                        <button
                            onClick={() => setActiveCard(Math.min(totalColumns - 1, activeCard + 1))}
                            disabled={activeCard === totalColumns - 1}
                            className="p-2 rounded-full bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Desktop View - Full Table */}
                <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-brand-900/50">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="p-6 text-left text-sm font-medium text-white/60 uppercase tracking-wider w-1/3">
                                    Feature
                                </th>
                                {showUnionNational && (
                                    <th className="p-6 text-center w-1/3">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-lg font-semibold text-gold-200 font-heading">
                                                {unionNationalLabel}
                                            </span>
                                            {badge && (
                                                <span className="mt-1 text-xs text-gold-400">
                                                    {badge}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                )}
                                {competitors.map((competitor, index) => (
                                    <th 
                                        key={index} 
                                        className="p-6 text-center w-1/3"
                                    >
                                        <span className="text-lg font-medium text-white/50">
                                            {competitor}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <tr 
                                    key={index} 
                                    className={cn(
                                        "border-b border-white/5",
                                        index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                                    )}
                                >
                                    <td className="p-6">
                                        <span className="text-white font-medium">
                                            {feature.featureName}
                                        </span>
                                    </td>
                                    {showUnionNational && (
                                        <td className="p-6 text-center">
                                            <div className="flex items-center justify-center">
                                                <UnionValue 
                                                    value={feature.unionValue} 
                                                    highlight={feature.unionHighlight}
                                                    isCheckmark={feature.isCheckmark}
                                                />
                                            </div>
                                        </td>
                                    )}
                                    {feature.competitorValues?.map((value, cIndex) => (
                                        <td key={cIndex} className="p-6 text-center">
                                            <div className="flex items-center justify-center">
                                                <CompetitorValue 
                                                    value={value} 
                                                    isCheckmark={feature.isCheckmark}
                                                />
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {cta && (
                    <div className="mt-12 text-center">
                        <Link
                            href={cta.url}
                            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-base font-semibold text-brand-950 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
                        >
                            {cta.text}
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

interface ComparisonCardProps {
    title: string;
    features: Feature[];
    isUnion: boolean;
    isHighlighted?: boolean;
}

function ComparisonCard({ title, features, isUnion, isHighlighted }: ComparisonCardProps) {
    return (
        <div className={cn(
            "rounded-2xl border overflow-hidden",
            isHighlighted 
                ? "border-gold-500/50 bg-brand-800/50 shadow-lg shadow-gold-500/10" 
                : "border-white/10 bg-brand-900/30"
        )}>
            <div className={cn(
                "p-6 text-center border-b",
                isHighlighted ? "border-gold-500/30 bg-gold-500/10" : "border-white/10"
            )}>
                <h3 className={cn(
                    "text-xl font-semibold font-heading",
                    isHighlighted ? "text-gold-200" : "text-white/70"
                )}>
                    {title}
                </h3>
            </div>
            <div className="divide-y divide-white/5">
                {features.map((feature, index) => (
                    <div key={index} className="p-4">
                        <div className="text-xs text-white/40 mb-2 uppercase tracking-wider">
                            {feature.featureName}
                        </div>
                        <div className="flex items-center justify-center">
                            {isUnion ? (
                                <UnionValue 
                                    value={feature.unionValue} 
                                    highlight={feature.unionHighlight}
                                    isCheckmark={feature.isCheckmark}
                                />
                            ) : feature.competitorValues?.[0] && (
                                <CompetitorValue 
                                    value={feature.competitorValues[0]} 
                                    isCheckmark={feature.isCheckmark}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface ComparisonGridProps {
    comparisons: ComparisonTable[];
    className?: string;
}

export function ComparisonGrid({ comparisons, className }: ComparisonGridProps) {
    if (!comparisons || comparisons.length === 0) return null;

    return (
        <div className={cn("space-y-16", className)}>
            {comparisons.map((comparison) => (
                <ComparisonSection key={comparison._id} comparison={comparison} />
            ))}
        </div>
    );
}
