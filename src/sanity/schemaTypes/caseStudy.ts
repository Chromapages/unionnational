import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
    name: 'caseStudy',
    title: 'Case Study',
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
            name: 'clientIndustry',
            title: 'Client Industry',
            type: 'string',
        }),
        defineField({
            name: 'challenge',
            title: 'The Challenge',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'solution',
            title: 'The Solution',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'results',
            title: 'The Results',
            type: 'text',
            rows: 3,
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
        }),
        defineField({
            name: 'clientQuote',
            title: 'Client Quote',
            type: 'text',
        }),
        defineField({
            name: 'clientName',
            title: 'Client Name (Attribution)',
            type: 'string',
        }),
        defineField({
            name: 'relatedService',
            title: 'Related Service',
            type: 'reference',
            to: [{ type: 'service' }],
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
    ],
})
