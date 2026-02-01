import { defineField, defineType } from "sanity";
import { Store } from "lucide-react";

export const shopSettings = defineType({
    name: "shopSettings",
    title: "Shop Settings",
    type: "document",
    icon: Store,
    groups: [
        { name: "content", title: "Content" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
            group: "content",
            initialValue: "Shop Our Resources",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "text",
            rows: 3,
            group: "content",
        }),
        defineField({
            name: "heroVideo",
            title: "Hero Background Video URL",
            type: "url",
            group: "content",
            description: "Direct URL to an mp4 or HLS stream (e.g. from Mux or BunnyCDN).",
        }),
        defineField({
            name: "featuredProduct",
            title: "Featured Product Highlight",
            type: "reference",
            to: [{ type: "product" }],
            group: "content",
            description: "Select the main product to showcase in the hero area.",
        }),
        defineField({
            name: "faq",
            title: "Shop FAQ",
            type: "array",
            group: "content",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "question", type: "string", title: "Question" },
                        { name: "answer", type: "text", title: "Answer" },
                    ],
                },
            ],
        }),
        defineField({
            name: "recoveryCTA",
            title: "Recovery CTA",
            type: "object",
            group: "content",
            fields: [
                defineField({ name: "title", type: "string", title: "Title" }),
                defineField({ name: "subtitle", type: "text", title: "Subtitle" }),
                defineField({ name: "buttonText", type: "string", title: "Button Text" }),
                defineField({
                    name: "buttonUrl",
                    type: "url",
                    title: "Button URL",
                    validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
                }),
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
                title: title || "Shop Settings",
            };
        },
    },
});
