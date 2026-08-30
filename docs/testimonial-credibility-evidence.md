# Testimonial credibility evidence

## Implemented evidence

The Client Results heading includes “1,000+ business owners served.” The approved source is `src/components/construction/profit-blueprint/BlueprintAuthorBio.tsx`, which states that Union National Tax has served 1,000+ business owners and includes a methodology note identifying internal advisory engagements completed from 2012–2024.

## Not approved for publication in Client Results

- No quantified result is available for the featured Michael Torres / Torres Built Construction case study. Keep its qualitative outcome until an approved client-specific metric and permission are collected.
- No verified Google, BBB, or other public review-platform rating source is available in the repository for this section.
- The testimonial query can return client images, but no permission metadata or approved client image/logo record is available. Do not render images or substitute stock avatars.
- No client-results or case-studies route exists. Do not add a “Read more client results” link until that destination is built and populated with approved proof.

## Current selection mechanism

`TESTIMONIALS_QUERY` retrieves all published CMS testimonials ordered by `displayOrder`. `TestimonialsSection` then ranks records containing strategy-related terms and renders the top two. This is curated selection, not rotation. The featured Before / After / Outcome card is static content and separate from the CMS testimonial pool.
