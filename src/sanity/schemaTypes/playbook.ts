import { defineType, defineField } from 'sanity'
import { BookOpen } from 'lucide-react'

export const playbook = defineType({
    name: 'playbook',
    title: 'Playbook',
    type: 'document',
    icon: BookOpen,
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'chapters', title: 'Chapters' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
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
            name: 'description',
            title: 'Description',
            type: 'localizedText',
            group: 'content',
            description: 'Short summary shown in listings and SEO meta.',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
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
            name: 'chapters',
            title: 'Chapters',
            type: 'array',
            group: 'chapters',
            of: [{ type: 'reference', to: [{ type: 'playbookChapter' }] }],
            description: 'Ordered list of chapters in this playbook',
        }),
        defineField({
            name: 'gatedPdf',
            title: 'Gated PDF Download',
            type: 'file',
            group: 'chapters',
            description: 'Full PDF version of the playbook (available after email capture)',
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured Playbook',
            type: 'boolean',
            group: 'content',
            initialValue: false,
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
            media: 'coverImage',
        },
        prepare(selection) {
            const { title, media } = selection
            return {
                ...selection,
                title: title?.en || 'Untitled Playbook',
                media,
            }
        },
    },
})
