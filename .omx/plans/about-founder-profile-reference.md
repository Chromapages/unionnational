# Our founder profile reference

Date: 2026-10-02
Status: implemented and browser-verified; official founder title remains pending client approval.
Scope: #about-founder only; keep hero, team selection state and homepage CTA intact.

## Design read and plan

Reference-led founder profile in the existing financial-advisory brand. Preserve Outfit/Inter, green/gold tokens and the actual CMS founder photograph. Design variance 3, motion 1, density 5; reuse AboutDesktopExperience and its credential helper. No new components, people, degrees, statistics, photos or signature artwork.

1. Add the reference eyebrow, Leadership / Expertise / A Higher Standard heading and introduction. Use a restrained decorative desktop motto; keep it out of the accessibility reading order.
2. Replace the small founder PersonCard with one responsive profile panel: large existing portrait, verified full name, existing credential badges once each, existing two-sentence mission and a real Read Jason's Story link to /team#founder. Keep the official title placeholder until client approval; the reference is not treated as confirmation of a disputed job title. Omit EA from the name to avoid duplicating its badge.
3. Add the pale-green practice column with three icon-led points: tax expertise, business perspective and ongoing support. Avoid adding an unsupported business-ownership history; use the existing general business-experience language when necessary.
4. Stack portrait/bio/practice cleanly on narrow containers and at enlarged text sizes. The larger founder crop follows this latest reference; team-card formatting is unchanged. Preserve one founder identity, one H1, meaningful photo alt, keyboard focus and the existing header/booking components.
5. Compare desktop and mobile screenshots; check EN/ES at 320/375/390/768/1024/1440/1920px plus 200% text, badge uniqueness, image loading, link destination and contrast. Update the existing saved check; do not run it or build/lint/typecheck suites per workspace instructions.

Expected files: AboutDesktopExperience.tsx, EN/ES messages, existing browser check, this plan and visual-verdict state. No live CMS writes.

## Result and verification

Replaced the small founder card with the reference's large portrait/bio/practice panel, section header, muted desktop motto, four existing credential pills and story action. Jason Astwood's actual published CMS portrait and full name are reused. EA appears only as a badge, alongside MBA/FSCP/LUTCF. The existing two-sentence mission remains. Official title is still explicitly pending; no signature artwork or unsupported running-business history was invented. PersonCard's now-unused founder-only props were removed; team cards are otherwise unchanged.

The source founder bio supports tax expertise and holistic business advice but does not establish an owned-business history. The Business Perspective copy therefore stays general: real-world business experience applied to client goals. Read Jason's Story links to the existing /team#founder profile; no fictitious story page was added.

Initial browser inspection covered EN/ES at 320/375/390/768/1024/1440/1920px and 200% text: sixteen states without overflow, clipping or browser errors. After styling refinements, fourteen checks repeated the six widths other than 375px plus enlarged text; all passed. One founder identity, three practice points, four unique badges and unchanged placeholder-title logic verified. Actual photo loaded successfully. Desktop and Spanish 390px screenshots reviewed.

Contrast minimum was 4.92:1 across checked text pairs. Keyboard focus on the story link showed a 2px outline; its desktop target measured 215x56px. Keyboard Enter navigated to /en/team#founder and the destination displayed Jason Astwood. Header/H2/H3/H4 order is logical.

Changed files: src/components/about/AboutDesktopExperience.tsx, src/messages/en.json, src/messages/es.json, scripts/check-about-consolidation.mjs, this plan and .omx/state/about-founder-profile-reference/ralph-progress.json. Existing saved check was extended for practice-point count and story destination, but not run. Build/lint/typecheck/test suites remain unrun per workspace instructions. No new components, dependencies, photos or CMS writes.

Evidence: about-founder-verification.json, about-founder-final-verification.json, about-founder-link-contrast.json and about-founder-final-{en,es}-{390,1440}.png in the current visualization directory.

## English copy for CMS reuse

Section title: Leadership. Expertise. A Higher Standard.

Intro: Meet the founder behind Union National Tax and the principles that guide our work.

Practice eyebrow: The practice

Practice heading: How My Background Creates Real Value for Clients.

- Tax Expertise: Deep technical knowledge in the details that make a difference.
- Business Perspective: Real-world business experience applied to your goals.
- Ongoing Support: A commitment to our clients beyond filing season.

Story action: Read Jason’s Story

Name/credentials come from the existing CMS record; formal title is not selected by the agent.

## Reference refinement requested again

Plan: the current 453px panel at 1774px is shorter than the reference. Increase its desktop minimum height and portrait crop, scale name/badges/practice icons and support text, and retain two mission sentences while adding the already-existing owner-goal wording. Keep role pending, credentials once and the real photo/story destination. Verify narrow widths and enlarged text before completion.

Refinement result: at 1774px, the profile increased from 453px to 566px and the existing portrait from 352x403px to 352x516px, matching the reference crop more closely. Enlarged desktop name/badges/bio, 80px practice circles and practice text; mission remains two sentences and uses the client-goal wording already supplied in the reference. Added fixed-header anchor clearance. Rechecked sixteen EN/ES responsive/enlarged-text states with no clipping, overflow, duplicate badges or browser errors. Evidence: founder-repeat-refined.png and founder-repeat-verification.json. Source changes: AboutDesktopExperience.tsx and EN/ES messages; no new assets/components. Build/saved checks remain unrun. Official title still pending.

Latest English mission for CMS reuse: At Union National Tax, we believe tax preparation is just the baseline. Our mission is to bridge the gap between complex tax code and the needs of modern businesses, helping owners make smarter decisions, reduce taxes, and build stronger financial futures.

## Latest portrait-panel refinement

Plan: retain the existing founder component and verified content. Increase desktop card height from 35rem to 38rem, align the portrait/bio spacing with the reference, enlarge the name and practice heading, and use 96px practice circles with vertically centered text. Keep mobile sizes and official-title placeholder. Verify the rendered desktop card and narrow layouts; no build or test suite.

Latest result: adjusted AboutDesktopExperience.tsx desktop panel to 38rem minimum height, larger identity/practice headings, 96px practice circles, wider bio gap and practice padding. Reused the same component, credentials and portrait; no new dependencies or CMS writes. Capped stacked portrait at 24rem to avoid a very tall tablet image. Browser checks at 320/390/768/1024/1440 and native 1910px: no overflow or clipped headings/body. 768px portrait now384px wide; native desktop card608px tall. Official title pending remains. Screenshot about-founder-latest.jpg. No build/lint/typecheck/test suite executed.
