# Dedicated CMS team directory

## Problem and plan
Existing /team renders the legacy construction-focused hero, oversized founder/values/hiring blocks and old card styles. About's heroMeettheteamis an in-page anchor while its full-team button targets this legacy route. Replace the route composition rather than create a duplicate path.

1. Route both Aboutteamactions to the existing localized/team page. Keep all member deep links and/team#founder working.
2. Reuse TeamHero, FounderSpotlight, TeamGrid, TeamMemberCard and existing profile dialog. Match current94rem width, fonts, colors, portrait/card treatments and section rhythm. Short directory header, compact real founder identity/photo/bioShort, all11non-founder CMS records in display order and shared homepage bookingCTA. No approvedAboutselection affects this full roster.
3. Use actual CMS photos/roles/credentials/bios/tags, credential badges once, consistent first-name card display where full surnames unavailable. Keep founder official-title pending until approved. No invented biographies or figures. Keep all people on the page; remove legacy marketing/hiring clutter from this directory without deleting CMS data.
4. Use native profile buttons, visible focus,44px targets, existing dialog deep links/Escape/focus behavior; guard closingCTAagainstchat overlap through current shared widget safety. UnifyTeamnav/footerbooklabel and destination.
5. Neutral EN/ESdirectorycopyandmetadata. Preserve CMS social-image metadata and site structured data; replace outdated runtime directory text, no live CMS edits.
6. Browser-inspect EN/ES at320/390/768/1024/1440/1920; confirm1H1, founder+all11members, images, correctMeettheteamroute, keyboard modal/deep-link, bookinglabel, no overflow. Extend existing saved check; do not run build/lint/typecheck/test suites per client instructions.

Expected source: Teamroute, existingTeamcomponents,Aboutlink, EN/ESmessages, nav/sidebar/widgetsmallTeam-scoped updates and existing check. No new dependencies/components/routes.

Implementation: reused existing/team route and four existing Team components. Removed route-level legacy values/hiring/large biography composition and unnecessary dynamic/reveal wrappers. Founder uses actual CMS short bio, unique credential badges and shared pending-title approval. All11non-founder CMS records render in current two-column portrait design. Native profile buttons replace clickable divs; existing modal/deep-link behavior retained and credentials share one formatter. BothAboutteamlinksnow/team. SharedhomepageCTA, neutralEN/ESdirectorymetadata/copy, Team-scopednav/sidebarbookingandchat-safetyapplied. Extended existing saved check to compare rendered IDs against the published CMS roster. No check/build/lint/typecheck run.

## Completion and verification

Both About team buttons point to/en/team. The full-team button was followed in the rendered page and arrived at the new dedicated directory atscrollY0. The page contains Jason plus all11non-founder CMS records, and all12portrait images loaded. Existing/team#founder retains the full published biography in a keyboard-operable native disclosure; all staff anchors/profile links remain valid.

Twelve EN/ES responsive states at320/390/768/1024/1440/1920:1H1,1founder,11staffcards, no overflow/clipping, no duplicate badges, no profile targets below44px, no contact-page CTA. All11profile dialogs opened through keyboard activation and dismissed with focus return. Removed the old delayed autofocus; verified immediate close-button focus, Tab containment, Escape and mobile About-to-Team profile deep link. Mobile modal close44x44containedviewport. Mobile booking300x56is visible and unobscured, with actual chat widget hidden while CTA visible.

Remaining editorial limits: founder official title still pending approval; absent CMS staff biographies/tags are not invented. CMS records remain untouched. Build/lint/typecheck/test suites were not run, per workspace instructions; saved runnable check extended. Captured full-page JPEG includes the sticky navigation at the capture scroll position; rendered entry navigation itself was separately verified atscrollY0 with header at the top.

### Changed files
- src/app/[locale]/team/page.tsx
- src/components/team/TeamHero.tsx
- src/components/team/FounderSpotlight.tsx
- src/components/team/TeamGrid.tsx
- src/components/team/TeamMemberCard.tsx
- src/components/team/TeamMemberModal.tsx
- src/components/about/AboutDesktopExperience.tsx
- src/components/layout/FloatingNavbar.tsx
- src/components/ui/MobileSidebar.tsx
- src/components/ChatWidget.tsx
- src/messages/en.json
- src/messages/es.json
- scripts/check-about-consolidation.mjs
- This plan and .omx/state/dedicated-team-directory/ralph-progress.json

Simplifications: reused existing/team and existing components/modal rather than create a duplicate route; removed legacy page-composition and redundant reveal/dynamic wrappers; shared credential formatting across cards and dialog; native profile buttons and biography disclosure. No new dependencies.

Evidence: team-directory-responsive.json and team-directory-full.jpg in the current visualization folder.
