# Compact homepage strategy-call CTA

1. Preserve `BookingCtaLink` and its existing `/book` destination, tracking, focus treatment, and pending state. Remove only the prominent prop at the homepage final CTA.
2. Replace the local eyebrow, repeated description, and three expectation items with one localized heading and one support line. Retain the reassurance below the button.
3. Keep the existing green card and two-column desktop structure. Reduce the card to a 240–280px band, cap the button near 360px by its container, and stack content on mobile.
4. Verify in the browser that English and Spanish render without clipping or overflow at desktop and 390px; inspect the CTA href, target dimensions, and sample text contrast. Do not run repository test/lint/typecheck scripts under the local `AGENTS.md` rule.

Risk: the call duration and no-preparation claim still require business confirmation; this edit does not change the underlying booking offer.
