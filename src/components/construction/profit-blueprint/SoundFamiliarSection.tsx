"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/d23b0447-6fb5-4a12-98e4-bffbf7aafafe";

export function SoundFamiliarSection() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [phone, setPhone] = useState("");

    const handleGetChecklist = async () => {
        if (submitting || !phone.trim()) return;
        setSubmitting(true);
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: "profit-blueprint-sound-familiar",
                    phone,
                    timestamp: new Date().toISOString(),
                }),
            });
            if (response.ok) {
                setSubmitted(true);
            }
        } catch (err) {
            console.error("Webhook error:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-20 lg:py-24 bg-[#0B1210] border-y border-brand-900/40 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.02]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll>
                    <div className="mb-6">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-500">
                            Sound Familiar?
                        </span>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={100}>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.05] mb-8 uppercase">
                        <span className="block text-white">You built the business.</span>
                        <span className="block text-gold-500 mt-1">Now it&apos;s running you.</span>
                    </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                    <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-light mb-8">
                        <p>
                            Most construction company owners are some of the <strong className="font-bold text-white">hardest-working people on the planet</strong> — and yet they&apos;re barely breaking even. They&apos;re drowning in unpaid invoices, low-margin jobs, unreliable crews, and a back-office that&apos;s one bad month away from disaster.
                        </p>
                        <p>
                            It&apos;s not a work ethic problem. It&apos;s a <strong className="font-bold text-white">systems problem</strong>.
                        </p>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={300}>
                    <div className="bg-[#131E1C] border-l-4 border-gold-500 p-6 sm:p-8 rounded-r-2xl mb-8 relative">
                        <p className="text-white font-semibold text-base sm:text-lg italic leading-relaxed">
                            &ldquo;The average construction company operates on a 3&ndash;5% net margin. With the right systems in place, that number should be 15&ndash;20%. The gap? Leadership, structure, and knowing your numbers.&rdquo;
                        </p>
                        <p className="text-slate-400 text-sm mt-3 font-medium">
                            &mdash; Jason Astwood, EA
                        </p>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={400}>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                        That&apos;s exactly what <em className="italic text-white">The Money-Making Blueprint for Construction Companies</em> was written to fix. This isn&apos;t theory. It&apos;s the exact framework Jason Astwood has used with hundreds of construction businesses to <strong className="font-bold text-white">plug the leaks, build real profit, and create a company that runs without the owner being on-site 24/7.</strong>
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={500}>
                    <div className="mt-10 max-w-md mx-auto">
                        {submitted ? (
                            <div className="flex items-center gap-2 px-6 py-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-bold justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Check your inbox — the checklist is on its way!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                                    />
                                </div>
                                <button
                                    onClick={handleGetChecklist}
                                    disabled={submitting || !phone.trim()}
                                    className={cn(
                                        "w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 text-brand-900 font-black text-sm uppercase tracking-widest rounded-xl shadow-[0_4px_12px_rgba(212,175,55,0.25)] hover:bg-gold-400 active:scale-[0.98] transition-all",
                                        (submitting || !phone.trim()) && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {submitting ? "Sending..." : "Get the Free Checklist"}
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}