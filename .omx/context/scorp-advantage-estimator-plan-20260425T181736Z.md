# S-Corp Advantage / Estimator Plan Snapshot

## Task Statement
Build a new S-Corp Advantage landing page, estimator flow, estimator results page, GHL webhook route, and reusable S-Corp components for Union National Tax.

## Desired Outcome
Create a premium, advisory-led conversion flow that:
- educates business owners on S-Corp strategy
- calculates estimated annual self-employment tax savings
- sends validated lead data to GoHighLevel via server-side webhook
- routes users into booking or deeper evaluation

## Known Facts / Evidence
- The repo uses Next.js App Router, TypeScript, Tailwind CSS, and localized route segments in `src/app/[locale]`.
- Existing S-Corp-related code already exists:
  - `src/lib/scorp/schema.ts`
  - `src/lib/scorp/mapToGhlPayload.ts`
  - `src/lib/scorp/getFitLevel.ts`
  - `src/lib/scorp/calculateSavingsRange.ts`
  - `src/lib/scorp/calculateFitScore.ts`
  - `src/app/api/scorp-estimator/route.ts`
  - `src/components/scorp/*`
  - `src/app/[locale]/scorp-estimator/page.tsx` currently redirects to `/s-corp-tax-advantage`
- There is an existing GHL intake route at `src/app/api/ghl-intake/route.ts`, but it appears construction-specific and not yet aligned with the new S-Corp payload contract.
- GHL inbound webhook docs confirm inbound webhooks accept JSON POST data and require email or phone for create/update contact behavior.
- Next.js official docs confirm Route Handlers live in `app/.../route.ts` and `generateMetadata` belongs in server components.

## Constraints
- Brand voice must stay strategic, premium, direct, educational, and business-owner focused.
- Avoid fear-heavy language and banned phrases like "tax relief" and "fast refund".
- No lorem ipsum or placeholder copy.
- Must not expose GHL webhook URL client-side.
- Must validate and sanitize server input, including enums and phone/email formats.
- Rate limit the webhook route.
- Preserve existing app conventions where sensible.

## Unknowns / Open Questions
- Whether the new top-level pages should coexist with or replace the existing localized `s-corp-tax-advantage` flow.
- Whether `/book` should be the only booking path or whether a calendar embed should also appear on the new pages.
- Whether to reuse the existing lowercase `src/components/scorp/` directory or migrate into the requested `src/components/SCorp/` path.

## Likely Touchpoints
- `src/app/api/ghl-intake/route.ts`
- `src/app/scorp-advantage/page.tsx`
- `src/app/scorp-estimator/page.tsx`
- `src/app/scorp-estimator/results/page.tsx`
- `src/components/SCorp/*`
- `src/lib/scorp/*`
- `src/app/[locale]/scorp-estimator/page.tsx` and related redirects
