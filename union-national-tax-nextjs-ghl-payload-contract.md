# Union National Tax — Next.js → GHL Payload Contract

## Purpose

This document defines the payload contract between the **Next.js website/web app** and **GoHighLevel (GHL)**.

It is the technical agreement for how lead data, calculator results, assessment results, and booking-related context should be transmitted from the website into GHL.

This contract exists to ensure:
- clean and consistent data intake
- predictable workflow routing
- stable field mapping
- easier debugging
- future-safe extensibility
- alignment between the Next.js developer and the GHL builder

---

# Core Architecture

## Recommended flow

**Next.js UI**
→ **Next.js route handler / API layer**
→ validation + normalization + enrichment
→ **GHL inbound webhook or GHL API**
→ **GHL workflow trigger**
→ contact update, tagging, opportunity creation, nurture, booking, or onboarding logic

---

# Contract Principles

## 1. One shared base schema
All website submissions should inherit from one base structure.

Examples:
- general inquiry form
- S-Corp estimator
- Proactive CFO assessment
- construction profitability assessment
- restaurant profit leak assessment

Each lead magnet type can extend the base contract, but should not invent an entirely different schema.

## 2. Canonical field names
The website should use one standard naming convention when sending payloads.

Avoid:
- mixed casing
- inconsistent names
- duplicate concepts with different labels

## 3. Canonical enums
Use controlled values for fields like:
- event type
- service interest
- niche
- revenue band
- entity type
- pain point

Do not rely on free-text values if the CRM needs to route or automate based on the value.

## 4. Versioning
Every payload should include a version field.

Recommended:
- `"version": "1.0"`

This allows the schema to evolve later without breaking automation.

---

# Endpoint Strategy

## Recommended endpoint pattern

### Option A — Preferred
Use a Next.js route handler as the intake layer.

Example:
- `POST /api/ghl/intake`

Benefits:
- validation before forwarding
- spam filtering
- easier logging
- ability to enrich payload
- flexibility to switch between GHL webhook and API later

### Option B — Simpler
Send directly to a GHL inbound webhook for very simple forms.

Use only when:
- logic is minimal
- payload is stable
- no enrichment is needed
- no middleware validation is required

---

# Base Payload Schema

## Required top-level fields

- `version`
- `event_type`
- `source_page`
- `lead_magnet_type`
- `submitted_at`
- `contact`

## Optional top-level fields

- `business`
- `intent`
- `results`
- `tracking`
- `meta`

---

# Base Payload Structure

```json
{
  "version": "1.0",
  "event_type": "general_inquiry_submitted",
  "source_page": "/contact",
  "lead_magnet_type": "GENERAL_INQUIRY",
  "submitted_at": "2026-04-19T22:00:00.000Z",
  "contact": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com",
    "phone": "+15555555555"
  },
  "business": {
    "business_name": "Doe Design LLC",
    "website_url": "https://doedesign.com",
    "niche_vertical": "AGENCY",
    "annual_revenue_band": "250K_500K",
    "employee_count_band": "1_5",
    "entity_type": "LLC",
    "state_location": "UT"
  },
  "intent": {
    "primary_service_interest": "S_CORP_STRATEGY",
    "primary_pain_point": "OVERPAYING_TAXES",
    "consultation_type": "DISCOVERY_EVALUATION",
    "urgency_level": "MEDIUM"
  },
  "results": {},
  "tracking": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "scorp_search",
    "referrer_url": "https://www.google.com/",
    "client_timestamp": "2026-04-19T21:59:58.000Z"
  },
  "meta": {
    "client_ip_hash": "",
    "user_agent": "",
    "locale": "en-US"
  }
}
```

---

# Section 1 — Field Definitions

## Top-level fields

### `version`
Type:
- string

Required:
- yes

Example:
- `"1.0"`

### `event_type`
Type:
- string enum

Required:
- yes

Purpose:
- tells GHL what kind of submission happened

### `source_page`
Type:
- string

Required:
- yes

Purpose:
- identifies the page or route where the event happened

### `lead_magnet_type`
Type:
- string enum

Required:
- yes

