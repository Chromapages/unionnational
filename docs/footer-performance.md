# Footer performance model

The footer is server-rendered. Its service navigation, legal destinations, contact content, and social links are present in the initial document; no client fetch, social widget, follower count, or external social embed is required to render it.

Site Settings are read through a server cache with a 15-minute revalidation period. This keeps low-churn logo, contact, office-display, and verified-social configuration off the critical request path while still allowing operational updates to propagate.

The mobile footer navigation is the only hydrated footer surface because it implements a real accessible accordion. Desktop footer navigation remains static HTML. Footer icons are server-rendered SVG output from tree-shaken named imports and do not create a footer-wide client bundle. The logo sits inside a fixed-height container, reserving its layout space before the image resolves.
