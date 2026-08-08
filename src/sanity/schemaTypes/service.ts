import { Briefcase } from "lucide-react";
import { defineField, defineType } from "sanity";
import { ACCENT_COLORS, AccentColorInput } from "../components/AccentColorInput";

const localizedMaxLength = (limit: number) => (value: unknown) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return true;

    const overLimit = ["en", "es"].filter((locale) => {
        const translation = (value as Record<string, unknown>)[locale];
        return typeof translation === "string" && translation.length > limit;
    });

    return overLimit.length === 0
        ? true
        : `${overLimit.map((locale) => locale.toUpperCase()).join(" and ")} must be ${limit} characters or fewer.`;
};

const localizedQuestion = (value: unknown) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return true;

    const invalidLocales = ["en", "es"].filter((locale) => {
        const question = (value as Record<string, unknown>)[locale];
        return typeof question === "string" && question.trim().length > 0 && !question.trim().endsWith("?");
    });

    return invalidLocales.length === 0
        ? true
        : `${invalidLocales.map((locale) => locale.toUpperCase()).join(" and ")} question text must end with a question mark.`;
};

const maxVideoFileSize = async (value: unknown, context: { getClient: (options: { apiVersion: string }) => { fetch: (query: string, params: Record<string, string>) => Promise<{ size?: number } | null> } }) => {
    const assetRef = (value as { asset?: { _ref?: string } } | undefined)?.asset?._ref;
    if (!assetRef) return true;

    const asset = await context.getClient({ apiVersion: "2025-01-01" }).fetch(
        "*[_id == $id][0]{size}",
        { id: assetRef },
    );

    return !asset?.size || asset.size <= 25 * 1024 * 1024
        ? true
        : "Strategy video uploads must be 25MB or smaller. Upload the compressed media-pipeline version instead.";
};

