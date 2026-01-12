import { defineField, defineType } from 'sanity'

export const legalPage = defineType({
    name: 'legalPage',
    title: 'Legal Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'pageType',
            title: 'Page Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Privacy Policy', value: 'privacy' },
                    { title: 'Terms of Service', value: 'terms' },
                    { title: 'Cookie Policy', value: 'cookies' },
                    { title: 'Disclaimer', value: 'disclaimer' },
                ],
            },
        }),
        defineField({
            name: 'body',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Last Updated',
            type: 'datetime',
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            type: 'boolean',
            initialValue: true,
        }),
    ],
})
