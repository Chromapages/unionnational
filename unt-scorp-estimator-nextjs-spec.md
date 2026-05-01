# Union National Tax — S-Corp Savings Estimator Next.js Spec

## 1. Purpose

Build the **S-Corp Savings Estimator** as the primary broad-market lead magnet for Union National Tax.

This estimator should:
- create immediate perceived value
- qualify tax-savings intent
- route leads into the correct GHL automation path
- move qualified users toward **S-Corp Tax Strategy**, **Tax Planning Consulting**, and **Discovery Evaluation**
- deliver a premium, branded frontend experience in **Next.js**

This spec follows the documented UNT architecture:
- **Next.js owns** the public-facing experience, custom forms, calculators, and assessments
- **GHL owns** CRM records, workflows, tags, nurture, pipelines, booking, and follow-up

## 2. Primary Route

Create a dedicated route:

`/scorp-estimator`

The estimator must live on its own landing page rather than being embedded in a generic contact page.

## 3. Primary User Flow

1. User lands on `/scorp-estimator`
2. User reads brief context and starts estimator
3. User completes a multi-step branded estimator
4. Next.js calculates:
   - fit score
   - fit level
   - estimated savings range
   - high-intent flag
5. User sees a result summary on-page
6. User submission is posted to a Next.js API route
7. Next.js API route validates and transforms payload
8. Next.js API route sends final payload to GHL inbound webhook
9. GHL workflow handles tags, routing, nurture, opportunities, and internal alerts
10. User sees:
    - result summary
    - CTA to **Book Your S-Corp Review**
    - optional CTA to **Download Your S-Corp Summary**

## 4. Page Structure

### 4.1 Hero

**Headline**
See Whether Your Business Could Save With S-Corp Tax Treatment

**Subheadline**
Get a quick directional estimate based on your structure, profit range, and payroll readiness. This is not final tax advice. It is a strategic first step.

**Primary CTA**
Start the Estimator

### 4.2 Trust / Qualification Block

Short bullet block explaining who this is for:
- owner-operators
- self-employed professionals
- LLC owners taxed like sole props
- businesses that may be overpaying in self-employment taxes

### 4.3 Estimator Section

Multi-step form UI.

### 4.4 Result Section

Hidden until calculation is complete.

### 4.5 Final CTA Section

Primary CTA:
**Book Your S-Corp Review**

Secondary CTA:
**Download Your S-Corp Summary**

## 5. UX Requirements

- Use a **multi-step form**, not one long form
- Keep the UI branded and premium
- Show clear progress between steps
- Keep each step lightweight and easy to understand
- Avoid generic CRM-form feel
- Avoid sending the user directly to booking without showing a result
- Use responsive layout and mobile-friendly spacing
- Show inline validation errors
- Preserve form state when moving between steps
- Disable submit while API request is in progress
- Show friendly error state if API submission fails

## 6. Estimator Step Structure

## Step 1 — Contact + Business Basics

Collect:
- `first_name` (required)
- `last_name` (required)
- `email` (required)
- `phone` (required)
- `business_name` (required)
- `website_url` (optional)

## Step 2 — Structure + Tax Context

Collect:
- `entity_type` (required)
- `niche_vertical` (required)
- `state_location` (optional for MVP, recommended)
- `income_subject_to_se_tax` (required)

### Allowed `entity_type` values
- `SOLE_PROP`
- `LLC`
- `S_CORP`
- `C_CORP`
- `PARTNERSHIP`
- `NOT_SURE`

### Allowed `niche_vertical` values
- `CONSTRUCTION`
- `RESTAURANT`
- `REAL_ESTATE`
- `ECOMMERCE`
- `INSURANCE`
- `AGENCY`
- `PROFESSIONAL_SERVICES`
- `OTHER`

### Allowed `income_subject_to_se_tax` values
- `YES`
- `NO`
- `NOT_SURE`

## Step 3 — Profit + Payroll Readiness

