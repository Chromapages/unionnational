# Booking handoff alignment

## Requirements

- Keep the GoHighLevel calendar as the source of truth for date, time, timezone, prospect details, review, confirmation, cancellation, and rescheduling.
- Keep Union National Tax context, a return path, loading feedback, retry, and contact recovery in the site-owned shell.
- Align the stated meeting duration to the live calendar configuration.

## Evidence

- `src/components/booking/BookingCalendar.tsx` embeds the Agent CRM calendar and owns only loading/error handling.
- The live calendar configuration reports `slot_duration: 45 mins`, `auto_confirm: true`, `allow_cancellation: true`, `allow_reschedule: true`, and visitor timezone selection enabled.
- `src/app/[locale]/book/page.tsx` owns the branded context and return navigation.

## Implementation

1. Replace the stale 30-minute reassurance in localized CTA copy with the verified 45-minute duration.
2. Add localized booking-shell guidance: duration and obligation, calendar-led required-details/confirmation expectation, and a quiet contact recovery route.
3. Preserve provider-controlled interaction states rather than duplicating them in the parent page.

## Acceptance criteria

- CTA and booking page both describe a 45-minute, no-obligation consultation.
- The booking page says the calendar guides remaining details and confirmation; it never treats date selection alone as a booking.
- Visitors retain a visible return path, in-place retry on a calendar failure, and a contact route for unavailable times.
