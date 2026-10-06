"use client";

import { useLocale, useTranslations } from "next-intl";
import { HeroVideoPlayer } from "./HeroVideoPlayer";
import { canUseOptionalTracking } from "@/lib/analytics/privacy";

export function HomeHeroVideo({ src, poster }: { src: string; poster?: string }): React.JSX.Element {
    const locale = useLocale();
    const t = useTranslations("HomeHero");

    function handlePlay() {
        if (!canUseOptionalTracking()) return;
        const browserWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
        browserWindow.dataLayer ??= [];
        browserWindow.dataLayer.push({
            event: "hero_video_start",
            locale,
            placement: "homepage_hero",
            destination: "foreground_video",
        });
    }

    return (
        <HeroVideoPlayer
            src={src}
            poster={poster}
            ariaLabel={t("videoLabel")}
            unavailableMessage={t("unavailable")}
            retryLabel={locale === "es" ? "Reintentar video" : "Retry video"}
            soundLabel={t("soundLabel")}
            onPlay={handlePlay}
        />
    );
}