Purpose:
- identifies the type of lead source or interaction

### `submitted_at`
Type:
- ISO datetime string

Required:
- yes

Purpose:
- marks when the payload was submitted

---

## `contact` object

### Required fields
- `first_name`
- `last_name`
- `email`

### Optional but recommended
- `phone`

### Example
```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@example.com",
  "phone": "+15555555555"
}
```

---

## `business` object

### Recommended fields
- `business_name`
- `website_url`
- `niche_vertical`
- `annual_revenue_band`
- `employee_count_band`
- `entity_type`
- `state_location`

### Example
```json
{
  "business_name": "Doe Design LLC",
  "website_url": "https://doedesign.com",
  "niche_vertical": "AGENCY",
  "annual_revenue_band": "250K_500K",
  "employee_count_band": "1_5",
  "entity_type": "LLC",
  "state_location": "UT"
}
```

---

## `intent` object

### Recommended fields
- `primary_service_interest`
- `primary_pain_point`
- `consultation_type`
- `urgency_level`

### Example
```json
{
  "primary_service_interest": "S_CORP_STRATEGY",
  "primary_pain_point": "OVERPAYING_TAXES",
  "consultation_type": "DISCOVERY_EVALUATION",
  "urgency_level": "MEDIUM"
}
```

---

## `results` object

Purpose:
- stores calculator or assessment outputs

This object changes by lead magnet type, but the key names should be standardized.

Examples:
- `scorp_estimated_savings`
- `cfo_assessment_score`
- `construction_assessment_score`
- `restaurant_assessment_score`
- `high_intent_flag`
- `fit_score`

---

## `tracking` object

Purpose:
- stores attribution and client-side marketing context

Recommended fields:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `referrer_url`
- `client_timestamp`

---

## `meta` object

Purpose:
- stores technical context for debugging or anti-spam measures

Recommended fields:
- `client_ip_hash`
- `user_agent`
- `locale`

Do not store raw sensitive personal data unnecessarily.

---

# Section 2 — Canonical Enums

## `event_type` allowed values

- `GENERAL_INQUIRY_SUBMITTED`
- `SCORP_ESTIMATOR_SUBMITTED`
- `CFO_ASSESSMENT_SUBMITTED`
- `CONSTRUCTION_ASSESSMENT_SUBMITTED`
- `RESTAURANT_ASSESSMENT_SUBMITTED`
- `BOOK_DOWNLOAD_SUBMITTED`
- `DISCOVERY_BOOKING_REQUESTED`

## `lead_magnet_type` allowed values

- `GENERAL_INQUIRY`
- `SCORP_ESTIMATOR`
- `PROACTIVE_CFO_ASSESSMENT`
- `CONSTRUCTION_PROFITABILITY_ASSESSMENT`
- `RESTAURANT_PROFIT_LEAK_ASSESSMENT`
- `BOOK_SCORP`
- `BOOK_CFO`
- `BOOK_CONSTRUCTION`
- `BOOK_RESTAURANT`
- `BOOK_WEALTH`
- `BOOK_3MS`

## `primary_service_interest` allowed values

- `S_CORP_STRATEGY`
- `TAX_PLANNING`
- `FRACTIONAL_CFO`
- `STRATEGIC_BOOKKEEPING`
- `CONSTRUCTION_CFO_PARTNERSHIP`
- `RESTAURANT_CFO_PARTNERSHIP`
- `NEW_BUSINESS_FORMATION`
- `WEALTH_STRATEGY`

## `primary_pain_point` allowed values

- `OVERPAYING_TAXES`
- `UNCLEAR_NUMBERS`
- `CASH_FLOW_ISSUES`
- `BOOKKEEPING_CHAOS`
- `MARGIN_PRESSURE`
- `ENTITY_STRUCTURE_CONFUSION`
- `WANT_SCALABLE_GROWTH`

## `niche_vertical` allowed values

- `CONSTRUCTION`
- `RESTAURANT`
- `REAL_ESTATE`
- `ECOMMERCE`
- `INSURANCE`
- `AGENCY`
- `PROFESSIONAL_SERVICES`
- `OTHER`

## `annual_revenue_band` allowed values

