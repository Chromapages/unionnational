"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function SoundFamiliarSection() {
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

                            </div>
        </section>
    );
}