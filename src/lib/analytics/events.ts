import { z } from "zod";
import { isGa4PageContext, type Ga4PageContext } from "./page-policy";

const placement = z.enum(["about_final_cta", "team_final_cta"]);
export const ga4EventSchema = z.discriminatedUnion("event", [
    z.object({ event: z.literal("strategy_call_cta_viewed"), funnel: z.literal("strategy_call"), placement }).strict(),
    z.object({ event: z.literal("strategy_call_cta_activated"), funnel: z.literal("strategy_call"), placement,
        destination_type: z.enum(["internal", "external"]) }).strict(),
    z.object({ event: z.literal("footer_navigation_item_navigate"), surface: z.literal("global_footer"),
        category_id: z.literal("company"), destination_id: z.enum(["/about", "/team"]) }).strict(),
]);
export function adaptGa4Event(input: unknown, context: Ga4PageContext) {
    const event = ga4EventSchema.safeParse(input);
    // Only immutable contexts issued by the route/campaign policy may enter the vendor adapter.
    if (!event.success || !isGa4PageContext(context)) return null;
    const { event: eventName, ...properties } = event.data;
    if ("placement" in properties && properties.placement !== `${context.page_key}_final_cta`) return null;
    return { eventName, params: { ...context, ...properties } };
}
