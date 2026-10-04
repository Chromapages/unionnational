# Restore the homepage hero video

Date: 2026-09-30  
Routes: `/en`, `/es`  
Status: implemented and browser-verified on 2026-09-30.

## Findings

The previous `VideoHero.tsx` used `HeroVideoPlayer.tsx`, reading `heroPlayerVideoUrl` and `heroPlayerPosterUrl` from `HOME_PAGE_QUERY`. It fell back to `heroVideoUrl` when a foreground URL was absent. The current route fetches site settings but no homepage media, and `ConsumerHome.tsx` has only a text column.

A read-only check confirmed the existing CMS document has a published MP4 in both video URL fields. The poster fields are currently empty; keep support for them without substituting a misleading thumbnail. The old video is the source to reuse, not a new upload or background video.

## Plan

1. Restore `HOME_PAGE_QUERY` in the route's parallel data fetch. Pass normalized media URL/poster props to the current homepage. Keep its existing copy and SEO. If optional media is unavailable, retain the working text hero.
2. Reuse `HeroVideoPlayer` through a small client integration that supplies localized labels and the previous once-per-session `hero_video_start` event. Keep the remainder of the page server-rendered.
3. Use a wrapping flex layout with the copy on the left and a larger 16:9 video column on the right when space permits. On narrower screens or enlarged text, stack the video below the copy. Preserve navbar-aligned gutters, brand fonts, existing headline/CTA copy, and the shared hero edge spacing.
4. Keep native playback controls available while muted so autoplay can be paused. Move the existing sound shortcut above the native control bar, localize it, and delegate keyboard behavior to the native video/button controls. Keep the existing error fallback and optional caption-track API.
5. Update the existing player regression expectations for always-available native controls; do not run saved tests/build/lint/typecheck under workspace instructions. Verify live browser playback, mute/pause/resume, keyboard access, failure fallback, tracking, and responsive geometry.

Native video controls provide pause/resume, seeking, and volume; automatic moving content must have a way to pause it. [MDN video controls](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video), [W3C pause/stop/hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

## Acceptance

- Exactly one foreground video, with the same CMS source as the previous hero.
- Right of the copy on desktop; stacked below it on mobile/tablet and when enlarged text needs room.
- Reserved 16:9 space before playback; no video/copy overlap, clipping, or horizontal overflow at 320, 375, 768, 1024, 1440, and 1920px in both locales.
- Muted autoplay retains an available pause control; sound shortcut and native controls work with keyboard input.
- Existing video-start event fires once with `placement: homepage_hero`, locale, and `destination: foreground_video`.
- Media errors display the existing localized fallback; optional CMS failure does not break the page's booking/copy.
- No marketing-copy change, new dependency, duplicate player, replacement hero, or modification to unrelated review/outcome/CTA sections.

Expected files: homepage route, `ConsumerHome.tsx`, a small `HomeHeroVideo.tsx` integration, existing `HeroVideoPlayer.tsx` and its existing check, and localized sound-label fields.

## Completion

Restored the same published 40.5-second, 1920×1080 CMS clip. The route fetches the existing homepage query and passes only normalized video/poster URLs to the current hero. A small client bridge reuses `HeroVideoPlayer`, localizes its labels, and preserves the prior video-start event. No replacement hero, duplicate video, CMS write, new dependency, or unrelated section change was made.

The hero uses wrapping flex columns with a larger video area. Both locales place the player on the right at 1024, 1440, and 1920px, and below the copy at 320, 375, and 768px. The ratio remains 16:9, with no overlap, copy clipping, or page overflow. The shared hero edge spacing remains 48/72/96px. At 200% root text enlargement the columns stack without clipping.

Native controls remain available while muted. The sound shortcut uses a 44px target, sits above the native control bar, and appears after its handlers initialize. The player synchronizes mute state from the native element, reports playback from the successful play promise as well as native events, and checks pre-existing media errors. These changes address events that may occur before hydration.

Final browser checks in EN/ES passed muted startup, an early sound click, keyboard pause/resume, keyboard unmute, native re-mute synchronization, exactly one `hero_video_start` event, and the localized fallback following a native error event. No JavaScript errors were observed. An aborted network-request probe did not reliably produce an immediate native error, so the fallback claim is scoped to the browser error-event path rather than a network timeout policy.

Evidence: `C:/Users/ericb/.codex/visualizations/2026/09/22/01a0cb28-f65b-7510-bc37-04884e495874/hero-video-return/`, including screenshots, `verification.json`, and `final-controls.json`. Visual verdict: `.omx/state/homepage-hero-video-return/ralph-progress.json`, pass 96.

### Changed files

- `src/app/[locale]/page.tsx`: restore optional CMS media fetch and props.
- `src/components/home/ConsumerHome.tsx`: responsive right-column/stacked player placement.
- `src/components/home/HomeHeroVideo.tsx`: localized client bridge and existing analytics event.
- `src/components/home/HeroVideoPlayer.tsx`: native controls, localized/ready sound shortcut, media-state synchronization and startup handling.
- `src/components/home/HeroVideoPlayer.test.tsx`: updated existing control checks and one missed-play-event regression check.
- `src/messages/en.json`, `src/messages/es.json`: sound-button labels only.
- This plan and the visual-verdict record.

Existing and updated saved tests, build, lint, and typecheck were not run per workspace instructions. The existing English-language video is reused in both locales; UI labels are localized. No new caption track or transcript was authored, and this was not a full cross-browser or assistive-technology audit.