- `UNDER_100K`
- `100K_250K`
- `250K_500K`
- `500K_1M`
- `1M_5M`
- `5M_PLUS`

## `employee_count_band` allowed values

- `SOLO`
- `1_5`
- `6_15`
- `16_50`
- `51_PLUS`

## `entity_type` allowed values

- `SOLE_PROP`
- `LLC`
- `S_CORP`
- `C_CORP`
- `PARTNERSHIP`
- `NOT_SURE`

## `consultation_type` allowed values

- `DISCOVERY_EVALUATION`
- `SCORP_REVIEW`
- `CFO_CLARITY_CALL`
- `CONSTRUCTION_STRATEGY_CALL`
- `RESTAURANT_STRATEGY_CALL`

## `urgency_level` allowed values

- `LOW`
- `MEDIUM`
- `HIGH`

---

# Section 3 — Lead-Magnet-Specific Payload Extensions

## A. General Inquiry Payload

```json
{
  "version": "1.0",
  "event_type": "GENERAL_INQUIRY_SUBMITTED",
  "source_page": "/contact",
  "lead_magnet_type": "GENERAL_INQUIRY",
  "submitted_at": "2026-04-19T22:00:00.000Z",
  "contact": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com",
    "phone": "+15555555555"
  },
  "business": {
    "business_name": "Doe Design LLC",
    "website_url": "https://doedesign.com",
    "niche_vertical": "AGENCY",
    "annual_revenue_band": "250K_500K",
    "entity_type": "LLC"
  },
  "intent": {
    "primary_service_interest": "TAX_PLANNING",
    "primary_pain_point": "OVERPAYING_TAXES",
    "consultation_type": "DISCOVERY_EVALUATION",
    "urgency_level": "MEDIUM"
  },
  "results": {}
}
```

## B. S-Corp Estimator Payload

```json
{
  "version": "1.0",
  "event_type": "SCORP_ESTIMATOR_SUBMITTED",
  "source_page": "/scorp-estimator",
  "lead_magnet_type": "SCORP_ESTIMATOR",
  "submitted_at": "2026-04-19T22:00:00.000Z",
  "contact": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com",
    "phone": "+15555555555"
  },
  "business": {
    "business_name": "Doe Design LLC",
    "website_url": "https://doedesign.com",
    "niche_vertical": "AGENCY",
    "annual_revenue_band": "500K_1M",
    "entity_type": "LLC"
  },
  "intent": {
    "primary_service_interest": "S_CORP_STRATEGY",
    "primary_pain_point": "OVERPAYING_TAXES",
    "consultation_type": "SCORP_REVIEW",
    "urgency_level": "HIGH"
  },
  "results": {
    "scorp_estimated_savings": 18420,
    "high_intent_flag": true,
    "fit_score": 88
  }
}
```

## C. Proactive CFO Assessment Payload

```json
{
  "version": "1.0",
  "event_type": "CFO_ASSESSMENT_SUBMITTED",
  "source_page": "/proactive-cfo-assessment",
  "lead_magnet_type": "PROACTIVE_CFO_ASSESSMENT",
  "submitted_at": "2026-04-19T22:00:00.000Z",
  "contact": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com"
  },
  "business": {
    "business_name": "Doe Design LLC",
    "niche_vertical": "AGENCY",
    "annual_revenue_band": "500K_1M",
    "entity_type": "LLC"
  },
  "intent": {
    "primary_service_interest": "FRACTIONAL_CFO",
    "primary_pain_point": "UNCLEAR_NUMBERS",
    "consultation_type": "CFO_CLARITY_CALL",
    "urgency_level": "MEDIUM"
  },
  "results": {
    "cfo_assessment_score": 67,
    "high_intent_flag": true,
    "fit_score": 74
  }
}
```

## D. Construction Assessment Payload

