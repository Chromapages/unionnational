import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { X, CheckCircle2, Palmtree, Calendar, Star } from "lucide-react";

export const metadata: Metadata = {
    title: "VIP Booking: Construction Partner Program | Union National Tax",
    description: "Schedule your Discovery Call to secure your Hybrid CFO + COO Partnership.",
};

export default function ConstructionBookingPage() {
    return (
        <div className="min-h-screen bg-brand-900 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">

            {/* Header */}
            <div className="w-full border-b border-brand-800 bg-brand-900/90 backdrop-blur-sm fixed top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="font-heading font-bold text-white text-lg tracking-wide">
                        Union National Tax <span className="text-emerald-500">Construction</span>
                    </span>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                            Step 3 of 3: Booking
                        </span>
                        <Link
                            href="/vsl/construction"
                            className="p-2 rounded-full hover:bg-brand-800 text-brand-400 hover:text-white transition-colors"
                            aria-label="Close booking and return to VSL"
                        >
                            <X className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
                {/* Progress Bar (100%) */}
                <div className="w-full h-1 bg-brand-800">
                    <div className="h-full bg-emerald-500 w-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
            </div>

            <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">

                    {/* Left Column: Value Stack */}
                    <div className="lg:sticky lg:top-32 space-y-8">

                        {/* Approval Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4" />
                            Application Approved
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading leading-tight">
                                Your <span className="text-emerald-500">Priority Access</span> has been Unlocked.
                            </h1>
                            <p className="text-brand-200 text-lg leading-relaxed">
                                Jason has opened his personal calendar for a Discovery Call. We are currently accepting <strong>2 more partners</strong> this month.
                            </p>
                        </div>

                        {/* Travel Incentive Card (Critical) */}
                        <div className="relative group rounded-2xl p-[2px] bg-gradient-to-r from-gold-500/20 via-gold-400/40 to-gold-500/20">
                            <div className="absolute inset-0 bg-gold-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative bg-brand-900 rounded-2xl p-6 md:p-8 overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                                {/* Badge */}
                                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-brand-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-gold-500/20">
                                    Fast Action Bonus
                                </span>

                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand-800 border border-brand-700 flex items-center justify-center shrink-0 text-gold-400">
                                        <Palmtree className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-heading mb-1">
                                            Complimentary 5-Day Luxury Stay
                                        </h3>
                                        <p className="text-sm text-brand-300">
                                            Hawaii, Mexico, or Thailand
                                        </p>
                                    </div>
                                </div>

                                <p className="text-brand-200 text-sm leading-relaxed border-t border-brand-800 pt-4 mt-2">
                                    Book your call today to lock in this incentive using our corporate travel partnerships. <span className="text-gold-400 italic">Valid for new Hybrid CFO clients only.</span>
                                </p>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="space-y-3 pt-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">
                                What happens next:
                            </p>
                            {[
                                "Deep dive into your profit margins & labor costs",
                                "Roadmap to fix job costing errors immediately",
                                "Approval for the Hybrid CFO + COO program"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-brand-800 flex items-center justify-center shrink-0 mt-0.5 border border-brand-700">
                                        <span className="text-emerald-500 text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <span className="text-brand-200 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Right Column: Calendar */}
                    <div className="relative w-full min-h-[700px] h-full">
                        {/* Glass Container */}
                        <div className="w-full h-full bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">

                            {/* Calendar Header inside enclosure */}
                            <div className="bg-brand-800/80 p-4 border-b border-brand-700 flex items-center justify-between">
                                <span className="text-sm font-bold text-white flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-emerald-500" />
                                    Jason Astwood's Calendar
                                </span>
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                </div>
                            </div>

                            {/* GHL Calendar Embed */}
                            <div className="w-full h-[calc(100%-50px)] bg-white overflow-y-auto">
                                <iframe
                                    src="https://link.agent-crm.com/widget/booking/18TmANwweAsRQRF1Gyhr"
                                    style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }}
                                    scrolling="no"
                                    id="18TmANwweAsRQRF1Gyhr_1768594394623"
                                ></iframe>
                                <Script src="https://link.agent-crm.com/js/form_embed.js" strategy="lazyOnload" />
                            </div>

                        </div>
                    </div>

                </div>
            </main>

            {/* Simplified Footer */}
            <footer className="py-8 text-center text-brand-500 text-xs border-t border-brand-800 bg-brand-900 relative z-10">
                <p>&copy; {new Date().getFullYear()} Union National Tax. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
