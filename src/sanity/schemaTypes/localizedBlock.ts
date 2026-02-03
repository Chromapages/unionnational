import { defineType, defineField } from 'sanity';

export const localizedBlock = defineType({
    name: 'localizedBlock',
    title: 'Localized Block content',
    type: 'object',
    fieldsets: [
        {
            name: 'translations',
            title: 'Translations',
            options: { collapsible: true, collapsed: false }
        }
    ],
    fields: [
        defineField({
            name: 'en',
            title: 'English',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'translations',
        }),
        defineField({
            name: 'es',
            title: 'Spanish',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'translations',
        }),
    ],
});
