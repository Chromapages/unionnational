import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export const teamPage = defineType({
    name: 'teamPage',
    title: 'Team Page Settings',
    type: 'document',
    icon: FileText,
    fields: [
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'localizedString',
            initialValue: { en: 'Construction-Exclusive Experts', es: 'Expertos Exclusivos de Construcción' },
            group: 'hero',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'localizedString',
            initialValue: { en: 'The Architects of Your Financial Infrastructure', es: 'Los Arquitectos de Su Infraestructura Financiera' },
            group: 'hero',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'localizedText',
            initialValue: { en: "Most accountants have never set foot on a job site. Our team specializes exclusively in construction accounting, meaning we don't just understand the numbers—we understand the trade.", es: "La mayoría de los contadores nunca han pisado un sitio de construcción. Nuestro equipo se especializa exclusivamente en contabilidad de construcción, lo que significa que no solo entendemos los números—entendemos el oficio." },
            group: 'hero',
        }),
        defineField({
            name: 'founderSectionTitle',
            title: 'Founder Section Title',
            type: 'localizedString',
            initialValue: { en: 'Built From The Ground Up', es: 'Construido Desde los Cimientos' },
            group: 'founder',
        }),
        defineField({
            name: 'teamSectionTitle',
            title: 'Team Section Title',
            type: 'localizedString',
            initialValue: { en: 'Your Dedicated Crew', es: 'Su Equipo Dedicado' },
            group: 'team',
        }),
        defineField({
            name: 'teamSectionSubtitle',
            title: 'Team Section Subtitle',
            type: 'localizedString',
            initialValue: { en: 'No call centers. No junior generalists. Just seasoned Enrolled Agents who know the difference between a sub-contractor and an employee.', es: 'Sin call centers. Sin generalistas junior. Solo Agentes Inscritos con experiencia que conocen la diferencia entre un subcontratista y un empleado.' },
            group: 'team',
        }),
        defineField({
            name: 'values',
            title: 'Values',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'localizedString', title: 'Title' }),
                        defineField({ name: 'description', type: 'localizedText', title: 'Description' }),
                        defineField({ name: 'iconName', type: 'string', title: 'Lucide Icon Name' }),
                    ],
                },
            ],
            group: 'values',
            initialValue: [
                {
                    title: { en: "On-Site Speed", es: "Velocidad En Sitio" },
                    description: { en: "We answer fast. Payroll and deadlines don't wait, and neither do we.", es: "Respondemos rápido. La nómina y los plazos no esperan, y nosotros tampoco." },
                    iconName: "Zap"
                },
                {
                    title: { en: "Laser-Level Accuracy", es: "Precisión a Nivel Láser" },
                    description: { en: "Precision matters. We build tax returns with the same care you build houses.", es: "La precisión importa. Construimos declaraciones fiscales con el mismo cuidado con el que usted construye casas." },
                    iconName: "Crosshair"
                },
                {
                    title: { en: "Audit Armor", es: "Armadura de Auditoría" },
                    description: { en: "We don't just file; we defend. We stand between you and the IRS.", es: "No solo declaramos; defendemos. Nos interponemos entre usted y el IRS." },
                    iconName: "Shield"
                },
                {
                    title: { en: "Proactive Communication", es: "Comunicación Proactiva" },
                    description: { en: "We call you with ideas before you call us with problems.", es: "Le llamamos con ideas antes de que usted nos llame con problemas." },
                    iconName: "MessageSquare"
                }
            ]
        }),
        defineField({
            name: 'hiringBadge',
            title: 'Hiring Badge Text',
            type: 'localizedString',
            initialValue: { en: 'Join the Elite', es: 'Únase a la Élite' },
            group: 'hiring',
        }),
        defineField({
            name: 'hiringTitle',
            title: 'Hiring Title',
            type: 'localizedString',
            initialValue: { en: "We Don't Hire Generalists.", es: "No Contratamos Generalistas." },
            group: 'hiring',
        }),
        defineField({
            name: 'hiringDescription',
            title: 'Hiring Description',
            type: 'localizedText',
            initialValue: { en: "We are building the premier financial team for the construction industry. If you want to specialize, stop grinding through 1040s and start building wealth for clients.", es: "Estamos construyendo el equipo financiero líder para la industria de la construcción. Si quiere especializarse, deje de luchar con 1040s y empiece a construir riqueza para clientes." },
            group: 'hiring',
        }),
        defineField({
            name: 'hiringBenefits',
            title: 'Hiring Benefits',
            type: 'array',
            of: [{ type: 'localizedString' }],
            group: 'hiring',
            initialValue: [
                { en: "100% Remote Context", es: "Trabajo 100% Remoto" },
                { en: "Above-Market Compensation", es: "Compensación Por Encima del Mercado" },
                { en: "Specialized Training", es: "Capacitación Especializada" },
                { en: "Zero 'Busy Season' Burnout", es: "Cero Agotamiento de 'Temporada Alta'" }
            ]
        }),
        defineField({
            name: 'hiringCtaText',
            title: 'Hiring CTA Text',
            type: 'localizedString',
            initialValue: { en: 'View Open Positions', es: 'Ver Posiciones Abiertas' },
            group: 'hiring',
        }),
        defineField({
            name: 'hiringCtaUrl',
            title: 'Hiring CTA URL',
            type: 'url',
            group: 'hiring',
        }),
        defineField({
            name: 'hiringImage',
            title: 'Hiring Section Image',
            type: 'image',
            options: { hotspot: true },
            group: 'hiring',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            group: 'seo',
        }),
        defineField({
            name: "ctaTitle",
            title: "Bottom CTA Title",
            type: "localizedString",
            group: "hiring",
            initialValue: { en: "Ready to Upgrade Your Crew?", es: "¿Listo Para Mejorar Su Equipo?" },
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "localizedText",
            group: "hiring",
            initialValue: { en: "Your business deserves a financial team that works as hard as you do.", es: "Su negocio merece un equipo financiero que trabaje tan duro como usted." },
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "localizedString",
            group: "hiring",
            initialValue: { en: "Book a Strategy Call", es: "Reserve Una Llamada de Estrategia" },
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Button URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
            group: "hiring",
        }),
        defineField({
            name: "ctaBackgroundImage",
            title: "CTA Section Background",
            type: "image",
            group: "hiring",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "localizedString",
                },
            ],
        }),
    ],
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'founder', title: 'Founder Section' },
        { name: 'team', title: 'Team Grid' },
        { name: 'values', title: 'Values' },
        { name: 'hiring', title: 'Hiring / Culture' },
        { name: 'seo', title: 'SEO' },
    ],
    preview: {
        select: {
            title: 'heroTitle',
        },
        prepare({ title }) {
            return {
                title: 'Team Page Settings',
                subtitle: title?.en || 'No title set',
            }
        },
    },
})
