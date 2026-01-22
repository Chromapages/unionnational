import { sanityFetch } from "@/sanity/lib/live";
import { FAQ_QUERY } from "@/sanity/lib/queries";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FAQAccordion } from "./FAQAccordion";

export async function FAQSection() {
    const { data: faqs } = await sanityFetch({ query: FAQ_QUERY });

    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-surface-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll className="text-center mb-16">
                    <span className="text-gold-600 font-bold tracking-widest text-sm uppercase mb-3 block font-sans">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 mb-6 font-heading tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Everything you need to know about our services, pricing, and tax strategies.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={100}>
                    <div className="max-w-4xl mx-auto">
                        <FAQAccordion items={faqs} />
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
