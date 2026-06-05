import { defineField, defineType } from "sanity";
import { Home } from "lucide-react";

export const homePage = defineType({
    name: "homePage",
    title: "Home Page",
    type: "document",
    icon: Home,
    groups: [
        { name: "hero", title: "Hero Section" },
        { name: "trust", title: "Trust Bar" },
        { name: "stats", title: "Statistics" },
        { name: "differentiation", title: "Differentiation Section" },
        { name: "nationwide", title: "Nationwide Services" },
        { name: "services", title: "Services Section" },
        { name: "cta", title: "CTA Section" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        // Hero Section
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "localizedString",
            group: "hero",
            validation: (Rule) => Rule.required(),
            initialValue: { en: "Stop Overpaying the IRS. Build a Smarter Business.", es: "Deje de Pagar de Más al IRS. Construya un Negocio Más Inteligente." },
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "localizedText",
            group: "hero",
            initialValue: { en: "Proactive tax strategy and fractional CFO leadership for owners who want more than a tax preparer.", es: "Estrategia fiscal proactiva y liderazgo de CFO fraccional para propietarios que quieren más que un preparador de impuestos." },
        }),
        defineField({
            name: "heroVideoUrl",
            title: "Hero Background Video URL",
            type: "url",
            group: "hero",
            description: "URL al stream HLS o archivo mp4.",
        }),
        defineField({
            name: "heroCtaText",
            title: "Hero Primary CTA Text",
            type: "localizedString",
            group: "hero",
            initialValue: { en: "See If You're Overpaying", es: "Vea Si Está Pagando de Más" },
        }),
        defineField({
            name: "heroCtaUrl",
            title: "Hero Primary CTA Video URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http"] }),
            group: "hero",
            description: "Video a abrir en modal al hacer clic.",
        }),
        defineField({
            name: "heroSecondaryCtaText",
            title: "Hero Secondary CTA Text",
            type: "localizedString",
            group: "hero",
            initialValue: { en: "Book a Discovery Evaluation", es: "Reserve Una Evaluación de Descubrimiento" },
        }),
        defineField({
            name: "heroSecondaryCtaUrl",
            title: "Hero Secondary CTA URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
            group: "hero",
        }),

        // Trust Bar
        defineField({
            name: "trustLogos",
            title: "Trust / Client Logos",
            type: "array",
            group: "trust",
            of: [
                {
                    type: "image",
                    fields: [
                        { name: "alt", type: "string", title: "Company Name" },
                    ],
                },
            ],
        }),

        // Stats Section
        defineField({
            name: "stats",
            title: "Key Statistics",
            type: "array",
            group: "stats",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "value", type: "string", title: "Value (e.g. $10M+)" },
                        { name: "label", type: "localizedString", title: "Label (e.g. Tax Saved)" },
                    ],
                },
            ],
        }),
        defineField({
            name: "bentoGridBackgroundImage",
            title: "Bento Grid: Expert Card Background",
            type: "image",
            group: "stats",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "localizedString",
                },
            ],
        }),

        // Differentiation Section
        defineField({
            name: "differentiationEyebrow",
            title: "Differentiation Eyebrow",
            type: "localizedString",
            group: "differentiation",
            initialValue: { en: "Stop Losing Money to the IRS", es: "Deje de Perder Dinero con el IRS" },
        }),
        defineField({
            name: "differentiationTitle",
            title: "Differentiation Title",
            type: "localizedString",
            group: "differentiation",
            initialValue: { en: "Why Businesses Overpay (And How We Fix It)", es: "Por Qué las Empresas Pagan de Más (Y Cómo lo Solucionamos)" },
        }),
        defineField({
            name: "differentiationSubtitle",
            title: "Differentiation Subtitle",
            type: "localizedText",
            group: "differentiation",
            initialValue: { en: "Most CPAs exemplify 'reactive filing'. We practice 'proactive tax reduction'.", es: "La mayoría de los CPA practican la 'declaración reactiva'. Nosotros practicamos la 'reducción fiscal proactiva'." },
        }),
        defineField({
            name: "competitorFeatures",
            title: "Competitor Features (What They Lack)",
            type: "array",
            group: "differentiation",
            of: [{ type: "localizedString" }],
            initialValue: [
                { en: "Limited S-Corp Expertise", es: "Experiencia Limitada en S-Corp" },
                { en: "Reactive Annual Filing", es: "Declaración Anual Reactiva" },
                { en: "Hidden Hourly Fees", es: "Tarifas por Hora Ocultas" },
                { en: "No CFO Access", es: "Sin Acceso a CFO" },
                { en: "One-Size-Fits-All Approach", es: "Enfoque Único para Todos" },
            ],
        }),
        defineField({
            name: "unionFeatures",
            title: "Union National Features (What We Offer)",
            type: "array",
            group: "differentiation",
            of: [{ type: "localizedString" }],
            initialValue: [
                { en: "S-Corp Tax Specialists", es: "Especialistas en Impuestos de S-Corp" },
                { en: "Proactive Quarterly Strategy", es: "Estrategia Trimestral Proactiva" },
                { en: "Transparent Flat Pricing", es: "Precios Planos Transparentes" },
                { en: "Dedicated CFO Team", es: "Equipo de CFO Dedicado" },
                { en: "Industry-Specific Deductions", es: "Deducciones Específicas de la Industria" },
            ],
        }),
        defineField({
            name: "differentiationCtaText",
            title: "Differentiation CTA Text",
            type: "localizedString",
            group: "differentiation",
            initialValue: { en: "See How We Compare", es: "Vea Cómo Nos Comparamos" },
        }),
        defineField({
            name: "differentiationCtaUrl",
            title: "Differentiation CTA URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http"] }),
            group: "differentiation",
        }),

        // Nationwide Services Section
        defineField({
            name: "nationwideBadge",
            title: "Nationwide Badge",
            type: "localizedString",
            group: "nationwide",
            initialValue: { en: "Licensed in All 50 States", es: "Autorizados en los 50 Estados" },
        }),
        defineField({
            name: "nationwideTitle",
            title: "Nationwide Title",
            type: "localizedString",
            group: "nationwide",
            initialValue: { en: "Tax Strategy for Business Owners, Wherever You Grow", es: "Estrategia Fiscal para Propietarios de Negocios, Donde Sea Que Crezcan" },
        }),
        defineField({
            name: "nationwideSubtitle",
            title: "Nationwide Subtitle",
            type: "localizedText",
            group: "nationwide",
            initialValue: { en: "Whether you're in California or New York, our IRS-licensed team handles your multi-state compliance.", es: "Ya sea en California o Nueva York, nuestro equipo autorizado por el IRS gestiona su cumplimiento multiestatal." },
        }),
        defineField({
            name: "nationwideFeatures",
            title: "Nationwide Features",
            type: "array",
            group: "nationwide",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "icon", type: "string", title: "Icon Name" },
                        { name: "title", type: "localizedString", title: "Title" },
                        { name: "description", type: "localizedText", title: "Description" },
                    ],
                },
            ],
            initialValue: [
                {
                    icon: "Globe",
                    title: { en: "Multi-State Nexus Strategy", es: "Estrategia de Nexo Multi-Estatal" },
                    description: { en: "Avoid the 'nexus trap'. We proactively manage your state-to-state tax triggers to eliminate double taxation across all 50 states.", es: "Evite la 'trampa del nexo'. Gestionamos proactivamente sus disparadores fiscales entre estados para eliminar la doble tributación en los 50 estados." },
                },
                {
                    icon: "ShieldCheck",
                    title: { en: "Enrolled Agent Audit Defense", es: "Defensa de Auditoría por Agente Inscrito" },
                    description: { en: "Direct representation before the IRS and state authorities. We defend your contractor-specific deductions with federally authorized power.", es: "Representación directa ante el IRS y autoridades estatales. Defendemos las deducciones específicas de los contratistas con autoridad federal." },
                },
                {
                    icon: "HardHat",
                    title: { en: "State-Specific Deduction Harvesting", es: "Cosecha de Deducciones Específicas del Estado" },
                    description: { en: "Maximize local tax credits, construction tax breaks, and Section 199A mastery unique to each jurisdiction you build in.", es: "Maximice los créditos fiscales locales, los beneficios de construcción y el dominio de la Sección 199A únicos en cada jurisdicción donde construye." },
                },
                {
                    icon: "Zap",
                    title: { en: "Proactive Compliance Radar", es: "Radar de Cumplimiento Proactivo" },
                    description: { en: "Most accounting is reactive. We use forward-looking planning to identify tax savings month-by-month, keeping you ahead of state deadlines.", es: "La mayoría de la contabilidad es reactiva. Usamos planificación anticipada para identificar ahorros fiscales mes a mes, manteniéndolo adelante de los plazos estatales." },
                },
                {
                    icon: "Cloud",
                    title: { en: "Virtual Executive Office", es: "Oficina Ejecutiva Virtual" },
                    description: { en: "Manage your complex multi-state records securely from the field. Our cloud-first workflow is built for contractors on the move.", es: "Gestione sus registros multiestatales complejos de forma segura desde el campo. Nuestro flujo de trabajo en la nube está diseñado para contratistas en movimiento." },
                },
            ],
        }),

        // Services Section
        defineField({
            name: "servicesEyebrow",
            title: "Services Eyebrow",
            type: "localizedString",
            group: "services",
            initialValue: { en: "Advisory-Led Tax Strategy", es: "Estrategia Fiscal Liderada por Asesores" },
        }),
        defineField({
            name: "servicesTitle",
            title: "Services Title",
            type: "localizedString",
            group: "services",
            initialValue: { en: "A Complete Financial System for Business Owners", es: "Un Sistema Financiero Completo para Propietarios de Negocios" },
        }),
        defineField({
            name: "servicesSubtitle",
            title: "Services Subtitle",
            type: "localizedText",
            group: "services",
            initialValue: { en: "Proactive planning, S-Corp strategy, and financial advisory support — built for business owners who want more than annual filing.", es: "Planificación proactiva, estrategia de S-Corp y asesoría financiera—diseñado para propietarios de negocios que quieren más que una declaración anual." },
        }),
        defineField({
            name: "servicesButtonText",
            title: "Services Button Text",
            type: "localizedString",
            group: "services",
            initialValue: { en: "View All Tax Services", es: "Ver Todos los Servicios Fiscales" },
        }),

        // CTA Section (Pricing/Bottom)
        defineField({
            name: "ctaTitle",
            title: "Bottom CTA Title",
            type: "localizedString",
            group: "cta",
            initialValue: { en: "Find Out If Your Business Structure Is Costing You Money.", es: "Descubra Si la Estructura de Su Negocio le Está Costando Dinero." },
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "localizedText",
            group: "cta",
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "localizedString",
            group: "cta",
            initialValue: { en: "Book a Discovery Evaluation", es: "Reserve Una Evaluación de Descubrimiento" },
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Button URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
            group: "cta",
        }),
        defineField({
            name: "ctaBackgroundImage",
            title: "CTA Section Background",
            type: "image",
            group: "cta",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "localizedString",
                },
            ],
        }),
        defineField({
            name: "seo",
            title: "SEO Overrides",
            type: "seo",
            group: "seo",
        }),
    ],
    preview: {
        select: {
            title: "heroTitle",
        },
        prepare({ title }) {
            return {
                title: "Home Page Settings",
                subtitle: title?.en || "No Title",
            };
        },
    },
});
