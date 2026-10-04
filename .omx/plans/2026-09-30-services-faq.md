# Services FAQ reference update

## Plan before implementation

Use the existing responsive Services component and native details/summary controls.

1. Add the existing Common Questions eyebrow and a localized subtitle. Reuse sectionHeading (44px desktop, 30px mobile) and current section padding/container.
2. Keep four questions in their existing order, two columns at desktop, one on mobile. Open the first answer initially. Use exclusive details groups, circular chevrons, green open borders/background and an answer divider.
3. Restyle the existing closing block with a decorative calendar circle, divider, support copy, existing BookingCtaLink and localized “No obligation. Just a conversation.” reassurance.
4. Keep savings copy conditional and fact-based; do not introduce an unsupported claim about typical client savings. Reuse existing fonts, icons, analytics and destinations.
5. Verify initial state, exclusive expansion, keyboard operation, booking destination, heading sizes and overflow in EN/ES desktop/mobile. Persist visual verdict. No new dependencies or automated suites/build.

## Completed
Implemented in the existing Services component and EN/ES messages. Manual checks passed at 1536px, 1280px and 390px, including keyboard/exclusive expansion, initial state, CTA label sizing and booking navigation. Visual verdict: 95/100. Automated suites/build were not run.
