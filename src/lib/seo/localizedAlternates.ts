import type { Metadata } from "next";

const SITE_URL = "https://unionnationaltax.com";

export function localizedAlternates(locale: string, path: string): Metadata["alternates"] {
    return {
        canonical: `${SITE_URL}/${locale}${path}`,
        languages: {
            en: `${SITE_URL}/en${path}`,
            es: `${SITE_URL}/es${path}`,
        },
    };
}
