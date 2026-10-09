export type FooterInteractionEvent =
    | "footer_service_directory_navigate"
    | "footer_contact_activate"
    | "footer_resource_navigate"
    | "footer_social_exit"
    | "footer_legal_access"
    | "footer_navigation_group_expand"
    | "footer_navigation_item_navigate";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function trackFooterInteraction(event: FooterInteractionEvent, destinationId: string, categoryId?: string) {
    dispatchGa4Hook({ event, surface: "global_footer", destination_id: destinationId, ...(categoryId ? { category_id: categoryId } : {}) });
    if (!canUseOptionalTracking()) return;
    const browserWindow = window as DataLayerWindow;
    browserWindow.dataLayer ??= [];
    browserWindow.dataLayer.push({
        event,
        surface: "global_footer",
        destination_id: destinationId,
        ...(categoryId ? { category_id: categoryId } : {}),
    });
}
import { canUseOptionalTracking } from "./privacy";
import { dispatchGa4Hook } from "./ga4-client";
