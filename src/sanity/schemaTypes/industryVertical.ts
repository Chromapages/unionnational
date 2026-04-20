import { defineType, defineField } from 'sanity'
import { Building2 } from 'lucide-react'

export const industryVertical = defineType({
    name: 'industryVertical',
    title: 'Industry Vertical',
    type: 'document',
    icon: Building2,
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Industry Title',
            type: 'localizedString',
            group: 'content',
            validation: (Rule) => Rule.required(),
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
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            group: 'content',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                },
            ],
        }),
        defineField({
            name: 'heroVideo',
            title: 'Hero Video URL',
            type: 'url',
            group: 'content',
            description: 'Optional background video for the hero section',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'localizedText',
            group: 'content',
            description: 'Brief overview of this industry vertical',
        }),
        defineField({
            name: 'heroHeadline',
            title: 'Hero Headline',
            type: 'localizedString',
            group: 'content',
            description: 'Industry-specific headline from the messaging matrix.',
            initialValue: { en: "The Comprehensive Financial System for [Industry] Owners" },
        }),
        defineField({
            name: 'heroSubheadline',
            title: 'Hero Subheadline',
            type: 'localizedText',
            group: 'content',
            description: 'Supporting copy specifically for this ICP segment.',
            initialValue: { en: "Scale your business without the tax drag. We provide the strategy, control, and advisory support specialized for your industry." },
        }),
        defineField({
            name: 'primaryKeyword',
            title: 'Primary Target Keyword',
            type: 'string',
            group: 'seo',
            description: 'e.g. "tax advisor for contractors"',
        }),
        defineField({
            name: 'keywordCluster',
            title: 'Supporting Keyword Cluster',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'seo',
            description: 'List of relevant secondary keywords (e.g. "construction tax strategy", "S-corp for electricians").',
        }),
        defineField({
            name: 'localServiceAreas',
            title: 'Local Service Areas',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'seo',
            description: 'Specify states or regions for local SEO targeting.',
        }),
        defineField({
            name: 'cta',
            title: 'Segment-Specific CTA',
            type: 'object',
            group: 'content',
            fields: [
                { name: 'text', type: 'localizedString', title: 'CTA Label' },
                { name: 'url', type: 'url', title: 'CTA URL' },
            ],
        }),
        defineField({
            name: 'painPoints',
            title: 'Pain Points',
            type: 'array',
            group: 'content',
            of: [{ type: 'string' }],
            description: 'Common tax/financial pain points for this industry',
        }),
        defineField({
            name: 'featuredPlaybookChapters',
            title: 'Featured Playbook Chapters',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: [{ type: 'playbookChapter' }] }],
            description: 'Curated chapters specifically relevant to this industry',
        }),
        defineField({
            name: 'relatedPlaybooks',
            title: 'Related Playbooks',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: [{ type: 'playbook' }] }],
        }),
        defineField({
            name: 'clientTestimonials',
            title: 'Client Testimonials',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
            description: 'Testimonials from clients in this industry',
        }),
        defineField({
            name: 'stats',
            title: 'Industry Stats',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', type: 'string', title: 'Value' },
                        { name: 'label', type: 'string', title: 'Label' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            group: 'content',
            initialValue: true,
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            group: 'content',
            initialValue: 0,
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            type: 'seo',
            group: 'seo',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'heroImage',
        },
        prepare(selection) {
            const { title, media } = selection
            return {
                ...selection,
                title: title?.en || 'Untitled Industry',
                media,
            }
        },
    },
})