```json
{
  "version": "1.0",
  "event_type": "CONSTRUCTION_ASSESSMENT_SUBMITTED",
  "source_page": "/construction-profitability-assessment",
  "lead_magnet_type": "CONSTRUCTION_PROFITABILITY_ASSESSMENT",
  "submitted_at": "2026-04-19T22:00:00.000Z",
  "contact": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com"
  },
  "business": {
    "business_name": "Doe Construction LLC",
    "niche_vertical": "CONSTRUCTION",
    "annual_revenue_band": "1M_5M",
    "entity_type": "LLC"
  },
  "intent": {
    "primary_service_interest": "CONSTRUCTION_CFO_PARTNERSHIP",
    "primary_pain_point": "MARGIN_PRESSURE",
    "consultation_type": "CONSTRUCTION_STRATEGY_CALL",
    "urgency_level": "HIGH"
  },
  "results": {
    "construction_assessment_score": 61,
    "high_intent_flag": true,
    "fit_score": 80
  }
}
```

## E. Restaurant Assessment Payload

```json
{
  "version": "1.0",
  "event_type": "RESTAURANT_ASSESSMENT_SUBMITTED",
  "source_page": "/restaurant-profit-leak-assessment",
  "lead_magnet_type": "RESTAURANT_PROFIT_LEAK_ASSESSMENT",
  "submitted_at": "2026-04-19T22:00:00.000Z",
  "contact": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com"
  },
  "business": {
    "business_name": "Doe Bistro",
    "niche_vertical": "RESTAURANT",
    "annual_revenue_band": "500K_1M",
    "entity_type": "LLC"
  },
  "intent": {
    "primary_service_interest": "RESTAURANT_CFO_PARTNERSHIP",
    "primary_pain_point": "MARGIN_PRESSURE",
    "consultation_type": "RESTAURANT_STRATEGY_CALL",
    "urgency_level": "HIGH"
  },
  "results": {
    "restaurant_assessment_score": 58,
    "high_intent_flag": true,
    "fit_score": 77
  }
}
```

---

# Section 4 — Mapping Table

## Core field mapping

| Next.js Payload Field | GHL Destination | Type | Required | Example |
|---|---|---:|---|---|
| version | internal metadata / optional custom field | string | yes | 1.0 |
| event_type | custom field: event_type | string | yes | SCORP_ESTIMATOR_SUBMITTED |
| source_page | custom field: source_page | string | yes | /scorp-estimator |
| lead_magnet_type | custom field: lead_magnet_type | string | yes | SCORP_ESTIMATOR |
| submitted_at | custom field: submitted_at | datetime string | yes | 2026-04-19T22:00:00.000Z |
| contact.first_name | contact first name | string | yes | Jane |
| contact.last_name | contact last name | string | yes | Doe |
| contact.email | contact email | string | yes | jane@example.com |
| contact.phone | contact phone | string | recommended | +15555555555 |
| business.business_name | custom field: business_name | string | recommended | Doe Design LLC |
| business.website_url | custom field: website_url | string | optional | https://doedesign.com |
| business.niche_vertical | custom field: niche_vertical | string enum | recommended | AGENCY |
| business.annual_revenue_band | custom field: annual_revenue_band | string enum | recommended | 500K_1M |
| business.employee_count_band | custom field: employee_count_band | string enum | optional | 1_5 |
| business.entity_type | custom field: entity_type | string enum | recommended | LLC |
| business.state_location | custom field: state_location | string | optional | UT |
| intent.primary_service_interest | custom field: primary_service_interest | string enum | recommended | S_CORP_STRATEGY |
| intent.primary_pain_point | custom field: primary_pain_point | string enum | recommended | OVERPAYING_TAXES |
| intent.consultation_type | custom field: consultation_type | string enum | optional | SCORP_REVIEW |
| intent.urgency_level | custom field: urgency_level | string enum | optional | HIGH |
| results.scorp_estimated_savings | custom field: scorp_estimated_savings | number | optional | 18420 |
| results.cfo_assessment_score | custom field: cfo_assessment_score | number | optional | 67 |
| results.construction_assessment_score | custom field: construction_assessment_score | number | optional | 61 |
| results.restaurant_assessment_score | custom field: restaurant_assessment_score | number | optional | 58 |
| results.high_intent_flag | custom field: high_intent_flag | boolean | optional | true |
| results.fit_score | custom field: fit_score | number | optional | 88 |
| tracking.utm_source | custom field: utm_source | string | optional | google |
| tracking.utm_medium | custom field: utm_medium | string | optional | cpc |
| tracking.utm_campaign | custom field: utm_campaign | string | optional | scorp_search |
| tracking.referrer_url | custom field: referrer_url | string | optional | https://www.google.com/ |

