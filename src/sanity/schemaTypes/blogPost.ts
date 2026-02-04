import { defineType, defineField } from 'sanity'
import { FileText } from 'lucide-react'

export const blogPost = defineType({
    name: 'blogPost',
    title: 'Blog Posts',
    type: 'document',
    icon: FileText,
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
            name: 'author',
            title: 'Author',
            type: 'reference',
            group: 'content',
            to: [{ type: 'teamMember' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
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
                    description: 'Important for SEO and accessibility.',
                },
            ],
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'localizedText',
            group: 'content',
            validation: (Rule) => Rule.max(200),
            description: 'Short summary for previews and SEO.',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
            group: 'content',
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured Post',
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
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'featuredImage',
        },
        prepare(selection) {
            const { author, title } = selection
            return {
                ...selection,
                title: title?.en || "Untitled",
                subtitle: author && `by ${author}`
            }
        },
    },
});
