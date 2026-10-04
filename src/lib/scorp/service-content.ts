import type { ServicePage } from "@/types/sanity";

// Keep unapproved CMS claims out of page copy, metadata and structured data.
// Approval requirements and the withheld price/FAQ drafts live in the handoff.
export function reviewedScorpService(page: ServicePage, locale: string): ServicePage {
    if (page.slug.current !== "s-corp-tax-advantage") return page;
    const es = locale === "es";
    const label = es ? "Reservar una evaluación S-Corp" : "Book an S-Corp Evaluation";
    const description = es
        ? "Revise sus ganancias, remuneración razonable y costos de nómina antes de decidir si una elección S-Corp conviene a su negocio."
        : "Review profit, reasonable compensation, and payroll costs before deciding whether an S-Corp election fits your business.";

    return {
        ...page,
        title: es ? "Evaluación S-Corp" : "S-Corp Tax Advantage",
        hero: {
            ...page.hero,
            eyebrow: es ? "Evaluación S-Corp" : "S-Corp fit check",
            headline: es ? "¿Una S-Corp es realmente adecuada para su negocio?" : "Is an S-Corp actually right for your business?",
            highlight: es ? "adecuada para su negocio" : "right for your business",
            subheadline: es
                ? "La respuesta depende de más que los ingresos. Revisamos los números y las obligaciones que determinan si una elección S-Corp tiene sentido para su negocio."
                : "The answer depends on more than revenue. We review the numbers and obligations that determine whether an S-Corp election makes sense for your business.",
            primaryCta: { label, href: "/book" },
            secondaryCta: { label: es ? "Ver los detalles de la evaluación" : "See the evaluation details", href: "#included" },
            trustItems: [],
            microcopy: undefined,
        },
        eligibility: page.eligibility ? {
            ...page.eligibility,
            eyebrow: es ? "Compatibilidad S-Corp" : "S-Corp fit",
            heading: es ? "Cuándo vale la pena evaluar una S-Corp." : "When an S-Corp may be worth evaluating.",
            description: es
                ? "Estos son indicadores comunes, no una decisión definitiva. La elección depende de sus números reales, la remuneración, los costos de nómina y las obligaciones continuas."
                : "These are common indicators, not a final determination. The right decision depends on your actual numbers, compensation, payroll costs, and ongoing requirements.",
            cta: undefined,
        } : undefined,
        process: {
            ...page.process,
            eyebrow: es ? "Nuestro proceso" : "Our process",
            heading: es ? "El registro de decisiones S-Corp" : "The S-Corp decision ledger",
            description: page.comparison.description,
            steps: page.process.steps.map(step => ({ ...step, duration: undefined })),
        },
        included: {
            ...page.included,
            eyebrow: undefined,
            heading: es ? "Qué incluye" : "What's included",
            description: undefined,
            items: es ? [
                "Gestionar la elección S-Corp y los cambios de entidad necesarios",
                "Documentar un salario razonable según su trabajo en el negocio",
                "Configurar la nómina y los beneficios del propietario",
                "Preparar proyecciones trimestrales de impuestos y distribuciones",
            ] : [
                "Handle the S-Corp election and any required entity changes",
                "Document a reasonable salary for your work in the business",
                "Set up payroll and owner benefits",
                "Prepare quarterly tax and distribution projections",
            ],
            pricing: undefined,
        },
        proof: undefined,
        // The numeric savings/timing answers and new cost/risk answers await approval.
        // Retain existing CMS answers only when they contain no financial claim.
        faqSection: {
            ...page.faqSection,
            eyebrow: undefined,
            heading: es ? "Preguntas sobre S-Corp" : "S-Corp FAQs",
            items: page.faqSection.items.filter(item => item.question?.trim() && item.answer?.trim()
                && !/\$|\d[\d,.]*\s*%|bypass/i.test(item.answer)),
        },
        closing: {
            ...page.closing, description: undefined, label, href: "/book",
            disclaimer: es
                ? "Los resultados dependen de los ingresos, el estado y la remuneración razonable. La información es general y no constituye asesoramiento fiscal o legal."
                : "Results depend on income, state, and reasonable compensation. This is general information, not tax or legal advice.",
        },
        seo: {
            ...page.seo,
            metaTitle: es ? "Evaluación S-Corp | Union National Tax" : "S-Corp Evaluation | Union National Tax",
            metaDescription: description,
            keywords: undefined,
        },
    };
}
