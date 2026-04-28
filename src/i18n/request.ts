import { getRequestConfig } from "next-intl/server";

import { locales, defaultLocale } from "./config";

export default getRequestConfig(async ({ locale, requestLocale }) => {
    const activeLocale = locale ?? (await requestLocale) ?? defaultLocale;
    const targetLocale = locales.includes(activeLocale as (typeof locales)[number])
        ? activeLocale
        : defaultLocale;

    return {
        locale: targetLocale,
        messages: (await import(`../messages/${targetLocale}.json`)).default
    };
});