---

# Section 5 — Validation Rules

## Required field validation
Reject or flag payloads missing:
- version
- event_type
- source_page
- lead_magnet_type
- submitted_at
- contact.first_name
- contact.last_name
- contact.email

## Email validation
- valid email format required

## Phone validation
- normalize to E.164 format when possible
- if invalid, either strip or store blank

## Enum validation
Any enum field must match an allowed contract value.

Do not forward unknown enum values blindly.

## Numeric validation
The following must be numeric when present:
- scorp_estimated_savings
- cfo_assessment_score
- construction_assessment_score
- restaurant_assessment_score
- fit_score

## Boolean validation
- high_intent_flag must be true or false

## Sanitization
- trim whitespace
- remove dangerous characters where appropriate
- normalize empty strings to null or omit

---

# Section 6 — Routing Rules in GHL

## General principles
Once GHL receives a valid payload, workflows should use the payload to:

1. create or update the contact
2. populate custom fields
3. apply lead magnet tags
4. apply interest tags
5. determine qualification path
6. create or update an opportunity if high intent
7. start the correct nurture or booking workflow

## Example routing logic

### If `lead_magnet_type = SCORP_ESTIMATOR`
- apply `LM_SCorp`
- apply `Interest_SCorp`
- update primary service interest
- if `high_intent_flag = true`, create lead qualification opportunity
- start S-Corp nurture workflow

### If `lead_magnet_type = PROACTIVE_CFO_ASSESSMENT`
- apply `LM_CFO`
- apply `Interest_CFO`
- save score
- if score above threshold, create opportunity and fast-track

### If `niche_vertical = CONSTRUCTION`
- apply `Niche_Construction`
- apply `Interest_Construction`

### If `niche_vertical = RESTAURANT`
- apply `Niche_Restaurant`
- apply `Interest_Restaurant`

---

# Section 7 — Failure Handling

## If validation fails in Next.js
Recommended behavior:
- return 400 with validation error details
- log the rejected payload server-side
- do not forward to GHL

## If GHL forwarding fails
Recommended behavior:
- return 502 or appropriate server error
- log the failure and payload reference
- optionally retry if the failure is transient
- notify internal monitoring if repeated failures occur

## If GHL accepts but workflow mapping is incomplete
Recommended behavior:
- route to fallback review workflow
- apply a `Needs_Review` internal tag
- notify admin or operations owner

---

# Section 8 — Security and Implementation Notes

## Recommended protections
- rate limiting
- spam protection / honeypot
- bot detection if needed
- server-side validation
- do not expose secret webhook/API credentials in frontend code

## Recommended transport
- HTTPS only
- server-side secrets for GHL endpoints or API keys

## Recommended logging
Log:
- timestamp
- event_type
- source_page
- payload version
- success/failure state
- error summary if applicable

Do not log sensitive data unnecessarily.

---

# Section 9 — Build Order

## Phase 1
1. finalize enums
2. finalize custom field names in GHL
3. finalize tag mapping
4. create the intake route handler in Next.js
5. create the GHL inbound webhook workflow or API integration target

## Phase 2
6. implement General Inquiry payload
7. implement S-Corp estimator payload
8. implement CFO assessment payload

## Phase 3
9. implement construction assessment payload
10. implement restaurant assessment payload
11. add tracking and attribution enrichment

## Phase 4
12. add fallback and error-notification handling
13. add schema version management
14. optimize scoring thresholds and routing logic

---

# Strategic Summary

The Next.js → GHL payload contract is one of the highest-leverage technical documents in the system.

It ensures that:
- the website stays premium and custom
- the CRM stays structured
- workflows remain reliable
- service routing stays consistent
- future engineering changes do not break the automation layer

The guiding principle is:

**custom frontend experience, standardized backend payload, structured CRM automation**
