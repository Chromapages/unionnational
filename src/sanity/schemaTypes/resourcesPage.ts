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
            initialValue: { en: "Resources Hub" },
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "localizedText",
            group: "hero",
            initialValue: { en: "Explore our collection of guides, playbooks, and insights to help you optimize your tax strategy." },
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
            description: "Select a featured playbook or blog post to highlight at the top of the page.",
        }),
        defineField({
            name: "categories",
            title: "Resource Categories",
            type: "array",
            group: "content",
            of: [{ type: "reference", to: [{ type: "blogCategory" }] }],
            description: "Select categories to show in the filter. Leave empty to show all categories.",
        }),
        defineField({
            name: "showPlaybooks",
            title: "Show Playbooks",
            type: "boolean",
            group: "content",
            initialValue: true,
            description: "Display playbooks in the resources grid.",
        }),
        defineField({
            name: "showBlogPosts",
            title: "Show Blog Posts",
            type: "boolean",
            group: "content",
            initialValue: true,
            description: "Display blog posts in the resources grid.",
        }),
        defineField({
            name: "showTools",
            title: "Show Interactive Tools",
            type: "boolean",
            group: "content",
            initialValue: true,
            description: "Display the Health Check Survey section.",
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
