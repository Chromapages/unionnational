import { Footer } from "@/components/layout/Footer";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { getClientResults } from "@/lib/testimonials/clientResults";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Client Results | Union National Tax",
        alternates: localizedAlternates(locale, "/client-results"),
    };
}

export default async function ClientResultsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Common" });
    const { data: testimonials } = await sanityFetch({ query: TESTIMONIALS_QUERY, params: { locale } });
    const clientResults = getClientResults(t, testimonials);

    return (
        <div className="min-h-dvh bg-slate-50 text-brand-900">
            <HeaderWrapper />
            <main id="main-content" tabIndex={-1} className="py-16 sm:py-20" aria-labelledby="client-results-heading">
                <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <p className="home-eyebrow text-gold-800">Client results</p>
                    <h1 id="client-results-heading" className="home-section-heading mt-4">{t("readMoreClientResults")}</h1>
                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {clientResults.map((result) => result.format === "case-study" ? (
                            <article key={result.id} className="rounded-2xl bg-brand-900 p-8 text-white" aria-labelledby={`${result.id}-heading`}>
                                <h2 id={`${result.id}-heading`} className="home-eyebrow text-gold-400">{result.eyebrowLabel}</h2>
                                <dl className="mt-6 space-y-5 text-sm leading-relaxed">
                                    <div><dt className="font-bold text-gold-400">{t("before")}</dt><dd className="mt-1.5 text-slate-300">{result.before}</dd></div>
                                    <div><dt className="font-bold text-gold-400">{t("after")}</dt><dd className="mt-1.5 text-slate-300">{result.after}</dd></div>
                                    <div><dt className="font-bold text-gold-400">{t("outcome")}</dt><dd className="mt-1.5 text-slate-300">{result.outcome}</dd></div>
                                </dl>
                            </article>
                        ) : (
                            <figure key={result.id} className="flex min-h-[22rem] flex-col rounded-2xl border border-slate-200 bg-white p-8">
                                <blockquote className="pb-5 text-base leading-7 text-brand-900">{result.quoteText}</blockquote>
                                <figcaption className="mt-auto border-t border-slate-100 pt-4 text-sm">
                                    <p className="font-semibold text-brand-900">{result.name}</p>
                                    <p className="mt-1 text-slate-600">{[result.role, result.company].filter(Boolean).join(" · ") || t("verifiedClient")}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
