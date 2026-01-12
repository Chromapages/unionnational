import { defineField, defineType } from "sanity";
import { MessageSquareQuote } from "lucide-react";

export const testimonial = defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    icon: MessageSquareQuote,
    fields: [
        defineField({
            name: "clientName",
            title: "Client Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "clientTitle",
            title: "Client Job Title",
            type: "string",
        }),
        defineField({
            name: "clientCompany",
            title: "Client Company",
            type: "string",
        }),
        defineField({
            name: "quote",
            title: "Quote",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
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
