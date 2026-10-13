# Navbar visual refinement

Scope: refine the existing header presentation. Laptop/desktop navigation shows
only Services, Who We Help, Guides & Tools, About and Shop, matching the user's
reference. Preserve the full drawer inventory, localized labels, booking
destinations, disclosures and measured offsets. The drawer serves mobile/tablet
widths below 1024px; persistent links begin at 1024px. Booking and language remain
visible in the tablet header. Existing tests protect the interactions.

1. Preserve the original green header, bordered rounded navigation container,
   gold gradient booking CTA and language control. Replace equal-width link cells
   with intrinsic-width links, without truncation or scrolling.
2. Use the existing drawer below 1024px. At every laptop/desktop width, place logo,
   navigation capsule, language and booking in one header band matching the user's
   screenshot. Links may wrap within the capsule on narrow laptops; the capsule
   never moves beneath the logo and utilities. Retain measured height updates.
3. Preserve language/booking behavior and all unrelated sticky-offset fixes.
4. Fix the two scoped test typing issues. Run only existing navigation unit tests.

No browser automation, screenshots, new dependencies, CMS changes or publication.
Visual fit, rendered targets and offsets remain for manual review on port 3030.
