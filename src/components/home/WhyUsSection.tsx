import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const comparisonKeys = ["timing", "scope", "cadence", "decisionSupport"] as const;

export const WhyUsSection = async () => {
    const t = await getTranslations("HomePage.WhyUsSection");
    const comparisons = comparisonKeys.map((key) => ({
        key,
        dimension: t(`rows.${key}.dimension`),
        traditional: t(`rows.${key}.traditional`),
        proactive: t(`rows.${key}.proactive`),
    }));

    return (
        <section id="proactive-by-design" className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24" aria-labelledby="why-us-heading">
            <div className="mx-auto max-w-[74rem] px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    <p className="home-eyebrow text-gold-800">{t("eyebrow")}</p>
                    <h2 id="why-us-heading" className="home-section-heading mt-4 text-brand-900">{t("title")}</h2>
                    <p className="home-supporting-copy mt-5 max-w-3xl text-slate-700">{t("subtitle")}</p>
                </div>

                <div className="mt-10 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-38px_rgba(24,24,27,0.35)] md:block">
                    <table className="w-full table-fixed border-collapse">
                        <caption className="sr-only">{t("caption")}</caption>
                        <colgroup>
                            <col className="w-44" />
                            <col />
                            <col />
                        </colgroup>
                        <thead className="bg-brand-900 text-left text-sm font-bold">
                            <tr>
                                <th scope="col" className="p-5 text-slate-200">{t("dimensionLabel")}</th>
                                <th scope="col" className="border-l border-white/10 p-5 text-slate-200">{t("traditionalLabel")}</th>
                                <th scope="col" className="border-l border-gold-400/30 bg-brand-950 p-5 text-gold-300">{t("proactiveLabel")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisons.map((item) => (
                                <tr key={item.key} className="border-t border-slate-200 first:border-t-0">
                                    <th scope="row" className="bg-slate-50 p-5 text-left font-heading text-sm font-bold uppercase tracking-[0.08em] text-slate-700">{item.dimension}</th>
                                    <td className="border-l border-slate-200 p-5 text-sm leading-relaxed text-slate-700 lg:text-base">{item.traditional}</td>
                                    <td className="border-l border-gold-200 bg-gold-50 p-5 text-sm font-semibold leading-relaxed text-brand-900 lg:text-base">{item.proactive}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ul className="mt-8 space-y-4 md:hidden" aria-label={t("caption")}>
                    {comparisons.map((item) => (
                        <li key={item.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_36px_-32px_rgba(24,24,27,0.4)]">
                            <h3 className="font-heading text-base font-bold text-brand-900">{item.dimension}</h3>
                            <dl className="mt-4 space-y-3">
                                <div className="rounded-xl bg-slate-100 p-4">
                                    <dt className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700">{t("traditionalLabel")}</dt>
                                    <dd className="mt-1.5 text-sm leading-relaxed text-slate-700">{item.traditional}</dd>
                                </div>
                                <div className="rounded-xl border border-gold-200 bg-gold-50 p-4">
                                    <dt className="text-xs font-bold uppercase tracking-[0.1em] text-gold-900">{t("proactiveLabel")}</dt>
                                    <dd className="mt-1.5 text-sm font-semibold leading-relaxed text-brand-900">{item.proactive}</dd>
                                </div>
                            </dl>
                        </li>
                    ))}
                </ul>

                <div className="mt-10 flex flex-col items-start gap-6 border-t border-slate-300 pt-8 lg:flex-row lg:items-center lg:justify-between">
                    <p className="max-w-2xl font-heading text-xl font-bold leading-snug text-brand-900 sm:text-2xl">{t("conclusion")}</p>
                    <div className="flex shrink-0 flex-col items-start gap-3">
                        <Link href="/tax-planning" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600">
                            {t("primaryCta")}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link href="/scorp-estimator" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-800 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600">
                            {t("secondaryCta")}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
