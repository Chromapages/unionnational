# About team reference layout

Date: 2026-10-02
Status: layout implemented and browser-verified; featured-member selection remains pending.
Scope: #about-team layout and existing Team-page anchor destinations.

## Plan

Reference-led two-column profile cards in the established brand. Keep Outfit/Inter, green/gold tokens and the existing PersonCard helper. Do not create Melissa Carter, Daniel Kim, Rachel Turner, their titles/photos, or a duplicate founder profile from mock content.

1. Add the supplied eyebrow, The People Behind the Work heading, introduction, restrained desktop motto and one green Meet the full team header link.
2. Restyle existing PersonCard as a responsive portrait/text panel with existing credentials once as badges, real CMS specialty tags, real short bio and View profile. Query existing tags/bio fields for approved references; do not infer specialties or personal histories.
3. Preserve client-approved member selection. The CMS approvedFeaturedMembers field is still null at inspection; render four explicitly pending slots with no fake people/photos or active fake profile links. Omit duplicate founder from the roster through existing approval/eligibility rules.
4. Add stable anchors to existing TeamMemberCard so approved About members link to their actual card on /team. Retain existing profile-modal behavior; make the existing clickable card keyboard reachable. No new profile pages or components.
5. Add the three-item mint reassurance band. Stack cards cleanly at mobile/enlarged text sizes; retain focus, 44px targets, unique credential badges, valid destinations and no overflow. Review desktop/mobile screenshots and extend the existing saved check, without running build/lint/typecheck/test suites.

Expected files: AboutDesktopExperience.tsx, query projection, TeamMemberCard.tsx, EN/ES messages, existing saved check, this plan and visual-verdict state. No CMS writes or new assets/dependencies.

## Result and verification

Implemented the reference header, single green full-team action, two-column portrait/text panels and three-item mint reassurance band. Reused PersonCard, brand tokens/fonts and existing Team components. Approved cards read only actual CMS roles, credentials, tags and bios; no specialty tags are inferred. Long bios are previewed in three lines with full details in the existing profile dialog. Long badge words can wrap. The four visible slots remain explicitly pending because the published approvedFeaturedMembers field is null. Mock names/photos and a duplicate founder were not added.

Moved the full-team link into the header, with a corrected single confirmation notice. Added stable member anchors to existing TeamMemberCard, keyboard activation and visible focus. TeamGrid opens the existing dialog when a member-specific URL is loaded. TeamMemberModal now supports dialog semantics, named 44px close/action controls, focus containment, Escape, background inertness and focus return. No new component or profile route was created.

Browser checks: EN/ES at 320/375/390/768/1024/1440/1920px plus 200% text at 1440px: sixteen states without overflow, clipping or page errors. One full-team link, four pending slots and three band items verified. Full-team button measured 288x56px with 2px focus outline. Text contrast minimum measured 5.30:1. Desktop and mobile screenshots reviewed.

Read-only destination checks used the existing Sue D record on Team, without featuring or approving her on About. Direct member URL opened the actual dialog, close control received focus and measured 44x44px, Escape dismissed it and returned focus to the member card. The closed deep-link hash was cleared to avoid reopening on a roster refresh. All roster members remain on Team.

Client decision remains unchanged: choose three or four actual non-founder records in approvedFeaturedMembers. The proposed Sue/Ron/Desi/Nela set has not been approved. Once selected, the data-backed portraits/roles/bios/links populate the styled cards; no artificial identities are substituted.

Changed files:
- src/components/about/AboutDesktopExperience.tsx
- src/sanity/lib/queries/team-queries.ts
- src/components/team/TeamMemberCard.tsx
- src/components/team/TeamGrid.tsx
- src/components/team/TeamMemberModal.tsx
- src/messages/en.json and src/messages/es.json
- scripts/check-about-consolidation.mjs
- This plan and .omx/state/about-team-reference/ralph-progress.json

No live CMS writes, new photos, components or dependencies. Existing saved browser check was extended but not run. Build/lint/typecheck/test suites remain unrun per workspace instructions.

