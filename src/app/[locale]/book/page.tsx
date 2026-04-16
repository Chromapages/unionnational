import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingCalendar } from "@/components/booking/BookingCalendar";

export const metadata = {
    title: "Book Your Tax Strategy Call | Union National Tax",
    description: "Schedule your complimentary Tax Strategy Session. Specialized advisory for growth-minded business owners who want to keep more of what they earn.",
};

export default async function BookPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    return (
        <main id="main-content" className="min-h-screen bg-white selection:bg-gold-500/30">
            <HeaderWrapper />

            {/* Hero Header */}
            <section className="pt-32 pb-16 bg-brand-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/grid-white.svg')] opacity-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Strategy Call Selection
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading tracking-tighter leading-[1.1] mb-6 max-w-4xl mx-auto">
                        Secure Your <span className="text-gold-500">Tax Strategy</span> Session
                    </h1>
                    <p className="text-brand-100/70 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
                        Join our advisory-first firm to uncover hidden tax savings and optimize your entity structure for maximum growth.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        
                        {/* Left Column: Context & Qualification */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-brand-900 font-heading tracking-tight mb-8">
                                    Why This Strategy Session?
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: ShieldCheck,
                                            title: "Structural Audit",
                                            desc: "We analyze your current entity setup to identify if an S-Corp election could save you thousands."
                                        },
                                        {
                                            icon: Zap,
                                            title: "Proactive Planning",
                                            desc: "Moving beyond compliance into strategic advisory that impacts your bottom line immediately."
                                        },
                                        {
                                            icon: Zap,
                                            title: "Advisory Roadmap",
                                            desc: "A clear picture of your tax liability and a plan to reduce it systematically."
                                        }
                                    ].map((feature, i) => (
                                        <div key={i} className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-gold-500/30 transition-all group">
                                            <div className="w-12 h-12 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-gold-600 shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                                                <feature.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-brand-900 mb-1">{feature.title}</h3>
                                                <p className="text-sm text-brand-900/60 leading-relaxed">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-brand-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        Who this is for
                                    </h4>
                                    <ul className="text-sm text-brand-900/70 space-y-2">
                                        <li>• Business owners making $100k+</li>
                                        <li>• S-Corp curious entrepreneurs</li>
                                        <li>• High-growth service firms</li>
                                        <li>• Construction & Restaurant owners</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-brand-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                        <XCircle className="w-4 h-4 text-rose-500" />
                                        Who this is NOT for
                                    </h4>
                                    <ul className="text-sm text-brand-900/70 space-y-2">
                                        <li>• Individuals with W2 income only</li>
                                        <li>• Looking for the cheapest filing</li>
                                        <li>• Reactive, tax-season only minds</li>
                                        <li>• DIY bookkeeping enthusiasts</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Booking Widget */}
                        <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-brand-900 shadow-2xl relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center shadow-lg z-20">
                                <TrendingUp className="text-brand-900 w-6 h-6" />
                            </div>

                            <div className="p-1 min-h-[600px] flex flex-col">
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                                    <div>
                                        <h3 className="font-bold text-brand-900 leading-none">Select a Date & Time</h3>
                                        <p className="text-xs text-brand-900/50 mt-1">Complimentary 15-Min Strategy Diagnostic</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-900 text-white rounded-lg text-xs font-bold tracking-tight">
                                        <span className="relative flex h-2 w-2">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                                        </span>
                                        Booking Live
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <BookingCalendar />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
