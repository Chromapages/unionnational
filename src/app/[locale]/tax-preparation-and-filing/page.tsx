import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, FileText, ArrowRight, ShieldCheck, Scale } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    const path = "/tax-preparation-and-filing";
    const canonicalUrl = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

    return {
        title: "Tax Filing & Preparation | Union National Tax",
        description: "Professional, accurate, and optimized tax filing for businesses and high-income earners. We ensure you're compliant while capturing every strategic advantage.",
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}${path}`,
                es: `${baseUrl}/es${path}`,
            },
        },
    };
}

export default async function TaxFilingPage() {
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
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-500 block mb-6">Compliance Excellence</span>
                                <h1 className="text-5xl lg:text-7xl font-bold font-heading text-white leading-[0.9] tracking-tighter mb-8">
                                    Precision <br /><span className="text-gold-500">Tax Filing.</span>
                                </h1>
                                <p className="text-xl text-brand-50/70 mb-10 leading-relaxed font-light">
                                    Filing is the execution of a well-built strategy. We handle the complexity of federal and multi-state filings with professional-grade accuracy, ensuring you stay in the good graces of the IRS.
                                </p>
                                <Link 
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-brand-900 font-bold rounded-xl hover:bg-gold-600 transition-all text-lg"
                                >
                                    Filing Strategy Consultation <ArrowRight size={20} />
                                </Link>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-8 space-y-16">
                                <RevealOnScroll>
                                    <h2 className="text-3xl font-bold font-heading text-brand-900 mb-6 tracking-tighter">Audit-Ready Accuracy</h2>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                    We don&apos;t just &quot;plug and play&quot; numbers. Every return is reviewed for consistency, compliance, and strategic alignment. We represent you before the IRS, meaning we stand behind every number we file.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { title: "Business Tax Returns", icon: FileText, desc: "Form 1120, 1120-S, and 1065 filings for partnerships and corporations." },
                                            { title: "Multi-State Compliance", icon: Scale, desc: "Navigating nexus and apportionment for businesses operating across lines." },
                                            { title: "Individual Returns", icon: CheckCircle2, desc: "Specialized 1040 filings for high-net-worth business owners." },
                                            { title: "Audit Representation", icon: ShieldCheck, desc: "EA-credentialed representation to protect your interests." }
                                        ].map((item, i) => (
                                            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-gold-500/10 transition-colors">
                                                <div className="w-10 h-10 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center mb-6">
                                                    <item.icon size={20} />
                                                </div>
                                                <h4 className="font-bold text-brand-900 mb-2 font-heading tracking-tighter">{item.title}</h4>
                                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll>
                                    <h2 className="text-3xl font-bold font-heading text-brand-900 mb-6 tracking-tighter">What to Expect</h2>
                                    <div className="space-y-6">
                                        {[
                                            "Secure digital document portal for easy uploads.",
                                            "Professional review meeting to explain your results.",
                                            "Year-round access to your documents in our 'Digital Vault'.",
                                            "E-filing for rapid processing and confirmation."
                                        ].map((li, i) => (
                                            <div key={i} className="flex gap-4 p-5 rounded-2xl border border-slate-100 items-center">
                                                <div className="w-8 h-8 rounded-full bg-brand-950 flex items-center justify-center text-gold-500 font-bold shrink-0">
                                                    {i + 1}
                                                </div>
                                                <span className="text-slate-700 font-medium">{li}</span>
                                            </div>
                                        ))}
                                    </div>
                                </RevealOnScroll>
                            </div>

                            <div className="lg:col-span-4">
                                <div className="sticky top-28 bg-brand-950 p-8 rounded-3xl border border-gold-500/20 shadow-2xl overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                    <h3 className="text-2xl font-bold text-white mb-6 font-heading tracking-tighter">Accepting New Filing Clients</h3>
                                    <p className="text-slate-300 mb-8 text-sm leading-relaxed">
                                        We limit our filing volume to ensure every client receives professional-grade attention and accuracy.
                                    </p>
                                    <Link 
                                        href="/contact"
                                        className="w-full flex items-center justify-center gap-3 py-4 bg-gold-500 text-brand-900 font-bold rounded-xl hover:bg-gold-600 transition-all font-heading"
                                    >
                                        Inquire About Filing
                                    </Link>
                                    <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold text-center italic">Professional Standards Apply</p>
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
