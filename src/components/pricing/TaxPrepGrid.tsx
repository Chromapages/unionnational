import { Check, X, Info } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

// Define strict types matching the Sanity query
interface PricingTier {
    _id: string;
    name: string;
    slug: { current: string };
    category: string;
    price?: string;
    billingPeriod?: string;
    tagline?: string; // Used sometimes as a subheader
    bestFor?: string; // Column: Best For
    includes?: string; // Column: Includes
    ctaText?: string;
    ctaUrl?: string;
    displayOrder?: number;
}

interface TaxPrepGridProps {
    tiers: PricingTier[];
}

export function TaxPrepGrid({ tiers }: TaxPrepGridProps) {
    if (!tiers || tiers.length === 0) return null;

    // Filter for Individual and Business tiers
    const individualTiers = tiers.filter(t => t.category === "individual");
    const businessTiers = tiers.filter(t => t.category === "business");

    // Helper to render a section
    const renderSection = (title: string, items: PricingTier[]) => {
        if (items.length === 0) return null;

        return (
            <div className="mb-12 last:mb-0">
                <h3 className="text-xl font-bold text-brand-900 font-heading mb-6 pl-4 border-l-4 border-gold-500">{title}</h3>

                <div className="overflow-hidden rounded-xl border border-brand-900/10 shadow-sm bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-50/50 border-b border-brand-900/5">
                                    <th className="py-4 px-6 text-xs font-bold text-brand-900 uppercase tracking-widest w-[25%]">Service Level</th>
                                    <th className="py-4 px-6 text-xs font-bold text-brand-900/60 uppercase tracking-widest w-[30%]">Best For</th>
                                    <th className="py-4 px-6 text-xs font-bold text-brand-900/60 uppercase tracking-widest w-[30%]">Includes</th>
                                    <th className="py-4 px-6 text-xs font-bold text-brand-900/60 uppercase tracking-widest text-right w-[15%]">Pricing</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, idx) => (
                                    <tr
                                        key={item._id}
                                        className={cn(
                                            "group transition-colors hover:bg-brand-50/30",
                                            idx !== items.length - 1 ? "border-b border-brand-900/5" : ""
                                        )}
                                    >
                                        <td className="py-5 px-6">
                                            <span className="font-bold text-brand-900 text-lg block">{item.name}</span>
                                            {item.tagline && (
                                                <span className="text-xs text-brand-900/50 mt-1 block font-medium">{item.tagline}</span>
                                            )}
                                        </td>
                                        <td className="py-5 px-6 text-sm text-brand-900/80 leading-relaxed max-w-xs">
                                            {item.bestFor}
                                        </td>
                                        <td className="py-5 px-6 text-sm text-brand-900/70 leading-relaxed max-w-xs font-medium">
                                            {item.includes}
                                        </td>
                                        <td className="py-5 px-6 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-xl font-bold text-brand-900 font-heading">{item.price}</span>
                                                {item.billingPeriod === 'one-time' ? null : (
                                                    <span className="text-[10px] text-brand-900/40 uppercase tracking-wider font-bold">
                                                        /{item.billingPeriod || 'return'}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-6 mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-900 font-heading mb-3">Compliance & Tax Preparation</h2>
                <p className="text-brand-900/60 max-w-2xl mx-auto">
                    Professional, audit-proof filing services for individuals and businesses who need their returns done right, without the full advisory retainer.
                </p>
            </div>

            {renderSection("Individual Tax Services", individualTiers)}
            {renderSection("Business Tax Services", businessTiers)}

            {/* Included With Every Return Section */}
            <div className="mt-20 pt-16 border-t border-brand-900/10">
                <h3 className="text-sm font-bold text-gold-600 uppercase tracking-[0.2em] text-center mb-10">
                    What&apos;s Included With Every Return
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
                    {[
                        { icon: Icons.ShieldCheck, text: "3-Year Audit Protection" },
                        { icon: Icons.FileCheck, text: "EA-Prepared Return" },
                        { icon: Icons.Lock, text: "Secure Client Portal" },
                        { icon: Icons.BarChart3, text: "Accuracy & Compliance Review" },
                        { icon: Icons.Phone, text: "Post-Filing Support" },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900 mb-4 transition-all duration-300 group-hover:bg-brand-900 group-hover:text-gold-400 group-hover:scale-110">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs md:text-sm font-bold text-brand-900/70 leading-tight px-2 group-hover:text-brand-900 transition-colors">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
