import { defineType, defineField } from 'sanity';

export const localizedString = defineType({
    name: 'localizedString',
    title: 'Localized String',
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
            type: 'string',
            fieldset: 'translations',
        }),
        defineField({
            name: 'es',
            title: 'Spanish',
            type: 'string',
            fieldset: 'translations',
        }),
    ],
});
