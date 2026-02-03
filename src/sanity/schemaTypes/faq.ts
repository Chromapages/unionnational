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
                    { title: "General", value: "General" },
                    { title: "Tax Filing", value: "Tax Filing" },
                    { title: "S-Corp Formation", value: "S-Corp Formation" },
                    { title: "Bookkeeping", value: "Bookkeeping" },
                    { title: "IRS Issues", value: "IRS Issues" },
                ],
            },
            initialValue: "General",
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
