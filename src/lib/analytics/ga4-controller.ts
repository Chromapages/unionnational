import { adaptGa4Event } from "./events";
import { resolveGa4PageContext } from "./page-policy";
import type { Ga4ClientConfig } from "./ga4-config";

type Dependencies = { consent: () => boolean; url: () => string; send: (...args: unknown[]) => void; stop: () => void };

/** A single document owns pageviews; no pre-consent event history is queued. */
export function createGa4Controller(config: Ga4ClientConfig, dependencies: Dependencies) {
    let prepared = false, ready = false, stopped = false, lastNavigation: string | null = null;
    const viewed = new Set<string>();
    const context = () => !stopped && dependencies.consent() ? resolveGa4PageContext(dependencies.url(), config.policy) : null;
    const stop = () => { if (!stopped) dependencies.stop(); stopped = true; ready = false; viewed.clear(); };
    const defaults = (value: NonNullable<ReturnType<typeof context>>) => dependencies.send("set", {
        ...value, campaign_source: value.campaign_source || "", campaign_medium: value.campaign_medium || "", campaign_name: value.campaign_name || "",
    });
    const navigate = () => {
        const value = context();
        if (!value) { if (prepared) stop(); return false; }
        if (!ready) return false;
        defaults(value);
        const navigation = `${value.locale}:${value.page_key}`;
        if (navigation === lastNavigation) return false;
        lastNavigation = navigation; viewed.clear();
        dependencies.send("event", "page_view", { ...value, send_to: config.measurementId });
        return true;
    };
    return {
        prepare() {
            const value = context();
            if (!value || prepared) return false;
            dependencies.send("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
            defaults(value);
            dependencies.send("js", new Date());
            dependencies.send("config", config.measurementId, { ...value, send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, ads_data_redaction: true, url_passthrough: false });
            prepared = true;
            return true;
        },
        loaded() { if (!prepared || stopped) return false; ready = true; return navigate(); },
        navigate,
        dispatch(input: unknown) {
            const value = context();
            if (!value) { if (prepared) stop(); return false; }
            if (!ready) return false;
            const event = adaptGa4Event(input, value);
            if (!event) return false;
            navigate();
            if (event.eventName === "strategy_call_cta_viewed") {
                const key = String("placement" in event.params ? event.params.placement : "");
                if (viewed.has(key)) return false;
                viewed.add(key);
            }
            defaults(value);
            dependencies.send("event", event.eventName, { ...event.params, send_to: config.measurementId });
            return true;
        },
        stop,
    };
}
