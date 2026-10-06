const CONTROL_OR_BACKSLASH = /[\u0000-\u0020\u007f\\]/;

export function safeHref(value: unknown, { contact = false }: { contact?: boolean } = {}): string | null {
    if (typeof value !== "string" || !value || value.length > 2048 || CONTROL_OR_BACKSLASH.test(value)) return null;
    if (value.startsWith("#")) return /^#[a-z0-9_-]+$/i.test(value) ? value : null;
    if (value.startsWith("/") && !value.startsWith("//")) return /%(?:2f|5c|0[0-9a-f]|1[0-9a-f]|7f)/i.test(value) ? null : value;
    if (contact && /^mailto:[^?\s@]+@[^?\s@]+\.[^?\s@]+$/i.test(value)) return value;
    if (contact && /^tel:\+?[\d().-]+$/i.test(value)) return value;
    try {
        const parsed = new URL(value);
        return parsed.protocol === "https:" && !parsed.username && !parsed.password ? parsed.toString() : null;
    } catch { return null; }
}

export function getCalendarUrl(value: unknown): string | null {
    const safe = safeHref(value);
    if (!safe?.startsWith("https://")) return null;
    const url = new URL(safe);
    return !url.port && url.hostname === "link.agent-crm.com" && /^\/widget\/booking\/[a-zA-Z0-9_-]{10,80}\/?$/.test(url.pathname) ? url.toString() : null;
}

export function getVideoEmbedUrl(value: unknown, autoplay = false): string | null {
    const safe = safeHref(value);
    if (!safe?.startsWith("https://")) return null;
    const url = new URL(safe);
    if (url.port) return null;
    let id: string | null = null;
    if (["youtube.com", "www.youtube.com", "www.youtube-nocookie.com", "youtu.be"].includes(url.hostname)) {
        id = url.hostname === "youtu.be" ? url.pathname.slice(1) : url.pathname === "/watch" ? url.searchParams.get("v") : /^\/(?:embed|shorts)\/([\w-]+)$/.exec(url.pathname)?.[1] || null;
        return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&rel=0` : null;
    }
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)) {
        id = /^\/(?:video\/)?(\d{1,12})\/?$/.exec(url.pathname)?.[1] || null;
        return id ? `https://player.vimeo.com/video/${id}?autoplay=${autoplay ? 1 : 0}` : null;
    }
    return null;
}

export function getMapEmbedUrl(value: unknown): string | null {
    const safe = safeHref(value);
    if (!safe?.startsWith("https://")) return null;
    const url = new URL(safe);
    return !url.port && ["www.google.com", "maps.google.com"].includes(url.hostname) && /^\/maps\/embed(?:\/|$)/.test(url.pathname) ? safe : null;
}

export function getMediaUrl(value: unknown): string | null {
    const safe = safeHref(value);
    if (!safe || safe.startsWith("#")) return null;
    if (safe.startsWith("/")) return safe;
    const url = new URL(safe);
    return ["cdn.sanity.io", "content.apisystem.tech"].includes(url.hostname) ? safe : null;
}
