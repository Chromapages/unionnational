"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ShieldCheck, Plane } from "lucide-react";

export function PricingTrustSection() {
    return (
        <section className="max-w-4xl mx-auto pt-12 border-t border-slate-200">
            <RevealOnScroll>
                {/* Confidence Statement */}
                <div className="text-center mb-16">
                    <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-heading text-brand-900 font-bold mb-4 leading-normal">
                        "We don’t charge by the hour or by the form.<br />
                        We charge for accuracy, protection, and peace of mind."
                    </blockquote>
                    <p className="text-brand-900/50 font-sans font-medium uppercase tracking-widest text-xs">Our Philosophy on Value</p>
                </div>

                {/* What's Included Global */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-6">
                    <div className="text-center p-6 bg-slate-50 rounded-xl">
                        <div className="font-bold text-brand-900 mb-2">3-Year Audit Protection</div>
                        <p className="text-xs text-slate-500">Included with every return for your peace of mind.</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-xl">
                        <div className="font-bold text-brand-900 mb-2">EA-Prepared Returns</div>
                        <p className="text-xs text-slate-500">Expertise from IRS Enrolled Agents you can trust.</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-xl">
                        <div className="font-bold text-brand-900 mb-2">Accuracy Review</div>
                        <p className="text-xs text-slate-500">Rigorous compliance checks before filing.</p>
                    </div>
                </div>

                {/* Travel Disclosure */}
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-[10px] text-slate-400 leading-relaxed font-sans text-justify">
                    <div className="flex items-center gap-2 mb-2 text-slate-500 font-bold uppercase tracking-wider">
                        <Plane className="w-3 h-3" />
                        Travel Incentive Disclosure
                    </div>
                    <p>
                        Certain promotions offered by Union National Tax, LLC may include access to a private hotel incentive as a third-party marketing bonus.
                        This incentive is provided by an independent travel promotion provider and is not owned, operated, or administered by Union National Tax, LLC.
                        This incentive is not a free hotel stay and does not constitute a guaranteed reservation. All travel incentives are subject to availability,
                        activation requirements, blackout dates, and the terms and conditions of the travel provider. Recipients are responsible for all applicable taxes,
                        resort fees, transportation, meals, and incidental expenses unless otherwise expressly stated by the provider. Participation is voluntary.
                    </p>
                </div>
            </RevealOnScroll>
        </section>
    );
}
