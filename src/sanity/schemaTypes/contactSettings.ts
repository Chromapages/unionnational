import { defineField, defineType } from 'sanity'

export const contactSettings = defineType({
    name: 'contactSettings',
    title: 'Contact Settings',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'localizedString',
            group: 'content',
            initialValue: { en: 'Contact Us' },
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'localizedText',
            group: 'content',
        }),
        defineField({
            name: 'heroStats',
            title: 'Hero Statistics',
            type: 'object',
            group: 'content',
            fields: [
                { name: 'clients', type: 'number', title: 'Clients Served' },
                { name: 'savings', type: 'string', title: 'Total Tax Savings (e.g., "$2.3B")' },
                { name: 'responseTime', type: 'string', title: 'Average Response Time' },
            ],
        }),
        defineField({
            name: 'founder',
            title: 'Founder Spotlight',
            type: 'object',
            group: 'content',
            fields: [
                { name: 'name', type: 'string', title: 'Name' },
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'image', type: 'image', title: 'Photo' },
                { name: 'quote', type: 'localizedText', title: 'Personal Quote' },
                { name: 'credentials', type: 'array', of: [{ type: 'localizedString' }], title: 'Credentials' },
            ],
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'contactPhone',
            title: 'Contact Phone',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'officeAddress',
            title: 'Office Address',
            type: 'object',
            group: 'content',
            fields: [
                defineField({ name: 'street', type: 'string' }),
                defineField({ name: 'city', type: 'string' }),
                defineField({ name: 'state', type: 'string' }),
                defineField({ name: 'zip', type: 'string' }),
            ],
        }),
        defineField({
            name: 'officeHours',
            title: 'Office Hours',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'day', title: 'Day(s)', type: 'string' }),
                        defineField({ name: 'hours', title: 'Hours', type: 'string' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'ghlCalendarUrl',
            title: 'GoHighLevel Calendar URL',
            type: 'url',
            group: 'content',
            description: 'Embed URL from GHL Calendar Settings → Share → Embed Code',
        }),
        defineField({
            name: 'alternativeCTA',
            title: 'Alternative CTA Section',
            type: 'object',
            group: 'content',
            fields: [
                { name: 'title', type: 'localizedString', title: 'Title' },
                { name: 'subtitle', type: 'localizedString', title: 'Subtitle' },
                { name: 'phone', type: 'string', title: 'Override Phone Number' },
            ],
        }),
        defineField({
            name: 'formTitle',
            title: 'Contact Form Title',
            type: 'localizedString',
            group: 'content',
        }),
        defineField({
            name: 'formSubtitle',
            title: 'Contact Form Subtitle',
            type: 'localizedText',
            group: 'content',
        }),
        defineField({
            name: 'mapEmbedUrl',
            title: 'Map Embed URL',
            type: 'url',
            group: 'content',
            description: 'Google Maps Shared Embed URL or link.',
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            type: 'seo',
            group: 'seo',
        }),
    ],
})
