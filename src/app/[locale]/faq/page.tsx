import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FAQList } from "@/components/faq/FAQList";
import { sanityFetch } from "@/sanity/lib/live";
import { FAQ_QUERY } from "@/sanity/lib/queries";
import { getLocale } from "next-intl/server";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
    title: "Frequently Asked Questions | Union National Tax",
    description: "Find answers to common questions about our tax services, pricing, and strategies for contractors and business owners.",
};

export default async function FAQPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    
    // Fetch all FAQs with live data sync
    const { data: faqs } = await sanityFetch({ 
        query: FAQ_QUERY, 
        params: { locale } 
    });

    return (
        <main id="main-content" className="min-h-screen w-full bg-surface flex flex-col">
            <FAQPageSchema />
            <HeaderWrapper />

            <div className="flex-1 pt-32 pb-24">
                {/* Simple Hero */}
                <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                    <RevealOnScroll>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-gold-50 text-gold-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-gold-100">
                            Knowledge Base
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-900 mb-8 font-heading tracking-tight">
                            The Strategy <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic">Playbook</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
                            Clear, technical answers to help you navigate the complexities of tax strategy, financial growth, and compliance.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Main FAQ Content with Filters */}
                <div className="max-w-7xl mx-auto px-6">
                    <FAQList items={faqs || []} />
                </div>

                {/* Contact CTA */}
                <div className="max-w-4xl mx-auto px-6 mt-32 text-center">
                    <RevealOnScroll delay={200} className="bg-brand-900 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-brand-900/20">
                        {/* Background Design Elements */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/10 to-transparent pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading tracking-tight uppercase">
                                Still have <span className="text-gold-400">Questions?</span>
                            </h3>
                            <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg leading-relaxed font-light">
                                Every business is unique. Our team of Enrolled Agents and CPAs is ready to discuss your specific situation.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-brand-900 font-black py-5 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-xl uppercase tracking-widest text-xs text-center"
                                >
                                    Book Free Strategy Call
                                </Link>
                                <Link
                                    href="mailto:support@unionnationaltax.com"
                                    className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 py-5 px-10 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest text-center"
                                >
                                    Email Our Team
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            <Footer />
        </main>
    );
}
