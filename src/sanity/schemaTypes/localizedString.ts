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
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const parent = context.parent as { en?: string } | undefined;
                    if (parent?.en && !value) {
                        return {
                            message: 'Spanish translation is still empty.',
                            level: 'warning',
                        };
                    }
                    return true;
                }),
        }),
    ],
});
