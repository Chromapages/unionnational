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
            title: 'Google Maps Embed URL',
            type: 'url',
        }),
    ],
})
