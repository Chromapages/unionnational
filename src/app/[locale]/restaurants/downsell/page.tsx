import Link from "next/link";
import { Check, X } from "lucide-react";

export default async function RestaurantDownsellPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-orange-500 selection:text-slate-900 flex flex-col relative overflow-hidden">

            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header - Simplified */}
            <div className="w-full h-20 flex items-center justify-between px-6 border-b border-slate-900 relative z-20 bg-slate-950/50 backdrop-blur-sm">
                <span className="font-heading font-bold text-white text-lg tracking-wide opacity-80">
                    Union National Tax <span className="text-orange-500">Restaurant</span>
                </span>
                <Link
                    href="/vsl/restaurants"
                    className="p-2 rounded-full hover:bg-slate-900 text-slate-500 hover:text-white transition-colors"
                    aria-label="Close and return to VSL"
                >
                    <X className="w-6 h-6" />
                </Link>
            </div>

            <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 text-center">

                <div className="max-w-xl w-full space-y-12">

                    {/* Headline Group */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading leading-tight">
                            You might not need a CFO just yet...
                        </h1>
                        <p className="text-orange-400 text-xl md:text-2xl font-medium">
                            ...but you still need to stop overpaying the IRS.
                        </p>
                    </div>

                    {/* Offer Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">

                        {/* Glow effect on card */}
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="space-y-8 relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-white font-heading mb-2">
                                    The Restaurant Tax Saver Bundle
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    Everything you need to keep your kitchen compliant and profitable without the CFO price tag.
                                </p>
                            </div>

                            <div className="flex items-end justify-center gap-2 pb-4 border-b border-slate-800">
                                <span className="text-5xl font-bold text-white tracking-tight">$497</span>
                                <span className="text-slate-500 text-lg mb-1 font-medium">/ year</span>
                            </div>

                            <ul className="space-y-4 text-left mx-auto max-w-xs">
                                {[
                                    "Annual Business Filing",
                                    "Quarterly Tax Estimates",
                                    "Audit Guard Protection"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-200">
                                        <div className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3" strokeWidth={3} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/contact?package=restaurant-tax-saver"
                                className="block w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-lg shadow-lg shadow-orange-900/20 hover:shadow-orange-500/20 transition-all transform hover:-translate-y-1"
                            >
                                Get Started with Tax Prep
                            </Link>
                        </div>
                    </div>

                    {/* Micro-Copy */}
                    <p className="text-slate-500 text-sm animate-in fade-in duration-1000 delay-500">
                        When you hit $1M in revenue, come back and we'll upgrade you to the Kitchen Command Center package.
                    </p>

                </div>

            </main>

            <footer className="py-6 text-center text-slate-600 text-xs">
                &copy; {new Date().getFullYear()} Union National Tax.
            </footer>
        </div>
    );
}
