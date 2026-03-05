import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'clientIndustry',
            title: 'Client Industry',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'challenge',
            title: 'The Challenge',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'solution',
            title: 'The Solution',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'results',
            title: 'The Results',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'metrics',
            title: 'Key Metrics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string' }),
                        defineField({ name: 'before', type: 'string' }),
                        defineField({ name: 'after', type: 'string' }),
                    ],
                },
            ],
            group: 'content',
        }),
        defineField({
            name: 'clientQuote',
            title: 'Client Quote',
            type: 'text',
            group: 'content',
        }),
        defineField({
            name: 'clientName',
            title: 'Client Name (Attribution)',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'relatedService',
            title: 'Related Service',
            type: 'reference',
            to: [{ type: 'service' }],
            group: 'content',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            group: 'content',
            options: { hotspot: true },
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            type: 'boolean',
            group: 'content',
            initialValue: true,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured',
            type: 'boolean',
            group: 'content',
            initialValue: false,
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            type: 'seo',
            group: 'seo',
        }),
    ],
})
