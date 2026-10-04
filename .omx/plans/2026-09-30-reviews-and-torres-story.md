# Homepage reviews and Who We Help client story

## Recommendation

Proceed **when three distinct client reviews and the expanded Torres Built account are verified and approved**. Use the homepage for breadth and the Who We Help page (`/industries`) for depth. If the content gate is not met, keep the current approved story; do not fill three cards with invented or anonymous marketing copy.

## Current state and evidence

- The live homepage is `ConsumerHome`, rendered from `src/app/[locale]/page.tsx:6,56`. Its `#client-results` section is a single Torres Built challenge / strategy / outcome story and quote (`src/components/home/ConsumerHome.tsx:266-331`). The older `TestimonialsSection` is not rendered by this route.
- The desktop Who We Help page has an interactive industry focus and then a three-metric / Michael Torres quote strip (`src/components/industries/IndustriesDesktopExperience.tsx:429-498`). The mobile page is separately composed in `src/app/[locale]/industries/page.tsx`.
- Existing testimonial records already support quote and case-study formats, localized copy, attribution, publication, and ordering (`src/sanity/schemaTypes/testimonial.ts:23-64,85-137`; `src/sanity/lib/queries/shared-queries.ts:90-113`). Reuse this model for the short review cards.
- The Torres story and quote have homepage approval. The repository does **not** document Jason-specific actions, quantified tax savings, three additional approved reviews, public rating data, or image rights (`docs/testimonial-credibility-evidence.md`). The current illustrative construction image must not imply it depicts the client's actual project without confirmation.
- Nielsen Norman Group found that participants value quotes and case studies but scrutinize company-hosted testimonials and trust external review sources more ([Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/)). FTC guidance distinguishes honest testimonials from fabricated or misleading ones ([Consumer Reviews and Testimonials Rule Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers)).

## Proposed experience

### Homepage: three concise reviews

- Replace the large Torres story in `ConsumerHome` with three evenly weighted review cards. Desktop: one row within the existing 94rem container, roughly 250–300px high. Mobile: stacked cards. Avoid autoplay or a hidden carousel.
- Each card contains a client-written or client-approved quote, name or approved attribution, company or industry, and one specific reason the service helped. Use a source link only when there is a real public review URL. Do not show stars or an aggregate rating without a verified source.
- Use a section heading such as **What clients say** and one clear link to the Torres story in Who We Help. A short Torres quote may be one card if approved for this use, but the three cards should represent distinct clients and needs.
- Select at most three approved `format: "quote"` records through the existing Sanity query and homepage feature/order fields. Render only available approved quotes; keep the current story until three are ready. Do not reuse the static “More Client Results” marketing paraphrases in the unused `TestimonialsSection` as client reviews.

### Who We Help: one deeper Torres Built insight

- Place a clearly labeled **Construction client insight** after the industry focus panel on desktop `/industries`. Replace its current metric/quote strip rather than adding another large section. On the separately composed mobile page, place the story after the industry cards and before the final CTA. Keep the desktop story independent of which industry tab is selected, so switching tabs does not unexpectedly move the page.
- Tell the sequence in the client's terms: **business situation → what Jason assessed → what he recommended → what the team implemented → what changed for the client**. Include the approved Michael Torres quote and a specific CTA to discuss a similar situation.
- Separate Jason's documented work from work done by the broader Union National Tax team. Use qualitative outcomes already approved until records support any amount or percentage. Do not label illustrative imagery as the client's actual site; use a permitted image or a non-client illustration.
- Share approved story copy through the existing EN/ES message files (`src/messages/en.json`, `src/messages/es.json`) so the desktop and mobile Who We Help layouts say the same thing. A separate case-study route can wait until there is enough additional material to justify it.

## Work sequence

1. **Content gate:** Obtain three distinct review texts with approved attribution and publication permission. Interview Jason and Michael Torres; confirm Jason's exact role, decision timeline, recommendations, implementation, client outcome, quote wording, and image rights. Record the source and approval for each claim. Audit the existing 98% recommendation metric before carrying it forward.
2. **Copy and wireframe:** Draft EN/ES card copy and a compact two-column desktop / stacked mobile Torres story. Review the story with Jason and the client. Keep the homepage scan-friendly and the Who We Help account concrete, with no repeated full-length quote block.
3. **Implementation:** Fetch approved quote records for `ConsumerHome`; replace only its current `#client-results` section. In desktop `/industries`, replace the metric/quote strip with the approved deeper story; add its stacked counterpart to the mobile page. Reuse existing icons, card patterns, and booking links; add no new dependency or testimonial schema.
4. **Verification:** Inspect desktop and mobile in EN/ES; confirm three distinct approved quotes, correct attributions, usable keyboard links, no overflow, and the homepage-to-story and story-to-booking paths. Confirm there are no unsupported numbers, star ratings, or client-image implications. Compare screenshots to the current visual system before release. Use the existing analytics convention to compare story clicks and booking starts with the pre-change baseline; do not assume a conversion lift from the redesign alone.

## Acceptance criteria

- Homepage displays exactly three **different, approved** review cards at desktop widths; mobile shows all available cards without an auto-rotating slider. If fewer than three are approved, the current approved story remains until launch is ready.
- The homepage story link reaches the Torres section on `/industries`; the Who We Help CTA reaches booking.
- The Who We Help story names Jason only for verified work, states the client's initial problem and what changed, and contains no unsubstantiated savings amount or percentage.
- English and Spanish versions have equivalent meaning and approved attribution. The layout remains readable at 390px, 1280px, and 1672px without horizontal overflow.
- The existing Who We Help proof strip is replaced, not duplicated. Any retained aggregate metric has a documented source.

## Content confirmation

The user requested Google review research and selected Union National Tax team attribution for the Torres story. Three public Google excerpts have been source-checked; the story retains the approved qualitative account without attributing undocumented personal actions to Jason.

## Implementation update — 2026-09-30

The user requested Google review research and confirmed team attribution for Torres Built. Three short excerpts were verified directly on Google for Carla Bassano, Jeanine Ibarra, and Marlene Neptune. They are implemented in localized messages with source links and translated-excerpt labels in Spanish. The live CMS records have incomplete attribution/verification metadata and do not include Jeanine, so the implementation uses the checked local curation without an external CMS write or new schema. The existing CMS directory continues using its own publication rule. Who We Help uses the approved qualitative team story, replaces the desktop proof strip, and has a mobile counterpart; no personal Jason actions or savings amounts were added.
