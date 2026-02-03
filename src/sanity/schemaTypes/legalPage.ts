import { defineField, defineType } from 'sanity'

export const legalPage = defineType({
    name: 'legalPage',
    title: 'Legal Page',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'localizedString',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title.en',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'pageType',
            title: 'Page Type',
            type: 'string',
            group: 'content',
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
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Last Updated',
            type: 'datetime',
            group: 'content',
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            type: 'boolean',
            group: 'content',
            initialValue: true,
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            type: 'seo',
            group: 'seo',
        }),
    ],
})
