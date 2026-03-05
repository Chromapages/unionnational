import { defineType, defineField } from 'sanity';

export const localizedText = defineType({
    name: 'localizedText',
    title: 'Localized Text',
    type: 'object',
    fieldsets: [
        {
            name: 'translations',
            title: 'Translations',
        }
    ],
    fields: [
        defineField({
            name: 'en',
            title: 'English',
            type: 'text',
            rows: 3,
            fieldset: 'translations',
        }),
        defineField({
            name: 'es',
            title: 'Spanish',
            type: 'text',
            rows: 3,
            fieldset: 'translations',
        }),
    ],
});
