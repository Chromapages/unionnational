import { defineField, defineType } from "sanity";
import { HelpCircle } from "lucide-react";

export const faq = defineType({
    name: "faq",
    title: "FAQ",
    type: "document",
    icon: HelpCircle,
    fields: [
        defineField({
            name: "question",
            title: "Question",
            type: "localizedString",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "answer",
            title: "Answer",
            type: "localizedBlock",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Tax Strategy", value: "Tax Strategy" },
                    { title: "Financial Control", value: "Financial Control" },
                    { title: "Specialized Advisory", value: "Specialized Advisory" },
                    { title: "Compliance Support", value: "Compliance Support" },
                    { title: "General", value: "General" },
                ],
            },
            initialValue: "Tax Strategy",
        }),
        defineField({
            name: "targetedQuery",
            title: "Targeted Search Query",
            type: "string",
            description: "The exact long-tail query this FAQ is trying to answer (e.g. 'How much does an S-Corp save in taxes?').",
        }),
        defineField({
            name: "serpIntent",
            title: "SERP Intent",
            type: "string",
            options: {
                list: [
                    { title: "Informational (Learning)", value: "Informational" },
                    { title: "Commercial (Comparison)", value: "Commercial" },
                    { title: "Navigational (Finding)", value: "Navigational" },
                    { title: "Transactional (Buying)", value: "Transactional" },
                ],
            },
            description: "Used to ensure content satisfies the user's search goal.",
        }),
        defineField({
            name: "lastReviewedAt",
            title: "Last Reviewed At",
            type: "datetime",
            description: "Update this to ensure search engines see the answer as 'Fresh'.",
        }),
        defineField({
            name: "relatedService",
            title: "Related Service",
            type: "reference",
            to: [{ type: "service" }],
            description: "Show this FAQ on a specific service page.",
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
            title: "question.en",
            subtitle: "category",
        },
    },
});
