# Booking funnel analytics

The booking funnel uses the existing browser `dataLayer` only. Events are best-effort and queued after the interaction so they cannot delay navigation or the scheduler.

| Event | Purpose | Allowed fields |
|---|---|---|
| `strategy_call_cta_viewed` | Measure whether the CTA was reached | Placement identifier |
| `strategy_call_cta_activated` | Measure booking intent and route type | Placement identifier, internal/external destination type |
| `strategy_call_page_viewed` | Measure arrival on the on-site booking route | Fixed page identifier |
| `strategy_call_scheduler_opened` | Measure a successfully loaded embedded calendar | Fixed provider identifier |
| `strategy_call_scheduler_error` | Diagnose loading friction | Fixed operational reason only |
| `strategy_call_scheduler_abandoned` | Measure an explicit booking-page return action | History/fallback return method |

No event may contain names, email addresses, phone numbers, tax or financial information, free-text responses, selected time slots, timezone values, calendar form fields, or consultation content.

Campaign parameters (`utm_*`, `gclid`, and `fbclid`) are forwarded unchanged from the on-site booking route to the embedded scheduler URL. They are not copied into booking analytics events.

The cross-origin scheduler does not expose documented host-page callbacks for appointment-type selection, date/time selection, submission, confirmation, cancellation, rescheduling, or no availability. Do not infer or send events for those states unless the provider exposes a lawful, documented callback containing no sensitive payload and the privacy owner approves the use. The explicit host return link records `strategy_call_scheduler_abandoned`; it does not represent provider-side cancellation.
