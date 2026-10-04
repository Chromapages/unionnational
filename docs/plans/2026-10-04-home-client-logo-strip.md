# Replace homepage credentials strip with logo strip

Replace only the circled credentials section beneath the homepage hero. Preserve all other sections, media, tabs, copy and booking behavior. Wire the existing HOME_PAGE_QUERY trustLogos into ClientLogoStrip and display actual CMS assets (currently Sports Illustrated, CBS and ABC), without placeholder media brands or invented client/endorsement captions.

Use a neutral localized Featured logos label, existing brand tokens and About sizing. Repeat image groups to fill the 94rem frame and reuse the existing scroll keyframes for a continuous loop. Provide a 44px pause/resume button, pause on hover/focus, hide duplicated logos from assistive technology, and show one static wrapping group for reduced motion. No new dependencies.

Verify that the logo strip directly follows the hero, all three images load, the track moves, pause works, duplicated images are hidden, reduced-motion styles disable animation, and both locales fit at 390/768/1440px. No suites, lint, typecheck or build under the standing instruction.

Completed: actual CMS assets are wired through the homepage query to the reusable strip. Both locales verified at all three widths without document overflow, with a 44x44px pause button. Animation runs for a 40-second loop and its two equal groups fill the frame. All 12 displayed/repeated image instances load; only the three original logo names are exposed to assistive technology. Click and keyboard activation toggle pause/resume; keyboard focus is visible. Caption/control contrast calculated from rendered colors is 14.56:1. The explicit reduced-motion override exists in the loaded stylesheet; OS preferences were not changed. Original three outcome tabs, three reviews and the rest of the homepage remain.

Changed files: ClientLogoStrip.tsx, ConsumerHome.tsx, the locale homepage page.tsx, globals.css and en/es message files. Reused existing scroll keyframes, removed hardcoded fallback brands, and added no dependencies or CMS writes. If the configured logo list is empty, the strip is omitted. Evidence is in `.omx/state/home-client-logo-strip/`. No formal suites, lint, typecheck or build were run.
