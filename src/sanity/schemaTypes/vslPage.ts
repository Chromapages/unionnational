import { defineField, defineType } from "sanity";
import { Play } from "lucide-react";

export const vslPage = defineType({
    name: "vslPage",
    title: "VSL Page",
    type: "document",
    icon: Play,
    groups: [
        { name: "hero", title: "Hero Section" },
        { name: "valueProps", title: "Value Props" },
        { name: "testimonial", title: "Testimonial" },
        { name: "cta", title: "Final CTA" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Internal Title",
            type: "string",
            group: "hero",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "hero",
            description: "Use 'vsl/construction' or 'vsl/restaurants'",
            validation: (Rule) => Rule.required(),
            options: {
                source: "title",
                maxLength: 96,
            },
        }),
        defineField({
            name: "industry",
            title: "Industry Focus",
            type: "string",
            group: "hero",
            options: {
                list: [
                    { title: "Construction", value: "construction" },
                    { title: "Restaurants", value: "restaurants" },
                    { title: "Real Estate", value: "real-estate" },
                    { title: "Tax Resolution", value: "tax-resolution" },
                    { title: "General", value: "general" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "benefitsTitle",
            title: "Benefits/Problems Section Title",
            type: "localizedString",
            description: "e.g., 'Who This Is For' or 'Problems We Solve'",
            group: "valueProps",
        }),
        defineField({
            name: "benefitsList",
            title: "Benefits/Problems List",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "valueProps",
        }),
        defineField({
            name: "resultsTitle",
            title: "Results Section Title",
            type: "localizedString",
            description: "e.g., 'Average Client Results'",
            group: "valueProps",
        }),
        defineField({
            name: "resultsList",
            title: "Results List",
            type: "array",
            of: [{ type: "localizedString" }],
            group: "valueProps",
        }),

        // Hero Section
        defineField({
            name: "heroBadge",
            title: "Hero Badge Text",
            type: "localizedString",
            group: "hero",
        }),
        defineField({
            name: "heroHeadline",
            title: "Hero Headline",
            type: "localizedString",
            group: "hero",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroSubheadline",
            title: "Hero Subheadline",
            type: "localizedText",
            group: "hero",
        }),
        defineField({
            name: "videoFile",
            title: "Video File",
            type: "file",
            group: "hero",
            description: "Upload MP4, WebM, or MOV video file",
            options: {
                accept: "video/*",
            },
        }),
        defineField({
            name: "videoPoster",
            title: "Video Poster Image",
            type: "image",
            group: "hero",
            description: "Thumbnail/poster image before video plays",
            options: { hotspot: true },
        }),
        defineField({
            name: "heroCtaText",
            title: "Hero CTA Text",
            type: "localizedString",
            group: "hero",
        }),
        defineField({
            name: "heroCtaUrl",
            title: "Hero CTA URL",
            type: "string",
            group: "hero",
            description: "Relative URL like /construction/apply",
        }),

        // Value Props
        defineField({
            name: "valuePropositions",
            title: "Value Propositions",
            type: "array",
            group: "valueProps",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "icon", type: "string", title: "Icon Name (from Lucide)", initialValue: "Check" },
                        { name: "title", type: "localizedString", title: "Title" },
                        { name: "description", type: "localizedText", title: "Description" },
                    ],
                },
            ],
        }),

        // Testimonial
        defineField({
            name: "testimonial",
            title: "Featured Testimonial",
            type: "object",
            group: "testimonial",
            fields: [
                { name: "quote", type: "localizedText", title: "Quote" },
                { name: "author", type: "localizedString", title: "Author Name" },
                { name: "role", type: "localizedString", title: "Author Role" },
                { name: "company", type: "localizedString", title: "Company" },
                { name: "authorImage", type: "image", title: "Author Image", options: { hotspot: true } },
            ],
        }),

        // Final CTA
        defineField({
            name: "ctaHeadline",
            title: "Final CTA Headline",
            type: "localizedString",
            group: "cta",
        }),
        defineField({
            name: "ctaSubheadline",
            title: "Final CTA Subheadline",
            type: "localizedText",
            group: "cta",
        }),
        defineField({
            name: "ctaButtonText",
            title: "Final Button Text",
            type: "localizedString",
            group: "cta",
        }),
        defineField({
            name: "urgencyText",
            title: "Urgency / Bottom Text",
            type: "localizedString",
            group: "cta",
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
            title: "title",
            industry: "industry",
        },
        prepare({ title, industry }) {
            const industryLabels: Record<string, string> = {
                "construction": "Construction",
                "restaurants": "Restaurants",
                "real-estate": "Real Estate",
                "tax-resolution": "Tax Resolution",
                "general": "General",
            };
            return {
                title: title,
                subtitle: `VSL Page (${industryLabels[industry] || industry})`,
            };
        },

    },
});
