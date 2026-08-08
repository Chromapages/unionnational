import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const stepKeys = ["start", "opportunities", "plan"] as const;

export async function HowItWorksSection() {
    const t = await getTranslations("HomePage.HowItWorksSection");
    const steps = stepKeys.map((key, index) => ({
        key,
        number: index + 1,
        title: t(`steps.${key}.title`),
        description: t(`steps.${key}.description`),
        outcome: t(`steps.${key}.outcome`),
    }));

    return (
        <section id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="how-it-works-heading">
            <div className="mx-auto max-w-[70rem] px-4 sm:px-6 lg:px-8">
                <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
                    <div className="max-w-xl lg:sticky lg:top-28">
                        <p className="home-eyebrow text-gold-800">{t("eyebrow")}</p>
                        <h2 id="how-it-works-heading" className="home-section-heading mt-4 text-brand-900">{t("title")}</h2>
                        <p className="home-supporting-copy mt-5 text-slate-700">{t("subtitle")}</p>

                        <Link href="/book" className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                            {t("cta")}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">{t("ctaSupport")}</p>
                    </div>

                    <ol className="relative before:absolute before:bottom-6 before:left-6 before:top-6 before:w-px before:-translate-x-1/2 before:bg-gold-300 before:content-[''] sm:before:bottom-7 sm:before:left-7 sm:before:top-7" aria-label={t("listLabel")}>
                        {steps.map((step) => (
                            <li key={step.key} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-3 pb-10 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6 sm:pb-12">
                                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-brand-900 font-heading text-sm font-bold text-gold-300 shadow-[0_10px_24px_-14px_rgba(3,16,14,0.7)] sm:h-14 sm:w-14" aria-hidden="true">
                                    {String(step.number).padStart(2, "0")}
                                </span>
                                <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-[0_18px_42px_-36px_rgba(24,24,27,0.4)] sm:p-6">
                                    <h3 className="home-card-heading text-brand-900">
                                        <span className="sr-only">{t("stepLabel", { number: step.number, total: steps.length })}: </span>
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 leading-relaxed text-slate-700">{step.description}</p>
                                    <p className="mt-5 border-t border-slate-200 pt-4 text-sm leading-relaxed text-brand-900">
                                        <span className="mr-2 font-bold uppercase tracking-[0.08em] text-gold-900">{t("outcomeLabel")}:</span>{" "}
                                        {step.outcome}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
