import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, Building2, ArrowRight, ShieldCheck, Scale, TrendingUp } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "New Business Formation | Union National Tax",
        description: "Start with a strategic foundation. We handle entity selection (LLC, S-Corp, C-Corp) and filings to ensure your new business is optimized for tax savings from day one.",
    };
}

export default async function BusinessFormationPage() {
    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            
            <main className="flex-1">
                {/* Hero */}
                <section className="bg-brand-900 px-6 py-20 lg:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gold-500/5 opacity-30" />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="max-w-3xl">
                            <RevealOnScroll>
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-500 block mb-6">Strategic Foundations</span>
                                <h1 className="text-5xl lg:text-7xl font-bold font-heading text-white leading-[0.9] tracking-tighter mb-8">
                                    Entity <br /><span className="text-gold-500">Formation.</span>
                                </h1>
                                <p className="text-xl text-brand-50/70 mb-10 leading-relaxed font-light">
                                    Don't just "get an LLC." Build a foundation that protects your assets and minimizes your tax liability from the very first dollar you earn.
                                </p>
                                <Link 
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-brand-900 font-bold rounded-xl hover:bg-gold-600 transition-all text-lg"
                                >
                                    Foundational Strategy Call <ArrowRight size={20} />
                                </Link>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-8 space-y-16">
                                <RevealOnScroll>
                                    <h2 className="text-3xl font-bold font-heading text-brand-900 mb-6">Strategy Before Paperwork</h2>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                        Choosing the wrong entity structure can cost you thousands in unnecessary taxes and legal exposure. We analyze your goals, your risk, and your projected income to recommend the structure that serves your long-term wealth.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { title: "LLC Formation", icon: Building2, desc: "The standard for liability protection and flexible tax options." },
                                            { title: "S-Corp Election", icon: Scale, desc: "Maximizing self-employment tax savings for profitable owners." },
                                            { title: "Operating Agreements", icon: ShieldCheck, desc: "Custom governance documents to protect partners and owners." },
                                            { title: "EIN & State Registration", icon: CheckCircle2, desc: "Handling the bureaucratic heavy lifting so you can focus on building." }
                                        ].map((item, i) => (
                                            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-gold-500/10 transition-colors">
                                                <div className="w-10 h-10 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center mb-6">
                                                    <item.icon size={20} />
                                                </div>
                                                <h4 className="font-bold text-brand-900 mb-2">{item.title}</h4>
                                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll>
                                    <h2 className="text-3xl font-bold font-heading text-brand-900 mb-6">The Road to Scaling</h2>
                                    <div className="p-8 md:p-12 rounded-[2rem] bg-brand-950 text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <TrendingUp size={100} />
                                        </div>
                                        <p className="text-xl font-light leading-relaxed mb-8 relative z-10">
                                            "A business built on a weak structure will eventually outgrow its safety. We ensure your formation supports your 5-year vision, not just your first invoice."
                                        </p>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-10 h-px bg-gold-500" />
                                            <span className="text-gold-500 font-bold uppercase tracking-widest text-xs">Union National Strategy</span>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </div>

                            <div className="lg:col-span-4">
                                <div className="sticky top-28 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                                    <h3 className="text-2xl font-bold text-brand-900 mb-6 font-heading">Ready to Launch?</h3>
                                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                                        Don't guess with your foundation. Book a call to discuss the best entity structure for your new venture.
                                    </p>
                                    <Link 
                                        href="/contact"
                                        className="w-full flex items-center justify-center gap-3 py-4 bg-gold-500 text-brand-900 font-bold rounded-xl hover:bg-gold-600 transition-all font-heading"
                                    >
                                        Start Your Formation
                                    </Link>
                                    <div className="mt-8 flex items-center gap-2 justify-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                        <ShieldCheck size={12} className="text-gold-500" />
                                        Strategy First Guarantee
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
