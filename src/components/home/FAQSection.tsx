import { sanityFetch } from "@/sanity/lib/live";
import { FAQ_QUERY } from "@/sanity/lib/queries";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FAQAccordion } from "./FAQAccordion";
import { getLocale, getTranslations } from "next-intl/server";

interface FAQSectionProps {
    variant?: "light" | "dark";
    initialLimit?: number;
}

export async function FAQSection({ variant = "light", initialLimit }: FAQSectionProps) {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "ContactPage.FAQSection" });
    const { data: faqs } = await sanityFetch({ query: FAQ_QUERY, params: { locale } });

    if (!faqs || faqs.length === 0) {
        return null;
    }

    const isDark = variant === "dark";

    return (
        <section id="contact-faq" className={`scroll-mt-24 py-16 sm:py-20 border-t ${isDark ? "bg-transparent border-white/5" : "bg-surface-50 border-slate-200"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll className="mb-10 max-w-3xl">
                    <span className={`font-bold tracking-widest text-sm uppercase mb-3 block font-sans ${isDark ? "text-gold-500" : "text-gold-600"}`}>
                        {t("eyebrow")}
                    </span>
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-heading tracking-tight ${isDark ? "text-white" : "text-brand-900"}`}>
                        {t("title")}
                    </h2>
                    <p className={`text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                        {t("subtitle")}
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={100}>
                    <div className="max-w-4xl mx-auto">
                        <FAQAccordion items={faqs} variant={variant} initialLimit={initialLimit} />
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
