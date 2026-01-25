import { defineField, defineType } from 'sanity'

export const contactSettings = defineType({
    name: 'contactSettings',
    title: 'Contact Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'Contact Us',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'heroStats',
            title: 'Hero Statistics',
            type: 'object',
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
            fields: [
                { name: 'name', type: 'string', title: 'Name' },
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'image', type: 'image', title: 'Photo' },
                { name: 'quote', type: 'text', title: 'Personal Quote' },
                { name: 'credentials', type: 'array', of: [{ type: 'string' }], title: 'Credentials' },
            ],
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
        }),
        defineField({
            name: 'contactPhone',
            title: 'Contact Phone',
            type: 'string',
        }),
        defineField({
            name: 'officeAddress',
            title: 'Office Address',
            type: 'object',
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
            description: 'Embed URL from GHL Calendar Settings → Share → Embed Code',
        }),
        defineField({
            name: 'alternativeCTA',
            title: 'Alternative CTA Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'subtitle', type: 'string', title: 'Subtitle' },
                { name: 'phone', type: 'string', title: 'Override Phone Number' },
            ],
        }),
        defineField({
            name: 'formTitle',
            title: 'Contact Form Title',
            type: 'string',
        }),
        defineField({
            name: 'formSubtitle',
            title: 'Contact Form Subtitle',
            type: 'text',
        }),
        defineField({
            name: 'mapEmbedUrl',
            title: 'Map Embed URL',
            type: 'url',
            description: 'Google Maps Shared Embed URL or link.',
        }),
        defineField({
            name: 'seo',
            title: 'SEO & Metadata',
            type: 'seo',
            group: 'seo',
        }),
    ],
    groups: [
        { name: 'seo', title: 'SEO' },
    ],
})
