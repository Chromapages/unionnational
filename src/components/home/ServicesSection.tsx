import {
    ArrowRight,
    BadgeDollarSign,
    BookOpen,
    BookOpenCheck,
    Building2,
    Calendar,
    CalendarClock,
    ChartNoAxesCombined,
    Check,
    Coins,
    DollarSign,
    FileCheck,
    FileText,
    TrendingUp,
    Users,
    type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCoreServiceCards, type ServiceCard, type ServiceCardSource } from "@/lib/services/coreServiceCards";
import { ServicesDesktopShowcase } from "./ServicesDesktopShowcase";

const iconMap: Record<string, LucideIcon> = {
    BadgeDollarSign,
    CalendarClock,
    BookOpenCheck,
    ChartNoAxesCombined,
    Building2,
    FileCheck,
    Coins,
    Calendar,
    TrendingUp,
    Users,
    BookOpen,
    DollarSign,
    FileText,
};

const serviceSpecificIcons: Record<string, LucideIcon> = {
    scorp: DollarSign,
    taxPlanning: Calendar,
    bookkeeping: BookOpen,
    fractionalCfo: TrendingUp,
    formation: Building2,
    payroll: FileText,
};

interface ServicesSectionProps {
    cards?: ServiceCard[];
    services?: ServiceCardSource[];
}

interface OutcomeBlockData {
    number: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    services: ServiceCard[];
    isDoubleCard: boolean;
}

const defaultBenefits: readonly string[] = [
    "Clearer decision-making",
    "A more efficient business",
    "A stronger financial future",
];

