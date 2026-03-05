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
