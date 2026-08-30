# Mobile Hero-to-Proof Transition Plan

## Objective

Make the first mobile block after the homepage hero prove the promise of proactive tax strategy and fractional CFO leadership with existing, claim-neutral operating-model evidence.

## Decision

Place `WhyUsSection` directly after `VideoHero` on the homepage. Its existing comparison—timing, scope, cadence, and decision support—demonstrates the difference between reactive tax preparation and proactive strategy without relying on unverified client counts, savings figures, ratings, or generalized trust language.

Move the standalone `TrustBar` below this proof block or omit it from the mobile first-scroll sequence after confirming its claim substantiation. Do not use it as the first post-hero block.

## Evidence Basis

- `VideoHero` establishes the problem and routes visitors to the diagnostic or services.
- `WhyUsSection` already contains a semantic H2 and concrete comparison content for the operating model.
- The mobile card carousel preserves each comparison point without introducing new proof claims.
- `TrustBar` currently contains credential, experience, and client-volume strings; those claims need separate substantiation review before serving as the first proof block.

## Implementation Steps

1. In `src/app/[locale]/page.tsx`, reorder homepage composition to:
   - `VideoHero`
   - `WhyUsSection`
   - `TrustBar` (if retained after claim review)
   - `HowItWorksSection`
   - remaining service and testimonial content
2. Preserve the hero as text-led. Do not add comparison rows, methodology, cards, or service detail to `VideoHero`.
3. Retain the existing dark-green hero and let `WhyUsSection`'s slate background and gold eyebrow create the section transition; add no decorative separator unless visual review shows the existing border/contrast is insufficient.
4. Keep existing `WhyUsSection` copy and heading hierarchy. Do not create a new generic transition slogan.
5. Update homepage composition tests to assert that the operating-model proof block precedes the trust bar on the mobile DOM path.

## Acceptance Criteria

- On mobile, the first substantive content after the hero is the `WhyUsSection` H2 and its proactive-versus-traditional evidence.
- The first post-hero proof does not contain an unsubstantiated savings figure, client count, rating, guarantee, or outcome claim.
- `Explore Services` continues to resolve to the unchanged `#services` destination.
- The hero remains free of lower-page methodology and service-detail content.
- Reading order is `hero H1` → `WhyUsSection H2` → comparison cards.
- Desktop order is reviewed before release because this composition change applies across breakpoints.

## Risks and Mitigations

- **TrustBar claim governance:** retain it only after credential/experience/client-volume support is confirmed; it is not the first proof block.
- **Desktop narrative regression:** validate the reordered sequence at desktop before release.
- **Duplicate proof:** do not repeat the same hero proof signals, TrustBar claims, and comparison labels in the immediate first-scroll sequence.

## Verification

- Add/update composition test coverage for homepage section order.
- Perform manual mobile review at 320px and 430px for hero-to-WhyUs handoff and heading order.
- Review documented support for every retained TrustBar claim separately.
