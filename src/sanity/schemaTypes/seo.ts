import { defineField, defineType } from "sanity";

export const seo = defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            validation: (Rule) => Rule.max(60).warning("Keep meta titles under 60 characters."),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            rows: 3,
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
            description: "The preferred URL for this page (helps prevent duplicate content).",
        }),
        defineField({
            name: "noIndex",
            title: "No-Index",
            type: "boolean",
            description: "Hide this page from search engines (e.g. thank-you pages).",
            initialValue: false,
        }),
        defineField({
            name: "structuredDataType",
            title: "Structured Data Type",
            type: "string",
            description: "Hint for what type of schema to generate for this page.",
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
            of: [{ type: "string" }],
            options: {},
        }),
    ],
})
