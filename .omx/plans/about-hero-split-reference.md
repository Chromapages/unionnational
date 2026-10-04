# About hero: people and practice reference

Date: 2026-10-02
Status: implemented and browser-verified.
Scope: About header only; preserve headline, founder/team/proof approval state and shared homepage CTA.

## Design read and plan

Reference-led financial-advisory hero for business owners, retaining Outfit/Inter and green/gold brand tokens. Design variance 3, motion 1, density 5. Reuse the existing AboutDesktopExperience, icons, Link and responsive container-query pattern.

1. Left: The people eyebrow/rule, the exact existing headline on two desktop lines, reference subhead and one accessible Meet the team anchor to #about-team.
2. Right: The practice eyebrow, people-first heading, introductory sentence and four icon-led practice points. Divide columns vertically on desktop; stack cleanly below sufficient content width and with enlarged text.
3. Reuse the supplied reference only as a narrow decorative right-edge crop. All headings/body text remain live HTML. No invented people, photos, credentials or figures. Keep decoration out of the reading order and hide it at narrow widths.
4. Move existing proof slots below the hero, keeping their approval logic and three pending values intact. Founder, featured-team placeholders and the homepage CTA are unchanged.
5. Inspect desktop against reference, then EN/ES at 320/375/390/768/1024/1440/1920px, enlarged text, anchor/focus/44px targets and clipping. Extend the existing saved check; build/lint/typecheck/test suites remain unrun.

Expected files: AboutDesktopExperience.tsx, EN/ES copy, the provided decorative image copy, existing browser check, this plan and visual-verdict state. No new components or dependencies.

## Result and evidence

Implemented the reference's people/practice split with vertical divider, preserved H1 wording, four circular icon points and a real Meet the team anchor. The section aligns to the existing 94rem navigation/CTA width. It stacks on smaller containers and enlarged text. Existing proof slots remain immediately below the hero with their approval state unchanged; founder/team placeholders and shared homepage CTA are unchanged.

The supplied reference is reused only as a narrow decorative CSS background at the far right, masked at the left edge and hidden below desktop widths. Native background loading replaced the unnecessary optimized/lazy image path after the asset returned HTTP 200 but did not render through that path. No new person or photo was generated, and the hero copy is real HTML.

Browser review: EN/ES at 320, 375, 390, 768, 1024, 1440 and 1920px plus 200% text at 1440px: sixteen states without clipping, horizontal overflow or browser errors. Exactly one H1 and four practice items remain. Keyboard Enter on the anchor reaches the About team section below the fixed header; focus shows a 2px outline and the 390px target measures 358x78px. Hero text contrast checked against the white reading surface. Desktop decorative crop was visually reviewed after loading and masking fixes.

Changed files: src/components/about/AboutDesktopExperience.tsx, src/messages/en.json, src/messages/es.json, public/images/about-hero-reference-decor.png, scripts/check-about-consolidation.mjs, this plan and .omx/state/about-hero-split-reference/ralph-progress.json. No build/lint/typecheck/test-suite or saved-check runs, per workspace instructions. No live CMS writes.

Evidence in current visualization directory: about-hero-verification.json, about-hero-anchor-final.json, about-hero-contrast.json and about-hero-final-{en,es}-{390,1440}.png, plus about-hero-final-en-1920.png.

## English copy for CMS reuse

Follow-up, 2026-10-02: user requested removal of the proof strip beneath the hero. Removed that strip and its unused render props/filter from AboutDesktopExperience and the About route; updated the existing saved check to expect no strip. EN/ES browser inspection confirms the founder follows the hero directly, headline preserved and no horizontal overflow. No CMS data was deleted. Evidence: about-proof-strip-removal.json and about-proof-strip-removed.png. Saved checks/build/tests remain unrun.

People eyebrow: The people

Headline (unchanged): The People Behind Your Financial Strategy.

Intro: Our team combines deep tax expertise with real-world business experience to help owners make smarter decisions, reduce taxes, and build a stronger financial future.

Anchor: Meet the team

Anchor detail: Get to know the people who make it happen.

Practice eyebrow: The practice

Practice heading: A People-First Approach.

Practice intro: More than tax expertise. Our team brings real-world experience, clear communication, and a commitment to your success.

- Experienced Professionals: A team with deep tax knowledge and real business experience.
- Practical Solutions: Advice built around your real-world goals and challenges.
- Clear Communication: Straightforward answers without the jargon.
- Long-Term Partnership: A team that stays involved beyond filing season.
