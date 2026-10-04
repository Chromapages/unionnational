# Lead capture contract: October 1 follow-up

The general intake and construction assessment post to `/api/ghl/intake`. The server validates the snake-case payload and reports success only after the CRM webhook returns 2xx. The local enum accepts `OTHER`, but the receiver's meaning and downstream automation for that value still require owner confirmation.

## General strategy intake

| Field | Visible choice | Canonical value or first-slice handling |
| --- | --- | --- |
| Industry | Construction | CONSTRUCTION |
| Industry | Restaurant / Hospitality | HOSPITALITY |
| Industry | Real Estate / Dev | REAL_ESTATE |
| Industry | Professional Services | PROFESSIONAL_SERVICES |
| Industry | Retail / E-commerce | E_COMMERCE |
| Industry | Other Specialized | OTHER |
| Gross annual revenue | $0-$100k | UNDER_100K |
| Gross annual revenue | $100k-$500k | 100K_500K |
| Gross annual revenue | $500k-$1M | 500K_1M |
| Gross annual revenue | $1M-$3M | 1M_3M |
| Gross annual revenue | $3M-$5M | 3M_5M |
| Gross annual revenue | $5M+ | 5M_PLUS |
| Entity | Sole Proprietorship | SOLE_PROP |
| Entity | LLC (Single) | LLC_SINGLE |
| Entity | LLC (Multi) | LLC_MULTI |
| Entity | S-Corp | S_CORP |
| Entity | C-Corp | C_CORP |
| Entity | Other | OTHER |
| Timeline | Immediate (This month) | IMMEDIATE |
| Timeline | 1-3 Months | THIS_QUARTER |
| Timeline | Looking for next year | PLANNING_ONLY |
| Timeline | Just researching | JUST_CURIOUS |
| Advisory interest | S-Corp Advantage | Forwarded verbatim in services_of_interest |
| Advisory interest | Fractional CFO Strategy | Forwarded verbatim in services_of_interest |
| Advisory interest | Proactive Tax Planning | Forwarded verbatim in services_of_interest |
| Advisory interest | Strategic Visibility/Books | Forwarded verbatim in services_of_interest |
| Advisory interest | Premium Tax Filing | Forwarded verbatim in services_of_interest |

The primary pain-point text is forwarded in pain_points. Contact name, email, phone and company name are forwarded in their canonical fields. The form no longer assigns every lead a false FRACTIONAL_CFO primary service.

| Field | Visible choices | Current handling |
| --- | --- | --- |
| Model type | Service-Based; Product/E-commerce; Brick & Mortar; High-Growth Tech; Other | `business.business_type` |
| State | Entered state | `business.state_location` |
| Accounting support | All four choices | `answers.has_accountant` |
| Current book accuracy | All four choices | `answers.books_status` |
| S-Corp interest | Yes / No | `answers.interested_in_scorp` |
| Investment readiness | All three choices | `answers.investment_willingness` |
| Preferred next step | Book Strategy Call Now | BOOK_STRATEGY_CALL; redirects to booking after acknowledgement |
| Preferred next step | Receive Email Summary | EMAIL_SUMMARY_REQUESTED; request forwarded, delivery unconfirmed |
| Preferred next step | Wait for callback | CALLBACK_REQUESTED; request forwarded, callback unconfirmed |

The unused yearsInBusiness requirement was removed because the form has no visible control. Forwarding an answer through validation does not prove a GHL workflow stores or acts on that field; receiver mapping requires a non-production integration check.

## Construction assessment

| Visible revenue choice | Canonical value | Score contribution |
| --- | --- | --- |
| Under $100K | UNDER_100K | 0 |
| $100K-$500K | 100K_500K | 5 |
| $500K-$1M | 500K_1M | 10 |
| $1M-$3M | 1M_3M | 20 |
| $3M-$5M | 3M_5M | 20 |
| $5M+ | 5M_PLUS | 20 |

| Question | Visible choice | Score contribution |
| --- | --- | --- |
| Job costing | No, we don&amp;apos;t track job-by-job | 0 |
| Job costing | Partially / Inconsistent | 10 |
| Job costing | Yes, fully automated | 15 |
| Cash flow | Never / We just check bank balance | 0 |
| Cash flow | Monthly / Quarterly | 10 |
| Cash flow | Weekly / Real-time | 15 |
| Estimating | Guesswork / Based on intuition | 0 |
| Estimating | Mostly accurate, but we miss things | 10 |
| Estimating | Highly accurate / Data-driven | 15 |
| Financial reviews | Never / Only at tax time | 0 |
| Financial reviews | Annually / Semi-annually | 5 |
| Financial reviews | Monthly / Proactive | 15 |

The five answers are forwarded in `answers` along with the derived score, label, urgency and `high_intent`. The result no longer asserts an unsupported 15–25% profit loss.

## Nested construction assessment and owner decisions

The separate three-step construction assessment now offers `Under $100K`, `$100K–$250K`, `$250K–$500K`, `$500K–$1M`, `$1M–$3M`, `$3M–$5M`, and `$5M+`. The displayed label is forwarded as `business.revenue_range_label`, and the canonical CRM band is forwarded as `business.annual_revenue_band`; `$100K–$250K` and `$250K–$500K` both belong to `100K_500K`. All eight non-contact answers are forwarded in `answers`. Splitting the displayed bands preserves the existing local score contribution for each prior interval.

The nested assessment's maximum possible score is **71**, while `High Intent` starts at **75**. Its threshold remains unchanged pending a business-approved scoring decision. Do not treat a local test as approval to lower it.

## Acknowledgement and remaining boundaries

- HTTP 400, 429, 500, network failure, malformed acknowledgement or success:false leaves answers in place with a visible retry message.
- Missing CRM configuration returns HTTP 503; upstream failures and timeouts cannot display a capture success.
- A 2xx CRM response is the server acknowledgement. No production CRM post is used by the mocked checks.
- Application forms use the six exact canonical bands. Survey scores are recomputed from whitelisted answers on the server. Each form forwards a stable submission ID where available; downstream deduplication is **not verified**, so retry safety is partial until the CRM receiver's idempotency behavior is confirmed.
- `ip_hash` is omitted. A hashing algorithm, salt, receiver field definition and retention policy require approval before it can be populated.
- Book and tax-analysis forms receive only a lead-capture acknowledgement; email delivery is not confirmed by the webhook response.
