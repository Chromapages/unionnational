# Match Services CTA to the current homepage

Extract the live ConsumerHome final CTA into a shared FinalBookingCTA component; use it on both pages. Reuse existing translations, icons and BookingCtaLink. Preserve the homepage contact/heading IDs and placement, Services closing anchor/placement and Services primary button label. Remove the Services-specific calendar strip. Match homepage section padding on Services. Verify both renders at desktop/mobile, unique IDs, booking links and EN/ES. No dependencies or automated suites/build.

Completed: FinalBookingCTA shared by ConsumerHome and ServicesDesktopExperience. Narrow desktops use the existing two-column fallback; wide layout reserves 384px for translated booking labels. Manual EN/ES responsive checks passed. No automated suites/build run.
