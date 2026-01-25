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
    ],
});
