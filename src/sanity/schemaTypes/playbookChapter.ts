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
            description: 'URL de inserción de YouTube o Vimeo para el video "El Experto en 2 Minutos"',
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
                    type: 'localizedString',
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
            of: [{ type: 'localizedString' }],
            description: 'Puntos clave que resumen las lecciones principales de este capítulo',
        }),
        defineField({
            name: 'tools',
            title: 'Related Tools',
            type: 'array',
            group: 'content',
            of: [{ type: 'localizedString' }],
            description: 'Nombres de calculadoras o herramientas mencionadas en este capítulo',
        }),
        defineField({
            name: 'isGated',
            title: 'Gated Content',
            type: 'boolean',
            group: 'meta',
            initialValue: false,
            description: 'Si está activado, este capítulo requiere un correo electrónico para acceder',
        }),
        defineField({
            name: 'gatedContent',
            title: 'Gated Content Section',
            type: 'localizedBlock',
            group: 'meta',
            description: 'Contenido avanzado que se muestra solo después de capturar el correo electrónico',
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
