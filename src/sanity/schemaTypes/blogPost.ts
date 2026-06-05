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
            type: 'localizedString',
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
                    type: 'localizedString',
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
                    type: 'localizedString',
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
            type: 'localizedText',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'localizedBlock',
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
            type: 'localizedString',
            description: 'La palabra clave principal para la cual se optimiza este artículo.',
        }),
        defineField({
            name: 'lastReviewedAt',
            title: 'Last Reviewed/Updated',
            type: 'datetime',
            description: 'Señal de frescura para GEO. Actualice esto cuando se verifique la precisión del contenido.',
        }),
        defineField({
            name: "faqItems",
            title: "Post-Specific FAQs (for Rich Snippets)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "question", type: "localizedString", title: "Question" },
                        { name: "answer", type: "localizedText", title: "Answer" },
                    ],
                },
            ],
            description: "Agregue de 3 a 5 preguntas específicas respondidas en este artículo para calificar para fragmentos enriquecidos de preguntas frecuentes.",
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
