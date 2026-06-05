import { Briefcase } from "lucide-react";
import { defineField, defineType } from "sanity";

export const service = defineType({
    name: "service",
    title: "Service",
    type: "document",
    icon: Briefcase,
    groups: [
        { name: "content", title: "Content" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "localizedString",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "content",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "localizedText",
            group: "content",
            description: "Usado en tarjetas y vistas previas.",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "fullDescription",
            title: "Full Description",
            type: "localizedBlock",
            group: "content",
            description: "El contenido principal para la página de detalle del servicio.",
        }),
        defineField({
            name: "icon",
            title: "Icon Name",
            type: "string",
            group: "content",
            description: "Lucide icon name (e.g., 'Notebook', 'BarChart3').",
            options: {
                list: [
                    { title: "Notebook (Bookkeeping)", value: "Notebook" },
                    { title: "Bar Chart (CFO)", value: "BarChart3" },
                    { title: "Building (S-Corp)", value: "Building2" },
                    { title: "Line Chart (Consulting)", value: "LineChart" },
                    { title: "File Check (Filing)", value: "FileCheck" },
                    { title: "Rocket (Formation)", value: "Rocket" },
                    { title: "Briefcase (General)", value: "Briefcase" },
                ],
            },
        }),
        defineField({
            name: "features",
            title: "Key Features",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "content",
        }),
        defineField({
            name: "impactGoal",
            title: "Impact Goal",
            type: "localizedString",
            group: "content",
            description: "El 'Porqué' — Enfóquese en el RESULTADO financiero (por ejemplo, 'Reduzca la carga fiscal de su S-Corp en un 25%'), no en el proceso.",
            initialValue: { en: "Stop overpaying. Keep more of what you earn.", es: "Deje de pagar de más. Conserve más de lo que gana." },
        }),
        defineField({
            name: "badge",
            title: "Badge Text",
            type: "localizedString",
            group: "content",
            description: "Insignia opcional como 'Más Popular' o 'Escala'.",
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            group: "content",
            options: {
                list: [
                    { title: "Tax Strategy", value: "Tax Strategy" },
                    { title: "Financial Control", value: "Financial Control" },
                    { title: "Specialized Advisory", value: "Specialized Advisory" },
                    { title: "Compliance Support", value: "Compliance Support" },
                ],
            },
            initialValue: "Tax Strategy",
        }),
        defineField({
            name: "startingPrice",
            title: "Starting Price",
            type: "localizedString",
            group: "content",
            description: "Por ejemplo, 'Desde $500/mes' o 'Cotización personalizada'",
        }),
        defineField({
            name: "isPopular",
            title: "Is Popular/Featured?",
            type: "boolean",
            group: "content",
            initialValue: false,
        }),
        defineField({
            name: "accentColor",
            title: "Accent Color",
            type: "string",
            group: "content",
            description: "Hex code for accent (e.g., #D4AF37).",
        }),
        defineField({
            name: "faq",
            title: "FAQ",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "question", type: "localizedString", title: "Question" },
                        { name: "answer", type: "localizedText", title: "Answer" },
                    ],
                },
            ],
            group: "content",
            initialValue: [
                {
                    question: { en: "How is this different from my current CPA?", es: "¿En qué se diferencia esto de mi CPA actual?" },
                    answer: { en: "Most CPAs are generalists who react to your data once a year. We are construction specialists who proactively plan your strategy every month.", es: "La mayoría de los CPAs son generalistas que reaccionan a sus datos una vez al año. Nosotros somos especialistas en construcción que planifican proactivamente su estrategia cada mes." }
                }
            ]
        }),
        defineField({
            name: "whyChooseUsTitle",
            title: "Why Choose Us Title",
            type: "localizedString",
            group: "content",
            description: "Título personalizado para la sección de comparación.",
            initialValue: { en: "Why Growth-Minded Owners Choose Union National", es: "Por Qué los Propietarios con Mentalidad de Crecimiento Eligen Union National" }
        }),
        defineField({
            name: "whyChooseUsDescription",
            title: "Why Choose Us Description",
            type: "localizedText",
            group: "content",
            description: "Texto de contexto opcional para mostrar encima de la tabla de comparación.",
        }),
        defineField({
            name: "comparisonPoints",
            title: "Comparison Points",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "feature", type: "localizedString", title: "Feature" },
                        { name: "diy", type: "boolean", title: "DIY (Yes/No)" },
                        { name: "bigFirm", type: "boolean", title: "Big Firm (Yes/No)" },
                        { name: "unionNational", type: "boolean", title: "Union National (Yes/No)" },
                    ],
                    preview: {
                        select: {
                            title: "feature.en",
                        },
                    },
                },
            ],
            group: "content",
            initialValue: [
                {
                    feature: { en: "Construction Specialization", es: "Especialización en Construcción" },
                    diy: false,
                    bigFirm: false,
                    unionNational: true
                },
                {
                    feature: { en: "Proactive Strategy (Year-Round)", es: "Estrategia Proactiva (Todo el Año)" },
                    diy: false,
                    bigFirm: false,
                    unionNational: true
                },
                {
                    feature: { en: "Audit Defense Included", es: "Defensa ante Auditoría Incluida" },
                    diy: false,
                    bigFirm: false,
                    unionNational: true
                },
                {
                    feature: { en: "Flat-Fee Transparency", es: "Transparencia de Tarifa Fija" },
                    diy: true,
                    bigFirm: false,
                    unionNational: true
                }
            ]
        }),
        defineField({
            name: "roadmap",
            title: "Process Roadmap",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "stepNumber", type: "string", title: "Step Number (e.g. 01)" },
                        { name: "title", type: "localizedString", title: "Step Title" },
                        { name: "description", type: "localizedText", title: "Step Description" },
                    ],
                    preview: {
                        select: {
                            title: "title.en",
                            subtitle: "stepNumber",
                        },
                    },
                },
            ],
            group: "content",
            description: "Proceso de instalación paso a paso para este servicio.",
        }),
        defineField({
            name: "eligibilityPros",
            title: "Who Is This For? (Pros)",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "content",
            description: "Lista de criterios para candidatos ideales.",
        }),
        defineField({
            name: "eligibilityCons",
            title: "Who Is This Not For? (Cons)",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "content",
            description: "Lista de criterios para candidatos no ideales.",
        }),
        defineField({
            name: "trustSignals",
            title: "Trust Strip / Value Props",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "content",
            description: "Señales cortas como 'Preparado por Agente Inscrito del IRS'.",
        }),
        defineField({
            name: "problemAgitation",
            title: "Problem Agitation Section",
            type: "object",
            fields: [
                { name: "title", type: "localizedString", title: "Section Title" },
                { name: "description", type: "localizedText", title: "Section Description" },
            ],
            group: "content",
        }),
        defineField({
            name: "videoFile",
            title: "Strategy Video File",
            type: "file",
            group: "content",
            description: "Suba un archivo MP4 o similar para el recorrido del servicio.",
        }),
        defineField({
            name: "videoThumbnail",
            title: "Strategy Video Thumbnail",
            type: "image",
            group: "content",
            options: { hotspot: true },
        }),
        defineField({
            name: "targetKeyword",
            title: "Service Target Keyword",
            type: "string",
            description: "Palabra clave principal para la página de destino de este servicio.",
            group: "seo",
        }),
        defineField({
            name: "targetAudience",
            title: "Primary Audience",
            type: "localizedString",
            description: "Por ejemplo, 'Contratistas Residenciales', 'Dueños de Negocios de HVAC'.",
            group: "content",
        }),
        defineField({
            name: "keyBenefit",
            title: "Single Core Benefit",
            type: "localizedString",
            description: "El resultado #1: por ejemplo, 'Ahorre $23,000 anuales al cambiarse a S-Corp'.",
            group: "content",
        }),
        defineField({
            name: "eligibility",
            title: "Who Is This For? (Snippet Ready)",
            type: "localizedText",
            description: "Defina brevemente quién califica. Ideal para fragmentos de 'Cómo' o 'Quién necesita'.",
            group: "content",
        }),
        defineField({
            name: "schema_faq",
            title: "Featured Snippet FAQs",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "question", type: "localizedString", title: "Question" },
                        { name: "answer", type: "localizedText", title: "Answer" },
                    ],
                },
            ],
            description: "3-5 preguntas de alto volumen específicamente para el esquema FAQPage. Distintas de las preguntas frecuentes mostradas.",
            group: "content",
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
            title: "title.en",
            subtitle: "shortDescription.en",
        },
    },
});
