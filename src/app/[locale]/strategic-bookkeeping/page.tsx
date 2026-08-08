import { CmsServicePage, getCmsServiceMetadata } from "@/components/services/CmsServicePage";
import type { ServicePage } from "@/types/sanity";

const cmsSlug = "strategic-bookkeeping";
const canonicalPath = "/strategic-bookkeeping";

const qualificationCopy: Record<"en" | "es", NonNullable<ServicePage["eligibility"]>> = {
    en: {
        eyebrow: "Who this fits",
        heading: "Best fit for owners who need monthly numbers they can act on.",
        description: "Usually a fit if you're a contractor or service business at $250K+ revenue and the books are slowing down decisions or tax planning.",
        badge: "$250K+ revenue",
        primaryGroup: {
            heading: "Strong fit",
            items: [
                "Contractor, trades, or service business at $250K+ revenue",
                "Books close too late to help with decisions",
                "Want monthly bookkeeping tied directly to tax planning",
            ],
        },
        secondaryGroup: {
            heading: "Common signs it's time",
            items: [
                "You find out what you owe too late",
                "You're making pricing, hiring, or equipment calls without current numbers",
                "You've outgrown DIY or office-manager bookkeeping",
            ],
        },
        disqualifierHeading: "Probably not the right fit yet",
        disqualifier: "Pre-revenue, casual DIY books, or not tracking monthly numbers at all.",
        cta: {
            label: "Talk through your books",
            href: "/contact",
            microcopy: "We'll tell you quickly if this is the right scope for where you are now.",
        },
    },
    es: {
        eyebrow: "Para quién es",
        heading: "Ideal para dueños que necesitan cifras mensuales para tomar decisiones.",
        description: "Suele ser ideal si dirige un negocio de contratistas o servicios con ingresos de $250K o más y la contabilidad está retrasando decisiones o la planificación fiscal.",
        badge: "$250K+ de ingresos",
        primaryGroup: {
            heading: "Perfil ideal",
            items: [
                "Negocio de contratistas, oficios o servicios con ingresos de $250K o más",
                "La contabilidad cierra demasiado tarde para apoyar decisiones",
                "Busca contabilidad mensual conectada directamente con la planificación fiscal",
            ],
        },
        secondaryGroup: {
            heading: "Señales comunes de que es el momento",
            items: [
                "Se entera demasiado tarde de lo que debe",
                "Toma decisiones de precios, contratación o equipo sin cifras actualizadas",
                "Ya superó la contabilidad propia o a cargo del gerente de oficina",
            ],
        },
        disqualifierHeading: "Probablemente aún no sea la opción adecuada",
        disqualifier: "Etapa previa a los ingresos, contabilidad propia informal o sin seguimiento mensual de las cifras.",
        cta: {
            label: "Hablemos de su contabilidad",
            href: "/contact",
            microcopy: "Le diremos rápidamente si este alcance es el adecuado para su situación actual.",
        },
    },
};

const comparisonCopy: Record<"en" | "es", ServicePage["comparison"]> = {
    en: {
        eyebrow: "The cost of waiting",
        heading: "Once-a-year books tell you what happened. Monthly books help you change what happens next.",
        description: "By tax time, pricing, cash-flow, and deduction decisions are already behind you.",
        withoutLabel: "Before",
        withLabel: "After",
        pairs: [
            { category: "Close timing", problem: "Books cleaned up at tax time", solution: "Books closed on a predictable monthly schedule", outcome: "You see issues early instead of after the year is over." },
            { category: "Operating decisions", problem: "Pricing and hiring decisions based on estimates", solution: "Decisions based on current monthly numbers", outcome: "You stop guessing with labor, jobs, and cash flow." },
            { category: "Tax planning", problem: "Deductions reviewed after deadlines passed", solution: "Tax-ready categories maintained all year", outcome: "Strategy happens while choices are still open." },
            { category: "Documentation", problem: "Records assembled under pressure", solution: "Support stays organized and review-ready", outcome: "Less scramble, fewer missing items, cleaner year-end handoff." },
            { category: "Strategy", problem: "Bookkeeping and tax live in separate systems", solution: "Monthly books feed quarterly tax planning", outcome: "The numbers actually drive strategy." },
        ],
        conclusion: "The difference isn't cleaner reports. It's having enough time to act.",
        linkLabel: "See how the monthly close works",
        href: "#strategic-bookkeeping-process",
    },
    es: {
        eyebrow: "El costo de esperar",
        heading: "La contabilidad anual le dice qué pasó. La contabilidad mensual le ayuda a cambiar lo que sigue.",
        description: "Para la temporada fiscal, las decisiones sobre precios, flujo de efectivo y deducciones ya quedaron atrás.",
        withoutLabel: "Antes",
        withLabel: "Después",
        pairs: [
            { category: "Fecha de cierre", problem: "La contabilidad se pone al día en temporada fiscal", solution: "La contabilidad cierra en un calendario mensual predecible", outcome: "Ve los problemas a tiempo, no cuando el año ya terminó." },
            { category: "Decisiones operativas", problem: "Decisiones de precios y contratación basadas en estimaciones", solution: "Decisiones basadas en cifras mensuales actuales", outcome: "Deja de adivinar sobre mano de obra, trabajos y flujo de efectivo." },
            { category: "Planificación fiscal", problem: "Deducciones revisadas después de los plazos", solution: "Categorías fiscales al día durante todo el año", outcome: "La estrategia ocurre mientras las opciones siguen abiertas." },
            { category: "Documentación", problem: "Registros reunidos bajo presión", solution: "El respaldo se mantiene organizado y listo para revisión", outcome: "Menos prisas, menos elementos faltantes y una entrega de fin de año más limpia." },
            { category: "Estrategia", problem: "La contabilidad y los impuestos viven en sistemas separados", solution: "Los libros mensuales alimentan la planificación fiscal trimestral", outcome: "Las cifras realmente impulsan la estrategia." },
        ],
        conclusion: "La diferencia no son informes más limpios. Es tener tiempo suficiente para actuar.",
        linkLabel: "Vea cómo funciona el cierre mensual",
        href: "#strategic-bookkeeping-process",
    },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getCmsServiceMetadata({ cmsSlug, locale, canonicalPath });
}

export default async function StrategicBookkeepingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const contentLocale = locale === "es" ? "es" : "en";
    return (
        <CmsServicePage
            cmsSlug={cmsSlug}
            locale={locale}
            canonicalPath={canonicalPath}
            eligibilityOverride={qualificationCopy[contentLocale]}
            comparisonOverride={comparisonCopy[contentLocale]}
        />
    );
}
