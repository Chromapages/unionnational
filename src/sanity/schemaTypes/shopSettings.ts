import { defineField, defineType } from "sanity";
import { Store } from "lucide-react";

export const shopSettings = defineType({
    name: "shopSettings",
    title: "Shop Settings",
    type: "document",
    icon: Store,
    fields: [
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
            initialValue: "Shop Our Resources",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "heroVideo",
            title: "Hero Background Video URL",
            type: "url",
            description: "Direct URL to an mp4 or HLS stream (e.g. from Mux or BunnyCDN).",
        }),
        defineField({
            name: "featuredProduct",
            title: "Featured Product Highlight",
            type: "reference",
            to: [{ type: "product" }],
            description: "Select the main product to showcase in the hero area.",
        }),
        defineField({
            name: "faq",
            title: "Shop FAQ",
            type: "array",
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
