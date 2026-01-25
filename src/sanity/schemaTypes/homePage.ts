import { defineField, defineType } from "sanity";
import { Home } from "lucide-react";

export const homePage = defineType({
    name: "homePage",
    title: "Home Page",
    type: "document",
    icon: Home,
    groups: [
        { name: "hero", title: "Hero Section" },
        { name: "trust", title: "Trust Bar" },
        { name: "stats", title: "Statistics" },
        { name: "cta", title: "CTA Section" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        // Hero Section
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
            group: "hero",
            validation: (Rule) => Rule.required(),
            initialValue: "Stop Overpaying the IRS. We build wealth.",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "text",
            rows: 3,
            group: "hero",
            initialValue: "Boutique S-Corp specialists and Fractional CFO services for contractors and business owners.",
        }),
        defineField({
            name: "heroVideoUrl",
            title: "Hero Background Video URL",
            type: "url",
            group: "hero",
            description: "URL to the HLS stream or mp4 file.",
        }),
        defineField({
            name: "heroCtaText",
            title: "Hero CTA Text",
            type: "string",
            group: "hero",
            initialValue: "Watch 2 Min Intro",
        }),
        defineField({
            name: "heroCtaUrl",
            title: "Hero CTA Video URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http"] }),
            group: "hero",
            description: "Video to open in modal when clicked.",
        }),

        // Trust Bar
        defineField({
            name: "trustLogos",
            title: "Trust / Client Logos",
            type: "array",
            group: "trust",
            of: [
                {
                    type: "image",
                    fields: [
                        { name: "alt", type: "string", title: "Company Name" },
                    ],
                },
            ],
        }),

        // Stats Section
        defineField({
            name: "stats",
            title: "Key Statistics",
            type: "array",
            group: "stats",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "value", type: "string", title: "Value (e.g. $10M+)" },
                        { name: "label", type: "string", title: "Label (e.g. Tax Saved)" },
                    ],
                },
            ],
        }),

        // CTA Section (Pricing/Bottom)
        defineField({
            name: "ctaTitle",
            title: "Bottom CTA Title",
            type: "string",
            group: "cta",
            initialValue: "Ready to keep more of what you earn?",
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "text",
            rows: 2,
            group: "cta",
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "string",
            group: "cta",
            initialValue: "Book a Discovery Call",
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Button URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
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
            title: "heroTitle",
        },
        prepare({ title }) {
            return {
                title: "Home Page Settings",
                subtitle: title,
            };
        },
    },
});
