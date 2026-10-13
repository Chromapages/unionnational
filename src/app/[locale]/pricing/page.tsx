import type { Metadata } from "next";
import Link from "next/link";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { PricingSection } from "@/components/pricing/PricingSection";
import { PricingDraftNotice } from "@/components/pricing/PricingDraftNotice";
import { getPricingContent } from "@/lib/pricing/data";
import { localePricingHref } from "@/lib/pricing/offers";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const { page, preview } = await getPricingContent(locale);
    const title = page?.seo?.metaTitle || (locale === "es" ? "Precios | Union National Tax" : "Pricing | Union National Tax");
    const description = page?.seo?.metaDescription || page?.hero?.description || (locale === "es"
        ? "Consulta los precios y el alcance de nuestros servicios."
        : "Explore service pricing and scope.");
    const image = page?.seo?.openGraphImage?.asset
        ? urlFor(page.seo.openGraphImage).width(1200).height(630).url()
        : undefined;
    return {
        title,
        description,
        keywords: page?.seo?.keywords,
        robots: preview || page?.seo?.noIndex ? { index: false, follow: false } : undefined,
        alternates: localizedAlternates(locale, "/pricing"),
        openGraph: { title, description, images: image ? [{ url: image, width: 1200, height: 630 }] : undefined },
    };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { page, tiers, preview } = await getPricingContent(locale);
    const faqItems = (page?.faq?.items || []).filter(item => item.question?.trim() && item.answer?.trim());
    const closing = page?.closing;

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white">
            <HeaderWrapper />
            <main id="main-content" className="flex-1">
                {preview && <PricingDraftNotice locale={locale} />}
                <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16">
                    <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] font-heading">
                        {page?.hero?.heading || (locale === "es" ? "Precios de servicios" : "Service pricing")}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed">
                        {page?.hero?.description || (locale === "es"
                            ? "Contáctanos para revisar el alcance y solicitar una cotización."
                            : "Contact us to review scope and request a quote.")}
                    </p>
                </section>

                <PricingSection tiers={tiers} locale={locale} />

                {!!faqItems.length && (
                    <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
                        <h2 className="mb-8 text-3xl font-bold font-heading">
                            {page?.faq?.heading || (locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions")}
                        </h2>
                        <div className="divide-y divide-brand-100">
                            {faqItems.map((item, index) => (
                                <details key={index} className="py-5">
                                    <summary className="min-h-11 cursor-pointer text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700">
                                        {item.question}
                                    </summary>
                                    <p className="mt-3 whitespace-pre-line leading-relaxed text-brand-700">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: faqItems.map(item => ({
                                "@type": "Question",
                                name: item.question,
                                acceptedAnswer: { "@type": "Answer", text: item.answer },
                            })),
                        }).replace(/</g, "\\u003c") }} />
                    </section>
                )}

                {closing?.heading && (
                    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                        <div className="border-t border-brand-100 pt-10">
                            <h2 className="max-w-3xl text-3xl font-bold font-heading">{closing.heading}</h2>
                            {closing.description && <p className="mt-4 max-w-2xl text-lg leading-relaxed">{closing.description}</p>}
                            <Link href={localePricingHref(closing.href, locale)} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-900 px-6 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700">
                                {closing.label || (locale === "es" ? "Consultar" : "Inquire")}
                            </Link>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}