Collect:
- `annual_revenue_band` (required)
- `estimated_net_profit_range` (required)
- `current_payroll_status` (required)
- `tax_payroll_readiness` (required)
- `primary_pain_point` (required)

### Allowed `annual_revenue_band` values
- `UNDER_100K`
- `100K_250K`
- `250K_500K`
- `500K_1M`
- `1M_5M`
- `5M_PLUS`

### Allowed `estimated_net_profit_range` values
- `UNDER_50K`
- `50K_100K`
- `100K_150K`
- `150K_250K`
- `250K_PLUS`

### Allowed `current_payroll_status` values
- `RUNNING_PAYROLL`
- `NOT_RUNNING_PAYROLL`
- `NOT_SURE`

### Allowed `tax_payroll_readiness` values
- `LOW`
- `MEDIUM`
- `HIGH`

### Allowed `primary_pain_point` values
- `OVERPAYING_TAXES`
- `ENTITY_STRUCTURE_CONFUSION`
- `BOOKKEEPING_CHAOS`
- `UNCLEAR_NUMBERS`
- `CASH_FLOW_ISSUES`
- `WANT_SCALABLE_GROWTH`

## Step 4 — Results Screen

Display:
- estimated annual savings range
- S-Corp fit level
- short explanation of what the result means
- note that estimate is directional, not final
- CTA to book review
- optional download CTA

## 7. Validation Rules

### Required Fields
- `first_name`
- `last_name`
- `email`
- `phone`
- `business_name`
- `entity_type`
- `niche_vertical`
- `income_subject_to_se_tax`
- `annual_revenue_band`
- `estimated_net_profit_range`
- `current_payroll_status`
- `tax_payroll_readiness`
- `primary_pain_point`

### Optional Fields
- `website_url`
- `state_location`

### Validation Notes
- Trim all string values
- Normalize phone format before API submission
- Use exact enum values for routing-related fields
- Do not use free text where enums are available

## 8. Scoring Model

This scoring model is the recommended frontend implementation logic.

### 8.1 Base Fit Score

Calculate `fit_score` on a 0–100 scale.

#### Entity Type Weight
- `SOLE_PROP` → +25
- `LLC` → +20
- `NOT_SURE` → +10
- `PARTNERSHIP` → +5
- `C_CORP` → 0
- `S_CORP` → -20

#### Revenue Band Weight
- `UNDER_100K` → +5
- `100K_250K` → +10
- `250K_500K` → +15
- `500K_1M` → +20
- `1M_5M` → +20
- `5M_PLUS` → +15

#### Net Profit Range Weight
- `UNDER_50K` → +5
- `50K_100K` → +15
- `100K_150K` → +20
- `150K_250K` → +25
- `250K_PLUS` → +25

#### Income Subject to SE Tax Weight
- `YES` → +20
- `NOT_SURE` → +10
- `NO` → 0

#### Current Payroll Status Weight
- `NOT_RUNNING_PAYROLL` → +10
- `NOT_SURE` → +5
- `RUNNING_PAYROLL` → +3

#### Readiness Weight
- `HIGH` → +10
- `MEDIUM` → +5
- `LOW` → 0

### 8.2 Score Clamp

Clamp the final result to:
- minimum `0`
- maximum `100`

## 9. Fit Bands

Map `fit_score` into `scorp_fit_level`.

- `0–34` → `LOW_FIT`
- `35–59` → `POSSIBLE_FIT`
- `60–79` → `STRONG_CANDIDATE`
- `80–100` → `HIGH_INTENT_SCORP`

## 10. Estimated Savings Logic

Return a **range**, not a fake-precise number.

### 10.1 Special Cases

If `entity_type = S_CORP`:
- savings range = `$0 – $2,000`

If `income_subject_to_se_tax = NO`:
- savings range = `$0 – $3,000`

### 10.2 Standard Ranges by Net Profit

| Net Profit Range | Savings Range |
|---|---|
| `UNDER_50K` | `$1,000 – $3,000` |
| `50K_100K` | `$3,000 – $7,000` |
| `100K_150K` | `$7,000 – $12,000` |
| `150K_250K` | `$12,000 – $18,000` |
| `250K_PLUS` | `$18,000 – $30,000+` |

