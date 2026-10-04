# Services page simplification

## Scope and behavior to retain

Edit only the Services page composition, its existing experience component, localized Services copy, and a focused regression specification. Preserve the four problem choices and their three recommended service routes, published service/tier prices, the four FAQs, and booking destinations. Existing pricing/detail pages and CMS documents are outside this pass.

## Cleanup sequence

1. Capture the current four problem-to-service mappings in the browser and add a runnable regression specification for that behavior.
2. Use one responsive Services experience for desktop and mobile. Remove the duplicate category-navigation hero and legacy mobile service/pricing/comparison composition.
3. Keep a compact hero with one sentence and a Book a Strategy Call CTA. Make the four problem choices the only service selector; support keyboard tabs and mobile detail accordions.
4. Present three recommendations with one numeric price format and an explicit quote label when a price is unavailable. Explain standalone service prices versus annual plans, including Foundation's annual tax-return filing.
5. Condense the three plan cards; keep Growth highlighted. Remove the extra plan-stage navigation and five-item standards strip. Explain the confirmed qualifying Growth hotel benefit in a small separate note; omit the unconfirmed estate review from this summary.
6. Keep four short process steps and an approved Torres planning example, then four collapsed FAQs and one short closing CTA. Reuse the existing booking component and label. Remove the service-panel booking prompt, repeated consultation facts, decorative slogans, and client-project imagery without established rights.
7. Verify all four selections, mobile accordions, keyboard focus, pricing scope, EN/ES layouts, FAQs, and booking links manually in the browser. The workspace instruction prohibits running automated suites/build/lint/typecheck unless explicitly requested; the regression spec remains available for that later run.

## Confirmed content boundaries

The current published Foundation tier includes annual tax-return filing, strategic tax planning, audit protection, and the portal. Growth inherits Foundation and adds tax preparation and quarterly reviews. Executive inherits Growth and includes priority support and dedicated senior-advisor access. These facts were read from the public CMS on 2026-09-30.

The user clarified the 2–5-night hotel stay as a welcome benefit UNT can award to qualifying Growth clients. Eligibility and stay terms require confirmation for each offer; it is not presented as a travel product or a reason to buy tax services. Executive estate-review scope remains unanswered and is omitted from this Services summary. The approved Torres account has no supported savings amount, so it remains qualitative and attributed to the team.

## Acceptance criteria

- One responsive experience; four problem tabs; three real service destinations per selected problem.
- Hero and closing use Book a Strategy Call; plan/detail links remain secondary.
- Numeric standalone prices use From, with any recurring/per-employee qualifiers preserved; unavailable numeric prices are quoted after a scope review.
- Annual plans explicitly state annual billing and Foundation's included filing; hotel note is qualified and secondary; estate scope is not assumed.
- Four short process steps, one Torres proof summary, four collapsible questions, and a compact closing block.
- All visible links and controls remain usable at 390px, 1280px, and 1672px in both languages, without body overflow.
