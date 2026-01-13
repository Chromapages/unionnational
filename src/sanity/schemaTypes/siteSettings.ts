import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    icon: Settings,
    fields: [
        defineField({
            name: "companyName",
            title: "Company Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
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
            options: { hotspot: true },
            description: "Optional. Use if the main logo doesn't look good on dark headers/footers.",
        }),
        defineField({
            name: "phone",
            title: "Phone Number",
            type: "string",
        }),
        defineField({
            name: "email",
            title: "Email Address",
            type: "string",
        }),
        defineField({
            name: "address",
            title: "Office Address",
            type: "object",
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
            type: "string",
            initialValue: "Book a Call",
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Header CTA URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
            initialValue: "https://calendly.com/",
        }),
        defineField({
            name: "copyrightText",
            title: "Copyright Text",
            type: "string",
            description: "Year will be added automatically.",
            initialValue: "Union National Tax. All Rights Reserved.",
        }),
    ],
});
