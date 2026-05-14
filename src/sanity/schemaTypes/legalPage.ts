import { defineField, defineType } from 'sanity'

export const legalPage = defineType({
    name: 'legalPage',
    title: 'Legal Page',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'settings', title: 'Settings' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            description: 'The full title of the legal page (e.g., "Privacy Policy", "Terms of Service")',
            type: 'localizedString',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'URL-friendly identifier (e.g., "privacy-policy", "terms-of-service")',
            type: 'slug',
            group: 'settings',
            options: {
                source: 'title.en',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'pageType',
            title: 'Page Type',
            description: 'Determines which content template and legal framework applies',
            type: 'string',
            group: 'settings',
            options: {
                layout: 'radio',
                list: [
                    { title: 'Privacy Policy', value: 'privacy' },
                    { title: 'Terms of Service', value: 'terms' },
                    { title: 'Cookie Policy', value: 'cookies' },
                    { title: 'Disclaimer', value: 'disclaimer' },
                    { title: 'E-mail Disclaimer', value: 'email-disclaimer' },
                    { title: 'Professional Responsibility', value: 'circular-230' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'jurisdiction',
            title: 'Jurisdiction',
            description: 'Applicable legal jurisdictions for this legal page',
            type: 'array',
            group: 'settings',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'United States (Federal)', value: 'us-federal' },
                    { title: 'California (CCPA/CPRA)', value: 'us-ca' },
                    { title: 'European Union (GDPR)', value: 'eu' },
                    { title: 'Canada (PIPEDA)', value: 'ca' },
                    { title: 'Brazil (LGPD)', value: 'br' },
                    { title: 'United Kingdom (UK GDPR)', value: 'uk' },
                ],
            },
            initialValue: ['us-federal'],
        }),
        defineField({
            name: 'body',
            title: 'Content',
            description: 'The main body content of the legal page, formatted as Portable Text blocks',
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'intro',
            title: 'Introduction',
            description: 'Optional introductory paragraph that appears before the main sections. Use this for scope and applicability statements.',
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'effectiveDate',
            title: 'Effective Date',
            description: 'The date this policy became/will become effective',
            type: 'date',
            group: 'settings',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Last Updated',
            description: 'The date this policy was most recently revised',
            type: 'datetime',
            group: 'settings',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
            },
        }),
        defineField({
            name: 'version',
            title: 'Version Number',
            description: 'Semantic version of this legal document (e.g., "1.0", "2.1")',
            type: 'string',
            group: 'settings',
            validation: (rule) => rule.custom((value) => {
                if (!value) return true
                if (!/^\d+\.\d+(\.\d+)?$/.test(value)) {
                    return 'Version must be a valid semantic version (e.g., "1.0" or "1.0.0")'
                }
                return true
            }),
        }),
        defineField({
            name: 'replaces',
            title: 'Replaces',
            description: 'Reference to the previous version of this document',
            type: 'reference',
            to: [{ type: 'legalPage' }],
            group: 'settings',
        }),
        defineField({
            name: 'relatedDocuments',
            title: 'Related Legal Documents',
            description: 'Links to related legal pages (e.g., Privacy Policy links to Cookie Policy)',
            type: 'array',
            group: 'settings',
            of: [{ type: 'reference', to: [{ type: 'legalPage' }] }],
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            description: 'Whether this document is live on the website',
            type: 'boolean',
            group: 'settings',
            initialValue: false,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'requiresReview',
            title: 'Requires Legal Review',
            description: 'Flag this document for review by legal counsel before publishing',
            type: 'boolean',
            group: 'settings',
            initialValue: false,
        }),
        defineField({
            name: 'reviewNotes',
            title: 'Internal Review Notes',
            description: 'Private notes for the team about required changes or legal review items. Not visible to users.',
            type: 'text',
            group: 'settings',
            rows: 3,
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            description: 'Override default SEO settings for this page',
            type: 'object',
            group: 'seo',
            fields: [
                defineField({
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'localizedString',
                }),
                defineField({
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'localizedString',
                }),
                defineField({
                    name: 'canonicalUrl',
                    title: 'Canonical URL Override',
                    type: 'url',
                }),
                defineField({
                    name: 'noIndex',
                    title: 'No Index',
                    description: 'Prevent search engines from indexing this page',
                    type: 'boolean',
                    initialValue: true,
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            pageType: 'pageType',
            isPublished: 'isPublished',
            lastUpdated: 'lastUpdated',
        },
        prepare({ title, pageType, isPublished, lastUpdated }) {
            const status = isPublished ? 'Published' : 'Draft'
            const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : ''
            return {
                title: title || 'Untitled Legal Page',
                subtitle: `${pageType ? pageType.toUpperCase() : 'Unknown'} — ${status}${date ? ` | Updated: ${date}` : ''}`,
            }
        },
    },
    orderings: [
        {
            title: 'Page Type',
            name: 'pageTypeAsc',
            by: [{ field: 'pageType', direction: 'asc' }],
        },
        {
            title: 'Last Updated (Newest)',
            name: 'lastUpdatedDesc',
            by: [{ field: 'lastUpdated', direction: 'desc' }],
        },
        {
            title: 'Title A-Z',
            name: 'titleAsc',
            by: [{ field: 'title.en', direction: 'asc' }],
        },
    ],
})