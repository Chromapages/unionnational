"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useOptionalTracking } from "@/components/privacy/TrackingPreferences";
import { useCspNonce } from "@/components/security/CspNonceProvider";
import { canUseOptionalTracking, markOptionalToolsLoaded } from "@/lib/analytics/privacy";

const META_PIXEL_ID = "1320632069943065";
type EventData = Record<string, string | number | string[] | number[]>;
type Pixel = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; loaded: boolean; version: string; push?: Pixel };
type PixelWindow = Window & { fbq?: Pixel; _fbq?: Pixel };
const ALLOWED_DATA_KEYS = new Set(["content_name", "content_id", "content_ids", "content_type", "content_category", "value", "currency", "num_items", "name", "category", "source", "step", "percent", "video_name", "progress"]);

function installPixelQueue() {
    const win = window as PixelWindow;
    if (win.fbq) return;
    const pixel = function (...args: unknown[]) {
        if (!canUseOptionalTracking()) { pixel.queue = []; return; }
        if (pixel.callMethod) pixel.callMethod(...args);
        else if (pixel.queue.length < 50) pixel.queue.push(args);
    } as Pixel;
    pixel.queue = [];
    pixel.loaded = true;
    pixel.version = "2.0";
    pixel.push = pixel;
    win.fbq = pixel;
    win._fbq = pixel;
}

function sanitizeEventData(data?: EventData): EventData {
    const clean: EventData = {};
    for (const [key, value] of Object.entries(data || {})) {
        if (!ALLOWED_DATA_KEYS.has(key)) continue;
        const safe = (item: unknown) => typeof item === "number" ? Number.isFinite(item) && Math.abs(item) <= 1e9
            : typeof item === "string" && item.length <= 160 && !/[\u0000-\u001f<>@]|(?:https?:|token=|session_id=)/i.test(item);
        if (Array.isArray(value)) {
            if (value.length <= 20 && value.every(safe)) clean[key] = value;
        } else if (safe(value)) clean[key] = value;
    }
    return clean;
}

export function trackMetaEvent(eventName: string, data?: EventData) {
    if (!canUseOptionalTracking() || !/^[A-Za-z][A-Za-z0-9_]{1,60}$/.test(eventName)) return;
    installPixelQueue();
    (window as PixelWindow).fbq?.("track", eventName, sanitizeEventData(data));
}

export function MetaPixel({ event, customData }: { event?: string; customData?: EventData }) {
    const enabled = useOptionalTracking();
    const nonce = useCspNonce();
    useEffect(() => { if (enabled) { markOptionalToolsLoaded(); installPixelQueue(); } }, [enabled]);
    useEffect(() => { if (enabled && event) trackMetaEvent(event, customData); }, [enabled, event, customData]);
    if (!enabled) return null;
    return <Script id="meta-pixel-library" src="https://connect.facebook.net/en_US/fbevents.js" nonce={nonce} strategy="afterInteractive" onLoad={() => {
        if (!canUseOptionalTracking()) return;
        markOptionalToolsLoaded();
        (window as PixelWindow).fbq?.("init", META_PIXEL_ID);
        trackMetaEvent("PageView");
    }} />;
}
