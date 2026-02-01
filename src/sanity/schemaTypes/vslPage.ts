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
                    { title: "Construction", value: "Construction" },
                    { title: "Restaurants", value: "Restaurants" },
                    { title: "General", value: "General" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),

        // Hero Section
        defineField({
            name: "heroBadge",
            title: "Hero Badge Text",
            type: "string",
            group: "hero",
            initialValue: "Limited Partner Slots Available for Q3 2024",
        }),
        defineField({
            name: "heroHeadline",
            title: "Hero Headline",
            type: "string",
            group: "hero",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroSubheadline",
            title: "Hero Subheadline",
            type: "text",
            rows: 3,
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
            type: "string",
            group: "hero",
            initialValue: "Apply for Partner Program",
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
                        { name: "title", type: "string", title: "Title" },
                        { name: "description", type: "text", rows: 3, title: "Description" },
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
                { name: "quote", type: "text", rows: 3, title: "Quote" },
                { name: "author", type: "string", title: "Author Name" },
                { name: "role", type: "string", title: "Author Role" },
                { name: "company", type: "string", title: "Company" },
                { name: "authorImage", type: "image", title: "Author Image", options: { hotspot: true } },
            ],
        }),

        // Final CTA
        defineField({
            name: "ctaHeadline",
            title: "Final CTA Headline",
            type: "string",
            group: "cta",
        }),
        defineField({
            name: "ctaSubheadline",
            title: "Final CTA Subheadline",
            type: "text",
            group: "cta",
        }),
        defineField({
            name: "ctaButtonText",
            title: "Final Button Text",
            type: "string",
            group: "cta",
        }),
        defineField({
            name: "urgencyText",
            title: "Urgency / Bottom Text",
            type: "string",
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
            return {
                title: title,
                subtitle: `VSL Page (${industry})`,
            };
        },
    },
});
