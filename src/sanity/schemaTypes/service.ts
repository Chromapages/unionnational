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
            initialValue: { en: "Stop overpaying. Keep more of what you earn." },
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
                    { title: "Tax Strategy", value: "Tax Strategy" },
                    { title: "Financial Control", value: "Financial Control" },
                    { title: "Specialized Advisory", value: "Specialized Advisory" },
                    { title: "Compliance Support", value: "Compliance Support" },
                ],
            },
            initialValue: "Tax Strategy",
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
            initialValue: { en: "Why Growth-Minded Owners Choose Union National" }
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
            name: "roadmap",
            title: "Process Roadmap",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "stepNumber", type: "string", title: "Step Number (e.g. 01)" },
                        { name: "title", type: "localizedString", title: "Step Title" },
                        { name: "description", type: "localizedText", title: "Step Description" },
                    ],
                    preview: {
                        select: {
                            title: "title.en",
                            subtitle: "stepNumber",
                        },
                    },
                },
            ],
            group: "content",
            description: "Step-by-step installation process for this service.",
        }),
        defineField({
            name: "eligibilityPros",
            title: "Who Is This For? (Pros)",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "content",
            description: "List of criteria for ideal candidates.",
        }),
        defineField({
            name: "eligibilityCons",
            title: "Who Is This Not For? (Cons)",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "content",
            description: "List of criteria for non-ideal candidates.",
        }),
        defineField({
            name: "trustSignals",
            title: "Trust Strip / Value Props",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "content",
            description: "Short signals like 'IRS Enrolled Agent Prepared'.",
        }),
        defineField({
            name: "problemAgitation",
            title: "Problem Agitation Section",
            type: "object",
            fields: [
                { name: "title", type: "localizedString", title: "Section Title" },
                { name: "description", type: "localizedText", title: "Section Description" },
            ],
            group: "content",
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
            name: "targetKeyword",
            title: "Service Target Keyword",
            type: "string",
            description: "Primary keyword for this service landing page.",
            group: "seo",
        }),
        defineField({
            name: "targetAudience",
            title: "Primary Audience",
            type: "string",
            description: "e.g. 'Residential Contractors', 'HVAC Business Owners'.",
            group: "content",
        }),
        defineField({
            name: "keyBenefit",
            title: "Single Core Benefit",
            type: "localizedString",
            description: "The #1 outcome: e.g. 'Save $23,000 yearly by switching to S-Corp'.",
            group: "content",
        }),
        defineField({
            name: "eligibility",
            title: "Who Is This For? (Snippet Ready)",
            type: "localizedText",
            description: "Briefly define who qualifies. Great for 'How to' or 'Who needs' snippets.",
            group: "content",
        }),
        defineField({
            name: "schema_faq",
            title: "Featured Snippet FAQs",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "question", type: "string", title: "Question" },
                        { name: "answer", type: "text", title: "Answer", rows: 3 },
                    ],
                },
            ],
            description: "3-5 high-volume questions specifically for the FAQPage schema. Distinct from the display FAQs.",
            group: "content",
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
