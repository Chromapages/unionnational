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
            type: "localizedString",
        }),
        defineField({
            name: "clientCompany",
            title: "Client Company",
            type: "string",
        }),
        defineField({
            name: "quote",
            title: "Quote",
            type: "localizedText",
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
            name: "savingsAmount",
            title: "Tax Savings (if applicable)",
            type: "string",
            description: "e.g. '$12,400' - powerful social proof metric.",
        }),
        defineField({
            name: "industry",
            title: "Client Industry",
            type: "string",
            description: "Used to group testimonials for segment-specific landing pages.",
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
            description: "Toggle on to show 'Verified Client' badge for trust.",
            initialValue: true,
        }),
        defineField({
            name: "outcome",
            title: "Succinct Outcome",
            type: "localizedString",
            description: "e.g. 'Saved $23k via S-Corp election'. Short and scannable.",
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
