import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    // icon: Store, 
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'localizedString',
            group: 'content',
            validation: (rule) => rule.required(),
            initialValue: { en: "We Don't Just File Taxes. We Engineer Wealth for Contractors.", es: "No Solo Declaramos Impuestos. Construimos Patrimonio para Contratistas." },
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'localizedText',
            group: 'content',
            initialValue: { en: "The only nationwide tax firm dedicated 100% to the construction industry. Combining aggressive S-Corp strategies with bulletproof IRS defense.", es: "La única firma fiscal a nivel nacional dedicada 100% a la industria de la construcción. Combinando estrategias agresivas de S-Corp con defensa inquebrantable ante el IRS." },
        }),
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'localizedString',
            group: 'content',
            initialValue: { en: 'Specialized for Builders', es: 'Especializado para Constructores' },
        }),
        defineField({
            name: 'missionStatement',
            title: 'Mission Statement',
            type: 'localizedText',
            group: 'content',
            initialValue: { en: "The tax code is 70,000 pages long. For most, it's a liability. For us, it's a blueprint. Our mission is to arm American contractors with the same high-level tax strategies used by Fortune 500 construction firms.", es: "El código fiscal tiene 70,000 páginas. Para la mayoría, es una carga. Para nosotros, es un plan. Nuestra misión es armar a los contratistas estadounidenses con las mismas estrategias fiscales de alto nivel que utilizan las empresas constructoras Fortune 500." },
        }),
        defineField({
            name: 'storyContent',
            title: 'Our Story',
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'valuesEyebrow',
            title: 'Values Section Eyebrow',
            type: 'localizedString',
            group: 'content',
            initialValue: { en: 'Our Code', es: 'Nuestro Código' },
        }),
        defineField({
            name: 'valuesTitle',
            title: 'Values Section Title',
            type: 'localizedString',
            group: 'content',
            initialValue: { en: 'The Foundation We Build On', es: 'Los Cimientos Sobre los Que Construimos' },
        }),
        defineField({
            name: 'values',
            title: 'Core Values (Small Cards)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'localizedString' }),
                        defineField({ name: 'description', type: 'localizedText' }),
                        defineField({ name: 'iconName', title: 'Icon Name (Lucide)', type: 'string' }),
                    ],
                },
            ],
            group: 'content',
            initialValue: [
                {
                    title: { en: "Blue-Collar Work Ethic", es: "Ética de Trabajo de Cuello Azul" },
                    description: { en: "We work as hard as you do. No energetic disconnects. We answer the phone, hit deadlines, and get the job done.", es: "Trabajamos tan duro como usted. Sin desconexiones. Contestamos el teléfono, cumplimos plazos y hacemos el trabajo." },
                    iconName: "Hammer"
                },
                {
                    title: { en: "Structural Integrity", es: "Integridad Estructural" },
                    description: { en: "Aggressive savings, zero shortcuts. Our strategies are built to withstand the weight of an IRS audit.", es: "Ahorros agresivos, cero atajos. Nuestras estrategias están diseñadas para soportar el peso de una auditoría del IRS." },
                    iconName: "ShieldCheck"
                },
                {
                    title: { en: "Proactive Blueprinting", es: "Planificación Proactiva" },
                    description: { en: "We plan your tax year in January, not December. Anticipation is better than reaction.", es: "Planificamos su año fiscal en enero, no en diciembre. La anticipación es mejor que la reacción." },
                    iconName: "ScanEye"
                },
                {
                    title: { en: "Maximum Yield", es: "Rendimiento Máximo" },
                    description: { en: "If there is a credit, we find it. If there is a deduction, we take it. We leave nothing on the table.", es: "Si hay un crédito, lo encontramos. Si hay una deducción, la tomamos. No dejamos nada en la mesa." },
                    iconName: "TrendingUp"
                }
            ]
        }),
        defineField({
            name: 'primaryValue',
            title: 'Primary Value (Integrity Card)',
            type: 'object',
            fields: [
                defineField({ name: 'badge', title: 'Badge Text', type: 'localizedString' }),
                defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
                defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
                defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'videoUrl', title: 'Video URL (YouTube/Vimeo)', type: 'url' }),
                defineField({ name: 'videoFile', title: 'Video File (Sanity Hosted)', type: 'file', options: { accept: 'video/*' } }),
            ],
            group: 'content',
            initialValue: {
                badge: { en: "Our Philosophy", es: "Nuestra Filosofía" },
                title: { en: "Aggressive Savings. Conservative Compliance.", es: "Ahorros Agresivos. Cumplimiento Conservador." },
                description: { en: "We believe you shouldn't have to choose between saving money and staying out of jail. Our Enrolled Agents specialize in the 'grey areas' of the tax code—navigating them with precision to maximize your S-Corp benefits without triggering red flags.", es: "Creemos que no debería tener que elegir entre ahorrar dinero y mantenerse fuera de problemas. Nuestros Agentes Inscritos se especializan en las 'zonas grises' del código fiscal—navegándolas con precisión para maximizar sus beneficios de S-Corp sin activar alertas." }
            }
        }),
        defineField({
            name: 'certifications',
            title: 'Certifications & Accreditations',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', type: 'localizedString' }),
                        defineField({ name: 'logo', type: 'image', options: { hotspot: true } }),
                    ],
                },
            ],
            group: 'content',
        }),
        defineField({
            name: 'timeline',
            title: 'Company Timeline',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'year', type: 'string', title: 'Year' }),
                        defineField({ name: 'title', type: 'localizedString', title: 'Milestone Title' }),
                        defineField({ name: 'description', type: 'localizedText', title: 'Description' }),
                    ],
                },
            ],
            group: 'content',
            initialValue: [
                {
                    year: "2018",
                    title: { en: "The Broken Ground", es: "El Terreno Roto" },
                    description: { en: "Founded by tax experts who saw hardworking contractors being underserved by generalist CPAs.", es: "Fundada por expertos fiscales que vieron a contratistas trabajadores siendo mal atendidos por CPAs generalistas." }
                },
                {
                    year: "2020",
                    title: { en: "Nationwide Licensing", es: "Licenciamiento Nacional" },
                    description: { en: "Achieved Enrolled Agent status across all 50 states, allowing us to defend clients anywhere.", es: "Obtuvimos el estatus de Agente Inscrito en los 50 estados, lo que nos permite defender clientes en cualquier lugar." }
                },
                {
                    year: "2022",
                    title: { en: "The $10M Milestone", es: "El Hito de los $10M" },
                    description: { en: "Surpassed $10 Million in tax savings generated for our construction clients.", es: "Superamos los $10 millones en ahorros fiscales generados para nuestros clientes de construcción." }
                },
                {
                    year: "2024",
                    title: { en: "Union National 2.0", es: "Union National 2.0" },
                    description: { en: "Launched the Virtual Executive Office for seamless, cloud-first compliance.", es: "Lanzamos la Oficina Ejecutiva Virtual para un cumplimiento fluido y basado en la nube." }
                }
            ]
        }),
        defineField({
            name: 'clientLogos',
            title: 'Client Logos',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            group: 'content',
        }),
        defineField({
            name: 'founderVideoUrl',
            title: 'Founder Video URL (YouTube/Vimeo)',
            type: 'url',
            group: 'content',
        }),
        defineField({
            name: 'founderVideoFile',
            title: 'Founder Video File (Sanity Hosted)',
            type: 'file',
            group: 'content',
            options: {
                accept: 'video/*'
            }
        }),
        defineField({
            name: 'founderImage',
            title: 'Founder Image',
            type: 'image',
            group: 'content',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'localizedString',
                },
            ],
        }),
        defineField({
            name: "ctaTitle",
            title: "Bottom CTA Title",
            type: "localizedString",
            group: 'content',
            initialValue: { en: "Is Your Current CPA 'Just Filing'?", es: "¿Su CPA Actual Solo 'Declara'?" },
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "localizedText",
            group: 'content',
            initialValue: { en: "Switch to a strategic partner who builds wealth. Get a free analysis of your last 2 tax returns.", es: "Cambie a un socio estratégico que construye riqueza. Obtenga un análisis gratuito de sus últimas 2 declaraciones de impuestos." },
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "localizedString",
            group: 'content',
            initialValue: { en: "Get My Free Retro-Analysis", es: "Obtenga Mi Análisis Retroactivo Gratuito" },
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Button URL",
            type: "url",
            group: 'content',
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
        }),
        defineField({
            name: "ctaBackgroundImage",
            title: "CTA Section Background",
            type: "image",
            group: 'content',
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "localizedString",
                },
            ],
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
            title: 'heroTitle',
            subtitle: 'heroSubtitle',
        },
        prepare({ title, subtitle }) {
            return {
                title: title?.en || 'About Page',
                subtitle: subtitle?.en || '',
            }
        },
    },
})
