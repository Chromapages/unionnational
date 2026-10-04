# Testimonial credibility evidence

## Implemented evidence

The Client Results heading includes “1,000+ business owners served.” The approved source is `src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx`, which states that Union National Tax has served 1,000+ business owners and includes a methodology note identifying internal advisory engagements completed from 2012–2024.

## Homepage approval and limits

- On 2026-09-29, the user confirmed the Michael Torres / Torres Built Construction story and quote are approved for homepage publication. That approved qualitative account is the source for the expanded Who We Help story authorized in the 2026-09-30 implementation plan.
- No quantified result is available for that case study. Do not add a tax-savings amount without a supported calculation and separate approval.
- No verified Google, BBB, or other public review-platform rating source is available in the repository for this section.
- The approval does not establish image or logo rights. Do not render client images or substitute stock avatars.
- The `/client-results` route exists. Its individual stories still need their own attribution and evidence review.

## Google review excerpts checked on 2026-09-30

- The user requested three short Google reviews as part of implementing the homepage review layout.
- Carla Bassano, Jeanine Ibarra, and Marlene Neptune were read directly on the Union National Tax Google Maps listing, matched by its website and Orem business information: https://www.google.com/maps?place_id=ChIJ2-O-k5KaTYcRGjTyVDLXczw&q=place_id%3AChIJ2-O-k5KaTYcRGjTyVDLXczw
- The selected excerpts are verbatim English sentences from those three reviews. Spanish copy is a translation and is labeled as such. Reviewer names are preserved; no company, industry, photograph, or ongoing client status is inferred.
- No aggregate score or review count is displayed. The public listing and third-party directories showed different counts, so a directory count was not used as a Google metric.
- Existing CMS records for Carla and Marlene contain long edited versions and lack complete verification metadata. Jeanine has no corresponding published CMS record. The local excerpts use the checked Google source rather than implying those legacy CMS fields establish approval.
- On 2026-09-30, the user explicitly chose to keep the Torres work attributed to the Union National Tax team. The expanded story uses the existing S-Corp evaluation, quarterly planning, and qualitative outcomes; it adds no Jason-specific action or quantified savings claim.

## Current selection mechanism

The homepage renders the three checked excerpts from `ConsumerHome.reviews` in the EN/ES message files, with a link to the real Google listing. It does not invent fallback reviews or publish CMS changes. The shared `ClientInsightSection` renders the approved Torres story on Who We Help, with unique desktop/mobile anchors. The existing `/client-results` CMS directory and its publication rule remain separate.

## Industries perspective update — 2026-10-01
The user selected the approved qualitative outcome instead of the reference image's 35% bookkeeping-time claim. The compact Industries card therefore presents clearer tax decisions, an S-Corp strategy, quarterly planning and defined next steps, with a link to the existing detailed construction story. No quantified or verified-result badge is published.
