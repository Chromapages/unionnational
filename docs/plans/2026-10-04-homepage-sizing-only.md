# Homepage sizing only

Restore the exact ConsumerHome source captured immediately before the mistaken layout rewrite. Restore the homepage's original CMS video lookup, header/footer composition and booking behavior. Remove the added homepage translation block and unused tracked-CTA slots introduced by that rewrite, while preserving other service-detail changes.

Keep the video hero, proof strip, strategy-call process, outcome tabs, client reviews and closing CTA. Reuse About's 94rem container, 16/24/32px gutters, 40px mobile/tablet and 48px desktop vertical padding, and 30/36/44px main section heading sizes. The original hero/process/outcomes/reviews already use those values; apply the same vertical padding to the proof strip. Keep the closing CTA sizing already shared with About.

Verify the original section order, media/tabs/reviews, locale rendering and computed sizing at 390/768/1440px. No formal suites, lint, typecheck or build under the standing instruction.

Completed: the exact captured ConsumerHome source was recovered from this session's tool output. A source comparison confirms the only remaining difference is proof-strip vertical sizing. Original media lookup, page composition, footer and booking routes were restored, and the discarded translation block and tracked-CTA slots were removed. All prior service-detail work remains.

Manual inspection confirmed the original video element, three outcome tabs, three reviews, all original section roles and locale booking links. Both locales measured correctly at 390/768/1440px with no document overflow: max width 1504px, gutters 16/24/32px, main headings 30/36/44px and main vertical padding 40/40/48px. Shared closing CTA retains the same sizing as About. Screenshot and measurements are in `.omx/state/homepage-sizing-only/`. Formal checks and media playback were not exercised.

Net sizing file: `src/components/home/ConsumerHome.tsx`. Rollback files: `src/app/[locale]/page.tsx`, `src/components/services/ServiceHero.tsx`, `src/components/services/ServiceProcessSection.tsx`, `src/messages/en.json` and `src/messages/es.json`.
