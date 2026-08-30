import { defineField, defineType } from "sanity";
import { MessageSquareQuote } from "lucide-react";

const hasText = (value: unknown): boolean => {
    if (typeof value === "string") return value.trim().length > 0;
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;

    return Object.values(value as Record<string, unknown>).some(
        (translation) => typeof translation === "string" && translation.trim().length > 0,
    );
};

const validateAttribution = (_value: unknown, context: { parent?: unknown }) => {
    const testimonial = context.parent as Record<string, unknown> | undefined;
    if (testimonial?.format === "case-study") return true;
    const hasRoleAndCompany = hasText(testimonial?.clientTitle) && hasText(testimonial?.clientCompany);

    return hasRoleAndCompany || testimonial?.verifiedClient === true
        ? true
        : "Provide both a client role and company, or mark this as a Verified Client before publishing.";
};

export const testimonial = defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    icon: MessageSquareQuote,
    fields: [
        defineField({
            name: "format",
            title: "Result Format",
            type: "string",
            options: { list: [{ title: "Quote", value: "quote" }, { title: "Case Study", value: "case-study" }] },
            validation: (Rule) => Rule.required(),
            initialValue: "quote",
        }),
        defineField({
            name: "clientName",
            title: "Client Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "clientTitle",
            title: "Client Job Title",
            type: "localizedString",
            validation: (Rule) => Rule.custom(validateAttribution),
        }),
        defineField({
            name: "clientCompany",
            title: "Client Company",
            type: "string",
            validation: (Rule) => Rule.custom(validateAttribution),
        }),
        defineField({
            name: "quote",
            title: "Quote",
            type: "localizedText",
            validation: (Rule) => Rule.custom((value, context) => (context.parent as Record<string, unknown> | undefined)?.format === "case-study" || hasText(value) || "Quote-format testimonials require quote text."),
        }),
        defineField({ name: "eyebrowLabel", title: "Case Study Eyebrow", type: "localizedString", validation: (Rule) => Rule.custom((value, context) => (context.parent as Record<string, unknown> | undefined)?.format !== "case-study" || hasText(value) || "Case studies require an eyebrow label.") }),
        defineField({ name: "before", title: "Case Study: Before", type: "localizedText", validation: (Rule) => Rule.custom((value, context) => (context.parent as Record<string, unknown> | undefined)?.format !== "case-study" || hasText(value) || "Case studies require a Before field.") }),
        defineField({ name: "after", title: "Case Study: After", type: "localizedText", validation: (Rule) => Rule.custom((value, context) => (context.parent as Record<string, unknown> | undefined)?.format !== "case-study" || hasText(value) || "Case studies require an After field.") }),
        defineField({ name: "outcome", title: "Case Study: Outcome", type: "localizedText", validation: (Rule) => Rule.custom((value, context) => (context.parent as Record<string, unknown> | undefined)?.format !== "case-study" || hasText(value) || "Case studies require an Outcome field.") }),
        defineField({
            name: "rating",
            title: "Rating (1-5)",
            type: "number",
            validation: (Rule) => Rule.min(1).max(5),
            initialValue: 5,
        }),
        defineField({
            name: "serviceUsed",
            title: "Service Used",
            type: "reference",
            to: [{ type: "service" }],
        }),
        defineField({
            name: "image",
            title: "Client Photo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "isFeatured",
            title: "Featured on Homepage?",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "isPublished",
            title: "Published?",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "savingsAmount",
            title: "Tax Savings (if applicable)",
            type: "string",
            description: "ej. '$12,400' - poderosa métrica de prueba social.",
        }),
        defineField({
            name: "industry",
            title: "Client Industry",
            type: "string",
            description: "Se utiliza para agrupar testimonios en páginas de destino específicas por segmento.",
            options: {
                list: [
                    { title: "Construction", value: "Construction" },
                    { title: "Real Estate", value: "Real Estate" },
                    { title: "E-commerce", value: "E-commerce" },
                    { title: "Professional Services", value: "Professional Services" },
                    { title: "Other", value: "Other" },
                ],
            },
        }),
        defineField({
            name: "verifiedClient",
            title: "Verified Client?",
            type: "boolean",
            description: "Required when the client role and company cannot be disclosed. Displays the localized Verified Client attribution.",
            validation: (Rule) => Rule.required(),
            initialValue: true,
        }),
        defineField({
            name: "outcome",
            title: "Succinct Outcome",
            type: "localizedString",
            description: "ej. 'Ahorró $23k con elección de S-Corp'. Breve y fácil de leer.",
        }),
        defineField({
            name: "displayOrder",
            title: "Display Order",
            type: "number",
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: "clientName",
            subtitle: "clientCompany",
            media: "image",
        },
    },
});
