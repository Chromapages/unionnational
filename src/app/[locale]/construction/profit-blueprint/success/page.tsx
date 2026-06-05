import { Metadata } from "next";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/shop/CartSidebar";
import { CallBookingEmbed } from "@/components/construction/profit-blueprint/CallBookingEmbed";

export const metadata: Metadata = {
    title: "Order Confirmed — Money-Making Blueprint | Union National Tax",
    description: "Your copy of The Money-Making Blueprint for Construction Companies is on the way. Book your free 15-minute strategy call to start implementing.",
    robots: { index: false, follow: false },
};

// TODO: wire this up to the Stripe checkout success_url so customers land here after payment.
// The success page should ideally receive the order details via Stripe session metadata,
// but for now it's a generic thank-you page with a calendar embed.
export default function BlueprintSuccessPage() {
    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased overflow-x-hidden">
            <main id="main-content" className="flex-1">
                {/* Confirmation Hero */}
                <section className="bg-brand-900 relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03]" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 mb-6">
                            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                        </div>
                        <span className="inline-block px-4 py-2 rounded-full bg-gold-500/10 border border-gold-400/20 mb-6 text-[10px] font-bold uppercase tracking-widest text-gold-400">
                            Order Confirmed
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.05] mb-6 tracking-tight uppercase">
                            You&apos;ve Got the Blueprint.
                            <br />
                            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic font-black pr-4 pb-1">
                                Now Use It.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto font-light">
                            Most contractors read the book and never implement a single system. The ones who book this call start seeing margin changes in 30 days.
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                            <Mail className="w-4 h-4" />
                            <span>Your download link and shipping confirmation are in your inbox.</span>
                        </div>
                    </div>
                </section>

                {/* Call Booking Section */}
                <section className="py-16 lg:py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <CallBookingEmbed />
                    </div>
                </section>

                {/* What Happens Next */}
                <section className="py-16 lg:py-24 bg-[#0B1210] border-y border-brand-900/40">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase tracking-tight text-center mb-12">
                            What Happens on the Call
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    num: "01",
                                    title: "We audit your numbers",
                                    body: "You tell us your revenue, overhead, and current margin. We do the math live and show you exactly where profit is going.",
                                },
                                {
                                    num: "02",
                                    title: "We identify the biggest leak",
                                    body: "In most cases it's one of four things: job costing, cash flow timing, estimating discipline, or overhead allocation. We pinpoint yours.",
                                },
                                {
                                    num: "03",
                                    title: "You leave with a 30-day plan",
                                    body: "No pitch. No upsell. You leave the call with the single highest-leverage system to implement in the next 30 days, and a clear next step.",
                                },
                            ].map((step) => (
                                <div key={step.num} className="bg-[#131E1C] border border-brand-900/40 rounded-2xl p-6">
                                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 font-black text-base mb-4">
                                        {step.num}
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Back to Blueprint Page */}
                <section className="py-12 bg-white">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link
                            href="/construction/profit-blueprint"
                            className="inline-flex items-center gap-2 text-sm font-bold text-gold-700 hover:text-gold-800"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Back to the Blueprint page
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
            <CartSidebar />
        </div>
    );
}
