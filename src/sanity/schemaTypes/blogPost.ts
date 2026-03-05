import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        // --- Identifiers ---
        defineField({
            name: 'title',
            title: 'Title',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'es', title: 'Spanish', type: 'string' },
            ],
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title.en',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        // --- References ---
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'teamMember' }],
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }],
        }),
        // --- Media ---
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'imageGallery',
            title: 'Image Gallery',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        // --- Content ---
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'text', rows: 3 },
                { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
            ],
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
                { name: 'es', title: 'Spanish', type: 'array', of: [{ type: 'block' }] },
            ],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
        }),
        defineField({
            name: 'featuredPost',
            title: 'Featured Post',
            type: 'boolean',
            initialValue: false,
        }),
        // --- SEO ---
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'openGraphImage',
            title: 'Open Graph Image',
            type: 'image',
        }),
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            author: 'author.name',
            media: 'featuredImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