### 10.3 Messaging Softening Rules

If readiness is low or the entity structure is uncertain:
- keep the estimate
- soften the recommendation language
- avoid overly strong qualification wording

## 11. Result Messaging by Fit Level

### LOW_FIT
Your estimate suggests that S-Corp treatment may not be your strongest next move right now. That does not mean there is no planning opportunity. It means the better next step may be a broader tax-structure review before making an S-Corp election.

### POSSIBLE_FIT
Your responses suggest there may be a real S-Corp opportunity, but the fit depends on your actual numbers and implementation readiness. A focused review can help determine whether the savings outweigh payroll and compliance complexity.

### STRONG_CANDIDATE
Your responses suggest that you may be a strong candidate for S-Corp tax treatment. If your current business income is still being taxed primarily as sole proprietor income, there is a real possibility that you are overpaying in self-employment taxes.

### HIGH_INTENT_SCORP
Your responses suggest a strong S-Corp opportunity with enough business size or profitability to justify a deeper review now. The next step is to confirm the real savings range, compensation strategy, payroll readiness, and broader tax fit.

## 12. CTA Logic

### Primary CTA by Fit Level
- `LOW_FIT` → **Book a Discovery Evaluation**
- `POSSIBLE_FIT` → **Book Your S-Corp Review**
- `STRONG_CANDIDATE` → **Book Your S-Corp Review**
- `HIGH_INTENT_SCORP` → **Book Your S-Corp Review**

### Secondary CTA
- **Download Your S-Corp Summary**

## 13. Frontend Component Structure

```text
app/
  scorp-estimator/
    page.tsx
  api/
    scorp-estimator/
      route.ts

components/
  scorp/
    ScorpEstimatorShell.tsx
    ScorpEstimatorProgress.tsx
    ScorpEstimatorStepContact.tsx
    ScorpEstimatorStepStructure.tsx
    ScorpEstimatorStepFinancials.tsx
    ScorpEstimatorResult.tsx
    ScorpEstimatorCTA.tsx

lib/
  scorp/
    schema.ts
    calculateFitScore.ts
    calculateSavingsRange.ts
    getFitLevel.ts
    mapToGhlPayload.ts
```

## 14. Component Responsibilities

### `ScorpEstimatorShell`
Owns:
- current step state
- form state
- validation state
- submit handling
- loading state
- success/error state

### `ScorpEstimatorProgress`
Owns:
- step indicator
- progress UI

### `ScorpEstimatorStepContact`
Owns:
- personal and business identity inputs

### `ScorpEstimatorStepStructure`
Owns:
- structure and tax-context inputs

### `ScorpEstimatorStepFinancials`
Owns:
- revenue, profit, payroll, readiness, and pain-point inputs

### `ScorpEstimatorResult`
Owns:
- score-driven result UI
- fit level
- savings range
- explanation copy
- CTA handoff

### `ScorpEstimatorCTA`
Owns:
- review CTA
- optional PDF CTA

## 15. Next.js API Route

### Route
`POST /api/scorp-estimator`

### Responsibilities
1. validate request payload
2. normalize values
3. calculate `fit_score`
4. calculate `scorp_fit_level`
5. calculate `scorp_estimated_savings`
6. derive `high_intent_flag`
7. map payload to GHL contract
8. submit to GHL inbound webhook
9. return result summary to client

### Why use a server route
- better validation
- cleaner logging
- safer payload transformation
- easier debugging
- easier future extensibility

## 16. Derived Output Fields

The API route should derive and return/send:
- `fit_score`
- `scorp_fit_level`
- `scorp_estimated_savings`
- `high_intent_flag`
- `lead_magnet_type = SCORP_ESTIMATOR`
- `primary_service_interest = S_CORP_STRATEGY`
- `consultation_type = SCORP_REVIEW`
- `source_page = /scorp-estimator`
- `event_type = SCORP_ESTIMATOR_SUBMITTED`

