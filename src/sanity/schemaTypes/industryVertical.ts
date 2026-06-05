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
                    type: 'localizedString',
                    title: 'Alternative Text',
                },
            ],
        }),
        defineField({
            name: 'heroVideo',
            title: 'Hero Video URL',
            type: 'url',
            group: 'content',
            description: 'Video de fondo opcional para la sección principal',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'localizedText',
            group: 'content',
            description: 'Resumen breve de este vertical de industria',
        }),
        defineField({
            name: 'heroHeadline',
            title: 'Hero Headline',
            type: 'localizedString',
            group: 'content',
            description: 'Titular específico de la industria desde la matriz de mensajes.',
            initialValue: { en: "The Comprehensive Financial System for [Industry] Owners", es: "El Sistema Financiero Integral para Dueños de [Industria]" },
        }),
        defineField({
            name: 'heroSubheadline',
            title: 'Hero Subheadline',
            type: 'localizedText',
            group: 'content',
            description: 'Texto de apoyo específico para este segmento de ICP.',
            initialValue: { en: "Scale your business without the tax drag. We provide the strategy, control, and advisory support specialized for your industry.", es: "Escale su negocio sin el lastre fiscal. Brindamos la estrategia, el control y la asesoría especializada para su industria." },
        }),
        defineField({
            name: 'primaryKeyword',
            title: 'Primary Target Keyword',
            type: 'localizedString',
            group: 'seo',
            description: 'ej. "asesor fiscal para contratistas"',
        }),
        defineField({
            name: 'keywordCluster',
            title: 'Supporting Keyword Cluster',
            type: 'array',
            of: [{ type: 'localizedString' }],
            group: 'seo',
            description: 'Lista de palabras clave secundarias relevantes (ej. "estrategia fiscal para construcción", "S-corp para electricistas").',
        }),
        defineField({
            name: 'localServiceAreas',
            title: 'Local Service Areas',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'seo',
            description: 'Especifique estados o regiones para el posicionamiento SEO local.',
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
            of: [{ type: 'localizedString' }],
            description: 'Puntos débiles comunes en materia fiscal/financiera para esta industria',
        }),
        defineField({
            name: 'featuredPlaybookChapters',
            title: 'Featured Playbook Chapters',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: [{ type: 'playbookChapter' }] }],
            description: 'Capítulos seleccionados específicamente relevantes para esta industria',
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
            description: 'Testimonios de clientes de esta industria',
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
                        { name: 'label', type: 'localizedString', title: 'Label' },
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
