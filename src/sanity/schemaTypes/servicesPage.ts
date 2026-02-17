import { defineField, defineType } from 'sanity'

export const servicesPage = defineType({
    name: 'servicesPage',
    title: 'Services Page',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            group: 'content',
            initialValue: "The Complete Financial Toolkit for Construction",
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            group: 'content',
            initialValue: "Most CPAs just file forms. We build financial infrastructure. From aggressive tax reduction to audit-proof bookkeeping, get everything your construction business needs under one roof.",
        }),
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge',
            type: 'string',
            group: 'content',
            initialValue: "End-to-End Service",
        }),
        defineField({
            name: 'ctaTitle',
            title: 'Bottom CTA Title',
            type: 'string',
            group: 'content',
            initialValue: "Not Sure Which Service You Need?",
        }),
        defineField({
            name: 'ctaSubtitle',
            title: 'Bottom CTA Subtitle',
            type: 'text',
            group: 'content',
            initialValue: "Every engagement starts with a diagnostic. We'll examine your last 2 years of returns to tell you exactly where you're overpaying—before you sign a contract.",
        }),
        defineField({
            name: 'ctaButtonText',
            title: 'CTA Button Text',
            type: 'string',
            group: 'content',
            initialValue: "Book Your Diagnostic",
        }),
        defineField({
            name: 'ctaButtonUrl',
            title: 'CTA Button URL',
            type: 'string',
            group: 'content',
            initialValue: "/contact",
        }),
        defineField({
            name: "ctaBackgroundImage",
            title: "CTA Section Background",
            type: "image",
            group: 'content',
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
            name: "seo",
            title: "SEO Overrides",
            type: "seo",
            group: "seo",
        }),
    ],
})
