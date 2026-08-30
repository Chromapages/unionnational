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

Editors choose the case-study card with `isFeatured`; if none is available, the documented Michael Torres fallback is used. Quote cards are ordered by `displayOrder`. The homepage renders one featured case study plus the first two valid quotes; `/client-results` renders the same complete result pool.

## Analytics

- `testimonials_section_view` marks the homepage section.
- `testimonials_read_more_click` marks the real `/client-results` directory link.
