"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PricingTier } from "./PricingSection";

interface OptionalServicesProps {
    services: PricingTier[];
}

export function OptionalServices({ services }: OptionalServicesProps) {
    if (!services || services.length === 0) return null;

    return (
        <section className="mb-24 max-w-4xl mx-auto">
            <RevealOnScroll>
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-brand-900 font-heading mb-2">Optional Services</h3>
                    <p className="text-brand-900/60 font-sans">Specialized services quoted as needed based on complexity.</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-2 bg-slate-50 p-4 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">
                        <div>Service</div>
                        <div className="text-right">Typical Range</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {services.map((service) => (
                            <div key={service._id} className="grid grid-cols-2 p-5 hover:bg-slate-50/50 transition-colors">
                                <div className="font-medium text-brand-900 font-sans">{service.name}</div>
                                <div className="text-right text-slate-600 font-sans font-medium">{service.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}
