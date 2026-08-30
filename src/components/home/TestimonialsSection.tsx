import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getClientResults, type CaseStudyResult, type ClientResultSource } from "@/lib/testimonials/clientResults";

export async function TestimonialsSection({ testimonials = [] }: { testimonials?: ClientResultSource[] }) {
    const t = await getTranslations("Common");
    const clientResults = getClientResults(t, testimonials);
    const featuredResult = clientResults.find((item): item is CaseStudyResult => item.format === "case-study") as CaseStudyResult;
    const quoteResults = clientResults.filter((item) => item.format === "quote").slice(0, 2);

    return (
        <section id="client-results" className="bg-slate-50 py-20 sm:py-24" aria-labelledby="results-heading" data-analytics="testimonials_section_view">
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="home-eyebrow text-gold-700">Client results</p>
                        <p className="text-xs font-semibold text-slate-700">{t("trustedByBusinessOwners")}</p>
                    </div>
                    <h2 id="results-heading" className="home-section-heading mt-4 text-brand-900">A better plan creates better decisions</h2>
                </div>
                <div data-testid="client-results-grid" className="mt-10 grid gap-6 lg:grid-cols-3">
                    <article className="flex h-full min-h-0 flex-col rounded-2xl bg-brand-900 p-5 text-white sm:p-6 lg:min-h-[22rem] lg:p-8 lg:col-span-1" aria-labelledby="featured-result-heading">
                        <h3 id="featured-result-heading" className="home-eyebrow text-gold-400">{featuredResult.eyebrowLabel}</h3>
                        <dl className="mt-6 space-y-5 text-sm leading-relaxed">
                            <div>
                                <dt className="font-bold text-gold-400">{t("before")}</dt>
                                <dd className="mt-1.5 text-slate-300">{featuredResult.before}</dd>
                            </div>
                            <div>
                                <dt className="font-bold text-gold-400">{t("after")}</dt>
                                <dd className="mt-1.5 text-slate-300">{featuredResult.after}</dd>
                            </div>
                            <div>
                                <dt className="font-bold text-gold-400">{t("outcome")}</dt>
                                <dd className="mt-1.5 text-slate-300">{featuredResult.outcome}</dd>
                            </div>
                        </dl>
                    </article>
                    {quoteResults.map((testimonial) => {
                        const attribution = [testimonial.role, testimonial.company].filter(Boolean).join(" · ") || t("verifiedClient");

                        return (
                            <figure key={testimonial.id} className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:min-h-[22rem] lg:p-8">
                                <blockquote className="pb-5 text-base leading-7 text-brand-900">{testimonial.quoteText}</blockquote>
                                <figcaption className="mt-auto border-t border-slate-100 pt-4 text-sm">
                                    <p className="font-semibold text-brand-900">{testimonial.name}</p>
                                    <p className="mt-1 text-slate-600">{attribution}</p>
                                </figcaption>
                            </figure>
                        );
                    })}
                    {quoteResults.length === 0 && <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:col-span-2 lg:p-8"><p className="text-slate-600">Client stories are available during your strategy call.</p></article>}
                </div>
                <div className="mt-10">
                    <Link href="/client-results" data-analytics="testimonials_read_more_click" className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50">
                        {t("readMoreClientResults")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
