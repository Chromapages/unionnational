# Agent CRM: changes required for the approved Tax Strategy Call

Client approved on 2026-10-02: 30 minutes, free, required name/email, optional phone, rolling three-month window. Provider changes have NOT been applied: client requested dashboard instructions instead of sign-in.

## Identify the correct calendar

1. Open Agent CRM → Settings → Calendars (or Calendars → Calendar Settings).
2. Edit the calendar currently named **Jason’s Office Calendar** whose share/widget URL ends in **sBGopjvf9OdyrfgWqOJx**. Confirm that ID; do not edit a different office calendar.
3. Keep the existing calendar ID, assigned host, public widget URL, working hours, conflict calendars, minimum notice, booking limits and buffers unless a separate change is explicitly needed.

[Agent CRM’s calendar setup guide](https://blog.agent-crm.com/set-up-your-agent-crm-calendar-like-a-pro/) documents the calendar editor and availability/form/notification areas.

## Required dashboard values

| Area | Field / value | Check afterward |
|---|---|---|
| Meeting details | Calendar name: **Tax Strategy Call (30 min)**. | Both public name occurrences stop saying Jason’s Office Calendar. |
| Meeting details | Remove the description if it merely repeats the old office-calendar name. For event-title/notification templates, replace the old call label while retaining needed contact/time merge fields. | Calendar event and confirmation identify the Tax Strategy Call. |
| Availability | Meeting/slot duration: **30 minutes**. API equivalent: `slotDuration: 30`, `slotDurationUnit: mins`. | Selecting 10:00 produces a 10:30 end, not 10:45. |
| Availability | Slot interval: **30 minutes** for the requested start-time grid. This is separate from duration; preserve buffers. | Starts are regenerated from current availability; occupied/buffered times remain unavailable. |
| Availability | Date range/booking window: **3 months**, counted as calendar time, not available/business days only. API equivalent: `allowBookingFor: 3`, `allowBookingForUnit: months`, `countAvailableDaysOnly: false`. | Dates beyond the rolling limit cannot be booked. Do not hardcode a year or a 90-day approximation. |
| Forms & Payments | Payment collection: **off** for this calendar. Do not confuse test/live payment mode with disabling collection. | No payment or deposit is requested for the free call. |
| Booking form | Name and email required; phone optional. Name may use the provider’s first/last-name fields. Remove Additional information. Use the form assigned to this calendar, without changing other funnels’ forms. | Blank phone is accepted and there is no extra business questionnaire. |
| Booking form | The existing content-consent checkbox is an additional opt-in. Exclude it from the minimal appointment form if collecting only the approved fields; never silently set marketing consent true. Retain legal/privacy links. | Booking does not require opting into unrelated content. |
| Notifications / confirmation | Replace hardcoded 45-minute and old office-name text, if present. Retain automatic start/end/time-zone values. | Page, invitation, email and reminder show the approved duration. |

The [HighLevel calendar API documentation](https://marketplace.gohighlevel.com/docs/ghl/calendars/update-calendar/index.html) distinguishes slot duration, start interval and booking range. 45-minute spacing alone is not proof of duration; this calendar’s 45 min label and 10:00–10:45 selection are the direct evidence.

## Widget controls: provider-owned follow-up

The site embeds a cross-origin provider iframe. Parent-page CSS cannot change its controls. The standard documented widget-appearance settings cover colors, buttons and visible details; they do not establish that the following interaction changes are available. Do not treat a cosmetic CSS change as an accessibility fix.

- Keep the existing named Previous month / Next month controls. Previous is already disabled at the current month. Request an arrow-only month selector with bounds matching the three-month window; the observed month/year dropdowns still contain 1986–2066.
- Retain the detected time zone and an accessible way to change it. Request a text summary plus Change disclosure; do not enable a setting that removes the time zone.
- Desktop slots sit beside the date grid. At 390px the provider instead opens a separate Choose Time Slot screen when a date is clicked; request a supported layout that places slots below the calendar. This is not editable through parent-page CSS.
- First available date already preselects after availability loads. Oct 2 is a disabled today marker; Oct 3 is the selected available day. Recheck this after updating duration/window.
- Request keyboard-navigable day/slot controls, date selected/disabled semantics, visible focus and live month/slot announcements. Observed day cells have no tabindex/aria-selected/aria-disabled; inactive time-slot labels are spans. This needs a supported provider/widget fix, not parent-page scripting.
- Existing desktop month arrows are 41×41px, below the requested 44px. Days measured 54×52px and slot labels 50px tall on desktop; mobile widths remain to verify.

For Neo widgets, [Advanced settings → Widget appearance](https://help.gohighlevel.com/support/solutions/articles/155000001529-calendar-widget-customization) is the documented customization area. Supported custom CSS can improve visual cues and arrow size, but cannot add keyboard semantics or a working Change interaction.

### Small visual CSS patch for the currently observed widget

If your calendar’s supported Custom CSS setting is enabled, these observed selectors can address the 41px arrows and color-only disabled-day styling. Preview at 390px after saving. This is deliberately NOT a complete calendar accessibility patch.

~~~css
.arrowPrevious, .arrowNext {
  min-width:44px !important;
  min-height:44px !important;
}
.vdpCell.disabled .vdpCellContent {
  text-decoration:line-through;
}
.vdpCell.selected .vdpCellContent {
  outline:2px solid #0d2e2b;
  outline-offset:2px;
}
.arrowPrevious:focus-visible, .arrowNext:focus-visible,
.widgets-time-slot button:focus-visible {
  outline:2px solid #806921;
  outline-offset:2px;
}
~~~

## Verification after saving

1. Reopen the public widget and /en/book in a fresh preview. Confirm Tax Strategy Call (30 min), 30 min duration, and the approved fields.
2. Verify real available starts/end times, first-date selection, three-month boundary, retained zone and a DST-crossing future date.
3. Check keyboard focus, day/slot selection, announcements, 44px targets and contrast at 390px.
4. Create one clearly labelled test booking using a client-supplied test name/email, inspect the confirmation and message, then release the test slot through the provider. No test booking has been submitted in this session, and no test identity was supplied.

## Hosted page changes already implemented

One short H1 and one approved offer line; numbered reassurance row and See available times removed; compact legal/contact footer retains legal content; chat launcher suppressed on /book; scheduling help and provider time zone retained; iframe ID fixed to ignore UTM query text.
