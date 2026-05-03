import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Extracts a string from a potentially localized Sanity field.
 * Handles both raw strings and objects like { en: "...", es: "..." }.
 */
export function extractString(value: unknown, locale: string = 'en', fallback: string = ''): string {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && value !== null) {
        const obj = value as Record<string, unknown>;
        // Try current locale, then English, then any first available string value
        const val = obj[locale] || obj['en'] || Object.values(obj).find(v => typeof v === 'string');
        return typeof val === 'string' ? val : fallback;
    }
    return fallback;
}
