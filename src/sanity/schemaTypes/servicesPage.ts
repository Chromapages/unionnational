import { defineField, defineType } from 'sanity'

export const servicesPage = defineType({
    name: 'servicesPage',
    title: 'Services Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
        }),
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge',
            type: 'string',
        }),
        defineField({
            name: 'ctaTitle',
            title: 'Bottom CTA Title',
            type: 'string',
        }),
        defineField({
            name: 'ctaSubtitle',
            title: 'Bottom CTA Subtitle',
            type: 'text',
        }),
        defineField({
            name: 'ctaButtonText',
            title: 'CTA Button Text',
            type: 'string',
        }),
        defineField({
            name: 'ctaButtonUrl',
            title: 'CTA Button URL',
            type: 'string',
        }),
        defineField({
            name: "ctaBackgroundImage",
            title: "CTA Section Background",
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
    ],
})
