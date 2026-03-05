import { Briefcase } from "lucide-react";
import { defineField, defineType } from "sanity";

export const service = defineType({
    name: "service",
    title: "Service",
    type: "document",
    icon: Briefcase,
    groups: [
        { name: "content", title: "Content" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "localizedString",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "content",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "localizedText",
            group: "content",
            description: "Used in cards and previews.",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "fullDescription",
            title: "Full Description",
            type: "localizedBlock",
            group: "content",
            description: "The main content for the service detail page.",
        }),
        defineField({
            name: "icon",
            title: "Icon Name",
            type: "string",
            group: "content",
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
            of: [{ type: "localizedString" }],
            group: "content",
        }),
        defineField({
            name: "impactGoal",
            title: "Impact Goal",
            type: "localizedString",
            group: "content",
            description: "The 'Why' - Focus on the financial RESULT (e.g., 'Slash S-Corp Tax Liability by 25%'), not the process.",
        }),
        defineField({
            name: "badge",
            title: "Badge Text",
            type: "localizedString",
            group: "content",
            description: "Optional badge like 'Most Popular' or 'Scale'.",
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            group: "content",
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
            type: "localizedString",
            group: "content",
            description: "e.g., 'From $500/mo' or 'Custom Quote'",
        }),
        defineField({
            name: "isPopular",
            title: "Is Popular/Featured?",
            type: "boolean",
            group: "content",
            initialValue: false,
        }),
        defineField({
            name: "accentColor",
            title: "Accent Color",
            type: "string",
            group: "content",
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
                        { name: "question", type: "localizedString", title: "Question" },
                        { name: "answer", type: "localizedText", title: "Answer" },
                    ],
                },
            ],
            group: "content",
            initialValue: [
                {
                    question: { en: "How is this different from my current CPA?" },
                    answer: { en: "Most CPAs are generalists who react to your data once a year. We are construction specialists who proactively plan your strategy every month." }
                }
            ]
        }),
        defineField({
            name: "whyChooseUsTitle",
            title: "Why Choose Us Title",
            type: "localizedString",
            group: "content",
            description: "Custom title for the comparison section.",
            initialValue: { en: "Why Contractors Choose Union National" }
        }),
        defineField({
            name: "whyChooseUsDescription",
            title: "Why Choose Us Description",
            type: "localizedText",
            group: "content",
            description: "Optional context text to display above the comparison table.",
        }),
        defineField({
            name: "comparisonPoints",
            title: "Comparison Points",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "feature", type: "localizedString", title: "Feature" },
                        { name: "diy", type: "boolean", title: "DIY (Yes/No)" },
                        { name: "bigFirm", type: "boolean", title: "Big Firm (Yes/No)" },
                        { name: "unionNational", type: "boolean", title: "Union National (Yes/No)" },
                    ],
                    preview: {
                        select: {
                            title: "feature.en",
                        },
                    },
                },
            ],
            group: "content",
            initialValue: [
                {
                    feature: { en: "Construction Specialization" },
                    diy: false,
                    bigFirm: false,
                    unionNational: true
                },
                {
                    feature: { en: "Proactive Strategy (Year-Round)" },
                    diy: false,
                    bigFirm: false,
                    unionNational: true
                },
                {
                    feature: { en: "Audit Defense Included" },
                    diy: false,
                    bigFirm: false,
                    unionNational: true
                },
                {
                    feature: { en: "Flat-Fee Transparency" },
                    diy: true,
                    bigFirm: false,
                    unionNational: true
                }
            ]
        }),
        defineField({
            name: "videoFile",
            title: "Strategy Video File",
            type: "file",
            group: "content",
            description: "Upload an MP4 or similar file for the service walkthrough.",
        }),
        defineField({
            name: "videoThumbnail",
            title: "Strategy Video Thumbnail",
            type: "image",
            group: "content",
            options: { hotspot: true },
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
            title: "title.en",
            subtitle: "shortDescription.en",
        },
    },
});
