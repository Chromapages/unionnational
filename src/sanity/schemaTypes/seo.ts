import { defineField, defineType } from "sanity";

export const seo = defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "localizedString",
            validation: (Rule) => Rule.max(60).warning("Keep meta titles under 60 characters."),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "localizedText",
            validation: (Rule) => Rule.max(160).warning("Keep meta descriptions under 160 characters."),
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