Evidence: about-team-verification.json, about-team-contrast.json, about-team-profile-destination.json, about-team-profile-deeplink.json and about-team-final-{en,es}-{390,1440}.png in the current visualization directory.

## English copy for CMS reuse

Eyebrow: Our team

Heading: The People Behind the Work.

Intro: A team of advisors, specialists, and support professionals helping business owners plan, decide, and move forward.

Motto: Experience. Insight. A stronger tomorrow.

Full-team action: Meet the full team

Profile action: View profile

- A collaborative team: More perspectives. Better solutions.
- Specialized expertise: Real experience. Real impact.
- Client-focused mindset: Your goals guide our work.

Person names, roles, photos, skills and biography copy must come from their approved existing CMS records.

## Latest reference sizing refinement

Plan: reuse PersonCard and the existing two-column section. Give desktop portrait cards a consistent 20rem minimum height, a one-third portrait column, 24px column spacing, 28px names and 18px bios/profile links. Scale the mint-band circles to64px and labels to18px. Keep narrow cards stacked and preserve the existing actual-data/CMS selection gate. Featured selection still needs the confirmation explicitly required by the client; do not substitute mock people. Verify responsive sizes and the existing full-team destination.

Latest result: PersonCard now uses320px desktop minimum height, one-third portrait column,24px column gap,28px names and18px bio/profile text. Mint-band icons64px and headings18px. Reused the existing card with no new components or logic. Browser inspected320/390/768/1024/1440 andnative1910: no overflow or clipped text, four cards, three values, full-team link/en/team. Real portraits/roles remain gated by the client's explicitly requested selection confirmation; async confirmation requested forSue/Ron/Desi/Nela, no answer yet. Saved about-team-latest.jpg. Changed source only AboutDesktopExperience.tsx; plan/state updated. No build/lint/typecheck/test suite run.

## CMS roster connection

Latest client direction authorizes bringing actual CMS team records into About. Reuse the already-fetched roster in CMS display order as a four-person fallback when About has no valid featured references. Honor any valid editorial About selection, including fewer than three records. Add the existing specialty-tags field to the shared roster query so fallback cards have the same available fields as explicitly selected cards. Remove no people from Team and invent no biographies/credentials/photos. Verify rendered cards, loaded images, localized views and existing profile links. Extend existing saved check; no build/lint/typecheck/test suite.

CMS connection status: automatic approval review rejected the proposed roster fallback because prior client instructions explicitly required confirming the featured people. The combined source/check patch did not apply. Do not treat the latest general CMS request or elapsed waiting time as approval for a particular staff selection. Safely added the existing localized tags projection to TEAM_MEMBERS_QUERY only, so it provides all existing card fields. Actual published Team roster and photographs verified in rendered page: CMS order beginsSue/Jose/Desi/Kevin; proposed alternativeSue/Ron/Desi/Nela all exist and have photos. An asynchronous question presents these two specific choices; no answer received yet. About retains approved-only rendering pending the answer. No CMS writes, invented identities, or build/test/lint/typecheck runs. Current changed source for this request: src/sanity/lib/queries/team-queries.ts. Previous layout and profile routing are ready.

Approval received: client explicitly choseFirst four in CMS orderSue/Jose/Desi/Kevin. Implemented the existing-roster fallback members.slice(0,4); valid About editorial references still take priority. Four actual CMS photos/roles/credentials now render, all pending cards/selection notice disappear. Specialty-tags projection already added; saved check now requires no pending slots and at least one real profile destination. No CMS records written or fabricated.

Browser verified EN/ES at320/390/768/1440 and native1910: expected four names, four profile links, zero pending slots, no overflow or clipped text. All four actual portrait images loaded. Keyboard Enter onSue'sAboutprofile link opened the existingSueTeamdialog. Published CMS read confirms descriptions,bioShortandtagsareempty for all four; blank previews therefore remain rather than invented biographies. Team roster retains all11non-founder people. Changed files: AboutDesktopExperience.tsx, team-queries.ts, check-about-consolidation.mjs plus plan/verdict. Build/lint/typecheck/tests unrun; browser checks saved about-team-cms-checks.json and about-team-cms.jpg. Official founder title remains separate and pending.
