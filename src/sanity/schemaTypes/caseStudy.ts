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
            name: 'clientIndustry',
            title: 'Client Industry',
            type: 'localizedString',
            group: 'content',
        }),
        defineField({
            name: 'challenge',
            title: 'The Challenge',
            type: 'localizedText',
            group: 'content',
        }),
        defineField({
            name: 'solution',
            title: 'The Solution',
            type: 'localizedText',
            group: 'content',
        }),
        defineField({
            name: 'results',
            title: 'The Results',
            type: 'localizedText',
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
                        defineField({ name: 'label', type: 'localizedString' }),
                        defineField({ name: 'before', type: 'localizedString' }),
                        defineField({ name: 'after', type: 'localizedString' }),
                    ],
                },
            ],
            group: 'content',
        }),
        defineField({
            name: 'clientQuote',
            title: 'Client Quote',
            type: 'localizedText',
            group: 'content',
        }),
        defineField({
            name: 'clientName',
            title: 'Client Name (Attribution)',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'taxSavingsAmount',
            title: 'Verified Tax Savings',
            type: 'string',
            description: 'ej. "$23,400 por año" o "38% de reducción total".',
            group: 'content',
        }),
        defineField({
            name: 'timeframe',
            title: 'Savings Timeframe',
            type: 'localizedString',
            description: 'ej. "Primeros 12 meses" o "Ahorros anuales continuos".',
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
            name: 'legalDisclaimer',
            title: 'Legal / Results Disclaimer',
            type: 'localizedText',
            description: 'Required for YMYL. e.g. "Results may vary. Past performance does not guarantee future tax outcomes."',
            initialValue: {
                en: 'Past performance is not a guarantee of future results. All tax savings are based on individual business circumstances and current IRS regulations.',
                es: 'El rendimiento pasado no es garantía de resultados futuros. Todos los ahorros fiscales se basan en las circunstancias comerciales individuales y las regulaciones vigentes del IRS.'
            },
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
