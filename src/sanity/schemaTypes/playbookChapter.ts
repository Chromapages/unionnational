import { defineType, defineField } from 'sanity'
import { FileText } from 'lucide-react'

export const playbookChapter = defineType({
    name: 'playbookChapter',
    title: 'Playbook Chapter',
    type: 'document',
    icon: FileText,
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'meta', title: 'Metadata' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Chapter Title',
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
            name: 'chapterNumber',
            title: 'Chapter Number',
            type: 'number',
            group: 'meta',
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'videoEmbed',
            title: 'Video Embed URL',
            type: 'url',
            group: 'content',
            description: 'YouTube or Vimeo embed URL for "The 2-Minute Expert" video',
        }),
        defineField({
            name: 'videoThumbnail',
            title: 'Video Thumbnail',
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
            name: 'content',
            title: 'Chapter Content',
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'keyTakeaways',
            title: 'Key Takeaways',
            type: 'array',
            group: 'content',
            of: [{ type: 'string' }],
            description: 'Bullet points summarizing main lessons from this chapter',
        }),
        defineField({
            name: 'tools',
            title: 'Related Tools',
            type: 'array',
            group: 'content',
            of: [{ type: 'string' }],
            description: 'Calculator or tool names referenced in this chapter',
        }),
        defineField({
            name: 'isGated',
            title: 'Gated Content',
            type: 'boolean',
            group: 'meta',
            initialValue: false,
            description: 'If enabled, this chapter requires email to access',
        }),
        defineField({
            name: 'gatedContent',
            title: 'Gated Content Section',
            type: 'localizedBlock',
            group: 'meta',
            description: 'Advanced content shown only after email capture',
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            group: 'meta',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'chapterNumber',
        },
        prepare(selection) {
            const { title, subtitle } = selection
            return {
                ...selection,
                title: title?.en || 'Untitled Chapter',
                subtitle: `Chapter ${subtitle}`,
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'displayOrderAsc',
            by: [{ field: 'displayOrder', direction: 'asc' }],
        },
    ],
})
