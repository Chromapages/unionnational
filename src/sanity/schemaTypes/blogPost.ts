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
        defineField({
            name: 'targetKeyword',
            title: 'Primary Target Keyword',
            type: 'string',
            description: 'The main keyword this post is optimized for.',
        }),
        defineField({
            name: 'lastReviewedAt',
            title: 'Last Reviewed/Updated',
            type: 'datetime',
            description: 'GEO freshness signal. Update this when content is verified for accuracy.',
        }),
        defineField({
            name: "faqItems",
            title: "Post-Specific FAQs (for Rich Snippets)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "question", type: "string", title: "Question" },
                        { name: "answer", type: "text", title: "Answer", rows: 3 },
                    ],
                },
            ],
            description: "Add 3-5 specific questions answered in this post to qualify for FAQ rich snippets.",
        }),
        // --- SEO ---
        defineField({
            name: 'seo',
            title: 'SEO & Metadata',
            type: 'seo',
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
