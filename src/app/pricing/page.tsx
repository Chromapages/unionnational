import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { sanityFetch } from "@/sanity/lib/live";
import { PRICING_TIERS_QUERY, SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import { PricingSection } from "@/components/pricing/PricingSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
    title: "Pricing | Union National Tax",
    description: "Transparent pricing for comprehensive tax strategies and fractional CFO services.",
};

export default async function PricingPage() {
    const { data: tiers } = await sanityFetch({ query: PRICING_TIERS_QUERY });
    const { data: pageData } = await sanityFetch({ query: SERVICES_PAGE_QUERY });

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main className="pt-12">
                {/* Hero */}
                <section className="max-w-4xl mx-auto px-6 mb-24 text-center">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-200 text-gold-600 text-[10px] font-semibold uppercase tracking-widest mb-6 shadow-sm font-sans">
                            Investment
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 tracking-tight mb-8 leading-[1.1] font-heading">
                            Invest in your <br />
                            <span className="text-gold-500">financial infrastructure.</span>
                        </h1>
                        <p className="text-lg text-brand-900 leading-relaxed max-w-2xl mx-auto font-sans">
                            Choose the engagement model that fits your growth stage. All plans include our proactive "Tax First" methodology.
                        </p>
                    </RevealOnScroll>
                </section>

                <PricingSection tiers={tiers} />

                <div className="mt-32">
                    <CTASection data={pageData} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
