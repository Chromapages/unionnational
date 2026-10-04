# Cart sidebar reference plan

1. Reuse CartSidebar, widen it to40rem on desktop, retain brand heading/body/data fonts, modal layers, close/focus trap/Escape and safe-area handling.
2. Larger item cards: existing cover/title/edition, measured catalog description when available, line price, quantity controls and labelled Remove action. No replacement cover, invented rating or product copy.
3. Visible header count plus existing polite live status. Digital delivery notice and Included row only for digital/audio-only carts; print/mixed carts show shipping-address context. Preserve current shipping fee behavior and money/checkout identity.
4. Put order summary in the scrollable body and persistent checkout/trust/View full cart controls at the bottom. Continue shopping closes the drawer. Preserve the existing disabled order bump path.
5. Verify empty, digital, print and mixed UI states, quantity/removal math, focus trap/Escape/return, mobile320/390 and desktop1024/1536, full-cart link. Do not initiate a live checkout or payment. No build/lint/typecheck/suites under workspace instruction.

Checkout source accepts card payments only. Paid-order delivery delegates to an external fulfillment workflow with manual/review failure paths, so no instant-download or all-payment-method promise is added. Digital items need no shipping address; print/bundle collectsUS/CA address.

Files: CartSidebar.tsx, EN/ES messages, existing CartSidebar.test.tsx if needed for a saved regression, this plan and visual verdict state. No new dependencies/components, schema changes or CMS writes.

Client refinement: reduced desktop drawer max width from40rem(640px) to32rem(512px). Mobile remains viewport width.
