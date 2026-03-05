"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, ShieldAlert } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function TravelIncentiveDisclaimer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lock scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    return (
        <div className="w-full bg-brand-950 py-12 md:py-16 border-y border-white/10 shadow-2xl relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 text-center md:text-left">
                        <div className="mt-1 flex-shrink-0">
                            <Info className="w-6 h-6 text-gold-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-5xl">
                                <span className="font-bold text-white mr-2 italic underline decoration-gold-500 underline-offset-4">Travel Incentive Disclaimer:</span>
                                Travel incentives are promotional bonuses provided by a third-party travel provider and are not owned or operated by Union National Tax, LLC. Incentives are subject to activation, availability, and separate terms and conditions. Taxes, fees, and incidental expenses may apply.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-6 text-sm font-bold text-gold-500 uppercase tracking-[0.2em] hover:text-gold-400 transition-colors border-b-2 border-gold-500/40 pb-1"
                            >
                                Read Full Disclosure
                            </button>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Disclosure Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-brand-950/80 backdrop-blur-md z-[100] cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 pointer-events-none"
                        >
                            <div
                                className="w-full max-w-2xl bg-brand-900 border border-white/10 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                                            <ShieldAlert className="w-5 h-5 text-gold-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white font-heading">Travel Incentive Disclosure</h3>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="px-8 py-8 overflow-y-auto custom-scrollbar">
                                    <div className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base">
                                        <p>
                                            Certain promotions offered by Union National Tax, LLC may include access to a private hotel incentive as a third-party marketing bonus. This incentive is provided by an independent travel promotion provider and is not owned, operated, or administered by Union National Tax, LLC.
                                        </p>
                                        <p>
                                            This incentive is not a free hotel stay and does not constitute a guaranteed reservation. All travel incentives are subject to availability, activation requirements, blackout dates, and the terms and conditions of the travel provider.
                                        </p>
                                        <p className="p-4 bg-white/5 border-l-2 border-gold-500 rounded-r-md italic">
                                            Recipients are responsible for all applicable taxes, resort fees, transportation, meals, and incidental expenses unless otherwise expressly stated by the provider.
                                        </p>
                                        <p>
                                            Union National Tax, LLC does not make any representations or warranties regarding hotel accommodations, travel availability, or services. Participation in or redemption of any travel incentive is voluntary and governed solely by the provider’s terms.
                                        </p>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="px-8 py-6 border-t border-white/5 bg-white/[0.01] flex justify-end">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 bg-gold-500 text-brand-900 font-bold rounded-md hover:bg-gold-600 transition-colors"
                                    >
                                        I Understand
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
