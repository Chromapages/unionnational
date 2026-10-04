# Consumer homepage simplification

## Decision

Make the homepage a five-section decision path for contractors and service businesses: hero, proof, process, outcomes, and one approved client story with the closing booking action. The user confirmed the Strategy Call is 30 minutes and approved the Torres Built Construction story and quote for homepage use. Do not add a numerical tax-savings claim.

## Visual direction

- Colors: existing brand green `#051A18`, deep green `#03100E`, gold `#D4AF37`, warm white `#FBF8EA`, white `#FFFFFF`.
- Type: existing Outfit headings and Inter body. Use numbered markers only for the actual three-step process.
- Layout: text-led hero over an existing desk photograph, static three-point proof strip, narrow process rows, three outcome columns, and a single case-study panel joined to the final CTA.
- Signature: one continuous gold line through the three steps. Keep other decoration quiet.

## Work

1. Preserve the existing complex components and their uncommitted edits; remove them only from homepage composition.
2. Add one localized, server-rendered consumer journey component with the five sections and one booking destination.
3. Use safe homepage metadata and structured-data description in both locales; remove unsupported dollar claims from this surface.
4. Align booking-page and visible Strategy Call references to the user-confirmed 30-minute duration.
5. Remove the footer's duplicate credential/time strip.
6. Review desktop and mobile at both locales, keyboard focus, contrast, links, claims, and section count. Use focused tests only where needed to verify changed behavior.

## Risks

The case remains qualitative; no client-specific savings amount is documented. The old homepage components remain in the repository because they contain unrelated uncommitted work. Existing CMS hero copy is bypassed on this page until it can be reconciled with the new message.
