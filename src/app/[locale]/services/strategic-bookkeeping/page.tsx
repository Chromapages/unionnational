import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, Calculator, ArrowRight, ShieldCheck, Search } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Strategic Bookkeeping | Union National Tax",
        description: "Accurate, IRS-compliant bookkeeping designed for financial visibility. We don't just record numbers; we organize them for better business decisions.",
    };
}

export default async function StrategicBookkeepingPage() {
    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            
            <main id="main-content" className="flex-1">
                {/* Hero */}
                <section className="bg-brand-900 px-6 py-20 lg:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gold-500/5 opacity-30" />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="max-w-3xl">
                            <RevealOnScroll>
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-500 block mb-6">Financial Visibility</span>
                                <h1 className="text-5xl lg:text-7xl font-bold font-heading text-white leading-[0.9] tracking-tighter mb-8">
                                    Strategic <br /><span className="text-gold-500">Bookkeeping.</span>
                                </h1>
                                <p className="text-xl text-brand-50/70 mb-10 leading-relaxed font-light">
                                    Most bookkeeping is done for the IRS. Ours is done for <span className="text-white font-medium italic">you</span>. We provide the clean, categorized data required to make strategic decisions and identify tax savings.
                                </p>
                                <Link 
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-brand-900 font-bold rounded-xl hover:bg-gold-600 transition-all text-lg"
                                >
                                    Get a Bookkeeping Audit <ArrowRight size={20} />
                                </Link>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Content Grid */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-8 space-y-16">
                                <RevealOnScroll>
                                    <h2 className="text-3xl font-bold font-heading text-brand-900 mb-6 tracking-tighter">Why "Compliance-Only" Bookkeeping Fails</h2>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                        If your books are only updated once a year, you're flying blind. You can't track margins, you can't forecast cash flow, and you definitely can't plan for taxes. Our strategic approach ensures your data is a tool, not a burden.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { title: "Monthly Reconciliation", icon: Search, desc: "Always know exactly where your cash actually is." },
                                            { title: "Strategic Categorization", icon: Search, desc: "Organizing expenses to maximize legal tax write-offs." },
                                            { title: "Financial Reporting", icon: Calculator, desc: "Clean P&L and Balance Sheets delivered every month." },
                                            { title: "IRS-Ready Documentation", icon: ShieldCheck, desc: "Building a bulletproof trail in case of an audit." }
                                        ].map((item, i) => (
                                            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 italic transition-all hover:border-gold-500/20 hover:bg-white group">
                                                <div className="w-10 h-10 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-brand-900 transition-colors">
                                                    {item.icon && <item.icon size={20} />}
                                                </div>
                                                <h4 className="font-bold text-brand-900 mb-2 font-heading tracking-tighter">{item.title}</h4>
                                                <p className="text-sm text-slate-500 leading-relaxed not-italic">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll>
                                    <h2 className="text-3xl font-bold font-heading text-brand-900 mb-6 tracking-tighter">The Union National Standard</h2>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                        We integrate your bookkeeping directly with your tax strategy. This means we aren't just recording what happened; we're flagging opportunities to save as they occur.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "Bank & Credit Card Reconciliation",
                                            "General Ledger Maintenance",
                                            "Accounts Payable/Receivable Support",
                                            "Custom Financial Reporting",
                                            "Sales Tax Compliance Support",
                                            "1099 Vendor Management"
                                        ].map((li, i) => (
                                            <li key={i} className="flex gap-4 items-center text-slate-700">
                                                <CheckCircle2 size={20} className="text-gold-500 shrink-0" />
                                                <span>{li}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </RevealOnScroll>
                            </div>

                            {/* Sidebar CTA */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-28 bg-brand-950 p-8 rounded-3xl border border-gold-500/20 shadow-2xl">
                                    <h3 className="text-2xl font-bold text-white mb-6 font-heading tracking-tighter">Start with Strategy</h3>
                                    <p className="text-slate-300 mb-8 text-sm leading-relaxed">
                                        Bookkeeping is the foundation of every major tax-saving move. Let's get yours right.
                                    </p>
                                    <Link 
                                        href="/contact"
                                        className="w-full flex items-center justify-center gap-3 py-4 bg-gold-500 text-brand-900 font-bold rounded-xl hover:bg-gold-600 transition-all"
                                    >
                                        Schedule Consultation
                                    </Link>
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Recommended For</p>
                                        <p className="text-white text-sm font-medium mt-1">Growth-stage businesses with $250k+ revenue.</p>
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
