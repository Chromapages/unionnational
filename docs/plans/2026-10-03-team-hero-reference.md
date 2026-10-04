# Team hero reference implementation

## Design read

Preserve the Union National Tax brand while matching the supplied Team hero reference. DESIGN_VARIANCE: 3; MOTION_INTENSITY: 2; VISUAL_DENSITY: 4. Use the existing Outfit/Inter typography, CSS color tokens, Lucide icons, and 94rem content container.

## Implementation sequence

1. Replace the single-column hero with a desktop split: headline, introductory copy, and gold CTA on the left; three vertically arranged practice benefits on the right.
2. Use a vertical divider on desktop, horizontal divider on mobile, pale brand icon circles, and subtle dividers between benefit rows.
3. Point the CTA to the existing #team-members section. Add English and Spanish translations for the reference copy and benefit labels/descriptions.
4. Keep the component server-rendered and reuse installed dependencies. Scope changes to TeamHero and its translations.

## Success criteria

- Desktop shows both columns, with three benefit rows and a single CTA.
- At 390px and 768px, the content stacks without horizontal overflow; at 1440px it uses the split layout.
- Headline wraps naturally, allowing the reference's three-line treatment as an explicit exception to the usual two-line hero rule.
- CTA targets #team-members and retains visible keyboard focus and a minimum 44px touch target.
- Text and icon pairings meet WCAG AA contrast; pale icon circles are decorative.
- English and Spanish present the same content structure.
- No new dependencies or unrelated page changes.

## Verification limits

Connected token/contrast inspection tools are unavailable. Use repository CSS tokens and available rendered browser inspection instead. Do not claim browser verification, contrast verification, or visual fidelity until checks actually succeed. Do not run lint, typecheck, test suites, or build unless the user requests them.

## Completed verification

- Live preview served the updated Team page successfully.
- Browser inspection at 390px, 768px, and 1440px found no horizontal overflow; Spanish mobile also passed.
- Desktop heading wraps naturally into three lines. CTA height measures 68px desktop and 60px mobile/tablet.
- Keyboard inspection confirmed a visible solid 2px focus outline; clicking the CTA navigated to #team-members.
- Calculated contrast: headings 19.37:1, body 8.18:1, eyebrows 5.30:1, CTA default/hover/active 11.21:1 / 12.70:1 / 9.21:1, icons 13.10:1.
- Visual review score: 93/100. Existing brand gold and installed icon shapes intentionally differ slightly from the reference.
- Screenshot and verdict saved under .omx/state/team-hero-reference/.
