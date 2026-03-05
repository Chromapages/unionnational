import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    icon: Settings,
    groups: [
        { name: "content", title: "Content" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "companyName",
            title: "Company Name",
            type: "string",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "localizedString",
            group: "content",
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            group: "content",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "string",
                },
            ],
        }),
        defineField({
            name: "logoAlt",
            title: "Logo for Dark Backgrounds",
            type: "image",
            group: "content",
            options: { hotspot: true },
            description: "Optional. Use if the main logo doesn't look good on dark headers/footers.",
        }),
        defineField({
            name: "phone",
            title: "Phone Number",
            type: "string",
            group: "content",
        }),
        defineField({
            name: "email",
            title: "Email Address",
            type: "string",
            group: "content",
        }),
        defineField({
            name: "address",
            title: "Office Address",
            type: "object",
            group: "content",
            fields: [
                { name: "street", type: "string", title: "Street Address" },
                { name: "city", type: "string", title: "City" },
                { name: "state", type: "string", title: "State" },
                { name: "zip", type: "string", title: "Zip Code" },
            ],
        }),
        defineField({
            name: "businessHours",
            title: "Business Hours",
            type: "array",
            group: "content",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "day", type: "string", title: "Day" },
                        { name: "hours", type: "string", title: "Hours" },
                    ],
                },
            ],
        }),
        defineField({
            name: "socialLinks",
            title: "Social Media Links",
            type: "object",
            group: "content",
            fields: [
                { name: "linkedin", type: "url", title: "LinkedIn URL" },
                { name: "facebook", type: "url", title: "Facebook URL" },
                { name: "youtube", type: "url", title: "YouTube URL" },
                { name: "instagram", type: "url", title: "Instagram URL" },
                { name: "twitter", type: "url", title: "X (Twitter) URL" },
            ],
        }),
        defineField({
            name: "ctaButtonText",
            title: "Header CTA Text",
            type: "localizedString",
            group: "content",
            initialValue: { en: "Book a Call" },
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Header CTA URL",
            type: "url",
            group: "content",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
            initialValue: "https://calendly.com/",
        }),
        defineField({
            name: "seo",
            title: "Default SEO (Global Fallback)",
            type: "seo",
            group: "seo",
            description: "Default metadata for pages that don't have their own SEO defined.",
        }),
        defineField({
            name: "metaTitleSuffix",
            title: "Meta Title Suffix",
            type: "string",
            group: "seo",
            description: "Text appended to the end of every page title (e.g., ' | Union National Tax').",
            initialValue: " | Union National Tax",
        }),
        defineField({
            name: "metaTitleSeparator",
            title: "Meta Title Separator",
            type: "string",
            group: "seo",
            description: "The character(s) between the page title and the suffix.",
            initialValue: " | ",
        }),
        defineField({
            name: "copyrightText",
            title: "Copyright Text",
            type: "localizedString",
            group: "content",
            description: "Year will be added automatically.",
            initialValue: { en: "Union National Tax. All Rights Reserved." },
        }),
    ],
});
