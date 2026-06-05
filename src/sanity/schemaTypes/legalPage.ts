import { defineField, defineType } from 'sanity'

export const legalPage = defineType({
    name: 'legalPage',
    title: 'Legal Page',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'settings', title: 'Settings' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            description: 'El título completo de la página legal (ej., "Política de Privacidad", "Términos de Servicio")',
            type: 'localizedString',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'Identificador URL-amigable (ej., "politica-de-privacidad", "terminos-de-servicio")',
            type: 'slug',
            group: 'settings',
            options: {
                source: 'title.en',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'pageType',
            title: 'Page Type',
            description: 'Determina qué plantilla de contenido y marco legal aplica',
            type: 'string',
            group: 'settings',
            options: {
                layout: 'radio',
                list: [
                    { title: 'Privacy Policy', value: 'privacy' },
                    { title: 'Terms of Service', value: 'terms' },
                    { title: 'Cookie Policy', value: 'cookies' },
                    { title: 'Disclaimer', value: 'disclaimer' },
                    { title: 'E-mail Disclaimer', value: 'email-disclaimer' },
                    { title: 'Professional Responsibility', value: 'circular-230' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'jurisdiction',
            title: 'Jurisdiction',
            description: 'Jurisdicciones legales aplicables para esta página legal',
            type: 'array',
            group: 'settings',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'United States (Federal)', value: 'us-federal' },
                    { title: 'California (CCPA/CPRA)', value: 'us-ca' },
                    { title: 'European Union (GDPR)', value: 'eu' },
                    { title: 'Canada (PIPEDA)', value: 'ca' },
                    { title: 'Brazil (LGPD)', value: 'br' },
                    { title: 'United Kingdom (UK GDPR)', value: 'uk' },
                ],
            },
            initialValue: ['us-federal'],
        }),
        defineField({
            name: 'body',
            title: 'Content',
            description: 'El contenido principal del cuerpo de la página legal, formateado como bloques de Portable Text',
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'intro',
            title: 'Introduction',
            description: 'Párrafo introductorio opcional que aparece antes de las secciones principales. Use esto para declaraciones de alcance y aplicabilidad.',
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'effectiveDate',
            title: 'Effective Date',
            description: 'La fecha en que esta política entró o entrará en vigencia',
            type: 'date',
            group: 'settings',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Last Updated',
            description: 'La fecha de la revisión más reciente de esta política',
            type: 'datetime',
            group: 'settings',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
            },
        }),
        defineField({
            name: 'version',
            title: 'Version Number',
            description: 'Versión semántica de este documento legal (ej., "1.0", "2.1")',
            type: 'string',
            group: 'settings',
            validation: (rule) => rule.custom((value) => {
                if (!value) return true
                if (!/^\d+\.\d+(\.\d+)?$/.test(value)) {
                    return 'La versión debe ser una versión semántica válida (ej., "1.0" o "1.0.0")'
                }
                return true
            }),
        }),
        defineField({
            name: 'replaces',
            title: 'Replaces',
            description: 'Referencia a la versión anterior de este documento',
            type: 'reference',
            to: [{ type: 'legalPage' }],
            group: 'settings',
        }),
        defineField({
            name: 'relatedDocuments',
            title: 'Related Legal Documents',
            description: 'Enlaces a páginas legales relacionadas (ej., la Política de Privacidad enlaza a la Política de Cookies)',
            type: 'array',
            group: 'settings',
            of: [{ type: 'reference', to: [{ type: 'legalPage' }] }],
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            description: 'Si este documento está publicado en el sitio web',
            type: 'boolean',
            group: 'settings',
            initialValue: false,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'requiresReview',
            title: 'Requires Legal Review',
            description: 'Marque este documento para revisión por asesoría legal antes de publicarlo',
            type: 'boolean',
            group: 'settings',
            initialValue: false,
        }),
        defineField({
            name: 'reviewNotes',
            title: 'Internal Review Notes',
            description: 'Notas privadas para el equipo sobre cambios requeridos o elementos de revisión legal. No son visibles para los usuarios.',
            type: 'text',
            group: 'settings',
            rows: 3,
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            description: 'Anular la configuración SEO predeterminada para esta página',
            type: 'seo',
            group: 'seo',
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            pageType: 'pageType',
            isPublished: 'isPublished',
            lastUpdated: 'lastUpdated',
        },
        prepare({ title, pageType, isPublished, lastUpdated }) {
            const status = isPublished ? 'Published' : 'Draft'
            const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : ''
            return {
                title: title || 'Untitled Legal Page',
                subtitle: `${pageType ? pageType.toUpperCase() : 'Unknown'} — ${status}${date ? ` | Updated: ${date}` : ''}`,
            }
        },
    },
    orderings: [
        {
            title: 'Page Type',
            name: 'pageTypeAsc',
            by: [{ field: 'pageType', direction: 'asc' }],
        },
        {
            title: 'Last Updated (Newest)',
            name: 'lastUpdatedDesc',
            by: [{ field: 'lastUpdated', direction: 'desc' }],
        },
        {
            title: 'Title A-Z',
            name: 'titleAsc',
            by: [{ field: 'title.en', direction: 'asc' }],
        },
    ],
})