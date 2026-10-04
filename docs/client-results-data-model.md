# Client Results data model

```ts
type ClientResult =
  | {
      id: string;
      format: "case-study";
      order: number;
      eyebrowLabel: string;
      before: string;
      after: string;
      outcome: string;
      name: string;
      role?: string;
      company?: string;
      isVerified?: boolean;
    }
  | {
      id: string;
      format: "quote";
      order: number;
      quoteText: string;
      name: string;
      role?: string;
      company?: string;
      isVerified?: boolean;
    };
```

## Publication rule

Quote records require a client name and either both role and company or `isVerified: true`. Case studies require a name plus eyebrow, Before, After, and Outcome values. Invalid legacy quotes are omitted from presentation until they are corrected.

## Curation rule

For `/client-results`, editors choose the case-study card with `isFeatured`; if none is available, the documented Michael Torres fallback is used. Quote cards are ordered by `displayOrder`. The homepage uses three short source-checked Google excerpts in localized messages; see `docs/testimonial-credibility-evidence.md`. Who We Help renders the separate approved Torres client insight.

## Analytics

- `testimonials_section_view` marks the homepage section.
- `testimonials_read_more_click` marks the homepage link to the responsive Torres story anchor on `/industries`.
- `testimonial_source_click` identifies the Google source links. These attributes are tagging hooks, not a new analytics delivery service.
- The story booking CTA uses the existing `strategy_call_cta_viewed` / `strategy_call_cta_activated` funnel with placement `industries_client_insight`.
