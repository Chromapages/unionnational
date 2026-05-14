import { Metadata } from "next";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { TaxHealthScore } from "@/components/resources/lead-magnets/TaxHealthScore";
import {
    CheckCircle2,
    ShieldCheck,
    Target,
    TrendingUp,
    Building2,
    ChevronDown,
    ArrowRight,
    Activity
} from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    const path = "/proactive-cfo-assessment";
    const canonicalUrl = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

    return {
        title: "Proactive CFO Assessment | Union National Tax",
        description: "Discover your Proactive CFO Assessment score and see where cash leaks, entity issues, and planning gaps may be costing your business money.",
        openGraph: {
            images: [`${baseUrl}/images/og-construction.png`],
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}${path}`,
                es: `${baseUrl}/es${path}`,
            },
        },
    };
}

export default async function ProactiveCFOAssessmentPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Analyze and Improve Your Business Financial Health",
        "description": "A step-by-step guide to discovering your financial health score and identifying where your business may be losing money through poor tax planning and cash flow gaps.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Complete the Proactive CFO Assessment",
                "text": "Answer 5 questions about your revenue, entity structure, tax planning, expense review, and deduction maximization."
            },
            {
                "@type": "HowToStep",
                "name": "Calculate Your Financial Health Score",
                "text": "Our algorithm evaluates your responses to generate a financial health percentage score with category labels."
            },
            {
                "@type": "HowToStep",
                "name": "Identify Financial Gaps",
                "text": "Review your results to see specifically where your business may be losing money through unclear numbers, entity issues, or planning gaps."
            },
            {
                "@type": "HowToStep",
                "name": "Get CFO-Level Clarity",
                "text": "Connect with our team to discuss your results and learn what proactive CFO support can do for your business."
            }
        ]
    };

    return (
        <main className="min-h-screen bg-surface flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeaderWrapper />

            <div className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-brand-950">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold-500 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-brand-500 rounded-full blur-[100px]" />
                    </div>

                    <div className="container relative z-10 px-6 mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-fade-in">
                            <Activity size={14} /> Financial Health Analysis
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white font-heading tracking-tighter mb-8 leading-[0.9] uppercase italic animate-slide-up">
                            Stop Guessing Your <span className="text-gold-500">Numbers</span>. <br />
                            Start Running Like a CFO.
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed animate-slide-up delay-100">
                            The Proactive CFO Assessment: Discover your financial health score and uncover exactly where cash leaks, entity issues, and planning gaps may be costing you money.
                        </p>

                        <div className="flex justify-center animate-bounce-subtle">
                            <ChevronDown className="text-gold-500 opacity-50" size={32} />
                        </div>
                    </div>

                    {/* Trust Signals */}
                    <div className="mt-16 border-t border-white/5 bg-white/5 py-8">
                        <div className="container px-6 mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                {[
                                    "Licensed CPAs",
                                    "Enrolled Agents",
                                    "Fractional CFO Services",
                                    "Utah-Based Team"
                                ].map((signal) => (
                                    <span key={signal} className="text-[10px] font-bold text-white uppercase tracking-[0.2em] whitespace-nowrap">
                                        {signal}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Assessment Section */}
                <section id="assessment" className="py-20 lg:py-32 -mt-16 lg:-mt-24 relative z-20">
                    <div className="container px-6 mx-auto">
                        <TaxHealthScore />
                    </div>
                </section>

                {/* Is This For You Section */}
                <section className="py-24 bg-white">
                    <div className="container px-6 mx-auto">
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl font-bold text-brand-900 font-heading tracking-tight uppercase">
                                    Is This Assessment <br /> Right For You?
                                </h2>
                                <p className="text-brand-900/60 text-lg leading-relaxed font-light italic">
                                    &quot;Most business owners are excellent at their trade but struggle with the numbers. We&apos;re here to bridge that gap.&quot;
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "You&apos;re doing $500k+ in revenue but your bank balance doesn&apos;t reflect it.",
                                        "You feel unclear on your numbers and want real cash flow visibility.",
                                        "You&apos;re tired of &apos;Tax Season Surprises&apos; that wipe out your cash reserves.",
                                        "You want to scale but feel like you&apos;re losing control of your margins."
                                    ].map((point, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <CheckCircle2 className="text-gold-500 shrink-0 mt-1" size={20} />
                                            <p className="text-brand-900 font-medium">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative aspect-square bg-slate-50 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                                <div className="absolute inset-0 bg-brand-900/5 group-hover:bg-brand-900/0 transition-all" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Building2 size={120} className="text-brand-900/10 group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-slate-100 shadow-xl">
                                    <p className="text-brand-900 font-black text-sm uppercase tracking-widest mb-2">Expert Strategy</p>
                                    <p className="text-brand-900/60 text-xs italic leading-relaxed">Built for business owners who want more than just a tax preparer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What&apos;s Inside Section */}
                <section className="py-24 bg-slate-50 border-y border-slate-100">
                    <div className="container px-6 mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold text-brand-900 font-heading tracking-tight uppercase mb-4">
                                What The Assessment Reveals
                            </h2>
                            <p className="text-brand-900/50 uppercase tracking-widest font-black text-[10px]">Five critical areas that determine your financial health.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Revenue Clarity",
                                    desc: "Understand where your revenue sits relative to industry benchmarks and growth potential.",
                                    icon: TrendingUp
                                },
                                {
                                    title: "Entity Optimization",
                                    desc: "Evaluate whether your current business structure is serving you or holding you back.",
                                    icon: ShieldCheck
                                },
                                {
                                    title: "Tax Planning Gap",
                                    desc: "Discover if you have a proactive tax strategy or if you&apos;re just filing when due.",
                                    icon: Target
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                                    <item.icon className="text-gold-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                                    <h3 className="text-xl font-bold text-brand-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                                    <p className="text-brand-900/60 text-sm leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-white">
                    <div className="container px-6 mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold text-brand-900 font-heading tracking-tight uppercase mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                { q: "How long does the assessment take?", a: "It takes less than 3 minutes. The questions are designed to be answered from your current knowledge of your business." },
                                { q: "Is my financial data secure?", a: "Absolutely. We use enterprise-grade encryption. Your results are only shared with our senior strategy team." },
                                { q: "Do I have to pay for the results?", a: "No. The preliminary score and analysis are 100% free as part of our outreach to business owners who want more control over their numbers." }
                            ].map((faq, i) => (
                                <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                                    <h3 className="font-bold text-brand-900 uppercase tracking-tight text-sm flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gold-500 text-brand-900 flex items-center justify-center text-[10px] font-black">Q</div>
                                        {faq.q}
                                    </h3>
                                    <p className="text-brand-900/60 text-sm italic font-light pl-9">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA Strip */}
                <section className="py-20 bg-brand-900 text-white text-center">
                    <div className="container px-6 mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-tighter mb-8 italic">
                            Don&apos;t leave your <span className="text-gold-500">cash flow</span> to chance.
                        </h2>
                        <Link
                            href="#assessment"
                            className="bg-gold-500 text-brand-950 font-black px-12 py-5 rounded-2xl hover:bg-white transition-all text-sm uppercase tracking-widest inline-flex items-center gap-4"
                        >
                            Start Your Free Assessment <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}