import { ArrowRight, BookOpenCheck, CalendarDays, LineChart, TrendingDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const outcomes = [
    { key: "scorp", icon: TrendingDown, href: "/s-corp-tax-advantage" },
    { key: "taxPlanning", icon: CalendarDays, href: "/tax-planning" },
    { key: "bookkeeping", icon: BookOpenCheck, href: "/strategic-bookkeeping" },
    { key: "fractionalCfo", icon: LineChart, href: "/fractional-cfo" },
] as const;

export async function ServicesSection() {
    const t = await getTranslations("HomePage.ServicesSection");

    return (
        <section id="services" className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24" aria-labelledby="services-heading">
            <div className="mx-auto max-w-[70rem] px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="home-eyebrow text-gold-800">{t("eyebrow")}</p>
                    <h2 id="services-heading" className="home-section-heading mt-4 text-brand-900">{t("title")}</h2>
                    <p className="home-supporting-copy mt-5 max-w-2xl text-slate-700">{t("subtitle")}</p>
                </div>

                <ul className="mt-10 grid gap-5 md:grid-cols-2" aria-label={t("listLabel")}>
                    {outcomes.map(({ key, icon: Icon, href }) => (
                        <li key={key} className="h-full">
                            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_42px_-36px_rgba(24,24,27,0.4)] sm:p-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-800" aria-hidden="true">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-gold-900">{t(`outcomes.${key}.service`)}</p>
                                <h3 className="home-card-heading mt-2 text-brand-900">{t(`outcomes.${key}.title`)}</h3>
                                <p className="mt-3 leading-relaxed text-slate-700">{t(`outcomes.${key}.description`)}</p>
                                <Link href={href} className="group mt-6 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                                    {t(`outcomes.${key}.link`)}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                </Link>
                            </article>
                        </li>
                    ))}
                </ul>

                <div className="mt-10 border-t border-slate-300 pt-8">
                    <Link href="/services" className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50">
                        {t("viewAllCta")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
