import { defineType, defineField } from 'sanity';

export const localizedBlock = defineType({
    name: 'localizedBlock',
    title: 'Localized Block content',
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
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const parent = context.parent as { en?: unknown[] } | undefined;
                    if (Array.isArray(parent?.en) && parent.en.length > 0 && (!Array.isArray(value) || value.length === 0)) {
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
