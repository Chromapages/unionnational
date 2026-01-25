import { Briefcase } from "lucide-react";
import { defineField, defineType } from "sanity";

export const service = defineType({
    name: "service",
    title: "Service",
    type: "document",
    icon: Briefcase,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "text",
            rows: 3,
            description: "Used in cards and previews.",
            validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
            name: "fullDescription",
            title: "Full Description",
            type: "array",
            of: [{ type: "block" }],
            description: "The main content for the service detail page.",
        }),
        defineField({
            name: "icon",
            title: "Icon Name",
            type: "string",
            description: "Lucide icon name (e.g., 'Notebook', 'BarChart3').",
            options: {
                list: [
                    { title: "Notebook (Bookkeeping)", value: "Notebook" },
                    { title: "Bar Chart (CFO)", value: "BarChart3" },
                    { title: "Building (S-Corp)", value: "Building2" },
                    { title: "Line Chart (Consulting)", value: "LineChart" },
                    { title: "File Check (Filing)", value: "FileCheck" },
                    { title: "Rocket (Formation)", value: "Rocket" },
                    { title: "Briefcase (General)", value: "Briefcase" },
                ],
            },
        }),
        defineField({
            name: "features",
            title: "Key Features",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "impactGoal",
            title: "Impact Goal",
            type: "string",
            description: "The 'Why' - e.g., 'Maximize your S-Corp tax savings.'",
        }),
        defineField({
            name: "badge",
            title: "Badge Text",
            type: "string",
            description: "Optional badge like 'Most Popular' or 'Scale'.",
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Tax Services", value: "Tax" },
                    { title: "Bookkeeping", value: "Bookkeeping" },
                    { title: "CFO & Advisory", value: "CFO" },
                    { title: "Business Formation", value: "Formation" },
                ],
            },
            initialValue: "Tax",
        }),
        defineField({
            name: "startingPrice",
            title: "Starting Price",
            type: "string",
            description: "e.g., 'From $500/mo' or 'Custom Quote'",
        }),
        defineField({
            name: "isPopular",
            title: "Is Popular/Featured?",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "accentColor",
            title: "Accent Color",
            type: "string",
            description: "Hex code for accent (e.g., #D4AF37).",
        }),
        defineField({
            name: "faq",
            title: "FAQ",
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
        defineField({
            name: "comparisonPoints",
            title: "Comparison Points",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "feature", type: "string", title: "Feature" },
                        { name: "diy", type: "boolean", title: "DIY (Yes/No)" },
                        { name: "bigFirm", type: "boolean", title: "Big Firm (Yes/No)" },
                        { name: "unionNational", type: "boolean", title: "Union National (Yes/No)" },
                    ],
                    preview: {
                        select: {
                            title: "feature",
                        },
                    },
                },
            ],
        }),
        defineField({
            name: "videoFile",
            title: "Strategy Video File",
            type: "file",
            description: "Upload an MP4 or similar file for the service walkthrough.",
        }),
        defineField({
            name: "videoThumbnail",
            title: "Strategy Video Thumbnail",
            type: "image",
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "shortDescription",
        },
    },
});
