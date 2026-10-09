import { ArrowRight, HardHat, Utensils } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";

const copy = {
    en: {
        eyebrow: "Who we help",
        title: "Specialized services for restaurants and construction.",
        restaurants: {
            label: "Restaurants",
            title: "Restaurant CFO Partnership",
            description: "Financial reporting, food and labor cost analysis, menu economics and cash-flow planning for restaurant operators.",
            action: "Explore restaurant services",
        },
        construction: {
            label: "Construction",
            title: "Construction CFO Partnership",
            description: "Job costing, work-in-progress reporting, billing visibility and cash-flow planning for construction businesses.",
            action: "Explore construction services",
        },
    },
    es: {
        eyebrow: "A quién ayudamos",
        title: "Servicios especializados para restaurantes y construcción.",
        restaurants: {
            label: "Restaurantes",
            title: "Alianza CFO para restaurantes",
            description: "Informes financieros, análisis de costos de alimentos y personal, economía del menú y planificación del flujo de efectivo.",
            action: "Explorar servicios para restaurantes",
        },
        construction: {
            label: "Construcción",
            title: "Alianza CFO para empresas constructoras",
            description: "Costos por obra, informes de trabajo en curso, visibilidad de facturación y planificación del flujo de efectivo.",
            action: "Explorar servicios para construcción",
        },
    },
};

export function IndustryDiscovery() {
    const locale = useLocale();
    const content = locale === "es" ? copy.es : copy.en;

    return (
        <section aria-labelledby="industry-discovery-heading" className="border-t border-brand-100 bg-white py-10 lg:py-12">
            <ServicePageContainer>
                <p className="font-body text-xs font-semibold uppercase tracking-[.12em] text-gold-700 sm:text-sm">{content.eyebrow}</p>
                <h2 id="industry-discovery-heading" className="mt-4 max-w-[30ch] font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]">{content.title}</h2>
                <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 lg:gap-6">
                    {([{ key: "restaurants", icon: Utensils }, { key: "construction", icon: HardHat }] as const).map(({ key, icon: Icon }) => (
                        <Link key={key} href={`/industries/${key}`} className="group flex min-w-0 flex-col rounded-xl border border-brand-100 bg-slate-50 p-6 transition-colors hover:border-gold-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 motion-reduce:transition-none sm:p-8">
                            <div className="flex items-center gap-3 font-body text-sm font-semibold text-brand-900"><Icon className="size-6 shrink-0 text-gold-700" strokeWidth={1.6} aria-hidden="true" />{content[key].label}</div>
                            <h3 className="mt-5 max-w-[26ch] font-heading text-2xl font-semibold leading-tight text-brand-950">{content[key].title}</h3>
                            <p className="mt-3 max-w-[55ch] font-body text-base leading-relaxed text-slate-700 sm:text-lg">{content[key].description}</p>
                            <span className="mt-auto inline-flex min-h-11 items-center gap-3 pt-6 font-heading text-base font-semibold text-brand-900"><span className="underline decoration-gold-700 underline-offset-4">{content[key].action}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" /></span>
                        </Link>
                    ))}
                </div>
            </ServicePageContainer>
        </section>
    );
}