const heroHighlightMatchesHeadline = (value: unknown, context: { parent?: unknown }) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return true;

    const parent = context.parent as Record<string, unknown> | undefined;
    const headline = parent?.heroHeadline as Record<string, unknown> | undefined;
    if (!headline || typeof headline !== "object") return true;

    const invalidLocales = ["en", "es"].filter((locale) => {
        const highlight = (value as Record<string, unknown>)[locale];
        const fullHeadline = headline[locale];
        return typeof highlight === "string" && highlight.trim().length > 0
            && typeof fullHeadline === "string"
            && !fullHeadline.includes(highlight);
    });

    return invalidLocales.length === 0
        ? true
        : `${invalidLocales.map((locale) => locale.toUpperCase()).join(" and ")} highlight text must appear in the matching hero headline.`;
};

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
        // Hero configuration comes first so editors can complete the above-the-fold experience first.
        defineField({ name: "heroHeadline", title: "Hero Headline", type: "localizedString", group: "content", description: "Full H1 shown in the service-page hero. Keep each translation concise enough for two lines on mobile.", validation: (Rule) => Rule.required().custom(localizedMaxLength(96)) }),
        defineField({ name: "heroHighlight", title: "Hero Headline Highlight", type: "localizedString", group: "content", description: "Optional exact substring of Hero Headline to render in the accent color.", validation: (Rule) => Rule.custom(localizedMaxLength(48)).custom(heroHighlightMatchesHeadline) }),
        defineField({
            name: "keyBenefit",
            title: "Hero Subheadline (Single Core Benefit)",
            type: "localizedString",
            group: "content",
            description: "The supporting hero statement below the headline. State the single most compelling visitor outcome; do not use comparison-table copy.",
            validation: (Rule) => Rule.required().custom(localizedMaxLength(180)),
        }),
        defineField({
            name: "heroCta", title: "Hero Primary CTA", type: "object", group: "content",
            fields: [
                { name: "label", title: "Label", type: "localizedString", validation: (Rule) => Rule.required().custom(localizedMaxLength(40)) },
                {
                    name: "href",
                    title: "Destination (for example, /contact)",
                    type: "string",
                    description: "Use /contact for the standard strategy-call CTA, another internal path beginning with /, or an HTTPS URL.",
                    initialValue: "/contact",
                    validation: (Rule) => Rule.required().custom((value) => typeof value !== "string" || value.startsWith("/") || value.startsWith("https://") || "Use an internal path such as /contact or an HTTPS URL."),
                },
            ], validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroSecondaryCta", title: "Hero Secondary CTA", type: "object", group: "content",
            fields: [
                { name: "label", title: "Label", type: "localizedString", validation: (Rule) => Rule.required().custom(localizedMaxLength(40)) },
                {
                    name: "anchorTarget",
                    title: "Anchor Target (for example, #included)",
                    type: "string",
                    description: "Use #included for the standard details jump link, or another valid in-page anchor beginning with #.",
                    initialValue: "#included",
                    validation: (Rule) => Rule.required().regex(/^#[-a-zA-Z0-9_]+$/, { name: "in-page anchor" }),
                },
            ],
        }),
        defineField({
            name: "heroTrustStats", title: "Hero Trust Stats", type: "array", group: "content", description: "Three or four compact value-and-label pairs shown beneath the hero subheadline.",
            of: [{ type: "object", fields: [
                { name: "value", title: "Value", type: "localizedString", validation: (Rule) => Rule.required().custom(localizedMaxLength(24)) },
                { name: "label", title: "Label", type: "localizedString", validation: (Rule) => Rule.required().custom(localizedMaxLength(32)) },
            ] }], validation: (Rule) => Rule.required().min(3).max(4),
        }),
        defineField({ name: "heroMicrocopy", title: "Hero CTA Microcopy", type: "localizedString", group: "content", description: "Optional reassurance line below the hero CTA row.", validation: (Rule) => Rule.custom(localizedMaxLength(120)) }),
        defineField({
            name: "heroVisual", title: "Hero Visual", type: "object", group: "content", description: "Optional desktop visual anchor. Dashboard fields are used only when type is Dashboard Mockup.",
            fields: [
                { name: "type", title: "Visual Type", type: "string", options: { list: [{ title: "Dashboard Mockup", value: "dashboard-mockup" }, { title: "Image", value: "image" }, { title: "None", value: "none" }] }, validation: (Rule) => Rule.required() },
                { name: "image", title: "Image", type: "image", options: { hotspot: true } },
                { name: "dashboardEyebrow", title: "Dashboard Eyebrow", type: "localizedString" },
                { name: "dashboardTitle", title: "Dashboard Title", type: "localizedString" },
                { name: "dashboardStatus", title: "Dashboard Status", type: "localizedString" },
                { name: "dashboardMetrics", title: "Dashboard Metrics", type: "array", of: [{ type: "object", fields: [
                    { name: "label", title: "Label", type: "localizedString", validation: (Rule) => Rule.required() },
                    { name: "value", title: "Value", type: "localizedString", validation: (Rule) => Rule.required() },
                    { name: "emphasized", title: "Emphasized", type: "boolean", initialValue: false },
                ] }], validation: (Rule) => Rule.max(4) },
            ],
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
            validation: (Rule) => Rule.min(3).max(12),
        }),
        defineField({
            name: "impactGoal",
            title: "Impact Goal",
            type: "localizedString",
            group: "content",
            description: "Comparison-table CTA line. State the outcome after comparing options; do not repeat the hero benefit.",
            initialValue: { en: "Stop overpaying. Keep more of what you earn.", es: "Deje de pagar de más. Conserve más de lo que gana." },
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
            description: "Choose an approved brand accent. Custom colors are intentionally unavailable.",
            options: {
                list: [...ACCENT_COLORS],
            },
            components: { input: AccentColorInput },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "faq",
            title: "FAQ",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "question", type: "localizedString", title: "Question", validation: (Rule) => Rule.required().custom(localizedQuestion) },
                        { name: "answer", type: "localizedText", title: "Answer" },
                    ],
                },
            ],
            group: "content",
            validation: (Rule) => Rule.min(3).max(6),
            initialValue: [
                {
                    question: { en: "How is this different from my current CPA?", es: "¿En qué se diferencia esto de mi CPA actual?" },
                    answer: { en: "Most CPAs are generalists who react to your data once a year. We are construction specialists who proactively plan your strategy every month.", es: "La mayoría de los CPAs son generalistas que reaccionan a sus datos una vez al año. Nosotros somos especialistas en construcción que planifican proactivamente su estrategia cada mes." }
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
                        { name: "title", type: "localizedString", title: "Step Title" },
                        { name: "duration", type: "localizedString", title: "Step Label", description: "For example: Week 1, Monthly, or Step 1." },
                        { name: "description", type: "localizedText", title: "Step Description" },
                    ],
                    preview: {
                        select: {
                            title: "title.en",
                        },
                    },
                },
            ],
            group: "content",
            description: "Proceso de instalación paso a paso para este servicio.",
        }),
        defineField({
            name: "pageSections",
            title: "Service Page Sections",
            type: "object",
            group: "content",
            description: "All section headings, comparison content, proof, and calls to action used by the shared service-page template.",
            validation: (Rule) => Rule.required(),
            fields: [
                {
                    name: "eligibility", title: "Eligibility Section", type: "object",
                    fields: [
                        { name: "eyebrow", title: "Eyebrow", type: "localizedString" },
                        { name: "heading", title: "Heading", type: "localizedString" },
                        { name: "description", title: "Description", type: "localizedText" },
                    ],
                },
                {
                    name: "comparison", title: "Comparison Section", type: "object",
                    fields: [
                        { name: "eyebrow", title: "Eyebrow", type: "localizedString" },
                        { name: "heading", title: "Heading", type: "localizedString" },
                        { name: "description", title: "Description", type: "localizedText" },
                        { name: "withoutLabel", title: "Left Column Label", type: "localizedString" },
                        { name: "withLabel", title: "Right Column Label", type: "localizedString" },
                        {
                            name: "pairs", title: "Comparison Rows", type: "array",
                            of: [{
                                type: "object",
                                fields: [
                                    { name: "problem", title: "Without This Service", type: "localizedString" },
                                    { name: "solution", title: "With This Service", type: "localizedString" },
                                ],
                                preview: { select: { title: "solution.en", subtitle: "problem.en" } },
                            }],
                            validation: (Rule) => Rule.min(2).max(6),
                        },
                    ],
                },
                {
                    name: "process", title: "Process Section", type: "object",
                    fields: [
                        { name: "eyebrow", title: "Eyebrow", type: "localizedString" },
                        { name: "heading", title: "Heading", type: "localizedString" },
                        { name: "description", title: "Description", type: "localizedText" },
                    ],
                },
                {
                    name: "included", title: "Included Section", type: "object",
                    fields: [
                        { name: "eyebrow", title: "Eyebrow", type: "localizedString" },
                        { name: "heading", title: "Heading", type: "localizedString" },
                        { name: "description", title: "Description", type: "localizedText" },
                    ],
                },
                {
                    name: "pricing", title: "Pricing Explanation", type: "object",
                    fields: [
                        { name: "headline", title: "Headline", type: "localizedString" },
                        { name: "detail", title: "Detail", type: "localizedText" },
                    ],
                },
                {
                    name: "video", title: "Video Section", type: "object",
                    fields: [
                        { name: "eyebrow", title: "Eyebrow", type: "localizedString" },
                        { name: "heading", title: "Heading", type: "localizedString" },
                    ],
                },
                {
                    name: "proof", title: "Proof Section", type: "object",
                    fields: [
                        { name: "eyebrow", title: "Eyebrow", type: "localizedString" },
                        { name: "heading", title: "Heading", type: "localizedString" },
                        { name: "quote", title: "Quote", type: "localizedText" },
                        { name: "attribution", title: "Attribution", type: "localizedString" },
                        { name: "linkLabel", title: "Link Label", type: "localizedString" },
                        { name: "href", title: "Link Destination", type: "string", initialValue: "/contact" },
                    ],
                },
                {
                    name: "faq", title: "FAQ Section", type: "object",
                    fields: [
                        { name: "eyebrow", title: "Eyebrow", type: "localizedString" },
                        { name: "heading", title: "Heading", type: "localizedString" },
                    ],
                },
                {
                    name: "closing", title: "Closing CTA", type: "object",
                    fields: [
                        { name: "heading", title: "Heading", type: "localizedString" },
                        { name: "description", title: "Description", type: "localizedText" },
                        { name: "label", title: "Button Label", type: "localizedString" },
                        { name: "href", title: "Button Destination", type: "string", initialValue: "/contact" },
                    ],
                },
            ],
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
            name: "trustSignals",
            title: "Trust Strip / Value Props",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "content",
            description: "Señales cortas como 'Preparado por Agente Inscrito del IRS'.",
            validation: (Rule) => Rule.min(3).max(4),
        }),
        defineField({
            name: "videoFile",
            title: "Strategy Video File",
            type: "file",
            group: "content",
            description: "Legacy upload only. Use Strategy Video URL from the approved media pipeline for new video; direct uploads must be 25MB or smaller.",
            options: { accept: "video/mp4,video/webm" },
            validation: (Rule) => Rule.custom(maxVideoFileSize),
        }),
        defineField({
            name: "strategyVideoUrl",
            title: "Strategy Video URL",
            type: "url",
            group: "content",
            description: "Use the approved streaming-media URL so compression and thumbnails are handled upstream.",
            validation: (Rule) => Rule.uri({ scheme: ["https"] }),
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
            type: "localizedString",
            description: "Primary SEO keyword for this landing page—not an audience description.",
            group: "seo",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "targetAudience",
            title: "Primary Audience",
            type: "localizedString",
            description: "Por ejemplo, 'Contratistas Residenciales', 'Dueños de Negocios de HVAC'.",
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
                        { name: "question", type: "localizedString", title: "Question", validation: (Rule) => Rule.required().custom(localizedQuestion) },
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
