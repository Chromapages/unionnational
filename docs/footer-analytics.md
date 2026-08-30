# Footer analytics

The footer uses one delegated `window.dataLayer` listener. It records only useful navigation outcomes and sends stable destination identifiers, not labels, URLs, contact values, or user-entered data.

| Event | Destination IDs |
| --- | --- |
| `footer_service_directory_navigate` | `services_directory` |
| `footer_contact_activate` | `office_details`, `contact_page`, `phone`, `email` |
| `footer_resource_navigate` | `resource_center`, `faq`, `shop` |
| `footer_social_exit` | `linkedin`, `facebook`, `youtube`, `instagram`, `twitter` |
| `footer_legal_access` | `disclaimer`, `privacy_policy`, `terms_of_service` |

Footer impressions, hovers, scroll depth, and non-interactive credential content are intentionally not tracked. Campaign parameters (`utm_*`, `gclid`, `fbclid`) are preserved only on the full Services directory recovery link.
