import { defineField, defineType } from "sanity";

const localizedMaxLength = (limit: number) => (value: unknown) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return true;
    }

    const translations = value as Record<string, unknown>;
    const overLimit = ["en", "es"].filter((locale) => {
        const translation = translations[locale];
        return typeof translation === "string" && translation.length > limit;
    });

    if (overLimit.length === 0) {
        return true;
    }

    return `${overLimit.map((locale) => locale.toUpperCase()).join(" and ")} must be ${limit} characters or fewer.`;
};

export const seo = defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "localizedString",
            validation: (Rule) => Rule.custom(localizedMaxLength(60)).warning(),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "localizedText",
            validation: (Rule) => Rule.custom(localizedMaxLength(160)).warning(),
        }),
        defineField({
            name: "openGraphImage",
            title: "Open Graph Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "canonicalUrl",
            title: "Canonical URL",
            type: "url",
            description: "La URL preferida para esta página (ayuda a prevenir contenido duplicado).",
        }),
        defineField({
            name: "noIndex",
            title: "No-Index",
            type: "boolean",
            description: "Oculte esta página de los motores de búsqueda (ej. páginas de agradecimiento).",
            initialValue: false,
        }),
        defineField({
            name: "structuredDataType",
            title: "Structured Data Type",
            type: "string",
            description: "Pista sobre qué tipo de esquema generar para esta página.",
            options: {
                list: [
                    { title: "AccountingService", value: "AccountingService" },
                    { title: "Service", value: "Service" },
                    { title: "FAQPage", value: "FAQPage" },
                    { title: "Article", value: "Article" },
                    { title: "Person", value: "Person" },
                ],
            },
        }),
        defineField({
            name: "keywords",
            title: "Keywords",
            type: "array",
            of: [{ type: "localizedString" }],
            options: {},
        }),
    ],
})
