"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const items = [
    "Your schedule is full but the profit margin feels thin",
    "Jobs seem to always run over in labor and materials",
    "You invoice regularly but cash still feels tight",
    "You do not know which jobs actually made money",
    "Change orders get missed or forgotten",
    "Estimates are based on guesswork more than data",
    "Payroll hits before customers pay their invoices",
    "You are working more hours but the business still feels chaotic",
];

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/d23b0447-6fb5-4a12-98e4-bffbf7aafafe";

export function ContractorChecklist() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleGetChecklist = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: "profit-blueprint-checklist",
                    checklist_items: items,
                    timestamp: new Date().toISOString(),
                }),
            });
            if (response.ok) {
                setSubmitted(true);
            }
        } catch (err) {
            console.error("Checklist webhook error:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <RevealOnScroll>
            <section className="py-20 lg:py-24 bg-brand-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-6">
                            <AlertCircle size={14} /> Sound Familiar?
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
                            Does This Sound Like Your Business?
                        </h2>
                    </div>

                    <RevealOnScroll delay={200}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                    </div>
                                    <span className="text-white/90 text-sm leading-relaxed sm:leading-loose font-light">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={400}>
                        <div className="mt-12 text-center space-y-6">
                            <p className="text-slate-400 text-base italic max-w-2xl mx-auto">
                                If you nodded along to even two of these, your construction company is likely losing more profit than you realize — and it is not because you cannot build.
                            </p>

                            {submitted ? (
                                <div className="inline-flex items-center gap-2 px-6 py-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-bold">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Check your inbox — the checklist is on its way!
                                </div>
                            ) : (
                                <button
                                    onClick={handleGetChecklist}
                                    disabled={submitting}
                                    className={cn(
                                        "inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 text-brand-900 font-black text-sm uppercase tracking-widest rounded-xl shadow-[0_4px_12px_rgba(212,175,55,0.25)] hover:bg-gold-400 active:scale-[0.98] transition-all",
                                        submitting && "opacity-70 cursor-not-allowed"
                                    )}
                                >
                                    {submitting ? "Sending..." : "Get the Free Checklist"}
                                    <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </RevealOnScroll>
    );
}