export const ServicesSection = async ({ cards, services }: ServicesSectionProps = {}): Promise<React.JSX.Element> => {
    const t = await getTranslations("HomePage.ServicesSection");

    // Backward-compatible fallback for unit tests and custom card injections
    if (cards !== undefined) {
        const testOutcomes = [...cards].sort((left, right) => left.order - right.order);

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
                        {testOutcomes.map((outcome) => {
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
                                        <Link
                                            href={outcome.exploreLinkHref}
                                            data-analytics="services_section_card_click"
                                            data-service-id={outcome.id}
                                            data-service-position={outcome.order}
                                            className="group mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-6 text-sm font-bold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                        >
                                            {outcome.exploreLinkLabel}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                        </Link>
                                    </article>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-10 border-t border-slate-300 pt-6">
                        <Link
                            href="/services"
                            data-testid="services-section-compare-all"
                            data-analytics="services_section_compare_all_click"
                            className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                        >
                            {t("viewAllCta")}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    const allServices = getCoreServiceCards(t, services);
    const serviceMap = new Map(allServices.map((service) => [service.id, service]));

    const learnMoreLabel = t("learnMore") !== "learnMore" ? t("learnMore") : "Learn more";

    const outcomeBlocks: OutcomeBlockData[] = [
        {
            number: "01",
            eyebrow: t("blocks.01.eyebrow") !== "blocks.01.eyebrow" ? t("blocks.01.eyebrow") : "LOWER YOUR TAX BURDEN",
            title: t("blocks.01.title") !== "blocks.01.title" ? t("blocks.01.title") : "Keep more of what you earn.",
            subtitle: t("blocks.01.subtitle") !== "blocks.01.subtitle" ? t("blocks.01.subtitle") : "Reduce avoidable taxes through a smarter structure and proactive planning.",
            services: [serviceMap.get("scorp"), serviceMap.get("taxPlanning")].filter(Boolean) as ServiceCard[],
            isDoubleCard: true,
        },
        {
            number: "02",
            eyebrow: t("blocks.02.eyebrow") !== "blocks.02.eyebrow" ? t("blocks.02.eyebrow") : "KNOW YOUR NUMBERS",
            title: t("blocks.02.title") !== "blocks.02.title" ? t("blocks.02.title") : "Make confident decisions.",
            subtitle: t("blocks.02.subtitle") !== "blocks.02.subtitle" ? t("blocks.02.subtitle") : "Get clear, accurate financial information that helps you plan, price, and grow.",
            services: [serviceMap.get("bookkeeping")].filter(Boolean) as ServiceCard[],
            isDoubleCard: false,
        },
        {
            number: "03",
            eyebrow: t("blocks.03.eyebrow") !== "blocks.03.eyebrow" ? t("blocks.03.eyebrow") : "LEAD WITH CLARITY",
            title: t("blocks.03.title") !== "blocks.03.title" ? t("blocks.03.title") : "Make bigger moves with confidence.",
            subtitle: t("blocks.03.subtitle") !== "blocks.03.subtitle" ? t("blocks.03.subtitle") : "Turn your numbers into a strategy for sustainable growth.",
            services: [serviceMap.get("fractionalCfo")].filter(Boolean) as ServiceCard[],
            isDoubleCard: false,
        },
        {
            number: "04",
            eyebrow: t("blocks.04.eyebrow") !== "blocks.04.eyebrow" ? t("blocks.04.eyebrow") : "BUILD A STRONGER FOUNDATION",
            title: t("blocks.04.title") !== "blocks.04.title" ? t("blocks.04.title") : "Set your business up for what's next.",
            subtitle: t("blocks.04.subtitle") !== "blocks.04.subtitle" ? t("blocks.04.subtitle") : "Get the right structure and systems in place from the start.",
            services: [serviceMap.get("formation"), serviceMap.get("payroll")].filter(Boolean) as ServiceCard[],
            isDoubleCard: true,
        },
    ];

    const resolvedRightEyebrow = t("rightHeader.eyebrow") !== "rightHeader.eyebrow" ? t("rightHeader.eyebrow") : "A unified approach";
    const resolvedRightTitle = t("rightHeader.title") !== "rightHeader.title" ? t("rightHeader.title") : "Different challenges. A unified approach.";
    const resolvedRightDesc = t("rightHeader.description") !== "rightHeader.description" ? t("rightHeader.description") : "Whether you're looking to reduce taxes, get clearer numbers, make bigger decisions, or build a stronger foundation — every service fits into one connected strategy.";

    const hubEyebrow = t("centerHub.eyebrow") !== "centerHub.eyebrow" ? t("centerHub.eyebrow") : "One connected";
    const hubTitle = t("centerHub.title") !== "centerHub.title" ? t("centerHub.title") : "Financial picture";
    const hubSubtitle1 = t("centerHub.subtitle1") !== "centerHub.subtitle1" ? t("centerHub.subtitle1") : "Integrated services.";
    const hubSubtitle2 = t("centerHub.subtitle2") !== "centerHub.subtitle2" ? t("centerHub.subtitle2") : "Stronger outcomes.";

    const resolvedBannerEyebrow = t("comparisonBanner.eyebrow") !== "comparisonBanner.eyebrow" ? t("comparisonBanner.eyebrow") : "Not sure which service fits?";
    const resolvedBannerTitle = t("comparisonBanner.title") !== "comparisonBanner.title" ? t("comparisonBanner.title") : "Compare services and find the right fit.";
    const resolvedBannerSubtitle = t("comparisonBanner.subtitle") !== "comparisonBanner.subtitle" ? t("comparisonBanner.subtitle") : "Explore our interactive comparison tool to see how each service aligns with your business stage and goals.";
    const resolvedBannerCta = t("comparisonBanner.cta") !== "comparisonBanner.cta" ? t("comparisonBanner.cta") : t("viewAllCta");

    const resolvedFooterTagline = t("footer.tagline") !== "footer.tagline" ? t("footer.tagline") : "Strategy creates options";
    const resolvedFooterSubtagline = t("footer.subtagline") !== "footer.subtagline" ? t("footer.subtagline") : "A more confident tomorrow";

    const benefits = [
        t("comparisonBanner.benefits.0") !== "comparisonBanner.benefits.0" ? t("comparisonBanner.benefits.0") : defaultBenefits[0],
        t("comparisonBanner.benefits.1") !== "comparisonBanner.benefits.1" ? t("comparisonBanner.benefits.1") : defaultBenefits[1],
        t("comparisonBanner.benefits.2") !== "comparisonBanner.benefits.2" ? t("comparisonBanner.benefits.2") : defaultBenefits[2],
    ];
    const featuredDescriptions: Record<string, string> = {
        scorp: t("desktop.scorpDescription"),
        taxPlanning: t("desktop.taxPlanningDescription"),
    };

    return (
        <section id="services" className="services-desktop-section border-y border-slate-200 bg-slate-50/60 py-16 sm:py-20 lg:py-24 xl:bg-white xl:pb-10 xl:pt-8" aria-labelledby="services-heading">
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 xl:px-16">

                <div className="services-desktop-header grid grid-cols-1 items-start gap-8 border-b border-slate-200 pb-10 sm:pb-14 lg:grid-cols-12 lg:gap-12 xl:relative xl:block xl:border-0 xl:pb-0">
                    <div className="lg:col-span-7">
                        <p className="home-eyebrow text-gold-800 xl:flex xl:items-center xl:gap-4 xl:text-sm xl:tracking-[0.2em]"><span className="hidden h-px w-10 bg-gold-800 xl:block" aria-hidden="true" />{t("eyebrow")}</p>
                        <h2 id="services-heading" className="home-section-heading mt-3 text-brand-900 xl:mr-40 xl:text-[3rem] xl:leading-[1.08]">{t("title")}</h2>
                        <p className="home-supporting-copy mt-4 max-w-2xl text-slate-700 xl:mt-3 xl:max-w-none xl:text-xl xl:leading-7">
                            <span className="xl:hidden">{t("subtitle")}</span>
                            <span className="hidden xl:inline">{t("desktop.introFirst")}<br />{t("desktop.introSecond")}</span>
                        </p>
                    </div>

                    <div className="absolute right-0 top-5 hidden text-xs font-bold uppercase leading-[1.8] tracking-[0.2em] text-slate-600 xl:block" aria-hidden="true">
                        <span className="block">{t("desktop.motifPeople")}</span>
                        <span className="block">{t("desktop.motifPlans")}</span>
                        <span className="block">{t("desktop.motifPossibilities")}</span>
                        <span className="mt-3 block h-px w-9 bg-gold-800" />
                    </div>

                    <div className="flex flex-col justify-center border-t border-slate-200 pt-6 sm:pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:hidden">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-800">
                            <span className="inline-block h-0.5 w-4 bg-gold-600" aria-hidden="true" />
                            {resolvedRightEyebrow}
                        </div>
                        <h3 className="mt-2 text-xl font-bold text-brand-900 sm:text-2xl">{resolvedRightTitle}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{resolvedRightDesc}</p>
                    </div>
                </div>

                <div className="xl:hidden">
                {/* 2. Connected Outcome Matrix with Center Nexus */}
                <div className="relative mt-12 sm:mt-16">

                    {/* SVG Circuit Lines with Golden Nodes (Desktop Only) */}
                    <svg
                        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block z-10"
                        viewBox="0 0 1200 800"
                        preserveAspectRatio="none"
                        fill="none"
                        aria-hidden="true"
                    >
                        {/* Top-Left: Card 01 connection to Center Hub */}
                        <path d="M 450 250 H 510 C 560 250 560 340 600 340" stroke="#d9c4a5" strokeWidth="1.5" />
                        <circle cx="450" cy="250" r="3.5" fill="#ffffff" stroke="#c9ad82" strokeWidth="2" />
                        <circle cx="510" cy="250" r="3" fill="#ffffff" stroke="#c9ad82" strokeWidth="1.5" />

                        {/* Top-Right: Card 02 connection to Center Hub */}
                        <path d="M 750 250 H 690 C 640 250 640 340 600 340" stroke="#d9c4a5" strokeWidth="1.5" />
                        <circle cx="750" cy="250" r="3.5" fill="#ffffff" stroke="#c9ad82" strokeWidth="2" />
                        <circle cx="690" cy="250" r="3" fill="#ffffff" stroke="#c9ad82" strokeWidth="1.5" />

                        {/* Bottom-Left: Card 03 connection to Center Hub */}
                        <path d="M 450 550 H 510 C 560 550 560 460 600 460" stroke="#d9c4a5" strokeWidth="1.5" />
                        <circle cx="450" cy="550" r="3.5" fill="#ffffff" stroke="#c9ad82" strokeWidth="2" />
                        <circle cx="510" cy="550" r="3" fill="#ffffff" stroke="#c9ad82" strokeWidth="1.5" />

                        {/* Bottom-Right: Card 04 connection to Center Hub */}
                        <path d="M 750 550 H 690 C 640 550 640 460 600 460" stroke="#d9c4a5" strokeWidth="1.5" />
                        <circle cx="750" cy="550" r="3.5" fill="#ffffff" stroke="#c9ad82" strokeWidth="2" />
                        <circle cx="690" cy="550" r="3" fill="#ffffff" stroke="#c9ad82" strokeWidth="1.5" />

                        {/* Top Vertical Stems between top cards */}
                        <path d="M 590 320 C 590 270 600 240 600 170" stroke="#d9c4a5" strokeWidth="1.5" />
                        <path d="M 610 320 C 610 270 600 240 600 170" stroke="#d9c4a5" strokeWidth="1.5" />
                        <circle cx="600" cy="170" r="3.5" fill="#ffffff" stroke="#c9ad82" strokeWidth="2" />

                        {/* Bottom Vertical Stems between bottom cards */}
                        <path d="M 590 480 C 590 530 600 560 600 630" stroke="#d9c4a5" strokeWidth="1.5" />
                        <path d="M 610 480 C 610 530 600 560 600 630" stroke="#d9c4a5" strokeWidth="1.5" />
                        <circle cx="600" cy="630" r="3.5" fill="#ffffff" stroke="#c9ad82" strokeWidth="2" />

                        {/* Center horizontal nodes */}
                        <circle cx="515" cy="400" r="3.5" fill="#ffffff" stroke="#c9ad82" strokeWidth="2" />
                        <circle cx="685" cy="400" r="3.5" fill="#ffffff" stroke="#c9ad82" strokeWidth="2" />
                    </svg>

                    {/* Central Connected Nexus Circle (Desktop) */}
                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#dfceb6] bg-gradient-to-b from-[#fdfcf9] to-[#f7f2e8] p-6 text-center shadow-[0_12px_32px_-6px_rgba(13,46,43,0.08)] lg:flex lg:h-56 lg:w-56 xl:h-60 xl:w-60"
                        aria-hidden="true"
                    >
                        {/* 3 Rising Metric Bars */}
                        <div className="flex items-end justify-center gap-1.5 text-[#9c783e]">
                            <span className="h-3 w-1 rounded-full bg-[#9c783e]" />
                            <span className="h-5 w-1 rounded-full bg-[#9c783e]" />
                            <span className="h-7 w-1 rounded-full bg-[#9c783e]" />
                        </div>

                        <p className="font-body mt-2.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-brand-900 leading-tight">
                            {hubEyebrow}
                            <br />
                            {hubTitle}
                        </p>

                        <p className="mt-2 text-center text-[11px] leading-relaxed text-slate-500">
                            {hubSubtitle1}
                            <br />
                            {hubSubtitle2}
                        </p>
                    </div>

                    {/* 2x2 Outcome Cards Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
                        {outcomeBlocks.map((block, blockIndex) => (
                            <div key={block.number} className="flex flex-col">

                                {/* Mobile Nexus Badge Inserted between Blocks 2 and 3 */}
                                {blockIndex === 2 ? (
                                    <div className="my-2 flex justify-center lg:hidden" aria-hidden="true">
                                        <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border border-[#dfceb6] bg-gradient-to-b from-[#fdfcf9] to-[#f7f2e8] p-4 text-center shadow-xs">
                                            <div className="flex items-end justify-center gap-1 text-[#9c783e]">
                                                <span className="h-3 w-1 rounded-full bg-[#9c783e]" />
                                                <span className="h-4.5 w-1 rounded-full bg-[#9c783e]" />
                                                <span className="h-6 w-1 rounded-full bg-[#9c783e]" />
                                            </div>
                                            <p className="font-body mt-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-brand-900 leading-tight">
                                                {hubEyebrow}
                                                <br />
                                                {hubTitle}
                                            </p>
                                            <p className="mt-1 text-center text-[10px] text-slate-500">
                                                {hubSubtitle1} {hubSubtitle2}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}

                                <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-md sm:rounded-3xl sm:p-8 lg:p-9">

                                    {/* Card Header with Cream Number Circle */}
                                    <div className="flex items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ecd9be] bg-[#faf7f0] text-brand-900 shadow-xs sm:h-14 sm:w-14" aria-hidden="true">
                                            <span className="font-heading text-lg font-bold text-brand-900 sm:text-xl">
                                                {block.number}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9c783e] sm:text-xs">
                                                {block.eyebrow}
                                            </p>
                                            <h3 className="font-heading mt-1 text-xl font-bold tracking-tight text-brand-900 sm:text-2xl lg:text-[1.65rem] leading-snug">
                                                {block.title}
                                            </h3>
                                            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed sm:text-sm">
                                                {block.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Sub-cards Container */}
                                    <div className={block.isDoubleCard ? "mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2" : "mt-6 sm:mt-8"}>
                                        {block.services.map((service) => {
                                            const Icon = serviceSpecificIcons[service.id] ?? iconMap[service.icon] ?? BadgeDollarSign;

                                            return (
                                                <div
                                                    key={service.id}
                                                    className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all duration-200 hover:border-gold-300 hover:bg-white hover:shadow-xs sm:p-5"
                                                >
                                                    <div>
                                                        {/* Icon Pill and Sub-service Title */}
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ecd9be] bg-[#faf7f0] text-[#9c783e] transition-colors group-hover:bg-[#f6efe1]" aria-hidden="true">
                                                                <Icon className="h-4 w-4 stroke-[2]" aria-hidden="true" />
                                                            </div>
                                                            <h4 className="font-heading text-sm font-bold text-brand-900 transition-colors group-hover:text-gold-950 sm:text-base">
                                                                {service.heading}
                                                            </h4>
                                                        </div>

                                                        <p className="mt-2.5 text-xs text-slate-600 leading-relaxed sm:text-[13px]">
                                                            {service.description}
                                                        </p>
                                                    </div>

                                                    <div className="pt-4">
                                                        <Link
                                                            href={service.exploreLinkHref}
                                                            data-analytics="services_section_card_click"
                                                            data-service-id={service.id}
                                                            data-service-position={service.order}
                                                            aria-label={`${learnMoreLabel} - ${service.heading}`}
                                                            className="inline-flex min-h-8 items-center gap-1 text-xs font-bold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                                        >
                                                            {learnMoreLabel}
                                                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Bottom Comparison Banner */}
                <div className="mt-12 rounded-2xl border border-slate-200 bg-[#f7f5f0] p-6 shadow-sm sm:mt-16 sm:p-8 lg:p-10">
                    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
                        {/* Left: Info */}
                        <div className="lg:col-span-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                {resolvedBannerEyebrow}
                            </p>
                            <h3 className="font-heading mt-1.5 text-xl font-bold text-brand-900 sm:text-2xl">
                                {resolvedBannerTitle}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                                {resolvedBannerSubtitle}
                            </p>
                        </div>

                        {/* Center: CTA Button */}
                        <div className="flex justify-start lg:col-span-3 lg:justify-center">
                            <Link
                                href="/services"
                                data-testid="services-section-compare-all"
                                data-analytics="services_section_compare_all_click"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-900 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-950 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f5f0]"
                            >
                                {resolvedBannerCta}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>

                        {/* Right: 3 Benefit Checkmarks */}
                        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm font-semibold text-brand-900">
                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800" aria-hidden="true">
                                        <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                                    </div>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Bottom Footer Bar */}
                <div className="mt-8 flex flex-col items-start justify-between gap-3 text-xs font-bold uppercase tracking-widest text-slate-500 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                        <span className="inline-block h-0.5 w-4 bg-gold-600" aria-hidden="true" />
                        <span className="text-gold-900">{resolvedFooterTagline}</span>
                    </div>
                    <span className="text-slate-500">{resolvedFooterSubtagline}</span>
                </div>
                </div>

                <ServicesDesktopShowcase
                    outcomes={outcomeBlocks}
                    outcomesLabel={t("listLabel")}
                    descriptions={featuredDescriptions}
                    quotes={[
                        t("desktop.quotes.01"),
                        t("desktop.quotes.02"),
                        t("desktop.quotes.03"),
                        t("desktop.quotes.04"),
                    ]}
                    quoteEyebrow={t("desktop.quoteEyebrow")}
                    quoteFooter={resolvedFooterTagline}
                    compareEyebrow={t("desktop.compareEyebrow")}
                    compareDescription={t("desktop.compareDescription")}
                    compareCta={resolvedBannerCta}
                />

            </div>
        </section>
    );
};
