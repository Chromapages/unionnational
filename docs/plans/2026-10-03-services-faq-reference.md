# Services FAQ reference implementation

## Design read

Reference-driven FAQ update for business owners choosing tax and financial support. DESIGN_VARIANCE: 3; MOTION_INTENSITY: 2; VISUAL_DENSITY: 4. Preserve the existing 94rem container, About-matched section padding, Outfit/Inter fonts, semantic brand/slate/gold tokens, Lucide icons, and four approved FAQ answers.

## Implementation sequence

1. Stack the four FAQs as numbered accordion cards with a pale expanded surface, answer divider, and chevron indicator. Use native details/summary and preserve the first-open, single-open behavior.
2. Add a desktop decision-guide sidebar aligned near the heading. Give each question three contextual takeaways grounded in its existing answer; update the guide when that question opens.
3. Add a phone/support prompt, the existing tracked booking CTA, and a link to #support-plans. Use the existing gold-700 token with white CTA text for AA contrast.
4. Localize the added guide content and controls in English and Spanish.
5. Stack sidebar below FAQs on mobile/tablet; inspect 390px, 768px, and 1440px layouts, keyboard toggles/focus, guide updates, CTA width/height, contrast, and destinations.
6. Add a small browser regression check for accordion exclusivity and guide updates. Do not run suites, lint, typecheck, or build under the standing instruction.

## Success criteria

- Four vertically stacked FAQ cards retain their existing questions and answers. The first is initially expanded, and opening another closes the previous one.
- Desktop has accordion and guide columns; mobile/tablet stack without horizontal overflow or clipped copy.
- Guide takeaways change with the newly opened question and are available to assistive technology.
- Each summary is keyboard-operable and at least 44px high, with visible focus. Chevron direction and native expanded semantics supplement color.
- Text, icon, and CTA color pairings meet WCAG AA. The booking label fits on one desktop line and retains the existing tracking/navigation state behavior.
- Booking targets the existing booking page; support options target the existing #support-plans anchor.
- Both locales render equivalent content. No invented savings numbers, tax guarantees, new dependencies, or new fonts/colors.

## Limits

Keep the brand's existing sans-serif typography instead of adding the reference image's serif family. Native details controls the accordion; after all cards are closed, the guide retains the last selected question's context. Connected design inspection tools are unavailable; use repository tokens, calculated contrast, and live DOM inspection.

## Completed verification and latest scope update

- Implemented four numbered FAQ cards and a contextual guide in English and Spanish, using existing brand fonts, tokens, icons, and tracked booking navigation.
- Native keyboard opening closes the previous answer and updates the guide. All four guide contexts were checked; keyboard focus shows a visible 2px outline.
- 390/768/1440px layouts have no horizontal overflow. Summaries measure at least 88px high; English CTA measures 56px. Both desktop booking labels fit one line; Spanish mobile wraps naturally.
- Calculated text/CTA contrast exceeds 4.5:1, and the expanded card border measures 4.26:1.
- Per the newer user instruction, removed only the Services closing CTA and its unused import. The FAQ booking button and full footer remain present; Services now has three tracked booking buttons.
- Updated browser regression coverage and the booking-button count without running suites, lint, typecheck, or build, following the standing instruction.
- Saved the final preview and visual verdict under .omx/state/services-faq-reference/.
