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
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            group: 'content',
        }),
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'ctaTitle',
            title: 'Bottom CTA Title',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'ctaSubtitle',
            title: 'Bottom CTA Subtitle',
            type: 'text',
            group: 'content',
        }),
        defineField({
            name: 'ctaButtonText',
            title: 'CTA Button Text',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'ctaButtonUrl',
            title: 'CTA Button URL',
            type: 'string',
            group: 'content',
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
