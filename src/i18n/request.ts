import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { locales, defaultLocale } from "./config";

export default getRequestConfig(async ({ locale }) => {
    console.log('>>> [DEBUG] getRequestConfig called with locale:', locale);

    const activeLocale = locale || defaultLocale;
    console.log('>>> [DEBUG] activeLocale:', activeLocale);

    // Safety check just in case
    const targetLocale = locales.includes(activeLocale as any) ? activeLocale : defaultLocale;
    console.log('>>> [DEBUG] targetLocale:', targetLocale);

    try {
        const messages = (await import(`../messages/${targetLocale}.json`)).default;
        console.log('>>> [DEBUG] messages loaded successfully');
        return {
            locale: targetLocale,
            messages
        };
    } catch (err) {
        console.error('>>> [CRITICAL] Failed to load i18n messages:', err);
        throw err;
    }
});
