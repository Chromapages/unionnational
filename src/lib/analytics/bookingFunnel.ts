export type BookingFunnelEvent =
    | "strategy_call_cta_viewed"
    | "strategy_call_cta_activated"
    | "strategy_call_page_viewed"
    | "strategy_call_scheduler_opened"
    | "strategy_call_scheduler_error"
    | "strategy_call_scheduler_abandoned";

type BookingFunnelProperties = {
    strategy_call_cta_viewed: { placement: string };
    strategy_call_cta_activated: { placement: string; destination_type: "internal" | "external" };
    strategy_call_page_viewed: { page: "booking" };
    strategy_call_scheduler_opened: { provider: "embedded_scheduler" };
    strategy_call_scheduler_error: { reason: "iframe_load" | "provider_script" | "load_timeout" };
    strategy_call_scheduler_abandoned: { method: "history_back" | "fallback_link" };
};

type BookingFunnelPayload = {
    [Event in BookingFunnelEvent]: { event: Event; funnel: "strategy_call" } & BookingFunnelProperties[Event]
}[BookingFunnelEvent];

type DataLayerWindow = Window & { dataLayer?: BookingFunnelPayload[] };

/**
 * Records only operational funnel metadata. This boundary intentionally has no
 * support for contact details, free text, tax information, or calendar values.
 * Delivery is best-effort so analytics cannot delay navigation or scheduling.
 */
export function trackBookingFunnelEvent<Event extends BookingFunnelEvent>(event: Event, properties: BookingFunnelProperties[Event]) {
    if (!canUseOptionalTracking()) return;
    window.setTimeout(() => {
        if (!canUseOptionalTracking()) return;
        const browserWindow = window as DataLayerWindow;
        browserWindow.dataLayer ??= [];
        browserWindow.dataLayer.push({
            event,
            funnel: "strategy_call",
            ...properties,
        } as BookingFunnelPayload);
    }, 0);
}
import { canUseOptionalTracking } from "./privacy";