## 17. High Intent Logic

Set `high_intent_flag = true` if any of the following are true:
- `fit_score >= 80`
- `annual_revenue_band` is `500K_1M`, `1M_5M`, or `5M_PLUS`
- `estimated_net_profit_range = 250K_PLUS`
- `primary_pain_point = OVERPAYING_TAXES`
- `current_payroll_status = NOT_RUNNING_PAYROLL`
- `entity_type = SOLE_PROP` or `LLC`

Otherwise set `high_intent_flag = false`.

## 18. GHL Payload Contract

The API route must POST a structured payload to the GHL inbound webhook.

### Minimum payload

```json
{
  "event_type": "SCORP_ESTIMATOR_SUBMITTED",
  "submitted_at": "ISO_DATE_TIME",
  "first_name": "...",
  "last_name": "...",
  "email": "...",
  "phone": "...",
  "business_name": "...",
  "website_url": "...",
  "niche_vertical": "PROFESSIONAL_SERVICES",
  "annual_revenue_band": "250K_500K",
  "entity_type": "LLC",
  "lead_source": "ORGANIC_SEARCH",
  "source_page": "/scorp-estimator",
  "lead_magnet_type": "SCORP_ESTIMATOR",
  "primary_pain_point": "OVERPAYING_TAXES",
  "primary_service_interest": "S_CORP_STRATEGY",
  "consultation_type": "SCORP_REVIEW",
  "qualification_status": "REVIEWING",
  "urgency_level": "MEDIUM",
  "state_location": "CA",
  "estimated_net_profit_range": "100K_150K",
  "current_payroll_status": "NOT_RUNNING_PAYROLL",
  "tax_payroll_readiness": "MEDIUM",
  "income_subject_to_se_tax": "YES",
  "scorp_estimated_savings": 12000,
  "fit_score": 72,
  "scorp_fit_level": "STRONG_CANDIDATE",
  "high_intent_flag": true,
  "last_assessment_date": "2026-04-20",
  "utm_source": "google",
  "utm_medium": "organic",
  "utm_campaign": "scorp-estimator",
  "utm_content": "hero-cta",
  "utm_term": "",
  "referrer_url": "https://unionnationaltax.com/",
  "event_type": "SCORP_ESTIMATOR_SUBMITTED"
}
```

## 19. Error Handling

### Client-side errors
- missing required inputs
- invalid email
- invalid phone
- enum mismatch

### API errors
- validation failure
- GHL webhook request failure
- malformed payload

### UX response
- do not lose entered form data
- show a friendly retry state
- allow resubmission
- log errors server-side

## 20. Analytics / Tracking

Recommended frontend events:
- estimator_started
- estimator_step_completed
- estimator_result_viewed
- estimator_submitted
- scorp_review_cta_clicked
- scorp_summary_download_clicked

Store UTM values and referrer for payload handoff.

## 21. Accessibility and UX Standards

- keyboard-navigable form
- visible focus states
- semantic headings
- properly associated labels and inputs
- inline error messaging
- accessible button labels
- mobile-friendly spacing and tap targets

## 22. Non-Goals

Do not:
- embed a raw GHL form as the primary estimator UI
- calculate score in GHL instead of Next.js
- push user directly to booking without showing a result
- mix S-Corp and CFO logic into the same estimator
- use a generic contact-form UX for this lead magnet

## 23. MVP Definition

Version 1 is complete when all of the following are true:
- `/scorp-estimator` page exists
- branded 3-step estimator works
- score and savings range are calculated locally or server-side in Next.js
- result card is displayed on-page
- payload is sent to GHL through a Next.js API route
- CTA to **Book Your S-Corp Review** is present
- validation and error handling are functional

## 24. Implementation Priority Order

1. schema and enum definitions
2. scoring helpers
3. savings-range helper
4. fit-level helper
5. multi-step UI
6. result UI
7. API route
8. GHL webhook integration
9. analytics and polish
