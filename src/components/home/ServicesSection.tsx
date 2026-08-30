import { ArrowRight, BadgeDollarSign, BookOpenCheck, Building2, CalendarClock, ChartNoAxesCombined, FileCheck, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCoreServiceCards, type ServiceCard, type ServiceCardSource } from "@/lib/services/coreServiceCards";

const iconMap: Record<string, LucideIcon> = {
    BadgeDollarSign,
    CalendarClock,
    BookOpenCheck,
    ChartNoAxesCombined,
    Building2,
    FileCheck,
};

interface ServicesSectionProps {
    cards?: ServiceCard[];
    services?: ServiceCardSource[];
}

export async function ServicesSection({ cards, services }: ServicesSectionProps = {}) {
    const t = await getTranslations("HomePage.ServicesSection");
    const outcomes = [...(cards ?? getCoreServiceCards(t, services))].sort((left, right) => left.order - right.order);

    return (
        <section id="services" className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24" aria-labelledby="services-heading">
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="home-eyebrow text-gold-800">{t("eyebrow")}</p>
                    <h2 id="services-heading" className="home-section-heading mt-4 text-brand-900">{t("title")}</h2>
                    <p className="home-supporting-copy mt-5 max-w-2xl text-slate-700">{t("subtitle")}</p>
                </div>

                <ul
                    className="-mx-4 mt-10 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-4 pb-4 touch-pan-x no-scrollbar md:mx-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(100%,22.5rem),1fr))] md:gap-6 md:overflow-visible md:px-0 md:pb-0"
                    aria-label={t("listLabel")}
                >
                    {outcomes.map((outcome) => {
                        const Icon = iconMap[outcome.icon] ?? BadgeDollarSign;

                        return (
                            <li key={outcome.id} className="w-[85vw] max-w-[340px] shrink-0 snap-center md:h-full md:w-auto md:max-w-none md:shrink">
                                <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_18px_42px_-36px_rgba(24,24,27,0.4)]">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-800" aria-hidden="true">
                                        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                                    </div>
                                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-gold-900">{outcome.categoryLabel}</p>
                                    {outcome.isFlagship ? (
                                        <span className="mt-2 inline-flex min-h-6 w-fit items-center rounded-full bg-gold-200/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-950">
                                            {t("recommendedBadge")}
                                        </span>
                                    ) : null}
                                    <h3 className="home-card-heading mt-2 text-brand-900">{outcome.heading}</h3>
                                    <p className="mt-3 flex-1 leading-relaxed text-slate-700">{outcome.description}</p>
                                    <Link href={outcome.exploreLinkHref} data-analytics="services_section_card_click" data-service-id={outcome.id} data-service-position={outcome.order} className="group mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-6 text-sm font-bold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                                        {outcome.exploreLinkLabel}
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                    </Link>
                                </article>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-10 border-t border-slate-300 pt-6">
                    <Link href="/services" data-testid="services-section-compare-all" data-analytics="services_section_compare_all_click" className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50">
                        {t("viewAllCta")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
