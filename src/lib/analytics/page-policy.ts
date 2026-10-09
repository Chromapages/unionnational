import { z } from "zod";
import { ga4CampaignRegistrySchema, resolveGa4Attribution, type Ga4Attribution } from "./attribution";

// Candidates for local fixtures only; live approval is a separate server configuration gate.
export const ga4PageRegistry = {
    about: {
        paths: { en: "/en/about", es: "/es/about" },
        titles: { en: "About Union National Tax", es: "Acerca de Union National Tax" },
        anchors: ["main-content", "about-hero", "about-founder", "about-team", "about-next-step"],
    },
    team: {
        paths: { en: "/en/team", es: "/es/team" },
        titles: { en: "Union National Tax Team", es: "Equipo de Union National Tax" },
        anchors: ["main-content", "team-hero", "founder", "team-members", "team-next-step"],
    },
} as const;
export type Ga4PageKey = keyof typeof ga4PageRegistry;
export const ga4PolicySchema = z.object({
    origin: z.string().url().refine(value => {
        try {
            const url = new URL(value);
            return value === url.origin && (url.protocol === "https:" ||
                (url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)));
        } catch { return false; }
    }),
    approvedPageKeys: z.array(z.enum(["about", "team"])).max(2),
    campaigns: ga4CampaignRegistrySchema,
}).strict();
export type Ga4Policy = z.infer<typeof ga4PolicySchema>;
export type Ga4PageContext = Ga4Attribution & {
    page_key: Ga4PageKey;
    locale: "en" | "es";
    page_location: string;
    page_title: string;
    page_referrer: "";
};
const resolvedContexts = new WeakSet<object>();
export function isGa4PageContext(value: unknown): value is Ga4PageContext {
    return typeof value === "object" && value !== null && resolvedContexts.has(value);
}

export function resolveGa4PageContext(value: string, policy: Ga4Policy): Ga4PageContext | null {
    try {
        const parsed = ga4PolicySchema.safeParse(policy);
        if (!parsed.success || value.length > 2048 || /[\s\\\u0000-\u001f\u007f]/.test(value)) return null;
        const url = new URL(value, parsed.data.origin);
        if (url.origin !== parsed.data.origin || url.username || url.password) return null;
        // Reject URL-parser normalization (dot paths, encoded aliases, double slashes) rather than hiding it.
        const rawPath = value.match(/^(?:https?:\/\/[^/?#]+)?(\/[^?#]*)/)?.[1];
        const pathname = url.pathname.replace(/\/$/, "");
        if (!rawPath || rawPath.replace(/\/$/, "") !== pathname) return null;
        for (const page_key of parsed.data.approvedPageKeys) {
            const entry = ga4PageRegistry[page_key];
            for (const locale of ["en", "es"] as const) {
                if (pathname !== entry.paths[locale]) continue;
                if (url.hash && !(entry.anchors as readonly string[]).includes(url.hash.slice(1))) return null;
                const attribution = resolveGa4Attribution(url.searchParams, parsed.data.campaigns);
                if (!attribution) return null;
                const context: Ga4PageContext = Object.freeze({ page_key, locale,
                    page_location: parsed.data.origin + entry.paths[locale],
                    page_title: entry.titles[locale], page_referrer: "", ...attribution });
                resolvedContexts.add(context);
                return context;
            }
        }
        return null;
    } catch { return null; }
}
