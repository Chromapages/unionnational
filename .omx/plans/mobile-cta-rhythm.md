# Mobile CTA vertical rhythm

## Finding

The CTA sections are content-driven: no fixed height, min-height, `vh`, `svh`, or `dvh` rule applies. The reusable CTA used `py-20` at mobile, producing 80px of top and bottom padding before child spacing.

## Spacing system

- Section boundary: 48px mobile; 64px from the small breakpoint; 80px desktop.
- Qualifier to headline: 16px.
- Headline to explanation: 16px.
- Explanation block to action block: 24px, supplied by `.cta-decision-grid`.
- Primary action to trust metadata: 12px.
- Trust metadata to scheduling expectation: 8px.

## Acceptance criteria

- No CTA section uses fixed or viewport-driven height.
- Mobile top/bottom boundaries are 48px without reducing text or the 56px CTA target.
- Content remains naturally expandable for zoom, text-spacing overrides, short screens, and landscape scrolling.
