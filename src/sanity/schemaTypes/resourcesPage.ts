import { defineField, defineType } from "sanity";
import { Library } from "lucide-react";

export const resourcesPage = defineType({
    name: "resourcesPage",
    title: "Resources Page",
    type: "document",
    icon: Library,
    groups: [
        { name: "hero", title: "Hero Section" },
        { name: "content", title: "Content Settings" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "localizedString",
            group: "hero",
            validation: (Rule) => Rule.required(),
            initialValue: { en: "Resources Hub", es: "Centro de Recursos" },
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "localizedText",
            group: "hero",
            initialValue: { en: "Explore our collection of guides, playbooks, and insights to help you optimize your tax strategy.", es: "Explore nuestra colección de guías, manuales y análisis para ayudarle a optimizar su estrategia fiscal." },
        }),
        defineField({
            name: "featuredResource",
            title: "Featured Resource",
            type: "reference",
            group: "content",
            to: [
                { type: "playbook" },
                { type: "blogPost" },
            ],
            description: "Seleccione un manual o artículo del blog destacado para resaltar en la parte superior de la página.",
        }),
        defineField({
            name: "categories",
            title: "Resource Categories",
            type: "array",
            group: "content",
            of: [{ type: "reference", to: [{ type: "blogCategory" }] }],
            description: "Seleccione categorías para mostrar en el filtro. Déjelo vacío para mostrar todas las categorías.",
        }),
        defineField({
            name: "showPlaybooks",
            title: "Show Playbooks",
            type: "boolean",
            group: "content",
            initialValue: true,
            description: "Mostrar manuales en la cuadrícula de recursos.",
        }),
        defineField({
            name: "showBlogPosts",
            title: "Show Blog Posts",
            type: "boolean",
            group: "content",
            initialValue: true,
            description: "Mostrar artículos del blog en la cuadrícula de recursos.",
        }),
        defineField({
            name: "showTools",
            title: "Show Interactive Tools",
            type: "boolean",
            group: "content",
            initialValue: true,
            description: "Mostrar la sección de Encuesta de Revisión de Salud.",
        }),
        defineField({
            name: "seo",
            title: "SEO Overrides",
            type: "seo",
            group: "seo",
        }),
    ],
    preview: {
        select: {
            title: "heroTitle",
        },
        prepare({ title }) {
            return {
                title: "Resources Page Settings",
                subtitle: title?.en || "No Title",
            };
        },
    },
});
